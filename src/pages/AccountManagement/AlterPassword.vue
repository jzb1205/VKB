<template>
	<div id="AlterPassword">
		<p class="title">修改密码</p>
		<el-form ref="form" label-width="120px">
			<el-form-item label="原密码：">
				<el-input v-model="oldPassword" class="typeText" placeholder="请输入原密码"></el-input>
			</el-form-item>
			<el-form-item label="新密码：">
				<el-input v-model="newPassWord" type="passWord" class="typeText" placeholder="请输入新密码"></el-input>
			</el-form-item>
			<el-form-item label="确认密码：">
				<el-input v-model="rePassWord" type="passWord" class="text" placeholder="请再次输入新密码"></el-input>
			</el-form-item>
		</el-form>
		<el-button type="primary" @click="updateUserPass">确认修改</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				oldPassword: '',
				newPassWord: '',
				rePassWord: ''
			}
		},
		methods: {
			updateUserPass() {
				if (!this.oldPassword) {
					this.$message({
						message: '原密码不能为空',
						type: 'error'
					});
					return;
				}
				if (!this.newPassWord) {
					this.$message({
						message: '密码不能为空',
						type: 'error'
					});
					return;
				}
				if (!this.rePassWord) {
					this.$message({
						message: '确认密码不能为空',
						type: 'error'
					});
					return;
				}
				if (this.rePassWord != this.newPassWord) {
					this.$message({
						message: '两次输入密码不一致，请重新输入。',
						type: 'error'
					});
					return;
				}
				this.$http.post(this.$API.updateUserPass, {
					userId: localStorage.getItem('userId'),
					oldPassword: this.oldPassword,
					password: this.newPassWord
				}).then((res) => {
					if (res.success == true) {
						this.$message({
							message: '修改密码成功',
							type: 'success'
						});
						localStorage.setItem('userId', this.login.userName);
						this.oldPassword =
							this.newPassWord =
							this.rePassWord = ''
						this.$router.go(-1)
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
	@import url('./AlterPassword.less');
</style>
