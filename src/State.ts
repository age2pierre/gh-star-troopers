import { ReposUI } from './models/reposInfo'
import { Stargazer } from './models/stargazerInfo'
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
  stargazers: Stargazer[]
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
    username: null,
    email: null,
    profilePicUrl: null,
    githubAccesToken: null,
  },
  addingUserFailed: false,
  addUserInput: '',
  stargazers: [
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
  filterRepoInput: '',
  orderRepoBy: OrderByValues.APLHA,
}
