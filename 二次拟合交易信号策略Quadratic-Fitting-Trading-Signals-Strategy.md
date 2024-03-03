
> Name

二次拟合交易信号策略Quadratic-Fitting-Trading-Signals-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

本策略利用二次曲线拟合K线高低点,形成交易信号。当实际价格突破拟合曲线时,产生买入和卖出信号。该策略试图用数学模型识别关键支撑和阻力,进行突破交易。

### 策略原理

该策略的主要组成部分和规则如下:

1. 拟合高低点:使用二次曲线最小二乘法拟合K线高低点。

2. 买入信号:当K线收盘价突破上轨曲线时产生买入信号。

3. 卖出信号:当K线收盘价突破下轨曲线时产生卖出信号。 

4. N周期验证:要求突破持续N周期才生效,避免假突破。

5. 平仓信号:没有明确的平仓信号,通过回测优化确定持仓时间。

该策略试图通过数学模型识别关键价格,并在突破时入场,属于典型的突破系统。

### 优势分析

相比其他突破系统,该策略主要优势有:

1. 使用数学模型拟合,较主观判断更客观。

2. 融合了交易技术与统计模型,方法新颖。

3. 引入多周期验证,可过滤假突破。

4. 回测优化可寻找最佳持仓时间。

5. 实现难度不大,可灵活调整。

6. 模型自动更新,无需人工维护。

7. 可检验不同品种和周期的参数健壮性。

8. 可引入机器学习进一步优化和验证。

9. 总体来说,新颖程度高,有探索价值。

### 风险分析

但该策略也存在以下风险:

1. 拟合效果取决于参数选择,可能过度优化。

2. 拟合曲线存在滞后,无法完全规避损失。

3. 未考虑交易量,存在被套盘风险。

4. 统计套利难以长期稳定获得超额收益。

5. 回测周期短,需验证模型稳健性。

6. 多品种环境适应性有待检验。

7. 固定仓位无法动态调整。

8. 需严格评估收益回撤比。

### 优化方向

根据以上分析,该策略可以从以下几个方面提高:

1. 在不同市场环境中测试参数健壮性。

2. 加入交易量验证指标。

3. 优化出入场逻辑,提高信号质量。

4. 建立动态仓位管理模型。

5. 引入止损策略限制亏损。

6. 优化资金管理策略。

7. 回测窗口滚动验证。

8. 评估多品种稳定收益能力。  

9. 借助机器学习进行模型优化。

### 总结

该策略整体来说,具有一定创新性和实验价值。但Statistical Arbitrage长期稳定盈利仍面临考验。需要在回测中全面审视策略的稳健性、风险收益情况,防止过拟合,使策略在多变的市场中保持适应能力。

||

### Overview

This strategy fits a quadratic curve to high/low points of bars to generate trading signals when price breaks through the fitted lines. It attempts to identify key support/resistance levels mathematically for breakout trading.

### Strategy Logic

The key components and rules are:

1. Curve fitting on high/low points using quadratic regression.

2. Buy signal when close breaks above upper band.

3. Sell signal when close breaks below lower band.

4. N periods verification to avoid false breaks.

5. No fixed exit rules, optimize exits via backtesting.

The strategy tries to identify key prices mathematically and trade the breakouts, a typical breakout system.

### Advantages

Compared to other breakout systems, the main advantages are:

1. Mathematical fitting is more objective than subjective judgment.

2. Novel approach combining technical analysis and statistical models. 

3. Multi-period verification avoids false breaks.

4. Backtesting can optimize exits and holding period.

5. Easy to implement with flexible adjustments.

6. Model updates automatically without manual intervention.

7. Can test parameter robustness across products and timeframes.

8. Potential to optimize further with machine learning.

9. Overall novel approach with exploratory value.

### Risks

However, the risks are:

1. Fitting performance depends on parameter tuning, overfitting risk.

2. Fitted lines lag, cannot completely avoid losses. 

3. No volume confirmation, risk of being trapped.

4. Statistical arbitrage is challenging for persistent alpha.

5. Limited backtest period, need to verify robustness. 

6. Multi-market adaptability requires validation.

7. Fixed size lacks dynamic adjustment. 

8. Need strict evaluation of reward/risk ratios.

### Enhancements

Based on the analysis, enhancements may involve:

1. Test parameter robustness across market regimes.

2. Add volume confirmation indicators.

3. Optimize entry/exit logic for higher quality signals.

4. Build dynamic position sizing models. 

5. Incorporate stops to limit losses.

6. Optimize risk management strategies.

7. Rolling window backtest validation.

8. Evaluate multi-market stability.

9. Leverage machine learning for model optimization.

### Conclusion

In summary, this strategy has some innovative value and experimentation merit. But the long-term viability of statistical arbitrage remains unproven. Comprehensive in-sample testing on robustness, risk/reward is key to prevent overfitting and maintain adaptability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|═══════════════ From ═══════════════|
|v_input_2|true|Month|
|v_input_3|true|Day|
|v_input_4|2019|Year|
|v_input_5|true|════════════════ To ════════════════|
|v_input_6|31|Month|
|v_input_7|12|Day|
|v_input_8|9999|Year|
|v_input_9|true|══════════════ Config ══════════════|
|v_input_10|6|p|
|v_input_11|30|length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-23 00:00:00
end: 2023-09-22 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

strategy(title = " Strategy Quadratic Semaphore ",
         shorttitle = "SQS",
         overlay = true,
         precision = 8,
         calc_on_order_fills = true,
         calc_on_every_tick = true,
         backtest_fill_limits_assumption = 0,
         default_qty_type = strategy.fixed,
         default_qty_value = 2,
         initial_capital = 10000,
         pyramiding=5,
         currency = currency.USD,
         linktoseries = true)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

backTestSectionFrom = input(title = "═══════════════ From ═══════════════", defval = true, type = input.bool)

FromMonth         = input(defval = 1, title = "Month", minval = 1)
FromDay           = input(defval = 1, title = "Day", minval = 1)
FromYear          = input(defval = 2019, title = "Year", minval = 2014)

backTestSectionTo = input(title = "════════════════ To ════════════════", defval = true, type = input.bool)
ToMonth           = input(defval = 31, title = "Month", minval = 1)
ToDay             = input(defval = 12, title = "Day", minval = 1)
ToYear            = input(defval = 9999, title = "Year", minval = 2014)

Config            = input(title = "══════════════ Config ══════════════", defval = true, type = input.bool)
p = input(6)
length = input(30)
//
backTestPeriod() => (time > timestamp(FromYear, FromMonth, FromDay, 00, 00)) and (time < timestamp(ToYear, ToMonth, ToDay, 23, 59))
//
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

x1 = bar_index
x2 = sqrt(x1)
y = high
//
S11 = sum(x2,length) - sqrt(sum(x1,length)) / length  
S12 = sum(x1*x2,length) - (sum(x1,length) * sum(x2,length)) / length  
S22 = sum(sqrt(x2),length) - sqrt(sum(x2,length)) / length            
Sy1 = sum (y*x1,length) - (sum(y,length) * sum(x1,length)) / length   
Sy2 = sum (y*x2,length) - (sum(y,length) * sum(x2,length)) / length   
//
max1 = sma(x1,length) 
max2 = sma(x2,length)
may = sma(y,length)
b2 = ((Sy1 * S22) - (Sy2*S12))/(S22*S11 - sqrt(S12))
b3 = ((Sy2 * S11) - (Sy1 * S12))/(S22 * S11 - sqrt(S12))
b1 = may - b2*max1 - b3*max2
qr = b1 + b2*x1 + b3*x2
//
yl = low
//
Sy1l = sum(yl*x1,length) - (sum(yl,length) * sum(x1,length)) / length  
Sy2l = sum(yl*x2,length) - (sum(yl,length) * sum(x2,length)) / length  
//
mayl = sma(yl,length)
b2l = ((Sy1l * S22) - (Sy2l*S12))/(S22*S11 - sqrt(S12))
b3l = ((Sy2l * S11) - (Sy1l * S12))/(S22 * S11 - sqrt(S12))
b1l = mayl - b2l*max1 - b3l*max2
qrl = b1l + b2l*x1 + b3l*x2
//
period = round(p/2)+1
hh = qr[period]
ll = qrl[period]
countH = 0
countL = 0
buy=0
sell=0
//
for i = 1 to period-1
    if qr[i]<hh
        countH:=countH+1
    if qrl[i]>ll
        countL:=countL+1

for i = period+1 to p+1
    if qr[i]<hh
        countH:=countH+1
    if qrl[i]>ll
        countL:=countL+1

if countH==p
    pivotH = high[period]
    buy := 1
    
if countL==p
    pivotL = low[period]
    sell := 1
//    
plotshape(buy == 1 , text='?', style=shape.arrowup, location=location.belowbar, color=#32CD32, textcolor=color.white, offset=0, transp=0,size=size.auto)
plotshape(sell == 1 , text='?', style=shape.arrowdown, location=location.abovebar, color=#FF0000, textcolor=color.white, offset=0, transp=0,size=size.auto)
//

if (backTestPeriod())
    strategy.entry("long", true, 1, when = buy == 1)
    strategy.entry("short", false, 1, when = sell == 1) 

```

> Detail

https://www.fmz.com/strategy/427677

> Last Modified

2023-09-23 15:40:57
