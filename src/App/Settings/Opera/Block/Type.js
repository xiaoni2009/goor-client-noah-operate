import React from 'react';
import { Button } from 'Components';
import { Link } from 'dva/router';

function Type({ data = [] }) {

    return (
        <div className="operaType">
            <ul>
                <li className="flexBox addtype">
                    <img src="./images/icon_add.png" />
                    <span>点击添加手术科室</span>
                </li>
                <li className="flexBox">
                    <div className="bl">
                        <span>邹炎专科精密器械25件</span>
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