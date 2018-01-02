import { routerRedux } from 'dva/router';

export default {
    namespace: 'Order',
    state: {
        bag: {},
        extra: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/order') {
                    dispatch({ type: 'query', payload: query });
                }
            });
        },
    },
    effects: {
        *query({ payload }, { call, put, select }) {
            const { Appliance, Opera } = yield select(state => state);
            // if (Appliance == undefined || !Appliance.bag.id) {
                // yield put(routerRedux.push('/'));
            // }
        
            yield put({ type: 'save', payload: { bag: Appliance ? Appliance.bag : {}, extra: Opera ? Opera.extra : [] } });
        },
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },
}
