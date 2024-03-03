
> Name

基于RSI极值与SMA均线过滤的趋势跟踪策略A-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/af1ac74b0f6970576d.png)

[trans]

### 概述

本策略结合Relative Strength Index(RSI)指标的极值以及Simple Moving Average(SMA)均线的过滤,实现了对趋势的跟踪。当RSI达到超买或超卖的极值时,结合SMA均线的方向判断做多做空方向。该策略适用于美股指数、欧洲指数、亚洲指数以及黄金白银等品种,通过简单的RSI与SMA判断规则,实现了对趋势的捕捉。

### 策略原理  

1. 计算RSI指标值,设置超买阈值上限为65,超卖阈值下限为45。
2. 计算200日SMA均线,判断趋势方向。
3. 当RSI低于45(超卖)且价格高于SMA时,做多;当RSI高于65(超买)且价格低于SMA时,做空。
4. 当RSI高于75(强超买)且价格高于SMA时,平多单;当RSI低于25(强超卖)且价格低于SMA时,平空单。

该策略通过RSI的超买超卖范围判断入场时机,再结合SMA的趋势过滤,实现了对趋势的有效捕捉。RSI的极值表明价格可能反转,而SMA的方向判断确保了交易方向与趋势一致。两者结合使用,既保证了交易合理,也提高了胜率。

### 策略优势

1. 策略思路简单清晰,容易理解掌握。
2. 基于RSI和SMA两个广为人知的指标,易于操作。
3. RSI极值表明可能反转点,SMA过滤确保交易方向正确。
4. 参数设置合理,避免了过度交易。
5. 可广泛适用于股指、商品等多个品种。
6. 可在趋势中捕捉较大幅度的价格波动。

相比单一使用RSI指标,该策略增加了SMA的趋势判断,避免盲目做多做空。相比单一使用SMA系统,该策略在SMA方向的基础上,利用RSI极值进场,提高了选时的效率。整体来说,该策略集两者优点于一体,是一种非常实用的趋势跟踪策略。

### 风险及解决

1. SMA均线产生死叉时,存在趋势反转的风险。解决方法是适当缩短SMA周期,增加对趋势变化的敏感性。

2. RSI出现背离时,存在错过交易机会的风险。解决方法是结合其他指标如MACD判断异动,防止背离。 

3. 震荡行情中,RSI和SMA均可能产生错误信号。解决方法是在震荡市检测到后,暂停策略交易。

4. 参数设置不当可能导致过度交易或漏买漏卖。解决方法是优化参数,寻找最佳参数组合。

5. 单一品种测试不足以评估策略效果,需要多品种回测验证。

6. 回测不等于实盘,实盘中需控制好资金管理和风险管理。

### 优化方向

1. 优化RSI参数,寻找不同品种的最佳RSI周期参数。

2. 优化SMA周期参数,集成多组SMA均线。

3. 增加止损机制,提高风险控制能力。 

4. 增加其他指标判断,实现多因子验证。

5. 结合波动率指标,改进入场节奏。

6. 开发参数自适应系统,实现动态参数优化。

7. 测试不同资金管理方式,找出最优资金管理。

8. 根据不同市场条件创建交易策略集,实现策略集成。

### 总结

该RSI极值与SMA过滤策略,集两者之长,通过简单的指标判断实现了趋势跟踪。策略思路清晰易懂,参数设置合理,可广泛适用于多种品种。相比单一RSI和SMA策略,该策略显著提高了选时效率和胜率。但策略也存在一定改进空间,可通过参数优化、止损机制等方法进一步增强策略的稳健性和适应性。总体来说,该策略为趋势交易者提供了一个非常实用和有效的交易工具。

|| 

### Overview

This strategy combines the extremes of the Relative Strength Index (RSI) indicator and the filtering of the Simple Moving Average (SMA) to track trends. When the RSI reaches extreme overbought or oversold levels, long and short directions are determined based on the SMA direction. The strategy is suitable for US stock indexes, European indexes, Asian indexes, gold, silver and other varieties. Through simple RSI and SMA rules, it effectively captures trends. 

### Strategy Logic

1. Calculate the RSI indicator value, set the overbought threshold upper limit to 65, and the oversold threshold lower limit to 45.

2. Calculate the 200-day SMA to determine the trend direction. 

3. When RSI is below 45 (oversold) and price is above SMA, go long; when RSI is above 65 (overbought) and price is below SMA, go short.

4. When RSI is above 75 (strongly overbought) and price is above SMA, close long positions; when RSI is below 25 (strongly oversold) and price is below SMA, close short positions.

The strategy captures trends effectively by using RSI extremes to time entries and SMA direction for filtering. RSI extremes indicate potential reversals, while SMA direction ensures trades align with the trend. Together, they ensure reasonable trades and higher win rates.

### Advantages

1. Simple and clear strategy logic, easy to understand and master. 

2. Based on well-known RSI and SMA indicators, easy to implement.

3. RSI extremes indicate potential reversal points, SMA filters ensure directional correctness. 

4. Reasonable parameter settings avoid excessive trading.

5. Applicable to multiple products like indexes and commodities. 

6. Captures significant price swings during trends.

Compared to RSI alone, the strategy adds SMA trend filter to avoid blind long/short. Compared to SMA systems alone, the strategy improves timing efficiency by using RSI extremes. Overall, it combines the strengths of both for a practical trend following strategy.

### Risks and Solutions

1. SMA death cross poses trend reversal risks. Use shorter SMA periods for increased sensitivity.

2. RSI divergences risk missing trades. Add other indicators like MACD to detect anomalies.

3. Both RSI and SMA may generate false signals during ranging markets. Pause trading when range-bound market detected.

4. Improper parameter settings lead to overtrading or missed trades. Optimize parameters to find best combination.

5. Single product backtest insufficient to evaluate strategy. Validate across multiple products. 

6. Backtest ≠ live trading. Manage risk and capital in live trading.

### Improvement Directions

1. Optimize RSI periods for different products.

2. Optimize SMA periods, integrate multiple SMAs. 

3. Add stop loss for better risk control.

4. Add other indicators for multi-factor confirmation.

5. Improve entry timing with volatility indicators. 

6. Develop adaptive parameter system for dynamic optimization.

7. Test different capital management approaches for optimum.

8. Create strategy ensemble for different market conditions.

### Conclusion

The RSI extremes with SMA filter strategy combines the strengths of both for effective trend following. The logic is clear and parameters solid. It works across multiple products to significantly improve timing efficiency and win rate compared to RSI or SMA systems alone. There is room for improvements like parameter optimization and stop loss to further enhance robustness and adaptiveness. Overall, it provides trend traders with a very useful and effective tool.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|RSI lenght|
|v_input_int_2|200|  SMA Lenght|
|v_input_float_1|5| stop loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-23 00:00:00
end: 2023-10-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This work is licensed under a Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) https://creativecommons.org/licenses/by-nc-sa/4.0/
// © wielkieef

//@version=5

strategy('Relative Strength Index Extremes with 200-Day Moving Average Filte', overlay=true, pyramiding=1, initial_capital=10000, default_qty_type=strategy.cash, default_qty_value=36000, calc_on_order_fills=false, slippage=0, commission_type=strategy.commission.percent, commission_value=0.01)

// Rsi
rsi_lenght = input.int(14, title='RSI lenght', minval=0)
rsi_up = ta.rma(math.max(ta.change(close), 0), rsi_lenght)
rsi_down = ta.rma(-math.min(ta.change(close), 0), rsi_lenght)
rsi_value = rsi_down == 0 ? 100 : rsi_up == 0 ? 0 : 100 - 100 / (1 + rsi_up / rsi_down)


//Sma
Length1 = input.int(200, title='  SMA Lenght', minval=1)
SMA1 = ta.sma(close, Length1)

//Strategy Logic
Long = rsi_value < 45 and close > SMA1
Long_exit = rsi_value > 75 and close > SMA1

Short = rsi_value > 65 and close < SMA1
Short_exit = rsi_value < 25 and close < SMA1


if Long
    strategy.entry('Long', strategy.long)

if Short
    strategy.entry('Short', strategy.short)

strategy.close_all(Long_exit or Short_exit)

pera(pcnt) =>
    strategy.position_size != 0 ? math.round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)
stoploss = input.float(title=' stop loss', defval=5, minval=0.5)
los = pera(stoploss)

strategy.exit('SL', loss=los)



//by wielkieef


```

> Detail

https://www.fmz.com/strategy/430044

> Last Modified

2023-10-24 14:47:38
