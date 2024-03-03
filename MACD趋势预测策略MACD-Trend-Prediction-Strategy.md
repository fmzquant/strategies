
> Name

MACD趋势预测策略MACD-Trend-Prediction-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10073ca1f3c24d29565.png)
[trans]


## 概述

MACD趋势预测策略是一种基于MACD指标和EMA指标的趋势跟随策略。该策略不像传统的MACD策略那样通过信号线的交叉生成交易信号,而是通过MACD指标线和信号线之间距离的变化来产生交易信号,以捕捉趋势的变化。

## 策略原理

1. 计算快线DEMAfast: 通过EMA方法计算快线的两次EMA均值MMEfast,然后根据公式DEMAfast=((2 * MMEfast) - MMEfastb)计算快线DEMAfast。

2. 计算慢线DEMAslow: 通过EMA方法计算慢线的两次EMA均值MMEslow,然后根据公式DEMAslow=((2 * MMEslow) - MMEslowb)计算慢线DEMAslow。

3. 计算MACD线: MACD线是快线DEMAfast减去慢线DEMAslow的差值LigneMACDZeroLag。

4. 计算信号线: 通过EMA方法计算MACD线的两次EMA均值MMEsignal,然后根据公式信号线Lignesignal=((2 * MMEsignal) - MMEsignalb)。 

5. 比较MACD线和信号线: 当MACD线大于信号线时产生买入信号;当MACD线小于信号线时产生卖出信号。

6. 以上计算使用的是DEMA算法,可以有效减少MACD指标的滞后。

## 策略优势

1. 使用DEMA算法,可以减少MACD指标的滞后,使得交易信号更加灵敏。

2. 不依赖MACD指标的交叉信号,而是通过MACD和信号线距离变化来捕捉趋势变化,可以更早进入趋势。

3. 该策略对趋势的判断准确,profit factor可以达到1.6-3.5,收益表现较好。

4. 策略逻辑简单清晰,容易理解实现,适合用于量化交易。

## 策略风险

1. MACD作为滞后指标,在盘整行情中可能产生大量无效交易信号。

2. DEMA算法虽可减少滞后但无法完全消除,仍存在一定滞后。

3. 作为趋势跟随策略,在震荡行情下收益可能不佳。

4. 需要优化参数sma,lma,tsp等值,以适应不同周期和品种。

5. 可能需要添加止损策略控制亏损。

## 策略优化方向 

1. 优化sma,lma,tsp参数以适应不同周期和交易品种。

2. 添加类似ATR的动态止损策略,以控制每单亏损。

3. 结合趋势判断指标,避免在震荡行情中交易。

4. 添加交易量控制,根据市场波动程度调整仓位。

5. 优化入场和出场逻辑,细化交易信号规则。

## 总结

MACD趋势预测策略通过改进MACD指标的计算方法,使用DEMA算法来减少滞后,并采用MACD和信号线距离变化判断趋势,作为趋势跟随策略,可以有效捕捉趋势变化, profit factor可达1.6-3.5,具有一定的优势。但仍需要进一步优化参数设置、止损策略、过滤震荡行情等,以适应更多市场环境,将是该策略的发展方向。

||

## Overview

The MACD Trend Prediction Strategy is a trend following strategy based on the MACD indicator and EMA indicator. Unlike traditional MACD strategies that generate trading signals by crossing signal lines, this strategy generates trading signals by changes in the distance between the MACD line and signal line to capture trend changes.

## Strategy Logic

1. Calculate fast line DEMAfast: Calculate two EMA values of the fast line MMEfast, and calculate the fast line DEMAfast according to the formula DEMAfast = ((2 * MMEfast) - MMEfastb).

2. Calculate slow line DEMAslow: Calculate two EMA values of the slow line MMEslow, and calculate the slow line DEMAslow according to the formula DEMAslow = ((2 * MMEslow) - MMEslowb).

3. Calculate MACD line: The MACD line is the difference between fast line DEMAfast and slow line DEMAslow, LigneMACDZeroLag.

4. Calculate signal line: Calculate two EMA values of MACD line MMEsignal, and calculate signal line Lignesignal according to the formula Lignesignal = ((2 * MMEsignal) - MMEsignalb).

5. Compare MACD line and signal line: Generate buy signal when MACD line is greater than signal line, and generate sell signal when MACD line is less than signal line.

6. The above calculation uses the DEMA algorithm, which can effectively reduce the lag of MACD indicator.

## Advantages of the Strategy

1. Using the DEMA algorithm can reduce the lag of the MACD indicator and make trading signals more sensitive.

2. It does not rely on MACD crossover signals, but captures trend changes through distance changes between MACD and signal lines, which can enter trends earlier.

3. The strategy accurately judges the trend, and the profit factor can reach 1.6-3.5 with good profitability.

4. The strategy logic is simple and clear, easy to understand and implement, suitable for quantitative trading.

## Risks of the Strategy

1. As a lagging indicator, MACD may generate a lot of invalid trading signals in range-bound markets.

2. Although DEMA algorithm reduces lag, it cannot completely eliminate lag. There is still some lag.

3. As a trend following strategy, the profit may not be good in ranging markets.

4. The parameters sma, lma, tsp need to be optimized for different periods and varieties. 

5. Stop loss strategies may need to be added to control losses.

## Directions for Strategy Optimization

1. Optimize sma, lma, tsp parameters to adapt to different periods and trading varieties.

2. Add dynamic stop loss strategies like ATR to control per trade loss.

3. Incorporate trend judgment indicators to avoid trading in ranging markets.

4. Add position sizing to adjust positions based on market volatility.

5. Optimize entry and exit logic to refine trading signal rules.

## Summary

The MACD Trend Prediction Strategy improves the calculation of MACD by using the DEMA algorithm to reduce lag, and judges the trend through distance changes between MACD and signal lines. As a trend following strategy, it can effectively capture trend changes. The profit factor can reach 1.6-3.5, with certain advantages. But it still needs further optimization of parameters, stop loss strategies, filtering ranging markets, etc. to adapt to more market environments. This will be the development direction of this strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|DEMA Courte|
|v_input_2|26|DEMA Longue|
|v_input_3|9|Signal|
|v_input_4|true|Lignes|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-26 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © moritz1301

//@version=4
strategy("MACD Trendprediction Strategy V1", shorttitle="MACD TPS", overlay=true)
sma = input(12,title='DEMA Courte')
lma = input(26,title='DEMA Longue')
tsp = input(9,title='Signal')
dolignes = input(true,title="Lignes")

MMEslowa = ema(close,lma)
MMEslowb = ema(MMEslowa,lma)
DEMAslow = ((2 * MMEslowa) - MMEslowb )

MMEfasta = ema(close,sma)
MMEfastb = ema(MMEfasta,sma)
DEMAfast = ((2 * MMEfasta) - MMEfastb)

LigneMACDZeroLag = (DEMAfast - DEMAslow)

MMEsignala = ema(LigneMACDZeroLag, tsp)
MMEsignalb = ema(MMEsignala, tsp)
Lignesignal = ((2 * MMEsignala) - MMEsignalb )

MACDZeroLag = (LigneMACDZeroLag - Lignesignal)

bgcolor(LigneMACDZeroLag<Lignesignal ? color.red : color.green)

if (LigneMACDZeroLag>Lignesignal)
	strategy.entry("Buy", strategy.long, comment="BUY")
	
if (LigneMACDZeroLag<Lignesignal)
	strategy.close("Buy", strategy.long, comment="SELL")







```

> Detail

https://www.fmz.com/strategy/430860

> Last Modified

2023-11-02 15:25:11
