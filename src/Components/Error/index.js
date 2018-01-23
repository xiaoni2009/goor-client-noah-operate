import React, { PropTypes } from 'react';
import './style.less'

class Error extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { type = 'normal' } = this.props;

        return (
            <div className="errors"><img src="./images/pic_02.png" /><span>没有更多搜索结果</span></div>
        )
    }
}

//参数类型验证
Error.propTypes = {
    type: PropTypes.string
}

export default Error;