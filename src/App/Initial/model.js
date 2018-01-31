import { QUERY, BIND } from './service';
import { locals } from 'Utils';
import { routerRedux } from 'dva/router';

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
			console.log(456)
			const res = yield call(BIND, payload.info);
			if(res.code === 0){
				const d = res.data;
				let info = {}
				if(d.mac) {
					info = {
						mac: d.mac,
						station: {
							id: d.station.id || '',
							name: d.station.name || ''
						},
						type: d.type
					}
				}
				locals.set('userInfo', info);
				console.log(123)
				// yield put(routerRedux.go('/'));
				window.location.href= '/'
			}
		}
	},
	reducers: {
		save(state, { payload }) {
			return { ...state, ...payload };
		},
	},
}
