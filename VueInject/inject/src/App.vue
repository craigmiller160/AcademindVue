<template>
    <div>
        <h1>Injector Test</h1>
        <p>{{ count }}</p>
        <button @click="increment">Increment</button>
    </div>
</template>

<script>
    const updateCount = vue => {
        return count => vue.count = count;
    };

    export default {
        dependencies: [
          'myService'
        ],
        data () {
            return {
                count: 0
            }
        },
        beforeMount() {
            // this.myService.addCountChangeCallback(updateCount(this));
        },
        beforeDestroy() {
            // this.myService.removeCountChangeCallback(updateCount(this));
        },
        methods: {
            increment() {
                this.myService.incrementCount()
                    .then(count => this.count = count);
                console.log(this.myService.count);
            }
        }
    }
</script>

<style>

</style>
