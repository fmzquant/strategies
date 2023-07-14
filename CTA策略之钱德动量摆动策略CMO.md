
> Name

CTA策略之钱德动量摆动策略CMO

> Author

扫地僧

> Strategy Description

### 一、摘要
对于交易初学者来说，通过技术指标来构建策略，是量化交易最简单的入门方式，本篇文章我们开发一个钱德动量摆动(CMO)策略，来实现商品期货量化交易。

### 二、CMO原理
您认为是什么原因导致了价格的上涨或下跌？宏观政策、新闻事件、供需关系、市场情绪等等，这些都有可能影响到交易者的心理预期，最终落实到行为上：买、卖、观望。对于股票来说，如果买的人多过卖的人，价格就会上涨，如果卖的人多过买的人，价格就会下跌，最终价格上涨或下跌是多方力量和空方力量角逐的结果，如果多方力量强于空方，将会推升价格上涨，反之亦然。而钱德动量摆动(CMO)则可以测量价格背后的动能。

### 三、CMO简介
 ![IMG](https://www.fmz.cn/upload/asset/39f67284381942c700d6.png) 
钱德动量摆动(CMO)出自Tushar Chande，其本人不仅是一位科学家，还是出色的系统化交易员。市面上有很多动量摆动指标，比如：相对强弱指标(RSI)和随机指标(KDJ)，但钱德动量摆动(CMO)的独特之处在于其计算公式的分子中采用上涨日和下跌日的数据。

### 四、CMO计算公式
如下面的CMO计算公式中，分子采用上涨日和下跌日的数据。

CMO=((Su-Sd)*100)/(Su+Sd)

其中：
Su是今日收盘价与昨日收盘价（上涨日）差值加总。若当日下跌，则增加值为0；
Sd是今日收盘价与做日收盘价（下跌日）差值的绝对值加总。若当日上涨，则增加值为0。

### 五、CMO用法
**1、零轴交叉**
CMO上穿零轴时可以视为多头信号，下穿零轴时可以视为空头信号。
**2、超买/超卖**
CMO的值是在-100~100范围内移动，作为一个通用规则，CMO把极度超买定量在+50以上，把极度超卖水平定量在-50以下，如果其值小于-50表示处于超卖区，如果其值大于50表示处于超买区。
**3、背离**
理论上CMO应该与价格通向，如果价格创新高，但CMO没有创新高，甚至走低，那么价格上涨趋势可能即将反转；如果价格创新低，但CMO没有创新低，甚至走高，那么价格下跌趋势可能即将反转。
**4、绝对值**
CMO的绝对值也可以衡量价格的趋势强度，CMO的绝对值越高，表明趋势的力量越强，绝对值越低，表明趋势的力量越弱，价格在一定的范围内上下波动。以此可以用CMO的绝对值切换策略，当CMO的绝对值处于高位，则切换为趋势跟踪策略，当CMO的绝对值处于低位，则切换为均值回归策略。

### 六、策略逻辑
根据以上CMO的用法，创建一个简单的钱德动量摆动(CMO)策略，策略逻辑如下：
- 多头开仓：如果当前无持仓，并且价格大于长期均线，并且CMO的绝对值大于50
- 空头开仓：如果当前无持仓，并且价格小于长期均线，并且CMO的绝对值大于50
- 多头平仓：如果当前持多单，并且价格小于短期均线
- 空头平仓：如果当前持空单，并且价格大于短期均线

### 七、策略回测
- 回测开始日期：2017-01-01
- 回测结束日期：2020-12-01
- 数据品种：玉米指数
- 数据周期：日线
- 滑点：开平仓各2跳


**回测配置**
 ![IMG](https://www.fmz.cn/upload/asset/39710c6c0e4dd3461eb7.png) 
**回测绩效**
 ![IMG](https://www.fmz.cn/upload/asset/39090d8816892a6be34e.png) 
**收益概览**
 ![IMG](https://www.fmz.cn/upload/asset/398c3b05e5247ba4d7a3.png) 

### 八、总结
简单的钱德动量摆动(CMO)策略在玉米指数上回测良好，尤其是当市场价格走势较流畅时，该策略收益就会表现更好，但如果市场价格为震荡阶段时，该策略甚至会出现连续亏损，所以选用较大周期是一个相对明智的选择，需要注意的是该策略没有设置止盈止损，回测结果有可能存在潜在风险和收益。


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|ma_length|150|均线周期|
|cmo_length|10|CMO周期|
|cmo_value|10|CMO绝对值|


> Source (python)

``` python
'''backtest
start: 2017-01-01 00:00:00
end: 2020-12-01 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''


# 导入第三方库
# 如果本机电脑没有这些库，需要使用pip安装
import talib
import numpy as np


# 定义全局变量，记录开平仓
mp = 0


# 获取K线列表中的收盘价数据
def get_data(bar):
    arr = []
    for i in bar:
        arr.append(i['Close'])
    return arr


def bar():
    bar = _C(exchange.GetRecords)                 # 获取K线列表
    if len(bar) < ma_length:                      # 如果K线列表长度过小
        return                                    # 就直接返回
    bar.pop()                                     # 删除列表最后一个元素
    price = bar[-1]['Close']                      # 最新价格
    np_arr = np.array(get_data(bar))              # 转换数据类型
    cmo = abs(talib.CMO(np_arr, cmo_length)[-1])  # 计算CMO数据
    ma1 = talib.MA(np_arr, ma_length)[-1]         # 计算长期均线 
    ma2 = talib.MA(np_arr, ma_length / 2)[-1]     # 计算短期均线
    global mp                                     # 引入全局变量
    if mp > 0 and price < ma2:                    # 如果当前持多单，并且价格小于短期均线
        exchange.SetDirection("closebuy")         # 设置交易方向和类型
        exchange.Sell(price - 1, 1)               # 平多单
        mp = 0                                    # 重置虚拟持仓
    if mp < 0 and price > ma2:                    # 如果当前持空单，并且价格大于短期均线
        exchange.SetDirection("closesell")        # 设置交易方向和类型
        exchange.Buy(price, 1)                    # 平空单
        mp = 0                                    # 重置虚拟持仓
    if mp == 0 and abs(cmo) > cmo_value:          # 如果当前无持仓，并且CMO的绝对值大于cmo_value
        if price > ma1 and price > ma2:           # 如果价格大于长期和短期均线
            exchange.SetDirection("buy")          # 设置交易方向和类型
            exchange.Buy(price, 1)                # 开多单
            mp = 1                                # 重置虚拟持仓
        if price < ma1 and price < ma2:           # 如果价格小于长期和短期均线
            exchange.SetDirection("sell")         # 设置交易方向和类型
            exchange.Sell(price - 1, 1)           # 开空单
            mp = -1                               # 重置虚拟持仓


def main():
    _C(exchange.SetContractType, 'c000')         # 订阅行情
    while True:                                   # 进入无线循环模式
        bar()                                     # 重复执行bar函数
        Sleep(1000)                               # 使程序休眠1秒

```

> Detail

https://www.fmz.cn/strategy/239900

> Last Modified

2021-03-19 11:45:49
