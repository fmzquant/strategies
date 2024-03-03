
> Name

即时突破波动率EMA趋势策略Zero-Lag-Volatility-Breakout-EMA-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11ca7e5f690e711664d.png)

[trans]

### 概述

该策略是一个简单的突破策略,它使用两个不同的零时滞后EMA的差值来跟踪标的物的上涨或下跌势头。当差值超过一定倍数的布林带时,根据基础EMA的方向生成做多或做空信号。

### 策略原理

该策略使用两个特殊类型的EMA指标来计算波动率差值。这两个EMA指标的计算公式为:

```
hJumper = math.max(src,ta.ema(src,lx)) 

lJumper = math.min(src,ta.ema(src,lx))

dif = (hJumper / lJumper) - 1
```

该指标立即响应价格的大幅波动,没有滞后。

当dif超过布林带上轨时,产生入场信号;当dif低于布林带中轨时,产生出场信号。基础EMA方向决定做多或做空方向。

### 优势分析

该策略最大的优势是捕捉突破信号的速度快,没有滞后。这是通过计算两个特殊的零时滞后EMA实现的。这使得策略可以即时响应价格突破事件,从而在趋势形成初期捕捉更高的效率。

另一个优势是该策略仅仅使用一个参数lx。参数少使得策略容易调优,也减少了过度优化的风险。

### 风险分析

该策略的主要风险在于突破信号可能出现假突破。当价格出现震荡时,可能会连续产生假突破。为了减少这样的风险,可以适当调大布林带倍数,使信号更加稳定。

另一个风险是在震荡行情中会出现频繁的小损益。这可以通过调整出场机制来缓解。比如设定止损或止盈价格。

### 优化方向

该策略可以从以下几个方面进行优化:

1. 结合其他指标过滤入场信号,减少假突破的概率

2. 增加止损止盈机制,管理持仓风险

3. 引入交易量的确认,避免出现无量突破的假信号

4. 使用自适应布林带参数,根据市场波动率调整参数

5. 基于机器学习方法动态优化策略参数

### 总结

该即时突破波动率EMA策略通过计算零时滞后的EMA捕捉价格趋势的势头,具有响应迅速、参数简单等优点。下一步可以从过滤信号、止损止盈、交易量确认等方面进行优化,使策略在不同市场环境中都能稳定运行。

||

### Overview

This is a simple breakout strategy that uses the difference between two different zero lag EMAs to track the upward or downward momentum of an instrument. When the difference breaks out a Bollinger Band of configurable standard deviation, long/short signals are generated based on the direction of the underlying EMA.

### Strategy Logic  

The strategy uses two specially calculated EMA indicators to get the volatility difference, as shown in below formulas:

```
hJumper = math.max(src,ta.ema(src,lx))
lJumper = math.min(src,ta.ema(src,lx))  
dif = (hJumper / lJumper) - 1
```

The difference responds instantly to sharp price changes without lag.

When dif crosses above the Upper Bollinger Band, entry signal is triggered. When dif crosses below the Middle Bollinger Band, exit signal is triggered. The direction of base EMA determines long or short.


### Advantage Analysis

The biggest advantage of this strategy is its fast response to breakout signals without lag. This is achieved by using two specially calculated zero lag EMAs. This allows the strategy to instantly capture price breakout events and enter early in emerging trends.  

Another advantage is the simplicity of this strategy. It has only one parameter lx. Less parameters make optimization easier and reduce the risk of overfitting.

### Risk Analysis  

The main risk of this strategy is possible false breakout of the signals. Consecutive false breakouts may happen during ranging periods. To mitigate this risk, we can increase the Bollinger Band multiple to make signals more stable.

Another risk is frequent small wins/losses during choppy markets. This can be alleviated by adjusting exit mechanisms, for example by setting stop loss or take profit price levels.

### Optimization Directions   

Below are some directions this strategy can be optimized:

1. Add filter indicators to validate entry signals and reduce false signals.

2. Incorporate stop loss and take profit to better manage trades. 

3. Look for trading volume confirmation to avoid false breakouts without volume commitment.  

4. Adopt adaptive Bollinger Bands to adjust parameters based on market volatility.

5. Optimize parameters dynamically based on machine learning.

### Conclusion

In summary, this zero lag volatility breakout EMA strategy captures price momentum rapidly by using specially calculated EMAs without lag. Next step optimizations may include adding filters, stop loss/profit, volume confirmation etc. to make the strategy robust across different market environments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_source_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|200|EMA Difference Length|
|v_input_float_1|2|Standard Deviation Multiple|
|v_input_bool_1|true|Use Binary Strategy|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-07 00:00:00
end: 2024-01-14 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © wbburgin

//@version=5
strategy("Zero-lag Volatility-Breakout EMA Trend Strategy",overlay=false)

tt1 = "If selected, the strategy will not close long or short positions until the opposite signal is received. This"+
 " exposes you to more risk but potentially could generate larger returns."

src = input.source(close,"Source")
lx = input.int(200,"EMA Difference Length")
bbmult = input.float(2.0,"Standard Deviation Multiple")
useBinaryStrategy = input.bool(true,"Use Binary Strategy",tooltip = tt1)

hJumper = math.max(src,ta.ema(src,lx))
lJumper = math.min(src,ta.ema(src,lx))

dif = (hJumper / lJumper) - 1

[bbm,bbu,bbl] = ta.bb(dif,lx,bbmult)

plot(dif,color=color.white,title="Zero lag EMA Difference")
plot(bbu,color=color.lime,title="Bollinger Top")
plot(bbl,color=color.red,title="Bollinger Bottom")
plot(bbm,color=color.yellow,title="Bollinger Middle")

sigEnter = ta.crossover(dif,bbu)
sigExit = ta.crossunder(dif,bbm)
emaBase = ta.ema(src,lx)
enterLong = sigEnter and emaBase > emaBase[1]
enterShort = sigEnter and emaBase < emaBase[1]

plotshape(enterLong,style=shape.labelup,location=location.bottom,color=color.green,size=size.tiny)
plotshape(enterShort,style=shape.labeldown,location=location.top,color=color.red,size=size.tiny)

if enterLong
    strategy.entry("Long",strategy.long)
if enterShort
    strategy.entry("Short",strategy.short)
if not useBinaryStrategy and sigExit
    strategy.close("Long")
    strategy.close("Short")
```

> Detail

https://www.fmz.com/strategy/438774

> Last Modified

2024-01-15 12:00:25
