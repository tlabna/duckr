import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Feed } from 'components'
import * as feedActionCreators from 'redux/modules/feed'
import ImmutablePropTypes from 'react-immutable-proptypes'

class FeedContainer extends React.Component {
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  }

  render () {
    return (
      <Feed
        newDucksAvailable={this.props.newDucksAvailable}
        error={this.props.error}
        isFetching={this.props.isFetching}
        resetNewDucksAvailable={this.props.resetNewDucksAvailable}
        duckIds={this.props.duckIds} />
    )
  }
}

FeedContainer.propTypes = {
  newDucksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setAndHandleFeedListener: PropTypes.func.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
  duckIds: ImmutablePropTypes.list.isRequired // PropTypes.instanceOf(List) w/o react-immutable-proptypes
}

function mapStateToProps ({feed}) {
  // const { newDucksAvailable, error, isFetching, duckIds } = feed

  // return {
  //   newDucksAvailable,
  //   error,
  //   isFetching,
  //   duckIds
  // }

  return {
    newDucksAvailable: feed.get('newDucksAvailable'),
    error: feed.get('error'),
    isFetching: feed.get('isFetching'),
    duckIds: feed.get('duckIds')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(feedActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
