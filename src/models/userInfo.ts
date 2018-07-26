export interface UserInfo {
  username: string
  avatarUrl: string
}

export interface UserUI extends UserInfo {
  reposStarred: Array<{
    owner: string
    name: string
  }>
}
