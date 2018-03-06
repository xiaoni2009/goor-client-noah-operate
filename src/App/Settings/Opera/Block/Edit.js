import React from 'react';
import { connect } from 'dva';
import { Button, Select } from 'Components';

class Edit extends React.Component {
    constructor(props) {
        super(props);

        this.fetchUser = this.fetchUser.bind(this);
    }

    // 
    fetchUser(text){
		const { dispatch } = this.props;
		dispatch({ type: 'SettingsOpera/searchName', payload: { name: text.toUpperCase() } })
    }

    //
    applianceListChange(){
        console.log('applianceListChange')
    }

    //
    departmentTypeChange(id){
        console.log(id)
    }

    render() {
        const { departmenttype , OperationType } = this.props.sopera;
        return (
            <div className="operaEdit froms">
                <ul className="fromMain">
                    <li>
                        <div className="label"><label>手术名称：</label></div>
                        <div className="co"><input /></div>
                    </li>
                    <li>
                        <div className="label"><label>拼音首字母：</label></div>
                        <div className="co"><input /></div>
                    </li>
                    <li>
                        <div className="label"><label>手术科室：</label></div>
                        <div className="co">
                            <Select placeholder="请选择手术科室" data={departmenttype} onChage={this.departmentTypeChange} />
                        </div>
                    </li>
                    <li>
                        <div className="label"><label>默认器械：</label></div>
                        <div className="co">
                            <Select mode="multiple" placeholder="选择默认器械" onSearch={this.fetchUser} onChage={this.applianceListChange} data={OperationType} />
                        </div>
                    </li>
                </ul>
                <div className="operaButton">
                    <Button type="remove" />
                    <Button type="recover" />
                    <Button type="confirm" />
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