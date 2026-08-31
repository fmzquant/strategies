
> Name

大悦多因子量化策略The-Great-Delight-Multifactor-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1cafe222b2b52de55a4.png)


## 

### Overview  

The Great Delight multifactor quantitative strategy combines multiple technical indicators, including moving averages, the MACD, and the Ichimoku cloud, as a trend-following long-term strategy. It mainly uses the 200-day simple moving average to determine the overall trend, and additional details from the 20-day exponential moving average, the MACD index, and the Ichimoku cloud to pinpoint specific entry and exit points.  

By considering both long-term and short-term trends, as well as multiple-factor verification, this strategy can effectively filter noise trades caused by false breakouts. While pursuing high-quality opportunities, it also controls risks, making it suitable for experienced investors for medium-to-long-term holdings.  

### Strategy Principles

When the price is above the 200-day MA, the strategy believes the market is in a bull trend. As long as the 20-day MA and MACD indicators generate a buy signal at the same time, and the price is higher than the highest Ichimoku cloud price or inside the cloud, a buy signal is generated.

When the price breaks below the 200-day MA, the strategy determines a bear trend has begun. The signal requirements become stricter now: in addition to the 20-day MA and MACD buy signals, the Ichimoku cloud must also give a buy signal (green cloud or price above cloud top) before triggering a buy.  

The sell signal logic is similar but reversed: in a bull market, a candle close below the cloud bottom or cloud flip triggers sell; in a bear market, enter the red cloud or 20-day MA and MACD sell signals triggers sell.

### Advantage Analysis

The biggest advantage of this strategy lies in combining multiple long and short-term indicators to determine market situations, which can effectively filter out false signals. Specifically:  

1. The 200-day MA determines the overall trend to avoid counter-trend trades.  
2. The 20-day MA focuses on short-term dynamics to capture reversals.
3. The MACD verifies trend changes.  
4. The Ichimoku cloud double checks to prevent wrong signals.

Through multi-layer verifications, the profitability rate can be greatly improved. In addition, the coordination between long and short-term indicators also makes the strategy suitable for both short-term and mid-long term operations.

### Risk Analysis  

The main risk of this strategy is the probability of multiple indicators giving wrong signals at the same time. Although highly unlikely in extreme conditions, it can still happen over prolonged use. The main counter measures are:  

1. Adjust parameters appropriately to find the optimal combination.  
2. Strict stop losses to quickly reverse direction after wrong signals. Can consider adding stops in live trading.  
3. Use futures hedging methods to lock in profits.  
4. Adjust position sizing according to major support areas.

### Optimization Directions   

The strategy can be optimized from the following aspects:  

1. Test different parameter combinations to find the optimum.  
2. Add a stop loss module for better risk control.
3. Incorporate correlation indicators like rate of change to avoid chasing tops and bottoms.  
4. Introduce machine learning methods like neural networks to train indicator weighting.  
5. Verify robustness across different markets.  

### Conclusion  

The Great Delight strategy filters out noise through scientific combinations of indicators, enabling persistent profitability while controlling risks. By considering both long-term trends and short-term opportunities, it is widely applicable in mid-long term investments. Further performance improvements can be expected through optimizations like parameters tuning, stop loss additions, and introducing machine learning.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Conversion Line Periods|
|v_input_2|26|Base Line Periods|
|v_input_3|52|Lagging Span 2 Periods|
|v_input_4|26|Displacement|
|v_input_5|200|v_input_5|
|v_input_6|20|v_input_6|
|v_input_7|12|fastLength|
|v_input_8|26|slowlength|
|v_input_9|9|MACDLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-03 00:00:00
end: 2023-12-03 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title="MACD/EMA/SMA/Ichimoku Long Strategy",overlay=true)




// Ichimoku

conversionPeriods = input(9, minval=1, title="Conversion Line Periods"),
basePeriods = input(26, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Periods"),
displacement = input(26, minval=1, title="Displacement")

donchian(len) => avg(lowest(len), highest(len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)


p1 = plot(leadLine1, offset = displacement, color=green,
 title="Lead 1")
p2 = plot(leadLine2, offset = displacement, color=red, 
 title="Lead 2")
fill(p1, p2, color = leadLine1 > leadLine2 ? color(green,50) : color(red,50))



bottomcloud=leadLine2[displacement-1]
uppercloud=leadLine1[displacement-1]




// SMA Indicator - Are we in a Bull or Bear market according to 200 SMA?
SMA200 = sma(close, input(200))
EMA = ema(close,input(20))


//MACD Indicator - Is the MACD bullish or bearish?

fastLength = input(12)
slowlength = input(26)
MACDLength = input(9)

MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD

// Set Buy/Sell conditions

[main,signal,histo]=macd(close,fastLength,slowlength,MACDLength)

buy_entry = if ((uppercloud>bottomcloud or close>max(uppercloud,bottomcloud)) and close>EMA and (delta>0 and close>min(uppercloud,bottomcloud))) or (close<SMA200 and delta>0 and close>EMA and (uppercloud>bottomcloud or close>max(uppercloud,bottomcloud)))
    true
if close<EMA and ((delta<0 and close<min(uppercloud,bottomcloud)) or (uppercloud<bottomcloud and close>max(uppercloud,bottomcloud)))
    buy_entry = false


strategy.entry("Buy",true , when=buy_entry)
alertcondition(buy_entry, title='Long', message='Chart Bullish')


sell_entry = if ((uppercloud<bottomcloud or close<min(uppercloud,bottomcloud)) and close<EMA and (delta<0 and close<max(uppercloud,bottomcloud))) or (close>SMA200 and delta<0 and close<EMA and (uppercloud<bottomcloud or close<min(uppercloud,bottomcloud)))
    true
if close>EMA and ((delta>0 and close>max(uppercloud,bottomcloud)) or (uppercloud>bottomcloud and close<min(uppercloud,bottomcloud)))
    sell_entry = false



strategy.close("Buy",when= sell_entry)


alertcondition(sell_entry, title='Short', message='Chart Bearish')

//plot(delta, title="Delta", style=cross, color=delta>=0 ? green : red )
```

> Detail

https://www.fmz.com/strategy/434159

> Last Modified

2023-12-04 13:04:03
