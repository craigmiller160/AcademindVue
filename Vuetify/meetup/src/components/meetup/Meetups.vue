<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular indeterminate class="primary--text" :width="7" :size="70" v-if="loading"></v-progress-circular>
            </v-flex>
        </v-layout>
        <div v-if="!loading">
            <v-layout row wrap
                      class="mb-2"
                      v-for="meetup in meetups"
                      :key="meetup.id">
                <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                    <v-card class="info">
                        <v-container fluid>
                            <v-layout row>
                                <v-flex xs5 sm4 md3>
                                    <v-card-media
                                        :src="meetup.imageUrl"
                                        height="130px">
                                    </v-card-media>
                                </v-flex>
                                <v-flex xs7 sm8 md9>
                                    <v-card-title primary-title>
                                        <div>
                                            <h3 class="white--text mb-0">{{ meetup.title }}</h3>
                                            <div>{{ meetup.date | dateFormat }}</div>
                                        </div>
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-btn flat :to="`/meetups/${meetup.id}`">
                                            <v-icon left light>arrow_forward</v-icon>
                                            View Meetup
                                        </v-btn>
                                    </v-card-actions>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </div>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';


    export default {
        computed: {
            ...mapGetters({
                meetups: 'loadedMeetups',
                loading: 'loading'
            })
        }
    }
</script>

<style scoped>

</style>
