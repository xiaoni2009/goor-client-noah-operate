import { routerRedux } from 'dva/router';
import { QUERY } from './service';
import { locals } from 'Utils';

export default {
    namespace: 'SettingsAppliance',
    state: {
        data: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/settings/appliance') {
                    dispatch({ type: 'query', payload: query });
                }
            });
        },
    },
    effects: {
        *query({ payload }, { call, put, select }) {
            const appliance = yield call(QUERY, {});
        }
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },
}
