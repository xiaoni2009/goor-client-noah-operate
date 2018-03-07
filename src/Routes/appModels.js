import { config } from 'Utils'
import { routerRedux } from 'dva/router'
import { locals, agvWs } from 'Utils'

const userinfo = locals.getSession('userInfo') || {};

export default {
	namespace: 'app',
	state: {
		userInfo: userinfo || {}
	},
	subscriptions: {

	},
	effects: {

	},
	reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
	},
}
