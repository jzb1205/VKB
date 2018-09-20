import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../util/axios.js'

let host = 'http://47.98.181.113:80/kb/';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {}
	},
	mutations: {
		getUserInfo(state, res) {
			state.userInfo = Object.assign({}, res);
		}
	},
	actions: {
		async getUserInfo(context) {
			await axios.post('SysUser/getUserInfo', {
				userId: localStorage.getItem('userId')
			}).then((res) => {
				if (res.success == true) {
					context.commit('getUserInfo', res.data)
				} else {
					this.$message({
						message: res.message,
						type: 'error'
					});
				}
			})
		}
	}
})

export default store;
