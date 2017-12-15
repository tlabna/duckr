import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MainContainer, HomeContainer, AuthenticateContainer, FeedContainer,
  LogoutContainer, UserContainer, DuckDetailsContainer } from 'containers'
import { ConnectedRouter } from 'react-router-redux'

export default function getRoutes (checkAuth, history) {
  return (
    <ConnectedRouter history={history}>
      <MainContainer>
        <Switch>
          <Route exact={true} path='/' component={checkAuth(HomeContainer)} />
          <Route path='/auth' component={checkAuth(AuthenticateContainer)} />
          <Route path='/feed' component={checkAuth(FeedContainer)} />
          <Route path='/logout' component={LogoutContainer} />
          <Route path='/duck-detail/:duckId' component={checkAuth(DuckDetailsContainer)} />
          <Route path='/:uid' component={checkAuth(UserContainer)} />
        </Switch>
      </MainContainer>
    </ConnectedRouter>
  )
}
