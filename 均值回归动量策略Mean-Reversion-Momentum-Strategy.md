
> Name

均值回归动量策略Mean-Reversion-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/143517842f7d9dddfca.png)
[trans]

## 概述

均值回归动量策略是一种追踪短期价格平均的趋势交易策略。它结合了均值回归指标和动量指标,实现了对市场中期趋势的判断。

## 策略原理

该策略首先计算价格的均值回归线和标准差。然后结合Upper Threshold和Lower Threshold参数设定好的阈值,计算价格是否超出了均值回归线一个标准差范围。如果超出,则产生交易信号。 

对于多头信号,需要价格低于均值回归线一个标准差,Close价格低于LENGTH周期的SMA均线,且高于TREND SMA均线,满足这三个条件就进行做多方向的开仓。平仓条件是价格上穿LENGTH周期的SMA均线。

对于空头信号,需要价格高于均值回归线一个标准差,Close价格高于LENGTH周期的SMA均线,且低于TREND SMA均线,满足这三个条件就进行做空方向的开仓。平仓条件是价格下穿LENGTH周期的SMA均线。

该策略同时结合Percent Profit Target和Percent Stop Loss,实现止盈止损管理。

Exit方式可以选择移动平均线突破或者线性回归突破。

通过多空双边交易、趋势过滤、止盈止损等组合,实现了对市场中期趋势的判断和跟踪。

## 策略优势

1. 均值回归指标能够有效判断价格是否偏离价值中心

2. 动量指标SMA能过滤掉短期市场噪音

3. 多空双边交易,能够全方位捕捉趋势机会

4. 止盈止损机制能够有效控制风险

5. 可选择的Exit方式,能够灵活适应市场环境

6. 完整的趋势交易策略,较好地把握中期趋势

## 策略风险

1. 均值回归指标对参数设置敏感,阈值设定不当可能导致虚假信号

2. 大幅震荡行情中可能出现止损过于频繁的情况

3. 震荡趋势时,交易频率可能过高,增加交易费用和滑点风险

4. 交易品种流动性不足时,滑点控制可能不理想

5. 多空双边交易风险较大,需要谨慎资金管理

可以通过参数优化、止损方式调整、资金管理等方法来控制这些风险。

## 策略优化方向 

1. 优化均值回归和动量指标的参数设定,使其更符合不同品种的特点

2. 增加趋势判断指标,提高对趋势的识别能力

3. 优化止损策略,使其更能适应市场大幅波动

4. 增加仓位管理模块,根据市场条件调整仓位规模

5. 增加更多风控模块,如最大回撤控制、净值曲线控制等

6. 考虑结合机器学习方法,使策略参数自动优化

## 总结

综上所述,均值回归动量策略通过简单有效的指标设计,实现了对中期价值回归趋势的捕捉。策略具有较强的适应性和普适性,但也存在一定的风险。通过持续优化和组合其他策略,能够取得更好的绩效。该策略整体较完整,是一种值得考虑的趋势交易方法。

||


## Overview

The mean reversion momentum strategy is a trend trading strategy that tracks short-term price averages. It combines the mean reversion indicator and momentum indicator to judge the medium-term market trend.

## Strategy Logic

The strategy first calculates the mean reversion line and standard deviation of the price. Then, combined with the threshold values set by the Upper Threshold and Lower Threshold parameters, it calculates whether the price exceeds the range of one standard deviation from the mean reversion line. If so, a trading signal is generated.

For long signals, the price needs to be below the mean reversion line by one standard deviation, the Close price is below the SMA of the LENGTH period, and above the TREND SMA, if these three conditions are met, a long position will be opened. The closing condition is when the price breaks above the SMA of the LENGTH period.

For short signals, the price needs to be above the mean reversion line by one standard deviation, the Close price is above the SMA of the LENGTH period, and below the TREND SMA, if these three conditions are met, a short position will be opened. The closing condition is when the price breaks below the SMA of the LENGTH period.

The strategy also combines Percent Profit Target and Percent Stop Loss for profit taking and stop loss management.

The exit method can choose between moving average crossover or linear regression crossover.

Through the combination of dual-directional trading, trend filtering, profit taking and stop loss, etc., it realizes the judgment and tracking of medium-term market trends.

## Advantages

1. The mean reversion indicator can effectively judge the deviation of the price from the value center.

2. The momentum indicator SMA can filter out short-term market noise. 

3. Dual-directional trading can fully capture trend opportunities in all directions.

4. The profit taking and stop loss mechanism can effectively control risks.

5. The selectable exit methods can be flexible to adapt to market conditions.

6. A complete trend trading strategy that better captures medium-term trends.

## Risks

1. The mean reversion indicator is sensitive to parameter settings, improper threshold settings may cause false signals.

2. In volatile market conditions, stop loss may be triggered too frequently. 

3. In sideways trends, the trading frequency may be too high, increasing trading costs and slippage risks.

4. When the trading instrument has insufficient liquidity, slippage control may be suboptimal.

5. Dual directional trading has higher risks, prudent money management is required.

These risks can be controlled through parameter optimization, stop loss adjustment, money management etc.

## Optimization Directions

1. Optimize the parameter settings of mean reversion and momentum indicators to better suit different trading instruments.

2. Add trend identification indicators to improve trend recognition ability.

3. Optimize the stop loss strategy to better adapt to significant market fluctuations. 

4. Add position sizing modules to adjust position sizes based on market conditions.

5. Add more risk management modules, such as maximum drawdown control, equity curve control etc. 

6. Consider combining machine learning methods to automatically optimize strategy parameters.

## Summary 

In summary, the mean reversion momentum strategy captures mid-term mean reversion trends through simple and effective indicator design. The strategy has strong adaptability and versatility, but also has some risks. By continuous optimization and combining with other strategies, better performance can be achieved. Overall the strategy is quite complete, and is a trend trading method worth considering.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Long Only or Short Only or Both?: Both|Long Only|Short Only|
|v_input_2|10|Length|
|v_input_3|true|Upper threshold|
|v_input_4|-1|Lower threshold|
|v_input_5_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|0|Linear Regression Exit or Moving Average Exit?: MA|LR|
|v_input_7|10|MA/LR Exit Length|
|v_input_8|200|Trend SMA Length|
|v_input_9|0|Above or Below Trend SMA?: Above|Below|Don't Include|
|v_input_10|true|Profit Target On/Off|
|v_input_11|true|Profit Target %|
|v_input_12|true|Stop Loss On/Off|
|v_input_13|-1|Stop Loss %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-15 00:00:00
end: 2023-11-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © GlobalMarketSignals

//@version=4
strategy("GMS: Mean Reversion Strategy", overlay=true)

LongShort       = input(title="Long Only or Short Only or Both?", type=input.string, defval="Both", options=["Both", "Long Only", "Short Only"])
Lookback        = input(title="Length", type=input.integer, defval=10, minval=0)
LThr1           = input(title="Upper threshold", type=input.float, defval=1, minval=0)
LThr            = input(title="Lower threshold", type=input.float, defval=-1, maxval=0)
src             = input(title="Source", type=input.source, defval=close)
LongShort2      = input(title="Linear Regression Exit or Moving Average Exit?", type=input.string, defval="MA", options=["LR", "MA"])
SMAlenL         = input(title="MA/LR Exit Length", type = input.integer ,defval=10)
SMALen2         = input(title="Trend SMA Length", type = input.integer ,defval=200)
AboveBelow      = input(title="Above or Below Trend SMA?", type=input.string, defval="Above", options=["Above", "Below", "Don't Include"])
PTbutton        = input(title="Profit Target On/Off", type=input.bool, defval=true)
ProfitTarget    = input(title="Profit Target %", type=input.float, defval=1, step=0.1, minval=0)
SLbutton        = input(title="Stop Loss On/Off", type=input.bool, defval=true)
StopLoss        = input(title="Stop Loss %", type=input.float, defval=-1, step=0.1, maxval=0)

x               = (src-linreg(src,Lookback,0))/(stdev(src,Lookback))

plot(linreg(src,Lookback,0))

//PROFIT TARGET & STOPLOSS

if PTbutton == true and SLbutton == true
    strategy.exit("EXIT", profit=((close*(ProfitTarget*0.01))/syminfo.mintick), loss=((close*(StopLoss*-0.01))/syminfo.mintick))
else
    if PTbutton == true and SLbutton == false
        strategy.exit("PT EXIT", profit=((close*(ProfitTarget*0.01))/syminfo.mintick))
    else
        if PTbutton == false and SLbutton == true
            strategy.exit("SL EXIT", loss=((close*(StopLoss*-0.01))/syminfo.mintick))
        else    
            strategy.cancel("PT EXIT")


////////////////////////
//MOVING AVERAGE EXIT//
//////////////////////

if LongShort=="Long Only" and AboveBelow=="Above" and LongShort2 =="MA"
    strategy.entry("LONG", true, when = x<LThr and close<sma(close,SMAlenL) and close>sma(close,SMALen2))
    strategy.close("LONG", when = close>sma(close,SMAlenL))

if LongShort=="Long Only" and AboveBelow=="Below" and LongShort2 =="MA"
    strategy.entry("LONG", true, when = x<LThr and close<sma(close,SMAlenL) and close<sma(close,SMALen2))
    strategy.close("LONG", when = close>sma(close,SMAlenL))

if LongShort=="Long Only" and AboveBelow=="Don't Include" and LongShort2 =="MA"
    strategy.entry("LONG", true, when = x<LThr and close<sma(close,SMAlenL) )
    strategy.close("LONG", when = close>sma(close,SMAlenL))
    
///////    
    
if LongShort=="Short Only" and AboveBelow=="Above" and LongShort2 =="MA"
    strategy.entry("SHORT", false, when = x>LThr1 and close>sma(close,SMAlenL) and close>sma(close,SMALen2))
    strategy.close("SHORT", when = close<sma(close,SMAlenL))

if LongShort=="Short Only" and AboveBelow=="Below" and LongShort2 =="MA"
    strategy.entry("SHORT", false, when = x>LThr1 and close>sma(close,SMAlenL)   and close<sma(close,SMALen2))
    strategy.close("SHORT", when = close<sma(close,SMAlenL))

if LongShort=="Short Only" and AboveBelow=="Don't Include" and LongShort2 =="MA"
    strategy.entry("SHORT", false, when = x>LThr1  and close>sma(close,SMAlenL)  )
    strategy.close("SHORT", when = close<sma(close,SMAlenL))
    
//////

if LongShort=="Both" and AboveBelow=="Above" and LongShort2 =="MA"
    strategy.entry("LONG", true, when = x<LThr and close<sma(close,SMAlenL) and close>sma(close,SMALen2))
    strategy.close("LONG", when = close>sma(close,SMAlenL))

if LongShort=="Both" and AboveBelow=="Below" and LongShort2 =="MA"
    strategy.entry("LONG", true, when = x<LThr and close<sma(close,SMAlenL) and close<sma(close,SMALen2))
    strategy.close("LONG", when = close>sma(close,SMAlenL))

if LongShort=="Both" and AboveBelow=="Don't Include" and LongShort2 =="MA"
    strategy.entry("LONG", true, when = x<LThr and close<sma(close,SMAlenL) )
    strategy.close("LONG", when = close>sma(close,SMAlenL))
    
///////    
    
if LongShort=="Both" and AboveBelow=="Above" and LongShort2 =="MA"
    strategy.entry("SHORT", false, when = x>LThr1 and close>sma(close,SMAlenL) and close>sma(close,SMALen2))
    strategy.close("SHORT", when = close<sma(close,SMAlenL))

if LongShort=="Both" and AboveBelow=="Below" and LongShort2 =="MA"
    strategy.entry("SHORT", false, when = x>LThr1 and close>sma(close,SMAlenL) and close<sma(close,SMALen2))
    strategy.close("SHORT", when = close<sma(close,SMAlenL))

if LongShort=="Both" and AboveBelow=="Don't Include" and LongShort2 =="MA"
    strategy.entry("SHORT", false, when = x>LThr1 and close>sma(close,SMAlenL) )
    strategy.close("SHORT", when = close<sma(close,SMAlenL))
    
/////////////////
//LIN REG EXIT//
///////////////

if LongShort=="Long Only" and AboveBelow=="Above" and LongShort2 =="LR"
    strategy.entry("LONG", true, when = x<LThr and close<linreg(close,SMAlenL,0) and close>sma(close,SMALen2))
    strategy.close("LONG", when = close>linreg(close,SMAlenL,0))

if LongShort=="Long Only" and AboveBelow=="Below" and LongShort2 =="LR"
    strategy.entry("LONG", true, when = x<LThr and close<linreg(close,SMAlenL,0) and close<sma(close,SMALen2))
    strategy.close("LONG", when = close>linreg(close,SMAlenL,0))

if LongShort=="Long Only" and AboveBelow=="Don't Include" and LongShort2 =="LR"
    strategy.entry("LONG", true, when = x<LThr and close<linreg(close,SMAlenL,0) )
    strategy.close("LONG", when = close>linreg(close,SMAlenL,0))
    
///////    
    
if LongShort=="Short Only" and AboveBelow=="Above" and LongShort2 =="LR"
    strategy.entry("SHORT", false, when = x>LThr1 and close>linreg(close,SMAlenL,0) and close>sma(close,SMALen2))
    strategy.close("SHORT", when = close<linreg(close,SMAlenL,0))

if LongShort=="Short Only" and AboveBelow=="Below" and LongShort2 =="LR"
    strategy.entry("SHORT", false, when = x>LThr1 and close>linreg(close,SMAlenL,0)   and close<sma(close,SMALen2))
    strategy.close("SHORT", when = close<linreg(close,SMAlenL,0))

if LongShort=="Short Only" and AboveBelow=="Don't Include" and LongShort2 =="LR"
    strategy.entry("SHORT", false, when = x>LThr1  and close>linreg(close,SMAlenL,0)  )
    strategy.close("SHORT", when = close<linreg(close,SMAlenL,0))
    
//////

if LongShort=="Both" and AboveBelow=="Above" and LongShort2 =="LR"
    strategy.entry("LONG", true, when = x<LThr and close<linreg(close,SMAlenL,0) and close>sma(close,SMALen2))
    strategy.close("LONG", when = close>linreg(close,SMAlenL,0))

if LongShort=="Both" and AboveBelow=="Below" and LongShort2 =="LR"
    strategy.entry("LONG", true, when = x<LThr and close<linreg(close,SMAlenL,0) and close<sma(close,SMALen2))
    strategy.close("LONG", when = close>linreg(close,SMAlenL,0))

if LongShort=="Both" and AboveBelow=="Don't Include" and LongShort2 =="LR"
    strategy.entry("LONG", true, when = x<LThr and close<linreg(close,SMAlenL,0) )
    strategy.close("LONG", when = close>linreg(close,SMAlenL,0))
    
///////    
    
if LongShort=="Both" and AboveBelow=="Above" and LongShort2 =="LR"
    strategy.entry("SHORT", false, when = x>LThr1 and close>linreg(close,SMAlenL,0) and close>sma(close,SMALen2))
    strategy.close("SHORT", when = close<linreg(close,SMAlenL,0))

if LongShort=="Both" and AboveBelow=="Below" and LongShort2 =="LR"
    strategy.entry("SHORT", false, when = x>LThr1 and close>linreg(close,SMAlenL,0) and close<sma(close,SMALen2))
    strategy.close("SHORT", when = close<linreg(close,SMAlenL,0))

if LongShort=="Both" and AboveBelow=="Don't Include" and LongShort2 =="LR"
    strategy.entry("SHORT", false, when = x>LThr1 and close>linreg(close,SMAlenL,0) )
    strategy.close("SHORT", when = close<linreg(close,SMAlenL,0))





```

> Detail

https://www.fmz.com/strategy/432235

> Last Modified

2023-11-15 17:40:59
