import axios from 'axios'
import serve from '../../static/serve'

let HTTP = axios.create({
	// baseURL: serve.http,
	baseURL: '/rest',
	timeout: 10000,
	timeout: 10000,
	headers: {
		'X-Custom-Header': 'foobar',
		'Content-Type': 'application/json'
	},
	responseType: 'json'
})

//响应拦截
HTTP.interceptors.request.use(function (config) {
	return config;
}, function (error) {
	return Promise.reject(error);
});

//请求拦截
HTTP.interceptors.response.use(function (data) {
	return data.data;
}, function (error) {
	return Promise.reject(error);
});
export default HTTP;
