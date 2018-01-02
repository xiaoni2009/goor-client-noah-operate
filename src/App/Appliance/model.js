import { QUERY } from './service';
export default {
	namespace: 'Appliance',
	state: {
		data: [],
		bag: {},
	},
	subscriptions: {
		// setup({ dispatch, history }) {
		// 	return history.listen(({ pathname, query }) => {
		// 		if (pathname === '/appliance') {
		// 			dispatch({ type: 'query', payload: query });
		// 		}
		// 	});
		// },
	},
	effects: {
		*query({ payload }, { call, put }) {
			const res = yield call(QUERY, payload.name);
			yield put({ type: 'save', payload: { data: res.data } });
		},
	},
	reducers: {
		save(state, { payload }) {
			return { ...state, ...payload };
		},
	},
}
