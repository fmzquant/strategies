
> Name

Dual-Moving-Average-Crossover-Strategy-426583

> Author

ChaoZhang

> Strategy Description



This strategy is named "Dual Moving Average Crossover Strategy". Its core principle is using two linear regression lines with different parameters and generating trading signals based on their crossover situations.

The strategy first calculates a short-term and a long-term linear regression line. The short-term linear regression has a period of 100 days, and the long-term one has a period of 150 days. When the short-term regression line crosses above the long-term line, a buy signal is generated. When the short-term line crosses below the long-term line, a sell signal is generated.

Linear regression lines can reflect the long-term trend direction of prices. The short-term line with a smaller period is more sensitive to price changes and can capture short-term reversal timings. The long-term line with a larger period represents the long-term equilibrium trend of prices. When the two lines cross, it indicates the short-term and long-term trends are reversing, thus trading signals can be generated.

The advantage of this strategy is utilizing the classical technical analysis approach of moving average crossover, with the addition of linear regression analysis, which can identify price reversals across both long-term and short-term time dimensions. However, linear regression lines are susceptible to outlier data and exhibit some lag. Also, moving average crossovers themselves tend to generate many false signals. 

To filter out some false signals, this strategy incorporates time condition limits, executing trades only during specified date ranges. This can reduce ineffective trades to some extent. But the time window settings are subjective and require backtesting optimization.

In conclusion, the dual moving average crossover strategy combines multiple analytical techniques and can capture complex trading opportunities. But risk management is crucial to prevent overtrading. Further optimizing the strategy by incorporating other technical indicators can improve robustness.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|Length|
|v_input_2|150|Length|
|v_input_3|2018|yearfrom|
|v_input_4|2019|yearuntil|
|v_input_5|true|monthfrom|
|v_input_6|12|monthuntil|
|v_input_7|true|dayfrom|
|v_input_8|31|dayuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-12 00:00:00
end: 2023-09-12 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="Linear Regression Curve CrossOver Strategy", shorttitle="LRC Crossover", overlay=true)
src = close
len1 = input(defval=100, minval=1, title="Length")
offset = 0
outfast = linreg(src, len1, offset)
plot(outfast,color=blue)

len2 = input(defval=150, minval=1, title="Length")

outslow = linreg(src, len2, offset)
plot(outslow,color=red)



yearfrom = input(2018)
yearuntil =input(2019)
monthfrom =input(1)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)



if (  crossover(outfast,outslow)) 
    strategy.entry("BUY", strategy.long, stop=close, oca_name="TREND",  comment="BUY")
    
else
    strategy.cancel(id="BUY")


if ( crossover(outslow,outfast)  ) 

    strategy.entry("SELL", strategy.short,stop=close, oca_name="TREND", comment="SELL")
else
    strategy.cancel(id="SELL")
    
```

> Detail

https://www.fmz.com/strategy/426583

> Last Modified

2023-09-13 14:56:37
