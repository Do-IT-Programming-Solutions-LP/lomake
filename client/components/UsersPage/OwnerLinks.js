import React from 'react'
import { useSelector } from 'react-redux'
import { basePath } from '../../../config/common'
import { Message } from 'semantic-ui-react'

export default function OwnerLinks() {
  const allTokens = useSelector((state) => state.accessToken.allTokens)
  const studyProgrammes = useSelector((state) => state.studyProgrammes.data)
  const language = useSelector((state) => state.language)

  if (!allTokens || !studyProgrammes) return null

  const filteredTokens = allTokens.filter((token) => token.programme && token.valid)
  const sortedTokens = filteredTokens.sort((a, b) => a.programme.localeCompare(b.programme))

  return (
    <>
      <Message
        color="blue"
        icon="exclamation"
        content={
          'The links listed here give ADMIN-permissions and can be used one time only. Only programmes that have yet not been claimed are listed here.'
        }
      />
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Programme</th>
            <th>Share-URL</th>
          </tr>
        </thead>
        <tbody>
          {sortedTokens
            .filter((token) => token.type === 'ADMIN')
            .map((token) => {
              const code = token.url
              const programmeKey = token.programme
              const shareUrl = `${window.location.origin}${basePath}access/${code}`
              const localizedProgName = studyProgrammes.find((p) => p.key === programmeKey).name[
                language
              ]

              return (
                <tr key={token.url}>
                  <td>{programmeKey}</td>
                  <td>{localizedProgName}</td>
                  <td>{shareUrl}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}
