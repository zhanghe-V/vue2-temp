<template>
<el-aside class="nav-side" :width="collapse ? '64px' : '200px'">
    <el-menu :default-active="$route.path" :router="true" class="side-menu" :collapse-transition="false" :collapse="collapse" background-color="#545c64" text-color="#fff" active-text-color="#409eff">
        <div class="logo-box">
            <img class="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="">
            <span v-show="!collapse" class="logo-title">大箴科技</span>
        </div>
        <template v-for="(item, index) in menuList">
            <el-submenu v-if="item.children" :key="index" :index="item.path">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.name}}</span>
                </template>
                <el-menu-item v-for="(sub, i) in item.children" :key="i" :index="sub.path">
                    <i :class="sub.icon"></i>
                    <span slot="title">{{sub.name}}</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="index" :index="item.path">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
        </template>
    </el-menu>
</el-aside>
</template>

<script>
export default {
    name: 'NavSide',
    props: {
        collapse: {
            type: Boolean,
            default: () => true
        },
        menuList: {
            type: Array,
            default: () => [
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
    }
}
</script>

<style lang="less">
.nav-side {
    height: 100%;

    .el-menu {
        border-right: 0;
    }

    .logo-box {
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        padding: 10px 0;
        .logo {
            width: 40px;
            height: 40px;
        }
        .logo-title {
            color: #fff;
            font-size: 20px;
            margin-left: 5px;
        }
    }

    .side-menu {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
}
</style>
