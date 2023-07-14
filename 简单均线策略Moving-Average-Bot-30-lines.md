
> Name

简单均线策略Moving-Average-Bot-30-lines

> Author

小草

> Strategy Description

"Talk is cheap. Show me the code"

Just for learning, Be carefully when using in real market.

Only run  on digital currency exchanges.

Note: this strategy included template. (function with $.)

Beginers can start with this strategy, learn how to code, know the difference between backtesting and real market.

https://dn-filebox.qbox.me/fb4d0c7d773ca83e9d0230927705d419dc0bbeaa.png

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Slippage|0.1|Slippage|
|FastPeriod|5|fast line periods|
|SlowPeriod|15|slow line periods|
|EnterPeriod|2|observe periods|
|Interval|120|Interval time(second)|


> Source (javascript)

``` javascript
/*backtest
start: 2020-10-11 00:00:00
end: 2020-10-11 23:59:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

start = false
function main() {
    Log('started');
    var initAccount = _C(exchange.GetAccount);
    var ticker = exchange.GetTicker();
    var InitValue = (initAccount.Stocks + initAccount.FrozenStocks)*ticker.Last + initAccount.Balance + initAccount.FrozenBalance;
    while (true) {
        var records = _C(exchange.GetRecords, PERIOD_M15);
        if(!start){
            Log(records[0], records.length)
            start = true
        }
        ticker =_C(exchange.GetTicker);
        var FastRecords = TA.MA(records,FastPeriod);
        var SlowRecords = TA.MA(records,SlowPeriod);
        var NowAccount = _C(exchange.GetAccount);
        var n = _Cross(FastRecords, SlowRecords);
        if (n >= EnterPeriod && NowAccount.Balance > 0) {
            var Price = _N(ticker.Sell+Slippage, 2);
            var Amount = _N(0.99*NowAccount.Balance/Price, 3);
            if(Amount>0.1){
               var id = exchange.Buy(Price, Amount);
               if(exchange.GetOrders(id).Status == ORDER_STATE_PENDING){exchange.CancelOrder(id);}
               LogProfit((NowAccount.Stocks + NowAccount.FrozenStocks)*ticker.Last + NowAccount.Balance + NowAccount.FrozenBalance - InitValue);
            }
        }
        if(n <= -EnterPeriod && NowAccount.Stocks > 0) {
            var Price = _N(ticker.Buy-Slippage, 2);
            var Amount = _N(NowAccount.Stocks, 3);
            if(Amount>0.1){
                var id = exchange.Sell(Price, Amount);
                if(exchange.GetOrders(id).Status == ORDER_STATE_PENDING){exchange.CancelOrder(id);}
                LogProfit((NowAccount.Stocks + NowAccount.FrozenStocks)*ticker.Last + NowAccount.Balance + NowAccount.FrozenBalance - InitValue);
            }
        }
        if(!IsVirtual()){
            Sleep(Interval*1000)
        }
    }
}
```

> Detail

https://www.fmz.com/strategy/103070

> Last Modified

2020-10-13 14:51:55
