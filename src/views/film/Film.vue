<!--作者 :
    功能 : 电影
    时间 : 2018-->
<template>
    <div class="film">
        <div class="film-head">
            <span class="head-local">北京<span class="iconfont m-arrow-down"></span></span>
            <div class="head-nav">
                <router-link :to="{ path: '/film/hotPlay' }" :class="this.$route.path.includes('hotPlay')?'router-link-exact-active':''">正在热映<span class="line"></span></router-link>
                <router-link :to="{ path: '/film/willPlay' }" :class="this.$route.path.includes('willPlay')?'router-link-exact-active':''">即将上映<span class="line"></span></router-link>
            </div>
            <span class="iconfont m-search"></span>
        </div>
        <transition :name="playAnimation">
            <keep-alive>
                <router-view class="tab-content"/>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator';

    @Component({
      components: {

      },
    })
export default class Film extends Vue {
    playAnimation = '';
    @Watch('$route', {deep: true})
    watchRoute(to, from) {    // 根据路由,tab的内容滑动
        const toIndex = to.meta.hasOwnProperty('Index');
        const fromIndex = from.meta.hasOwnProperty('Index');
        if (toIndex && fromIndex){
            if (to.meta.Index > from.meta.Index) {
                this.playAnimation = 'play-left';
            } else {
                this.playAnimation = 'play-right';
            }
        } else {
            this.playAnimation = '';
        }
    }
}
</script>
<style lang="scss" scoped>
    .play-left-enter{
        transform: translateX(100vw);
        z-index: 2;
    }
    .play-left-enter-to{
        transform: translateX(0);
        z-index: 2;
    }
    .play-left-leave{
        transform: translateX(0);
        z-index: 1;
        position: absolute !important;
    }
    .play-left-leave-to{
        transform: translateX(-100vw);
        z-index: 1;
        position: absolute !important;
    }
    /*right*/
    .play-right-enter{
        transform: translateX(-100vw);
        z-index: 2;
    }
    .play-right-enter-to{
        transform: translateX(0);
        z-index: 2;
    }
    .play-right-leave{
        transform: translateX(0);
        z-index: 1;
        position: absolute !important;
    }
    .play-right-leave-to{
        transform: translateX(100vw);
        z-index: 1;
        position: absolute !important;
    }
    .play-left-enter-active,
    .play-left-leave-active,
    .play-right-enter-active,
    .play-right-leave-active{
        transition: .3s transform;
    }
    .film{
        width:100vw;
        height: 100vh;
        .film-head{
            position: fixed;
            top:0;
            width:100%;
            height: 0.72rem;
            background: #fff;
            padding-top:0.44rem;
            border-bottom:1px solid $border-bottom;
            z-index: 99;
            .head-local{
                display: inline-block;
                line-height: 0.72rem;
                margin-left:0.62rem;
                font-size:0.24rem;
                color:#404040;
                .m-arrow-down{
                    margin-left:0.08rem;
                    vertical-align: middle;
                }
            }
            .head-nav{
                display: inline-block;
                width:5.4rem;
                height: 0.72rem;
                text-align: center;
                font-size:0.26rem;
                a {
                    display: inline-block;
                    height: 0.66rem;
                    line-height: 0.66rem;
                    margin:0 0.14rem;
                    color:#5c5c5c;
                    font-weight: bold;
                }
                .router-link-exact-active {
                    color:$font-color;
                    .line {
                        display: block;
                        width: 0.46rem;
                        height:0.06rem;
                        background-color: $font-color;
                        margin:0 auto;
                        border-radius: 0.03rem;
                    }
                }
            }
            .m-search{
                display: inline-block;
                font-size:0.44rem;
                vertical-align: middle;
                color:$font-color;
            }
        }
    }
</style>
