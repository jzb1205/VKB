<template>
	<div id='login'>
		<el-collapse-transition>
			<div class="login" v-if="type == 0">
				<p class="title">登录</p>
				<hr>
				<el-form ref="form" label-width="120px">
					<el-form-item label="账号：">
						<el-input v-model="login.userName" class="typeText" placeholder="请输入账号"></el-input>
					</el-form-item>
					<el-form-item label="密码：">
						<el-input v-model="login.passWord" type='password' class="typeText" placeholder="请输入密码"></el-input>
					</el-form-item>
				</el-form>
				<p class="findPassword">找回密码</p>
				<el-button type="primary" @click="doLogin">登录</el-button>
				<p class="toRegister">还没有账号？
					<span @click="type=1">免费注册</span>
				</p>
			</div>
		</el-collapse-transition>
		<transition name="el-zoom-in-left">
			<div class="register" v-if="type == 1">
				<p class="title">注册</p>
				<hr>
				<el-form ref="form" label-width="120px">
					<el-form-item label="用户名：">
						<el-input v-model="register.userName" class="typeText" placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item label="设置密码：">
						<el-input v-model="register.passWord" type='password' class="typeText" placeholder="请设置密码"></el-input>
					</el-form-item>
					<el-form-item label="确认密码：">
						<el-input v-model="register.rePassWord" type='password' class="typeText" placeholder="请输入确认密码"></el-input>
					</el-form-item>
					<el-form-item label="常用邮箱：">
						<el-input v-model="register.email" class="typeText" placeholder="请设置常用邮箱"></el-input>
					</el-form-item>
					<el-form-item label="QQ：">
						<el-input v-model="register.qq" class="typeText" placeholder="请输入QQ"></el-input>
					</el-form-item>
				</el-form>
				<el-button type="success" @click="doRegister">立即注册</el-button>
				<p class="toRegister">已注册账号？
					<span @click="type=0">去登陆</span>
				</p>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				type: 0,
				login: {
					userName: '',
					passWord: ''
				},
				register: {
					userName: '',
					passWord: '',
					rePassWord: '',
					email: '',
					qq: ''
				}
			}
		},
		created() {

		},
		methods: {
			doRegister() {
				if (!this.register.userName) {
					this.$message({
						message: '用户名不能为空',
						type: 'error'
					});
					return;
				}
				if (!this.register.passWord) {
					this.$message({
						message: '密码不能为空',
						type: 'error'
					});
					return;
				}
				if (!this.register.rePassWord) {
					this.$message({
						message: '确认密码不能为空',
						type: 'error'
					});
					return;
				}
				if (this.register.rePassWord != this.register.passWord) {
					this.$message({
						message: '两次输入密码不一致，请重新输入。',
						type: 'error'
					});
					return;
				}
				if (!this.register.email) {
					this.$message({
						message: '邮箱不能为空',
						type: 'error'
					});
					return;
				}
				if (!this.register.qq) {
					this.$message({
						message: 'qq不能为空',
						type: 'error'
					});
					return;
				}
				this.$http.post(this.$API.register, {
					userName: this.register.userName,
					password: this.register.passWord,
					rePassword: this.register.rePassWord,
					email: this.register.email,
					qq: this.register.qq
				}).then((res) => {
					if (res.success == true) {
						this.$message({
							message: res.message,
							type: 'success'
						});
						this.register = {
							userName: '',
							passWord: '',
							rePassWord: '',
							email: '',
							qq: ''
						}
						this.$router.push('/')
					} else {
						this.$message({
							message: res.message,
							type: 'error'
						});
					}
				})
			},
			doLogin() {
				if (!this.login.userName) {
					this.$message({
						message: '用户名不能为空',
						type: 'error'
					});
					return;
				}
				if (!this.login.passWord) {
					this.$message({
						message: '密码不能为空',
						type: 'error'
					});
					return;
				}
				this.$http.post(this.$API.login, {
					userName: this.login.userName,
					password: this.login.passWord
				}).then((res) => {
					console.log(res)
					if (res.success == true) {
						this.$message({
							message: '登录成功',
							type: 'success'
						});
						localStorage.setItem('userId', res.data.userId);
						localStorage.setItem('userCode', res.data.userCode);
						localStorage.setItem('userName', res.data.userName);
						localStorage.setItem('userType', res.data.userType);
						localStorage.setItem('amount', res.data.amount);
						this.login = {
							userName: '',
							passWord: ''
						};
						this.$router.push('/')
					} else {
						this.$message({
							message: res.message,
							type: 'error'
						});
					}
				})
			}
		}
	}
</script>

<style lang='less' scoped>
	@import url('./login.less');
</style>
