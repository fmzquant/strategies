
> 策略名称

经典MACD交易策略

> 策略作者

Hukybo

> 策略描述

# 摘要
相信做过交易的人对MACD都不陌生，这是一个非常古老的技术指标，它是由查拉尔·阿佩尔(Geral Appel)在上个世纪70年代发明的，全称指数平滑异同移动平均线。本节我们将继续重温经典技术分析工具MACD，深度解析每一个计算步骤，以及如何用Python和talib库去实现它，并根据MACD比较常用的使用方法来构建策略。

[点击阅读更多内容](https://www.fmz.com/bbs-topic/4503)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|short|5|short|
|long|50|long|
|m|15|m|


> 源码 (python)

``` python
'''backtest
start: 2019-01-01 00:00:00
end: 2021-01-01 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''

mp = 0  # 定义一个全局变量，用于控制虚拟持仓
    
# 程序主函数
def onTick():
    _C(exchange.SetContractType, "rb000")	# 订阅期货品种
    bar = _C(exchange.GetRecords)  	# 获取K线数组
    if len(bar) < 100:		# 如果K线数组长度太小，就直接返回跳过
        return
    macd = TA.MACD(bar, 5, 50, 15)  		# 计算MACD值
    dif = macd[0][-2]  					# 获取DIF的值
    dea = macd[1][-2]  					# 获取DEA的值
    depth = exchange.GetDepth()
    ask = depth['Asks'][0]['Price']
    bid = depth['Bids'][0]['Price']
    global mp  							# 全局变量，用于控制虚拟持仓
    if mp == 1 and dif < dea:
        Log('多平信号成立，挂单价格为：', bid)
        exchange.SetDirection("closebuy")	# 设置交易方向和类型
        id = exchange.Sell(bid, 1) 	# 平多单
        mp = 0  								# 设置虚拟持仓的值，即空仓
    if mp == -1 and dif > dea:
        Log('空平信号成立，挂单价格为：', ask)
        exchange.SetDirection("closesell")  	# 设置交易方向和类型
        id = exchange.Buy(ask, 1)  		# 平空单
        mp = 0  								# 设置虚拟持仓的值，即空仓
    if mp == 0 and dif > dea:
        Log('多开信号成立，挂单价格为：', ask)
        exchange.SetDirection("buy")  		# 设置交易方向和类型
        id = exchange.Buy(ask, 1)  		# 开多单
        mp = 1  								# 设置虚拟持仓的值，即有多单
    if mp == 0 and dif < dea:
        Log('空开信号成立，挂单价格为：', bid)
        exchange.SetDirection("sell")  		# 设置交易方向和类型
        id = exchange.Sell(bid, 1)		# 开空单
        mp = -1  								# 设置虚拟持仓的值，即有空单
        
def main():
    while True:
        onTick()
        Sleep(1000)
```

> 策略出处

https://www.fmz.com/strategy/171604

> 更新时间

2021-07-01 17:40:55
