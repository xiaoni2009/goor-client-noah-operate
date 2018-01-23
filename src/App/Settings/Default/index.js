import React from 'react';
import { Link } from 'dva/router'
import './style.less';

function Settings() {
    return (
        <div className="settings">
            <div>
                <h3>设置</h3>
                <div className="sco">
                    <Link to='settings/appliance'><i className="b1"></i></Link>
                    <Link to='settings/opera'><i className="b2"></i></Link>
                    <Link to='settings/system'><i className="b3"></i></Link>
                </div>
            </div>
        </div>
    )
}

export default Settings;