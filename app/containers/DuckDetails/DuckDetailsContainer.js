import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DuckDetails } from 'components'
import * as duckActionCreators from 'redux/modules/ducks'
import * as likeCountActionCreators from 'redux/modules/likeCount'

class DuckDetailsContainer extends React.Component {
  static propTypes = {
    authedUser: PropTypes.object.isRequired,
    duckId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    duckAlreadyFetched: PropTypes.bool.isRequired,
    fetchAndHandleDuck: PropTypes.func.isRequired,
    removeFetching: PropTypes.func.isRequired,
    initLikeFetch: PropTypes.func.isRequired
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
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        isFetching={this.props.isFetching}
        error={this.props.error} />
    )
  }
}

function mapStateToProps ({ ducks, likeCount, users }, props) {
  const duckId = props.match.params.duckId
  return {
    duckId,
    authedUser: users[users.authedId].info,
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    duckAlreadyFetched: !!ducks[duckId] // Match to a boolean -> returns true/false
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({...duckActionCreators, ...likeCountActionCreators}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuckDetailsContainer)
