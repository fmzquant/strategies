
> Name

多因子策略Multi-factor-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/164c21161949a972a7a.png)

[trans]

## 概述

多因子策略融合了震荡型策略、趋势跟踪策略和突破型策略三种不同类型的策略,通过组合使用来获取更好的策略效果。

## 策略原理

多因子策略主要基于以下几方面进行建模:

- 震荡策略部分采用随机指标来判断买入和卖出时机。具体来说,当随机指标%K线从超卖区上穿%D线时产生买入信号;当%K线从超买区下穿%D线时产生卖出信号。

- 趋势策略部分采用SMA均线的黄金交叉来判断趋势方向。当快线从下方上穿慢线时产生买入信号;当快线从上方下穿慢线时产生卖出信号。

- 突破策略部分监测价格是否突破指定周期内的最高价或最低价。当价格超过最高价时买入;当价格低于最低价时卖出。 

- 结合ADX指标来判断趋势力度,只有在趋势足够强劲时才参与趋势交易。

- 建立止损线和止盈线,设定合理的止损止盈比例。

综合这几个部分,多因子策略主要遵循以下逻辑:

1. 当ADX大于设定阈值时,认为趋势足够强劲,这时开始执行趋势策略;当ADX小于阈值时,认为处于盘整,这时仅执行震荡策略。

2. 在趋势行情中,当SMA快慢线黄金交叉时买入开仓,死叉时平仓。

3. 在震荡行情中,执行随机指标的交易信号。

4. 突破型策略在两种市场环境下都适用,用于追踪劲道。

5. 设置止损止盈线优化获利。

## 优势分析

多因子策略最大的优势在于结合不同类型策略的优点,在两种市场环境中都可以获得较好的策略效果。具体来说,主要具有以下优势:

1. 能够顺应趋势,在趋势行情中获得较高的胜率。

2. 能够在震荡行情中获利,不会被困在持仓中。

3. 具有较高的盈利因子,止盈止损设置合理。

4. 考虑了趋势力度,能减少亏损。

5. 结合多个指标,可以形成较强的交易信号。

6. 可以通过参数优化获得较优的参数组合。

## 风险分析

多因子策略也存在一定的风险,主要包括:

1. 多因子组合不当可能会造成交易信号混乱,需要反复测试找到最佳因子组合。

2. 需要优化多个参数,优化难度较大,需要足够的历史数据支持。

3. 在趋势反转时,无法及时平仓止损,可能带来较大亏损。

4. ADX指标存在滞后,可能错过趋势转折点。

5. 突破交易容易被套,需要设置合理的止损策略。

针对以上风险,可以从以下几点进行优化:

1. 测试不同因子在历史数据中的稳定性,选取稳定因子。

2. 采用遗传算法等智能优化方法寻找最优参数。

3. 设置合理的止损线,以控制最大回撤。

4. 结合附加指标判断趋势反转。

5. 优化突破交易的止损策略,避免过大亏损。

## 优化方向 

多因子策略还具有进一步优化的空间:

1. 测试更多类型的因子,寻找更好的组合。可以考虑波动率、成交量等其他因子。

2.采用机器学习方法寻找最优策略权重。

3.参数优化可以采用智能算法,快速寻优。

4.可以测试不同持仓时间下的收益情况。

5.可以考虑动态调整止损线。如盈利后可适当放宽止损范围。

6.可以引入更多过滤条件,如成交量突增等,提高信号质量。

7.ADX指标可以考虑优化参数或替换为更先进的趋势判断指标。

## 总结

多因子策略综合考虑了趋势、震荡、突破等多种交易逻辑,在两种市场环境下都能获得较优秀的效果。相比单一策略,多因子策略可以获得更高的稳定收益,具有良好的升级扩展空间。但需要注意参数优化难度较大,需要足够的历史数据支持优化过程。总体来说,多因子策略是一种非常有效的算法交易方法,值得进一步研究优化。

||

## Overview

The multi-factor strategy integrates oscillating, trend-following, and breakout strategies into one by combining their strengths. This allows obtaining better performance across different market conditions.

## Strategy Logic

The multi-factor strategy is mainly modeled based on the following aspects:

- The oscillating part uses the Stochastic oscillator to identify buy and sell signals. Specifically, a buy signal is generated when the %K line crosses over the %D line from the oversold zone. A sell signal is generated when the %K line crosses below the %D line from the overbought zone.

- The trend-following part uses the golden cross of SMAs to determine the trend direction. A buy signal is generated when the fast SMA crosses above the slow SMA. A sell signal is generated when the fast SMA crosses below the slow SMA. 

- The breakout part monitors if the price breaks out above the highest price or breaks down below the lowest price in a specified period. It will trigger a buy when the price breaks out above the highest price, and a sell when the price breaks down below the lowest price.

- The ADX indicator is used to measure the trend strength. Trend trading signals are only generated when the trend is strong enough.

- Stop loss and take profit lines are implemented to optimize profitability.

In summary, the multi-factor strategy follows the logic below:

1. When ADX is above a threshold, the trend is considered strong. The trend-following strategy takes effect. When ADX is below the threshold, the market is ranging. Only the oscillating strategy takes effect.

2. In a trending market, the SMA golden cross triggers a long entry and the death cross triggers exiting positions. 

3. In a ranging market, trading signals from the Stochastic oscillator are followed.

4. The breakout strategy applies in both market conditions to follow strong momentum. 

5. Stop loss and take profit lines are set to lock in profits and limit losses.

## Advantage Analysis

The biggest advantage of the multi-factor strategy is that it combines the strengths of different strategies and achieves good performance in both trending and ranging markets. The main advantages are:

1. It rides trends well and achieves high winning rates in trending markets.

2. It can profit from range-bound markets and avoids being stuck in positions.

3. It has high profit factors with properly set stop loss and take profit. 

4. It considers trend strength to reduce losses from false signals.

5. The combination of multiple indicators leads to strong trading signals. 

6. The parameters can be optimized for better performance.

## Risk Analysis

There are also risks associated with the multi-factor strategy:

1. Improper combination of factors may lead to conflicting trading signals. Extensive testing is required to find the optimal combination.

2. Multiple parameters increase the difficulty of optimization and require sufficient historical data.

3. It may fail to exit positions in time when the trend reverses, leading to large losses. 

4. The ADX indicator has lagging effects and may miss trend turning points.

5. Breakout trading is prone to getting trapped in losing positions. Reasonable stop loss is required.

The risks can be mitigated through:

1. Backtesting factor stability and picking stable ones.

2. Using heuristic optimization algorithms to find the optimal parameters. 

3. Setting proper stop loss to control maximum drawdown.

4. Incorporating additional indicators to detect trend reversal.

5. Optimizing the stop loss rules for breakout trading.

## Improvement Directions

There is still room for improving the multi-factor strategy:

1. Testing more factor types like volatility, volume etc. to find better combinations.

2. Using machine learning techniques to optimize factor weights dynamically.

3. Leveraging heuristic algorithms for fast parameter optimization.

4. Testing profitability under different holding periods.

5. Exploring dynamic stop loss rules. For example, widening stop loss after making some profits.

6. Adding more filters like volume spikes to improve signal quality. 

7. Optimizing ADX parameters or using more advanced trend detection indicators.

## Conclusion

The multi-factor strategy combines multiple trading logics like trend, mean-reversion, and breakout. It achieves good performance in both trending and ranging markets. Compared to single-factor strategies, it provides more stable returns and has great potential for upgrades. However, the parameter optimization could be difficult and requires sufficient historical data. Overall, the multi-factor strategy is a very effective algorithmic trading technique worth further research and optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2017|From Year|
|v_input_4|true|To Month|
|v_input_5|true|To Day|
|v_input_6|9999|To Year|
|v_input_7|false|Oscillating Strategy|
|v_input_8|true|Trend Strategy|
|v_input_9|false|Breakout Strategy|
|v_input_10|0|Trade Strategy: Long|Short|Long & Short|
|v_input_11|2|Stop Loss %|
|v_input_12|4|Take Profit %|
|v_input_13|8|FastMA length|
|v_input_14|21|SlowMA length|
|v_input_15|10|ADX length|
|v_input_16|30|ADX Tr|
|v_input_17|10|From|
|v_input_18|14|To|
|v_input_19_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-30 00:00:00
end: 2023-10-30 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

// strategy("Strategy_1", shorttitle="Strategy1",overlay=true ,pyramiding = 12, initial_capital=25000, currency='EUR', commission_type = strategy.commission.cash_per_order, commission_value = 3, default_qty_type = strategy.percent_of_equity, default_qty_value = 20)
	
// Revision:        1
// Author:          Jonas

// === INPUT ===
    //   > BACKTEST RANGE <
FromMonth = input(defval=1, title="From Month", minval=1, maxval=12)
FromDay = input(defval=1, title="From Day", minval=1, maxval=31)
FromYear = input(defval=2017, title="From Year", minval=2010)
ToMonth = input(defval=1, title="To Month", minval=1, maxval=12)
ToDay = input(defval=1, title="To Day", minval=1, maxval=31)
ToYear = input(defval=9999, title="To Year", minval=2010)

    //   > STRATEGY SETTINGS <
bolOS = input(defval = false, type=input.bool, title="Oscillating Strategy")
bolTS = input(defval = true, type=input.bool, title="Trend Strategy")
bolBO = input(defval = false, type=input.bool, title="Breakout Strategy")

strStrategy = input(defval = "Long", type=input.string, title="Trade Strategy",options = ["Long", "Short","Long & Short"])

flStopLoss = input(defval = 2.0, title="Stop Loss %", type=input.float)/100
flTakeProfit = input(defval = 4.0, title="Take Profit %", type=input.float)/100

    //   > SMA <

fastMA = input(defval=8, type=input.integer, title="FastMA length", minval=1, step=1)
slowMA = input(defval=21, type=input.integer, title="SlowMA length", minval=1, step=1)

    //  > ADX <
adx_len = input(defval=10, type=input.integer, title="ADX length", minval=1, step=1)
adx_trend = input(defval=30, type=input.integer, title="ADX Tr", minval=1, step=1)
adx_choppy = adx_trend
adx_limit = adx_trend

    //  > TRENDSCORE <
ts_fromIndex = input(title="From", type=input.integer, minval=1, defval=10)
ts_toIndex = input(title="To", type=input.integer, minval=1, defval=14)
ts_src = input(title="Source", type=input.source, defval=close)

    // > Oscillator <
stoch_length = 14
stoch_OverBought = 75
stoch_OverSold = 25
stoch_smoothK = 3
stoch_smoothD = 3

// === BACK TEST RANGE FUNCTION ===
window_start = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
window_finish = timestamp(ToYear, ToMonth, ToDay, 23, 59)  // backtest finish window
window() =>  // create function "within window of time"
    time >= window_start and time <= window_finish ? true : false

//plot(stop_level_Long, title="TEST",color=color.red, style=plot.style_linebr, linewidth=2)
//plot(take_level_Long, color=color.green, style=plot.style_linebr, linewidth=2)

// === ADX ===
adx_up = change(high)
adx_down = -change(low)
adx_trur = rma(tr, adx_len)
adx_plus = fixnan(100 * rma(adx_up > adx_down and adx_up > 0 ? adx_up : 0, adx_len) / adx_trur)
adx_minus = fixnan(100 * rma(adx_down > adx_up and adx_down > 0 ? adx_down : 0, adx_len) / adx_trur)
adx_sum = adx_plus + adx_minus

ADX = 100 * rma(abs(adx_plus - adx_minus) / (adx_sum == 0 ? 1 : adx_sum), adx_len)

//=== TRENDSCORE ===
trendscore(ts_src, ts_fromIndex, ts_toIndex) =>
	ts_sum = 0.0
	for i = ts_fromIndex to ts_toIndex
        ts_sum := ts_sum + (ts_src >= nz(ts_src[i]) ? 1 : -1)
    ts_sum

intTS = trendscore(ts_src, ts_fromIndex, ts_toIndex)
// Long if  TrendDirection = 1, Short if TrendDirection = -1; Indifferent if TrendDirection = 0
intTrendDirection = (intTS > (ts_toIndex-ts_fromIndex)) ? 1 : (intTS < (ts_fromIndex-ts_toIndex)) ? -1 : 0

    //  > TREND CONDITION <
adx_growing = ADX > highest(ADX[1],3)
intTrend = ((ADX >= adx_limit) and (ADX[1] >= adx_limit) and adx_growing) ? intTrendDirection : 0

// === ATR ===
ATR = sma(tr,10)
ATR_100 = ATR /abs(high - low)


// === STOCHASTICS ===

stoch_k = sma(stoch(close, high, low, stoch_length), stoch_smoothK)
stoch_d = sma(stoch_k, stoch_smoothD)

// === FILTER & CONDITIONS ===
    //  > STOCHASTICS <
bolFilter_OS1 = close[1] > hl2[1]



bolSigOsc_long_1 = (na(stoch_k) or na(stoch_d)) ? false : (crossover(stoch_d,stoch_OverSold) and stoch_k > stoch_d) ? true:false
bolSigOsc_short_1 = (na(stoch_k) or na(stoch_d)) ? false : (crossunder(stoch_d,stoch_OverBought) and stoch_k < stoch_d) ? true:false

bolLongOpenOS = bolSigOsc_long_1 and bolFilter_OS1
bolLongCloseOS = bolSigOsc_short_1

bolShortOpenOS = bolSigOsc_short_1 and bolFilter_OS1
bolShortCloseOS = bolSigOsc_long_1

    //  > TREND <

bolFilter_TS1 = close[1] > hl2[1] and open[1] < hl2[1]
bolFilter_TS2 = sma(close,50)>sma(close,50)[10]
bolFilter_TS3 = close[1] < hl2[1] and open[1] > hl2[1]

bolSigTrendLO1 = sma(close, fastMA) > sma(close, slowMA)
bolSigTrendLO2 = close > sma(close,fastMA)
bolSigTrendLO3 = bolSigTrendLO1 and bolSigTrendLO2

bolSigTrendLC1 = sma(close, fastMA) < sma(close, slowMA)
bolSigTrendLC2 = close < sma(close, fastMA)
bolSigTrendLC3 = bolSigTrendLC1 and bolSigTrendLC2

bolSigTrendSO1 = bolSigTrendLC3
bolSigTrendSC1 = bolSigTrendLO1

bolLongOpenTS = bolSigTrendLO3 and bolFilter_TS1
bolLongCloseTS = bolSigTrendLC3 and bolFilter_TS3

bolShortOpenTS = bolSigTrendSO1 and bolFilter_TS3
bolShortCloseTS = bolLongOpenTS and bolFilter_TS1

plot(sma(close, fastMA), title='FastMA', color=color.green, linewidth=2, style=plot.style_line)  // plot FastMA
plot(sma(close, slowMA), title='SlowMA', color=color.red, linewidth=2, style=plot.style_line)  // plot SlowMA



    //  > BREAKOUT <
flFilter_BS1 = 0.5 * stdev(close,slowMA)[1]
bolFilter_BS2 = volume > sma(volume,slowMA)*1.25

bolSigBreakoutLO1 = close > (highestbars(high,slowMA)[1] + flFilter_BS1)
bolSigBreakoutLC1 = barssince(bolSigBreakoutLO1)==5

bolSigBreakoutSO1 = close < lowestbars(low,slowMA)[1] - flFilter_BS1
bolSigBreakoutSC1 = barssince(bolSigBreakoutSO1)==5


bolLongOpenBO = bolSigBreakoutLO1 and bolFilter_BS2
bolLongCloseBO = bolSigBreakoutLC1

bolShortOpenBO = bolSigBreakoutSO1 and bolFilter_BS2
bolShortCloseBO = bolSigBreakoutSC1

//=== STRATEGIES ENTRIES & EXITS ===
    //  > STOPS & LIMITS <
stop_level_Long = strategy.position_avg_price * (1 - flStopLoss)
take_level_Long = strategy.position_avg_price * (1 + flTakeProfit)
stop_level_Short = strategy.position_avg_price * (1 + flStopLoss)
take_level_Short = strategy.position_avg_price * (1 - flTakeProfit)

    //  > ENTRIES / CLOSES / EXITS <
if window() //only in backtest-window
    if (bolOS == true)
        if (intTrend == 0)
            if(strStrategy == "Long" or strStrategy == "Long & Short")
                strategy.entry("Lng Osc", strategy.long, when=bolLongOpenOS)  // buy long when "within window of time" AND crossover
            if(strStrategy == "Short" or strStrategy == "Long & Short")
                strategy.entry("Short Osc", strategy.short, when=bolShortOpenOS)
        strategy.close("Lng Osc", when=(bolLongCloseOS))
        //strategy.exit("Exit L OS/STD", "Lng Osc", stop = strategy.position_avg_price - 2*stdev(close,10))
        strategy.exit("Exit L OS/%", "Lng Osc", stop=stop_level_Long)
        strategy.close("Short Osc", when=(bolShortCloseOS))
        //strategy.exit("Exit S OS/STD", "Short Osc", stop = strategy.position_avg_price + 2*stdev(strategy.position_avg_price,10))
        strategy.exit("Exit S OS/%", "Short Osc", stop=stop_level_Short)
    if (bolTS == true)
        if (not(intTrend == 0))
            if((strStrategy == "Long") or (strStrategy == "Long & Short"))
                strategy.entry("Lng TD", strategy.long, when=bolLongOpenTS)  // buy long when "within window of time" AND crossover
            if((strStrategy == "Short") or (strStrategy == "Long & Short"))
                strategy.entry("Short TD", strategy.short, when=(bolShortOpenTS and bolTS))  // buy long when "within window of time" AND crossover
        strategy.exit("Exit L TD", "Lng TD", stop=stop_level_Long)
        strategy.close("Lng TD", when=bolLongCloseTS)
        strategy.exit("Exit S TD", "Short TD", stop=stop_level_Short)
        strategy.close("Short TD", when=bolShortCloseTS)
    if (bolBO == true)
        if((strStrategy == "Long") or (strStrategy == "Long & Short"))
            strategy.entry("Lng BO", strategy.long, when=bolLongOpenBO)  // buy long when "within window of time" AND crossover
            strategy.close("Lng BO", when=bolLongCloseBO)
            //strategy.exit("Exit L BO/STD", "Lng BO", stop = strategy.position_avg_price - 2*stdev(strategy.position_avg_price,10))
            strategy.exit("Exit L BO/2.5%", "Lng BO", stop=stop_level_Long)
        if((strStrategy == "Short") or (strStrategy == "Long & Short"))
            strategy.entry("Short BO", strategy.short, when=bolShortOpenBO)  // buy long when "within window of time" AND crossover
            strategy.close("Short BO", when=bolShortCloseBO)
            //strategy.exit("Exit S BO/STD", "Short BO", stop = strategy.position_avg_price - 2*stdev(strategy.position_avg_price,10))
            strategy.exit("Exit S BO/%", "Short BO", stop=stop_level_Short)



```

> Detail

https://www.fmz.com/strategy/430677

> Last Modified

2023-10-31 15:45:39
