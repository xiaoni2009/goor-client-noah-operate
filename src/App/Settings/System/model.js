import { routerRedux } from 'dva/router';
import { QUERY, BIND, NOT_STATION } from './service';
import { locals } from 'Utils';
import { Toast } from 'Components';
export default {
    namespace: 'SettingsSystem',
    state: {
        applianceData: [],
        operaData: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/settings/system') {
                    dispatch({ type: 'query', payload: query });
                }
            });
        },
    },
    effects: {
        *query({ payload }, { call, put, select }) {
            const appliance = yield call(QUERY, 4);
            const opera = yield call(QUERY, 5);
			if(appliance.code == 0 && opera.code == 0) {
				yield put({ type: 'save', payload: { applianceData: appliance.data, operaData: opera.data } });
			}else {
                console.error('数据获取失败');
            }
        },
		*bind({ payload }, { call, put }) {
			const res = yield call(BIND, payload.info);
			if(res.code === 0){
				Toast({
					val: '绑定成功，请重新登录！',
				})
                // 绑定成功
                // if(payload.stationType === 5){
                    locals.remove('userInfo');
                    yield put(routerRedux.go('/'));
                // }
			}
        },
        *notstation({ payload }, { call, put }) {
            const res = yield call(NOT_STATION, payload.operations);
            yield put({ type: 'query', payload: { } });
        }
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },
}
