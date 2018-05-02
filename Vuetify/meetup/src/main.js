import Vue from 'vue';
import App from './App';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/es5/util/colors';
import { store } from './store';
import DateFormatMixin from '@/mixins/DateFormatMixin';

Vue.use(Vuetify, {
    theme: {
        primary: colors.purple.base,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3
    }
});

Vue.config.productionTip = false;

Vue.mixin(DateFormatMixin);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
