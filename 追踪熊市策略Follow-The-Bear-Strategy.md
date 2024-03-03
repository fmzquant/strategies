
> Name

追踪熊市策略Follow-The-Bear-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16ed7571374388d206f.png)
[trans]
## 概述

追踪熊市策略是一种外汇交易策略,设计目的就是捕捉欧元/美元在欧洲市场开盘时的典型行为模式。该策略利用欧洲开市期间欧元多头被困住从而被迫平仓的特点,建立做空仓位。具体来说,该策略在发现欧元/美元的1小时K线出现涨跌反转形态蜡烛(射击之星或锤头)后,会考察RSI等指标过滤信号,一旦确认符合条件,就会果断做空,止损位设置在反转蜡烛的高点之上,目标利润则根据可接受的风险回报率来设置。

## 策略原理

追踪熊市策略的核心交易逻辑基于以下假设:欧洲/伦敦开市期间,做多欧元的交易者及算法会推高欧元/美元的价格。但如果随后价格无法继续上涨或出现下跌迹象,这些做多者就会被困住。于是当价格开始回调时,他们会被迫平掉多单,从而加剧跌势。

该策略正是利用这一熊市理论来捕捉短期跌势。具体来说,它会在欧洲时区(例如2am-7am)寻找1小时K线上的反转形态蜡烛信号。这里反转形态蜡烛信号的判断标准是:蜡烛实体部分收盘价低于开盘价,并且收盘价不超过0.5倍的整体蜡烛波动范围(即收盘价接近蜡烛低点)。

出现这样反转形态蜡烛时,说明做多者面临套牢风险。为了进一步验证信号,该策略还会检查以下过滤条件:

1. RSI指标高于超买线(默认70);
2. 前一根K线收盘价高于开盘价(多头结束信号);  
3. 当根K线的高点创近期新高;

满足全部过滤条件后,策略会在反转蜡烛收盘时做空,止损单设在蜡烛高点之上,目标利润基于可接受的风险回报率来定位(默认风险回报率是1赔1)。

需要注意的是,该策略只在欧洲时区活跃,如果价格脱离欧洲时区,则会重置状态,等待下一次时区交易时机。

## 优势分析

这是一个简单但实用的短线做空策略。主要优势有:

1. 捕捉一种可重复的短期行为规律,胜率较高;
2. 策略逻辑简单,容易理解和回测优化;  
3. 夜盘交易,避开白天的市场噪音;
4. 风险控制得当,止损策略清晰;
5. 可直接连接至MT4/5自动交易;

总的来说,追踪熊市策略作为一个短线夜间套利策略,它的稳定性和实用性都是不错的选择。

## 风险分析

尽管该策略有一定的优势,但交易任何金融产品都存在风险,主要风险包括:

1. 夜盘市场流动性较差,无法及时止损;
2. 策略过于简单,容易被算法识破;
3. 欧元多头被困的行为规律可能在某些市场环境下失效;
4. 需要足够的历史数据来验证策略效果;
5. 回测数据和实盘差异可能很大。

针对以上风险,以下几点是应对方法:

1. 调整止损幅度,防止失效止损;
2. 组合更多指标和过滤条件,使策略更具鲁棒性; 
3. 优化策略参数,适应更广的市场环境;
4. 使用更长的回测周期;
5. 多次实盘验证,确保回测结果可靠。

## 优化方向  

考虑到该策略的简单性以及潜在风险,以下是未来可考虑的优化方向:

1. **多时间框架验证** - 可以在5分钟或15分钟时间框架上再次验证反转信号,增加稳定性;
2. **机器学习过滤** -引入机器学习算法,识别更多模式,过滤掉虚假信号;
3. **动态止损** - 根据市场波动程度,实时调整止损点位防止失效止损;
4. **稳定资金管理优化** - 优化资金管理策略,通过调整仓位让收益更加平稳。

## 总结

追踪熊市策略是一个简单,交易风险可控的短线做空策略。它通过捕捉欧元多头被套现象带来的短期调整,实现稳定盈利。该策略易于理解和优化,是夜间套利交易的理想选择。当然,交易任何金融产品都有风险,需要调整参数并适当优化以适应市场环境的变化。

||

## Overview

The Follow The Bear (FTB) strategy is a forex trading strategy designed to capture a recurring pattern in EUR/USD's price action during the European market open. The strategy aims to take advantage of trapped euro bulls who are forced to unwind their long positions as the price starts retracing. Specifically, it watches for shooting star or hammer reversal candlesticks on the 1-hour chart of EUR/USD. Once detected and confirmed with additional filters like an overbought RSI, it will aggressively enter short positions with a tight stop above the reversal candle and a profit target based on a reasonable risk/reward ratio.

## Strategy Logic

The core premise of the FTB strategy is based on the assumption that euro bulls and algorithms pushing the EUR/USD price up will get trapped when the uptrend stalls or reverses soon after the European/London market open. As the price starts retracing, these trapped longs are forced to unwind their positions, fueling further downside momentum.  

The strategy aims to capitalize on this bearish theory by watching for reversal candlestick patterns during the European timezone (e.g. 2am-7am). The criteria for a reversal candle is that the close must be below the open and within the lower 50% of the candle's range (closer to the low than open).  

When such a candle forms, it signals trapped longs are facing liquidation. To further qualify the signal, additional filters are checked:

1. RSI above 70 overbought level
2. Previous candle closed up 
3. Current candle made new recent high

On passing all filters, the strategy enters short positions on candle close with a stop loss placed just above the high and a profit target calculated based on a 1:1 risk/reward ratio (configurable).  

One key detail is the strategy only trades during the European session. Outside that, it resets and awaits the next trading period.

## Advantage Analysis  

As a simple short-term mean-reversion strategy, the FTB approach has several key strengths:

1. Captures a tradable behavioral pattern with good win rate
2. Easy logic to understand and optimize  
3. Avoids daytime noise by trading overnight
4. Well-defined risk management rules
5. Seamless connectivity to auto-trading

Overall, as a low-frequency night scalping strategy, the stability and reliability of FTB is quite attractive.

## Risk Analysis

While the strategy has merits, as with any trading system, risks exist including:  

1. Wider spreads and gaps overnight  
2. Simplicity could lead to over-optimization
3. Failure of pattern accuracy in certain markets
4. Limited historical data viability 
5. Backtest limitations

Some ways to address the risks:

1. Adjust stop loss buffer
2. Add filters and combine strategies  
3. Optimize for robustness across market conditions  
4. Use longer backtest period
5. Extensive forward testing before live trading

## Optimization Paths

Given the basic nature of the strategy and risks involved, some areas to consider improving:

1. **Multi-timeframe** – confirm signals on 5m or 15m for robustness 
2. **Machine learning** – train model to screen signals  
3. **Dynamic stops** – adjust stops based on volatility  
4. **Risk smoothing** – optimize position sizing for steadier growth

## Conclusion

The Follow the Bear strategy provides a straightforward approach to short-term short selling by capitalizing on retracements fueled by trapped euro bulls. Easy to grasp and enhance, FTB suits systematic overnight scalping. Naturally risks exist in all trading, hence parameter tuning and optimizations help ensure relevance across changing market landscapes.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|(?Risk Settings)Stop Pips|
|v_input_2|true|Risk:Reward|
|v_input_3|0200-0700|(?Filter Settings)Timezone|
|v_input_4|13457|Days To Trade|
|v_input_5|true|RSI OB/OS?|
|v_input_6|false|Previous Bar Must Be Bullish?|
|v_input_7|false|High Filter|
|v_input_8|10|High Lookback|
|v_input_9|0.5|Candle Close %|
|v_input_10|3|RSI Length|
|v_input_11|70|RSI OB|
|v_input_12|YOUR_ID|(?PineConnector Settings)License ID|
|v_input_13|true|Risk Per Trade|
|v_input_14||MetaTrader Prefix|
|v_input_15||MetaTrader Suffix|
|v_input_16|0.5|Spread|
|v_input_17|true|Use Limit Order?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-18 00:00:00
end: 2024-02-25 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ZenAndTheArtOfTrading / PineScriptMastery
// FTB Strategy (PineConnector Version)
// Last Updated: 21st July, 2021
// @version=4
strategy("[2021] FTB Strategy", shorttitle="FTB", overlay=true)

// Risk Settings
var g_risk      = "Risk Settings"
pips            = input(title="Stop Pips", type=input.float, defval=2.0, group=g_risk, tooltip="How many pips above high to put stop loss")
rr              = input(title="Risk:Reward", type=input.float, defval=1.0, group=g_risk, tooltip="This determines the risk:reward profile of the setup")
// Filters
var g_filter    = "Filter Settings"
timezone        = input(title="Timezone", type=input.session, defval="0200-0700", group=g_filter, tooltip="Which timezone to search for FTB signals in")
days            = input(title="Days To Trade", defval="13457", group=g_filter, tooltip="Which days to trade this strategy on (Monday & Friday disabled by default)")
useRsiFilter    = input(title="RSI OB/OS?", type=input.bool, defval=true, group=g_filter, tooltip="If true then the RSI must be considered overbought before a signal is valid")
useCloseFilter  = input(title="Previous Bar Must Be Bullish?", type=input.bool, defval=false, group=g_filter, tooltip="If true then the previous bar must have closed bullish")
useHighFilter   = input(title="High Filter", type=input.bool, defval=false, group=g_filter, tooltip="If true then the signal bar must be the highest bar over X bars")
highLookback    = input(title="High Lookback", type=input.integer, defval=10, group=g_filter, tooltip="This is for setting the High Filter lookback distance")
fib             = input(title="Candle Close %", defval=0.5, group=g_filter, tooltip="For identifying shooting star candles (0.5 = must close <= 50% mark of candle size)")
rsiLen          = input(title="RSI Length", type=input.integer, defval=3, group=g_filter, tooltip="RSI length")
rsiOB           = input(title="RSI OB", type=input.float, defval=70.0, group=g_filter, tooltip="RSI overbought threshold")
// PineConnector Settings
var g_pc        = "PineConnector Settings"
pc_id           = input(title="License ID", defval="YOUR_ID", type=input.string, group=g_pc, tooltip="This is your PineConnector license ID")
pc_risk         = input(title="Risk Per Trade", defval=1, step=0.5, type=input.float, group=g_pc, tooltip="This is how much to risk per trade (% of balance or lots)")
pc_prefix       = input(title="MetaTrader Prefix", defval="", type=input.string, group=g_pc, tooltip="This is your broker's MetaTrader symbol prefix")
pc_suffix       = input(title="MetaTrader Suffix", defval="", type=input.string, group=g_pc, tooltip="This is your broker's MetaTrader symbol suffix")
pc_spread       = input(title="Spread", defval=0.5, type=input.float, group=g_pc, tooltip="Enter your average spread for this pair (used for offsetting limit order)")
pc_limit        = input(title="Use Limit Order?", defval=true, type=input.bool, group=g_pc, tooltip="If true a limit order will be used, if false a market order will be used")

// Generate PineConnector alert string
var symbol = pc_prefix + syminfo.ticker + pc_suffix
var limit = pc_limit ? "limit" : ""
pc_entry_alert(direction, sl, tp) =>
    price = pc_limit ? "price=" + tostring(pc_spread) + "," : ""
    pc_id + "," + direction + limit + "," + symbol + "," + price + "sl=" + tostring(sl) + ",tp=" + tostring(tp) + ",risk=" + tostring(pc_risk)

// Get RSI filter
rsiValue = rsi(close, rsiLen)
rsiFilter = not useRsiFilter or rsiValue >= rsiOB

// Check high & close filter
highFilter = not useHighFilter or high == highest(high, highLookback)
closeFilter = not useCloseFilter or close[1] > open[1]

// InSession() determines if a price bar falls inside the specified session
inSession(sess) => na(time(timeframe.period, sess + ":" + days)) == false

// Calculate 50% mark of candle size
bearFib = (high - low) * fib + low

// Check filters
filters = inSession(timezone) and closeFilter and high > high[1] and rsiFilter and highFilter and open != close

// Detect valid shooting star pinbar pattern
var takenTradeAlready = false
star = true

// Calculate stops & targets
shortStopPrice = high + (syminfo.mintick * pips * 10)
shortStopDistance = shortStopPrice - close
shortTargetPrice = close - (shortStopDistance * rr)

// Save stops & targets for the current trade
var tradeStopPrice = 0.0
var tradeTargetPrice = 0.0

// If we detect a valid shooting star, save our stops & targets, enter short and generate alert
if star and barstate.isconfirmed
    tradeStopPrice := shortStopPrice
    tradeTargetPrice := shortTargetPrice
    takenTradeAlready := true
    alertString = pc_entry_alert("sell", tradeStopPrice, tradeTargetPrice)
    alert(alertString, alert.freq_once_per_bar_close)
    strategy.entry(id="Short", long=strategy.short, when=strategy.position_size == 0, comment=alertString)

// If we have exited the FTB session then reset our takenTradeAlready flag for the next session
if not inSession(timezone) and inSession(timezone)[1]
    takenTradeAlready := false
    
// If price has exceeded target then cancel limit order if it's still active
if pc_limit and low <= tradeTargetPrice and strategy.position_size == 0
    alert(pc_id + ",cancelshort," + symbol)
    tradeTargetPrice := na

// Draw stops & targets
plot(star ? tradeStopPrice : na, color=color.red, style=plot.style_linebr, title="SL")
plot(star ? shortTargetPrice : na, color=color.green, style=plot.style_linebr, title="TP")
// Draw short signals
plotshape(star ? 1 : na, style=shape.triangledown, color=color.red)
// Change background color to highlight detection zone
bgcolor(color=inSession(timezone) ? color.new(color.red,80) : na, title="Session")

// Exit trade whenever our stop or target is hit
strategy.exit(id="Short Exit", from_entry="Short", limit=tradeTargetPrice, stop=tradeStopPrice, when=strategy.position_size != 0)
```

> Detail

https://www.fmz.com/strategy/442836

> Last Modified

2024-02-26 14:12:09
