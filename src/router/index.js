import {createRouter, createWebHistory} from 'vue-router';
import MessageList from '../components/MessageList.vue';
import HelloWorld from '../components/HelloWorld.vue';
import UnauthorizedAccess from '@/components/UnauthorizedAccess.vue';
import UserLogin from '@/components/UserLogin.vue';
import axios from 'axios';

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

router.beforeEach(async (to, from, next) => {
    if (to.path === '/unauthorized') {
        next();
        return;
    }

    try {
        const response = await axios.get('http://localhost:5000/auth/status');
        const authenticated = response.data.authenticated;

        if (!authenticated && to.path === '/login') {
            next();
        }

        if (authenticated || to.path === '/unauthorized') {
            // Если авторизован или на странице UnauthorizedAccess, переходим к следующему маршруту
            next();
        } else {
            // Если не авторизован, перенаправляем на страницу UnauthorizedAccess
            next('/unauthorized');
        }
    } catch (error) {
        console.error('Ошибка при проверке статуса аутентификации:', error);
        // Обработка ошибки при проверке авторизации
        next();
    }
});

export default router;