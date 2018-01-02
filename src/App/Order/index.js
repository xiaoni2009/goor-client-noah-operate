import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { confirmAlert } from 'Components';
import './style.less'

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editIndex: null
        }

        this.addOpera = this.addOpera.bind(this);
        this.EditOpera = this.EditOpera.bind(this);
        this.removeBut = this.removeBut.bind(this);
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

    // 删除器械
    removeBut(index, t) {
        const self = this;
        const { dispatch } = self.props;

        // 弹出框修改数量
        try {
            confirmAlert({
                title: '是否删除已选器械',
                message: `${t.appliance.name}(${t.appliance.packageType.name})    数量：${t.number}`,
                confirmLabel: '确认',
                cancelLabel: '取消',
                onConfirm() {
                    self.setState({ editIndex: null });
                    dispatch({ type: 'Order/remove', payload: { index } });
                },
                onCancel() {
                    self.setState({ editIndex: null });
                }
            });
        } catch (error) {
            console.log('appliance数据结构不完整');
        }
    }

    // 返回并取消
    orderClear(bool) {
        const { dispatch } = this.props;
        confirmAlert({
            title: bool ? '订单尚未完成，是否确认离开当前页面？' : '是否清空已选器械',
            message: '',
            confirmLabel: '确认',
            cancelLabel: '取消',
            onConfirm() {
                dispatch({ type: 'Order/remove', payload: { index: 10000 } });
                bool && dispatch(routerRedux.push('/'));
            },
            onCancel() {

            }
        });
    }

    // 提交订单
    orderSub() {

        //
        const { dispatch, order } = this.props;
        const { extra, bag } = this.props.order;
        let info = {
            station: {
                "id": 30 // 下单手术室站
            },
            applianceList: []
        }

        // 申请类型 1:按手术类型申请，2：临时器械申请 3:按手术类型申请,但最终请求的手术包与默认的手术包不同
        if (bag.id) {
            info.type = 1; // 按手术类型申请
            info['operationType'] = {
                id: bag.id
            };
        } else {
            info.type = 2; // 临时器械申请
        }

        // 额外器械列表
        if(extra.length > 0) {
            extra.map((t)=>{
                info.applianceList.push({
                    appliance: {
                        id: t.appliance.di
                    },
                    number: t.number
                })
            })   
        }

        dispatch({ type: 'Order/post', payload: info });
    }

    render() {
        const { editIndex } = this.state;
        // const { order } = this.props;
        // const { applianceList = [], id, name } = order.bag;
        const { extra, bag } = this.props.order;

        return (
            <div className="order">
                <div className="orderList">
                    {
                        bag.id
                        &&
                        <div className="bagType">
                            <span>手术类型</span>
                            <small>{bag.name}</small>
                        </div>
                    }
                    <div className="operaType">
                        <ul>
                            {
                                extra.map((t, i) => {
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
                                                    <i className="removeBut" onClick={() => { this.removeBut(i, t) }}></i>
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
                    <i className="orderBack" onClick={() => { this.orderClear(true) }}></i>
                    <i className="orderClear" onClick={() => { this.orderClear(false) }}></i>
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