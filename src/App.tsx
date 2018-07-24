import { h } from 'hyperapp'
import Actions from './Actions'
import State from './State'
import { Link, Route, Redirect, Switch } from '@hyperapp/router'
import { Home } from './Home'
import { Tracklist } from './TrackList'
import { SignIn } from './SignIn'
import { fbAuth } from './utils/auth'
import { routes } from './routes'

const navItemClass = (path: string, state: State) => {
  if (path === state.location.pathname) return 'nav-item active'
  else return 'nav-item'
}

export default (state: State, actions: Actions) => (
  <div class="w-auto" oncreate={() => actions.refreshTracklist()}>
    <nav class="navbar navbar-expand bg-dark navbar-dark fixed-top">
      <span className="navbar-brand">GH Star Troopers</span>
      <ul class="navbar-nav col">
        <li class={navItemClass(routes.HOME, state)}>
          <Link to={routes.HOME}>
            <span class="nav-link">Home</span>
          </Link>
        </li>
        <li class={navItemClass(routes.TRACK_LIST, state)}>
          <Link to={routes.TRACK_LIST}>
            <span class="nav-link">Tracklist</span>
          </Link>
        </li>
      </ul>
      <div className="col-sm-auto">
        <span class="text-light mr-2">
          {!!state.auth.user ? state.auth.user.displayName : ''}
        </span>
        <button
          onclick={() => fbAuth.signOut()}
          class={'btn btn-secondary' + (state.auth.authed ? '' : ' disabled')}
        >
          {!!state.auth.user ? 'Sign out' : 'NOT LOGGED IN!'}
        </button>
      </div>
    </nav>
    <div class="container">
      <div class="jumbotron">
        <Switch>
          <Route path="/" render={() => <Redirect to={routes.HOME} />} />
          <Route path={routes.SIGN_IN} render={SignIn} />
          <Route
            path={routes.HOME}
            render={() =>
              state.auth.authed ? <Home /> : <Redirect to={routes.SIGN_IN} />
            }
          />
          <Route
            path={routes.TRACK_LIST}
            render={() =>
              state.auth.authed ? (
                <Tracklist />
              ) : (
                <Redirect to={routes.SIGN_IN} />
              )
            }
          />
        </Switch>
      </div>
    </div>
  </div>
)
