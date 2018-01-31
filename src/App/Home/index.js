import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

function Home({ app, dispatch }) {

    const { userInfo } = app;

    // 根据手术类型跳转
    function opera(type) {
        // 跳转到额外器械选择
        if (type === 0) {
            dispatch(routerRedux.push(`/appliance`));
        }

        // 跳转到手术包选择
        if (type === 1) {
            dispatch(routerRedux.push(`/opera`));
        }
    }

    return (
        <div className="home">
            {
                userInfo.station
                &&
                <div className="stationName"><span>{userInfo.station.name}</span></div>
            }
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
        app: state.app
    };
}

export default connect(mapStateToProps)(Home);