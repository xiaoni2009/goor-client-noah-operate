import React from 'react';
import { Tables, Button } from 'Components';
import { Link } from 'dva/router';
function List({ data = [] }) {
    const columns = [
        { name: '手术名称', value: 'robotCode' },
        { name: '拼音首字母', value: 'robotCode' },
        { name: '手术科室', value: 'robotCode' },
    ];

    // 初始化
    const info = {
        columns,
        data
    }

    return (
        <div className="sa_main">
            <small className="sa_typeButton"><Link to='/settings/opera/type?type=type'>手术科室设置</Link></small>
            <ul className="sa_header">
                <li className="sa_search"><input type="text" placeholder="请输入手术汉字名称或拼音首字母" /></li>
                <li className="sa_upload"><span>批量导入</span></li>
                <li className="sa_add"><Link to='/settings/opera/edit?type=add'><Button type="add" /></Link></li>
            </ul>
            <Tables {...info} />
        </div>
    )
}


export default List;