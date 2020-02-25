import React from "react"
import NavBar from "./components/NavBar"
import 'bulma/css/bulma.css'
import { useAuth0 } from "./auth0"
import { Route, Switch, Redirect } from "react-router-dom"
import './App.scss'
// added in Part 2, Step 5 (6?)
import ExternalApi from "./components/ExternalApi"
import Profile from './components/Profile'

function App() {
  const { loading, isAuthenticated } = useAuth0()

  if (loading) {
    return <div>Loading...</div>
  }

  // shorted way to secure the route using a ternary expression. No need for PrivateRoute
  return (
    <div className="App">
      <NavBar /> 
        <div className="hero is-info is-fullheight is-fullwidth">
          <div className="hero-body">
            <div className="container has-text-centered">
                <Switch>
                  <Route path="/" exact />
                  {/* protect your profile route by confirming user is authorized to view it */}
                  {isAuthenticated ? <Route path="/profile" component={Profile} /> : <Redirect to="/" />}
                  {/* added in Part 2, Step 5 (6?) */}
                  {isAuthenticated ? <Route path="/external-api" component={ExternalApi} /> : <Redirect to="/" /> }
                </Switch>
            </div>
          </div>
        </div>
    </div> 
  )
}

export default App