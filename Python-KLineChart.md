
> Name

Python-KLineChart

> Author

发明者量化

> Strategy Description

 平台(Javascript/Python语言)开通KLineChart支持, 支持Pine语言全部画图功能(参数保持一致), 支持自定义买卖信号
 下面是一个演示的例子
 
 参考文档 https://www.fmz.com/api#klinechart
 
 
 ![IMG](https://www.fmz.com/upload/asset/bb180d6a028bcc6993.png) 
 
 



> Source (python)

``` python
'''backtest
start: 2022-03-30 09:00:00
end: 2022-06-30 15:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
'''


import sys
def main():
    Log(sys.version)
    c = KLineChart()
    c.reset(0)

    bars = exchange.GetRecords()
    for bar in bars:
        c.begin(bar)
        c.barcolor('rgba(255, 0, 0, 0.2)' if bar.Close > bar.Open else 'rgba(0, 0, 0, 0.2)')
        if bar.Close > bar.Open:
            c.bgcolor('rgba(0, 255, 0, 0.5)')
        
        h = c.plot(bar.High, 'high')
        l = c.plot(bar.Low, 'low')
        c.fill(h, l, 'rgba(255, 0, 0, 1)' if bar.Close > bar.Open else '#000000')
        c.hline(bar.High)
        c.plotarrow(bar.Close - bar.Open)
        c.plotshape(bar.Low, style = 'diamond')
        c.plotchar(bar.Close, char = 'X')
        c.plotcandle(bar.Open*0.9, bar.High*0.9, bar.Low*0.9, bar.Close*0.9)
        if bar.Close > bar.Open:
            c.signal("long", bar.High, 1.5, "LONG")
        elif bar.Close < bar.Open:
            c.signal("closelong", bar.Low, 1.5)
        c.close()
```

> Detail

https://www.fmz.com/strategy/371600

> Last Modified

2022-07-01 17:57:42
