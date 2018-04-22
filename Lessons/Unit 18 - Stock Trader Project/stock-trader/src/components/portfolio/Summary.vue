<template>
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title">{{ title }}</h3>
        </div>
        <div class="panel-body">
            <h4>Amount: {{ amount | formatCurrency }}</h4>
        </div>
    </div>
</template>

<script>
    import formatCurrency from '../../mixins/formatCurrency';

    export default {
        props: [
            'title',
            'amount'
        ],
        mixins: [
            formatCurrency
        ]
    };
</script>

<style scoped>

</style>
