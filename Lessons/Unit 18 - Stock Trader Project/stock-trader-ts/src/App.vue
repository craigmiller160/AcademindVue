<template>
    <div>
        <h1>Hello World</h1>
    </div>
</template>

<script lang="ts">
    import { createNamespaceKeys } from './store/modules/moduleUtil';
    import { Vue } from 'vue-property-decorator';

    const test = {
        one: 'One',
        two: 'Two',
        // three: 1
    };

    createNamespaceKeys(test, '');

    export default class App extends Vue {

    }
</script>

<style>

</style>
