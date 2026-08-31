
> Name

Yin-Yang-Hanging-Man-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/109c316e6432769ac1e.png)

### Overview

The Yin Yang Hanging Man strategy is a quantitative trading strategy based on the hanging man candlestick pattern. This strategy generates trading signals by identifying hanging man patterns in candlestick charts. When a hanging man pattern is identified, a buy signal is generated for a bullish hanging man, while a sell signal is generated for a bearish hanging man.

### Strategy Logic

The core identification condition of the Yin Yang Hanging Man strategy is the hanging man candlestick pattern with a small real body and long upper/lower shadows. Specifically, the identification conditions for a hanging man are:  

1. The real body size (difference between opening price and closing price) is smaller than the threshold (dojiThreshold)
2. The upper shadow size is more than twice the real body size  
3. The lower shadow size is also more than twice the real body size

When the above conditions are met, the pattern can be identified as a hanging man. Moreover, more specific types of hanging mans like bullish/bearish or long-legged can be distinguished based on the relative sizes of the upper and lower shadows. After identifying the pattern, the strategy generates trading signals on the next candlestick, i.e. buy on bullish hanging man, sell on bearish hanging man.

### Advantage Analysis  

The Yin Yang Hanging Man strategy has the following main advantages:

1. Simple and clear rules that are easy to understand and implement  
2. Hanging mans represent tussles in market force and trend reversals, capturing turning points can yield good returns
3. Can combine with factors like trend, support/resistance to filter signals and improve stability

However, there are some limitations to the strategy as well:

1. Low frequency of hanging man patterns, tends to miss trading opportunities  
2. Single indicator prone to false signals
3. Ineffective in extreme volatility and violent trend swings

### Risk Analysis   

The main risks of this strategy stem from:  

1. Risk of errors in pattern identification due to subjectivity
2. Risk from false bullish/bearish hanging signal on minor fluctuations
3. Risk in range-bound markets with difficulty profiting from patterns  
4. Risk from suboptimal parameter settings like threshold levels

Also, single indicator strategies cannot filter market noise effectively and can generate misleading signals. So the Yin Yang strategy has relatively large risks and fluctuations that necessitate robust risk management.  

### Optimization Directions   

To control risks, the strategy can be improved in the following ways:

1. Adding trade prerequisites like filters based on trend indicators or breakthrough of previous peak to confirm trend reversal   
2. Incorporating other indicators like trading volumes to gauge signal importance
3. Automated optimization of key parameters via machine learning etc
4. Mitigating losses through stop loss

With these enhancements, the risks can be reduced significantly while improving stability of the Yin Yang hanging man strategy.  

### Conclusion

To summarize, the Yin Yang Hanging Man strategy generates trade signals by identifying hanging man patterns in candlestick charts. It has the advantage of simple rules and catching reversals but also risks of false signals. The risks can be controlled through parameter tuning, adding filters etc but sensitivity to noise and fluctuations remains high. So the strategy warrants prudent application despite enhancements.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-24 00:00:00
end: 2024-01-31 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Doji Candlestick Strategy", shorttitle="Doji", overlay=true)

// Calculate body and shadow sizes
bodySize = close > open ? close - open : open - close
upperShadow = high - (open > close ? open : close)
lowerShadow = (open > close ? close : open) - low

// Define thresholds for identifying different Doji types
dojiThreshold = 0.05
longLeggedDojiThreshold = 0.02

// Buy conditions for different Doji types
dojiCondition = bodySize <= dojiThreshold and upperShadow > bodySize * 2 and lowerShadow > bodySize * 2
dragonflyDojiCondition = bodySize <= dojiThreshold and upperShadow > bodySize * 2 and lowerShadow <= bodySize * 0.5
gravestoneDojiCondition = bodySize <= dojiThreshold and upperShadow <= bodySize * 0.5 and lowerShadow > bodySize * 2
longLeggedDojiCondition = bodySize <= longLeggedDojiThreshold and upperShadow > bodySize * 2 and lowerShadow > bodySize * 2

// Buy signal
buyCondition = dojiCondition or dragonflyDojiCondition or gravestoneDojiCondition or longLeggedDojiCondition

// Strategy orders
strategy.entry("Buy", strategy.long, when=buyCondition)

// Plotting
plotshape(series=buyCondition, title="Buy Signal", color=color.green, style=shape.triangleup, location=location.belowbar, size=size.small)

```

> Detail

https://www.fmz.com/strategy/440692

> Last Modified

2024-02-01 11:09:15
