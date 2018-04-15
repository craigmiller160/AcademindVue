import * as types from './types';

export default {
    [types.UPDATE_VALUE]: (context, payload) => {
        context.commit(types.MUTATE_UPDATE_VALUE, payload);
    }
}
