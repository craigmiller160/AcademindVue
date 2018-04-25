import Vue from 'vue';
import App from './App';
import injector from 'vue-inject';
import store from './store/store';

class CountService {
    constructor(store) {
        this.store = store;
    }

    incrementCount() {
        this.store.dispatch('incrementCount');
    }

    decrementCount() {
        this.store.dispatch('decrementCount');
    }

    getCount() {
        return this.store.getters.getCount;
    }
}

Vue.use(injector);

injector.constant('store', store);
injector.service('countService', ['store'], CountService);

new Vue({
    el: '#app',
    store,
    render: h => h(App)
});
