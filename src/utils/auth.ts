import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseui from 'firebaseui'
import { routes } from '../routes'
import { fb } from './firebase'

export const uiConfig: firebaseui.auth.Config = {
  signInSuccessUrl: routes.BASE_URL + routes.HOME,
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  tosUrl: routes.BASE_URL,
  signInFlow: 'redirect',
}

export const ui = new firebaseui.auth.AuthUI(fb.auth())
export const fbAuth = fb.auth()
