import { stocks } from '@/data/stocks';
import portfolioKeys from './portfolio.keys';
import stocksKeys from './stocks.keys';
import { BasicStock } from '@/model/BasicStock';
import { StocksState } from '@/store/modules/stocks.types';
import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { StockOrder } from '@/model/StockOrder';

const state: StocksState = {
    stocks: []
};

const mutations: MutationTree<StocksState> = {
    setStocks(state: StocksState, stocks: BasicStock[]): void {
        state.stocks = stocks;
    },
    randomStocks(state: StocksState): void {
        state.stocks.forEach(stock => {
            stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
        });
    }
};

const actions: ActionTree<StocksState,{}> = {
    buyStock(context: ActionContext<StocksState,{}>, order: StockOrder): void {
        context.commit(portfolioKeys.ns.MUTATION_BUY_STOCK, order, {root: true});
    },
    initStocks(context: ActionContext<StocksState,{}>): void {
        context.commit(stocksKeys.MUTATION_SET_STOCKS, stocks);
    },
    randomizeStocks(context: ActionContext<StocksState,{}>): void {
        context.commit(stocksKeys.MUTATION_RANDOM_STOCKS);
    }
};

const getters: GetterTree<StocksState,{}> = {
    stocks (state: StocksState): BasicStock[] {
        return state.stocks;
    }
};

export const stocksModule: Module<StocksState,{}> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

