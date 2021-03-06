import { QUERY, ORDERRECEIVE, ORDERHANDLE } from './service';

export default {
	namespace: 'Depot',
	state: {
		data: [],
		fetchOrder: true
	},
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathname === '/depot' || pathname === '/') {
					dispatch({ type: 'query', payload: query });
				}
			});
		},
	},
	effects: {
		*query({ payload }, { call, put }) {
			const res = yield call(QUERY);
			if (res.code === 0) {
				yield put({ type: 'save', payload: { data: res.data } });
			}
		},
		*setOrder({ payload }, { call, put }) {
			
		},
		*orderreceive({ payload }, { call, put }) {
			const res = yield call(ORDERRECEIVE, payload.id);
		},
		*orderhandle({ payload }, { call, put }) {
			const res = yield call(ORDERHANDLE, payload.id);
		}
	},
	reducers: {
		save(state, { payload }) {
			return { ...state, ...payload };
		},
	},
}
