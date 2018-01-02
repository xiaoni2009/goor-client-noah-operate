import React from 'react'

import './style.less'

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
    }

    render() {
        const { show } = this.state;
        return (
            <div className="payment">
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
                {
                    show
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
                    show
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
                    <div className="pp">
                        <span>手术类型</span>
                        <p>宫腔镜检查术+空腔镜下上环术+子宫内膜活检术+诊断性刮宫术</p>
                    </div>
                    <div className="pp">
                        <span>器械列表</span>
                        <p>1X 侧开口器<br />2x 眼科显微镜电凝系统包1#（10件）<br />3x 邹焱专科精密器械25件<br />4x 耳鼻喉光纤接头</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payment;