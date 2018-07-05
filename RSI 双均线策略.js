/*
策略出处: https://www.fmz.com/strategy/46605
策略名称: RSI 双均线策略
策略作者: yilidalei
策略描述:




参数                默认值  描述
--------------  -----  -----
RSI_Period         14  RSI周期
MA_fast_Period     10  快线周期
MA_slow_Period     24  慢线周期
SuperSellValue     20  超卖阈值
SuperBuyValue      80  超买阈值

按钮    默认值         描述
----  ----------  -----
btn1  __button__  test
btn2  __button__  test2
*/

// 以下是测试代码 
/*- 状态 在使用 模板时需要在 主策略内声明
var TASK_IDLE = 0;
var TASK_OPEN_LONG = 1;
var TASK_OPEN_SHORT = 2;
var TASK_ADD = 3;
var TASK_ST = 4;
var TASK_COVER = 5;
*/

// 临时参数
/*
var RSI_Period = 14;
var MA_fast_Period = 10;
var MA_slow_Period = 200;
var SuperSellValue = 20;
var SuperBuyValue = 80;
*/

// 全局变量
var currency0 = exchanges[0].GetCurrency();
var ChartObj = null;
var TASK_IDLE = 0;
var TASK_OPEN_LONG = 1;
var TASK_OPEN_SHORT = 2;
var TASK_ADD = 3;
var TASK_ST = 4;
var TASK_COVER = 5;

function onTick1() {
    // 获取K线数据
    var nowTime = new Date().getTime();
    var records = _C(exchanges[0].GetRecords);
    if(records.length < Math.abs(RSI_Period, MA_slow_Period, MA_fast_Period)){
        return $.TaskCmd(TASK_IDLE);
    }
    
    var rsi = TA.RSI(records, RSI_Period);
    var ma_fast = TA.MA(records, MA_fast_Period);
    var ma_slow = TA.MA(records, MA_slow_Period);
    
    // $.AddData = function(index, dataKey, dataValue)
    
    // 画图表
    $.PlotRecords(records, currency0);
    $.PlotLine('ma_fast' + MA_fast_Period, ma_fast[ma_fast.length - 1], records[records.length - 1].Time);
    $.PlotLine('ma_slow' + MA_slow_Period, ma_slow[ma_slow.length - 1], records[records.length - 1].Time);
    $.PlotLine('rsi' + RSI_Period, rsi[rsi.length - 1], records[records.length - 1].Time);
    
    if (rsi[rsi.length - 2] > SuperBuyValue) {
        // 标记
        $.PlotFlag(nowTime, 'C', 'CL', 'circlepin', 'blue');
        return $.TaskCmd(TASK_COVER);
    }else if(rsi[rsi.length - 2] < SuperSellValue && records[records.length - 1].Close > ma_slow[ma_slow.length - 1] && records[records.length - 1].Close < ma_fast[ma_fast.length - 1]){
        // 标记
        $.PlotFlag(nowTime, 'L', 'L', 'flag', 'red');
        return $.TaskCmd(TASK_OPEN_LONG, 0.5);
    }

    return $.TaskCmd(TASK_IDLE);
}

function main() {
    LogReset(1);
    ChartObj = Chart(null);
    ChartObj.reset();
    ChartObj = $.GetCfg();
    // 处理 指标轴------------------------
    ChartObj.yAxis = [{
            title: {text: 'K线'},//标题
            style: {color: '#4572A7'},//样式 
            opposite: false  //生成右边Y轴
        },
        {
            title:{text: "指标轴"},
            opposite: true,  //生成右边Y轴  ceshi
        }
    ];
    // 初始化指标线
    var records = null;
    while(!records || records.length < 30){
        records = _C(exchange.GetRecords);
        LogStatus("records.length:", records.length);
        Sleep(1000);
    }

    $.PlotRecords(records, currency0);
    $.PlotLine('ma_fast' + MA_fast_Period, 0, records[records.length - 1].Time);
    $.PlotLine('ma_slow' + MA_slow_Period, 0, records[records.length - 1].Time);
    var chart = $.PlotLine('rsi' + RSI_Period, 0, records[records.length - 1].Time);
    // $.PlotFlag(new Date().getTime(), '开始', 'begin', 'circlepin', 'green');
    // $.PlotFlag(new Date().getTime(), 'CoverLong', 'CL', 'circlepin', 'blue');
    // $.PlotFlag(new Date().getTime(), 'Long', 'L', 'flag', 'red');
    // 修改指标线 坐标轴Y轴
    for(var key in ChartObj.series){
        if(ChartObj.series[key].name == 'rsi' + RSI_Period){
            ChartObj.series[key].yAxis = 1;
        }
    }
    chart.update(ChartObj);
    chart.reset();
    
    $.Relation_Exchange_onTick(exchanges[0], onTick1);
    $.Trend();  // 不用传参数。
}
