import { ReposInfo, ReposUI } from './models/reposInfo'
import { GithubStarred } from './models/githubStarred'
import { UserUI, TrackedUser } from './models/trackedUser'
import State from './State'
import { location, LocationActions } from '@hyperapp/router'
import { addUser, getAllUsers, deleteUser } from './utils/firebase'
import { api } from './utils/api'
import * as fp from 'lodash/fp'

export default class Actions {
  location: LocationActions = location.actions

  refreshTracklist = () => async (state: State, actions: Actions) => {
    // get users from firebase
    const users = await getAllUsers()
    // get starred repos for each user from github
    users.forEach(async user => {
      const res = await api<GithubStarred[]>(
        `https://api.github.com/users/${user.username}/starred`,
      )
      actions.setTrackedUser({
        username: user.username,
        avatarUrl: user.avatarUrl,
        reposStarred: res.map((ghs: GithubStarred) => ({
          owner: ghs.owner.login,
          name: ghs.name,
        })),
      })
      const repos: ReposInfo[] = res.map((ghs: GithubStarred) => ({
        name: ghs.name,
        ownerName: ghs.owner.login,
        htmlUrl: ghs.html_url,
        avatarUrl: ghs.owner.avatar_url,
        stargazersCount: ghs.stargazers_count,
        language: ghs.language,
        description: ghs.description,
      }))
      actions.setTrackedRepos(repos, user)
    })
  }

  addTrackedUser = () => (state: State, actions: Actions) => {
    addUser(state.addUserInput)
      .then(user => {
        actions.refreshTracklist()
        actions.resetTracklistError()
      })
      .catch(e => actions.setTracklistError(state.addUserInput))
      .finally(() => actions.setValueTracklistInput(''))
  }

  setTrackedUser = (user: UserUI) => (state: State): State =>
    fp.set(`trackedUsers.${user.username}`, user, state)

  setTrackedRepos = (repos: ReposInfo[], stargazer: TrackedUser) => (
    state: State,
  ): State => {
    const updatedTrackedRepos: { [k: string]: ReposUI } = fp.reduce(
      (acc, repo) => {
        const key = repo.ownerName + '_' + fp.replace('.', '_', repo.name)
        if (fp.has(key, acc))
          return fp.set(
            key,
            {
              ...repo,
              starredBy: fp.uniqBy(
                'username',
                fp.concat(acc[key].starredBy, stargazer),
              ),
              visible: true,
            },
            acc,
          )
        else
          return fp.set(
            key,
            { ...repo, starredBy: [stargazer], visible: true },
            acc,
          )
      },
      { ...state.trackedRepos },
      repos,
    )
    return { ...state, trackedRepos: updatedTrackedRepos }
  }

  resetTrackedRepo = () => (state: State): State => ({
    ...state,
    trackedRepos: {},
  })

  deleteTrackedUser = (username: string) => (
    state: State,
    actions: Actions,
  ) => {
    deleteUser(username).then(() => actions.removeTrackedUser(username))
  }

  removeTrackedUser = (username: string) => (state: State): State => {
    const { trackedUsers, ...stateNoChild } = state
    const { [username]: oldVal, ...newTrackedUsers } = trackedUsers
    return { ...stateNoChild, trackedUsers: newTrackedUsers }
  }

  setValueTracklistInput = (val: string) => (state: State): State => ({
    ...state,
    addUserInput: val,
  })

  setTracklistError = (username: string) => (state: State): State => ({
    ...state,
    addingUserFailed: username,
  })

  resetTracklistError = () => (state: State): State => ({
    ...state,
    addingUserFailed: false,
  })

  authUserChanged = (user: firebase.User | null) => (state: State): State => ({
    ...state,
    auth: {
      authed: !!user,
      user: user,
    },
  })
}
