import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { agvWs } from 'Utils'
import './style.less';
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
        const { data } = nextProps.depot;
        const self = this;

        if (fetchOrder) {
            self.setState({ orderList: data });
            fetchOrder = false;
            // 需要的机器人配置
            const info = { messageType: 'REGISTER', module: 'INFO_ORDER', userId: 54 };
            // ws请求
            socketSend(info, (res) => {
                switch (res.messageType) {
                    case 'ORDER':
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
        const { dispatch } = this.props;
        const { depotViewIndex, orderList } = this.state;
        orderList.splice(depotViewIndex, 1);
        this.setState({ orderList, depotViewShow: false });
        dispatch({ type: 'Depot/orderhandle', payload: { id } });
    }

    render() {
        const { depotViewShow, view, orderList } = this.state;

        return (
            <div className="depots">
                {
                    depotViewShow
                        ?
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
                                <i className="depotViewBack" onClick={this.closeDepot}></i>
                                <i className="depotViewOK" onClick={() => { this.okDepot(view.id) }}></i>
                            </div>
                        </div>
                        :
                        <ul className="depot">
                            {
                                orderList.map((t, i) => {
                                    const name = t.operationType ? t.operationType.name : '临时器械申请'
                                    return (
                                        <li onClick={() => { this.depotView(t, i) }} key={i}>
                                            <div className="dl"><span className="dl_num">手术室编号</span><span>{t.id}</span></div>
                                            <div className="dr"><span>{name.length > 10 ? name.substring(0, 10) + '...' : name}</span><time>{t.createTime}</time></div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
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