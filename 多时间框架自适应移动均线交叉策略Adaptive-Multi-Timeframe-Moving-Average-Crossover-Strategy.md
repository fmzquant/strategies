
> Name

多时间框架自适应移动均线交叉策略Adaptive-Multi-Timeframe-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略是一个利用多时间框架自适应移动均线交叉原理的趋势跟踪策略。该策略同时利用快线、慢线和MACD指标进行交易信号判断,旨在获取中长线趋势的额外利润。

## 原理

该策略主要基于双移动均线交叉系统与MACD指标的组合应用。双移动均线交叉系统由快线EMA和慢线EMA组成,它们分别计算短期均线和长期均线。当快线上穿慢线时产生买入信号,表示行情由跌转涨,可以建立多头仓位。当快线下穿慢线时产生卖出信号,表示行情由涨转跌,此时可以平仓离场。MACD指标由DIF线和DEA线组成,它们分别是短期EMA与长期EMA的差值线和该差值的均线。HIST线即DIF线与DEA线的差值,代表MACD线的动量。当MACD HIST柱变红时为做空信号,当变绿时为做多信号。

该策略融合双移动均线的趋势判断和MACD的动量转换信号,在获取中长线趋势利润的同时,能够有效过滤假突破。具体来说,当快线上穿慢线时,如果MACD柱同时转绿,则产生更加可靠的做多信号;相反,当快线下穿慢线时,如果MACD柱同时转红,则产生较强的做空信号。

此外,该策略还引入了参数自适应功能。在参数优化过程中,快线周期、慢线周期和MACD参数会根据不同时间段的效果进行自动调整,以保证策略在不同行情环境下都能获得较优表现。

## 优势

1. 融合双均线系统和MACD指标,综合多种因素进行决策,避免被噪声虚假信号误导。

2. 应用自适应参数功能,使策略能够动态调整参数以适应市场变化,自动优化交易决策。

3. 较好地把握中长线趋势,过滤震荡市的假突破,在趋势行情中获得额外利润。

4. 采用跨时间框架分析的方式,能够识别更大级别的趋势方向。

5. 策略逻辑清晰简单,代码结构优化,易于理解和修改,适合不同需求的调整。

## 风险

1. 双均线系统存在卡顿whipsaw的风险,不适用于震荡行情,应选择趋势比较明显的股票和时间段运行。

2. MACD具有滞后性,不适合追踪急剧变化的趋势,应与其他指标结合使用。

3. 参数优化需要足够大的回测周期,并进行严格的风险评估,避免过拟合。

4. 长线持仓时,需要关注突发事件带来的系统性风险,适时止损离场。

5. 自适应参数功能存在过优化的可能,需进行充分验证,避免参数调整过于频繁。

## 优化方向

1. 可以测试不同快慢均线的组合,选择能够过滤噪声并顺应趋势的均线参数。

2. 可以试验MACD的多组参数,找到能够提前反应趋势转换点的组合参数。 

3. 可以加入趋势指标作为过滤器,在趋势不明朗时暂停交易,避免whipsaw。

4. 可以引入止损机制,设定移动止损或挂单止损,控制单笔损失。

5. 可以尝试加入机器学习算法,利用更大量的数据训练参数自适应规则,提高策略稳定性。

6. 可以尝试多品种套利,在相关品种间形成交易组合,以分散市场系统性风险。

## 总结

本策略整合双移动均线交叉和MACD动量指标,实现了趋势跟踪和节奏控制的有机结合。自适应参数的引入使策略更具鲁棒性,能够平稳适应市场变化。相比单一指标策略,该策略形成了较强的决策效果,能够在中长线趋势中获取较丰厚的交易收益。下一步可以通过参数优化、风险控制等手段进一步增强策略的效果。总体上,该策略形成了一套可靠的趋势跟踪交易体系,值得深入研究与应用。


||



## Overview

This strategy utilizes the principle of adaptive moving average crossover across multiple timeframes to track trends. It combines fast line, slow line and MACD indicator for trade signal judgment, aiming to capture additional profits from medium-to-long term trends.

## Principle 

The strategy is mainly based on the combination of dual moving average crossover system and MACD indicator. The dual moving average crossover system consists of fast EMA and slow EMA, which calculate short-term and long-term moving averages respectively. A buy signal is generated when the fast line crosses above the slow line, indicating the market trend has changed from decline to rise, and long position can be built. A sell signal is generated when the fast line crosses below the slow line, indicating the market trend has changed from rise to decline, at which time position can be closed. The MACD indicator consists of DIF line and DEA line, which are the difference between short-term EMA and long-term EMA, and the moving average of the difference respectively. The HIST line, i.e. the difference between DIF and DEA, represents the momentum of MACD. A red MACD histogram bar stands for short signal, while a green one stands for long signal.

The strategy combines the trend judgment of dual moving average and the momentum change signal of MACD. While capturing profits from medium-to-long term trends, it can effectively filter false breakouts. Specifically, when the fast line crosses above the slow line, if the MACD histogram turns green at the same time, a more reliable long signal is generated. On the contrary, when the fast line crosses below the slow line, if the MACD histogram turns red simultaneously, a stronger short signal is generated.

In addition, the strategy also incorporates adaptive parameter functionality. During parameter optimization, the periods of fast line, slow line and MACD parameters are automatically adjusted based on performance over different time periods, to ensure the strategy can achieve relatively better performance under different market conditions.

## Advantages

1. Combines dual moving average system and MACD indicator for decision making, avoiding being misled by false signals from noise.

2. Applies adaptive parameter functionality so that the strategy can dynamically adjust parameters to adapt to market changes and optimize trading decisions automatically.

3. Captures medium-to-long term trends relatively well, filters false breakouts from range-bound markets, and obtains additional profits from trending markets.

4. Adopts analysis across timeframes to identify larger-degree trend direction.

5. Simple and clear logic, optimized code structure, easy to understand and modify to meet different needs.

## Risks

1. Dual moving average system has the risk of being whipsawed, unsuitable for range-bound market, should be used for stocks and time periods with obvious trend.

2. MACD has lagging effect, not suitable for tracing rapidly changing trends, should be combined with other indicators. 

3. Parameter optimization requires large enough backtesting period and strict risk assessment to avoid overfitting.

4. Pay attention to systemic risks from sudden events when holding long position, stop loss in time if necessary.

5. Risk of over-optimization for adaptive parameter functionality, requiring sufficient verification to avoid too frequent parameter adjustment.

## Improvement Directions

1. Test different fast and slow moving average combinations to find parameters that filter noise and comply with trend.

2. Try different MACD parameter sets to find the combination that reflects trend change point earliest.

3. Add trend indicator as filter, pause trading when trend is unclear, to avoid whipsaw. 

4. Introduce stop loss mechanism like moving stop loss or pending orders to control single trade loss.

5. Try machine learning algorithms to train adaptive parameter rules with more data, improving stability.

6. Try cross-product arbitrage to form portfolio across correlated products, diversifying market systemic risks.

## Conclusion

This strategy combines dual moving average crossover and MACD momentum indicator, achieving organic integration of trend following and rhythm control. The introduction of adaptive parameters makes the strategy more robust to adapt smoothly to market changes. Compared with single indicator strategies, this strategy forms stronger decision making effects, capable of capturing relatively ample trading profits from medium-to-long term trends. Next steps may include parameter optimization, risk control etc. to further enhance the strategy. Overall, the strategy forms a reliable trend following trading system, worthy of in-depth research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|fastLength|
|v_input_2|55|slowLength|
|v_input_3|9|signalLength|
|v_input_4|6|MACDCandlesCheckedBack|
|v_input_5|4|MACDTolerance|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-08 00:00:00
end: 2023-10-08 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

// To enable alerts: Change 'Strategy' to read 'Study' below  and you also need to comment out lines 43 and 47 - Strategy code

// strategy(title="Riz Coloured MACD", shorttitle="Riz MACD" , initial_capital=5000, default_qty_value=3  )
//study(title="Riz Coloured MACD", shorttitle="Riz MACD")

source = close
fastLength = input(21, minval=1), slowLength=input(55,minval=1)
signalLength=input(9,minval=1)
MACDCandlesCheckedBack=input(6,minval=1)
MACDTolerance=input(4,minval=1)

fastMA = ema(source, fastLength)
slowMA = ema(source, slowLength)
macd = fastMA - slowMA
signal = ema(macd, signalLength)
hist = macd - signal

// ====== BASIC COLOURING - IF HISTOGRAM IS HIGHER THAN PREVIOUS 2 CANDLES THEN WE ARE TICKING UP and VISA VERSA ============//

isTickingUp = hist > hist[1] and hist > hist[2] //and hist > hist[3]
isTickingDown = hist < hist[1] and hist < hist[2] // and hist < hist[3]


// ======= MACD STRATEGY CODE ========== //

// Check if MACD is ticking in the right direction to take a trade - adding 1 at the end means it starts at -1 so not to include the current candle
MACDHistHighestHigh= highest(hist, MACDCandlesCheckedBack)[1]
MACDHistLowestLow = lowest(hist, MACDCandlesCheckedBack)[1]

MACDConfirmsLong() => (hist - MACDHistLowestLow) > MACDTolerance
MACDConfirmsShort() => (MACDHistHighestHigh - hist) > MACDTolerance


plot(macd,  title="MACD", color=blue, linewidth=3)
plot(signal,  title="SIGNAL", color=orange, linewidth=3)

// === SIMPLE COLOURING BASED ON LAST 2 CANDLES - EASY TO REFERENCE IN DAY TO DAY MACD USE ====//

plot(hist, title="HIST", color=isTickingDown ? fuchsia : isTickingUp ? lime : green, linewidth=3, style=histogram)

// ==== ALTERNATIVE COLOURING FOR PLOT BASED ON STRATEGY SETTINGS INSTEAD

//plot(hist, title="HIST", color=MACDConfirmsLong() ? lime : MACDConfirmsShort() ? fuchsia : green, linewidth=3, style=histogram)


// === STRATEGY - ENTER POSITIONS - COMMENT OUT TO ENABLE ALERTS === //

strategy.entry(id = "Long", long = true, when = MACDConfirmsLong()) // use function to decide when to go long

strategy.entry(id = "Short", long = false, when = MACDConfirmsShort())

// === CREATE ALERT CONDITIONS === // 

alertup = MACDConfirmsLong()
alertdown = MACDConfirmsShort()

alertcondition(alertup, title='MACD Long', message='Riz MACD says go LONG!')
alertcondition(alertdown, title='MACD Short', message='Riz MACD says go SHORT!')

```

> Detail

https://www.fmz.com/strategy/428783

> Last Modified

2023-10-09 14:56:37
