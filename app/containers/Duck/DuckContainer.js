import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Duck } from 'components'

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

  goToProfile (e) {
    e.stopPropagatiion()
    this.context.router.history.push(`/${this.props.duck.uid}`)
  }

  handleClick (e) {
    e.stopPropagatiion()
    this.context.router.push(`/duck-detail/${this.props.duck.duckId}`)
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
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.duckId] === true,
    numberOfLikes: likeCount[props.duckId]
  }
}

export default connect(mapStateToProps)(DuckContainer)
