import React, { Component, createContext, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'

// create the context
export const Auth0Context = createContext()

// export the context as useAuth0
export const useAuth0 = () => useContext(Auth0Context); // <-- new
// We have added useContext and then used it directly in this file. 
// Now we don't have to useContext() in our other components.
// by adding import { useAuth0 } from './contexts/auth0-context' in App.js

// create a provider
export class Auth0Provider extends Component {
  
  state = {
    auth0Client: null,
    isLoading: true, // <-- new
    isAuthenticated: false, // <-- new
    user: null // <-- new
  };
  config = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirect_uri: window.location.origin
  }

  componentDidMount() {
    this.initializeAuth0()
  }

  // initialize the auth0 library
  // initializeAuth0 = async () => {
  //   const auth0Client = await createAuth0Client(this.config);
  //   const isAuthenticated = await auth0Client.isAuthenticated() // <-- new
  //   const user = isAuthenticated ? await auth0Client.getUser() : null // <-- new
  //   this.setState({ auth0Client, isLoading: false, isAuthenticated, user }) // <-- updated
  // }

  initializeAuth0 = async () => {
    const auth0Client = await createAuth0Client(this.config);
    this.setState({ auth0Client });

    // check to see if they have been redirected after login
    if (window.location.search.includes('code=')) {
      return this.handleRedirectCallback();
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser() : null;
    this.setState({ isLoading: false, isAuthenticated, user });
  }

  handleRedirectCallback = async () => {
    this.setState({ isLoading: true })

    await this.state.auth0Client.handleRedirectCallback()
    const user = await this.state.auth0Client.getUser()

    this.setState({ user, isAuthenticated: true, isLoading: false })
    window.history.replaceState({}, document.title, window.location.pathname)
    // removes it from the URL to prevent handleRedirectCallback() from running again if user refreshes the page
  }

  render() {
    const { isLoading, isAuthenticated, user, auth0Client } = this.state; // <-- updated
    const { children } = this.props;

    const configObject = { 
      isLoading, 
      isAuthenticated, 
      user,
      loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p), // method provided by Auth0 SPA SDK
      getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
      getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
      logout: (...p) => auth0Client.logout(...p)
    }

    return (
      <Auth0Context.Provider value={configObject}>
        {children}
      </Auth0Context.Provider>
    )
  }
}