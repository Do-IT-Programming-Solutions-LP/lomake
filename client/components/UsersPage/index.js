import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAction } from 'Utilities/redux/usersReducer'
import UserTable from 'Components/UsersPage/UserTable'
import OwnerLinks from './OwnerLinks'
import { Tab } from 'semantic-ui-react'
import FacultyLinks from './FacultyLinks'
import DoctorLinks from './DoctorLinks'
import OspaModule from './OspaModule'
import { getAllTokens } from 'Utilities/redux/accessTokenReducer'

export default () => {
  const dispatch = useDispatch()
  const languageCode = useSelector((state) => state.language)

  const translations = {
    adminPage: {
      en: 'Form - Admin-page',
      fi: 'Lomake - Ylläpito-sivu',
      se: '',
    },
  }

  useEffect(() => {
    document.title = translations['adminPage'][languageCode]
  }, [languageCode])

  useEffect(() => {
    dispatch(getAllTokens())
    dispatch(getAllUsersAction())
  }, [])

  const panes = [
    {
      menuItem: 'Users',
      render: () => (
        <Tab.Pane>
          <UserTable />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Deadline',
      render: () => (
        <Tab.Pane>
          <OspaModule />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Links for owners',
      render: () => (
        <Tab.Pane>
          <OwnerLinks />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Links for faculties',
      render: () => (
        <Tab.Pane>
          <FacultyLinks />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Links for doctoral programmes',
      render: () => (
        <Tab.Pane>
          <DoctorLinks />
        </Tab.Pane>
      ),
    },
  ]

  return <Tab style={{ width: '90%' }} panes={panes} />
}
