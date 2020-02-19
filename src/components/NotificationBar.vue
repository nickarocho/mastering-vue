<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: {
      notification: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        timeout: null
      }
    },
    mounted() {
      // this.notification payload below refers to the props
      this.timeout = setTimeout(() => this.remove(this.notification), 5000)
    },
    beforeDestroy() {
      // future-proofs the timeout in case we add a "dismiss" button
      // prevents memory leak and clears the timer when component is removed from the DOM
      clearTimeout(this.timeout)
    },
    computed: {
      notificationTypeClass() {
        return `-text-${this.notification.type}`
      }
    },
    methods: mapActions('notification', ['remove']) // mapActions('module-name', ['action'])
  }
</script>

<style lang="scss" scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>