import { UserInfo } from './userInfo'

export interface ReposInfo {
  name: string
  ownerName: string
  htmlUrl: string
  avatarUrl: string
  stargazersCount: number
  language: string
  description: string
}

export interface ReposUI extends ReposInfo {
  starredBy: UserInfo[]
  visible: boolean
}
