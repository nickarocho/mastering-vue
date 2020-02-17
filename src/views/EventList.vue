<template>
  <div>
    <h1>Events Listing</h1>
    <!-- print out 1 event card per item in the array from state -->
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  created() {
    // 1. call the action
    this.$store.dispatch('fetchEvents')
  },
  // 2. get access to the state using mapState helper
  computed: mapState(['events'])
}
</script>
