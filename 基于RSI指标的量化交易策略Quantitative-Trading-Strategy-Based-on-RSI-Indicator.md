
> Name

基于RSI指标的量化交易策略Quantitative-Trading-Strategy-Based-on-RSI-Indicator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c13470cfa6efccf865.png)

[trans]


## 策略概述

本策略名为“PlanB RSI跟踪策略”。该策略运用相对强弱指数(RSI)作为主要技术指标,设定买入和卖出信号,实现自动化交易。

## 策略原理  

该策略主要基于以下原理:

1. 如果过去6个月RSI指数最高超过90%,并下跌至低于65%,则产生卖出信号。

2. 如果过去6个月RSI指数最低低于50%,并从最低点反弹超过2%,则产生买入信号。

具体来说,卖出条件判断逻辑是:

```
如果(过去6个月RSI指数最大值>90% 且 当前RSI<65%)
   则卖出
```

买入条件判断逻辑是:

```  
如果(过去6个月RSI指数最小值<50% 且 RSI指数从最低点反弹>2%)
  则买入
```

以上卖出和买入规则来自熟知量化策略的PlanB的文章。该策略致力于复制其研究结果,使更多交易者能够验证这一交易策略的效果。

## 策略优势

这一交易策略具有以下几点优势:

1. 使用相对简单的RSI指标作为唯一技术指标,降低了策略复杂度。

2. 买入和卖出规则清晰,容易理解,方便实盘验证。 

3. 买入和卖出信号的判断全面考虑市场涨跌信息。卖出信号判断结合长期指标高点和短期调整; 买入信号判断结合了长期指标低点和短期反弹。

4. 策略参考了知名量化大牛PlanB的研究成果,可作为他文章结论的独立验证。

5. 作为初学者策略,相对简单易操作的规则,利于量化交易技能的培养。

## 策略风险

这一交易策略也存在一些主要风险:  

1. 作为基于单一技术指标RSI的策略,无法应对更复杂的市场情况。RSI指标本身也会产生误导性信号。  

2. 固定的买入卖出参数设置可能错过部分交易机会,或者形成交易信号偏迟。需要优化参数以适应不同市场周期。

3. 策略过于简单追随PlanB文章结论,没有考虑独立的模型优化,可能导致实盘交易效果不佳。

4. 买入卖出规则相对粗放,没有结合止损和止盈确保收益、控制风险。这在实盘中容易形成较大亏损。

对策略进行以下几点优化可以降低风险,提高实盘表现:
1. 增加副指标判断,避免RSI指标误导;  
2. 优化参数设置适应不同周期特征;
3. 增加止损止盈机制,有效控制风险;
4. 结合独立数据训练出策略参数,确保参数稳健性。

## 策略优化方向  

为提高策略实盘表现,可从以下几个维度进行优化:  

1. **增加副指标判断**:仅依赖RSI指标容易产生误导信号。可以引入诸如KD、MACD等副指标进行综合判断,提高信号准确性。 

2. **动态参数优化**:当前买入卖出参数设置为固定数值,这难以适应市场的长短期变化。引入动态参数优化模块,实时调整参数,能显著提高策略表现。

3. **止损/止盈机制**:策略当前没有止损止盈设置。添加trailing stop等止损机制,以及移动止盈点,可以有效控制单笔损失和锁定盈利。

4. **独立参数训练**:直接使用PlanB文章的参数,没有经过独立验证。应用机器学习等方法,基于历史数据训练出最优参数组合。

5. **复制组合优化**:将多个类似简单策略组合,可以提高整体稳定性和收益,降低单一策略风险。


## 总结  

本策略“PlanB RSI跟踪策略”遵循PlanB的经典文章设计思路,使用RSI指标构建了较为简单的量化交易策略。策略优势在于规则清晰、易于实现,适合量化入门学习。但策略也存在依赖单一指标、参数不够优化等问题。未来可从增加副指标、动态参数优化、止损/止盈设置、独立参数训练等方面进行策略增强,大幅提高实盘表现。

||
## Strategy Overview

The strategy is named "PlanB RSI Tracking Strategy". It utilizes the Relative Strength Index (RSI) as the primary technical indicator to set up buy and sell signals for automated trading.  

## Strategy Logic

The strategy is mainly based on the following principles:

1. If the highest RSI index in the past 6 months exceeds 90% and then drops below 65%, a sell signal is generated.  

2. If the lowest RSI index in the past 6 months falls below 50% and then bounces more than 2% from the lowest point, a buy signal is generated.


Specifically, the sell logic is:

```
If (Highest RSI in past 6 months > 90% AND Current RSI < 65%) 
   Then Sell
```

The buy logic is: 

```
If (Lowest RSI in past 6 months < 50% AND RSI bounces >2% from lowest point)
   Then Buy
```

The above sell and buy rules come from the article by PlanB, a well-known quant strategist. The strategy aims to replicate his research results for more traders to validate the effectiveness of this trading strategy.


## Advantages of the Strategy

This trading strategy has the following main advantages:

1. Using RSI as the only technical indicator reduces complexity.

2. Clear buy and sell rules that are easy to understand for live trading verification.
   
3. Buy and sell signals incorporate both long-term peak/bottom and short-term bounce/breakdown market information.

4. The strategy references research from renowned quant PlanB, allowing independent verification of his conclusions.  

5. As a beginner strategy with relatively simple rules, it helps nurture quant trading skills.


## Risks of the Strategy 

There are also some key risks for this trading strategy:

1. Relying solely on RSI, it cannot handle more complex market regimes. RSI itself also gives false signals.

2. Fixed parameter settings may miss trades or give delayed signals. Optimization is needed for adapting across market cycles.
   
3. Following PlanB blindly without independent optimization risks poor live performance. 

4. Raw buy/sell rules without stop loss or take profit may lead to large losses in live trading.


Below optimizations could help reduce risks and improve live performance:

1. Add secondary indicators to avoid RSI false signals.  

2. Optimize parameters for different cycle characteristics. 

3. Add stop loss / take profit mechanisms for risk control.

4. Train strategy parameters independently to ensure robustness.


## Directions for Strategy Optimization

To enhance live performance, optimizations can be made in the following dimensions:

1. **Add secondary indicators**: Relying solely on RSI risks false signals. Incorporate indicators like KD, MACD for composite judgment and improve accuracy.
   
2. **Dynamic parameter optimization**: Current parameter values are fixed, failing to adapt across market cycles. Introduce dynamic optimization modules to adjust parameters in real-time for significantly improved performance.

3. **Stop loss/take profit**: Currently lacking risk management features. Adding trailing stop loss, moving take profit points can effectively control single trade loss and lock in gains.

4. **Independent parameter training**: Directly using PlanB article parameters without verification. Apply machine learning to find optimal parameter combinations based on historical data. 

5. **Portfolio optimization**: Combining multiple simple strategies improves overall stability and risk-adjusted returns.

## Conclusion   

The "PlanB RSI Tracking Strategy" follows the design philosophy in PlanB's classic article, constructing a simple quant trading strategy based on RSI. The advantages lie in its clarity and ease of implementation, making it suitable for quant starter education. However, sole reliance on a single indicator and lack of optimization remain as issues. Future enhancements can be made via adding secondary indicators, dynamic parameter optimization, stop loss/take profit, independent parameter training to significantly improve live performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|90|selllevel|
|v_input_2|65|drop|
|v_input_3|50|buylevel|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-20 00:00:00
end: 2023-11-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © fillippone

//@version=4

strategy("PlanB Quant Investing 101", shorttitle="PlanB RSI Strategy", overlay=true,calc_on_every_tick=false,pyramiding=0, default_qty_type=strategy.cash,default_qty_value=1000, currency=currency.USD, initial_capital=1000,commission_type=strategy.commission.percent, commission_value=0.0)


r=rsi(close,14)

//SELL CONDITION
//RSI was above 90% last six months AND drops below 65%

//RSI above 90% last six month

selllevel = input(90)
maxrsi = highest(rsi(close,14),6)[1]

rsisell = maxrsi > selllevel 


//RSIdrops below 65%
drop = input(65)

rsidrop= r < drop

//sellsignal
sellsignal = rsisell and rsidrop 


//BUY CONDITION
//IF (RSI was below 50% last six months AND jumps +2% from the low) THEN buy, ELSE hold.

//RSI was below 50% last six months

buylevel = input(50)
minrsi = lowest(rsi(close,14),6)[1]

rsibuy = minrsi < buylevel 

//IF (RSI jumps +2% from the low) THEN buy, ELSE hold.


rsibounce= r > (minrsi + 2)

//buysignal=buyrsi AND rsidrop

//buysignal

buysignal = rsibuy and rsibounce 

//Strategy

strategy.entry("Buy Signal",strategy.long, when = buysignal)
strategy.entry("Sell Signal",strategy.short, when = sellsignal)


```

> Detail

https://www.fmz.com/strategy/433434

> Last Modified

2023-11-27 16:02:14
