
> Name

MACD和RSI指标融合的震荡市场交易策略Trading-Strategy-for-Oscillating-Markets-Combining-MACD-and-RSI-Indicators

> Author

ChaoZhang

> Strategy Description


This strategy is named "Trading Strategy for Oscillating Markets Combining MACD and RSI Indicators". It is designed specifically for the recent oscillating and ranging crypto markets, generating trade signals by integrating the trend indicator MACD and the momentum oscillator RSI.

MACD is the moving average convergence divergence indicator, judging market trend and reversals. MACD crossover with the fast line crossing above the slow line generates buy signals, while crossover below generates sell signals. 

RSI is the relative strength index, gauging overbought and oversold conditions. RSI above 50 suggests overbought state, while below 50 is oversold. This strategy uses RSI to filter some noisy signals from MACD.

The trading logic is as follows:

When MACD crossover happens with the fast line crossing above the slow line, it indicates the short-term trend is changing from down to up, but a buy signal is only confirmed when RSI is at low levels (below preset parameter) to avoid whipsaws in overbought zones.

When MACD crossover happens with the fast line crossing below the slow line, it flags the short-term trend reversing from up to down, but a sell signal is only confirmed when RSI reaches high levels (above preset parameter) to avoid whipsaws in oversold zones.

This strategy suits the current oscillating and ranging crypto markets to capture reversal opportunities at highs and lows for profits. But stop loss should be applied to limit single trade loss. Also, MACD and RSI parameters need market-adjusted optimization for reliable signals.

In conclusion, combining MACD and RSI can improve strategy effectiveness for oscillating markets. But no indicators can perfectly predict markets. Traders still need sound market trend judgment and flexible strategy adjustment.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|13|Start Date|
|v_input_2|6|Start Month|
|v_input_3|2022|Start Year|
|v_input_4|true|End Date|
|v_input_5|7|End Month|
|v_input_6|2200|End Year|
|v_input_7|14|length|
|v_input_8|55|overSold|
|v_input_9|50|overBought|
|v_input_10|12|fastLength|
|v_input_11|26|slowlength|
|v_input_12|9|MACDLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-06 00:00:00
end: 2023-03-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Range Strat - MACD/RSI", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=100, precision=2, initial_capital=100,
     pyramiding=2,
     commission_value=0.05)

// Make input options that configure backtest date range
startDate = input(title="Start Date", defval=13)
startMonth = input(title="Start Month", defval=6)
startYear = input(title="Start Year", defval=2022)

endDate = input(title="End Date", defval=1)
endMonth = input(title="End Month", defval=7)
endYear = input(title="End Year", defval=2200)

// Look if the close time of the current bar
// falls inside the date range
inDateRange = (time >= timestamp(syminfo.timezone, startYear,
         startMonth, startDate, 0, 0)) and
     (time < timestamp(syminfo.timezone, endYear, endMonth, endDate, 0, 0))

// RSI Settings
length = input( 14 )
overSold = input( 55 )
overBought = input( 50 )
price = open
vrsi = ta.rsi(price, length)
cu = (vrsi <= overSold)
co = (vrsi >= overBought)

//MACD Settings
fastLength = input(12)
slowlength = input(26)
MACDLength = input(9)
MACD = ta.ema(open, fastLength) - ta.ema(open, slowlength)
aMACD = ta.ema(MACD, MACDLength)
delta = MACD - aMACD
MACDco = ta.crossover(delta, 0)
MACDcu = ta.crossunder(delta, 0)

// Strategy Entry
if (not na(vrsi))
	if (inDateRange and MACDco and cu)
		strategy.entry("LONG", strategy.long, comment="LONG")
	if (inDateRange and MACDcu and co)
		strategy.entry("SHORT", strategy.short, comment="SHORT")
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)


```

> Detail

https://www.fmz.com/strategy/426588

> Last Modified

2023-09-13 15:14:43
