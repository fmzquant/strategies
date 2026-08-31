
> Name

CMARSI交易策略CMARSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

The CMARSI trading strategy is a trend-following strategy that combines the RSI indicator and moving averages. It uses an improved RSI indicator to identify trends and moving averages as signals for entries and exits. This strategy is suitable for medium-to-long term trading and aims to profit by following the trend. 

## Principle Analysis

The CMARSI strategy uses an enhanced RSI indicator called Connors RSI. Connors RSI incorporates three indicators - classical RSI, RSI Up/Down lines, and ROC percentile. Its calculation formula is:

Connors RSI = (RSI + RSI Up/Down + ROC Percentile) / 3

Where RSI uses a 3-day period, RSI Up/Down uses 2 days, and ROC percentile uses 100 days. 

The advantage of Connors RSI is that it combines multiple indicators and can more accurately identify trend changes. A crossing above 40 is a long signal, while a crossing below 70 is a short signal.

The CMARSI strategy further introduces a moving average factor on top of Connors RSI. It calculates a 2-day moving average and uses crossovers of Connors RSI and the MA as trading signals. The specific rules are:

1. Enter long when Connors RSI crosses above 40 and has a golden cross of 2-day MA. 

2. Exit when Connors RSI crosses below 70 and has a death cross of 2-day MA.

Using the MA filter can avoid some false signals from Connors RSI and improve the stability of the strategy.

## Advantage Analysis 

The biggest advantage of the CMARSI strategy is the combination of multiple indicators to identify trends, avoiding the limitations of single RSI indicators. Specifically, the strategy has the following advantages:

1. Connors RSI is more stable than classical RSI for identifying trend turning points.

2. The introduction of moving averages effectively filters out some noise and prevents chasing highs and selling lows. 

3. The combination of multiple indicators can improve win rate by following trends.

4. The trading rules are simple and easy to implement. 

5. As a trend-following strategy, it can fully capture profits from medium-to-long term trends.

## Risk Analysis

The main risks of the CMARSI strategy come from incorrect trend judgement and stop loss placement. The specific risks are:

1. Connors RSI gives incorrect signals, causing unnecessary entries. Parameters can be adjusted or other indicators added for confirmation.

2. Stop loss placement is unreasonable, which may cause premature stop out or too large of a stop loss. Stop loss should be optimized for different products and market environments.

3. Moving average filters may not work well in ranging markets. Strategy parameters should be optimized accordingly. 

4. Prolonged use may lead to overfitting. Regular backtesting and parameter tuning based on market conditions are necessary.

## Optimization Directions 

The CMARSI strategy can be optimized in the following aspects:

1. Optimize Connors RSI parameters for different periods and products. 

2. Try different types of moving averages to further improve the filtering effect.

3. Add other indicators like MACD, Bollinger Bands for trade confirmation. 

4. Optimize stop loss strategies, such as trailing stop loss or staggered stop loss.

5. Select products that fit the strategy better through screening.

6. Use Walk Forward Analysis to regularly optimize parameters and prevent overfitting.

## Conclusion

The CMARSI strategy combines Connors RSI and moving averages to follow trends for medium-to-long term trading. It is stable, easy to implement, and can effectively capture trend profits. We should continuously optimize parameters based on market conditions, manage risks, and generate good profitability. Overall, CMARSI is a recommended trend trading strategy.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-19 00:00:00
end: 2023-09-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
src = close, lenrsi = 3, lenupdown = 2, lenroc = 100, malengt = 2, low = 40, high = 70, a = 1
updown(s) => 
    isEqual = s == s[1]
    isGrowing = s > s[1]
    ud = 0.0
    ud := isEqual ? 0 : isGrowing ? (nz(ud[1]) <= 0 ? 1 : nz(ud[1])+1) : (nz(ud[1]) >= 0 ? -1 : nz(ud[1])-1)
    ud
rsi = rsi(src, lenrsi)
updownrsi = rsi(updown(src), lenupdown)
percentrank = percentrank(roc(src, 1), lenroc)
crsi = avg(rsi, updownrsi, percentrank)
MA = sma(crsi, malengt)

band1 = 70
band0 = 40

ColorMA = MA>=band0 ? lime : red

p1 = plot(MA, title="BuyNiggers", style=line, linewidth=4, color=ColorMA)

p2 = plot(low, title="idk", style=line, linewidth=2, color=blue)
p3 = plot(high, title="idk2", style=line, linewidth=2, color=orange)

//@version=2
strategy("CMARSI")


if crossover(MA,band0)
    strategy.entry("buy", strategy.long, when=strategy.position_size <= 0)
    
if crossunder(MA,band1)
    strategy.exit("sell", "buy", profit=1000000, stop=10000000)
    
plot(strategy.equity)

    




```

> Detail

https://www.fmz.com/strategy/427929

> Last Modified

2023-09-26 20:44:53
