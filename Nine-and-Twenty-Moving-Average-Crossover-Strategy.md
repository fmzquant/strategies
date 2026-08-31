
> Name

Nine-and-Twenty-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy uses the crossover of the 9-day and 20-day moving averages to determine the trend direction and make trading decisions. It integrates moving averages, candlesticks, and volume price analysis, making it a typical short-term trading strategy.

## Strategy Logic

This is a simple trend-following strategy based on the crossover of the 9-day and 20-day moving averages. Specifically, it includes the following parts:

1. Set candlestick colors. The candlestick is colored green if the closing price today is higher than yesterday, and red if lower. 

2. Set the color of the 9-day MA. It is colored green if the 9-day MA goes up and the 20-day MA also goes up. It is colored red if the 9-day MA goes down and the 20-day MA also goes down. Otherwise, it is black.

3. Set the color of the 20-day MA. It is colored black if the 20-day MA goes up and black if it goes down. Otherwise, no change.  

4. Plot the 200-day MA in navy.

5. Plot the crossover points of the 9-day and 20-day MAs in magenta. 

6. Plot the Volume Weighted Average Price (VWAP) in white.

7. Go long when the 9-day MA crosses above the 20-day MA, and go short when crossing below.

The above combines moving averages, candlesticks, crossover points and volume price analysis to determine market trends and signals. It is a typical technical analysis strategy.

## Advantages

This simple short-term strategy has the following advantages:

1. Easy to use. Just observe the relationship between the two MAs.

2. Small drawdowns suitable for short-term trading. The 9-day and 20-day MAs have smoothing effects and reduce market noise.

3. Easy to identify trend signals. MA crosses are clear trend reversal signals. 

4. Integrates multiple technical indicators for better decisions. Candlesticks, MAs and volume price analysis give a comprehensive view of the trend.

5. Simple and clean code for easy testing and optimization. MQL4 allows quick implementation and parameter tuning.

6. Applicable to different products and timeframes. It works on any product with OHLC data.

## Risks

Despite the advantages, the strategy also has the following risks:

1. The MA parameters need optimization for different markets.

2. Prone to false breaks and pullbacks. Signals may be quickly invalidated.

3. Unable to handle range-bound markets. Frequent losses may occur in trendless markets.

4. Vulnerable to whipsaws. Wrong short signals may lead to mounting losses in choppy markets.

5. Unable to respond to major news events. It relies solely on historical data.

To address the risks, consider adjusting position sizing, using stop loss, optimizing parameters, or combining with other factors.

## Optimization

The strategy can be optimized in the following aspects:

1. Optimize MA periods to find the best combination for different markets.

2. Add other indicators to filter signals, e.g. MACD, KD, Bollinger Bands. This can reduce false signals.

3. Add stop loss strategies like trailing stop loss to limit losses.

4. Only trade in apparent trends and avoid range-bound markets. 

5. Optimize money management models including position sizing, stop loss, trailing stop loss etc. to improve stability.

6. Test performance across different products and timeframes and adjust parameters.

7. Apply machine learning models like RNN and LSTM for feature engineering and parameter optimization.

## Conclusion

In summary, this is a simple and practical short-term trend following strategy. It identifies trends using MA crosses and integrates candlesticks, MAs and volume price analysis for decision making. But it also has some risks that need to be addressed through parameter optimization, stop loss, and money management. Machine learning can further improve performance. Overall, it provides a reliable approach to quantitative trading worth researching and applying.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=1
strategy("Dieyson daytrade EMA 9+20+200+VWAP and bar & line color", overlay=true)


//bar color rules
Dgbar = close>close[1] and ema(close,20)>ema(close[1],20)
Drbar = close<close[1] and ema(close,20)<ema(close[1],20)

//Barcolors
barcolor(Dgbar ? green : na)
barcolor(Drbar ? red : na)

//MM09 Colorful

MMgreen9 = ema(close,9)>ema(close[1],9) and ema(close,20)>ema(close[1],20)
MMred9 = ema(close,9)<ema(close[1],9) and ema(close,9)<ema(close[1],9)
col8 = (MMgreen9 ? color(green,0) : na)
col28 = (MMred9 ? color(red,0) : na)
col38 = (not MMgreen9 and not MMred9 ? color(black,0) : na)

plot(ema(close,9), color=col8, style=line, linewidth=2)
plot(ema(close,9), color=col28, style=line, linewidth=2)
plot(ema(close,9), color=col38, style=line, linewidth=2)

//MM20 Colorful

MMgreen = ema(close,20)>ema(close[1],20)
MMred = ema(close,20)<ema(close[1],20)
col = (MMgreen ? color(black,0) : na)
col2 = (MMred ? color(black,0) : na)
col3 = (not MMgreen and not MMred ? color(black,0) : na)
col4 = color(navy,0)
plot(ema(close,20), color=col, style=line, linewidth=1)
plot(ema(close,20), color=col2, style=line, linewidth=1)
plot(ema(close,20), color=col3, style=line, linewidth=1)
plot(ema(close,200), color=col4, style=line, linewidth=3)
plot(cross(ema(close,9), ema(close,20)) ? ema(close,9) : na, style = cross,color=fuchsia, transp=0, linewidth = 4)
//plot(cross(ema(close,9), ema(close,200)) ? ema(close,9) : na, style = cross, color=fuchsia, transp=0,linewidth = 4)

colorvwap = color(white,0)
plot(vwap, color=colorvwap, style=line, linewidth=1)

c = crossover(ema(close,9), ema(close,20)) and ema(close,9) > ema(close,20)
v = crossunder(ema(close,9), ema(close,20))

strategy.entry("COMPRA", strategy.long,when=c)
strategy.entry("VENDA", strategy.short,when=v)



```

> Detail

https://www.fmz.com/strategy/428058

> Last Modified

2023-09-28 11:17:10
