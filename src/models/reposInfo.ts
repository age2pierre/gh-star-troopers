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
  starredBy: string[]
  visible: boolean
}
