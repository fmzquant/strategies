
> Name

Momentum-Alpha策略Momentum-Alpha-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e4f6328c035fd4b8c6.png)



### Overview

The Momentum Alpha strategy judges whether an underlying asset has positive momentum by calculating its Sharpe ratio and alpha value. It goes long when both the Sharpe ratio and alpha are positive, and flattens the position when both indicators turn negative.

### Strategy Principle  

The core indicators of this strategy are Sharpe ratio and alpha. The Sharpe ratio reflects the risk-adjusted return of an asset, while alpha reflects its excess return over the market benchmark. When both are positive, it indicates the asset has high risk-adjusted returns and outperforms the market benchmark. Therefore, a long position is taken. When both turn negative, it means the momentum is gone and the position is flattened.

Specifically, the strategy first calculates the Sharpe ratio over the past 180 days. The Sharpe ratio is calculated as: (average daily return – risk free return) / standard deviation of daily returns. Here the average and standard deviation of daily returns are calculated using opening price and previous closing price. When the Sharpe ratio is greater than 1, it means the asset has a relatively high risk-adjusted return.

At the same time, the alpha over the past 180 days is calculated. Alpha is computed through the market model: Alpha = Actual asset return – (Market return x Beta). Here the daily returns of the underlying asset and S&P 500 index are used. When alpha is greater than 0, it means the actual return of the asset is higher than that of the market benchmark.  

Therefore, when both the Sharpe ratio and alpha are positive, a long position is taken. When both turn negative, the position is flattened.

### Advantage Analysis

The biggest advantage of this strategy is that by judging momentum, it can capture the growth opportunities of the broader market and some individual stocks during certain periods, while controlling risk to avoid prolonged market crashes. The advantages are analyzed in detail as follows:

1. Calculating the Sharpe ratio reflects recent momentum conditions and can capture the uptrends of some markets and stocks. Calculating alpha reflects excess returns over benchmark and filters out weaker underlyings.  

2. By comprehensively considering both indicators across different time horizons, positive momentum can be more accurately determined.

3. When momentum disappears, timely stop losses avoid major losses. This allows proper profit taking after an uptrend.  

4. Compared to single momentum indicators, this strategy is more stable while also being flexible enough to use on both stocks and indexes.

### Risk Analysis  

Despite the advantages, the strategy still has the following risks:

1. Momentum indicators can retract. When the market turns, momentum stocks may drop quickly. This can lead to large losses. Parameters could be adjusted or combined with other indicators.

2. Alpha and Sharpe ratio have time lags. When markets move fast, indicator values may lag and fail to reflect the latest trends. The calculation period could be shortened.

3. There is no position sizing control, leading to concentrated risks. Consider controlling position sizes based on market conditions or available capital.

4. Backtest data may be insufficient and live performance uncertain. More timeframe and instrument backtests should be performed. Parameter optimization windows should be shortened to prevent overfitting.

### Optimization Directions   

The strategy can be optimized in the following aspects:

1. Add stop loss mechanisms. Set stop loss points when prices drop sharply in a day to avoid huge losses.

2. Add position sizing management. Control the capital per trade based on market volatility to limit per trade loss.

3. Optimize parameters. Test different timeframes to fit characteristics of different underlyings and market conditions. Different parameter combinations could also be evaluated.  

4. Add filtering conditions. Set filters such as trading volumes or volatility avoid getting stuck in ranging or low liquidity situations.

5. Combine with other strategies. Consider combining with other trend following strategies. This could both enhance stability and diversify risks away from a single strategy.  

### Summary  

The Momentum Alpha strategy dynamically captures momentum opportunities by judging both the risk-adjusted returns and relative market performance of assets. Compared to single momentum indicators, it has the advantages of more accurate judgments, wider applicability, and higher risk resilience. But the strategy still carries risks of drawdowns and lags. It needs continuous optimization and combination with other strategies before stable live profits can be achieved.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|180|Sharpe/Alpha/Beta Period|
|v_input_2|2|Sensitivity|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-15 00:00:00
end: 2023-11-16 04:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Alpha strategy - simple version", overlay=true)

//by NIKLAUS
//USE ON DAILY TIMEFRAME TO DETECT MOMO STOCKS & ETFs AND TRADE THEM
//USE ON 5MIN CHART FOR INTRADAY USAGE
//examples to try this on: GER30, NAS100, JPN225, AAPL, IBB, TSLA, FB, etc.

//This Strategy goes long when Sharpe Ratio is > 1 and Alpha against the S&P500 is generated. It exits when conditions break away.

//https://en.wikipedia.org/wiki/Alpha_(finance)
//------------------------------------------------------------------------------------------------------------------------------------
//Alpha is a measure of the active return on an investment, the performance of that investment compared to a suitable market index. 
//An alpha of 1% means the investment's return on investment over a selected period of time was 1% better than the market during that same period, 
//an alpha of -1 means the investment underperformed the market. 
//Alpha is one of the five key measures in modern portfolio theory: alpha, beta, standard deviation, R-squared and the Sharpe ratio.


//simplified sharpe
src = ohlc4, len = input(180, title = "Sharpe/Alpha/Beta Period")
pc = ((src - src[len])/src)
std = stdev(src,len)
stdaspercent = std/src
sharpe = pc/stdaspercent


//alpha
sym = "BTC_USDT:swap", res=timeframe.period, src2 = close
ovr = request.security(sym, res, src2)

ret = ((close - close[1])/close)
retb = ((ovr - ovr[1])/ovr)
secd = stdev(ret, len), mktd = stdev(retb, len)
Beta = correlation(ret, retb, len) * secd / mktd

ret2 = ((close - close[len])/close)
retb2 = ((ovr - ovr[len])/ovr)

alpha = ret2 - retb2*Beta
//plot(Beta, color=green, style=area, transp=40)


smatrig = input(title="Sensitivity",  defval=2, minval=1, maxval=3) 
bgcolor (sma(sharpe,len/smatrig) > 1 and sma(alpha,len/smatrig) > 0 ? green : red, transp=70)

if (close > open) and (sma(sharpe,len/smatrig) > 1) and (sma(alpha,len/smatrig) > 0)
    strategy.entry("Alpha", strategy.long)
strategy.close("Alpha", when = (sma(sharpe,len/smatrig) < 1) or (sma(alpha,len/smatrig) < 0))

```

> Detail

https://www.fmz.com/strategy/432974

> Last Modified

2023-11-23 11:34:40
