
> 策略名称

[VNC] SVM Test

> 策略作者

virtualpeer





> 源码 (python)

``` python
import numpy as np
import pandas as pd

data = DataAPI.MktIdxdGet(indexID=u"",ticker=u"000300",tradeDate=u"",beginDate=u"20100101",endDate=u"20180501",exchangeCD=u"XSHE,XSHG",field=u"",pandas="1")
data.set_index('tradeDate', inplace = True)
# 获取HS300的每日价格数据

for i in range(1, 21, 1):
    data['close-' + str(i) + 'd'] = data['closeIndex'].shift(i)
# 对于收盘价，在data中增加了20列数据，分别为1天前的收盘价至20天前的收盘价
    
hs_close = data[[x for x in data.columns if 'close' in x]].iloc[20:]
# 选取今天及1-20天前的收盘价，iloc[20:]剔除了无效数据

hs_close = hs_close.iloc[:, ::-1]
# 将新DataFrame的列按倒序排列
################################################################################################
from sklearn import svm
# 从sklearn库中导入svm算法

days = 1500
# 设定全局变量，分割训练集和测试集的数据，1500在上文数据中约占75%

clf_close = svm.SVR(kernel='linear')
# 使用svm下的SVR算法，'linear'表示线性核
f_close_train = hs_close[:days]
# 训练集features
l_close_train = hs_close['closeIndex'].shift(-1)[:days]
# 训练集labels，将收盘价shift(-1)表示预测的是下一天的收盘价
f_close_test = hs_close[days:]
# 测试集features
l_close_test = hs_close['closeIndex'].shift(-1)[days:]
# 训练集labels，将收盘价shift(-1)表示预测的是下一天的收盘价
clf_close.fit(f_close_train, l_close_train)
# 训练模型

######################################################################################

p_close_train = clf_close.predict(f_close_train)
# 将训练集features导入模型进行预测，生成预测的收盘价
df_close_train = pd.DataFrame(l_close_train)
# 新建一个DataFrame，内容为训练集labels,即下一天的收盘价
df_close_train.columns = ['next close']
# 列名重命名为'next close'
df_close_train['predicted next close'] = p_close_train
# 加入一列预测的收盘价数据
df_close_train['next open'] = data['openIndex'][20:20 + days].shift(-1)
# 加入一列下一天开盘价的数据，从data而非hs_close中获取，需要切片

trigger = 1.0
df_close_train['position'] = np.where(df_close_train['predicted next close'] > df_close_train['next open'] * trigger, 1, 0)
# 通过np.where函数判断，当预测的下一天收盘价 > 下一天开盘价相乘或相加一个trigger时，仓位设置为1，否则为0
df_close_train['PL'] = np.where(df_close_train['position'] == 1, (df_close_train['next close'] - df_close_train['next open']) / df_close_train['next open'], 0)
# 当仓位为1时，在下一天开盘时买入，收盘时卖出，记录下一天应获得的收益率，否则收益率为0

df_close_train['strategy'] = (df_close_train['PL'].shift(1) + 1).cumprod()
# 策略每日收益的累积收益率，其中shift(1)表示当日记录的是下一天才能获得的收益率，当日无法获得
df_close_train['return'] = (df_close_train['next close'].pct_change() + 1).cumprod()
# benchmark的累积收益率

df_close_train[['strategy', 'return']].dropna().plot()
# 画出策略与benchmark的累计收益率图

##########################################################################
def main():
    Log(exchange.GetAccount())

```

> 策略出处

https://www.fmz.com/strategy/112188

> 更新时间

2018-08-18 20:34:19
