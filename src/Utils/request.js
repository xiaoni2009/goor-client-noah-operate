import fetch from 'dva/fetch';
import { apiUrl, loginState } from './config';
import { Toast } from 'Components';
//
function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options = {}) {
	options.credentials = 'include';

	const response = await fetch(apiUrl + url, options);

	checkStatus(response);

	const res = await response.json();

	// 数据回调
	if (res.code === 0) {
		return res;
	} else if (res.code === 40002 || res.code === 40001) {
		// 登录失效简化处理
	} else {
		// 这边需要做toast
		Toast({
			val: res.message || '',
		})
		return res;
	}
}
