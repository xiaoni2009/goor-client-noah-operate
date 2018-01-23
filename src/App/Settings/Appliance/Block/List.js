import React from 'react';
import { Tables } from 'Components';

function List({ data = [] }) {

    const columns = [
        { name: '器械名称', value: 'robotCode' },
        { name: '拼音首字母', value: 'robotCode' },
        { name: '包装方式', value: 'robotCode' },
    ];

    const info = {
        columns,
        data
    }

    return (
        <Tables {...info} />
    )
}


export default List