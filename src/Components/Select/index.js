import React, { PropTypes } from 'react';
import { confirmAlert, Toast } from 'Components';
import './style.less';

let lastTime = 0;

class Select extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchShow: false,
            searchValue: '',
            searchList: [],
            selectShow: false,
            selectValue: '',
            data: [],
            mode: false,
            onChage: null,
            onSearch: null,
            placeholder: '',
            delay:0
        }

        this.selectShowChange = this.selectShowChange.bind(this);
        this.getSelectValue = this.getSelectValue.bind(this);
        this.searchList = this.searchList.bind(this);
        this.getSelectModeValue = this.getSelectModeValue.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const {mode = false, placeholder = '', onSearch= null, data = [], onChage = null} = nextProps;
        if(mode){
            this.setState({data, mode, onSearch, placeholder, searchShow: false, selectShow: true });
        }else {
            this.setState({data, mode, onSearch, placeholder, onChage });   
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
        lastTime = e.timeStamp;
        const eVal = e.target.value;
        if(eVal) {
            const { onSearch } = this.state;
            this.setState({searchShow: true, searchValue: eVal});
            onSearch && onSearch(eVal);
        }else {
            this.setState({selectShow: false, data: [], searchValue: eVal});
        }
    }

    // 多选设置
    getSelectModeValue(t){
        const slef = this;
        const { searchList } = slef.state;

        // 获取值
        let searchOneValue = 0;
        function setVal(t){
            searchOneValue = t.target.value;
        }
        //
        confirmAlert({
            title: '',
            message: '',
            childrenElement: () => {
                return (
                    <div className="searchOneAdd">
                        <div className="searchOneTitle">当前选择器械：</div>
                        <div className="searchOneName">{t.name}</div>
                        <div className="searchOnenum">请选择器械的数量：<input id="searchOne" type="text" onChange={setVal} placeholder="1~999" /></div>
                    </div>
                )
            },
            confirmLabel: '确认',
            cancelLabel: '取消',
            onConfirm(call) {
                if(searchOneValue > 0 && searchOneValue < 1000){
                    call(true);
                    searchList.push({
                        id: t.id,
                        name: t.name,
                        number: searchOneValue
                    });
                    slef.setState({ selectShow: false, searchValue: '', searchList });
                }else {
                    Toast({val: '请输入1-999的范围数值'});
                }
            }
        });
    }

    render() {
        const { mode, placeholder, onSearch, data, onChage, selectShow, selectValue, searchShow, searchValue, searchList } = this.state;
        if(mode) {
            return (
                <div className="selects">
                    <div className="sinput"><input type="text" value={searchValue} placeholder={placeholder} onChange={this.searchList} /></div>
                    {
                        selectShow
                        &&
                        <ul className="sdata">
                            {
                                data.map((t, i)=>{
                                    return (
                                        <li key={i} onClick={()=>{ this.getSelectModeValue(t) }}><span>{t.name}</span></li>
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
                    {
                        searchList.length > 0
                        &&
                        <ul className="searchList">
                            {
                                searchList.map((t, i)=>{
                                    return <li key={i}><span>{t.name}（{t.number}） </span><i>X</i></li>
                                })
                            }
                        </ul>
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