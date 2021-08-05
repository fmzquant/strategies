
> 策略名称

发明者APP图表测试策略

> 策略作者

小小梦

> 策略描述

## 发明者APP图表测试策略

测试APP图表用，也可以作为画图参考代码，包含一个随机K线生成对象。

> 策略参数





|按钮|默认值|描述|
|----|----|----|
|buy|true|买入|
|sell|true|卖出|


> 源码 (javascript)

``` javascript
var cfgA = {
    extension: {
        layout: 'single',
        height: 300,      
        col: 4
    },
    title: {
        text: 'line'
    },
    xAxis: {
        type: 'datetime'
    },
    series: [{
        name: 'sin',
        data: []
    }, {
        name: 'cos',
        data: []
    }]
}

var cfgB = {
    __isStock: false,
    extension: {
        layout: 'single',
        height: 300, 
        col: 4
    },    
    title: {
        text: 'Pie chart'
    },
    series: [{
        type: 'pie',
        name: 'one',
        // 指定初始数据后不需要用add函数更新,直接更改图表配置就可以更新序列
        data: [                    
            ["BTC_USDT", 25],
            ["LTC_USDT", 25],
            ["ETH_USDT", 25],
            ["EOS_USDT", 25]
        ]                
    }]
}

var cfgC = {
    __isStock: false,
    extension: {
        layout: 'single',
        col: 4,
        height: '300px'
    },
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Bar with negative stack'
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    xAxis: [{
        categories: ['BTC_USDT', 'ETH_USDT', 'EOS_USDT', 'LTC_USDT'],
        reversed: false,
        labels: {
            step: 1
        },
        accessibility: {
            description: 'A'
        }
    }, { // mirror axis on right side
        opposite: true,
        reversed: false,
        categories: ['BTC_USDT', 'ETH_USDT', 'EOS_USDT', 'LTC_USDT'],
        linkedTo: 0,
        labels: {
            step: 1
        },
        accessibility: {
            description: 'B'
        }
    }],
    series: [{
        name: 'A',
        data: [
            -6, -4.3, -8, -2.4
        ]
    }, {
        name: 'B',
        data: [
            2.2, 2.1, 2.2, 2.4
        ]
    }]
}

var cfgD = {
    extension: {
        col: 12,
        height: '600px'
    },
    title: {
        text: 'K Line'
    },
    rangeSelector: {
        selected: 1
    },
    yAxis: [{
        labels: {
            align: 'right',
            x: -3
        },
        title: {
            text: 'OHLC'
        },
        height: '50%',
        lineWidth: 2,
        resize: {
            enabled: true
        }
    }, {
        labels: {
            align: 'right',
            x: -3
        },
        title: {
            text: 'Volume'
        },
        top: '55%',
        height: '25%',
        offset: 0,
        lineWidth: 2
    }],        
    tooltip: {
        split: true
    },
    series: [{
        type: 'candlestick',
        name: 'K',
        id: "k",
        data: []
    }, {
        type: 'column',
        name: 'Volume',
        data: [],
        yAxis: 1
    }, {
        type: 'line',
        data: [],
        id: 'line1',
    }, {
        type: 'flags',
        onSeries: 'k',
        data: []
    }]
}

var cfgE = {
    __isStock: false,
    extension: {
        col: 12,
        height: '300px'
    },
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'pie'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'BTC_USDT',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'ETH_USDT',
            y: 11.84
        }, {
            name: 'LTC_USDT',
            y: 10.85
        }]
    }]
}

var cfgF = {
    __isStock: false,
    extension: {
        layout: 'single',
        col: 6,
        height: '300px'
    },
    chart: {
        type: 'area',
        zoomType: 'xy'
    },
    title: {
        text: 'ETH_USDT Market Depth'
    },
    xAxis: {
        minPadding: 0,
        maxPadding: 0,
        plotLines: [{
            color: '#888',
            value: 0.1523,
            width: 1,
            label: {
                text: 'Actual price',
                rotation: 90
            }
        }],
        title: {
            text: 'Price'
        }
    },
    yAxis: [{
        lineWidth: 1,
        gridLineWidth: 1,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: 'inside',
        labels: {
            align: 'left',
            x: 8
        }
    }, {
        opposite: true,
        linkedTo: 0,
        lineWidth: 1,
        gridLineWidth: 0,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: 'inside',
        labels: {
            align: 'right',
            x: -8
        }
    }],
    legend: {
        enabled: false
    },
    plotOptions: {
        area: {
            fillOpacity: 0.2,
            lineWidth: 1,
            step: 'center'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
        valueDecimals: 2
    },
    series: [{
        name: 'Bids',
        data: [[99, 0.562], [89, 1.856]],
        color: '#03a7a8'
    }, {
        name: 'Asks',
        data: [[100, 0.12], [120, 0.52]],
        color: '#fc5857'
    }]
}

var cfgG = {
    __isStock: false,
    extension: {
        layout: 'single',
        col: 6,
        height: '300px'
    },    
    data: {
        table: 'datatable'
    },
    chart: {
        type: 'column'
    },
    title: {
        text: 'column'
    },
    yAxis: {
        allowDecimals: false,
        title: {
            text: 'Units'
        }
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.point.y + ' ' + this.point.name.toLowerCase();
        }
    },
    series: [{
        name: 'Asks',
        data: []

    }, {
        name: 'Bids',
        data: []
    }]
}

function candlestickDataMaker(n, period, pricePrecision, amountPrecision) {
    var self = {}
    self.lastBar = {}
    self.pricePrecision = pricePrecision
    self.amountPrecision = amountPrecision
    self.mapPeriod = {
        "1" : PERIOD_M1, 
        "5" : PERIOD_M5
    }
    self.period = 0
    self.init = function(n, period) {
        var valueOfMapPeriod = self.mapPeriod[period]
        if (!valueOfMapPeriod) {
            throw "period 不支持"
        }
        self.period = valueOfMapPeriod
        var ts = new Date().getTime()
        self.lastBar.Time = ts - ts % (valueOfMapPeriod * 1000)
        self.lastBar.Open = n
        self.lastBar.Close = n
        self.lastBar.High = n
        self.lastBar.Low = n
        self.lastBar.Volume = n
    }
    self.makeData = function(n, y) {
        var ts = new Date().getTime()
        ts = ts - ts % (self.period * 1000)
        if (self.lastBar.Time != ts) {
            self.lastBar.Time = ts
            self.lastBar.Open = _N(self.lastBar.Close, self.pricePrecision)
            self.lastBar.Close = _N(self.lastBar.Close, self.pricePrecision)
            self.lastBar.High = _N(self.lastBar.Close, self.pricePrecision)
            self.lastBar.Low = _N(self.lastBar.Close, self.pricePrecision)
            self.lastBar.Volume = n
        } else {
            // 产生新价格
            var price = Math.round((self.lastBar.Close + (n > 50 ? 1 : -1) * Math.random() * 0.003 * y * self.lastBar.Close) * 100) / 100
            self.lastBar.Close = _N(price, self.pricePrecision)
            self.lastBar.High = _N(price > self.lastBar.High ? price : self.lastBar.High, self.pricePrecision)
            self.lastBar.Low = _N(price < self.lastBar.Low ? price : self.lastBar.Low, self.pricePrecision)
            self.lastBar.Volume += n
        }
        return self.lastBar 
    }
    self.makeDepth = function(price, n, y) {
        var depth = {}
        depth.Asks = []
        depth.Bids = []
        var absY = Math.abs(y)
        for(var i = 0 ; i < 50 ; i++) {
            var num = Math.random()
            var num2 = Math.random()
            var lastAsksPrice = i == 0 || depth.Asks.length - 1 <= 0 ? price : depth.Asks[Math.max(depth.Asks.length - 1, 0)][0]
            var lastAsksAmount = i == 0 || depth.Asks.length - 1 <= 0 ? (n / 1000 + (1 + num / 5) * absY) : depth.Asks[depth.Asks.length - 1][1]
            var lastBidsPrice = i == 0 || depth.Bids.length - 1 <= 0 ? price : depth.Bids[Math.max(depth.Bids.length - 1, 0)][0]
            var lastBidsAmount = i == 0 || depth.Bids.length - 1 <= 0 ? (n / 1000 + (1 + num2 / 5) * absY) : depth.Bids[depth.Bids.length - 1][1]
            var askPrice = _N(lastAsksPrice + 0.002 * lastAsksPrice * num * absY, self.pricePrecision)
            var bidPrice = _N(Math.max(lastBidsPrice - 0.002 * lastBidsPrice * num * absY, 0), self.pricePrecision)
            var askAmount = _N(lastAsksAmount + (1 + num / 10) * absY * (1 + i / 100 + n / 1000), self.amountPrecision)
            var bidAmount = _N(lastBidsAmount + (1 + num2 / 10) * absY * (1 + i / 100 + n / 1000), self.amountPrecision)
            if (Math.random() < 0.85) {
                depth.Asks.push([askPrice, askAmount])
            }
            if (Math.random() < 0.85) {
                depth.Bids.push([bidPrice, bidAmount])
            }                        
        }
        return depth
    }
    
    self.init(n, period)
    return self
}

function main() {
    LogReset(1)
    // 三角函数
    var pi = 3.1415926535897   // 派
    var time = 0               // 用于记录时间戳的变量
    var angle = 0              // 角度
    var y = 0                  // 坐标y值，用于接收正弦值、余弦值
    
    // 创建Bar数据随机生成对象
    var maker = candlestickDataMaker(100, "1", 2, 3)    
    var lastBarTS = 0
    
    var chart = Chart([cfgA, cfgB, cfgC, cfgD, cfgE, cfgF, cfgG])
    chart.reset()
    
    while(true) {
        // 随机数
        var n = _N(Math.random() * 100, 0)
        
        // 计算三角函数
        time = new Date().getTime()           // 当前时间
        y = Math.sin(angle * 2 * pi / 360)    // 每500ms角度angle增加5度，计算正弦值        
        chart.add(0, [time, y])               // 写入数据
        y = Math.cos(angle * 2 * pi / 360)    // 计算余弦值
        chart.add(1, [time, y])               // 写入数据
        angle += 1                            // 增加5度
        
        // 随机构造饼图数据
        cfgB.series[0].data[0][1] = 50 - n / 2
        cfgB.series[0].data[1][1] = n / 2
        cfgB.series[0].data[2][1] = 50 - n / 4
        cfgB.series[0].data[3][1] = n / 4
        
        // 修改Bar with negative stack数据
        for (var i = 0 ; i < 4 ; i++) {
            cfgC.series[0].data[i] = n / y * Math.random()
            cfgC.series[1].data[i] = -(n / y * Math.random())
        }
        
        // K线数据
        var bar = maker.makeData(n, y)
        if (lastBarTS != bar.Time) {
            chart.add(5, [bar.Time, bar.Open, bar.High, bar.Low, bar.Close])
            chart.add(6, [bar.Time, bar.Volume])
            chart.add(7, [bar.Time, bar.Open])
            lastBarTS = bar.Time
        } else {
            chart.add(5, [bar.Time, bar.Open, bar.High, bar.Low, bar.Close], -1)
            chart.add(6, [bar.Time, bar.Volume], -1)
            chart.add(7, [bar.Time, bar.Open], -1)
        }
        
        // variablepie
        cfgE.series[0].data[0].y = Math.random() * n * 0.3
        cfgE.series[0].data[1].y = Math.random() * n * 0.3
        cfgE.series[0].data[2].y = Math.random() * n * 0.3
        
        // depth
        var depth = maker.makeDepth(bar.Close, n, y)
        cfgF.series[0].data = depth.Bids
        cfgF.series[1].data = depth.Asks
        
        // column
        var arrAskAmount = []
        var arrBidAmount = []
        _.each(depth.Asks, function(ask) {
            arrAskAmount.push(ask[1])
        })
        _.each(depth.Bids, function(bid) {
            arrBidAmount.push(bid[1])
        })
        cfgG.series[0].data = arrAskAmount
        cfgG.series[1].data = arrBidAmount
        
        // 交互测试实时添加图表数据
        var cmd = GetCommand()
        if (cmd) {
            Log("接收到命令：", cmd)
            var arr = cmd.split(":")
            if (arr[0] == "buy") {
                chart.add(8, {x: time, color: "red", shape: "circlepin", title: "买", text: bar.Close + " 买入 " + arr[1]})
            } else if (arr[0] == "sell") {
                chart.add(8, {x: time, color: "green", shape: "circlepin", title: "卖出", text: bar.Close + " 卖出 " + arr[1]})
            }
        }
        
        chart.update([cfgA, cfgB, cfgC, cfgD, cfgE, cfgF, cfgG])
        Sleep(1000 * 2)
    }
}
```

> 策略出处

https://www.fmz.com/strategy/298823

> 更新时间

2021-07-16 18:51:03
