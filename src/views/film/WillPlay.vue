<!--作者 : lisen
    功能 : 即将上映
    时间 : 2019-3-19-->
<template>
    <div class="willCome">
        <div class="willCome_container">
            <Scroll ref="Scroll">
                <ul class="list" v-if="comingList">
                    <li class="list-li" v-for="(x, index) in comingList" :key="index" @click="jumpDetail(x)">
                        <div class="list-img">
                            <img :src="x.img.replace(/w.h/g, '120.180')"/>
                            <span class="list-play"><i class="iconfont m-play"></i></span>
                        </div>
                        <div class="list-content">
                            <div class="list-title">
                                <span class="list-title1">{{x.nm}}</span>
                                <div v-if="x.version" style="transform: scale(0.8)">
                                    <span class="list-title2">{{x.version.split(' ')[0].substring(1,x.version.split(' ')[0].length).toUpperCase()}}</span>
                                    <span class="list-title3" v-if="x.version.split(' ')[1]">{{x.version.split(' ')[1].toUpperCase()}}</span>
                                </div>
                            </div>
                            <div class="list-context">
                                <div class="list-con">
                                    <p class="list-score" v-if="!x.globalReleased && x.sc !== 0">点映评分：<span>{{x.sc}}</span></p>
                                    <p class="list-score" v-if="x.sc === 0"><span>{{x.wish}}</span>人想看</p>
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
            </Scroll>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Cookies from 'js-cookie';
import { State, Mutation} from 'vuex-class';
import Loading from '../../components/Loading.vue'
import Scroll from '../../components/Scroll.vue'
    @Component({
      components: {
        Loading,
        Scroll,
      },
    })
export default class WillPlay extends Vue {

    @State('comingList') comingList;
    @Mutation('comingData') comingData;

    mounted() {
        let params = {
            token: '',
            ci: Cookies.get('ci').split(',')[0],
        }
        this.$axios.get('/ajax/comingList',{params}).then(res => { // 即将上映接口
            let comingList = res.data.coming;
            comingList.forEach((item) => {
              item.img = item.img.replace(/w.h/g, '120.180');
            });
            this.comingData(comingList);
            setTimeout(() => {
                // this.initScroll();
                this.$refs['Scroll'].initScroll()
            })
        })
    }

    jumpDetail(data) {
        this.$router.push({
            name: 'DetailMovie',
            params: {
                id: data.id,
            }
        });
    };
}
</script>

<style lang="scss" scoped>
.willCome{
    width: 100vw;
    background: #fff;
    overflow: hidden;
    .willCome_container{
        height: 100vh;
        overflow: hidden;
    }
    .list {
        padding-bottom: 2.23rem;
        .list-li {
            padding-left: 0.52rem;
            height: 2.23rem;
            display: flex;
            flex-direction: row;
            &:nth-child(1) {
                margin-top: 1.3rem;
            }
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
</style>
