import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import './style.less'

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editIndex: null
        }

        this.addOpera = this.addOpera.bind(this);
        this.EditOpera = this.EditOpera.bind(this);
        this.orderBack = this.orderBack.bind(this);
        this.orderClear = this.orderClear.bind(this);
        this.orderSub = this.orderSub.bind(this);

    }

    // 跳转至额外器械
    addOpera() {
        const { dispatch } = this.props;
        dispatch(routerRedux.push('opera'));
    }

    // 编辑器械
    EditOpera(editIndex) {
        this.setState({ editIndex });
    }

    // 返回并取消
    orderBack() {
        const { dispatch } = this.props;
        dispatch(routerRedux.push('/'));
    }

    // 清空器械
    orderClear() {
        console.log('清空器械')
    }

    // 提交订单
    orderSub() {
        console.log('提交订单')
    }

    render() {
        const { order, dispatch } = this.props;
        const { editIndex } = this.state;
        const { applianceList = [], id, name } = order.bag;
        const extra = order.extra;
        // 手术类型器械包 + 额外器械包
        const extraList = applianceList.concat(extra);
        return (
            <div className="order">
                <div className="orderList">
                    {
                        id
                        &&
                        <div className="bagType">
                            <span>手术类型</span>
                            <small>{name}</small>
                        </div>
                    }
                    <div className="operaType">
                        <ul>
                            {
                                extraList.map((t, i) => {
                                    return (
                                        <li key={i} onClick={() => { this.EditOpera(i) }}>
                                            <big>{t.appliance ? t.appliance.name : ''}</big>
                                            <small>({t.appliance ? t.appliance.packageType.name : ''})</small>
                                            <var>数量：{t.number}</var>
                                            {
                                                editIndex === i
                                                &&
                                                <div className="editOpera">
                                                    <i className="editBut"></i>
                                                    <i className="removeBut"></i>
                                                </div>
                                            }
                                        </li>
                                    )
                                })
                            }
                            <li className="operaAdd" onClick={this.addOpera}>
                                <img src="./images/icon_add.png" />
                                <span>点击添加您所需要的器械</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="orderButton">
                    <i className="orderBack" onClick={this.orderBack}></i>
                    <i className="orderClear" onClick={this.orderClear}></i>
                    <i className="orderSub" onClick={this.orderSub}></i>
                </div>
            </div>
        )
    }
}

//参数类型验证
Order.propTypes = {
    dispatch: PropTypes.func,
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        order: state.Order
    };
}

export default connect(mapStateToProps)(Order);