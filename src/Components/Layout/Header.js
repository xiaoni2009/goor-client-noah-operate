import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { routerRedux } from 'dva/router';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settingShow: true
        }
        this.jumpSetting = this.jumpSetting.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { location } = nextProps;
        // 根据路由显示隐藏设置按钮
        this.setState({ settingShow: location.hash === '#/' ? true : false })
    }

    // 跳转到设置界面
    jumpSetting() {
        const { dispatch } = this.props;
        dispatch(routerRedux.push(`/settings`));
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
                        <div><img src="./images/headerbg2.png" /></div>
                        :

                        <div>
                            <img src="./images/headerbg1.png" />
                            {
                                settingShow
                                &&
                                <div onClick={this.jumpSetting} className="settingIcon"><i></i></div>
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