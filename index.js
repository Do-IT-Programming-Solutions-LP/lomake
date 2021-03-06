require('dotenv').config()
require('module-alias/register')
const chokidar = require('chokidar')
const express = require('express')
const path = require('path')
require('express-async-errors')

const { PORT, inProduction } = require('@util/common')
const logger = require('@util/logger')

const { initializeDatabaseConnection } = require('@root/server/database/connection')

const { resetAllTokens } = require('@root/server/scripts/resetAllTokens')
const { resetStudyprogrammes } = require('@root/server/scripts/resetStudyprogrammes')
const { startBackupJob } = require('@root/server/scripts/backupAnswers')
const { startDeadlineWatcher } = require('@root/server/scripts/deadlineWatcher')
const { generateMissingTokens } = require('@root/server/scripts/generateMissingTokens')
const { fixProgrammeKeys } = require('@root/server/scripts/fixProgrammeKeys')
const { initFaculties } = require('@root/server/scripts/initFaculties')

/**
 * Creates studyprogrammes, faculties and accesstokens.
 * Should only be executed once.
 */
const seedDatabase = async () => {
  logger.warn('Starting to seed database')
  try {
    await resetStudyprogrammes()
    await initFaculties()
    await resetAllTokens()
  } catch (e) {
    logger.error('Database seeding failed', e)
  }
}

initializeDatabaseConnection()
  .then(() => {
    // Scripts that can be ran manually
    if (process.argv[2]) {
      switch (process.argv[2]) {
        case 'seed':
          seedDatabase().then(() => logger.warn('Database seeding completed.'))
          return
        case 'reset_tokens':
          resetAllTokens().then(() => logger.info('Token reset done.'))
          return
        case 'reset_studyprogrammes':
          resetStudyprogrammes().then(() => logger.info('Studyprogram reset done.'))
          return
        case 'fix_programmes':
          fixProgrammeKeys()
          return
        case 'create_faculties':
          initFaculties().then(() => logger.info('Faculties created.'))
          return
        default:
          return
      }
    }

    // Scripts that will run if env variable TESTING=true (in GitHub actions).
    if (process.env.TESTING) seedDatabase()

    const app = express()
    const server = require('http').Server(app)
    const io = require('socket.io')(server)
    io.on('connection', (socket) => {
      socket.on('update_field', (room) =>
        require('@util/websocketHandlers').updateField(socket, room, io)
      )
      socket.on('join', (room) => require('@util/websocketHandlers').joinRoom(socket, room, io))
      socket.on('leave', (room) => require('@util/websocketHandlers').leaveRoom(socket, room))
    })
    // Require is here so we can delete it from cache when files change (*)

    app.use('/api', (req, res, next) => require('@root/server')(req, res, next)) // eslint-disable-line

    /**
     *  Use "hot loading" in backend
     */
    const watcher = chokidar.watch('server') // Watch server folder
    watcher.on('ready', () => {
      watcher.on('all', () => {
        logger.info('Hot reloaded.')
        Object.keys(require.cache).forEach((id) => {
          if (id.includes('server')) delete require.cache[id] // Delete all require caches that point to server folder (*)
        })
      })
    })

    /**
     * For frontend use hot loading when in development, else serve the static content
     */
    if (!inProduction) {
      /* eslint-disable */
      const webpack = require('webpack')
      const middleware = require('webpack-dev-middleware')
      const hotMiddleWare = require('webpack-hot-middleware')
      const webpackConf = require('@root/webpack.config')
      /* eslint-enable */
      const compiler = webpack(webpackConf('development', { mode: 'development' }))

      const devMiddleware = middleware(compiler)
      app.use(devMiddleware)
      app.use(hotMiddleWare(compiler))
      app.use('*', (req, res, next) => {
        const filename = path.join(compiler.outputPath, 'index.html')
        devMiddleware.waitUntilValid(() => {
          compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) return next(err)
            res.set('content-type', 'text/html')
            res.send(result)
            return res.end()
          })
        })
      })
    } else {
      const DIST_PATH = path.resolve(__dirname, './dist')
      const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

      app.use(express.static(DIST_PATH))
      app.get('*', (req, res) => res.sendFile(INDEX_PATH))
    }

    server.listen(PORT, () => {
      logger.info(`Started on port ${PORT}`)
      startBackupJob()
      startDeadlineWatcher()
      generateMissingTokens()
    })
  })
  .catch((e) => {
    process.exitCode = 1
    logger.error(e)
  })
