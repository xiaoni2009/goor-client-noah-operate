import React from 'react'
import { locals, agvWs } from 'Utils'
import './style.less'

const { socketSend } = agvWs;

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 1,
            orderInfo: {}
        }
    }

    componentWillMount() {
        let orderInfo = locals.get('orderInfo');
        orderInfo = orderInfo ? JSON.parse(orderInfo) : null;
        if (orderInfo) {
            this.setState({ orderInfo });
        }
    }

    componentDidMount() {
        const self = this;
        // 需要的机器人配置
        const info = { messageType: 'REGISTER', module: 'INFO_ORDER', userId: 55 };
        // ws请求
        socketSend(info, (res) => {
            switch (res.messageType) {
                case 'NOTIFICATION':
                    // 这里每一步需要做至少4S等待
                    // 第三步
                    if (res.body.state == 3) {
                        self.setState({ show: 3 })
                    }

                    // 第二步
                    if (res.body.state == 1) {
                        self.setState({ show: 2 })
                    }
                    break;
                default:
                    break;
            }
        });
    }

    render() {
        const { show, orderInfo } = this.state;
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
                        <p>手术包开始准备，请做好接受准备</p>
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
            </div>
        )
    }
}

export default Payment;