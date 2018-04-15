<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Vuex</h1>
                <app-result></app-result>
                <app-another-result></app-another-result>
                <hr />
                <app-counter></app-counter>
                <app-another-counter></app-another-counter>
                <hr />
                <label for="value">Value</label>
                <input id="value" type="number" class="form-control" v-model="value" />
                <p>{{ value }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Counter from './components/Counter';
    import Result from './components/Result';
    import AnotherResult from './components/AnotherResult';
    import AnotherCounter from './components/AnotherCounter';
    import * as types from './store/types';

    export default {
        components: {
            appCounter: Counter,
            appResult: Result,
            appAnotherResult: AnotherResult,
            appAnotherCounter: AnotherCounter
        },
        computed: {
            value: {
                get() {
                    return this.$store.getters[types.VALUE];
                },
                set(value) {
                    return this.$store.dispatch(types.UPDATE_VALUE, value);
                }
            }
        }
    }
</script>

<style>

</style>
