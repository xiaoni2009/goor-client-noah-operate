import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

function Home({ appliance = null, dispatch }) {

    // 根据手术类型跳转
    function opera(type) {
        // 判断如果已经存在手术包/额外器械
        // if(appliance) {
        //     dispatch(routerRedux.push(`/appliance`));
        // }else {
        //     dispatch(routerRedux.push(`/appliance/?type=${type}`));
        // }

        // 跳转到额外器械选择
        if(type === 0){
            dispatch(routerRedux.push(`/appliance`));
        }

        // 跳转到手术包选择
        if(type === 1){
            dispatch(routerRedux.push(`/opera`));
        }
    }

    return (
        <div className="home">
            <ul className="homeType">
                <li onClick={() => { opera(0) }} ><i className="button_home_01_normal"></i></li>
                <li onClick={() => { opera(1) }} ><i className="button_home_02_normal"></i></li>
            </ul>
        </div>
    )
}

//参数类型验证
Home.propTypes = {
    dispatch: PropTypes.func,
}

// state注入进来
function mapStateToProps(state, loading) {
    return {
    };
}

export default connect(mapStateToProps)(Home);