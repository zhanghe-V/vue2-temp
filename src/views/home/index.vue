<template>
<div class="home" v-loading="loading">
    <div class="chart" id="container1"></div>
    <div class="chart" id="container2"></div>
    <div class="chart" id="container3"></div>
    <div class="chart" id="container4"></div>
    <div class="chart" id="container5"></div>
    <div class="chart" id="container6"></div>
</div>
</template>

<script>
import {
    Area,
    Column,
    Pie,
    WordCloud,
    Box,
    Gauge
} from '@antv/g2plot'
export default {
    name: 'Home',
    data () {
        return {
            loading: false
        }
    },
    mounted () {
        this.load()
        this.initArea()
        this.initColumnPlot()
        this.initPie()
        this.initWordCloud()
        this.initBox()
        this.initGauge()
    },
    methods: {
        load () {
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 1500)
        },
        initGauge () {
            const gauge = new Gauge('container6', {
                percent: 0.75,
                startAngle: Math.PI,
                endAngle: 2 * Math.PI,
                range: {
                    color: ['l(0) 0:#bde8ff 1:#7eabff']
                },
                indicator: {
                    pin: false,
                    pointer: false
                },
                statistic: {
                    content: {
                        style: {
                            fontSize: 48,
                            textBaseline: 'bottom'
                        },
                        offsetY: -60
                    }
                }
            })

            gauge.render()
        },
        initBox () {
            const data = [{
                    x: '职业 A',
                    low: 20000,
                    q1: 26000,
                    median: 27000,
                    q3: 32000,
                    high: 38000,
                    outliers: [50000, 52000]
                },
                {
                    x: '职业 B',
                    low: 40000,
                    q1: 49000,
                    median: 62000,
                    q3: 73000,
                    high: 88000,
                    outliers: [32000, 29000, 106000]
                },
                {
                    x: '职业 C',
                    low: 52000,
                    q1: 59000,
                    median: 65000,
                    q3: 74000,
                    high: 83000,
                    outliers: [91000]
                },
                {
                    x: '职业 D',
                    low: 58000,
                    q1: 96000,
                    median: 130000,
                    q3: 170000,
                    high: 200000,
                    outliers: [42000, 210000, 215000]
                },
                {
                    x: '职业 E',
                    low: 24000,
                    q1: 28000,
                    median: 32000,
                    q3: 38000,
                    high: 42000,
                    outliers: [48000]
                },
                {
                    x: '职业 F',
                    low: 47000,
                    q1: 56000,
                    median: 69000,
                    q3: 85000,
                    high: 100000,
                    outliers: [110000, 115000, 32000]
                },
                {
                    x: '职业 G',
                    low: 64000,
                    q1: 74000,
                    median: 83000,
                    q3: 93000,
                    high: 100000,
                    outliers: [110000]
                },
                {
                    x: '职业 H',
                    low: 67000,
                    q1: 72000,
                    median: 84000,
                    q3: 95000,
                    high: 110000,
                    outliers: [57000, 54000]
                }
            ]

            const outliersBoxPlot = new Box('container5', {
                data,
                xField: 'x',
                yField: ['low', 'q1', 'median', 'q3', 'high'],
                outliersField: 'outliers',
                outliersStyle: {
                    fill: '#f6f'
                }
            })

            outliersBoxPlot.render()
        },
        initWordCloud () {
            fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json')
                .then((res) => res.json())
                .then((data) => {
                    const wordCloud = new WordCloud('container4', {
                        data,
                        wordField: 'name',
                        weightField: 'value',
                        colorField: 'name',
                        wordStyle: {
                            fontFamily: 'Verdana',
                            fontSize: [8, 32],
                            rotation: 0
                        },
                        // 返回值设置成一个 [0, 1) 区间内的值，
                        // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
                        random: () => 0.5
                    })

                    wordCloud.render()
                })
        },
        initPie () {
            const data = [{
                    type: '分类一',
                    value: 27
                },
                {
                    type: '分类二',
                    value: 25
                },
                {
                    type: '分类三',
                    value: 18
                },
                {
                    type: '分类四',
                    value: 15
                },
                {
                    type: '分类五',
                    value: 10
                },
                {
                    type: '其他',
                    value: 5
                }
            ]

            const piePlot = new Pie('container3', {
                appendPadding: 10,
                data,
                angleField: 'value',
                colorField: 'type',
                radius: 0.8,
                label: {
                    type: 'spider',
                    content: '{name}\n{percentage}'
                },
                interactions: [{
                    type: 'element-selected'
                }, {
                    type: 'element-active'
                }]
            })

            piePlot.render()
        },
        initColumnPlot () {
            const data = [{
                    type: '家具家电',
                    sales: 38
                },
                {
                    type: '粮油副食',
                    sales: 52
                },
                {
                    type: '生鲜水果',
                    sales: 61
                },
                {
                    type: '美容洗护',
                    sales: 145
                },
                {
                    type: '母婴用品',
                    sales: 48
                },
                {
                    type: '进口食品',
                    sales: 38
                },
                {
                    type: '食品饮料',
                    sales: 38
                },
                {
                    type: '家庭清洁',
                    sales: 38
                }
            ]

            const columnPlot = new Column('container2', {
                data,
                xField: 'type',
                yField: 'sales',
                label: {
                    // 可手动配置 label 数据标签位置
                    position: 'middle', // 'top', 'bottom', 'middle',
                    // 配置样式
                    style: {
                        fill: '#FFFFFF',
                        opacity: 0.6
                    }
                },
                meta: {
                    type: {
                        alias: '类别'
                    },
                    sales: {
                        alias: '销售额'
                    }
                }
            })

            columnPlot.render()
        },
        initArea () {
            fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json').then((res) => res.json()).then((data) => {
                const area = new Area('container1', {
                    data,
                    xField: 'Date',
                    yField: 'scales',
                    xAxis: {
                        tickCount: 5
                    }
                })
                area.render()
            })
        }
    }
}
</script>

<style lang="less">
.home {
    height: 100%;
    .chart {
        width: 31%;
        height: 400px;
        margin: 1%;
        float: left;
    }
}
</style>
