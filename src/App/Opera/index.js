import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { SearchKeyword, confirmAlert } from 'Components';

import './style.less';

let extra_ = [];

class Opera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        }
        this.operaNum = this.operaNum.bind(this);
        this.setExtra = this.setExtra.bind(this);
    }

    // 修改数量
    operaNum(e) {
        // const _e = e.target.value.replace(/[^\d]/g, '');
        const num = parseInt(e.target.value || '1');
        console.log(num)
        this.setState({ value:  num});
    }

    // 弹出框-编辑数量
    setExtra(t) {
        const { dispatch, opera } = this.props;
        const { extra } = opera;
        const { value } = this.state;

        // 缓存选中值
        extra_ = t;      

        // 弹出框修改数量
        confirmAlert({
            title: '',
            message: '',
            childrenElement: () => {
                return (
                    <div className="cf">
                        <div className="cf_type">当前选择器械：</div>
                        <div className="of_name">{t.name}<small>{t.packageType ? t.packageType.name : ''}</small></div>
                        <div className="of_val">请选择器械的数量：<input type="number" defaultValue={1} onKeyUp={this.operaNum} min="1" max="999" /></div>
                    </div>
                )
            },
            confirmLabel: '确认',
            cancelLabel: '取消',
            onConfirm() {
                extra.push({
                    appliance:extra_,
                    number: value
                })
                dispatch({ type: 'Opera/save', payload: { extra } });
                dispatch(routerRedux.push('order'));
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
                    <ul>
                        {
                            (data && data.length > 0)
                            &&
                            data.map((t, i) => {
                                return (
                                    <li onClick={() => { this.setExtra(t) }} key={i}><span className={t.name.length > 12 && 'small'}>{t.name}</span><var>{t.packageType ? t.packageType.name : ''}</var></li>
                                )
                            })
                        }
                    </ul>
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