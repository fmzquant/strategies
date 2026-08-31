
> Name

Simple-Arithmetic-Futures-Grid

> Author

恐龙宝宝

> Strategy Description

**The parameters are very simple. Using BTC as an example, when price enters the long-entry zone the strategy closes shorts, builds a base position, and goes long; when price enters the short-entry zone it closes longs, builds a base position, and goes short, repeating this cycle continuously.**
**Clearly, in crypto markets, no complex model has outperformed a simple grid over the long run.**
**The so-called wealth code is a simple grid plus aggressively buying speculative altcoins.**
**Hopefully, like the earliest martingale systems, this remains a simple, rough, but profitable strategy.**
 ![IMG](https://www.fmz.com/upload/asset/1bdae37080236f7ea7077.png)


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|M|20|Leverage|
|H|50|Initial base-position units|
|n1|true|Per-grid trade size|
|grid|200|Per-grid spacing|
|xia|35000|Long-entry price level|
|shang|60000|Short-entry price level|


> Source (python)

``` python
'''backtest
start: 2021-01-01 00:00:00
end: 2021-11-17 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":2500}]
args: [["H",30],["n1",0.001],["grid",300],["xia",50000]]
'''

def CancelPendingOrders():
    orders = _C(exchanges[0].GetOrders)
    if len(orders)>0:
        for j in range(len(orders)):
            exchanges[0].CancelOrder(orders[j].Id, orders[j])
            j=j+1

def main():
    exchange.SetContractType('swap')
    exchange.SetMarginLevel(M)
    currency=exchange.GetCurrency()
    if _G('buyp') and _G('sellp'):
        buyp=_G('buyp')
        sellp=_G('sellp')
        Log('读取网格价格')
    else:
        ticker=exchange.GetTicker()
        buyp=ticker["Last"]-grid
        sellp=ticker["Last"]+grid
        _G('buyp',buyp)
        _G('sellp',sellp)
        Log('网格数据初始化')
    while True:
            account=exchange.GetAccount()
            ticker=exchange.GetTicker()
            position=exchange.GetPosition()
            orders=exchange.GetOrders()
            if len(position)==0:
                if ticker["Last"]>shang:
                    exchange.SetDirection('sell')
                    exchange.Sell(-1,n1*H)
                    Log(currency,'到达开空区域,买入空头底仓')
                    
                else:
                    exchange.SetDirection('buy')
                    exchange.Buy(-1,n1*H)
                    Log(currency,'到达开多区域,买入多头底仓')
            if len(position)==1:
                if position[0]["Type"]==1:
                    if ticker["Last"]<xia:
                        Log(currency,'空单全部止盈反手')
                        exchange.SetDirection('closesell')
                        exchange.Buy(-1,position[0].Amount)
                    else:
                        orders=exchange.GetOrders()
                        if len(orders)==0:
                            exchange.SetDirection('sell')
                            exchange.Sell(sellp,n1)
                            exchange.SetDirection('closesell')
                            exchange.Buy(buyp,n1)
                        if len(orders)==1:
                            if orders[0]["Type"]==1: #止盈成交
                                Log(currency,'网格减仓,当前份数:',position[0].Amount)
                                CancelPendingOrders()
                                buyp=buyp-grid
                                sellp=sellp-grid
                                LogProfit(account["Balance"])
                            if orders[0]["Type"]==0:
                                Log(currency,'网格加仓,当前份数:',position[0].Amount)
                                CancelPendingOrders()
                                buyp=buyp+grid
                                sellp=sellp+grid
                                LogProfit(account["Balance"])
            
                if position[0]["Type"]==0:
                    if ticker["Last"]>float(shang):
                        Log(currency,'多单全部止盈反手')
                        exchange.SetDirection('closebuy')
                        exchange.Sell(-1,position[0].Amount)
                    else:
                        orders=exchange.GetOrders()
                        if len(orders)==0:
                            exchange.SetDirection('buy')
                            exchange.Buy(buyp,n1)
                            exchange.SetDirection('closebuy')
                            exchange.Sell(sellp,n1)
                        if len(orders)==1:
                            if orders[0]["Type"]==0: #止盈成交
                                Log(currency,'网格减仓,当前份数:',position[0].Amount)
                                CancelPendingOrders()
                                buyp=buyp+grid
                                sellp=sellp+grid
                                LogProfit(account["Balance"])
                            if orders[0]["Type"]==1:
                                Log(currency,'网格加仓,当前份数:',position[0].Amount)
                                CancelPendingOrders()
                                buyp=buyp-grid
                                sellp=sellp-grid
                                LogProfit(account["Balance"])
                            
                    
                
                                     
            

```

> Detail

https://www.fmz.com/strategy/330440

> Last Modified

2021-11-18 21:40:30
