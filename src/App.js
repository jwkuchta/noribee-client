import React from "react"
import NavBar from "./components/NavBar"
import 'bulma/css/bulma.css'
import { useAuth0 } from "./react-auth0-spa"
import { Router, Route, Switch } from "react-router-dom"
import Profile from "./components/Profile"
import history from "./utils/history"
import PrivateRoute from "./components/PrivateRoute"
import Loader from './components/Loader'
import './App.scss'

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>
    // return <div><div style={{color: 'blue', fontSize:'18px', width: '800px'}}>Loading...</div><div><Loader /></div></div>
  }

  return (
    <div className="App">
      
      <Router history={history}>
      <NavBar /> 
        <div className="hero is-info is-fullheight is-fullwidth">
          <div className="hero-body">
            <div className="container has-text-centered">
                <Switch>
                  <Route path="/" exact />
                  <PrivateRoute path="/profile" component={Profile} /> 
                </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div> 
  )
}

export default App;