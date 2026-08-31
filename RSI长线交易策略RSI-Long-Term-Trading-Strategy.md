
> Name

RSI长线交易策略RSI-Long-Term-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses the RSI indicator to determine long-term trend direction, combined with candlestick patterns and price breakouts to generate long-term trading signals. It belongs to the RSI-based long cycle tracking strategy type.

## Strategy Logic

The strategy is based on two main factors:

1. RSI Indicator

   Calculates 20-period RSI to determine overall trend direction.
   
2. Candlestick Patterns

   Judging price change over past 3 candles to confirm the trend.
   
   - Accumulated close change over 350 indicates uptrend
   - Accumulated close change below -200 indicates downtrend
   
It goes long when uptrend and RSI is above 30, and goes short when downtrend.

Overall it considers both RSI trend and candlestick patterns over longer periods to determine trends.

## Advantages  

- RSI judges long-term trend direction
- Candlestick patterns confirm the trend
- Multiple factors improve accuracy
- Longer cycle avoids over-trading
- Customizable RSI parameters and thresholds

## Risks

- RSI can lag trend changes
- Simple candlestick pattern rules
- No stop loss mechanism, good exits are critical
- Long cycles cannot react to short adjustments
- Thresholds need separate tuning for different products

Risks can be reduced by:

- Optimizing RSI parameters for best periods
- Adding other indicators like MACD for confirmation
- Adding moving or percentage stops 
- Consider additional small trades for short cycles
- Test parameters and thresholds separately for different products

## Enhancement Directions

The strategy can be improved by:

1. Testing different RSI periods for optimal parameters

   e.g. test 10, 15, 30 period RSI
   
2. Adding confirmation indicators

   e.g. require MACD golden cross for RSI uptrend
   
3. Optimizing stops

   Consider moving stops, trails123 etc.
   
4. Time-based parameter optimization

   Optimize parameters separately for different sessions
   
5. Adding short-term strategies

   Combine short-term strategies to react to temporary adjustments

## Summary

This long-term strategy uses RSI for trend direction, confirmed by candlestick patterns and breakouts, to focus on major trends while avoiding short-term noise. However, issues like RSI lag and weak stops exist. Improvements can be made via parameter optimization, adding confirmations, optimizing stops to combine short-term flexibility with long-term persistence, enabling stable long-term profitability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Max Intraday Loss(%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=2
// use with eurusd h1 , gbpusd h1
strategy("RSI Long Term", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 10)
RSI = (rsi(sum(close , 20) + sum(open ,20) , 20 ))
Sum_OF_3_Both = sum((close - open)*100000 , 3) 
Up_Move = ((close[0] - open[0])*100000) < 35



Down_Move = ((close[6] - open[6])*100000) + ((close[5] - open[5])*100000) + ((close[4] - open[4])*100000) < -400


maxIdLossPcnt = input(10, "Max Intraday Loss(%)", type=float)

// strategy.risk.max_intraday_loss(maxIdLossPcnt, strategy.percent_of_equity)
//total =  (num > 70 )

if (Sum_OF_3_Both > 350 and Up_Move )
    strategy.entry("Bar Up Buy", strategy.long)

if (Sum_OF_3_Both < -200  and Down_Move and RSI > 30.1  )
    strategy.entry("Bar Down Sell ", strategy.short)

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/427512

> Last Modified

2023-09-21 20:54:08
