
> Name

动态RSI与CCI结合的多因子量化交易策略Dynamic-RSI-and-CCI-Combined-Multi-factor-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12e828a0afa37f8fd84.png)
[trans]

## 概述

本策略通过结合动态RSI指标、CCI指标以及多重MA均线,实现多因子驱动的量化交易策略。该策略综合考虑了趋势、超买超卖等多个维度,进行判断和交易信号产生。

## 策略原理

### 技术指标

- MA均线:计算一定周期内的收盘价平均值,判断价格趋势
- RSI相对强弱指标:判断超买超卖区域
- CCI顺势指标:判断超买超卖状态
- Stoch KDJ指标:判断随机指标与主趋势偏离情况

### 交易信号

买入信号:MA12上穿MA26,CCI低于100(超卖),Stoch KDJ低于80(超卖)

卖出信号:RSI下穿动态阈值,Stoch KDJ高于80(超买)

## 策略优势

1. 多因子驱动,综合判断,降低假信号
2. 动态阈值sellable,实时检测超买超卖
3. 结合趋势、随机、主流多种技术指标
4. 采用多组参数调优,灵活度高

## 策略风险

1. 多因子组合过于复杂,参数调优难度大
2. 策略表现与参数选择高度相关
3. 需严格按照量化流程进行参数优化
4. 存在较高的曲线拟合风险

## 策略优化

1. 更多数据集测试策略稳健性
2. 多组参数组合测试寻找最优参数
3. 增加止损机制降低最大回撤 
4. 增加仓位控制,避免追涨杀跌
5. 测试不同品种合约的适应性

## 总结

本策略综合运用多种技术指标与多因子驱动判断,通过参数调优与严格的统计验证寻找最佳参数,可以获得较好的策略效果。但复杂程度较高,需防止过拟合风险,同时要控制仓位和止损来降低最大回撤。本策略可进一步扩展至其他品种和时间周期进行优化测试。

||

## Overview

This strategy combines dynamic RSI, CCI and multiple MA moving averages to implement a multi-factor driven quantitative trading strategy. The strategy takes into account multiple dimensions such as trend, overbought and oversold to make judgments and generate trading signals.

## Strategy Principle 

### Technical Indicators

- MA: Calculates average closing price over a period to determine price trend 
- RSI: Judges overbought and oversold levels
- CCI: Judges overbought and oversold status  
- Stoch KDJ: Judges deviation of stochastic from main trend

### Trading Signals

Buy signal: MA12 crosses over MA26, CCI below 100 (oversold), Stoch KDJ below 80 (oversold)

Sell signal: RSI crosses below dynamic threshold, Stoch KDJ above 80 (overbought)

## Advantages

1. Multi-factor driven, comprehensive judgment, lower false signals
2. Dynamic threshold for sellable, real-time overbought and oversold detection  
3. Combines trend, stochastic, mainstream technical indicators
4. Adopts multiple parameter tuning, high flexibility

## Risks

1. Overly complex multi-factor combination, difficult parameter tuning
2. Performance highly related to parameter selection  
3. Requires strict quantitative process for parameter optimization
4. High curve fitting risk

## Optimization

1. More dataset testing for strategy robustness
2. Multiple parameter combination testing to find optimum
3. Add stop loss to reduce maximum drawdown
4. Add position sizing to avoid chasing and killing
5. Test adaptability across different products  

## Conclusion

This strategy combines multiple technical indicators and multi-factor driven judgments with parameter tuning and statistical validation to achieve good results. But higher complexity, need to prevent overfitting, and control position sizing and stop loss to reduce maximum drawdown. Can further expand strategy across products and timeframes.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|26|Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|3|smoothK_1|
|v_input_6|3|smoothD_1|
|v_input_7|14|lengthRSI|
|v_input_8|14|lengthStoch|
|v_input_9_close|0|RSI Source_1: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|4|smoothK_2|
|v_input_11|3|smoothD_2|
|v_input_12|5|lengthRSI_2|
|v_input_13|5|lengthStoch_2|
|v_input_14_close|0|RSI Source_2: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_15|true|buyCondition|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-11-26 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="ATOM2.0", shorttitle="ATOM V2.0", overlay=false, default_qty_type=strategy.cash, currency=currency.USD, initial_capital=200, default_qty_type=strategy.cash, default_qty_value=100, pyramiding=10)

// Set Parameter MA12
len12 = input(12, minval=1, title="Length")
src12 = input(close, title="Source")
ma12 = sma(src12, len12)
//plot(ma12, color=color.blue, title="MA12")

// Set Parameter MA26
len26 = input(26, minval=1, title="Length")
src26 = input(close, title="Source")
ma26 = sma(src26, len26)
//plot(ma26, color=color.orange, title="MA12")

//Stochastic RSI 14,3,3
smoothK_1 = input(3, minval=1)
smoothD_1 = input(3, minval=1)
lengthRSI = input(14, minval=1)
lengthStoch = input(14, minval=1)
src_1 = input(close, title="RSI Source_1")

rsi1 = rsi(src_1, lengthRSI)
k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK_1)
d = sma(k, smoothD_1)
//plot(k, color=color.red)
//plot(d, color=color.yellow)

//Stochastic RSI 5,4,3
smoothK_2 = input(4, minval=1)
smoothD_2 = input(3, minval=1)
lengthRSI_2 = input(5, minval=1)
lengthStoch_2 = input(5, minval=1)
src_2 = input(close, title="RSI Source_2")

rsi2 = rsi(src_2, lengthRSI_2)
k_2 = sma(stoch(rsi2, rsi2, rsi2, lengthStoch_2), smoothK_2)
d_2 = sma(k_2, smoothD_2)
//plot(k_2, color=color.white)
//plot(d_2, color=color.green)

// CCI
cci = cci(close,26)
//plot(cci,color=color.blue)

// Dynamic RSI
DZbuy = 0.1
DZsell = 0.1
Period = 14
Lb = 60

RSILine = rsi(close,Period)
jh = highest(RSILine, Lb)
jl = lowest(RSILine, Lb)
jc = (wma((jh-jl)*0.5,Period) + wma(jl,Period))
Hiline = jh - jc * DZbuy
Loline = jl + jc * DZsell
R = (4 * RSILine + 3 * RSILine[1] + 2 * RSILine[2] + RSILine[3] ) / 10

plot(R, title='R', color=color.white, linewidth=1, transp=0)
plot(Hiline, title='Hiline', color=color.yellow,  linewidth=1, transp=0)
plot(Loline, title='Loline', color=color.yellow, linewidth=1, transp=0)
plot(jc, title='Jc', color=color.purple,  linewidth=1, transp=50)

col_1 = R > Hiline ? color.red:na
col_2 = R < Loline ? color.green:na

fill(plot(R, title='R', color=color.white, linewidth=1, transp=0), plot(Hiline, title='Hiline', color=color.yellow,  linewidth=1, transp=0), color=col_1,transp=0)
fill(plot(R, title='R', color=color.white, linewidth=1, transp=0), plot(Loline, title='Loline', color=color.yellow, linewidth=1, transp=0), color=col_2,transp=0)
//------------------------------------------------------------------------------
// Calculate qty
// Parameter
fund = 10           // Fund per Contract in USD
leverage = 100     // Leverage
// Buy Condition
buyCondition = (ma12>ma26 and cci<100 and k<80 and d<80 and k_2<80 and d_2<80 and crossover(k_2, d_2))
buy = (buyCondition == input(1))
alertcondition(buy, title='time to Long', message='Long!!!')
//closeBuy = (cci>100 and cci<cci[1] and cci<cci[2])
closeBuy = (crossunder(R, Hiline) and k>80)
alertcondition(closeBuy, title='Time to Close', message='Close Long')

// Submit Orders
strategy.entry(id="Long", qty=(fund*leverage)/close, long=true, when=buyCondition)
strategy.close(id="Long", when=closeBuy)
```

> Detail

https://www.fmz.com/strategy/433456

> Last Modified

2023-11-27 18:54:34
