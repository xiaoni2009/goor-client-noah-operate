import React from 'react';
import { connect } from 'dva';
import { Button, confirmAlert, Toast } from 'Components';
import { Link } from 'dva/router';

function Type({ sappliance = [], dispatch }) {
    const { appliancePackageType = [] } = sappliance;

    // 删除
    function adelete(t, index){
        confirmAlert({
            title: '是否确认删除<span>'+ t.name +'</span>？',
            message: '',
            confirmLabel: '确认',
            cancelLabel: '取消',
            onConfirm(call) {
                call(true)
                dispatch({ type: 'SettingsAppliance/packageTypeDelete', payload: t });
            }
        });
    }

    // 编辑
    function aedit(t, index){
        confirmAlert({
            title: '编辑额外器械包装',
            message: '',
            childrenElement: () => {
                return (
                    <div className="aadd">
                        <span>额外器械包装名：<input id="packagetypename" type="text" defaultValue={t.name} autoFocus="autofocus" /></span>
                    </div>
                )
            },
            confirmLabel: '确认',
            cancelLabel: '取消',
            onConfirm(call) {
                const packagetypename = document.getElementById('packagetypename').value;
                if(packagetypename && packagetypename != ''){
                    const res = {
                        id: t.id,
                        name: packagetypename
                    };
                    dispatch({ type: 'SettingsAppliance/packageTypePost', payload: res });
                    call(true);
                }else {
                    Toast({val: '请输入额外器械包装名！'});
                }
            }
        });
    }

    // 添加
    function aadd(){
        confirmAlert({
            title: '添加额外器械包装',
            message: '',
            childrenElement: () => {
                return (
                    <div className="aadd">
                        <span>额外器械包装名：<input id="packagetypename" type="text" autoFocus="autofocus" /></span>
                    </div>
                )
            },
            confirmLabel: '确认',
            cancelLabel: '取消',
            onConfirm(call) {
                const packagetypename = document.getElementById('packagetypename').value;
                if(packagetypename && packagetypename != ''){
                    const res = {
                        name: packagetypename
                    };
                    dispatch({ type: 'SettingsAppliance/packageTypePost', payload: res });
                    call(true);
                }else {
                    Toast({val: '请输入额外器械包装名！'});
                }
            }
        });
    }

    return (
        <div className="applianceType">
            <ul>
                <li className="flexBox addtype" onClick={aadd}>
                    <img src="./images/icon_add.png" />
                    <span>点击添加包装方式</span>
                </li>
                {
                    appliancePackageType.map((t, i)=>{
                        return (
                            <li key={i} className="flexBox">
                                <div className="bl">
                                    <span>{t.name.length > 12 ? t.name.substring(0, 12) + '...' : t.name}</span>
                                    {/* <small></small> */}
                                </div>
                                <div className="br">
                                    <Button onClick={()=>{adelete(t,i)}} type="smalldelete" />
                                    <i className="line"></i>
                                    <Button onClick={()=>{aedit(t,i)}} type="smalledit" />
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
        sappliance: state.SettingsAppliance
    };
}

export default connect(mapStateToProps)(Type);