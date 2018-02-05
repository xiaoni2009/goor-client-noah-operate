import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import '../style.less';

function removeToast(){
    const target = document.getElementById('toasts');
    if(target) {
        unmountComponentAtNode(target);
        target.parentNode.removeChild(target);
    }
}

export function Toast(obj) {
    // 移除上一次
    removeToast();

    // 新建element
    const divTarget = document.createElement('div');
    divTarget.id = 'toasts';
    document.body.appendChild(divTarget);
    render(<p>{obj.val || ''}</p>, divTarget);

    // 移除
    setTimeout(() => {
        removeToast();
    }, obj.time || 3000);
}