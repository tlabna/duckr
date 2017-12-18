import React from 'react'
import PropTypes from 'prop-types'
import { User } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as usersActionCreators from 'redux/modules/users'
import * as usersDucksActionCreators from 'redux/modules/usersDucks'
import { staleUser, staleDucks } from 'helpers/utils'
import { List } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'

class UserContainer extends React.Component {
  static propTypes = {
    noUser: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    duckIds: ImmutablePropTypes.list.isRequired,
    fetchAndHandleUser: PropTypes.func.isRequired,
    fetchAndHandleUsersDucks: PropTypes.func.isRequired,
    lastUpdatedUser: PropTypes.number.isRequired,
    lastUpdatedDucks: PropTypes.number.isRequired
  }

  componentDidMount () {
    const uid = this.props.match.params.uid
    if (this.props.noUser === true || staleUser(this.props.lastUpdatedUser)) {
      this.props.fetchAndHandleUser(uid)
    }

    if (this.props.noUser === true || staleDucks(this.props.lastUpdatedDucks)) {
      this.props.fetchAndHandleUsersDucks(uid)
    }
  }

  render () {
    return (
      <User
        noUser={this.props.noUser}
        name={this.props.name}
        isFetching={this.props.isFetching}
        error={this.props.error}
        duckIds={this.props.duckIds} />
    )
  }
}

function mapStateToProps ({users, usersDucks}, props) {
  const uid = props.match.params.uid
  const user = users.get(uid)
  const noUser = typeof user === 'undefined'
  const specificUsersDucks = usersDucks.get(uid)

  return {
    noUser,
    isFetching: users.get('isFetching') || usersDucks.get('isFetching'),
    error: users.get('error') || usersDucks.get('error'),
    duckIds: specificUsersDucks ? specificUsersDucks.get('duckIds') : List(),
    lastUpdatedUser: user ? user.get('lastUpdated') : 0,
    lastUpdatedDucks: specificUsersDucks ? specificUsersDucks.get('lastUpdated') : 0,
    name: noUser ? '' : user.getIn(['info', 'name'])
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({...usersActionCreators, ...usersDucksActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
