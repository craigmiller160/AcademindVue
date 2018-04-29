import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            {
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
                id: '1',
                title: 'Meetup in New York',
                date: '2017-07-17',
                description: 'Hanging out in NYC'
            },
            {
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
                id: '2',
                title: 'Meetup in Paris',
                date: '2017-07-19',
                description: 'Chillin in Paris'
            }
        ],
        user: {
            id: '1',
            registeredMeetups: [
                '1'
            ]
        }
    },
    mutations: {
        createMeetup(state, meetup) {
            meetup.id = '' + state.loadedMeetups.size;
            state.loadedMeetups.push(meetup);
        }
    },
    actions: {
        createMeetup(context, meetup) {
            context.commit('createMeetup', meetup);
        }
    },
    getters: {
        loadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => meetupA.date > meetupB.date);
        },
        featuredMeetups(state, getters) {
            return getters.loadedMeetups.slice(0, 5);
        },
        loadedMeetup(state) {
            return meetupId => state.loadedMeetups.find(meetup => meetup.id === meetupId);
        }
    }
});
