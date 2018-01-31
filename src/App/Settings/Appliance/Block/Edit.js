import React from 'react';
import { Button } from 'Components';

function Edit({ data = [] }) {

    return (
        <div className="applianceEdit froms">
            <ul className="fromMain">
                <li>
                    <div className="label"><label>器械名称：</label></div>
                    <div className="co"><input /></div>
                </li>
                <li>
                    <div className="label"><label>拼音首字母：</label></div>
                    <div className="co"><input /></div>
                </li>
                <li>
                    <div className="label"><label>包装方式：</label></div>
                    <div className="co">
                        <ul className="typeli">
                            <li><span>棉布包</span></li>
                            <li><span>清洗消毒包装</span></li>
                            <li><span>清洗消毒包装</span></li>
                            <li><span>清洗消毒包装</span></li>
                            <li><span>清洗消毒包装</span></li>
                            <li><span>清洗消毒包装</span></li>
                            <li><span>清洗消毒包装</span></li>
                            <li><span>清洗消毒包装</span></li>
                            <li><span>清洗消毒包装</span></li>
                            <li><span>清洗消毒包装</span></li>
                        </ul>
                    </div>
                </li>
            </ul>
            <div className="applianceButton">
                <Button type="remove" />
                <Button type="recover" />
                <Button type="confirm" />
            </div>
        </div>
    )
}


export default Edit