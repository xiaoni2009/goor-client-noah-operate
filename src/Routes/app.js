import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Header } from 'Components/Layout';

import './style.less'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // 注入子界面
        const { children, dispatch } = this.props;

        // Header props
        const headerProps = {
            dispatch,
            location
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