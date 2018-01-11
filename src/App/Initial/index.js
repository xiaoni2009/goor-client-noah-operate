import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { browserHistory } from 'react-router'
import './style.less';
import { Button, confirmAlert } from 'Components';

class Initial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            type: null,
            stationId: null
        }

        this.confirm = this.confirm.bind(this);
        this.back = this.back.bind(this);
        this.setStation = this.setStation.bind(this);
        this.stationBind = this.stationBind.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // const { data } = nextProps.initial
        // this.setState({index});
    }

    // 选择站类型 选择站
    confirm() {
        const self = this;
        confirmAlert({
            title: '此设备将会用于无菌器械包室，是否确认？',
            message: '',
            confirmLabel: '确认',
            cancelLabel: '取消',
            onConfirm() {
                const { dispatch } = self.props;
                const { type } = self.state;
        
                self.setState({ index: 2 });
                dispatch({ type: 'Initial/query', payload: { type } });
            }
        });
    }

    // 界面后退
    back() {
        const { index } = this.state;
        if (index === 1) {
            browserHistory.goBack();
        } else {
            this.setState({ index: 1 })
        }
    }

    // 选择站
    setStation(stationId) {
        this.setState({ stationId })
    }

    // 绑定站
    stationBind() {
        const { dispatch } = self.props;
        const { type, stationId } = this.state;
        const info = {
            password: 1234,
            mac: '',
            station: stationId,
            type
        }
        dispatch({ type: 'Initial/bind', payload: { info } });
    }

    render() {
        const { type, index, stationId } = this.state;
        const { data } = this.props.initial;

        return (
            <div className="initial">
                {
                    index === 1
                    &&
                    <div className="types">
                        <h3>请选择此设备的使用场所</h3>
                        <div className="initType">
                            <i className={'initAppliance ' + (type === 4 && 'active')} onClick={() => { this.setState({ type: 4 }) }}></i>
                            <i className={'initOpera ' + (type === 5 && 'active')} onClick={() => { this.setState({ type: 5 }) }}></i>
                        </div>

                        <div className="initBut">
                            <Button type="back" onClick={this.back} />
                            {
                                type
                                    ?
                                    <Button type="confirm" onClick={this.confirm} />
                                    :
                                    <Button type="noconfirm" />
                            }
                        </div>
                    </div>
                }
                {
                    index === 2
                    &&
                    <div className="station">
                        <h3>请选择此设备所在的手术间</h3>
                        <ul className="stations">
                            {
                                data.map((t, i) => {
                                    if (t.robotAccess === 0) {
                                        return (
                                            <li className={stationId == t.id && 'active'} key={i} onClick={() => { this.setStation(t.id) }}><span>{t.name}</span></li>
                                        )
                                    }

                                    if (t.robotAccess === 1) {
                                        return (
                                            <li className="none" key={i}><span>{t.name}</span></li>
                                        )
                                    }
                                })
                            }
                        </ul>
                        <div className="initBut">
                            <Button type="back" onClick={this.back} />
                            <Button type="confirm" onClick={this.stationBind} />
                        </div>
                    </div>
                }
            </div>
        )
    }
}

//参数类型验证
Initial.propTypes = {
    dispatch: PropTypes.func,
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        initial: state.Initial
    };
}

export default connect(mapStateToProps)(Initial);