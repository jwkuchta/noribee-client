import React from "react"
import NavBar from "./components/NavBar"
import 'bulma/css/bulma.css'
import { useAuth0 } from "./auth0"
import { Route, Switch, Redirect } from "react-router-dom"
import Profile from "./components/Profile"
import history from "./utils/history"
import PrivateRoute from "./components/PrivateRoute"
// import Loader from './components/Loader'
import './App.scss'

function App() {
  // const { loading } = useAuth0()
  const { loading, isAuthenticated } = useAuth0()

  if (loading) {
    return <div>Loading...</div>
    // custom Loader:
    // return <div><div style={{color: 'blue', fontSize:'18px', width: '800px'}}>Loading...</div><div><Loader /></div></div>
  }

  // return (
  //   <div className="App">
  //     <NavBar /> 
  //       <div className="hero is-info is-fullheight is-fullwidth">
  //         <div className="hero-body">
  //           <div className="container has-text-centered">
  //               <Switch>
  //                 <Route path="/" exact />
  //                 <PrivateRoute path="/profile" component={Profile} /> 
  //               </Switch>
  //           </div>
  //         </div>
  //       </div>
  //   </div> 
  // )

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
                  {isAuthenticated ? <Route path="/profile" exact /> : <Redirect to="/" />}
                </Switch>
            </div>
          </div>
        </div>
    </div> 
  )
}

export default App