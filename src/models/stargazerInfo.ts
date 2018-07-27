export interface StargazerInfo {
  username: string
  avatarUrl: string
}

export interface StargazerUI extends StargazerInfo {
  reposStarred: Array<{
    owner: string
    name: string
  }>
}
