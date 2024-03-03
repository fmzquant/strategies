
> Name

动量震荡带RSI交易策略Momentum-Oscillator-Bollinger-Band-RSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[简体中文]

## 概述

这个策略通过结合使用布林带和相对强弱指标RSI来预测价格波动性和最佳入场点。策略逻辑非常直接,我们关注收盘价触及布林带下轨的时候,之后会出现两种情况,价格要么从布林带下轨反弹,要么继续下跌。为了确认价格走势,我们采用第二个指标RSI进一步研究价格趋势。例如,如果价格触及布林带下轨但是RSI值没有进入超卖区,我们可以判断价格会继续下跌。如果RSI值进入超卖区,我们可以把这个价格区域作为我们的入场点。 

我们需要设置止损来避免如果RSI值过长时间滞留在超卖区而造成大量资金损失。

最佳止盈区域是当价格重新反弹到布林中轨/上轨以上或者RSI达到超买区时,以先到者为准。

多头入场: 

RSI < 30 且收盘价 < 布林下轨

多头离场:

RSI > 70

## 策略原理

该策略首先计算RSI指标,通过设定上下界来判断是否超买超卖。然后计算布林带的中轨、上轨和下轨。当收盘价触及布林下轨且RSI低于30时,做多;当RSI高于70时,平仓。

进入多头时,设置止盈止损点。止盈点设为入场价*(1+固定比例),止损点设为入场价*(1-固定比例)。

这样,我们在布林带下轨附近同时RSI低点时买入,在RSI高点时卖出,利用反转交易获利。同时设置止盈止损来控制风险。

## 优势分析

- 利用布林带判断价格反转点,增加准确性
- RSI指标过滤假突破,确保入场的可靠性
- 设置止盈止损,可以很好控制单次交易风险
- 回测数据充分,参数调优到位,实现稳定盈利

## 风险分析

- 布林带不能完全预测价格转折点,存在一定失败率
- RSI指标发出假信号的概率也存在
- 止损点过近无法持仓,过远增加风险

可以通过调整布林带参数,选用其他指标配合,以及适当放宽止损范围来降低风险。

## 优化方向

- 可以考虑结合其他指标如KD、MACD等过滤入场
- 动态调整止损止盈比例
- 优化布林带参数
- 测试不同交易品种参数健壮性

## 总结

该策略整体风险收益平衡良好,回测表现较好。通过参数调优和指标优化还可进一步提升效果。基于布林带的反转交易思路简单可靠,值得进一步研究改进。

||

## Overview

This strategy combines Bollinger Bands and the Relative Strength Index (RSI) indicator to predict price volatility and determine optimal entry points. The logic is straightforward - we watch for closing prices that touch the Bollinger lower band, after which there are two possible scenarios: either the price bounces back from the lower Bollinger band, or it continues falling. To confirm the price movement, we use a second indicator, RSI, to further investigate the trend. For example, if the price reaches the lower Bollinger band but the RSI value is not in oversold territory, we can conclude the price will continue down. If the RSI value is oversold, we can use this area as our entry point.  

A stop loss is necessary to avoid losing too much capital if the RSI lingers too long in oversold territory.

The best take profit area is when the price rebounds back above the Bollinger middle band/upper band or when RSI reaches overbought levels, whichever comes first.

Long entry:

RSI < 30 and close price < Bollinger lower band

Long exit: 

RSI > 70

## Strategy Logic

The strategy first calculates the RSI indicator and sets upper/lower boundaries to determine overbought/oversold levels. It then calculates the Bollinger middle, upper and lower bands. When the closing price touches the lower band and RSI is below 30, go long. When RSI is above 70, close the position.

Upon entering long, set stop loss and take profit points. The take profit is set at entry price * (1 + fixed percentage), stop loss is set at entry price * (1 - fixed percentage).

This allows us to buy at Bollinger lower band when RSI is low and sell when RSI is high, profiting from the reversal. Stop loss and take profit control risk.

## Advantage Analysis

- Bollinger Bands determine reversal points accurately 
- RSI filters out false breakouts, ensuring reliable entry
- Stop loss and take profit manage trade risk effectively
- Extensive backtesting and parameter optimization ensure stable profitability

## Risk Analysis

- Bollinger Bands do not perfectly predict reversals, some failures occur
- RSI can also give false signals 
- Stop loss too close cannot hold position, too loose increases risk

Risks can be mitigated by adjusting Bollinger parameters, using other indicators, and widening stop loss appropriately.

## Optimization Directions

- Consider combining with other indicators like KD, MACD to filter entries
- Dynamically adjust stop loss/take profit percentages
- Optimize Bollinger parameters  
- Test robustness across different products

## Conclusion

The overall risk/reward profile of this strategy is balanced and backtest results are good. Further improvements can be made through parameter optimization and indicator enhancements. The reversal trading concept based on Bollinger Bands is simple and reliable, warranting further research and refinement.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|20|BB Length|
|v_input_4|2|BB StdDev|
|v_input_5|false|BB Offset|
|v_input_6|false|Plot Cummulative PnL|
|v_input_7|false|Plot Current Position Size|
|v_input_8|10|Long Take Profit %|
|v_input_9|25|Long Stop Loss %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-09-17 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//strategy(title="Bollinger Band with RSI", shorttitle="BB&RSI", format=format.price, precision=2, pyramiding=50, initial_capital=10000, calc_on_order_fills=false, calc_on_every_tick=true, default_qty_type=strategy.cash, default_qty_value=1000, currency="USD")
len = input(14, minval=1, title="Length")
src = input(close, "Source", type = input.source)
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
plot(rsi, "RSI", color=#8E1599)
band1 = hline(70, "Upper Band", color=#C0C0C0)
band0 = hline(30, "Lower Band", color=#C0C0C0)
fill(band1, band0, color=#9915FF, transp=90, title="Background")

length_bb = input(20,title="BB Length", minval=1)
mult = input(2.0, minval=0.001, maxval=50, title="BB StdDev")
basis = sma(src, length_bb)
dev = mult * stdev(src, length_bb)
upper = basis + dev
lower = basis - dev
offset = input(0, "BB Offset", type = input.integer, minval = -500, maxval = 500)


Plot_PnL = input(title="Plot Cummulative PnL", type=input.bool, defval=false)
Plot_Pos = input(title="Plot Current Position Size", type=input.bool, defval=false)

long_tp_inp = input(10, title='Long Take Profit %', step=0.1)/100
long_sl_inp = input(25, title='Long Stop Loss %', step=0.1)/100
// Take profit/stop loss
long_take_level = strategy.position_avg_price * (1 + long_tp_inp)
long_stop_level = strategy.position_avg_price * (1 - long_sl_inp)

entry_long = rsi < 30 and src < lower
exit_long = rsi > 70

plotshape(entry_long, style=shape.labelup, color=color.green,  location=location.bottom, text="L", textcolor=color.white, title="LONG_ORDER")
plotshape(exit_long, style=shape.labeldown, color=color.red,  location=location.top, text="S", textcolor=color.white, title="SHORT_ORDER")

strategy.entry("Long",true,when=entry_long)    
strategy.exit("TP/SL","Long", limit=long_take_level, stop=long_stop_level)
strategy.close("Long", when=exit_long, comment="Exit")
plot(Plot_PnL ? strategy.equity-strategy.initial_capital : na, title="PnL", color=color.red)
plot(Plot_Pos ? strategy.position_size : na, title="open_position", color=color.fuchsia)

```

> Detail

https://www.fmz.com/strategy/427123

> Last Modified

2023-09-18 14:07:51
