<template>
  <div>
    <!-- user.user.name - module.state.prop -->
    <h1>Events for {{ user.user.name }}</h1>
    <!-- print out 1 event card per item in the array from state -->
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">
        Prev Page</router-link>
      <template v-if="hasNextPage"> | </template>
    </template>
    <template v-if="event.eventsTotal > page * 3">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">
        Next Page</router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store/store'

function getPageEvents(routeTo, next) {
  // get the event page #
  const currentPage = parseInt(routeTo.query.page) || 1
  store.dispatch('event/fetchEvents', {
    page: currentPage
  }).then(() => {
    // send the currentPage into the component
    routeTo.params.page = currentPage
    next()
  })
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  // Moving to route guard
  // created() {
  //   this.perPage = 3 // Setting perPage here and not in data means it won't be reactive.
  //   // We don't need it to be reactive, and this way our component has access to it.

  //   // 1. call the action
  //   this.$store.dispatch('event/fetchEvents', {
  //     perPage: this.perPage,
  //     page: this.page
  //   })
  // },
  // 2. get access to the state using mapState helper
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  computed: {
    // removing to put into route guard
    // page() {
    //   // if no URL query parameters, assume the first page
    //   // this.$route.quere.page is found from the URL string (i.e. https://localhost:8080/?page=2)
    //   return parseInt(this.$route.query.page) || 1
    // },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage
    },
    ...mapState(['event', 'user'])
  }
}
</script>
