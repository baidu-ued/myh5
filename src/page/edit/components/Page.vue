<style scoped lang="scss">

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

::-webkit-scrollbar-thumb {
    min-height: 20px;
    background-clip: content-box;
    box-shadow: 0 0 0 5px rgba(100, 100, 100, .5) inset;
}

.page-list {
    position: absolute;
    left: 0;
    top: 50px;
    bottom: 31px;
    width: 175px;
    z-index: 2;
    border-right: 1px solid #000;
    overflow: auto;
    background: #494950;
    -webkit-user-select: none;
    .page-sortable {
        padding: 10px 0;
		position: relative;
        li {
            position: relative;
            overflow: hidden;
            padding: 12px 15px 18px 25px;
            label {
                color: #fff;
                text-align: center;
                position: absolute;
                left: 4px;
                top: 9px;
                width: 21px;
                height: 30px;
                padding: 5px 0;
                font-size: 14px;
            }
            .item-content {
                position: relative;
                width: 112px;
                height: 181px;
                // transition: .5s;
                -webkit-perspective: 500px;
                -webkit-perspective-origin: center center;
                transform-style: preserve-3d;
                .page {
                    -webkit-transform: scale(.35);
                    -webkit-transform-origin: top left;
                    background-color: #333;
                    position: relative;
                    transform-style: preserve-3d;
                    transition: .5s;
                    width: 320px;
                    height: 520px;
                }
            }
            .item-option {
                position: absolute;
                top: 0;
                left: 112px;
                width: 50px;
                height: 178px;
                background-color: rgba(0, 0, 0, .5);
                padding-top: 4px;
                transition: .5s;
                transform: translate3d(0, 0, 0) rotateY(90deg);
                transform-origin: 0 0;
                transform-style: preserve-3d;
                .item-page {
                    height: 24px;
                    display: block;
                    color: #c7c7c7;
                    text-align: center;
                    padding: 6px 0;
                    border-top: 1px solid transparent;
                    border-bottom: 1px solid transparent;
                    svg {
                        display: block;
                        transform: skewY(-1deg) scaleX(1.5) translate(10px, 8px);
                        font-size: 18px;
                    }
                }
                .item-page:hover {
                    background: rgba(0, 0, 0, .6);
                    border-top: 1px solid rgba(0, 0, 0, .9);
                    border-bottom: 1px solid rgba(80, 80, 80, .6);
                    color: #ff5e5e;
                    cursor: pointer;
                }
            }
        }
        li.active {
            label {
                background: url(../images/page_select.png) no-repeat;
            }
            .item-content {
                outline: #ff5e5e solid 3px;
            }
        }
        li:hover {
            .page {
                transform-origin: 0 0;
                transform: rotateY(-25deg) scale(.3, .35);
            }
            .item-option {
                transform: translate3d(-25px, 0, 40px) rotateY(59deg);
            }
        }
    }
    .add-page-button {
        background: #48484f;
        border-top: 1px solid #323237;
        color: #fff;
        font-size: 24px;
        line-height: 30px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 175px;
        text-align: center;
        z-index: 999;
        cursor: pointer;
        border-right: 1px solid #000;
    }
}

</style>

<template>

<aside class="page-list" id="page-list" @mousedown="cancelSelect()">
    <ul class="page-sortable">
        <li @mousedown="changePage(index)" v-for="(i, index) in pageLength" class="v-sort-item" v-bind:class="{active : index == currentPage}">
            <label>{{index + 1}}</label>
            <div class="item-content">
                <section class="page" data-notouch="" data-arrow="" style=""></section>
                <div class="item-option">
                    <!-- <div title="复制" class="item-page">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-fuzhi"></use>
                        </svg>
                    </div> -->
                    <!-- <div title="存为模板" class="item-page">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-xingxing"></use>
                        </svg>
                    </div> -->
                    <div @click.stop="emptyPage(index)" title="重置" class="item-page">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-zhongzhi"></use>
                        </svg>
                    </div>
                    <div @click.stop="delPage(index)" title="删除" class="item-page">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shanchu"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </li>
    </ul>
    <div @click="addPage" class="add-page-button" id="addpage">+</div>
</aside>

</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'
import VueSort from 'vue-sort'
export default {
    computed: {
        ...mapGetters(['pageLength', 'currentPage', 'phoneData'])
    },
    methods: {
        ...mapActions(['cancelSelect', 'sortPage', 'changePage', 'addPage', 'delPage', 'selectItem', 'emptyPage'])
    },
    mounted() {
        new VueSort('.page-sortable', {
            itemsClass: 'v-sort-item',
            onMouseUp: (s)=> {
				this.sortPage({
					list : s.sort(this.phoneData.data),
					index : s.activeIndex
				});
            }
        })
    }
}

</script>
