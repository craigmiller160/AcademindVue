<template>
    <div class="col-sm-6 col-md-4">
        <div class="panel panel-success">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{ stock.name }}
                    <small>(Price: {{ stock.price }})</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <!--<label for="quantity">Quantity</label>--> <!-- TODO use Bootstrap 4 and align this stuff -->
                    <input id="quantity" type="number" class="form-control" placeholder="quantity" v-model="quantity" />
                </div>
                <div class="pull-right">
                    <button type="button" class="btn btn-success" @click="buyStock" :disabled="disableBuyBtn">Buy</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
                const order = {
                    stockId: this.stock.id,
                    stockPrice: this.stock.price,
                    quantity: this.quantity
                };
                console.log(order);
                this.quantity = 0;
            }
        },
        computed: {
            disableBuyBtn() {
                return this.quantity <= 0 || isNaN(this.quantity);
            }
        }
    }
</script>

<style scoped>

</style>
