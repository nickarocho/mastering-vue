import axios from 'axios'
import NProgress from 'nprogress'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// APPROACH #1: Axios Interceptors
// use-cases:
//   - on request to set authorization tokens
//   - on response to format or filter data before it reaches into your app
//   - on response to catch 401 not authorized responses
// cons:
//   - not optimal for multiple API calls at the same time
//   - templates get loaded before API call is returned

// when request is about to go out, start the progress bar
// apiClient.interceptors.request.use(config => {
//   NProgress.start()
//   return config
// })
// // when request returns, finish the progress bar
// apiClient.interceptors.response.use(response => {
//   NProgress.done()
//   return response
// })

export default {
  getEvents(perPage, page) {
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
