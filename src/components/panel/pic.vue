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
                .item.active {
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
				align-content : flex-start;
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
                    margin: 0 0 15px;
                }
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .page {
                height: 50px;
                // background: red;
            }
        }
    }
}

</style> <style lang="scss"> .vue-pagination-container {
    display: flex;
    align-items: center;
    ul {
        display: flex;
    }
    .aabbb {
        width: 22px;
        line-height: 22px;
        padding: 6px;
        text-align: center;
    }
}

.vue-pagination-item {
    min-width: 35px;
    line-height: 36px;
    background: #fff;
    text-align: center;
    font-size: 12px;
    color: #76838f;
    border: 1px solid #ccd5db;
    margin: 2px;
    a {
        display: block;
        width: 100%;
        height: 100%;
    }
}

.vue-pagination-item.active {
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
                <li class="item active"><a href="javascript:void(0);">我的上传</a></li>
            </ul>
            <div class="shangchuan">
                <label>上传</label>
                <input type="file" multiple="multiple" @change="uploadImg">
            </div>
        </div>
        <div class="pic-list">
            <ul class="pic-lists">
                <li v-for="i in piclist" :style="{'background-image' : 'url(' + i.src +')'}">
                    <p @click="del(i.pic_id)">删除</p>
                </li>
            </ul>
            <div class="page">
                <Pagination :page-num="pageNum" :active-page="activePage" :page-size="7" v-on:change="changePage"></Pagination>
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
import * as api from '../../api/edit.js'
export default {
    components: {
        Pagination
    },
    data: function() {
        return {
            activePage: 1,
            piclist: [],
            pageNum: 1
        }
    },
    mounted: function() {
        this.getpic();
    },
    methods: {
        del: function(id) {
            api.delPic({
                pic_id: id
            }, (rs) => {
                this.getpic();
            });
        },
        getpic: function() {
            api.getPic({
                limit: 18,
                page: this.activePage,
            }, (rs) => {
				console.log(rs)
                this.pageNum = rs.data.pageNum;
                this.piclist = rs.data.data;
            })
        },
        changePage: function(value) {
            this.activePage = value;
            this.getpic();
        },
        uploadImg: function(ev) {
            var formData = new FormData();
            Array.from(ev.target.files).forEach(function(item) {
                formData.append('sina_img', item);
            });
            api.savePic(formData, (rs) => {
                this.piclist.push(...rs.data);
                this.activePage = 1;
                this.getpic();
            });
        }
    }
}

</script>
