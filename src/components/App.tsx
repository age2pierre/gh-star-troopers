import { h } from 'hyperapp'
import Actions from '../Actions'
import { State } from '../State'
import { Link, Route, Redirect, Switch } from '@hyperapp/router'
import { Home } from './Home'
import { Tracklist } from './TrackList'
import { SignIn } from './SignIn'
import { routes } from '../routes'
import { signOut } from '../utils/firebase'
import ctLogo from '../img/ct-logo.png'

export default (state: State, actions: Actions) => (
  <div class="w-auto">
    <nav class="navbar navbar-expand bg-dark navbar-dark fixed-top">
      <span className="navbar-brand">
        <img class="mr-2" width="24" height="24" src={ctLogo} />GH Star Troopers
      </span>
      <ul class="navbar-nav col">
        <li
          class={
            state.location.pathname === routes.HOME
              ? 'nav-item active'
              : 'nav-item'
          }
        >
          <Link to={routes.HOME} class="nav-link">
            Home
          </Link>
        </li>
        <li
          class={
            state.location.pathname === routes.TRACK_LIST
              ? 'nav-item active'
              : 'nav-item'
          }
        >
          <Link to={routes.TRACK_LIST} class="nav-link">
            Tracklist
          </Link>
        </li>
      </ul>
      <div className="col-sm-auto">
        <span class="text-light mr-2">
          {!!state.auth.authed
            ? state.auth.username
              ? state.auth.username
              : state.auth.email
            : ''}
        </span>
        <button
          onclick={signOut}
          class={'btn btn-secondary' + (state.auth.authed ? '' : ' disabled')}
        >
          {state.auth.authed ? 'Sign out' : 'NOT LOGGED IN!'}
        </button>
      </div>
    </nav>
    <div class="container">
      <div class="jumbotron">
        <Switch>
          <Route path="/" render={() => <Redirect to={routes.HOME} />} />
          <Route path={routes.SIGN_IN} render={SignIn as any} />
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
