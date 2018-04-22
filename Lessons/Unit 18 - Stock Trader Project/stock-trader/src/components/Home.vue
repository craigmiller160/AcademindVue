<template>
    <div>
        <h1>Trade or View Your Portfolio</h1>
        <h6>You may Save & Load your Data</h6>
        <h6>Click on 'End Day' to begin a New Day!</h6>
        <hr />
        <p>Your Funds: {{ funds | formatCurrency }}</p>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import * as portfolioKeys from '../store/modules/portfolio.keys';
    import formatCurrency from '../mixins/formatCurrency';

    export default {
        computed: {
            ...mapGetters({
                funds: portfolioKeys.GETTER_FUNDS
            })
        },
        mixins: [
            formatCurrency
        ]
    }
</script>

<style scoped>

</style>
