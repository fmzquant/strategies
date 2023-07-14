
> Name

经典均线策略

> Author

Zero

> Strategy Description

"Talk is cheap. Show me the code"

教学性质, 实盘慎用.


注: ` 策略使用了交易模板类库`

`希望新手从此策略入门, 一步步学习编写策略, 并体验到模拟与真实环境对交易系统的影响`

https://dn-filebox.qbox.me/fb4d0c7d773ca83e9d0230927705d419dc0bbeaa.png

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|FastPeriod|5|入市快线周期|
|SlowPeriod|15|入市慢线周期|
|EnterPeriod|2|入市观察期|
|ExitFastPeriod|7|离市快线周期|
|ExitSlowPeriod|15|离市慢线周期|
|ExitPeriod|true|离市观察期|
|PositionRatio|0.8|仓位比例|
|StopLossRatio|0.05|止损比率|
|Interval|10|轮询周期(秒)|


> Source (javascript)

``` javascript
/*backtest
start: 2019-01-01 00:00:00
end: 2019-07-01 00:00:00
period: 1d
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD"}]
*/

function main() {
    var STATE_IDLE  = -1;
    var state = STATE_IDLE;
    var entryPrice = 0;
    var initAccount = _C(exchange.GetAccount);
    Log(initAccount);
    while (true) {
        if (state === STATE_IDLE) {
            var n = $.Cross(FastPeriod, SlowPeriod);
            if (Math.abs(n) >= EnterPeriod) {
                var account = _C(exchange.GetAccount);
                var ticker = _C(exchange.GetTicker);
                var obj = n > 0 ? $.Buy(_N(account.Balance * PositionRatio / ticker.Sell, 3)) : $.Sell(_N(account.Stocks * PositionRatio, 3));
                if (obj) {
                    opAmount = obj.amount;
                    entryPrice = obj.price;
                    state = n > 0 ? PD_LONG : PD_SHORT;
                    Log("开仓详情", obj, "交叉周期", n);
                }
            }
        } else {
            var n = $.Cross(ExitFastPeriod, ExitSlowPeriod);
            var needCover = Math.abs(n) >= ExitPeriod && ((state === PD_LONG && n < 0) || (state === PD_SHORT && n > 0));
            if (needCover) {
                Log("离市平仓");
            } else {
                var ticker = _C(exchange.GetTicker);
                if (state === PD_LONG) {
                    if (ticker.Buy < entryPrice*(1-StopLossRatio)) {
                        needCover = true;
                        Log("止损平仓");
                    }
                } else {
                    if (ticker.Sell > entryPrice*(1+StopLossRatio)) {
                        needCover = true;
                        Log("止损平仓");
                    }
                }
            }
            if (needCover) {
                var nowAccount = _C(exchange.GetAccount);
                var obj = state === PD_LONG ? $.Sell(_N(nowAccount.Stocks - initAccount.Stocks, 3)) : $.Buy(_N(initAccount.Stocks - nowAccount.Stocks, 3));
                state = STATE_IDLE;
                nowAccount = _C(exchange.GetAccount);
                LogProfit(nowAccount.Balance - initAccount.Balance, '钱:', nowAccount.Balance, '币:', nowAccount.Stocks, '平仓详情:', obj, "交叉周期", n);
            }
        }
        Sleep(Interval*1000);
    }
}
```

> Detail

https://www.fmz.com/strategy/12348

> Last Modified

2019-10-08 17:00:12
