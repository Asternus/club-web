import {createRouter, createWebHistory} from 'vue-router';
import MessageList from '../components/MessageList.vue';
import HelloWorld from '../components/HelloWorld.vue';
import UnauthorizedAccess from '@/components/UnauthorizedAccess.vue';
import UserLogin from '@/components/UserLogin.vue';
/*import api from '@/services/api';
import cookie from 'cookie';*/

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
    },
    {
        path: '/unauthorized',
        name: 'UnauthorizedAccess',
        component: UnauthorizedAccess,
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
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;