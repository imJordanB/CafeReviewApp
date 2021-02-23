import { getAuthToken } from '../utilities/async-storage'

const serverUrl = 'http://10.0.2.2:3333/api/1.0.0/'

const get = async (route, contentType = 'application/json') => {
  return await fetch(serverUrl + route, {
    method: 'get',
    headers: {
      'Content-Type': contentType,
      'X-Authorization': await getAuthToken()
    }
  })
}

const post = async (route, requestBody = undefined, contentType = 'application/json') => {
  return await fetch(serverUrl + route, {
    method: 'post',
    headers: {
      'Content-Type': contentType,
      'X-Authorization': await getAuthToken()
    },
    body: requestBody
  })
}

module.exports = {
  get: get,
  post: post
}
