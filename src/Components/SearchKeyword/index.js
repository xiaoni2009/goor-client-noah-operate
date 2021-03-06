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
        // const val = e.target.value.replace(/[^\w\.\/]/ig,'').toUpperCase();
        const val = e.target.value;
        this.setState({ value: val });
        search(val);
    }

    render() {
        const { back, placeholder } = this.props;
        const { value } = this.state;
        return (
            <div className="searchKeyword">
                {
                    back
                    &&
                    <i onClick={back}></i>
                }
                <input type="text" value={value} onChange={this.toUpperCase} placeholder={placeholder} autoFocus="autofocus" />
            </div>
        )
    }
}

//参数类型验证
SearchKeyword.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    // back: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired
}

export default SearchKeyword;