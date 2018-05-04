import { store } from '@/store';

export default (to, from, next) => {
    store.dispatch('logout');
    next('/');
};
