
> Name

基于不同周期移动平均线交叉策略Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b0c052c814cf8ca6c8.png)

### Overview  

The strategy generates trading signals by calculating two moving averages of different periods and plotting their crossover points. It goes long when the shorter-term moving average crosses above the longer-term moving average, and goes short when the shorter-term moving average crosses below the longer-term moving average.

### Strategy Logic  

The strategy is based on the advantage of moving averages - they eliminate the randomness in price sequences and extract the main trend. The strategy employs a dual moving average system consisting of 7-day and 20-day lines, two commonly used and quite definitive periods.  

When the shorter-term moving average crosses above the longer-term moving average, it signals that prices are entering an uptrend. When it crosses below, it signals prices are entering a downtrend. According to this logic, we go long or short respectively.  

Specifically, the strategy calculates the 7-day simple moving average (SMA) and 20-day simple moving average. When the two averages cross, it judges a trend reversal and triggers a trade signal. To differentiate between crossover types, we define the short term line being above the long term line as an upward price trend, and vice versa for a downward trend. When the short term line crosses above the long term line, i.e. the onset of an upward trend, a long position is entered. When the short term line crosses below, i.e. the onset of a downward trend, a short position is entered.

### Advantage Analysis   

(1) The strategy logic is simple and easy to understand and implement.  

(2) Moving averages as trend tracking indicators can effectively filter out some noise in prices. The dual moving average system further enhances stability.

(3) Flexible parameter configurations to meet different market conditions and trading requirements.  

(4) Use of two commonly used moving average periods makes it easy to determine clear trading signals.
   
(5) Powerful visualization for intuitive trend, key levels identification etc.
   
(6) Parameters can be optimized via backtesting to improve strategy return.

### Risk Analysis  

(1) The strategy is quite sensitive to market fluctuation. Whipsaws can lead to frequent losses in ranging periods.  

(2) Crossovers may not accurately pinpoint trend reversal levels and could trigger wrong signals.

(3) Rigid rules cannot adapt to drastic events affecting markets, potentially causing huge losses.  

(4) Improper parameters could also lead to inaccurate signals and missed trades. Careful testing is needed.

To mitigate these risks, parameters could be adjusted accordingly. Other indicators can be added for confirmation. Stop loss strategies could control losses. Parameters or strategies could be adjusted per market regimes.  

### Enhancement Directions

(1) Incorporating other technical indicators to form a combined strategy could increase signal accuracy. E.g. adding volume to confirm expansion on moving average crossover.  

(2) Adding stop loss strategies to effectively control single trade loss. E.g. exiting positions if prices breach moving averages by some threshold.

(3) Testing and optimizing moving average periods. Trying different fast and slow combinations to find best parameters. Other moving averages like EMA, WMA can also be tested.  

(4) Parameter tuning based on different products and market conditions. Using shorter moving averages and smaller cross-term difference for more volatile products. 

### Conclusion  

The moving average crossover strategy is a very typical and basic trend following strategy. By calculating two moving averages of different periods and observing their crossovers, it judges changes in price trend. Trading signals are generated when the shorter period moving average crosses above or below the longer one. This simple logic is easy to implement and flexible to adjust, making it an introductory quant strategy. But it also has defects like sensitivity to market fluctuations and potential inaccurate signals. By combining with other indicators, adding stops, and parameter optimization, the strategy can be enhanced into a very practical one for quantitative trading.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Price Source For The Moving Averages: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|true|Use Current Timeframe As Resolution?|
|v_input_3|W|Use Different Timeframe? Then Uncheck The Box Above|
|v_input_4|7|Short Period Moving Average|
|v_input_5|20|Long Period Moving Average|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-01 00:00:00
end: 2023-12-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Ma stratégie", overlay=true)

// Multi-timeframe and price input
pricetype = input(close, title="Price Source For The Moving Averages")
useCurrentRes = input(true, title="Use Current Timeframe As Resolution?")
resCustom = input(title="Use Different Timeframe? Then Uncheck The Box Above",  defval="W")
res = useCurrentRes ? timeframe.period : resCustom
price = request.security(syminfo.tickerid, res, pricetype)

// MA period input
shortperiod = input(7, title="Short Period Moving Average")
longperiod = input(20, title="Long Period Moving Average")



short = ema(price, shortperiod) 
long = ema(price, longperiod) 
   
// MA trend direction color
shortcolor = short > short[1] ? lime : short < short[1] ? red : blue
longcolor = long > long[1] ? lime : long < long[1] ? red : blue

// MA output
MA1 = plot(short, title="Short Period Moving Average", style=linebr, linewidth=2, color=shortcolor)
MA2 = plot(long, title="Long Period Moving Average", style=linebr, linewidth=4, color=longcolor)
fill(MA1, MA2, color=silver, transp=50)

// MA trend bar color
TrendingUp() => short > long 
TrendingDown() => short < long 
barcolor(TrendingUp() ? green : TrendingDown() ? red : blue)

// MA cross alert
MAcrossing = cross(short, long) ? short : na
plot(MAcrossing, style = cross, linewidth = 4,color=black)

// MA cross background color alert
Uptrend() => TrendingUp() and TrendingDown()[1]
Downtrend() => TrendingDown() and TrendingUp()[1]
bgcolor(Uptrend() ? green : Downtrend() ? red : na,transp=50)

// Buy and sell alert
Buy = Uptrend() and close > close[1]
Sell = Downtrend() and close < close[1]
plotshape(Buy, color=black, style=shape.arrowup, text="Buy", location=location.bottom)
plotshape(Sell, color=black, style=shape.arrowdown, text="Sell", location=location.top)



if (Buy)
    strategy.entry("My Long Entry Id", strategy.long)


if (Sell)
    strategy.entry("My Short Entry Id", strategy.short)
```

> Detail

https://www.fmz.com/strategy/434691

> Last Modified

2023-12-08 12:20:42
