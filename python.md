
> Name

python

> Author

Zer3192





> Source (python)

``` python
'''backtest
start: 2021-06-26 00:00:00
end: 2022-01-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
'''
def main():
    exchange.SetMarginLevel(7)
    exchange.SetContractType("swap")
    exchange.SetDirection("buy")
    ticker = exchange.GetTicker()
    Log(ticker)
    exchange.Buy(ticker["Last"] - 100, 0.001)
    exchange.Buy(ticker["Last"] - 500, 0.001)
    exchange.Buy(ticker["Last"] -1000, 0.002)
    exchange.Buy(ticker["Last"] - 1500, 0.003)
    exchange.Buy(ticker["Last"] - 2000, 0.005)
    exchange.Buy(ticker["Last"] - 2500, 0.008)
    exchange.Buy(ticker["Last"] - 3000, 0.013)
    exchange.Buy(ticker["Last"] - 3500, 0.021)
    exchange.Buy(ticker["Last"] - 4000, 0.034)
    exchange.Buy(ticker["Last"] - 4500, 0.055)
    exchange.Buy(ticker["Last"] - 5000, 0.089)
    exchange.Buy(ticker["Last"] - 5500, 0.144)
    exchange.Buy(ticker["Last"] - 6000, 0.233)
    exchange.Buy(ticker["Last"] - 6500, 0.377)
    exchange.Buy(ticker["Last"] - 7000, 0.610)
    exchange.Buy(ticker["Last"] - 7500, 0.987)
    exchange.Buy(ticker["Last"] - 8000, 1.597)
    exchange.Buy(ticker["Last"] - 8500, 2.584)
    
    exchange.SetContractType("swap")
    exchange.SetDirection("sell")
    ticker = exchange.GetTicker()
    Log(ticker)
    exchange.Sell(ticker["Last"] + 100, 0.001)
    exchange.Sell(ticker["Last"] + 500, 0.001)
    exchange.Sell(ticker["Last"] + 1000, 0.002)
    exchange.Sell(ticker["Last"] + 1500, 0.003)
    exchange.Sell(ticker["Last"] + 2000, 0.005)
    exchange.Sell(ticker["Last"] + 2500, 0.008)
    exchange.Sell(ticker["Last"] + 3000, 0.013)
    exchange.Sell(ticker["Last"] + 3500, 0.021)
    exchange.Sell(ticker["Last"] + 4000, 0.034)
    exchange.Sell(ticker["Last"] + 4500, 0.055)
    exchange.Sell(ticker["Last"] + 5000, 0.089)
    exchange.Sell(ticker["Last"] + 5500, 0.144)
    exchange.Sell(ticker["Last"] + 6000, 0.233)
    exchange.Sell(ticker["Last"] + 6500, 0.377)
    exchange.Sell(ticker["Last"] + 7000, 0.610)
    exchange.Sell(ticker["Last"] + 7500, 0.987)
    exchange.Sell(ticker["Last"] + 8000, 1.597)
    exchange.Sell(ticker["Last"] + 8500, 2.584)
    
    Log("orders", exchange.GetOrders())
    Sleep(1000)

```

> Detail

https://www.fmz.com/strategy/343032

> Last Modified

2022-01-30 17:35:13
