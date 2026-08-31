
> Name

Cover-all-contracts

> Author

小草

> Strategy Description

Close all futures positions for the current trading pair.
Closing method: using closed long positions as an example, the script repeatedly places a sell order at the best ask, cancels it after 0.5 seconds, and continues placing new best-ask orders until the position is fully closed. Each order uses the full currently closable position size.

The plugin can be launched with one click from the trading terminal free of charge, making manual trading more convenient. Detailed introduction: https://www.fmz.com/digest-topic/5051

> Source (javascript)

``` javascript

function main(){
    while(ture){
        var pos = exchange.GetPosition()
        var ticker = exchange.GetTicekr()
        if(!ticker){return '无法获取ticker'}
        if(!pos || pos.length == 0 ){return '已无持仓'}
        for(var i=0;i<pos.length;i++){
            if(pos[i].Type == PD_LONG){
                exchange.SetContractType(pos[i].ContractType)
                exchange.SetDirection('closebuy')
                exchange.Sell(ticker.Buy, pos[i].Amount - pos[i].FrozenAmount)
            }
            if(pos[i].Type == PD_SHORT){
                exchange.SetContractType(pos[i].ContractType)
                exchange.SetDirection('closesell')
                exchange.Buy(ticker.Sell, pos[i].Amount - pos[i].FrozenAmount)
            }
        }
        var orders = exchange.Getorders()
        Sleep(500)
        for(var j=0;j<orders.length;j++){
            if(orders[i].Status == ORDER_STATE_PENDING){
                exchange.CancelOrder(orders[i].Id)
            }
        }
    }
}

```

> Detail

https://www.fmz.com/strategy/191363

> Last Modified

2020-04-02 09:40:01
