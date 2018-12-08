
> 策略名称

StochRSI(和okcoin一致)

> 策略作者

fangj





> 源码 (javascript)

``` javascript
function Stoch_RSI(records) {
    /*
    LC:=REF(CLOSE,1);
    RSI:=SMA(MAX(CLOSE-LC,0),14,1)/SMA(ABS(CLOSE-LC),14,1)*100;
    STOCH_RSI=STOCH_RSI:=MA(RSI-LLV(RSI,14),3)/MA(HHV(RSI,14)-LLV(RSI,14),3)*100;
    STOCH_RSI_MA:SMA(STOCH_RSI,3);
    */

    //计算RSI
    var rsi = TA.RSI(records, 14);
    // STOCH_RSI:=MA(RSI-LLV(RSI,14),3)/MA(HHV(RSI,14)-LLV(RSI,14),3)*100;
    //填充空白数据
    var raw_stoch_rsi = [], raw_stoch_rsi_a = [], raw_stoch_rsi_b = [];
    for (var i = 0; i < 14; i++) {
        raw_stoch_rsi[i] = 50;
        raw_stoch_rsi_a[i] = 0.5;
        raw_stoch_rsi_b[i] = 1;
    }
    //计算指标
    for (i = 14; i < rsi.length; i++) {
        var the_next_index = i + 1;
        var first_index = the_next_index - 14;
        var period_data = rsi.slice(first_index, the_next_index);
        var llv = _.min(period_data);
        var hhv = _.max(period_data);
        var current_rsi = rsi[i];
        raw_stoch_rsi_a.push(current_rsi - llv);
        raw_stoch_rsi_b.push(hhv - llv);
    }
    //分别对分子分母滑动平均
    var raw_stoch_rsi_a_ma = TA.MA(raw_stoch_rsi_a, 3);
    var raw_stoch_rsi_b_ma = TA.MA(raw_stoch_rsi_b, 3);
    for (i = 0; i < rsi.length; i++) {
        var v = raw_stoch_rsi_a_ma[i] / raw_stoch_rsi_b_ma[i] * 100;
        v = isNaN(v) ? 50 : v;
        raw_stoch_rsi[i] = v;
    }
    // 滑动平均
    var stoch_rsi_K = raw_stoch_rsi;
    var stoch_rsi_D = TA.MA(stoch_rsi_K, 3);
    stoch_rsi = [stoch_rsi_K, stoch_rsi_D];
    return stoch_rsi;
}


var chart = { // 这个 chart 在JS 语言中 是对象， 在使用Chart 函数之前我们需要声明一个配置图表的对象变量chart。
    __isStock: true,                                    // 标记是否为一般图表，有兴趣的可以改成 false 运行看看。
    tooltip: {xDateFormat: '%Y-%m-%d %H:%M:%S, %A'},    // 缩放工具
    title: {text: 'K线图'},                       // 标题
    rangeSelector: {                                    // 选择范围
        buttons: [{type: 'hour', count: 1, text: '1h'}, {type: 'hour', count: 3, text: '3h'}, {
            type: 'hour',
            count: 8,
            text: '8h'
        }, {type: 'all', text: 'All'}],
        selected: 0,
        inputEnabled: true
    },
    xAxis: {type: 'datetime'},                         // 坐标轴横轴 即：x轴， 当前设置的类型是 ：时间
    yAxis: [{                                           // 坐标轴纵轴 即：y轴， 默认数值随数据大小调整。
        title: {text: '价格'},                           // 标题
        opposite: false,
        height: '60%',// 是否启用右边纵轴
    },
        {                                           // 坐标轴纵轴 即：y轴， 默认数值随数据大小调整。
            title: {text: 'stoch_rsi'},                           // 标题
            top: '65%',
            height: '35%',
            offset: 0,
            opposite: false,                                // 是否启用右边纵轴
        }],
    series: [                                          // 数据系列，该属性保存的是 各个 数据系列（线， K线图， 标签等..）
        {
            type: 'candlestick',
            name: '价格',
            id: 'primary',
            data: []
        },  // 索引为0， data 数组内存放的是该索引系列的 数据
        {name: "SRSI_K", id: "SRSI_K", data: [], yAxis: 1}, // 索引为1，设置了dashStyle : 'shortdash' 即：设置 虚线。
        {name: "SRSI_D", id: "SRSI_D", dashStyle: 'shortdash', data: [], yAxis: 1},
    ]
};

function main() {
    exchange.SetContractType("quarter");
    var ObjChart = Chart(chart);  // 调用 Chart 函数，初始化 图表。
    ObjChart.reset();             // 清空
    var preBarTime = 0;
    while (true) {
        var nowTime = new Date().getTime();   // 获取本次轮询的 时间戳，  即一个 毫秒 的时间戳。用来确定写入到图表的X轴的位置。
        var records = exchange.GetRecords(PERIOD_H1);  // 获取行情数据
        var stoch_rsi = Stoch_RSI(records);
        stoch_rsi_quick = stoch_rsi[0];
        stoch_rsi_slow = stoch_rsi[1];

        for (var i = 0; i < records.length; i++) {         // 遍历records
            var r_quick = stoch_rsi_quick[i];
            var r_slow = stoch_rsi_slow[i];
            if (isNaN(r_quick)) {
                r_quick = 50;
            }
            if (isNaN(r_slow)) {
                r_slow = 50;
            }
            if (records[i].Time == preBarTime) {
                ObjChart.add(0, [records[i].Time, records[i].Open, records[i].High, records[i].Low, records[i].Close], -1);  // 添加
                ObjChart.add(1, [records[i].Time, r_quick], -1);
                ObjChart.add(2, [records[i].Time, r_slow], -1);
            } else if (records[i].Time > preBarTime) {
                preBarTime = records[i].Time;
                ObjChart.add(0, [records[i].Time, records[i].Open, records[i].High, records[i].Low, records[i].Close]);  // 添加
                ObjChart.add(1, [records[i].Time, r_quick]);
                ObjChart.add(2, [records[i].Time, r_slow]);
            }

        }
        ObjChart.update(chart);                  // 更新图表以显示出来。
        Sleep(2000);
    }
}
```

> 策略出处

https://www.fmz.com/strategy/56119

> 更新时间

2017-09-26 13:04:37
