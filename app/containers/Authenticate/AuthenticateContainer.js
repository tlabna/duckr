import React from 'react'
import PropTypes from 'prop-types'
import { Authenticate } from 'components'
import auth from 'helpers/auth'

class AuthenticateContainer extends React.Component {
  handleAuth () {
    auth().then((user) => {
      console.log('Authed User', user)
    })
  }

  render () {
    return (
      <Authenticate
        isFetching={false}
        error=''
        onAuth={this.handleAuth} />
    )
  }
}

export default AuthenticateContainer
