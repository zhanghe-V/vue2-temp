<template>
<div class="hello">
    <form action="">
        姓名：<input type="text" name="username" v-model="form.username" /><br />
        邮箱：<input type="text" name="phone" v-model="form.phone" /><br />
        密码：<input type="password" name="password" v-model="form.password" /><br />
        <button type="button" @click="addUser">提交信息</button>
        <button type="button" @click="updateUser">更新信息</button>
        <button type="button" @click="deleteUser">删除信息</button>
    </form>
    <form action="">
        <input type="text" v-model="keywords" placeholder="输入姓名查询" />
        <button type="button" @click="queryUser">查询</button>
    </form>
</div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data () {
        return {
            form: {
                username: '',
                phone: '',
                password: ''
            },
            keywords: ''
        }
    },
    methods: {
        addUser () {
            this.form.createTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
            this.$http.post('/user/add', this.form).then((res) => {
                console.warn('信息添加成功', res)
            })
        },
        queryUser () {
            const params = {
                username: this.keywords
            }
            this.$http.post('/user/query', params).then((res) => {
                console.warn('信息查询成功', res)
            })
        },
        updateUser () {
            this.form.id = 1
            this.form.createTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
            this.$http.post('/user/update', this.form).then((res) => {
                console.warn('信息更新成功', res)
            })
        },
        deleteUser () {
            const params = {
                ids: [1]
            }
            this.$http.post('/user/delete', params).then((res) => {
                console.warn('信息删除成功', res)
            })
        }
    }
}
</script>
