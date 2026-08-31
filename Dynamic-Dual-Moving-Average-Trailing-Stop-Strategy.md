
> Name

Dynamic-Dual-Moving-Average-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1857b4e7e220fffcee2.png)

## Overview

This is a dynamic trailing stop strategy based on dual EMA lines. It uses 9-day and 20-day EMAs to determine market trend direction, combined with RSI indicator to filter false breaks. It also uses ATR indicator to calculate dynamic stop loss and take profit levels. This strategy is suitable for medium to long term holdings.

## Strategy Logic

The strategy uses 9-day EMA as the short term line and 20-day EMA as the medium term line to determine price trend. It goes long when price crosses above the short term line and closing price is higher than previous day's high, with RSI lower than 70 and close higher than 20-day EMA minus 1 ATR. It goes short when price crosses below the short term line and closing price is lower than previous day's low, with RSI higher than 30 and close higher than 20-day EMA minus 1 ATR.

The stop loss is set at closing price minus 1.5 times ATR. Take profit is set at closing price plus ATR multiplied by a take profit coefficient. It also uses 2 times ATR to set trend trailing stop loss.

## Advantage Analysis

1. Using dual EMAs to determine major market trend, avoids being pressured by noise  
2. Combining RSI indicator to filter false breaks, improves entry accuracy
3. Dynamic stop loss and take profit adapts to market volatility  
4. Trend trailing stop loss maximizes profits

## Risk Analysis  

1. EMA lines have lagging effect, may miss short term opportunities
2. Improper RSI parameter setting may miss entries
3. Improper stop loss/take profit ratio may be too loose or strict  
4. Stop loss may be penetrated during violent market swings

## Optimization Directions

1. Test different EMA combinations to find optimal parameters
2. Optimize RSI parameters to balance entry accuracy and catching opportunities 
3. Test different stop loss/take profit ratios to find optimal configuration  
4. Add more filter conditions to reduce stop loss penetration probability  

## Summary

Overall this is a relatively stable medium to long term holding strategy. It uses dual EMAs to determine major market trend, avoiding being affected by short term noise. The addition of RSI also filters false breaks to some extent. Moreover, the dynamic stop loss/take profit mechanism allows the strategy to adjust based on market volatility. However, there are still risks like lagging of moving averages and potential of stop loss penetration. We need to find the optimum configuration through parameter tuning and optimization during practical application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Take Profit Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("CJTrade", overlay=true)

short = ema(close, 9)
medium = ema(close, 20)
long = ema(close, 50)
very_long = ema(close, 200)

plot(short, color=color.gray, linewidth=1)
plot(medium, color=color.red, linewidth=1)
plot(long, color=color.black, linewidth=1)
plot(very_long, color=color.blue, linewidth=1)

rsiValue = rsi(close, 14)

near20EMA = close > medium - atr(14)

longCond = crossover(close[1], short) and close >= high[1] and rsiValue < 70 and near20EMA
shortCond = crossunder(close[1], short) and close <= low[1] and rsiValue > 30 and near20EMA

strategy.entry("Long", strategy.long, when=longCond)
strategy.entry("Short", strategy.short, when=shortCond)

atrValue = atr(14)
stopLossLevel = close - atrValue * 1.5

// Dynamic take profit level based on ATR
takeProfitMultiplier = input(2, title="Take Profit Multiplier", minval=0.1, maxval=10, step=0.1)
takeProfitLevel = close + atrValue * takeProfitMultiplier

// Trailing stop loss for long positions
longTrailingStop = close - atrValue * 2
strategy.exit("LongTrailingStop", from_entry="Long", loss=longTrailingStop)

// Trailing stop loss for short positions
shortTrailingStop = close + atrValue * 2
strategy.exit("ShortTrailingStop", from_entry="Short", loss=shortTrailingStop)

strategy.exit("Take Profit/Stop Loss", from_entry="Long", loss=stopLossLevel, profit=takeProfitLevel)
strategy.exit("Take Profit/Stop Loss", from_entry="Short", loss=stopLossLevel, profit=takeProfitLevel)

```

> Detail

https://www.fmz.com/strategy/442816

> Last Modified

2024-02-26 11:13:17
