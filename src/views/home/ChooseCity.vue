<template>
    <transition name="slide">
        <div class="Current-city" v-if="showCom">
            <div class="Current_box" ref="Current-city">
                <div class="city_box">
                    <div class="currentCity_container">
                        <div style="height: 0.8rem;"></div>
                        <div class="cityAddress">
                            <p class="focus-city">当前城市：<span class="focus-address">{{address()}}</span></p>
                        </div>
                        <div class="GPS">
                            <div class="GPS-head" v-if="addGps">
                                <i class="iconfont m-gps"></i>
                                <!-- <p class="current-address">{{addGps[0].nm}}<span class="current-GPS">GPS定位</span></p> -->
                            </div>
                            <div class="Recently_container">
                                <p class="Recently-visited">最近访问城市</p>
                                <div class="Recently-address">
                                    <div class="Recently-check" v-for="item in currentCity" :key="item.id" @click="addItem(item)">{{item.nm}}</div>
                                </div>
                            </div>
                            <div class="hotCity_container">
                                <p class="hotCity">热门城市</p>
                                <div class="Btn_container">
                                    <div class="hotCity-Btn" v-for="item in hotCity" :key="item.id" @click="addItem(item)">{{item.nm}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="cityList" v-for="item in format" :key="item.name">
                            <div class="assortment" :ref="item.name">
                                <p class="first-spell" ref="first-spell">{{item.name}}</p>  
                                <div class="detailed-address" v-for="i in item.items" :key="i.id" @click="addItem(i)">
                                    <p>{{i.nm}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cityHead">
                <i class="iconfont m-x" @click="back"></i>
                <div class="search_container">
                    <i class="iconfont m-search"/>
                    <input class="searchTitle" placeholder="输入城市名或拼音"/>
                </div>
            </div>
            <div class="navList">
                <p class="navSide">当前定位最近热门</p>
                <div class="navChild" v-for="item in navList" :key="item">
                    <span @click='prev($event)'>{{item}}</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { Component, Vue, Watch, Prop} from 'vue-property-decorator';
// import MiniScroll from 'iscroll/build/iscroll';
import Cookies from 'js-cookie';
import BScroll from "better-scroll";
    @Component({})
export default class ChooseCity extends Vue {
    
    @Prop({
        default: ''
    }) addGps

    show = false;

    showCom = false;

    hotCity = null;

    format = null;

    navList = [];

    currentCity = [];

    myScroll = '';
    mounted () {
        // 获取对应的城市列表
        if (!localStorage.getItem('currentCity')) {
            let data = JSON.stringify([{id: 60,nm: "青岛",py: "qingdao"}]);
            localStorage.setItem('currentCity',data);
            this.currentCity = [{id: 60,nm: "青岛",py: "qingdao"}];
        } else {
            this.currentCity = JSON.parse(localStorage.getItem('currentCity'));
        }
        if (!localStorage.getItem('cityList')) {
            this.getData();
        } else {
            this.format = JSON.parse(localStorage.getItem('cityList'));
            this.hotCity = JSON.parse(localStorage.getItem('hotCity'));
            this.format.map(item => {
                this.navList.push(item.name);
            })
        }
    }

    address() {
        return Cookies.get('ci') && Cookies.get('ci').split(',')[1];
    }
    showComponent () {
        this.showCom = !this.showCom;
        this.$nextTick(() => {
            this.initScroll();
        });
    }
    initScroll () {
        // let IScroll = MiniScroll;
        const scrollDom = this.$refs['Current-city'];
        this.betterScroll = new BScroll(scrollDom, {
          probeType: 3,
          scrollY: true,
          useTransition:false,  // 防止iphone微信滑动卡顿
          bounce:true,
          momentumLimitDistance: 5
        });
        // document.querySelector(`#Current-city`).addEventListener('touchmove', e=>{
        //     e.preventDefault();
        // });
    }

    prev (obj) {
        // const goal = obj.target.innerHTML;
        // const element = this.$refs[goal][0];
        // this.betterScroll.scrollToElement(element);
        const goal = obj.target.innerHTML;
        const top = this.$refs[goal][0].offsetTop;
        this.betterScroll.scrollTo(0,-(top - 35));
    }

    addItem (data) {    // 点击更换城市
        this.currentCity.unshift(data);
        let obj = {};
        this.currentCity = this.currentCity.reduce((cur,next) => { // 数组的对象去重。
            obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
            return cur;
        },[]);
        if (this.currentCity.length>2){
            this.currentCity.splice(2,this.currentCity.length);
        }
        localStorage.getItem('currentCity',JSON.stringify(this.currentCity));
        let str = String(data.id)+ ',' + String(data.nm);
        Cookies.set('ci',str);    // 正在热映接口的cookie
        

        this.$emit('changeCity', data);
        this.back();
    }
    back () {   // 回到home主页
        this.$emit('backCity');
    }

    getData () {     // 请求到的接口数据分类
        this.$axios.get('/dianying/cities.json').then( res => {
            this.hotCity = res.data.cts.slice(0,11);
            localStorage.setItem('hotCity',JSON.stringify(this.hotCity));
            let format = [];
            let hashArray = [];
            let docs = res.data.cts;
            for (let doc of docs) { // 数据分类
                if (hashArray.includes(doc.py[0])) {
                    for (let group of format) {
                        if (group.name === doc.py[0].toUpperCase()) {
                            group.items.push(doc);
                            group.items.sort((a,b) => {
                                return a.py > b.py? 1 : -1;
                            });
                        }
                    }
                } else {
                    hashArray.push(doc.py[0]);
                    let group = {
                        name: doc.py[0].toUpperCase(),
                        items: [doc],
                    };
                    format.push(group);
                }
            }
            this.format = format.sort((a,b) => { 
                return a.name > b.name? 1 : -1;
            })
            this.format.map(item => {
                this.navList.push(item.name);
            })
            localStorage.setItem('cityList',JSON.stringify(this.format));
        });
    }
}
</script>

<style lang='scss' scoped>
.slide-enter-active, .slide-leave-active{
    transition: all 0.5s
}
.slide-enter, .slide-leave-to {
    transform: translate3d(0, 100%, 0)
}
* { touch-action: pan-y; } 
.Current-city{
    height: 100vh;
    position: absolute;
    width: 100vw;
    background: #f5f5f5;
    z-index: 100;
    top: 0;
    .Current_box{
        height:100vh;
        overflow:hidden;
    }
    .currentCity_container{
        .cityAddress{
            background: #fff;
            line-height: 0.7rem;
            // margin-top: 1rem;
            .focus-city{
                margin-left: 0.2rem;
            }
            .focus-address{
                color: black;
                font-weight: 600;
            }
        }
        .GPS{
            margin-top: 0.2rem;
            background: #fff;
            padding-bottom: 0.2rem;
            .GPS-head{
                padding-top: 0.25rem;
                .m-gps{
                    color: $font-color;
                    font-size: 0.32rem;
                    margin-left: 0.16rem;
                }
                .current-address{
                    color: black;
                    font-weight: 600;
                    display: inline;
                    margin-left: 0.16rem;
                    .current-GPS{
                        color: gray;
                        font-weight: 500;
                        margin-left: 0.16rem;
                    }
                }
            }
            .Recently_container{
                margin-top: 0.25rem;
                .Recently-visited{
                    margin-left: 0.16rem;
                }
                .Recently-address{
                    display: flex;
                    flex-wrap: wrap;
                    .Recently-check{
                        text-align: center;
                        width: 2rem;
                        line-height: 0.7rem;
                        border: 1px solid #f5f5f5;
                        margin-top: 0.25rem;
                        border-radius: 0.1rem;
                        margin-left: 0.16rem;
                    }
                }
            }
            .hotCity_container{
                .hotCity{
                    margin-left: 0.16rem;
                    line-height: 0.7rem;
                    margin-bottom: -0.25rem;
                    position: sticky;
                    top: 0.8rem;
                    background: #fff;
                }
                .Btn_container{
                    display: flex;
                    flex-wrap: wrap;
                    .hotCity-Btn{
                        margin-left: 0.16rem;
                        text-align: center;
                        width: 2rem;
                        line-height: 0.7rem;
                        border: 1px solid #f5f5f5;
                        margin-top: 0.25rem;
                        border-radius: 0.1rem;
                    }
                }
            }
        }
        .cityList{
            margin-top: 0.2rem;
            background: #fff;
            .assortment{
                padding-left: 0.2rem;
                padding-right: 0.2rem;
                .first-spell{
                    line-height: 0.7rem;
                    // position: sticky;
                    top: 0.8rem;
                    background: #fff;
                    z-index: 20;
                }
                .detailed-address{
                    line-height: 0.7rem;
                    border-bottom: 1px solid #f5f5f5;
                }
            }
        }
    }
    .cityHead{
        width: 100vw;
        height: 0.8rem;
        background: $font-color;
        position: fixed;
        z-index: 21;
        top: 0;
        .m-x{
            width: 0.4rem;
            text-align: center;
            line-height: 0.4rem;
            position: absolute;
            left: 0.2rem;
            bottom: 0.2rem;
            color: #fff;
            font-size: 0.32rem;
        }
        .search_container{
            position: relative;
            left: 0.55rem;
            width: 6rem;
            height: 0.8rem;
            line-height: 0.8rem;
            .m-search{
                position: absolute;
                font-size: 0.5rem;
                left: 0.6rem;
                z-index: 22;
            };
            .searchTitle{
                position: absolute;
                background: #fff;
                border: none;
                border-radius: 0.5rem;
                font-size: 0.24rem;
                padding-left: 0.6rem;
                line-height: 0.6rem;
                width: 5rem;
                left: 0.5rem;
                top: 0.1rem;
                outline:none;
                z-index: 21;
            }
        }
    }
    .navList{
        position: fixed;
        right: 0;
        top: 3.2rem;
        z-index:22;
        .navSide{
            width: 0.5rem;
        }
        .navChild{
            text-align: center;
            margin-top: 0.05rem;
            a{
                text-decoration: none;
                color: #2c3e50;
            }
        }
    }
}

</style>
