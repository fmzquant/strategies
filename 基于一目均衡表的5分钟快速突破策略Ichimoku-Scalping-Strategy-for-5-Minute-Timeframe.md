
> Name

基于一目均衡表的5分钟快速突破策略Ichimoku-Scalping-Strategy-for-5-Minute-Timeframe

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19087147f6e7a2c3fe1.png)

### Overview  

This strategy is an Ichimoku breakout scalping system optimized for 5-minute timeframe. It takes advantage of Ichimoku elements like conversion line, base line and leading spans to capture short-term momentum. Unlike traditional Ichimoku strategies, this system features customized parameters tailored for high-frequency trading.  

The rationale behind the strategy is to go long or short when conversion line crosses base line, with additional condition on price crossing the Ichimoku cloud boundaries to confirm trend directionality. Stop loss and take profit levels are also defined to control risks.


### Strategy Logic

The strategy mainly uses conversion line crossover base line to construct long and short signals. Conversion line reflects price's short-term momentum while base line shows mid-term trend.   

Specifically, when conversion line crosses over base line, it triggers long signal, provided that price is above both leading span A and B of the Ichimoku cloud. This confirms upwards breakout. Conversely, when conversion line crosses below base line, it produces short signal, given price is below the cloud's leading spans to ensure downside breakout.

Additionally, two input parameters percentStop and percentTP represent stop loss percentage and take profit percentage respectively. Traders can tweak these numbers based on their risk appetite. Stop loss and take profit prices are calculated from average entry price of the positions. 

Once long or short signal is triggered, corresponding stop loss and take profit orders will also be placed. Existing positions will be closed if price touches either threshold.  

### Advantage Analysis

Compared to traditional Ichimoku strategies, this system made the following enhancements:  

1. Conversion line period shortened to 9 for faster price change detection.  
2. Base line period kept at 26 to represent mid-term trend.
3. Leading span B period extended to 52 to gauge long-term trend direction.   
4. Displacement set at 26, shifting the Ichimoku cloud 26 periods ahead for forecasting.

These adjustments make the strategy more suitable for 5-minute high-frequency trading, being able to quickly identify mean-reversion opportunities around local extremum. Cloud visualization also improves efficiency by showing long-term versus short-term trend.   

In addition, the stop loss and take profit logic is built-in for convenience, making it beginner friendly.


### Risk Analysis  

The main risks of this strategy includes:  

1. Scalping strategies are sensitive to trading costs. Brokers with low commissions are recommended.
2. Mean reversion systems are vulnerable to whipsaws in ranging markets, causing stop loss triggers.  
3. Fundamentals are not considered and the strategy may fail around major events.  
4. Optimized periods could perform very differently across products, requiring separate optimization.

Following methods can help control risks:  

1. Raise stop loss percentage to limit single trade loss exposure.  
2. Avoid trading sessions with high volatility, focus on relatively stable periods.
3. Combine fundamentals analysis and avoid deploying strategy around significant events.   
4. Test parameters separately for each product to find optimal combinations.


### Enhancement Opportunities

Potential areas of improvement for the strategy:

1. Incorporate volatility metrics and volume to augment entry signals.  
2. Introduce adaptive stop loss mechanisms like trailing stop loss or breakout stop loss. 
3. Utilize machine learning techniques to train parameters for better cross-market applicability.  
4. Combine fundamental signals to avoid distortions around major announcements.  

These additions will likely to enhance the strategy's stability across more market conditions.


### Conclusion  

The Ichimoku scalping strategy adapts traditional settings for high-frequency applicability. Conversion line crossover base line coupled with Ichimoku cloud visualization allows quick identification of short-term trends. The built-in stop loss / take profit controls further facilitates risk management.

While the strategy has its merits, typical limitations of mean reversion systems remain. Further improvements on aspects like volatility, machine learning and events can potentially make the strategy more robust for complex environments.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show Ichimoku Cloud|
|v_input_2|true|Show TP/SL|
|v_input_3|9|Conversion Line Periods|
|v_input_4|26|Base Line Periods|
|v_input_5|52|Span B Periods|
|v_input_6|26|Displacement|
|v_input_7|0.5|Stop Loss (%)|
|v_input_8|true|Take Profit (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-11 00:00:00
end: 2023-12-11 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Scalping Ichimoku Strategy", shorttitle="Scalp Ichimoku", overlay=true)

showBB = input(true, "Show Ichimoku Cloud")
showTrade = input(true, 'Show TP/SL')
conversionPeriods = input(9, "Conversion Line Periods")
basePeriods = input(26, "Base Line Periods")
spanBPeriods = input(52, "Span B Periods")
displacement = input(26, "Displacement")

conversionLine = (ta.highest(high, conversionPeriods) + ta.lowest(low, conversionPeriods)) / 2
baseLine = (ta.highest(high, basePeriods) + ta.lowest(low, basePeriods)) / 2
leadLine1 = (conversionLine + baseLine) / 2
leadLine2 = (ta.highest(high, spanBPeriods) + ta.lowest(low, spanBPeriods)) / 2

plot(showBB ? conversionLine : na, "Conversion Line", color=#2962FF)
plot(showBB ? baseLine : na, "Base Line", color=#B71C1C)
plot(showBB ? ta.lowest(low, 52) : na, "Lagging Span", color=#43A047, offset=-displacement)
p1 = plot(showBB ? leadLine1 : na, "Leading Span A", color=#A5D6A7, offset=displacement)
p2 = plot(showBB ? leadLine2 : na, "Leading Span B", color=#EF9A9A, offset=displacement)
fill(p1, p2, color=leadLine1 > leadLine2 ? color.new(color.green, 90) : color.new(color.red, 90))

// Define the shorter Stop Loss and Take Profit percentages for scalping
percentStop = input(0.5, "Stop Loss (%)")
percentTP = input(1.0, "Take Profit (%)")

// Define the entry conditions
longCondition = ta.crossover(conversionLine, baseLine) and close > leadLine1 and close > leadLine2
shortCondition = ta.crossunder(conversionLine, baseLine) and close < leadLine1 and close < leadLine2

if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit("Take Profit or Stop Loss for Long", "Long", stop=strategy.position_avg_price * (1 - percentStop / 100), limit=strategy.position_avg_price * (1 + percentTP / 100))

if (shortCondition)
    strategy.entry("Short", strategy.short)
    strategy.exit("Take Profit or Stop Loss for Short", "Short", stop=strategy.position_avg_price * (1 + percentStop / 100), limit=strategy.position_avg_price * (1 - percentTP / 100))

```

> Detail

https://www.fmz.com/strategy/435169

> Last Modified

2023-12-12 18:12:02
