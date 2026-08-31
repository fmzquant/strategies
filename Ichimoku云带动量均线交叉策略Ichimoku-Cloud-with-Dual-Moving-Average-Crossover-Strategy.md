
> Name

Ichimoku云带动量均线交叉策略Ichimoku-Cloud-with-Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15c3d3974a2a8275bf7.png)


## Overview

This strategy combines the Ichimoku cloud with a dual moving average crossover system to form judgments on both long-term and short-term momentum, enabling highly accurate trend identification and trade signals. The Ichimoku cloud is formed by the conversion line, base line, and leading lines to determine price energy and future movements. The dual moving average portion consists of 13 and 21 period exponential moving averages (EMA) to determine short-term price momentum shifts. Together, multiple timeframes are synthesized to improve accuracy and filter out false breaks.  

## Strategy Logic   

The strategy primarily consists of the Ichimoku cloud and dual EMA indicators.  

Within the Ichimoku cloud, the base line represents medium-term trends, conversion line for short-term trends, and cloud bands for support/resistance. Specifically, base line is 26 period midprice, conversion is 9 period midprice, cloud borders are midpoints of base/conversion lines and 52 period midprice. Prices above the cloud signal uptrend while below show downtrends.

For dual EMAs, 13 period EMA tracks short-term trends and 21 period EMA for medium-term trends. 13EMA above 21EMA signals uptrend and vice versa for downtrends.  

Combining Ichimoku and EMA judgments enables fairly accurate trend detection. Specific entry rules require price above lagging line, 13EMA over base line and 21EMA, and price within cloud for longs. Short entries need the reverse.  

The cloud identifies major trends, EMAs short-term momentum, and lagging line filters whipsaws. Together they reliably filter false breaks.  

## Advantages

The strategy has these main advantages:

1. Multi-timeframe synthesis. Cloud for medium/long-term, EMAs for short-term combine multiple dimensions for better accuracy.

2. Effective false break filtering. Strict entry rules requiring price, cloud, lagging line, EMAs alignment filter out noise. 

3. Optimized parameters. Inputs like 9 period conversion line, 26 period base line reliably generate signals.  

4. Applicable for high volatility assets. Ichimoku cloud robust against gaps, fitting for volatile stocks and crypto. 

5. Clear support/resistance levels. Cloud bands clearly show critical S/R zones.

## Risk Analysis   

There are also some risks to consider:

1. Whipsaws possible during rangbound markets. Clouds diverge and signal reliability lower when no clear trends.   

2. Lagging line may miss reversal points. Rapid flips could mean losses from lagging line detections.  

3. Multiple indicators increase complexity. Traders need strong grasp of all indicators for accurate judgments.

4. Break failures possible on initial cloud penetrations. Long contained prices can whip on first breakouts.   

5. Backtest overfitting risks. Current optimized parameters may overfit specific backtest data. Live performance may deteriorate.

Some mitigations for these risks include:

1. Reduce position sizing during choppy/whipsaw conditions based on volatility. 

2. Additional indicators like MACD, RSI to filter lagging line signals.  

3. Robust backtesting across various periods and instruments to verify stability. Incorporate real trading factors like slippage, commissions.  

4. Track live performance to log anomalies vs expected behaviors as reference for improvements.

## Enhancement Opportunities

The strategy can be improved in several aspects:  

1. Incorporate stop loss mechanisms like volatility or high/low based stops to strictly limit risks.   

2. Optimize EMA periods for better trend/counter-trend sensitivity. 

3. Add additional indicators like MACD, RSI to filter signals, removing false positives.  

4. Adapt position sizing based on volatility models, increase size in calm low volatility environments.

5. Test parameter robustness across different instruments and time periods for stability.

These enhancements can further improve stability, signal quality, robustness against curve fitting, and parameter resilience across various market conditions.  

## Conclusion

The integrated Ichimoku cloud and dual EMA crossover strategy complements Ichimoku’s trending capabilities with EMA’s short-term predictive skills into a robust system across multiple timeframes. Strict multi-indicator entry conditions effectively filter out false signals but whipsaw risks in choppy periods should be noted, warranting additional confirmation indicators in those cases. Overall it successfully combines core competencies of trend following and short-term forecasting, worthy of further research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Tenkan Sen Periods|
|v_input_2|26|Kijun Sen Periods|
|v_input_3|52|Senkou Span B Periods|
|v_input_4|26|Displacement|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-19 00:00:00
end: 2023-12-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("13/21 EMA + Ichimoku Kinko Hyo Strategy", shorttitle="EMI", overlay=true, default_qty_type=strategy.percent_of_equity, max_bars_back=1000, default_qty_value=100, calc_on_order_fills= true, calc_on_every_tick=true, pyramiding=0)

TenkanSenPeriods = input(9, minval=1, title="Tenkan Sen Periods")
KijunSenPeriods = input(26, minval=1, title="Kijun Sen Periods")
SenkouSpanBPeriods = input(52, minval=1, title="Senkou Span B Periods")
displacement = input(26, minval=1, title="Displacement")
donchian(len) => avg(lowest(len), highest(len))
TenkanSen = donchian(TenkanSenPeriods)
KijunSen = donchian(KijunSenPeriods)
SenkouSpanA = avg(TenkanSen, KijunSen)
SenkouSpanB = donchian(SenkouSpanBPeriods)
ChikouSpan = close[displacement-1]

Sema = ema(close, 13)
Mema = ema(close, 21)
Lema = ema(close, 89)
XLema = ema(close, 233)

plot(Sema, color=blue, title="13 EMA", linewidth = 2)
plot(Mema, color=fuchsia, title="21 EMA", linewidth = 1)
plot(Lema, color=orange, title="89 EMA", linewidth = 2)
plot(XLema, color=teal, title="233 EMA", linewidth = 2)
plot(KijunSen, color=maroon, title="Kijun Sen", linewidth = 3)
plot(close, offset = -displacement, color=lime, title="Chikou Span", linewidth = 2)
sa=plot (SenkouSpanA, offset = displacement, color=green,  title="Senkou Span A", linewidth = 1)
sb=plot (SenkouSpanB, offset = displacement, color=red,  title="Senkou Span B", linewidth = 3)
fill(sa, sb, color = SenkouSpanA > SenkouSpanB ? green : red)

longCondition = close>ChikouSpan and Sema>KijunSen and Sema>Mema and SenkouSpanA>SenkouSpanB
strategy.entry("Long",strategy.long,when = longCondition)
strategy.close("Long", when = (close<KijunSen and close<ChikouSpan and Sema<Mema))

shortCondition = close<ChikouSpan and Sema<KijunSen and Sema<Mema and SenkouSpanA<SenkouSpanB
strategy.entry("Short",strategy.short, when = shortCondition)
strategy.close("Short", when = (close>KijunSen and close>ChikouSpan and Sema>Mema))
```

> Detail

https://www.fmz.com/strategy/436651

> Last Modified

2023-12-26 16:10:24
