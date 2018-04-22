import stocks from '../../data/stocks';
import * as portfolioKeys from './portfolio.keys';
import stocksKeys from './stocks.keys';

const state = {
    stocks: []
};

const mutations = {
    setStocks(state, stocks) {
        state.stocks = stocks;
    },
    randomStocks(state) {
        state.stocks.forEach(stock => {
            stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
        });
    }
};

const actions = {
    buyStock(context, order) {
        context.commit(portfolioKeys.MUTATION_BUY_STOCK, order, {root: true});
    },
    initStocks(context) {
        context.commit(stocksKeys.MUTATION_SET_STOCKS, stocks);
    },
    randomizeStocks(context) {
        context.commit(stocksKeys.MUTATION_RANDOM_STOCKS);
    }
};

const getters = {
    stocks(state) {
        return state.stocks;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
