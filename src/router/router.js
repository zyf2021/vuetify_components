import {createRouter, createWebHistory} from "vue-router"

import MainPage from "@/pages/MainPage.vue"
import AdminPanel from "@/pages/AdminPanel.vue"
import AboutPage from "@/pages/AboutPage.vue"
import NewsPage from "@/pages/NewsPage.vue"
import NewsPageId from "@/pages/NewsPageId.vue"

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
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router
