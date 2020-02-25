
// import { useAuth0 } from "../auth0";
// const { loading, user, getTokenSilently, getIdTokenClaims } = useAuth0();

export const addUserToDB = (user) => {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.jwt}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({user})
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(e => console.log(e))
}

export const parseJwt = token => {
  console.log({"token": token})
  let base64payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  let base64header = token.split('.')[0].replace(/-/g, '+').replace(/_/g, '/')
  let jsonPayload = decodeURIComponent(atob(base64payload).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
  let jsonHeader = decodeURIComponent(atob(base64header).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
  console.log(
    {"payload": JSON.parse(jsonPayload),
    "headers": JSON.parse(jsonHeader)}
  )
  return JSON.parse(jsonPayload);
};



  
