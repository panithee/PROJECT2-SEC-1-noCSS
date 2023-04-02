import {createRouter, createWebHistory} from 'vue-router'
import eveView from "@/views/eveView.vue";
import ntView from "@/views/ntView.vue";
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
            path: '/nt',
            name: 'nt',
            component: ntView
        }
    ]
})

export default router
