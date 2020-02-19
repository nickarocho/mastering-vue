import Vue from 'vue'
import Vuex from 'vuex'
// the * imports all public items into the user namespace
// meaning the value of 'user.state' will equal the value of
// the const which is exported
import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/event.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  }
})
