import { GithubStarred } from '../models/githubStarred'
import { GithubUser } from '../models/githubUser'

function api<T>(url: string): Promise<T> {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json() as Promise<T>
  })
}

export function getRepos(username: string): Promise<GithubStarred[]> {
  return api<GithubStarred[]>(
    `https://api.github.com/users/${username}/starred`,
  )
}

export function githubGetUser(username: string): Promise<GithubUser> {
  return api<GithubUser>(`https://api.github.com/users/${username}`)
}
