<template>
<div class="breadcrumb">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in list" :key="index" :to="item.path">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
</div>
</template>
<script>
export default {
    name: 'Breadcrumb',
    data () {
        return {
            list: []
        }
    },
    mounted () {
        this.init()
    },
    watch: {
        $route () {
            this.init()
        }
    },
    methods: {
        init () {
            const list = []
            const arr = this.$route.matched
            if (arr.length) {
                arr.forEach(item => {
                    if (item.path && item.path !== '/home') {
                        list.push({
                            name: item.name,
                            path: item.path
                        })
                    }
                })
            }
            this.list = list
        }
    }
}
</script>
