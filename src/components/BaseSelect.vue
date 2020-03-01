<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select :value="value" @change="updateValue" v-bind="$attrs" v-on="listeners">
      <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="option === value"
        v-on="listeners"
      >{{ option }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      options: {
        type: Array,
        required: true
      },
      label: {
        type: String,
        default: ''
      },
      value: [String, Number]
    },
    computed: {
      listeners() {
         return {
           ...this.$listeners,
           input: this.updateValue
         }
      }
    },
    methods: {
      updateValue(event) {
        console.log(this.$listeners)
        this.$emit('input', event.target.value)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>