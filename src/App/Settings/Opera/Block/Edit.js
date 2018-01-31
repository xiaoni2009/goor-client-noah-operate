import React from 'react';
import { Button } from 'Components';

function Edit({ data = [] }) {

    return (
        <div className="operaEdit froms">
            <ul className="fromMain">
                <li>
                    <div className="label"><label>手术名称：</label></div>
                    <div className="co"><input /></div>
                </li>
                <li>
                    <div className="label"><label>拼音首字母：</label></div>
                    <div className="co"><input /></div>
                </li>
                <li>
                    <div className="label"><label>手术科室：</label></div>
                    <div className="co">
                        <select>
                            <option>123</option>
                        </select>
                    </div>
                </li>
                <li>
                    <div className="label"><label>默认器械：</label></div>
                    <div className="co">
                        <select>
                            <option>123</option>
                        </select>
                    </div>
                </li>
            </ul>
            <div className="operaButton">
                <Button type="remove" />
                <Button type="recover" />
                <Button type="confirm" />
            </div>
        </div>
    )
}


export default Edit