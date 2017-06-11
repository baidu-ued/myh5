

<template>

<section class="main-content">
    <input type="text" placeholder="用户名" v-model="login_username" />
    <input type="text" placeholder="密码" v-model="login_password" />
    <button @click="login">登录</button>
    <input type="text" placeholder="用户名" v-model="signup_username" />
    <input type="text" placeholder="密码" v-model="signup_password" />
    <button @click="signup">注册</button>
</section>

</template>

<script>

import $ from 'jQuery'
export default {
    data: function() {
        return {
            login_username: '',
            login_password: '',
            signup_username: '',
            signup_password: '',
        }
    },
    methods: {
        login: function() {
            $.ajax({
                url: '/api/login/login',
                type: 'get',
                data: {
                    username: this.login_username,
                    password: this.login_password,
                },
                success: (rs) => {
                    console.log(rs);
                    if (rs.status == 1) {
                        setTimeout(function() {
                            location.href = rs.href;
                        }, 500)
                    }
                }
            });
        },
        signup: function() {
            $.ajax({
                url: '/api/login/signup',
                type: 'get',
                data: {
                    username: this.signup_username,
                    password: this.signup_password,
                },
                success: (rs) => {
                    console.log(rs);
                }
            });
        }
    }
}

</script>
