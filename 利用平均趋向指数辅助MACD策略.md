
> 策略名称

利用平均趋向指数辅助MACD策略

> 策略作者

Hukybo

> 策略描述

# 摘要
“趋势是你的朋友”这是每一个交易者都耳熟能详的箴言。但做过交易的朋友可能会有体会，趋势总是在毫无预警地开始并突然结束。那么在CTA策略中，如何抓住趋势并过滤震荡行情，是许多主观和量化交易者孜孜不倦的追求。在本节课程中，我们将以平均趋向指数(ADX)为滤网，分析在它量化交易中的应用。

[点击阅读更多内容](https://www.fmz.com/bbs-topic/4645)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|short|5|short|
|long|50|long|
|m|15|m|


> 源码 (python)

``` python
# 导入库
import talib
import numpy as np

mp = 0  # 定义一个全局变量，用于控制虚拟持仓

# 把K线数组转换成最高价、最低价、收盘价数组，用于转换为numpy.array类型数据
def get_data(bars):
    arr = [[], [], []]
    for i in bars:
        arr[0].append(i['High'])
        arr[1].append(i['Low'])
        arr[2].append(i['Close'])
    return arr

# 程序主函数
def onTick():
    _C(exchange.SetContractType, "rb000")	# 订阅期货品种
    bar = _C(exchange.GetRecords)  	# 获取K线数组
    if len(bar) < 100:		# 如果K线数组长度太小，就直接返回跳过
        return
    macd = TA.MACD(bar, 5, 50, 15)  		# 计算MACD值
    dif = macd[0][-2]  					# 获取DIF的值，返回一个数组
    dea = macd[1][-2]  					# 获取DEA的值，返回一个数组
    np_arr = np.array(get_data(bar)) # 把列表转换为numpy.array类型数据，用于计算ADX的值
    adx_arr = talib.ADX(np_arr[0], np_arr[1], np_arr[2], 14)  # 计算ADX的值
    adx1 = adx_arr[-2]  # 倒数第二根K线的ADX值
    adx2 = adx_arr[-3]  # 倒数第三根K线的ADX值
    last_close = bar[-1]['Close']		# 获取最新价格（卖价）
    global mp  							# 全局变量，用于控制虚拟持仓
    if mp == 1 and (dif < dea or adx1 < adx2):
        Log('多平')
        # exchange.SetDirection("closebuy")	# 设置交易方向和类型
        # exchange.Sell(last_close - 1, 1) 	# 平多单
        mp = 0  								# 设置虚拟持仓的值，即空仓
    if mp == -1 and (dif > dea or adx1 < adx2):
        Log('空平')
        # exchange.SetDirection("closesell")  	# 设置交易方向和类型
        # exchange.Buy(last_close, 1)  		# 平空单
        mp = 0  								# 设置虚拟持仓的值，即空仓
    if mp == 0 and dif > dea and adx1 > adx2:
        Log('多开')
        # exchange.SetDirection("buy")  		# 设置交易方向和类型
        # exchange.Buy(last_close, 1)  		# 开多单
        mp = 1  								# 设置虚拟持仓的值，即有多单
    if mp == 0 and dif < dea and adx1 > adx2:
        Log('空开')
        # exchange.SetDirection("sell")  		# 设置交易方向和类型
        # exchange.Sell(last_close - 1, 1)		# 开空单
        mp = -1  								# 设置虚拟持仓的值，即有空单
        
def main():
    while True:
        onTick()
        Sleep(1000)
```

> 策略出处

https://www.fmz.com/strategy/174672

> 更新时间

2020-11-17 17:37:45
