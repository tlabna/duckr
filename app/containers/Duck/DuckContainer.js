import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Duck } from 'components'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'

class DuckContainer extends React.Component {
  static propTypes = {
    duck: PropTypes.object.isRequired,
    numberOfLikes: PropTypes.number,
    isLiked: PropTypes.bool.isRequired,
    handleDeleteLike: PropTypes.func.isRequired,
    addAndHandleLike: PropTypes.func.isRequired,
    hideReplyBtn: PropTypes.bool.isRequired,
    hideLikeCount: PropTypes.bool.isRequired
  };

  static defaultProps = {
    hideReplyBtn: false,
    hideLikeCount: true
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  goToProfile = (e) => {
    e.stopPropagation()
    this.context.router.history.push(`/${this.props.duck.get('uid')}`)
  }

  handleClick = (e) => {
    e.stopPropagation()
    this.context.router.history.push(`/duck-detail/${this.props.duck.get('duckId')}`)
  }

  render () {
    return (
      <Duck
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
        {...this.props} />
    )
  }
}

// Second argument will be props passed down to this component (from Feed.js)
function mapStateToProps ({ducks, likeCount, usersLikes}, props) {
  return {
    duck: ducks.get(props.duckId),
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes.get(props.duckId) === true,
    numberOfLikes: likeCount.get(props.duckId)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(usersLikesActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DuckContainer)
