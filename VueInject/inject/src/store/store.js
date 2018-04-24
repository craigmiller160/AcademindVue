import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        incrementCount(state) {
            state.count++;
        },
        decrementCount(state) {
            state.count--;
        }
    },
    getters: {
        getCount(state) {
            return state.count;
        }
    },
    actions: {
        incrementCount(context) {
            context.commit('incrementCount');
        },
        decrementCount(context) {
            context.commit('decrementCount');
        }
    }
});
