import React from 'react';
import { connect } from 'dva';
import { Tables, Button, SearchKeyword } from 'Components';
import { Link, routerRedux } from 'dva/router';

function List({ sopera, dispatch}) {
    const columns = [
        { name: '手术名称', value: 'name' },
        { name: '拼音首字母', value: 'searchName' },
        { name: '手术科室', value: 'operationDepartmentType.name' },
    ];

    // 初始化
    const info = {
        columns,
        data: sopera.data,
        edit(res){
            dispatch({ type: 'SettingsOpera/save', payload: { item: res } });
            dispatch(routerRedux.push('/settings/opera/edit?type=add'));
        }
    }

    // 配置搜索
    const keywordProps = {
        placeholder: '请输入器械汉字名称或拼音首字母',
        search(name) {
            dispatch({ type: 'SettingsOpera/query', payload: { name } });
        }
    }

    // 添加
    function add(){
        dispatch({ type: 'SettingsOpera/save', payload: { item: {} } });
        dispatch(routerRedux.push('/settings/opera/edit?type=add'));
    }

    return (
        <div className="sa_main">
            <small className="sa_typeButton"><Link to='/settings/opera/type?type=type'>手术科室设置</Link></small>
            <ul className="sa_header">
                <li className="sa_search"><SearchKeyword {...keywordProps} /></li>
                <li className="sa_upload"><span>批量导入</span></li>
                <li className="sa_add"><Button onClick={add} type="add" /></li>
            </ul>
            <Tables {...info} />
        </div>
    )
}


// state注入进来
function mapStateToProps(state, loading) {
    return {
        sopera: state.SettingsOpera
    };
}

export default connect(mapStateToProps)(List);