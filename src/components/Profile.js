import React, { Fragment } from "react"
import { useAuth0 } from "../auth0"
// import Loader from './Loader'
require("dotenv").config()
var fs = require("file-system")

const Profile = () => {
  const { loading, user, getTokenSilently } = useAuth0()

  if (loading || !user) {
    return <div>Loading...</div>
    // return <div><div style={{color: 'blue', fontSize:'18px', width: '800px'}}>Loading...</div><div><Loader /></div></div>
  }

  const handleUser = user => {
    getAndDecodeToken()
    addUserToDB(user)
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
    // console.log({"token": token})
    let base64payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    let base64header = token.split('.')[0].replace(/-/g, '+').replace(/_/g, '/')
    let jsonPayload = decodeURIComponent(atob(base64payload).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
    let jsonHeader = decodeURIComponent(atob(base64header).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
    // console.log(
    //   {"payload": JSON.parse(jsonPayload),
    //   "headers": JSON.parse(jsonHeader)}
    // )
    return JSON.parse(jsonPayload);
  }

  // const getAndDecodeToken = () => {
  //   getTokenSilently()
  //   .then(token => parseJwt(token))
  // }

  const getAndDecodeToken = () => {
    getTokenSilently()
    .then(token => {
      parseJwt(token)
      getFullProfile(token)
      callRails(token)
    })
  }

  const getFullProfile = token => {
    var request = require("request")

    var options = {
      method: 'GET',
      url: `https://dev-q3adauy2.auth0.com/api/v2/users/${user.sub}`,
      headers: { 
        authorization: `Bearer ${process.env.REACT_APP_TEST_TOKEN}` }
    }

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body)
      // toJsonFile(body)
    })
  }

  // const toJsonFile = clientData => {
  //   let json = fs.writeFileSync("../client-data.json", JSON.stringify(clientData))
  //   console.log(clientData)
  //   return json
  // } 

  const callRails = token => {
    var request = require("request")

    var options = {method: 'GET', url: 'http://localhost:4000/api/private'}

    request(options, function (error, response, body) {
      if (error) throw new Error(error)

      // console.log(body)
    })
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