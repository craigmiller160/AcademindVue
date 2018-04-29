<template>
    <div>
        <v-app>
            <v-toolbar app color="blue" dark>
                <v-toolbar-side-icon></v-toolbar-side-icon>
                <v-toolbar-title>My Application</v-toolbar-title>
                <!--<v-spacer></v-spacer>-->
                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn flat>Link One</v-btn>
                    <v-btn flat>Link Two</v-btn>
                </v-toolbar-items>
                <v-spacer></v-spacer>
                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn flat>Link Three</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-container>
                <v-layout row wrap>
                    <v-flex>Hello World</v-flex>
                </v-layout>
            </v-container>
        </v-app>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style>

</style>
