import Vue from 'vue'
import App from './App'

Vue.filter('to-lowercase', value => value.toLowerCase());

new Vue({
  el: '#app',
  render: h => h(App)
});
