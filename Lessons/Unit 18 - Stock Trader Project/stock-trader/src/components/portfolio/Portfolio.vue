<template>
    <div>
        <div class="row">
            <div class="col-md-4 col-sm-6 col-xs-12">
                <app-summary title="Portfolio Net" :amount="portfolioNet"></app-summary>
            </div>
            <!--<div class="col-md-4 col-sm-6 col-xs-12">-->
                <!--<app-summary title="Portfolio Change" :amount="portfolioChange"></app-summary>-->
            <!--</div>-->
            <div class="col-md-4 col-sm-6 col-xs-12">
                <app-summary title="Daily Change" :amount="dailyChange"></app-summary>
            </div>
        </div>
        <hr />
        <div class="row">
            <div v-for="stock in stocks" class="col-md-4 col-sm-6 col-xs-12">
                <app-stock :stock="stock"></app-stock>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import portfolioKeys from '../../store/modules/portfolio.keys';
    import Stock from './Stock';
    import formatCurrency from '../../mixins/formatCurrency';
    import Summary from './Summary';

    export default {
        computed: {
            ...mapGetters({
                stocks: portfolioKeys.ns.GETTER_STOCK_PORTFOLIO,
                portfolioNet: portfolioKeys.ns.GETTER_PORTFOLIO_NET,
                dailyChange: portfolioKeys.ns.GETTER_DAILY_CHANGE
            })
        },
        components: {
            appStock: Stock,
            appSummary: Summary
        },
        mixins: [
            formatCurrency
        ]
    }
</script>

<style scoped>

</style>
