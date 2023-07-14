
> Name

交易所上新币第一时间挂单机器人

> Author

小草

> Strategy Description

会按固定间隔摆出挂单，用于交易所上新币第一时间挂单机器人。由于逻辑简单，未测试

## 原理：

添加交易对后开始运行，不断产尝试获取行情，如果能获取到行情，说明开始交易，策略会挂单，获取不到说明未开放，继续重试等待。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Type|0|下单类型: 买单|卖单|
|Start_Price|7000|开始价格|
|Spread|5|间隔|
|N|5|挂单个数|
|Amount|0.1|每单挂单量|
|Amount_Step|false|挂单递增量|


> Source (javascript)

``` javascript

function main() {
    exchange.SetTimeout(500) //保证较快的返回null,继续重试获取行情
    while(true){
        var ticker = exchange.GetTicker()
        if(!ticker){
            continue
        }else{
            Log('获取到行情,开始下单')
            for(var i=0;i<N;i++){
               if(Type == 0){
                    exchange.Buy(Start_Price-i*Spread,Amount+i*Amount_Step)
               }else{
                    exchange.Sell(Start_Price+i*Spread,Amount+i*Amount_Step)
               }
            }
            Log('完成挂单,退出程序')
            return
        }
    }
}

```

> Detail

https://www.fmz.com/strategy/194206

> Last Modified

2020-10-16 10:20:29
