import {createRouter, createWebHistory} from 'vue-router'
import eveView from "@/views/eveView.vue";
import threeView from "@/views/threeView.vue";
import ntView from "@/views/ntView.vue";
import oatView from "@/views/oatView.vue";
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
            component: eveView,
            props: true
        },
        {
            path: '/three',
            name: 'three',
            component: threeView,
            props: true
        }
        ,
        {
            path: '/nt',
            name: 'nt',
            component: ntView,
            props: true
        },
        {
            path: '/oat',
            name: 'oat',
            component: oatView,
            props: true
        }
    ]
})

export default router
