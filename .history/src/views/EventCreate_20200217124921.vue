<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}.</p>
    <p>there are {{ catLength }} categories</p>
    <p>{{ getEventById(1) }}</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

  export default {
    computed: {
      // Importing getters manually
      // catLength() {
      //   return this.$store.getters.catLength
      // },
      // getEvent() {
      //   return this.$store.getters.getEventById
      // },
      ...mapGetters(['catLength', 'getEventById']),
      ...mapState(['user', 'categories'])
    }
  }
</script>

<style lang="scss" scoped>

</style>