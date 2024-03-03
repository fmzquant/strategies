
> Name

多时间框架买入价格下跌策略Multi-Timeframe-Buy-the-Dip-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/142fb76d5f12570661f.png)

[trans]


## 概述

多时间框架买入价格下跌策略是一个相对简单的自动交易策略,它可以在趋势向上阶段获取可观的收益。但是,并非所有的价格下跌都适合买入,需要根据不同的时间框架来优化每笔交易。

该策略利用1小时时间框架捕捉突发的价格下跌,同时在过去12小时内价格有显著上涨。在陡峭的上涨趋势中,获利了结造成的瞬间崩盘为进入市场提供了非常好的时机。

该脚本的设置是在30分钟时间框架进行优化的。您可以调整参数以适应不同的时间框架。

当满足以下条件时,系统会发出买入信号:

- 价格较过去两根K线下跌1%(1小时时间框架=两根30分钟K线)

- 价格较过去12小时(24根30分钟K线=预设时间框架)上涨3%

该设置已经过优化,在超过20个不同的加密货币交易对上进行了150多次回测。

该策略假设每笔订单交易可用资金的30%。策略考虑了0.1%的交易费用。该费用与币安(全球最大的加密货币交易所)的基础费用相符。

## 策略原理

多时间框架买入价格下跌策略的核心思路是同时结合长期和短期两个时间框架来判断入市时机。

首先,在1小时时间框架上判断价格是否出现了突然下跌。这里通过判断当前K线相比前两根K线是否出现了1%以上的下跌来确认。

其次,在12小时时间框架上判断价格是否在长线上存在显著上涨。这里通过计算过去12小时内价格涨幅是否达到3%来确认。

只有当短期时间框架出现下跌,同时长期时间框架处于上涨趋势时,才会发出买入信号。

这样的组合可以避免在长期下跌趋势中盲目买入,同时也可以捕捉到短期调整提供的买入机会。通过不同时间框架的组合,使交易策略更加稳定和可靠。

技术上,该策略通过调用两个不同参数的`perc_change()`函数实现两个时间框架的判断。一个判断过去12小时涨幅,一个判断过去1小时涨幅。当两者同时满足条件时,发出买入信号。

## 优势分析

多时间框架买入价格下跌策略最大的优势在于能够有效判断趋势,并把握短期调整的买入时机。具体来说,主要有以下几点优势:

1. 结合长短两个时间框架,可以避免在长期下跌中买入,从而减少不必要的损失。

2. 短期时间框架可以捕捉突发调整,这些瞬间提供了较低的买入价格。

3. 回测优化了参数,使策略更加适合加密货币的高波动特点。

4. 考虑了交易费用的影响,使模拟更接近真实交易环境。

5. 简单的交易逻辑和参数设置,易于理解和调整。

6. 可广泛适用于不同的交易对,灵活性较高。

## 风险分析

多时间框架买入价格下跌策略也存在一定的风险,主要集中在以下几点:

1. 无法完全避免假突破的风险,短期调整也可能是长期趋势的反转。

2. 固定的参数设置可能无法完全适应市场的变化,需要调整。

3. 回测 Always在模拟交易中表现良好,真实交易中存在差异。

4. 存在一定的时间滞后,可能会错过短期价格波动的最佳买入点。

5. 单一的交易策略容易遭遇系统性风险的影响。

6. 高频交易增加了交易费用的负担。

对应策略风险,可以考虑以下几点优化措施:

1. 加入更多指标判断长短趋势,提高判断准确性。

2. 优化参数设置,使其更加动态地适应市场变化。

3. 在真实环境中测试策略,衡量回测和实盘的差异。 

4. 适当调整时间框架,降低时间滞后问题。

5. 同时使用多个非相关策略,分散系统性风险。

6. 合理设置止损止盈,控制单笔交易的风险。

## 优化方向

多时间框架买入价格下跌策略还存在很大的优化空间,主要可以从以下几个方面进行:

1. 增加更多指标判断,如布林带、RSI等,提高策略的稳定性。

2. 加入机器学习模型,实现参数的动态优化,适应市场变化。

3. 优化止损止盈策略,降低单笔交易的风险。

4. 尝试在更多交易对和时间周期进行回测,找到最佳参数组合。

5. 结合交易量变化等指标,避免被套利交易误导。

6. 增加风险管理模块,如资产配置、仓位控制等,控制整体风险。

7. 尝试算法交易的其他策略类型,如趋势跟踪、套利等,多样化。

8. 探索更复杂的多时间框架组合,寻找最优参数组合。

9. 加入news trading元素,利用新闻事件作为交易驱动。

通过以上优化手段,可以使该策略更稳定、智能和全面,适应加密市场的复杂性。但任何优化都需要谨慎测试,避免过度优化的问题。

## 总结

多时间框架买入价格下跌策略整体来说是一个非常实用的短线交易策略。它同时关注短期和长期两个时间维度,在保持相对高效的同时也提高了判断准确性。通过合理的参数设置和优化,它可以适应大多数的交易市场,尤其在趋势型产品中表现突出。

但与任何机械化策略一样,它也具有一定的局限性,需要交易者保持理性,并且不断进行优化与调整以适应市场变化。一个成功的策略永远都在不断进化,而非一成不变。

总之,多时间框架买入价格下跌策略为算法交易提供了一个非常好的范例。它概括了选择不同时间框架、设置参数、回测优化、风险控制等算法交易的基本要点。适当运用该策略,并在实践中不断完善,可以帮助交易者在海量信息中把握住关键线索,在市场中获得持续的Alpha。

||

## Overview

The multi timeframe buy the dip strategy is a relatively simple automated trading strategy that can generate impressive profits, especially during uptrend periods. Not all price dips are meant for buying though. This system is based on a multi timeframe approach to optimize each trade.

The strategy catches sudden price drops on the 1-hour timeframe when the price has increased significantly in the past 12 hours. During steep uptrends, profit taking actions result in flash crashes that provide great opportunities to enter at convenient prices. 

The setup of the script is optimized on the 30-min timeframe. You can adjust the parameters to fit different timeframes.

The system triggers a buy signal when:

- Price drops 1% from the previous two candles (1-hour timeframe = two 30-min candles)
- Price is up 3% from the last 12 hours (twenty-four 30-min candles equal the desired timeframe)

This setup has been optimized running over 150 backtests on more than 20 different crypto trading pairs. 

The strategy assumes each order to trade 30% of the available capital. A trading fee of 0.1% is taken into account. The fee is aligned with the base fee applied on Binance, the largest cryptocurrency exchange.

## Strategy Logic

The core idea of the multi timeframe buy the dip strategy is to combine both long term and short term timeframes to determine entry signals.

First, it checks the 1-hour timeframe to see if there is a sudden price drop. This is confirmed by checking if the current candle has dropped more than 1% compared to the previous two candles.

Second, it checks the 12-hour timeframe to see if there is a significant uptrend in the long term. This is confirmed by calculating if the price has increased more than 3% in the last 12 hours.

Only when there is a short term drop and a long term uptrend will a buy signal be triggered.

This combination avoids blindly buying into a long term downtrend while also capturing short term pullback opportunities. The mix of timeframes makes the strategy more robust and reliable.

Technically, the strategy uses two `perc_change()` functions with different parameters to check the two timeframes. One checks the 12-hour change, the other checks the 1-hour change. When both conditions are met, a buy signal is triggered.

## Advantage Analysis 

The biggest advantage of the multi timeframe buy the dip strategy is that it can effectively determine trends and capture pullback opportunities. Specifically, the main advantages are:

1. Combining two timeframes avoids buying into a long term downtrend, reducing unnecessary losses.

2. The short term timeframe captures sudden pullbacks that provide lower entry prices.

3. Backtested and optimized parameters make the strategy more suitable for the high volatility of crypto.

4. Trading fees are considered, making simulations closer to real trading.

5. Simple logic and parameter configuration make it easy to understand and tune.

6. Widely applicable to different trading pairs with high flexibility.

## Risk Analysis

The multi timeframe buy the dip strategy also has some risks, mainly in the following areas:

1. Cannot fully avoid false breakout risks, short term pullbacks could be trend reversals.

2. Fixed parameters may fail to adapt fully to market changes, requiring adjustments.

3. Backtests always perform well in simulations, differences exist in live trading.

4. Some time lag risks missing the optimal entry points during price fluctuations. 

5. A single strategy is prone to systemic risks.

6. High frequency trading increases the burden of trading fees.

For the risks, some optimization measures can be considered:

1. Add more indicators to determine short and long trends to improve accuracy.

2. Optimize parameters to make them adapt more dynamically to markets.

3. Test strategies in a live environment to measure differences from backtests.

4. Adjust timeframes appropriately to reduce time lag issues. 

5. Use multiple non-correlated strategies to diversify systemic risks. 

6. Set proper stop loss and take profit to control risk per trade.

## Optimization Directions 

There is still large room for optimizing the multi timeframe buy the dip strategy, mainly in these areas:

1. Add more indicators like Bollinger Bands, RSI etc. to improve stability.

2. Incorporate machine learning models for dynamic parameter optimization to adapt to changing markets.

3. Optimize stop loss and take profit strategies to lower risk per trade.

4. Backtest on more trading pairs and timeframes to find optimal parameter sets.

5. Incorporate volume change to avoid false signals from arbitrage trades.

6. Add risk management modules like asset allocation, position sizing etc. to control overall risk. 

7. Explore other algorithmic strategy types like trend following, arbitrage etc. for diversification.

8. Research more complex multi timeframe combinations to find optimal sets.

9. Incorporate news trading elements using events as trading drivers.

With these optimization techniques, the strategy can become more robust, intelligent and comprehensive for the complexity of crypto markets. But any optimization needs prudent testing to avoid overfitting problems.

## Conclusion

Overall, the multi timeframe buy the dip strategy is a very practical short term trading system. It looks at both short and long term time dimensions simultaneously to improve accuracy while remaining relatively efficient. With proper parameter tuning and optimization, it can adapt to most trading markets, especially trending assets.

But like any mechanical strategy, it has limitations that require the trader to remain rational and continuously optimize and adapt to changing markets. A successful strategy is always evolving, not static.

In conclusion, the multi timeframe buy the dip strategy provides an excellent template for algorithmic trading. It summarizes the key points like choosing timeframes, configuring parameters, backtesting, risk control etc. Applying this strategy sensibly and improving it through practice can help traders grasp the essential clues amidst a sea of data, and achieve consistent alpha in the markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|10|From Day|
|v_input_3|2020|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|24|Lookback Long Period|
|v_input_9|2|Lookback Short Period|
|v_input_10|true|v_input_10|
|v_input_11|3|v_input_11|
|v_input_12|3|v_input_12|
|v_input_13|4|v_input_13|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-26 00:00:00
end: 2023-10-26 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule

//@version=1
strategy(shorttitle='Multi Time Frame Buy the Dips',title='Multi Time Frame Buy the Dips (by Coinrule)', overlay=true, initial_capital = 1000, default_qty_type = strategy.percent_of_equity, default_qty_value = 30, commission_type=strategy.commission.percent, commission_value=0.1)


//Backtest dates
fromMonth = input(defval = 1,  title = "From Month")     
fromDay   = input(defval = 10,    title = "From Day")       
fromYear  = input(defval = 2020, title = "From Year")       
thruMonth = input(defval = 1,    title = "Thru Month")     
thruDay   = input(defval = 1,    title = "Thru Day")     
thruYear  = input(defval = 2112, title = "Thru Year")       

showDate  = input(defval = true, title = "Show Date Range")

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true       // create function "within window of time"

inp_lkb = input(24, title='Lookback Long Period')
inp_lkb_2 = input(2, title='Lookback Short Period')
 
perc_change(lkb) =>
    overall_change = ((close[0] - close[lkb]) / close[lkb]) * 100

// Call the function    
overall = perc_change(inp_lkb)
overall_2 = perc_change(inp_lkb_2)

//Entry

dip= -(input(1))
increase= (input(3))

strategy.entry(id="long", long = true, when = overall > increase and overall_2 < dip and window()) 

//Exit
Stop_loss= ((input (3))/100)
Take_profit= ((input (4))/100)

longStopPrice  = strategy.position_avg_price * (1 - Stop_loss)
longTakeProfit = strategy.position_avg_price * (1 + Take_profit)

strategy.close("long", when = close < longStopPrice or close > longTakeProfit and window())

```

> Detail

https://www.fmz.com/strategy/430383

> Last Modified

2023-10-27 16:56:23
