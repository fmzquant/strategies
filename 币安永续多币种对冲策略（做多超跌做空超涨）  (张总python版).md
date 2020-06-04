
> 策略名称

币安永续多币种对冲策略（做多超跌做空超涨）  (张总python版)

> 策略作者

汇链资本



> 策略参数



|参数|默认值|描述|
|----|----|----|
|Trade_symbols|IOST,TRX,XLM,QTUM,DASH,ADA,BNB,XMR,ZEC,ATOM,IOTA,NEO,ONT,XRP,BAT,VET,EOS,ETC,LTC|交易的币种|
|Trade_value|50|每偏离指数1%持有价值|
|Adjust_value|20|合约价值调整偏离值|
|Ice_value|20|冰山委托订单的大小|
|Log_profit_interval|600|Log总权益间隔s|
|Interval|5|休眠时间s|
|Reset|false|重置历史数据|


> 源码 (python)

``` python
#刚学python，希望指正！共同学习！
import time
import requests
import math
Alpha = 0.001 #指数移动平均的Alpha参数，设置的越大，基准价格跟踪越敏感，最终持仓也会越低，降低了杠杆，但会降低收益，具体需要根据回测结果自己权衡
Update_base_price_time_interval = 60 #多久更新一次基准价格, 单位秒，和Alpha参数相关,Alpha 设置的越小，这个间隔也可以设置的更小
#Stop_loss设置为0.8表示当资金达到低于初始资金的80%时，止损，清空所有仓位，停止策略。
#随着策略运行，Stop_loss可以设置大于1（重启生效），比如从1000赚到1500，Stop_loss设置为1.3，则回撤到1300元止损。不想止损可以把这个参数设置的很小。
#风险是大家都用这种止损会形成踩踏，加大亏损。
#初始资金在状态栏的init_balance字段，注意提现等操作会影响，别不小心止损了。
#如果还是怕黑天鹅事件，比如某个币归0等，可以手动提现出来。

Stop_loss = 0.8
Max_diff = 0.03 #当偏差diff大于0.4时，不继续加空仓, 自行设置
Min_diff = -0.03 #当diff小于-0.3时，不继续加多仓, 自行设置
Version = '0.1.3'
Show = false #默认为false累计收益显示是账户余额,改为true累计收益显示为收益,如果之前是显示的账户余额,你使用LogProfitReset()来清空图表
Funding = 0 #账户初始金额,为0的时候,自动获取,非0为自定义
success = '#5cb85c' #成功颜色
danger = '#ff0000' #危险颜色
warning = '#f0ad4e' #警告颜色
RunTime = {} #运行时间
SelfFee = 0.04 #https:#www.binance.com/cn/fee/futureFee
TotalLong = 0
TotalShort = 0
UpProfit = 0
accountAssets = [] #保存资产
WinRateData = {} #保存所有币种的胜率及开仓次数

if IsVirtual():
    Log('不能回测，回测参考 https://www.fmz.com/digest-topic/5294 ')
    exit()
if exchange.GetName() != 'Futures_Binance':
    Log('只支持币安期货交易所，和现货交易所不同，需要单独添加，名称为Futures_Binance')
    exit()
trade_symbols = Trade_symbols.split(',')
symbols = trade_symbols + ['BTC']
index = 1 #指数
update_profit_time = 0
update_base_price_time = int(time.time()*1000)
assets = {}
init_prices = {}
trade_info = {}

def init():
    InitRateData()
    exchange_info = requests.get('https://fapi.binance.com/fapi/v1/exchangeInfo').json()
    if exchange_info is None:
        Log('无法连接币安网络，需要海外托管者')
        exit()    
    for i in range(len(exchange_info['symbols'])):
        if exchange_info['symbols'][i]['baseAsset'] in symbols:            
            assets[exchange_info['symbols'][i]['baseAsset']] = {'amount': 0,'hold_price': 0,'value': 0,'bid_price': 0,'ask_price': 0,'btc_price': 0, 'btc_change': 1,'btc_diff': 0,'realised_profit': 0,'margin': 0,'unrealised_profit': 0,'leverage': 20, 'positionInitialMargin': 0,  'liquidationPrice': 0 }
            trade_info[exchange_info['symbols'][i]['baseAsset']] = {'minQty': float(exchange_info['symbols'][i]['filters'][1]['minQty']) , 'priceSize': int((math.log10(1.1/float(exchange_info['symbols'][i]['filters'][0]['tickSize'])))),'amountSize': int((math.log10(1.1/float(exchange_info['symbols'][i]['filters'][1]['stepSize']))))}

assets['USDT'] = {
    'unrealised_profit': 0,
    'margin': 0,
    'margin_balance': 0,
    'total_balance': 0,
    'leverage': 0,
    'update_time': 0,
    'margin_ratio': 0,
    'init_balance': 0,
    'stop_balance': 0,
    'short_value': 0,
    'long_value': 0,
    'profit': 0
}

def updateAccount() : #更新账户和持仓
    global accountAssets
    account = exchange.GetAccount()
    pos = exchange.GetPosition()
    if account is None or pos is None:
        Log('update account time out')
        return    
    accountAssets = account['Info']['assets']
    assets['USDT']['update_time'] = int(time.time()*1000)
    for i in range(len(trade_symbols)):
        assets[trade_symbols[i]]['margin'] = 0
        assets[trade_symbols[i]]['unrealised_profit'] = 0
        assets[trade_symbols[i]]['hold_price'] = 0
        assets[trade_symbols[i]]['amount'] = 0
    
    for j in range(len(account['Info']['positions'])):        
        if account['Info']['positions'][j]['positionSide'] == 'BOTH':
            pair = account['Info']['positions'][j]['symbol']
            coin = pair[0:len(pair)-4]
            if coin not in trade_symbols:
                continue
            assets[coin]['margin'] = float(account['Info']['positions'][j]['initialMargin']) + float(account['Info']['positions'][j]['maintMargin'])
            assets[coin]['unrealised_profit'] = float(account['Info']['positions'][j]['unrealizedProfit'])
            assets[coin]['positionInitialMargin'] = float(account['Info']['positions'][j]['positionInitialMargin'])
            assets[coin]['leverage'] = account['Info']['positions'][j]['leverage']

    assets['USDT']['margin'] = _N(float(account['Info']['totalInitialMargin']) + float(account['Info']['totalMaintMargin']), 2)
    assets['USDT']['margin_balance'] = _N(float(account['Info']['totalMarginBalance']), 2)
    assets['USDT']['total_balance'] = _N(float(account['Info']['totalWalletBalance']), 2)
    if assets['USDT']['init_balance'] == 0:
        if _G('init_balance'):
            assets['USDT']['init_balance'] = _N(_G('init_balance'), 2)
        else:
            assets['USDT']['init_balance'] = assets['USDT']['total_balance']
            _G('init_balance', assets['USDT']['init_balance'])
    assets['USDT']['profit'] = _N(assets['USDT']['margin_balance'] - assets['USDT']['init_balance'], 2)
    assets['USDT']['stop_balance'] = _N(Stop_loss * assets['USDT']['init_balance'], 2)
    assets['USDT']['total_balance'] = _N(float(account['Info']['totalWalletBalance']), 2)
    assets['USDT']['unrealised_profit'] = _N(float(account['Info']['totalUnrealizedProfit']), 2)
    assets['USDT']['leverage'] = _N(assets['USDT']['margin'] / assets['USDT']['total_balance'], 2)
    assets['USDT']['margin_ratio'] = float(account['Info']['totalMaintMargin']) / float(account['Info']['totalMarginBalance']) * 100
    pos = json.loads(exchange.GetRawJSON())
    if len(pos) > 0:
        for k in range(len(pos)):
            pair = pos[k]['symbol']
            coin = pair[0:len(pair)-4]
            if coin not in trade_symbols:
                continue            
            if pos[k]['positionSide'] != 'BOTH':
                continue       
            assets[coin]['hold_price'] = float(pos[k]['entryPrice'])
            assets[coin]['amount'] = float(pos[k]['positionAmt'])
            assets[coin]['unrealised_profit'] = float(pos[k]['unRealizedProfit'])
            assets[coin]['liquidationPrice'] = float(pos[k]['liquidationPrice'])
            assets[coin]['marginType'] = pos[k]['marginType']

def updateIndex(): #更新指数
    global update_base_price_time,index,init_prices,Reset
    if _G('init_prices') is None or Reset:
        Reset = False
        for i in range(len(trade_symbols)):
            init_prices[trade_symbols[i]] = (assets[trade_symbols[i]]['ask_price'] + assets[trade_symbols[i]]['bid_price']) / (assets['BTC']['ask_price'] + assets['BTC']['bid_price'])
        Log('保存启动时的价格')
        _G('init_prices', init_prices)
        _G("StartTime", None) #重置开始时间
        _G("initialAccount_" + exchange.GetLabel(), None) #重置开始资金
        _G('tradeNumber', 0) #重置交易次数
        _G('tradeVolume', 0) #重置交易量
        _G('buyNumber', 0) #重置做多次数
        _G('sellNumber', 0) #重置做空次数
        _G('totalProfit', 0) #重置打印次数
        _G('profitNumber', 0) #重置盈利次数
    else:
        init_prices = _G('init_prices')
        if (int(time.time()*1000) - update_base_price_time > Update_base_price_time_interval * 1000):
            update_base_price_time = int(time.time()*1000)
            for i in range(len(trade_symbols)): #更新初始价格
                init_prices[trade_symbols[i]] = init_prices[trade_symbols[i]] * (1 - Alpha) + Alpha * (assets[trade_symbols[i]]['ask_price'] + assets[trade_symbols[i]]['bid_price']) / (assets['BTC']['ask_price'] + assets['BTC']['bid_price'])
            _G('init_prices', init_prices)
        temp = 0
        for i in range(len(trade_symbols)):
            assets[trade_symbols[i]]['btc_price'] = (assets[trade_symbols[i]]['ask_price'] + assets[trade_symbols[i]]['bid_price']) / (assets['BTC']['ask_price'] + assets['BTC']['bid_price'])
            if trade_symbols[i] not in init_prices:
                Log('添加新的币种', trade_symbols[i])
                init_prices[trade_symbols[i]] = assets[trade_symbols[i]]['btc_price']
                _G('init_prices', init_prices)
            assets[trade_symbols[i]]['btc_change'] = _N(assets[trade_symbols[i]]['btc_price'] / init_prices[trade_symbols[i]], 4)
            temp += assets[trade_symbols[i]]['btc_change']        
        index = _N(temp / len(trade_symbols), 4)

def updateTick() : #更新行情
    try:
        ticker = requests.get('https://fapi.binance.com/fapi/v1/ticker/bookTicker').json()
    except Exception as e:
        Log('get ticker time out:',e)
        return
    assets['USDT']['short_value'] = 0
    assets['USDT']['long_value'] = 0
    for i in range(len(ticker)):
        pair = ticker[i]['symbol']
        coin = pair[0:len(pair)-4]
        if coin not in symbols:
            continue
        assets[coin]['ask_price'] = float(ticker[i]['askPrice'])
        assets[coin]['bid_price'] = float(ticker[i]['bidPrice'])
        assets[coin]['ask_value'] = _N(assets[coin]['amount'] * assets[coin]['ask_price'], 2)
        assets[coin]['bid_value'] = _N(assets[coin]['amount'] * assets[coin]['bid_price'], 2)
        if coin not in trade_symbols:
            continue
        if assets[coin]['amount'] < 0 :
            assets['USDT']['short_value'] += abs((assets[coin]['ask_value'] + assets[coin]['bid_value']) / 2)
        else:
            assets['USDT']['long_value'] += abs((assets[coin]['ask_value'] + assets[coin]['bid_value']) / 2)        
        assets['USDT']['short_value'] = _N(assets['USDT']['short_value'], 0)
        assets['USDT']['long_value'] = _N(assets['USDT']['long_value'], 0)    
    updateIndex()
    for i in range(len(trade_symbols)):
        assets[trade_symbols[i]]['btc_diff'] = _N(assets[trade_symbols[i]]['btc_change'] - index, 4)

def trade(symbol, dirction, value) : #交易
    if (int(time.time()*1000) - assets['USDT']['update_time'] > 10 * 1000):
        Log('更新账户延时，不交易')
    else:
        price = assets[symbol]['bid_price'] if dirction == 'sell' else assets[symbol]['ask_price']
        amount = _N(min(value, Ice_value) / price, trade_info[symbol]['amountSize'])
        if amount < trade_info[symbol]['minQty']:
            Log(symbol, '合约价值偏离或冰山委托订单的大小设置过小，达不到最小成交, 至少需要: ', _N(trade_info[symbol]['minQty'] * price, 0) + 1)
        else:
            exchange.IO("currency", symbol + '_' + 'USDT')
            exchange.SetContractType('swap')
            exchange.SetDirection(dirction)
            #f = 'Buy' if dirction == 'buy' else 'Sell'
            place_order = getattr(exchange,'Buy' if dirction == 'buy' else 'Sell')
            id = place_order(price, amount, symbol)
            if id:
                exchange.CancelOrder(id) #订单会立即撤销
            tradingCounter('tradeVolume', price * amount) #保存交易量
            tradingCounter('tradeNumber', 1) #保存交易次数
            WinRateData[symbol]['tradeNumber'] += 1
            if dirction == 'buy':
                tradingCounter('buyNumber', 1)
                WinRateData[symbol].buyNumber += 1
            else:
                tradingCounter('sellNumber', 1)
                WinRateData[symbol].sellNumber += 1            
            _G("WinRateData", WinRateData) #保存各币种的交易数据
            return id

def InitRateData():
    global WinRateData
    if Reset :
        _G("WinRateData", None)    
    if _G("WinRateData"):
        WinRateData = _G("WinRateData")    
    for i in range(len(symbols)):        
        if symbols[i] not in WinRateData:
            WinRateData[symbols[i]] = {'totalProfit': 0, 'profitNumber': 0,'tradeNumber': 0,'buyNumber': 0, 'sellNumber': 0}
                                            #统计次数        #盈利次数          #交易次数       #做多次数        #做空次数
    _G("WinRateData", WinRateData)

def RunCommand():
    str_cmd = GetCommand()
    if str_cmd:
        arrCmd = str_cmd.split(':')
        symbol = arrCmd[1]
        amount = float(arrCmd[2])
        if amount == 0:
            Log('亲,你还记得大明湖畔的乔碧萝吗?' + danger)
        else:
            #f = 'Buy' if amount < 0 else 'Sell'
            dirction = 'buy' if amount < 0 else 'sell'
            exchange.IO("currency", symbol + '_' + 'USDT')
            exchange.SetContractType('swap')
            exchange.SetDirection(dirction)
            place_order = getattr(exchange,'Buy' if dirction == 'buy' else 'Sell')
            id = place_order(-1, abs(amount), symbol)
            #exchange[f](-1, abs(amount), symbol)

def FirstAccount():
    key = "initialAccount_" + exchange.GetLabel()
    initialAccount = _G(key)
    if initialAccount is None:
        initialAccount = exchange.GetAccount()
        _G(key, initialAccount)    
    return initialAccount

def StartTime():
    StartTime = _G("StartTime")
    if StartTime is None:
        StartTime = _D()
        _G("StartTime", StartTime)    
    return StartTime

def RuningTime():
    ret = {}    
    dateBegin = StartTime()
    dateEnd = _D()
    dateDiff = (time.mktime(time.strptime(dateEnd, '%Y-%m-%d %H:%M:%S')) - time.mktime(time.strptime(dateBegin, '%Y-%m-%d %H:%M:%S'))) * 1000
    dayDiff = math.floor(dateDiff / (24 * 3600 * 1000))
    leave1 = dateDiff % (24 * 3600 * 1000)
    hours = math.floor(leave1 / (3600 * 1000))
    leave2 = leave1 % (3600 * 1000)
    minutes = math.floor(leave2 / (60 * 1000))
    ret['dayDiff'] = dayDiff
    ret['hours'] = hours
    ret['minutes'] = minutes
    ret['str'] = "运行时间: " + str(dayDiff) + " 天 " + str(hours) + " 小时 " + str(minutes) + " 分钟"
    return ret

def AppendedStatus():
    global TotalLong , TotalShort,RunTime,Funding, accountAssets
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
    runday = RunTime['dayDiff']
    if runday == 0:
        runday = 1
    if Funding == 0:
        Funding = float(FirstAccount()['Info']['totalWalletBalance'])
    profitColors = danger
    totalProfit = assets['USDT']['total_balance'] - Funding #总盈利
    if totalProfit > 0:
        profitColors = success
    dayProfit = totalProfit / runday #天盈利
    dayRate = dayProfit / Funding * 100
    accountTable['rows'].append([
        runday,
        '$' + str(_N(Funding, 2)),
        '$' + str(assets['USDT']['total_balance']),
        '$' + str(assets['USDT']['margin_balance']),
        '$' + str(assets['USDT']['margin']),
        str(_N(assets['USDT']['margin_ratio'], 2)) + '%',
        str(_N(assets['USDT']['stop_balance'], 2)) + danger,
        str(_N(totalProfit / Funding * 100, 2)) + "% = $" + str(_N(totalProfit, 2)) + (profitColors),
        str(_N(dayRate * 365, 2)) + "% = $" + str(_N(dayProfit * 365, 2)) + (profitColors),
        str(_N(dayRate * 30, 2)) + "% = $" + str(_N(dayProfit * 30, 2)) + (profitColors),
        str(_N(dayRate, 2)) + "% = $" + str(_N(dayProfit, 2)) + (profitColors)
    ])
    vloume = _G('tradeVolume') if _G('tradeVolume') is not None else 0
    feeTable['rows'].append([
        index, #指数
        _G('tradeNumber') if _G('tradeNumber') is not None else 0, #交易次数
        _G('buyNumber') if _G('buyNumber') is not None else 0, #做多次数
        _G('sellNumber') if _G('sellNumber') is not None else 0, #做空次数
        str(_N(_G('profitNumber') / _G('totalProfit') * 100, 2) if _G('totalProfit') > 0 else 0) + '%', #胜率
        '$' + str(_N(vloume, 2)) + ' ≈ ฿' + str(_N(vloume / ((assets['BTC']['bid_price'] + assets['BTC']['ask_price']) / 2), 6)), #成交金额
        '$' + str(_N(vloume * (SelfFee / 100), 4)), #手续费
        '$' + str(_N(assets['USDT']['unrealised_profit'], 2)) + (success if assets['USDT']['unrealised_profit'] >= 0 else danger),
        '$' + str(_N(TotalLong + abs(TotalShort), 2)), #持仓总价值
        '$' + str(_N(TotalLong, 2)) + success, #做多总值
        '$' + str(_N(abs(TotalShort), 2)) + danger, #做空总值
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
    for i in range(len(symbols)) :
        price = _N((assets[symbols[i]]['ask_price'] + assets[symbols[i]]['bid_price']) / 2, trade_info[symbols[i]]['priceSize'])
        if symbols[i] not in symbols:
            indexTable['rows'].append([i + 1, symbols[i], price, assets[symbols[i]]['btc_price'], _N((1 - assets[symbols[i]]['btc_change']) * 100), assets[symbols[i]]['btc_diff']], 0, 0, 0, '0%')
        else:
            rateData = _G("WinRateData")
            winRate = _N(rateData[symbols[i]]['profitNumber'] / rateData[symbols[i]]['totalProfit'] * 100, 2) if rateData[symbols[i]]['totalProfit'] > 0 else 0
            indexTable['rows'].append([
                (i + 1),
                symbols[i] + warning,
                price,
                _N(assets[symbols[i]]['btc_price'], 6),
                _N((1 - assets[symbols[i]]['btc_change']) * 100),
                str(assets[symbols[i]]['btc_diff']) + (success if assets[symbols[i]]['btc_diff'] >= 0 else danger),
                rateData[symbols[i]]['tradeNumber'],
                rateData[symbols[i]]['sellNumber'],
                rateData[symbols[i]]['buyNumber'],
                (str(winRate) if rateData[symbols[i]]['profitNumber'] > 0 and rateData[symbols[i]]['totalProfit'] > 0 else '0') + '%' + (success if winRate >= 50 else danger), #胜率
            ])    
    retData = {}
    retData['upTable'] = RunTime['str'] + '\n' + "最后更新: " + _D() + '\n' + 'Version:' + Version + '\n' + '`' + json.dumps([accountTable, assetTable]) + '`\n' + '`' + json.dumps(feeTable) + '`\n'
    retData['indexTable'] = indexTable
    return retData


def WinRate():
    global WinRateData
    for i in range(len(symbols)) :
        unrealised = assets[symbols[i]]['unrealised_profit']
        WinRateData[symbols[i]]['totalProfit'] += 1
        if unrealised != 0:
            if unrealised > 0:
                WinRateData[symbols[i]]['profitNumber'] += 1    
    _G("WinRateData", WinRateData)

def tradingCounter(key, newValue):
    value = _G(key)
    if value is None:
        _G(key, newValue)
    else:
        _G(key, value + newValue)

def updateStatus() : #状态栏信息
    global TotalLong , TotalShort,Funding,update_profit_time,UpProfit
    TotalLong = 0
    TotalShort = 0
    table = {
        'type': 'table',
        'title': '交易对信息',
        'cols': ['编号', '[模式][倍数]', '币种信息', '开仓方向', '开仓数量', '持仓价格', '当前价格', '强平价格', '强平差价', '持仓价值', '保证金', '未实现盈亏', '投降'],
        'rows': []
    }
    
    for i in range(len(symbols)):        
        direction = '空仓'
        margin = direction
        if assets[symbols[i]]['amount'] != 0:
            direction = '做多' + success if assets[symbols[i]]['amount'] > 0 else '做空' + danger
            margin = '全仓' if assets[symbols[i]]['marginType'] == 'cross' else '逐仓'
        price = _N((assets[symbols[i]]['ask_price'] + assets[symbols[i]]['bid_price']) / 2, trade_info[symbols[i]]['priceSize'])
        value = _N((assets[symbols[i]]['ask_value'] + assets[symbols[i]]['bid_value']) / 2, 2)
        if value != 0:
            if value > 0:
                TotalLong += value
            else:
                TotalShort += value
        # rateData = _G("WinRateData")
        infoList = [
            i + 1,
            "[" + margin + "] [" + str(assets[symbols[i]]['leverage']) + 'x] ',
            symbols[i],
            direction,
            abs(assets[symbols[i]]['amount']),
            assets[symbols[i]]['hold_price'],
            price,
            assets[symbols[i]]['liquidationPrice'], #强平价格
            '0' if assets[symbols[i]]['liquidationPrice'] == 0 else '$' + str(_N(assets[symbols[i]]['liquidationPrice'] - price, 5)) + ' ≈ ' + str(_N(assets[symbols[i]]['liquidationPrice'] / price * 100, 2)) + '%' + warning, #强平价格
            abs(value),
            _N(assets[symbols[i]]['positionInitialMargin'], 2),
            # assets[symbols[i]]['btc_diff'],
            str(_N(assets[symbols[i]]['unrealised_profit'], 3)) + (success if assets[symbols[i]]['unrealised_profit'] >= 0 else danger),
            # (rateData[symbols[i]]['profit']Number > 0 and rateData[symbols[i]].totalProfit > 0 ? _N(rateData[symbols[i]]['profit']Number / rateData[symbols[i]].totalProfit * 100, 2) : '0') + '%', #胜率
            {
                'type': 'button',
                'cmd': '说好的没有撤退可言呢？？?:' + symbols[i] + ':' + str(assets[symbols[i]]['amount']) + ':',
                'name': symbols[i] + ' 投降'
            }
        ]
        table['rows'].append(infoList)
    #del assets['USDT']['update_time'] #时间戳没什么用,不要了
    logString = json.dumps(assets['USDT']) + '\n'
    StatusData = AppendedStatus()
    LogStatus(StatusData['upTable'] + '`' + json.dumps([table, StatusData['indexTable']]) + '`\n' + logString)

    if int(time.time()*1000) - update_profit_time > Log_profit_interval * 1000:
        balance = assets['USDT']['margin_balance']
        if Show:
            balance = assets['USDT']['margin_balance'] - Funding
        LogProfit(_N(balance, 3), '&')
        update_profit_time = int(time.time()*1000)
        if UpProfit != 0 and (_N(balance, 0) != UpProfit): #第一次不计算,并且小数点面的不进行胜率计算
            tradingCounter("totalProfit", 1) #统计打印次数, 胜率=盈利次数/打印次数*100
            if _N(balance, 0) > UpProfit:
                tradingCounter('profitNumber', 1) #盈利次数
            WinRate()
        UpProfit = _N(balance, 0)

def stopLoss() : #止损函数
    while True:
        if assets['USDT']['margin_balance'] < Stop_loss * assets['USDT']['init_balance'] and assets['USDT']['init_balance'] > 0:
            Log('触发止损，当前资金：', assets['USDT']['margin_balance'], '初始资金：', assets['USDT']['init_balance'])
            Ice_value = 200 #止损的快一些，可修改
            updateAccount()
            updateTick()
            trading = False #是否正在交易
            for i in range(len(trade_symbols)):
                symbol = trade_symbols[i]
                if assets[symbol]['ask_price'] == 0:
                    continue                
                if assets[symbol]['bid_value'] >= trade_info[symbol]['minQty'] * assets[symbol]['bid_price']:
                    trade(symbol, 'sell', assets[symbol]['bid_value'])
                    trading = True
                if assets[symbol]['ask_value'] <= -trade_info[symbol]['minQty'] * assets[symbol]['ask_price']:
                    trade(symbol, 'buy', -assets[symbol]['ask_value'])
                    trading = True
            Sleep(1000)
            if not trading :
                Log('止损结束,如果需要重新运行策略，需要调低止损') 
                exit()
        else : #不用止损
            return None

def onTick() : #策略逻辑部分
    for i in range(len(trade_symbols)) :
        symbol = trade_symbols[i]
        if assets[symbol]['ask_price'] == 0:
            continue        
        aim_value = -Trade_value * _N(assets[symbol]['btc_diff'] / 0.01, 3)        
        if aim_value - assets[symbol]['ask_value'] >= Adjust_value and assets[symbol]['btc_diff'] > Min_diff and assets['USDT']['long_value'] - assets['USDT']['short_value'] <= 1.1 * Trade_value:
            Log('做多',symbol,'   aim_value:',aim_value,'   偏离平均:',assets[symbol]['btc_diff'])            
            trade(symbol, 'buy', aim_value - assets[symbol]['ask_value'])
        if aim_value - assets[symbol]['bid_value'] <= -Adjust_value and assets[symbol]['btc_diff'] < Max_diff and assets['USDT']['short_value'] - assets['USDT']['long_value'] <= 1.1 * Trade_value:
            Log('做空',symbol,'   aim_value:',aim_value,'   偏离平均:',assets[symbol]['btc_diff'])            
            trade(symbol, 'sell', -(aim_value - assets[symbol]['bid_value']))

def main():
    global RunTime
    SetErrorFilter("502:|503:|tcp|character|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|http|received|EOF|reused|Unknown")
    while True:
        RunTime = RuningTime()
        RunCommand() #捕获交互命令
        updateAccount() #更新账户和持仓
        updateTick() #行情
        stopLoss() #止损
        onTick() #策略逻辑部分
        updateStatus() #输出状态栏信息
        Sleep(Interval * 1000)

```

> 策略出处

https://www.fmz.com/strategy/201963

> 更新时间

2020-05-02 23:34:14
