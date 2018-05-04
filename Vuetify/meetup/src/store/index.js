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
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        createMeetup(state, meetup) {
            state.loadedMeetups.push(meetup);
        },
        setUser(state, user) {
            state.user = user;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        setError(state, error) {
            state.error = error;
        },
        clearError(state) {
            state.error = null;
        },
        setLoadedMeetups(state, meetups) {
            state.loadedMeetups = meetups;
        }
    },
    actions: {
        loadMeetups(context) {
            context.commit('setLoading', true);
            firebase.database().ref('meetups').once('value')
                .then(data => {
                    const meetups = [];
                    const obj = data.val();
                    if (obj) {
                        Object.keys(obj).forEach(key => {
                            const meetup = obj[key];
                            meetup.id = key;
                            meetup.date = new Date(meetup.date); //Date string to Date object
                            meetups.push(meetup);
                        });
                        context.commit('setLoadedMeetups', meetups);
                    }

                    context.commit('setLoading', false);
                })
                .catch(error => {
                    console.log(error);
                    context.commit('setLoading', false);
                });
        },
        createMeetup(context, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date.toISOString(),
                creatorId: context.getters.user.id
            };

            let imageUrlRef;
            let keyRef;
            firebase.database().ref('meetups').push(meetup)
                .then(data => {
                    return data.key;
                })
                .then(key => {
                    keyRef = key;
                    const filename = payload.image.name;
                    const ext = filename.slice(filename.lastIndexOf('.'));
                    return firebase.storage().ref(`meetups/${key}.${ext}`).put(payload.image);
                })
                .then(fileData => {
                    imageUrlRef = fileData.metadata.downloadURLs[0];
                    return firebase.database().ref('meetups').child(keyRef).update({
                        imageUrl: imageUrlRef
                    });
                })
                .then(() => {
                    const newMeetup = {
                        ...meetup,
                        id: keyRef,
                        imageUrl: imageUrlRef
                    };
                    newMeetup.date = new Date(newMeetup.date);
                    context.commit('createMeetup', newMeetup);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        signUserUp(context, userInfo) {
            context.commit('setLoading', true);
            context.commit('clearError');
            firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
                .then(userResponse => {
                    context.commit('setLoading', false);
                    const newUser = {
                        id: userResponse.uid,
                        registeredMeetups: []
                    };
                    context.commit('setUser', newUser);
                })
                .catch(error => {
                    context.commit('setLoading', false);
                    context.commit('setError', error);
                    console.log(error);
                });
        },
        signUserIn(context, userInfo) {
            context.commit('setLoading', true);
            context.commit('clearError');
            firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
                .then(userResponse => {
                    context.commit('setLoading', false);
                    const newUser = {
                        id: userResponse.uid,
                        registeredMeetups: []
                    };
                    context.commit('setUser', newUser);
                })
                .catch(error => {
                    context.commit('setLoading', false);
                    context.commit('setError', error);
                    console.log(error);
                })
        },
        autoSignIn(context, userInfo) {
            context.commit('setUser', {
                id: userInfo.uid,
                registeredMeetups: []
            });
        },
        logout(context) {
            firebase.auth().signOut()
                .then(data => {
                    context.commit('setUser', null);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        clearError(context) {
            context.commit('clearError');
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
        },
        error(state) {
            return state.error;
        },
        loading(state) {
            return state.loading;
        }
    }
});
