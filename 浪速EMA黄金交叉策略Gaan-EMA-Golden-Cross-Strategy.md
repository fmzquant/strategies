
> Name

浪速EMA黄金交叉策略Gaan-EMA-Golden-Cross-Strategy

> Author

ChaoZhang

> Strategy Description



### Strategy Overview

The Gaan EMA Golden Cross strategy is a quantitative trading strategy that uses dual EMA indicators for trend determination and trade signal generation. It enters long and short trades based on golden crosses between fast and slow EMAs during specific trading time periods, with stop loss exit logic, to capture short-term and medium-term price trends.

### Strategy Logic

1. Use 9-period EMA as the fast line, 27-period EMA as the medium line, and 81-period EMA as the slow line.

2. Trading time is set to 9:00 - 15:00 daily. 

3. Go long when the fast line crosses above the medium line and price is above the fast line.

4. Go short when the fast line crosses below the medium line and price is below the fast line.

5. Exit long trades with stop loss when price breaks below the fast line. 

6. Exit short trades with stop loss when price breaks above the fast line.

The key is using EMAs of different parameters to capture trends of different periods. The 9-period EMA represents short-term trend, the 27-period EMA represents medium-term trend, and the 81-period EMA represents long-term trend. Trades are generated when the short-term trend aligns with the medium-term trend.

As a trend following indicator, EMA can effectively filter out random price fluctuations and capture the real trend direction. Golden crosses of EMAs are commonly used signals for trend reversals. 

### Advantages of the Strategy

- Uses dual EMA crossovers to determine trend direction

- Different EMA parameters work together for systematical strength 

- Clear and timely golden cross signals 

- Stop loss strategy controls risks

- Optimized trading time and capital management

### Risks Involved

- EMA has lagging effect, may generate false signals

- Fixed trading time misses other opportunities 

- EMA period tuning needed to optimize results

- Frequent trading increases commission costs

### Conclusion

The Gaan EMA Golden Cross strategy is overall a well-optimized, standardized, and risk-controlled short-term trading strategy. It capitalizes on EMA crossover trading opportunities to capture price trends. The stop loss strategy also effectively limits the risk of individual trades. The strategy is easy to implement and provides a robust framework for quantitative trading.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-09-14 00:00:00
period: 2m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("gaan ema crossover", overlay=true)
t1 = true
ema9 = ema(close, 9)
ema27 = ema(close, 27)
ema81 = ema(close, 81)

long = ema27 > ema81
long2 = close > ema9

short = ema27 <ema81
short2 = close < ema9

longexit = close < ema9
shortexit = close > ema9

plot(ema9, title="9", color=#00ff00, linewidth=3)
plot(ema27, title="27", color=#11ff11, linewidth=3)
plot(ema81, title="81", color=#22ff22, linewidth=3)

if (t1==true)
    if (long==true and long2==true)
        strategy.entry("long", strategy.long)


if (t1==true)
    if (short==true and short2==true)
        strategy.entry("short", strategy.short)
        strategy.close("long", when = longexit )
        strategy.close("short", when = shortexit)

```

> Detail

https://www.fmz.com/strategy/426902

> Last Modified

2023-12-01 14:57:55
