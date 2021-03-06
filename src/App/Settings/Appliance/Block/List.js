import React from 'react';
import Upload from 'rc-upload';
import { connect } from 'dva';
import { Tables, Button, SearchKeyword, Toast } from 'Components';
import { Link, routerRedux } from 'dva/router';
import { apiUrl } from 'Utils/config'

function List({ sappliance, dispatch }) {
    const columns = [
        { name: '器械名称', value: 'name' },
        { name: '拼音首字母', value: 'searchName' },
        { name: '包装方式', value: 'packageType.name' },
    ];

    // 初始化table配置
    const info = {
        columns,
        data: sappliance.data,
        edit(res){
            dispatch({ type: 'SettingsAppliance/save', payload: { item: res } });
            dispatch(routerRedux.push('/settings/appliance/edit?type=add'));
        }
    }

    // 配置搜索
    const keywordProps = {
        placeholder: '请输入器械汉字名称或拼音首字母',
        search(name) {
            dispatch({ type: 'SettingsAppliance/query', payload: { name } });
        }
    }

    // 添加
    function add(){
        dispatch({ type: 'SettingsAppliance/save', payload: { item: {} } });
        dispatch(routerRedux.push('/settings/appliance/edit?type=add'));
    }

    // 上传
    const uploaderProps = {
        action: `${apiUrl}appliance/import`,
        onSuccess(res) {
            if(res.code === 0) {
                dispatch({ type: 'SettingsAppliance/query', payload: {} });
            }
            Toast({val: res.message});
        },
    };

    return (
        <div className="sa_main">
            <small className="sa_typeButton"><Link to='/settings/appliance/type?type=type'>包装方式设置</Link></small>
            <ul className="sa_header">
                <li className="sa_search"><SearchKeyword {...keywordProps} /></li>
                <li className="sa_upload"><Upload {...uploaderProps}><Button type="upload" /><span>批量导入</span></Upload></li>
                <li className="sa_add"><Button onClick={add} type="add" /></li>
            </ul>
            <Tables {...info} />
        </div>
    )
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        sappliance: state.SettingsAppliance
    };
}

export default connect(mapStateToProps)(List);