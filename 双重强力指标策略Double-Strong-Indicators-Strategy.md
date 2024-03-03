
> Name

双重强力指标策略Double-Strong-Indicators-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f34fda5b45509d9f7c.png)
[trans]

### 概述

本策略综合运用移动平均线聚散指标(MACD)和相对强弱指数(RSI)两个强力指标,设定买入和卖出条件,以捕捉股价的反转机会。

### 策略原理

1. 计算MACD指标,包括快线、慢线和信号线。快线和慢线交叉为买卖信号。

2. 计算RSI指标,设置超买区和超卖区阈值。RSI指标可以判断超买超卖情况。

3. 结合MACD指标的金叉死叉信号和RSI指标的超买超卖区判断,制定买入和卖出条件:

 - 买入条件:MACD快线上穿慢线形成金叉,同时RSI指标刚刚从超卖区回落,具有反转信号;

 - 卖出条件:MACD快线下穿慢线形成死叉,同时RSI指标进入超买区,具有反转信号。

4. 这样可以同时利用两个强力指标的优势,在反转点位精确买入卖出。

### 优势分析

1. MACD指标可以判断股价趋势和买卖时机。RSI指标可以判断超买超卖情况。两者结合可以提高买卖精准度。

2. 同时利用两个指标过滤信号,可以避免因单一指标产生的假信号。

3. MACD结合RSI,可以在反转点前买入,反转点后卖出,捕捉反转机会。

4. 该策略操作频率适中,既可以跟踪趋势,也可以捕捉反转,灵活运用。

### 风险分析

1. MACD指标在震荡行情中容易产生假信号。RSI指标参数设置需要优化,否则也会出现假信号。

2. 股价短期内可能存在剧烈波动,跌破策略的止损点造成损失。

3. 需要优化RSI和MACD的参数设置,否则可能出现过多信号或信号不足。

4. 实盘交易中需要严格把控资金管理和风险控制。

### 优化方向

1. 优化MACD参数的快慢均线设置,寻找最佳的参数组合。

2. 优化RSI的超买超卖阈值,防止假信号的产生。

3. 加入止损机制,以控制单笔损失。

4. 可以考虑加入其他指标,如布林带、KDJ等,形成多重过滤。

5. 可以测试不同的买卖策略,如突破策略、趋势跟踪策略等。

### 总结

本策略同时运用MACD和RSI两个强力指标,在反转点买入卖出,具有较强的实战价值。但需要持续优化参数设置,严格做好资金管理,才能在实盘中取得好的效果。该策略整体较为灵活,可适应不同行情,值得实盘验证与长期跟踪。

|| 

## Overview

This strategy combines the Moving Average Convergence Divergence (MACD) indicator and the Relative Strength Index (RSI) indicator to set buy and sell conditions for catching reversal opportunities.  

### Strategy Logic

1. Calculate the MACD indicator, including the fast line, slow line and signal line. Crossovers between the fast line and slow line are trading signals.

2. Calculate the RSI indicator and set overbought and oversold threshold values. The RSI indicator can determine overbought and oversold conditions.

3. Combine the crossover signals from the MACD and the overbought/oversold readings from the RSI to formulate the buy and sell conditions:

    - Buy condition: The MACD fast line crosses above the slow line (golden cross) while the RSI indicator just fell back from the overbought zone, signaling a reversal.

    - Sell condition: The MACD fast line crosses below the slow line (death cross) while the RSI indicator enters the overbought zone, signaling a reversal.
    
4. This allows utilizing the strengths of both powerful indicators to accurately buy and sell at reversal points.

### Advantage Analysis 

1. MACD can identify trends and trading opportunities. RSI gauges overbought/oversold conditions. Using both improves accuracy.

2. Using two indicators filters out false signals that can occur with a single indicator. 

3. MACD combined with RSI allows buying before reversals and selling after reversals to capture turns.

4. The strategy has a moderate frequency, tracking trends and catching reversals flexibly.

### Risk Analysis

1. MACD can give false signals in choppy markets. RSI parameters need optimization to avoid false signals.

2. Short-term volatility may stop out positions, causing losses.

3. RSI and MACD parameters need optimization to avoid too many or too few signals. 

4. Strict risk and money management are crucial for live trading.

### Optimization Directions

1. Optimize MACD fast/slow line parameters for best combinations.

2. Optimize RSI overbought/oversold thresholds to prevent false signals. 

3. Add a stop loss to control single trade risk.

4. Consider adding filters like Bollinger Bands or KDJ for extra confirmation.

5. Test various entry/exit strategies like breakouts or trend following.

### Summary

This strategy combines the strengths of MACD and RSI for reversals. But parameter tuning, risk control and money management are key for live performance. The flexibility makes it suitable for different market conditions and worth live testing and tracking.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|12|Fast moving average|
|v_input_int_2|26|Slow moving average|
|v_input_int_3|9|signalLength|
|v_input_int_4|35|RSIOverSold|
|v_input_int_5|80|RSIOverBought|
|v_input_int_6|14|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-13 00:00:00
end: 2023-11-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// © sabirt
strategy(title='MACD and RSI', overlay=true, shorttitle='MACD&RSI')
//MACD Settings
fastMA = input.int(title='Fast moving average', defval=12, minval=1)
slowMA = input.int(title='Slow moving average', defval=26, minval=1)
signalLength = input.int(9, minval=1)

//RSI settings
RSIOverSold = input.int(35, minval=1)
RSIOverBought = input.int(80, minval=1)
src = close
len = input.int(14, minval=1, title='Length')
up = ta.rma(math.max(ta.change(src), 0), len)
down = ta.rma(-math.min(ta.change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - 100 / (1 + up / down)
wasOversold = rsi[0] <= RSIOverSold or rsi[1] <= RSIOverSold or rsi[2] <= RSIOverSold or rsi[3] <= RSIOverSold or rsi[4] <= RSIOverSold or rsi[5] <= RSIOverSold
wasOverbought = rsi[0] >= RSIOverBought or rsi[1] >= RSIOverBought or rsi[2] >= RSIOverBought or rsi[3] >= RSIOverBought or rsi[4] >= RSIOverBought or rsi[5] >= RSIOverBought



[currMacd, _, _] = ta.macd(close[0], fastMA, slowMA, signalLength)
[prevMacd, _, _] = ta.macd(close[1], fastMA, slowMA, signalLength)
signal = ta.ema(currMacd, signalLength)

avg_1 = math.avg(currMacd, signal)
crossoverBear = ta.cross(currMacd, signal) and currMacd < signal ? avg_1 : na
avg_2 = math.avg(currMacd, signal)
crossoverBull = ta.cross(currMacd, signal) and currMacd > signal ? avg_2 : na

strategy.entry('buy', strategy.long, when=crossoverBull and wasOversold)
strategy.close('buy', when=crossoverBear and wasOverbought)


```

> Detail

https://www.fmz.com/strategy/432657

> Last Modified

2023-11-20 09:47:41
