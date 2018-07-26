import { ReposInfo, ReposUI } from './models/reposInfo'
import { Stargazer, StargazerInfo } from './models/stargazerInfo'
import { State } from './State'
import { location, LocationActions } from '@hyperapp/router'
import * as fp from 'lodash/fp'
import { OrderByValues } from './models/filterRepo'

export default class Actions {
  // ===================== HOME =====================

  homeAddRepos = (repos: ReposInfo[], stargazer: StargazerInfo) => (
    state: State,
  ): State => {
    return {
      ...state,
      repos: fp.reduce(
        (acc, val) => {
          const index = acc.findIndex(e => val.htmlUrl === e.htmlUrl)
          if (index < 0) {
            acc.push({ ...val, starredBy: [stargazer], visible: true })
          } else {
            acc[index].stargazersCount = val.stargazersCount
            acc[index].starredBy.push(stargazer)
            acc[index].starredBy = fp.uniqWith(fp.isEqual, acc[index].starredBy)
          }
          return [...acc]
        },
        [...state.repos],
        repos,
      ),
    }
  }

  homeRemoveAllRepos = () => (state: State): State => ({
    ...state,
    repos: [],
  })

  homeSetFilter = (val: string) => (state: State): State => {
    const escapedVal = fp.escapeRegExp(val)
    const regexp = new RegExp(escapedVal, 'i')
    return {
      ...state,
      repos: state.repos.map(repo => ({
        ...repo,
        visible:
          regexp.test(repo.description) ||
          regexp.test(repo.name) ||
          regexp.test(repo.ownerName),
      })),
      filterRepoInput: val,
    }
  }

  homeSetOrder = (val: OrderByValues) => (state: State): State => {
    let comp: (a: ReposUI, b: ReposUI) => number = (a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    switch (val) {
      case OrderByValues.APLHA:
        break
      case OrderByValues.MOST_STARRED:
        comp = (a, b) =>
          a.stargazersCount > b.stargazersCount
            ? 1
            : b.stargazersCount > a.stargazersCount
              ? -1
              : 0
        break
      case OrderByValues.MOST_TEAM:
        comp = (a, b) =>
          a.starredBy.length > b.starredBy.length
            ? 1
            : b.starredBy.length > a.starredBy.length
              ? -1
              : 0
        break
    }
    return {
      ...state,
      repos: [...state.repos].sort(comp),
      orderRepoBy: val,
    }
  }

  // ===================== TRACKLIST =====================

  tracklistAddUser = (stargazer: Stargazer) => (state: State): State =>
    fp.findIndex(
      oldUser => oldUser.username === stargazer.username,
      state.stargazers,
    ) > 0
      ? state
      : { ...state, stargazers: fp.concat(state.stargazers, stargazer) }

  tracklistRemoveUser = (username: string) => (state: State): State => {
    return {
      ...state,
      stargazers: fp.remove(
        user => user.username === username,
        state.stargazers,
      ),
    }
  }

  tracklistSetInputValue = (val: string) => (state: State): State => ({
    ...state,
    addUserInput: val,
  })

  tracklistSetError = (username: string) => (state: State): State => ({
    ...state,
    addingUserFailed: username,
  })

  tracklistResetError = () => (state: State): Partial<State> => ({
    addingUserFailed: false,
  })

  // ===================== AUTH =====================

  authUserChanged = (user: firebase.User | null) => (state: State): State => ({
    ...state,
    auth: {
      authed: !!user,
      email: user ? user.email : null,
      githubAccesToken: user ? state.auth.githubAccesToken : null, // user is only null when signout
      profilePicUrl: user ? user.photoURL : null,
      username: user ? user.displayName : null,
    },
  })

  setGithubAccesToken = (userCred: firebase.auth.UserCredential) => (
    state: State,
  ): State => {
    console.log('usercred => ' + JSON.stringify(userCred))
    return {
      ...state,
      auth: {
        ...state.auth,
        githubAccesToken: (userCred.credential as any).accessToken,
      },
    }
  }

  // ===================== ROUTER =====================

  location: LocationActions = location.actions
}
