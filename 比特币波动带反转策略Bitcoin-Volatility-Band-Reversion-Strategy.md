
> Name

比特币波动带反转策略Bitcoin-Volatility-Band-Reversion-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略是一种拉回系统,旨在为高波动性证券设计,因此比特币是一个非常理想的交易品种。该策略可以在日线图或更低时间框架(我在3小时时间框架上找到了良好的结果,但没有在1小时以下进行测试)上使用。

## 策略原理

该策略通过比较前两个K线的收盘价的变化来计算波动性,并用此价格变化生成一个移动平均线。在移动平均线上包裹一个标准差波带,内部为1个标准差,外部为2个标准差。如果价格高于预设的移动平均线过滤器,则确定我们处于上升趋势,所以在上升趋势时,如果有拉回导致内部标准差波带被刺破,则发出买入信号。但如果价格继续下跌并突破外部标准差波带,则不会发出买入信号,因为这表明波动率刺破过大。当内部波带被刺破时,指标上会显示绿色背景的刺破“买入”事件。 对于卖出/短线交易,则是在内部上部波带刺破且低于预设移动平均线滤波器时发出信号,指标上显示红色背景。

用户可以改变他们想要测试的日期范围、计算波动率的移动平均周期和内外波带标准差。对于比特币,我将内部和外部标准差波带保留在标准设置,但发现3周期的波动率跟踪对于1天图表交易很好,5周期的波动率跟踪对于3小时图表则很好。由于这不是买入并持有策略,因此交易时您可能希望坚持最流动的币种,以便可以在任何交易所快速进出。如果要在较低波动的市场上测试此策略,则将内部标准差波带更改为约0.75可能适用于各种期货市场,可能也适用于股票。止损和止盈水平基于过去7根K线的交易范围。

## 策略优势

- 利用波动率交易,可捕捉市场转折点
- 双向交易,可在上涨和下跌市场中获利
- 标准参数设置简单易用
- 可轻松优化参数以适应不同标的
- 停损与止盈设定合理,有利锁定利润

## 策略风险

- 高波动标的存在亏损扩大的风险
- 多空切换频繁,交易费用较高  
- 短期操作,需密切注意市场变化
- 标的流动性不足时难以止损
- 参数不当可能导致过度交易

风险应对方法:

1. 选择适当的波动标的,控制单笔仓位。

2. 优化参数,降低无效交易。

3. 采用止盈止损,严格资金管理。
 
4. 注重交易执行效率,选择流动性好的标的。

5. 调整参数以适应不同标的特性。

## 策略优化方向 

该策略可以从以下几个方面进行优化:

1. 优化移动平均线周期,以更好跟踪不同标的的波动率。

2. 调整波动率带的参数,使其更贴近特定标的的波动范围。

3. 增加其他过滤条件,如交易量放大,进一步验证交易信号。

4. 利用机器学习技术动态优化参数,使策略更具适应性。

5. 在更高频的时间框架上测试,以捕捉更多交易机会。

6. 添加止盈止损移动跟踪,让利润更多地锁定在账户中。

7. 结合其它指标或模型,建立量化组合策略。

## 总结

该策略整体较为简单直观,利用波动率指标识别反转情况,以捕捉市场转折点。策略优化空间较大,通过调整参数及结合其他技术指标,可以继续提升策略的稳定性和盈利能力。但交易者需要注意防范过度优化和曲线拟合的问题。此策略更适合短期交易,需要严格的资金管理以控制风险。如果掌握得当,该策略可以成为波动性高的数字货币交易的利器。

||

## Overview

This strategy is a pullback system designed for securities with high volatility, so naturally Bitcoin is an excellent choice for trading this. This could be used both on a daily chart or on lower timeframes (I found good results on 3hr timeframe but haven't tested it on anything under 1hr).

## Strategy Logic

The strategy calculates volatility by comparing the change in closing price of the previous 2 candles, and uses this change in price to generate a moving average. A band is wrapped around the moving average with a standard deviation of 1 for the inner band and 2 for the outer band. If the price is above a pre-set MA (moving average) filter then it is determined we are in an uptrend so the strategy will issue a buy signal when we are in an uptrend and there is a pullback which causes the lower inner deviation band to be spiked, but if the price continues and falls through the outer deviation band then a buy signal will not issue as this detriments that the volatility spike is to great. You can see a spike "buy" event occur on the indicator where the background is coloured green. For a short/sell then there will be a spike on the upper inner band and we are below the pre-set MA filter, for this it shows with red background on the indicator.

The user can change the date range they wish to test, the moving average period for the volatility tracking and the inner and outer band deviations. On BTC I left the inner deviation and outer deviation bands on standard settings but found the 3 period volatility tracking to be good for trading 1 day chart and the 5 period volatility tracking good for the 3hr chart. Since this is not a buy and hold strategy then for trading you would probably want to stick with the most liquid coins so you can get in and out very fast on any exchange. If you wanted to tray this on less volatile markets then changing the inner deviation band to ~0.75 would work okay in various futures markets likely stocks as well. The take profit and stop loss levels are based on a multiple of the trading range looking back the past 7 candles.

## Advantages of the Strategy

- Utilizes volatility trading to capture market turning points
- Trades both long and short, profiting in up and down markets
- Simple standard parameter settings easy to use
- Parameters can be easily optimized for different underlyings  
- Reasonable stop loss and take profit settings help lock in profits

## Risks of the Strategy

- High volatility underlyings risk larger losses
- Frequent long/short switching incurs higher trading costs
- Short-term operations require close market monitoring
- Difficult to stop loss when low market liquidity
- Poor parameter tuning can lead to over-trading

Risk Mitigation Methods:

1. Choose appropriate volatile underlyings, control position sizing.

2. Optimize parameters to reduce ineffective trades. 

3. Use stop loss and take profit, strict money management.

4. Focus on execution efficiency, choose liquid underlyings.

5. Adjust parameters to suit different underlying characteristics.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize moving average period to better track volatility of different underlyings. 

2. Adjust volatility band parameters to better fit specific underlying's volatility range.

3. Add other filters like volume spike to further validate signals.

4. Use machine learning techniques to dynamically optimize parameters for adaptiveness.

5. Test on higher frequency timeframes to capture more trading opportunities.

6. Add moving stop loss/take profit tracking to lock in profits more.

7. Combine with other indicators or models to build quantitative portfolio strategies.

## Summary 

The strategy overall is rather simple and intuitive, identifying reversals via volatility indicator to capture market turning points. There is large optimization space by adjusting parameters and incorporating other technical indicators to further enhance stability and profitability. However traders need to be aware of overfitting and curve fitting problems. This strategy suits short-term trading more, requiring strict money management to control risks. If mastered properly, it can become a powerful tool for trading high volatility cryptocurrencies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|7| MA Length|
|v_input_2|true|Inner Band|
|v_input_3|2|Outer Band|
|v_input_4|true|From Day|
|v_input_5|true|From Month|
|v_input_6|2000|From Year|
|v_input_7|true|To Day|
|v_input_8|true|To Month|
|v_input_9|2100|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-10-11 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © gary_trades
//This script is designed to be used on volatile securities/tickers so is best suited for day charts on Crypto (particularly good for BTC).
//It takes both long and short trades and the main indicator settings can be changed by the use so they can test for ideal settings for ticker of interest.

//@version=4

strategy("BTC Volatility Band Strategy", shorttitle="Vol Band Strategy", overlay=false, margin_long=100, margin_short=100)

//VOLATILTY
CandleChange = ((close - close[1])/close)*100         //OR CandleChange = ((close[2] - close[1])/close)*100
plot(CandleChange, color=color.red, linewidth = 1)

//VOLATILITY BANDS 
MAlen = input(7, minval=3, maxval=30, title=" MA Length")
MAout = sma(CandleChange, MAlen)
plot(MAout, color=color.black, display=display.none)

InnerBand = input(1.0, minval=0.5, maxval=5, title="Inner Band")
OuterBand = input(2.00, minval=0.5, maxval=10, title="Outer Band")
devInner = InnerBand * stdev(CandleChange, MAlen)
devOuter = OuterBand * stdev(CandleChange, MAlen)

upper1 = MAout + devInner
lower1 = MAout - devInner
b1 = plot(upper1, "Upper Inner", color=color.gray)
b2 = plot(lower1, "Lower Inner", color=color.gray)
upper2 = MAout + devOuter
lower2 = MAout - devOuter
b3 = plot(upper2, "Upper Outer", color=color.gray)
b4 = plot(lower2, "Lower Outer", color=color.gray)
fill(b1, b3, color.rgb(250,145,175,70), title="Background")
fill(b2, b4, color.rgb(250,145,175,70), title="Background")

band1 = hline(25, "Upper Band", color=color.gray, linestyle=hline.style_dotted, linewidth=2)
band0 = hline(-25, "Lower Band", color=color.gray, linestyle=hline.style_dotted, linewidth=2)

//LONG FILTER
VolFilterL = CandleChange <= lower1 and CandleChange > lower2
SMAFilterL = close[1] > sma(close[1], 50)
PriceFilterL = close > lowest(close,7)
LongFilter = VolFilterL and SMAFilterL and PriceFilterL
bgcolor(LongFilter ? color.new(color.green, 80) : na)

//SHORT FILTER
VolFilterS = CandleChange >= upper1 and CandleChange < upper2
SMAFilterS = close[1] < sma(close[1], 50)
PriceFilterS = close < highest(close,7)
ShortFilter = VolFilterS and SMAFilterS and PriceFilterS
bgcolor(ShortFilter ? color.new(color.red, 80) : na)

//SETTING BACK TEST INPUTS
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2000, title = "From Year", minval = 1970)
 
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2100, title = "To Year", minval = 1970)

startDate = timestamp("America/New_York", fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp("America/New_York", toYear, toMonth, toDay, 00, 00)
time_condition = time >= startDate and time <= finishDate

//ORDER DETAILS
Risk = (high[7] - low[7])/ 7
Profit = Risk*1.15
Loss = Risk*0.65

AlertMSG = "New stategy position" + tostring(strategy.position_size)

if (time_condition) 
    strategy.entry("Long", strategy.long, when = LongFilter, alert_message=AlertMSG)
    if (LongFilter)
        LongStop = strategy.position_avg_price - Loss
        LongProfit = strategy.position_avg_price + Profit 
        strategy.exit("TP/SL", "Long", stop=LongStop, limit=LongProfit)

if (time_condition)
    strategy.entry("Short", strategy.short, when = ShortFilter, alert_message=AlertMSG)
    if (ShortFilter)
        ShortStop = strategy.position_avg_price + Loss
        ShortProfit = strategy.position_avg_price - Profit 
        strategy.exit("TP/SL", "Short", stop=ShortStop, limit=ShortProfit)



```

> Detail

https://www.fmz.com/strategy/429086

> Last Modified

2023-10-12 17:38:39
