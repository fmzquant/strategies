
> Name

Hedge-on-two-contracts

> Author

小草

> Strategy Description

Can automatically hedge two contracts immediately. Be sure to add an appropriate slippage value, otherwise the orders may not fill. If the position size is large, you can click multiple times.

This plugin can be launched with one click from the trading terminal at no charge, making manual trading more convenient. Detailed introduction: https://www.fmz.com/digest-topic/5051

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Contract_A|this_week|Contract A|
|Contract_B|quarter|Contract B|
|Amount|10|Open amount|
|Slip|2|Slippage|
|Reverse|false|Reverse direction|


> Source (javascript)

``` javascript

function main(){
    exchange.SetContractType(Reverse ? Contract_B : Contract_A)
    var ticker_A = exchange.GetTicker()
    if(!ticker_A){return 'Unable to get quotes'}
    exchange.SetDirection('buy')
    var id_A = exchange.Buy(ticker_A.Sell+Slip, Amount)
    exchange.SetContractType(Reverse ? Contract_B : Contract_A)
    var ticker_B = exchange.GetTicker()
    if(!ticker_B){return 'Unable to get quotes'}
    exchange.SetDirection('sell')
    var id_B = exchange.Sell(ticker_B.Buy-Slip, Amount)
    if(id_A){
        exchange.SetContractType(Reverse ? Contract_B : Contract_A)
        exchange.CancelOrder(id_A)
    }
    if(id_B){
        exchange.SetContractType(Reverse ? Contract_B : Contract_A)
        exchange.CancelOrder(id_B)
    }
    return 'Position: ' + JSON.stringify(exchange.GetPosition())
}

```

> Detail

https://www.fmz.com/strategy/191348

> Last Modified

2020-03-24 10:52:08
