/*
策略出处: https://www.botvs.com/strategy/20761
策略名称: Python简单测试策略
策略作者: Zero
策略描述:

需要下载最新的托管者, 托管者机器个需要安装python, (Linux自带无需安装), 暂不支持TA库, 正在移植中..


参数    默认值      描述
----  -------  -------------------
a     1.2      number
b     你好hello  str
c     true     bool
d     0        select: abc|def|xxx
*/

def main():
    LogProfitReset()
    LogReset()
    Log("init OK");
    Log(a,b,c,d)
    _G("ok", 123)
    Log(GetPid(), _G(), _G("ok"), _G("dummy"))
    Sleep(1000)
    _G(None)
    Log(_G("ok"))

    LogStatus("Time", time.time())
    EnableLog(True)
    SetErrorFilter("net")
    Log(GetLastError())
    Log(GetCommand())
    ticker = exchange.GetTicker()
    Log('ticker buy', ticker.Buy, ticker['Buy']);
    
    r = _C(exchange.GetRecords)
    Log(TA.EMA(r))
    Log(TA.CMF(r))
    Log(TA.ATR(r))
    

    for e in exchanges:
        Log(e.GetName(), e.GetRate(), e.GetCurrency(), e.GetFee())
        Log(e.GetAccount())
        Log(_C(e.GetOrders))
        Log(e.GetOrder(10))
        Log(e.CancelOrder(10000))
        Log(e.IO("api", "userinfo"))
        Log(e.IO("api", "order_info", "symbol=btc_usd&order_id=3"))
        Log(e.GetUSDCNY())
        Log(e.GetPosition())
        Log(e.SetContractType("next_week"))
        Log(e.GetTicker())
        Log('Asks:', len(e.GetDepth().Asks))
        Log(e.SetMarginLevel(10))
        Log(e.SetDirection("buy"))
        Log(e.SetContractType("quarter"))
        Log(e.GetRecords(PERIOD_M30)[0])
        Log(e.GetRecords()[0])
    x = Chart({
        'title' : { 'text' : 'test chart'},
        'xAxis': { 'type': 'datetime'},
        'series' : [{'name' : 'Buy', 'data' : []}, {'name' : 'Sell', 'data' : []}]
        })
    x.reset()
    Log("策略将每10秒更新一次ticker");
    while True:
        ts = int(time.time() * 1000)
        ticker = _C(exchange.GetTicker)
        x.add(0, [ts, ticker.Buy])
        x.add(1, [ts, ticker.Sell])
        LogStatus(ticker)
        Sleep(10000)

