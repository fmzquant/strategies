
> Name

现货指数平衡策略-v11曾实盘跑过一段时间现在疑似有bug因为不用了懒得改

> Author

GCC

> Strategy Description

指数平衡策略python版

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|symbols|BTC,ETH,BCH,LTC|交易对|
|slip|0.03|下单滑点|
|percent|0.2,0.2,0.2,0.2|各个交易对价值占比|
|delta|0.01|差值达到多少进行平衡|
|Interval|2|休眠时间s|
|LogInterval|600|收益更新时间s|
|init_fund|-1|初始资金|


> Source (python)

``` python

import json
import time
import requests
import math

account = 0  
updateProfitTime = 0 
tradeInfo = {} 
accountAssets = {}
ticker = {}
runtimeData = {}
Funding = 0

sbs = list(symbols.split(','))
pcts = list(percent.split(','))
for i in range(len(pcts)):
    pcts[i] = float(pcts[i])

p_dic = {
            'ETH':[2,4], 'BTC':[2,5], 'XRP':[4,0], 'TRX':[5,1], 'LTC':[1,3], 'BNB':[1,3]
         }    #价格、数量精度，按需求添加


SuccessColor = '#5cb85c' #成功颜色
DangerColor = '#ff0000' #危险颜色
WrningColor = '#f0ad4e' #警告颜色

if IsVirtual():
    Log('不能进行回测')
    exit()

if exchange.GetName() != 'Binance':
    Log('只支持币安现货交易所！')
    exit()

def init():
    exchangeInfo = requests.get('https://api.binance.com/api/v1/exchangeInfo').json()
    if exchangeInfo is None:
        Log('无法链接币安网络，需要海外托管者！！！')
        exit()
    for x in range(len(exchangeInfo['symbols'])):
        for symbol in sbs:
            if exchangeInfo['symbols'][x]['symbol'] == symbol+'USDT':
                tradeInfo[symbol] = {'minQty': float(exchangeInfo['symbols'][x]['filters'][2]['minQty']) ,
                'priceSize': int((math.log10(1.1/float(exchangeInfo['symbols'][x]['filters'][0]['tickSize'])))),'amountSize': int((math.log10(1.1/float(exchangeInfo['symbols'][x]['filters'][2]['stepSize']))))}
    # Log('tradeInfo:',tradeInfo)

def UpdateAccount():
    global accountAssets,Funding,account
    acc = exchange.GetAccount()

    if acc is None:
        Log('更新账户超时！！！')
        return

    if _G('Funding') is None:
        Funding = acc['Balance']
        Log('Funding:',Funding)
        _G('Funding',Funding)
    else:
        Funding = _G('Funding')
    if init_fund >0:
        Funding = init_fund
    

    for x in range(len(acc['Info']['balances'])):
        for symbol in sbs:
            # Log(account['Info']['balances'])
            if acc['Info']['balances'][x]['asset'] == symbol:
                accountAssets[symbol] = acc['Info']['balances'][x]
                accountAssets[symbol]['amount'] = float(accountAssets[symbol]['free']) + float(accountAssets[symbol]['locked'])
            if acc['Info']['balances'][x]['asset'] == 'USDT':
                # Log('USDT:',acc['Info']['balances'][x])
                account = float(acc['Info']['balances'][x]['free']) + float(acc['Info']['balances'][x]['locked'])

    # Log('accountAssets:',accountAssets)

def UpdateTick():
    global ticker,account
    try:
        res = requests.get('https://api.binance.com/api/v3/ticker/bookTicker').json()
    except:
        Log('更新行情超时')
        return
    for x in range(len(res)):
        for symbol in sbs:
            if res[x]['symbol'] == symbol + 'USDT':
                # Log('res[x]:',res[x])
                ticker[symbol] = res[x]
                ticker[symbol]['price'] = (float(ticker[symbol]['askPrice']) + float(ticker[symbol]['bidPrice'])) / 2
                ticker[symbol]['value'] = accountAssets[symbol]['amount'] * ticker[symbol]['price']
    # Log('ticker:',ticker)
    # account = 0
    for symbol in sbs:
        account += _N(ticker[symbol]['value'],4)

def UpdateStatus():
    global updateProfitTime
    accountTable = {
        'type': "table",
        'title': "盈利统计",
        'cols': ["运行天数", "初始资金", "现有资金", "总收益", "预计年化", "预计月化", "平均日化"],
        'rows': []
    }

    table = {
        'type': 'table',
        'title': '交易对信息',
        'cols': ['编号', '币种信息', '占比%', '开仓数量',  '当前价格', '持仓价值'],
        'rows': []
    }
    totalProfit = account - Funding
    profitColors = DangerColor
    runday = runtimeData['dayDiff']
    if runday == 0:
        runday = 1
    if totalProfit > 0:
        profitColors = SuccessColor
    dayProfit = totalProfit / runday   #平均日收益
    dayRate = totalProfit / Funding * 100
    accountTable['rows'].append([
    runday,
    Funding,
    account,
    str(_N(totalProfit / Funding * 100, 2)) + "% = $" + str(_N(totalProfit, 2)) + (profitColors),
    str(_N(dayRate * 365, 2)) + "% = $" + str(_N(dayProfit * 365, 2)) + (profitColors),
    str(_N(dayRate * 30, 2)) + "% = $" + str(_N(dayProfit * 30, 2)) + (profitColors),
    str(_N(dayRate, 2)) + "% = $" + str(_N(dayProfit, 2)) + (profitColors)
    ])

    i=1
    for symbol in sbs:
        table['rows'].append([
        i,
        symbol,
        str(_N(ticker[symbol]['value'] / account * 100, 4 )),
        str(_N(accountAssets[symbol]['amount'],tradeInfo[symbol]['amountSize'])),
        str(_N(ticker[symbol]['price'],tradeInfo[symbol]['priceSize'])),
        str(_N(ticker[symbol]['value'],4))
        ])
        i += 1

    retData = runtimeData['str'] + '\n' + "最后更新: " + _D() + '\n' + '本策略改编自XMaxZone大佬的现货平衡策略-0.0.1v，原策略地址：https://www.fmz.com/strategy/322357' + '\n'
    LogStatus(retData+ '`' + json.dumps(accountTable) + '`\n'+ '`' + json.dumps(table) + '`\n')

    if int(time.time()*1000) - updateProfitTime > LogInterval * 1000:
        balance = account - Funding
        LogProfit(_N(balance, 3))
        updateProfitTime = int(time.time()*1000)

def Process():
    # Log('实时资金：',account)
    for i in range(len(sbs)):
        pct = float(ticker[sbs[i]]['value']) / float(account)
        # Log(symbol,'amount:',amount,1 / len(sbs))
        if pct > (pcts[i] + delta):
            # Log('SELL',pct)
            amount = _N( ( (pct-pcts[i] ) * account / float(ticker[sbs[i]]['price'])),tradeInfo[sbs[i]]['amountSize'])
            if amount >= tradeInfo[sbs[i]]['minQty'] and float(amount)*float(ticker[sbs[i]]['value']) > 10:
                Log(sbs[i] ,'Funding:',Funding,'value:',ticker[sbs[i]]['value'])
                # Trade(sbs[i],'SELL',_N(float(ticker[sbs[i]]['askPrice']), int(tradeInfo[sbs[i]]['priceSize'])),  amount)
                exchange.SetCurrency(sbs[i]+'_USDT')
                exchange.SetPrecision(p_dic[sbs[i]][0], p_dic[sbs[i]][1])
                exchange.Sell(float(ticker[sbs[i]]['bidPrice'])*(1-slip), amount)
        if pct < (pcts[i] - delta):
            # Log('Buy', pct)
            amount = _N( ( (pcts[i]-pct ) * account / float(ticker[sbs[i]]['price'])),tradeInfo[sbs[i]]['amountSize'])
            if amount >= tradeInfo[sbs[i]]['minQty'] and float(amount)*float(ticker[sbs[i]]['value']) > 10:
                Log(sbs[i] ,'Funding:',Funding,'value:',ticker[sbs[i]]['value'])
                # Trade(sbs[i],'BUY',_N(float(ticker[sbs[i]]['bidPrice']), tradeInfo[sbs[i]]['priceSize']),  amount)
                exchange.SetCurrency(sbs[i]+'_USDT')
                exchange.SetPrecision(p_dic[sbs[i]][0], p_dic[sbs[i]][1])
                exchange.Buy(float(ticker[sbs[i]]['bidPrice'])*(1+slip), amount)

def StartTime():
    StartTime = _G('StartTime')
    if StartTime is None:
        StartTime = _D()
        _G('StartTime',StartTime)
    return StartTime

def RunTime():
    ret = {}
    startTime = StartTime()
    nowTime = _D()
    dateDiff = (time.mktime(time.strptime(nowTime,'%Y-%m-%d %H:%M:%S')) - time.mktime(time.strptime(startTime,'%Y-%m-%d %H:%M:%S')) ) * 1000  #计算时间差
    dayDiff = math.floor(dateDiff / (24 * 3600 * 1000))
    lever1 = dateDiff % (24 * 3600 * 1000 )
    hours = math.floor(lever1 / (3600 * 1000))
    lever2 = lever1 % (3600 * 1000)
    minutes = math.floor(lever2 / (60 * 1000))

    ret['dayDiff'] = dayDiff
    ret['hours'] = hours
    ret['minutes'] = minutes
    ret['str'] = '运行时间：' + str(dayDiff) + '天' + str(hours) + '小时' + str(minutes) + '分钟'
    return ret

def main():
    SetErrorFilter("502:|503:|tcp|character|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|http|received|EOF|reused|Unknown")
    global runtimeData

    while True:
        runtimeData = RunTime()
        #更新账户和持仓
        UpdateAccount()
        #更新行情
        UpdateTick()
        #策略主逻辑
        Process()
        #更新图表
        UpdateStatus()
        #休眠时间
        Sleep(Interval * 1000)

```

> Detail

https://www.fmz.com/strategy/329093

> Last Modified

2021-12-04 20:53:35
