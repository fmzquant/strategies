
> Name

双线波动带均线博弈交易策略TrumpBollingerEMAcandlestick-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略运用布林带指标和均线指标,结合特殊的交易信号来进行双线博弈交易,属于短线交易策略。

## 原理

本策略主要由以下几部分组成:

1. 布林带指标
根据闭合价格及其标准差生成上下轨,当价格接近上轨时看空,接近下轨时看多。

2. 均线指标
计算21日指数移动平均线,与价格交叉做多做空信号。

3. 交易信号
使用蜡烛图patterns来判断价格转折点,如顶部暗区,底部明区等,发出交易信号。

4. 双线博弈
根据布林带、均线交叉信号进行双线博弈交易,即看涨看跌同时进行。

具体原理是:

根据布林带上下轨判断可能的反转点,当价格接近上轨时看空,接近下轨时看多。同时计算21日EMA均线,与价格产生金叉看多,死叉看空。此外,还判断蜡烛图形态,出现底部暗区则看多,顶部明区则看空。根据这三种信号合成最终交易判断,进行双边博弈交易。

该策略结合布林带、均线和蜡烛信号,提高交易决策效率。优点是多种信号確認,不容易错过转折点,可以提高获利概率。

## 优势分析

本策略主要有以下优势:

1. 多种信号综合判断,提高决策准确性

策略运用布林带、均线以及蜡烛信号三种指标,相互验证,综合判断最终交易方向。这可以过滤假信号,避免失误交易。

2. 响应迅速,不易错过转折

本策略结合布林带和均线等指标,可以快速定位可能的反转点,及时做出交易决策,不易错过市场转折机会。

3. 双线操作,提高获利概率

采用双线博弈方式,同时持有多单和空单。这可以在市场任一方向大幅波动时获利,降低单边行情的风险,提高盈利概率。

4. 适合短线交易,灵活应对市场

该策略采用较短周期布林带和均线作为参考,可以捕捉短线趋势,适合短线频繁交易,可应对市场的高频波动。

5. 直接可用,简单易操作

策略以完整代码形式呈现,可直接用于实盘交易。指标和参数选择合理,非常适合个人交易者简单快速使用。

## 风险分析

本策略也存在以下风险:

1. 可能出现连续止损

在震荡行情中,布林带上下轨、均线以及蜡烛信号可能出现频繁交叉。这会导致策略连续止损。建议适当调整参数,确保止损幅度合理。

2. 双线操作风险较大

同时持有多单和空单会加剧亏损,需要充足资金支持。建议降低单笔交易资金比例,确保整体风险可控。

3. 短线操作需密切监控

短线操作需要持续盯市,不能长时间离开交易界面。建议采用止盈止损策略,避免出现超出预期的损失。

4. 参数优化空间有限

布林带和均线参数优化空间比较小,需要根据市场调整,灵活应用。

5. 需适应常见图形无法明确判断

本策略部分依赖蜡烛信号,但某些常见蜡烛无法明确判断,这时需结合其它指标决策。

## 优化方向

本策略可以从以下几个方面进行优化:

1. 整合更多指标信号

可以考虑加入KD,MACD等其它指标,丰富交易信号来源,提高决策准确性。

2. 增加机器学习判断

利用机器学习算法自动分析大量历史数据,辅助或取代部分Indicator信号判断,减少人工干预。

3. 优化止盈止损策略 

可以设定自适应止盈幅度,达到一定盈利后逐步收紧止盈;也可以 trailing stop 或按时间段逐步调整止损位置,降低亏损风险。

4. 优化资金管理

可以根据市场情况,优化资金分配比例、仓位控制等策略,在保证盈利的同时控制风险。

5. 结合量化分析系统

利用量化回测和模拟交易,对策略参数进行反复测试优化,并辅助实盘决策,提高稳定性。

6. 增加自动交易功能

根据回测结果,将策略参数化,加入自动交易系统,实现无人值守交易。

## 总结

本策略整合布林带、均线指标与蜡烛信号,形成多重验证的交易策略。采用双线博弈方式,可以提高获利概率。该策略响应迅速,适合短线频繁交易。有效的止盈止损策略及参数优化可以进一步提高效果并降低风险。整体来说,该策略简单实用,具有很强的实战价值。

|| 

## Overview

This strategy uses Bollinger Bands, EMA and candlestick patterns for dual-line gambling trading, belonging to short-term trading strategies. 

## Principles 

The strategy consists of the following parts:

1. Bollinger Bands
Generate upper and lower rails based on closing price and standard deviation. Go short when price approaches upper rail, go long when approaching lower rail.

2. EMA 
Calculate 21-day exponential moving average and generate trading signals when price crosses EMA. 

3. Candlestick Patterns
Identify price reversal points such as bottom dark cloud cover and top piercing pattern to trigger trades.

4. Dual-line Gambling 
Go long and short simultaneously based on signals from Bollinger, EMA crossover and candlestick patterns.

The logic is:

Use Bollinger Bands to identify potential reversal points, go short at upper rail and long at lower rail. Calculate 21-day EMA and go long on golden cross, go short on death cross. Also use candlestick patterns to identify reversals, go long on bottom dark cloud and short on top piercing. Combine all three signals to make final dual-direction trading decisions.

The strategy integrates multiple confirming signals to improve efficiency of trading decisions. The advantage is higher profitability with multiple validation and timely response to reversals. 

## Advantage Analysis

The main advantages of this strategy are:

1. Improved accuracy with multiple signal confirmation

Using Bollinger, EMA and candlestick together enhances accuracy by validating signals. This helps avoid false signals and erroneous trades.

2. Timely response and capture of reversals  

The combined signals quickly identify potential reversal points for timely trading before reversals extend.

3. Higher profitability with dual-line trading

Holding both long and short positions profits from big moves in either direction. This reduces risks in one-directional markets.

4. Flexibility for short-term trading

The short-period Bollinger and EMA allow capturing short-term moves, suitable for frequent trading and responding to high-frequency fluctuations.

5. Directly usable and simple to operate

The complete strategy code makes it directly usable for live trading. Reasonable parameters selection also makes it very easy to use for individual traders.

## Risk Analysis

The potential risks are:

1. Possible consecutive stop loss

Whipsaw of Bollinger, EMA and candlestick signals may cause consecutive stop loss. Adjust parameters to ensure reasonable stop loss.

2. Higher risks in dual-line trading 

Holding both long and short can amplify losses. Sufficient capital is required to support the risks. Lower position sizing is recommended.

3. Close monitoring needed for short-term trading

Frequent short-term trading requires close tracking of the market. Set stop profit/loss to limit unexpected big losses.

4. Limited optimization space

Bollinger and EMA has relatively small optimization space. Flexibility is needed when applying parameters.

5. Common candlestick patterns can be unclear

Part of the strategy relies on candlestick signals which can be unclear at times. Combine with other indicators in such cases.

## Optimization Directions

The strategy can be improved in the following aspects:

1. Integrate more indicator signals 

Adding other indicators like KD, MACD diversifies signal sources and improves decision accuracy.

2. Incorporate machine learning 

Use ML algorithms to analyze historical data and augment or replace some indicator signals to reduce manual intervention.

3. Optimize stop profit/loss

Introduce adaptive stop profit based on performance, and trailing stop loss to reduce risk.

4. Enhance risk management 

Optimize capital allocation, position sizing and risk control strategies according to market conditions.

5. Quantitive backtesting and optimization

Utilize backtesting and paper trading to repeatedly optimize parameters and assist live trading decisions.

6. Automated Trading

Parameterize strategy based on backtest results and incorporate into automated trading system for hand-free execution.

## Conclusion

This strategy integrates Bollinger, EMA and candlestick signals for multiple validation. The dual-line trading further improves profitability. With fast response, it is suitable for short-term frequent trading. Effective stop profit/loss and parameter optimization can further enhance performance while reducing risk. Overall, this simple and practical strategy has strong practical value.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true| Follow Code #Trump On/Off|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-30 00:00:00
end: 2023-10-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//Design by MrPhu in August,10,2018
strategy("TrumpShipper_Long_Short V26", overlay=true)
filterFractals = input(true, title=" Follow Code #Trump On/Off")
dt = 0.0001
confidence=(request.security(syminfo.tickerid, 'D', close)-request.security(syminfo.tickerid, 'D', close[1]))/request.security(syminfo.tickerid, 'D', close[1])
prediction = confidence > dt ? true : confidence < -dt ? false : prediction[1]

if (prediction)
    strategy.exit("Close", "Short ")
    strategy.entry("Long ", strategy.long)

if (not prediction)
    strategy.exit("Close", "Long ")
    strategy.entry("Short ", strategy.short)
///////////Bollinger Band///////////////
length = 20
crc = close, title="Source"
mult = 2.0
basis = sma(crc, length)
dev = mult * stdev(crc, length)
upper = basis + dev
lower = basis - dev
spanColor = prediction ? green : red, transp=90

p1 = plot(upper, title="Short", style=line, linewidth=1, color=spanColor)
p2 = plot(lower, title="Long", style=line, linewidth=1, color=spanColor)

fill(p1, p2, color=spanColor, transp=90, title="Fill")

/////////////
Optional_TimeFrame = 'D'

M_HIGH = request.security(syminfo.tickerid, Optional_TimeFrame, high)
M_OPEN = request.security(syminfo.tickerid, Optional_TimeFrame, open)
M_LOW = request.security(syminfo.tickerid, Optional_TimeFrame, low)

H_RANGE = M_HIGH-M_OPEN
L_RANGE = M_OPEN-M_LOW

H_236 = M_HIGH - H_RANGE * 0.236
H_382 = M_HIGH - H_RANGE * 0.382
H_500 = M_HIGH - H_RANGE * 0.500
H_618 = M_HIGH - H_RANGE * 0.618
H_764 = M_HIGH - H_RANGE * 0.764

L_236 = M_LOW + L_RANGE * 0.236
L_382 = M_LOW + L_RANGE * 0.382
L_500 = M_LOW + L_RANGE * 0.500
L_618 = M_LOW + L_RANGE * 0.618
L_764 = M_LOW + L_RANGE * 0.764

pl1=plot(M_HIGH, color=M_HIGH != M_HIGH[1] ?na:black, style=line, linewidth=1, transp=80)

pl2=plot(H_236, color=H_236 != H_236[1] ?na:gray, style=line, linewidth=1, transp=80)
pl3=plot(H_382, color=H_382 != H_382[1] ?na:black, style=line, linewidth=1, transp=80)
pl4=plot(H_500, color=H_500 != H_500[1] ?na:red, style=line, linewidth=1, transp=80)
pl5=plot(H_618, color=H_618 != H_618[1] ?na:gray, style=line, linewidth=1, transp=80)
pl6=plot(H_764, color=H_764 != H_764[1] ?na:gray, style=line, linewidth=1, transp=80)

pl7=plot(M_OPEN, color=M_OPEN != M_OPEN[1] ?na:blue, style=line, linewidth=2)

pl8=plot(L_236, color=L_236 != L_236[1] ?na:gray, style=line, linewidth=1, transp=80)
pl9=plot(L_382, color=L_382 != L_382[1] ?na:black, style=line, linewidth=1, transp=80)
pl10=plot(L_500, color=L_500 != L_500[1] ?na:red, style=line, linewidth=1, transp=80)
pl11=plot(L_618, color=L_618 != L_618[1] ?na:black, style=line, linewidth=1, transp=80)
pl12=plot(L_764, color=L_764 != L_764[1] ?na:gray, style=line, linewidth=1, transp=80)

pl13=plot(M_LOW, color=M_LOW != M_LOW[1] ?na:black, style=line, linewidth=1, transp=80)

SHOW_MA = false
MA_SRC = hlc3
MA_LENGTH = 21

_MA = ema(MA_SRC, MA_LENGTH)
pl14=plot(not SHOW_MA ? na : _MA, color=teal, linewidth=2)

SHOW_SIGNALS = true

BUYX(_F) => cross(_F, MA_SRC) and rising(_MA, 1)
SELX(_F) => cross(_F, MA_SRC) and falling(_MA, 1)

SEL_SIGNAL = SELX(H_236) or SELX(H_382) or SELX(H_500) or SELX(H_618) or SELX(H_764) or SELX(L_236) or SELX(L_382) or SELX(L_500) or SELX(L_618) or SELX(H_764)

BUY_SIGNAL = BUYX(H_236) or BUYX(H_382) or BUYX(H_500) or BUYX(H_618) or BUYX(H_764) or BUYX(L_236) or BUYX(L_382) or BUYX(L_500) or BUYX(L_618) or BUYX(H_764)

//================= Chart 30m =================/////
//Jurij
h_left = 10
h_right = 10
//barCount = nz(barCount[1]) + 1
//check history and realtime PTZ
h_left_low = lowest(h_left)
h_left_high = highest(h_left)
newlow = low <= h_left_low
newhigh = high >= h_left_high
central_bar_low = low[h_right + 1]
central_bar_high = high[h_right + 1]
full_zone_low = lowest(h_left + h_right + 1)
full_zone_high = highest(h_left + h_right + 1)
central_bar_is_highest = central_bar_high >= full_zone_high
central_bar_is_lowest = central_bar_low <= full_zone_low
plotchar(central_bar_is_highest ? -1 : 0, offset=-h_right-1 ,color=red, text="Top")
plotchar(central_bar_is_lowest ? 1 : 0, offset=-h_right-1 ,location=location.belowbar, color=green, text="Bottom")
```

> Detail

https://www.fmz.com/strategy/428616

> Last Modified

2023-10-07 15:30:27
