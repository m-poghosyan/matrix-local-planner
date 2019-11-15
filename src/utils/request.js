import { fetch } from 'whatwg-fetch'async function fetchToken(url, { username, password }) {  const basicAuthToken = `Basic ${btoa(`${username}:${password}`)}`  const response = await fetch(url, {    headers: {      Authorization: basicAuthToken,      'X-CSRF-Token': 'Fetch',    },  })  console.log(response)  return response.headers.get('x-csrf-token')}const request = async ({  url,  baseUrl,  method,  body,  headers,  credentials,  json = true,  csrf = false,  requireAuth = false,  auth,}) => {  const options = {    method,    body,    credentials,    headers: { ...headers },  }  if (json) {    options.headers.accept = 'application/json'  }  if (auth) {    const { username, password } = auth    const basicAuthToken = `Basic ${btoa(`${username}:${password}`)}`    if (requireAuth) {      options.headers.Authorization = basicAuthToken    }    if (csrf) {      const csrfToken = await fetchToken(baseUrl, auth)      options.headers['X-CSRF-Token'] = csrfToken      console.log(csrfToken)      // options.headers['X-CSRF-Token'] = 'ivoJF3NXO-PTmF61IOh_hw=='    }    // Default Headers    // options.headers['X-Requested-With'] = 'X'  }  return fetch(url, options)    .then(response => {      if (response.OK || response.ok) {        return json ? response.json() : response      }      console.log('Fetch Error: ', response)    })    .then(data => data)    .catch(error => console.log(error))}export default request