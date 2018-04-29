<template>
    <div>
        <h1>Hello World</h1>
    </div>
</template>

<script lang="ts">
    import { createNamespaceKeys } from './store/modules/moduleUtil';
    import { Vue } from 'vue-property-decorator';
    import Component, { mixins } from 'vue-class-component';
    import { MyMixin } from './mixins/formatCurrency';

    const test = {
        one: 'One',
        two: 'Two',
        // three: 1
    };

    createNamespaceKeys(test, '');

    @Component
    export default class App extends mixins(MyMixin) {
        created() {
            this.helloWorld();
        }
    }
</script>

<style>

</style>
