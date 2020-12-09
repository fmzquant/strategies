
> 策略名称

乖离率BIAS策略

> 策略作者

Hukybo

> 策略描述

#### 一、摘要
俗话说分久必合合久必分，在期货市场也有这种现象，没有只涨不跌的品种也没有只跌不涨的品种。但是什么时候分什么时候合，这就要看乖离率了。本篇我们将使用乖离率构建一个简单的策略。
[点击查看更多内容](https://www.fmz.com/bbs-topic/5777)

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

https://www.fmz.com/strategy/215129

> 更新时间

2020-11-18 17:34:41
