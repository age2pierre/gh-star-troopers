import State, { initialState } from './State'
import Actions from './Actions'
import { ReposInfo } from './models/reposInfo'
import { TrackedUser } from './models/trackedUser'

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
  htmlUrl: 'string',
  avatarUrl: 'string',
  stargazersCount: 42,
  language: 'string',
  description: 'string',
}
const TrackUserA: TrackedUser = {
  username: 'aaa',
  avatarUrl: 'bbb',
}
const TrackUserB: TrackedUser = {
  username: 'ccc',
  avatarUrl: 'ddd',
}

describe('setTracklistError', () => {
  test('set to "error"', () => {
    const state = initialState

    const newState = actions.setTracklistError('error')(state)
    expect(newState.addingUserFailed).toBe('error')
    expect(state).not.toBe(newState)
  })
})

describe('resetTracklistError', () => {
  test('set to false', () => {
    const state = initialState

    const newState = actions.resetTracklistError()(state)
    expect(state).not.toBe(newState)
    expect(newState.addingUserFailed).toBe(false)
  })
})

describe('setValueTracklistInput', () => {
  const state = initialState

  test('with string', () => {
    const newState = actions.setValueTracklistInput('abab')(state)
    expect(state).not.toBe(newState)
    expect(newState.addUserInput).toBe('abab')
  })

  test('with empty string', () => {
    const newState2 = actions.setValueTracklistInput('')(state)
    expect(state).not.toBe(newState2)
    expect(newState2.addUserInput).toBe('')
  })
})

describe('setTrackedUser', () => {
  const state: State = initialState

  test('with flat object', () => {
    const newState: State = actions.setTrackedUser({
      username: 'aaa',
      avatarUrl: 'bbb',
      reposStarred: [],
    })(state)
    expect(state).not.toBe(newState)
    expect(newState.trackedUsers['aaa']).toEqual({
      username: 'aaa',
      avatarUrl: 'bbb',
      reposStarred: [],
    })
  })

  test('with deep object', () => {
    const newState: State = actions.setTrackedUser({
      username: 'aaa',
      avatarUrl: 'bbb',
      reposStarred: [
        {
          owner: 'ccc',
          name: 'ddd',
        },
      ],
    })(state)
    expect(state).not.toBe(newState)
    expect(newState.trackedUsers['aaa']).toEqual({
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

describe('setTrackedRepo', () => {
  const state: State = initialState
  const newState = actions.setTrackedRepos(
    [ReposInfoA, ReposInfoB],
    TrackUserA,
  )(state)

  test('write new repos', () => {
    expect(newState.trackedRepos).toEqual({
      string_string: {
        ...ReposInfoA,
        starredBy: [TrackUserA],
        visible: true,
      },
      owner_repo: {
        ...ReposInfoB,
        starredBy: [TrackUserA],
        visible: true,
      },
    })
  })

  test('update existing repo with new stargazer', () => {
    const newState2 = actions.setTrackedRepos([ReposInfoAprime], TrackUserB)(
      newState,
    )
    expect(newState2.trackedRepos).toEqual({
      string_string: {
        ...ReposInfoAprime,
        starredBy: [TrackUserA, TrackUserB],
        visible: true,
      },
      owner_repo: {
        ...ReposInfoB,
        starredBy: [TrackUserA],
        visible: true,
      },
    })
  })
})
