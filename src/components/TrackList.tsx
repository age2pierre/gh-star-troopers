import { h } from 'hyperapp'
import Actions from '../Actions'
import { State } from '../State'

export const Tracklist = () => (state: State, actions: Actions) => {
  return (
    <div class="w-100">
      <h1>Tracklist</h1>
      <ul class="list-group" oncreate={actions.handleStartApp}>
        <InputBar />
        {state.stargazers.map(user => (
          <li class="list-group-item">
            <div className="media">
              <img
                src={user.avatarUrl}
                style={{
                  height: '64px',
                  width: '64px',
                }}
                class="mr-3 rounded-circle shadow"
              />
              <div className="media-body">
                <div className="row">
                  <div className="col">
                    <h3>{user.username}</h3>
                  </div>
                  <div className="col text-right">
                    <button
                      class="btn btn-sm btn-danger"
                      onclick={() => actions.handleDeleteStargazer(user)}
                    >
                      <span class="close text-white"> &times;</span>
                    </button>
                  </div>
                </div>
                <p>Starred {user.reposStarred.length} repos</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const InputBar = () => (state: State, actions: Actions) => {
  return (
    <li class="list-group-item">
      {state.addingUserFailed === false ? (
        <span />
      ) : (
        <div
          class="alert alert-danger"
          role="alert"
          textContent={`An error occured, impossible to add ${
            state.addingUserFailed
          } to the tracklist, please verify the spelling !`}
        />
      )}
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon3">
            Github username
          </span>
        </div>
        <input
          type="text"
          class="form-control"
          value={state.addUserInput}
          oninput={(e: Event) => {
            actions.tracklistSetInputValue((e.target as HTMLInputElement).value)
          }}
          onkeyup={(e: KeyboardEvent) => {
            if (e.code === 'Enter') actions.handleAddStargazer()
          }}
        />
        <div class="input-group-append">
          <button
            class="btn btn-primary"
            type="button"
            onclick={(e: MouseEvent) => actions.handleAddStargazer()}
          >
            + Add
          </button>
        </div>
      </div>
      {state.tracklistLoading ? <div class="spinner mx-auto" /> : <span />}
    </li>
  )
}
