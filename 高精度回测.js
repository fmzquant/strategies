/*
策略出处: https://www.botvs.com/strategy/11575
策略名称: 高精度回测
策略作者: 数·狂
策略描述:

由于当前回测系统对K线周期的支持不够完善，在回测系统中无法使用自定义周期，且使用长周期进行回测时数据点不够密集。采用此方法可以增加回测的数据点密度，获得更准确的结果，只需在回测时使用，实盘时无需使用本模板。

使用方法：
exchange.GetRecords() ==> $.GetRecords(exchange, period)
其中period的单位为分钟。
回测K线周期应该尽可能选小（例如：回测近1个月内选1分钟，近5个月内选5分钟，等等），且period应是回测周期的倍数。

*/

$.GetRecords = function (exchange, period) {    
    var rec1 = exchange.GetRecords();
    if (!rec1) return null;
    var recN = [];
    var tmp = {Time: null, Open: null, High: null, Low: null, Close: null, Volume: 0};
    for (var i = 0; i < rec1.length; i++) {
        if (rec1[i].Time % (period*60000) === 0) {
            tmp.Time = rec1[i].Time;
            tmp.Open = rec1[i].Open;
            tmp.High = rec1[i].High;
            tmp.Low = rec1[i].Low;
            tmp.Close = rec1[i].Close;
            tmp.Volume = rec1[i].Volume;
        }
        else if (tmp.Time){
            tmp.High = Math.max(tmp.High, rec1[i].High);
            tmp.Low = Math.min(tmp.Low, rec1[i].Low);
            tmp.Close = rec1[i].Close;
            tmp.Volume += rec1[i].Volume;
        }
        if ((i == rec1.length-1 || rec1[i+1].Time % (period*60000) === 0) && tmp.Time) {
            recN.push({Time: tmp.Time, Open: tmp.Open, High: tmp.High, Low: tmp.Low, Close: tmp.Close, Volume: tmp.Volume});
        }
    }
    return recN;
};
