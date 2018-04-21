<template>
    <div class="row">
        <app-stock v-for="stock in stocks" :stock="stock" :key="stock.id"></app-stock>
    </div>
</template>

<script>
    import Stock from './Stock';
    import { mapGetters } from 'vuex';
    import * as stocksKeys from './../../store/modules/stocks.keys';

    export default {
        components: {
            appStock: Stock
        },
        computed: {
            ...mapGetters({
                stocks: stocksKeys.GETTER_STOCKS
            })
        }
    }
</script>

<style scoped>

</style>
