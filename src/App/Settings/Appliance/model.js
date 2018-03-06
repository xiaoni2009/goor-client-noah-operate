import { routerRedux } from 'dva/router'
import { QUERY, POST, DELETE, PACKAGETYPE, PACKAGETYPEDELETE, PACKAGETYPEPOST } from './service';
import { Toast } from 'Components';

let payload_ = {};
export default {
    namespace: 'SettingsAppliance',
    state: {
        item: {},
        data: {},
        appliancePackageType: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/settings/appliance/list') {
                    dispatch({ type: 'query', payload: query });
                }

                if (pathname === '/settings/appliance/type') {
                    dispatch({ type: 'packageType' });
                }
            });
        }
    },
    effects: {
        *query({ payload }, { call, put }) {
            payload_ = payload;
            const res = yield call(QUERY, payload_);
            yield put({ type: 'save', payload: { data: res.data } });
        },
        *post({ payload }, { call, put }) {
            const res = yield call(POST, payload);
            if(res.code == 0){
                Toast({val: res.message});
                yield put(routerRedux.push('/settings/appliance/list'));
            }
        },
        *delete({ payload }, { call, put }) {
            const res = yield call(DELETE, payload.id);
            if(res.code === 0) {
                Toast({val: res.message});
                yield put(routerRedux.push('/settings/appliance/list'));
            }
        },
        *packageType({ payload }, { call, put }) {
            const res = yield call(PACKAGETYPE);
            yield put({ type: 'save', payload: { appliancePackageType: res.data ? res.data.list : [] } });
        },
        *packageTypeDelete({ payload }, { call, put }) {
            const res = yield call(PACKAGETYPEDELETE, payload.id);
            if(res.code === 0) {
                Toast({val: res.message});
            }
            yield put({ type: 'packageType'})
        },
        *packageTypePost({ payload }, { call, put }) {
            const res = yield call(PACKAGETYPEPOST, payload);
            if(res.code === 0) {
                Toast({val: res.message});
            }
            yield put({ type: 'packageType'})
        },
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        }
    },
}
