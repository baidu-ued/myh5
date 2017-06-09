

<template>

<div class="main">
    <h2>图片管理系统</h2>
	<div>
        <p>当前所有类型</p>
        <ul>
            <li v-for="i in typelist">{{i}}</li>
        </ul>

    </div>
	<div>
        <p>添加类型</p>
        <input type="text" v-model="newType"/><button @click="addType">添加</button>
    </div>
    <div>
        <p>当前所有官方图片</p>
        <ul>
            <li v-for="i in list"><img style="width:10px;height:10px;" :src="i.src"/></li>
        </ul>
    </div>
    <div>
        <label>上传图片</label>
        <input type="file" multiple="multiple" @change="uploadImg" />
    </div>
	<div>
        <p>刚上传的图片</p>
        <img :id="newImg.pic_id" style="width:20px;height:20px;" :src="newImg.src" />
		类型<input v-model="type" type="text"/><button @click="queding">确定</button>
    </div>
</div>

</template>

<script>

import $ from 'jQuery'
import * as api from '../../api/edit.js'
export default {
    data() {
            return {
                list: [],
				picurl : '',
				newImg : { src : ''},
				type : '',
				typelist : [],
				newType : ''
            }
        },
		/*
			从1001开始
			category : 1001,
			category : 1002,
			category : 1003,
			category : 1004,
			每个类型有不同的含义
		*/
        mounted: function() {
            $.ajax({
                url: 'http://localhost:8080/aj/pic/getadmin',
				data : {
					page : 1,
					limit : 18
				},
                success: (rs) => {
                    console.log(rs)
                    this.typelist = rs.data.pic_type;
                }
            })
        },
        methods: {
			addType(){
				$.ajax({
	                url: 'http://localhost:8080/aj/pic/setadmin',
					data : {
						type : this.newType
					},
	                success: (rs) => {
	                    console.log(rs)
	                }
	            })
			},
            uploadImg(ev) {
                var formData = new FormData();
                Array.from(ev.target.files).forEach((item) => {
                    formData.append('picture', item);
                });
                 api.savePic(formData, (rs) => {
                    // this.piclist.push(...rs.data);
                    // this.activePage = 1;
                    // this.getpic();
					console.log(rs);
					this.newImg = rs.data[0];
                });
            },
			queding(){
				$.ajax({
					url : '/aj/pic/change',
					data : {
						type : this.type,
						pic_id : this.newImg.pic_id
					},
					success : (rs)=>{
						console.log(rs)
					}
				})
			}
        }
}

</script>
