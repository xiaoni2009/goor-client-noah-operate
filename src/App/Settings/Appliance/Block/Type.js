import React from 'react';
import { Button } from 'Components';
import { Link } from 'dva/router';

function Type({ data = [] }) {

    return (
        <div className="applianceType">
            <ul>
                <li className="flexBox addtype">
                    <img src="./images/icon_add.png" />
                    <span>点击添加包装方式</span>
                </li>
                <li className="flexBox">
                    <div className="bl">
                        <span>邹炎专科精密器械25件</span>
                        <small>（硬式灭菌专用器）</small>
                    </div>
                    <div className="br">
                        <Button type="smalldelete" />
                        <i className="line"></i>
                        <Button type="smalledit" />
                    </div>
                </li>
                <li className="flexBox">
                    <div className="bl">
                        <span>邹炎专科精密器械25件</span>
                        <small>（硬式灭菌专用器）</small>
                    </div>
                    <div className="br">
                        <Button type="smalldelete" />
                        <i className="line"></i>
                        <Button type="smalledit" />
                    </div>
                </li>
            </ul>
        </div>
    )
}


export default Type;