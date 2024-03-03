
> Name

Supertrend结合RSI的量化交易策略Supertrend-Combined-with-RSI-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/823226b94aea93a628.png)
[trans]
### 概述

本策略名称为“双轮驱动策略”。该策略的主要思想是将Supertrend和RSI这两个强大的技术指标结合在一起,发挥各自的优势,实现更优秀的量化交易。

### 策略原理  

该策略的核心部分在于使用Change函数来判断Supertrend指标的方向变化,从而产生交易信号。当Supertrend指标方向从上向下变化时,产生买入信号;当Supertrend指标从下向上变化时,产生卖出信号。 

同时,策略还引入了RSI指标来辅助判断何时应该平仓。当RSI上穿设置的超买线时,做多单会被平掉;当RSI下穿设置的超卖线时,做空单会被平掉。这样,RSI指标帮助判断合理的止损点,从而锁定利润。

### 优势分析

这种结合了Supertrend和RSI指标的策略,最大的优势在于:

1. Supertrend擅长判断市场趋势变化,实现买入卖出的精确定位。

2. RSI擅长判断过冲回调的高低点,辅助确定合理止盈止损位置。

3. 两者优势互补,更容易抓住市场机会,获得更稳定的盈利。

4. 策略思路清晰简洁,容易理解和跟踪,适合不同水平的投资者。

5. 实现鲁棒性较强,回撤风险可控,容易获得稳定收益。

### 风险分析

尽管双轮驱动策略有许多优势,但仍有一定风险需要注意:

1. Supertrend和RSI都可能会产生错误信号,导致不必要的亏损。可适当调整参数或引入其他指标进行验证。

2. 多空双向交易风险更大,需要更严格的资金管理和风险控制。

3. 当市场出现异常波动时,止损可能会被突破,应备用其他手段控制风险。

4. Supertrend指标对参数敏感度较高,不同市场需要调节ATR周期和因子大小。

### 优化方向  

考虑到上述风险,该策略主要可从以下几个方面进行优化:

1. 增加Volume和MACD等指标过滤假信号,使入场更加准确。  

2. 设置动态止损,跟踪突破来应对异常行情的风险。

3. 对Supertrend参数和RSI参数进行优化,使其更适合不同市场的特点。

4. 增加机器学习算法,辅助判断指标效果和参数选择。

5. 采用期货、期权等衍生品进行套期保值,降低止损风险。

6. 设定不同的仓位管理策略,控制单笔亏损和最大回撤。

### 总结  

“双轮驱动策略”整合了Supertrend和RSI两个指标的优势,实现高效的趋势捕捉和止盈止损。相比单一指标,该策略信号更可靠,回撤更可控,是一种易于实施且收益稳定的算法交易策略。通过继续优化参数设置、增加信号过滤和风险管理模块,该策略有望获得更出色的表现。

||

### Overview   

The strategy is named “Dual-drive Strategy”. The main idea is to combine the Supertrend and RSI, which are two powerful technical indicators, in order to give full play to their respective advantages and achieve excellent quantitative trading performance.

### Strategy Logic   

The core of the strategy uses the Change function to determine the direction change of the Supertrend indicator to generate trading signals. It will generate a buy signal when Supertrend changes from up to down, and it will generate a sell signal when Supertrend turns from down to up.   

At the same time, the RSI indicator is introduced to help determine when to close positions. When the RSI breaks through the set overbought line, long positions will be closed; when the RSI breaks through the set oversold line, short positions will be closed. In this way, the RSI helps determine reasonable stop loss points to lock in profits.

### Advantage Analysis  

The major advantages of this strategy are:   

1. Supertrend is good at identifying market trend changes for accurate long and short entries.  

2. RSI excels at locating overstretched turning points to assist reasonable profit taking and stop loss.

3. The two complement each other with combined strengths for better opportunity capturing and more steady gains.  

4. The strategy logic is simple and clean for easy understanding and tracking even for less experienced investors.

5. Robust implementation with controllable drawdowns and stable profitability.

### Risk Analysis   

Despite having those merits, there are some risks with Dual-drive Strategy:

1. Wrong signals may occur with Supertrend and RSI leading to unnecessary losses. Parameters can be tuned or additional indicators introduced for verification.  

2. Two-way trading with higher risks calls for stricter money management rules and risk control.

3. Stop loss may fail with abnormal price swings using backups to control risks.  

4. Supertrend is sensitive to parameters requiring adjustments for different markets.

### Optimization Directions   

Considering the risks, optimizations can be made in below aspects:  

1. Adding Volume, MACD for additional signal filtering and more accurate entry.   

2. Setting up dynamic stop loss to react to risk events.

3. Optimizing parameters of Supertrend and RSI for better fit with different markets.  

4. Introducing machine learning for parameters and indicator selection.

5. Applying derivatives like futures and options for hedging risks.

6. Varying position sizing rules to limit losses and drawdowns.  

### Summary   

The Dual-drive Strategy effectively combines Supertrend and RSI for efficient trend capturing and profit taking. Compared to single indicator strategies, it provides more reliable signals, smaller drawdowns, and stable algorithm trading performance. Further optimizations on parameter tuning, signal filtering and risk management will lead to even better results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|(?Supertrend)ATR Length|
|v_input_float_1|3|Factor|
|v_input_2_close|0|(?RSI)Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|14|Length|
|v_input_bool_1|true|(?Strategy)Long entries|
|v_input_bool_2|false|Short entries|
|v_input_int_2|72|Exit Long|
|v_input_int_3|28|Exit Short|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © alorse

//@version=5
strategy("Supertrend + RSI Strategy [Alose]", overlay=true )

stGroup = 'Supertrend'
atrPeriod = input(10, "ATR Length", group=stGroup)
factor = input.float(3.0, "Factor", step = 0.01, group=stGroup)

[_, direction] = ta.supertrend(factor, atrPeriod)

// RSI
rsiGroup = 'RSI'
src = input(title='Source', defval=close, group=rsiGroup)
lenRSI = input.int(14, title='Length', minval=1, group=rsiGroup)
RSI = ta.rsi(src, lenRSI)

// Strategy Conditions
stratGroup = 'Strategy'
showLong = input.bool(true, title='Long entries', group=stratGroup)
showShort = input.bool(false, title='Short entries', group=stratGroup)
RSIoverbought = input.int(72, title='Exit Long', minval=1, group=stratGroup, tooltip='The trade will close when the RSI crosses up this point.')
RSIoversold = input.int(28, title='Exit Short', minval=1, group=stratGroup, tooltip='The trade will close when the RSI crosses below this point.')


entryLong = ta.change(direction) < 0
exitLong = RSI > RSIoverbought or ta.change(direction) > 0

entryShort = ta.change(direction) > 0
exitShort = RSI < RSIoversold or ta.change(direction) < 0

if showLong
    strategy.entry("Long", strategy.long, when=entryLong)
    strategy.close("Long", when=exitLong)

if showShort
    strategy.entry("Short", strategy.short, when=entryShort)
    strategy.close("Short", when=exitShort)

```

> Detail

https://www.fmz.com/strategy/440563

> Last Modified

2024-01-31 17:19:28
