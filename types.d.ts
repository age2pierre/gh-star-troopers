declare var process: {
  env: {
    NODE_ENV: string
  }
}

declare module '@hyperapp/logger' {
  export function withLogger<T>(app: T): T
}

declare module 'hyper-app-redux-devtools' {
  export default function devtools<T>(app: T): T
}

// TypeDef from github/m0a/router
declare module '@hyperapp/router' {
  import { VNode } from 'hyperapp'
  /** Link */
  interface LinkProps {
    to: string
    location?: Location
  }
  export function Link(props: LinkProps): VNode<LinkProps>

  /** Route */
  interface Match<P> {
    url: string
    path: string
    isExact: boolean
    params: P
  }
  interface RenderProps<P> {
    location: Location
    match: Match<P>
  }

  interface RouteProps<P> {
    parent?: boolean
    path: string
    location?: Location
    render: (props: RenderProps<P>) => VNode<RenderProps<P>>
  }

  export function Route<P>(
    props: RouteProps<P>
  ): VNode<RenderProps<P>> | undefined

  /**Switch */
  export function Switch<P>(
    props: object,
    children: Array<VNode<RouteProps<P>>>
  ): VNode<object>

  /** Redirect */
  type RedirectProps = LinkProps
  export function Redirect(props: RedirectProps): VNode<RedirectProps>

  /** location */
  interface LocationState {
    pathname: string
    previous: string
  }

  interface LocationActions {
    go: (pathname: string) => void
    set: (data: LocationState) => LocationState
  }
  interface RouterLocation {
    state: LocationState
    actions: LocationActions
    subscribe: (actions: LocationActions) => Function
  }

  export const location: RouterLocation
}
