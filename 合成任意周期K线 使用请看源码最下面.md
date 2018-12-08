
> 策略名称

合成任意周期K线 使用请看源码最下面

> 策略作者

FawkesPan





> 源码 (python)

``` python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# encoding: utf-8
# 
# Candlestick merger.
#
# Copyright 2018 FawkesPan
# Contact : i@fawkex.me / Telegram@FawkesPan
#
# Do What the Fuck You Want To Public License
#

from math import *
from datetime import datetime

def timeFilter(records, since, to=1000000000000000):
    bars = []
    for i in records:
        if i['Time'] >= since and i['Time'] <= to:
            bars.append(i)

    return bars

def calcRecords(records, period=30, start=None):
    try:
        records[0]
    except IndexError:
        return []
    
    period_ms = period * 60000  # 以毫秒记的K线周期
    end_in = records[len(records)-1]['Time']  # K线的结束时间
    start_at = records[0]['Time']  # K线的开始时间
    
    # 获得可以用于计算目标K线的开始时间
    r_offest = start_at % period_ms
    start_at = start_at - r_offest + period_ms
    if start is not None:
        start_at = start
    
    target_count = ceil((end_in-start_at)/period_ms) # 目标K线的数量
    
    n_records = []
    
    for i in range(0, target_count):
        bars = timeFilter(records, start_at+i*period_ms, start_at+(i+1)*period_ms-1000)
        try:
            bars[0]
        except IndexError:
            continue
        # 初始化新的Bar
        Time = bars[0]['Time']
        Open = bars[0]['Open']
        High = bars[0]['High']
        Low = bars[0]['Low']
        Close = bars[0]['Close']
        Volume = 0
        for item in bars:
            High = max(High, item['High'])
            Low = min(Low, item['Low'])
            Close = item['Close']
            Volume+=item['Volume']
            
        # 将Bar添加添加到新的K线中
        n_records.append(dict({
            'Time' : Time,
            'Open' : Open,
            'High' : High,
            'Low' : Low,
            'Close' : Close,
            'Volume' : Volume
        }))
        
    return n_records

def getRecords(exchange, period=30):
    records = exchange.GetRecords(PERIOD_M1)
        
    return calcRecords(records, period)

def calcRecordsWithOldRecords(records, old_records, period=30):
    try:
        start = old_records[len(old_records)-1]['Time']
        del old_records[len(old_records)-1]
    except IndexError:
        old_records = []
        start = None
        
    return old_records + calcRecords(records=records, period=period, start=start)
        
ext.calcRecords = calcRecords
ext.getRecords = getRecords
ext.calcRecordsWithOldRecords = calcRecordsWithOldRecords

# Function Test
def main():
    LogReset()
    M1 = exchange.GetRecords(PERIOD_M1)
    M15 = exchange.GetRecords(PERIOD_M15)
    M15_GEN = ext.calcRecords(M1, 15) # 使用ext.calcRecords函数 按照1分钟K线 计算出15分钟K线
    Log(M15[len(M15)-50:])
    Log(M15_GEN[len(M15_GEN)-50:])
```

> 策略出处

https://www.fmz.com/strategy/117473

> 更新时间

2018-09-21 13:24:55
