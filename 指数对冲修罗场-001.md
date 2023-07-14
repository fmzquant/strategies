
> Name

指数对冲修罗场-001

> Author

XMaxZone

> Strategy Description

* 对冲

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|TradeSymbols|BTC,ETH,BCH,XRP,EOS,LTC,TRX,ETC,LINK,XLM,ADA,XMR,DASH,ZEC,XTZ,BNB,ATOM,ONT,IOTA,BAT,VET,NEO,QTUM,IOST|交易的币种|
|TradeValue|50|每偏离指数1%持有价值|
|DeviateValue|20|合约价值调整偏离值|
|IceValue|20|冰山委托|
|LogInterval|600|Log总权益间隔s|
|Interval|5|休眠时间s|
|MockTrading|false|模拟交易|
|MockTradingValue|100000|模拟交易金额|
|Reset|false|重置|


> Source (python)

``` python

import time
import requests
import math
import pandas as pd

Alpha = 0.001  #指数移动平均的MA参数，设置的越大基准价格跟踪越敏感，最终持仓也会越低降低了杠杆，但会降低收益，具体根据自己需求权衡
UpdateBasePriceInterval = 60 #多久更新一次基准价格，单位位秒，跟Alpha相关，Alpha设置的越小，这个间隔也可以设置的更小
StopLossRate = 0.8 #表示当资金达到初始资金的80%时触发止损，停止策略，可以随着策略的盈利，动态设置止损位置
MaxDiff = 0.5  #当偏差diff大于这个值时停止加仓
MinDiff = -0.5  #当StopLossRate偏差Diff小于这个值时停止加仓
Version = '0.0.1'
Show = True   #默认false 显示账户余额，true显示累计收益
Funding = 0    #账户资金，为0的时候自动获取，非0的时候自行设置
SuccessColor = '#5cb85c' #成功颜色
DangerColor = '#ff0000' #危险颜色
WrningColor = '#f0ad4e' #警告颜色
SelfFee = 0.04   #手续费率   https:#www.binance.com/cn/fee/futureFee
TotalLong = 0    #做多总价值
TotalShort = 0   #做空总价值
Profit = 0       #收益
Account = {}     #保存账户信息
WinRateData = {}  # 存储胜率信息
assets = {}
tradeInfo = {}
accountAssets = {}
runtimeData = {}

if IsVirtual():
    Log('不能进行回测')
    exit()

tradeSymbols = list(TradeSymbols.replace(' ','').split(','))
Index = 1   #指数
UpdateBasePriceTime = 0
InitPrice = {}
updateProfitTime = 0


#
assets['USDT'] = {'unrealised_profit':0,'margin':0,'margin_balance':0,'total_balance':0,'leverage':0,'update_time':0,'margin_ratio':0,'init_balance':0,'stop_balance':0,'short_value':0,'long_value':0,'profit':0}

if exchange.GetName() != 'Futures_Binance':
    Log('只支持币安期货交易所！')
    exit()

def init():
    InitRateData()
    exchangeInfo = requests.get('https://fapi.binance.com/fapi/v1/exchangeInfo').json()
    if exchangeInfo is None:
        Log('无法连接币安网络，需要海外托管者')
        exit()
    #Log(exchangeInfo)
    for i in range(len(exchangeInfo['symbols'])):
        if len(exchangeInfo['symbols'][i]['symbol'].split('_')) > 1 :continue
        sp = exchangeInfo['symbols'][i]['symbol'].split('_')[0]
        symbol = sp.replace('USDT','')
        #Log(sp)
        BUSD = sp[-4:len(sp)]
        if 'BUSD' != BUSD or symbol not in exchangeInfo['symbols'][i]['symbol']:   #排除BUSD交易对
            if symbol in tradeSymbols:
                assets[symbol] = {'amount': 0,'hold_price': 0,'value': 0,'bid_price': 0,'ask_price': 0,'btc_price': 0, 'btc_change': 1,'btc_diff': 0,
                'realised_profit': 0,'margin': 0,'unrealised_profit': 0,'leverage': 20, 'positionInitialMargin': 0,  'liquidationPrice': 0 }
                tradeInfo[symbol] = {'minQty': float(exchangeInfo['symbols'][i]['filters'][1]['minQty']) ,
                'priceSize': int((math.log10(1.1/float(exchangeInfo['symbols'][i]['filters'][0]['tickSize'])))),'amountSize': int((math.log10(1.1/float(exchangeInfo['symbols'][i]['filters'][1]['stepSize']))))}


def UpdateAccount():
    global accountAssets ,StopLoss
    #判断当前是模拟交易还是实盘交易
    if MockTrading:
        Log('模拟交易更新账户')

    else:
        #Log('实盘交易更新账户')
        account = exchange.GetAccount()
        ps = exchange.GetPosition()
        if account is None:
            Log('更新账户超时！')
            return
        accountAssets = account['Info']['assets']
        assets['USDT']['update_time'] = int(time.time() * 1000)
        #Log(account['Info']['positions'])
        for i in range(len(account['Info']['positions'])):
            symbol = account['Info']['positions'][i]['symbol']
            if len(symbol.split('_')) > 1: continue   #过滤掉 例：symbol:ETHUSDT_211231  合约
            sp = symbol.split('_')[0]
            #排除掉BUSD交易对 和不在交易列表的交易对
            coin = sp.replace('USDT','')
            BUSD = sp[-4:len(sp)]
            if 'BUSD' == BUSD or coin not in tradeSymbols: continue
            #筛选单向持仓币种
            if account['Info']['positions'][i]['positionSide'] == 'BOTH':
                # if coin == 'ETH':
                #     Log(coin,account['Info']['positions'][i])
                #Log('symbol:',symbol)
                assets[coin]['margin'] = float(account['Info']['positions'][i]['initialMargin']) + float(account['Info']['positions'][i]['maintMargin'])
                assets[coin]['unrealised_profit'] = float(account['Info']['positions'][i]['unrealizedProfit'])
                assets[coin]['positionInitialMargin'] = float(account['Info']['positions'][i]['positionInitialMargin'])
                assets[coin]['leverage'] = account['Info']['positions'][i]['leverage']
        #Log(assets)
        #计算持仓保证金总额
        assets['USDT']['margin'] = float(account['Info']['totalInitialMargin']) + float(account['Info']['totalMaintMargin'])
        assets['USDT']['margin_balance'] = float(account['Info']['totalMarginBalance'])
        assets['USDT']['total_balance'] = float(account['Info']['totalWalletBalance'])
        if assets['USDT']['init_balance'] == 0:
            if _G('init_balance'):
                assets['USDT']['init_balance'] = _N(_G('init_balance'),2)
            else:
                assets['USDT']['init_balance'] = assets['USDT']['total_balance']
                _G('init_balance',assets['USDT']['init_balance'])
        #计算收益
        assets['USDT']['profit'] = _N(float(assets['USDT']['margin_balance']) - float(assets['USDT']['init_balance']),2)
        #计算止损位置
        assets['USDT']['stop_balance'] = _N(StopLossRate * assets['USDT']['init_balance'], 2)
        #计算未实现收益
        assets['USDT']['unrealised_profit'] = _N(float(account['Info']['totalUnrealizedProfit']),2)
        #计算杠杆
        assets['USDT']['leverage'] = _N(assets['USDT']['margin'] / float(assets['USDT']['total_balance']))
        #计算保证金率
        assets['USDT']['margin_ratio'] = _N(float(account['Info']['totalMaintMargin']) / float(account['Info']['totalMarginBalance'])) * 100
        exchange.SetContractType('swap')
        ps = json.loads(exchange.GetRawJSON())
        # 更新持仓
        #Log('position:',ps)
        if len(ps) > 0:
            j = 1
            for i in range(len(ps)):
                #Log(ps[i])
                if len(ps[i]['symbol'].split('_')) > 1: continue   #过滤掉 例：symbol:ETHUSDT_211231  合约
                sp = ps[i]['symbol'].split('_')[0]
                BUSD = sp[-4:len(sp)]
                symbol = sp.replace('USDT','')


                if 'BUSD' == BUSD or symbol not in tradeSymbols : continue
                if ps[i]['positionSide'] != 'BOTH': continue
                assets[symbol]['hold_price'] = float(ps[i]['entryPrice'])
                assets[symbol]['amount'] = float(ps[i]['positionAmt'])
                assets[symbol]['unrealised_profit'] = float(ps[i]['unRealizedProfit'])
                assets[symbol]['liquidationPrice'] = float(ps[i]['liquidationPrice'])
                assets[symbol]['marginType'] = ps[i]['marginType']
                #Log(j,assets[symbol])
                #j+=1
        #Log('实盘账户更新完毕！')


def UpdateTick():
    try:
        ticker = requests.get('https://fapi.binance.com/fapi/v1/ticker/bookTicker').json()
    except Exception as e:
        Log('get ticker time out !')
        return
    assets['USDT']['long_value'] = 0
    assets['USDT']['short_value'] = 0
    for i in range(len(ticker)):
        sp = ticker[i]['symbol'].split('_')[0]
        if len(ticker[i]['symbol'].split('_')) > 1: continue   #过滤掉 例：symbol:ETHUSDT_211231  合约
        BUSD = sp[-4:len(sp)]
        symbol = sp.replace('USDT','')
        if 'BUSD' == BUSD or symbol not in tradeSymbols: continue
        # if symbol == 'BTCDOM':
        #     Log(symbol,ticker[i])
        #Log(ticker[i])
        assets[symbol]['ask_price'] = float(ticker[i]['askPrice'])
        assets[symbol]['bid_price'] = float(ticker[i]['bidPrice'])
        assets[symbol]['ask_value'] = _N(assets[symbol]['amount'] * assets[symbol]['ask_price'], 2)
        assets[symbol]['bid_value'] = _N(assets[symbol]['amount'] * assets[symbol]['bid_price'], 2)

        # if symbol == 'BTCDOM':
        #     Log(symbol,assets[symbol])
        value = (assets[symbol]['ask_value'] + assets[symbol]['bid_value']) / 2
        if value != 0:
            if value > 0:
                assets['USDT']['long_value'] += value
            else:
                assets['USDT']['short_value'] += value

        # if assets[symbol]['amount'] < 0:
        #     assets['USDT']['short_value'] += abs((assets[symbol]['ask_value'] + assets[symbol]['bid_price']) / 2)
        # else:
        #     assets['USDT']['long_value'] += abs((assets[symbol]['ask_value'] + assets[symbol]['bid_value']) / 2)

        assets['USDT']['short_value']    = _N(assets['USDT']['short_value'], 2)
        assets['USDT']['long_value']     = _N(assets['USDT']['long_value'], 2)

        #Log('UpdateTick:',symbol,assets[symbol])
    #更新指数
    UpdateIndex()
    for symbol in  tradeSymbols:
        assets[symbol]['btc_diff'] = _N((assets[symbol]['btc_change'] - Index), 4)


def UpdateIndex():
    global UpdateBasePriceTime,InitPrice,Index,Reset

    if MockTrading:
        Log('模拟交易模式更新指数')
    else:
        #Log('实盘交易模式更新指数')
        if _G('InitPrice') is None or Reset:
            Reset = False
            for symbol in tradeSymbols:
                InitPrice[symbol] = (assets[symbol]['ask_price'] + assets[symbol]['bid_price']) / (assets['BTC']['ask_price'] + assets['BTC']['bid_price'])
            Log('保存启动时的价格')
            _G('InitPrice',InitPrice)
            _G('StartTime',None)
            _G('InitAccount_'+exchange.GetLabel(), None)
            _G('tradeNumber', 0) #重置交易次数
            _G('tradeVolume', 0) #重置交易量
            _G('buyNumber', 0) #重置做多次数
            _G('sellNumber', 0) #重置做空次数
            _G('totalProfit', 0) #重置打印次数
            _G('profitNumber', 0) #重置盈利次数
        else:
            InitPrice = _G('InitPrice')
            if int(time.time()*1000) - UpdateBasePriceTime > UpdateBasePriceInterval:
                UpdateBasePriceTime = int(time.time() * 1000)
                for symbol in tradeSymbols:
                    if symbol not in InitPrice: continue
                    InitPrice[symbol] = InitPrice[symbol] * (1 - Alpha) + Alpha * (assets[symbol]['ask_price'] + assets[symbol]['bid_price']) / (assets['BTC']['ask_price'] + assets['BTC']['bid_price'])
                    _G('InitPrice',InitPrice)
            temp = 0
            for symbol in tradeSymbols:
                assets[symbol]['btc_price'] = (assets[symbol]['ask_price'] + assets[symbol]['bid_price']) / (assets['BTC']['ask_price'] + assets['BTC']['bid_price'])
                if symbol not in InitPrice:
                    Log('添加新的币种：',symbol)
                    InitPrice[symbol] = assets[symbol]['btc_price']
                    _G('InitPrice',InitPrice)
                #Log(symbol,assets[symbol]['btc_price'],InitPrice[symbol])
                assets[symbol]['btc_change'] = _N(assets[symbol]['btc_price'] / InitPrice[symbol], 4)
                temp += assets[symbol]['btc_change']
            Index = _N(temp / len(tradeSymbols), 4)
            #Log('最新指数：',Index)


#止损模块
def StopLoss():
    if assets['USDT']['margin_balance'] < StopLossRate * assets['USDT']['init_balance'] and assets['USDT']['init_balance'] != 0:
        Log('出发止损！ 当前资金：',assets['USDT']['margin_balance'],'初始资金：',assets['USDT']['init_balance'])
        UpdateAccount()
        UpdateTick()
        Ice_value = 200 #止损的快一些，可修改
        trading = False
        for symbol in tradeSymbols:
            if assets[symbol]['bid_price'] == 0 : continue
            if assets[symbol]['bid_value'] >= tradeInfo[symbol]['minQty'] * assets[symbol]['bid_price']:
                ## TODO: 卖出止损
                trading = True
                pass
            if assets[symbol]['ask_value'] <= tradeInfo[symbol]['minQty'] * assets[symbol]['ask_price']:
                # TODO: 买入止损
                trading = True
                pass
            Sleep(1000)
            if not trading:
                Log('止损结束，如果需要重新运行策略，请调低止损参数！')
                exit()
    else:  # 不用止损
        return None

def Trade(symbol,direction,value):
    if int(time.time()) - assets['USDT']['update_time'] > 10 * 1000:
        Log('更新账户延迟，不进行交易！！！')
    else:
        price = assets[symbol]['bid_price'] if direction =='SELL' else assets[symbol]['ask_price']
        amount = _N(min(IceValue,value) / price,tradeInfo[symbol]['amountSize'])
        if amount < tradeInfo[symbol]['minQty']:
            Log(symbol,'合约价值偏离或冰山委托设置的过小，达不到最小成交额，最小需要：', _N(tradeInfo[symbol]['minQty'] * price,4) + 1)
        else:
            # exchange.SetCurrency(symbol+'_USDT')
            # Log(direction)
            # exchange.SetDirection(direction)
            # f = 'Buy' if direction == 'Buy' else 'Sell'
            # Log(f)
            # place_order = getattr(exchange,direction) #获取交易对象
            # id = place_order(price,amount,symbol)
            para = ''
            url = '/fapi/v1/order'
            para += 'symbol='+ symbol + 'USDT'
            para += '&side='+ direction
            para += '&type=LIMIT&timeInForce=IOC'
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

            TradingCounter('tradeVolume',amount * price)
            TradingCounter('tradeNumber',1)
            WinRateData[symbol]['tradeNumber'] += 1
            if direction == 'Buy':
                TradingCounter('buyNumber',1)
                WinRateData[symbol]['buyNumber'] += 1
            else:
                TradingCounter('sellNumber',1)
                WinRateData[symbol]['sellNumber'] += 1
            _G('WinRateData',WinRateData)
            return id

def FirstAccount():
    key = "initialAccount_" + exchange.GetLabel()
    initialAccount = _G(key)
    if initialAccount is None:
        initialAccount = exchange.GetAccount()
        _G(key, initialAccount)
    return initialAccount

def AppendedStatus():
    global TotalLong,TotalShort,RunTime,Funding,Account
    accountTable = {
        'type': "table",
        'title': "盈利统计",
        'cols': ["运行天数", "初始资金", "现有资金", "保证金余额", "已用保证金", "保证金比率", "止损", "总收益", "预计年化", "预计月化", "平均日化"],
        'rows': []
    }
    feeTable = {
        'type': 'table',
        'title': '交易统计',
        'cols': ["策略指数", '交易次数', '做多次数', '做空次数', '预估胜率', '预估成交额', '预估手续费', "未实现盈利", '持仓总值', '做多总值', '做空总值'],
        'rows': []
    }
    runday = runtimeData['dayDiff']
    if runday == 0:
        runday = 1
    if Funding == 0:
        Funding = float(FirstAccount()['Info']['totalWalletBalance'])
    profitColors = DangerColor
    totalProfit = assets['USDT']['total_balance'] - Funding
    if totalProfit > 0:
        profitColors = SuccessColor
    dayProfit = totalProfit / runday
    dayRate = dayProfit / Funding * 100

    accountTable['rows'].append([
        runday,
        '$' + str(_N(Funding, 2)),
        '$' + str(assets['USDT']['total_balance']),
        '$' + str(assets['USDT']['margin_balance']),
        '$' + str(assets['USDT']['margin']),
        str(_N(assets['USDT']['margin_ratio'], 2)) + '%',
        str(_N(assets['USDT']['stop_balance'], 2)) + DangerColor,
        str(_N(totalProfit / Funding * 100, 2)) + "% = $" + str(_N(totalProfit, 2)) + (profitColors),
        str(_N(dayRate * 365, 2)) + "% = $" + str(_N(dayProfit * 365, 2)) + (profitColors),
        str(_N(dayRate * 30, 2)) + "% = $" + str(_N(dayProfit * 30, 2)) + (profitColors),
        str(_N(dayRate, 2)) + "% = $" + str(_N(dayProfit, 2)) + (profitColors)
    ])

    vloume = _G('tradeVolume') if _G('tradeVolume') is not None else 0

    feeTable['rows'].append([
        Index, #指数
        _G('tradeNumber') if _G('tradeNumber') is not None else 0, #交易次数
        _G('buyNumber') if _G('buyNumber') is not None else 0, #做多次数
        _G('sellNumber') if _G('sellNumber') is not None else 0, #做空次数
        str(_N(_G('profitNumber') / _G('totalProfit') * 100, 2) if _G('totalProfit') > 0 else 0) + '%', #胜率
        '$' + str(_N(vloume, 2)) + ' ≈ ฿' + str(_N(vloume / ((assets['BTC']['bid_price'] + assets['BTC']['ask_price']) / 2), 6)), #成交金额
        '$' + str(_N(vloume * (SelfFee / 100), 4)), #手续费
        '$' + str(_N(assets['USDT']['unrealised_profit'], 2)) + (SuccessColor if assets['USDT']['unrealised_profit'] >= 0 else DangerColor),
        '$' + str(_N(TotalLong + abs(TotalShort), 2)), #持仓总价值
        '$' + str(_N(TotalLong, 2)) + SuccessColor, #做多总值
        '$' + str(_N(abs(TotalShort), 2)) + DangerColor, #做空总值
    ])

    assetTable = {
        'type': 'table',
        'title': '账户资产信息',
        'cols': ['编号', '资产名', '起始保证金', '维持保证金', '保证金余额', '最大可提款金额', '挂单起始保证金', '持仓起始保证金', '持仓未实现盈亏', '账户余额'],
        'rows': []
    }
    for i in range(len(accountAssets)):
        acc = accountAssets[i]
        assetTable['rows'].append([
            i + 1,
            acc['asset'], acc['initialMargin'], acc['maintMargin'], acc['marginBalance'],
            acc['maxWithdrawAmount'], acc['openOrderInitialMargin'], acc['positionInitialMargin'],
            acc['unrealizedProfit'], acc['walletBalance']
        ])
    indexTable = {
        'type': 'table',
        'title': '币指数信息',
        'cols': ['编号', '币种信息', '当前价格', 'BTC计价', 'BTC计价变化(%)', '偏离平均', '交易次数', '做空次数', '做多次数', '预估胜率'],
        'rows': []
    }

    i = 0
    for symbol in tradeSymbols :
        price = _N((assets[symbol]['ask_price'] + assets[symbol]['bid_price']) / 2, tradeInfo[symbol]['priceSize'])
        if symbol not in tradeSymbols:
            indexTable['rows'].append([i + 1, symbol, price, assets[symbol]['btc_price'], _N((1 - assets[symbol]['btc_change']) * 100), assets[symbol]['btc_diff']], 0, 0, 0, '0%')
        else:
            i += 1
            WinRateData = _G("WinRateData")
            winRated = _N(WinRateData[symbol]['profitNumber'] / WinRateData[symbol]['totalProfit'] * 100, 2) if WinRateData[symbol]['totalProfit'] > 0 else 0
            indexTable['rows'].append([
                i,
                symbol + WrningColor,
                price,
                _N(assets[symbol]['btc_price'], 6),
                _N((1 - assets[symbol]['btc_change']) * 100),
                str(assets[symbol]['btc_diff']) + (SuccessColor if assets[symbol]['btc_diff'] >= 0 else DangerColor),
                WinRateData[symbol]['tradeNumber'],
                WinRateData[symbol]['sellNumber'],
                WinRateData[symbol]['buyNumber'],
                (str(winRated) if WinRateData[symbol]['profitNumber'] > 0 and WinRateData[symbol]['totalProfit'] > 0 else '0') + '%' + (SuccessColor if winRated >= 50 else DangerColor), #胜率
            ])
    retData = {}
    #Log(runtimeData['str'])
    #retData['upTable'] = runtimeData['str'] + '\n' + "最后更新: " + _D() + '\n' + 'Version:' + Version + '\n' + '`' + json.dumps([accountTable, assetTable]) + '`\n' + '`' + json.dumps(feeTable) + '`\n'
    retData['upTable'] = runtimeData['str'] + '\n' + "最后更新: " + _D() + '\n' + 'Version:' + Version  + '\n' + '`' + json.dumps([accountTable, assetTable]) + '`\n' + '`' + json.dumps(feeTable) + '`\n'
    retData['indexTable'] = indexTable
    return retData



def UpdateStatus():
    global TotalLong,TotalShort,updateProfitTime,Funding,Profit
    TotalLong = 0
    TotalShort = 0
    table = {
        'type': 'table',
        'title': '交易对信息',
        'cols': ['编号', '[模式][倍数]', '币种信息', '开仓方向', '开仓数量', '持仓价格', '当前价格', '强平价格', '强平差价', '持仓价值', '保证金', '未实现盈亏', '投降'],
        'rows': []
    }
    i = 0
    for symbol in tradeSymbols:
        i += 1
        direction = '空仓'
        margin = direction
        if assets[symbol]['amount'] != 0:
            direction = '做多' + SuccessColor if assets[symbol]['amount'] > 0 else '做空' + DangerColor
            margin = '全仓' if assets[symbol]['marginType'] == 'cross' else '逐仓'
        price = _N((assets[symbol]['ask_price'] + assets[symbol]['bid_price']) / 2 ,tradeInfo[symbol]['priceSize'])
        value = _N((assets[symbol]['ask_value'] + assets[symbol]['bid_value'])/2 , 2)
        if value != 0:
            if value > 0:
                TotalLong += value
            else:
                TotalShort += value
        unrealised_profit_color = '#000000'
        if assets[symbol]['unrealised_profit'] > 0:
            unrealised_profit_color = SuccessColor
        if assets[symbol]['unrealised_profit'] < 0:
            unrealised_profit_color = DangerColor
        infoList = [
            i,
            '['+ margin +']' +'[' + str(assets[symbol]['leverage']) +'X]',
            symbol,
            direction,
            abs(assets[symbol]['amount']),
            assets[symbol]['hold_price'],
            price,
            assets[symbol]['liquidationPrice'],
            '0' if assets[symbol]['liquidationPrice'] == 0 else '$' + str(_N(assets[symbol]['liquidationPrice'] - price, 5)) + ' ≈ ' + str(_N(assets[symbol]['liquidationPrice'] / price * 100, 2)) + '%' + WrningColor, #强平价格
            abs(value),
            _N(assets[symbol]['positionInitialMargin'],2),
            str(_N(assets[symbol]['unrealised_profit'], 3)) + unrealised_profit_color,
            {
                'type': 'button',
                'cmd': '说好的没有撤退可言呢？？?:' + symbol + ':' + str(assets[symbol]['amount']) + ':',
                'name': symbol + ' 投降'
            }

        ]
        table['rows'].append(infoList)
        logString = json.dumps(assets['USDT'])

        StatusData = AppendedStatus()
        LogStatus(StatusData['upTable'] + '`' + json.dumps([table, StatusData['indexTable']]) + '`\n' + logString)
        # LogStatus('`' + json.dumps([table, StatusData['indexTable']]) + '`\n' + logString)

        if int(time.time()*1000) - updateProfitTime > LogInterval * 1000:
            balance = assets['USDT']['total_balance']
            if Show:
                balance = assets['USDT']['total_balance'] - Funding
            LogProfit(_N(balance, 3), '&')
            updateProfitTime = int(time.time()*1000)
            if Profit != 0 and (_N(balance, 0) != Profit): #第一次不计算,并且小数点面的不进行胜率计算
                TradingCounter("totalProfit", 1) #统计打印次数, 胜率=盈利次数/打印次数*100
                if _N(balance, 0) > Profit:
                    TradingCounter('profitNumber', 1) #盈利次数
                WinRate()
            Profit = _N(balance,0)


# 策略主逻辑
def Process():
    # UpdateTick()
    for symbol in tradeSymbols:
        if assets[symbol]['ask_price'] == 0 : continue
        aim_value = -TradeValue * _N(assets[symbol]['btc_diff'] / 0.01 ,3)  #计算偏离1%需要加的仓位
        #偏移仓位 - 持有仓位 > 偏离加仓阈值 并且 diff > 预设最小加仓值 并且 多方仓位 - 空方仓位 小于等于 1.1倍的 偏离加仓  则进行开多仓
        # if symbol == 'IOTA':
        #     Log(symbol,aim_value - assets[symbol]['ask_value'])
        if (aim_value - assets[symbol]['ask_value']) >= DeviateValue and assets[symbol]['btc_diff'] > MinDiff :
            Log('做多',symbol,'   aim_value:',aim_value,'   ask_value:',assets[symbol]['ask_value'],'amount:',(aim_value - assets[symbol]['ask_value']), '   偏离平均:',assets[symbol]['btc_diff'])
            Trade(symbol,'BUY',aim_value - assets[symbol]['ask_value'])
        if (aim_value - assets[symbol]['bid_value']) <= -DeviateValue and assets[symbol]['btc_diff'] < MaxDiff:
            Log('做空',symbol,'   aim_value:',aim_value,'   ask_value:',assets[symbol]['ask_value'],'amount:',(aim_value - assets[symbol]['bid_value']),  '   偏离平均:',assets[symbol]['btc_diff'])
            Trade(symbol,'SELL',-(aim_value - assets[symbol]['bid_value']) )


# 保存交易量
def TradingCounter(key,newValue):
    value = _G(key)
    if value is None:
        _G(key,newValue)
    else:
        _G(key,value + newValue)


def WinRate():
    global WinRateData
    for symbol in tradeSymbols:
        unrealised = assets[symbol]['unrealised_profit']
        WinRateData[symbol]['totalProfit'] += 1
        if unrealised != 0:
            if unrealised > 0:
                WinRateData[symbol]['profitNumber'] += 1
    _G("WinRateData", WinRateData)

#更新胜率信息
def InitRateData():
    global WinRateData
    if Reset:
        _G('WinRateData',None)
    if _G('WinRateData'):
        WinRateData = _G('WinRateData')
    for symbols in tradeSymbols:
        if symbols not in WinRateData:
                                 #统计次数        #盈利次数          #交易次数       #做多次数        #做空次数
            WinRateData[symbols] = {'totalProfit': 0, 'profitNumber': 0,'tradeNumber': 0,'buyNumber': 0, 'sellNumber': 0}
    _G('WinRateData',WinRateData)
 #获取或创建策略第一次启动时间
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
    exchange.SetContractType('swap')
    exchange.SetMarginLevel(20)
    SetErrorFilter("502:|503:|tcp|character|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|http|received|EOF|reused|Unknown")
    global runtimeData
    while True:
        runtimeData = RunTime()
        #更新账户和持仓
        UpdateAccount()
        #更新行情
        UpdateTick()
        #止损模块
        StopLoss()
        #策略逻辑
        Process()
        #输出状态栏信息
        UpdateStatus()

        Sleep(Interval * 1000)

```

> Detail

https://www.fmz.com/strategy/322094

> Last Modified

2021-10-09 13:46:54
