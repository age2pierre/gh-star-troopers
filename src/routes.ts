export const routes = {
  BASE_URL:
    process.env.NODE_ENV === 'production'
      ? 'https://ghstartroopers.firebaseapp.com'
      : 'http://localhost:1234',
  HOME: '/home',
  TRACK_LIST: '/tracklist',
  SIGN_IN: '/signin',
  TERM_OF_SERVICE: '/tos',
}
