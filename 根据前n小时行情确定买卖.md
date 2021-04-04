
> 策略名称

根据前n小时行情确定买卖

> 策略作者

coolcoolcloud

> 策略描述

每次获取当前价格，并将当前价格与前n小时最低价或最高价比较，以确定是购买还是出售
萌新刚学习，如有疏漏之处，请指教
完全是刚才看api文档边看边写的，实在是见笑了



> 源码 (python)

``` python
def start_demo():
    records = exchange.GetRecords()
    #Log(exchange.GetAccount())
    #Log(TA.Highest(records, 30, 'High'))
    period = exchange.GetPeriod()
    #Log("K线周期：", period / (60 * 60), "小时")
    #records = exchange.GetRecords(PERIOD_H1)
    records = exchange.GetRecords()
    #Log(records)
    #Log("第一根k线数据为，Time:", records[0]["Time"], "Open:", records[0]["Open"], "High:", records[0]["High"])
    #Log("第二根k线数据为，Time:", records[1]["Time"], "Close:", records[1]["Close"])
    #Log("当前K线（最新）", records[-1], "上一根K线", records[-2])
    #获取市场当前行情
    ticker = exchange.GetTicker()
    #Log("High:", ticker["High"], "Low:", ticker["Low"], "Sell:", ticker["Sell"], "Buy:", ticker["Buy"], "Last:", ticker["Last"], "Volume:", ticker["Volume"])
    #要实现负数遍历必须加上第三个参数步长，及每次增长多少
    #for i in range(0,-10,-1):
    is_buy=True
    #检查多长时间的数据
    h=20
    #-1是当前的，没有0
    for i in range(-2,-2-h,-1):
        #Log("当前K线", records[i])
        if ticker["Last"] > records[i]["Low"]:
            #Log(i+1)
            #Log(records[i]["Low"])
            is_buy=False
            break
    if is_buy:
        id = exchange.Buy(ticker["Buy"], 0.01)
        #Log(id)
    is_sell=True
    for i in range(-2,-2-h,-1):
        #Log("当前K线", records[i])
        if records[i]["High"] >ticker["Last"] :
            #Log(i+1)
            #Log(records[i]["Low"])
            is_sell=False
            break
    if is_sell:
        id = exchange.Sell(ticker["Sell"], 0.01)
        #Log(id)
def main():
    while True:
        start_demo()
        #Sleep(24*60*60 * 1000) #休息一段时间
        #Sleep(60*60 * 1000) #休息一段时间
        Sleep(60 * 1000) #休息一段时间
    

```

> 策略出处

https://www.fmz.com/strategy/264617

> 更新时间

2021-03-21 00:01:02
