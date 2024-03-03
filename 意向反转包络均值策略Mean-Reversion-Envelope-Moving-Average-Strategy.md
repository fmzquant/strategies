
> Name

意向反转包络均值策略Mean-Reversion-Envelope-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1190231432d25590fef.png)
[trans]

## 概述

意向反转包络均值策略是一种基于移动均线的意向反转交易策略。该策略使用双指数移动均线作为基础计算,并在其上下各添加多个包络带。当价格触碰包络带时,根据方向开仓做多或做空。当价格回归到均线时,平仓退出。

## 策略原理

该策略使用双指数移动均线(DEMA)作为基础指标。双指数移动均线是一种对价格变化灵敏度较高的移动均线。在其基础上,策略分别在上下两侧添加多个价格带,构成一个均线包络区。包络区的范围由用户设定,每条价格带之间按照一定百分比间隔。

当价格上涨逼近上边包络带时,该策略会开仓做空;当价格下跌触碰下边包络带时,该策略会开仓做多。每碰触一条新的价格带带就会加仓一次。当价格回归移动均线附近时,策略会平仓所有头寸。

该策略通过包络区捕捉价格过激波动,并在反转来临时获利退出,实现低买高卖的交易目标。它适用于有明显均值回归特征的市场周期,如比特币等数字货币。


## 策略优势

- 使用双指数移动均线,对短期价格变化较为敏感,可以快速捕捉趋势转折。
- 均线附近设立包络区,可以更准确地捕捉价格反转。
- 分批开仓加仓,充分利用资金效率。
- 获利后快速切换方向,灵活应对市场变化。
- 可以通过调整参数自由优化。

## 策略风险 

- 大幅度行情无法获利切换方向。
- 参数设置不当可能导致过于频繁交易。
- 需要相对稳定的行情,不适用于大幅震荡的市场。
- 包络区范围太小,可能出现无法开仓的情况。

可以通过适当放宽包络区范围,增加触发价格变化的敏感性来降低风险。同时调整移动均线长度参数,适应不同周期行情。

## 策略优化方向

该策略可以从以下几个方面进行优化:

1. 优化移动均线算法。可以测试不同类型的移动均线指标效果。

2. 调整均线长度参数。缩短周期可以提高对短期价格变化的捕捉,但也可能增加噪声交易。

3. 优化包络区参数。可以测试不同百分比设置,找到最优参数组合。

4. 增加止损策略。设定移动止损或回撤止损,可以有效控制单笔损失。

5. 增加过滤条件。结合其他指标信号,避免非理性行情下无效开仓。


## 总结

意向反转包络均值策略通过构建均线价格通道,有效捕捉价格反转机会。它可以灵活调整参数,适用于不同市场环境。该策略transaction成本较低,回报率较高,是一种值得推荐的量化交易策略。

||

## Overview

The Mean Reversion Envelope Moving Average Strategy is a mean reversion trading strategy based on moving averages. It uses Double Exponential Moving Average (DEMA) as the base calculation and adds several envelopes above and below it. When the price touches the envelope bands, it opens long or short positions based on the direction. When the price regresses to the moving average, it closes all positions.

## Strategy Logic

The strategy uses Double Exponential Moving Average (DEMA) as the base indicator, which is a moving average that is more sensitive to recent price changes. Above and below the DEMA, several price bands are added to form an envelope zone. The range of the envelope is set by the user, with a fixed percentage interval between each band.

When the price rises and approaches the upper envelope band, the strategy opens a short position. When the price falls and hits the lower envelope band, it opens a long position. It adds a new position each time when a new price band is touched. When the price regresses close to the moving average, all positions are closed.  

Through capturing excessive price fluctuations with the envelope bands and profiting from reversals, the strategy aims to buy low and sell high. It fits market cycles with obvious mean reversion tendencies, such as cryptocurrencies like Bitcoin.

## Advantages

- Uses Double Exponential Moving Average, which is sensitive to short-term price changes for catching trend reversals.
- The envelope bands around moving average can accurately capture price reversals. 
- Opens positions in batches, fully utilizing capital efficiency.
- Quickly switch directions after profiting to adapt to market changes.
- Parameters can be freely optimized.

## Risks

- Unable to profit from strongly trending markets.
- Improper parameters may cause over-trading.
- Needs relatively stable markets, not suitable for highly volatile environments. 
- Too narrow envelopes may prevent entering positions.

The risks can be reduced by appropriately expanding the envelope range to increase sensitivity and adjusting the moving average length to fit different market cycles.

## Optimization Directions 

The strategy can be optimized in the following aspects:

1. Test different moving average algorithms.

2. Adjust the moving average length parameter for better adapting to short-term fluctuations.

3. Optimize the envelope parameters by testing different percentage settings.

4. Add stop loss methods like trailing stop loss to limit single trade loss.

5. Add filtering conditions with other indicators to avoid invalid entries in irrational markets.


## Conclusion

The Mean Reversion Envelope Moving Average Strategy effectively captures mean reversion opportunities by building a price channel around the moving average. It can be flexibly adapted to different market environments through parameter adjustments. With relatively low transaction costs and high returns, this is a recommended quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|(?Moving Average)Moving Average Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|5|Moving Average Window|
|v_input_string_1|0|Moving Average Type: 4. DEMA|2. EMA|3. RMA|1. SMA|
|v_input_float_1|0.05|(?Envelope)Delta Per Enveloppe|
|v_input_int_2|0|Envelope count: 5|2|3|4|1|
|v_input_bool_1|true|(?Orders)Use Long Orders ?|
|v_input_bool_2|false|Use Short Orders ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-27 00:00:00
end: 2023-12-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Mean Reversion - Envelope Strategy", overlay=true )

// ----------------------- DESCRIPTION -----------------------
// THIS SCRIPT IS A MEAN REVERSION SYSTEM THAT USES A MOVING AVERAGE AS BASE CALCULATION AND A % OF THIS MOVING AVERAGE TO CALCULATE THE ENVELOPE
// BY DEFAULT, THE SYSTEM WILL PLACE LONG ORDERS ON THE MOVING AVERAGE -5% PER ENVELOPE COUNT (5%, 10% AND SO ON...)
// YOU CAN ENABLE THE SHORT ORDERS THAT WILL FOLLOW THE SAME LOGIC ON THE OPPOSITE SIDE
// THE SYSTEM WILL CLOSE EVERY ONGOING TRADE WHEN THE PRICE RETURNS TO THE MEAN

// ---------------------------------------------
// ---------------- SETTINGS -------------------
src = input(close, "Moving Average Source", group = "Moving Average")
ma_window = input.int(5, "Moving Average Window", step = 1, group = "Moving Average")
ma_type = input.string('4. DEMA', "Moving Average Type", options=['1. SMA', '2. EMA', '3. RMA', '4. DEMA'], group = "Moving Average")
enveloppe_step = input.float(0.05, "Delta Per Enveloppe", step = 0.01, group = "Envelope")
envelope_count = input.int(5, "Envelope count", options = [1, 2, 3, 4, 5], group = "Envelope")
use_longs = input.bool(true, 'Use Long Orders ?', group = "Orders") 
use_short = input.bool(false, 'Use Short Orders ?', group = "Orders")


// ---------------------------------------------
// -------------- INDICATORS -------------------
ma_funct() =>
    if(ma_type == '1. SMA') 
        ta.sma(src, ma_window)
    if(ma_type == '2. EMA') 
        ta.ema(src, ma_window)
    if(ma_type == '3. RMA') 
        ta.rma(src, ma_window)
    if(ma_type == '4. DEMA') 
        2 * ta.ema(src, ma_window) - ta.ema(ta.ema(src, ma_window), ma_window)

ma_base = ma_funct()

ma_high_1 = envelope_count > 0 ? ma_base * (1 + enveloppe_step) : na
ma_high_2 = envelope_count > 1 ? ma_base * (1 + enveloppe_step * 2) : na
ma_high_3 = envelope_count > 2 ? ma_base * (1 + enveloppe_step * 3) : na
ma_high_4 = envelope_count > 3 ? ma_base * (1 + enveloppe_step * 4) : na
ma_high_5 = envelope_count > 4 ? ma_base * (1 + enveloppe_step * 5) : na

ma_low_1 = envelope_count > 0 ? ma_base * (1 - enveloppe_step) : na
ma_low_2 = envelope_count > 0 ? ma_base * (1 - enveloppe_step * 2) : na
ma_low_3 = envelope_count > 0 ? ma_base * (1 - enveloppe_step * 3) : na
ma_low_4 = envelope_count > 0 ? ma_base * (1 - enveloppe_step * 4) : na
ma_low_5 = envelope_count > 0 ? ma_base * (1 - enveloppe_step * 5) : na


// ---------------------------------------------
// --------------- STRATEGY --------------------
if use_longs
    if envelope_count > 0 and strategy.opentrades < 1
        strategy.entry('long 1', strategy.long, limit=ma_low_1, qty=(strategy.equity / ma_low_1) * (1 / envelope_count))
    if envelope_count > 1 and strategy.opentrades < 2
        strategy.entry('long 2', strategy.long, limit=ma_low_2, qty=(strategy.equity / ma_low_2) * (1 / envelope_count))
    if envelope_count > 2 and strategy.opentrades < 3
        strategy.entry('long 3', strategy.long, limit=ma_low_3, qty=(strategy.equity / ma_low_3) * (1 / envelope_count))
    if envelope_count > 3 and strategy.opentrades < 4
        strategy.entry('long 4', strategy.long, limit=ma_low_4, qty=(strategy.equity / ma_low_4) * (1 / envelope_count))
    if envelope_count > 4 and strategy.opentrades < 5
        strategy.entry('long 5', strategy.long, limit=ma_low_5, qty=(strategy.equity / ma_low_5) * (1 / envelope_count))


if use_short
    if envelope_count > 0 and strategy.opentrades < 1
        strategy.entry('short 1', strategy.short, limit=ma_high_1, qty=(strategy.equity / ma_high_1) * (1 / envelope_count))
    if envelope_count > 1 and strategy.opentrades < 2
        strategy.entry('short 2', strategy.short, limit=ma_high_2, qty=(strategy.equity / ma_high_2) * (1 / envelope_count))
    if envelope_count > 2 and strategy.opentrades < 3
        strategy.entry('short 3', strategy.short, limit=ma_high_3, qty=(strategy.equity / ma_high_3) * (1 / envelope_count))
    if envelope_count > 3 and strategy.opentrades < 4
        strategy.entry('short 4', strategy.short, limit=ma_high_4, qty=(strategy.equity / ma_high_4) * (1 / envelope_count))
    if envelope_count > 4 and strategy.opentrades < 5
        strategy.entry('short 5', strategy.short, limit=ma_high_5, qty=(strategy.equity / ma_high_5) * (1 / envelope_count))

strategy.exit('close', limit=ma_base)


// ---------------------------------------------
// ------------------ PLOT ---------------------
ma_base_plot = plot(ma_base, title = "Base MA", color = color.orange, linewidth = 3, offset = 1)

ma_high_1_plot = plot(ma_high_1, title = "MA high 1", color = color.red, offset = 1)
ma_high_2_plot = plot(ma_high_2, title = "MA high 2", color = color.red, offset = 1)
ma_high_3_plot = plot(ma_high_3, title = "MA high 3", color = color.red, offset = 1)
ma_high_4_plot = plot(ma_high_4, title = "MA high 4", color = color.red, offset = 1)
ma_high_5_plot = plot(ma_high_5, title = "MA high 5", color = color.red, offset = 1)

ma_low_1_plot = plot(ma_low_1, title = "MA low 1", color = color.green, offset = 1)
ma_low_2_plot = plot(ma_low_2, title = "MA low 2", color = color.green, offset = 1)
ma_low_3_plot = plot(ma_low_3, title = "MA low 3", color = color.green, offset = 1)
ma_low_4_plot = plot(ma_low_4, title = "MA low 4", color = color.green, offset = 1)
ma_low_5_plot = plot(ma_low_5, title = "MA low 5", color = color.green, offset = 1)

```

> Detail

https://www.fmz.com/strategy/434190

> Last Modified

2023-12-04 16:12:39
