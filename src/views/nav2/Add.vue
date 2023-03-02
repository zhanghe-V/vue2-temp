<template>
<el-dialog :title="item.title" :visible.sync="show" width="400px" @close="handleCancel">
    <el-form class="my-form" :model="form" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
            <el-input :disabled="item.check" v-model="form.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
            <el-input :disabled="item.check" v-model="form.phone" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input :disabled="item.check" v-model="form.password" type="password" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button :disabled="item.check" type="primary" @click="handleSave">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
export default {
    props: {
        item: {
            type: Object
        }
    },
    data () {
        return {
            form: {},
            show: true,
            rules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                phone: [{
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }]
            }
        }
    },
    mounted () {
        if (this.item.row) {
            const { username, phone, password } = this.item.row
            this.form = { username, phone, password }
        }
    },
    methods: {
        handleSave () {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    const params = {
                        ...this.form,
                        createTime: this.$moment().format('YYYY-MM-DD HH:mm:ss')
                    }
                    if (this.item.row) {
                        params.id = this.item.row.id
                    }
                    this.$emit('save', params)
                }
            })
        },
        handleCancel () {
            this.$emit('cancel')
        }
    }
}
</script>
