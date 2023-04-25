import {createRouter, createWebHistory} from "vue-router"

import MainPage from "@/pages/MainPage.vue"
import AdminPanel from "@/pages/AdminPanel.vue"
import AboutPage from "@/pages/AboutPage.vue"
import NewsPage from "@/pages/NewsPage.vue"
import NewsPageId from "@/pages/NewsPageId.vue"
import OrderClientPage from '@/pages/OrderClientPage';
import OrderManagerPage from '@/pages/OrderManagerPage';
import OrderMasterPage from '@/pages/OrderMasterPage';
import SparePage from '@/pages/SparePage';
import ProfileUserPage from '@/pages/ProfileUserPage';
import ThemesNewsAdmin from '@/pages/ThemesNewsAdmin';


const routes = [
    {
        path: '/',
        component:MainPage
    },
    {
        path: '/admin',
        component:AdminPanel
    },
    {
        path: '/about',
        component: AboutPage
    },
    {
        path: '/news',
        name: 'news',
        component: NewsPage
    },
    {
        path: '/news/:id',
        name: 'newsid',
        component: NewsPageId
    },
    {
        path: '/order/client',
        component: OrderClientPage
    },
    {
        path: '/order/manager/:id',
        component: OrderManagerPage
    },
    {
        path: '/order/master/:id',
        component: OrderMasterPage
    },    
    {
        path: '/spare',
        component: SparePage
    },  
    {
        path: '/profile',
        component: ProfileUserPage
    },
    {
        path: '/themes_news',
        component: ThemesNewsAdmin
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router
