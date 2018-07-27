import { ReposUI } from './models/reposInfo'
import { StargazerUI } from './models/stargazerInfo'
import { LocationState } from '@hyperapp/router'
import { location } from '@hyperapp/router'
import { OrderByValues } from './models/filterRepo'

export interface State {
  location: LocationState
  auth: {
    authed: boolean
    username: string | null
    email: string | null
    profilePicUrl: string | null
    githubAccesToken: string | null
  }
  stargazers: StargazerUI[]
  repos: ReposUI[]
  addingUserFailed: boolean | string
  addUserInput: string
  tracklistLoading: boolean
  filterRepoInput: string
  orderRepoBy: OrderByValues
}

export const initialState: State = {
  location: location.state,
  auth: {
    authed: false,
    username: null,
    email: null,
    profilePicUrl: null,
    githubAccesToken: null,
  },
  addingUserFailed: false,
  addUserInput: '',
  tracklistLoading: false,
  stargazers: [],
  repos: [],
  filterRepoInput: '',
  orderRepoBy: OrderByValues.APLHA,
}
