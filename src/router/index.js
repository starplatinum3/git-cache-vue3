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
        path: '/Issue',
        name: 'Issue',
        component: () => import( '../views/Issue.vue')
    },
    {
        path: '/Welcome',
        name: 'Welcome',
        component: () => import( '../views/weclome/weclome.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
