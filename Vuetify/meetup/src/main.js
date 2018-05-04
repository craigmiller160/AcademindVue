import Vue from 'vue';
import App from './App';
import * as firebase from 'firebase';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/es5/util/colors';
import { store } from './store';
import DateFormatMixin from '@/mixins/DateFormatMixin';
import Alert from '@/components/shared/Alert';

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
Vue.component('app-alert', Alert);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created() {
        firebase.initializeApp({
            apiKey: 'AIzaSyD-15Jru9UJUJQtUVnhEL5K49twKeTcJ2g',
            authDomain: 'vue-m-aa271.firebaseapp.com',
            databaseURL: 'https://vue-m-aa271.firebaseio.com',
            projectId: 'vue-m-aa271',
            storageBucket: 'gs://vue-m-aa271.appspot.com'
            // storageBucket: 'vue-m-aa271.appspot.com',
            // messagingSenderId: '1023549679990'
        });

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.$store.dispatch('autoSignIn', user);
            }
        });

        this.$store.dispatch('loadMeetups');
    }
});
