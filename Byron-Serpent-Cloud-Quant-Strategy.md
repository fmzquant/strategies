
> Name

Byron-Serpent-Cloud-Quant-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d303cbd9cd2983eea8.png)

### Overview  

Byron Serpent Cloud Quant Strategy mainly combines Ichimoku indicators and the random indicator RSI to construct quantitative trading strategy signals by weighting the judgments of the two indicators, thereby achieving automated trading of securities varieties. This strategy comprehensively considers Ichimoku indicator signals and StochRSI signals of different intensities, and smooths and stabilizes trading decisions by setting weights.

### Strategy Principle   

This strategy uses indicators such as conversion lines, base lines, lead 1 and lead 2 in Ichimoku, combined with K lines and D lines in StochRSI. On the Ichimoku side, if the conversion line is above the baseline and lead 1 is above lead 2, it is a bullish signal. If the conversion line is below the baseline and lead 1 is below lead 2, it is a strong bearish signal. In addition, if the conversion line is above or below the baseline, it can also generate weak bullish or bearish signals. On the StochRSI side, if K line is above D line and K line is below the overbought line and D line is below the overbought line, it is a StochRSI buy signal. If K line is below D line and K line is above oversold line and D line is above oversold line, it is a StochRSI sell signal. By setting different weights for Ichimoku signals and StochRSI signals of different strengths, and comparing them with a decision weight value, final buy or sell signals are generated when exceeding the decision weight value.  

### Advantage Analysis   

This strategy combines Ichimoku and StochRSI indicators to simultaneously determine trend direction and overbought/oversold conditions for more comprehensive and reliable signals. Compared to using a single indicator, it can reduce the generation of false signals. The Ichimoku indicator is quite accurate in judging medium and long term trends, while the StochRSI indicator can measure short-term overbought/oversold phenomena, allowing the strategy to be suitable for different cycles. The design of adding decision weights also makes the strategy signals smoother and more reliable. Overall, this strategy can automatically determine turning points in market trends and generate trading signals with advantages such as easy operation, wide applicability and stable signals.  

### Risk Analysis     

The biggest risk of this strategy is that both Ichimoku and StochRSI indicators may generate false signals, especially in range-bound markets, which will increase unnecessary trades. In addition, the setting of weights and parameter values will also have a great impact on the effectiveness of the strategy. If the weights are set improperly, important signals may be missed or too many false signals may be generated. Some key parameters such as RSI length and Stoch length also need to be tested and optimized for different varieties and market environments, otherwise it will affect the strategy. Finally, data problems can also become risks to the strategy. If the data quality is not good, it will also cause deviations in indicators and signals.  

### Optimization Directions     

This strategy also has great optimization potential. First, consider adding more indicators such as Bollinger Bands and KD to make signal judgment more comprehensive. Second, use machine learning or genetic algorithms to automatically optimize parameters instead of using fixed parameters to make strategies more intelligent and adaptive. Third, research how to improve the indicator algorithms to reduce the generation of false signals. Fourth, the weight setting mechanism can also be further optimized, such as increasing the weight of strong signals. Fifth, parameters and rules can be optimized for more varieties or submarkets to adapt to the ever changing market environment.  

### Summary     

Byron Serpent Cloud Quant Strategy combines Ichimoku and StochRSI indicators to form trading signals through weighting and parameter design, which can automatically capture the trend changes of the market and has good adaptability to different varieties and cycles. It is a set of quantitative strategies worth in-depth research and application. The strategy also has the potential for further expansion and optimization, such as introducing more indicators and techniques, and is expected to achieve better trading results.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|BUY/SELL decision weight|
|v_input_2|35|Ichimoku strong weight|
|v_input_3|20|Ichimoku standard weight|
|v_input_4|20|Ichimoku weak weight|
|v_input_5|30|Stoch RSI weight|
|v_input_6|9|Conversion Line Periods|
|v_input_7|26|Base Line Periods|
|v_input_8|52|Lagging Span 2 Periods|
|v_input_9|5|Displacement|
|v_input_10|8|lengthRSI|
|v_input_11|5|lengthStoch|
|v_input_12|3|smoothK|
|v_input_13|3|smoothD|
|v_input_14|20|OverSold|
|v_input_15|80|OverBought|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Baracuda Ichimoku/StochRSI Strategy", overlay=true)

DecisionWeight = input(50, minval = 0, title="BUY/SELL decision weight")

ichimokuStrong = input(35, minval = 0, title="Ichimoku strong weight")
ichimokuStandard = input(20, minval = 0, title="Ichimoku standard weight")
ichimokuWeak = input(20, minval = 0, title="Ichimoku weak weight")
stochRSIWweak = input(30, minval = 0, title="Stoch RSI weight")

conversionPeriods = input(9, minval=1, title="Conversion Line Periods")
basePeriods = input(26, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Periods")
displacement = input(5, minval=1, title="Displacement")

donchian(len) => avg(lowest(len), highest(len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

lengthRSI = input(8, minval=8) //14
lengthStoch = input(5, minval=5)//14
smoothK = input(3,minval=3) 
smoothD = input(3,minval=3)
OverSold = input(20)
OverBought = input(80)
rsi1 = rsi(close, lengthRSI)
k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = sma(k, smoothD)


stronglong = conversionLine > baseLine and leadLine1 > leadLine2
strongshort = conversionLine < baseLine and leadLine1 < leadLine2

weaklong = conversionLine > baseLine
weakshort = conversionLine < baseLine

RSIlong = k > d and k < OverSold and d < OverSold
RSIshort = k < d and k > OverBought and d > OverBought

long=(((stronglong ? 1:0)*ichimokuStrong) + ((weaklong? 1:0)*ichimokuWeak) + ((RSIlong? 1:0)*stochRSIWweak)) > DecisionWeight
short=(((strongshort? 1:0)*ichimokuStrong) + ((weakshort? 1:0)*ichimokuWeak) + ((RSIshort? 1:0)*stochRSIWweak)) > DecisionWeight

strategy.entry("long", strategy.long, when=long)
strategy.entry("short", strategy.short, when=short)
```

> Detail

https://www.fmz.com/strategy/442006

> Last Modified

2024-02-18 15:36:22
