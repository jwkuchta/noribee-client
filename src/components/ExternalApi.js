// src/views/ExternalApi.js

import React, { useState } from "react"
import { useAuth0 } from "../auth0"

const ExternalApi = () => {
  const [showResult, setShowResult] = useState(false)
  const [apiMessage, setApiMessage] = useState("")
  const { getTokenSilently } = useAuth0()

  // const callApi = async () => {
  //   debugger
  //   try {
  //     const token = await getTokenSilently()
  //     debugger
  //     const response = await fetch("/api/external", {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     debugger
  //     const responseData = await response.json()
  //     debugger

  //     setShowResult(true)
  //     debugger
  //     setApiMessage(responseData)
  //     debugger
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

// my attempt to achieve the same call with fetch:
    const callApi = () => {
        const token = getTokenSilently();
        fetch("/api/external", {
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(json => setApiMessage(json))
        .catch(error => console.log(error))
    }

  return (
    <>
      <h1>External API</h1>
      <button onClick={callApi}>Ping API</button>
      {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
    </>
  )
}

export default ExternalApi