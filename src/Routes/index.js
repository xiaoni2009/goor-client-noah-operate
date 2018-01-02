import React, { PropTypes } from 'react';
import { Router } from 'dva/router';
import App from './app';

// 加载模块
import Home from 'App/Home';
import HomeModel from 'App/Home/model';

import Settings from 'App/Settings';
import SettingsModel from 'App/Settings/model';

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


// 动态model
const cached = {};
const registerModel = (app, model) => {
	if (!cached[model.namespace]) {
		app.model(model);
		cached[model.namespace] = 1;
	}
};

const Routers = function ({ history, app }) {
	const routes = [
		{
			path: '/',
			component: App,
			getIndexRoute(nextState, cb) {
				require.ensure([], (require) => { cb(null, { component: Home }); }, 'home');
			},
			childRoutes: [
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
					getComponent(nextState, cb) {
						registerModel(app, ApplianceModel);
						require.ensure([], (require) => { cb(null, Appliance); }, 'appliance');
					},
				},
				{
					path: 'settings',
					name: 'settings',
					getComponent(nextState, cb) {
						registerModel(app, SettingsModel);
						require.ensure([], (require) => { cb(null, Settings); }, 'settings');
					},
				},
				{
					path: 'order',
					name: 'order',
					getComponent(nextState, cb) {
						// registerModel(app, OrderModel);
						require.ensure([], (require) => { cb(null, Order); }, 'order');
					},
				},
				{
					path: 'opera',
					name: 'opera',
					getComponent(nextState, cb) {
						registerModel(app, OperaModel);
						require.ensure([], (require) => { cb(null, Opera); }, 'opera');
					},
				},
				{
					path: 'payment',
					name: 'payment',
					getComponent(nextState, cb) {
						registerModel(app, PaymentModel);
						require.ensure([], (require) => { cb(null, Payment); }, 'payment');
					},
				},
				{
					path: 'depot',
					name: 'depot',
					getComponent(nextState, cb) {
						registerModel(app, DepotModel);
						require.ensure([], (require) => { cb(null, Depot); }, 'depot');
					},
				},
				{
					path: '*',
					name: 'error',
					getComponent(nextState, cb) {
						require.ensure([], (require) => { cb(null, Error); }, 'error');
					},
				},
			],
		},
	];

	return <Router history={history} routes={routes} />;
};

Routers.propTypes = {
	history: PropTypes.object,
	app: PropTypes.object,
};

export default Routers;
