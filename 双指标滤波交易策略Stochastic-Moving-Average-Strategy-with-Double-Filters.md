
> Name

双指标滤波交易策略Stochastic-Moving-Average-Strategy-with-Double-Filters

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15046226cb00ef644e2.png)

### Overview

This is a long-term trading strategy that combines the stochastic oscillator K values and exponential moving averages with double filters. It identifies buying opportunities when stochastic K crosses over D and enters oversold territory. The strategy generates sell signals when prices cross below the moving average and stochastic K is above a threshold, filtering normal throwbacks from trend reversals. Stop loss rules are also implemented.  

### Strategy Logic

The core idea of this strategy is to use stochastic K for timing entry signals, and exponential moving averages for booking profits. Stochastic oscillator is good at detecting overbought/oversold situations, while moving averages define the trend. By combining the two, entries are made at oversold levels, and profits are trailed along the trend using moving averages.

Specifically, this strategy calculates 21-period stochastic K and D values, as well as 38-period EMA. When K crosses above D into the oversold zone (default 25), a buy signal is generated. When prices cross below EMA and stochastic K is higher than the filter threshold (65), trend reversal is assumed and position is closed. A 13% stop loss rule is also implemented. 

With double indicators and double filters, this strategy effectively filters out fake signals. Buying into oversold levels and trailing the uptrend can capture good profits. It is suitable for medium-to-long term holdings.

### Advantage Analysis 

The main advantages of this strategy are:

1. Stochastic K determines good entry points when crossing into oversold territory.  

2. Double filters of K/D cross and price extreme effectively avoid false signals.

3. Trailing take-profits with EMA makes full use of upside momentum.  

4. Stochastic filters normal throwbacks from reversals when booking profits.

5. Suitable for medium-to-long term holdings with good profitability.

### Risk Analysis

Some risks to consider:

1. Systemic risk - bear markets can cause heavy losses.

2. Throwback risk - temporary price pullbacks may prematurely trigger MA stop loss.  

3. Parameter optimization risk - inappropriate parameter tuning affects performance.

4. Black swan risk - technical indicators fail against market shocks.

### Optimization Directions  

Some ways to optimize the strategy:

1. Optimize indicator parameters through rigorous backtesting.  

2. Add other stop loss methods like volatility or trailing stop loss.

3. Incorporate other indicators like volume, Bollinger Bands etc. 

4. Test shorter/longer moving average periods.  

5. Dynamically adjust parameters based on market regimes.

### Conclusion
This is an overall solid trend-following strategy. It uses stochastic to determine entry, moving average to trail exits, and implements double filters to avoid false signals. With ample parameter tuning flexibility, medium-to-long term holding and effectiveness in catching trends, this is an efficient stock trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|21|period|
|v_input_int_2|13|stop loss %|
|v_input_int_3|true|leverage|
|v_input_1|2|n days ago|
|v_input_int_4|65|k filter for throwbacks|
|v_input_int_5|25|Oversold value|
|v_input_int_6|6|k|
|v_input_int_7|4|d|
|v_input_int_8|38|periodo Sma|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-25 00:00:00
end: 2024-02-01 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// English version
strategy(title='Stochastic & MA',  overlay=false)
// INPUTS : all default value have already been optimized
length = input.int(21, 'period', minval=1)
lossp = input.int(13, 'stop loss %', minval=2, step=1)
leverage = input.int(1, 'leverage', minval=1, step=1)
// leverage has been introduced for modifying stop loss levels for financial instruments with leverage, like ETF 
n = input(2, 'n days ago')
filtro = input.int(65, 'k filter for throwbacks', minval=20, step=1)
OverSold = input.int(25, 'Oversold value', minval=5, step=5)
// Building indicators
smoothK = input.int(6, 'k', minval=1)
smoothD = input.int(4, 'd', minval=1)
k = ta.sma(ta.stoch(close, high, low, length), smoothK)
d = ta.sma(k, smoothD)
//Empowerment: introducing EMA
sma_period = input.int(38, 'periodo Sma', minval=1)
emaf = ta.ema(close, sma_period)
//ENTRY condition and order
// First of all, it's better not trade shares with a quaterly loss or with a bad surprise towards to analysts' expectations or ipevaluated (P/E > 50), but on your choice
// You entry when Stochastic's K is higher than D in Oversold area (you may personalize), applying the condition that today's close should be higher than one of n-days ago (default of the day before yesterday or 2 candles ago)
entry1 = k > d and k <= OverSold and close >= close[n]
strategy.entry('Long', strategy.long, comment='k basso', when=entry1)
//EXIT CONDITIONS
//  1) close crosses under exponential movinig average with filter that k >= fixed level (65), in order to distinguish a violent movement of prices with a possibile beginning of a trend from an almost exhausted "ordinary" throwback
// 2) fixed stop loss on percentage
exit1 = ta.crossunder(close, emaf) and k >= filtro
losspel = strategy.position_avg_price * (1 - lossp / 100 * leverage)
exit2 = close < losspel
strategy.close('Long', when=exit1, comment='sma')
strategy.close('Long', when=exit2, comment='stop loss')
// plotting indicators (add Ema on your choice)
plot(k, color=color.new(color.blue, 0), linewidth=1, title='k Stoch')
plot(d, color=color.new(color.red, 0), linewidth=1, title='d stoch signal')
plot(OverSold, title='Oversold', color=color.new(color.aqua, 0))
plot(filtro, color=color.new(color.gray, 0), title='k-filter for ema')




```

> Detail

https://www.fmz.com/strategy/440806

> Last Modified

2024-02-02 11:28:58
