
import React, { useContext } from 'react' // <-- updated
import 'bulma/css/bulma.css'
// import { Auth0Context } from './contexts/auth0-context'; // <-- new
import { useAuth0 } from './contexts/auth0-context'
import Header from './components/Header'

function App() {
  // const auth0 = useContext(Auth0Context);
  const { isLoading, user, loginWithRedirect, logout } = useAuth0() // <-- updated
  // to add conditional rendering of the login button

  return (
    <>
    <Header />
    <div className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
        {!isLoading && !user && (
            <>
              <h1>Click Below!</h1>
              <button onClick={loginWithRedirect} className="button is-danger">
                Login
              </button>
            </>
        )}
        {!isLoading && user && (
            <>
              <h1>You are logged in!</h1>
              <p>Hello {user.name}</p>

              {user.picture && <img src={user.picture} alt="My Avatar" />} <br></br>
              {console.log(user)}
              <button 
              onClick={() => logout({ returnTo: window.location.origin })} 
              className="button is-small is-dark"
              >
              Logout
              </button>
            </>
        )}
        </div>
      </div>
    </div>
    </>
  )
}

export default App;

// we could use isLoading or isAuthenticated on line 15, they are both pulled from context
