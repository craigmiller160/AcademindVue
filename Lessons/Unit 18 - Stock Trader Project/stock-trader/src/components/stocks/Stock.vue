<template>
    <div class="panel panel-success">
        <div class="panel-heading">
            <h3 class="panel-title">
                {{ stock.name }}
                <small>(Price: {{ stock.price | formatCurrency }})</small>
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-xs-8 pull-left">
                    <input id="quantity" type="number" class="form-control" :class="fieldClass" placeholder="quantity"
                           v-model="quantity" @focus="selectInputContents" @focusout="restoreInputDefault($event, 0)" />
                </div>
                <div class="col-xs-4 pull-right">
                    <button type="button" class="btn" :class="buttonClass" @click="buyStock"
                            :disabled="disableBuyBtn">Buy</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { StockOrder } from '../../model/StockOrder';
    import stocksKeys from '../../store/modules/stocks.keys';
    import * as portfolioKeys from '../../store/modules/portfolio.keys';
    import inputSelectMixin from '../../mixins/inputSelect';
    import formatCurrencyMixin from '../../mixins/formatCurrency';
    import { mapGetters } from 'vuex';

    export default {
        props: [
            'stock'
        ],
        data() {
            return {
                quantity: 0
            }
        },
        methods: {
            buyStock() {
                const order = new StockOrder(this.stock.stockId, this.stock.price, this.quantity);
                this.$store.dispatch(stocksKeys.ns.ACTION_BUY_STOCK, order);
                this.quantity = 0;
            }
        },
        computed: {
            ...mapGetters({
                funds: portfolioKeys.GETTER_FUNDS
            }),
            disableBuyBtn() {
                return this.quantity <= 0 || isNaN(this.quantity) || this.insufficientFunds;
            },
            insufficientFunds() {
                return (this.quantity * this.stock.price) > this.funds;
            },
            buttonClass() {
                return {
                    'btn-success': !this.insufficientFunds,
                    'btn-danger': this.insufficientFunds
                }
            },
            fieldClass() {
                return {
                    invalid: this.insufficientFunds
                }
            }
        },
        mixins: [
            inputSelectMixin,
            formatCurrencyMixin
        ]
    }
</script>

<style scoped>
    .invalid {
        border: 1px solid red;
    }
</style>
