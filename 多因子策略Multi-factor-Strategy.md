
> Name

多因子策略Multi-factor-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/164c21161949a972a7a.png)


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
