import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCAN9z3I1JpVkVeYhwk4-yK_VkeGgraZIQ',
  authDomain: 'duckr-wb.firebaseapp.com',
  databaseURL: 'https://duckr-wb.firebaseio.com',
  projectId: 'duckr-wb',
  storageBucket: 'duckr-wb.appspot.com',
  messagingSenderId: '193077139525'
}

firebase.initializeApp(config)

// ref - to interact with database
export const ref = firebase.database().ref()
// firebaseAuth - to interact with authentication
export const firebaseAuth = firebase.auth

export const usersDucksExpirationLength = 100000
export const userExpirationLength = 100000
export const repliesExpirationLength = 300000
