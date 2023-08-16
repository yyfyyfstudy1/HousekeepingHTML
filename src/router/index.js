import VueRouter from 'vue-router'
import index from '../components/index.vue'
import fun from '../components/fun'
import customer from "@/components/customer";


const router = new VueRouter({
    mode: 'history',    // Routing mode, this mode will not display the pound sign # in the address
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/fun',
            component: fun
        },
        {
            path: '/customer',
            component: customer
        }
    ]
})

export default router