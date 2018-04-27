import { PortfolioStock } from '../../model/PortfolioStock';
import { PortfolioDisplayStock } from '../../model/PortfolioDisplayStock';
import stocksKeys from './stocks.keys';
import portfolioKeys from './portfolio.keys';
import { PortfolioState } from '@/store/modules/portfolio.types';
import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { StockOrder } from '@/model/StockOrder';
import { BasicStock } from '@/model/BasicStock';

export const STARTING_FUNDS = 10000;

const state: PortfolioState = {
    funds: STARTING_FUNDS,
    stocks: [],
    day: 1,
    priorPortfolioNet: 0
};

const mutations: MutationTree<PortfolioState> = {
    buyStock(state: PortfolioState, stockOrder: StockOrder): void {
        const record = state.stocks.find(item => item.stockId === stockOrder.stockId);
        if (record) {
            record.quantity += stockOrder.quantity;
        }
        else {
            state.stocks.push(new PortfolioStock(stockOrder.stockId, stockOrder.quantity));
        }
        state.funds -= (stockOrder.price * stockOrder.quantity);
    },
    sellStock(state: PortfolioState, stockOrder: StockOrder): void {
        const record = state.stocks.find(item => item.stockId === stockOrder.stockId);
        if (record) {
            if (record.quantity > stockOrder.quantity) {
                record.quantity -= stockOrder.quantity;
            }
            else {
                const recordIndex = state.stocks.indexOf(record);
                state.stocks.splice(recordIndex, 1);
            }
            state.funds += (stockOrder.price * stockOrder.quantity);
        }
        else {
            throw `Error! Cannot find matching stock. ID: ${stockOrder.stockId}`;
        }
    },
    nextDay(state: PortfolioState): void {
        state.day++;
    },
    setPriorPortfolioNet(state: PortfolioState, rootGetters: any): void { //TODO work on that any type there
        state.priorPortfolioNet = rootGetters[portfolioKeys.ns.GETTER_PORTFOLIO_NET];
    }
};

const actions: ActionTree<PortfolioState,{}> = {
    sellStock(context: ActionContext<PortfolioState,{}>, stockOrder: StockOrder): void {
        context.commit(portfolioKeys.MUTATION_SELL_STOCK, stockOrder);
    },
    nextDay(context: ActionContext<PortfolioState,{}>) {
        context.commit(portfolioKeys.MUTATION_SET_PRIOR_PORTFOLIO_NET, context.rootGetters); //TODO figure out a better way
        context.commit(portfolioKeys.MUTATION_NEXT_DAY);
    }
};

const getters: GetterTree<PortfolioState,{}> = {
    stockPortfolio(state: PortfolioState, getters: any, rootState: {}, rootGetters: any): PortfolioDisplayStock[] {
        return state.stocks.map(stock => {
            const record = (<BasicStock[]>rootGetters[stocksKeys.ns.GETTER_STOCKS]).find(element => element.stockId === stock.stockId);
            if (record) {
                return new PortfolioDisplayStock(stock.stockId, record.name, record.price, stock.quantity);
            }
            else {
                throw `Error! Cannot find matching stock. ID: ${stock.stockId}`;
            }
        });
    },
    funds(state: PortfolioState): number {
        return state.funds;
    },
    day(state: PortfolioState): number {
        return state.day;
    },
    portfolioNet(state: PortfolioState, getters: any): number {
        let net = 0;
        (<PortfolioDisplayStock[]>getters[portfolioKeys.GETTER_STOCK_PORTFOLIO]).forEach(stock => net += (stock.price * stock.quantity));
        return net;
    },
    dailyChange(state: PortfolioState, getters: any) {
        return getters.portfolioNet - getters.priorPortfolioNet;
    }
};

export const portfolioModule: Module<PortfolioState,{}> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};