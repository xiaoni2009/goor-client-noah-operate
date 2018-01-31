import React, { PropTypes } from 'react';
import { connect } from 'dva';
import './style.less';

//
let breadcrumb_ = [], bb = null;
breadcrumb_['add'] = '新增手术信息';
breadcrumb_['edit'] = '手术详情';
breadcrumb_['type'] = '科室列表';

class SettingsOpera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // breadcrumb: ''
        }
    }

    render() {
        const { sopera, dispatch, children, location } = this.props;
        const { query } = location;

        //
        bb = query.type ? breadcrumb_[query.type]: '';

        // 额外器械类别
        const listProps = {
            data: sopera ? sopera.data : [],
            dispatch
        }

        return (
            <div className="settingsopera">
                <div className="breadcrumb"><h3>设置 / 手术信息{bb && ' / ' + bb}</h3></div>
                {children}
            </div>
        )
    }
}

//参数类型验证
SettingsOpera.propTypes = {
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func,
    location: PropTypes.object
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        sopera: state.Settingsopera
    };
}

export default connect(mapStateToProps)(SettingsOpera);