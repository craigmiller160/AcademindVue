import { PortfolioStock } from '@/model/PortfolioStock';

export interface PortfolioState {
    funds: number;
    stocks: PortfolioStock[];
    day: number;
    priorPortfolioNet: number;
}