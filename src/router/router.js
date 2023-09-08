import {createRouter, createWebHistory} from 'vue-router';
import MessageList from '../components/MessageList.vue';
import HelloWorld from '../components/HelloWorld.vue';
import RegistrationUser from '@/components/RegistrationUser.vue';
import UserLogin from '@/components/UserLogin.vue';
import LogOut from '@/components/LogOut.vue';
import AdminPanel from '@/components/AdminPanel.vue';
import UserProfile from '@/components/UserProfile.vue';
import DoWork from '@/components/DoWork.vue';
import VacancyPanel from '@/components/VacancyPanel.vue';

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
    },
    {
        path: '/registration',
        name: 'UnauthorizedAccess',
        component: RegistrationUser,
    },
    {
        path: '/messages',
        name: 'MessageList',
        component: MessageList,
    },
    {
        path: '/login',
        name: 'UserLogin',
        component: UserLogin,
    },
    {
        path: '/logout',
        name: 'LogOut',
        component: LogOut,
    },
    {
        path: '/admin-panel',
        name: 'adminPanel',
        component: AdminPanel,
    },
    {
        path: '/profile',
        name: 'profile',
        component: UserProfile,
    },
    {
        path: '/do-work',
        name: 'do-work',
        component: DoWork,
    },
    {
        path: '/get-vacancy',
        name: 'do-vacancy',
        component: VacancyPanel,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;