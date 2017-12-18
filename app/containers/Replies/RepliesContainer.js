import React from 'react'
import PropTypes from 'prop-types'
import { Replies } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as repliesActionCreators from 'redux/modules/replies'
import { staleReplies } from 'helpers/utils'
import { Map } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'

class RepliesContainer extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    replies: ImmutablePropTypes.map,
    lastUpdated: PropTypes.number.isRequired,
    duckId: PropTypes.string.isRequired,
    fetchAndHandleReplies: PropTypes.func.isRequired
  }

  static defaultProps = {
    lastUpdated: 0,
    replies: Map()
  }

  componentDidMount () {
    if (staleReplies(this.props.lastUpdated)) {
      this.props.fetchAndHandleReplies(this.props.duckId)
    }
  }

  render () {
    return (
      <Replies
        isFetching={this.props.isFetching}
        error={this.props.error}
        lastUpdated={this.props.lastUpdated}
        replies={this.props.replies} />
    )
  }
}

function mapStateToProps (state, props) {
  const duckRepliesInfo = state.replies.get(props.duckId) || Map()

  // const { lastUpdated, replies } = duckRepliesInfo
  const lastUpdated = duckRepliesInfo.get('lastUpdated')
  const replies = duckRepliesInfo.get('replies')

  return {
    isFetching: state.replies.get('isFetching'),
    error: state.replies.get('error'),
    lastUpdated,
    replies
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(repliesActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RepliesContainer)
