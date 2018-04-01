import Vue from 'vue';
import App from './App';

export const eventBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
});
