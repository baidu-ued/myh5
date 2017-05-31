<style scoped lang="scss">



</style>

<template>

<section class="layer-box">
	<p>登录</p>
    <label>用户名</label>
    <input v-model="login_username" type="text" />
    <label>密码</label>
    <input v-model="login_password" type="text" />
	<button @click="login">确定</button>
	<p>注册</p>
    <label>用户名</label>
    <input v-model="signup_username" type="text" />
    <label>密码</label>
    <input v-model="signup_password"  type="text" />
	<button @click="signup">确定</button>
</section>

</template>

<script>
import $ from 'jQuery'
export default {
	data : function(){
		return {
			login_username : '',
			login_password : '',
			signup_username : '',
			signup_password : '',
		}
	},
	methods : {
		login : function(){
			$.ajax({
				url: '/api/login/login',
				type: 'get',
				data: {
					username : this.login_username,
					password : this.login_password,
				},
				success: (rs) => {
					console.log(rs);
					if(rs.status == 1){
						setTimeout(function(){
							location.href = rs.href;
						}, 500)
					}
				}
			});
		},
		signup : function(){
			$.ajax({
				url: '/api/login/signup',
				type: 'get',
				data: {
					username : this.signup_username,
					password : this.signup_password,
				},
				success: (rs) => {
					console.log(rs);
				}
			});
		}
	}
}

</script>
