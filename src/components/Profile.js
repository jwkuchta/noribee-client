import React, { Fragment } from "react"
import { useAuth0 } from "../auth0"
import { addUserToDB, parseJwt } from './functions'
// import Loader from './Loader'

const Profile = () => {
  const { loading, user, getTokenSilently } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>
    // return <div><div style={{color: 'blue', fontSize:'18px', width: '800px'}}>Loading...</div><div><Loader /></div></div>
  }

  const handleUser = user => {
    getAndDecodeToken()
    addUserToDB(user)
  }

  const getAndDecodeToken = () => {
    getTokenSilently()
    .then(token => parseJwt(token))
  }

  return (
    <Fragment>
      <img src={user.picture} alt="Profile" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {user ? handleUser(user) : null}
    </Fragment>
  )
}

export default Profile