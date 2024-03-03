
> Name

相对强弱指数发散策略RSI-Divergence-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fb2fd01fb79f1d19a4.png)
[trans]
## 概述

相对强弱指数发散策略是一种利用相对强弱指数(RSI)识别潜在价格反转机会的策略。该策略通过发现价格走势和RSI走势之间的背离来判断力量的减弱和潜在反转。

当价格走至新低但RSI并未走至新低时,就是多头背离,表示下跌动力在减弱,可能出现向上反转。当价格走至新高但RSI并未走至新高时,就是空头背离,提示上涨动力减弱,可能出现向下反转。

该策略将RSI的超买超卖水平与背离判定相结合,以优化入场和出场时机,捕捉市场反转,提高交易准确性和盈利能力。适用于各类交易品种,是交易者在市场波动中低吸高抛的有效工具。

## 策略原理

相对强弱指数发散策略基于以下几个关键判断:

1. 计算RSI值:通过计算一定周期内的平均涨幅和平均跌幅,得到0-100区间的RSI指标。

2. 判断超买超卖:当RSI上穿设定的超买线(如70)为超买;当RSI下穿设定的超卖区间(如30)为超卖。

3. 识别背离:判断最新价格走势与RSI走势是否一致。如果价格创新高(低)而RSI没有,就是背离现象。

4. 结合进入和退出:多头背离伴随RSI超卖区间出现时为做多信号。空头背离伴RSI超买现象为做空信号。

5. 设置止盈止损:RSI重新进入超买超卖区间时平仓止盈。

通过比较价格波动与RSI变化判断市场力量,策略可以在反转前低吸高抛,套利市场的不合理波动。

## 策略优势

相对强弱指数发散策略具有以下优势:

1. 捕捉市场反转:策略擅长发现价格和RSI之间的背离,判断市场力量衰竭,捕捉反转机会。

2. 配合超买超卖:结合RSI指标本身的超买超卖水平,有助于进一步优化入场和出场点位。

3. 策略简单易行:相对简单的逻辑和参数设置,易于理解和实施。

4. 通用性强:适用于差价合约、数字货币和股票等不同品种,使用广泛。

5. 提高盈利:相对机械化的系统策略,回撤可控,助力打造长期稳定收益。

## 策略风险

相对强弱指数发散策略也存在以下风险:

1. 错误信号风险:价格和RSI之间的背离不一定会持续或者反转成功,存在错误信号。

2. 参数优化难:RSI参数、超买超卖线等设置对结果有很大影响,需要不断测试优化。

3. 市场异常风险:在市场出现异常波动或者策略普遍滥用时,会失败。

4. 技术指标滞后:RSI等技术指标总体上属于滞后的,无法准确判定反转点。

通过严格的风控,调整参数设置,结合其他因素分析,可以在一定程度上降低风险。

## 策略优化方向 

相对强弱指数发散策略还可以从以下方面进行优化:

1. 优化RSI参数:调整RSI计算周期,测试不同天数参数的实际效果。

2. 结合其他指标:与MACD,KD等其他技术指标结合使用,形成交叉验证。

3. 增加止损方式:除了原有的止盈之外,设置移动止损或振荡止损。

4. 适应更多品种:进行针对不同交易品种的参数调整,扩大适用范围。

5. 利用深度学习:使用RNN等深度学习模型对RSI背离进行判断,减少错误信号。

## 总结

相对强弱指数发散策略通过比较价格变动和RSI变化判断市场中反转机会。策略简单清晰,通用性强,能有效捕捉短期反转,获取超额收益。但也存在一定程度作用有限的风险,需要持续优化测试以适应市场。

||

## Overview  

The RSI Divergence strategy utilizes the Relative Strength Index (RSI) to identify potential price reversals by spotting divergences between price movements and RSI trends. It focuses on:  

Bullish Divergence: Occurs when price hits a new low while RSI does not, signaling weakening downward momentum and potential upward reversal.  

Bearish Divergence: Happens when price makes a new high while RSI does not, indicating decreasing upward momentum and potential downward reversal.  

This strategy combines overbought and oversold RSI levels to optimize entry and exit points, aiming to capture market reversals for improved trading accuracy and profitability. Suitable for various trading instruments, it's a valuable tool for traders aiming to buy lows and sell highs in fluctuating markets.

## Strategy Logic  

The RSI Divergence strategy is based on the following key judgments:  

1. Calculate RSI Value: Compute RSI in the range of 0-100 based on average gain and average loss over a specific period.  

2. Identify Overbought/Oversold: RSI above overbought level (e.g. 70) indicates overbought; RSI below oversold level (e.g. 30) indicates oversold.   

3. Detect Divergence: Check if latest price movement is consistent with RSI movement. If price makes new high/low but RSI does not, it shows divergence.  

4. Combine Entry/Exit: Bullish divergence with oversold RSI signals long entry. Bearish divergence with overbought RSI signals short entry.  

5. Set Profit Target/Stop Loss: Close position for profit when RSI re-enters overbought/oversold zone.

By comparing price fluctuation and RSI change to gauge market strength, the strategy aims to profit from market inefficiency.  

## Advantages

The RSI Divergence Strategy has the following pros:

1. Capture Reversals: Excellent in detecting divergences between price and RSI to identify exhaustion reversals.  

2. Optimize with Overbought/Oversold Levels: Combining intrinsic overbought/oversold in RSI helps fine tune entries and exits.   

3. Simple and Easy to Implement: Relatively simple logic and parameter settings make this strategy intuitive to understand and implement.  

4. Wide Versatility: Applicable to a variety of products like CFDs, crypto and stocks for broad adoption.  

5. Boost Profitability: The systematic approach results in lower drawdowns for stable long term returns.  

## Risks

The RSI Divergence Strategy also bears the following risks:  

1. False Signal Risks: Divergences do not certainly reverse or sustain - risk of acting on false signals.  

2. Parameter Optimization Difficulties: Results are sensitive to RSI period, overbought/oversold levels etc requiring rigorous testing.  

3. Exceptional Market Conditions: Strategy tends to fail when markets spike irregularly or the setup is overused.  

4. Lagging Indicator: Technical indicators like RSI are generally lagging and unable to precisely determine reversal points.  

Strict risk control, adaptive parameters and combined analysis with other factors can mitigate the risks to some extent.   

## Enhancement Opportunities

The RSI Divergence strategy can be further optimized via:   

1. Testing RSI Input Values: Backtest different RSI lookback periods to find ideal parameters.  

2. Combining Other Indicators: Adding confluence from MACD, KD etc improves signal accuracy.  

3. More Stop Loss Techniques: Complement exiting profit target stop loss with methods like moving average envelope stop loss.  

4. Wider Products Adaptability: Tweak parameters for better strategy alignment with more product types like commodities.  

5. Applying Deep Learning: Use Deep Learning models like RNNs to judge RSI divergences and forecast prices.  

## Conclusion  

The RSI Divergence captures mean-reverting opportunities by comparing price dynamics against RSI flows. The simple robust strategy works across asset classes for scalable short term reversals and excess returns. But its efficacy also carries inherent limitations requiring constant iterations for market adaptability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSI Length|
|v_input_2|70|Overbought Level|
|v_input_3|30|Oversold Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-13 00:00:00
end: 2024-02-20 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI Divergence Strategy", overlay=true)

// RSI Parameters
rsiLength = input(14, "RSI Length")
overboughtLevel = input(70, "Overbought Level")
oversoldLevel = input(30, "Oversold Level")
rsiValue = ta.rsi(close, rsiLength)

// Divergence detection
priceLow = ta.lowest(low, rsiLength)
priceHigh = ta.highest(high, rsiLength)
rsiLow = ta.lowest(rsiValue, rsiLength)
rsiHigh = ta.highest(rsiValue, rsiLength)

bullishDivergence = low < priceLow[1] and rsiValue > rsiLow[1]
bearishDivergence = high > priceHigh[1] and rsiValue < rsiHigh[1]

// Strategy Conditions
longEntry = bullishDivergence and rsiValue < oversoldLevel
longExit = rsiValue > overboughtLevel
shortEntry = bearishDivergence and rsiValue > overboughtLevel
shortExit = rsiValue < oversoldLevel

// ENTER_LONG Condition
if (longEntry)
    strategy.entry("Long Entry", strategy.long)

// EXIT_LONG Condition
if (longExit)
    strategy.close("Long Entry")

// ENTER_SHORT Condition
if (shortEntry)
    strategy.entry("Short Entry", strategy.short)

// EXIT_SHORT Condition
if (shortExit)
    strategy.close("Short Entry")

```

> Detail

https://www.fmz.com/strategy/442346

> Last Modified

2024-02-21 11:43:24
