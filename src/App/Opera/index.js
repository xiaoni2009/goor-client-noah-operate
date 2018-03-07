import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { SearchKeyword, confirmAlert, Error, Toast } from 'Components';
import OperaConfirm from './OperaConfirm'

import './style.less';

let extra_ = [];

class Opera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
        this.setExtra = this.setExtra.bind(this);
    }

    componentWillUnmount(){
        const { dispatch } = this.props;
        dispatch({ type: 'Opera/save', payload: { data: [] } });
    }

    // 弹出框-编辑数量
    setExtra(t) {
        const self = this;
        const { dispatch, opera } = self.props;
        const { extra } = opera;

        // 缓存选中值
        extra_ = t;
        let value_ = '';

        // OperaConfirm配置
        const ocProps = {
            item: t,
            value: value_,
            operaNum: (num) => {
                // value_ = num || 1;
                value_ = num;
            }
        }

        // 弹出框修改数量
        confirmAlert({
            title: '',
            message: '',
            childrenElement: () => {
                return (
                    <OperaConfirm {...ocProps} />
                )
            },
            confirmLabel: '确认',
            cancelLabel: '取消',
            onConfirm(call) {
                if(value_ &&  value_ < 999){
                    call(true);
                    const extras = {
                        appliance: extra_,
                        number: value_
                    }

                    dispatch({ type: 'Order/query', payload: { extra: extras } });
                    dispatch({ type: 'Opera/save', payload: { data: [] } });
                    dispatch(routerRedux.push('order'));
                }else {
                    Toast({
                        val: '请输入1-999的范围数值'
                    })
                }
            },
            onCancel() {

            }
        })
    }

    render() {
        const { opera, dispatch } = this.props;
        const { data } = opera;

        //
        const keywordProps = {
            placeholder: '请输入器械名称拼音首字母',
            back() {
                dispatch(routerRedux.go(-1));
            },
            search(name) {
                dispatch({ type: 'Opera/query', payload: { name } });
            }
        }

        return (
            <div className="opera">
                <SearchKeyword {...keywordProps} />
                <div className="searchList">
                    {
                        (data && data.length > 0)
                            ?
                            <ul>
                                {
                                    data.map((t, i) => {
                                        return (
                                            <li onClick={() => { this.setExtra(t) }} key={i}><span className={t.name.length > 11 && 'small'}>{t.name}</span><var>{t.packageType ? t.packageType.name : ''}</var></li>
                                        )
                                    })
                                }
                            </ul>
                            :
                            <Error />
                    }
                </div>
            </div>
        )
    }
}

//参数类型验证
Opera.propTypes = {
    dispatch: PropTypes.func,
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        opera: state.Opera
    };
}

export default connect(mapStateToProps)(Opera);