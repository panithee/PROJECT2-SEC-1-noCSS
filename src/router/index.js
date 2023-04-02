import { createRouter, createWebHistory } from 'vue-router'
import groupView from "@/views/groupView.vue";
import billView from "@/views/billView.vue";
import mainView from "@/views/mealView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/meal',
            name: 'meal',
            component: mainView,
        },
        {
            path: '/',
            name: 'group',
            component: groupView
        },
        {
            path: '/billView',
            name: 'billView',
            component: billView
        }
    ]
})

export default router
