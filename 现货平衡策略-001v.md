
> Name

现货平衡策略-001v

> Author

XMaxZone

> Strategy Description

我们选取四个主流币种BTC，ETH，LTC，XRP，分别配置25%的市值，每偏离1%平衡一次。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|symbols|BTC,ETH,BCH,LTC|交易对|
|Interval|2|休眠时间s|
|LogInterval|600|收益更新时间s|


> Source (python)

``` python


import time
import requests
import math

account = 0          #保存用户资产
updateProfitTime = 0   #更新收益率间隔时间
tradeInfo = {}         #保存交易对信息
accountAssets = {}
ticker = {}
runtimeData = {}
Funding = 0   #账户资金  为0的时候自动获取
Version = '0.0.1'
sbs = list(symbols.split(','))


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
    if _G('Funding') is None:
        Funding = account['Balance']
        Log('Funding:',Funding)
        _G('Funding',Funding)
    else:
        Funding = _G('Funding')

    if account is None:
        Log('更新账户超时！！！')
        return

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

def Trade(symbol,direction,price,amount):
    if amount < tradeInfo[symbol]['minQty']:
        Log(symbol,'合约价值偏离或冰山委托设置的过小，达不到最小成交额，最小需要：', _N(tradeInfo[symbol]['minQty'] * price,4) + 1)
    else:
        para = ''
        url = '/api/v3/order'
        para += 'symbol='+ symbol +'USDT'
        para += '&side='+ direction
        para += '&type=LIMIT&timeInForce=IOC'
        para += '&quantity='+ str(amount)
        para += '&price='+ str(price)
        para += '&timestamp='+str(time.time() * 1000);
        go = exchange.Go("IO", "api", "POST", url, para)
        ret = go.wait()
        if ret  is not None:
            logType = LOG_TYPE_SELL
            if direction == 'BUY':
                logType =LOG_TYPE_BUY
            exchange.Log(logType,price,amount,symbol)

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

    retData = runtimeData['str'] + '\n' + "最后更新: " + _D() + '\n' + 'Version:' + Version  + '\n'
    LogStatus(retData+ '`' + json.dumps(accountTable) + '`\n'+ '`' + json.dumps(table) + '`\n')


    if int(time.time()*1000) - updateProfitTime > LogInterval * 1000:
        balance = account - Funding
        LogProfit(_N(balance, 3))
        updateProfitTime = int(time.time()*1000)

def Process():

    # Log('实时资金：',account)
    for symbol in sbs:

        pct = float(ticker[symbol]['value']) / float(account)
        # Log(symbol,'amount:',amount,1 / len(sbs))
        if pct > (1 / len(sbs) + 0.015):
            # Log('SELL',pct)
            Log(symbol ,'Funding:',Funding,'value:',ticker[symbol]['value'])
            amount = _N( ( (pct-1/len(sbs) ) * account / float(ticker[symbol]['price'])),tradeInfo[symbol]['amountSize'])
            Trade(symbol,'SELL',_N(float(ticker[symbol]['askPrice']), int(tradeInfo[symbol]['priceSize'])),  amount)
        if pct < (1 / len(sbs) - 0.015):
            # Log('Buy', pct)
            Log(symbol ,'Funding:',Funding,'value:',ticker[symbol]['value'])
            amount = _N( ( (1/len(sbs)-pct ) * account / float(ticker[symbol]['price'])),tradeInfo[symbol]['amountSize'])
            Trade(symbol,'BUY',_N(float(ticker[symbol]['bidPrice']), tradeInfo[symbol]['priceSize']),  amount)



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

https://www.fmz.com/strategy/322357

> Last Modified

2021-10-10 20:50:05
