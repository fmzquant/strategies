'''
策略出处: https://www.botvs.com/strategy/21370
策略名称: Python 机器学习之 SVM 简单预测是涨是跌还是横
策略作者: Zero
策略描述:

Python入门简单策略 sklearn 机器学习库的使用

回测系统自带的库有
numpy pandas TA-Lib scipy statsmodels sklearn cvxopt hmmlearn pykalman arch matplotlib

实盘需要在托管者所在机器安装策略需要的库

'''

from sklearn import svm

def main():
    preTime = 0
    n = 0
    success = 0
    predict = None
    pTime = None
    spread = 2
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
                if diff > spread:
                    success += 1 if predict == 0 else 0
                elif diff < -spread:
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
        for i in range(1, len(r)-2, 1):
            inputs_X.append([r[i].Open, r[i].Close])
            Y = 0
            diff = r[i+1].Close - r[i].Close
            if diff > spread:
                Y = 0
                sets[0] = True
            elif diff < -spread:
                Y = 1
                sets[1] = True
            else:
                Y = 2
                sets[2] = True
            output_Y.append(Y)
        if None in sets:
            Log("样本不足, 无法预测 ...")
            continue
        clf = svm.LinearSVC()
        clf.fit(inputs_X, output_Y)
        predict = clf.predict([bar.Open, bar.Close])
        pTime = bar.Time
        Log("预测当前Bar结束:", bar.Time, ['涨', '跌', '横'][predict])
        n += 1

