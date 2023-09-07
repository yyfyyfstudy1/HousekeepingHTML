import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState()], // 持久化插件，存入localstorage
    state: {
        token: null, // 初始时token为空
        isLoggedIn: false, // 是否登录的状态
        Role: [],
        userInfo:{},
        taskData: [], // 存储任务数据的数组
        // 为admin和superAdmin的Aside分别赋值
        adminSidebarLinks: [
            { index: '/Home', icon: 'el-icon-s-home', title: 'Main' },
            { index: '/fun', icon: 'el-icon-alarm-clock', title: 'fun' },
            { index: '/customer', icon: 'el-icon-aim', title: 'customer' }
        ],
        superAdminSidebarLinks: [
            { index: '/Home', icon: 'el-icon-s-home', title: 'Main' },
            { index: '/fun', icon: 'el-icon-alarm-clock', title: 'fun'  },
            { index: '/customer', icon: 'el-icon-aim', title: 'customer' },
            { index: '/superadmin/setting', icon: 'el-icon-s-tools', title: 'Setting' },
            { index: '/adminControl', icon: 'el-icon-s-custom', title: 'Admin Control' }
        ]
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setLoggedIn(state, value) {
            state.isLoggedIn = value;
        },
        setRole(state, value) {
            state.Role = value;
        },
        setUserInfo(state, value) {
            state.userInfo = value;
        },
        setTaskData(state, data) {
            state.taskData = data;
        }
    },
    actions: {
        login({ commit }, { token, role, userInfo}) { // 使用对象参数
            commit('setToken', token);
            commit('setLoggedIn', true);
            commit('setRole', role);
            commit('setUserInfo', userInfo);
        },
        logout({ commit }) {
            commit('setToken', null);
            commit('setRole', null);
            commit('setLoggedIn', false);
            commit('setUserInfo', null);
            commit('setTaskData', null);
        },
        setTaskData({commit}, {taskData}){
            commit('setTaskData', taskData)
        }

    },
    getters: {
        getToken: state => state.token,
        isLoggedIn: state => state.isLoggedIn,
        getRole: state => state.Role,
        getUserInfo: state => state.userInfo,
        sidebarLinks(state) {
            return state.Role.includes('SUPERADMIN') ? state.superAdminSidebarLinks : state.adminSidebarLinks;
        },
        getTaskData: state => state.taskData
    },
});

export default store;
