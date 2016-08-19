/*
策略出处: https://www.botvs.com/strategy/20226
策略名称: 获取周K线
策略作者: 数·狂
策略描述:

把日K线组合为周K线，默认一周开始于周日（可调）。

使用方法：
$.GetRecordsWeek(exchange)


参数            默认值  描述
----------  -----  ---------------------------
weekStarts      0  一周开始于: 周日|周一|周二|周三|周四|周五|周六
*/

$.GetRecordsWeek = function(exchange) {
    var rec1 = exchange.GetRecords(PERIOD_D1);
    if (!rec1) return null;
    if (rec1.length === 0) return [];
    var recN = [];
    var tmp = {
        Time: rec1[0].Time,
        Open: rec1[0].Open,
        High: rec1[0].High,
        Low: rec1[0].Low,
        Close: rec1[0].Close,
        Volume: rec1[0].Volume
    };
    for (var i = 1; i < rec1.length; i++) {
        if (Math.floor((rec1[i].Time / 86400000 - 3 - weekStarts + 1/3) / 7 + 1e-6) > Math.floor((rec1[i-1].Time / 86400000 - 3 - weekStarts - 1/3) / 7 + 1e-6)) { // new week
            recN.push({
                Time: tmp.Time,
                Open: tmp.Open,
                High: tmp.High,
                Low: tmp.Low,
                Close: tmp.Close,
                Volume: tmp.Volume
            });
            tmp.Time = rec1[i].Time;
            tmp.Open = rec1[i].Open;
            tmp.High = rec1[i].High;
            tmp.Low = rec1[i].Low;
            tmp.Close = rec1[i].Close;
            tmp.Volume = rec1[i].Volume;
        } else if (tmp.Time) { // same week
            tmp.High = Math.max(tmp.High, rec1[i].High);
            tmp.Low = Math.min(tmp.Low, rec1[i].Low);
            tmp.Close = rec1[i].Close;
            tmp.Volume += rec1[i].Volume;
        }
    }
    recN.push({
        Time: tmp.Time,
        Open: tmp.Open,
        High: tmp.High,
        Low: tmp.Low,
        Close: tmp.Close,
        Volume: tmp.Volume
    });
    return recN;
};

function main() {
    var rec = $.GetRecordsWeek(exchange);
    Log(new Date(rec[rec.length-1].Time).toString());
}
