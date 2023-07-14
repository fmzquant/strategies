
> Name

币安出售所有山寨币

> Author

Zero



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|quoteZone|0|交易区: BTC|ETH|BNB|USDT|


> Source (javascript)

``` javascript
function main() {
    var quoteCurrency = ['BTC', 'ETH', 'BNB', 'USDT'][quoteZone];
    Log("当前交易区", quoteCurrency);
    var symbols = JSON.parse(_C(HttpQuery, "https://api.binance.com/api/v1/exchangeInfo")).symbols;
    _.each(_C(exchange.GetAccount).Info.balances, function(ele) {
        if (ele.asset == quoteCurrency) {
            return
        }
        var totalV = parseFloat(ele.free) + parseFloat(ele.locked);
        if (totalV == 0) {
            return;
        }
        var cfg = _.findWhere(symbols, {symbol: ele.asset+quoteCurrency});
        if (!cfg) {
            Log("没有找到", ele.asset, "交易对的配置", ele);
            return;
        }
        var filter = _.findWhere(cfg.filters, {filterType: "LOT_SIZE"});
        if (!filter) {
            return;
        }
        
        var v = _N(parseInt(totalV/filter.stepSize)*filter.stepSize, cfg.baseAssetPrecision);
        if (v > 0) {
            Log(ele, "stepSize", filter.stepSize);
            exchange.IO("currency", ele.asset + "_"+quoteCurrency);
            while (true) {
                var orders = _C(exchange.GetOrders);
                _.each(orders, function(order) {
                    exchange.CancelOrder(order.Id);
                });
                if (orders.length == 0) {
                    break;
                }
            }
            exchange.Sell(-1, v);
            Log(ele);
        }
    });
    Log("操作完成, 当前", quoteCurrency, "数量", _C(exchange.GetAccount).Balance);
}
```

> Detail

https://www.fmz.com/strategy/97629

> Last Modified

2018-06-11 17:56:50
