import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import defaultMeetups from '@/data/defaultMeetups';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: defaultMeetups,
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
        },
        updateMeetup(state, payload) {
            const meetup = state.loadedMeetups.find(meetup => meetup.id === payload.id);
            if (!meetup) {
                throw `No meetup found for id: ${payload.id}`;
            }

            if (payload.title) {
                meetup.title = payload.title;
            }

            if (meetup.description) {
                meetup.description = payload.description;
            }

            if (meetup.date) {
                meetup.date = payload.date;
            }
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
                    else {
                        context.commit('setLoadedMeetups', []);
                    }

                    context.commit('setLoading', false);
                })
                .catch(error => {
                    console.log(error);
                    context.commit('setLoading', false);
                });
        },
        createMeetup(context, payload) {
            context.commit('setLoading', true);
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
                    context.commit('setLoading', false);
                })
                .catch(error => {
                    console.log(error);
                    context.commit('setLoading', false);
                });
        },
        updateMeetupData(context, payload) {
            context.commit('setLoading', true);
            const updateObj = {};
            if (payload.title) {
                updateObj.title = payload.title;
            }

            if (payload.description) {
                updateObj.description = payload.description;
            }

            if (payload.date) {
                updateObj.date = payload.date;
            }

            firebase.database().ref('meetups').child(payload.id).update(updateObj)
                .then(() => {
                    context.commit('setLoading', false);
                    context.commit('updateMeetup', payload);
                })
                .catch(error => {
                    console.log(error);
                    context.commit('setLoading', false);
                })
        }
        ,
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
                    context.dispatch('loadMeetups');
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
            context.commit('setLoading', true);
            firebase.auth().signOut()
                .then(data => {
                    context.commit('setUser', null);
                    context.commit('setLoadedMeetups', defaultMeetups);
                    context.commit('setLoading', false);
                })
                .catch(error => {
                    console.log(error);
                    context.commit('setLoading', false);
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
