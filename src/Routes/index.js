import React, { PropTypes } from 'react';
import { Router } from 'dva/router';
import App from './app';

// 加载模块
import Home from 'App/Home';
import HomeModel from 'App/Home/model';

import Opera from 'App/Opera';
import OperaModel from 'App/Opera/model';

import Appliance from 'App/Appliance';
import ApplianceModel from 'App/Appliance/model';

import Order from 'App/Order';
import OrderModel from 'App/Order/model';

import Payment from 'App/Payment';
import PaymentModel from 'App/Payment/model';

import Depot from 'App/Depot';
import DepotModel from 'App/Depot/model';

import Error from 'App/Error';

import Login from 'App/Login';
import LoginModel from 'App/Login/model';

import Initial from 'App/Initial';
import InitialModel from 'App/Initial/model';

import Settings from 'App/Settings/Default';
import SettingsModel from 'App/Settings/Default/model';

import SettingsSystem from 'App/Settings/System';
import SettingsSystemModel from 'App/Settings/System/model';

import SettingsOpera from 'App/Settings/Opera';

import SettingsAppliance from 'App/Settings/Appliance';
import SettingsApplianceModel from 'App/Settings/Appliance/model';

//
import { locals } from 'Utils';
const userInfo = locals.get('userInfo');
// 
function redirectToLogin(nextState, replace) {
	if (!userInfo || !userInfo.mac) {
		replace({ pathname: '/' });
	}
}

// 动态model
const cached = {};
const registerModel = (app, model) => {
	if (!cached[model.namespace]) {
		app.model(model);
		cached[model.namespace] = 1;
	}
};

// 配置路径
let routerType = null;
function childRoutes(app) {

	let routerList = [];
	// 默认路径
	const defaults = [
		{
			path: 'settings',
			name: 'settings',
			onEnter: redirectToLogin,
			getComponent(nextState, cb) {
				registerModel(app, SettingsModel);
				require.ensure([], (require) => { cb(null, Settings); }, 'settings');
			},
		},
		{
			path: 'settings/system',
			name: 'SettingsSystem',
			getComponent(nextState, cb) {
				registerModel(app, SettingsSystemModel);
				require.ensure([], (require) => { cb(null, SettingsSystem); }, 'settingssystem');
			},
		},
		{
			path: 'settings/opera',
			name: 'SettingsOpera',
			getComponent(nextState, cb) {
				require.ensure([], (require) => { cb(null, SettingsOpera); }, 'settingsopera');
			},
		},
		{
			path: 'settings/appliance',
			name: 'SettingsAppliance',
			getComponent(nextState, cb) {
				registerModel(app, SettingsApplianceModel);
				require.ensure([], (require) => { cb(null, SettingsAppliance); }, 'settingsappliance');
			},
		},
		{
			path: '*',
			name: 'error',
			getComponent(nextState, cb) {
				require.ensure([], (require) => { cb(null, Error); }, 'error');
			},
		},
	]

	// 登录/初始化
	if(routerType === '0') {
		routerList =  [
			{
				path: 'login',
				name: 'login',
				getComponent(nextState, cb) {
					registerModel(app, LoginModel);
					require.ensure([], (require) => { cb(null, Login); }, 'login');
				},
			},
			{
				path: 'initial',
				name: 'initial',
				// onEnter: redirectToLogin,
				getComponent(nextState, cb) {
					registerModel(app, InitialModel);
					require.ensure([], (require) => { cb(null, Initial); }, 'initial');
				},
			},
			{
				path: '*',
				name: 'error',
				onEnter: redirectToLogin,
				getComponent(nextState, cb) {
					require.ensure([], (require) => { cb(null, Error); }, 'error');
				},
			},
		]
	}

	// 无菌器械室
	if(routerType === '1'){
		routerList = [
			{
				path: 'depot',
				name: 'depot',
				onEnter: redirectToLogin,
				getComponent(nextState, cb) {
					registerModel(app, DepotModel);
					require.ensure([], (require) => { cb(null, Depot); }, 'depot');
				},
			}
		].concat(defaults);
	}

	// 手术室下单
	if(routerType === '2') {
		routerList = [
			{
				path: 'home',
				name: 'home',
				getComponent(nextState, cb) {
					registerModel(app, HomeModel);
					require.ensure([], (require) => { cb(null, Home); }, 'home');
				},
			},
			{
				path: 'appliance',
				name: 'appliance',
				onEnter: redirectToLogin,
				getComponent(nextState, cb) {
					registerModel(app, ApplianceModel);
					require.ensure([], (require) => { cb(null, Appliance); }, 'appliance');
				},
			},
			{
				path: 'order',
				name: 'order',
				onEnter: redirectToLogin,
				getComponent(nextState, cb) {
					// registerModel(app, OrderModel);
					require.ensure([], (require) => { cb(null, Order); }, 'order');
				},
			},
			{
				path: 'opera',
				name: 'opera',
				onEnter: redirectToLogin,
				getComponent(nextState, cb) {
					registerModel(app, OperaModel);
					require.ensure([], (require) => { cb(null, Opera); }, 'opera');
				},
			},
			{
				path: 'payment',
				name: 'payment',
				onEnter: redirectToLogin,
				getComponent(nextState, cb) {
					registerModel(app, PaymentModel);
					require.ensure([], (require) => { cb(null, Payment); }, 'payment');
				},
			},
		].concat(defaults);
	}

	return routerList;
}

//
const Routers = function ({ history, app }) {
	let routes = [];

	// 判断是否初始化过
	if (userInfo && userInfo.mac) {
		if (userInfo.type === 5) {
			routerType = '1';
			routes = [
				{
					path: '/',
					component: App,
					getIndexRoute(nextState, cb) {
						registerModel(app, DepotModel);
						require.ensure([], (require) => { cb(null, { component: Depot }); }, 'depot');
					},
					childRoutes: childRoutes(app)
				}
			];
		} else {
			routerType = '2';
			routes = [
				{
					path: '/',
					component: App,
					getIndexRoute(nextState, cb) {
						require.ensure([], (require) => { cb(null, { component: Home }); }, 'home');
					},
					childRoutes: childRoutes(app)
				}
			];
		}
	} else {
		routerType = '0';
		routes = [
			{
				path: '/',
				component: App,
				getIndexRoute(nextState, cb) {
					registerModel(app, LoginModel);
					require.ensure([], (require) => { cb(null, { component: Login }); }, 'login');
				},
				childRoutes: childRoutes(app)
			}
		];
	}

	return <Router history={history} routes={routes} />;
};

Routers.propTypes = {
	history: PropTypes.object,
	app: PropTypes.object,
};

export default Routers;
