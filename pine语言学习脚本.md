
> 策略名称

pine语言学习脚本

> 策略作者

Zer3192



> 策略参数



|参数|默认值|描述|
|----|----|----|
|v_input_1|10|Fast Length|
|v_input_2|20|Slow Length|


> 源码 (PineScript)

``` javascript
//@version=4
study("SMA Trend Strategy")

// 设置参数
fastLength = input(title="Fast Length", type=input.integer, defval=10)
slowLength = input(title="Slow Length", type=input.integer, defval=20)

// 计算指标
fastSMA = sma(close, fastLength)
slowSMA = sma(close, slowLength)

// 设置止盈止损
longStop = strategy.position_avg_price * (1 - 0.01)
shortStop = strategy.position_avg_price * (1 + 0.01)
longlimit = strategy.position_avg_price * (1 + 0.01)
shortlimit = strategy.position_avg_price * (1 - 0.01)

// 开仓条件
longCondition = crossover(fastSMA, slowSMA)
shortCondition = crossunder(fastSMA, slowSMA)

// 开仓
strategy.entry("Long", strategy.long, when=longCondition)
strategy.entry("Short", strategy.short, when=shortCondition)

// 止盈止损
strategy.exit("Long Stop", "Long", stop=longStop,limit=longlimit)
strategy.exit("Short Stop", "Short", stop=shortStop,limit=shortlimit)

```

> 策略出处

https://www.fmz.com/strategy/395433

> 更新时间

2023-01-28 14:58:19
