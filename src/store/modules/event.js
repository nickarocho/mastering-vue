import EventService from '@/services/EventService.js'

// ensures all Mutations, Actions, and Getters will be namespaced under 'event'
export const namespaced = true

export const state = {
  event: {},
  events: [],
  eventsTotal: 0
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
      const notification = {
        type: 'success',
        message: 'Your event has been created!'
      }
      //module, payload,
      // 3rd param: allows dispatcher to go to the root state ($store), find the
      // 'notification' module, and run the 'add' action
      dispatch('notification/add', notification, { root: true })
    }).catch(error => {
      const notification = {
        type: 'error',
        message: `There was a problem creating your event: ${error.message}`
      }
      //module, payload,
      // 3rd param: allows dispatcher to go to the root state ($store), find the
      // 'notification' module, and run the 'add' action
      dispatch('notification/add', notification, { root: true })
      throw error
    })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit(
          'SET_EVENTS_TOTAL',
          parseInt(response.headers['x-total-count'])
        )
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: `There was a problem fetching events: ${error.message}`
        }
        //module, payload,
        // 3rd param: allows dispatcher to go to the root state ($store), find the
        // 'notification' module, and run the 'add' action
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    var event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      // needs 'return' to actually return a promise, so `then()` will work
      return EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
          return response.data
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: `There was a problem fetching event: ${error.message}`
          }
          //module, payload,
          // 3rd param: allows dispatcher to go to the root state ($store), find the
          // 'notification' module, and run the 'add' action
          dispatch('notification/add', notification, { root: true })
        })
    }
  }
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}