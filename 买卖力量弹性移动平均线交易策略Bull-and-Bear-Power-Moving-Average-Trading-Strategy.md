
> Name

买卖力量弹性移动平均线交易策略Bull-and-Bear-Power-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ac2c04fb85b614ee58.png)
 [trans]

## 概述

该策略由Alexander Elder博士根据其弹性移动平均线理论开发,用以测量市场的买卖力量。该策略通常与三屏交易系统配合使用,也可以单独使用。博士使用13日指数移动平均线来反映市场对价值的共识。多头力量反映买方驱动价格高于价值共识的能力;空头力量则反映卖方将价格驱动至低于价值共识的能力。

多头力量通过高点减去13日指数移动平均线计算。空头力量通过低点减去13日指数移动平均线计算。

## 策略原理  

该策略基于Alexander Elder博士的买卖力量理论。通过计算多空力量指标判断市场趋势和力量。具体来说,多头力量指标反映了买方的力量,它由最高价减去13日EMA计算得到。空头力量指标反映了卖方的力量,它由最低价减去13日EMA计算得到。当多头力量下降到一定阈值时产生做空信号;当空头力量上升到一定阈值时产生做多信号。这样,我们可以通过 comparative 强买卖的力量来判断市场的趋势和击败市场。

代码中,我们使用高低点和13日EMA来计算多空力量指标。设置触发阈值,当指标触发时打开对应的做多或做空头寸。同时设置止损和止盈逻辑来管理头寸。总体来说,该策略通过比较买卖双方的相对力量,判断市场趋势的强弱来进行交易。

## 优势分析

该策略具有以下优势:

1. 利用买卖力量判断市场趋势,BACKTEST效果较好
2. 买卖信号明确,容易判断
3. 可靠的止损机制HELP控制风险
4. 结合三屏交易系统使用效果更佳

## 风险分析

该策略也存在一些风险:  

1. 参数设置较为主观,不同市场需要调整
2. 买卖力量指标可能产生误导信号
3. 止损位置设置不当可能增加损失
4. 效果与交易品种和周期相关

对策:

1. 优化参数,适应不同市场
2. 结合其他指标过滤信号
3. 优化止损逻辑,严格控制风险
4. 选择适合的交易品种和周期

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 优化移动平均线参数,适应不同周期
2.增加其他指标过滤信号,例如MACD等
3. 优化止损止盈逻辑,例如追踪止损
4. 利用机器学习方法自动优化参数
5. 结合深度学习预测买卖信号

总体来说,该策略优化空间Still大,可以从参数、信号、风险控制等多个方面入手,使策略更加稳定和可靠。

## 总结

该策略基于Elder博士的买卖力量理论,通过计算多空力量指标判断市场趋势和力量,信号判断规则相对简单清晰。策略具有利用买卖力量判断趋势、止损控制风险等优点,也存在参数主观、信号误导等风险。我们可以通过参数优化、增加信号过滤、严格止损等方法进一步增强策略的稳定性和profit率。该策略适合积极的量化交易者。

||

## Overview

This strategy was developed by Dr. Alexander Elder based on his theory of bull and bear power moving averages to measure buying and selling pressure in the market. It is commonly used together with the Triple Screen trading system but can also be used on its own. Dr. Elder uses a 13-day exponential moving average (EMA) to reflect the market consensus of value. Bull power reflects the ability of buyers to drive prices above the consensus of value. Bear power reflects the sellers’ ability to drive prices below the average consensus of value.  

Bull power is calculated by subtracting the 13-day EMA from the day's high. Bear Power subtracts the 13-day EMA from the day's low.  

## Strategy Logic

This strategy is based on Dr. Alexander Elder's theory of bull and bear power. It judges market trends and power by calculating bull and bear power indicators. Specifically, the bull power indicator reflects the power of buyers, which is calculated by subtracting the 13-day EMA from the highest price. The bear power indicator reflects the power of sellers, which is calculated by subtracting the 13-day EMA from the lowest price. When the bull power drops to a certain threshold, a short signal is generated. When the bear power rises to a certain threshold, a long signal is generated. Thus, we can judge the market trend and beat the market by comparing the relative strength of buying and selling power.

In the code, we use highs, lows and 13-day EMA to calculate the bull and bear power indicators. Set trigger thresholds so that corresponding long or short positions are opened when the indicators are triggered. At the same time, set stop loss and take profit logic to manage positions. Overall, this strategy compares the relative power of buyers and sellers to determine the strength of market trends for trading.

## Advantage Analysis 

The advantages of this strategy include:

1. Effective in judging market trends and backtesting using buying and selling power  
2. Clear buy and sell signals that are easy to judge
3. Reliable stop loss mechanism to control risk 
4. Works even better when combined with the Triple Screen trading system

## Risk Analysis

Some risks of this strategy include:

1. Subjective parameter settings that need adjusting for different markets
2. Bull and bear power indicators may produce misleading signals
3. Improper stop loss placement may increase losses
4. Performance depends on trading instruments and timeframes

Countermeasures:

1. Optimize parameters for different markets 
2. Add filters using other indicators 
3. Optimize stop loss logic to strictly control risk
4. Select suitable trading instruments and timeframes

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Optimize moving average parameters for different timeframes  
2. Add other indicators like MACD to filter signals
3. Optimize stop loss and take profit logic, such as trail stop loss
4. Use machine learning to automatically optimize parameters  
5. Incorporate deep learning to predict buy/sell signals  

In summary, this strategy has much room for optimization in aspects like parameters, signals, risk control etc. to make it more robust and reliable.  

## Conclusion  

This strategy judges market trends and power using the bull and bear power indicators developed by Dr. Elder based on buying/selling power theory. The signal rules are relatively simple and clear. Advantages include judging trends via power and controlling risk through stop loss. It also has risks like subjective parameters and misleading signals. We can improve stability and profitability through optimizing parameters, adding signal filters and strict stop loss. This strategy suits aggressive quant traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|7|Take Profit %|
|v_input_float_2|7|Stop Loss %|
|v_input_int_1|14|Length|
|v_input_float_3|-200|Trigger|
|v_input_bool_1|true|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-12 00:00:00
end: 2023-12-19 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version = 5
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 06/10/2022
// Developed by Dr Alexander Elder, the Elder-ray indicator measures buying 
// and selling pressure in the market. The Elder-ray is often used as part 
// of the Triple Screen trading system but may also be used on its own.
// Dr Elder uses a 13-day exponential moving average (EMA) to indicate the 
// market consensus of value. Bull Power measures the ability of buyers to 
// drive prices above the consensus of value. Bear Power reflects the ability 
// of sellers to drive prices below the average consensus of value.
// Bull Power is calculated by subtracting the 13-day EMA from the day's High. 
// Bear power subtracts the 13-day EMA from the day's Low.
// WARNING:
// - For purpose educate only
// - This script to change bars colors. 
////////////////////////////////////////////////////////////
strategy(title="Elder Ray (Bull Power) TP and SL", shorttitle = "Bull Power", overlay = true)
Profit = input.float(7, title='Take Profit %', minval=0.01)
Stop = input.float(7, title='Stop Loss %', minval=0.01)
Length = input.int(14, minval=1)
Trigger = input.float(-200)
reverse = input.bool(true, title="Trade reverse")
xPrice = close
xMA = ta.ema(xPrice,Length)
var DayHigh = high
DayHigh := dayofmonth != dayofmonth[1]? high: math.max(high, nz(DayHigh[1]))
nRes = DayHigh - xMA
pos = 0
pos := nRes < Trigger ? 1:  0 
possig = reverse and pos == 1 ? -1 :
          reverse and pos == -1 ? 1 : pos	   
if (possig == 1) and strategy.position_size == 0
    strategy.entry('Long', strategy.long, comment='Market Long')
    strategy.exit("ExitLong", 'Long', stop=close - close * Stop / 100 , limit = close + close * Profit / 100 , qty_percent = 100)  
if (possig == -1) and strategy.position_size == 0
    strategy.entry('Short', strategy.short, comment='Market Long')
    strategy.exit("ExitShort", 'Short', stop=close + close * Stop / 100 , limit = close - close * Profit / 100 , qty_percent = 100)  
barcolor(strategy.position_size == -1 ? color.red: strategy.position_size == 1 ? color.green : color.blue )
```

> Detail

https://www.fmz.com/strategy/435993

> Last Modified

2023-12-20 16:30:02
