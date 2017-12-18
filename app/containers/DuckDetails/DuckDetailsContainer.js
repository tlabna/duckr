import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DuckDetails } from 'components'
import * as duckActionCreators from 'redux/modules/ducks'
import * as likeCountActionCreators from 'redux/modules/likeCount'
import * as repliesActionCreators from 'redux/modules/replies'
import ImmutablePropTypes from 'react-immutable-proptypes'

class DuckDetailsContainer extends React.Component {
  static propTypes = {
    authedUser: ImmutablePropTypes.map.isRequired,
    duckId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    duckAlreadyFetched: PropTypes.bool.isRequired,
    fetchAndHandleDuck: PropTypes.func.isRequired,
    removeFetching: PropTypes.func.isRequired,
    initLikeFetch: PropTypes.func.isRequired,
    addAndHandleReply: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.initLikeFetch(this.props.duckId)
    if (this.props.duckAlreadyFetched === false) {
      // fetch duck and save to store
      this.props.fetchAndHandleDuck(this.props.duckId)
    } else {
      // set isFetching to false (since we already have that duck)
      this.props.removeFetching()
    }
  }

  render () {
    return (
      <DuckDetails
        addAndHandleReply={this.props.addAndHandleReply}
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        isFetching={this.props.isFetching}
        error={this.props.error} />
    )
  }
}

function mapStateToProps ({ ducks, likeCount, users }, props) {
  const duckId = props.match.params.duckId
  const userId = users.get('authedId') || ''
  return {
    duckId,
    authedUser: users.getIn([userId, 'info']), // users[users.authedId].info
    isFetching: ducks.get('isFetching') || likeCount.get('isFetching'),
    error: ducks.get('error'),
    duckAlreadyFetched: !!ducks.get(duckId) // Match to a boolean -> returns true/false
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...duckActionCreators,
    ...likeCountActionCreators,
    ...repliesActionCreators}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuckDetailsContainer)
