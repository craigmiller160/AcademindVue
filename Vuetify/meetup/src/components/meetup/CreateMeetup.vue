<!--suppress ALL -->
<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h2 class="primary--text">Create a new Meetup</h2>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                v-model="title"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="location"
                                label="Location"
                                id="location"
                                v-model="location"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="imageUrl"
                                label="Image URL"
                                id="imageUrl"
                                v-model="imageUrl"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" height="150" />
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="description"
                                label="Description"
                                id="description"
                                v-model="description"
                                multi-line
                                no-resize
                                required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <h4>Choose a Date & Time</h4>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3 class="mb-2">
                            <v-date-picker v-model="date"></v-date-picker>
                            <p>{{ date }}</p>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-time-picker v-model="time" format="ampm"></v-time-picker>
                            <p>{{ time }}</p>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs-12 sm6 offset-sm3>
                            <v-spacer></v-spacer>
                            <v-btn class="primary"
                                   :disabled="!formIsValid"
                                   type="submit"
                                   large>Create Meeting</v-btn>
                            <p>{{ submittableDateTime }}</p>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import * as dateUtil from '@/util/Date';

    export default {
        data() {
            return {
                title: '',
                location: '',
                imageUrl: '',
                description: '',
                date: dateUtil.getDateString(),
                time: dateUtil.getTimeString()
            }
        },
        computed: {
            formIsValid() {
                return this.title !== '' &&
                    this.location !== '' &&
                    this.imageUrl !== '' &&
                    this.description !== '';
            },
            submittableDateTime() {
                return dateUtil.createDate(this.date, this.time);
            }
        },
        methods: {
            onCreateMeetup() {
                if (!this.formIsValid) {
                    return;
                }

                const meetupData = {
                    title: this.title,
                    location: this.location,
                    imageUrl: this.imageUrl,
                    description: this.description,
                    date: new Date()
                };

                this.$store.dispatch('createMeetup', meetupData);
                this.$router.push('/meetups');
            }
        }
    }
</script>

<style scoped>

</style>
