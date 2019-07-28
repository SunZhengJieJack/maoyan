<template>
    <transition name="searchIn">
        <div class="search" id="search">
            <div class="search_container">
                <div class="search-header">
                    <div class="middle-search">
                        <i class="iconfont m-search"/>
                        <input class="searchTitle" placeholder="找影视剧、影院、影人、演出、图书" @input="getData" v-model="msg"/>
                        <i class="iconfont m-delete" v-show="msg" @click="empty"/>
                    </div>
                    <span class="cancel" @click="back">取消</span>
                </div>
                <div style="height: 0.7rem;"></div>
                <div class="search-article">
                    <div class="tag_container" v-show="!show">
                        <div class="icon_container" v-for="item in data" :key="item.name">
                            <i class="iconfont" :class="item.icon"></i>
                            <span class="sortList">{{item.name}}</span>
                        </div>
                    </div>
                    <div class="search_result" v-show="resultArr.length!==0 && !show">
                        <p class="last-search">最近搜索</p>
                        <div class="result" v-for="(item, index) in resultArr" :key="item">
                            <i class="iconfont m-time"></i>
                            <span>{{item}}</span>
                            <i class="iconfont m-del-icon" @click="del(index)"></i>
                        </div>
                    </div>
                </div>
                <div class="result_container" id="result_container" v-if="show">
                    <div ref="bscroll" style="height: 100vh;overflow:hidden">
                    <!-- <Scroll ref="Scroll"> -->
                        <div class="result_box">
                            <div class="search-result">
                                <div class="gather-title">
                                    <p>电影/电视剧/综艺</p>
                                </div>
                                <div class="gather" v-for="i in movies" :key="i.id">
                                    <div class="img_container">
                                        <img :src="i.img"/>
                                    </div>
                                    <div class="brief_desc">
                                        <h3 class="nm">{{i.nm}}</h3>
                                        <p class="enm">{{i.enm}}</p>
                                        <p class="cat">{{i.movieType==2?i.cat.split(',').join(' | '):i.cat}}</p>
                                        <p class="pubDesc">{{i.pubDesc}}</p>
                                    </div>
                                    <div class="wantSee">
                                        <p class="wantSee_container">{{i.wish}}<span>人想看</span></p>
                                        <button class="wishBtn" v-show="i.movieType===0">想看</button>
                                    </div>
                                </div>
                                <div class="seeMore">
                                    <p>查看全部{{total}}部影视结果
                                        <i class="iconfont m-arrow-right"></i>
                                    </p>
                                </div>
                            </div>
                            <div class="cinema-result">
                                <div class="cinema-title">
                                    <p>影院</p>
                                </div>
                                <div class="cinema" v-for="i in cinemas" :key="i.id">
                                    <header class="cm_name">
                                        <p class="nm">{{i.nm}}</p>
                                        <p class="sellPrice">
                                            {{i.sellPrice}}元<span style="color:gray;">起</span>
                                        </p>
                                    </header>
                                    <div class="addr_container">
                                        <p class="addr">{{i.addr}}</p>
                                        <p class="distance">{{parseInt(i.distance)+'km'}}</p>
                                    </div>
                                    <p class="vipDesc">
                                        <span class="vipDesc lightOrange" v-if="i.vipDesc">{{i.vipDesc}}</span>
                                    </p>
                                    <p class="discount">
                                        <span class="favourable">惠</span>
                                    </p>
                                </div>
                                <div class="seeMore">
                                    <p>查看全部{{totalCounts}}部影视结果
                                        <i class="iconfont m-arrow-right"></i>
                                    </p>
                                </div>
                            </div>
                        </div>
                <!-- </Scroll> -->
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
// import Scroll from '../../components/Scroll.vue'
// import IScroll from 'iscroll';
import BScroll from 'better-scroll';

    @Component({
        components: {
            // Scroll,
        },
    })
class Search extends Vue {
    data = [
        {
            name: '分类找片',
            icon: 'm-movie',
        },
        {
            name: '影人',
            icon: 'm-people-search',
        },
        {
            name: '影片',
            icon: 'm-cinema',
        },
        {
            name: '资讯',
            icon: 'm-news',
        },
    ]

    msg = null;

    total = null;

    totalCounts = null;

    cinemas = null;

    movies = null;

    show = false;

    resultArr = [];

    getData() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            const params = {
                cityId: 1,
                kw: this.msg,
                stype: -1,
            };
            this.$axios.get('/ajax/search', { params }).then(res => {
                this.movies = res.data.movies.list.splice(0, 3);
                this.movies.forEach(item => {
                    item.img = item.img.replace(/w.h/g, '120.180');
                });
                this.total = res.data.movies.total;
                this.cinemas = res.data.cinemas.list.splice(0, 2);
                this.totalCounts = res.data.cinemas.total;
                this.show = this.msg;
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.initScroll();
                    });
                    this.resultArr.unshift(this.msg);
                });
            });
        }, 300);
    }
    
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

    del(index) {
        this.resultArr.splice(index, 1);
    }

    back() {
        this.$router.go(-1);
    }

    empty() {
        this.msg = '';
        this.show = this.msg;
    }
}
export default Search;
</script>

<style lang="scss" scoped>
// .searchIn-enter-active, .searchIn-leave-active{
//     transition: all .5s;
// }
// .searchIn-enter, .searchIn-leave-to {
//     transform: translate3d(0, 100vh, 0);
// }
.search{
    position: absolute;
    width: 100vw;
    background: #f5f5f5;
    z-index: 100;
    top: 0;
    overflow: hidden;
    .search_container{
        height: 100vh;
        overflow: hidden;
        .search-header{
            height: 0.7rem;
            position: fixed;
            width: 100%;
            line-height: 0.7rem;
            background: #fafafa;
            .middle-search{
                position: relative;
                height: 0.6rem;
                width: 6rem;
                left: 0.1rem;
                top: 0.05rem;
                float: left;
                line-height: 0.6rem;
                .m-search{
                    position: absolute;
                    z-index: 21;
                    font-size: 0.5rem;
                    left: 0.1rem;
                };
                .searchTitle{
                    width: 5.5rem;
                    position: absolute;
                    z-index: 20;
                    background: #ebebeb;
                    border: none;
                    outline: none;
                    border-radius: 0.5rem;
                    height: 0.6rem;
                    font-size: 0.24rem;
                    padding-left: 0.6rem;
                }
                .m-delete{
                    position: absolute;
                    z-index: 30;
                    color: gray;
                    right: 0.1rem;
                    font-size: 0.24rem;
                }
            }
            .cancel{
                color: $font-color;
                line-height: 0.7rem;
                text-decoration: none;
                float: right;
                margin-right: 0.2rem;
            }
        }
        .search-article{
            background: #fff;
            width: 100%;
            .tag_container{
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                .icon_container{
                    padding-top: 0.6rem;
                    padding-bottom: 0.2rem;
                    margin-left: 0.25rem;
                    margin-right: 0.25rem;
                    .iconfont{
                        border: 1px solid #ebebeb;
                        border-radius: 50%;
                        padding: 0.2rem;
                        font-size: 0.35rem;
                        box-shadow: 0 0 0.2rem #ebebeb;
                    }
                    .sortList{
                        display: block;
                        line-height: 0.7rem;
                        margin-top: 0.3rem;
                    }
                }
            }
            .search_result{
                .last-search{
                    padding-left: .3rem;
                    line-height: .7rem;
                    font-weight: 500;
                }
                .result{
                    display: flex;
                    align-items: center;
                    line-height: .6rem;
                    border-top: .02rem solid #f3f2f2;
                    .m-time{
                        margin-left: .3rem;
                    }
                    span{
                        line-height: .6rem;
                        margin-left: .1rem;
                    }
                    .m-del-icon{
                        position: absolute;
                        right: .1rem;
                        display: inline-block;
                        width: .6rem;
                        height: .6rem;
                        text-align: center;
                    }
                }
            }
        }
        .result_container{
            position: relative;
            // height: 11.7rem;
            .result_box{
                padding-bottom: 1.6rem;
            }
            .search-result{
                background: #fff;
                .gather-title{
                    width: 100%;
                    height: 0.8rem;
                    line-height: 0.8rem;
                    border-bottom: 1px solid #ebebeb;
                    p{
                        margin-left: 0.25rem;
                    }
                }
                .gather{
                    display: flex;
                    border-bottom: 1px solid #ebebeb;
                    height: 2.3rem;
                    margin-left: 0.25rem;
                    .img_container{
                        width: 1.3rem;
                        height: 1.8rem;
                        margin-top: 0.2rem;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .brief_desc{
                        margin-left: 0.1rem;
                        margin-top: 0.25rem;
                        p{
                            line-height: 0.36rem;
                            width: 4rem;
                            color: gray;
                        }
                        h3{
                            line-height: 0.36rem;
                            width: 4rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .wantSee{
                        color: #f7ae2a;
                        text-align: center;
                        width: 2rem;
                        margin-top: 0.2rem;
                        .wantSee_container{
                            font-size: 0.32rem;
                            span{
                                font-size: 0.24rem;
                            }
                        }
                        .wishBtn{
                            width: 1.1rem;
                            height: 0.5rem;
                            background: #f7ae2a;
                            color: #fff;
                            border: none;
                            border-radius: 0.3rem;
                            margin-top: 0.6rem;
                            box-shadow: 0.01rem 0.02rem 0.08rem #f7ae2a;
                        }
                    }
                }
                .seeMore{
                    p{
                        line-height: 0.9rem;
                        color: $font-color;
                        text-align: center;
                        font-size: 0.26rem;
                        .m-arrow-right{
                            position: absolute;
                            font-size: 0.4rem;
                        }
                    }
                }
            }
            .cinema-result{
                width: 100vw;
                position: relative;
                background: #fff;
                margin-top: 0.2rem;
                .cinema-title{
                    width: 100%;
                    height: 0.8rem;
                    line-height: 0.8rem;
                    border-bottom: 1px solid #ebebeb;
                    p{
                        margin-left: 0.25rem;
                    }
                }
                .cinema{
                    width: 100%;
                    margin-left: 0.25rem;
                    border-bottom: 1px solid #ebebeb;
                    .cm_name{
                        display: flex;
                        justify-content: space-between;
                        width: 7rem;
                        p{
                            line-height: 0.6rem;
                        }
                        .nm{
                            font-weight: 600;
                            line-height: 0.7rem;
                            color: black;
                            font-size: 0.28rem;
                        }
                        .sellPrice{
                            color: $font-color;
                            font-size: 0.28rem;
                            font-weight: 500;
                            span{
                                color: #2c3e50;
                                line-height: 0.7rem;
                                font-size: 0.24rem;
                            }
                        }
                    }
                    .addr_container{
                        display: flex;
                        justify-content: space-between;
                        width: 7rem;
                        .addr{
                            color: gray;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            line-height: 0.3rem;
                        }
                        .distance{
                            color: gray;
                            line-height: 0.3rem;
                        }
                    }
                    .vipDesc{
                        margin: 0.1rem 0;
                        margin-left: -0.05rem;
                        span{
                            border-radius: 0.07rem;
                            display: inline-block;
                            padding: 0.11rem;
                            transform: scale(0.8);
                            // margin-left: -0.05rem;
                            line-height: 0.22rem;
                        }
                        .lightBlue{
                            color: #589daf;
                            border: 1px solid #589daf;
                        }
                        .lightOrange{
                            border: 1px solid #f90;
                            color: #f90;
                        }
                        .hallTypeVOList{
                            // margin-left: -0.15rem;
                        }
                    }
                }
                .discount{
                    margin: 0.1rem 0;
                    .favourable{
                        background: #f90;
                        color: #fff;
                        padding: 0.06rem;
                        border: 1px solid #f90;
                        border-radius: 0.1rem;
                        display: inline-block;
                        width: 0.22rem;
                        height: 0.22rem;
                        line-height: 0.24rem;
                    }
                    .discount_desc{
                        color: gray;
                        margin-left: 0.13rem;
                    }
                }
                .seeMore{
                    p{
                        line-height: 0.9rem;
                        color: $font-color;
                        text-align: center;
                        font-size: 0.26rem;
                        .m-arrow-right{
                            position: absolute;
                            font-size: 0.4rem;
                        }
                    }
                }
            }
        }
    }    
}
</style>
