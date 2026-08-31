
> Name

Original-Martingale-Variant

> Author

恐龙宝宝

> Strategy Description

This was the first simple strategy I wrote after arriving in Macau, and I finished it in about ten minutes. It is a Martingale variant with very small add-on intervals. By combining regular fixed-amount accumulation with gradually widening add-position spacing, it attempts to control liquidation risk, and its risk-reward profile is noticeably better than that of a traditional Martingale.

During the strong bull market in March and April, this Martingale performed very well. At its peak, a small account could double in a day; at one point, 12 USDT on CHR grew to 48 USDT in four days.

Times have changed, however, and that bull market is long gone. In today's market this Martingale can easily turn the user into a nonstop message receiver, which is why I decided to share it openly.

It may still have some live-trading value, but it requires manual market timing. The days when you could switch on a Martingale and simply sit back counting profits are over.
> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|zuoduo|true|Enable long trades|
|zuokong|false|Enable short trades|
|CV|3|Price precision|
|MarginLevel|75|Leverage|
|k|true|Initial entry size|
|n|true|Add-on order size|
|Q|0.03|Take-profit target|
|E|0.0046|Add-position interval|


> Source (python)

``` python
'''backtest
start: 2021-05-01 00:00:00
end: 2021-05-14 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"EOS_USDT","balance":1000}]
args: [["zuokong",true],["n",3],["E",0.02]]
'''
def main():
    while True:
        exchange.SetContractType("swap")
        exchange.SetMarginLevel(MarginLevel)
        ticker = _C(exchange.GetTicker)
        account = _C(exchange.GetAccount)
        position = _C(exchange.GetPosition)
        if zuoduo:
            if len(position) == 0:   
                    exchange.SetDirection("buy")
                    exchange.Buy(-1, k, "开多")
            if len(position) > 0:
                if position[0].Type==0:
                    
                    if position[0].Price+Q<ticker["Last"]:
                        exchange.SetDirection("closebuy")
                        exchange.Sell(-1, position[0].Amount) 
                        account = exchange.GetAccount()
                        LogProfit(account["Balance"]) 
                    fx=(E/n)*position[0].Amount  
                    if position[0].Profit<position[0].Margin * -fx :
                        #轮询加仓
                            exchange.SetDirection("buy")
                            exchange.Buy(-1, k)
                            LogProfit(account["Balance"])     
        if zuokong:
            if len(position) == 0:   
                    exchange.SetDirection("sell")
                    exchange.Sell(-1, k, "开空")
            if len(position) > 0:
                if position[0].Type == 1 :
                    fp=Q*position[0].Amount
                    if position[0].Profit > 0.01*fp*ticker["Last"] :
                        exchange.SetDirection("closesell")
                        exchange.Buy(-1, position[0].Amount) 
                        account = exchange.GetAccount()
                        LogProfit(account["Balance"]) 
                    fx=(E/n)*position[0].Amount  
                    if position[0].Profit<position[0].Margin * -fx :
                        #轮询加仓
                            exchange.SetDirection("sell")
                            exchange.Sell(-1, n)
                            LogProfit(account["Balance"])
        
        Sleep(3000)
```

> Detail

https://www.fmz.com/strategy/293373

> Last Modified

2022-03-02 15:39:53
