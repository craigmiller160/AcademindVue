<template>
    <div>
        <h1>Injector Test</h1>
        <p>Count: {{ count }}</p>
        <button type="button" @click="increment">Increment</button>
        <button type="button" @click="decrement">Decrement</button>
    </div>
</template>

<script>

    export default {
        dependencies: {
            myCount: 'countService'
        },
        created() {
            console.log(this.myCount);
            console.log(this.myCount.store);
        },
        computed: {
            count() {
                return this.myCount.getCount();
            }
        },
        methods: {
            increment() {
                this.myCount.incrementCount();
            },
            decrement() {
                this.myCount.decrementCount();
            }
        }
    }
</script>

<style>

</style>
