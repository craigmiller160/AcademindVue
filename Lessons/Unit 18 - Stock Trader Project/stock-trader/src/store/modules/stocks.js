import stocks from '../../data/stocks';

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
        context.commit(); //TODO finish this
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
