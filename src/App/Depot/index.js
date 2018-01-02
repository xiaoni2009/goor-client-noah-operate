import React, { PropTypes } from 'react';
import { connect } from 'dva';
import './style.less'

class Depot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            depotViewShow: false,
            view: {}
        }

        this.depotView = this.depotView.bind(this);
        this.closeDepot = this.closeDepot.bind(this);
        this.okDepot = this.okDepot.bind(this);
    }

    // 订单详情
    depotView(view) {
        this.setState({ depotViewShow: true, view })
    }

    // 关闭详情
    closeDepot() {
        this.setState({ depotViewShow: false })
    }

    // 受理完毕
    okDepot(id){
        console.log(id)
    }

    render() {
        const { depotViewShow, view } = this.state;
        const { data } = this.props.depot;

console.log(view)

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
                                            view.applianceList.map((t, i)=>{
                                                return (
                                                    <span key={i}>{i}.</span>
                                                )
                                            })
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="depotViewButton">
                                <i className="depotViewBack" onClick={this.closeDepot}></i>
                                <i className="depotViewOK"  onClick={()=>{this.okDepot(view.id)}}></i>
                            </div>
                        </div>
                        :
                        <ul className="depot">
                            {
                                data.map((t, i) => {
                                    const name = t.operationType ? t.operationType.name : '临时器械申请'
                                    return (
                                        <li onClick={() => { this.depotView(t) }} key={i}>
                                            <div className="dl"><span className="dl_num">手术室编号</span><span>{t.id}</span></div>
                                            <div className="dr"><span>{name.length > 10 ? name.substring(0, 10) + '...' : name}</span><time>2017/10/29 12:30</time></div>
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