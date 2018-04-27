<template>
    <div>
        <h1>Hello World</h1>
        <p style="font-weight: bold;" :style="messageColor">{{ msg }}</p>
        <button type="button" @click="changeMessageColor">Change Color</button>
        <br />
        <input type="number" v-model="count" />
        <p>{{ count }}</p>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class App extends Vue {
        msg = 'This is my message';
        count = 0;
        isBlue = false;

        get messageColor(): string {
            return this.isBlue ? 'color: blue;' : 'color: black;';
        }

        changeMessageColor(): void {
            this.isBlue = !this.isBlue;
        }
    }
</script>

<style>

</style>
