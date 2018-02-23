import { routerRedux } from 'dva/router';
import { POST } from './service';

export default {
    namespace: 'Order',
    state: {
        bag: {},
        extra: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/order') {
                    dispatch({ type: 'query', payload: query });
                }
            });
        },
    },
    effects: {
        *query({ payload }, { call, put, select }) {
            if(payload.bag) {
                const bag = payload.bag;
                const bag_ = {
                    id: bag.id,
                    name: bag.name
                }

                const extra_ = bag.applianceList;

                yield put({ type: 'save', payload: { bag: bag_, extra: extra_ } });
            }

            const pe = payload.extra;
            if(pe){
                const Order = yield select(state => state.Order);
                let et = Order.extra, len = et.length, index = null;
                //
                if(len > 0 ){
                    for (let i = 0 ; i < len; i++) {
                        if(et[i].appliance.id == pe.appliance.id){
                            // et[i].number += pe.number; // **注意**需要判断累计大于多少，暂未处理
                            index = i;
                            break;
                        }
                    }
                }
                //
                if(index != null){
                    et[index].number += pe.number;
                }else {
                    et.push(pe);
                }

                //
                // const extra_ = et.concat(pe);
                yield put({ type: 'save', payload: { extra: et } });
            }

        },
        *remove({ payload }, { call, put, select }) {
            const { extra } = yield select(state => state.Order);

            // payload.index >= 10000 等于删除全部
            // 判断删除, 初始化数据
            if(payload.index >= 10000){
                yield put({ type: 'save', payload: { extra: [], bag: {} } });   
            }else {
                try {
                    extra.splice(payload.index, 1);
                    yield put({ type: 'save', payload: { extra } });   
                } catch (error) {
                    console.log('extra为空 不能处理')
                }
            }
        },
        *post({ payload }, { call, put }) {
            const res = yield call(POST, payload);
            if(res.code === 0){
                yield put({ type: 'save', payload: { bag: {}, extra: [] } });
                yield put(routerRedux.push('payment'));
            }
        }
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },
}
