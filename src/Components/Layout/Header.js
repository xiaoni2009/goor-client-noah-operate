import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { routerRedux } from 'dva/router';
import { Button, confirmAlert, Toast } from 'Components';
import { config } from 'Utils';

import './style.less';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settingShow: false
        }
        this.jumpSetting = this.jumpSetting.bind(this);
        this.back = this.back.bind(this);
    }

    componentWillMount() {
        // const { location } = this.props;
        const { userInfo } = this.props.app;
        if(userInfo.mac) {
            // 根据路由显示隐藏设置按钮
            this.setState({ settingShow: true })
        }
    }

    // 跳转到设置界面
    jumpSetting() {
        const { dispatch, app } = this.props;
        const { userInfo } = app;
        let password = null;
        function setVal(e){
            password = e.target.value;
        }

        if(userInfo.mac) {
            // 密码确认
            confirmAlert({
                title: '输入密码认证',
                message: '',
                childrenElement: () => {
                    return (
                        <input className="settingInput" autoFocus="autofocus" onChange={setVal} maxLength="4" />
                    )
                },
                confirmLabel: '确认',
                cancelLabel: '取消',
                onConfirm() {
                    if(password == '5678'){
                        dispatch(routerRedux.push(`/settings`));
                    }else {
                        Toast({val: '密码错误！'})
                    }
                },
                onCancel() {

                }
            })
        }else {
			var apiDomain = prompt('请输入 API 的 IP 地址!',config.getApi);
			if (!apiDomain) {
				return false;
			}else {
                config.setApi(apiDomain);
			}
        }
    }

    // 后退
    back() {
        const { dispatch } = this.props;
        dispatch(routerRedux.go(-1));
    }

    render() {
        const { settingShow } = this.state;
        const { location } = this.props;
        let sett = false;

        if (location.hash.indexOf('settings') >= 0) {
            sett = true
        }

        return (
            <div className="header">
                {
                    sett
                        ?
                        <div className="headerSet"><Button type="backLeft" onClick={this.back} /><img src="./images/headerbg2.png" /></div>
                        :
                        <div>
                            <img src="./images/headerbg1.png" />
                            {
                                settingShow
                                ?
                                <div onClick={this.jumpSetting} className="settingIcon"><i></i></div>
                                :
                                <div onClick={this.jumpSetting} className="settingIcon" style={{width:'50px', height:'50px'}}></div>
                            }
                        </div>
                }
            </div>
        )
    }
}

Header.propTypes = {
    dispatch: PropTypes.func,
    location: PropTypes.object,
}

export default Header;