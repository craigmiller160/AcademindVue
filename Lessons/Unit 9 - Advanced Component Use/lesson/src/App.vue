<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <app-quote>
          <template slot="title">
            <h2>{{ quoteTitle }}</h2>
          </template>
          <template>
            <p>A wonderful Quote!</p>
          </template>
        </app-quote>
      </div>
    </div>
  </div>
</template>

<script>
  import Quote from './components/Quote';

  export default {
    components: {
      'app-quote': Quote
    },
    data() {
      return {
        quoteTitle: 'The Quote'
      }
    }
  }
</script>

<style scoped>

</style>
