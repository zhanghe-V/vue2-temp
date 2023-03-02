<template>
<div class="index-page">
    <el-container class="box-wrap">
         <nav-side :collapse="collapse" :menuList="menuList"></nav-side>
        <el-container class="is-vertical">
            <nav-header :collapse="collapse" @changeCollapse="changeCollapse"></nav-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <!-- <nav-footer></nav-footer> -->
        </el-container>
    </el-container>
</div>
</template>

<script>
import NavSide from '@/components/navSide'
import NavHeader from '@/components/navHeader'
// import NavFooter from '@/components/navFooter'
import { setWaterMark } from '../assets/js/utils'
export default {
    name: 'Index',
    components: { NavSide, NavHeader },
    data () {
        return {
            collapse: false,
            menuList: [
                {
                    name: '首页',
                    icon: 'el-icon-location',
                    path: '/home'
                },
                {
                    name: '导航一',
                    icon: 'el-icon-location',
                    path: '/nav1',
                    children: [
                        {
                            name: '子导航一',
                            icon: 'el-icon-location',
                            path: '/nav1/nav11'
                        },
                        {
                            name: '子导航二',
                            icon: 'el-icon-location',
                            path: '/nav1/nav12'
                        },
                        {
                            name: '子导航三',
                            icon: 'el-icon-location',
                            path: '/nav1/nav13'
                        }
                    ]
                },
                {
                    name: '导航二',
                    icon: 'el-icon-location',
                    path: '/nav2'
                },
                {
                    name: '导航三',
                    icon: 'el-icon-location',
                    path: '/nav3'
                },
                {
                    name: '导航四',
                    icon: 'el-icon-location',
                    path: '/nav4'
                },
                {
                    name: '导航五',
                    icon: 'el-icon-location',
                    path: '/nav5'
                },
                {
                    name: '导航六',
                    icon: 'el-icon-location',
                    path: '/nav6'
                },
                {
                    name: '导航七',
                    icon: 'el-icon-location',
                    path: '/nav7'
                }
            ]
        }
    },
    mounted () {
        setWaterMark(0.1)
    },
    methods: {
        changeCollapse () {
            this.collapse = !this.collapse
        }
    }
}
</script>

<style lang="less">
.index-page {
    .box-wrap {
        width: 100%;
        height: 100%;
    }
}
</style>
