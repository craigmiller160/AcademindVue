<template>
  <div class="component">
    <h1>The User Component</h1>
    <p>I'm an awesome User!</p>
    <button @click="changeName" class="btn btn-primary">Change my Name</button>
    <hr>
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <app-user-detail :name="name"></app-user-detail>
      </div>
      <div class="col-xs-12 col-sm-6">
        <app-user-edit></app-user-edit>
      </div>
    </div>
  </div>
</template>

<script>
  import UserDetail from './UserDetail';
  import UserEdit from './UserEdit';

  export default {
    components: {
      appUserDetail: UserDetail,
      appUserEdit: UserEdit
    },
    data() {
      return {
        name: 'Max'
      }
    },
    methods: {
      changeName() {
        this.name = 'Anna';
      }
    }
  }
</script>

<style scoped>
    div {
        background-color: lightblue;
    }
</style>
