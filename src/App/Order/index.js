import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { confirmAlert, Button, Toast } from 'Components';
import { locals } from 'Utils'
import './style.less'
import OperaConfirm from './OperaConfirm'

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
                onConfirm(call) {
                    call(true);
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

    // 修改数量
    changeEditNum(i, t) {
        const self = this;
        const { extra } = self.props.order;
        const { dispatch } = self.props;

        // 缓存选中值
        let value_ = t.number;

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
                if(value_){
                    call(true);
                    extra[i].number = value_;
                    dispatch({ type: 'Order/save', payload: { extra } });
                    self.setState({ editIndex: null });
                }else {
                    Toast({
                        val: '请输入1-999的范围数值'
                    })
                }

            },
            onCancel() {
                self.setState({ editIndex: null });
            }
        })
    }

    // 返回并取消
    orderClear(bool) {
        const { dispatch } = this.props;
        confirmAlert({
            title: bool ? '订单尚未完成，是否确认离开当前页面？' : '是否清空已选器械',
            message: '',
            confirmLabel: '确认',
            cancelLabel: '取消',
            onConfirm(call) {
                call(true);
                dispatch({ type: 'Order/remove', payload: { index: 10000 } });
                bool && dispatch(routerRedux.push('/'));
            },
            onCancel() {

            }
        });
    }

    // 提交订单
    orderSub() {
        const { station } = locals.get('userInfo');
        //
        const { dispatch, order } = this.props;
        const { extra, bag } = this.props.order;
        let info = {
            station, // 下单手术室站,
            applianceList: []
        }

        // 申请类型 1:按手术类型申请，2：临时器械申请 3:按手术类型申请,但最终请求的手术包与默认的手术包不同
        if (bag.id) {
            info.type = 1; // 按手术类型申请
            info.name = bag.name || '';
            info['operationType'] = {
                id: bag.id
            };
        } else {
            info.type = 2; // 临时器械申请
        }

        // 额外器械列表
        if (extra.length > 0) {
            extra.map((t) => {
                const t_ = t.appliance;
                if (t_.id) {
                    info.applianceList.push({
                        appliance: {
                            id: t_.id,
                            name: t_.name || '',
                            type: t_.packageType ? t_.packageType.name : ''
                        },
                        number: t.number
                    })
                }
            })
        }

        //
        // 订单信息存储在本地
        locals.set('orderInfo', JSON.stringify(info));
        dispatch({ type: 'Order/post', payload: info });
    }

    render() {
        const { editIndex } = this.state;
        // const { order } = this.props;
        // const { applianceList = [], id, name } = order.bag;
        const { extra, bag, app } = this.props.order;
        const { userInfo } = this.props.app;
        return (
            <div className="order">
                {
                    userInfo.station
                    &&
                    <div className="stationName"><span>{userInfo.station.name}</span></div>
                }
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
                                                    <Button type="change" onClick={() => { this.changeEditNum(i, t) }} />
                                                    <Button type="delete" onClick={() => { this.removeBut(i, t) }} />
                                                </div>
                                            }
                                        </li>
                                    )
                                })
                            }
                            <li className="operaAdd" onClick={this.addOpera}>
                                <img className="operaAddimg" src="./images/icon_add.png" />
                                <span>点击添加您所需要的器械</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="orderButton">
                    <Button type="back" onClick={() => { this.orderClear(true) }} />
                    <Button type="empty" onClick={() => { this.orderClear(false) }} />
                    <Button type="submit" onClick={this.orderSub} />
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
        order: state.Order,
        app: state.app
    };
}

export default connect(mapStateToProps)(Order);