<!--作者 : lisen
    功能 : 影院
    时间 : 2019-3-15-->
<template>
    <div class="cinema">
        <div class="cinema_head">
            <div class="address_com">
                <span class="AddText" @click="joinCity">{{address}}<span class="iconfont m-arrow-down"></span></span>
            </div>
            <span class="cinema_head_name">影院</span>
            <i class="iconfont m-search"></i>
        </div>
        <div class="nav-wrap">
            <div class="tab mb-line-b">
                <div class="item" v-for="i in tabs" :key="i.id">{{i.label}}
                    <span class="iconfont m-downHead"></span>
                </div>
            </div>
        </div>
        <div ref="bscroll" style="height: 100vh;overflow:hidden">
        <!-- <Scroll ref="Scroll"> -->
            <div class="cinema_box">
                <div class="All-Kinds" v-if="cinemaList">
                    <div class="cinemaList_add" v-for="i in cinemaList" :key="i.id">
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
                            <span class="allowRefund lightBlue" v-if="i.tag.allowRefund === 1">{{i.tag.allowRefund===1?'改签':''}}</span>
                            <span class="disCard lightOrange" v-if="i.tag.vipTag">{{i.tag.vipTag}}</span>
                            <span class="snack lightOrange" v-if="i.tag.snack === 1">{{i.tag.snack===1?'小吃':''}}</span>
                            <!-- <span class="hallTypeVOList lightBlue" v-if="i.tag.hallTypeVOList[0]">{{i.tag.hallTypeVOList[0].name}}</span>
                            <span class="hallTypeVOList lightBlue" v-if="i.tag.hallTypeVOList[1]">{{i.tag.hallTypeVOList[1].name}}</span>
                            <span class="hallTypeVOList lightBlue" v-if="i.tag.hallTypeVOList[2]">{{i.tag.hallTypeVOList[2].name}}</span> -->
                        </p>
                        <p class="discount">
                            <span class="favourable">惠</span>
                            <span class="discount_desc">{{i.promotion.cardPromotionTag}}</span>
                        </p>
                    </div>
                </div>
                <Loading v-else/>
            </div>
        <!-- </Scroll> -->
            
        </div>
        <ChooseCity ref="ChooseCity" @backCity="backCity" @changeCity="changeCity" :addGps="1"/>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import ChooseCity from '../home/ChooseCity.vue';
import Cookies from 'js-cookie';
import Loading from '../../components/Loading.vue';
import BScroll from 'better-scroll';

    @Component({
      components: {
        ChooseCity,
        Loading,
      },
    })

class Cinema extends Vue {

    address = Cookies.get('ci').split(',')[1];

    cinemaList = null;

    tabs = [{
        label: '全球', 
        id: 1,
    }, {
        label: '品牌', 
        id: 2,
    }, {
        label: '距离近', 
        id: 3,
    }, {
        label: '筛选', 
        id: 4,
    }];

    mounted() {
        this.getData();
    }

    getData(id) {
        this.$axios.get('/ajax/cinemaList', {
            params: {
                cityId: id || Cookies.get('ci').split(',')[0],
            },
        }).then((res) => {
            this.cinemaList = res.data.cinemas;
            this.initScroll();
        });
    }

    joinCity() { // 进入city组件
        this.$refs['ChooseCity'].showComponent();
    }

    // 从city组件回退
    backCity() {
        this.$refs['ChooseCity'].showCom = false;
        this.betterScroll.scrollTo(0, 0);
    }

    changeCity(data) { // 从city组件回退
        this.address = data.nm;
        this.getData(data.id);
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
}
export default Cinema;
</script>
<style lang="scss">
.cinema{
    width: 100vw;
    overflow: hidden;
    .cinema_head{
        position: fixed;
        z-index: 3;
        top: 0;
        width: 100vw;
        height: 0.8rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e6e6e6;
        background: #fff;
        .address_com{
            .AddText {
                display: inline-block;
                margin-left:0.3rem;
                font-size:0.24rem;
                color:#777;
                line-height: 0.8rem;
                .m-arrow-down{
                    margin-left:0.05rem;
                    vertical-align: middle;
                }
            }
        }
        .cinema_head_name{
            flex: 1;
            font-size: 0.32rem;
            font-weight: 600;
            text-align: center;
        }
        .m-search{
            display: inline-block;
            font-size:0.44rem;
            vertical-align: middle;
            color:$font-color;
            margin-right: 0.42rem;
        }
    }
    .nav-wrap{
        position: fixed;
        z-index: 2;
        top: 0.8rem;
        width: 100vw;
        background: #fff;
        .mb-line-b{
            display:  flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #e6e6e6;
            height: 0.8rem;
            .item{
                flex: 1;
                text-align: center;
                margin: 0.2rem 0;
                border-right: 1px solid #e6e6e6;
                &:last-child{
                    border: none;
                }
                .m-downHead{
                    display: inline-block;
                    font-size: 0.24rem;
                    color: #777;
                    transform: scale(0.7)
                }
            }
        }
    }
    // .cinema_container{
        // height: 100vh;
        .cinema_box{
            .All-Kinds{
            padding-top: 1.6rem;
            padding-bottom: 0.96rem;
            .cinemaList_add{
                width: 100vw;
                padding-top: 0.1rem;
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
                        font-size: 0.3rem;
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
                        // margin-top: -0.1rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .distance{
                        color: gray;
                        margin-top: -0.1rem;
                        line-height: 0.6rem;
                    }
                }
                .vipDesc{
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
                .discount{
                    margin: 0.2rem 0;
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
            }
        }
        }
    // }
}
</style>
