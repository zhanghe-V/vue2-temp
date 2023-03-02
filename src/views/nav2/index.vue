<template>
<div class="nav-1">
    <search-form :list="searchList" v-model="form" @search="handleSearch"></search-form>
    <div class="edit-box">
        <span>
            <el-button type="primary" @click="handleAdd">新增</el-button>
            <el-button @click="handleRemove">删除</el-button>
        </span>
    </div>
    <el-table v-loading="loading" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="id" label="用户ID"></el-table-column>
        <el-table-column prop="username" label="用户名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="password" label="登录密码" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建日期">
            <template slot-scope="scope">{{ getTime(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.row)" type="text">删除</el-button>
                <el-button @click.native.prevent="editRow(scope.row)" type="text">编辑</el-button>
                <el-button @click.native.prevent="checkRow(scope.row)" type="text">查看</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 40, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <add-user v-if="addUser.show" :item="addUser" @save="handleSaveAdd" @cancel="addUser.show = false"></add-user>
</div>
</template>

<script>
import AddUser from './Add'
export default {
    name: 'Nav1',
    components: { AddUser },
    data () {
        return {
            addUser: {
                show: false,
                title: '新增用户'
            },
            form: {},
            loading: false,
            total: 100,
            currentPage: 1,
            pageSize: 10,
            searchList: [
                {
                    type: 'input',
                    key: 'id',
                    label: '用户ID',
                    placeholder: '请输入用户ID'
                },
                {
                    type: 'input',
                    key: 'username',
                    label: '用户名',
                    placeholder: '请输入用户名'
                },
                {
                    type: 'input',
                    key: 'phone',
                    label: '手机号',
                    placeholder: '请输入手机号'
                },
                {
                    type: 'date',
                    key: 'startTime',
                    label: '开始日期',
                    placeholder: '请选择开始日期'
                },
                {
                    type: 'date',
                    key: 'endTime',
                    label: '结束日期',
                    placeholder: '请选择结束日期'
                }
            ],
            tableData: [],
            checkedList: []
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init () {
            const params = {
                ...this.form,
                pageSize: this.pageSize,
                currentPage: this.currentPage
            }
            this.$http.post('/user/query', params).then((res) => {
                this.total = res.total
                this.tableData = res.rows
            }).finally(() => {
                this.loading = false
            })
        },
        handleAdd () {
            this.addUser = {
                show: true,
                title: '新增用户'
            }
        },
        handleSaveAdd (val) {
            const url = val.id ? '/user/update' : '/user/add'
            this.$http.post(url, val).then((res) => {
                this.addUser.show = false
                this.$message.success('操作成功')
                this.init()
            })
        },
        editRow (row) {
            this.addUser = {
                show: true,
                title: '编辑用户',
                row
            }
        },
        getTime (str) {
            return str && this.$moment(str).format('YYYY-MM-DD HH:mm:ss')
        },
        handleSearch () {
            this.init()
        },
        handleSizeChange (val) {
            this.pageSize = val
            this.init()
        },
        handleCurrentChange (val) {
            this.currentPage = val
            this.init()
        },
        checkRow (row) {
            this.addUser = {
                show: true,
                title: '查看用户',
                row,
                check: true
            }
        },
        deleteRow (item) {
            this.confirmRemove([item.id])
        },
        confirmRemove (ids) {
            this.$http.post('/user/delete', { ids }).then((res) => {
                this.$message.success('删除成功')
                this.init()
            })
        },
        handleRemove () {
            if (this.checkedList.length) {
                this.confirmRemove(this.checkedList.map(item => item.id))
            } else {
                this.$message.error('请选择操作对象')
            }
        },
        handleSelectionChange (val) {
            this.checkedList = val
        }
    }
}
</script>

<style lang="less">
.nav-1 {
    color: #999;
}
</style>
