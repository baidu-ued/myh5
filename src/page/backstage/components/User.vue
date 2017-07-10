<style lang="scss">



</style>

<template>
	
<div>
    <div @click="delall">删除所有用户</div>
    <ul>
        <li v-for='i in list'>
			<p>
				<label>昵称</label>{{i.username}}
			</p>
		</li>
    </ul>
</div>

</template>

<script>

/**
 * 用户管理
 * 添加用户
 *
 * @type {String}
 */
import Pagination from 'vuejs-pagination'
export default {
    name: 'App',
    components: {
        Pagination
    },
    data() {
        return {
            list: []
        }
    },
    methods: {
        delall() {
            $.ajax({
                url: '/api/user/delall',
                success: (rs) => {
                    console.log(rs)
                        // this.list = rs.data.data;
                }
            })
        }
    },
    mounted() {
        $.ajax({
            url: '/api/user/get',
            success: (rs) => {
                console.log(rs)
                this.list = rs.data.data;
            }
        })
    }
}

</script>
