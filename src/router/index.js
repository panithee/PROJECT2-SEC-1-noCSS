import {createRouter, createWebHistory} from 'vue-router'
import eveView from "@/views/eveView.vue";
import threeView from "@/views/threeView.vue";
import ntView from "@/views/ntView.vue";
import oatView from "@/components/mealDetail.vue";
import mainView from "@/views/mainView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: mainView,
        },
        {
            path: '/eve',
            name: 'eve',
            component: eveView
        },
        {
            path: '/three',
            name: 'three',
            component: threeView
        }
        ,
        {
            path: '/nt',
            name: 'nt',
            component: ntView
        },
        {
            path: '/oat',
            name: 'oat',
            component: oatView
        }
    ]
})

export default router
