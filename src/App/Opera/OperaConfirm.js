import React, { PropTypes } from 'react';

import './style.less';

class OperaConfirm extends React.Component {
    constructor(props) {
        super(props);
        const { value } = this.props;
        this.state = {
            value,
            errorMax: false
        }

        this.setNum = this.setNum.bind(this);
    }

    setNum(e) {

        const { operaNum } = this.props;

        // 转数字
        let _e = e.target.value;
        if (_e !== 0 && _e != '') {
            _e = _e.replace(/[^\d]/g, '');
        }
        let num = parseInt(e.target.value);

        // 大于
        if (num > 1000 || num < 1) {
            this.setState({ errorMax: true });
        }else {
            this.setState({ errorMax: false });
        }

        // 值回调
        operaNum(num);

        this.setState({ value: num });
    }

    render() {
        const { item } = this.props;
        const { value, errorMax } = this.state;
        return (
            <div className="cf">
                <div className="cf_type">当前选择器械：</div>
                <div className="of_name">{item.name}<small>{item.packageType ? item.packageType.name : ''}</small></div>
                <div className="of_val">请选择器械的数量：<input type="number" value={value} placeholder="1~999" onChange={this.setNum} />{errorMax && <span className="errorMax">超出限制</span>}</div>
            </div>
        )
    }
}

//参数类型验证
OperaConfirm.propTypes = {
    item: PropTypes.object.isRequired,
    // operaNum: PropTypes.fun
}

export default OperaConfirm;