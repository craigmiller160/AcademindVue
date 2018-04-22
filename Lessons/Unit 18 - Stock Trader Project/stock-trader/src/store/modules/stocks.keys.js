const NAMESPACE = 'stocks';

const keys = {
    MUTATION_SET_STOCKS: 'setStocks',
    MUTATION_RANDOM_STOCKS: 'randomStocks',

    ACTION_BUY_STOCK: 'buyStock',
    ACTION_INIT_STOCKS: 'initStocks',
    ACTION_RANDOMIZE_STOCKS: 'randomizeStocks',

    GETTER_STOCKS: 'stocks'
};

const keysNS = {};
Object.keys(keys).forEach(key => keysNS[key] = `${NAMESPACE}/${keys[key]}`);

export default {
    ...keys,
    ns: keysNS
}
