
> Name

Dual-Platform-Hedging-Balance-Strategy

> Author

ianzeng123

> Strategy Description
Inspired by an expert trader's strategy. Feedback and suggestions are welcome.
> Source (python)

``` python
'''backtest
start: 2024-11-19 00:00:00
end: 2024-12-18 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"TRB_USDT"},{"eid":"OKX","currency":"TRB_USDT"}]
'''

import time
import json

# 全局变量定义
depthA = depthB = None
timeBegin = timeEnd = None
askPriceA = bidPriceA = askAmountA = bidAmountA = 0
askPriceB = bidPriceB = askAmountB = bidAmountB = 0
minAmount = 20  # 最小下单量
feeA = 0.0020  # Huobi 手续费   
feeB = 0.0010  # Binance 手续费
fees = None
minProfit = 0.0002  # 最小利润
notDealAmountA = notDealAmountB = None
accountA = accountB = None
initAccountA = initAccountB = None
maxDeltaAmount = 100  # 最大可容忍币偏差
dealAmountA = 0
dealAmountB = 0
safeAmount = 800  # 安全最大成交量
profit = None
maxTime = 150  # 最大延迟过滤
accountBNB = None
reload = False

# 初始化函数
def init():
    global fees, initAccountA, initAccountB, accountA, accountB

    try:
        fees = feeA + feeB

        initAccountA = _G("initAccountA")
        initAccountB = _G("initAccountB")
        
        if initAccountA is None or initAccountB is None:
            initAccountA = _C(exchanges[0].GetAccount)
            initAccountB = _C(exchanges[1].GetAccount)
            _G("initAccountA", initAccountA)
            _G("initAccountB", initAccountB)
            Log("账号初值初始化成功")
        else:
            Log("继承初值数据成功")
        
        accountA = initAccountA
        accountB = initAccountB

    except Exception as e:
        Log("初始化失败 请重启:", e)

# 规范化深度数据
def legalize_depth(depthA, depthB):
    global askPriceA, bidPriceA, askAmountA, bidAmountA
    global askPriceB, bidPriceB, askAmountB, bidAmountB

    askPriceA = bidPriceA = askAmountA = bidAmountA = 0
    askPriceB = bidPriceB = askAmountB = bidAmountB = 0

    for ask in depthA[0]["Asks"]:
        askPriceA = ask["Price"]
        askAmountA += ask["Amount"]
        if askAmountA >= minAmount:
            break

    for bid in depthA[0]["Bids"]:
        bidPriceA = bid["Price"]
        bidAmountA += bid["Amount"]
        if bidAmountA >= minAmount:
            break

    for ask in depthB[0]["Asks"]:
        askPriceB = ask["Price"]
        askAmountB += ask["Amount"]
        if askAmountB >= minAmount:
            break

    for bid in depthB[0]["Bids"]:
        bidPriceB = bid["Price"]
        bidAmountB += bid["Amount"]
        if bidAmountB >= minAmount:
            break

# 取消所有挂单
def cancel_all_orders():
    global dealAmountA, dealAmountB

    orders = _C(exchanges[0].GetOrders)
    for order in orders:
        exchanges[0].CancelOrder(order["Id"])
        Log("成交:", order["DealAmount"], "未成交:", order["Amount"] - order["DealAmount"])
        dealAmountA -= order["Amount"] - order["DealAmount"]

    orders = _C(exchanges[1].GetOrders)
    for order in orders:
        exchanges[1].CancelOrder(order["Id"])
        Log("成交:", order["DealAmount"], "未成交:", order["Amount"] - order["DealAmount"])
        dealAmountB -= order["Amount"] - order["DealAmount"]

# 检查余额
def check_balance():
    global accountA, accountB, dealAmountA, dealAmountB

    cancel_all_orders()
    deltaStocks = (initAccountA["Stocks"] + initAccountA["FrozenStocks"] + initAccountB["Stocks"] + initAccountB["FrozenStocks"]
        - accountA["Stocks"] - accountA["FrozenStocks"] - accountB["Stocks"] - accountB["FrozenStocks"])

    deltaStocks = round(deltaStocks, 0)

    if deltaStocks < -maxDeltaAmount:  # 仓位过重
        if askPriceA > askPriceB and accountA["Stocks"] > -deltaStocks:
            exchanges[0].Sell(askPriceA, -deltaStocks)
            dealAmountA += -deltaStocks
        else:
            exchanges[1].Sell(askPriceB, -deltaStocks)
            dealAmountB += -deltaStocks
        return True

    if deltaStocks > maxDeltaAmount:  # 仓位过轻
        if bidPriceA < bidPriceB and accountA["Balance"] * 0.999 / bidPriceA > deltaStocks:
            exchanges[0].Buy(bidPriceA, deltaStocks)
            dealAmountA += deltaStocks
        else:
            exchanges[1].Buy(bidPriceB, deltaStocks)
            dealAmountB += deltaStocks
        return True

    return False

# 更新利润
def update_profit():
    global profit

    profit = (
        accountA["Balance"] + accountB["Balance"] + accountA["FrozenBalance"] + accountB["FrozenBalance"]
        + (accountA["Stocks"] + accountA["FrozenStocks"] + accountB["Stocks"] + accountB["FrozenStocks"]
        - initAccountA["Stocks"] - initAccountA["FrozenStocks"] - initAccountB["Stocks"] - initAccountB["FrozenStocks"]) * askPriceA
        - (initAccountA["Balance"] + initAccountA["FrozenBalance"] + initAccountB["Balance"] + initAccountB["FrozenBalance"]))

    return profit

# 检查套利机会
def check_opportunity():
    global dealAmountA, dealAmountB, accountA, accountB, diff_A, diff_B 

    diff_A = bidPriceB - askPriceA  # A交易所买 -> B交易所卖
    diff_B = bidPriceA - askPriceB  # B交易所买 -> A交易所卖

    if diff_A > 0 and diff_A > (minProfit + fees) * askPriceA:
        maxBuyAmount = min(accountA["Balance"] / askPriceA * 0.98, askAmountA)
        maxSellAmount = min(accountB["Stocks"], bidAmountB)
        amount = min(maxBuyAmount, maxSellAmount, safeAmount)
        amount = round(amount, 0)

        if amount >= minAmount:
            Log("huobi -> binance", amount)
            exchanges[0].Buy(askPriceA, amount)
            exchanges[1].Sell(bidPriceB, amount)
            time.sleep(3)
            dealAmountA += amount
            dealAmountB += amount
            accountA = _C(exchanges[0].GetAccount)
            accountB = _C(exchanges[1].GetAccount)
            Log("利润更新:", update_profit())

    if diff_B > 0 and diff_B > (minProfit + fees) * askPriceB:
        maxBuyAmount = min(accountB["Balance"] / askPriceB * 0.98, askAmountB)
        maxSellAmount = min(accountA["Stocks"], bidAmountA)
        amount = min(maxBuyAmount, maxSellAmount, safeAmount)
        amount = round(amount, 0)

        if amount >= minAmount:
            Log("binance -> huobi", amount)
            exchanges[1].Buy(askPriceB, amount)
            exchanges[0].Sell(bidPriceA, amount)
            time.sleep(3)
            dealAmountA += amount
            dealAmountB += amount
            accountA = _C(exchanges[0].GetAccount)
            accountB = _C(exchanges[1].GetAccount)
            Log("利润更新:", update_profit())

def main():
    global initAccountA, initAccountB
    if reload == True:
        initAccountA = _C(exchanges[0].GetAccount)
        initAccountB = _C(exchanges[1].GetAccount)
        _G("initAccountA", initAccountA)
        _G("initAccountB", initAccountB)

    init()

    checkBalanceCount = 60
    
    while True:
        accountA = exchanges[0].GetAccount()
        accountB = exchanges[1].GetAccount()
        timeBegin = int(time.time() * 1000)
        depthA = exchanges[0].Go("GetDepth")
        depthB = exchanges[1].Go("GetDepth")
        depthA = depthA.wait()
        depthB = depthB.wait()
        
        timeEnd = int(time.time() * 1000)
        # 真实交易，去除205-208注释
        #if timeEnd - timeBegin > maxTime:
        #    continue  # 延迟超过 maxTime 毫秒就放弃当组数据
        #if depthA is None or depthB is None or accountA is None or accountB is None:
        #    continue

        legalize_depth(depthA, depthB)

        if checkBalanceCount >= 60:
            checkBalanceCount = 0
            if check_balance():
                continue
        else:
            checkBalanceCount += 1
        
        check_opportunity()
        
        # 数据可视化操作
        table = {
            'type': 'table',
            'title': '持仓操作',
            'cols': ['交易所', '初始余额', '初始币数', '当前余额', '当前币数', '成交量'],
            'rows': [
                ['huobi', initAccountA.Balance + initAccountA.FrozenBalance, initAccountA.Stocks + initAccountA.FrozenStocks,
                    accountA.Balance + accountA.FrozenBalance, accountA.Stocks + accountA.FrozenStocks, dealAmountA],
                ['binance', initAccountB.Balance + initAccountB.FrozenBalance, initAccountB.Stocks + initAccountB.FrozenStocks,
                    accountB.Balance + accountB.FrozenBalance, accountB.Stocks + accountB.FrozenStocks, dealAmountB],
                ['合计', initAccountA.Balance + initAccountB.Balance, initAccountA.Stocks + initAccountB.Stocks,
                    accountA.Balance + accountA.FrozenBalance + accountB.Balance + accountB.FrozenBalance,
                    accountA.Stocks + accountA.FrozenStocks + accountB.Stocks + accountB.FrozenStocks, dealAmountA + dealAmountB],
                ['huobi盘口', askPriceA, askAmountA, bidPriceA, bidAmountA, ''],
                ['binance盘口', askPriceB, askAmountB, bidPriceB, bidAmountB, ''],
                ['收益:', str(_N(update_profit(), 8)) + '#FF0000',  '', '', ''],
                ['收益率', str(_N(100 * profit / (initAccountA.Balance + initAccountA.FrozenBalance + initAccountB.Balance + initAccountB.FrozenBalance), 6)) + '%' + '#FF0000', '', '', '', ''],
                ['总延迟', timeEnd - timeBegin, '', '', '', ''],
                ['最后更新时间', _D(), '', '', '', ''],
            ]
        }
        LogStatus('`' + json.dumps(table) + '`')

        time.sleep(10)
        

```

> Detail

https://www.fmz.com/strategy/472020

> Last Modified

2024-12-20 16:29:13
