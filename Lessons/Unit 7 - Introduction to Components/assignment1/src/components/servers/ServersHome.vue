<template>
    <div>
      <div class="row">
        <div class="col-xs-12 col-sm-6">
          <app-servers-list></app-servers-list>
        </div>
        <div class="col-xs-12 col-sm-6">
          <app-server-details></app-server-details>
        </div>
      </div>
    </div>
</template>

<script>
  import ServersList from './ServersList';
  import ServerDetails from './ServerDetails';

  export default {
    components: {
      'app-servers-list': ServersList,
      'app-server-details': ServerDetails
    }
  };
</script>

<style scoped>

</style>
