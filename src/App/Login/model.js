import { QUERY} from './service';

export default {
	namespace: 'Login',
	state: {
		data: []
	},
	subscriptions: {

	},
	effects: {
		*query({ payload }, { call, put }) {
            const res = yield call(QUERY, payload.mac);
            if(res.code === 1){

            }
            
            if(res.code === 0){
                
            }
		},
	},
	reducers: {
		save(state, { payload }) {
			return { ...state, ...payload };
		},
	},
}
