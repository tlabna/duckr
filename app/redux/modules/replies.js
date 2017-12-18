import { postReply, fetchReplies } from 'helpers/api'
import { Map, fromJS } from 'immutable'

const FETCHING_REPLIES = 'FETCHING_REPLIES'
const FETCHING_REPLIES_FAILURE = 'FETCHING_REPLIES_FAILURE'
const FETCHING_REPLIES_SUCCESS = 'FETCHING_REPLIES_SUCCESS'
const ADD_REPLY = 'ADD_REPLY'
const ADD_REPLY_FAILURE = 'ADD_REPLY_FAILURE'
const REMOVE_REPLY = 'REMOVE_REPLY'

export function fetchingReplies () {
  return {
    type: FETCHING_REPLIES
  }
}

export function fetchingRepliesFailure (error) {
  console.warn(error)
  return {
    type: FETCHING_REPLIES_FAILURE,
    error: 'Error fetching replies'
  }
}

export function fetchingRepliesSuccess (replies, duckId) {
  return {
    type: FETCHING_REPLIES_SUCCESS,
    replies,
    duckId,
    lastUpdated: Date.now()
  }
}

export function addReply (duckId, reply) {
  return {
    type: ADD_REPLY,
    duckId,
    reply
  }
}

export function addReplyFailure (error) {
  console.warn(error)
  return {
    type: ADD_REPLY_FAILURE,
    error: 'Error adding reply'
  }
}

export function removeReply (replyId) {
  return {
    type: REMOVE_REPLY,
    replyId
  }
}

export function addAndHandleReply (duckId, reply) {
  return function (dispatch) {
    const { replyWithId, replyPromise } = postReply(duckId, reply)

    dispatch(addReply(duckId, replyWithId))
    replyPromise.catch((error) => {
      dispatch(removeReply(duckId, replyWithId.replyId))
      dispatch(addReplyFailure(error))
    })
  }
}

export function fetchAndHandleReplies (duckId) {
  return function (dispatch) {
    dispatch(fetchingReplies())

    fetchReplies(duckId)
      .then((replies) => dispatch(fetchingRepliesSuccess(replies, duckId)))
      .catch((error) => dispatch(fetchingRepliesFailure(error)))
  }
}

const initialStateReply = Map({
  name: '',
  reply: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  replyId: ''
})

function duckReplies (state = initialStateReply, action) {
  switch (action.type) {
    case ADD_REPLY:
      return state.merge({
        [action.reply.replyId]: action.reply
      })
    case REMOVE_REPLY:
      return state.merge({
        [action.reply.replyId]: undefined
      })
    default:
      return state
  }
}

const initialDuckState = fromJS({
  lastUpdated: Date.now(),
  replies: {}
})

function repliesAndLastUpdated (state = initialDuckState, action) {
  switch (action.type) {
    case FETCHING_REPLIES_SUCCESS:
      return state.merge({
        lastUpdated: action.lastUpdated,
        replies: action.replies
      })
    case ADD_REPLY:
    case REMOVE_REPLY:
      return state.merge({
        replies: duckReplies(state.get('replies'), action)
      })
    default:
      return state
  }
}

const initialState = Map({
  isFetching: true,
  error: ''
})

export default function replies (state = initialState, action) {
  switch (action.type) {
    case FETCHING_REPLIES:
      return state.merge({
        isFetching: true
      })
    case FETCHING_REPLIES_FAILURE:
    case ADD_REPLY_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error
      })
    case ADD_REPLY:
    case FETCHING_REPLIES_SUCCESS:
    case REMOVE_REPLY:
      return state.merge({
        isFetching: false,
        error: '',
        [action.duckId]: repliesAndLastUpdated(state.get(action.duckId), action)
      })
    default:
      return state
  }
}
