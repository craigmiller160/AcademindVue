<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand">Stock Trader</router-link>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link to="/portfolio" tag="li" active-class="active">
                        <a>Portfolio</a>
                    </router-link>
                    <router-link to="/stocks" tag="li" active-class="active">
                        <a>Stocks</a>
                    </router-link>
                </ul>
                <strong class="navbar-text navbar-right">Funds: {{ funds | formatCurrency }}</strong>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a style="cursor: pointer;" @click="endDay">End Day</a>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Save and Load <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="#">Save Data</a>
                            </li>
                            <li>
                                <a href="#">Load Data</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import * as portfolioKeys from '../store/modules/portfolio.keys';
    import stocksKeys from '../store/modules/stocks.keys';
    import formatCurrency from '../mixins/formatCurrency';

    export default {
        computed: {
            ...mapGetters({
                funds: portfolioKeys.GETTER_FUNDS
            })
        },
        methods: {
            ...mapActions({
                randomizeStocks: stocksKeys.ns.ACTION_RANDOMIZE_STOCKS
            }),
            endDay() {
                this.randomizeStocks();
            }
        },
        mixins: [
            formatCurrency
        ]
    }
</script>

<style scoped>

</style>
