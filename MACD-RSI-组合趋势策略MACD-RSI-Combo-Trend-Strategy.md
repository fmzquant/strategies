
> Name

MACD-RSI-组合趋势策略MACD-RSI-Combo-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略融合MACD和RSI指标,判断趋势方向和超买超卖情况,实现趋势跟踪交易。当MACD线穿越零轴且RSI线超出超买超卖区时,进行做多或做空。

## 策略原理

主要逻辑:

- 计算MACD线和信号线(MACD的EMA)

- Delta为二者差值,表达价格动量变化

- RSI以判断超买超卖状态 

- 当Delta上穿零轴且RSI超买(默认70)时做多

- 当Delta下穿零轴且RSI超卖(默认30)时做空

MACD判断价格动量方向,RSI判断超买超卖状态,二者组合可过滤掉许多假信号。

## 策略优势

- 融合两种指标过滤信号

- MACD判断价格动量,RSI判断超买超卖

- 可配置参数,适用于不同市场环境

- 清晰的趋势交易策略思路

## 策略风险

- 单一指标组合,效果可能有限

- 没有止损,无法控制单笔损失

- 未考虑打开仓位的大小

对策:

- 测试其他指标配合,寻找最佳组合

- 增加移动止损或硬止损

- 根据资金规模或波动率设定仓位

## 策略优化方向

- 测试MACD与其他指标组合

- 优化参数,提高稳定性

- 根据趋势 filtr信号,避免假突破

- 采用渐进止损,保护利润

- 利用机器学习判断信号质量

## 总结

该策略集成MACD和RSI指标判断趋势,思路清晰可靠。可通过参数优化、止损策略、智能过滤等方法提升稳定性。它提供了一个行之有效的趋势交易模型,值得进一步扩展与改进。

|| 

## Overview

This strategy combines the MACD and RSI indicators to determine trend direction and overbought/oversold levels for trend trading. It goes long/short when MACD crosses zero line and RSI is beyond overbought/oversold thresholds.

## Strategy Logic

Main logic:

- Calculate MACD line and Signal line (EMA of MACD) 

- Delta is their difference, expressing price momentum change

- RSI to gauge overbought/oversold conditions

- Go long when Delta crosses above zero line and RSI overbought (default 70) 

- Go short when Delta crosses below zero line and RSI oversold (default 30)

MACD for momentum direction, RSI for overbought/sold - combo filters many false signals.

## Advantages

- Combines two indicators for filtered signals 

- MACD measures momentum, RSI measures overbought/sold

- Configurable parameters for different markets

- Clear trend trading strategy rationale 

## Risks

- Limited effectiveness from single indicator combo 

- No stop loss, unable to control loss per trade

- Does not consider position sizing 

Mitigations:

- Test other indicators, find optimal combinations

- Add trailing or hard stop loss

- Position size based on account size or volatility 

## Enhancement Opportunities

- Test MACD with other indicator combos

- Optimize parameters for stability 

- Filter signals by trend to avoid false breakouts

- Use trailing stop loss to protect profits

- ML to judge signal quality

## Conclusion

This strategy combines MACD and RSI for solid trend determination. Stability can be improved through parameter optimization, stop loss, intelligent filters etc. It provides an effective trend trading framework for further enhancements.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|fastLength|
|v_input_2|26|slowlength|
|v_input_3|9|MACDLength|
|v_input_4|14|length_rsi|
|v_input_5|30|overSold|
|v_input_6|70|overBought|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 6h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("MACD RSI Strategy", overlay=true)

fastLength = input(12)
slowlength = input(26)
MACDLength = input(9)

MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD

// RSI



length_rsi = input( 14 )
overSold = input( 30 )
overBought = input( 70 )
price = close

vrsi = rsi(price, length_rsi)

//

if (not na(vrsi))
    if (crossover(delta, 0) and crossover(vrsi, overBought ))
        strategy.entry("MacdLE", strategy.long, comment="LE")
    if (crossunder(delta, 0) and crossunder(vrsi, overSold))
        strategy.entry("MacdSE", strategy.short, comment="SE")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)


```

> Detail

https://www.fmz.com/strategy/427483

> Last Modified

2023-09-21 15:40:02
