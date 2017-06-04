<style>

html,
body {
    height: 100%;
}

body {
    background: #f7fafc;
}

</style> <style scoped lang="scss">
::-webkit-input-placeholder{
	color: #cfcfcf;
}
.main-content {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    .login-box {
        width: 300px;
        // height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        h1 {
			font-size: 26px;
		}
        h2 {
            font-size: 20px;
        }
        .tab-navs {
			display: flex;
			width: 100%;
			justify-content: center;
			a{
				width: 72px;
				line-height: 35px;
				height: 35px;
				text-align: center;
				color: #0f88eb;
				font-size: 18px;
				// font-weight: bold;
				font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif;
				-webkit-font-smoothing: subpixel-antialiased;
			}
		}
		.view-signup{
			.group-inputs{
				display: flex;
				flex-direction: column;
				border: 1px solid #d5d5d5;
				border-radius: 3px;
				width: 298px;
				input{
					width: 275px;
					height: 19px;
					padding: 14px 11px;
					border: none;
					border-bottom: 1px solid #e8e8e8;
					color: #555;
					font-size: 100%;
				}
				.input-wrapper:last-child input{
					border-bottom: none;
				}
			}
		}
    }
}

</style>

<template>

<section class="main-content">
    <div class="login-box">
        <h1>Myh5</h1>
        <h2>h5页面制作工具_微信场景制作</h2>
        <div class="tab-navs">
            <a href="#" class="active">注册</a>
            <a href="#">登录</a>
        </div>
		<div class="view-signup">
			<form>
				<div class="group-inputs">
					<div class="input-wrapper">
						<input type="text" placeholder="用户名"/>
					</div>
					<div class="input-wrapper">
						<input type="text" placeholder="密码"/>
					</div>
				</div>
			</form>
		</div>
    </div>

</section>

</template>

<script>
// import particlesJS from 'particles.js'
// console.log(particlesJS)

import '../../css/reset.css'
import $ from 'jQuery'
export default {
	mounted : function(){
		// console.log(particlesJS)
		// particlesJS.load('particles-js', {}, function() {
		//   console.log('callback - particles.js config loaded');
		// });
	}
}

</script>
