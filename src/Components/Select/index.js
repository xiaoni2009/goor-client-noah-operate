import React, { PropTypes } from 'react';
import './style.less'

class Select extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchShow: false,
            selectShow: false,
            selectValue: '',
            data: [],
            mode: false,
            onChage: null,
            onSearch: null,
            placeholder: ''
        }

        this.selectShowChange = this.selectShowChange.bind(this);
        this.getSelectValue = this.getSelectValue.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const {mode = false, placeholder = '', onSearch= null, data = [], onChage = null} = nextProps;
        this.setState({data, mode, onSearch, placeholder, onChage });
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.state.data === nextState.data){
            return false;
        }else {
            this.setState({data: nextState.data, searchShow: false, selectShow: true});
            return true;
        }
    }

    // 下拉显示隐藏
    selectShowChange(){
        const { selectShow } = this.state;
        this.setState({selectShow: !selectShow});
    }

    // 设置值
    getSelectValue(t){
        const { onChage } = this.state;
        if(onChage){
            onChage(t.id);
            this.setState({selectValue: t.name, selectShow: false});
        }
    }

    // 搜索
    searchList(e){
        const { onSearch } = this.state;
        this.setState({searchShow: true});
        onSearch && onSearch(e.target.value);
    }

    render() {
        const { mode, placeholder, onSearch, data, onChage, selectShow, selectValue, searchShow } = this.state;
        if(mode) {
            return (
                <div className="selects">
                    <div className="sinput"><input type="text" placeholder={placeholder} onChange={(e)=>{ this.searchList(e); }} /></div>
                    {
                        selectShow
                        &&
                        <ul className="sdata">
                            {
                                data.map((t, i)=>{
                                    return (
                                        <li key={i}><span>{t.name}</span></li>
                                    )
                                })
                            }
                        </ul>
                    }
                    {
                        searchShow
                        &&
                        <div className="searching">
                            <span>搜索中...</span>
                        </div>
                    }
                </div>
            )
        }else {
            return (
                <div className="selects">
                    <div className="sinput" onClick={this.selectShowChange}><span>{selectValue}</span><i></i></div>
                    {
                        selectShow
                        &&
                        <ul className="sdata">
                            {
                                data.map((t, i)=>{
                                    return (
                                        <li key={i} onClick={()=>{ this.getSelectValue(t) }}><span>{t.name}</span></li>
                                    )
                                })
                            }
                        </ul>
                    }
                </div>
            )
        }
    }
}

export default Select;