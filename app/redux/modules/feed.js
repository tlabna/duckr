import { addListener } from 'redux/modules/listeners'
import { listenToFeed } from 'helpers/api'
import { addMultipleDucks } from 'redux/modules/ducks'
import { fromJS } from 'immutable'

const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_FAILURE = 'SETTING_FEED_LISTENER_FAILURE'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const ADD_NEW_DUCK_ID_TO_FEED = 'ADD_NEW_DUCK_ID_TO_FEED'
const RESET_NEW_DUCKS_AVAILABLE = 'RESET_NEW_DUCKS_AVAILABLE'

export function settingFeedListener () {
  return {
    type: SETTING_FEED_LISTENER
  }
}

export function settingFeedListenerFailure (error) {
  console.warn(error)
  return {
    type: SETTING_FEED_LISTENER_FAILURE,
    error: 'Error fetching feeds'
  }
}

export function settingFeedListenerSuccess (duckIds) {
  return {
    type: SETTING_FEED_LISTENER_SUCCESS,
    duckIds
  }
}

export function addNewDuckIdToFeed (duckId) {
  return {
    type: ADD_NEW_DUCK_ID_TO_FEED,
    duckId
  }
}

export function resetNewDucksAvailable () {
  return {
    type: RESET_NEW_DUCKS_AVAILABLE
  }
}

export function setAndHandleFeedListener () {
  return function (dispatch, getState) {
    if (getState().listeners.get('feed') === true) {
      return
    }

    dispatch(addListener('feed'))
    dispatch(settingFeedListener())

    listenToFeed(({feed, sortedIds}, initialFetch) => {
      dispatch(addMultipleDucks(feed))
      initialFetch === true
        ? dispatch(settingFeedListenerSuccess(sortedIds))
        : dispatch(addNewDuckIdToFeed(sortedIds[0]))
    }, (error) => dispatch(settingFeedListenerFailure(error)))
  }
}

const initialState = fromJS({
  newDucksAvailable: false,
  newDucksToAdd: [],
  isFetching: false,
  error: '',
  duckIds: []
})

export default function feed (state = initialState, action) {
  switch (action.type) {
    case SETTING_FEED_LISTENER:
      return state.merge({
        isFetching: true
      })
    case SETTING_FEED_LISTENER_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error
      })
    case SETTING_FEED_LISTENER_SUCCESS:
      return state.merge({
        isFetching: false,
        error: '',
        duckIds: action.duckIds,
        newDucksAvailable: false
      })
    case ADD_NEW_DUCK_ID_TO_FEED:
      return state.merge({
        newDucksToAdd: state.get('newDucksToAdd').unshift(action.duckId), // [action.duckId, ...state.newDucksToAdd]
        newDucksAvailable: true
      })
    case RESET_NEW_DUCKS_AVAILABLE:
      return state.merge({
        duckIds: state.get('newDucksToAdd').concat(state.get('duckIds')), // [...state.newDucksToAdd, ...state.duckIds]
        newDucksToAdd: [],
        newDucksAvailable: false
      })
    default:
      return state
  }
}
