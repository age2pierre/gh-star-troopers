import firebase from 'firebase/app'
import 'firebase/firestore'
import { UserInfo } from '../models/userInfo'

export const fb = firebase.initializeApp({
  apiKey: 'AIzaSyAwfz5jESTF9W34IHEGNzkUcnwZNXcYaks',
  authDomain: 'ghstartroopers.firebaseapp.com',
  databaseURL: 'https://ghstartroopers.firebaseio.com',
  projectId: 'ghstartroopers',
  storageBucket: 'ghstartroopers.appspot.com',
  messagingSenderId: '179785166792',
})

const fs = fb.firestore()
fs.settings({ timestampsInSnapshots: true })
const dbUsers = fs.collection('trackedUsers')

export function firebaseGetAllUsers(): Promise<UserInfo[]> {
  return dbUsers.get().then(qs => qs.docs.map(qds => qds.data() as UserInfo))
}

export function firebaseAddUser(user: UserInfo): Promise<UserInfo> {
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
