
> Name

Multi-Platform-Forced-Sliding-Close-at-Best-Bid-Price

> Author

Zero

> Strategy Description

Supports closing positions across multiple platforms at once, selling however many coins are available.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|RetryInterval|5|Retry interval (seconds)|
|SlidePrice|0.3|Sliding value|
|KeepStock|false|Amount of coin to keep|


> Source (javascript)

``` javascript
function cancelAllOrders() {
    var orders = null;
    while (!(orders = exchange.GetOrders())) {
        Sleep(Interval);
    }
    
    if (orders.length > 0) {
        for (var j = 0; j < orders.length; j++) {
            exchange.CancelOrder(orders[j].Id);
            if (j < (orders.length-1)) {
                Sleep(2000);
            }
        }
    }
}

function sellAll() {
    cancelAllOrders();
    var initAccount = _C(exchange.GetAccount);
    Log(exchange.GetName(), exchange.GetCurrency(), initAccount);
    if (initAccount.Stocks == 0) {
        Log("空仓");
        return;
    }
    var remaind = initAccount.Stocks - KeepStock;
    var account = initAccount;
    while (remaind >= 0.001) {
        var ticker = _C(exchange.GetTicker);
        exchange.Sell(ticker.Buy - SlidePrice, remaind);
        Sleep(RetryInterval * 1000);
        cancelAllOrders();
        account = _C(exchange.GetAccount);
        remaind = account.Stocks - KeepStock;
    }
    Log("平均卖出价", (account.Balance - initAccount.Balance) / (initAccount.Stocks - account.Stocks));
    Log(account);
}

function main() {
    for (var i = 0; i < exchanges.length; i++) {
        exchange = exchanges[i];
        sellAll();
    }
} 


```

> Detail

https://www.fmz.com/strategy/99

> Last Modified

2018-03-27 15:55:26
