<!--作者 : 刘思
    功能 : 正在热映
    时间 : 2018-->
<template>
    <div class="hot-play">
        <div class="scroller">
            <!-- <Scroll ref="Scroll"> -->
            <div id="PullDown" class="pull-down">
                <span></span>
                <i class="iconfont m-Artboard"></i>
            </div>
            <div class="rankings">
                <div class="rankings-left">
                    <i class="iconfont m-record"></i>
                    <span>实时票房</span>
                </div>
                <div class="rankings-right">
                    <span>今日大盘<span class="num">1011.0万</span></span>
                    <i class="iconfont m-arrow-right"></i>
                </div>
            </div>
            <div ref="bscroll" style="height: calc(100vh - 3.14rem);overflow:hidden">
                <ul class="list" v-if="hotList">
                    <li class="list-li" v-for="(x, index) in hotList" :key="index" @click="jumpDetail(x)">
                        <div class="list-img">
                            <img :src="x.img.replace(/w.h/g, '120.180')"/>
                            <span class="list-play"><i class="iconfont m-play"></i></span>
                        </div>
                        <div class="list-content">
                            <div class="list-title">
                                <span class="list-title1">{{x.nm}}</span>
                                <div v-if="x.version">
                                    <span class="list-title2">{{x.version.split(' ')[0].substring(1,x.version.split(' ')[0].length).toUpperCase()}}</span>
                                    <span class="list-title3" v-if="x.version.split(' ')[1]">{{x.version.split(' ')[1].toUpperCase()}}</span>
                                </div>
                            </div>
                            <div class="list-context">
                                <div class="list-con">
                                    <p class="list-score" v-if="x.globalReleased">猫眼评分：<span>{{x.sc}}</span></p>
                                    <p class="list-score" v-else><span>{{x.wish}}</span>人想看</p>
                                    <p class="list-performer star">主演：{{x.star}}</p>
                                    <p class="list-performer showInfo">{{x.showInfo}}</p>
                                </div>
                                <div :class="x.globalReleased?'list-link':'list-link1'">{{x.globalReleased?'购票':'预售'}}
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <Loading v-else/>
            <!-- </Scroll> -->
            </div>
        </div>
    </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator';
import Loading from '../../components/Loading.vue'
// import Scroll from '../../components/Scroll.vue'
import BScroll from 'better-scroll';
import { setTimeout } from 'timers';

    @Component({
        components: {
            Loading,
        },
    })

    class HotPlay extends Vue {

        myScroll = null;

        hotList = null;

        getContents() {
            this.$axios.get('/ajax/movieOnInfoList').then((res) => {
                this.hotList = res.data.movieList;
                setTimeout(() => {
                    this.initScroll();
                });
            });
        }

        jumpDetail(data) {
            this.$router.push({
                name: 'DetailMovie',
                params: {
                    id: data.id,
                },
            });
        }

        // 初始化better-scroll
        initScroll() {
            const scrollDom = this.$refs.bscroll;
            this.betterScroll = new BScroll(scrollDom, {
                probeType: 3,
                scrollY: true,
                useTransition: false, // 防止iphone微信滑动卡顿
                bounce: true,
                momentumLimitDistance: 5,
            });
        }

        mounted() {
            this.getContents();
        }
    }

export default HotPlay;
</script>

<style lang="scss" scoped>
    .hot-play {
        background: #fff;
        width: 100vw;
        .scroller {
            position: relative;
            width: 100vw;
            height: 100vh;
            .pull-down {
                height: 1rem;
                vertical-align: bottom;
                text-align: center;
                display: none;
                position: relative;
                span{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-left:-0.25rem;
                    display: block;
                    width: 0.5rem;
                    height: 0.5rem;
                    border: 1px dashed $font-color;
                    border-radius: 50%;
                    animation: rotation 5s linear infinite;
                }
                .m-Artboard {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-left:-0.25rem;
                    display: block;
                    width: 0.5rem;
                    height: 0.5rem;
                    font-size: 0.48rem;
                    color: #ccc;
                    border-radius: 50%;
                    padding: 0.02rem;
                }

            }

            .rankings {
                width: 6.78rem;
                height: 0.72rem;
                background-color: #f6f6f6;
                border-radius: 0.02rem;
                margin: 0 auto;
                margin-bottom: 0.1rem;
                margin-top: 1.4rem;
                div {
                    display: inline-block;
                    line-height: 0.72rem;
                    font-size: 0.24rem;
                    font-weight: bold;
                    color: $font-black-color;
                }

                .rankings-left {
                    float: left;

                    .m-record {
                        margin: 0 0.14rem 0 0.2rem
                    }
                }

                .rankings-right {
                    float: right;
                    text-align: right;

                    .num {
                        color: $font-color;
                        margin: 0 0.06rem 0 0.04rem;
                    }

                    .m-arrow-right {
                        vertical-align: middle;
                    }
                }
            }

            .list {
                .list-li {
                    padding-left: 0.52rem;
                    height: 2.23rem;
                    display: flex;
                    flex-direction: row;

                    .list-img {
                        margin-right: 0.26rem;
                        position: relative;

                        img {
                            width: 1.2rem;
                            height: 1.7rem;
                            margin-top: 0.26rem;
                            border-radius: 0.05rem;
                        }

                        .list-play {
                            display: block;
                            width: 0.4rem;
                            height: 0.4rem;
                            background-color: #fff;
                            border-radius: 50%;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            margin-left: -0.2rem;
                            margin-top: -0.2rem;
                            text-align: center;
                            line-height: 0.4rem;

                            .m-play {
                                width: 0.13rem;
                                height: 0.13rem;
                            }
                        }

                    }

                    .list-content {
                        width: 100%;
                        border-bottom: 1px solid $border-bottom;

                        .list-title {
                            margin-top: 0.34rem;
                            display: flex;
                            flex-direction: row;

                            .list-title1 {
                                font-weight: bold;
                                font-size: 0.3rem;
                                line-height: 0.3rem;
                                color: $font-black-color;
                            }

                            div {
                                .list-title2 {
                                    margin-left: 0.2rem;
                                    float: left;
                                    width: 0.3rem;
                                    height: 0.3rem;
                                    line-height: 0.3rem;
                                    text-align: center;
                                    background-color: $box-background;
                                    color: #fff;
                                    font-size: 0.12rem;
                                    font-weight: bold;
                                    border-top-left-radius: 0.05rem;
                                    border-bottom-left-radius: 0.05rem;
                                }

                                .list-title3 {
                                    float: left;
                                    width: 0.6rem;
                                    height: 0.3rem;
                                    line-height: 0.3rem;
                                    text-align: center;
                                    border: 1px solid $box-background;
                                    box-sizing: border-box;
                                    color: $box-background;
                                    font-size: 0.12rem;
                                    font-weight: bold;
                                    border-top-right-radius: 0.05rem;
                                    border-bottom-right-radius: 0.05rem;
                                }
                            }

                        }

                        .list-context {
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;

                            .list-con {
                                width: calc(100% - 1.8rem);

                                p {
                                    margin-bottom: 0.16rem;
                                    font-size: 0.26rem;
                                }

                                .list-score {
                                    margin-top: 0.22rem;

                                    span {
                                        color: #fab10c;
                                    }
                                }
                                .star{
                                    padding-top: 0.1rem;
                                }
                                .list-performer {
                                    width: 3.2rem;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap
                                }
                            }
                        }

                        .list-link {
                            margin-right: 0.4rem;
                            width: 0.98rem;
                            height: 0.52rem;
                            background-color: $font-color;
                            border-radius: 0.46rem;
                            text-align: center;
                            line-height: 0.52rem;
                            color: #fff;
                            margin-top: 0.24rem;
                        }

                        .list-link1 {
                            margin-right: 0.4rem;
                            width: 0.98rem;
                            height: 0.52rem;
                            background-color: #007fff;
                            border-radius: 0.46rem;
                            text-align: center;
                            line-height: 0.52rem;
                            color: #fff;
                            margin-top: 0.24rem;
                        }
                    }
                }
            }
        }
    }
    @-webkit-keyframes rotation{
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
    }
</style>
