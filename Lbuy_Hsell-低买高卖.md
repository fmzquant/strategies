
> Name

Lbuy_Hsell-低买高卖

> Author

sltrain





> Source (python)

``` python
'''backtest
start: 2020-05-31 00:00:00
end: 2020-08-28 00:00:00
period: 1day
exchanges: [{"eid":"huobi","currency":"BTC_USDT"}]
'''

ratio = 0.01
acc = 0
minStock = 0.01

def main():
    global ratio,acc,minStock
    exchanges[0].SetPrecision(2, 3)
    Log('hello sltrain@')
    #Log(exchanges[0].GetAccount())
    tickers = _C(exchanges[0].GetTicker)
    #Log(tickers)   
    while(True):
        tickers_new = _C(exchanges[0].GetTicker)
        if tickers_new.Last > tickers.Last * (1 + ratio):
            acc = _C(exchanges[0].GetAccount)
            id = exchanges[0].Sell(tickers_new.Last, acc.Stocks * ratio)
            Log("id:", id)
        elif tickers_new.Last < tickers.Last * (1 + ratio):
            acc = _C(exchanges[0].GetAccount)
            id = exchanges[0].Buy(tickers_new.Last, (acc.Balance * ratio)/tickers_new.Last)
            Log("id:", id)
        if tickers_new.Last == tickers.Last:
            continue
        tickers = tickers_new 
        Sleep(20*60*1000)
        
        

```

> Detail

https://www.fmz.com/strategy/224579

> Last Modified

2020-08-29 21:22:50
