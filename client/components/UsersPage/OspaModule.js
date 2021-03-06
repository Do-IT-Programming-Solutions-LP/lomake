import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { Header, Button, Segment } from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  createOrUpdateDeadline,
  deleteDeadline,
  getDeadline,
} from 'Utilities/redux/deadlineReducer'
import { registerLocale } from 'react-datepicker'
import { fi, enGB, sv } from 'date-fns/locale'

export default function OspaModule() {
  const [newDate, setNewDate] = useState(null)
  const languageCode = useSelector((state) => state.language)
  const nextDeadline = useSelector(({ deadlines }) => deadlines.nextDeadline)
  const isAdmin = useSelector(({ currentUser }) => currentUser.data.admin)
  const dispatch = useDispatch()
  registerLocale('fi', fi)
  registerLocale('en', enGB)
  registerLocale('se', sv)

  useEffect(() => {
    dispatch(getDeadline())
  }, [])

  const translations = {
    deadlineSettings: {
      en: 'Deadline settings',
      fi: 'Määräaika-asetukset',
      se: '',
    },
    selectNewDeadline: {
      en: 'Select new deadline',
      fi: 'Valitse uusi määräaika',
      se: '',
    },
    updateDeadline: {
      en: 'Update deadline',
      fi: 'Päivitä määräaika',
      se: '',
    },
    nextDeadline: {
      en: 'Next deadline:',
      fi: 'Seuraava määräaika:',
      se: '',
    },
    noDeadlineSet: {
      en: 'No deadline set.',
      fi: 'Määräaikaa ei ole asetettu.',
      se: '',
    },
    deleteThisDeadline: {
      en: 'Freeze the form',
      fi: 'Lukitse lomake',
      se: '',
    },
  }

  const handleDeadlineSave = () => {
    const acualDate = new Date(
      Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
    )

    dispatch(createOrUpdateDeadline(acualDate.toISOString()))
    setNewDate(null)
  }

  const handleDelete = () => {
    dispatch(deleteDeadline())
  }

  if (!isAdmin) return null

  const existingDeadlines = []

  const formatDate = (date) => {
    const temp = new Date(date)
    return `${temp.getDate()}.${temp.getMonth() + 1}.${temp.getFullYear()}`
  }

  return (
    <Segment style={{ width: '500px', zIndex: '3', margin: '1em' }}>
      <Header as="h4" style={{ textAlign: 'center' }}>
        {translations['deadlineSettings'][languageCode]}
      </Header>
      <DatePicker
        dateFormat="dd.MM.yyyy"
        excludeDates={existingDeadlines.map((dl) => new Date(dl.date))}
        placeholderText={translations['selectNewDeadline'][languageCode]}
        minDate={new Date()}
        selected={newDate}
        onChange={setNewDate}
        locale={languageCode}
      />
      <Button
        data-cy="updateDeadline"
        primary
        compact
        size="mini"
        disabled={!newDate}
        onClick={handleDeadlineSave}
      >
        {translations['updateDeadline'][languageCode]}
      </Button>
      {nextDeadline && (
        <Button data-cy="deleteDeadline" onClick={handleDelete} negative compact size="mini">
          {translations['deleteThisDeadline'][languageCode]}
        </Button>
      )}

      <Header as="h5">{translations['nextDeadline'][languageCode]}</Header>
      {!nextDeadline && (
        <div data-cy="noNextDeadline">{translations['noDeadlineSet'][languageCode]}</div>
      )}
      {nextDeadline && <div data-cy="nextDeadline">{formatDate(nextDeadline.date)}</div>}
    </Segment>
  )
}
