<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        :options="categories"
        label="Select a category"
        v-model="event.category"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">Category is required.</p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Add a title..."
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">Title is required.</p>
      </template>
      <BaseInput
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add a description..."
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">Description is required.</p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add a location..."
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">Location is required.</p>
      </template>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <DatePicker
          v-model="event.date"
          placeholder="Select a date"
          :input-class="{ error: $v.event.date.$error }"
          @opened="$v.event.date.$touch()"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">Date is required.</p>
      </template>

      <BaseSelect
        :options="times"
        label="Select a time"
        v-model="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">Time is required.</p>
      </template>

      <BaseButton buttonClass="-fill-gradient">
        Submit
      </BaseButton>
    </form>
  </div>
</template>

<script>
import DatePicker from '@hokify/vuejs-datepicker'
import NProgress from 'nprogress'
import { required, email } from 'vuelidate/lib/validators'

  export default {
    components: {
      DatePicker
    },
    data() {
      const times = []
      for (let i = 1; i <= 24; i++) {
        times.push(i + ':00')
      }
      return {
        times,
        categories: this.$store.state.categories,
        event: this.createFreshEvent()
      }
    },
    validations: {
      event: {
        category: { required },
        title: { required, email },
        description: { required },
        location: { required },
        date: { required },
        time: { required }
      }
    },
    methods: {
      createEvent() {
        NProgress.start()
        this.$store.dispatch('event/createEvent', this.event).then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        }).catch(() => {
          NProgress.done()
        })
      },
      createFreshEvent() {
        const user = this.$store.state.user.user
        const id = Math.floor(Math.random() * 10000000)
        return {
          id: id,
          user: user,
          category: '',
          organizer: user,
          title: '',
          description: '',
          location: '',
          date: '',
          time: '',
          attendees: []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
// bringing in DatePicker styles cuz this: https://www.npmjs.com/package/@hokify/vuejs-datepicker#regarding-css
@import "./../../node_modules/@hokify/vuejs-datepicker/dist/vuejs-datepicker.css";
</style>