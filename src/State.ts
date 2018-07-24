import { ReposUI } from './models/reposInfo'
import { UserUI } from './models/trackedUser'
import { LocationState } from '@hyperapp/router'
import { location } from '@hyperapp/router'

export default interface State {
  location: LocationState
  auth: {
    user: firebase.User | null
    authed: boolean
  }

  trackedUsers: {
    [username: string]: UserUI
  }

  trackedRepos: {
    [reponame: string]: ReposUI
  }

  addingUserFailed: boolean | string
  addUserInput: string
}

export const initialState: State = {
  location: location.state,
  auth: {
    authed: false,
    user: null,
  },

  trackedUsers: {},

  trackedRepos: {},

  addingUserFailed: false,
  addUserInput: '',
}
