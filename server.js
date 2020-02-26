const express = require("express")
const jwt = require("express-jwt")
const jwksRsa = require("jwks-rsa")

// Create a new Express app
const app = express()

// Set up Auth0 configuration
const authConfig = {
  domain: "dev-q3adauy2.auth0.com",
  audience: "noribee-auth0-api"
}

const randomString = (length) => {
  var charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._'
  let result = ''

  while (length > 0) {
      var bytes = new Uint8Array(16);
      var random = window.crypto.getRandomValues(bytes);

      random.forEach(function(c) {
          if (length === 0) {
              return;
          }
          if (c < charset.length) {
              result += charset[c];
              length--;
          }
      });
  }
  window.localStorage.setItem('nonce', randomString(16))
  return result;
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"],
  nonce: randomString(16),
  response_type: `${config.response_type}`
})

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  })
})

const getFullProfile = token => {
  var request = require("request")

  var options = {
    method: 'GET',
    url: `https://dev-q3adauy2.auth0.com/api/v2/users/${user.sub}`,
    headers: { 
      authorization: `Bearer ${token}`, 
      "domain": "dev-q3adauy2.auth0.com",
      "clientId": "XL7WoCO1is7u6ck22Ca1UUiAf7iCPTwn",
      "audience": "https://dev-q3adauy2.auth0.com/api/v2/",
      "scope": "read:user_idp_tokens",
      "response_type":"id_token token"
    }
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body)
  })
}

// Start the app
app.listen(3001, () => console.log('API listening on 3001'))