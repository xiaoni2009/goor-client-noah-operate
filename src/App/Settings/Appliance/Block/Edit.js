import React from 'react';
import { connect } from 'dva';
import { Button, confirmAlert } from 'Components';

// 缓存初始化
let dataCache = {
    name: null,
    searchName: null
};

class Edit extends React.Component {
    constructor(props) {
        super(props);
        
        const { item = {}, appliancePackageType = [] } = this.props.sappliance || [];
        const packageTypeId = item.packageType ? item.packageType.id : null;
        //缓存
        dataCache = {
            name: item.name || '', 
            searchName: item.searchName || '',
            packageTypeId
        };
        //
        this.state = {
            item,
            appliancePackageType,
            packageTypeId
        }

        this.recover = this.recover.bind(this);
        this.remove = this.remove.bind(this);
        this.confirm = this.confirm.bind(this);
    }

    componentWillMount(){
        this.recover();
    }

    componentWillReceiveProps(nextProps){
        const { appliancePackageType = [] } = nextProps.sappliance;
        this.setState({ appliancePackageType });
    }

    // 设置包装方式
    setPackageTypeId(t){
        this.setState({ packageTypeId: t.id });
    }

    // 恢复
    recover(){
        const { item } = this.state;
        item.name = dataCache.name;
        item.searchName = dataCache.searchName;
        this.setState({ item , packageTypeId: dataCache.packageTypeId });
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
                dispatch({ type: 'SettingsAppliance/delete', payload: item });
            }
        });
    }

    // 添加
    confirm(){
        const { item, packageTypeId } = this.state;
        const { dispatch } = this.props;
        const info = {
            name: item.name,
            searchName: item.searchName,
            packageTypeId,
            departmentTypeCode: 6
        }
        if(item.id) {
            info.id = item.id;
        }
        dispatch({ type: 'SettingsAppliance/post', payload: info });
    }

    render() {
        const {item, appliancePackageType, packageTypeId} = this.state;

        return (
            <div className="applianceEdit froms">
                <ul className="fromMain">
                    <li>
                        <div className="label"><label>器械名称：</label></div>
                        <div className="co"><input value={item.name || ''} onChange={(e)=>{ item.name = e.target.value; this.setState({item}) }} /></div>
                    </li>
                    <li>
                        <div className="label"><label>拼音首字母：</label></div>
                        <div className="co"><input value={item.searchName || ''}  onChange={(e)=>{ item.searchName = e.target.value; this.setState({item}) }} /></div>
                    </li>
                    <li>
                        <div className="label"><label>科室类别：</label></div>
                        <div className="co">
                            <ul className="typeli">
                                <li className="active"><span>4F手术室</span></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className="label"><label>包装方式：</label></div>
                        <div className="co">
                            <ul className="typeli">
                                {
                                    appliancePackageType.map((t, i)=>{
                                        return <li key={i} className={packageTypeId == t.id ? 'active' : ''} onClick={()=>{this.setPackageTypeId(t)}}><span>{t.name}</span></li>
                                    })
                                }
                            </ul>
                        </div>
                    </li>
                </ul>
                <div className="applianceButton">
                    {
                        item.id
                        ?
                        <div>
                            <Button type="remove"  onClick={this.remove} />
                            <Button type="recover" onClick={this.recover} />
                            <Button type="confirm" onClick={this.confirm} />
                        </div>
                        :
                        <Button type="confirm" onClick={this.confirm} />
                    }
                </div>
            </div>
        )
    }
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        sappliance: state.SettingsAppliance
    };
}

export default connect(mapStateToProps)(Edit);