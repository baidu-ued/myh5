<style scoped lang="scss">

.layer-box {
    width: 968px;
    height: 560px;
    background: #f7f7f7;
    position: absolute;
    left: calc(50% - 484px);
    top: 80px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    border-radius: 6px;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 17px 20px;
        border-bottom: 1px solid #ccd5db;
        h4 {
            font-size: 18px;
            line-height: 27px;
            font-weight: bold;
            color: #76838f;
        }
    }
    .container {
        position: relative;
        height: calc(100% - 61px);
        display: flex;
        .left {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            width: 160px;
            // background: #f7f7f7;
            left: 0;
            .list {
                // display: flex;
                // flex-direction: column;
                .item {
                    text-indent: 20px;
                    line-height: 50px;
                    font-weight: bold;

                    // background: #fff;
                    a {
                        color: #76838f;
                    }
                }
				.item.active{
					background: #fff;
				}
            }
            .shangchuan {
                // display: flex;
                width: 160px;
                height: 50px;
                background: #59c7f9;
                display: flex;
                justify-content: center;
                position: relative;
                align-items: center;
                input {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    opacity: 0;
                }
                label {
                    font-size: 14px;
                    color: #fff;
                    font-weight: bold;
                }
            }
        }
        .shangchuan:hover {
            background: #08a1ef;
        }
        .pic-list {
            background: #fff;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
            .pic-lists {
                display: flex;
                flex-wrap: wrap;
                padding: 20px;
				height: 380px;
                li {
                    width: 115px;
                    height: 115px;
                    background: #c9c9c9;
                    margin: 0 15px 15px 0;
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-color: #E6EBED;
                }
                li:nth-child(6n) {
                    margin: 0 0 15px 0;
                }
                img {
                    width: 100%;
                    height: 100%;
                }
            }
			.page{
				height: 50px;
				// background: red;
			}
        }
    }
}
</style>
<style lang="scss">
.vue-pagination-container{
	display: flex;
	align-items: center;
	ul{
		display: flex;
	}
	.aabbb{
		width: 22px;
		line-height: 22px;
		padding: 6px;
		text-align: center;

	}
}
.vue-pagination-item{
	min-width: 35px;
	line-height: 36px;
	background: #fff;
	text-align: center;
	font-size: 12px;
	color:#76838f;
	border: 1px solid #ccd5db;
	margin:2px;
	a{
		display: block;
		width: 100%;
		height: 100%;
	}
}
.vue-pagination-item.active{
	background: red;
}
</style>
<template>

<section class="layer-box">
    <div class="header">
        <h4>素材库</h4>
        <div>x</div>
    </div>
    <div class="container">
        <div class="left">
            <ul class="list">
                <li class="item"><a href="javascript:void(0);">我的上传</a></li>
                <li class="item active"><a href="javascript:void(0);">最近使用</a></li>
            </ul>
            <div class="shangchuan">
                <label>上传</label>
                <input type="file" multiple="multiple" @change="aaa">
            </div>
        </div>
        <div class="pic-list">
            <ul class="pic-lists">
                <li v-for="i in piclist" :style="{'background-image' : 'url(http://localhost:8080/dbimg/aAFRPcg7GyNYIzcmu91bjmDU.jpg)'}"><img :src="i.src" /></li>
            </ul>
			<div class="page">
			<Pagination :page-num="10" :active-page="activePage" :page-size="7" v-on:change="bbb"></Pagination></div>
        </div>
    </div>
</section>

</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'
import Pagination from 'vuejs-pagination'
export default {
	components : {
		Pagination
	},
    data: function() {
        return {
			activePage : 1,
            piclist: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
        }
    },
    methods: {
		bbb:function(value){
			console.log('刘少鹏')
			console.log(value)
			this.activePage = value;    //必须改变activePage
		},
        aaa: function(ev) {
            var formData = new FormData();
            Array.from(ev.target.files).forEach(function(item) {
                formData.append('sina_img', item);
            });
            $.ajax({
                url: '/api/edit/pic',
                type: 'post',
                contentType: false,
                //必须false才会自动加上正确的Content-Type
                processData: false,
                //必须false才会避开jQuery对 formdata 的默认处理,XMLHttpRequest会对 formdata 进行正确的处理
                data: formData,
                success: (rs) => {
                    this.piclist.push(...rs.data)
                }
            });
        }
    }
}

</script>
