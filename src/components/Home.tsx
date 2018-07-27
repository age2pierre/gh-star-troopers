import { h } from 'hyperapp'
import { State } from '../State'
import Actions from '../Actions'
import { ReposUI } from '../models/reposInfo'
import { OrderByValues } from '../models/filterRepo'
import refresh from '../img/refresh.svg'

const Filters = () => (state: State, actions: Actions) => {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Filter</span>
            </div>
            <input
              type="text"
              class="form-control"
              value={state.filterRepoInput}
              oninput={(e: Event) => {
                actions.homeSetFilter((e.target as HTMLInputElement).value)
              }}
            />
          </div>
        </div>
        <div className="col-3">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text">Order by</label>
            </div>
            <select
              class="custom-select"
              value={state.orderRepoBy}
              onchange={(e: Event) => {
                actions.homeSetOrder((e.target as HTMLSelectElement)
                  .value as OrderByValues)
              }}
            >
              <option value={OrderByValues.APLHA}>A-Z</option>
              <option value={OrderByValues.MOST_STARRED}>Overall stars</option>
              <option value={OrderByValues.MOST_TEAM}>Team stars</option>
            </select>
          </div>
        </div>
        <div className="col-1">
          <button class="btn btn-primary">
            <img width="15" height="15" src={refresh} />
          </button>
        </div>
      </div>
    </li>
  )
}

const Tile = (repo: ReposUI) => (
  <li className="list-group-item" hidden={!repo.visible}>
    <div className="row">
      <div className="col">
        <h3>
          <a href={repo.htmlUrl} target="_blank" class="text-dark">
            <img
              src={repo.avatarUrl}
              height="33"
              width="33"
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
    <p class="mt-2">
      Starred by :
      {repo.starredBy.map(user => (
        <span class="badge badge-pill badge-secondary ml-2">
          {user.username}
        </span>
      ))}
    </p>
  </li>
)

export const Home = () => (state: State, actions: Actions) => {
  return (
    <div className="w-100">
      <h1>Home</h1>
      <ul className="list-group">
        <Filters />
        {state.repos.map(ui => (
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
        ))}
      </ul>
    </div>
  )
}
