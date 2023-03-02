<template>
<div class="search-form">
    <el-form ref="searchForm" :inline="true">
        <template v-for="(item, index) in list">
            <template v-if="item.type === 'input'">
                <el-form-item :key="index" :label="item.label">
                    <el-input v-model="value[item.key]" clearable :placeholder="item.placeholder || '请输入'"></el-input>
                </el-form-item>
            </template>
            <template v-if="item.type === 'select'">
                <el-form-item :key="index" :label="item.label">
                    <el-select v-model="value[item.key]" clearable :placeholder="item.placeholder || '请输入'">
                        <el-option v-for="(sub, i) in item.options || []" :key="i" :label="sub.label" :value="sub.value"></el-option>
                    </el-select>
                </el-form-item>
            </template>
            <template v-if="item.type === 'date'">
                <el-form-item :key="index" :label="item.label">
                    <el-date-picker v-model="value[item.key]" type="date" value-format="yyyy-MM-dd" :placeholder="item.placeholder || '请选择日期'"></el-date-picker>
                </el-form-item>
            </template>
            <template v-if="item.type === 'datetime'">
                <el-form-item :key="index" :label="item.label">
                    <el-date-picker v-model="value[item.key]" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :placeholder="item.placeholder || '请选择日期时间'"></el-date-picker>
                </el-form-item>
            </template>
        </template>
        <el-form-item>
            <el-button @click="handleReset">重置</el-button>
            <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    name: 'Search',
    props: {
        list: {
            type: Array,
            default: () => []
        },
        value: {
            type: Object,
            default: () => {}
        }
    },
    mounted () {
        this.getKeys()
    },
    methods: {
        getKeys () {
            const obj = {}
            this.list.forEach(({
                key
            }) => {
                obj[key] = this.value[key] || ''
            })
            this.$emit('input', obj)
        },
        handleReset () {
            for (const key in this.value) {
                this.value[key] = ''
            }
            this.$emit('input', this.value)
            this.handleSearch()
        },
        handleSearch () {
            this.$emit('input', this.value)
            this.$emit('search')
        }
    }
}
</script>
