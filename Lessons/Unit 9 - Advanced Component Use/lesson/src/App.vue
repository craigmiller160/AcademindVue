<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <button @click="selectedComponent = 'app-quote'" class="btn btn-primary">Quote</button>
        <button @click="selectedComponent = 'app-author'" class="btn btn-info">Author</button>
        <button @click="selectedComponent = 'app-new'" class="btn">New</button>
        <hr />
        <p>{{ selectedComponent }}</p>
        <!--<app-quote>-->
          <!--<template slot="title">-->
            <!--<h2>{{ quoteTitle }}</h2>-->
          <!--</template>-->
          <!--<template>-->
            <!--<p>A wonderful Quote!</p>-->
          <!--</template>-->
        <!--</app-quote>-->
        <component :is="selectedComponent">
          <p>Default Content</p>
        </component>
      </div>
    </div>
  </div>
</template>

<script>
  import Quote from './components/Quote';
  import New from './components/New';
  import Author from './components/Author';

  export default {
    components: {
      'app-quote': Quote,
      'app-author': Author,
      'app-new': New
    },
    data() {
      return {
        quoteTitle: 'The Quote',
        selectedComponent: 'app-quote'
      }
    }
  }
</script>

<style scoped>

</style>
