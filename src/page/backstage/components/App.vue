<style scoped>



</style>

<template>

<!--
	类型 当前类型，
-->
<div>
    <ul>
        <li v-for='(i, index) in pictype'>
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
    <ul>
        <li v-for='i in list'><img style="width:50px;height:50px;" :src="i.src" /></li>
    </ul>
</div>

</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            pictype: [],
            list: [1, 2, 3]
        }
    },
    methods: {
        getimg() {
                $.ajax({
                    url: '/aj/pic/get',
                    type: 'get',
                    data: {

                    },
                    success: (rs) => {
                        console.log(rs)
                        rs.data.data.forEach((item) => {
                            item.src = 'http://ors5gu12t.bkt.clouddn.com/' + item.src + '?imageView2/2/w/230/h/230/q/75|imageslim';
                        })
                        this.list = rs.data.data;
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
