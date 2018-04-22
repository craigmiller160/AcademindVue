import { createNamespaceKeys } from './moduleUtil';

const NAMESPACE = 'portfolio';

const keys = {
    MUTATION_BUY_STOCK: 'buyStock',
    MUTATION_SELL_STOCK: 'sellStock',

    ACTION_SELL_STOCK: 'sellStock',

    GETTER_STOCK_PORTFOLIO: 'stockPortfolio',
    GETTER_FUNDS: 'funds'
};

export default {
    ...keys,
    ns: createNamespaceKeys(keys, NAMESPACE)
}
