
> Name

Fixed-Interval-Batch-Order-Placement-Plugin

> Author

小草

> Strategy Description

This plugin places pending orders at fixed price intervals and can be used for opening and closing futures positions.
The plugin can be started with one click in the trading terminal, is free to use, and is convenient for manual trading. Detailed introduction: https://www.fmz.com/digest-topic/5051

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Type|0|Order type: buy order|sell order|buy to close|sell to close|
|Start_Price|7000|Starting price|
|Spread|5|Spacing|
|N|5|Number of pending orders|
|Amount|0.1|Order amount per order|
|Amount_Step|false|Incremental order amount|

> Source (javascript)

``` javascript

function main() {
    var ticker = exchange.GetTicker()
    if(!ticker){
        return  'Unable to get price'
    }
    for(var i=0;i<N;i++){
        if(Type == 0){
            if(exchange.GetName().startsWith('Futures')){
                exchange.SetDirection('buy')
            }
            exchange.Buy(Start_Price-i*Spread,Amount+i*Amount_Step)
        }else if(Type == 1){
            if(exchange.GetName().startsWith('Futures')){
                exchange.SetDirection('sell')
            }
            exchange.Sell(Start_Price+i*Spread,Amount+i*Amount_Step)
        }else if(Type == 2){
            exchange.SetDirection('closesell')
            exchange.Buy(Start_Price-i*Spread,Amount+i*Amount_Step)
        }
        else if(Type == 3){
            exchange.SetDirection('closebuy')
            
            exchange.Sell(Start_Price+i*Spread,Amount+i*Amount_Step)
        }
        Sleep(500)
    }
    return 'order complete'
}
```

> Detail

https://www.fmz.com/strategy/190017

> Last Modified

2020-04-02 11:26:19
