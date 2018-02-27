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
            typeId: null,
            stationId: null,
            stationName: ''
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
        const { type, typeId } = self.state;
    
        confirmAlert({
            title: '此设备将会用于'+(typeId == '1' ? '无菌器械包室' : '手术间') +'，是否确认？',
            message: '',
            confirmLabel: '确认',
            cancelLabel: '取消',
            onConfirm(call) {
                call(true);
                const { dispatch } = self.props;

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
            this.setState({ index: 1, stationId: null })
        }
    }

    // 选择站
    setStation(stationId, stationName) {
        this.setState({ stationId, stationName })
    }

    // 绑定站
    stationBind() {
        const { dispatch } = this.props;
        const { typeId, stationId, stationName } = this.state;

        if(stationId) {
            confirmAlert({
                title: '此设备将会用于'+stationName+'，是否确认？',
                message: '',
                confirmLabel: '确认',
                cancelLabel: '取消',
                onConfirm(call) {
                    call(true);
                    const info = {
                        password: 1234,
                        station: { id: stationId },
                        type: typeId
                    }
                    dispatch({ type: 'Initial/bind', payload: { info } });
                }
            });
        }else {
            confirmAlert({
                title: '请选择站',
                confirmLabel: '确认',
                onConfirm(call) {
                    call(true);

                }
            });
        }
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
                            <i className={'initAppliance ' + (type === 4 && 'active')} onClick={() => { this.setState({ type: 4, typeId: 2 }) }}></i>
                            <i className={'initOpera ' + (type === 5 && 'active')} onClick={() => { this.setState({ type: 5, typeId: 1 }) }}></i>
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
                        {
                            type === 4
                            &&
                            <h3>请选择此设备所在的手术间</h3>
                        }
                        {
                            type === 5
                            &&
                            <h3>请选择此设备所在的无菌器械包室</h3>
                        }
                        <ul className="stations">
                            {
                                data.map((t, i) => {
                                    if (t.robotAccess === 0) {
                                        return (
                                            <li className={stationId == t.id && 'active'} key={i} onClick={() => { this.setStation(t.id, t.name) }}><span>{t.name}</span></li>
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
                            {
                                stationId
                                ?
                                <Button type="confirm" onClick={this.stationBind} />
                                :
                                <Button type="noconfirm" />
                            }
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