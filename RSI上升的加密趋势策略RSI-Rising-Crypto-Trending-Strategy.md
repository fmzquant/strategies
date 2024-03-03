
> Name

RSI上升的加密趋势策略RSI-Rising-Crypto-Trending-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d6d8fd92bec27a72d6.png)

[trans]

## 概述

RSI上升的加密趋势策略是一种适用于较长时间周期(如4小时或更长)的加密货币和股票市场趋势策略。

该策略利用RSI指标识别趋势的上升和下降,结合布林带和变化率指标避免交易盘整行情。根据测试,这种策略在加密货币对加密货币的交易中表现较好,而不是与法定货币交易。

## 策略原理

该策略使用以下指标:

- RSI - 识别趋势的上升和下降
- 布林带 - 识别盘整行情
- 变化率 - 识别趋势的方向

具体的交易规则如下:

**开仓规则**

多头开仓:RSI值上升且布林带和变化率指标表明不在盘整,做多
空头开仓:RSI值下降且布林带和变化率指标表明不在盘整,做空

**平仓规则** 

收到反向信号时平仓

## 优势分析

- 利用RSI指标识别趋势方向,能及时捕捉趋势的转折点
- 结合布林带识别盘整,避免错过趋势或被套牢
- 变化率指标辅助确认趋势方向,使交易信号更可靠
- 适合较长周期交易,有利于获利
- 更适合加密货币对加密货币交易,避免法定货币汇率风险

## 风险分析

- 该策略没有止损规则,存在较大风险
- 布林带和变化率参数设置不当可能导致错过机会或错误信号
- 单纯依赖技术指标,无法应对重大黑天鹅事件

需要注意加大止损幅度,调整布林带和变化率参数组合,并结合基本面分析。

## 优化方向

该策略可以从以下几个方面进一步优化:

1. 增加止损机制,设置合理的止损幅度,控制单笔损失。

2. 优化布林带和变化率指标的参数,找到最佳参数组合。可以通过回测优化。

3. 添加其他辅助指标,如MACD、KD等,实现多指标组合,提高信号准确率。

4. 开发断流动模型,在异常波动时暂停交易,避免被套。

5. 利用机器学习方法自动优化参数组合和信号权重。

6. 结合链上数据,关注交易所流动性、资金流向等参数,提高策略的适应性。

## 总结

RSI上升的加密趋势策略利用RSI指标辅以布林带和变化率指标,实现了较长时间周期内捕捉加密货币市场趋势的效果。该策略优势在于及时捕捉趋势转折,避免被套,适合追踪较长线的方向性机会。但该策略也存在无止损、参数过度依赖等问题。未来可通过止损、参数优化、多指标组合、机器学习等方法进行改进,使策略更稳健可靠。

||

## Overview

The RSI Rising Crypto Trending Strategy is a trend trading strategy designed for longer timeframes (4h+) in crypto and stock markets. 

It utilizes RSI to identify rising and falling trends combined with Bollinger Bands and ROC to avoid trading in sideways markets. From tests, it appears to work better trading crypto against crypto rather than against fiat.

## Strategy Logic

The strategy uses the following indicators:

- RSI - To identify rising/falling trends
- Bollinger Bands - To identify sideways markets  
- ROC - To confirm trend direction

The specific trading rules are:

**Entry Rules**

Long entry: RSI rising AND not sideways market per BB and ROC
Short entry: RSI falling AND not sideways market per BB and ROC

**Exit Rules**

Exit when opposite signal is triggered

## Advantage Analysis 

- Captures trend turning points early using RSI 
- Avoids getting trapped in sideways markets using BB
- ROC confirms trend direction for more robust signals
- Good for longer timeframe trades and capturing trends
- Better for crypto/crypto pairs to avoid fiat exposure

## Risk Analysis

- No stop loss so high risk of large losses
- Poor BB and ROC parameters could lead to missed trades or bad signals
- Purely technical so misses major black swan events  

Increase stop loss, optimize BB/ROC parameters, and incorporate fundamental analysis.

## Enhancement Opportunities

Some ways this strategy could be improved:

1. Add stop loss for risk management and setting maximum loss per trade.

2. Optimize BB and ROC parameters through backtesting to find best settings.

3. Incorporate additional indicators like MACD, KD for multi-indicator signal reliability. 

4. Build a liquidity model to pause trading during volatility spikes to avoid traps.

5. Use machine learning to automatically optimize parameters and signal weighting.

6. Incorporate on-chain data like exchange liquidity and fund flows for greater adaptability.

## Summary

The RSI Rising Crypto Trend Strategy captures longer timeframe crypto trends using RSI plus BB and ROC. The advantage is quickly catching trend reversals and avoiding traps. The weaknesses are no stop loss and parameter dependency. Enhancements like stop loss, optimization, machine learning can make it more robust.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2010|From Year|
|v_input_4|31|To Day|
|v_input_5|12|To Month|
|v_input_6|2021|To Year|
|v_input_7|19|periods|
|v_input_8|14|RSI Length|
|v_input_9_low|0|Source: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-16 00:00:00
end: 2023-10-16 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=4
strategy(title = "RSI Rising", overlay = true, initial_capital = 100, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, slippage=0,commission_type=strategy.commission.percent,commission_value=0.03)

/////////////////////
source          = close
bb_length       = 20
bb_mult         = 1.0
basis           = sma(source, bb_length)
dev             = bb_mult * stdev(source, bb_length)
upperx           = basis + dev
lowerx           = basis - dev
bbr             = (source - lowerx)/(upperx - lowerx)
bbr_len         = 21
bbr_std         = stdev(bbr, bbr_len)
bbr_std_thresh  = 0.1
is_sideways     = (bbr > 0.0 and bbr < 1.0) and bbr_std <= bbr_std_thresh


////////////////
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2010, title = "From Year", minval = 1970)
 //monday and session 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2021, title = "To Year", minval = 1970)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true


sourcex = close
length = 2
pcntChange = 1

roc = 100 * (sourcex - sourcex[length])/sourcex[length]
emaroc = ema(roc, length/2)
isMoving() => emaroc > (pcntChange / 2) or emaroc < (0 - (pcntChange / 2))


periods = input(19)
smooth = input(14, title="RSI Length" )
src = input(low, title="Source" )


rsiClose = rsi(ema(src, periods), smooth)
long=rising(rsiClose,2) and not is_sideways and isMoving()
short=not rising(rsiClose,2) and not is_sideways and isMoving()


if(time_cond)
    strategy.entry('long',1,when=long)
    strategy.entry('short',0,when=short)

```

> Detail

https://www.fmz.com/strategy/429506

> Last Modified

2023-10-17 17:08:31
