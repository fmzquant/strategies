
> Name

BitMEX-Simple-Test

> Author

发明者量化

> Strategy Description
BitMEX is now integrated, with support for the full platform API and IO extensions.
> Source (javascript)

``` javascript
// 只支持实盘
function main() {
    exchange.SetContractType("XBTUSD")
    Log(_C(exchange.GetAccount))
    Log(_C(exchange.GetTicker))
    Log(_C(exchange.GetDepth))
    Log(_C(exchange.GetRecords))
    Log(_C(exchange.GetTrades))
    // IO Test
    Log(_C(exchange.IO, "api", "GET", "user/affiliateStatus"))

    Log(_C(exchange.SetMarginLevel, 10))
    exchange.SetDirection("buy")
    var orderId = exchange.Buy(-1, 3)
    if (orderId) {
        Log(_C(exchange.GetOrder, orderId))
    }
    Log(_C(exchange.GetPosition))
}
```

> Detail

https://www.fmz.com/strategy/40289

> Last Modified

2017-05-08 17:20:34
