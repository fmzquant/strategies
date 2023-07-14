
> Name

币安合约网格-002v

> Author

XMaxZone



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|value|150|开仓价值|
|pct|0.01|网格间隔|
|Show|true|是：展示收益，否：展示总账户|
|target|false|设置目标价格|
|target_price|1000|目标价格|
|LogInterval|600|收益曲线更新时间|
|Interval|2|休眠时间|


> Source (python)

``` python

import time
import requests
import math
# import pandas as pd

InitPrice = 0
updateProfitTime = 0
assets = {}
tradeInfo = {}
accountAssets = {}
runtimeData = {}
Funding = 0   #账户资金  为0的时候自动获取
symbol = ''
Version = '0.0.1'
SuccessColor = '#5cb85c' #成功颜色
DangerColor = '#ff0000' #危险颜色
WrningColor = '#f0ad4e' #警告颜色

assets['USDT'] = {'unrealised_profit':0,'margin':0,'margin_balance':0,'total_balance':0,'leverage':0,'update_time':0,'margin_ratio':0,'init_balance':0,'profit':0}


if IsVirtual():
    Log('不能进行回测')
    exit()

if exchange.GetName() != 'Futures_Binance':
    Log('只支持币安期货交易所！')
    exit()

def init():
    initData()
    CancelOrder()
    exchangeInfo = requests.get('https://fapi.binance.com/fapi/v1/exchangeInfo').json()
    if exchangeInfo is None:
        Log('无法连接币安网络，需要海外托管者')
        exit()
    for i in range(len(exchangeInfo['symbols'])):
        if exchangeInfo['symbols'][i]['symbol'] == symbol:
            assets[symbol] = {'amount': 0,'hold_price': 0,'value': 0,'bid_price': 0,'ask_price': 0,'realised_profit': 0,'margin': 0,'unrealised_profit': 0,
            'leverage': 20, 'positionInitialMargin': 0,  'liquidationPrice': 0 }
            tradeInfo[symbol] = {'minQty': float(exchangeInfo['symbols'][i]['filters'][1]['minQty']) ,
            'priceSize': int((math.log10(1.1/float(exchangeInfo['symbols'][i]['filters'][0]['tickSize'])))),'amountSize': int((math.log10(1.1/float(exchangeInfo['symbols'][i]['filters'][1]['stepSize']))))}

def CancelOrder():
    exchange.SetContractType('swap')
    #撤销所有未成交订单
    orders = exchange.GetOrders()
    for x in range(len(orders)):
        if orders[x]['Info']['symbol'] == symbol :
            exchange.CancelOrder(orders[x]['Id'])

def UpdateStatus():
    global Funding,updateProfitTime
    if Funding == 0 :
        Funding = float(FirstAccount()['Info']['totalWalletBalance'])   #获取初始资金
    # totalProfit = assets['USDT']['total_balance'] - Funding             #计算收益

    accountTable = {
        'type': "table",
        'title': "盈利统计",
        'cols': ["运行天数", "初始资金", "现有资金", "保证金余额", "已用保证金", "保证金比率",  "总收益", "预计年化", "预计月化", "平均日化"],
        'rows': []
    }
    table = {
        'type': 'table',
        'title': '交易对信息',
        'cols': ['编号', '[模式][倍数][持仓模式]', '币种信息', '开仓方向','初始价格', '开仓数量', '持仓价格', '当前价格', '强平价格', '持仓价值', '保证金', '未实现盈亏'],
        'rows': []
    }

    profitColors = DangerColor
    totalProfit = assets['USDT']['total_balance'] - Funding
    runday = runtimeData['dayDiff']
    if runday == 0:
        runday = 1
    if totalProfit > 0:
        profitColors = SuccessColor
    dayProfit = totalProfit / runday
    
    #Log('dayProfit:',dayProfit,'Funding:',Funding)
    dayRate = dayProfit / Funding * 100


    accountTable['rows'].append([
        runday,
        '$' + str(_N(Funding, 2)),
        '$' + str(assets['USDT']['total_balance']),
        '$' + str(assets['USDT']['margin_balance']),
        '$' + str(assets['USDT']['margin']),
        str(_N(assets['USDT']['margin_ratio'], 2)) + '%',
        str(_N(totalProfit / Funding * 100, 2)) + "% = $" + str(_N(totalProfit, 2)) + (profitColors),
        str(_N(dayRate * 365, 2)) + "% = $" + str(_N(dayProfit * 365, 2)) + (profitColors),
        str(_N(dayRate * 30, 2)) + "% = $" + str(_N(dayProfit * 30, 2)) + (profitColors),
        str(_N(dayRate, 2)) + "% = $" + str(_N(dayProfit, 2)) + (profitColors)
    ])


    i = 1
    for x in list(symbol.split(',')):
        typestr = '多空持仓'
        if type == 1:
            typestr = '只持多仓'
        if type == 2:
            typestr = '只持空仓'
        direction = '空仓'
        margin = direction
        if assets[x]['amount'] != 0:
            direction = '做多' + SuccessColor if assets[symbol]['amount'] > 0 else '做空' + DangerColor
            margin = '全仓' if assets[symbol]['marginType'] == 'cross' else '逐仓'
        unrealised_profit_color = '#000000'
        if assets[symbol]['unrealised_profit'] > 0:
            unrealised_profit_color = SuccessColor
        if assets[symbol]['unrealised_profit'] < 0:
            unrealised_profit_color = DangerColor

        infoList = [
        i,
        '['+margin+']'+'['+str(assets[x]['leverage'])+']'+'['+typestr+']',
        x,
        direction,
        InitPrice,
        assets[x]['amount'],
        assets[x]['hold_price'],
        assets[x]['price'],
        assets[x]['liquidationPrice'],
        float(assets[x]['amount']) * float(assets[x]['price']),
        assets[x]['positionInitialMargin'],
        assets[x]['unrealised_profit'],
        ]
        table['rows'].append(infoList)

        retData = runtimeData['str'] + '\n' + "最后更新: " + _D() + '\n' + 'Version:' + Version  + '\n'
        LogStatus(retData+ '`' + json.dumps(accountTable) + '`\n'+ '`' + json.dumps(table) + '`\n')

    if int(time.time()*1000) - updateProfitTime > LogInterval * 1000:
        balance = assets['USDT']['total_balance']
        key = "initialAccount_" + exchange.GetLabel()
        initialAccount = _G(key)
        #Log('balance:',balance,'Funding:',Funding,'initialAccount:',initialAccount['Info']['totalWalletBalance'])
        if Show:
            balance = assets['USDT']['total_balance'] - Funding
        LogProfit(_N(balance, 3))
        updateProfitTime = int(time.time()*1000)
        Profit = _N(balance,0)


def UpdateAccount():
    # Log('UpdateAccount()')
    global accountAssets
    account = exchange.GetAccount()
    position = exchange.GetPosition()
    if account is None and position is None :
        Log('更新账户超时！！！')
        return
    accountAssets = account['Info']['assets']
    assets['USDT']['update_time'] = int(time.time()) * 1000  #秒转毫秒   同步更新账户时间
    for  i in range(len(account['Info']['positions'])) :
        if account['Info']['positions'][i]['symbol'] == symbol :
            #计算持仓保证金                                           初始保证金                +            维持保证金
            assets[symbol]['margin'] = float(account['Info']['positions'][i]['initialMargin']) + float(account['Info']['positions'][i]['maintMargin'])
            #未实现收益
            assets[symbol]['unrealised_profit'] = float(account['Info']['positions'][i]['unrealizedProfit'])
            assets[symbol]['positionInitialMargin'] = float(account['Info']['positions'][i]['positionInitialMargin'])
            assets[symbol]['leverage'] = account['Info']['positions'][i]['leverage']

    #计算持仓保证金总额
    assets['USDT']['margin'] = float(account['Info']['totalInitialMargin']) + float(account['Info']['totalMaintMargin'])
    assets['USDT']['margin_balance'] = float(account['Info']['totalMarginBalance'])
    assets['USDT']['total_balance'] = float(account['Info']['totalWalletBalance'])

    ps = json.loads(exchange.GetRawJSON())
    if len(ps) > 0 :
        for x in range(len(ps)):
            if ps[x]['symbol'] == symbol:
                assets[symbol]['hold_price'] = float(ps[x]['entryPrice'])
                assets[symbol]['amount'] = float(ps[x]['positionAmt'])
                assets[symbol]['unrealised_profit'] = float(ps[x]['unRealizedProfit'])
                assets[symbol]['liquidationPrice'] = float(ps[x]['liquidationPrice'])
                assets[symbol]['marginType'] = ps[x]['marginType']

def UpdateTick():
    global InitPrice
    res = _C(exchange.GetTicker)
    if res is None:
        Log("行情更新异常！！！")

    if target:
        InitPrice = target_price
        _G('InitPrice',InitPrice)
    else:
        if  _G('InitPrice') is None :
            InitPrice = res.Last
            _G('InitPrice',InitPrice)
        else:
            InitPrice = _G('InitPrice')

    assets[symbol]['price'] = res.Last

def Trade(direction,price,amount):
    if amount < 0:
        amount = -amount
    Log('amount:',amount,'minQty:',tradeInfo[symbol]['minQty'])
    if amount < tradeInfo[symbol]['minQty']:
        Log(symbol,'合约价值偏离或冰山委托设置的过小，达不到最小成交额，最小需要：', _N(tradeInfo[symbol]['minQty'] * price,4) + 1)
    else:
        para = ''
        url = '/fapi/v1/order'
        para += 'symbol='+ symbol
        para += '&side='+ direction
        para += '&type=LIMIT&timeInForce=GTC'
        para += '&quantity='+ str(amount)
        para += '&price='+ str(price)
        para += "&timestamp="+str(time.time() * 1000);
        go = exchange.Go("IO", "api", "POST", url, para)
        ret = go.wait()
        if ret  is not None:
            logType = LOG_TYPE_SELL
            if direction == 'BUY':
                logType =LOG_TYPE_BUY
            exchange.Log(logType,price,amount,symbol)

def batch(buy_price,sell_price):
    exchange.SetContractType('swap')
    #撤销所有未成交订单
    orders = exchange.GetOrders()
    if len(orders) < 2 :
        return True
    return False

def Process():
    amount = (1 - float(assets[symbol]['price']) / float(InitPrice)) / float(pct) * float(value) / float(assets[symbol]['price'])
    if abs(amount - assets[symbol]['amount']) > _N(value / float(assets[symbol]['price']), tradeInfo[symbol]['amountSize']):
        if amount > 0:
            if assets[symbol]['amount'] < amount:
                CancelOrder()
                Trade('BUY', round(float(assets[symbol]['price']), tradeInfo[symbol]['priceSize']), round(amount - float(assets[symbol]['amount']),tradeInfo[symbol]['amountSize']))
            if assets[symbol]['amount'] > amount:
                CancelOrder()
                Trade('SELL',  round(float(assets[symbol]['price']), tradeInfo[symbol]['priceSize']), round(amount - float(assets[symbol]['amount']),tradeInfo[symbol]['amountSize']))
        if amount < 0:
            if assets[symbol]['amount'] < amount:
                CancelOrder()
                Trade('BUY', round(float(assets[symbol]['price']), tradeInfo[symbol]['priceSize']), round(amount - float(assets[symbol]['amount']),tradeInfo[symbol]['amountSize']))
            if assets[symbol]['amount'] > amount:
                CancelOrder()
                Trade('SELL',  round(float(assets[symbol]['price']), tradeInfo[symbol]['priceSize']), round(amount - float(assets[symbol]['amount']),tradeInfo[symbol]['amountSize']))


    buy_price = (value / pct - value) / ((value / pct) / float(InitPrice) + assets[symbol]['amount'])
    sell_price = (value / pct + value) / ((value / pct) / float(InitPrice) + assets[symbol]['amount'])

    if float(buy_price) > float(assets[symbol]['price']) or float(sell_price) < float(assets[symbol]['price']) or batch(buy_price,sell_price):
        CancelOrder()
        Trade('BUY', _N(buy_price, tradeInfo[symbol]['priceSize']), _N(value / buy_price, tradeInfo[symbol]['amountSize']))
        Trade('SELL', _N(sell_price, tradeInfo[symbol]['priceSize']), (_N(value / sell_price, tradeInfo[symbol]['amountSize'])))

def FirstAccount():
    key = "initialAccount_" + exchange.GetLabel()
    initialAccount = _G(key)
    if initialAccount is None:
        initialAccount = exchange.GetAccount()
        _G(key, initialAccount)
    return initialAccount

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

def initData():
    global symbol
    if _G('symbol') is None:
        symbol = exchange.GetCurrency().replace('_','')
        _G('symbol',symbol)
        Log('初始化币种：',symbol)
    else:
        symbol = _G('symbol')
        Log('交易币种：',symbol)

def main():
    exchange.SetContractType('swap')
    exchange.SetMarginLevel(10)
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

        Sleep(1000 * Interval)

```

> Detail

https://www.fmz.com/strategy/322284

> Last Modified

2021-11-19 10:29:27
