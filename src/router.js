import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 路由延迟加载
const home = () => import('./views/home/Home.vue');
const film = () => import('./views/film/Film.vue');
const cinema = () => import('./views/cinema/Cinema.vue');
const my = () => import('./views/my/My.vue');
const hotPlay = () => import('./views/film/HotPlay.vue');
const willPlay = () => import('./views/film/WillPlay.vue');


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home/beingHotPlay',
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        label: '首页',
        icon: 'm-maoyan',
      },
      children: [
        {
          path: 'beingHotPlay',
          name: 'BeingHotPlay',
          component: () => import('./views/home/BeingHotPlay.vue'),
          meta: {
            zh: '电影',
            tabIndex: 0,
          },
        },
        {
          path: 'drama',
          name: 'Drama',
          component: () => import('./views/home/Drama.vue'),
          meta: {
            zh: '电视剧',
            tabIndex: 1,
          },
        },
        {
          path: 'variety',
          name: 'Variety',
          component: () => import('./views/home/Variety.vue'),
          meta: {
            zh: '综艺',
            tabIndex: 2,
          },
        },
        {
          path: 'book',
          name: 'Book',
          component: () => import('./views/home/Book.vue'),
          meta: {
            zh: '书籍',
            tabIndex: 3,
          },
        },
      ],
    },
    {
      path: '/film',
      name: 'film',
      component: film,
      meta: {
        label: '电影',
        icon: 'm-movie',
      },
      children: [ // 这里就是二级路由的配置
        {
          path: 'hotPlay',
          name: 'hotPlay',
          component: hotPlay,
          meta: {
            Index: 1,
          },
        },
        {
          path: 'willPlay',
          name: 'willPlay',
          component: willPlay,
          meta: {
            Index: 2,
          },
        },
      ],
      // redirect: '/hotPlay',
    },
    {
      path: '/cinema',
      name: 'cinema',
      component: cinema,
      meta: {
        label: '影院',
        icon: 'm-cinema',
      },
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      meta: {
        label: '我的',
        icon: 'm-my',
      },
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/home/Search.vue'),
      meta: {
        keepAnimate: true,
      },
    },
    {
      path: '/DetailMovie/:id',
      name: 'DetailMovie',
      component: () => import('./views/home/DetailMovie.vue'),
      meta: {
        tabIndex: 4,
      },
    },
  ],
});
export default router;
