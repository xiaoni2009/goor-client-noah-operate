import React, { PropTypes } from 'react';
import { connect } from 'dva';
import './style.less';

import List from './Block/List'

class SettingsAppliance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: 'list'
        }
    }

    render() {
        const { data } = this.props.sappliance;
        // 额外器械类别
        const listProps = {
            data
        }

        return (
            <div className="settingsappliance">
                <div className="breadcrumb"><h3>设置 / 器械信息</h3><small>包装方式设置</small></div>
                <ul className="sa_header">
                    <li className="sa_search"><input type="text" placeholder="请输入器械汉字名称或拼音首字母" /></li>
                    <li className="sa_upload"><span>批量导入</span></li>
                    <li className="sa_add">添加</li>
                </ul>
                <div className="sa_main">
                    <List {...listProps} />
                </div>
            </div>
        )
    }
}

//参数类型验证
SettingsAppliance.propTypes = {
    dispatch: PropTypes.func,
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        sappliance: state.SettingsAppliance
    };
}

export default connect(mapStateToProps)(SettingsAppliance);