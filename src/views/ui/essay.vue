<template>
    <div class="being-heat">
      <div class="being-heat_container">
        <div class="heat-title">
          <div class="desc">{{title}}</div>
          <div class="all-works">全部{{total}}部 ></div>
        </div>
        <div class="works-brief">
          <div class="Brief_container">
            <div class="swiper-container" :id="'swiper'+num">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="i in movieList" :key="i.id"  v-show="movieList" ref="swiper-slide">
                  <div class="img_container" @click="goDeatil(i)">
                    <img :src="i.img"/>
                  </div>
                  <div class="desc_container">
                    <div class="severalD">{{i.version.substr(1).toUpperCase()}}</div>
                    <div class="CGS"></div>
                    <div v-if="!showBtn" class="likeMoive">❤</div>
                    <div v-if="i.sc!==0 && i.globalReleased" class="score">猫眼评分 {{i.sc}}</div>
                    <div v-if="i.sc === 0 && !i.globalReleased" class="wish">{{i.wish}}人想看</div>
                  </div>
                  <p class="works-name">{{i.nm}}</p>
                  <p v-if="i.comingTitle" class="comingTime">{{i.comingTitle && i.comingTitle.split(' ')[0]}}</p>
                  <button v-if="showBtn" :class="i.globalReleased?'buyBtn':'perShow'">{{i.globalReleased?'购买':'预售'}}</button>
                </div>
                <div class="swiper-slide" v-if="total>12">
                  <div class="checkAll">
                    <div class="viewAll">查看全部</div>
                    <div class="partAll">{{total}}部</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { State, Mutation} from 'vuex-class';

    @Component({
      components: {
      },
    })
export default class essay extends Vue {
    @Prop({
        default: ''
    }) movieList
    @Prop({
        default: ''
    }) total
    @Prop({
        default: ''
    }) showBtn
    @Prop({
        default: '正在热映'
    }) title
    @Prop({
        default: ''
    }) num
    @State('movieLen') movieLen;
    
    mySwiper = null;
    mounted () {
      this.mySwiper = new Swiper('#swiper'+ this.num, {
        freeMode: true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true, //修改swiper的父元素时，自动初始化swiper
        slidesPerView: "auto", // 控制单屏显示的slider的数量
      });
    }
    goDeatil (data) {
      this.$router.push({
        name: 'DetailMovie',
        params: {
          id: data.id,
        }
      });
    }
}
</script>

<style lang="scss" scoped>
.being-heat{
      width: 100%;
      
      margin-top: 0.2rem;
      .being-heat_container{
        background: #fff;
      }
      .heat-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.28rem;
        .desc{
          font-weight: 600;
          padding: 0.2rem 0.3rem 0.2rem 0.25rem;
        }
        .all-works{
          padding: 0.2rem 0.3rem 0.2rem 0.25rem;
          color: #838383;
        }
      }
      .works-brief{
        padding-bottom: 0.3rem;
        width: 100vw;
        overflow: hidden;
        &::-webkit-scrollbar { width: 0 !important };
        .Brief_container{
          width: 100%;
          display: flex;
          overflow-x:scroll;
          .swiper-container{
            .swiper-wrapper{
              .swiper-slide{
                width: auto !important;
                padding-bottom: 0.1rem;
                margin-right: 0.2rem;
                margin-left: 0.2rem;
                height: auto;
              }
            }
            .img_container{
              width: 1.95rem; 
              height: 2.6rem;
              border-radius: 0.05rem;
              overflow: hidden;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .desc_container{
              .severalD{
                position: absolute;
                top: 0;
                background: rgba(55,60,64,.7);
                color: #fff;
                border-radius: 0.05rem;
                line-height: 0.3rem;
                padding-left: 0.05rem;
                padding-right: 0.05rem;
              }
              .likeMoive{
                position: absolute;
                color: #fff;
                background: rgba(119,118,122,.7);
                font-size: 0.3rem;
                width: 0.6rem;
                height: 0.6rem;
                right: 0;
                top: 0;
                border-bottom-left-radius: 30%;
                text-align: center;
                line-height: 0.6rem;
              }
              .score{
                position: absolute;
                top: 2.2rem;
                width: 1.85rem;
                background: rgba(55,60,64,.6);
                color: #faaf00;
                border-radius: 0.05rem;
                line-height: 0.4rem;
                padding-left: .1rem;
              }
              .wish{
                position: absolute;
                background: rgba(55,60,64,.6);
                color: #faaf00;
                top: 2.2rem;
                width: 1.85rem;
                border-radius: 0.05rem;
                line-height: 0.4rem;
                padding-left: .1rem;
              }
            }
            .works-name{
              line-height: 0.48rem;
              width: 1.95rem;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .comingTime{
              color: rgba(55,60,64,.8);
            }
            .buyBtn{
              width: 1.04rem;
              height: 0.45rem;
              line-height: 0.45rem;
              border: none;
              background: $font-color;
              color: #fff;
              border-radius: 0.4rem;
              font-size: 0.24rem;
              box-shadow: 0.01rem 0.02rem 0.08rem $font-color;
            }
            .perShow{
              width: 1.04rem;
              height: 0.45rem;
              line-height: 0.45rem;
              border: none;
              background: #007fff;
              color: #fff;
              border-radius: 0.4rem;
              font-size: 0.24rem;
              box-shadow: 0.01rem 0.02rem 0.08rem #007fff;
            }
          }
        }
        .checkAll{
          width: 1.95rem;
          height: 2.6rem;
          border: 1px solid black;
          text-align: center;
          .viewAll{
            width: 1rem;
            border-bottom: 1px solid #838383;
            margin: 0 auto;
            margin-top: 0.9rem;
            padding-bottom: 0.2rem;
            line-height: 0.2rem;
          }
          .partAll{
            width: 1.95rem;
            padding-top: 0.2rem;
            line-height: 0.2rem;
          }
        }
      }
    }
</style>

