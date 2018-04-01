<template>
  <div class="component">
    <h3>You may edit the User here</h3>
    <p>Edit me!</p>
    <p>User Age: {{ userAge }}</p>
    <button @click="editAge" class="btn btn-primary">Edit Age</button>
  </div>
</template>

<script>
  export default {
    props: {
      userAge: {
        type: Number,
        required: true
      }
    },
    methods: {
      editAge() {
        this.$emit('ageWasEdited', 30);
      }
    }
  }
</script>

<style scoped>
  div {
    background-color: lightgreen;
  }
</style>
