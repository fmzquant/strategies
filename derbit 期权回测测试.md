
> 策略名称

derbit 期权回测测试

> 策略作者

发明者量化

> 策略描述

- 模拟derbit的期权买卖逻辑
- 支持买入卖入期权
- 因为行权需要与期货价格结合，暂不支持行权，实盘可通过IO接口进行行权



> 源码 (javascript)

``` javascript
/*backtest
start: 2020-06-08 00:00:00
end: 2020-08-05 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Deribit","currency":"BTC_USD"}]
*/

function main() {
    exchange.SetContractType('BTC-7AUG20-12750-C');
    var ticker = exchange.GetTicker();
    Log(ticker);
    exchange.SetDirection("sell");
    var orderId = exchange.Sell(ticker.Sell, 10);
    Log(exchange.GetAccount());
    Log(exchange.GetOrders());
    exchange.CancelOrder(orderId);
    Log(exchange.GetAccount());
    
    
    exchange.Sell(ticker.Buy, 10);
    Log(exchange.GetAccount());
    Log(exchange.GetPosition());
    ticker = exchange.GetTicker();
    exchange.SetDirection("closesell");
    exchange.Buy(ticker.Sell, 10);
    Log(exchange.GetAccount());
    Log(exchange.GetPosition());
    
    
    
    ticker = exchange.GetTicker();
    Log(ticker);
    exchange.SetDirection("buy");
    orderId = exchange.Buy(ticker.Buy, 10);
    Log(exchange.GetAccount());
    exchange.CancelOrder(orderId);
    Log(exchange.GetAccount());
    
    
    exchange.Buy(ticker.Sell, 10);
    Log(exchange.GetAccount());
    Log(exchange.GetPosition());
    ticker = exchange.GetTicker();
    exchange.SetDirection("closebuy");
    exchange.Sell(ticker.Buy, 10);
    Log(exchange.GetAccount());
    Log(exchange.GetPosition());
}
```

> 策略出处

https://www.fmz.com/strategy/222436

> 更新时间

2020-08-07 15:31:28
