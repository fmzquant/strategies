
> Name

比特币期货头寸智能交易策略Bitcoin-Futures-Position-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1f3e70c1a025dc443e4.png)
[trans]

概述:该策略使用Bitfinex的BTC期货头寸数据来指导交易。当短仓数量上升时做空,当短仓数量下降时做多。适用于跟随“智囊团”交易行为。

策略原理:
1. 使用Bitfinex BTC期货短仓数量作为指标。Bitfinex被认为是机构和“智囊团”主导的交易所。
2. 当短仓数量上升时,做空BTC现货。此时机构正在 加仓做空BTC。
3. 当短仓数量下降时,做多BTC现货。此时机构正在减仓,表明看涨迹象。 
4. 使用RSI指标来判断短仓数量的高点和低点。RSI高于75为高点信号,低于30为低点信号。
5. 在高低点发出信号时进入做多或做空仓位。

优势分析:
1. 使用Bitfinex专业交易员的仓位数据作为指示信号,可捕捉机构交易活动。
2. RSI指标有助判断短仓高低点,控制交易风险。
3. 实时监控机构交易动向,及时调整自己的仓位。
4. 无需自己分析技术指标,直接跟随“智囊团”的交易思路。
5. 回测数据表现不错,收益率较为可观。

风险分析:
1. 无法判断短仓数量增加是投机还是对冲。需谨慎跟随。
2. Bitfinex交易数据更新有延迟,可能错过最佳入场时机。  
3. 机构交易不是百分之百正确的,有失败的可能。
4. RSI参数设置不当可能导致虚假信号或漏失信号。
5. 止损设置过于宽松,单笔损失可能较大。

优化方向:
1. 优化RSI参数,测试不同持仓周期的效果。
2. 尝试其他指标如KD、MACD等判断短仓高低点。  
3. 缩紧止损幅度,降低单笔损失。
4. 增加离场条件,如趋势反转、breaker等信号。
5. 测试适用的币种范围,比如跟随BTC短仓交易ETH。

总结:
该策略通过跟随Bitfinex的BTC期货专业交易员,实现及时获知机构交易信号。有助投资者监测市场热度,把握高低点。同时也警示投资风险,当专业交易员大量做空时,要小心降低多头仓位。总体来说,该策略利用了期货头寸信息的优势,不失为一种有趣的交易思路。但参数优化和风险控制仍需进一步完善,才能在实盘中稳定获得收益。

||

Overview: This strategy uses BitMEX bitcoin futures position data to guide trades. It goes short when short positions increase and goes long when short positions decrease. Suitable for following “smart money” trading behavior.  

Strategy Logic:  
1. Use BitMEX bitcoin futures short positions as indicator. BitMEX is considered dominated by institutions and “smart money”.   
2. When short positions increase, go short on BTC spot. Institutions are adding to their short positions.  
3. When short positions decrease, go long on BTC spot. Institutions are reducing shorts, indicating bullish sentiment.
4. Use RSI indicator to detect peaks and troughs in short positions. RSI above 75 is peak signal, below 30 is trough signal.  
5. Enter long/short positions on peak/trough signals.  

Advantages Analysis:   
1. Uses position data from professional BitMEX traders, capturing institutional activity.  
2. RSI helps determine peaks/troughs, controlling trading risk.
3. Real-time monitoring of institutional moves to adjust own position accordingly.  
4. No need to analyze charts, directly follow “smart money” thinking. 
5. Backtest results look decent, respectable returns.  

Risk Analysis:   
1. Unable to tell if increase in shorts is speculative or hedging. Need to follow cautiously.   
2. BitMEX data has lag, may miss best entry price.   
3. Institutions are not 100% correct, failures happen.  
4. Poor RSI parameter tuning leads to false signals or missing signals.   
5. Stop loss too loose, single loss could be huge.   

Optimization Directions:
1. Optimize RSI parameters, test different holding periods.   
2. Try other indicators like KD, MACD to detect peaks/troughs.   
3. Tighter stop loss to limit single loss.  
4. Add exit conditions like trend reversal, breakers etc.  
5. Test applicability to other coins, e.g. follow BTC shorts to trade ETH.  

Summary:  
This strategy leverages BitMEX professional bitcoin futures traders to get timely signals. It helps investors gauge market sentiment and spot highs/lows. Also warns downside risks when whales are heavily short. Overall an interesting approach utilizing futures position data, but further refinement in parameters and risk control necessary before deploying live.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Jan 2021)|Start Date|
|v_input_2|timestamp(01 Jan 2024)|Start Date|
|v_input_3|BTC_USDT:swap|Bitfinex Short Symbol|
|v_input_4|7|(?RSI Settings)Length|
|v_input_5|75|High Shorts Threshold|
|v_input_6|30|Low Shorts Threshold|
|v_input_float_1|25|(?Stop Loss Settings)Long Stop Loss (%)|
|v_input_float_2|25|Short Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-26 00:00:00
end: 2024-01-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Bitfinex Shorts Strat", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10, precision=2, initial_capital=1000,
     pyramiding=2,
     commission_value=0.05)

//Backtest date range
StartDate = input(timestamp("01 Jan 2021"), title="Start Date")
EndDate = input(timestamp("01 Jan 2024"), title="Start Date")
inDateRange = true

symbolInput = input(title="Bitfinex Short Symbol", defval="BTC_USDT:swap")
Shorts = request.security(symbolInput, "", open)

// RSI Input Settings
length = input(title="Length", defval=7, group="RSI Settings" )
overSold = input(title="High Shorts Threshold", defval=75, group="RSI Settings" )
overBought = input(title="Low Shorts Threshold", defval=30, group="RSI Settings" )

// Calculating RSI
vrsi = ta.rsi(Shorts, length)
RSIunder = ta.crossover(vrsi, overSold)
RSIover = ta.crossunder(vrsi, overBought)

// Stop Loss Input Settings
longLossPerc = input.float(title="Long Stop Loss (%)", defval=25, group="Stop Loss Settings") * 0.01
shortLossPerc = input.float(title="Short Stop Loss (%)", defval=25, group="Stop Loss Settings") * 0.01

// Calculating Stop Loss
longStopPrice  = strategy.position_avg_price * (1 - longLossPerc)
shortStopPrice = strategy.position_avg_price * (1 + shortLossPerc)

// Strategy Entry
if (not na(vrsi))
	if (inDateRange and RSIover)
		strategy.entry("LONG", strategy.long, comment="LONG")
	if (inDateRange and RSIunder)
		strategy.entry("SHORT", strategy.short, comment="SHORT")

// Submit exit orders based on calculated stop loss price
if (strategy.position_size > 0)
    strategy.exit(id="LONG STOP", stop=longStopPrice)
if (strategy.position_size < 0)
    strategy.exit(id="SHORT STOP", stop=shortStopPrice)
```

> Detail

https://www.fmz.com/strategy/440084

> Last Modified

2024-01-26 15:01:24
