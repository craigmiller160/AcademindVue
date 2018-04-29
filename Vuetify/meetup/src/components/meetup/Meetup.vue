<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h3 class="primary--text">My Meetup</h3>
                    </v-card-title>
                    <v-card-media
                        src="https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg"
                        height="400px">
                    </v-card-media>
                    <v-card-text>
                        <div class="info--text">17th July 2017 - Where it takes place</div>
                        <div>lorem ipsum blah blah blah</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="primary">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: 'meetup'
    }
</script>

<style scoped>

</style>
