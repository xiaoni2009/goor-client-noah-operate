import React from 'react';
import { connect } from 'dva';
import { Button, confirmAlert, Toast } from 'Components';
import { Link } from 'dva/router';

function Type({ sopera = [], dispatch }) {
    const { departmenttype = [] } = sopera;

    // 删除
    function adelete(t, index){
        confirmAlert({
            title: '是否确认删除<span>'+ t.name +'</span>？',
            message: '',
            confirmLabel: '确认',
            cancelLabel: '取消',
            onConfirm(call) {
                call(true)
                dispatch({ type: 'SettingsOpera/departmentDelete', payload: t });
            }
        });
    }

    // 编辑
    function aedit(t, index){
        confirmAlert({
            title: '编辑科室名称',
            message: '',
            childrenElement: () => {
                return (
                    <div className="aadd">
                        <span>手术科室名称：<input id="departmenttypename" type="text" defaultValue={t.name} autoFocus="autofocus" /></span>
                    </div>
                )
            },
            confirmLabel: '确认',
            cancelLabel: '取消',
            onConfirm(call) {
                const departmenttypename = document.getElementById('departmenttypename').value;
                if(departmenttypename && departmenttypename != ''){
                    const res = {
                        id: t.id,
                        name: departmenttypename
                    };
                    dispatch({ type: 'SettingsOpera/departmentPost', payload: res });
                    call(true);
                }else {
                    Toast({val: '请输入手术科室！'});
                }
            }
        });
    }

    // 添加
    function aadd(){
        confirmAlert({
            title: '添加科室名称',
            message: '',
            childrenElement: () => {
                return (
                    <div className="aadd">
                        <span>手术科室名称：<input id="departmenttypename" type="text" autoFocus="autofocus" /></span>
                    </div>
                )
            },
            confirmLabel: '确认',
            cancelLabel: '取消',
            onConfirm(call) {
                const departmenttypename = document.getElementById('departmenttypename').value;
                if(departmenttypename && departmenttypename != ''){
                    const res = {
                        name: departmenttypename
                    };
                    dispatch({ type: 'SettingsOpera/departmentPost', payload: res });
                    call(true);
                }else {
                    Toast({val: '请输入手术科室名称！'});
                }
            }
        });
    }

    return (
        <div className="operaType">
            <ul>
                <li className="flexBox addtype" onClick={aadd}>
                    <img src="./images/icon_add.png" />
                    <span>点击添加手术科室</span>
                </li>
                {
                    departmenttype.map((t, i)=>{
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
        sopera: state.SettingsOpera
    };
}

export default connect(mapStateToProps)(Type);