import React, { PropTypes } from 'react';
import { connect } from 'dva';
import './style.less';
import { Button } from 'Components';

let stationIdCache = false, notStationDataCache = false;

class SettingsSystem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1, // 1设置当前手术室 2设置不开放
            stationId: null,
            stationName: null,
            stationType: 2,
            notStationData: []
        }

        this.setStation = this.setStation.bind(this);
        this.changeSetting = this.changeSetting.bind(this);
        this.changeStation = this.changeStation.bind(this);
        this.setNotStation = this.setNotStation.bind(this);
        this.setNotStationActive = this.setNotStationActive.bind(this);
        this.recover = this.recover.bind(this);
        this.saveBind = this.saveBind.bind(this);
        this.restoreNotStationData = this.restoreNotStationData.bind(this);
    }

    componentWillMount() {
        const { userInfo } = this.props.app;
        if (userInfo.station) {
            this.setState({ stationId: userInfo.station.id, stationType: userInfo.type });
        }
    }

    componentWillReceiveProps(nextProps) {
        
        const { applianceData } = nextProps.ssystem;
        const { notStationData } = this.state;
        if (notStationData.length === 0) {
            this.restoreNotStationData(applianceData);
        }
    }

    // 恢复不开放数据
    restoreNotStationData(applianceData) {
        const { notStationData } = this.state;
        let notS_ = [];
        applianceData.map((t) => {
            if (t.robotAccess === 1) {
                notS_.push(t.id)
            }
        })
        this.setState({ notStationData: notS_ });
    }

    // 不开放站数据
    notOpen(data) {
        let d_ = []
        data.map((t, i) => {
            if (t.robotAccess === 1 && d_.length < 3) {
                d_.push(t.name)
            }
        })
        return d_.length > 0 ? d_.join(',') : '无';
    }

    // 切换设置项
    changeSetting(index) {
        const { app, ssystem } = this.props;
        const { userInfo } = app;
        const { applianceData } = ssystem;
        stationIdCache = false;
        notStationDataCache = false;
        this.restoreNotStationData(applianceData);
        this.setState({ index, stationId: userInfo.station.id, stationType: userInfo.type });
    }

    // 切换站类型
    changeStation(stationType) {
        stationIdCache = false;
        this.setState({ stationType, stationId: null });
    }

    // 选择站
    setStation(newStationId, stationName) {
        const { stationId } = this.state;
        if (stationId != newStationId) {
            stationIdCache = true;
            this.setState({ stationId: newStationId, stationName })
        }
    }

    // 选择不可选站
    setNotStation(stationId, stationName) {
        const { notStationData } = this.state;
        if (notStationData.indexOf(stationId) < 0) {
            notStationData.push(stationId);
        } else {
            notStationData.remove(stationId);
        }
        notStationDataCache = true;
        this.setState({ notStationData });
    }

    // 查看是否不可选站
    setNotStationActive(id) {
        const { notStationData } = this.state;
        return notStationData.indexOf(id) >= 0 ? 'active' : '';
    }

    // 恢复按钮
    recover() {
        // 恢复
        // this.setState({ stationId: null, stationName: null, notStationData: [] })
        this.setState({ notStationData: [] });
        notStationDataCache = false;
        const { dispatch } = this.props;
        dispatch({ type: 'SettingsSystem/query', payload: {} });
    }

    // 保存
    saveBind() {
        const { index, stationId, stationType, notStationData } = this.state;
        const { dispatch } = this.props;
        if (index === 1) {
            // 手术室类型设置
            const info = {
                password: 1234,
                station: { id: stationId },
                type: stationType
            }
            dispatch({ type: 'SettingsSystem/bind', payload: { info, stationType } });
        }

        if (index === 2) {
            this.setState({ notStationData });
            // 不开放手术室设置
            dispatch({ type: 'SettingsSystem/notstation', payload: { operations: notStationData } });
        }

        //
        stationIdCache = false;
        notStationDataCache = false;
    }

    render() {
        const { index, stationId, stationType, notStationData } = this.state;
        const { applianceData, operaData } = this.props.ssystem;

        return (
            <div className="settingssystem">
                <div><h3>系统设置</h3></div>
                <div>
                    <ul className="nav">
                        <li className={index === 1 && 'active'} onClick={() => { this.changeSetting(1) }}><span>当前系统类型设置</span><small>(手术室)</small><i></i></li>
                        <li className={index === 2 && 'active'} onClick={() => { this.changeSetting(2) }}><span>不开放手术室设置</span><small>({this.notOpen(applianceData)})</small><i></i></li>
                    </ul>
                    {
                        index === 1
                        &&
                        <div className="station">
                            <div className="stationType">
                                <span onClick={() => { this.changeStation(2) }}><input type="radio" id="appliance" name="stype" defaultChecked={stationType === 2 && 'checked'} /><label htmlFor="appliance">手术间</label></span>
                                <span onClick={() => { this.changeStation(1) }}><input type="radio" id="opera" name="stype" defaultChecked={stationType === 1 && 'checked'} /><label htmlFor="opera">无菌器械包室</label></span>
                            </div>
                            {
                                stationType === 2
                                &&
                                <div>
                                    {
                                        (applianceData && applianceData.length > 0)
                                            ?
                                            <ul className="stations">
                                                {
                                                    applianceData.map((t, i) => {
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
                                            :
                                            <div className="none">无数据</div>
                                    }
                                </div>
                            }
                            {
                                stationType === 1
                                &&
                                <div>
                                    {
                                        (operaData && operaData.length > 0)
                                            ?
                                            <ul className="stations">
                                                {
                                                    operaData.map((t, i) => {
                                                        return (
                                                            <li className={stationId == t.id && 'active'} key={i} onClick={() => { this.setStation(t.id, t.name) }}><span>{t.name}</span></li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            :
                                            <div className="none">无数据</div>
                                    }
                                </div>
                            }
                        </div>
                    }

                    {
                        index === 2
                        &&
                        <div className="station">
                            <ul className="stations">
                                {
                                    applianceData.map((t, i) => {
                                        return (
                                            <li className={this.setNotStationActive(t.id)} key={i} onClick={() => { this.setNotStation(t.id, t.name) }}><span>{t.name}</span></li>
                                        )
                                    })
                                }
                            </ul>
                            <p className="stationsNote">注：关闭手术室可能对正在使用的设备造成影响，请谨慎操作！</p>
                        </div>
                    }
                </div>
                <div className="systemBut">
                    {
                        index === 2
                            ?
                            <div>
                                <Button type="recover" onClick={this.recover} />
                                {
                                    notStationDataCache
                                        ?
                                        <Button type="save" onClick={this.saveBind} />
                                        :
                                        <Button type="savedisable" />
                                }
                            </div>
                            :
                            <div>
                                {
                                    stationIdCache
                                        ?
                                        <Button type="save" onClick={this.saveBind} />
                                        :
                                        <Button type="savedisable" />
                                }
                            </div>
                    }

                </div>
            </div>
        )
    }
}


//参数类型验证
SettingsSystem.propTypes = {
    dispatch: PropTypes.func,
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        ssystem: state.SettingsSystem,
        app: state.app
    };
}

export default connect(mapStateToProps)(SettingsSystem);