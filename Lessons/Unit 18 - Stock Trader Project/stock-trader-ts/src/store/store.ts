import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { stocksModule } from '@/store/modules/stocks';
import { portfolioModule } from '@/store/modules/portfolio';

Vue.use(Vuex);

const store: StoreOptions<{}> = {
    modules: {
        stocks: stocksModule,
        portfolio: portfolioModule
    }
};

export default new Vuex.Store(store);
