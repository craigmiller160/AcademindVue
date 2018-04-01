import Vue from 'vue';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';

Vue.component('app-header', Header);
Vue.component('app-footer', Footer);

new Vue({
  el: '#app',
  render: h => h(App)
});
