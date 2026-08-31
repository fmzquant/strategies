
> Name

Ichimoku云图量化交易策略A-Quantitative-Ichimoku-Cloud-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1607814fab3632e6ec0.png)

### Overview  

This strategy is based on the Ichimoku Cloud, a famous trend indicator in technical analysis, to determine market trends and generate trading signals by observing the crossover relationships between the Conversion Line, Base Line and Cloud Lines from the Ichimoku system. It is suitable for traders who want to track intermediate-term trends in the market.


### Strategy Logic   

The core components of this strategy are the three lines from the Ichimoku Cloud system: Conversion Line, Base Line and Cloud Lines. The Conversion Line represents short-term price action, the Base Line shows intermediate-term trends, while the Cloud visualizes areas of support and resistance. The strategy identifies market trends and trading opportunities by detecting crosses between these three elements. 

Specifically, the main rules of this strategy are:

1. When the Base Line crosses above the Cloud, an upward trend is emerging in the intermediate-term, go long.  

2. When the Conversion Line crosses above the Cloud, prices are starting to bounce back short-term, go long.

3. When the Base Line crosses below the Cloud, a downward trend is emerging, go short.   

4. When the Conversion Line crosses below the Cloud, prices are starting to fall short-term, go short.


In addition, crosses between price and Cloud Lines act as filters for trade signals. Only when both the Conversion/Base Line and price cross the cloud together will a valid signal be generated.   

### Advantage Analysis   

Compared to single indicators like moving averages, the biggest advantage of this strategy is incorporating data from multiple timeframes to detect trend changes. The Conversion Line shows short-term moves, the Base Line intermediate moves and the Cloud reveals longer-term support/resistance levels. Their combination identifies turning points more accurately. Also, the inherent filtering mechanism of the Ichimoku reduces whipsaws from market noise, allowing us to capture the bigger trend.  

### Risk Analysis

The biggest risk is that the Ichimoku system is sensitive to input parameters. Inappropriate settings may produce bad signals frequently. Also, the cloud tend to flatten during range-bound periods, causing uncertain signals. Frequent order openings and stops may incur large commission fees. In addition, intermediate-term trades come with larger loss risks per trade, requiring strict risk control.  

To mitigate risks, we can tweak the parameter mix, set stop loss/take profit levels or combine Ichimoku with other indicators. 

### Enhancement Opportunities   

There are several ways we can enhance this strategy:

1. Optimize parameter combinations to find the best fit for different trading instruments.  

2. Add filtering conditions with other indicators to reinforce trend validation. For example, only take signals when trading volume expands.   

3. Incorporate stop loss mechanisms like trailing stops or time stops to control single trade loss.  

4. Combine with swing trading approaches to fine tune entry timing within bigger trends.


### Conclusion   

The Ichimoku Cloud strategy identifies intermediate-term trends using crosses of the Conversion/Base Lines against the Cloud. Compared to single indicators, it incorporates multiple timeframes for reliable trend change detection. The inherent noise filtering also avoids whipsaws. With proper parameter tuning and risk management, this strategy can generate stable excess returns over the long run. It suits experienced trend traders with intermediate-term holding periods.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Conversion Line Periods|
|v_input_2|26|Base Line Periods|
|v_input_3|52|Lagging Span 2 Periods|
|v_input_4|26|Displacement|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-12-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="Ichimoku Cloud", shorttitle="Ichimoku", overlay=true, default_qty_type=strategy.cash, default_qty_value=100000, initial_capital=100000, currency=currency.USD)


conversionPeriods = input(9, minval=1, title="Conversion Line Periods"),
basePeriods = input(26, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Periods"),
displacement = input(26, minval=1, title="Displacement")

donchian(len) => avg(lowest(len), highest(len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

plot(conversionLine, color=#0496ff, title="Conversion Line")
plot(baseLine, color=#991515, title="Base Line")
plot(close, offset = -displacement, color=#459915, title="Lagging Span")

p1 = plot(leadLine1, offset = displacement, color=green,
 title="Lead 1")
p2 = plot(leadLine2, offset = displacement, color=red, 
 title="Lead 2")
fill(p1, p2, color = leadLine1 > leadLine2 ? green : red)



maxlead = max(leadLine1, leadLine2)
minlead = min(leadLine1, leadLine2)

//rules
A = baseLine> maxlead[displacement]
B = crossover(baseLine,  maxlead[displacement])

C = baseLine< minlead[displacement]
D = crossunder(baseLine, minlead[displacement])


E = conversionLine> maxlead[displacement]
F = crossover(conversionLine, maxlead[displacement])

G = conversionLine< minlead[displacement]
H = crossunder(conversionLine, minlead[displacement])


I = close>  maxlead[2*displacement]
J = crossover(close, maxlead[2*displacement])

K = close<minlead[2*displacement]
L = crossunder(close, minlead[2*displacement])


//strategies
if A 
    if E
        strategy.entry("Buy", strategy.long, when= J)
if A 
    if I
        strategy.entry("Buy", strategy.long, when= F)
if E 
    if I
        strategy.entry("Buy", strategy.long, when= B)

if C
    if G
        strategy.entry("Sell", strategy.short, when=L)
if C
    if K
        strategy.entry("Sell", strategy.short, when=H)
if G
    if K
        strategy.entry("Sell", strategy.short, when=D)

//EOS

```

> Detail

https://www.fmz.com/strategy/436133

> Last Modified

2023-12-21 15:33:05
