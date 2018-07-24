import { h } from 'hyperapp'
import State from './State'
import Actions from './Actions'
import { ReposUI } from './models/reposInfo'

const Tile = (repo: ReposUI) => (
  <li className="list-group-item" hidden={!repo.visible}>
    <div className="row">
      <div className="col">
        <h3>
          <a href={repo.htmlUrl} target="_blank" class="text-dark">
            <img
              src={repo.avatarUrl}
              style={{
                height: '33px',
                width: '33px',
              }}
              className="rounded-circle m-2 shadow-sm"
            />
            {repo.name}
          </a>
          <small class="text-muted ml-2">{`by ${repo.ownerName}`}</small>
        </h3>
      </div>
      <div className="col-sm-auto">
        <span class="badge badge-pill badge-info mr-2">{repo.language}</span>
        <span class="badge badge-pill badge-secondary">{`★ ${
          repo.stargazersCount
        }`}</span>
      </div>
    </div>
    <i>{repo.description}</i>
    {/* {repo.starredBy.map(user => (
  <span class="badge badge-pill badge-secondary ml-2">
    {user.username}
  </span>
))} */}
  </li>
)

export const Home = () => (state: State, actions: Actions) => {
  return (
    <div className="w-100">
      <h1>Home</h1>
      <ul className="list-group">
        {Object.keys(state.trackedRepos).map(key => {
          const ui = state.trackedRepos[key]
          return (
            <Tile
              avatarUrl={ui.avatarUrl}
              description={ui.description}
              htmlUrl={ui.htmlUrl}
              language={ui.language}
              name={ui.name}
              ownerName={ui.ownerName}
              stargazersCount={ui.stargazersCount}
              starredBy={ui.starredBy}
              visible={ui.visible}
            />
          )
        })}
      </ul>
    </div>
  )
}
