<template>
  <div class="container">
    <app-header></app-header>
    <hr>
    <app-servers-home></app-servers-home>
    <hr>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import ServersHome from './ServersHome';

  export default {
    components: {
      'app-servers-home': ServersHome
    }
  }
</script>

<style scoped>

</style>
