import Vue from 'vue';
import Vuex from 'vuex';
import * as dateUtil from '@/util/Date';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            {
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
                id: '1',
                title: 'Meetup in New York',
                date: dateUtil.createDate('2017-07-17', '17:00'),
                location: 'New York',
                description: 'Hanging out in NYC'
            },
            {
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
                id: '2',
                title: 'Meetup in Paris',
                date: dateUtil.createDate('2017-07-19', '19:00'),
                location: 'Paris',
                description: 'Chillin in Paris'
            }
        ],
        user: null
    },
    mutations: {
        createMeetup(state, meetup) {
            meetup.id = '' + state.loadedMeetups.size;
            state.loadedMeetups.push(meetup);
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        createMeetup(context, meetup) {
            context.commit('createMeetup', meetup);
        },
        signUserUp(context, userInfo) {
            firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
                .then(userResponse => {
                    const newUser = {
                        id: userResponse.uid,
                        registeredMeetups: []
                    };
                    context.commit('setUser', newUser);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        signUserIn(context, userInfo) {
            firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
                .then(userResponse => {
                    const newUser = {
                        id: userResponse.uid,
                        registeredMeetups: []
                    };
                    context.commit('setUser', newUser);
                })
                .catch(error => {
                    console.log(error);
                })
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
        },
        user(state) {
            return state.user;
        }
    }
});
