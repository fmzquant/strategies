
> Name

双CCI滤波momentum爆发交易策略Dual-CCI-Filtered-Momentum-Explosion-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


### Overview

This trading strategy is a trend momentum trading strategy based on two CCIs, an RSI and two moving averages. It generates trading signals by crossovers of the moving averages confirmed by the agreement of the two CCIs and RSI.

### Strategy Logic

- Use an 8-period EMA and 26-period SMA. When the short term EMA crosses above the long term SMA, it is a bullish signal.

- Use 34 and 55-period CCI indicators. When they are both greater than 0, it indicates a bullish state.  

- Use a 26-period RSI indicator. When it is greater than 48, it is considered a bullish state.

- Buy signal: EMA 8 crosses above SMA 26 and SMA 26 momentum > 0, CCI 34 > 0, CCI 55 > 0, RSI 26 > 48

- Sell signal: EMA 8 crosses below SMA 26 and SMA 26 momentum < 0, CCI 34 < 0, CCI 55 < 0, RSI 26 < 48

The strategy filters moving average crossovers using dual CCIs and RSI, which can effectively avoid false signals and enhance trend reliability. The combination of multiple indicators improves the strategy's stability.

### Advantage Analysis

The biggest advantage of this strategy is using dual CCI and RSI indicators to filter moving average crossovers, which can effectively filter out some false breakouts and unreliable trading signals, enhancing signal reliability.

The dual CCIs with different parameters form a fast and slow combination, avoiding being misled by a single parameter. The RSI can judge if the market is overbought or oversold, preventing opening positions at inappropriate times.

The combination of multiple indicators can make the strategy more reliable and stable in trend judgment and signal generation.

### Risk Analysis

The main risk of this strategy is that moving average crossovers cannot completely avoid the risk of false breakouts. When the market fluctuates violently and the indicators fail to filter effectively, misjudgements may still occur.

In addition, although the combination of multiple indicators can improve accuracy, it may also miss some strong trading opportunities. When the market changes drastically, the indicators may not be able to react in time and thus miss the best entry timing.

### Optimization Directions 

This strategy can be improved through parameter optimization:

1. Optimize the periods of moving averages to find more suitable combinations.

2. Test the parameters of CCIs and RSI to determine the optimal parameter range. 

3. Test different combinations of CCI periods to find the best fast and slow pairing.

4. Optimize the threshold levels of indicators, like the overbought/oversold lines of CCIs and the overextension/pullback lines of RSI.

5. Add stop loss strategies to control single trade loss.

Through parameter and combination optimization tests, the strategy can become more stable and reliable, with stronger abilities of filtering false signals, thus leading to better backtesting results.

### Summary

This dual CCI filtered momentum explosion strategy enhances the reliability of trend trading based on moving averages by using dual CCI and RSI indicators for multi-level filtering. Using fast and slow CCI combos combined with RSI can effectively determine the buying/selling strength in the market and improve the strategy's trend judgment. The combination of multiple indicators improves strategy stability. Further enhancement can be achieved by optimizing parameters and combinations. Overall, this strategy integrates the advantages of multiple indicators and has significant edge in trend judgment and preventing false breakouts.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-01 00:00:00
end: 2023-10-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © capam
//BUY
//EMA 8 crosses upward SMA 26.
//CCI 34 periods > 0
//CCI 55 periods > 0
//RSI 26 > 48.
//Sell
//EMA 8 crosses downward SMA 26.
//CCI 34 periods < 0
//CCI 55 periods < 0
//RSI 26 < 48.
//@version=4
strategy("Momentum Explosion 2CCI RSI", overlay=true)
ema8 = ema(close,8)
sma26 = sma(close,26)
cci34 = cci(close,34)
cci55 = cci(close,55)
rsi26 = rsi(close,26)
//plot(ema8)
//plot(sma26)
//plot(cci34,color=color.green)
//plot(cci55,color=color.orange)
//plot(rsi26,color=color.red)
longCondition = crossover(ema8, sma26) and mom(sma26,5)>0 and cci34>0 and cci55>0 and rsi26>48
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = crossunder(ema8, sma26) and mom(sma26,5)<0 and cci34<0 and cci55<0 and rsi26<48
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
```

> Detail

https://www.fmz.com/strategy/428696

> Last Modified

2023-10-08 14:10:41
