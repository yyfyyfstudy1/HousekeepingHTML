import VueRouter from 'vue-router'
import admin from '../components/AdminDashboard/Admin.vue'
import fun from '../components/Fun'
import customer from "@/components/Customer";
import chatRoom from "../components/ChatRoom/ChatRoom.vue"
import login from "../components/Login/login.vue"
import register from "../components/Register/Register.vue";
import store from '../store'; // 导入Vuex store

const router = new VueRouter({
    mode: 'history',    // Routing mode, this mode will not display the pound sign # in the address
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/admin',
            name: 'admin',
            component: admin,
            meta: { requiresAuth: true, allowedRoles: ['ROLE_ADMIN', 'ROLE_SUPERADMIN'] }
        },
        {
            path: '/fun',
            name: 'fun',
            component: fun,
            meta: { requiresAuth: true, allowedRoles: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'] }
        },
        {
            path: '/customer',
            name: 'customer',
            component: customer,
            meta: { requiresAuth: true, allowedRoles: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'] }
        },
        {
            path: '/chatRoom',
            name: 'chatRoom',
            component: chatRoom,
            meta: { requiresAuth: true, allowedRoles: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'] }
        }
    ]
})


router.beforeEach((to, from, next) => {


    const isLoggedIn = store.getters.isLoggedIn;
    const role = store.getters.getRole;

    // 检查是否需要验证权限
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLoggedIn) {
            next('/'); // 未登录则跳转到登录页
        } else if ( to.meta.allowedRoles.some(item => role.includes(item))) {
            next(); // 放行角色和登录角色交叉就放行
        }else {
            next({path:"/404"})	//跳到404页面
        }
    } else {
        next()
    }

    console.log('Logged In:', isLoggedIn);
    console.log('Role:', role);
    console.log('Allowed Roles:', to.meta.allowedRoles);
    // console.log('Target Path:', to.path);


});

export default router