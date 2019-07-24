<!--作者 : lisen
    功能 : 我的
    时间 : 2019-3-19-->
<template>
    <div class="my">
        <div class="my_container">
            <header class="setUp">
                <span><i class="iconfont m-setUp"></i><i class="iconfont m-comment"></i></span>
            </header>
            <div id="wrapper">
                <div class="Login_header">
                    <div class="Login_header_container">
                        <p class="aHead">
                            <img src="../../assets/image/maoyan.jpg"/>
                        </p>
                        <span class="LoginRightNow">立即登录</span>
                    </div>
                    <span><i class="iconfont m-arrow-right"></i></span>
                </div>
                <div class="amusement_container">
                    <div class="amusement" v-for="i in amusement" :key="i.id">
                        <span class="amusement-icons">
                            <i class="iconfont" :class="i.icon"></i>
                        </span>
                        <div class="amusement-label">{{i.label}}</div>
                    </div>
                </div>
                <div class="My_order">
                    <div class="My_order_head">
                        <span class="My_order_text">我的订单</span>
                        <span class="ALL">全部<i class="iconfont m-arrow-right"></i></span>
                    </div>
                    <div class="My_order_container">
                        <div class="My_order_content"  v-for="i in order" :key="i.id">
                            <span class="My_order-icons">
                                <i class="iconfont" :class="i.icon"></i>
                            </span>
                            <div class="My_order-label">{{i.label}}</div>
                        </div>
                    </div>
                </div>
                <div class="coupon">
                    <p class="first-coupon">
                        <span>优惠券</span>
                        <i class="iconfont m-arrow-right"></i>
                    </p>
                    <p class="second-coupon">
                        <span>猫享卡</span>
                        <span style="color: gray">去绑卡<i class="iconfont m-arrow-right"></i></span>
                    </p>
                    <p class="third-coupon">
                        <span>银行活动</span>
                        <i class="iconfont m-arrow-right"></i>
                    </p>
                </div>
                <div class="mall">
                    <p class="first-mall">
                        <span>商城</span>
                        <i class="iconfont m-arrow-right"></i>
                    </p>
                    <p class="second-mall">
                        <span>我的收藏</span>
                        <span><i class="iconfont m-arrow-right"></i></span>
                    </p>
                    <p class="third-mall">
                        <span>猜题压电影，福利领不停</span>
                        <i class="iconfont m-arrow-right"></i>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {},
})
export default class My extends Vue {
    amusement = [
        {label: '电影', icon: 'm-movie', id: 1},
        {label: '演出', icon: 'm-perform', id: 2},
        {label: '电视剧', icon: 'm-teleplay', id: 3},
        {label: '综艺', icon: 'm-variety', id: 4},
        {label: '书籍', icon: 'm-book', id: 5},
    ]

    order = [
        {label: '未消费', icon: 'm-obligations', id: 1},
        {label: '待付款', icon: 'm-countdown', id: 2},
        {label: '待评价', icon: 'm-evaluated', id: 3},
        {label: '退款', icon: 'm-drawback', id: 4},
    ]
}
</script>
<style lang="scss">
.my{
    width: 100vw;
    height: 100vh;
    background: #f5f5f5;
    overflow: hidden;
    .my_container{
        .setUp{
            background: $font-color;
            color: #fff;
            line-height: 0.8rem;
            display: flex;
            justify-content: flex-end;
            .m-setUp{}
            .m-comment{
                margin-left: 0.4rem;
                margin-right: 0.4rem;
            }
        }
        #wrapper{
            .Login_header{
                display: flex;
                background: $font-color;
                justify-content: space-between;
                align-items: center;
                .Login_header_container{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .aHead{
                        margin: 0.3rem;
                        width: 1.2rem;
                        height: 1.2rem;
                        border-radius: 50%;
                        overflow: hidden;
                        img{
                            width: 100%;
                        }
                    }
                    .LoginRightNow{
                        color: #fff;
                        font-weight: 600;
                    }
                }
                span{
                    .m-arrow-right{
                        vertical-align: middle;
                        color: #fff;
                        font-size: 0.7rem;
                        margin-right: 0.3rem;
                    }
                }
            }
            .amusement_container{
                width: 100vw;
                display: flex;
                align-items: center;
                height: 1.4rem;
                background: #fff;
                margin-bottom: 0.2rem;
                .amusement{
                    flex: 1;
                    text-align: center;
                    line-height: 0.4rem;
                }
            }
            .My_order{
                background: #fff;
                margin-bottom: 0.2rem;
                .My_order_head{
                    display: flex;
                    justify-content: space-between;
                    .My_order_text{
                        margin: 0.33rem;
                        font-weight: 600;
                    }
                    .ALL{
                        margin-top: 0.3rem;
                        margin-right: 0.3rem;
                        color: gray;
                        .m-arrow-right{
                            vertical-align: middle;
                            color: gray;
                            font-size: 0.4rem;
                        }
                    }
                }
                .My_order_container{
                    display: flex;
                    align-items: center;
                    background: #fff;
                    .My_order_content{
                        flex: 1;
                        text-align: center;
                        line-height: 0.5rem;
                        .My_order-icons{
                            i{
                                font-size: 0.36rem;
                            }
                        }
                    }
                }
            }
            .coupon{
                background: #fff;
                margin-bottom: 0.2rem;
                p{
                    display: flex;
                    justify-content: space-between;
                    line-height: 0.8rem;
                    border-bottom: 1px solid #e6e6e6;
                    margin-left: 0.2rem;
                    padding-right: 0.2rem;
                    .m-arrow-right{
                        vertical-align: middle;
                        color: #2c3e50;
                    }
                }
            }
            .mall{
                background: #fff;
                p{
                    display: flex;
                    justify-content: space-between;
                    line-height: 0.8rem;
                    border-bottom: 1px solid #e6e6e6;
                    margin-left: 0.2rem;
                    padding-right: 0.2rem;
                    .m-arrow-right{
                        vertical-align: middle;
                        color: #2c3e50;
                    }
                }
            }
        }
    }
}
</style>
