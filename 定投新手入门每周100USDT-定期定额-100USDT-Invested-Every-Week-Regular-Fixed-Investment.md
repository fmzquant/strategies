
> Name

定投新手入门每周100USDT-定期定额-100USDT-Invested-Every-Week-Regular-Fixed-Investment

> Author

jfyh5388

> Strategy Description

每周定投100USDT，定期定额



> Source (python)

``` python
def main():
    amountAll = 0                                              #持有总量
    cost = 0                                                   #成本
    marketValueCurrent = 0                                     #当前持有总市值
    rateOfReturn = 0                                           #收益率
    while True:
        ticker = exchange.GetTicker()
        price = ticker['Last']                                 #获得当前价格
        amount = 100 / price                                   #计算本次买入量
        exchange.Buy(price,amount)                             #买入
        amountAll = amountAll + amount                         #计算持有总量
        cost = cost + 100                                      #计算总成本
        marketValueCurrent = amountAll * price                 #计算当前持有总市值
        rateOfReturn = (marketValueCurrent - cost) / cost      #计算收益率        
        Log("此次投入金额：", 100, "本金：", cost, "当前总市值：", marketValueCurrent, "收益率:", rateOfReturn * 100,"%","当前价格",price)
        Sleep(7 * 24 * 60 * 60 * 1000)                         #等待一周
                    
```

> Detail

https://www.fmz.com/strategy/260013

> Last Modified

2021-04-06 08:35:55
