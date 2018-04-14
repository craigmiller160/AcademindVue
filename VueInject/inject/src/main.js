import Vue from 'vue';
import App from './App';
import injector from 'vue-inject';

class MyService {
    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.count = 0;
        this.countChangeCallbacks = [];
    }

    addCountChangeCallback(callbackFn) {
        this.countChangeCallbacks.push(callbackFn);
    }

    removeCountChangeCallback(callbackFn) {
        const index = this.countChangeCallbacks.indexOf(callbackFn);
        if (index >= 0) {
            this.countChangeCallbacks.splice(index, 1);
        }
    }

    incrementCount() {
        this.count++;
        // this.countChangeCallbacks.forEach(callback => callback(this.count));
        return new Promise((resolve, reject) => resolve(this.count));
    }
}

Vue.use(injector);

injector.service('myService', MyService);

new Vue({
  el: '#app',
  render: h => h(App)
});
