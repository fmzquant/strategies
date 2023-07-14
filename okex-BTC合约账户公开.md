
> Name

okex-BTC合约账户公开

> Author

leviyuan





> Source (javascript)

``` javascript
var exchangeRate = 6.4,
    usdprice = 1000

var chartCfg = [{
    title: {
        text: "账户监控"
    },
    xAxis: {
        type: 'datetime'
    },
    series: [{
        name: "账户当前资金价值",
        data: []
    }, {
        name: "本周起始BTC的当前价值",
        data: []
    }]
}]

function GetWebJson(url) {
    for (var i = 0; i < 10; i++) {
        try {
            return JSON.parse(HttpQuery(url))
        } catch (e) {
            Sleep(500)
        }
    }
}

function main() {
    exchange.SetRate(1)
    LogReset()

    var chart = Chart(chartCfg)
    chart.reset()

    var nxttime = new Date().getTime()
    while (true) {
        var accountinfo = _C(exchange.GetAccount)
        try {
            var bdata = GetWebJson("https://api-otc.huobipro.com/v1/otc/trade/list/public?coinId=2&tradeType=0&currentPage=1&payWay=&country=&merchant=1&online=1&range=0").data
            var sdata = GetWebJson("https://api-otc.huobipro.com/v1/otc/trade/list/public?coinId=2&tradeType=1&currentPage=1&payWay=&country=&merchant=1&online=1&range=0").data
            var count = 0,
                rate = 0
            for (var k = 0; k < 3; k++) {
                count += bdata[k].tradeCount
                count += sdata[k].tradeCount
                rate += bdata[k].price * bdata[k].tradeCount
                rate += sdata[k].price * sdata[k].tradeCount
            }
            exchangeRate = rate / count
        } catch (e) {}
        try {
            usdprice = GetWebJson("https://www.okex.com/api/v1/future_index.do?symbol=btc_usd").future_index
        } catch (e) {}
        var rmb = accountinfo.Info.info.btc.account_rights * usdprice * exchangeRate
        var startcount = accountinfo.Info.info.btc.account_rights - accountinfo.Info.info.btc.profit_real - accountinfo.Info.info.btc.profit_unreal

        // 刷新图表
        chart.add(0, [new Date().getTime(), rmb])
        chart.add(1, [new Date().getTime(), startcount * exchangeRate * usdprice])

        var message = "合约账户当前权益：฿" + accountinfo.Info.info.btc.account_rights + "btc\n" +
            "本周已实现盈亏：฿" + accountinfo.Info.info.btc.profit_real + "btc\n" +
            "未实现盈亏：฿" + accountinfo.Info.info.btc.profit_unreal + "btc\n" +
            "火币OTC汇率：" + exchangeRate.toFixed(2) + "\n" +
            "BTC价格指数：$" + usdprice + "\n" +
            "折算RMB价格：￥" + (usdprice * exchangeRate).toFixed(0) + "\n" +
            "资产折合：¥" + rmb.toFixed(0) + "/ $" + (rmb / exchangeRate).toFixed(0) + "\n" +
            "账户保证金率：" + (accountinfo.Info.info.btc.risk_rate * 100).toFixed(1) + "%\n" +
            _D(new Date().getTime())
        LogStatus(message)

        var nowtime = new Date().getTime()
        while (nxttime < nowtime)
            nxttime += 30 * 60 * 1000
        Sleep(nxttime - nowtime)
    }
}
```

> Detail

https://www.fmz.com/strategy/83189

> Last Modified

2018-03-29 09:51:37
