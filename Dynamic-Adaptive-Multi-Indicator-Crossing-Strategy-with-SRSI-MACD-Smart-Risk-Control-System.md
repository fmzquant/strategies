
> Name

Dynamic-Adaptive-Multi-Indicator-Crossing-Strategy-with-SRSI-MACD-Smart-Risk-Control-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d85d3f3f128c7d0e9368.png)
![IMG](https://www.fmz.com/upload/asset/2d936c5e9be93251b9fbb.png)




[trans]
#### 概述
该策略是一个结合了随机相对强弱指标(SRSI)和移动平均趋同/发散指标(MACD)的动态交易系统。它通过ATR指标动态调整止损和止盈点位,实现了风险的智能化管理。该策略的核心在于通过多重技术指标的交叉确认来产生交易信号,同时结合市场波动性进行仓位管理。

#### 策略原理
策略的运作基于以下几个核心机制:
1. 通过计算SRSI指标中的K线与D线之差,以及K线与归一化MACD之差来判断市场走势
2. 买入条件需同时满足:K-D差值为正,K-MACD差值为正,且MACD不处于下降趋势
3. 卖出条件需同时满足:K-D差值为负,K-MACD差值为负,且MACD不处于上升趋势
4. 使用ATR乘以风险系数来动态计算止损和止盈距离,根据市场波动性自适应调整

#### 策略优势
1. 多重信号确认机制显著提高了交易的可靠性,避免了单一指标可能带来的虚假信号
2. 动态的止损止盈设置能够根据市场波动情况自动调整,提供了更好的风险收益比
3. 策略具有良好的适应性,可以在不同的市场环境下保持稳定表现
4. 参数可调节性强,允许交易者根据个人风险偏好进行优化

#### 策略风险
1. 在震荡市场中可能产生过多的交易信号,导致频繁进出市场
2. 多重指标的使用可能导致信号滞后,在快速变化的市场中错过最佳入场时机
3. ATR基于历史波动率计算,在市场波动率突变时可能无法及时适应
4. 需要合理设置风险系数,过大或过小都可能影响策略效果

#### 策略优化方向
1. 增加趋势过滤器,在震荡市和趋势市采用不同的信号确认标准
2. 引入成交量指标作为辅助确认,提高信号的可靠性
3. 优化止损止盈的计算方法,可考虑结合支撑阻力位
4. 加入市场波动率预测模型,提前调整风险参数
5. 考虑在不同时间周期上进行信号确认,增加策略的稳健性

#### 总结
该策略通过结合SRSI和MACD的优势,构建了一个稳健的交易系统。动态风险管理机制使其具有良好的适应性,但仍需要交易者根据实际市场情况进行参数优化。策略的成功运行需要对市场有深入的理解,并结合个人的风险承受能力来进行合理的仓位管理。 || 

#### Overview
This strategy is a dynamic trading system that combines the Stochastic Relative Strength Index (SRSI) and Moving Average Convergence/Divergence (MACD). It implements intelligent risk management through dynamic stop-loss and take-profit levels adjusted by the Average True Range (ATR) indicator. The core of the strategy lies in generating trading signals through multiple technical indicator crossovers while managing positions based on market volatility.

#### Strategy Principles
The strategy operates based on the following core mechanisms:
1. Market trends are determined by calculating the difference between K-line and D-line of SRSI, as well as the difference between K-line and normalized MACD
2. Buy conditions require: positive K-D difference, positive K-MACD difference, and MACD not in downtrend
3. Sell conditions require: negative K-D difference, negative K-MACD difference, and MACD not in uptrend
4. Dynamic calculation of stop-loss and take-profit distances using ATR multiplied by a risk factor, adapting to market volatility

#### Strategy Advantages
1. Multiple signal confirmation mechanism significantly improves trading reliability, avoiding false signals from single indicators
2. Dynamic stop-loss and take-profit settings automatically adjust to market volatility, providing better risk-reward ratios
3. The strategy demonstrates good adaptability, maintaining stable performance across different market conditions
4. Strong parameter adjustability allows traders to optimize according to personal risk preferences

#### Strategy Risks
1. May generate excessive trading signals in ranging markets, leading to frequent market entries and exits
2. Multiple indicators might result in delayed signals, missing optimal entry points in rapidly changing markets
3. ATR calculations based on historical volatility may not adapt quickly to sudden market volatility changes
4. Requires appropriate risk factor settings, as both too high or too low values can affect strategy performance

#### Strategy Optimization Directions
1. Add trend filters to apply different signal confirmation standards in ranging and trending markets
2. Incorporate volume indicators as auxiliary confirmation to improve signal reliability
3. Optimize stop-loss and take-profit calculations, potentially incorporating support and resistance levels
4. Introduce market volatility prediction models for preemptive risk parameter adjustments
5. Consider signal confirmation across different timeframes to enhance strategy robustness

#### Summary
This strategy builds a robust trading system by combining the advantages of SRSI and MACD. Its dynamic risk management mechanism provides good adaptability, though traders still need to optimize parameters based on actual market conditions. Successful strategy implementation requires deep market understanding and appropriate position management aligned with individual risk tolerance.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-09-01 00:00:00
end: 2025-02-18 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy(title="SRSI + MACD Strategy with Dynamic Stop-Loss and Take-Profit", shorttitle="SRSI + MACD Strategy", overlay=false, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// User Inputs
smoothK = input.int(3, "K", minval=1) 
smoothD = input.int(3, "D", minval=1) 
lengthRSI = input.int(16, "RSI Length", minval=1) 
lengthStoch = input.int(16, "Stochastic Length", minval=1) 
src = input(close, title="RSI Source") 
enableStopLoss = input.bool(true, "Enable Stop-Loss")  
enableTakeProfit = input.bool(true, "Enable Take-Profit")  
riskFactor = input.float(2.5, "Risk Factor", minval=0.1, step=1)  

// Calculate K and D lines
rsi1 = ta.rsi(src, lengthRSI) 
k = ta.sma(ta.stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK) 
d = ta.sma(k, smoothD) 
differenceKD = k - d 

// Calculate MACD and normalization
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9) 
lowestK = ta.lowest(k, lengthRSI) 
highestK = ta.highest(k, lengthRSI) 
normalizedMacd = (macdLine - ta.lowest(macdLine, lengthRSI)) / (ta.highest(macdLine, lengthRSI) - ta.lowest(macdLine, lengthRSI)) * (highestK - lowestK) + lowestK 
differenceKMacd = k - normalizedMacd 

// Sum both differences for a unique display
differenceTotal = (differenceKD + differenceKMacd) / 2

// Check if MACD is falling or rising
isMacdFalling = ta.falling(macdLine, 1)  
isMacdRising = ta.rising(macdLine, 1)  

// Check if K is falling or rising
isKFalling = ta.falling(k, 1)  
isKdRising = ta.rising(k, 1)  

// Calculate ATR and dynamic levels
atrValue = ta.atr(14)  
stopLossDistance = atrValue * riskFactor  
takeProfitDistance = atrValue * riskFactor  

// Variables for stop-loss and take-profit levels
var float longStopPrice = na
var float longTakeProfitPrice = na

// Buy and sell conditions with differenceKD added
buyCondition = ((differenceTotal > 0 or differenceKD > 0) and (isKdRising or isMacdRising) and k < 20 )  
sellCondition = ((differenceTotal <= 0 or differenceKD <= 0) and (isKFalling or isMacdFalling) and k > 80)  

// Execute strategy orders with conditional stop-loss and take-profit
if buyCondition and strategy.position_size == 0
    strategy.entry("Buy", strategy.long)

if strategy.position_size > 0
    longStopPrice := strategy.position_avg_price - stopLossDistance  
    longTakeProfitPrice := strategy.position_avg_price + takeProfitDistance  

    if enableStopLoss or enableTakeProfit
        strategy.exit("Sell/Exit", "Buy", stop=(enableStopLoss ? longStopPrice : na), limit=(enableTakeProfit ? longTakeProfitPrice : na))

if sellCondition
    strategy.close("Buy")  

// Hide lines when position is closed
stopLossToPlot = strategy.position_size > 0 ? longStopPrice : na
takeProfitToPlot = strategy.position_size > 0 ? longTakeProfitPrice : na

// Plot stop-loss and take-profit lines only when long positions are active
plot(enableStopLoss ? stopLossToPlot : na, title="Stop-Loss", color=color.yellow, linewidth=1, style=plot.style_linebr, offset=0, force_overlay=true) 
plot(enableTakeProfit ? takeProfitToPlot : na, title="Take-Profit", color=color.yellow, linewidth=1, style=plot.style_linebr, offset=0, force_overlay=true)

// Plot the MACD and candles

plot(normalizedMacd, "Normalized MACD", color=color.new(color.purple, 0), linewidth=1, display=display.all)

h0 = hline(80, "Upper Band", color=#787B86) 
hline(50, "Middle Band", color=color.new(#787B86, 50)) 
h1 = hline(20, "Lower Band", color=#787B86) 
fill(h0, h1, color=color.rgb(33, 150, 243, 90), title="Background")

// New candle based on the sum of differences
plotcandle(open=0, high=differenceTotal, low=0, close=differenceTotal, color=(differenceTotal > 0 ? color.new(color.green, 60) : color.new(color.red, 60)), title="K-D + MACD Candles")

```

> Detail

https://www.fmz.com/strategy/482816

> Last Modified

2025-02-27 17:44:09
