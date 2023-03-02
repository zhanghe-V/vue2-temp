import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = () => import(/* webpackChunkName: "Index" */ '../views')
const Login = () => import(/* webpackChunkName: "Login" */ '../views/login')
const Register = () => import(/* webpackChunkName: "Register" */ '../views/register')
const Home = () => import(/* webpackChunkName: "Home" */ '../views/home')
const User = () => import(/* webpackChunkName: "User" */ '../views/test/User')
const Nav1 = () => import(/* webpackChunkName: "Nav1" */ '../views/nav1')
const Nav11 = () => import(/* webpackChunkName: "Nav1" */ '../views/nav1/nav11')
const Nav12 = () => import(/* webpackChunkName: "Nav1" */ '../views/nav1/nav12')
const Nav13 = () => import(/* webpackChunkName: "Nav1" */ '../views/nav1/nav13')
const Nav2 = () => import(/* webpackChunkName: "Nav2" */ '../views/nav2')
const Nav3 = () => import(/* webpackChunkName: "Nav3" */ '../views/nav3')
const Nav4 = () => import(/* webpackChunkName: "Nav4" */ '../views/nav4')
const Nav5 = () => import(/* webpackChunkName: "Nav5" */ '../views/nav5')
const Nav6 = () => import(/* webpackChunkName: "Nav6" */ '../views/nav6')
const Nav7 = () => import(/* webpackChunkName: "Nav7" */ '../views/nav7')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '根目录',
        component: Index,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: '主页',
                component: Home
            },
            {
                path: '/nav1',
                name: '菜单一',
                component: Nav1,
                children: [
                    {
                        path: 'nav11',
                        name: '子菜单一',
                        component: Nav11
                    },
                    {
                        path: 'nav12',
                        name: '子菜单二',
                        component: Nav12
                    },
                    {
                        path: 'nav13',
                        name: '子菜单三',
                        component: Nav13
                    }
                ]
            },
            {
                path: '/nav2',
                name: '菜单二',
                component: Nav2
            },
            {
                path: '/nav3',
                name: '菜单三',
                component: Nav3
            },
            {
                path: '/nav4',
                name: '菜单四',
                component: Nav4
            },
            {
                path: '/nav5',
                name: '菜单五',
                component: Nav5
            },
            {
                path: '/nav6',
                name: '菜单六',
                component: Nav6
            },
            {
                path: '/nav7',
                name: '菜单七',
                component: Nav7
            }
        ]
    },
    {
        path: '/login',
        name: '登录',
        component: Login
    },
    {
        path: '/register',
        name: '注册',
        component: Register
    },
    {
        path: '/user',
        name: '用户',
        component: User
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
