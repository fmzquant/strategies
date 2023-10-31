
> Name

OKX划转资金

> Author

发明者量化



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|From|0|From: 资金账户|交易账户|
|To|0|To: 交易账户|资金账户|
|Amount|100|Amount|
|Ccy|USDT|Ccy|


> Source (javascript)

``` javascript
function main() {
    let f = ["6", "18"][From]
    let t = ["18", "6"][To]
    return exchange.IO("api", "POST", "/api/v5/asset/transfer", "ccy="+Ccy+"&from="+f+"&to="+t+"&amt="+Amount)
}
```

> Detail

https://www.fmz.com/strategy/393026

> Last Modified

2023-10-23 12:58:31
