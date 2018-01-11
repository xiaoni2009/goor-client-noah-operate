import { QUERY, BIND } from './service';

export default {
	namespace: 'Initial',
	state: {
		data: []
	},
	subscriptions: {

	},
	effects: {
		*query({ payload }, { call, put }) {
			const res = yield call(QUERY, payload.type);
			if(res.code == 0) {
				yield put({ type: 'save', payload: { data: res.data } });
			}
		},
		*bind({ payload }, { call, put }) {
			const res = yield call(BIND, payload.info);
		}
	},
	reducers: {
		save(state, { payload }) {
			return { ...state, ...payload };
		},
	},
}
