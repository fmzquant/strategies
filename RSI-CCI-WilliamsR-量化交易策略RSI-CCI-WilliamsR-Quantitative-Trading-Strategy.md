
> Name

RSI-CCI-WilliamsR-量化交易策略RSI-CCI-WilliamsR-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d145c1ffd030492c64.png)
 [trans]
##策略概述
该策略是一种中短期策略,结合RSI、CCI和威廉指标三个分类指标,实现买卖信号的有效组合。当三个指标同时显示超买或超卖信号时,策略会发出交易信号。相比单一使用某个指标,该组合策略可以过滤掉更多假信号,从而提高策略的稳定性。

策略名称定为“三迹rawler策略”,其中三迹喻指RSI、CCI和威廉指标的组合,Trawler则表示该策略像拖网渔船那样网住机会。

## 策略原理  
该策略主要依赖以下几个指标进行买卖判断:
1. RSI 指标判断超买超卖  
2. CCI 指标判断行情反转点  
3. Williams %R指标再次确认买卖时机

当RSI低于25时为超卖,高于75时为超买。当CCI低于-130时为超卖,高于130时为超买。当Williams %R低于-85时为超卖,高于-15时为超买。  

当上述三个指标同时显示买入信号时,即RSI < 25,CCI < -130,Williams %R < -85,则策略做多;当显示卖出信号时,即RSI > 75,CCI > 130,Williams %R > -15,则策略做空。

这样可以避免单一指标产生的假信号,提高信号的可靠性。同时配置止损和止盈,以控制单笔交易的风险和收益。

## 策略优势
1. 多指标组合过滤假信号  
该策略通过RSI、CCI、Williams %R三个指标的组合,可以有效过滤掉一些单一指标Below的假买卖信号,从而提升信号的可靠性。

2. 自动止盈止损管理风险  
策略内置了止盈和止损设置,可以自动对每笔交易设置止盈和止损价格,有效控制单笔交易的损失,避免超出可承受范围。

3. 适用于中短期交易  
该策略更适合中短期交易,通过指标组合判断较为明确的中短期趋势反转。对于短期噪音和中长期趋势识别能力较弱。  

4. 回测数据充足  
策略采用的是欧元兑美元的45分钟K线,这是外汇市场上流动性强、数据充足的品种,可以减少数据不足带来的过拟合风险。

## 策略风险
1. 中长期趋势判断能力较弱  
该策略更依赖指标的反转信号,对中长期趋势的判断和跟随能力较弱,如果遇到长期单边行情时,则交易获利空间会受到限制。  

2. 可能错过短期价格波动  
策略以45分钟为周期,无法抓住更高频 like的短期价格波动获利机会。如果短期存在更大的价格波动,策略可能会漏掉这些机会。

3. 系统性风险影响  
该策略主要运用于欧元兑美元品种。如果遇到重大的经济危机,全球外汇市场出现 Below波动,则策略的交易规则可能会失效,带来较大亏损。

## 策略优化方向 
1. 结合趋势跟随指标  
可以尝试在策略中加入平均线指标 like MA、Boll等,助力判断中长期趋势,在趋势方向更明确时开仓,可以提高获利概率。  

2. 优化止损止盈策略  
可以通过更多历史数据的回测,评估不同的止损止盈参数对最终盈利的影响,寻找最优参数组合。此外也可以考虑动态止损止盈。

3. 扩大适用品种  
当前策略主要运用于欧元兑美元品种。我们可以尝试在其他主流品种比如英镑、日元、澳元等品种中应用该策略,检验其稳定性和扩展性。

## 总结
“三迹Trawler策略”通过 RSI、CCI 和Williams %R三个指标的组合判断价格反转点,在超买超卖时发出交易信号。相比单一指标,该组合策略过滤了更多假信号,可以有效提高信号准确率。通过自动化的止盈止损管理,控制了交易风险。总体而言,该策略较为稳定,适合中短期操作,可以为我们的量化交易系统增加一个模块。但我们也要注意该策略在判断中长期趋势和抓住短期价格波动方面的不足。我们可以通过引入趋势跟随指标、优化止盈止损参数、扩大适用品种等手段不断完善该策略,使其成为量化系统中的一个稳定收益来源。

||

## Strategy Overview  
This strategy combines three classification indicators: RSI, CCI and Williams%R to generate effective trading signals. It will issue buy or sell signals when all three indicators concurrently display overbought or oversold signals. Compared to using a single indicator, this composite strategy filters out more false signals and improves stability.  

The strategy is named “Three Trail Trawler Strategy”. “Three Trail” refers to the combination of RSI, CCI and Williams%R. “Trawler” analogizes that this strategy trawls opportunities like a fishing trawler.  

## Strategy Logic   
The strategy mainly relies on the following indicators for trading decisions:

1. RSI indicator judging overbought/oversold levels   
2. CCI indicator identifying inflection points  
3. Williams%R indicator further confirming trading signals  

When RSI is below 25, it signals oversold status. When RSI is above 75, it signals overbought status. The same logic applies to CCI and Williams%R parameters. 

When all three indicators concurrently display buy signals, i.e. RSI < 25, CCI < -130, Williams %R < -85, the strategy will long. When all three indicators concurrently display sell signals, i.e. RSI > 75, CCI > 130, Williams %R > -15, the strategy will short.   

This avoids false signals from a single indicator and improves reliability. It also configures stop loss and take profit to control risks and returns per trade.

## Advantages
1. Multi-indicator combo filters false signals   
By combining RSI, CCI and Williams%R, the strategy filters out some false signals from individual indicators, improving accuracy.   

2. Auto stop loss/profit takes manages risks 
Inbuilt stop loss and take profit functions automatically set exit prices for each trade, effectively capping losses within tolerable thresholds.

3. Suits middle-term trading
The strategy works better for middle-term trades, clearly identifying middle-term inflection points via the indicator combo. It is weaker in spotting short-term noise and long-term trends.   

4. Solid backtest data  
The strategy uses 45-min bars of EUR/USD, a major forex pair with abundant liquidity and data, reducing overfit risks from insufficient data.

## Risks 
1. Weak long-term trend identification   
The strategy relies more on contrary signals. Its abilities to gauge and follow long-term trends are limited. During long-lasting one-way markets, profit potential is constrained.   

2. Missing short-term swings
With 45-min bars, the strategy misses profitable chances from more frequent short-term price swings. Greater volatility within the bar span could lead to missed opportunities.  

3. Systemic risks   
The strategy mainly applies to EUR/USD. In times of severe economic crisis that rocks the global forex market, its trading rules could fail, incurring huge losses.  

## Enhancement Areas
1. Adding trend-following indicators  
Try incorporating trending metrics like MA, Boll etc. to assist long-term trend recognition. Only taking positions along the general direction will improve win rate.  

2. Optimizing stop loss/profit parameters 
Backtest more historical data to assess the impact of various stop loss/profit parameters on final profitability, in order to find the optimum setting. Consider dynamic templating as well.  

3. Expanding products   
Currently mainly applies to EUR/USD. We can attempt to deploy it on other major currency pairs like GBP, JPY, AUD to examine its stability and transferability.  

## Conclusion
The “Three Trail Trawler Strategy” identifies price reversal points for overbought/oversold signals using a combination of RSI, CCI and Williams %R. Compared to individual metrics, this multi-indicator setup filters out more false signals and improves accuracy. The automated stop loss/profit taking functions also help cap trading risks. Overall, it is a stable strategy suitable for middle-term trading and can be a valuable module in our quantitative systems. Still we need to heed its deficiencies in long-term trend spotting and capturing short-term swings. Fine-tuning measures like adding trend metrics, optimizing exit parameters and expanding products will enhance the strategy as a steady profit engine for our quant systems.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSI Period|
|v_input_2|20|CCI Period|
|v_input_3|14|Williams %R Period|
|v_input_4|25|RSI Oversold Level|
|v_input_5|75|RSI Overbought Level|
|v_input_6|-130|CCI Oversold Level|
|v_input_7|130|CCI Overbought Level|
|v_input_8|-85|Williams %R Oversold Level|
|v_input_9|-15|Williams %R Overbought Level|
|v_input_10|1.2|Take Profit (%)|
|v_input_11|0.45|Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-16 00:00:00
end: 2024-01-23 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI CCI Williams %R Strategy with TP and SL", overlay=true)

// Input parameters for indicators
rsi_period = input(14, title="RSI Period")
cci_period = input(20, title="CCI Period")
williams_period = input(14, title="Williams %R Period")

// Thresholds for overbought and oversold conditions
rsi_oversold = input(25, title="RSI Oversold Level")
rsi_overbought = input(75, title="RSI Overbought Level")
cci_oversold = input(-130, title="CCI Oversold Level")
cci_overbought = input(130, title="CCI Overbought Level")
williams_oversold = input(-85, title="Williams %R Oversold Level")
williams_overbought = input(-15, title="Williams %R Overbought Level")

// Take profit and stop loss levels as a percentage
take_profit_pct = input(1.2, title="Take Profit (%)") / 100
stop_loss_pct = input(0.45, title="Stop Loss (%)") / 100

// Indicator calculations
rsi = ta.rsi(close, rsi_period)
cci = ta.cci(close, cci_period)
highestHigh = ta.highest(high, williams_period)
lowestLow = ta.lowest(low, williams_period)
williamsR = (highestHigh - close) / (highestHigh - lowestLow) * -100

// Entry conditions
longCondition = rsi < rsi_oversold and cci < cci_oversold and williamsR < williams_oversold and strategy.position_size == 0
shortCondition = rsi > rsi_overbought and cci > cci_overbought and williamsR > williams_overbought and strategy.position_size == 0

// Execute strategy entry orders
if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit("Take Profit or Stop Loss Long", "Long", limit=close * (1 + take_profit_pct), stop=close * (1 - stop_loss_pct))

if (shortCondition)
    strategy.entry("Short", strategy.short)
    strategy.exit("Take Profit or Stop Loss Short", "Short", limit=close * (1 - take_profit_pct), stop=close * (1 + stop_loss_pct))

// Plot the signals on the chart
plotshape(series=longCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.triangleup, text="BUY")
plotshape(series=shortCondition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.triangledown, text="SELL")

// Plot the indicators for visualization
plot(rsi, title="RSI", color=color.blue)
plot(cci, title="CCI", color=color.purple)
plot(williamsR, title="Williams %R", color=color.orange)
```

> Detail

https://www.fmz.com/strategy/439835

> Last Modified

2024-01-24 11:18:08
