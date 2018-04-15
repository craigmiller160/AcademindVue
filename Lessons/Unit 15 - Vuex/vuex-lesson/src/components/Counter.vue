<template>
    <div>
        <button class="btn btn-primary" @click="increment(100)">Increment</button>
        <button class="btn btn-primary" @click="decrement(50)">Decrement</button>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    import * as types from '../store/types';

    export default {
        methods: {
            ...mapMutations({
                increment: types.MUTATE_INCREMENT_COUNTER,
                decrement: types.MUTATE_DECREMENT_COUNTER
            })
        }
    }
</script>
