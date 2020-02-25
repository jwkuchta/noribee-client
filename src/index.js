import React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { Auth0Provider } from "./auth0"
import config from "./auth_config.json"
import history from "./utils/history"

// A function that routes the user to the right place after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
  )
}

ReactDOM.render(
  <Router history={history}>
    <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    audience={config.audience}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>
  </Router>,
  document.getElementById("root")
)

serviceWorker.unregister()


