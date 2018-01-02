import { QUERY } from './service';

export default {
	namespace: 'Opera',
	state: {
		Visible: false,
		data: [],
		extra: []
	},
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathname === '/opera') {
					// dispatch({ type: 'query', payload: query });
				}
			});
		},
	},
	effects: {
		*query({ payload }, { call, put }) {
			// 
			const res = yield call(QUERY, payload.name);
			yield put({ type: 'save', payload: { data: res.data } });
		},
	},
	reducers: {
		save(state, { payload }) {
			return { ...state, ...payload };
		},
		// VisibleEdit(state, action) {
		// 	return { ...state, ...action.payload };
		// },
	},
}
