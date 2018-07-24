import { h } from 'hyperapp'
import { RenderProps } from '@hyperapp/router'
import { uiConfig, ui } from './utils/auth'

export const SignIn = ({ location, match }: RenderProps<{}>) => {
  return (
    <div oncreate={() => ui.start('#firebaseui-auth-container', uiConfig)}>
      <h1>Welcome !</h1>
      <p>Please use on of the following method to continue :</p>
      <div id="firebaseui-auth-container" />
    </div>
  )
}
