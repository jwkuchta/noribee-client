import React, { useState, Fragment } from "react"
import { useAuth0 } from "../auth0"
// import Loader from './Loader'

const Profile = () => {

  const { loading, getTokenSilently, user } = useAuth0()

  let [ picture, setPicture ] = useState('') // useState() declares a "state variable"

  if (loading || !user) {
    return <div>Loading...</div>
    // return <div><div style={{color: 'blue', fontSize:'18px', width: '800px'}}>Loading...</div><div><Loader /></div></div>
  }

  const handleUser = user => {
    getAndDecodeToken()
    // getFullProfileDEV()
    // getFullProfilePROD()
  }

  const addUserToDB = (user) => {
    fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({user})
    })
    .then(resp => resp.json())
    .catch(e => console.log(e))
  }

  const parseJwt = token => {
    let base64payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    let base64header = token.split('.')[0].replace(/-/g, '+').replace(/_/g, '/')
    let jsonPayload = decodeURIComponent(atob(base64payload).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
    let jsonHeader = decodeURIComponent(atob(base64header).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
    console.log({"token": token, "payload": JSON.parse(jsonPayload),"headers": JSON.parse(jsonHeader)})
    return JSON.parse(jsonPayload);
  }

  const getAndDecodeToken = () => {
    getTokenSilently()
    .then(token => {
      getFullProfileDEV()
      // getFullProfilePROD()
      parseJwt(token)
    })
  }
  
  // this function uses a test token from API Explorer
  const getFullProfileDEV = () => {
    fetch(`https://dev-q3adauy2.auth0.com/api/v2/users/${user.sub}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_TEST_TOKEN}`
      }
    })
    .then(resp => resp.json())
    .then(userData => {
      addUserToDB({
        "sub": user.sub,
        "nickname": user.nickname,
        "email": user.email,
        "name": user.name,
        "picture": user.picture,
        "picture_large": userData['picture_large'],
        "user_id": userData['identities'][0]['user_id'],
        "access_token": userData['identities'][0]['access_token']
      })
      setPicture(userData['picture_large'])
    })
    // .then(getUserFromDb(user))
  }

  // console.log(managementToken)
  
  // this functions gets Access Token from Auth0 Management API programatically
  // const getFullProfilePROD = () => {
  //   fetch(`https://dev-q3adauy2.auth0.com/api/v2/users/${user.sub}`, {
  //     method: 'GET',
  //     headers: {
  //       "Authorization": `Bearer ${managementToken}`
  //     }
  //   })
  //   .then(resp => resp.json())
  //   .then(json => console.log(json))
  //   .then(userData => addUserToDB({
  //     "sub": user.sub,
  //     "nickname": user.nickname,
  //     "email": user.email,
  //     "name": user.name,
  //     "picture": user.picture,
  //     "picture_large": userData['picture_large'],
  //     "user_id": userData['identities'][0]['user_id'],
  //     "access_token": userData['identities'][0]['access_token']
  //   }))
  // }

  return (
    <Fragment>
      <img src={picture} alt="Profile" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {user ? handleUser(user) : null}
    </Fragment>
  )
}

export default Profile