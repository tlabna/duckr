import React from 'react'
import PropTypes from 'prop-types'
import { Authenticate } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// This will return an object with all exported  action creator functions
import * as userActionCreators from 'redux/modules/users'

class AuthenticateContainer extends React.Component {
  handleAuth = () => {
    this.props.fetchAndHandleAuthedUser()
  }

  render () {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth} />
    )
  }
}

AuthenticateContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired
}

// Map state to props for state that component needs only
function mapStateToProps (state) {
  console.log('STATE', state)
  return {
    isFetching: state.isFetching,
    error: state.error
  }
}

function mapDispatchToProps (dispatch) {
  // turns an object whos values are action creators
  // into an object with the same keys BUT whose values
  // are every action creator wrapped in dispatch function
  // that way they can be invoked directly
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer)
