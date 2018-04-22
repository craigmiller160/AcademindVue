<template>
    <div class="row">
        <div v-for="stock in stocks" class="col-md-4 col-sm-6 col-xs-12">
            <app-stock :stock="stock" :key="stock.id"></app-stock>
        </div>
    </div>
</template>

<script>
    import Stock from './Stock';
    import { mapGetters } from 'vuex';
    import stocksKeys from './../../store/modules/stocks.keys';

    export default {
        components: {
            appStock: Stock
        },
        computed: {
            ...mapGetters({
                stocks: stocksKeys.ns.GETTER_STOCKS
            })
        }
    }
</script>

<style scoped>

</style>
