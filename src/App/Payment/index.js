import React from 'react'
import { locals, agvWs } from 'Utils'
import { Link } from 'dva/router';
import './style.less'

const { socketSend } = agvWs;
let getTime = null;


class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 1,
            orderInfo: {},
            back: false
        }
    }

    componentWillMount() {
        let orderInfo = locals.get('orderInfo');
        orderInfo = orderInfo ? JSON.parse(orderInfo) : null;
        if (orderInfo) {
            getTime = new Date().getTime() + 4000;
            this.setState({ orderInfo });
        }
    }

    componentDidMount() {
        const self = this;
        // 需要的机器人配置
        const userInfo = locals.get('userInfo');

        // 切换
        function show(id, back){
            if(back) {
                self.setState({ show: id, back });
            }else {
                self.setState({ show: id });
            }
        }

        const info = { messageType: 'REGISTER', module: 'INFO_ORDER', userId: userInfo.station ? userInfo.station.id : null };
        // ws请求
        if (info.userId) {
            socketSend(info, (res) => {
                const newGetTime = new Date().getTime();
                switch (res.messageType) {
                    case 'NOTIFICATION':
                        // 第二步
                        if (res.body.state == 1) {
                            if (newGetTime > getTime) {
                                show(2);
                            } else {
                                setTimeout(function () {
                                    show(2);
                                    getTime = new Date().getTime() + 4000;
                                }, (getTime - newGetTime));
                            }
                        }

                        // 这里每一步需要做至少4S等待
                        // 第三步
                        if (res.body.state == 3) {
                            if (newGetTime > getTime) {
                                show(3, true);
                            } else {
                                setTimeout(function () {
                                    show(3, true);
                                }, (getTime - newGetTime));
                            }
                        }
                        break;
                    case 'REGISTER':
                        if (newGetTime > getTime) {
                            show(2);
                        } else {
                            setTimeout(function () {
                                show(2);
                                getTime = new Date().getTime() + 4000;
                            }, (getTime - newGetTime));
                        }
                        break;
                    default:
                        break;
                }
            });
        } else {
            console.error('userId为空');
        }
    }

    render() {
        const { show, orderInfo, back } = this.state;
        const { name, applianceList } = orderInfo;
        return (
            <div className="payment">
                {
                    show === 1
                    &&
                    <div className="paymentState">
                        <div className="picon icon1"></div>
                        <ul className="paymentFlow">
                            <li className="icon"><i className="stateLeft"></i><span>发送中</span></li>
                            <li><var></var></li>
                            <li className="icon"><i className="line"><i></i></i><span>待处理</span></li>
                            <li><var></var></li>
                            <li className="icon"><i className="line"><i></i></i><span>待接收</span></li>
                        </ul>
                        <p>正在发送手术包申请，请稍后…</p>
                    </div>
                }
                {
                    show === 2
                    &&
                    <div className="paymentState">
                        <div className="picon icon2"></div>
                        <ul className="paymentFlow">
                            <li className="icon"><i className="stateLeft"></i><span>发送中</span></li>
                            <li><var></var></li>
                            <li className="icon"><i className="stateCenter"></i><span>待处理</span></li>
                            <li><var></var></li>
                            <li className="icon"><i className="line"><i></i></i><span>待接收</span></li>
                        </ul>
                        <p>手术包申请发送成功，请等待工作人员开始处理</p>
                    </div>
                }

                {
                    show === 3
                    &&
                    <div className="paymentState">
                        <div className="picon icon3"></div>
                        <ul className="paymentFlow">
                            <li className="icon"><i className="stateLeft"></i><span>发送中</span></li>
                            <li><var></var></li>
                            <li className="icon"><i className="stateCenter"></i><span>待处理</span></li>
                            <li><var></var></li>
                            <li className="icon"><i className="stateRight"></i><span>待接收</span></li>
                        </ul>
                        <p>手术包开始准备，请做好接受准备<small>触摸任意位置返回</small></p>
                    </div>
                }

                <div className="paymentList">
                    {
                        name
                        &&
                        <div className="pp">
                            <span>手术类型</span>
                            <p>{name}</p>
                        </div>
                    }
                    {
                        (applianceList && applianceList.length > 0)
                        &&
                        <div className="pp">
                            <span>器械列表</span>
                            <p>
                                {
                                    applianceList.map((t, i) => {
                                        return <var key={i}>{i + 1}X {t.appliance.name}<br /></var>
                                    })
                                }
                            </p>
                        </div>
                    }

                </div>

                {back && <Link to='/' className="goback"></Link>}
            </div>
        )
    }
}

export default Payment;