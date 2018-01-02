import { QUERY } from './service';
export default {
	namespace: 'Depot',
	state: {
		data: []
	},
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathname === '/depot') {
					dispatch({ type: 'query', payload: query });
				}
			});
		},
	},
	effects: {
		*query({ payload }, { call, put }) {
			const res = yield call(QUERY);
			if(res.code === 0){
				yield put({ type: 'save', payload: { data: res.data } });
			}
		},
	},
	reducers: {
		save(state, { payload }) {
			return { ...state, ...payload };
		},
	},
}
