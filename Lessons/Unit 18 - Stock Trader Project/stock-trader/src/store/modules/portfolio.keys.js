import { createNamespaceKeys } from './moduleUtil';

const NAMESPACE = 'portfolio';

const keys = {
    MUTATION_BUY_STOCK: 'buyStock',
    MUTATION_SELL_STOCK: 'sellStock',
    MUTATION_NEXT_DAY: 'nextDay',

    ACTION_SELL_STOCK: 'sellStock',
    ACTION_NEXT_DAY: 'nextDay',

    GETTER_STOCK_PORTFOLIO: 'stockPortfolio',
    GETTER_FUNDS: 'funds',
    GETTER_DAY: 'day'
};

export default {
    ...keys,
    ns: createNamespaceKeys(keys, NAMESPACE)
}
