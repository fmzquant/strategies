
> Name

动态均线跟踪策略Dynamic-Moving-Average-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11a508140adc9d60fa2.png)

### Overview

This strategy uses the approach explained by Larry Williams in his book "Long-Term Secrets to Short-Term Trading", which utilizes two 3-period moving averages, one representing the Highs and the other the Lows. When the price falls below the 3-period Lows EMA we have a long signal. The trade is closed when the price closes above the 3-period Highs EMA.

### Strategy Logic  

The core logic of this strategy is to compute 3-period moving averages of the high and low prices. Specifically, it uses the ta.ema function to calculate exponential moving averages of the high and low prices over the most recent 3 bars to generate dynamic support and resistance levels. When the price breaks below the lows EMA, it indicates a downtrend, so we can go long. When the price rises back above the highs EMA, it suggests the uptrend has ended and we should close our position. In this way, the strategy can dynamically track price changes and achieve buying low and selling high.  

### Advantage Analysis

The biggest advantage of this strategy is its simplicity and dynamism. Compared to taking fixed period highs/lows moving averages, this strategy uses continuous short-term moving averages, which can more sensitively and timely capture price changes. This allows it to quickly identify trading opportunities to enter and exit the market. Also, low computation load is another advantage for reducing trading latency.

### Risks and Solutions  

The main risk of this strategy is that it reacts slower to sudden events like significant news. Because its moving average period is very short, it takes some time to adjust the moving average levels when there is a sharp price spike. This may lead to losses or missing opportunities. Also, oversensitivity may cause wrong trades. To mitigate these risks, we can appropriately increase the moving average period, or add filters to avoid false signals.

### Optimization Directions  

There is still large room for optimizing this strategy. Firstly, oscillators can be incorporated to filter the signals. Secondly, stop loss logic could be added to control risks. Also, we can dynamically tune the moving average parameters based on market states, using longer periods in trending and shorter periods in ranging markets. Additionally, multi-timeframe analysis, pattern recognition with machine learning etc. can help improve strategy performance.  

### Conclusion  

In summary, this is a very simple and practical strategy, identifying trends using short-term high/low moving averages. Its advantages are strong dynamism, low computation, and high responsiveness, suitable for active trading. But it also has deficiencies in responding to extreme events and higher false signals risk. There are directions to address these issues through parameter tuning, adding filters, and pattern recognition techniques to further lift the strategy efficacy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|true|Start Date|
|v_input_int_2|true|Start Month|
|v_input_int_3|2018|Start Year|
|v_input_int_4|31|End Date|
|v_input_int_5|12|End Month|
|v_input_int_6|2041|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-26 00:00:00
end: 2023-12-03 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(
     "Larry Williams 3 Period EMAs strategy",
     overlay=true,
     calc_on_every_tick=true,
     currency=currency.USD
     )

// Time range for backtesting
startDate = input.int(title="Start Date", defval=1, minval=1, maxval=31)
startMonth = input.int(title="Start Month", defval=1, minval=1, maxval=12)
startYear = input.int(title="Start Year", defval=2018, minval=1800, maxval=2100)

endDate = input.int(title="End Date", defval=31, minval=1, maxval=31)
endMonth = input.int(title="End Month", defval=12, minval=1, maxval=12)
endYear = input.int(title="End Year", defval=2041, minval=1800, maxval=2100)

inDateRange = (time >= timestamp(syminfo.timezone, startYear, startMonth, startDate, 0, 0)) and
     (time < timestamp(syminfo.timezone, endYear, endMonth, endDate, 0, 0))

// EMA
period = 3

emaH = ta.ema(high, period)
emaL = ta.ema(low, period)

// PLOT:
// Draw the EMA lines on the chart
plot(series=emaH, color=color.green, linewidth=2)
plot(series=emaL, color=color.red, linewidth=2)

// Conditions
if(inDateRange and close < emaL)
    strategy.entry("Long", strategy.long, comment="Long")
if(close > emaH)
    strategy.close("Long", comment="Close Long")

// Uncomment to enable short entries
//if(inDateRange and close > emaH)                                    
//    strategy.entry("Short", strategy.short, comment="Short")    
//if(close < emaL)
//    strategy.close("Short", comment="Close Short")
```

> Detail

https://www.fmz.com/strategy/434184

> Last Modified

2023-12-04 15:38:09
