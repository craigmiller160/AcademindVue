<template>
  <div class="component">
    <h3>You may view the User Details here</h3>
    <p>Many Details</p>
    <p>User Name: {{ switchName() }}</p>
    <p>User Age: {{ userAge }}</p>
    <button @click="resetName" class="btn btn-primary">Reset Name</button>
  </div>
</template>

<script>
  import { eventBus } from '../main';

  export default {
    props: {
      myName: {
        type: String,
        required: true
        //default: ''
      },
      resetFn: {
        type: Function,
        required: true
      },
      userAge: {
        type: Number,
        required: true
      }
    },
    methods: {
      switchName() {
        return this.myName.split('').reverse().join('');
      },
      resetName() {
        // this.myName = 'Max';
        // this.$emit('nameWasReset', this.myName);
        this.resetFn();
      }
    },
    created() {
      eventBus.$on('ageWasEdited', age => this.userAge = age); //TODO how to handle changing the value of a prop... does the parent always need to be the one that is changed???
    }
  }
</script>

<style scoped>
  div {
    background-color: lightcoral;
  }
</style>
