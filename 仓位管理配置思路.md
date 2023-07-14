
> Name

仓位管理配置思路

> Author

Zer3192





> Source (python)

``` python
'''backtest
start: 2017-06-26 00:00:00
end: 2022-04-6 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
'''
def main():
    exchange.SetMarginLevel(20)
    exchange.SetContractType("swap")
    exchange.SetDirection("buy")
    exchange.SetDirection("sell")
    ticker = exchange.GetTicker()
    Log(ticker)
    
    exchange.SetDirection("buy")
    exchange.Buy(ticker["Last"] /1, 0.001)
    exchange.Buy(ticker["Last"] /1.1, 0.001)
    exchange.Buy(ticker["Last"] /1.2, 0.002)
    exchange.Buy(ticker["Last"] /1.3, 0.002)
    exchange.Buy(ticker["Last"] /1.4, 0.003)
    exchange.Buy(ticker["Last"] /1.5, 0.003)
    exchange.Buy(ticker["Last"] /1.6, 0.003)
    exchange.Buy(ticker["Last"] /1.7, 0.005)
    exchange.Buy(ticker["Last"] /1.8, 0.005)
    exchange.Buy(ticker["Last"] /1.9, 0.005)
    exchange.Buy(ticker["Last"] /2, 0.005)
    exchange.Buy(ticker["Last"] /2.1, 0.008)
    exchange.Buy(ticker["Last"] /2.2, 0.008)
    exchange.Buy(ticker["Last"] /2.3, 0.008)
    exchange.Buy(ticker["Last"] /2.4, 0.008)
    exchange.Buy(ticker["Last"] /2.5, 0.008)
    exchange.Buy(ticker["Last"] /2.6, 0.013)
    exchange.Buy(ticker["Last"] /2.7, 0.013)
    exchange.Buy(ticker["Last"] /2.8, 0.013)
    exchange.Buy(ticker["Last"] /2.9, 0.013)
    exchange.Buy(ticker["Last"] /3, 0.013)
    exchange.Buy(ticker["Last"] /3.1, 0.013)
    exchange.Buy(ticker["Last"] /3.2, 0.013)
    exchange.Buy(ticker["Last"] /3.3, 0.021)
    exchange.Buy(ticker["Last"] /3.4, 0.021)
    exchange.Buy(ticker["Last"] /3.5, 0.021) 
    exchange.Buy(ticker["Last"] /3.6, 0.021)
    exchange.Buy(ticker["Last"] /3.7, 0.021)
    exchange.Buy(ticker["Last"] /3.8, 0.021) 
    exchange.Buy(ticker["Last"] /3.9, 0.021) 
    exchange.Buy(ticker["Last"] /4.0, 0.034) 
    exchange.Buy(ticker["Last"] /4.1, 0.034) 
    exchange.Buy(ticker["Last"] /4.2, 0.034)
    exchange.Buy(ticker["Last"] /4.3, 0.034) 
    exchange.Buy(ticker["Last"] /4.4, 0.034)
    exchange.Buy(ticker["Last"] /4.5, 0.034) 
    exchange.Buy(ticker["Last"] /4.6, 0.034)
    exchange.Buy(ticker["Last"] /4.7, 0.034)  
    exchange.SetDirection("sell")
    exchange.Sell(ticker["Last"] * 1, 0.001)
    exchange.Sell(ticker["Last"] * 1.1, 0.002)
    exchange.Sell(ticker["Last"] * 1.2, 0.002)
    exchange.Sell(ticker["Last"] * 1.3, 0.003)
    exchange.Sell(ticker["Last"] * 1.4, 0.003)
    exchange.Sell(ticker["Last"] * 1.5, 0.003)
    exchange.Sell(ticker["Last"] * 1.6, 0.005)
    exchange.Sell(ticker["Last"] * 1.7, 0.005)
    exchange.Sell(ticker["Last"] * 1.8, 0.005)
    exchange.Sell(ticker["Last"] * 1.9, 0.005)
    exchange.Sell(ticker["Last"] * 2, 0.008)
    exchange.Sell(ticker["Last"] * 2.1, 0.008)
    exchange.Sell(ticker["Last"] * 2.2, 0.008)
    exchange.Sell(ticker["Last"] * 2.3, 0.008)
    exchange.Sell(ticker["Last"] * 2.4, 0.008)
    exchange.Sell(ticker["Last"] * 2.5, 0.013)
    exchange.Sell(ticker["Last"] * 2.6, 0.013)
    exchange.Sell(ticker["Last"] * 2.7, 0.013)
    exchange.Sell(ticker["Last"] * 2.8, 0.013)
    exchange.Sell(ticker["Last"] * 2.9, 0.013)
    exchange.Sell(ticker["Last"] * 3, 0.013)
    exchange.Sell(ticker["Last"] * 3.1, 0.021)
    exchange.Sell(ticker["Last"] * 3.2, 0.021)
    exchange.Sell(ticker["Last"] * 3.3, 0.021)
    exchange.Sell(ticker["Last"] * 3.4, 0.021)
    exchange.Sell(ticker["Last"] * 3.5, 0.021)
    exchange.Sell(ticker["Last"] * 3.6, 0.021)
    exchange.Sell(ticker["Last"] * 3.7, 0.021)
    exchange.Sell(ticker["Last"] * 3.8, 0.034)
    exchange.Sell(ticker["Last"] * 3.9, 0.034) 
    exchange.Sell(ticker["Last"] * 4.0, 0.034)
    exchange.Sell(ticker["Last"] * 4.1, 0.034)
    exchange.Sell(ticker["Last"] * 4.2, 0.034) 
    exchange.Sell(ticker["Last"] * 4.3, 0.034)  
    exchange.Sell(ticker["Last"] * 4.4, 0.034)
    exchange.Sell(ticker["Last"] * 4.5, 0.034)  
    Log("orders", exchange.GetOrders())
    Sleep(1000)

```

> Detail

https://www.fmz.com/strategy/353754

> Last Modified

2022-04-08 07:21:21
