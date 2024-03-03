
> Name

双CCI滤波momentum爆发交易策略Dual-CCI-Filtered-Momentum-Explosion-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该交易策略是一种基于双CCI指标、RSI指标和两条移动平均线的趋势momentum交易策略。它通过移动平均线的交叉,双CCI和RSI的共同确认来产生交易信号。

### 策略原理

- 使用8周期的EMA和26周期的SMA两条移动平均线。当短期EMA上穿长期SMA时视为看涨信号。
- 使用34周期和55周期的CCI指标。它们都大于0时认为处于看涨状态。
- 使用26周期的RSI指标。它大于48时视为处于看涨状态。  
- 买入信号:EMA 8上穿SMA 26且SMA 26的momentum>0,同时CCI 34 > 0,CCI 55 > 0,RSI 26 > 48
- 卖出信号:EMA 8下穿SMA 26且SMA 26的momentum<0,同时CCI 34 < 0,CCI 55 < 0,RSI 26 < 48

该策略使用双CCI指标和RSI指标对移动平均线交叉进行过滤,能有效避免虚假信号,增强趋势判断的可靠性。多重指标的配合使用提高了策略的稳定性。

### 优势分析

该策略最大的优势在于使用双CCI指标和RSI指标对移动平均线交叉进行多重过滤,能够有效过滤掉部分假突破和不可靠的交易信号,增强信号的可靠性。

双CCI指标参数设置不同,可以形成快慢线组合,避免被单一参数误导。RSI指标则可以判断目前市场处于超买还是超卖状态,防止在不适当的时机开仓。

多重指标配合使用,可以使策略在趋势判断和信号产生上更加可靠和稳定。

### 风险分析 

该策略主要的风险在于移动平均线交叉并不能完全避免假突破带来的风险。当市场出现剧烈波动而指标无法有效过滤时,仍可能出现误判的情况。

此外,多重指标组合虽然可以提高准确率,但也可能错过部分较强的交易机会。当市场突发大幅变化时,指标可能来不及做出反应从而错过最佳入场时机。

### 优化方向

该策略可以通过参数优化提高表现:

1. 对移动平均线周期进行优化,寻找更合适的周期参数组合

2. 对CCI和RSI的参数进行测试,找到最佳的参数范围

3. 测试不同的CCI周期搭配,寻找最匹配的快慢CCI组合

4. 对指标的区间进行优化,如CCI的超买超卖线,RSI的过冲回调线

5. 添加止损策略,以控制单笔损失

通过参数和组合的优化测试,可以使策略更稳定可靠,过滤假信号的能力更强,从而获得更好的回测结果。

### 总结

该双CCI滤波momentum爆发策略,通过双CCI指标和RSI指标的多重过滤,增强了基于移动平均线的趋势交易可靠性。使用快慢CCI组合结合RSI,可以有效判断市场买卖强度,增强策略对趋势的判断能力。多重指标配合使用提高了策略稳定性。通过优化参数设置和组合测试,可以进一步增强策略表现。总体来说,该策略集成了多种指标优势,在趋势判断和防止假突破方面具有明显优势。

||

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

[/trans]



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
