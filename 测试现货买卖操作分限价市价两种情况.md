
> Name

测试现货买卖操作分限价市价两种情况

> Author

韬奋量化

> Strategy Description

回测火币数据，以及在wexapp模拟盘交易，都得到类似下面的运行结果：

假如目前买卖的现货币种是BTC_USDT，那么：

限价买入，exchange.Buy(6840, 5)就是以6840的价格买入5个btc。
市价买入，exchange.Buy(-1, 5)就是以市价买入价值5 usdt的btc。(*****请注意，这是4种情况中唯一特殊的地方***)

限价卖出，exchange.Sell(7350, 3)就是以7350的价格卖出3个btc。
市价卖出，exchange.Sell(-1, 3)就是以市价卖出3个btc。

策略代码：https://www.fmz.com/m/edit-strategy/191349

2020年4月5日


=====我是低调的分界线=====

好的交易平台可以让你的策略扶摇直上九万里，通过链接注册可获得两个月VIP5的手续费率优惠：
（现货：挂单0%，吃单0.07%。合约：挂单0%，吃单0.04%）
https://www.kucoin.cc/ucenter/signup?rcode=1wxJ2fQ&lang=zh_CN&utmsource=VIP_TF



> Source (javascript)

``` javascript
/*backtest
start: 2020-01-01 00:00:00
end: 2020-04-01 00:00:00
period: 1d
exchanges: [{"eid":"Huobi","currency":"BTC_USD","balance":1000000,"stocks":0}]
*/

var id, order, buyAmount, lastPrice;

function main() {
    Log(exchange.GetAccount());

    lastPrice = parseInt(exchange.GetTicker().Last);
    id = exchange.Buy(lastPrice + 50, 5); // 限价买入5个BTC，买入价是当前最新价格+50          
    Log(order = exchange.GetOrder(id));
    buyAmount = parseFloat(order.DealAmount);
    Log(exchange.GetAccount());

    Sleep(1000);
    last_price = parseInt(exchange.GetTicker().Last);
    id = exchange.Sell(lastPrice - 50, buyAmount); // 限价卖出5个BTC，卖出价是当前最新价格-50    
    Log(order = exchange.GetOrder(id));
    Log(exchange.GetAccount());

    Sleep(1000);
    id = exchange.Buy(-1, 5); // 市价买入BTC，成交量是5个usdt    
    Sleep(1000);    
    Log(order = exchange.GetOrder(id));
    buyAmount = parseFloat(order.DealAmount);    
    Log(exchange.GetAccount());

    Sleep(1000);    
    id = exchange.Sell(-1, buyAmount); // 市价卖出BTC，成交量是刚才买入的BTC   
    Sleep(1000);    
    Log(order = exchange.GetOrder(id));
    Log(exchange.GetAccount());

}
```

> Detail

https://www.fmz.com/strategy/191349

> Last Modified

2021-02-05 17:09:03
