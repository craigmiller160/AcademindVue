import Vue from 'vue'
import App from './App'

Vue.filter('to-lowercase', value => value.toLowerCase());

Vue.mixin({
    created() {
        console.log('Global created');
    }
});

new Vue({
  el: '#app',
  render: h => h(App)
});
