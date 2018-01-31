import React from 'react';
import { Tables, Button } from 'Components';
import { Link } from 'dva/router';
function List({ data = [] }) {
    const columns = [
        { name: '器械名称', value: 'robotCode' },
        { name: '拼音首字母', value: 'robotCode' },
        { name: '包装方式', value: 'robotCode' },
    ];

    // 初始化
    const info = {
        columns,
        data
    }

    return (
        <div className="sa_main">
            <small className="sa_typeButton"><Link to='/settings/appliance/type?type=type'>包装方式设置</Link></small>
            <ul className="sa_header">
                <li className="sa_search"><input type="text" placeholder="请输入器械汉字名称或拼音首字母" /></li>
                <li className="sa_upload"><span>批量导入</span></li>
                <li className="sa_add"><Link to='/settings/appliance/edit?type=add'><Button type="add" /></Link></li>
            </ul>
            <Tables {...info} />
        </div>
    )
}


export default List;