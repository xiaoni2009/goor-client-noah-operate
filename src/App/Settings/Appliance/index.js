import React, { PropTypes } from 'react';
import { connect } from 'dva';
import './style.less';

//
let breadcrumb_ = [], bb = null;
breadcrumb_['add'] = '新增器械';
breadcrumb_['edit'] = '器械详情';
breadcrumb_['type'] = '包装方式';

class SettingsAppliance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // breadcrumb: ''
        }
    }

    render() {
        const { sappliance, dispatch, children, location } = this.props;
        const { query } = location;
        //
        bb = query.type ? breadcrumb_[query.type]: '';

        // 额外器械类别
        const listProps = {
            data: sappliance ? sappliance.data : [],
            dispatch
        }

        return (
            <div className="settingsappliance">
                <div className="breadcrumb"><h3>设置 / 器械信息{bb && ' / ' + bb}</h3></div>
                {children}
            </div>
        )
    }
}

//参数类型验证
SettingsAppliance.propTypes = {
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func,
    location: PropTypes.object
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        sappliance: state.SettingsAppliance
    };
}

export default connect(mapStateToProps)(SettingsAppliance);