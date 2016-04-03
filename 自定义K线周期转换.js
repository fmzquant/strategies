/*
策略出处: https://www.botvs.com/strategy/11216
策略名称: 自定义K线周期转换
策略作者: 宁公子
策略描述:

-- 策略引用该模板以后直接用 $.CustomRecords() 调用此方法
-- main 函数在策略中不会触发, 只做为模板调试的入口
-- CustomRecords(e, K_multiple) e 为交易所，K_multiple 为默认K线周期的倍数，
比如：当前机器人默认K 线周期为小时，CustomRecords(exchange, 4)，得到的就是4小时的K线周期records。
宁公子

*/

/*
-- 策略引用该模板以后直接用 $.CustomRecords() 调用此方法
-- main 函数在策略中不会触发, 只做为模板调试的入口
-- CustomRecords(e, K_multiple) e 为交易所，K_multiple 为默认K线周期的倍数，
比如：当前机器人默认K 线周期为小时，CustomRecords(exchange, 4)，得到的就是4小时的K线周期records。
宁公子
*/
$.CustomRecords = function CustomRecords(e, K_multiple) {
    var records =  _C(e.GetRecords);
    if(K_multiple < 1 || K_multiple > records.length || typeof K_multiple !== 'number' || K_multiple%1 !== 0){
        throw("K_multiple 值必须是大于1且小于record长度的正整数");
    }
    
    var upRecords = new Array(0);
    var sliceRecords = new Array(0);
    var K_multipleRecords = new Array(0);
    var sliceRecords_Volume;
    var timeInterval = records[1].Time - records[0].Time;
    for (var i = 0; i < records.length; i++) {
        var isInteger = (records[i].Time - 1388505600000) % (timeInterval * K_multiple);
        if (!isInteger) {
            if (i + K_multiple <= records.length) {
                sliceRecords = records.slice(i, i + K_multiple);
                sliceRecords_Volume = 0;
                for (var j = 0; j < K_multiple; j++) {
                    sliceRecords_Volume += sliceRecords[j].Volume;
                }
                upRecords = {
                    "Time": sliceRecords[0].Time,
                    "Open": sliceRecords[0].Open,
                    "High": TA.Highest(sliceRecords, 0, 'High'),
                    "Low": TA.Lowest(sliceRecords, 0, 'Low'),
                    "Close": sliceRecords[K_multiple - 1].Close,
                    "Volume": sliceRecords_Volume
                };
                K_multipleRecords.push(upRecords);
            } else {
                sliceRecords = records.slice(i);
                sliceRecords_Volume = 0;
                for (var k = 0; k < sliceRecords.length; k++) {
                    sliceRecords_Volume += sliceRecords[k].Volume;
                }
                upRecords = {
                    "Time": sliceRecords[0].Time,
                    "Open": sliceRecords[0].Open,
                    "High": TA.Highest(sliceRecords, 0, 'High'),
                    "Low": TA.Lowest(sliceRecords, 0, 'Low'),
                    "Close": sliceRecords[sliceRecords.length - 1].Close,
                    "Volume": sliceRecords_Volume
                };
                K_multipleRecords.push(upRecords);
            }
        }
    }
    return K_multipleRecords;
};

function main() {
    $.CustomRecords();
}
