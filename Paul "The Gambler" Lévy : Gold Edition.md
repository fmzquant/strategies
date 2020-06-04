
> 策略名称

Paul "The Gambler" Lévy : Gold Edition

> 策略作者

FawkesPan

> 策略描述

###### 期货赌徒策略
##### 方向做错了就自动反向翻倍开仓
#### 实盘会亏完所有钱!!!
### 实盘会亏完所有钱!!!
## 实盘会亏完所有钱!!!
# 实盘会亏完所有钱!!!

> 策略参数



|参数|默认值|描述|
|----|----|----|
|STOP_LOSS|0.015|止损距离|
|TAKE_PROFIT|0.03|止盈距离|
|START_SIZE|true|初始仓位|
|RISK_LIMIT|1025|最大仓位|
|LEVERAGE_RATE|20|杠杆大小|
|CONTRACT_TYPE|this_week|合约类型|
|DELAY|30|刷新间隔|
|AMP|2|反向倍数|


> 源码 (python)

``` python


#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# encoding: utf-8
#
#  Paul "The Gambler" Lévy.
#
# Copyright 2018 FawkesPan
# Contact : i@fawkex.me / Telegram@FawkesPan
#
# Do What the Fuck You Want To Public License
#

import random
import talib
import numpy as np
from math import *

Account = {}
Ticker = {}
Records = {}
LPosition = 0
SPosition = 0
Positions = {}
TotalLoss = 0
TotalWin = 0
FullLoss = 0
MaxPosition = 0
TotalLongs = 0
TotalShorts = 0

def cancelAllOrders():
    orders = exchange.GetOrders()
    for order in orders:
        exchange.CancelOrder(order['Id'], order)
    return True

def updateMarket():
    global Ticker
    global Records

    Ticker = exchange.GetTicker()
    Records = exchange.GetRecords()

    return True

def getTAFormat(Records):
    Close = []
    for item in Records:
        Close.append(item['Close'])

    return np.array(Close)

def updateAccount():
    global Account
    global LPosition
    global SPosition
    global Positions
    global MaxPosition

    LPosition = 0
    SPosition = 0
    Positions = {}
    for item in exchange.GetPosition():
        if item['MarginLevel'] == LEVERAGE_RATE:
            if item['Type'] == 1:
                Positions['Short'] = item
                SPosition += item['Amount']
            else:
                Positions['Long'] = item
                LPosition += item['Amount']
        MaxPosition = max(MaxPosition, SPosition, LPosition)

    Account = exchange.GetAccount()

    return True

def updatePositions():
    global TotalWin
    global TotalLoss
    global FullLoss

    opened = False

    try:
        Long = Positions['Long']['Amount']
        LongEntry = Positions['Long']['Price']
        Current = Ticker['Sell']

        StopLoss = LongEntry * (1-STOP_LOSS)
        TakeProfit = LongEntry * (1+TAKE_PROFIT)

        if Current > TakeProfit:
            Risked = True
            Log('多仓达到预设止盈价位. #0000FF')
            TotalWin+=1
            Log('总计止盈次数: ', TotalWin, ' 总计止损次数: ', TotalLoss, ' 完全止损次数: ', FullLoss, ' 持有过的最大仓位: ', MaxPosition, ' 总计开多: ', TotalLongs, ' 总计开空: ', TotalShorts)
            coverLong(Long, True)
        if Current < StopLoss:
            Risked = True
            Log('多仓达到预设止损价位. #FF0000')
            TotalLoss+=1
            Log('总计止盈次数: ', TotalWin, ' 总计止损次数: ', TotalLoss, ' 完全止损次数: ', FullLoss, ' 持有过的最大仓位: ', MaxPosition, ' 总计开多: ', TotalLongs, ' 总计开空: ', TotalShorts)
            coverLong(Long, True)
            if Long*AMP < RISK_LIMIT:
                openShort(Long*AMP, True)
            else:
                FullLoss+=1
                Log('超过允许的最大仓位，停止开仓. #FF0000')
                Log('总计止盈次数: ', TotalWin, ' 总计止损次数: ', TotalLoss, ' 完全止损次数: ', FullLoss, ' 持有过的最大仓位: ', MaxPosition, ' 总计开多: ', TotalLongs, ' 总计开空: ', TotalShorts)

        opened = True
    except KeyError:
        pass

    try:
        Short = Positions['Short']['Amount']
        ShortEntry = Positions['Short']['Price']
        Current = Ticker['Buy']

        StopLoss = ShortEntry * (1+STOP_LOSS)
        TakeProfit = ShortEntry * (1-TAKE_PROFIT)

        if Current < TakeProfit:
            Risked = True
            Log('空仓达到预设止盈价位. #0000FF')
            TotalWin+=1
            Log('总计止盈次数: ', TotalWin, ' 总计止损次数: ', TotalLoss, ' 完全止损次数: ', FullLoss, ' 持有过的最大仓位: ', MaxPosition, ' 总计开多: ', TotalLongs, ' 总计开空: ', TotalShorts)
            coverShort(Short, True)
        if Current > StopLoss:
            Risked = True
            Log('空仓达到预设止损价位. #FF0000')
            TotalLoss+=1
            Log('总计止盈次数: ', TotalWin, ' 总计止损次数: ', TotalLoss, ' 完全止损次数: ', FullLoss, ' 持有过的最大仓位: ', MaxPosition, ' 总计开多: ', TotalLongs, ' 总计开空: ', TotalShorts)
            coverShort(Short, True)
            if Short*AMP < RISK_LIMIT:
                openLong(Short*AMP, True)
            else:
                FullLoss+=1
                Log('超过允许的最大仓位，停止开仓. #FF0000')
                Log('总计止盈次数: ', TotalWin, ' 总计止损次数: ', TotalLoss, ' 完全止损次数: ', FullLoss, ' 持有过的最大仓位: ', MaxPosition, ' 总计开多: ', TotalLongs, ' 总计开空: ', TotalShorts)

        opened = True
    except KeyError:
        pass

    if not opened:
        Log('还没开仓，随便开个仓位.')
        RSI = talib.RSI(getTAFormat(Records), timeperiod=14)
        if RSI[-2]<RSI[-1]:
            Log('RSI14: ', RSI[-1],' 正在开多.')
            openLong(START_SIZE, True)
        else:
            Log('RSI14: ', RSI[-1],' 正在开空.')
            openShort(START_SIZE, True)

    return True

def openLong(Amount=0, marketPrice=False):
    global TotalLongs

    Amount = floor(Amount)

    TotalLongs+=Amount

    exchange.SetDirection('buy')

    if marketPrice:
        exchange.Buy(Ticker['Sell']*1.01, Amount)
    else:
        exchange.Buy(Ticker['Sell'], Amount)

    return True

def coverLong(Amount=0, marketPrice=False):
    exchange.SetDirection('closebuy')

    if marketPrice:
        exchange.Sell(Ticker['Buy']*0.99, Amount)
    else:
        exchange.Sell(Ticker['Buy'], Amount)

    return True

def openShort(Amount=0, marketPrice=False):
    global TotalShorts

    Amount = floor(Amount)

    TotalShorts+=Amount

    exchange.SetDirection('sell')

    if marketPrice:
        exchange.Sell(Ticker['Buy']*0.99, Amount)
    else:
        exchange.Sell(Ticker['Buy'], Amount)

    return True

def coverShort(Amount=0, marketPrice=False):
    exchange.SetDirection('closesell')

    if marketPrice:
        exchange.Buy(Ticker['Sell']*1.01, Amount)
    else:
        exchange.Buy(Ticker['Sell'], Amount)

    return True

def onTick():
    cancelAllOrders()
    updateMarket()
    updateAccount()
    updatePositions()

    return True

def main():
    exchange.SetContractType(CONTRACT_TYPE)
    exchange.SetMarginLevel(LEVERAGE_RATE)

    while True:
        onTick()
        Sleep(DELAY*1000)

```

> 策略出处

https://www.fmz.com/strategy/119038

> 更新时间

2018-09-28 16:53:43
