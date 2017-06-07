<style scoped lang="scss">

.modal-dialog {
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
        height: calc(100% - 61px);
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
                    a {
                        color: #76838f;
                    }
                }
                .item.active {
                    background: #fff;
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
            width: 100%;
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
            .page {
                height: 50px;
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

<section id="pic-layer-box" class="modal-dialog">
    <div class="header">
        <h4>素材库</h4>
        <a href="javascript:void(0);" class="close" @click="panelHide('PIC')">x</a>
    </div>
    <div class="main">
        <div class="panel">
            <ul class="panel-list">
                <li class="item active"><a href="javascript:void(0);">我的上传</a></li>
            </ul>
            <div class="upload">
                <label>上传</label>
                <input type="file" multiple="multiple" @change="uploadImg">
            </div>
        </div>
        <div class="main-container">
            <ul class="pic-list">
                <li class="item" v-for="i in piclist" :data-width="i.width" :data-height="i.height" :style="{'background-image' : 'url(' + i.src +')'}">
                    <div class="marker">
                        <a @click="del(i.pic_id)" href="javascript:void(0);">删除</a>
                        <a @click="addItem({type : types.PIC, width : i.width, height : i.height, src : i.src})" href="javascript:void(0);">使用</a>
                    </div>
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
import * as types from '../../const/item-types.js'
export default {
    components: {
        Pagination
    },
    data: function() {
        return {
            types: types,
            activePage: 1,
            piclist: [],
            pageNum: 1
        }
    },
    mounted: function() {
        this.getpic();
    },
    methods: {
        ...mapActions(['addItem', 'panelHide']),
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
