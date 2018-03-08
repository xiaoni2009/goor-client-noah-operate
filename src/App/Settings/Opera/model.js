import { routerRedux } from 'dva/router';
import { QUERY, POST, DELETE, DEPARTMENTTYPE, DEPARTMENTTYPEPOST, DEPARTMENTTYPEDELETE, SEARCHNAME } from './service';
import { Toast } from 'Components';

let payload_ = {};

export default {
    namespace: 'SettingsOpera',
    state: {
        item: {},
        data: [],
        departmenttype: [],
        OperationType: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/settings/opera/list') {
                    dispatch({ type: 'query', payload: query });
                }

                if (pathname === '/settings/opera/type' || pathname === '/settings/opera/edit') {
                    dispatch({ type: 'departmentType' });
                }
            });
        },
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
                yield put(routerRedux.push('/settings/opera/list'));
            }
        },
        *delete({ payload }, { call, put }) {
            const res = yield call(DELETE, payload.id);
            if(res.code === 0) {
                Toast({val: res.message});
                yield put(routerRedux.push('/settings/opera/list'));
            }
        },
        *departmentType({ payload }, { call, put }) {
            const res = yield call(DEPARTMENTTYPE);
            yield put({ type: 'save', payload: { departmenttype: res.data ? res.data.list : [], OperationType: [] } });
        },
        *departmentDelete({ payload }, { call, put }) {
            const res = yield call(DEPARTMENTTYPEDELETE, payload.id);
            if(res.code === 0) {
                Toast({val: res.message});
                yield put({ type: 'departmentType'});
            }
        },
        *departmentPost({ payload }, { call, put }) {
            const res = yield call(DEPARTMENTTYPEPOST, payload);
            if(res.code === 0) {
                Toast({val: res.message});
                yield put({ type: 'departmentType'});
            }
        },
        *searchName({ payload }, { call, put }) {
            if(payload.name) {
                const res = yield call(SEARCHNAME, payload.name );
                yield put({ type: 'save', payload: { OperationType: res.data || [] } });
            }
        }
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },
}
