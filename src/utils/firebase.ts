import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { StargazerInfo } from '../models/stargazerInfo'

const fb = firebase.initializeApp({
  apiKey: 'AIzaSyAwfz5jESTF9W34IHEGNzkUcnwZNXcYaks',
  authDomain: 'ghstartroopers.firebaseapp.com',
  databaseURL: 'https://ghstartroopers.firebaseio.com',
  projectId: 'ghstartroopers',
  storageBucket: 'ghstartroopers.appspot.com',
  messagingSenderId: '179785166792',
})

// ===================== FIRESTORE =====================

const fs = fb.firestore()
fs.settings({ timestampsInSnapshots: true })
const dbUsers = fs.collection('trackedUsers')

export function firebaseGetAllUsers(): Promise<StargazerInfo[]> {
  return dbUsers
    .get()
    .then(qs => qs.docs.map(qds => qds.data() as StargazerInfo))
}

export function firebaseAddUser(user: StargazerInfo): Promise<StargazerInfo> {
  return dbUsers
    .doc(user.username)
    .set(user)
    .then(_ => user)
}

export function firebaseDeleteUser(username: string): Promise<string> {
  return dbUsers
    .doc(username)
    .delete()
    .then(_ => username)
}

// ===================== AUTH =====================

const githubProvider = new firebase.auth.GithubAuthProvider()
const googleProvider = new firebase.auth.GoogleAuthProvider()

export const signInGithub = () =>
  firebase.auth().signInWithPopup(githubProvider)

export const signInGoogle = () =>
  firebase.auth().signInWithPopup(googleProvider)

export const signOut = () => fb.auth().signOut()

export const fbAuth = firebase.auth()
