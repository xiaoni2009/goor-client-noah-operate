import React from 'react';
import { connect } from 'dva';
import { Button, Select, confirmAlert } from 'Components';

// 缓存初始化
let dataCache = {
    name: null,
    searchName: null,
    operationDepartmentType: {},
    applianceList: []
};

class Edit extends React.Component {
    constructor(props) {
        super(props);
        const { item = {} } = this.props.sopera || [];

        // 设置缓存
        dataCache = {
            name: item.name || '', 
            searchName: item.searchName || '',
            operationDepartmentType: item.operationDepartmentType || {},
            applianceList:  item.applianceList || []
        }

        this.state = {
            item,
            departmenttype: [],
            OperationType: []
        }

        this.recover = this.recover.bind(this);
        this.remove = this.remove.bind(this);
        this.confirm = this.confirm.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
        this.applianceListChange = this.applianceListChange.bind(this);
        this.departmentTypeChange = this.departmentTypeChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const { departmenttype, OperationType  } = this.state;
        const msd = nextProps.sopera.departmenttype;
        const mso = nextProps.sopera.OperationType;
        let info = {};

        if(msd == [] || departmenttype != msd){
            info.departmenttype = msd;
            dataCache.departmenttype = msd;
        }

        if(mso == [] || OperationType != mso){
            info.OperationType = mso;
            dataCache.OperationType = msd;
        }

        this.setState(info);
    }

    // 默认器械搜索
    fetchUser(text){
		const { dispatch } = this.props;
        dispatch({ type: 'SettingsOpera/searchName', payload: { name: text.toUpperCase() } });
    }

    // 默认器械回调
    applianceListChange(list){
        const { dispatch } = this.props;
        const { item } = this.state
        item.applianceList = list;
        dispatch({ type: 'SettingsOpera/save', payload: { OperationType: [] } });
        this.setState({ item });
    }

    // 手术科室数据
    departmentTypeChange(t){
        const { item } = this.state;
        item.operationDepartmentType = {
            id: t.id,
            name: t.name
        }
        this.setState(item);
    }

    // 恢复
    recover(){
        const { dispatch } = this.props;
        const { item } = this.state;
        item.name = dataCache.name;
        item.searchName = dataCache.searchName;
        item.applianceList = dataCache.applianceList;
        item.operationDepartmentType = dataCache.operationDepartmentType;

        dispatch({ type: 'SettingsOpera/save', payload: { OperationType: [] } });
        this.setState({ item });
    }

    // 删除
    remove(){
        const { item } = this.state;
        const { dispatch } = this.props;
        confirmAlert({
            title: '是否确认删除？',
            message: '',
            confirmLabel: '确认',
            cancelLabel: '取消',
            onConfirm(call) {
                call(true)
                dispatch({ type: 'SettingsOpera/delete', payload: item });
            }
        });
    }

    // 添加
    confirm(){
        const { item } = this.state;
        console.log(item)
        // const { dispatch } = this.props;
        // if(item.id) {
        //     info.id = item.id;
        // }
        // dispatch({ type: 'SettingsOpera/post', payload: info });
    }

    render() {
        const { item, departmenttype , OperationType } = this.state;
        return (
            <div className="operaEdit froms">
                <ul className="fromMain">
                    <li>
                        <div className="label"><label>手术名称：</label></div>
                        <div className="co"><input value={item.name || ''} onChange={(e)=>{ item.name = e.target.value; this.setState({item}) }} /></div>
                    </li>
                    <li>
                        <div className="label"><label>拼音首字母：</label></div>
                        <div className="co"><input value={item.searchName || ''}  onChange={(e)=>{ item.searchName = e.target.value; this.setState({item}) }} /></div>
                    </li>
                    <li>
                        <div className="label"><label>手术科室：</label></div>
                        <div className="co">
                            <Select placeholder="请选择手术科室" data={departmenttype} onChage={this.departmentTypeChange} defaultValue={item.operationDepartmentType || ''} />
                        </div>
                    </li>
                    <li>
                        <div className="label"><label>默认器械：</label></div>
                        <div className="co">
                            <Select mode="multiple" placeholder="选择默认器械" onSearch={this.fetchUser} onChage={this.applianceListChange} data={OperationType} defaultValue={item.applianceList || []} />
                        </div>
                    </li>
                </ul>
                <div className="operaButton">
                    {
                        item.id
                        ?
                        <div>
                            <Button type="remove"  onClick={this.remove} />
                            <Button type="recover" onClick={this.recover} />
                            <Button type="confirm" onClick={this.confirm} />
                        </div>
                        :
                        <div>
                            <Button type="confirm" onClick={this.confirm} />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        sopera: state.SettingsOpera
    };
}

export default connect(mapStateToProps)(Edit);