'''
策略出处: https://www.botvs.com/strategy/21365
策略名称: Python API 测试
策略作者: Zero
策略描述:

Python API 测试

'''

import sys
import time
import talib
import json
import traceback
import matplotlib
import numpy as np
import matplotlib.pyplot as plt
import mpl_toolkits.mplot3d

def main():
    testGlobal = [
            'Version', ['Log', 'ok', 3.5, True], ['Sleep', 100], ['LogProfit', 10.5],
            'LogProfitReset', ['LogProfit', 10.8], 'GetCommand', 'LogReset', ['LogStatus', 'x', True], ['EnableLog', True], 
            ['SetErrorFilter', 'xxx'], 'GetPid', 'GetLastError', ['_G', 'x', 10], ['_G', 'x'], ['_G', 'x', None], '_G',
        ]
    g = globals()
    for item in testGlobal:
        if isinstance(item, list):
            ret = g[item[0]](*item[1:])
        else:
            ret = g[item]()
        Log('%s => %s' % (item, ret))
    testExchanges = [
            'GetName', 'GetUSDCNY', 'GetRate', ['SetRate', 1.0], 'GetAccount', 'GetCurrency', 'GetLabel', 'GetMinStock', 'GetMinPrice', 'GetFee',
            'GetRecords',
            ['Buy', 100, 0.1, "OK"],
            'GetOrders',
            ['GetOrder', 1],
            'GetAccount',
            'GetRawJSON',
            ['CancelOrder', 1],
            ['Buy', -1, 1000.0],
            'GetAccount',
            ['Sell', -1, 3],
            'GetAccount',
            ['Sell', 9999.9, 0.2, "OK"],
            'GetOrders',
            'GetAccount',
            ['CancelOrder', 2],
            ['Go', 'GetAccount'],
            ['IO', 'status'],
        ]
    for item in testExchanges:
        try:
            if isinstance(item, list):
                ret = getattr(exchange, item[0])(*item[1:])
            else:
                ret = getattr(exchange, item)()
        except:
            ret = traceback.format_exc()
        Log('exchange.%s => %s' % (item, ret))
    
    # test market order
    exchange.Buy(1000)
    exchange.Buy(-1, 200, "buy 200 RMB")
    exchange.Sell(exchange.GetAccount().Stocks)
    # test Go
    ret, ok = exchange.Go("GetTicker").wait()
    if ok:
        Log("Go GetTicker", ret)
    Log("EMA", len(TA.EMA(exchange.GetRecords())))
    Log("EMA H1", len(TA.EMA(exchange.GetRecords(PERIOD_H1))))
    

    # test plot image
    plt.plot([3,6,2,4,7,1])
    Log('支持直接打印plt图片 ', plt)
    
    fig = plt.figure()
    ax = fig.add_subplot(111)
    t = ax.scatter(np.random.rand(20), np.random.rand(20))
    Log(fig)
    
    x = np.linspace(0, 10, 1000)
    y = np.sin(x)
    z = np.cos(x**2)

    plt.figure(figsize=(8,4))
    plt.plot(x,y,label="$sin(x)$",color="red",linewidth=2)
    plt.plot(x,z,"b--",label="$cos(x^2)$")
    plt.xlabel("Time(s)")
    plt.ylabel("Volt")
    plt.title("PyPlot Example")
    plt.ylim(-1.2,1.2)
    plt.legend()
    Log(plt)

    x,y=np.mgrid[-2:2:20j,-2:2:20j]
    z=x*np.exp(-x**2-y**2)
    ax=plt.subplot(111,projection='3d')
    ax.plot_surface(x,y,z,rstride=2,cstride=1,cmap=plt.cm.coolwarm,alpha=0.8)
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_zlabel('z')
    # plot image to status bar
    LogStatus(plt)
    
    # test plot chart
    x = Chart({
        'title' : { 'text' : 'test chart'},
        'xAxis': { 'type': 'datetime'},
        'series' : [{'name' : 'Buy', 'data' : []}, {'name' : 'Sell', 'data' : []}]
        })
    x.reset()
    for i in range(100):
        ts = int(time.time() * 1000)
        ticker = _C(exchange.GetTicker)
        x.add(0, [ts, ticker.Buy])
        x.add(1, [ts, ticker.Sell])
        Sleep(10000)
