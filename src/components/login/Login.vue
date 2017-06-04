<style>
html, body{
	height: 100%;
}
body{
	background: #f7fafc;
}
</style>
<style scoped lang="scss">
.main-content{
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	.login-box{
		width:300px;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		h1{

		}
		h2{
			font-size: 20px;
		}
	}
}



</style>

<template>

<section class="main-content">
	<div class="login-box">
		<h1>Myh5</h1>
		<h2>h5页面制作工具_微信场景制作</h2>
	</div>
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
