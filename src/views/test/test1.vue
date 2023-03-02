<template>
<div class="home">
    <div class="home-head">
        <img src="../../assets/images/logo.png" alt="">
        <span>文本分析测试页面</span>
    </div>
    <p class="home-top">
        <span class="home-label">请输入一段想分析的文本：</span>
        <span class="random-example" @click="handleGetExample">随机样本测试</span>
    </p>
    <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="exampleValue" maxlength="200" show-word-limit></el-input>
    <div class="home-mid">
        <el-button size="small" type="primary" plain @click="handleGetInfo(exampleValue)">开始分析</el-button>
    </div>
    <span class="home-label">分析结果：</span>
    <div class="home-foot" v-loading="loading">
        <div class="left-box">
            <p class="title-bar">
                <i class="icon el-icon-location-outline"></i>
                <span class="home-label">地址</span>
            </p>
            <p class="info-box">
                <span class="my-label">省</span>
                <span class="my-value">{{getVal(form.province)}}</span>
            </p>
            <p class="info-box">
                <span class="my-label">市</span>
                <span class="my-value">{{getVal(form.city)}}</span>
            </p>
            <p class="info-box">
                <span class="my-label">区</span>
                <span class="my-value">{{getVal(form.county)}}</span>
            </p>
            <p class="info-box">
                <span class="my-label">街道</span>
                <span class="my-value">{{getVal(form.town)}}</span>
            </p>
            <p class="info-box">
                <span class="my-label">详细地址</span>
                <span class="my-value">{{getVal(form.detail)}}</span>
            </p>
        </div>
        <div class="right-box">
            <p class="title-bar">
                <i class="icon el-icon-user"></i>
                <span class="home-label">联系人</span>
            </p>
            <p class="info-box">
                <span class="my-label">姓名</span>
                <span class="my-value">{{getVal(form.person)}}</span>
            </p>
            <p class="info-box">
                <span class="my-label">联系方式</span>
                <span class="my-value">{{getVal(form.phonenum)}}</span>
            </p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Home',
    data () {
        return {
            loading: false,
            exampleValue: '',
            form: {
                city: '',
                city_code: '',
                county: '',
                county_code: '',
                detail: '',
                log_id: '',
                person: '',
                phonenum: '',
                province: '',
                province_code: '',
                text: '',
                town: '',
                town_code: ''
            }
        }
    },
    mounted () {
        const params = {
            username: ''
        }
        this.$http.get('/user', params).then(res => {
            console.warn('res', res)
        })
    },
    methods: {
        getVal (str) {
            return str || '暂无数据'
        },
        handleGetInfo (val) {
            if (!val) {
                this.$message.error('请输入一段想分析的文本')
                return
            }
            this.loading = true
            this.$http.get(`/nlp/address?text=${val}`)
                .then(({
                    data
                }) => {
                    if (data && data.code === 200) {
                        this.form = data.data
                    } else {
                        this.$message.error(data.message)
                    }
                })
                .catch(error => {
                    this.$message.error(error)
                })
                .finally(() => {
                    this.loading = false
                })
        },
        handleGetExample () {
            this.$http.get('/nlp/addressDemo')
                .then(({
                    data
                }) => {
                    if (data && data.code === 200) {
                        this.exampleValue = data.data
                        this.handleGetInfo(data.data)
                    } else {
                        this.$message.error(data.message)
                    }
                })
                .catch(error => {
                    this.$message.error(error)
                })
        }
    }
}
</script>

<style lang="less">
.home {
    padding: 40px 100px;
    .home-head {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        img {
            height: 40px;
        }
        span {
            font-weight: 700;
            font-size: 16px;
            padding-top: 10px;
            padding-bottom: 40px;
            font-size: 20px;
            letter-spacing: 4px;
        }
    }
    .home-foot {
        border-radius: 4px;
        margin-top: 10px;
        padding: 20px;
        border: 1px solid #DCDFE6;
        display: flex;

        .info-box {
            padding-top: 16px;
            display: flex;
            align-items: center;

            .my-label {
                color: #606266;
                width: 80px;
            }

            .my-value {
                color: #333;
            }
        }

        .icon {
            font-size: 20px;
            margin-right: 3px;
        }

        .title-bar {
            display: flex;
            align-items: center;
        }

        .left-box {
            width: 50%;
            border-right: 1px solid #DCDFE6;
        }

        .right-box {
            width: 50%;
            padding-left: 20px;
        }
    }

    .home-label {
        font-weight: 700;
    }

    .home-top {
        padding-bottom: 10px;

        .random-example {
            color: #409eff;
            opacity: 0.9;
            cursor: pointer;
            padding-bottom: 2px;
            border-bottom: 1px solid #409eff;

            &:hover {
                opacity: 1;
            }
        }
    }

    .home-mid {
        text-align: center;
        padding: 20px 0;
    }
}
</style>
