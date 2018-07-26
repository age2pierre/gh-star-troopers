import { State, initialState } from './State'
import Actions from './Actions'
import { ReposInfo } from './models/reposInfo'
import { UserInfo } from './models/userInfo'

const actions = new Actions()
const ReposInfoA: ReposInfo = {
  name: 'string',
  ownerName: 'string',
  htmlUrl: 'string',
  avatarUrl: 'string',
  stargazersCount: 42,
  language: 'string',
  description: 'string',
}
const ReposInfoAprime: ReposInfo = { ...ReposInfoA, stargazersCount: 43 }
const ReposInfoB: ReposInfo = {
  name: 'repo',
  ownerName: 'owner',
  htmlUrl: 'stringB',
  avatarUrl: 'stringB',
  stargazersCount: 42,
  language: 'stringB',
  description: 'stringB',
}
const TrackUserA: UserInfo = {
  username: 'aaa',
  avatarUrl: 'bbb',
}
const TrackUserB: UserInfo = {
  username: 'ccc',
  avatarUrl: 'ddd',
}

describe('tracklistSetError', () => {
  test('set to "error"', () => {
    const state = initialState

    const newState = actions.tracklistSetError('error')(state)
    expect(newState.addingUserFailed).toBe('error')
    expect(state).not.toBe(newState)
  })
})

describe('tracklistResetError', () => {
  test('set to false', () => {
    const state = initialState

    const newState = actions.tracklistResetError()(state)
    expect(state).not.toBe(newState)
    expect(newState.addingUserFailed).toBe(false)
  })
})

describe('tracklistSetInputValue', () => {
  const state = initialState

  test('with string', () => {
    const newState = actions.tracklistSetInputValue('abab')(state)
    expect(state).not.toBe(newState)
    expect(newState.addUserInput).toBe('abab')
  })

  test('with empty string', () => {
    const newState2 = actions.tracklistSetInputValue('')(state)
    expect(state).not.toBe(newState2)
    expect(newState2.addUserInput).toBe('')
  })
})

describe('tracklistAddUser', () => {
  const state: State = initialState

  test('with flat object', () => {
    const newState: State = actions.tracklistAddUser({
      username: 'aaa',
      avatarUrl: 'bbb',
      reposStarred: [],
    })(state)
    expect(state).not.toBe(newState)
    expect(newState.users).toContainEqual({
      username: 'aaa',
      avatarUrl: 'bbb',
      reposStarred: [],
    })
  })

  test('with deep object', () => {
    const state2: State = actions.tracklistAddUser({
      username: 'aaa',
      avatarUrl: 'bbb',
      reposStarred: [
        {
          owner: 'ccc',
          name: 'ddd',
        },
      ],
    })(state)
    expect(state).not.toBe(state2)
    expect(state2.users).toContainEqual({
      username: 'aaa',
      avatarUrl: 'bbb',
      reposStarred: [
        {
          owner: 'ccc',
          name: 'ddd',
        },
      ],
    })
  })
})

describe('homeAddRepos', () => {
  const state: State = initialState
  const state1 = actions.homeAddRepos([ReposInfoA, ReposInfoB], TrackUserA)(
    state,
  )

  test('write new repos', () => {
    expect(state1).not.toBe(state)
    expect(state1.repos).toHaveLength(2)
    expect(state1.repos).toContainEqual({
      ...ReposInfoA,
      starredBy: [TrackUserA],
      visible: true,
    })
    expect(state1.repos).toContainEqual({
      ...ReposInfoB,
      starredBy: [TrackUserA],
      visible: true,
    })
  })

  test('update existing repo with new stargazer', () => {
    const state2 = actions.homeAddRepos([ReposInfoAprime], TrackUserB)(state1)
    expect(state2.repos).toHaveLength(2)
    expect(state2.repos).toContainEqual({
      ...ReposInfoAprime,
      starredBy: [TrackUserA, TrackUserB],
      visible: true,
    })
    expect(state2.repos).toContainEqual({
      ...ReposInfoB,
      starredBy: [TrackUserA],
      visible: true,
    })
  })
})
