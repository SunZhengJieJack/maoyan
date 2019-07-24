<template>
  <div id="app">
    <router-view/>
    <Nav/>
  </div>
</template>
<script>
import { Component, Vue, Watch } from 'vue-property-decorator';
import Nav from './views/ui/Nav.vue';

  @Component({
    components: {
      Nav
    },
  })
export default class Index extends Vue {

}
</script>
<style lang="scss">
  .slide-left-enter{
    transform: translateX(100vw);
    z-index: 2;
  }
  .slide-left-enter-to{
    transform: translateX(0);
    z-index: 2;
  }
  .slide-left-leave{
    transform: translateX(0);
    z-index: 1;
    position: absolute !important;
  }
  .slide-left-leave-to{
    transform: translateX(-100vw);
    z-index: 1;
    position: absolute !important;
  }
  /*right*/
  .slide-right-enter{
    transform: translateX(-100vw);
    z-index: 2;
  }
  .slide-right-enter-to{
    transform: translateX(0);
    z-index: 2;
  }
  .slide-right-leave{
    transform: translateX(0);
    z-index: 1;
    position: absolute !important;
  }
  .slide-right-leave-to{
    transform: translateX(100vw);
    z-index: 1;
    position: absolute !important;
  }
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active{
    transition: .3s transform;
  }
  html{
    font-size: 13.333333vw;
  }
  body{
    font-size: 0.24rem;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
