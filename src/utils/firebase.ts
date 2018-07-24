import { GithubUser } from '../models/githubUser'
import { TrackedUser } from '../models/trackedUser'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { api } from './api'

export const fb = firebase.initializeApp({
  apiKey: 'AIzaSyAwfz5jESTF9W34IHEGNzkUcnwZNXcYaks',
  authDomain: 'ghstartroopers.firebaseapp.com',
  databaseURL: 'https://ghstartroopers.firebaseio.com',
  projectId: 'ghstartroopers',
  storageBucket: 'ghstartroopers.appspot.com',
  messagingSenderId: '179785166792',
})

const db = fb.firestore()
db.settings({ timestampsInSnapshots: true })

const trackedUsers = db.collection('trackedUsers')

export function getAllUsers(): Promise<TrackedUser[]> {
  return trackedUsers
    .get()
    .then(qs => qs.docs.map(qds => qds.data() as TrackedUser))
}

export function addUser(username: string): Promise<TrackedUser> {
  return new Promise(async (resolve, reject) => {
    try {
      const ghUser = await api<GithubUser>(
        `https://api.github.com/users/${username}`,
      )
      const newUser: TrackedUser = {
        avatarUrl: ghUser.avatar_url,
        username: ghUser.login,
      }
      trackedUsers.doc(username).set(newUser)
      resolve(newUser)
    } catch (error) {
      reject(error)
    }
  })
}

export function deleteUser(username: string): Promise<void> {
  return trackedUsers.doc(username).delete()
}
