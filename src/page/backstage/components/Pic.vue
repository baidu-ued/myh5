<style lang="scss"> .vue-pagination-container {
    display: flex;
    align-items: center;
    // margin-left: 50px;
    ul {
        display: flex;
    }
    .vue-pagination-item {
        min-width: 34px;
        line-height: 34px;
        background: #fff;
        text-align: center;
        font-size: 12px;
        color: #76838f;
        padding: 0;
        border: 1px solid #ccd5db;
        margin: 5px;
        border-radius: 4px;
        a {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .vue-pagination-item:hover {
        background: #f7f7f7;
    }
    .vue-pagination-item.active {
        background: #08a1ef;
        color: #fff;
        border-color: #08a1ef;
        a {
            color: #fff;
        }
    }
    .vue-pagination-prev,
    .vue-pagination-next {
        font-size: 24px;
    }
    .vue-pagination-item.disabled {
        a {
            color: #dddddd;
        }
    }
    .select-page {
        display: flex;
        align-items: center;
        margin-left: 10px;
        span {
            font-size: 14px;
            color: #76838f;
        }
        .vue-pagination-ipt {
            width: 34px;
            height: 34px;
            text-align: center;
            margin: 0 5px;
        }
        a {
            font-size: 12px;
            color: #76838f;
            // height: 30px;
            width: 34px;
            line-height: 34px;
            text-align: center;
            outline: none;
            border: 1px solid #ccd5db;
            background: #fff;
            display: block;
            margin-left: 5px;
            border-radius: 4px;
        }
    }
}

</style>
<style scoped lang="scss">

.img-list {
    display: flex;
    width: 300px;
    flex-wrap: wrap;
    li {
		margin:3px;
		border:1px solid rgba(0,0,0,0)
	}
    li.active {
        border: 1px solid red;
    }
}

</style>

<template>

<!--
	类型 当前类型，
-->
<div>
    <ul>
        <li @click="changeType(i, index)" v-for='(i, index) in pictype'>
            <label>{{i.name}}</label>
            <input type="text" ref='rname' />
            <button @click="rname(i, $refs.rname[index].value)">重命名</button> {{i.show}}
            <button @click="noshow(i, 0)">不展示该类型</button>
            <button @click="noshow(i, 1)">展示该类型</button>
        </li>
    </ul>
    <div>
        <input ref="add_input" type="text" />
        <button @click="add($refs.add_input.value)">新增</button>
    </div>
    <button>筛选</button>
    <ul class="img-list">
        <li @click="changeActive(i, index)" :class="{active:i.active}" v-for='(i, index) in list'><img style="width:50px;height:50px;" :src="i.src" /></li>
    </ul>
    <Pagination :page-num="pageNum" :current-page="activePage" :page-size="7" v-on:change="changePage"></Pagination>
</div>

</template>

<script>

import Pagination from 'vuejs-pagination'
// alert(Pagination)
export default {
    name: 'App',
    components: {
        Pagination
    },
    data() {
        return {
			pageNum: 1,
			activePage : 1,
            pictype: [],
            list: [1, 2, 3]
        }
    },
    methods: {
		changePage(value) {
			this.activePage = value;
			this.getimg();
		},
		changeActive(item, index){

			this.$set(item, 'active', !item.active)

		},
        changeType(item, index) {
                console.log(item)
                console.log(index)
                this.getimg(item.id)
            },
            getimg(id) {
                var data = {
					page: this.activePage
				};
                if (id) {
                    data.types = id;
                }
                $.ajax({
                    url: '/aj/pic/get',
                    type: 'get',
                    data: data,
                    success: (rs) => {
                        console.log(rs)
                        rs.data.data.forEach((item) => {
                            item.src = 'http://ors5gu12t.bkt.clouddn.com/' + item.src + '?imageView2/2/w/230/h/230/q/75|imageslim';
                        })
                        this.list = rs.data.data;
						this.pageNum = rs.data.pageNum;
                    }
                });
            },
            rname(item, val) {
                $.ajax({
                    url: '/api/admin/pic/type',
                    data: {
                        act: 'rname',
                        id: item.id,
                        name: val.trim()
                    },
                    success: (rs) => {
                        console.log(rs);
                    }
                });
            },
            noshow(item, val) {
                $.ajax({
                    url: '/api/admin/pic/type',
                    data: {
                        act: 'setshow',
                        id: item.id,
                        show: val
                    },
                    success: (rs) => {
                        console.log(rs);
                    }
                });
            },
            add(val) {
                $.ajax({
                    url: '/api/admin/pic/type',
                    data: {
                        act: 'add',
                        name: val
                    },
                    success: (rs) => {
                        console.log('新增type', rs)
                        this.get();
                    }
                });
            },
            get() {
                $.ajax({
                    url: '/api/admin/pic/type',
                    data: {
                        act: 'getall',
                    },
                    success: (rs) => {
                        console.log('获取type', rs);
                        this.pictype = rs.data;
                    }
                });
            }
    },
    mounted() {
        this.get();
        this.getimg();
    }
}

</script>
