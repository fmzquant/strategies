'''
策略出处: https://www.botvs.com/strategy/21023
策略名称: Python 双平台对冲策略
策略作者: Zero
策略描述:

Python 双平台对冲策略


参数               默认值  描述
------------  ------  --------
MinSpreadA      0.51  A->B差价
MinSpreadB      0.52  B->A差价
MaxAmount       0.3   最大操作量
BalanceTime    10     平衡周期(秒)
LoopInterval  200     轮询周期(ms)

按钮      默认值  描述
----  -----  ----------
A->B   0.51  更改价差(A->B)
B->A   0.52  更改价差(B->A)
'''

import time
import json

def cancelAll():
    ret = False
    for e in exchanges:
        while True:
            n = 0
            for order in _C(e.GetOrders):
                ret = True
                e.CancelOrder(order.Id)
                n+=1
            if n == 0:
                break
    return ret

def main():
    global MinSpreadA, MinSpreadB
    SetErrorFilter("canceled")
    if len(exchanges) != 2:
        raise Exception("只支持两个交易所对冲")
    
    LogReset()
    LogProfitReset()
    cancelAll()
    
    initStocks = 0.0
    initBalance = 0.0
    minAmount = 0.1
    lastTradeTime = 0
    lastTradeErrExchange = ''
    accountsCache = []
    hedgeNum = [0, 0]
    names = []
    baseCurrency = exchange.GetCurrency()
    for e in exchanges:
        if e.GetCurrency() != baseCurrency:
            raise Exception("必须是同样的货币才可以对冲 " + baseCurrency)
        names.append(e.GetName())
        account = _C(e.GetAccount)
        accountsCache.append(account)
        initStocks += account.Stocks
        initBalance += account.Balance
        Log("Switch", e.GetLabel(), "To", e.IO("websocket"))
    minAmount = 0.01 if baseCurrency == "BTC" else 0.1
    Log("总钱:", _N(initBalance), "总币", _N(initStocks), 'Python:', __import__('sys').version)
    while True:
        if not accountsCache:
            accountsCache = [_C(e.GetAccount) for e in exchanges]
        Sleep(LoopInterval)
        cmd = GetCommand()
        if cmd:
            Log("CMD", cmd)
            arr = cmd.split(':')
            if arr[0] == 'A->B':
                MinSpreadA = float(arr[1])
            elif arr[0] == 'B->A':
                MinSpreadB = float(arr[1])
                
        depthA = exchanges[0].GetDepth()
        if not depthA:
            continue
        depthB = exchanges[1].GetDepth()
        if not depthB:
            continue
        if lastTradeTime > 0 and time.time() - lastTradeTime > BalanceTime:
            needUpdate = cancelAll()
            if not needUpdate:
                for account in accountsCache:
                    if account.FrozenBalance >= 0.1 or account.FrozenStocks > 0.001:
                        needUpdate = True
                        break
            if needUpdate:            
                accountsCache = [_C(e.GetAccount) for e in exchanges]
            nowStocks = 0.0
            nowBalance = 0.0
            for account in accountsCache:
                nowStocks += account.Stocks
                nowBalance += account.Balance
            diff = _N(nowStocks - initStocks, 5)
            isReverse = None
            if abs(diff) < minAmount:
                LogProfit(_N(nowBalance-initBalance, 3), "总钱:", _N(nowBalance), "总币", _N(nowStocks), "币差:", diff)
                lastTradeTime = 0
            elif diff > minAmount:
                isReverse = depthA.Bids[0].Price < depthB.Bids[0].Price
            elif -diff > minAmount:
                isReverse = depthA.Asks[0].Price > depthB.Asks[0].Price
            if isReverse is not None:
                depths = [depthA, depthB]
                opAmount = None
                for pos in ([1, 0] if isReverse else [0, 1]):
                    if diff >= minAmount:
                        opAmount = min(diff, accountsCache[pos].Stocks, depths[pos].Bids[0].Amount + depths[pos].Bids[1].Amount)
                        diff -= opAmount
                        if opAmount >= minAmount:
                            exchanges[pos].Sell(depths[pos].Bids[1].Price, opAmount)
                    elif -diff >= minAmount:
                        opAmount = min(-diff, _N(accountsCache[pos].Balance / depths[pos].Asks[1].Price, 3), depths[pos].Asks[0].Amount + depths[pos].Asks[1].Amount)
                        diff += opAmount
                        if opAmount >= minAmount:
                            exchanges[pos].Buy(depths[pos].Asks[1].Price, opAmount)
                if opAmount is not None:
                    lastTradeTime = time.time()
                    accountsCache = []
            continue
            # end of balanceAccount

        diffA = _N(depthA.Bids[0].Price - depthB.Asks[0].Price, 3)
        diffB = _N(depthB.Bids[0].Price - depthA.Asks[0].Price, 3)
        LogStatus('`' + json.dumps({'type': 'table', 'title': '运行信息', 'cols': ['名称', '钱', '冻结的钱', '币', '冻结的币', '买一', '卖一', '阀值', '差价', '次数'], 'rows': [[names[0], accountsCache[0].Balance, accountsCache[0].FrozenBalance, accountsCache[0].Stocks, accountsCache[0].FrozenStocks, depthA.Bids[0].Price, depthA.Asks[0].Price, MinSpreadA, diffA, hedgeNum[0]], [names[1], accountsCache[1].Balance, accountsCache[1].FrozenBalance, accountsCache[1].Stocks, accountsCache[1].FrozenStocks, depthB.Bids[0].Price, depthB.Asks[0].Price, MinSpreadB, diffB, hedgeNum[0]]]}) + '`')
        HPos = 0
        if diffA >= MinSpreadA:
            orderH = depthA.Bids[0]
            orderL = depthB.Asks[0]
            exchangeH = exchanges[0]
            exchangeL = exchanges[1]
            accountH = accountsCache[0]
            accountL = accountsCache[1]
        elif diffB >= MinSpreadB:
            HPos = 1
            orderH = depthB.Bids[0]
            orderL = depthA.Asks[0]
            exchangeH = exchanges[1]
            exchangeL = exchanges[0]
            accountH = accountsCache[1]
            accountL = accountsCache[0]
        else:
            continue

        opPrice = _N((orderH.Price + orderL.Price) / 2.0, 2)
        opAmount = min(MaxAmount, orderH.Amount, orderL.Amount, accountH.Stocks, _N(accountL.Balance / opPrice, 3))
        if opAmount >= minAmount:
            tasks = [[exchangeH.Sell, "H"], [exchangeL.Buy, "L"]]
            if lastTradeErrExchange == "L":
                tasks.reverse()
            lastTradeErrExchange = ""
            for task in tasks:
                if task[0](opPrice, opAmount) is None:
                    lastTradeErrExchange = task[1]
                    break
            lastTradeTime = time.time()
            accountsCache = []
            hedgeNum[HPos] += 1


