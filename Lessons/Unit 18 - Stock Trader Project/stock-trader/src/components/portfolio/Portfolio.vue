<template>
    <div>
        <app-stock v-for="stock in stocks" :stock="stock" :key="stock.stockId"></app-stock>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import * as portfolioKeys from '../../store/modules/portfolio.keys';
    import Stock from './Stock';

    export default {
        computed: {
            ...mapGetters({
                stocks: portfolioKeys.GETTER_STOCK_PORTFOLIO
            })
        },
        components: {
            appStock: Stock
        }
    }
</script>

<style scoped>

</style>
