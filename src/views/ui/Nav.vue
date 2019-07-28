<template>
  <div class="bottom-nav-bar">
    <div class="wrapper" v-for="(i, index) in menus" :key="i.name" @click=active(i)>
      <span class="nav-icons" id="icon-movie" :class="$route.path.includes(i.path)?'red':''">
        <i class="iconfont" :class="i.meta.icon"></i>
      </span>
      <div class="nav-text" :class="$route.path.includes(i.path)?'red':''">{{i.meta.label}}</div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
  @Component({
    components: {
    },
  })
class navList extends Vue {
    // computed
    get menus() {
      return this.$router.options.routes.slice(1, 5);
    }
    active(data) {
      if (data.path === '/home') {
        this.$router.push('/');
      } else if(data.path === '/film'){
        this.$router.push('/film/hotPlay');
      }else {
        this.$router.push({
          name: data.name,
        });
      }
      
    }
  }
export default navList;
</script>

<style lang="scss">
  .bottom-nav-bar{
    position: fixed;
    bottom: 0;
    width: 100vw;
    background: #fff;
    border-top: .001rem solid #d8d8d8;
    display: flex;
    z-index: 99;
    .wrapper{
      height: .96rem;
      line-height: .72rem;
      box-sizing: border-box;
      position: relative;
      text-align: center;
      flex: 1;
      .nav-icons{
        display: block;
        width: .5rem;
        height: .5rem;
        margin: auto;
        i{
          font-size: 0.5rem;
        }
      }
      .nav-text{
        line-height: .24rem;
        position: absolute;
        top: .66rem;
        left: 0;
        right: 0;
        font-size: .2rem;
      }
      .red{
        color: $font-color;
      }
    }
  }
</style>
