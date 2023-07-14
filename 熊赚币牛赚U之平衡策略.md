
> Name

熊赚币牛赚U之平衡策略

> Author

VIC

> Strategy Description

* 巴菲特理念的钱币平衡策略的合约版，默认直接半仓做多合约。
* 币安BUSD没有挂单手续费，可以极限的缩小平衡处理的间距，吃到最大的利润和手续费返还。
* 原理和代码都很简单,借鉴了大佬们的写法,提前计算挂单点位、手数进行挂单，理论上本金越大，收益率越接近极限值。
* 低于1000U不建议跑,最低订单价值的限制导致挂单差距太大.
* 有利润的前提是币价上涨或者震荡。
* 可以复制直接回测
* 资金容量大,缺点就是需要震荡或者慢牛的市场,长期的熊市会累计较多的多头仓位,但不会爆仓.
* 最后说一句,尝试过了马丁的负期望,高频套利的高竞争,也许回归价值投资才是最终的胜利之道.
* 欢迎点头像加我VX交流此策略

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|pricePrecision|3|价格精度|
|amountPrecision|2|下单精度|
|linjie|15|临界价值|
|leverage|10|杠杆初始|


> Source (javascript)

``` javascript


/*backtest
start: 2019-12-01 00:00:00
end: 2022-02-07 23:59:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT","balance":100000}]
args: [["pricePrecision",2],["amountPrecision",3],["linjie",30]]
*/

function cancelAll() {
    while (1) {
        var orders = _C(exchange.GetOrders)
        if (orders.length == 0) {
            break
        }
        for (var i = 0; i < orders.length; i++) {
            exchange.CancelOrder(orders[i].Id, orders[i].Id)
            Sleep(100)
        }
        Sleep(100)
    }
}
function onexit() {
    //
    cancelAll()
}

function main() {
    exchange.SetContractType("swap")
    exchange.SetPrecision(pricePrecision, amountPrecision) //精度
    exchange.SetMarginLevel(leverage) //杠杆
    //LogProfitReset()
    LogReset(1)
    var buyOrderId
    var sellOrderId
    while (1) {
        var pos = _C(exchange.GetPosition)
        if (pos.length > 0) {
            var Mar = pos[0].Margin //保证金
        } else {
            var Mar = 0
        }

        var MarginLevel = leverage //杠杆
        var account = _C(exchange.GetAccount)
        var Bala = account.Balance //可用余额
        var Bal = Bala - Mar * (MarginLevel - 1) //去掉仓位的余额
        var ticker = _C(exchange.GetTicker)
        var price = ticker.Last //最新价
        var Qian = Mar + Bala
        LogStatus("币价：", price,"权益:",Qian)
        var orders = _C(exchange.GetOrders)
        if (orders.length == 0) { //没有订单
            if (Mar * MarginLevel - Bal > 2 * linjie) { //仓位价值多于余额 //临界价值
                exchange.SetDirection("closebuy")
                var Amount = 0.5 * (Mar * MarginLevel - Bal) / price
                exchange.Sell(-1, Amount)
            } else if (Bal - Mar * MarginLevel > 2 * linjie) { //余额多于仓位价值 //临界价值
                var Amount = 0.5 * (Bal - Mar * MarginLevel) / price
                exchange.SetDirection("buy")
                exchange.Buy(-1, Amount)
            } else {//状态平衡时双向挂单
                var Bprice = price * (Bal - linjie) / (Mar * leverage)
                var BAmount = 0.5 * linjie / Bprice
                exchange.SetDirection("buy")
                buyOrderId = exchange.Buy(Bprice, BAmount)
                var Sprice = price * (Bal - (-linjie)) / (Mar * leverage)
                var SAmount = 0.5 * linjie / Sprice
                exchange.SetDirection("closebuy")
                sellOrderId = exchange.Sell(Sprice, SAmount)
            }


        } else { //有订单
            var isFindBuyId = false
            var isFindSellId = false
            //Log("初始状态")
            for (var i = 0; i < orders.length; i++) {

                if (buyOrderId == orders[i].Id) {
                    isFindBuyId = true
                    //Log("有买单")
                }
                if (sellOrderId == orders[i].Id) {
                    isFindSellId = true
                    //Log("有卖单")
                }
            }
            if (!isFindBuyId || !isFindSellId) { //有一方成交,取消订单进入新循环
                cancelAll()
                var Qian = Mar + Bala
                LogProfit(Qian)
                //LogStatus("币价：", price)
            }

        }
        Sleep(5000)
    }
}
```

> Detail

https://www.fmz.com/strategy/339698

> Last Modified

2022-02-09 20:08:54
