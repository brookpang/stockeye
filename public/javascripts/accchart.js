option = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['收益率', '准确率']
    },
    toolbox: {
        show: false,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {
                readOnly: false
            },
            magicType: {
                type: ['line', 'bar']
            },
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        scale: true,
        data: []
    },
    yAxis: [{
        type: 'value',
        scale: true,
        axisLabel: {
            formatter: '{value}'
        }
    }, {
        type: 'value',
        scale: true,
        axisLabel: {
            formatter: '{value}'
        }
    }],
    series: [{
        name: '收益率',
        type: 'line',
        data: [],
        markPoint: {
            data: [{
                type: 'max',
                name: '最大值'
            }, {
                type: 'min',
                name: '最小值'
            }]
        },
        markLine: {
            data: [{
                type: 'average',
                name: '平均值'
            }]
        }
    }, {
        name: '准确率',
        type: 'line',
        data: [],
        yAxisIndex: 1,
        markPoint: {
            data: [{
                type: 'max',
                name: '最大值'
            }, {
                type: 'min',
                name: '最小值'
            }]
        },
        markLine: {
            data: [{
                type: 'average',
                name: '平均值'
            }]
        }
    }]
};
