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
        return (
            <div className="header">
                <img src="./images/headerbg.png" />
                {
                    settingShow
                    &&
                    <div onClick={this.jumpSetting} className="settingIcon"><i></i></div>
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