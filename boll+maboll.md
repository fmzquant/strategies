
> 策略名称

boll+maboll

> 策略作者

3piggy

> 策略描述

布林带突破与回撤结合策略
开仓信号：布林带上轨均线金叉，布林带宽放大，中轨向上，开多。反之开空
平仓信号：布林带收窄，上轨均线死叉
逆向信号：布林带回撤

信号还在过滤中

> 策略参数



|参数|默认值|描述|
|----|----|----|
|ma|13|ma周期|
|bo|25|bo周期|
|ma2|7|ma2周期|
|period|true|period|


> 源码 (python)

``` python
import numpy as np
import talib
import time
if period == 1:
	per = PERIOD_M1
if period == 2:
	per = PERIOD_M3
if period == 3:
	per = PERIOD_M5
if period == 4:
	per = PERIOD_M15
if period == 5:
	per = PERIOD_M30
if period == 6:
	per = PERIOD_H1
	
status=0 #多：1  空：2

position = 0

def ontick():
	global position
	records = exchange.GetRecords(per)
	#------------指标计算---------
	#rsi = TA.RSI(records,14)
	#if rsi[-1] > 65 or rsi[-1] < 35:
	#    return
	bb = talib.BBANDS(records.Close,timeperiod=bo, nbdevup=2, nbdevdn=2, matype=0) #计算BB
	rsi = talib.RSI(records.Close,timeperiod=12)
	cmi = talib.CMO(records.Close,timeperiod=12)
	print(cmi[-1])
	move = talib.SMA(records.Close,ma2)#收盘价ma
	mabt = talib.SMA(bb[0],ma)#上轨ma
	mabd = talib.SMA(bb[2],ma)#下跪ma
	account = exchange.GetAccount()

	

	if bb[0][-1] > mabt[-1] and bb[0][-2] < mabt[-2] and bb[2][-1] < bb[2][-2] and bb[1][-1] > bb[1][-2] and records.Close[-1] > move[-1] and rsi[-1]>60:
		position += 1
		exchange.Buy(-1,account.Balance*0.1)
		#log('向上突破开多 '+ str(close[-1]))
	
	if bb[2][-1] < mabd[-1] and bb[2][-2] > mabd[-2] and bb[0][-1] > bb[0][-2] and bb[1][-1] < bb[1][-2] and records.Close[-1] < move[-1] and rsi[-1]<40:
		position -= 1
		exchange.Sell(-1,account.Stocks*0.1)
		#log('向下突破开空 '+ str(close[-1]))
	
	if bb[0][-1]-bb[2][-1] < bb[0][-2]-bb[2][-2]:
		if bb[0][-1] < mabt[-1] and bb[0][-2] > mabt[-2] and position> 0:
			position -= 1
			exchange.Sell(-1,account.Stocks*0.1)
			#log('多单平仓 '+ str(close[-1]))

		if bb[2][-1] > mabd[-1] and bb[2][-2] < mabd[-2] and position < 0:
			position += 1
			exchange.Buy(-1,account.Balance*0.1)
			#log('空单平仓 '+ str(close[-1]))

def main():
	while True:
		ontick()
		Sleep(30000)
```

> 策略出处

https://www.fmz.com/strategy/146391

> 更新时间

2020-04-23 16:46:09
