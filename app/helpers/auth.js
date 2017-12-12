import { ref, firebaseAuth } from 'config/constants'

export function auth () {
  // Will return a promise
  return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
}

export function checkIfAuthed (store) {
  // Ignoring Firebase.
  return store.getState().isAuthed
}

export function logout () {
  return firebaseAuth().signOut()
}

export function saveUser (user) {
  /*
    ref is the root url of Database
    .child() will nest itself to the Database (i.e. nest itself to the root
    of Database)
    ex:
      Duckr
        users
          users.uid1
          user.uid2
          ...
          ... etc
        ducks
   */
  return ref.child(`users/${user.uid}`)
    // .set() save user to location above and it will return a promise
    .set(user)
    .then(() => user) // return user object after saving
}
