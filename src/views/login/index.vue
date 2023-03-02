<template>
<div class="login">
    <img class="bg" src="../../assets/images/bg.png" alt="">
    <div class="login-icon">
        <img class="login-icon-r1" src="../../assets/images/sign_icon_Q2.png" />
        <img class="login-icon-r2" src="../../assets/images/sign_icon_Q1.png" />
        <img class="login-icon-bigIcon" src="../../assets/images/1-4.svg" />
        <img class="login-icon-bigIcon2" src="../../assets/images/1-7.svg" />
        <img class="login-icon-icon1" src="../../assets/images/1-2.svg" />
        <img class="login-icon-icon2" src="../../assets/images/1-1.svg" />
        <img class="login-icon-icon3" src="../../assets/images/1-3.svg" />
        <img class="login-icon-icon4" src="../../assets/images/1-5.svg" />
        <img class="login-icon-icon5" src="../../assets/images/1-6.svg" />
    </div>
    <div class="login-form" @keyup.enter.stop.prevent="handleSubmit('loginForm')">
        <div class="big-title">数据标准平台</div>
        <el-form class="login-main" ref="loginForm" :model="loginForm" :rules="ruleInline">
            <el-form-item>
                <span class="login-title">欢迎登录</span>
            </el-form-item>
            <el-form-item prop="user">
                <el-input prefix="ios-person-outline" v-model="loginForm.user" type="text" placeholder="请输入用户名" size="large" />
            </el-form-item>
            <el-form-item prop="password">
                <el-input prefix="ios-lock-outline" v-model="loginForm.password" type="password" placeholder="请输入密码" size="large" />
            </el-form-item>
            <el-form-item v-if="showCode" prop="code">
                <el-button :disabled="disabled" class="code-box" @click="getCode">{{disabled ? `${time}s后重新获取` : '获取验证码'}}</el-button>
                <el-input prefix="ios-key-outline" v-model="loginForm.code" type="text" placeholder="请输入验证码" size="large" />
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="remember" class="remember-user-name">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button class="login-btn" :loading="loading" type="primary" @click="handleSubmit('loginForm')">登 录</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
import { setWaterMark } from '../../assets/js/utils'
export default {
    name: 'Login',
    data () {
        return {
            showCode: false,
            time: 60,
            timer: null,
            disabled: false,
            loading: false,
            loginForm: {
                user: '',
                password: '',
                code: ''
            },
            ruleInline: {
                user: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                code: [{
                        required: true,
                        message: '请输入验证码',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        pattern: /^\d{4,6}$/,
                        message: '请输入有效验证码',
                        trigger: 'blur'
                    }
                ],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }]
            },
            remember: false
        }
    },
    mounted () {
        setWaterMark(0)
        const remember = localStorage.getItem('remember')
        if (remember) {
            const [user, password] = remember.split('&')
            this.loginForm = {
                user,
                password,
                code: ''
            }
        }
    },
    methods: {
        handleSendCode () {
            this.disabled = true
            this.timer = setInterval(() => {
                this.time--
                if (this.time === 0) {
                    this.disabled = false
                    clearInterval(this.timer)
                    this.timer = null
                    this.time = 60
                }
            }, 1000)
        },
        getCode () {
            const params = {
                username: this.loginForm.user
            }
            this.$http.post('/user/getCode', params).then(res => {
                if (res.success) {
                    this.$message.success('发送成功')
                    this.handleSendCode()
                }
            })
        },
        handleSubmit (name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.loading = true
                    const {
                        user,
                        password,
                        code
                    } = this.loginForm
                    const params = {
                        username: user,
                        password: password
                    }
                    if (this.showCode) {
                        params.code = code
                    }
                    this.$http.post('/user/login', params)
                        .then(res => {
                            this.loading = false
                            // if (res.isFirstLogin) {
                            //     this.$message.warning('首次登录需要验证码')
                            //     this.showCode = true
                            //     return
                            // }
                            if (this.remember) {
                                localStorage.setItem('remember', `${user}&${password}`)
                            }
                            if (res) {
                                this.$message.success('登录成功')
                                localStorage.setItem('userInfo', JSON.stringify(res))
                                localStorage.setItem('token', res.token || '')
                                this.$router.push('/home')
                            }
                        })
                        .finally(() => {
                            this.loading = false
                        })
                } else {
                    this.$message.error('登录校验失败')
                }
            })
        }
    }
}
</script>

<style lang="less">
.login {
    position: relative;
    background: linear-gradient(to right, #3E9DBD 0% , #204F94 100%);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-btn {
        width: 100%;
    }

    .logo {
        position: absolute;
        left: 20px;
        top: 10px;
        width: 117px;
        z-index: 1;
    }

    .bg {
        position: absolute;
        width: 90%;
        height: 90%;
    }

    /* 左边 */
    .login-icon {
        position: relative;
        width: 700px;
        height: 700px;
    }

    /* 大圆 */
    .login-icon-r1 {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        right: 0;
        -webkit-transition-property: -webkit-transform;
        -webkit-transition-duration: 1s;
        -moz-transition-property: -moz-transform;
        -moz-transition-duration: 1s;
        -webkit-animation: rotate 40s linear infinite;
        -moz-animation: rotate 40s linear infinite;
        -o-animation: rotate 40s linear infinite;
        animation: rotate 40s linear infinite;
    }

    /* 大圆旋转360度 动画 */
    @-webkit-keyframes rotate {
        from {
            -webkit-transform: rotate(0deg)
        }

        to {
            -webkit-transform: rotate(360deg)
        }
    }

    @-moz-keyframes rotate {
        from {
            -moz-transform: rotate(0deg)
        }

        to {
            -moz-transform: rotate(359deg)
        }
    }

    @-o-keyframes rotate {
        from {
            -o-transform: rotate(0deg)
        }

        to {
            -o-transform: rotate(359deg)
        }
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg)
        }

        to {
            transform: rotate(359deg)
        }
    }

    /* 小圆 */
    .login-icon-r2 {
        display: block;
        width: 80%;
        height: 80%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        -webkit-transition-property: -webkit-transform;
        -webkit-transition-duration: 1s;
        -moz-transition-property: -moz-transform;
        -moz-transition-duration: 1s;
        -webkit-animation: rotate2 15s linear infinite;
        -moz-animation: rotate2 15s linear infinite;
        -o-animation: rotate2 15s linear infinite;
        animation: rotate2 15s linear infinite;
    }

    /* 小圆反向旋转360度 动画 */
    @-webkit-keyframes rotate2 {
        from {
            -webkit-transform: rotate(0deg)
        }

        to {
            -webkit-transform: rotate(-360deg)
        }
    }

    @-moz-keyframes rotate2 {
        from {
            -moz-transform: rotate(0deg)
        }

        to {
            -moz-transform: rotate(-359deg)
        }
    }

    @-o-keyframes rotate2 {
        from {
            -o-transform: rotate(0deg)
        }

        to {
            -o-transform: rotate(359deg)
        }
    }

    @keyframes rotate2 {
        from {
            transform: rotate(0deg)
        }

        to {
            transform: rotate(-359deg)
        }
    }

    /*中心box*/
    .login-icon-bigIcon {
        width: 40%;
        position: absolute;
        left: 32%;
        top: 21%;
    }

    .login-icon-bigIcon2 {
        width: 14%;
        position: absolute;
        animation: translate 3s linear infinite;
        top: 18%;
        left: 43%;
    }

    .login-icon-icon1 {
        width: 12%;
        position: absolute;
        animation: translate2 2.5s linear infinite;
        left: 22%;
        bottom: 27%;
    }

    .login-icon-icon2 {
        width: 12%;
        position: absolute;
        animation: translate 3s linear infinite;
        top: 36%;
        left: 18%;
    }

    .login-icon-icon3 {
        width: 7%;
        position: absolute;
        animation: translate2 2.5s linear infinite;
        top: 31%;
        right: 32%;
    }

    .login-icon-icon4 {
        width: 12%;
        position: absolute;
        animation: translate 3s linear infinite;
        top: 44%;
        right: 15%;
    }

    .login-icon-icon5 {
        width: 12%;
        position: absolute;
        animation: translate2 3.4s linear infinite;
        right: 19%;
        bottom: 25%;

    }

    /* 上下浮动动画 */
    @-webkit-keyframes translate {
        0% {
            -webkit-transform: translateY(0px)
        }

        25% {
            -webkit-transform: translateY(-6px)
        }

        50% {
            -webkit-transform: translateY(0px)
        }

        75% {
            -webkit-transform: translateY(6px)
        }

        100% {
            -webkit-transform: translateY(0px)
        }
    }

    @-moz-keyframes translate {
        0% {
            -moz-transform: translateY(0px)
        }

        25% {
            -moz-transform: translateY(-6px)
        }

        50% {
            -moz-transform: translateY(0px)
        }

        75% {
            -moz-transform: translateY(6px)
        }

        100% {
            -moz-transform: translateY(0px)
        }
    }

    @-o-keyframes translate {
        0% {
            -o-transform: translateY(0px)
        }

        25% {
            -o-transform: translateY(-6px)
        }

        50% {
            -o-transform: translateY(0px)
        }

        75% {
            -o-transform: translateY(6px)
        }

        100% {
            -o-transform: translateY(0px)
        }
    }

    @keyframes translate {
        0% {
            transform: translateY(0px)
        }

        25% {
            transform: translateY(-6px)
        }

        50% {
            transform: translateY(0px)
        }

        75% {
            transform: translateY(6px)
        }

        100% {
            transform: translateY(0px)
        }
    }

    /* 上下浮动动画 */
    @-webkit-keyframes translate2 {
        0% {
            -webkit-transform: translateY(0px)
        }

        25% {
            -webkit-transform: translateY(3px)
        }

        50% {
            -webkit-transform: translateY(0px)
        }

        75% {
            -webkit-transform: translateY(-3px)
        }

        100% {
            -webkit-transform: translateY(0px)
        }
    }

    @-moz-keyframes translate2 {
        0% {
            -moz-transform: translateY(0px)
        }

        25% {
            -moz-transform: translateY(3px)
        }

        50% {
            -moz-transform: translateY(0px)
        }

        75% {
            -moz-transform: translateY(-3px)
        }

        100% {
            -moz-transform: translateY(0px)
        }
    }

    @-o-keyframes translate2 {
        0% {
            -o-transform: translateY(0px)
        }

        25% {
            -o-transform: translateY(3px)
        }

        50% {
            -o-transform: translateY(0px)
        }

        75% {
            -o-transform: translateY(-3px)
        }

        100% {
            -o-transform: translateY(0px)
        }
    }

    @keyframes translate2 {
        0% {
            transform: translateY(0px)
        }

        25% {
            transform: translateY(3px)
        }

        50% {
            transform: translateY(0px)
        }

        75% {
            transform: translateY(-3px)
        }

        100% {
            transform: translateY(0px)
        }
    }

    .login-form {
        position: relative;
        margin-left: 100px;
        margin-right: 100px;
        width: 480px;
        background: #fff;
        padding: 32px 40px;
        border-radius: 4px;
        box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);

        .big-title {
            position: absolute;
            top: -113px;
            color: #fff;
            left: 85px;
            font-size: 48px;
            white-space: nowrap;
        }

        .login-title {
            font-size: 18px;
            text-align: center;
        }

        .code-box {
            position: absolute;
            right: 0;
            height: 100%;
            top: 0;
            z-index: 1;
            width: 112px;
            box-shadow: none;
            background: none;
            border: none;
        }
    }
}
</style>
