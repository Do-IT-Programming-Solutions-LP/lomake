import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import FormView from 'Components/FormView'
import AdminPage from 'Components/UsersPage'
import OverviewPage from 'Components/OverviewPage'
import ClaimAccessPage from 'Components/ClaimAccessPage'

export default () => (
  <div className="content">
    <Switch>
      <Route exact path="/" component={OverviewPage} />
      <Route exact path="/admin" component={AdminPage} />
      <Route
        exact
        path="/form/:room"
        render={(props) => <FormView room={props.match.params.room} />}
      />
      <Route
        exact
        path="/access/:url"
        render={(props) => <ClaimAccessPage url={props.match.params.url} />}
      />
      <Redirect to="/" />
    </Switch>
  </div>
)
