import React from 'react'
import PropTypes from 'prop-types'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { container, innerContainer } from './styles.css'
import { bindActionCreators } from 'redux'
import * as useractionCreators from 'redux/modules/users'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

class MainContainer extends React.Component {
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        if (this.props.location.pathname === '/') {
          this.context.router.history.replace('feed')
        }
      } else {
        this.props.removeFetchingUser()
      }
    })
  }

  render () {
    console.log('PROPS', this.props)
    return this.props.isFetching === true
      ? null
      : (
        <div className={container}>
          <Navigation isAuthed={this.props.isAuthed} />
          <div className={innerContainer}>
            {this.props.children}
          </div>
        </div>
      )
  }
}

MainContainer.propTypes = {
  children: PropTypes.any.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  removeFetchingUser: PropTypes.func.isRequired
}

MainContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    isAuthed: state.isAuthed,
    isFetching: state.isFetching
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(useractionCreators, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer))
