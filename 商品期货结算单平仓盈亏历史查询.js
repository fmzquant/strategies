/*
策略出处: https://www.botvs.com/strategy/38083
策略名称: 商品期货结算单平仓盈亏历史查询
策略作者: Zero
策略描述:

需要更新最新的托管者, 不支持回测, 只支持实盘


参数         默认值         描述
---------  ----------  ----
StartDate  2017-03-15  开始日期
EndDate    2017-03-17  结束日期
*/

function main() {
    var cfg = {
        tooltip: {
            xDateFormat: '%Y-%m-%d %H:%M:%S, %A'
        },
        title: {
            text: '平仓盈亏分析图'
        },
        xAxis: {
            type: 'datetime'
        },
        series: [{
            name: '平仓盈亏',
            data: [],
            tooltip: {
                valueDecimals: 2
            }
        }]
    }
    var chart = Chart(cfg);

    chart.reset();
    Log("开始查询结算单...")
    var ts = new Date(StartDate + " 00:00:00")
    var te = new Date(EndDate + " 00:00:00");
    var now = new Date();
    if (te.getTime() > now.getTime()) {
        te = now;
    }
    var preDate = ""
    var AllProfit = 0
    var AllCommission = 0;
    while (ts.getTime() < te.getTime()) {
        var day = _D(ts, "yyyyMMdd");
        LogStatus("正在查询 " + day);
        r = _C(exchange.IO, "settlement", day)
        var m = r.Content.match(/Creation Date.\s*(\d+)/)
        if (m) {
            var date = m[1]
            m = r.Content.match(/Realized P\/L.\s*([\-\.\d]+)/)
            m2 = r.Content.match(/Commission.\s*([\-\.\d]+)/)
            if (m && m2 && preDate != date) {
                preDate = date
                var profit = parseFloat(m[1])
                var commission = parseFloat(m2[1])
                AllProfit += profit;
                AllCommission += commission
                cfg.subtitle = {
                    text: '总平仓盈亏:' + _N(AllProfit) + ', 总手续费:' + _N(AllCommission)
                };
                chart.update(cfg);
                chart.add([0, [ts.getTime(), profit]]);
                LogStatus("All Profit:", AllProfit);
                Log(date, "平仓盈亏", profit, "手续费", commission);
            }
        }
        Sleep(1000)
        ts = new Date(ts.getTime() + (24 * 60 * 60000))
    }
    Log("查询完成, 总平仓盈亏:", _N(AllProfit), "总手续费:", _N(AllCommission));
}
