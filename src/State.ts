import { ReposUI } from './models/reposInfo'
import { UserUI } from './models/userInfo'
import { LocationState } from '@hyperapp/router'
import { location } from '@hyperapp/router'
import { OrderByValues } from './models/filterRepo'

export interface State {
  location: LocationState
  auth: {
    user: firebase.User | null
    authed: boolean
  }
  users: UserUI[]
  repos: ReposUI[]
  addingUserFailed: boolean | string
  addUserInput: string
  filterRepoInput: string
  orderRepoBy: OrderByValues
}

export const initialState: State = {
  location: location.state,
  auth: {
    authed: false,
    user: null,
  },
  users: [
    {
      avatarUrl:
        'https://wallpaper.sc/en/ipad/wp-content/uploads/2015/12/ipad-2048x2048-thumbnail_01637-256x256.jpg',
      username: 'age2pierre',
      reposStarred: [
        {
          name: 'awesome-repo',
          owner: 'awesome-dev',
        },
      ],
    },
  ],
  repos: [
    {
      name: 'awesome-repo',
      ownerName: 'awesome-dev',
      htmlUrl: 'https://www.google.com',
      avatarUrl:
        'https://wallpaper.sc/en/ipad/wp-content/uploads/2015/12/ipad-2048x2048-thumbnail_01637-256x256.jpg',
      stargazersCount: 42,
      language: 'Typescript',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus ligula sed risus gravida ullamcorper. Cras non ultrices magna, in condimentum nisl. Mauris tristique purus leo, aliquam massa nunc.',
      visible: true,
      starredBy: [
        {
          avatarUrl:
            'https://wallpaper.sc/en/ipad/wp-content/uploads/2015/12/ipad-2048x2048-thumbnail_01637-256x256.jpg',
          username: 'age2pierre',
        },
      ],
    },
  ],
  addingUserFailed: false,
  addUserInput: '',
  filterRepoInput: '',
  orderRepoBy: OrderByValues.APLHA,
}
