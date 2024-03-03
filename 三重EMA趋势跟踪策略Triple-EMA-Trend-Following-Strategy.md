
> Name

三重EMA趋势跟踪策略Triple-EMA-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ad2a76dbea2ff35e5b.png)

[trans]

## 概述

三重EMA趋势跟踪策略是一个非常适合跟踪市场趋势的策略。它使用三条不同周期的EMA作为建仓信号,在出现充分趋势确认时建立多头或空头仓位。

该策略的优势在于它可以减少假信号,确保趋势的力度充分后再入场。同时,它带有自适应止损系统,可以根据市场波动性来尾随止损,从而达到较好的风险管理效果。

## 策略原理

### 建仓逻辑

该策略使用7、14和21周期三条EMA作为建仓信号指标。具体逻辑是,当价格同时上穿这三条EMA时,做多;当价格同时下穿这三条EMA时,做空。

这样的设计可以减少假信号,确保趋势足够明确后再入场。同时,三条EMA周期设置得当,可以及时捕捉市场趋势的发生。

### 止损方式

该策略使用了一个基于ATR和最大回撤的自适应止损系统。它会实时计算价格波动率,并据此来设置止损线。具体做法是,计算ATR的一定倍数作为止损缓冲区。

在上涨过程中,止损线会随着新高上移,具有较好的追涨效果。当价格回落到缓冲区低点时,止损线会激活,平仓止损。这可以根据具体市况来控制止损风险。

### 获利方式

该策略使用了一个固定比例的止盈方式。开仓后,会设置一个比入场价高一定比例的止盈线。当价格涨至止盈线处时,就会主动平仓处利。

这个固定比例止盈的好处是可以预设目标利润,在达到后满足退出。同时也避免价格再次回落带来的风险。止盈比例可以根据需要进行调整。

## 优势分析

- 可以减少假信号,确保建仓后存在较强的价格趋势
- 利用EMA周期叠加,可以快速捕捉市场趋势
- 自适应止损系统,可以根据波动率控制风险 
- 固定止盈比例,满足盈利目标后退出
- 基于ATR和最大回撤计算的止损方式,可以根据市场情况优化
- 易于通过改变参数来调整策略风格

## 风险分析

- 在震荡行情中,EMA可能产生频繁交叉,容易被套
- 固定止盈无法根据市场情况做出调整,可能错失更大利润或增加损失
- 停止追踪止损后,无法再次追踪更高点,价格再次下跌可能增加损失
- 在单边突破性行情中,固定止盈比例可能过于保守,未能获得足够收益

可以通过结合趋势判断指标,避免在震荡行情中盲目建仓;也可以使用移动止盈或盈亏比等方式,使止盈方式更加灵活。总体而言,仍需要人工判断来配合策略运用。

## 优化方向

该策略还可以从以下几个方面进行优化:

1. 利用更多指标判断入场时机,如MACD,KD等,避免在震荡行情中被套。

2. 尝试移动止盈,或者盈亏比止盈的方式,使止盈方式更加灵活。

3. 在止损方式中加入向下追踪机制,在价格再次下跌时能够再次追踪较低点,从而控制风险。 

4. 根据不同品种特点,调整EMA周期参数,优化对趋势的判断。

5. 添加仓位管理模块,可以根据资金使用比例来调整单笔仓位。

## 总结

三重EMA趋势跟踪策略是一个非常实用的趋势跟踪策略。它具有较强的趋势判断能力,同时带有自适应的止盈止损机制,可以自动管理订单。从优化角度来看,止盈和止损系统可以进行进一步完善,使其能够根据实时市场情况进行调整。但总的来说,该策略是一个易于实施且风险可控的选择。

||

## Overview

The Triple EMA Trend Following Strategy is a strategy very suitable for following market trends. It uses three EMAs of different periods as trading signals to establish long or short positions when there is sufficient trend confirmation.  

The advantage of this strategy is that it can reduce false signals and ensure sufficient trend strength before entering a position. At the same time, it has an adaptive stop loss system that can trail stop based on market volatility, thus achieving better risk management.

## Strategy Logic  

### Entry Logic

The strategy uses 7-, 14- and 21-period EMAs as entry signal indicators. The specific logic is when the price crosses above all three EMAs at the same time, go long; when the price crosses below all three EMAs at the same time, go short.  

This design can reduce false signals and ensure the trend is clear enough before entering. Also, the three EMA periods are set appropriately to capture market trends in a timely manner.  

### Stop Loss Method  

The strategy uses an adaptive stop loss system based on ATR and maximum drawdown. It calculates price volatility in real time and sets stop loss lines accordingly. Specifically, it calculates a certain multiple of ATR as the stop loss buffer zone.
  
During an uptrend, the stop loss line will move up with new highs, with good chasing effect. When the price falls back to the low point of the buffer zone, the stop loss line will be triggered to close positions. This can control stop loss risk according to market conditions.

### Profit Taking Method

The strategy uses a fixed percentage take profit method. After opening a position, a take profit line will be set at a certain percentage above the entry price. When the price rises to the take profit line, the position will be closed to take profits.

The benefit of this fixed percentage take profit is that it allows presetting a target profit level that will satisfy exiting once reached. It also avoids the risk of prices falling back again. The take profit percentage can be adjusted as needed.

## Advantage Analysis  

- Can reduce false signals and ensure a relatively strong price trend after opening positions 
- Use overlay of EMA periods to quickly capture market trends
- Adaptive stop loss system can control risk based on volatility  
- Fixed take profit percentage satisfies profit target before exiting 
- Stop loss method based on ATR and maximum drawdown can optimize based on market conditions
- Easy to adjust strategy style by changing parameters

## Risk Analysis   

- In ranging markets, EMAs may produce frequent crosses, easily being trapped
- Fixed take profit cannot adjust based on market conditions, may miss greater profits or increase losses
- After stop tracking stop loss, unable to track new highs again, price drops may increase losses
- In one-sided explosive trends, fixed take profit percentage may be too conservative, fail to obtain enough profits  

Can avoid blindly opening positions in volatile markets by combining with trend judgment indicators; can also use moving take profit or profit ratio methods to make take profit methods more flexible. In general, manual judgment is still needed to cooperate with strategy application.

## Optimization Directions  

The strategy can also be optimized in the following aspects:  

1. Use more indicators to determine entry timing, such as MACD, KD etc, avoid being trapped in volatile markets.

2. Try moving take profit, or profit ratio take profit methods, to make take profit methods more flexible. 

3. Add downward trailing mechanism to stop loss method, allowing tracking lower points again when price drops again, thereby controlling risk.  

4. Adjust EMA period parameters based on characteristics of different products, optimizing trend judgment.  

5. Add position sizing module, can adjust per trade size based on usage ratio of funds.

## Conclusion  

The Triple EMA Trend Following Strategy is a very practical trend following strategy. It has strong trend judgment capabilities, while also having adaptive take profit and stop loss mechanisms that can automatically manage orders. From the optimization perspective, the take profit and stop loss systems can be further improved to adjust based on real-time market conditions. But overall, this strategy is an easy to implement and controllable risk choice.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2020|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|7|v_input_8|
|v_input_9|12|v_input_9|
|v_input_10|21|v_input_10|
|v_input_11|4|v_input_11|
|v_input_12|20|Length|
|v_input_13_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_14|3|Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-06-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(shorttitle='Three EMAs Trend-following Strategy',title='Three EMAs Trend-following Strategy (by Coinrule)', overlay=true, initial_capital = 1000, process_orders_on_close=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type=strategy.commission.percent, commission_value=0.1)


//Backtest dates
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2020, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2112, title = "Thru Year",       type = input.integer, minval = 1970)

showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false       // create function "within window of time"

ema_1 = ema(close, input(7))
ema_2 = ema(close, input(12))
ema_3 = ema(close, input(21))

Take_profit= ((input (4))/100)

longTakeProfit = strategy.position_avg_price * (1 + Take_profit)


length = input(20, "Length", minval = 2)
src = input(close, "Source")
factor = input(3.0, "Multiplier", minval = 0.25, step = 0.25)
volStop(src, atrlen, atrfactor) =>
    var max     = src
    var min     = src
    var uptrend = true
    var stop    = 0.0
    atrM        = nz(atr(atrlen) * atrfactor, tr)
    max         := max(max, src)
    min         := min(min, src)
    stop        := nz(uptrend ? max(stop, max - atrM) : min(stop, min + atrM), src)
    uptrend     := src - stop >= 0.0
    if uptrend != nz(uptrend[1], true)
        max    := src
        min    := src
        stop   := uptrend ? max - atrM : min + atrM
    [stop, uptrend]

[vStop, uptrend] = volStop(src, length, factor)

go_long = crossover(close, ema_1) and crossover(close, ema_2) and crossover(close, ema_3)



closeLong = close > longTakeProfit or crossunder(close, vStop)



//Entry 
strategy.entry(id="long", long = true, when = go_long and window())



//Exit
strategy.close("long", when = closeLong and window())

plot(vStop,"Vstop", color.black, linewidth=2)
plot(ema_1,"EMA Short", color.green, linewidth=1)
plot(ema_2,"EMA Mid", color.purple, linewidth=1)
plot(ema_3,"EMA Long", color.red, linewidth=1)


```

> Detail

https://www.fmz.com/strategy/435972

> Last Modified

2023-12-20 15:00:44
