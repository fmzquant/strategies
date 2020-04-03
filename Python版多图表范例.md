
> 策略名称

Python版多图表范例

> 策略作者

小小梦





> 源码 (python)

``` python
'''backtest
start: 2019-01-22 00:00:00
end: 2019-01-23 00:00:00
period: 30m
exchanges: [{"eid":"OKCoin_EN","currency":"BTC_USD"}]
'''

import random
import time
def main():
    cfgA = {
        "extension" : {
            "layout" : "single", 
            "height" : 300,
            "col" : 8
        }, 
        "title" : {
            "text" : "盘口图表"
        },
        "xAxis" : {
            "type" : "datetime" 
        }, 
        "series" : [{
            "name" : "买一",
            "data" : []
        }, {
            "name" : "卖一", 
            "data" : []
        }]
    }    

    cfgB = {
        "title" : {
            "text" : "差价图"
        }, 
        "xAxis" : {
            "type" : "datetime",
        }, 
        "series" : [{
            "name" : "差价", 
            "type" : "column", 
            "data" : []
        }]
    }    

    cfgC = {
        "__isStock" : False,
        "title" : {
            "text" : "饼图"
        }, 
        "series" : [{
            "type" : "pie", 
            "name" : "one", 
            "data" : [
                ["A", 25],
                ["B", 25],
                ["C", 25],
                ["D", 25],
            ]
        }]
    }    

    cfgD = {
        "extension" : {
            "layout" : "single",
            "col" : 8,
            "height" : "300px"
        }, 
        "title" : {
            "text" : "盘口图表"
        }, 
        "series" : [{
            "name" : "买一", 
            "data" : []
        }, {
            "name" : "卖一",
            "data" : []
        }]
    }    

    cfgE = {
        "__isStock" : False, 
        "extension" : {
            "layout" : "single", 
            "col" : 4,
            "height" : "300px"
        }, 
        "title" : {
            "text" : "饼图2"
        },
        "series" : [{
            "type" : "pie",
            "name" : "one", 
            "data" : [
                ["A", 25], 
                ["B", 25], 
                ["C", 25], 
                ["D", 25]
            ]
        }]
    }
    
    chart = Chart([cfgA, cfgB, cfgC, cfgD, cfgE])
    chart.reset()
    chart.add(3, {
        "name" : "ZZ",
        "y" : random.random() * 100
    })
    
    while True:
        Sleep(1000)
        ticker = exchange.GetTicker()
        if not ticker :
            continue
        diff = ticker["Sell"] - ticker["Buy"]
        cfgA["subtitle"] = {
            "text" : "买一" + str(ticker["Buy"]) + "卖一" + str(ticker["Sell"])
        }
        cfgB["subtitle"] = {
            "text" : "价差 " + str(diff)
        }
        
        chart.add(0, [time.time() * 1000, ticker["Buy"]])
        chart.add(1, [time.time() * 1000, ticker["Sell"]])
        chart.add(2, [time.time() * 1000, diff])
        chart.add(4, [time.time() * 1000, ticker["Buy"]])
        chart.add(5, [time.time() * 1000, ticker["Buy"]])
        cfgC["series"][0]["data"][0][1] = random.random() * 100
        cfgE["series"][0]["data"][0][1] = random.random() * 100
```

> 策略出处

https://www.fmz.com/strategy/190826

> 更新时间

2020-03-16 10:12:22
