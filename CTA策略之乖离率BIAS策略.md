
> 策略名称

CTA策略之乖离率BIAS策略

> 策略作者

程文

> 策略描述

#### 一、摘要
俗话说分久必合合久必分，在期货市场也有这种现象，没有只涨不跌的品种也没有只跌不涨的品种。但是什么时候分什么时候合，这就要看乖离率了。本篇我们将使用乖离率构建一个简单的策略。

#### 二、乖离率简介
 ![IMG](https://www.fmz.cn/upload/asset/3a186c15dabbdc05ecfe.png) 
乖离率BIAS是由移动平均线衍生出来的一种技术指标，它主要是以百分比的形式，衡量价格在波动中与移动平均线的偏离程度。如果说均线是交易者的平均成本，那么乖离率就是交易者的平均回报率。

#### 三、乖离率的原理
乖离率的理论基础是对交易者的心里分析，当价格大于市场平均成本太多时，表示多头交易者获利越丰厚，容易萌生赚钱就走的念头，进而会造成价格下跌。当价格小于市场平均成本太多时，表示空头交易者获利丰厚，容易萌生赚钱就走的念头，进而会造成价格上涨。

- 当价格向上偏离均线时，乖离率过大，未来价格有很大几率会下跌。
- 当价格向下偏离均线时，乖离率过小，未来价格有很大几率会上涨。

虽然移动平均线是由价格计算而来，但从外在形式上价格一定会向移动平均线靠拢，或者说价格总是围绕着移动平均线上下波动。如果价格偏离均线太远，不管价格是在均线之上还是之下，最后都可能趋向于均线，而乖离率正是表示价格偏离均线的百分比值。

#### 四、乖离率计算公式
乖离率=[(当日收盘价-N日平均价)/N日平均价]*100%

其中，N是移动均线参数，由于N的周期不同，乖离率的计算结果也不同。一般情况下N的取值是：6、12、24、36等等。在实际使用中，也可以根据不同的品种动态调整。但参数的选择十分重要，如果参数过小，乖离率就会过于敏感，如果参数过大，乖离率就会过于迟钝。乖离率的计算结果有正负之分，正的乖离率越大，代表多头获利越大，价格回调的概率越大。负的乖离率越大，代表空头获利越大，价格反弹的概率越大。

#### 五、策略逻辑
由于乖离率是另一种均线的表现形式，那么我们也可以根据双均线策略改编一个双乖离率策略。通过短期乖离率与长期乖离率的位置关系，判断当前的市场状态。如果长期乖离率大于短期乖离率实际代表着短期均线金叉长期均线，反之亦然。

- 多头开仓：如果当前无持仓，并且长期乖离率大于短期乖离率
- 空头开仓：如果当前无持仓，并且长期乖离率小于短期乖离率
- 多头平仓：如果当前持多单，并且长期乖离率小于短期乖离率
- 空头平仓：如果当前持空单，并且长期乖离率大于短期乖离率

#### 六、策略编写

**第1步：编写策略框架**
```
# 策略主函数
def onTick():
    pass


# 程序入口
def main():
    while True:  # 进入无限循环模式
        onTick()  # 执行策略主函数
        Sleep(1000)  # 休眠1秒
```
发明者量化(FMZ.COM)采用轮训模式，首先需要定义一个main函数和一个onTick函数，main函数是策略的入口函数，程序会从main函数开始逐行执行代码。在main函数中，写入while循环，重复执行onTick函数，所有的策略核心代码都写在onTick函数中。

**第2步：定义虚拟持仓**
```
mp = 0
```
虚拟持仓的好处是编写简单，快速迭代策略更新，一般用于回测环境中，假设每一笔订单都完全成交，但在实际交易中常用的还是真实持仓。由于虚拟持仓是记录开平仓后的状态，所以需要定义成全局变量。

**第3步：获取K线**
```
exchange.SetContractType('rb000')   # 订阅期货品种
bars_arr = exchange.GetRecords()    # 获取K线数组
if len(bars_arr) < long + 1:        # 如果K线数量过小
    return
```
使用发明者量化的SetContractType，传入“rb000"就可以订阅螺纹钢指数合约，但在回测和实盘中，是以螺纹钢指数为数据，使用具体的主力合约下单。接着使用GetRecords函数就可以获取螺纹钢指数的K线数据了。由于在计算乖离率时需要一定周期，所以为了避免程序出错，在没有足够K线的时候，使用if语句过滤。

**第4步：计算乖离率**
```
close = bars_arr[-2]['Close']     # 获取上一根K线收盘价
ma1 = TA.MA(bars_arr, short)[-2]  # 计算上一根K线短期均线值
bias1 = (close - ma1) / ma1 * 100 # 计算短期乖离率值
ma2 = TA.MA(bars_arr, long)[-2]   # 计算上一根K线长期均线值
bias2 = (close - ma2) / ma2 * 100 # 计算长期乖离率值
```
根据乖离率计算公式，首先获取收盘价，在这个策略中我们使用的是上一根K线收盘价，也就是当前K线信号成立，下根K线发单。接着使用发明者量化内置的talib库计算均线，比如均线就是：TA.MA。该函数接收2个参数，即：K线数组和均线周期。

**第5步：下单交易**
```
global mp  # 全局变量
current_price = bars_arr[-1]['Close']  # 最新价格
if mp > 0:   # 如果持有多单
    if bias2 <= bias1:    # 如果长期乖离率小于等于短期乖离率
        exchange.SetDirection("closebuy")    # 设置交易方向和类型
        exchange.Sell(current_price - 1, 1)  # 平多单
        mp = 0  # 重置虚拟持仓
if mp < 0:   # 如果持有空单
    if bias2 >= bias1:    # 如果长期乖离率大于等于短期乖离率
        exchange.SetDirection("closesell")   # 设置交易方向和类型
        exchange.Buy(current_price + 1, 1)   # 平空单
        mp = 0  # 重置虚拟持仓
if mp == 0:  # 如果无持仓
    if bias2 > bias1:    # 长期乖离率大于短期乖离率
        exchange.SetDirection("buy")         # 设置交易方向和类型
        exchange.Buy(current_price + 1, 1)   # 开多单
        mp = 1  # 重置虚拟持仓
    if bias2 < bias1:    # 长期乖离率小于短期乖离率
        exchange.SetDirection("sell")        # 设置交易方向和类型
        exchange.Sell(current_price - 1, 1)  # 开空单
        mp = -1  # 重置虚拟持仓
```
由于我们在while循环外部定义了一个全局变量mp，用于接收当前的持仓状态，所以在使用这个变量的时候，需要先用global引入这个全局变量。另外还需要获取当前的最新价格用于开平仓。最后就是使用if语句，根据之前的策略逻辑下单交易了。

在下单交易之前，需要先使用SetDirection函数设置交易方向和类型：多开buy、空开sell、多平closebuy、空平closesell。然后使用Buy和Sell函数下单交易。最后重置下单后的持仓状态。

#### 七、策略回测
**回测配置**
 ![IMG](https://www.fmz.cn/upload/asset/39367e8f51b34d50fb0a.png) 
**绩效报告**
 ![IMG](https://www.fmz.cn/upload/asset/398347af7738ab10338e.png) 
 ![IMG](https://www.fmz.cn/upload/asset/39ec9c8dd2711b462fa2.png) 
**资金曲线**
 ![IMG](https://www.fmz.cn/upload/asset/39861be4941993816bbd.png) 
 
#### 八、总结
乖离率是一种简单有效的交易工具，能为交易者提供有效的参考，在实际使用中可以配合MACD、布林带指标灵活应用，才能真正体现它的价值。


> 策略参数



|参数|默认值|描述|
|----|----|----|
|short|10|short|
|long|50|long|


> 源码 (python)

``` python

# 回测配置
'''backtest
start: 2018-05-01 00:00:00
end: 2020-01-01 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''


# 外部参数和全局变量
short = 10
long = 50
mp = 0


# 策略主函数
def onTick():
    # 获取数据
    exchange.SetContractType('rb000')   # 订阅期货品种
    bars_arr = exchange.GetRecords()    # 获取K线数组
    if len(bars_arr) < long + 1:        # 如果K线数量过小
        return

    # 计算BIAS
    close = bars_arr[-2]['Close']     # 获取上一根K线收盘价
    ma1 = TA.MA(bars_arr, short)[-2]  # 计算上一根K线短期均线值
    bias1 = (close - ma1) / ma1 * 100 # 计算短期乖离率值
    ma2 = TA.MA(bars_arr, long)[-2]   # 计算上一根K线长期均线值
    bias2 = (close - ma2) / ma2 * 100 # 计算长期乖离率值

    # 下单交易
    global mp  # 全局变量
    current_price = bars_arr[-1]['Close']  # 最新价格
    if mp > 0:   # 如果持有多单
        if bias2 <= bias1:    # 如果长期乖离率小于等于短期乖离率
            exchange.SetDirection("closebuy")    # 设置交易方向和类型
            exchange.Sell(current_price - 1, 100)  # 平多单
            mp = 0  # 重置虚拟持仓
    if mp < 0:   # 如果持有空单
        if bias2 >= bias1:    # 如果长期乖离率大于等于短期乖离率
            exchange.SetDirection("closesell")   # 设置交易方向和类型
            exchange.Buy(current_price + 1, 100)   # 平空单
            mp = 0  # 重置虚拟持仓
    if mp == 0:  # 如果无持仓
        if bias2 > bias1:    # 长期乖离率大于短期乖离率
            exchange.SetDirection("buy")         # 设置交易方向和类型
            exchange.Buy(current_price + 1, 100)   # 开多单
            mp = 1  # 重置虚拟持仓
        if bias2 < bias1:    # 长期乖离率小于短期乖离率
            exchange.SetDirection("sell")        # 设置交易方向和类型
            exchange.Sell(current_price - 1, 100)  # 开空单
            mp = -1  # 重置虚拟持仓
        

# 程序入口函数
def main():
    while True:      # 循环
        onTick()     # 执行策略主函数
        Sleep(1000)  # 休眠1秒

```

> 策略出处

https://www.fmz.cn/strategy/215129

> 更新时间

2021-10-26 15:53:18
