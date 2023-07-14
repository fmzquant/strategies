
> Name

期货一键对冲插件Hedge-on-two-contracts

> Author

小草

> Strategy Description

可自动立即对冲两个合约，注意加适当的滑价，可能会不成交。仓位较多可分多次点击.

插件可以在交易终端一键启动，不收取费用，方便手动交易。详细介绍：https://www.fmz.com/digest-topic/5051

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Contract_A|this_week|交易合约A|Contract A|
|Contract_B|quarter|交易合约B|Contract B|
|Amount|10|开仓数量|Open Amount|
|Slip|2|滑价|Slip Price|
|Reverse|false|反向交易|Reverse Direction|


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
