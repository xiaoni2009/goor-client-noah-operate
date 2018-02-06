import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { agvWs } from 'Utils'
import './style.less';
import { Button, confirmAlert } from 'Components';
import { locals } from 'Utils'
const { socketSend } = agvWs;

let fetchOrder = true;

class Depot extends React.Component {
    constructor(props) {
        super(props);
        const { data } = this.props.depot;
        this.state = {
            depotViewShow: false,
            depotViewIndex: null,
            view: {},
            orderList: data
        }

        this.depotView = this.depotView.bind(this);
        this.closeDepot = this.closeDepot.bind(this);
        this.okDepot = this.okDepot.bind(this);
        this.orderConcat = this.orderConcat.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { station } = locals.get('userInfo');
        const { data } = nextProps.depot;
        const self = this;

        if (fetchOrder) {
            self.setState({ orderList: data });
            fetchOrder = false;
            // 需要的机器人配置
            const info = { messageType: 'REGISTER', module: 'INFO_ORDER', userId: station.id || '' };
            // ws请求
            socketSend(info, (res) => {
                switch (res.messageType) {
                    case 'NOTIFICATION':
                        self.orderConcat(res.body)
                        break;
                    default:
                        break;
                }
            });
        }
    }

    //
    orderConcat(data) {
        const { dispatch } = this.props;
        const { orderList } = this.state;
        orderList.unshift(data);
        this.setState({ orderList });

        dispatch({ type: 'Depot/orderreceive', payload: { id: data.id } });
    }

    // 订单详情
    depotView(view, index) {
        this.setState({ depotViewShow: true, view, depotViewIndex: index })
    }

    // 关闭详情
    closeDepot() {
        this.setState({ depotViewShow: false })
    }

    // 受理完毕
    okDepot(id) {
        const self = this;
        const { dispatch } = self.props;
        const { depotViewIndex, orderList, view } = self.state;
        const vl = view.applianceList[0];

        confirmAlert({
            title: '该申请是否已经受理完毕？',
            message: '',
            childrenElement: () => {
                return (
                    <div style={{textAlign:'center', marginTop: '10px'}}>{view.station ? view.station.name : ''} <span style={{color: '#2094FF'}}>{vl.appliance.name}...</span></div>
                )
            },
            confirmLabel: '确认',
            cancelLabel: '取消',
            onConfirm() {
                orderList.splice(depotViewIndex, 1);
                self.setState({ orderList, depotViewShow: false });
                dispatch({ type: 'Depot/orderhandle', payload: { id } });
            },
            onCancel() {

            }
        })
    }

    render() {
        const { depotViewShow, view, orderList } = this.state;

        return (
            <div className="depots">
                {
                    depotViewShow
                        ?
                        <div>
                            <div className="stationName"><span>{view.station ? view.station.name : ''}</span></div>
                            <div className="depotView">
                                <div className="depotViewCo">
                                    {
                                        view.operationType
                                        &&
                                        <div className="dList">
                                            <span>手术类型</span>
                                            <p>{view.operationType.name}</p>
                                        </div>
                                    }
                                    <div className="dList">
                                        <span>器械列表：</span>
                                        <p className="dlt">
                                            {
                                                view.applianceList.map((t, i) => {
                                                    if (t.appliance) {
                                                        return (
                                                            <var key={i}>{i + 1}.{t.appliance.name}  ({t.number}件)</var>
                                                        )
                                                    } else {
                                                        return '';
                                                    }
                                                })
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="depotViewButton">
                                    <Button type="back" onClick={this.closeDepot} />
                                    <Button type="accept" onClick={() => { this.okDepot(view.id) }} />
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="depotsName">申请受理列表</div>
                            <ul className="depot">
                                {
                                    orderList.length > 0
                                        ?
                                        orderList.map((t, i) => {
                                            const name = t.operationType ? t.operationType.name : '临时器械申请'
                                            return (
                                                <li onClick={() => { this.depotView(t, i) }} key={i}>
                                                    <div className="dl"><span className="dl_num">手术室编号</span><span>{t.id}</span></div>
                                                    <div className="dr"><span>{name.length > 10 ? name.substring(0, 10) + '...' : name}</span><time>{t.createTime}</time></div>
                                                </li>
                                            )
                                        })
                                        :
                                        <div className="noOrder"><i></i><span>当前无待处理任务</span></div>
                                }
                            </ul>
                        </div>
                }
            </div>
        )
    }
}

//参数类型验证
Depot.propTypes = {
    dispatch: PropTypes.func,
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        depot: state.Depot
    };
}

export default connect(mapStateToProps)(Depot);