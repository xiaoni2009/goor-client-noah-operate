import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Header } from 'Components/Layout';
import { agvWs } from 'Utils'

import './style.less'

// 注册socket
const { socketLink } = agvWs
socketLink();

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener('keydown', (e) => {
            if ((e.keyCode == 37) && (e.altKey)) {
                // alert("不准你使用ALT+方向键后退网页！");
                event.returnValue = false;
            }
        })
    }

    render() {
        // 注入子界面
        const { children, dispatch, app } = this.props;

        // Header props
        const headerProps = {
            dispatch,
            location,
            app
        }
        //
        return (
            <div>
                <Header {...headerProps} />
                <div className="container">
                    <div className="content">{children}</div>
                </div>
            </div>
        )
    }
}

//参数类型验证
App.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    app: PropTypes.object,
    loading: PropTypes.object,
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        loading: state.loading.models.app,
        app: state.app
    };
}

export default connect(mapStateToProps)(App);