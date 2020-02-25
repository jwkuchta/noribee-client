import React from 'react'
// provides the functions needed to log in/out and determine if user is logged in
import { useAuth0 } from "../auth0"
import { Link } from "react-router-dom"
import '../stylesheets/NavBar.scss'
import 'bulma/css/bulma.css'

export default function NavBar() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <header>
      <nav className="navbar is-dark">
        <div className="container is-fluid">
          <div className="navbar-menu is-active">
            <div className="navbar-brand">
              <button className="navbar-item">My Cool App!</button>
            </div>
            <div className="navbar-end">
              {!isAuthenticated && (<button onClick={loginWithRedirect} className="navbar-item">Login</button>)}
              {isAuthenticated && (
                <>
                  <button className="navbar-item">{user.name} <img src={user.picture} alt="My Avatar" /></button>
                  <button onClick={() => logout({ returnTo: window.location.origin })}className="navbar-item">Logout</button>
                  <button className="navbar-item"><Link to="/">Home</Link>&nbsp;</button>
                  <button className="navbar-item"><Link to="/profile">Profile</Link></button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}