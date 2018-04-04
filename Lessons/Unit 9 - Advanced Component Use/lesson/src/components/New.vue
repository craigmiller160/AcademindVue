<template>
    <div>
      <h3>New Quote</h3>
      <button @click="counter++">Increase!</button>
      <p>Counter: {{ counter }}</p>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        counter: 0
      }
    }
  }
</script>

<style scoped>

</style>
