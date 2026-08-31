
> Name

MACD-Golden-Cross-and-Death-Cross-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d668b94bd6a7c89a46.png)


#### Overview
This strategy uses the crossover of the DIF line and DEA line in the MACD indicator to generate trading signals. When the DIF line crosses above the DEA line, it generates a long signal; when the DIF line crosses below the DEA line, it generates a short signal. The backtesting results of this strategy show that on the BTCUSDT trading pair, the win rate is about 40%, and the annualized return is 1.05. However, it will cause the number of assets held to increase continuously, so it cannot be used as an independent arbitrage strategy.

#### Strategy Principle
1. Calculate the fast exponential moving average (EMA) and slow exponential moving average (EMA).
2. Calculate the DIF line, which is the difference between the fast EMA and the slow EMA.
3. Calculate the DEA line, which is the EMA of the DIF line.
4. Calculate the MACD histogram, which is the difference between the DIF line and the DEA line.
5. When the DIF line crosses above the DEA line, generate a long signal and open a long position.
6. When the DIF line crosses below the DEA line, generate a short signal, close the long position, and open a short position.
7. When the opposite crossover signal appears again, close the current position and open a position in the opposite direction.

#### Strategy Advantages
1. This strategy uses the widely used MACD indicator, which is easy to understand and implement.
2. The strategy logic is clear, and the trading signals are explicit.
3. It is suitable for trending markets and can track the main trends of the market.

#### Strategy Risks
1. The win rate of this strategy is low, only 40%, which means that 60% of the trades may be losing.
2. This strategy will cause the number of assets held to increase continuously, which may bring additional risk exposure.
3. In a fluctuating market, this strategy may generate frequent trading signals, leading to high trading costs.
4. This strategy does not consider risk management, such as stop-loss and position management, which may lead to significant losses.

#### Strategy Optimization Directions
1. Introduce trend filters, such as long-term moving averages, to avoid trading in fluctuating markets.
2. Optimize the parameters of the MACD indicator, such as the period of the fast EMA, slow EMA, and signal line, to adapt to different market conditions.
3. Add risk management measures, such as stop-loss and position management, to control potential losses.
4. Combine with other technical indicators or fundamental analysis to improve the reliability of trading signals.

#### Summary
The MACD golden cross and death cross strategy is a simple and easy-to-understand trading strategy that is suitable for trending markets. However, the win rate of this strategy is low, and it lacks risk management measures, so it needs further optimization and improvement. By introducing trend filters, optimizing parameters, adding risk management, and combining with other analysis methods, the performance and reliability of this strategy can be improved. Nevertheless, this strategy still cannot be used as an independent arbitrage strategy and needs to be combined with other strategies to obtain better trading results.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|快线长度|
|v_input_2|26|慢线长度|
|v_input_3|9|MACD 均线长度|
|v_input_4|green|MACD 柱在 0 线以上增长|
|v_input_5|#99e69c|MACD 柱在 0 线以下增长|
|v_input_6|orange|MACD 柱在 0 线以上下跌|
|v_input_7|red|MACD 柱在 0 线以下下跌|
|v_input_8|true|是否显示入场与出场信号|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-01 00:00:00
end: 2024-03-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=5
// @description 该策略使用 MACD DIF 线与 EDA 线产生金叉与死叉时进行入场与出场操作, 回测后发现胜率约 40%, BTCUSDT 年化利率 1.05, 同时会导致持有的资产数量不断上升, 无法作为一个独立的套利策略进行使用.

strategy("MACD 金叉策略", overlay=true)

fastLength = input(12, "快线长度")
slowLength = input(26, "慢线长度")
MACDLength = input(9, "MACD 均线长度")

deltaIncreaseOver0 = input(color.green,'MACD 柱在 0 线以上增长')
deltaIncreaseUnder0 = input(color.rgb(153, 230, 156),'MACD 柱在 0 线以下增长')

deltaDecreaseOver0 = input(color.orange,'MACD 柱在 0 线以上下跌')
deltaDecreaseUnder0 = input(color.red,'MACD 柱在 0 线以下下跌')

buySellEnabled = input(true, '是否显示入场与出场信号')

// @variable 做多轮数
var longRound = 0
// @variable 做空轮数
var shortRound = 0

DIF = ta.ema(close, fastLength) - ta.ema(close, slowLength) // 快慢均线差值
EDA = ta.ema(DIF, MACDLength) // DIF 线的 EMA 均线
delta = DIF - EDA // MACD 柱高度

// plot(0, 'Zero', color.black)
plot(DIF,'DIF', color.yellow)
plot(EDA, "EDA", color.purple)

isDeltaIncreasing = delta[1] < delta
isDeltaOver0 = delta > 0
deltaColor = isDeltaIncreasing ? (isDeltaOver0? deltaIncreaseOver0: deltaIncreaseUnder0) :( isDeltaOver0? deltaDecreaseOver0: deltaDecreaseUnder0)
plot(delta, "Delta", deltaColor, style = plot.style_columns)

isDeltaV = delta > delta[1] and delta[2] > delta[1]
isDeltaA = delta < delta[1] and delta[2] < delta[1]

longBuy(round) =>
	entry = str.format("做多买入 {0}",round)
	// log.info(str.format("{0} {1}",entry,close))
	strategy.entry(entry, strategy.long, comment=entry)

longSell(round) =>
	entry = str.format("做多买入 {0}",round)
	exit = str.format("做多卖出 {0}",round)
	// log.info(str.format("{0} {1}",exit,close))
	strategy.close(entry, comment=exit)		

shortSell(round) =>
	entry = str.format("做空卖出 {0}",round)
	// log.info(str.format("{0} {1}",entry,close))
	strategy.entry(entry, strategy.short, comment= entry) 

shortBuy(round) =>
	entry = str.format("做空卖出 {0}",round)
	exit = str.format("做空买入 {0}",round)
	// log.info(str.format("{0} {1}",exit,close))
	strategy.close(entry, comment=exit)		

if (buySellEnabled) 
	if (ta.crossunder(DIF, EDA))
		longSell(longRound)
	if (ta.crossover(DIF, EDA))
		longRound := longRound + 1
		longBuy(longRound)

		
		
```

> Detail

https://www.fmz.com/strategy/449510

> Last Modified

2024-04-26 12:08:24
