<template>
    <v-dialog
        v-model="show"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable>
        <v-card tile>
            <v-toolbar card dark color="primary">
                <v-btn icon dark @click.native="closeDialog">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Edit Meetup</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click.native="closeDialog">Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: [
            'show'
        ],
        methods: {
            closeDialog() {
                this.$emit('show', false);
            }
        }
    }
</script>

<style scoped>

</style>
