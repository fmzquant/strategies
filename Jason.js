/*
策略出处: https://www.botvs.com/strategy/36875
策略名称: Jason
策略作者: jason123456
策略描述:

求梦神指点


参数       默认值    描述
-------  -----  ----
symbolA  MA705  合约１
symbolB  MA709  合约2

按钮        默认值         描述
--------  ----------  ----
CoverAll  __button__  全部平仓
*/

var preRecordsTime=0;
var symbolA=symbolA
var symbolB=symbolB
function main() {
    var isFirst = true                                          // 设置一个变量 表示第一次循环
    var cfg = $.GetCfg();
    cfg.yAxis = [{
            title: {text: 'K线'},//标题
            style: {color: '#4572A7'},//样式
            opposite: false  //生成右边Y轴
        },
       {
            title:{text: "A"},
            opposite: true  //生成右边Y轴  ceshi
       }
    ];
   
    while (true) {
        exchange.SetContractType(symbolA);
        Log('hello')//这里可以打印出来，说明错误在这前面还是后面？
        var recordsA = exchange.GetRecords();                    // 获取K线数据
        if (recordsA && recordsA.length > 0) {                    // records 不为 null 并且 不是  空数组
            $.PlotRecords(recordsA, symbolA)                       // 调用 模板导出函数 $.PlotRecords 传入 K线数据 和 标题 BTC
            if (isFirst) {                                      // 如果是第一次循环 执行以下
                $.PlotFlag(recordsA[recordsA.length - 1].Time, 'Start', 'S')    // 添加一个 旗帜标记
                isFirst = false                                               // 更新isFirst 下次不会在执行符合当前 if 条件的代码
                //$.PlotHLine(records[records.length - 1].Close, 'Close')       // 画一条水平线
            }
        }
            var recordsB = exchange.GetRecords(symbolB);                    // 获取K线数据
        if (recordsB && recordsB.length > 0) {                    // records 不为 null 并且 不是  空数组
            $.PlotRecords(recordsB, symbolB)                       // 调用 模板导出函数 $.PlotRecords 传入 K线数据 和 标题 BTC
            if (isFirst) {                                      // 如果是第一次循环 执行以下
                $.PlotFlag(recordsB[recordsB.length - 1].Time, 'Start', 'S')    // 添加一个 旗帜标记
                isFirst = false                                               // 更新isFirst 下次不会在执行符合当前 if 条件的代码
                //$.PlotHLine(records[records.length - 1].Close, 'Close')       // 画一条水平线
            }
        }
      
        // LINEARREG_SLOPE
        var slopeA = talib.LINEARREG_SLOPE(recordsA,10);
        if(preRecordsTime !== recordsA[recordsA.length - 1].Time){
            $.PlotLine('slopeA', slopeA[slopeA.length - 1]); 
            for(var j = 0;j < cfg.series.length; j++){
                if(cfg.series[j].name == "slopeA"){
                    cfg.series[j].yAxis = 1;
                }
            }
        }
        preRecordsTime = recordsA[recordsA.length - 1].Time;
         var slopeB = talib.LINEARREG_SLOPE(recordsB,10);
        if(preRecordsTime !== recordsB[recordsB.length - 1].Time){
            $.PlotLine('slopeB', slopeB[slopeB.length - 1]); 
            for(var k = 0;k < cfg.series.length; k++){
                if(cfg.series[k].name == "slopeB"){
                    cfg.series[k].yAxis = 1;
                }
            }
        }
            preRecordsTime = recordsB[recordsB.length - 1].Time;
       
        Sleep(1000)
}
} 
