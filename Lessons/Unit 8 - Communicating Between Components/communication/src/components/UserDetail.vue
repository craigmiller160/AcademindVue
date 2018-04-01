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
    }
  }
</script>

<style scoped>
  div {
    background-color: lightcoral;
  }
</style>
