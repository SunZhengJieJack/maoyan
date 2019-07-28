<!--作者 : lisen
    功能 : 首页
    时间 : 2018-10-->
<template>
    <div class="home">
      <div class="show-nav" ref="show-nav" v-show="status">
        <div class="checkAddress">
          <div class="joinAddress" @click="joinCity" ref="joinAddress">
            <p class="AddText">{{address}}</p>
            <i class="iconfont m-arrow-down"></i>
          </div>
        </div>
        <div class="middle-nav" ref="middle-nav">
          <i class="iconfont m-search" ref="icon"/>
          <input class="searchTitle" ref="searchTitle" placeholder="找影视剧、影院、影人、演出、图书" @click="joinSearch"/>
        </div>
        <i class="iconfont m-movie" ref="m-movie"/>
      </div>
      
      <!-- <Iscroll ref="Iscroll" :probeType="3"> -->
      <div ref="bscroll" style="height: 100vh;overflow:hidden">
        <div class="home_box">
          <div class="swiper-container" id="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <img src="../../assets/image/film1.png"/>
              </div>
              <div class="swiper-slide">
                <img src="../../assets/image/film2.png"/>
              </div>
              <div class="swiper-slide">
                <img src="../../assets/image/film3.png"/>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <div class="header-nav">
            <div v-for="(i, index) in $router.options.routes[1].children.slice(0,4)" :key="i.id" @click="chooseTab(index,i)" :ref="`tab-${index}`">
              <span :class="{'navActive':index===$route.meta.tabIndex}">{{i.meta.zh}}</span>
            </div>
            <div :style="{left: tabSlideLeft + 'px'}" ref="tab-slide" class="border-line"></div>
          </div>
          <transition :name="homeTabsTransition">
            <keep-alive>
              <router-view class="tab-content"/>
            </keep-alive>
          </transition>
        </div>
        
      <!-- </Iscroll> -->
      <ChooseCity ref="ChooseCity" @backCity="backCity" @changeCity="changeCity" :addGps="NowCity"/>
      <div class="dialog" v-if="NowCity && switchCity">
        <div class="mask">
          <div class="dialog_head">
            <p class="prompt">提示</p>
            <p class="warnText">系统检测到您在{{NowCity[0].nm}},需要切换到{{NowCity[0].nm}}吗?</p>
          </div>
          <div class="dialog_foot">
            <div class="cancel" @click="switchCity = false">取消</div>
            <div class="ensure" @click="cutCity">确定</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import { Component, Vue, Watch } from 'vue-property-decorator';
import ChooseCity from './ChooseCity.vue';
import { State, Mutation} from 'vuex-class';
import Cookies from 'js-cookie';
// import Iscroll from '@/components/Scroll.vue'
import { clearTimeout } from 'timers';
import BScroll from 'better-scroll';

    @Component({
      components: {
        ChooseCity,
        // Iscroll,
      },
    })

class Home extends Vue {

      id= 1;

      tabSlideLeft = '0.69rem';

      movieList = null;

      address = null;

      show = false;

      homeTabsTransition = null;

      myScroll = null;

      status = true;

      NowCity = '';

      switchCity = false;

      goDetail = null;

      @State('movieList') movieList;

      @State('comingList') comingList;

      @Mutation('switchData') switchData;

      @Mutation('comingData') comingData;

      @State('movieLen') movieLen;

      @Mutation('obtainLength') obtainLength;

      @Watch('$route')
      watchRoute(to, from) {    // 根据路由,tab的内容滑动
        const toIndex = to.meta.hasOwnProperty('tabIndex');
        const fromIndex = from.meta.hasOwnProperty('tabIndex');
        if (toIndex && fromIndex){
          if (to.meta.tabIndex > from.meta.tabIndex) {
            this.homeTabsTransition = 'slide-left';
          } else {
            this.homeTabsTransition = 'slide-right';
          }
        }
      }

      @Watch('comingList', {deep: true}) // 初始化iscroll
      watchMoive(newValue, oldValue) {
        setTimeout(()=>{
          // this.$refs['Iscroll'].initScroll();
          // this.$refs['Iscroll'].remountSrcoll(this.scrollTop);
        })
      }

      created () {
        if(!Cookies.get('ci')){
          let data = localStorage.getItem('cityList') && JSON.parse(localStorage.getItem('cityList'));
          let arr = [];
          data.map(res=>{
            arr.push(...res.items);
          });
          this.NowCity = arr.filter(res=>{
            return res.nm === '青岛';
          });
          let str = String(this.NowCity[0].id) + ',' + String(this.NowCity[0].nm);
          Cookies.set('ci',str);
          this.upDataMoive(this.NowCity[0].id);
        } else {
          this.upDataMoive(Cookies.get('ci').split(',')[0]);
        }
        this.address = Cookies.get('ci') && Cookies.get('ci').split(',')[1];
      }
      mounted() {
        // 轮播图初始化
        this.mySwiper = new Swiper('#swiper-container', {
          autoplay: true,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
          },
        });

        // better-scroll初始化
        this.$nextTick(() => {
          this.initScroll();
        });
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
        this.betterScroll.on('scroll', (pos) => {
          this.scrollTop(pos.y);
        });
      }

      // 根据滚动距离变更导航栏的背景色。
      scrollTop (top) { 
        if (this.betterScroll.y > 5) {
          this.status = false;
        } else {
          this.status = true;
          this.slideTop = top === 0 ? top : -this.betterScroll.y;
          let opac = this.slideTop / 200;
          this.$refs['show-nav'].style.backgroundColor = `rgba(238,64,57,${opac})`;
          if (opac > 0.365) {
            this.$refs['joinAddress'].style.backgroundColor = `rgba(240,91,91,${opac})`;
            this.$refs['m-movie'].style.backgroundColor = `rgba(240,91,91,${opac})`;
          } else {
            this.$refs['joinAddress'].style.backgroundColor = `rgba(119,118,122,.7)`;
            this.$refs['m-movie'].style.backgroundColor = `rgba(119,118,122,.7)`;
          }
        }
      }

      cutCity () { // 点击更换获取当地城市电影数据
        let str = String(this.NowCity[0].id)+ ',' + String(this.NowCity[0].nm);
        Cookies.set('ci');
        this.upDataMoive(this.NowCity[0].id);
        this.address = Cookies.get('ci').split(',')[1];
        this.switchCity = false;
      }

      chooseTab(index, i) { // boder-bottom切换路由位移。
        this.tabSlideLeft = this.$refs[`tab-${index}`][0].offsetWidth * index + this.$refs[`tab-${index}`][0].offsetWidth / 2 - this.$refs['tab-slide'].offsetWidth / 2; // 导航滑块点击位移
        this.$router.push('/home/' + i.path);
      }

      changeCity (data) {   // 从city组件回退
        this.address = data.nm;
        this.scrollTop(0);
        this.cutDown(data.nm);
        this.upDataMoive(data.id);
      }

      // 进入city组件
      joinCity () {   
        this.$refs['ChooseCity'].showComponent();
        this.$refs['ChooseCity'].showCom = true;
      }
      
      // 从city组件回退
      backCity() {
        this.$refs['ChooseCity'].showCom = false;
        this.betterScroll.scrollTo(0, 0);
      }
      joinSearch () { // 进入search组件
        this.$router.push('/Search');
      }
      cutDown (data) {  // 改变头部导航栏的长度跟left值
        if (data && data.length > 3) { 
          this.$refs['searchTitle'].style.width = '4rem';
          this.$refs['middle-nav'].style.left = '1.8rem';
        } else {
          this.$refs['searchTitle'].style.width = '4.4rem';
          this.$refs['middle-nav'].style.left = '1.56rem';
        }
      }
      upDataMoive (data) {  // 更新tabContent的内容
        let ci = data;
        let obj = [];
        this.$axios.get('/ajax/movieOnInfoList?ci=' + ci).then((res) => { // 正在热映接口
          let data = res.data.movieList;
          data.forEach((item) => {
            item.img = item.img.replace(/w.h/g, '120.180');
          });
          this.total = res.data.total;
          this.switchData(data);

          let params = {
            token: '',
            ci: ci,
          }
          this.$axios.get('/ajax/comingList',{ params }).then(res => { // 即将上映接口
            let comingList = res.data.coming;
            comingList.forEach((item) => {
              item.img = item.img.replace(/w.h/g, '120.180');
            });
            
            this.comingData(comingList);
            obj = {
              total: this.total,
              totalCounts: res.data.coming.length,
            };
            this.obtainLength(obj);
          })
        });
      }
    }
export default Home;
</script>
<style lang="scss">
.goDetail-enter-active, .goDetail-leave-active{
  transition: all .5s;
}
.goDetail-enter, .goDetail-leave-to {
  transform: translate3d(-100%, 0, 0);
}
  .home{
    position: relative;
    background: #f5f5f5;
    width: 100vw;
    top: 0;
    #wrapper{
      height: 100vh;
      overflow: hidden;
    }
    .swiper-container{
      width: 100vw;
      .swiper-wrapper{
        .swiper-slide{
          width: 100vw !important;
          height: 4.4rem;
          img{
            display: block;
            width: 100%;
            height: 100%;
            object-fit:fill;
          }
        }
      }
      .swiper-pagination{
        bottom: 0.2rem;
        .swiper-pagination-bullet{
          background: #fff;
          width: 0.5rem;
          height: 0.1rem;
          border-radius: 0.2rem;
        }
        .swiper-pagination-bullet-active{
          background: #f0f0e7;
        }
      }
    }
    .show-nav{
      position: fixed;
      top: 0;
      width: 100vw;
      height: 0.6rem;
      z-index: 30;
      padding-top: 0.2rem;
      padding-bottom: 0.1rem;
      .checkAddress{
        margin-left: 0.15rem;
        .joinAddress{
          color: #fff;
          width: auto;
          min-width: 1rem;
          max-width: 1.5rem;
          height: 0.6rem;
          background: rgba(119,118,122,.7);
          z-index: 20;
          border-radius: 2rem;
          float: left;
          .AddText{
            height: 0.6rem;
            width: auto;
            max-width: 1rem;
            line-height: 0.6rem;
            float: left;
            margin-left: 0.15rem;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .m-arrow-down{
            line-height: 0.6rem;
            // float: right;
            font-size: 0.32rem;
          }
        }
      }
      .middle-nav{
        position: absolute;
        height: 0.6rem;
        left: 1.55rem;
        width: 5rem;
        line-height: 0.6rem;
        .m-search{
          position: absolute;
          z-index: 21;
          font-size: 0.5rem;
          left: 0.1rem;
        };
        .searchTitle{
          width: 4.4rem;
          position: absolute;
          z-index: 20;
          background: #fff;
          border: none;
          outline: none;
          border-radius: 0.5rem;
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.24rem;
          padding-left: 0.6rem;
        }
      }
      .m-movie{
        width: 0.6rem;
        height: 0.6rem;
        background: rgba(119,118,122,.7);
        position: absolute;
        left:6.75rem;
        z-index: 21;
        border-radius: 50%;
        line-height: 0.6rem;
        font-size: 0.36rem;
        text-align: center;
        color: #fff;
      }
    }
    .dialog{
      position: fixed;
      z-index: 100;
      top: 0;
      background: rgba(119, 115, 115, 0.7);
      width: 100vw;
      height: 100vh;
      .mask{
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 5.9rem;
        height: 3.2rem;
        background: #fff;
        border-radius: 0.2rem;
        .dialog_head{
          height: 2.5rem;
          border-bottom: 1px solid #ebebeb;
          text-align: center;
          .prompt{
            font-weight: 600;
            font-size: 0.28rem;
            line-height: 1.2rem;
          }
          .warnText{
            width: 4.4rem;
            margin: 0 auto;
            line-height: 0.4rem;
          }
        }
        .dialog_foot{
          display: flex;
          line-height: 0.7rem;
          text-align: center;
          .cancel{
            width: 2.95rem;
            border-right: 1px solid #ebebeb;
          }
          .ensure{
            width: 2.95rem;
          }
        }
      }
    }
    .header-nav{
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      font-size: 0.24rem;
      width: 100vw;
      div{
        flex: 1;
        color: #333;
        line-height: 0.8rem;
        text-align: center;
        .navActive{
          color: $font-color;
          display: inline-block;
          line-height: 0.7rem;
        }
      }
      .border-line{
        position: absolute;
        left: 0.68rem;
        top: 5.1rem;
        width: 0.5rem;
        height: 0.08rem;
        background: $font-color;
        border-radius: 0.2rem;
        transition: all 0.3s ease;
      }
    }
  }

</style>
