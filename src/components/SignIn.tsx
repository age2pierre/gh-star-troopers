import { h } from 'hyperapp'
import { State } from '../State'
import Actions from '../Actions'
import { signInGithub, signInGoogle } from '../utils/firebase'
import googleLogo from '../img/google-logo.svg'
import githubLogo from '../img/github-logo.svg'

export const SignIn = () => (state: State, actions: Actions) => (
  <div>
    <h1>Welcome !</h1>
    <p>Please use one of the sign in method below to acces the app.</p>
    <p>
      Prefered method is by using Github as it allow you higher rate limit to
      their API.
    </p>
    <p class="text-center">
      <button
        class="btn btn-dark"
        onclick={() =>
          signInGithub().then(userCred => actions.setGithubAccesToken(userCred))
        }
      >
        <img class="mr-2" width="15" height="15" src={githubLogo} />Sign In with
        Github
      </button>
      <br />
      <button class="btn btn-primary mt-4" onclick={signInGoogle}>
        <img class="mr-2" width="15" height="15" src={googleLogo} />Sign In with
        Google
      </button>
    </p>
  </div>
)
