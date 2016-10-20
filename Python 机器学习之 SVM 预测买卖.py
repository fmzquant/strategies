'''
策略出处: https://www.botvs.com/strategy/21370
策略名称: Python 机器学习之 SVM 预测买卖
策略作者: Zero
策略描述:

Python入门简单策略 sklearn 机器学习库的使用

回测系统自带的库有
numpy pandas TA-Lib scipy statsmodels sklearn cvxopt hmmlearn pykalman arch matplotlib

实盘需要在托管者所在机器安装策略需要的库


参数           默认值  描述
---------  -----  ----
SpreadVal      2  预测价差
'''

from sklearn import svm
import numpy as np

def main():
    preTime = 0
    n = 0
    success = 0
    predict = None
    pTime = None
    marketPosition = 0
    initAccount = exchange.GetAccount()
    Log("Running...")
    while True:
        r = exchange.GetRecords()
        if len(r) < 60:
            continue
        bar = r[len(r)-1]
        if bar.Time > preTime:
            preTime = bar.Time
            if pTime is not None and r[len(r)-2].Time == pTime:
                diff = r[len(r)-2].Close - r[len(r)-3].Close
                if diff > SpreadVal:
                    success += 1 if predict == 0 else 0
                elif diff < -SpreadVal:
                    success += 1 if predict == 1 else 0
                else:
                    success += 1 if predict == 2 else 0
                pTime = None
                LogStatus("预测次数", n, "成功次数", success, "准确率:", '%.3f %%' % round(float(success) * 100 / n, 2))
        else:
            Sleep(1000)
            continue
        inputs_X, output_Y = [], []
        sets = [None, None, None]
        for i in xrange(1, len(r)-2, 1):
            inputs_X.append([r[i].Open, r[i].Close])
            Y = 0
            diff = r[i+1].Close - r[i].Close
            if diff > SpreadVal:
                Y = 0
                sets[0] = True
            elif diff < -SpreadVal:
                Y = 1
                sets[1] = True
            else:
                Y = 2
                sets[2] = True
            output_Y.append(Y)
        if None in sets:
            Log("样本不足, 无法预测 ...")
            continue
        n += 1
        clf = svm.LinearSVC()
        clf.fit(inputs_X, output_Y)
        predict = clf.predict(np.array([bar.Open, bar.Close]).reshape((1, -1)))
        pTime = bar.Time
        
        Log("预测当前Bar结束:", bar.Time, ['涨', '跌', '横'][predict])
        if marketPosition == 0:
            if predict == 0:
                exchange.Buy(initAccount.Balance/2)
                marketPosition = 1
            elif predict == 1:
                exchange.Sell(initAccount.Stocks/2)
                marketPosition = -1
        else:
            nowAccount = exchange.GetAccount()
            if marketPosition > 0 and predict != 0:
                exchange.Sell(nowAccount.Stocks - initAccount.Stocks)
                nowAccount = exchange.GetAccount()
                marketPosition = 0
            elif marketPosition < 0 and predict != 1:
                while True:
                    dif = initAccount.Stocks - nowAccount.Stocks
                    if dif < 0.01:
                        break
                    ticker = exchange.GetTicker()
                    exchange.Buy(ticker.Sell + (ticker.Sell-ticker.Buy)*2, dif)
                    while True:
                        Sleep(1000)
                        orders = exchange.GetOrders()
                        for order in orders:
                            exchange.CancelOrder(order.Id)
                        if len(orders) == 0:
                            break
                    nowAccount = exchange.GetAccount()
                marketPosition = 0
            if marketPosition == 0:
                LogProfit(_N(nowAccount.Balance - initAccount.Balance, 4), nowAccount)
                
