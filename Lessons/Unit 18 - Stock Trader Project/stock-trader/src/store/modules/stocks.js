import stocks from '../../data/stocks';
import * as portfolioKeys from './portfolio.keys';

const state = {
    stocks: []
};

const mutations = {
    setStocks(state, stocks) {
        state.stocks = stocks;
    },
    randomStocks(state) {
        //TODO do later
    }
};

const actions = {
    buyStock(context, order) {
        context.commit(portfolioKeys.MUTATION_BUY_STOCK, order, {root: true});
    },
    initStocks(context) {
        context.commit('setStocks', stocks);
    },
    randomizeStocks(context) {
        context.commit('randomStocks');
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
