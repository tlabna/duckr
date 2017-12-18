import React from 'react'
import PropTypes from 'prop-types'
import {
  avatar, replyContainer, header,
  cushion, center, author } from './styles.css'
import { errorMsg, subHeader } from 'sharedStyles/styles.css'
import { formatTimestamp } from 'helpers/utils'
import ImmutablePropTypes from 'react-immutable-proptypes'

Reply.propTypes = {
  comment: ImmutablePropTypes.map.isRequired
}

function Reply ({ comment }) {
  return (
    <div className={replyContainer}>
      <img src={comment.get('avatar')} alt={comment.get('name')} className={avatar} />
      <div>
        <div className={author}>{comment.get('name')}</div>
        <div className={cushion}>{formatTimestamp(comment.get('timestamp'))}</div>
        <div className={cushion}>{comment.get('reply')}</div>
      </div>
    </div>
  )
}

Replies.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  replies: ImmutablePropTypes.map
}

export default function Replies ({isFetching, error, replies}) {
  // const replyIds = Object.keys(replies)
  const [...replyIds] = replies.keys()

  return (
    <div>
      {error &&
        <p className={errorMsg}>{error}</p>}
      {isFetching === true
        ? <p className={subHeader}>{'Fetching Replies'}</p>
        : (
          <div>
            <h1 className={header}>{'Replies'}</h1>
            {replyIds.map((replyId) => (<Reply key={replyId} comment={replies.get(replyId)} />))}
          </div>
        )
      }
      {replyIds.length === 0 &&
        <h3 className={center}>{'Be the first to comment.'}</h3>}
    </div>
  )
}
