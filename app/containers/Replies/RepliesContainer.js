import React from 'react'
import PropTypes from 'prop-types'
import { Replies } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as repliesActionCreators from 'redux/modules/replies'
import { staleReplies } from 'helpers/utils'

class RepliesContainer extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    replies: PropTypes.object,
    lastUpdated: PropTypes.number.isRequired,
    duckId: PropTypes.string.isRequired,
    fetchAndHandleReplies: PropTypes.func.isRequired
  }

  static defaultProps = {
    lastUpdated: 0,
    replies: {}
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
  const duckRepliesInfo = state.replies[props.duckId] || {}
  const { lastUpdated, replies } = duckRepliesInfo
  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(repliesActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RepliesContainer)
