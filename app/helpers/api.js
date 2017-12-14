import { ref } from 'config/constants'

function saveToDucks (duck) {
  const duckId = ref.child('ducks').push().key
  const duckPromise = ref.child(`ducks/${duckId}`).set({...duck, duckId})

  return {
    duckId,
    duckPromise
  }
}

function saveToUsersDucks (duck, duckId) {
  return ref.child(`usersDucks/${duck.uid}/${duckId}`)
    .set({...duck, duckId})
}

function saveLikeCount (duckId) {
  return ref.child(`likeCount/${duckId}`).set(0)
}

export function saveDuck (duck) {
  const { duckId, duckPromise } = saveToDucks(duck)

  return Promise.all([
    duckPromise,
    saveToUsersDucks(duck, duckId),
    saveLikeCount(duckId)
  ]).then(() => ({...duck, duckId}))
}

export function listenToFeed (cb, errorCb) {
  // .on sets up a socket between firebase and browser (check for changes in firebase)
  ref.child('ducks').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a, b) => {
      return feed[b].timestamp - feed[a].timestamp
    })
    // eslint-disable-next-line standard/no-callback-literal
    cb({feed, sortedIds})
  }, errorCb)
}

export function fetchUsersLikes (uid) {
  // .once = fetch the value once
  return ref.child(`usersLikes/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function saveToUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(true)
}

export function deleteFromUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(null)
}

export function incrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    // .transaction() makes sure if there are simultaneous like all will go through
    .transaction((currentValue = 0) => currentValue + 1)
}

export function decrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue - 1)
}

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function fetchUsersDucks (uid) {
  return ref.child(`usersDucks/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchDuck (duckId) {
  return ref.child(`ducks/${duckId}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchLikeCount (duckId) {
  return ref.child(`likeCount/${duckId}`).once('value')
    .then((snapshot) => snapshot.val() || 0)
}
