import { routerRedux } from 'dva/router';
import { QUERY } from './service';

export default {
    namespace: 'SettingsAppliance',
    state: {
        data: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/settings/appliance' || pathname === '/settings/appliance/list') {
                    dispatch({ type: 'query', payload: query });
                }
            });
        },
    },
    effects: {
        *query({ payload }, { call, put, select }) {
            const res = yield call(QUERY, payload);
            if(res.code === 0) {
                yield put({ type: 'save', payload: { data: res.data } });
            }
        }
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },
}