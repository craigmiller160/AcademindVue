<template>
    <v-container>
        <v-layout row wrap class="mb-2">
            <v-flex xs12 sm6 class="text-sm-right text-xs-center">
                <v-btn large router to="/meetups" class="info">Explore Meetups</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-sm-left text-xs-center">
                <v-btn large router to="/meetups/new" class="info">Organize Meetup</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular indeterminate class="primary--text" :width="7" :size="70" v-if="loading"></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12>
                <v-carousel style="cursor: pointer;" v-if="!loading">
                    <v-carousel-item v-for="(meetup, index) in meetups"
                                     :src="meetup.imageUrl"
                                     :key="meetup.id"
                                     @click.native="onLoadMeetup(meetup.id)">
                        <div class="title">
                            {{ meetup.title }}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
            <v-flex xs12 class="text-xs-center">
                <p class="join-label">Join our awesome meetups!</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                meetups: 'featuredMeetups',
                loading: 'loading'
            })
        },
        methods: {
            onLoadMeetup(id) {
                this.$router.push(`/meetups/${id}`);
            }
        }
    }
</script>

<style scoped>
    .title {
        position: absolute;
        bottom: 50px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 2em;
        padding: 20px;
    }

    .join-label {
        font-size: 2em;
    }
</style>
