
> Name

逐级铺垫的均线兼顾策略Level-by-Level-Build-Up-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

逐级铺垫的均线兼顾策略是一种基于RENKO图表的交易策略。该策略使用均线 indicaotr 对价格进行平滑处理,利用不同时间周期均线的交叉作为买卖信号。同时,该策略还会根据ATR指标来确定止损位,使止损更加合理。

## 策略原理

该策略主要通过以下几个部分实现:

1. 使用input选择RENKO时间周期和ATR周期

2. 计算RENKO价格和颜色,当价格突破前一个RENKO价格加上当前ATR时转为涨,价格低于前一个RENKO价格减去当前ATR时转为空

3. 使用两个整数BUY和SELL记录当前多单和空单数量

4. 当涨突破时,如果没有空单则开多,空单则平掉
当跌突破时,如果没有多单则开空,多单则平掉

5. 使用plot绘制RENKO图

通过这样的逻辑,策略可以在价格突破前一级别时开仓做多做空,并且会在价格反转时平掉当前头寸。同时,使用ATR来确定突破幅度,可以基于当下的波动率来确定合理的止损位置。

## 优势分析

该策略具有以下几个优势:

1. 使用RENKO消除噪音,识别趋势
RENKO图可以有效消除价格震荡的噪音,识别出较明显的趋势方向。这对发现趋势且跟随趋势是一个很好的组合。

2. 均线交叉发出交易信号
不同时间周期均线交叉可以作为较为可靠的交易信号指标,避免被噪音欺骗。

3. ATR动态止损
使用ATR动态设置止损位,可以根据当下波动率合理设置止损,避免止损过大或过小。

4. 兼顾趋势和均线
结合趋势和均线指标,可以同时利用两者优势,在抓取趋势的同时也确保交易信号更加可靠。

## 风险分析

该策略也存在一些风险:

1. 趋势判断错误
RENKO决定价格趋势的方式可能存在错误,从而导致不必要的买卖开平。需要优化参数以减少误判。

2. 均线交叉假信号
均线交叉信号可能存在假信号,这会导致不必要的买卖动作。可以适当优化均线周期参数。 

3. ATR参数不当
ATR周期设置不当也会导致止损过大或过小。需要测试不同市场确定较优参数。

4. 大幅震荡行情
在横盘和大幅震荡行情下,RENKO图会出现许多不必要的买卖开平操作,会造成资金占用。这需要 通过其它指标进行过滤,避免这种行情交易。

## 优化方向

该策略可以从以下几个方向进行优化:

1. 优化RENKO和ATR参数
调整这两个参数可以尽量减少RENKO的误判,使RENKO更准确抓取趋势。

2. 添加均线交叉过滤
添加更多均线,并要求大部分均线同向交叉才产生信号,可以过滤假信号。

3. 增加其他指标过滤
比如增加量能指标,只在量能同向确认时才产生交易信号,可以避免被套。

4. 优化止损策略 
可以研究如何只在趋势反转时止损,而不是简单跟踪ATR,使止损更加合理。

5. 优化资金管理
研究如何在该策略下最优化资金管理,以提高盈利率同时控制风险。

## 总结

该策略整体来说是一个值得优化和实盘验证的策略,核心思路是利用RENKO识别趋势,并用均线交叉作为过滤后的交易信号。结合ATR动态止损,可以成为一个具有优势的趋势跟踪策略。下一步需要针对已知风险继续进行优化测试,使策略参数更加完善,从而获得更好的实盘表现。


||


## Overview

The Level by Level Build Up Moving Average Strategy is a trading strategy based on RENKO charts. It uses moving average indicators to smooth price and crossovers between moving averages of different timeframes as trading signals. Meanwhile, it also uses the ATR indicator to determine stop loss levels for more reasonable stops.

## Strategy Logic

The core logic of this strategy includes:

1. Use input to select RENKO timeframe and ATR period

2. Calculate RENKO price and color. Turn to up when price breaks above previous RENKO price plus current ATR. Turn to down when price falls below previous RENKO price minus current ATR.

3. Use two integers BUY and SELL to record current long and short positions. 

4. When up breakout, if no short position then go long. If already short then close short position.
   When down breakout, if no long position then go short. If already long then close long position.

5. Plot RENKO chart using plot.

With this logic, the strategy can open long or short when price breaks previous level, and close positions when price reverse. Using ATR to determine breakout range makes stop loss more reasonable based on current volatility.

## Advantage Analysis 

This strategy has the following advantages:

1. RENKO filters noise and identifies trends
RENKO can effectively filter price noise and identify significant trends. This combination is great for trend detection and following.

2. Moving average crossovers generate trading signals
Crossovers between moving averages of different timeframes can provide reliable trading signals and avoid false signals from noise.

3. Dynamic stops with ATR
Using ATR to dynamically set stop loss can make stops more reasonable based on current volatility, avoiding stops too wide or too tight.

4. Combination of trend and moving average
Combining trend and moving average indicators utilizes the strengths of both - catching trends with RENKO while ensuring reliable signals with moving averages.

## Risk Analysis

The strategy also has some risks:

1. Incorrect trend identification
The way RENKO determines trends may result in unnecessary longs or shorts. Parameters need to be optimized to reduce false signals.

2. False signals from moving average crossovers  
There can be false signals from moving average crossovers, causing unnecessary trades. Moving average periods could be optimized.

3. Improper ATR parameters
Improper ATR period setting can also lead to stops too wide or too tight. Different markets should be tested for optimal parameters.

4. Whipsaw markets
In sideways or strong whipsaw markets, RENKO may generate many unnecessary trades, occupying capital. Other filters are needed to avoid trading such markets.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize RENKO and ATR parameters  
Adjust these parameters to minimize RENKO false signals and better catch trends.

2. Add moving average crossover filters
Add more moving averages and require most of them to align before generating signals, to filter false signals. 

3. Add other indicator filters
For example, add volume to only take trades when volume confirms price, avoiding traps.

4. Improve stop loss strategy
Research how to use trend-based stops instead of simply tracking ATR, for more logical stops.

5. Optimize money management
Research optimal capital allocation under this strategy to maximize returns while controlling risks.

## Conclusion

Overall this is a strategy worth optimizing and testing in live markets. The core idea of using RENKO for trend and moving average crossovers as filtered signals is sound. With dynamic ATR stops it can become a solid trend following system. The next step is to continue optimizing it based on the known risks to improve parameters and performance.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|D|TimeFrame|
|v_input_2|14|ATR length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-19 00:00:00
end: 2023-09-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Renko Level Strategy 2", shorttitle="RLS2", overlay=true, pyramiding=2, currency=currency.USD, default_qty_value=50, initial_capital=2000, default_qty_type=strategy.percent_of_equity) 

TF = input(title='TimeFrame', type=input.resolution, defval="D")
ATRlength = input(title="ATR length", type=input.integer, defval=14, minval=2, maxval=100)

HIGH = security(syminfo.tickerid, TF, high)
LOW = security(syminfo.tickerid, TF, low)
CLOSE = security(syminfo.tickerid, TF, close)
ATR = security(syminfo.tickerid, TF, atr(ATRlength))

float RENKO = na
color COLOR = na
int BUY = na
int SELL = na
bool UP = na
bool DN = na

RENKO := na(RENKO[1]) ? close : RENKO[1]
COLOR := na(COLOR[1]) ? color.white : COLOR[1]
BUY := na(BUY[1]) ? 0 : BUY[1]
SELL := na(SELL[1]) ? 0 : SELL[1]
UP := false
DN := false

if(close > RENKO[1]+ATR[1])
    UP := true
    RENKO := close
    COLOR := color.lime
    SELL := 0
    BUY := BUY+1

if(close < RENKO[1]-ATR[1])
    DN := true
    RENKO := close
    COLOR := color.red
    BUY := 0
    SELL := SELL+1
    

if(BUY[1]==1 and BUY==2)
    strategy.entry("long", strategy.long)//, limit = RENKODN)

if(DN)
    strategy.cancel_all()
    strategy.close_all(comment = "close")


plot(RENKO, style=plot.style_line, linewidth=2, color=COLOR)
```

> Detail

https://www.fmz.com/strategy/427886

> Last Modified

2023-09-26 16:00:20
