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

export function githubGetRepos(
  username: string,
  accessToken?: string | null,
): Promise<GithubStarred[]> {
  return api<GithubStarred[]>(
    `https://api.github.com/users/${username}/starred${
      accessToken ? '?access_token=' + accessToken : ''
    }`,
  )
}

export function githubGetUser(
  username: string,
  accessToken?: string | null,
): Promise<GithubUser> {
  return api<GithubUser>(
    `https://api.github.com/users/${username +
      (accessToken ? '?access_token=' + accessToken : '')}`,
  )
}
