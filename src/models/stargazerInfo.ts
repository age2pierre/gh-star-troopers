export interface StargazerInfo {
  username: string
  avatarUrl: string
}

export interface Stargazer extends StargazerInfo {
  reposStarred: Array<{
    owner: string
    name: string
  }>
}
