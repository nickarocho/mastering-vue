import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Nick Arocho' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    eventsTotal: 0,
    event: {}
  },
  mutations: {
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
  },
  actions: {
    // "commit" comes from the context object
    createEvent({ commit }, event) {
      // send the new event to the mock DB
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    // why is { perPage, page } in brackets?
    // the payload in both Actions and Mutations
    // can be a single variable OR an object
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
    },
    fetchEvent({ commit, getters }, id) { // access our getters
      var event = getters.getEventById(id) // try to find this event

      if (event) {
        commit('SET_EVENT', event) // if we found it, set it
      } else {
        EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
      }
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
