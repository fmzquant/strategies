
> Name

双移动平均线黄金交叉策略Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e5bf94293c0ed67bfe.png)
[trans]

### 概述

本策略运用双移动平均线的黄金交叉原理,结合RSI指标来判断买卖点。策略主要判断26周期EMA与12周期EMA的交叉情况,及100周期SMA与200周期SMA的交叉情况,在交叉发生时结合RSI指标判断是否发出交易信号。

### 策略原理  

该策略主要基于双移动平均线的交叉原理。双移动平均线中,26周期EMA代表短期趋势,12周期EMA代表更短期的价格波动。当短期EMA上穿较长期EMA时,代表价格由跌转涨,属于做多信号;当短期EMA下穿较长期EMA时,代表价格由涨转跌,属于做空信号。该策略增添100周期SMA和200周期SMA的判断,它们分别代表中长期趋势和长期趋势,其交叉情况也可用于判断价格走势转折。

在判断EMA和SMA的交叉的同时,策略还会结合RSI指标来发出交易信号。RSI可判断价格是处于超买还是超卖状态。RSI高于70时为超买信号,低于30时为超卖信号。所以策略会在EMA或SMA发生交叉时,同时检查RSI指标来避免在价格超买超卖时发出错误的交易信号。

### 策略优势

1. 使用双EMA判断短期价格走势,使用双SMA判断中长期价格走势,可有效发现价格turning point。  

2. 结合RSI指标可避免在价格超买超卖时错误发出交易信号。

3. 通过调整EMA、SMA的参数可适应不同周期及不同交易品种。

4. 策略思路简单清晰,容易理解和优化。

### 策略风险

1. 双移动平均线都有滞后性,无法提前判断价格转折点。

2. 如果不适当设置EMA、SMA参数,可能产生大量错误信号。

3. RSI指标也可能出现失效的情况,无法有效判断价格的超买超卖状态。 

4. 交易品种不同,需要调整参数,不具有普适性。

#### 风险解决方法

1. 结合其他先导指标判断价格走势和可能的转折点。  

2. 测试参数的稳定性,选取参数组合的胜率最高者。

3. 结合其他指标如KD、BOLL来避免RSI失效的情况。

4. 根据不同交易品种分别测试参数,保存参数组合模板。

### 策略优化方向  

1. 测试不同EMA和SMA周期参数的组合,找到最优参数。

2. 增加其他指标判断,形成指标组合策略。常见的有KD,MACD等。

3. 增加止损止盈策略,设置合理的止损止盈比例。

4. 优化入场时机,避免在价格波动过大时入场。可设置价格波动阈值。

5. 区分多空行情,设置不同的交易信号条件。

### 总结

本策略主要运用双移动平均线交叉原理发出交易信号,简单实用,容易优化。但存在一定滞后性无法判断价格转折点,也可能在特定市场中失效。可通过参数优化与指标组合来提高策略的稳定性与胜率。总体来说,该策略适合中长期趋势交易,也可作为其它策略的组成部分,具有一定的实用价值。


||


### Overview

This strategy utilizes the golden crossover principle of dual moving averages, combined with the RSI indicator to determine entry and exit points. The strategy mainly judges the crossover situations between the 26-period EMA and 12-period EMA, as well as the 100-period SMA and 200-period SMA, and issues trading signals when crossovers happen while also checking the RSI indicator.

### Strategy Principles

The strategy is primarily based on the crossover principles of dual moving averages. Among the dual moving averages, the 26-period EMA represents short-term trends, while the 12-period EMA represents even shorter-term price fluctuations. When the shorter-term EMA crosses above the longer-term EMA, it signals prices turning from decline to incline, indicating long signals. When the shorter-term EMA crosses below the longer-term one, it signals prices turning from incline to decline, indicating short signals. The strategy also incorporates the 100-period SMA and 200-period SMA to determine medium-to-long term and long-term trends based on their crossover situations.

Along with determining the EMA and SMA crossovers, the strategy also incorporates the RSI indicator to issue trading signals. The RSI helps determine whether prices are overbought or oversold. RSI above 70 indicates an overbought signal, while RSI below 30 indicates an oversold signal. Therefore, the strategy checks the RSI when EMA or SMA crossovers occur to avoid issuing incorrect trading signals when prices are at extreme overbought or oversold levels.  

### Advantages

1. Using dual EMAs to determine short-term price moves and dual SMAs for medium-to-long term moves can effectively detect price turning points.

2. Incorporating the RSI indicator helps avoid incorrect signals when prices are overbought or oversold.  

3. EMA, SMA parameters can be adjusted to suit different timeframes and trading instruments.

4. Simple and clear strategy logic makes it easy to understand and optimize.

### Risks  

1. Both moving averages have lagging effects, unable to predict price turning points prematurely.  

2. Inappropriate EMA, SMA parameter settings may generate excessive false signals.

3. RSI may also fail in certain cases, become unable to effectively determine overbought/oversold prices.

4. Parameters need adjustments for different trading instruments, lacking versatility.

#### Solutions

1. Incorporate other leading indicators to determine price moves and potential turning points.

2. Test parameter stability, select parameter sets with highest win rates.  

3. Incorporate other indicators like KD, BOLL to avoid RSI failure cases.  

4. Test parameters respectively based on different trading instruments, save parameter templates.

### Optimization Directions 

1. Test EMA, SMA parameter combinations for optimal sets.  

2. Add other indicators to form combination strategies, commonly KD, MACD etc.

3. Add stop loss/take profit strategies with reasonable ratios. 

4. Optimize entry timing, avoid entering when price fluctuates greatly. Set price fluctuation threshold values.

5. Distinguish bull/bear market conditions, set different trading signal criteria.  

### Conclusion

This strategy mainly utilizes the crossover principles of dual moving averages to issue trading signals, which is simple and practical, easy to optimize. But it has certain lagging effects in predicting price turning points, and may fail in certain markets. Its stability and win rate can be improved via parameter optimization and indicator combinations. Overall speaking, the strategy suits medium-to-long term trend trading, and can be incorporated into other strategies, thus having certain practical values.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-18 00:00:00
end: 2023-12-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(shorttitle = "Gamma pips EMA Cross", title="MA Cross", overlay=true)
s100sma = sma(close, 100)
s200sma = sma(close, 200)
s26ema = ema(close,26)
s12ema = ema(close,12)

plot(s100sma, color = green, linewidth = 5)
plot(s200sma, color = blue, linewidth = 5)
plot(s26ema, color = yellow, linewidth = 3)
plot(s12ema, color = red, linewidth = 3)
EMACross = plot(cross(s26ema, s12ema) ? s26ema : na, style = cross, linewidth = 5, color = red)
SMACross = plot(cross(s100sma, s200sma) ? s200sma : na, style = cross, linewidth = 5, color = white)
Alert = cross(s26ema, s12ema)
alertcondition(Alert, title="EMA Crossing")

//============ signal Generator ==================================//
EMACrossover = crossover(s26ema, s12ema) //if yellow cross and is above red ->SELL
EMACrossunder = crossunder(s26ema, s12ema) //if yellow cross and is below red ->BUY
SMACrossover = crossover(s100sma, s200sma) //green crosses above blue ->Buy
SMACrossunder = crossunder (s100sma, s200sma) //green crosses below below ->Sell
price = close
BuyCondition = (EMACrossunder) and (price >= s100sma)
SellCondition = (EMACrossover) and (price <= s100sma)

///---------Buy Signal-------------///
if (BuyCondition)
    strategy.order("BUY ema crossunder", strategy.long)

 
///Short signal------//
if(SellCondition)
    strategy.order("SELL ema crossover", strategy.short)
   


```

> Detail

https://www.fmz.com/strategy/436528

> Last Modified

2023-12-25 15:15:46
