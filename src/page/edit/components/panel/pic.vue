<style scoped lang="scss">

.modal-dialog {
    width: 968px;
    z-index: 999;
    background: #f7f7f7;
    position: absolute;
    left: calc(50% - 484px);
    top: 80px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    border-radius: 6px;
    overflow: hidden;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 17px 5px 17px 20px;
        border-bottom: 1px solid #ccd5db;
        h4 {
            font-size: 18px;
            line-height: 27px;
            font-weight: bold;
            color: #76838f;
        }
        .close {
            font-size: 20px;
            font-weight: 700;
            color: #c6c6c6;
            padding: 0 15px;
        }
        .close:hover {
            color: #7c7c7c;
        }
    }
    .main {
        position: relative;
        height: calc(100% - 65px);
        display: flex;
        .panel {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            width: 160px;
            left: 0;
            .panel-list {
                .item {
                    text-indent: 20px;
                    line-height: 50px;
                    font-weight: bold;
                    cursor: pointer;
                    a {
                        color: #76838f;
                    }
                }
                .item.active {
                    background: #fff;
                    border-top: 1px solid #ccd5db;
                    border-bottom: 1px solid #ccd5db;
                }
                .item:hover {
                    a {
                        color: #08a1ef;
                    }
                }
                .item:nth-child(1) {
                    border-top: 0;
                }
            }
            .upload {
                width: 160px;
                height: 50px;
                background: #59c7f9;
                display: flex;
                justify-content: center;
                position: relative;
                align-items: center;
                position: absolute;
                bottom: 0;
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
            .upload:hover {
                background: #08a1ef;
            }
        }
        .main-container {
            background: #fff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: calc(100% - 160px);
            min-height: 480px;
            .category {
                margin: 0 20px;
                min-height: 50px;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                border-bottom: 1px solid #ccc;
                .category-list {
                    display: flex;
                    flex-wrap: wrap;
                    width: 510px;
                    padding-bottom: 17px;
                    li {
                        font-family: Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
                        color: #76838f;
                        font-size: 12px;
                        margin: 15px 30px 0 0;
                        cursor: pointer;
                    }
                    li:hover {
                        color: #08a1ef;
                    }
                    li.active {
                        color: #08a1ef;
                    }
                }
                .category-input {
                    margin: 9px 0;
                    position: relative;
                    input {
                        width: 200px;
                        height: 30px;
                        transition: border .2s linear, box-shadow .2s linear;
                    }
                    .icon {
                        color: #ccc;
                        position: absolute;
                        right: 9px;
                        top: 10px;
                        font-size: 10px;
                    }
                }
            }
            .pic-list {
                display: flex;
                flex-wrap: wrap;
                padding: 20px;
                height: 380px;
                align-content: flex-start;
                .item {
                    width: 115px;
                    height: 115px;
                    background: #c9c9c9;
                    margin: 0 15px 15px 0;
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-color: #E6EBED;
                    position: relative;
                    .marker {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        background: rgba(0, 0, 0, 0.6);
                        opacity: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        a {
                            display: block;
                            width: 60px;
                            height: 30px;
                            text-align: center;
                            line-height: 30px;
                            margin: 5px 0;
                            border-radius: 3px;
                            color: #fff;
                            border: 1px solid #fff;
                            font-size: 14px;
                        }
                        a:hover {
                            background: #59c7f9;
                            border-color: #59c7f9;
                        }
                    }
                }
                .item:hover {
                    .marker {
                        opacity: 1;
                    }
                }
                .item:nth-child(6n) {
                    margin: 0 0 15px;
                }
            }
            .loading {
                padding-top: 160px;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                img {
                    width: 32px;
                    height: 32px;
                }
                p {
                    padding-top: 20px;
                    color: #A3AFB7;
                    font-size: 14px;
                    font-weight: bold;
                }
            }
            .none-box {
                padding-top: 160px;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                p {
                    padding-top: 20px;
                    color: #A3AFB7;
                    font-size: 14px;
                    font-weight: bold;
                }
            }
            .page {
                height: 60px;
            }
        }
    }
}

</style> <style lang="scss"> .vue-pagination-container {
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

<template>

<section id="pic-layer-box" class="modal-dialog">
    <div class="header">
        <h4>素材库</h4>
        <a href="javascript:void(0);" class="close" @click="panelHide(tplTypes.PIC)">x</a>
    </div>
    <div class="main">
        <div class="panel">
            <!--
				图片库
				我的上传
			-->
            <ul class="panel-list">
                <li v-for="(i, index) in panel.list" @click="changePanel(index)" class="item" :class="{active : index == panel.index}"><a href="javascript:void(0);">{{i.name}}</a></li>
            </ul>
            <div class="upload">
                <label>上传</label>
                <input type="file" multiple="multiple" @change="uploadImg">
            </div>
        </div>
        <div class="main-container">
            <div v-if="currentPanel.ename == 'library'" class="category">
                <ul class="category-list">
                    <li @click="changeCategory(index)" :class="{active : category.index == index}" v-for='(i, index) in category.list'>{{i.name}}</li>
                </ul>
                <div class="category-input">
                    <input type="text" placeholder="搜索" />
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sousuo-sousuo"></use>
                    </svg>
                </div>
            </div>
            <ul v-if="listStatus == 'exist'" class="pic-list">
                <li class="item" v-for="i in piclist" :data-width="i.width" :data-height="i.height" :style="{'background-image' : 'url(' + i.src +')', 'background-size' : i.bgSizeContain ? 'contain' : 'auto'}">
                    <div class="marker">
                        <a @click="del(i.id)" href="javascript:void(0);">删除</a>
                        <a @click="addItem({type : tplTypes.PIC, width : i.width, height : i.height, src : i.src})" href="javascript:void(0);">使用</a>
                    </div>
                </li>
            </ul>
            <div class="loading" v-if="listStatus == 'none'">
                <img src="../../images/loading.gif" />
                <p>加载中，请稍后</p>
            </div>
            <div class="none-box" v-if="listStatus == 'not-exist'">
                <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2297.062%22%20height%3D%2275%22%20viewBox%3D%220%200%2097.062%2075%22%3E%0A%20%20%3Cmetadata%3E%3C%3Fxpacket%20begin%3D%22%uFEFF%22%20id%3D%22W5M0MpCehiHzreSzNTczkc9d%22%3F%3E%0A%3Cx%3Axmpmeta%20xmlns%3Ax%3D%22adobe%3Ans%3Ameta/%22%20x%3Axmptk%3D%22Adobe%20XMP%20Core%205.6-c138%2079.159824%2C%202016/09/14-01%3A09%3A01%20%20%20%20%20%20%20%20%22%3E%0A%20%20%20%3Crdf%3ARDF%20xmlns%3Ardf%3D%22http%3A//www.w3.org/1999/02/22-rdf-syntax-ns%23%22%3E%0A%20%20%20%20%20%20%3Crdf%3ADescription%20rdf%3Aabout%3D%22%22/%3E%0A%20%20%20%3C/rdf%3ARDF%3E%0A%3C/x%3Axmpmeta%3E%0A%3C%3Fxpacket%20end%3D%22w%22%3F%3E%3C/metadata%3E%0A%3Cdefs%3E%0A%20%20%20%20%3Cstyle%3E%0A%20%20%20%20%20%20.cls-1%20%7B%0A%20%20%20%20%20%20%20%20fill%3A%20%23ccd5db%3B%0A%20%20%20%20%20%20%20%20fill-rule%3A%20evenodd%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%3C/style%3E%0A%20%20%3C/defs%3E%0A%20%20%3Cpath%20id%3D%22%u4E3A%u7A7A%u72B6%u6001%22%20class%3D%22cls-1%22%20d%3D%22M1003.21%2C496.206a8.191%2C8.191%2C0%2C0%2C1%2C2.19-.141q32.835%2C0%2C65.67%2C0a2.321%2C2.321%2C0%2C0%2C1%2C2.22%2C1.681q6.3%2C19.127%2C12.57%2C38.266a8.521%2C8.521%2C0%2C0%2C1%2C.12%2C2.312q0.015%2C15.056.01%2C30.109A2.312%2C2.312%2C0%2C0%2C1%2C1083.4%2C571q-45.48-.009-90.976%2C0c-0.918%2C0-2.019.094-2.715-.638-0.761-.694-0.692-1.831-0.688-2.776%2C0-10.033.019-20.065-.008-30.1a7.028%2C7.028%2C0%2C0%2C1%2C.608-2.9q6.038-18.414%2C12.079-36.83a2.3%2C2.3%2C0%2C0%2C1%2C1.51-1.552h0m2.09%2C4.149q-5.625%2C17.122-11.24%2C34.248%2C14.115%2C0%2C28.22%2C0a2.518%2C2.518%2C0%2C0%2C1%2C1.85.6%2C2.957%2C2.957%2C0%2C0%2C1%2C.77%2C2.275%2C12.828%2C12.828%2C0%2C0%2C0%2C5.17%2C9.641%2C12.489%2C12.489%2C0%2C0%2C0%2C16.91-1.894%2C12.735%2C12.735%2C0%2C0%2C0%2C3.14-7.98%2C2.772%2C2.772%2C0%2C0%2C1%2C.68-1.965%2C2.511%2C2.511%2C0%2C0%2C1%2C1.93-.675q14.115%2C0.006%2C28.22%2C0-5.625-17.121-11.24-34.248-32.2-.006-64.41%2C0h0m-12.053%2C38.532q0%2C13.914%2C0%2C27.827%2C44.255%2C0%2C88.513%2C0V538.887q-13.77%2C0-27.54%2C0a17.124%2C17.124%2C0%2C0%2C1-7.98%2C12.491%2C16.668%2C16.668%2C0%2C0%2C1-21.3-3.226%2C17.147%2C17.147%2C0%2C0%2C1-4.15-9.266q-13.77%2C0-27.543%2C0h0m0%2C0h0Z%22%20transform%3D%22translate%28-988.938%20-496%29%22/%3E%0A%3C/svg%3E%0A"
                />
                <p>{{tipMsg}}</p>
            </div>
            <div v-if="listStatus == 'exist'" class="page">
                <Pagination :page-num="pageNum" :current-page="activePage" :page-size="7" v-on:change="changePage"></Pagination>
            </div>
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
import * as api from '../../api/pic.js'
export default {
    components: {
        Pagination
    },
    computed: {
        ...mapGetters(['tplTypes']),
            currentPanel() {
                return this.panel.list[this.panel.index]
            }
    },
    data() {
        return {
            activePage: 1,
            piclist: [],
            pageNum: 1,
            tipMsg: '',
            listStatus: 'none', // none 请求回来之前  exist 有内容   not-exist 没有内容
            category: {
                index: 0,
                list: []
            },
            panel: {
                index: 0,
                // list: [{
                //         name: '我的上传',
                //         ename: ''
                //     }]
                list: [{
                    name: '图片库',
                    ename: 'library'
                }, {
                    name: '我的上传',
                    ename: 'my'
                }]
            },
        }
    },
    mounted() {
        $.ajax({
            url: '/api/admin/pic/type',
            data: {
                act: 'get'
            },
            success: (rs) => {
                console.log('获取type', rs);
                this.category.list = rs.data;
                this.getpic();
            }
        });
    },
    methods: {
        ...mapActions(['addItem', 'panelHide']),
			/**
			 * 改变类型
			 * @param index 类型索引
			 */
            changeCategory(index) {
                this.activePage = 1;
                this.category.index = index;
                this.getpic();
            },
			/**
			 * 改变面板
			 * @param index 面板索引
			 */
			changePanel(index = 0) {
                this.panel.index = index;
				this.activePage = 1;
				if(this.panel.list[index].ename == 'library'){
					this.getpic()
				}else{
					this.getpic('my');
				}
            },
			/**
			 * 改变页码
			 * @param value 当前页
			 */
			changePage(value) {
                this.activePage = value;
                this.getpic();
            },
			/**
			 * 删除图片
			 * @param id 图片id
			 */
            del(id) {
                api.delPic({
                    id: id
                }, (rs) => {
                    this.getpic();
                });
            },
			/**
			 * 改变页码
			 * @param type 类型
			 */
            getpic(type) {
                api.getPic({
                    limit: 18,
                    page: this.activePage,
                    types: type || this.category.list[this.category.index].id,
                }, (rs) => {
                    console.log(rs)
                    this.pageNum = rs.data.pageNum;
                    this.piclist = rs.data.data;
                    this.piclist.forEach((item) => {
                        if (item.width > 115 && item.height >= 115) {
                            item.bgSizeContain = true;

                        }
                    })
                    if (this.piclist.length == 0) {
                        this.tipMsg = '您还没有上传图片，请点击左下角上传!';
                        this.listStatus = 'not-exist';
                    } else {
                        this.listStatus = 'exist';
                    }
                })
            },
			/**
			 * 上传图片
			 * @param event
			 */
            uploadImg(ev) {
                var formData = new FormData();
                Array.from(ev.target.files).forEach(function(item) {
                    formData.append('picture', item);
                });
                api.savePic(formData, (rs) => {
                    // this.piclist.push(...rs.data);
                    this.activePage = 1;
                    this.getpic('my');
                });
            }
    }
}

</script>
