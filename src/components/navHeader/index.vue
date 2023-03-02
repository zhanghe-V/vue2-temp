<template>
<el-header class="nav-header">
    <span class="header-left">
        <i class="toggle-icon" :class="`el-icon-s-${collapse ? 'unfold' : 'fold'}`" @click="$emit('changeCollapse')"></i>
        <bread-crumb></bread-crumb>
    </span>
    <span class="header-right">
        <i title="全屏" class="el-icon-full-screen toggle-icon" @click="handleFullScreen"></i>
        <el-badge class="toggle-icon" :value="3">
            <i class="el-icon-bell"></i>
        </el-badge>
        <el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <el-dropdown @command="handleClickDropdown">
            <span class="el-dropdown-link">
                {{username || 'admin'}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="handleSet">
                    <i class="el-icon-setting"></i>
                    设置
                </el-dropdown-item>
                <el-dropdown-item command="handleUserInfo">
                    <i class="el-icon-user"></i>
                    个人中心
                </el-dropdown-item>
                <el-dropdown-item command="handleSignOut" divided>
                    <i class="el-icon-switch-button"></i>
                    退出登录
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </span>
</el-header>
</template>

<script>
import BreadCrumb from '../breadcrumb'
export default {
    name: 'NavHeader',
    props: {
        collapse: {
            type: Boolean,
            default: () => true
        }
    },
    components: { BreadCrumb },
    data () {
        return {
            username: null
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init () {
            const userInfo = localStorage.getItem('userInfo')
            if (userInfo) {
                const { username } = JSON.parse(userInfo)
                this.username = username
            }
        },
        handleFullScreen () {
            this.$root.$children[0].$refs.fullscreen.toggle()
        },
        handleUserInfo () {},
        handleSet () {},
        handleSignOut () {
            localStorage.clear()
            this.$router.push('/login')
        },
        handleClickDropdown (val) {
            this[val]()
        }
    }
}
</script>

<style lang="less">
.nav-header {
    height: 48px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    .header-right, .header-left {
        display: flex;
        align-items: center;
    }
    .toggle-icon {
        font-size: 20px;
        cursor: pointer;
        margin-right: 16px;
    }
}
</style>
