import locals from './locals';

let apiUrl = locals.get('apiDomain') || "172.16.1.18:8063";

module.exports = {
	apiUrl: 'http://' + apiUrl + '/',
	ws: 'ws://' + apiUrl + '/goor/ws',
	loginPassword: '1234',
	guid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
	getApi: apiUrl,
	setApi(url){
		apiUrl = url;
		locals.set('apiDomain', url);
		window.location.reload();
	}
};