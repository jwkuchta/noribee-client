
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
  