import React from 'react'
import './style.less'

class Depot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            depotViewShow: false
        }

        this.depotView = this.depotView.bind(this);
        this.closeDepot = this.closeDepot.bind(this);
    }

    // 订单详情
    depotView(index) {
        this.setState({depotViewShow: true})
    }

    // 关闭详情
    closeDepot(){
        this.setState({depotViewShow: false})
    }

    render() {
        const { depotViewShow } = this.state;
        return (
            <div className="depots">
                {
                    depotViewShow
                        ?
                        <div className="depotView">
                            <div className="depotViewCo">
                                <div className="dList">
                                    <span>手术类型</span>
                                    <p>宫腔镜检查术+空腔镜下上环术+子宫内膜活检术+诊断性刮宫术</p>
                                </div>
                                <div className="dList">
                                    <span>器械列表：</span>
                                    <p className="dlt">1x 侧开口器<br />2x 眼科显微镜电凝系统包1#（10件）<br />3x 邹焱专科精密器械25件<br />4x 耳鼻喉光纤接头</p>
                                </div>
                            </div>
                            <div className="depotViewButton">
                                <i className="depotViewBack" onClick={this.closeDepot}></i>
                                <i className="depotViewOK"></i>
                            </div>
                        </div>
                        :
                        <ul className="depot">
                            <li onClick={() => { this.depotView(1) }}>
                                <div className="dl"><span className="dl_num">手术室编号</span><span>11</span></div>
                                <div className="dr"><span>临时器械申请</span><time>2017/10/29 12:30</time></div>
                            </li>
                            <li onClick={() => { this.depotView(2) }}>
                                <div className="dl"><span className="dl_num">手术室编号</span><span>11</span></div>
                                <div className="dr"><span>临时器械申请</span><time>2017/10/29 12:30</time></div>
                            </li>
                            <li onClick={() => { this.depotView(3) }}>
                                <div className="dl"><span className="dl_num">手术室编号</span><span>11</span></div>
                                <div className="dr"><span>临时器械申请</span><time>2017/10/29 12:30</time></div>
                            </li>
                        </ul>
                }
            </div>
        )
    }
}

export default Depot;