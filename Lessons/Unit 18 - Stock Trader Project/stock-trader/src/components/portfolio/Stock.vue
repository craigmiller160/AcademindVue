<template>
    <div class="panel panel-info">
        <div class="panel-heading">
            <h3 class="panel-title">
                {{ stock.name }}
                <small>(Price: {{ stock.price | formatCurrency }} | Quantity: {{ stock.quantity }})</small>
            </h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-xs-8 pull-left">
                    <input id="quantity" type="number" class="form-control" placeholder="quantity"
                           :class="fieldClass" v-model="quantity" @focus="selectInputContents" @focusout="restoreInputDefault($event, 0)" />
                </div>
                <div class="col-xs-4 pull-right">
                    <button type="button" class="btn btn-info" @click="sellStock"
                            :class="buttonClass" :disabled="disableBuyBtn">Sell</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { StockOrder } from '../../model/StockOrder';
    import portfolioKeys from '../../store/modules/portfolio.keys';
    import inputSelectMixin from '../../mixins/inputSelect';
    import formatCurrencyMixin from '../../mixins/formatCurrency';

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
            sellStock() {
                const order = new StockOrder(this.stock.stockId, this.stock.price, this.quantity);
                this.$store.dispatch(portfolioKeys.ns.ACTION_SELL_STOCK, order);
                this.quantity = 0;
            }
        },
        computed: {
            disableBuyBtn() {
                return this.quantity <= 0 || isNaN(this.quantity) || this.insufficientQuantity;
            },
            insufficientQuantity() {
                return this.quantity > this.stock.quantity;
            },
            buttonClass() {
                return {
                    'btn-info': !this.insufficientQuantity,
                    'btn-danger': this.insufficientQuantity
                }
            },
            fieldClass() {
                return {
                    invalid: this.insufficientQuantity
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
