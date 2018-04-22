<template>
    <div class="row">
        <div v-for="stock in stocks" class="col-md-4 col-sm-6 col-xs-12">
            <app-stock :stock="stock"></app-stock>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import portfolioKeys from '../../store/modules/portfolio.keys';
    import Stock from './Stock';

    export default {
        computed: {
            ...mapGetters({
                stocks: portfolioKeys.ns.GETTER_STOCK_PORTFOLIO
            })
        },
        components: {
            appStock: Stock
        }
    }
</script>

<style scoped>

</style>
