
> Name

动态波动调整趋势跟踪策略Dynmaic-Risk-Adjusted-Momentum-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6901cab4d6304b2240.png)
[trans]
### 概述

这个独特的规则化系统化交易策略属于趋势跟随类别。它使用经过价格归一化的价格序列来生成交易信号,而不是直接使用股票价格。该策略采用高级持仓调整和风险管理技术,这些技术通常只在机构投资组合管理中使用,是商品交易顾问(CTA)和管理期货基金等头寸调整的证明技术。

### 策略原理  

“归一化价格”是根据整个价格时间序列计算得出的经过波动率调整的价格累积日收益率。波动率调整窗口期由用户定义。基于归一化价格计算出赫尔移动平均线,并作为主要趋势判断指标。赫尔移动平均线窗口期也由用户定义,默认100天,以保证趋势判断的敏感性,同时避免过于频繁交易。  

交易策略核心非常简单,归一化价格向上跨越赫尔移动平均线做多,向下跨越做空。新的交易信号会主动平掉旧的反向头寸。  

持仓规模基于最近价格波动率和用户定义的年化风险目标。实质上是根据波动率调整仓位大小,波动率低时持仓较大,波动率高时持仓较小。最近波动率为14天价格对数收益率标准差,外推到一年期预期波动率。然后根据用户设置的年化风险目标调整仓位。默认风险目标是保守的10%。初始资金应设置为单笔最大承担损失资金(例如总资金10万元,单笔损失控制在10%,则初始资金设定为1万元)。杠杆限制可独立设置,用于在交易标的本身波动率不能达到风险目标的情况下,同时避免波动率过低时的资金利用率下降。  

止损基于最近价格平均真实波动幅度的倍数设置,用户可配置。

### 策略优势  

- 利用价格归一化处理降低假信号概率  
- 仓位动态调整,有效控制风险  
- 实时止损进一步避免巨额损失  
- 交易策略简单直观,容易理解实现  

### 策略风险  

- 赫尔移动平均线作为主要指标,存在一定滞后  
- 利用波动率调整仓位控制风险的同时可能限制盈利空间  
- 止损过于接近可能被突破造成损失  

风险控制措施包括利用不同移动平均线组合、调整仓位风险目标等。

### 策略优化  

- 测试不同类型移动平均线指标效果  
- 优化移动平均线参数  
- 尝试只做多或者只做空  
- 调整止损幅度寻找最佳点  
- 测试其他止损方式

### 总结  

该策略整合多种技术控制风险,如Prices归一化、动态调仓、止损等。运用简单的趋势跟随原则进行交易。可根据市场和个人情况进行参数调整优化。值得进一步测试验证,具有实际应用潜力。

||

### Overview  

This unique systematic rulebased trading strategy is in the trend following category. It uses normalised prices series transformed from raw ticker price to gernerate trading signals. Advanced position sizing and risk management techniques, commonly reserved for institutional portfolio management, are utilised in this strategy - proven positioning and risk control technologies used by financial advisers like Commodity Trading Advisors and Managed Futures funds.

### Strategy mechanics  

The "normalised price" is a volatility-adjusted accumulated daily returns series. Daily volatility adjustment lookback is user defined. Hull moving average of the normalised price is used as the main trend indicator. Lookback period of the HMA is user defined too, with default period of 100 days for a responsive signal without inducing over-trading.  

The core trades are simple, long when normalised price crossover HMA, short when crossunder HMA. New signals close any existing opposing position.  

Position size is dynamically adjusted based on recent price volatility and the user defined annual risk target. Positions are risk-weighted, larger size with lower volatility and smaller with higher volatility. Recent volatility is the standard deviation of returns over the last 14 periods, then extrapolated into annual volatility as expeted returns. Annual risk target is used as reference for volatility adjusted position sizing. Default target is 10% of total capital. Initial capital should be set as maximum loss per trade. Max leverage allows achieving risk target if underlying natural volatility is insuffient, and alleviates excessively low volatility.  

Hard stops are based on recent price average true range multiplier, user configurable.  

### Advantages 

- Normalised prices reduces false signals   
- Dynamic position sizing controls risk effectively  
- Hard stops prevent runaway losses  
- Simple trend following logic for transparency  

### Risks  

- Lagging issues with Hull moving average  
- Capping profits while lowering risk through volatility adjusted position sizing  
- Stops too tight vulnerable to spikes  

Risk controls measures include alternate moving average selections, adjusting risk targets.  

### Enhancements  

- Test effectiveness of other moving average types  
- Optimize parameters of moving averages  
- Try long-only or short-only variants  
- Fine tune stop loss ranges  
- Experiment with other stop loss mechanisms  

### Conclusion  

The strategy integrates various techniques like normalisation, dynamic position adjustment, hard stops to control risks. Trading is based on simple trend following rules. Parameters can be adjusted for personal preferences and market regimes. Worth further testing and verification for viable real world application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|(?Strategy Settings)Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|14|Lookback period for price normalisation filter|
|v_input_int_2|100|Lookback period for Hull Moving Average|
|v_input_int_3|false|HMA Offset|
|v_input_2|true|Long|
|v_input_3|true|Short|
|v_input_float_1|true|(?Risk Management Settings)Stop multiple|
|v_input_float_2|true|Max Leverage|
|v_input_float_3|10|Annualised Volatility Target %|
|v_input_4|false|Compounding|
|v_input_float_4|50|%|
|v_input_int_4|true|(?Backtest range)From Day|
|v_input_int_5|true|From Mon|
|v_input_int_6|2018|From Yr|
|v_input_int_7|true|To Day|
|v_input_int_8|true|To Mon|
|v_input_int_9|9999|To Yr|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-17 00:00:00
end: 2024-01-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Crunchster1

//@version=5
strategy(title="Crunchster's Normalised Trend Strategy", shorttitle="Normalised Trend Strategy", overlay=false )

// Inputs and Parameters
src = input(close, 'Source', group='Strategy Settings')
length = input.int(title="Lookback period for price normalisation filter", defval=14, minval=2, group='Strategy Settings', tooltip='This sets the lookback period for the volatility adjustment of returns, which is used to transform the price series into the "real price"')
hlength = input.int(title="Lookback period for Hull Moving Average", defval=100, minval=2, group='Strategy Settings')
offset = input.int(title="HMA Offset", defval=0, minval=0, group='Strategy Settings')
long = input(true, 'Long', inline='08', group='Strategy Settings')
short = input(true, 'Short', inline='08', group='Strategy Settings', tooltip='Toggle long/short strategy on/off')

stopMultiple = input.float(1, 'Stop multiple', step=0.25, group='Risk Management Settings', tooltip='Multiple for ATR, setting hard stop loss from entry price')
lev = input.float(1, 'Max Leverage', step=0.5, group='Risk Management Settings', tooltip='Max leverage sets maximum allowable leverage of total capital (initial capital + any net profit), capping maximum volatility adjusted position size')
riskT = input.float(10, maxval=75, title='Annualised Volatility Target %', group='Risk Management Settings', tooltip='Specify annual risk target, used to determine volatility adjusted position size. Annualised daily volatility is referenced to this value and position size adjusted accordingly')
comp = input(false, 'Compounding', inline='09', group='Risk Management Settings')
Comppct = input.float(50, '%', step=5, inline='09', group='Risk Management Settings', tooltip='Toggle compounding of profit, and set % of profit to compound')

// Backtesting period
FromDay = input.int(defval=1, title='From Day', minval=1, maxval=31, inline='04', group='Backtest range')
FromMonth = input.int(defval=1, title='From Mon', minval=1, maxval=12, inline='04', group='Backtest range')
FromYear = input.int(defval=2018, title='From Yr', minval=1900, inline='04', group='Backtest range', tooltip='Set start of backtesting period')
ToDay = input.int(defval=1, title='To Day', minval=1, maxval=31, inline='05', group='Backtest range')
ToMonth = input.int(defval=1, title='To Mon', minval=1, maxval=12, inline='05', group='Backtest range')
ToYear = input.int(defval=9999, title='To Yr', minval=1900, inline='05', group='Backtest range', tooltip='Set end of backtesting period')

start = timestamp(FromYear, FromMonth, FromDay, 00, 00)
finish = timestamp(ToYear, ToMonth, ToDay, 23, 59)
window = true

// Normalised returns calculation
nRet = (src - src[1]) / ta.stdev((src - src[1]), length)

nPrice = ta.cum(nRet)

//Hull Moving Average - using normalised price series
fHMA = ta.wma(2 * ta.wma(nPrice[offset], hlength / 2) - ta.wma(nPrice[offset], hlength), math.round(math.sqrt(hlength)))

//Risk Management formulae
strategy.initial_capital = 50000
tr = math.max(high - low, math.abs(high - close), math.abs(low - close)) //True range
stopL = ta.sma(tr, 14) //Average true range
stdev = ta.stdev(close-close[1], 14) //volatility of recent returns
maxcapital = strategy.initial_capital+strategy.netprofit //Maximum capital available to invest - initial capital net of profit
annvol = 100*math.sqrt(365)*stdev/close //converts recent volatility of returns into annualised volatility of returns - assumes daily timeframe

risk = 1.1
if comp
    risk := (strategy.initial_capital+(Comppct*strategy.netprofit/100))//adjust investment capital to include compounding
else
    risk := strategy.initial_capital

shares = (risk * (riskT/annvol)) / close //calculates volatility adjusted position size, dependent on user specified annualised risk target
if ((shares*close) > lev*maxcapital) //ensures position size does not exceed available capital multiplied by user specified maximum leverage
    shares := lev*maxcapital/close

//To set the price at the entry point of trade
Posopen() =>
    math.abs(strategy.position_size[1]) <= 0 and math.abs(strategy.position_size) > 0

var float openN = na
if Posopen()
    openN := stopL

// Strategy Rules
if long
    longCondition = ta.crossover(nPrice, fHMA) and window
    exitlong = ta.crossunder(nPrice, fHMA)
    if (longCondition)
        strategy.entry('Go Long!', strategy.long, qty=shares)
    if strategy.position_size > 0    
        strategy.exit('Stop Long', from_entry = 'Go Long!', stop=(strategy.opentrades.entry_price(0) - (openN * stopMultiple)))
    if (exitlong)
        strategy.close('Go Long!', immediately = true)

if short
    shortCondition = ta.crossunder(nPrice, fHMA) and window
    exitshort = ta.crossover(nPrice, fHMA)
    if (shortCondition)
        strategy.entry('Go Short!', strategy.short, qty=shares)
    if strategy.position_size < 0   
        strategy.exit('Stop Short', from_entry = 'Go Short!', stop=(strategy.opentrades.entry_price(0) + (openN * stopMultiple)))
    if (exitshort)
        strategy.close('Go Short!', immediately = true)

// Visuals of trend and direction
plot(nPrice, title='Real Price', color=color.black)

MAColor = fHMA > fHMA[3] ? #00ff00 : #ff0000
MA1 = plot(fHMA, title='Hull MA', color=MAColor)
MA2 = plot(fHMA[3], title='Hull MA Offset', color=MAColor)
fill(MA1, MA2, title='Band Filler', color=MAColor)
```

> Detail

https://www.fmz.com/strategy/439833

> Last Modified

2024-01-24 11:13:39
