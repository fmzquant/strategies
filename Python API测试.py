'''
策略出处: https://www.botvs.com/strategy/22600
策略名称: Python API测试
策略作者: iamjayson
策略描述:

需要下载最新的托管者, 托管者机器个需要安装python, (Linux自带无需安装)


参数    默认值      描述
----  -------  -------------------
a     1.2      number
b     你好hello  str
c     true     bool
d     0        select: abc|def|xxx
'''

import time
import talib

def main():
    _G("ok", 123)
    _G(None)
    Log(_G("ok"))

    EnableLog(True)
    SetErrorFilter("net")
    
    LogStatus('这是一个普通的状态提示');
    
    ticker = exchange.GetTicker()
    Log('ticker buy', ticker.Buy, ticker['Buy']);

    r = exchange.GetRecords()
    Log(len(r))
    Log(r[0])
    Log(r[-1])
    Log(TA.Highest(r, 10, 'High'))
    Log(TA.Lowest(r, 10, 'Low'))

    for e in exchanges:
        Log(e.GetName(), e.GetRate(), e.GetCurrency(), e.GetFee())
        Log(e.GetAccount())
        Log(_C(e.GetOrders))
        Log(e.GetOrder(10))
        Log(e.CancelOrder(10000))
        Log(e.IO("api", "userinfo"))
        Log(e.IO("api", "order_info", "symbol=btc_usd&order_id=3"))
        
        Log(e.GetUSDCNY())
        #Log(e.GetPosition())
        #Log(e.SetContractType("next_week"))
        Log(e.GetTicker())
        Log('Asks:', len(e.GetDepth().Asks))
        #Log(e.SetMarginLevel(10))
        #Log(e.SetDirection("buy"))
        #Log(e.SetContractType("quarter"))
        #Log(e.GetRecords(PERIOD_M30)[0])
        Log(e.GetRecords()[0])
    x = Chart({
        'title' : { 'text' : 'test chart'},
        'xAxis': { 'type': 'datetime'},
        'series' : [{'name' : 'Buy', 'data' : []}, {'name' : 'Sell', 'data' : []}]
        })
    x.reset()
    Log("策略将每10秒更新一次ticker");
    for i in range(100):
        ts = int(time.time() * 1000)
        ticker = _C(exchange.GetTicker)
        x.add(0, [ts, ticker.Buy])
        x.add(1, [ts, ticker.Sell])
        LogStatus(ticker)
        Sleep(10000)
