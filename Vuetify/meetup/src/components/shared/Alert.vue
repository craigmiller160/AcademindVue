<template>
    <v-alert error dismissible @input="onClose" :value="true" transition="slide-y-transition">
        {{ text }}
    </v-alert>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        props: [
            'text'
        ],
        methods: {
            onClose() {
                this.$emit('dismissed');
            }
        }
    }
</script>

<style scoped>

</style>
