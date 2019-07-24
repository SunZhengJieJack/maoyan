<!--作者 : lisen
    功能 : 即将上映
    时间 : 2019-3-17-->
<template>
  <transition name="DetailMovie">
    <div class="DetailMovie">
      <header class="Movie-header" v-if="detailMovie" ref="Movie-header">
        <i class="iconfont m-arrow-left" @click="back"></i>
        <span class="tag">电影</span>
        <i class="iconfont m-enjony"></i>
      </header>
      <!-- <div class="DetailMovie_container">
        <div id="wrapper"> -->
      <div ref="bscroll" style="height: 100vh;overflow:hidden">
      <!-- <Scroll ref="Scroll" :probeType="3"> -->
        <div class="DetailMovie_container">
          <div class="Movie_desc" v-if="detailMovie" :style="{height: decideWidth?'4.8rem':'5.9rem'}">
            <div class="Movie_bg" :style="{height: decideWidth?'4.8rem':'5.9rem'}">
              <img :src="detailMovie.img"/>
            </div>
            <div class="Movie_datum">
              <div class="MovieImg_box">
                <img :src="detailMovie.img"/>
              </div>
              <div class="Movie_introduction">
                <h1 class="nm">{{detailMovie.nm}}</h1>
                <p class="enm">{{detailMovie.enm}}</p>
                <p class="cat">{{detailMovie.cat}}</p>
                <p class="dur">{{detailMovie.src}}/{{detailMovie.dur}}分钟</p>
                <p class="pubDesc">{{detailMovie.pubDesc}}</p>
                <p class="wish"><span class="wishPart">{{detailMovie.wish}}</span>人想要看</p>
              </div>
            </div>
            <div class="Movie_evaluate" v-if="detailMovie.distributions[0].proportion!=='--'">
              <div class="Movie_score">
                <div class="praise">
                  <i class="iconfont m-maoyan"></i>
                  <span class="public_praise">口碑</span>
                </div>
                <div class="judge">
                  <div class="part" v-for="i in detailMovie.distributions" :key="i.proportion">
                    <p class="fraction">
                      <span>{{i.movieScoreLevel}}</span>
                    </p>
                    <div class="processBar">
                      <p class="processBar_Bg" :style="{width: i.proportion/100*110/50+'rem'}"></p>
                    </div>
                    <p class="percent">
                      <span>{{i.proportion}}%</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="star_box">
                <p class="maoyan_score">猫眼评分</p>
                <div class="star">
                  <span>{{detailMovie.sc}}</span>
                  <div class="starType" v-for="item in itemClasses" :key="item">
                    <i class="iconfont" :class="item?'m-star-'+item:''"></i>
                  </div>
                </div>
                <p class="snum">
                  <span>{{detailMovie.snum}}人</span>
                  <i class="iconfont m-arrow-right"></i>
                </p>
              </div>
            </div>
            <div class="Movie_Feel">
              <div class="wishSee">
                <i class="iconfont m-heart"></i>
                <span>想看</span>
              </div>
              <div class="seen">
                <i class="iconfont m-star-on"></i>
                <span>看过</span>
              </div>
            </div>
          </div>
          <div class="words_desc" v-if="detailMovie">
            <div class="words_box">
              <div class="words_translate">
                <div class="words" ref="words">{{detailMovie.dra}}</div>
                <p @click="expend"><i class="iconfont" :class="show?'m-arrow-up':'m-arrow-down'"></i></p>
              </div>
            </div>
            <div class="billing">
              <div class="heat-title">
                <div class="desc">视频剧照</div>
                <div class="all-works">全部剧照 ></div>
              </div>
              <div class="billing_brief">
                <div class="billing_container">
                  <div class="swiper-container" id="slide">
                    <div class="swiper-wrapper" v-if="detailMovie.photos">
                      <div class="swiper-slide" v-for="i in detailMovie.photos" :key="i">
                        <div class="img_container">
                          <img :src="i"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          <div class="Movie_comments" v-if="detailMovie && comments">
            <div class="Movie_comments_head">
              <p class="Movie_comments_btn">
                <span class="talk">讨论</span>
                <span class="joinTalk">参与讨论</span>
              </p>
              <div class="Btn_container">
                <span class="Btn_item" v-for="item in comments" :key="item.id">{{item.label}}{{item.num}}</span>
              </div>
            </div>
            <div class="Movie_comments_content">
              <header class="comments-header">精选</header>
              <div class="comments_information_container">
                <article class="comments_information" v-for="i in Movie_comments" :key="i.userId">
                  <div class="img_container">
                    <img :src="i.avatarurl">
                  </div>
                  <div class="All_person">
                    <header class="person_config">
                      <div class="person_config_continaer">
                        <span class="nick">{{i.nick}}</span>
                        <!-- <span class="nickName">{{i.nickName}}</span> -->
                        <span class="userLevel">LV{{i.userLevel}}</span>
                      </div>
                      <p class="grade">给这部作品打了10分</p>
                    </header>
                    <div class="content">{{i.content}}</div>
                    <div class="approve">
                      <span class="overtime">{{i.startTime.split(' ')[0].substr(i.startTime.split(' ')[0].indexOf('-')+1)}}</span>
                      <div class="approve_right">
                        <span class="good"><i class="iconfont m-good"></i>{{i.approve}}</span>
                        <span class="reply"><i class="iconfont m-comment"></i>{{i.reply}}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <Loading v-else/>
        </div>
      <!-- </Scroll> -->
      </div>
        <!-- </div>
      </div> -->
      <div class="buyTicket"><span>特惠购票</span></div>
    </div> 
  </transition>
</template>

<script>
import Swiper from 'swiper';
import { Component, Vue, Watch } from 'vue-property-decorator';
// import MoreScroll from 'iscroll/build/iscroll-probe';
import Loading from '../../components/Loading.vue'
// import Scroll from '../../components/Scroll.vue'
import BScroll from 'better-scroll';

    @Component({
      components: {
        Loading
      },
    })
    
class detailMovie extends Vue {

  detailMovie = null;

  decideWidth = null;

  show = false;

  autoHeight = null;

  Movie_comments = null;

  approve = null;

  comments = [
    {label: '全部', num: '', id: 1},
    {label: '好评', num: 16010, id: 2},
    {label: '差评', num: 645, id: 3},
    {label: '购票', num: 19321, id: 4},
    {label: '认证作者', num: 19, id: 5},
    {label: '同城', num: 803, id: 6},
  ]

  mounted () {
    this.$axios.get('/ajax/detailmovie?movieId='+ this.$route.params.id).then((res)=>{
      this.detailMovie = res.data.detailMovie;
      this.detailMovie.img = res.data.detailMovie.img.replace(/w.h/g, '120.180');
      this.detailMovie.photos = this.detailMovie.photos.map(item=>{
        return item.replace(/w.h/g, '120.180');
      });
      this.decideWidth = this.detailMovie.distributions.some(item=>{
        return item.proportion === '--';
      });
    });
    let query = {
      _v_: 'yes',
      offset: 1,     //获取评论的索引，例：从第15个开始获取  数量固定15个
      startTime: '2018-09-29 13:35:42',
    };
    this.$axios.get('/mmdb/comments/movie/'+ this.$route.params.id +'.json',{query}).then(res=>{
      this.Movie_comments = res.data.hcmts;
      setTimeout(() => {
        this.initScroll();
      });
    })
  }

  @Watch('detailMovie')
  watchList (newValue, oldValue) {
    setTimeout(()=>{
      this.initSwiper();
      this.initScroll();
      this.$refs.words.style.height = 'auto'; // 用来获取高度
      this.autoHeight = this.$refs.words.offsetHeight/50+'rem';
      this.$refs.words.style.height = '1.2rem';
    })
  }

  get itemClasses () {
    // 评分有几个等级
    let LENGTH = 5;
    // 全星有几个
    let CLS_ON = 'on';
    // 半星有几个
    let CLS_HALF = 'half';
    // 不亮的星星有几个
    let CLS_OFF = 'off';

    let result = [];
    // 分数取整
    const score = Math.floor(this.detailMovie.sc) / 2;
    // 判断是否有半星
    const hasDecimal = score % 1 !== 0;
    // 计算有几个全星
    let integer = Math.floor(score);
    for (let i = 0; i < integer; i++) {
      result.push(CLS_ON);
    }
    if (hasDecimal) {
      result.push(CLS_HALF);
    }
    while (result.length < LENGTH) {
      result.push(CLS_OFF);
    }
    return result;
  }

  expend () {
    this.show = !this.show;
    this.$refs.words.style.height = this.show?this.autoHeight:'1.2rem';
  }

  initSwiper () {
    this.mySwiper = new Swiper('#slide', {
      freeMode: true,
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      slidesPerView: "auto", // 控制单屏显示的slider的数量
    });
  }

  initScroll() {
    const scrollDom = this.$refs.bscroll;
    this.betterScroll = new BScroll(scrollDom, {
        probeType: 3,
        scrollY: true,
        click: true,
        useTransition: false, // 防止iphone微信滑动卡顿
        bounce: true,
        momentumLimitDistance: 5,
    });
    this.betterScroll.on('scroll', (pos) => {
      this.scrollTop();
    });
  }

  scrollTop() {
    if (this.betterScroll.y < 0) {
      this.$refs['Movie-header'].style.backgroundColor= '#ee4039';
    } else {
      this.$refs['Movie-header'].style.backgroundColor= '';
    }
  }

  back() {
    this.$router.go(-1);
  }
}
export default detailMovie;
</script>

<style lang="scss" scoped>

* { touch-action: pan-y; } 

@import '../../assets/scss/DetailMovie.scss'

</style>