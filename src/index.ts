import { location } from '@hyperapp/router'
import { app } from 'hyperapp'
import Actions from './Actions'
import App from './components/App'
import { initialState } from './State'
import devtools from 'hyperapp-redux-devtools'
import { fbAuth } from './utils/firebase'

let main: Actions

if (process.env.NODE_ENV === 'production')
  main = app(initialState, new Actions(), App, document.body)
else main = devtools(app)(initialState, new Actions(), App, document.body)

location.subscribe(main.location)
fbAuth.onAuthStateChanged(main.authUserChanged)
