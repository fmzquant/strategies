
> Name

双通道突破Turtle策略Double-Channel-Breakthrough-Turtle-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/142ee0bf172b07cc82c.png)

[trans]

## 概述

双通道突破Turtle策略是一个利用Donchian通道指标构建交易信号的突破策略。该策略同时建立快速通道和慢速通道,快速通道用于设置止损价格,慢速通道用于产生开仓和平仓信号。当价格突破慢速通道上轨时,做多;当价格跌破下轨时,做空。本策略具有趋势跟踪性强、回撤控制好等特点。

## 策略原理

双通道突破Turtle策略的核心逻辑基于Donchian通道指标。Donchian通道由最高价和最低价算得,包含上轨、下轨和中轨。该策略同时创建快速通道和慢速通道,参数由用户设定,默认慢速通道周期为50根K线,快速通道周期为20根K线。

慢速通道的上轨和下轨(蓝线)用于产生交易信号。当价格突破上轨时,做多;当价格跌破下轨时,做空。快速通道的中轨(红线)用于止损。做多止损价为快速通道中轨;做空止损价为快速通道中轨。

这样,慢速通道负责产生信号,快速通道负责止损,双通道配合使用,既保证了交易信号稳定性,也控制了风险。背景颜色表示当前头寸方向,绿色为多头,红色为空头。

此外,策略还设定了风险度数和仓位管理。风险度数默认为2%,仓位按风险度数和通道波动率计算。这样可以有效控制每单风险和逐步加仓。

## 优势分析

双通道突破Turtle策略具有以下优势:

1. 跟踪趋势能力强。利用Donchian通道判断趋势,能够有效捕捉中长线趋势。双通道设计使得策略只跟踪趋势较强的行情。

2. 回撤和风险控制好。快速通道中轨做止损,从上轨到中轨和从下轨到中轨就是风险区,这保证每单损失是可控的。策略还设定了风险度数,直接限制了账号最大损失。

3. 交易信号稳定。慢速通道参数大,通道形成需要较长时间,避免了频繁交易。而快速通道作止损则可以抓住短期调整。二者配合使用,形成稳定的交易信号。

4. 仓位和风险管理完善。策略利用Donchian通道波动率计算仓位规模,实现风险敞口控制。逐步加仓也使多空双方头寸较为均衡。

5. 可视化指标直观。双通道、止损线、头寸背景都清晰绘制,交易逻辑一目了然。同时展示了最大回撤、最大损失等关键指标。

## 风险分析

双通道突破Turtle策略也存在一定的风险:

1. 不能有效利用盘中价格。Turtle策略只在通道突破时开仓,无法利用更精确的情况加大仓位。这是可以通过优化改进的。

2. 停损点容易被追踪。Turtle策略的止损点是固定的快速通道中轨。活跃市场中这可能会被套住止损。这需要动态调整中轨参数。

3. 双通道参数需要细调。通道参数设置得当才能产生合理稳定的信号。当前固定参数不能适应市场的变化,需要引入自适应功能。

4. 无法利用夜盘和盘前信息。当前策略只根据实盘行情判断趋势,无法利用盘前盘后的行情指引交易决策。这是可以通过数据调整改善的。

## 优化方向  

双通道突破Turtle策略主要有以下几个优化方向:  

1. 利用盘中价格调整仓位。可以在盘中根据价格与通道的距离调整仓位大小,而不是简单做多做空。

2. 增加止损策略的智能化。将固定的止损中轨改为动态计算,避免止损点被追踪打击。

3. 通道参数自适应优化。让通道参数能够根据市场情况自动调整,而不是人工设置固定值。

4. 增加盘前盘后的行情判断。在策略判断中,不仅参考实盘价格,也应考量盘前和盘后的价格,获取更全面的市场情况。

5. 结合多个股票或指数交易。将策略应用于多个股票,不同股票和指数之间可配置套利交易,获得alpha。

## 总结

双通道突破Turtle策略整体来说是一个稳定、高效、带有风险控制的趋势跟踪策略。策略同时使用快速通道和慢速通道,既确保了交易信号的稳定性,也进行了风险管理。此外,背景颜色、最大回撤和仓位管理都使策略易于管理和优化。总的来说,该策略是一个值得深入研究和应用的高质量量化策略。

|| 

# Overview

The Double Channel Breakthrough Turtle Strategy is a breakout strategy that generates trading signals using the Donchian Channel indicator. The strategy establishes both fast and slow channels at the same time. The fast channel is used to set stop loss prices, while the slow channel is used to generate opening and closing signals. When the price breaks through the upper rail of the slow channel, go long; when the price breaks through the lower rail, go short. This strategy has the characteristics of strong trend tracking and good drawdown control.

# Principles  

The core logic of the Double Channel Breakthrough Turtle Strategy is based on the Donchian Channel indicator. The Donchian Channel consists of upper rail, lower rail and middle rail calculated from highest high and lowest low prices. This strategy creates both fast and slow channels simultaneously, with parameters set by the user and default periods of 50 bars for the slow channel and 20 bars for the fast channel.

The upper and lower rails (blue lines) of the slow channel are used to generate trading signals. When the price breaks through the upper rail, go long; when the price breaks below the lower rail, go short. The middle rail (red line) of the fast channel is used for stop loss. The stop loss price for long positions is the middle rail of the fast channel; the stop loss price for short positions is also the middle rail of the fast channel.  

Thus, the slow channel generates signals while the fast channel controls risks. Using double channels ensures both signal stability and risk control. Background colors indicate current position direction, with green for long and red for short.

In addition, the strategy also sets risk percentage and position sizing. Risk percentage defaults to 2%, and position sizes are calculated based on risk percentage and channel volatility. This effectively controls per trade risk and gradual position increase.

# Advantages

The Double Channel Breakthrough Turtle Strategy has the following advantages:

1. Strong trend tracking ability. Using Donchian Channel to determine trends can effectively capture medium-to-long-term trends. The double channel design ensures that the strategy only tracks strong trending markets.  

2. Good drawdown and risk control. The middle rail of the fast channel acts as a stop loss, so from upper to middle rail and lower to middle rail are risk zones. This ensures controllable loss per trade. The strategy also sets risk percentage to directly limit maximum account loss.

3. Stable trading signals. The large slow channel parameters require a relatively long time to form channels, avoiding excessive trading. While the fast channel stops loss and catches short-term corrections. The two complement each other to form stable trading signals.

4. Excellent position and risk management. The strategy uses Donchian channel volatility to calculate position sizing for risk exposure control. Gradual position increase also balances long and short positions.  

5. Intuitive visualization. Double channels, stop loss lines, position background are all clearly plotted for easy strategy logic comprehension. Meanwhile maximum drawdown, maximum loss and other key metrics are also displayed.

# Risks

The Double Channel Breakthrough Turtle Strategy also has some risks:

1. Unable to effectively utilize intraday prices. Turtle only opens positions on channel breakouts, unable to use more precise situation to increase positions. This can be improved through optimization.

2. Stop loss points are prone to hunting. Turtle's fixed middle rail stop loss can be easily hit in active markets. This requires dynamic adjustment of middle rail parameters. 

3. Double channel parameters need fine tuning. Proper parameter settings are crucial for reasonable steady signals. Current fixed parameters cannot adapt to market changes, adaptive features need to be introduced.

4. Unable to utilize overnight and pre-market information. Currently the strategy only judges trends based on live market data, unable to inform trading decisions with overnight and pre-market price actions. This can be addressed by data adjustment.

# Optimization Directions

The main optimization directions for the Double Channel Breakthrough Turtle Strategy are:

1. Use intraday prices to adjust positions. Positions can be adjusted based on price's distance from channel instead of just simple long/short.

2. Intelligent stop loss strategies. Change fixed middle rail stops to dynamic calculations to avoid fixed stop loss hunting.  

3. Adaptive channel parameter optimization. Allow channel parameters to automatically adjust based on market conditions instead of manual fixed values.  

4. Incorporate overnight and pre-market information. Consider not just live prices, but also overnight and pre-market prices when judging trends to obtain more complete market conditions.

5. Combine multiple stocks and indexes. Apply the strategy to multiple stocks, with inter-stock and index arbitrage opportunities for enhanced alpha.

# Conclusion

In conclusion, the Double Channel Breakthrough Turtle Strategy is an overall stable, efficient trend following strategy with embedded risk control. The dual usage of fast and slow channels ensures both signal stability and risk management. In addition, the position background, maximum drawdown and position sizing also make this strategy easily manageable and optimizable. In general, this is a high quality quantitative strategy worth thorough research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|2|Risk size, %|
|v_input_4|20|Fast channel (for stop-loss)|
|v_input_5|50|Slow channel (for entries)|
|v_input_6|true|Show offset|
|v_input_7|true|Show lines|
|v_input_8|true|Show label (drawdown)|
|v_input_9|true|Show background|
|v_input_10|1900|From Year|
|v_input_11|2100|To Year|
|v_input_12|true|From Month|
|v_input_13|12|To Month|
|v_input_14|true|From day|
|v_input_15|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-05 00:00:00
end: 2024-01-04 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2020

//@version=4
strategy("Noro's RiskTurtle Strategy", shorttitle = "RiskTurtle str", overlay = true, default_qty_type = strategy.percent_of_equity, initial_capital = 100, default_qty_value = 100, commission_value = 0.1)

//Settings
needlong  = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
risk      = input(2, minval = 0.1, maxval = 99, title = "Risk size, %")
fast      = input(20, minval = 1, title = "Fast channel (for stop-loss)")
slow      = input(50, minval = 1, title = "Slow channel (for entries)")
showof    = input(true, defval = true, title = "Show offset")
showll    = input(true, defval = true, title = "Show lines")
showdd    = input(true, defval = true, title = "Show label (drawdown)")
showbg    = input(true, defval = true, title = "Show background")
fromyear  = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear    = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth   = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday   = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today     = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Donchian price channel fast
hf = highest(high, fast)
lf = lowest(low, fast)
center = (hf + lf) / 2

//Donchian price chennal slow
hs = highest(high, slow)
ls = lowest(low, slow)

//Lines
colorpc = showll ? color.blue : na
colorsl = showll ? color.red : na
offset = showof ? 1 : 0
plot(hs, offset = offset, color = colorpc, title = "Slow channel high")
plot(ls, offset = offset, color = colorpc, title = "Slow channel low")
plot(center, offset = offset, color = colorsl, title = "Fast channel stop-loss")

//Background
size = strategy.position_size
colorbg = showbg == false ? na : size > 0 ? color.lime : size < 0 ? color.red : na
bgcolor(colorbg, transp = 70)

//Var
loss = 0.0
maxloss = 0.0
equity = 0.0
truetime = true

//Lot size
risksize = -1 * risk
risklong = ((center / hs) - 1) * 100
coeflong = abs(risksize / risklong)
lotlong = (strategy.equity / close) * coeflong
riskshort = ((center / ls) - 1) * 100
coefshort = abs(risksize / riskshort)
lotshort = (strategy.equity / close) * coefshort

//Orders
strategy.entry("Long", strategy.long, lotlong, stop = hs, when = needlong and strategy.position_size == 0 and hs > 0 and truetime)
strategy.entry("Short", strategy.short, lotshort, stop = ls, when = needshort and strategy.position_size == 0 and ls > 0 and truetime)
strategy.exit("LongExit", "Long", stop = center, when = needlong and strategy.position_size > 0)
strategy.exit("Short", stop = center, when = needshort and strategy.position_size < 0)
if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
    strategy.cancel("Long")
    strategy.cancel("Short")
    
if showdd

    //Drawdown
    max = 0.0
    max := max(strategy.equity, nz(max[1]))
    dd = (strategy.equity / max - 1) * 100
    min = 100.0
    min := min(dd, nz(min[1]))
    
    //Max loss size
    equity := strategy.position_size == 0 ? strategy.equity : equity[1]
    loss := equity < equity[1] ? ((equity / equity[1]) - 1) * 100 : 0
    maxloss := min(nz(maxloss[1]), loss)
    
    //Label
    min := round(min * 100) / 100
    maxloss := round(maxloss * 100) / 100
    labeltext = "Drawdown: " + tostring(min) + "%" + "\nMax.loss " + tostring(maxloss) + "%"
    var label la = na
    label.delete(la)
    tc = min > -100 ? color.white : color.red
    osx = timenow + round(change(time)*10)
    osy = highest(100)
    // la := label.new(x = osx, y = osy, text = labeltext, xloc = xloc.bar_time, yloc = yloc.price, color = color.black, style = label.style_labelup, textcolor = tc)
```

> Detail

https://www.fmz.com/strategy/437799

> Last Modified

2024-01-05 16:16:44
