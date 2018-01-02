import React, { PropTypes } from 'react';
import './style.less'

class SearchKeyword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || ""
        }
        this.toUpperCase = this.toUpperCase.bind(this);
    }

    toUpperCase(e) {
        const { search } = this.props;
        const val = e.target.value.toUpperCase();
        this.setState({ value: val });
        search(val);
    }

    render() {
        const { back, placeholder } = this.props;
        const { value } = this.state;
        return (
            <div className="searchKeyword">
                <i onClick={back}></i>
                <input type="text" value={value} onChange={this.toUpperCase} placeholder={placeholder} />
            </div>
        )
    }
}

//参数类型验证
SearchKeyword.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    back: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired
}

export default SearchKeyword;