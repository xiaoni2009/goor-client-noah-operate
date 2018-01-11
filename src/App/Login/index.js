import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import './style.less';
import { config } from 'Utils'
import { Button } from 'Components';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputVal: []
        }

        this.loginclear = this.loginclear.bind(this);
        this.focusInput = this.focusInput.bind(this);
        this.loginsub = this.loginsub.bind(this);
    }

    componentDidMount() {
        const self = this;
        const domLogin = self.refs.login;
        // 监听键盘事件
        domLogin.addEventListener('keydown', (e) => {
            let inputVal = self.state.inputVal;

            // 录入
            if ((e.keyCode > 47 && e.keyCode < 57) || (e.keyCode > 95 && e.keyCode < 106)) {
                if (inputVal.length < 4) {
                    inputVal.push(e.key)
                    self.setState({ inputVal })
                }
            }

            // 删除
            if (e.keyCode === 8) {
                inputVal.pop()
                self.setState({ inputVal })
            }
        })
    }

    // 取消监听
    componentWillUnmount() {
        const domLogin = this.refs.login;
        domLogin.removeEventListener('keydown', () => {});
    }

    // 清空
    loginclear() {
        this.setState({ inputVal: [] })
    }

    // 焦点
    focusInput() {
        const domLogin = this.refs.login;
        domLogin.focus();
    }

    //登录
    loginsub(){
        let inputVal = this.state.inputVal;
        inputVal = inputVal.join("");
        if(inputVal === config.loginPassword) {
            const { dispatch } = this.props;
            const mac = config.guid();
            dispatch(routerRedux.push('initial'));
            // dispatch({ type: 'Login/query', payload: { mac } });
        }else {
            alert('登录密码错误！');
        }
        
    }

    render() {
        const { inputVal } = this.state;

        return (
            <div className="login" onClick={this.focusInput}>
                <div>
                    <h3>请输入登录密码</h3>
                    <div className="loginInput">
                        <span>{inputVal[0]}</span>
                        <span>{inputVal[1]}</span>
                        <span>{inputVal[2]}</span>
                        <span>{inputVal[3]}</span>
                        <input ref="login" value={inputVal.join("")} autoFocus />
                    </div>
                    <div className="loginBut">
                        <Button type="empty"  onClick={this.loginclear} />
                        {
                            inputVal.length == 4
                            ?
                                <Button type="confirm"  onClick={this.loginsub} />
                            :
                            <Button type="noconfirm" />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

//参数类型验证
Login.propTypes = {
    dispatch: PropTypes.func,
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        login: state.Login
    };
}

export default connect(mapStateToProps)(Login);