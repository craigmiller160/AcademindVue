<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand">Stock Trader</router-link>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link to="/portfolio" tag="li" active-class="active">
                        <a style="cursor: pointer;">Portfolio</a>
                    </router-link>
                    <router-link to="/stocks" tag="li" active-class="active">
                        <a style="cursor: pointer;">Stocks</a>
                    </router-link>
                </ul>
                <strong class="navbar-text navbar-right">Funds: {{ funds | formatCurrency }} | Day: {{ day }}</strong>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a style="cursor: pointer;" @click="endDay">End Day</a>
                    </li>
                    <li class="dropdown" :class="dropdownOpen">
                        <a style="cursor: pointer;" class="dropdown-toggle" data-toggle="dropdown"
                           role="button" aria-haspopup="true" aria-expanded="false"
                           @click="toggleDropdown">Save and Load <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li>
                                <a style="cursor: pointer;" @click="saveData">Save Data</a>
                            </li>
                            <li>
                                <a style="cursor: pointer;" @click="loadData">Load Data</a>
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
    import portfolioKeys from '../store/modules/portfolio.keys';
    import stocksKeys from '../store/modules/stocks.keys';
    import formatCurrency from '../mixins/formatCurrency';
    import http from '../services/HttpService';

    export default {
        data() {
            return {
                isDropdownOpen: false
            }
        },
        computed: {
            ...mapGetters({
                funds: portfolioKeys.ns.GETTER_FUNDS,
                stockPortfolio: portfolioKeys.ns.GETTER_STOCK_PORTFOLIO,
                day: portfolioKeys.ns.GETTER_DAY,
                stocks: stocksKeys.ns.GETTER_STOCKS
            }),
            dropdownOpen() {
                return {
                    open: this.isDropdownOpen
                }
            }
        },
        methods: {
            ...mapActions({
                randomizeStocks: stocksKeys.ns.ACTION_RANDOMIZE_STOCKS,
                nextDay: portfolioKeys.ns.ACTION_NEXT_DAY
            }),
            endDay() {
                this.nextDay();
                this.randomizeStocks();
            },
            toggleDropdown() {
                this.isDropdownOpen = !this.isDropdownOpen;
            },
            saveData() {
                this.isDropdownOpen = false;
                const data = {
                    funds: this.funds,
                    stockPortfolio: this.stockPortfolio,
                    stocks: this.stocks,
                    day: this.day
                };
                http.saveData(data)
                    .then(res => alert('Data saved successfully')) //TODO replace with bootstrap modal
                    .catch(res => {
                        alert('Error loading data'); //TODO replace with bootstrap modal
                        console.log(res);
                    });
            },
            loadData() {
                this.isDropdownOpen = false;
            }
        },
        mixins: [
            formatCurrency
        ]
    }
</script>

<style scoped>

</style>
