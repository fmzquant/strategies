
> Name

练习01RSI

> Author

3028165668





> Source (python)

``` python

def RSI():
    ticker = exchange.GetTicker()
    account = exchange.GetAccount()
    r = exchange.GetRecords(PERIOD_H1 * 4)
    rsi = TA.RSI(r, 14)
    is_buy = False
    is_sell = False
    if rsi[-1] > 70 and account["Stocks"] > 0:
        id = exchange.Sell(ticker["Buy"], account["Stocks"] * 0.01)
        is_buy = True
    elif rsi[-1] < 30 and account["Balance"] > 0:
        id = exchange.Buy(ticker["Sell"], account["Balance"] / ticker["Sell"] * 0.01)
        is_sell = True


    if is_buy or is_sell:
        Sleep(1000 * 60 * 4)
        
#    if rsi[-1] < 40 and account["Balance"] > 0:
#        id = exchange.Buy(ticker["Buy"], account["Balance"] / ticker["Sell"] * 0.0005)
#    if rsi[-1] > 60 and account["Stocks"] > 0:
#        id = exchange.Sell(ticker["Sell"], account["Stocks"] * 0.0005)
#    if rsi[-1] < 40 and account["Balance"] > 0:
#        id = exchange.Buy(ticker["Buy"], account["Balance"] / ticker["Sell"] * 0.05)
    return
 
def main():
    Log("策略开始 !")
    i = 0
    while True:        #循环
        RSI()       #执行策略主函数
        i = i + 1
        if i % 50 == 0:
            account = exchange.GetAccount()
            Log(account["Balance"], account["Stocks"])
        
'''
def main():
    Log("策略开始 !")
    ticker = exchange.GetTicker()
    account = exchange.GetAccount()
    id = exchange.Buy(ticker["Buy"], 0.01)
    Log(account["Balance"])
    Log(id)
    Sleep(60 * 1000)
'''

```

> Detail

https://www.fmz.com/strategy/288889

> Last Modified

2021-06-09 10:24:00
