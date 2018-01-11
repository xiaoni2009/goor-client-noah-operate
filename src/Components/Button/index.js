import React, { PropTypes } from 'react';
import './style.less';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { type = 'normal', onClick } = this.props;

        return (
            <span className="buttons" onClick={onClick || ''}><i className={type}></i></span>
        )
    }
}

//参数类型验证
Button.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.string
}

export default Button;