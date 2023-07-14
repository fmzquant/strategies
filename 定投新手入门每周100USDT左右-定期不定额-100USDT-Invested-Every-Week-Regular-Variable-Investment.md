
> Name

定投新手入门每周100USDT左右-定期不定额-100USDT-Invested-Every-Week-Regular-Variable-Investment

> Author

jfyh5388

> Strategy Description

每周定投100USDT左右，定期不定额，跌了多买，涨了少买，收益率优于定额



> Source (python)

``` python
def main():
    amountAll = 0                                              #持有总量
    cost = 0                                                   #成本
    marketValueCurrent = 0                                     #当前持有总市值
    marketValueExpected = 0                                    #当前期望总市值
    rateOfReturn = 0                                           #收益率
    eachBuy = 100
    while True:
        marketValueExpected = marketValueExpected + eachBuy        #计算当前期望总市值
        ticker = exchange.GetTicker()
        price = ticker['Last']                                 #获得当前价格
        amount = marketValueExpected / price - amountAll       #计算本次买入量
        if amount > 0:
            exchange.Buy(price,amount)                         #买入         
        else:
            amount = 0
        amountAll = amountAll + amount                         #计算持有总量
        cost = cost + amount * price                           #计算总成本
        marketValueCurrent = amountAll * price                 #计算当前持有总市值
        rateOfReturn = (marketValueCurrent - cost) / cost      #计算收益率
        Log("此次投入金额：", amount * price, "本金：", cost,"当前总持有量", amountAll,"当前总市值：", marketValueCurrent, "收益率:", rateOfReturn * 100,"%" ,"当前价格:", price, )
        Sleep(7 * 24 * 60 * 60 * 1000)                         #等待一周
                    
```

> Detail

https://www.fmz.com/strategy/260056

> Last Modified

2021-04-16 16:54:06
