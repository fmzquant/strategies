
> Name

克特纳通道止盈止损策略Keltner-Channel-Stop-Loss-Take-Profit-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

### 策略概述

克特纳通道止盈止损策略是在克特纳通道分析方法的基础上,加入止盈止损规则来优化交易决策的量化策略。该策略监控价格与通道上下轨的关系,在突破发生时进入做多做空方向,并根据最优止盈止损点位实现风险和收益的平衡。

### 策略原理

1. 计算克特纳通道的中轨、上轨和下轨。

2. 价格触碰上轨时考虑做多机会;触碰下轨时考虑做空机会。

3. 价格突破上轨时入场做多;突破下轨时入场做空。

4. 设置止盈点为入场价上涨一定比例,止损点为入场价下跌一定比例。

该策略的优点是引入止盈止损规则,在顺势运行亏损过大时及时止损;在浪潮结束前及时止盈。同时也提供再次进入信号,可持续参与趋势交易。

参数可针对不同品种进行优化,以达到最佳风险收益平衡。

### 策略优势

- 克特纳通道判断趋势方向

- 止盈止损点位优化收益

- 可平滑出入场,避免假突破

- 策略灵活,参数可调整

- 可与其他指标组合使用

### 风险警示

- 需要适当提高止盈止损比率

- 仍有一定的止损风险

- 通道可能被突破形成亏损

- 停止损失过小可能造成频繁停损

### 总结

克特纳通道止盈止损策略对传统通道交易进行了优化,在追踪趋势的同时控制交易风险。通过反复回测和参数调整,可以获得良好的策略效果。该策略值得进行深入研究和实盘验证,可逐步提高策略的稳定性。


||

This is an SEO optimized article about the Keltner Channel Stop Loss Take Profit Strategy:

### Strategy Overview

The Keltner Channel Stop Loss Take Profit strategy optimizes trading decisions based on the Keltner Channel analysis by incorporating stop loss and take profit rules. It monitors the price relationship with the upper and lower channel bands, enters long or short trades on breakouts, and balances risk and reward according to optimal stop loss and take profit levels.

### Strategy Logic

1. Calculate the middle, upper and lower bands of the Keltner Channel.

2. Consider long opportunities when price touches upper band, and short opportunities when touching lower band.

3. Enter long trades on upper band breakouts, and enter short trades on lower band breakouts.  

4. Set take profit target at certain percentage above entry price, and stop loss target at certain percentage below entry price.

The advantage of this strategy is introducing stop loss and take profit rules to cut losses in time when trend goes wrong, and take profits before the wave ends. It also provides re-entry signals for sustained trend trading participation.

Parameters can be optimized for different assets to achieve best risk-reward balancing. 

### Advantages of the Strategy

- Keltner Channel determines trend direction

- Stop loss and take profit optimizes reward

- Smoothed entry and exit prevents false breaks

- Flexible parameters for adjustments

- Combinable with other indicators

### Risk Warnings

- Stop loss and take profit ratios need raise 

- Some stop loss risks remain

- Channels can be broken with losses

- Small stop loss causes frequent stops

### Conclusion

The Keltner Channel Stop Loss Take Profit Strategy optimizes traditional channel trading by controlling risks while trend following. Excellent strategy results can be achieved through extensive backtesting and parameter tuning. The strategy is worth in-depth research and live testing for gradually improving stability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|length|
|v_input_2|true|Multiplier|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|true|Use Exponential MA|
|v_input_5|0|Bands Style: Average True Range|True Range|Range|
|v_input_6|18|ATR Length|
|v_input_7|22|Stop Loss (%)|
|v_input_8|21|Take Profit (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-08-23 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Optimized Keltner Channels Strategy for BTC", overlay=true)
length = input(9, minval=1)
mult = input(1.0, "Multiplier")
src = input(close, title="Source")
exp = input(true, "Use Exponential MA")
BandsStyle = input("Average True Range", options = ["Average True Range", "True Range", "Range"], title="Bands Style")
atrlength = input(18, "ATR Length")
sl = input(defval=22, minval=0, title="Stop Loss (%)")
tp = input(defval=21, minval=0, title="Take Profit (%)")

esma(source, length)=>
	s = sma(source, length)
	e = ema(source, length)
	exp ? e : s
ma = esma(src, length)
rangema = BandsStyle == "True Range" ? rma(tr(true), length) : BandsStyle == "Average True Range" ? atr(atrlength) : rma(high - low, length)
upper = ma + rangema * mult
lower = ma - rangema * mult
c = color.blue
u = plot(upper, color=color.green, title="Upper")
plot(ma, color=#0094FF, title="Basis")
l = plot(lower, color=color.red, title="Lower")
fill(u, l, color=#0094FF, transp=95, title="Background")
crossUpper = crossover(src, upper)
crossLower = crossunder(src, lower)
bprice = 0.0
bprice := crossUpper ? close+syminfo.mintick : nz(bprice[1])
sprice = 0.0
sprice := crossLower ? close-syminfo.mintick : nz(sprice[1])
crossBcond = false
crossBcond := crossUpper ? true
     : na(crossBcond[1]) ? false : crossBcond[1]
crossScond = false
crossScond := crossLower ? true
     : na(crossScond[1]) ? false : crossScond[1]
cancelBcond = crossBcond and (src < ma or high >= bprice )
cancelScond = crossScond and (src > ma or low <= sprice )
if (cancelBcond)
	strategy.cancel("KltChLE")
if (crossUpper)
	strategy.entry("KltChLE", strategy.long, stop=bprice, comment="Long")
if (cancelScond)
	strategy.cancel("KltChSE")
if (crossLower)
	strategy.entry("KltChSE", strategy.short, stop=sprice, comment="Short")

strategy.exit("long exit", "KltChLE", profit = close * tp * 0.01 / syminfo.mintick, loss = close * sl * 0.01 / syminfo.mintick)
strategy.exit("Short exit", "KltChSE", profit = close * tp * 0.01 / syminfo.mintick, loss = close * sl * 0.01 / syminfo.mintick)

plot(bprice, color=color.green)
plot(sprice, color=color.red)
```

> Detail

https://www.fmz.com/strategy/426909

> Last Modified

2023-09-15 14:41:46
