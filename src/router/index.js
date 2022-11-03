// import { createRouter } from 'vue-router'
//
// const routes=[
//     {
//         path:'/',
//         name:'Home',
//         component:Home
//     },
//     {
//
//     }
// ]

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        // name: 'Home',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        // name: 'About',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/news',
        // name: 'About',
        name: 'news',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/news.vue')
    },
    {
        path: '/institutions',
        // name: 'About',
        name: 'institutions',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/institutions.vue')
    },
    {
        path: '/Github',
        // name: 'About',
        name: 'Github',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Github.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "about" */ '../views/search.vue')
  },

    
    {
        path: '/Issue',
        name: 'Issue',
        component: () => import( '../views/Issue.vue')
    },
    {
        path: '/Welcome',
        name: 'Welcome',
        component: () => import( '../views/weclome/weclome.vue')
    },
    {
        path: '/paperType',
        name: 'paperType',
        component: () => import( '../views/paperType/paperType.vue')
    },
    {
        name: 'result',
        path: '/result',
        component: () => import( '../views/GameOver.vue')
      },
      {
        name: 'home',
        path: '/home',
        component: () => import( '../views/MainMenu.vue')
        // component: MainMenu
      }, {
        name: 'quiz',
        path: '/quiz',
        // component: GameController,
        component: () => import( '../views/GameController.vue'),
        // props: (route) => ({ 
        //   number: route.query.number, 
        //   difficulty: route.query.difficulty, 
        //   category: route.query.category,
        //   type: route.query.type
        // })
        // 有这个就进不去。。
      },
      {
        name: 'Login',
        path: '/Login',
        component: () => import( '../views/Login.vue'),
     
      },
      {
        name: 'Comic',
        path: '/Comic',
        component: () => import( '../views/Commic.vue'),
    
      },
      {
        name: 'NoteBook',
        path: '/NoteBook',
        component: () => import( '../views/NoteBook/NoteBook.vue'),
    
      },
      {
        name: 'data',
        path: '/data',
        component: () => import( '../views/data/index.vue'),
    
      },
      {
        name: 'issues',
        path: '/issues',
        component: () => import( '../views/issues/index.vue'),
      },
      {
        name: 'zhihu',
        path: '/zhihu',
        component: () => import( '../views/zhihu/index.vue'),
      },
      {
        name: 'Imgs',
        path: '/Imgs',
        component: () => import( '../views/Imgs.vue'),
      },
      
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    if (isChunkLoadFailed) {
      console.log("失败 Loading chunk ");
      console.log(error);
      window.location.reload();
      // router.replace(router.history.pending.fullPath);
    }else{
      console.log(error)
    }
  });
  

export default router
