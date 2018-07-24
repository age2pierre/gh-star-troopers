export interface TrackedUser {
  username: string
  avatarUrl: string
}

export interface UserUI extends TrackedUser {
  reposStarred: Array<{
    owner: string
    name: string
  }>
}
