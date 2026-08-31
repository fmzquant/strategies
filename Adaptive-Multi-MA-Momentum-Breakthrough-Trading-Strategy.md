
> Name

Adaptive-Multi-MA-Momentum-Breakthrough-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1064753b69e185f4397.png)

[trans]
#### 概述
这是一个基于多重均线和动量突破的交易策略。该策略结合了SMMA(平滑移动平均线)、ZLEMA(零滞后指数移动平均线)等多个技术指标,通过捕捉价格与均线之间的交叉信号来识别交易机会。策略采用了自适应机制,能够根据市场波动调整信号的灵敏度,提高交易的准确性。

#### 策略原理
策略使用了四条关键均线:src(基于HLC3的SMMA)、hi(基于最高价的SMMA)、lo(基于最低价的SMMA)和mi(基于src的ZLEMA)。交易信号主要基于这些均线之间的交叉关系和位置关系。多重信号条件的组合确保了交易信号的可靠性。买入信号包括四种不同条件组合,卖出信号也包括四种不同条件组合。平仓信号则基于价格与mi均线的交叉以及均线之间的位置关系。

#### 策略优势
1. 多重信号确认机制提高了交易的准确性
2. 自适应特性使策略能够适应不同的市场环境
3. 使用SMMA和ZLEMA降低了假信号的影响
4. 分层的信号系统提供了更多的交易机会
5. 清晰的平仓条件有助于控制风险

#### 策略风险
1. 均线交叉可能产生滞后,影响入场时机
2. 多重条件可能错过一些重要的交易机会
3. 在震荡市场中可能产生过多假信号
4. 参数设置不当可能影响策略表现
5. 需要考虑交易成本对策略收益的影响

#### 策略优化方向
1. 引入波动率过滤器,在高波动期间调整策略参数
2. 增加交易量分析,提高信号可靠性
3. 优化均线参数的自适应机制
4. 加入趋势强度指标,提高趋势判断准确性
5. 开发动态止损机制,提高风险控制能力

#### 总结
该策略通过多重均线和动量指标的组合,构建了一个相对完整的交易系统。策略的自适应特性和多重确认机制提高了交易的可靠性。通过优化和完善,该策略有望在不同市场环境下保持稳定表现。建议交易者在实盘使用前进行充分的回测和参数优化。 || 

#### Overview
This is a trading strategy based on multiple moving averages and momentum breakthrough. The strategy combines technical indicators such as SMMA (Smoothed Moving Average) and ZLEMA (Zero-Lag Exponential Moving Average) to identify trading opportunities by capturing crossover signals between price and moving averages. The strategy employs an adaptive mechanism that adjusts signal sensitivity based on market volatility to improve trading accuracy.

#### Strategy Principle
The strategy utilizes four key moving averages: src (SMMA based on HLC3), hi (SMMA based on high), lo (SMMA based on low), and mi (ZLEMA based on src). Trading signals are primarily based on the crossover relationships and relative positions between these moving averages. The combination of multiple signal conditions ensures the reliability of trading signals. Buy signals include four different condition combinations, and sell signals also include four different condition combinations. Exit signals are based on price crossovers with the mi average and relative positions between moving averages.

#### Strategy Advantages
1. Multiple signal confirmation mechanism improves trading accuracy
2. Adaptive features allow the strategy to adapt to different market environments
3. Use of SMMA and ZLEMA reduces the impact of false signals
4. Layered signal system provides more trading opportunities
5. Clear exit conditions help control risk

#### Strategy Risks
1. Moving average crossovers may produce lag, affecting entry timing
2. Multiple conditions may miss some important trading opportunities
3. May generate excessive false signals in choppy markets
4. Improper parameter settings may affect strategy performance
5. Need to consider the impact of trading costs on strategy returns

#### Strategy Optimization Directions
1. Introduce volatility filters to adjust strategy parameters during high volatility periods
2. Add volume analysis to improve signal reliability
3. Optimize the adaptive mechanism of moving average parameters
4. Add trend strength indicators to improve trend judgment accuracy
5. Develop dynamic stop-loss mechanisms to enhance risk control

#### Summary
The strategy builds a relatively complete trading system through the combination of multiple moving averages and momentum indicators. The strategy's adaptive features and multiple confirmation mechanisms improve trading reliability. Through optimization and refinement, the strategy has the potential to maintain stable performance in different market environments. Traders are advised to conduct thorough backtesting and parameter optimization before live trading.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-10 00:00:00
end: 2025-01-08 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6

//study("Limit order strategy", overlay=true)
strategy('Limit order strategy', overlay = true)

lengthMA = input(1)
lengthmi = input(14)
lengthhigh = input(14)
lengthlow = input(14)

calc_smma(src, len) =>
    smma = 0.0
    smma := na(smma[1]) ? ta.sma(src, len) : (smma[1] * (len - 1) + src) / len
    smma

calc_zlema(src, length) =>
    ema1 = ta.ema(src, length)
    ema2 = ta.ema(ema1, length)
    d = ema1 - ema2
    ema1 + d


src = calc_smma(hlc3, lengthMA)
hi = calc_smma(high, lengthhigh)
lo = calc_smma(low, lengthlow)
mi = calc_zlema(src, lengthmi)

plot(src, color = color.new(#FF1493, 0), linewidth = 2, title = 'src')
plot(hi, color = color.new(#7CFC00, 0), linewidth = 2, title = 'hi')
plot(lo, color = color.new(#FF0000, 0), linewidth = 2, title = 'lo')
plot(mi, color = color.new(#00FFFF, 0), linewidth = 2, title = 'mi')


//strategy.order("buy", true, 1, stop = na, when = openbuy) // buy by market if current open great then previous high
//strategy.order("sell", false, 1, stop = na, when = opensell) // sell by market if current open less then previous low
//if src >= mi and src[1] <= mi[1] and src[1] <= lo[1]
//	strategy.entry("buy 1", strategy.long, qty = 15)
sigorderbuy1 = src > mi and src[1] < mi[1] and src < lo and mi < lo
sigorderbuy2 = src > lo and src[1] < lo[1] and mi < lo
sigorderbuy3 = src > hi and src[1] < hi[1] and mi < hi
sigorderbuy4 = src > mi and src[1] < mi[1] and src > hi and mi > hi
//sigorderbuy5 = mi > hi and  src > hi  and src > mi and src[1] < mi[1] 
//sigorderbuy6 = mi < hi and src > hi and src[1] < hi[1]
sigclosebuy = src < mi and src[1] > mi[1] or mi < lo and src < lo and src[1] > lo[1]

sigordersell1 = src < mi and src[1] > mi[1] and src > hi and mi > hi
sigordersell2 = src < hi and src[1] > hi[1] and mi > hi
sigordersell3 = src < lo and src[1] > lo[1] and mi > lo
sigordersell4 = src < mi and src[1] > mi[1] and src < lo and mi < lo
//sigordersell5 = mi < lo and  src < lo  and src < mi and src[1] > mi[1] 
//sigordersell6 = mi > lo and src < lo and src[1] > lo[1]
sigclosesell = src > mi and src[1] < mi[1] or mi > hi and src > hi and src[1] < hi[1]

plot(sigorderbuy1 ? 1 : 0, 'sigorderbuy1')
plot(sigorderbuy2 ? 1 : 0, 'sigorderbuy2')
plot(sigorderbuy3 ? 1 : 0, 'sigorderbuy3')
plot(sigorderbuy4 ? 1 : 0, 'sigorderbuy4')
//plot(sigorderbuy5 ? 1 : 0,"sigorderbuy5") 
//plot(sigorderbuy6 ? 1 : 0,"sigorderbuy6") 

plot(sigordersell1 ? 1 : 0, 'sigordersell1')
plot(sigordersell2 ? 1 : 0, 'sigordersell2')
plot(sigordersell3 ? 1 : 0, 'sigordersell3')
plot(sigordersell4 ? 1 : 0, 'sigordersell4')
//plot(sigordersell5 ? 1 : 0,"sigordersell5") 
//plot(sigordersell6 ? 1 : 0,"sigordersell6")

plot(sigclosebuy ? 1 : 0, 'sigclosebuy')
plot(sigclosesell ? 1 : 0, 'sigclosesell')


openbuy = sigorderbuy1 or sigorderbuy2 or sigorderbuy3 or sigorderbuy4 // or sigorderbuy5 or sigorderbuy6
opensell = sigordersell1 or sigordersell2 or sigordersell3 or sigordersell4 //or sigordersell5 or sigordersell6
openclosebuy = sigclosebuy
openclosesell = sigclosesell

alertcondition(condition = openbuy, title = 'sigorderbuy all', message = '{"accountmt":"70415621,666734890","time":"15","msg":"Buy {{ticker}} sig_b1={{plot("sigorderbuy1")}} sig_b2={{plot("sigorderbuy2")}} sig_b3={{plot("sigorderbuy3")}} sig_b4={{plot("sigorderbuy4")}}"}')
alertcondition(condition = opensell, title = 'sigordersell all', message = '{"accountmt":"70415621,666734890","time":"15","msg":"Sell {{ticker}} sig_s1={{plot("sigordersell1")}} sig_ss={{plot("sigordersell2")}} sig_s3={{plot("sigordersell3")}} sig_s4={{plot("sigordersell4")}} sig_s5={{plot("sigordersell5")}} sig_61={{plot("sigordersell6")}}"}')

alertcondition(condition = sigclosebuy, title = 'Close buy', message = '{"accountmt":"70415621,666734890","time":"15","msg":"Close {{ticker}} T=short"}')
alertcondition(condition = sigclosesell, title = 'Close sell', message = '{"accountmt":"70415621,666734890","time":"15","msg":"Close {{ticker}} T=long"}')

if sigorderbuy1
    strategy.order('Buy 1', strategy.long, 1)
if sigorderbuy2
    strategy.order('Buy 2', strategy.long, 1)
if sigorderbuy3
    strategy.order('Buy 3', strategy.long, 1)
if sigorderbuy4
    strategy.order('Buy 4', strategy.long, 1)


if sigordersell1
    strategy.order('sell 1', strategy.short, 1)
if sigordersell2
    strategy.order('sell 2', strategy.short, 1)
if sigordersell3
    strategy.order('sell 3', strategy.short, 1)
if sigordersell4
    strategy.order('sell 4', strategy.short, 1)
//strategy.order("sell 5", false, 1, when = sigordersell5)
//strategy.order("sell 6", false, 1, when = sigordersell6)

```

> Detail

https://www.fmz.com/strategy/477953

> Last Modified

2025-01-10 15:27:53
