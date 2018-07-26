import { ReposInfo, ReposUI } from './models/reposInfo'
import { UserUI, UserInfo } from './models/userInfo'
import { State } from './State'
import { location, LocationActions } from '@hyperapp/router'
import * as fp from 'lodash/fp'
import { OrderByValues } from './models/filterRepo'

export default class Actions {
  // ===================== HOME =====================

  homeAddRepos = (repos: ReposInfo[], stargazer: UserInfo) => (
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

  tracklistAddUser = (user: UserUI) => (state: State): State =>
    fp.findIndex(oldUser => oldUser.username === user.username, state.users) > 0
      ? state
      : { ...state, users: fp.concat(state.users, user) }

  tracklistRemoveUser = (username: string) => (state: State): State => {
    return {
      ...state,
      users: fp.remove(user => user.username === username, state.users),
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
      user: user,
    },
  })

  // ===================== ROUTER =====================

  location: LocationActions = location.actions
}
