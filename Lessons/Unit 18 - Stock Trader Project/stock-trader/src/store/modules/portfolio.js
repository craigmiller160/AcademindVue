import { PortfolioStock } from '../../model/PortfolioStock';
import { PortfolioDisplayStock } from '../../model/PortfolioDisplayStock';
import stocksKeys from './stocks.keys';
import portfolioKeys from './portfolio.keys';

const state = {
    funds: 10000,
    stocks: [],
    day: 1
};

const mutations = {
    buyStock(state, stockOrder) {
        const record = state.stocks.find(item => item.stockId === stockOrder.stockId);
        if (record) {
            record.quantity += stockOrder.quantity;
        }
        else {
            state.stocks.push(new PortfolioStock(stockOrder.stockId, stockOrder.quantity));
        }
        state.funds -= (stockOrder.stockPrice * stockOrder.quantity);
    },
    sellStock(state, stockOrder) {
        const record = state.stocks.find(item => item.stockId === stockOrder.stockId);
        if (record.quantity > stockOrder.quantity) { //TODO what if record doesn't exist?
            record.quantity -= stockOrder.quantity;
        }
        else {
            const recordIndex = state.stocks.indexOf(record);
            state.stocks.splice(recordIndex, 1);
        }
        state.funds += (stockOrder.stockPrice * stockOrder.quantity);
    },
    nextDay(state) {
        state.day++;
    }
};

const actions = {
    sellStock(context, stockOrder) {
        context.commit(portfolioKeys.MUTATION_SELL_STOCK, stockOrder);
    },
    nextDay(context) {
        context.commit(portfolioKeys.MUTATION_NEXT_DAY);
    }
};

const getters = {
    stockPortfolio(state, getters, rootState, rootGetters) {
        return state.stocks.map(stock => {
            const record = rootGetters[stocksKeys.ns.GETTER_STOCKS].find(element => element.stockId === stock.stockId); //TODO what if record doesn't exist?
            return new PortfolioDisplayStock(stock.stockId, stock.quantity, record.name, record.price);
        });
    },
    funds(state) {
        return state.funds;
    },
    day(state) {
        return state.day;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
