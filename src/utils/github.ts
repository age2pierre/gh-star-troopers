import { GithubStarred } from '../models/githubStarred'
import { GithubUser } from '../models/githubUser'
import * as fp from 'lodash/fp'

const perPage = 100

function api(url: string): Promise<Response> {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response
  })
}

export async function githubGetRepos(
  username: string,
  accessToken?: string | null,
): Promise<GithubStarred[]> {
  const firstsPage = await api(
    `https://api.github.com/users/${username}/starred?per_page=${perPage}${
      accessToken ? '&access_token=' + accessToken : ''
    }`,
  )
  const regex = /<(.*)page=(\d)>;\W*rel="next".*<.*page=(\d)>;\W*rel="last"/g
  const Link = firstsPage.headers.get('Link')
  const match = regex.exec(Link ? Link : '')
  if (match && match.length >= 4) {
    const next = Number.parseInt(match[2])
    const last = Number.parseInt(match[3]) + 1
    const otherPages = await Promise.all(
      fp
        .range(next, last)
        .map(i =>
          api(
            `https://api.github.com/users/${username}/starred?per_page=${perPage}${
              accessToken ? 'access_token=' + accessToken : ''
            }&page=${i}`,
          ).then(r => r.json() as Promise<GithubStarred[]>),
        ),
    )
    const repofp = await (firstsPage.json() as Promise<GithubStarred[]>)
    return new Promise<GithubStarred[]>(resolve => {
      resolve(fp.flatten([repofp, ...otherPages]))
    })
  } else {
    return firstsPage.json() as Promise<GithubStarred[]>
  }
}

export function githubGetUser(
  username: string,
  accessToken?: string | null,
): Promise<GithubUser> {
  return api(
    `https://api.github.com/users/${username +
      (accessToken ? '?access_token=' + accessToken : '')}`,
  ).then(val => val.json() as Promise<GithubUser>)
}
