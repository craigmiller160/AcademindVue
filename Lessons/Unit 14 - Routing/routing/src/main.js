import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import { routes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    }
});

router.beforeEach((to, from, next) => {
    //Only for very generic checks, gets executed for all routes
    console.log('Global beforeEach');
    next(); //Must be executed to continue the route. Also, a redirect object can be passed as an argument, or a boolean to allow or abort
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
