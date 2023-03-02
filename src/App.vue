<template>
<div id="app">
    <fullscreen ref="fullscreen" background="#fff" @change="fullscreenChange">
        <router-view></router-view>
    </fullscreen>
</div>
</template>
<script>
export default {
    name: 'App',
    data () {
        return {
            fullscreen: false
        }
    },
    methods: {
        fullscreenChange (val) {
             this.fullscreen = val
        }
    }
}
</script>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 14px;
    height: 100%;
    width: 100%;

    >div {
        height: 100%;
        width: 100%;
        overflow: hidden;
        >div {
            height: 100%;
            width: 100%;
            overflow: hidden;
        }
    }
}
</style>
