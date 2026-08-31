
> Name

震荡反转CAT策略Reversal-Fluctuation-CAT-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/dc2a2b6cc048e0528a.png)

### Overview  

The Reversal Fluctuation CAT strategy is a quantitative trading strategy based on technical indicators. This strategy judges the market trend and support/resistance positions through MA, EMA and other indicators, and combines custom black swan and white swan indicators to determine abnormal fluctuations, thus implementing a trend trading strategy of buying low and selling high.

### Strategy Principles

The core logic of the Reversal Fluctuation CAT strategy is to judge the overall trend through technical indicators such as MA and EMA, and then capture the opportunities of abnormal fluctuations using custom black swan and white swan indicators. The specific principles are as follows:

1. Use indicators like SMA and EMA to determine the overall trend direction. For example, the EMA144 crossing above the EMA169 is considered a bullish signal, and the EMA144 crossing below the EMA169 is considered a bearish signal.  

2. A custom black swan indicator is defined as (close - open) / close. It reflects the degree of abnormal fluctuation of a candlestick. When the black swan indicator exceeds the threshold (such as 0.0191) and the close is lower than the open, it indicates a downward abnormal fluctuation which presents a shorting opportunity.

3. The white swan indicator is similar to the black swan indicator, which also reflects the degree of abnormal fluctuation of a candlestick. When the white swan indicator exceeds the threshold and the close is higher than the open, it indicates an upward abnormal fluctuation which presents a longing opportunity.  

4. After capturing the opportunities of abnormal fluctuations, it will wait for reversal signals from indicators like EMA to close positions, thus achieving buying low and selling high.

This strategy combines the use of moving averages to determine trends and custom indicators to capture anomalies, which implements a typical reversal trading quantitative strategy.


### Advantage Analysis   

The Reversal Fluctuation CAT strategy has the following advantages:

1. Capturing abnormal fluctuations with relatively high win rate. The black swan and white swan indicators can effectively capture abnormal price fluctuations. These fluctuations often imply reversals, so the trade win rate is higher.

2. Definite entry and exit rules avoid following the trend blindly. The entry and exit criteria of this strategy are very clear, which helps avoid random and emotional operations by traders.  

3. Multiple parameters and indicators for optimization and adjustment. Such as the cycle parameters of MA and EMA, the threshold parameters of black swan and white swan indicators, etc., can be optimized and adjusted to make the strategy better adapt to different products and trading environments.

4. Applicable to high-frequency and low-frequency trading. This strategy combines both trend and reversal, and can be configured for different time cycles for use in high-frequency and low-frequency trading scenarios.

5. Relatively complete risk control measures. The strategy adopts percentage-of-equity for order placement and also has a stop loss mechanism to effectively control single-trade loss.

### Risk Analysis

The Reversal Fluctuation CAT strategy also has some risks, mainly:  

1. Parameter optimization risk. The setting of parameters such as black swan and white swan has a major impact on strategy performance. If the parameters are set improperly, it will greatly reduce the profitability of the strategy.

2. Drawdown risk. When the market shows a longer one-sided trend, this strategy may produce a certain consecutive losses and larger drawdowns. 

3. False breakout risk. False breakouts often appear in reality in the short term. If the parameters are too sensitive it may cause too many unnecessary trades.

In response to the above risks, the following measures can be adopted:

1. Establish a parameter optimization mechanism, use historical data for rigorous backtesting and optimization to ensure reasonable parameter settings.  

2. Set stop loss mechanism. Reasonable stop loss can effectively control single trade loss and maximum drawdown.

3. Adjust parameter sensitivity. Avoid overly sensitive parameter settings by adding certain filtering conditions to avoid false breakout interference.


### Optimization Directions   

The Reversal Fluctuation CAT strategy also has great room for optimization. The main optimization directions are:

1. Further refine the black swan and white swan indicators by setting different parameter combinations to identify abnormal fluctuations more accurately and comprehensively.  

2. Increase machine learning algorithms, use neural networks or ensemble learning methods to automatically optimize parameter configurations so that strategy parameters adjust dynamically for better adaptation to market changes.

3. Use deep learning technology to identify chart patterns to assist in judging price reversal signals and improve strategy performance.  

4. Add fuzzy logic control over parameter sensitivity, keep parameters steady when trend is obvious, and increase parameter sensitivity at inflection points when trend reverses.

5. Combine global optimization methods such as parameter-free genetic algorithms and simulated annealing to achieve overall multi-parameter optimization.  

6. Expand trading varieties, increase other varieties such as stocks and cryptocurrencies for cross-market arbitrage.


Through systematic model and parameter optimization, the robustness of the Reversal Fluctuation CAT strategy can be further enhanced, thereby obtaining superior trading results.


### Conclusion  

The Reversal Fluctuation CAT strategy combines moving averages and custom indicators to effectively identify market reversals in a quantitative trading strategy. This strategy has advantages such as capturing abnormal fluctuations, default entry and exit rules, and great optimization space. The effect can be further enhanced through parameter and model optimization. Risks such as parameter optimization risk, drawdown risk, and false breakout risk need to be guarded against. Overall, the idea of this strategy is reasonable and has good practicality.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Start Date|
|v_input_2|11|Start Month|
|v_input_3|2018|Start Year|
|v_input_4|true|End Date|
|v_input_5|11|End Month|
|v_input_6|2031|End Year|
|v_input_7|true|Key Vaule. 'This changes the sensitivity'|
|v_input_8|10|ATR Period|
|v_input_9|false|Signals from Heikin Ashi Candles|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4


//适合1分钟-3分钟的k线，发生波动超过百分之二时，自动报警
strategy("BlackSwan strategy", overlay=true,
         initial_capital=10000, currency='USD', default_qty_type=strategy.percent_of_equity,
         default_qty_value=100, commission_type= strategy.commission.percent, commission_value=0.075,pyramiding=3)
//-------------------------------------------
//-------------------------------------------
timecondition =  timeframe.period =="480"  or timeframe.period =="240" or timeframe.period =="D"  or timeframe.period =="720"
// Make input options that configure backtest date range
startDate = input(title="Start Date", type=input.integer,
     defval=1, minval=1, maxval=31)
startMonth = input(title="Start Month", type=input.integer,
     defval=11, minval=1, maxval=12)
startYear = input(title="Start Year", type=input.integer,
     defval=2018, minval=1800, maxval=2100)
endDate = input(title="End Date", type=input.integer,
     defval=1, minval=1, maxval=31)
endMonth = input(title="End Month", type=input.integer,
     defval=11, minval=1, maxval=12)
endYear = input(title="End Year", type=input.integer,
     defval=2031, minval=1800, maxval=2100)
// Look if the close time of the current bar
// falls inside the date range
inDateRange = (time >= timestamp(syminfo.timezone, startYear,
         startMonth, startDate, 0, 0)) and
     (time < timestamp(syminfo.timezone, endYear, endMonth, endDate, 0, 0))
     
     

// Inputs
a = input(1,     title = "Key Vaule. 'This changes the sensitivity'")
c = input(10,    title = "ATR Period")
h = input(false, title = "Signals from Heikin Ashi Candles")


ma60 = sma(close,60)
ema144 = ema(close,144)

ema169 = ema(close,169)
ma20=sma(close,20)

     
plot(ema144,color=color.yellow, title="144")
plot(ema169,color=color.orange, title="169")

    
heitiane=(close-open)
heitiane:=abs(heitiane)
heitiane:=heitiane/close

if (inDateRange and  heitiane >0.0191 and close<open) //  and close>f3
    strategy.entry("botsell20", strategy.short, comment = "黑天鹅追空"+tostring(heitiane))

if(crossover(ema144,ema169))
    strategy.close("botsell20", comment = "平空")
if (inDateRange and  heitiane >0.0191 and close>open) //  and close>f3
    strategy.entry("botbuy20", strategy.long, comment = "白天鹅追多"+tostring(heitiane))

if(crossunder(ema144,ema169))
    strategy.close("botbuy20", comment = "平多")
  

```

> Detail

https://www.fmz.com/strategy/442112

> Last Modified

2024-02-19 14:29:51
