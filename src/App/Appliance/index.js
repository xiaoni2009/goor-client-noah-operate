import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import './style.less';
import { SearchKeyword, Error } from 'Components'

class Appliance extends React.Component {
    constructor(props) {
        super(props);
        this.setbao = this.setBag.bind(this);
    }

    setBag(bag) {
        const { dispatch } = this.props;
        dispatch({ type: 'Order/query', payload: { bag } });
        dispatch({ type: 'Appliance/save', payload: { data: [] } });
        dispatch(routerRedux.push('order'));
    }

    render() {

        const { dispatch, appliance } = this.props;
        const { data } = appliance;
        // 配置搜索
        const keywordProps = {
            placeholder: '请输入手术类型拼音首字母',
            back() {
                dispatch(routerRedux.go(-1));
            },
            search(name) {
                dispatch({ type: 'Appliance/query', payload: { name } });
            }
        }

        return (
            <div className="appliance">
                <SearchKeyword {...keywordProps} />
                <div className="searchList">
                {
                    (data && data.length > 0)
                        ?
                        <ul>
                            {
                                data.map((t, i) => {
                                    return (
                                        <li onClick={() => { this.setBag(t) }} key={i}><span className={t.name.length > 50 && 'small'}>{t.name}</span></li>
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
Appliance.propTypes = {
    dispatch: PropTypes.func,
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        appliance: state.Appliance
    };
}

export default connect(mapStateToProps)(Appliance);