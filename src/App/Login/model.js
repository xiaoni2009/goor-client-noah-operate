import { QUERY } from './service';
import { routerRedux } from 'dva/router';
import { locals } from 'Utils';

export default {
	namespace: 'Login',
	state: {
		data: {}
	},
	subscriptions: {

	},
	effects: {
		*query({ payload }, { call, put }) {
			const res = yield call(QUERY);
			if(res.code === 0 ){
				const d = res.data;
				const info = {
					mac: d.mac,
					station: {
						id: d.station.id || '',
						name: d.station.name || ''
					},
					type: d.type
				}
				locals.set('userInfo', info);
				// yield put(routerRedux.go('/'));
				// window.location.href= '#/'
				window.location.reload();
			}else {
				yield put(routerRedux.push('initial'));
			}
		},
	},
	reducers: {
		save(state, { payload }) {
			return { ...state, ...payload };
		},
	},
}
