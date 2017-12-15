import React from 'react'
import PropTypes from 'prop-types'
import { formatTimestamp } from 'helpers/utils'
import Reply from 'react-icons/lib/fa/mail-reply'
import Star from 'react-icons/lib/fa/star'
import {
  duckContainer, contentContainer, avatar, actionContainer,
  header, text, likeReplyContainer, icon, likedIcon, author
} from './styles.css'

import ImmutablePropTypes from 'react-immutable-proptypes'

/*
Note. If I didn't use react-immutable-proptypes, then duck would be:
import { Map } from immutable
Duck.propTypes = {
  duck: PropTypes.instanceOf(Map)
}

The issue with this, is that you can't see duck properties, so I decided to use
the library above to handle PropTypes
 */
Duck.propTypes = {
  duck: ImmutablePropTypes.contains({
    avatar: PropTypes.string.isRequired,
    duckId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func,
  numberOfLikes: PropTypes.number,
  isLiked: PropTypes.bool.isRequired,
  addAndHandleLike: PropTypes.func.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
  hideReplyBtn: PropTypes.bool.isRequired,
  hideLikeCount: PropTypes.bool.isRequired,
  goToProfile: PropTypes.func.isRequired
}

export default function Duck (props) {
  const starIcon = props.isLiked === true ? likedIcon : icon
  const starFn = props.isLiked === true ? props.handleDeleteLike : props.addAndHandleLike
  return (
    <div
      className={duckContainer}
      style={{cursor: props.hideReplyBtn === true ? 'default' : 'pointer'}}
      onClick={props.onClick}>
      <img src={props.duck.get('avatar')} className={avatar} />
      <div className={contentContainer}>
        <div className={header}>
          <div onClick={props.goToProfile} className={author}>{props.duck.get('name')}</div>
          <div>{formatTimestamp(props.duck.get('timestamp'))}</div>
        </div>
        <div className={text}>{props.duck.get('text')}</div>
        <div className={likeReplyContainer}>
          {!props.hideReplyBtn &&
            <Reply className={icon} />}
          <div className={actionContainer}>
            <Star
              className={starIcon}
              onClick={(e) => starFn(props.duck.get('duckId'), e)} />
            {!props.hideLikeCount &&
              <div>{props.numberOfLikes}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
