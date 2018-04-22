export default {
    filters: {
        formatCurrency(value) {
            return `$${value.toLocaleString()}`;
        }
    }
}
