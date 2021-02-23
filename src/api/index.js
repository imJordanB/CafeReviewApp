import { getAuthToken } from '../utilities/async-storage'

const serverUrl = 'http://10.0.2.2:3333/api/1.0.0/'

const get = async (route, contentType = 'application/json') => {
  return await fetch(serverUrl + route, {
    method: 'get',
    headers: {
      'Content-Type': contentType,
      'X-Authorization': await getAuthToken()
    }
  }).catch(err => console.log('Failed GET: ' + err))
}

const post = async (route, requestBody = undefined, contentType = 'application/json') => {
  return await fetch(serverUrl + route, {
    method: 'post',
    headers: {
      'Content-Type': contentType,
      'X-Authorization': await getAuthToken()
    },
    body: requestBody
  }).catch(err => console.log('Failed POST: ' + err))
}

// delete not allowed as variable name
const deleteEndpoint = async (route) => {
  return await fetch(serverUrl + route, {
    method: 'delete',
    headers: {
      'X-Authorization': await getAuthToken()
    }
  }).catch(err => console.log('Failed DELETE: ' + err))
}

const patch = async (route, requestBody, contentType = 'application/json') => {
  return await fetch(serverUrl + route, {
    method: 'patch',
    headers: {
      'Content-Type': contentType,
      'X-Authorization': await getAuthToken()
    },
    body: requestBody
  }).catch(err => console.log('Failed PATCH: ' + err))
}

module.exports = {
  get: get,
  post: post,
  deleteEndpoint: deleteEndpoint,
  patch: patch
}
