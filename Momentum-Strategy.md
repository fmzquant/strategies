
> Name

Momentum-Strategy

> Author

ChaoZhang

> Strategy Description



### Overview

The momentum strategy is a trading strategy that follows the price trend based on price movement. It generates trading signals by calculating the price changes over a certain period. When the price uptrend is identified, it will trigger a buy signal. When the price downtrend is identified, it will trigger a sell signal. This strategy uses a double momentum indicator crossover to generate trading signals.

### Strategy Logic

This strategy calculates the price momentum by measuring the change of closing price compared to the closing price N periods ago. 

The first momentum indicator MOM0 is calculated as:

MOM0 = CLOSE - CLOSE[N]

where CLOSE is the current period's closing price and CLOSE[N] is the closing price N periods ago. MOM0 > 0 indicates the current closing price is higher than N periods ago, while MOM0 < 0 indicates the current closing price is lower than N periods ago.

The second momentum indicator MOM1 is calculated as:  

MOM1 = MOM0 - MOM0[1]

It calculates the difference between the current MOM0 and the previous period's MOM0. MOM1 > 0 indicates MOM0 is increasing, while MOM1 < 0 indicates MOM0 is decreasing.

The third momentum indicator MOM2 is calculated as:

MOM2 = CLOSE - CLOSE[1] 

It calculates the difference between the current closing price and the previous period's closing price. MOM2 > 0 indicates the closing price is rising, while MOM2 < 0 indicates the closing price is falling.

When MOM0 > 0 and MOM1 > 0, it indicates the momentum is consistently rising and triggers a buy signal. When MOM0 < 0 and MOM2 < 0, it indicates the momentum is consistently falling and triggers a sell signal.

The code also includes a time condition time_cond to only generate signals during the specified backtesting time range. It rechecks the condition before placing orders to avoid unwanted orders when the signal disappears.

### Advantage Analysis

- Captures price change trends regardless of price level itself, avoids chasing highs and killing lows
- The double momentum indicator crossover filters false breakouts and avoids wrong signals  
- Additional time and condition checks avoid unnecessary trades
- Simple and easy to understand logic, easy to implement
- Flexible parameters adjustable for different market environments

### Risk Analysis

- Momentum indicators have lag and may miss turning points
- The dual indicator crossover increases filtration but may also miss some opportunities  
- Unable to determine the strength and speed of price up or down
- Parameters need careful selection, overly sensitive settings may increase trade frequency and slippage cost
- Performance relies on parameter optimization, parameters need adjustment for different periods

Risks can be reduced by shortening momentum periods, adding trend determination, or configuring stop loss. Volume indicators may also be considered for additional filtration.

### Optimization Directions

- Test different momentum calculation methods like ROC, RSI etc.
- Add trend determination to avoid whipsaws in ranging markets
- Employ stop loss strategies to control single trade loss
- Combine with volume indicators to ensure volume support
- Introduce machine learning algorithms for dynamic parameter optimization
- Multi-timeframe strategies to differentiate short and long term trends
- Consider cross-market arbitrage strategies utilizing price relationships between markets

### Summary

The momentum strategy follows price change trends instead of price levels, effectively identifying market momentum directions for catching upside and downside price movements. However, momentum has lagging characteristics and parameter selection and combination optimization are crucial for strategy performance. This strategy uses dual momentum indicator crossover as a base, filtering some noise. Performance can be further enhanced and risks controlled by continuous optimization of parameters, integrating new technical indicators, and leveraging machine learning techniques.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(2021-01-02T00:00:00)|Start Date|
|v_input_2|timestamp(2021-12-31T00:00:00)|End Date|
|v_input_3|12|Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|true|Percent?|
|v_input_6|0|MOM Choice: MOM2|MOM1|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-25 00:00:00
end: 2023-02-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Momentum Strategy", overlay = false, precision = 2, initial_capital = 10000, default_qty_value = 10000, default_qty_type = strategy.cash, commission_type = strategy.commission.percent, commission_value = 0, calc_on_every_tick = true)

// Calculate start/end date and time condition
startDate  = input(timestamp("2021-01-02T00:00:00"), title = "Start Date", type = input.time)
finishDate = input(timestamp("2021-12-31T00:00:00"), title = "End Date",type = input.time)
 
time_cond  = true

i_len           =       input(defval = 12,      title = "Length",       minval = 1)
i_src           =       input(defval = close,   title = "Source")
i_percent       =       input(defval = true,    title = "Percent?")
i_mom           =       input(defval = "MOM2",  title = "MOM Choice",   options = ["MOM1", "MOM2"])

momentum(seria, length, percent) =>
	_mom        =       percent ? ( (seria / seria[length]) - 1) * 100 : seria - seria[length]
	_mom

mom0        =       momentum(i_src, i_len, i_percent)
mom1        =       momentum(mom0, 1, i_percent)
mom2        =       momentum(i_src, 1, i_percent)

momX        =       mom1

if i_mom == "MOM2"
    momX    :=     mom2

if (mom0 > 0 and momX > 0 and time_cond)
    strategy.entry("MomLE", strategy.long, stop = high + syminfo.mintick, comment = "MomLE")
else
	strategy.cancel("MomLE")
if (mom0 < 0 and momX < 0 and time_cond)
	strategy.entry("MomSE", strategy.short, stop = low - syminfo.mintick, comment = "MomSE")
else
	strategy.cancel("MomSE")

plot(mom0, color = #00bcd4, title = "MOM")
plot(mom1, color = #00FF00, title = "MOM1", display = display.none)
plot(mom2, color = #00FF00, title = "MOM2")
```

> Detail

https://www.fmz.com/strategy/427877

> Last Modified

2023-09-26 15:16:56
