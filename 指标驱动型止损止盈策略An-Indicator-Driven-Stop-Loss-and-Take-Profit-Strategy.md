
> Name

指标驱动型止损止盈策略An-Indicator-Driven-Stop-Loss-and-Take-Profit-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d761aeb2d9d27ca74e.png)


## Overview

This strategy uses a moving average as trading signals and combines it with user-defined stop loss and take profit ratios to implement a complete indicator-driven stop loss and take profit strategy. It can enter trades, set stop loss, and take profit automatically without manual interference, suitable for algorithmic trading.

## Strategy Logic

The core logic of this strategy is:

1. Use 3-period SMA as trading signals, go long when SMA crosses above 0, and go short when SMA crosses below 0.

2. After entering a trade, users can customize the stop loss and take profit ratios.

3. Based on entry price and stop loss ratio set by user, automatically set stop loss line.

4. Based on entry price and take profit ratio set by user, automatically set take profit line. 

5. When price touches stop loss line, stop out automatically. When price touches take profit line, take profit automatically.

6. After closing positions, automatically cancel stop loss and take profit orders.

Specifically, the strategy calculates 3-period SMA using sma function and assigns it to ma variable.

Then it calculates the long entry line long, which is ma plus ma% of lo. lo is a user adjustable parameter for long entry line offset.

When ma crosses above 0, it signals a long entry. Strategy enters long using strategy.entry function with entry price set to long.

At the same time, stop loss and take profit prices are set. Stop loss price is entry price minus entry price% of sl. sl is user adjustable stop loss ratio parameter. Take profit price is entry price plus entry price% of tp. tp is user adjustable take profit ratio parameter.

Strategy.entry function sets stop loss and take profit orders separately. When price touches stop loss line, it will stop out automatically. When price touches take profit line, it will take profit automatically.

After closing positions, stop loss and take profit orders are cancelled automatically using strategy.cancel function.

## Advantages

The advantages of this strategy:

1. High degree of automation, no manual interference needed, suitable for algorithm trading.

2. Customizable stop loss and take profit ratios to control risk.

3. Trading signals come from indicator, avoiding false breakout. 

4. Visualized stop loss and take profit, intuitive.

5. Simple and clear strategy logic, easy to understand and implement.

## Risks and Solutions

There are also some risks with this strategy:

1. Risk of false signals from indicator. Solution is to optimize parameters to ensure reliable indicator.

2. Improper stop loss and take profit ratio settings, could be too loose or too aggressive. Solution is to adjust ratios for different markets.

3. Breakout entry is prone to being trapped. Solution is to filter entry signals with trend, volume etc. 

4. Potentially large drawdown. Solution is to lower position sizing or use trailing stop loss.

## Optimization Directions

Some directions to optimize the strategy:

1. Optimize moving average parameters for reliability.

2. Optimize entry conditions to avoid false breakout, add volume confirmation etc.

3. Optimize stop loss and take profit, use dynamic or trailing stop loss etc. 

4. Optimize risk management, adjust position sizing, lower single trade risk.

5. Optimize entry timing, combine with trend, support/resistance etc. 

6. Add pyramiding for compounding gains.

7. Parameter optimization for specific products.

## Conclusion

This strategy provides a simple and reliable technical framework for indicator-driven stop loss and take profit with advantages like automation and risk control. It is suitable for algorithmic trading. There are also many aspects that can be improved and optimized, such as indicator parameters, entry filters, stop loss/take profit strategies, risk management etc. With further extensions and optimizations, it can become an even more powerful trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|-5|Long-line, %|
|v_input_2|5|Take-profit|
|v_input_3|2|Stop-loss|
|v_input_4|true|Display info panels?|
|v_input_5|20|Info panel offset|
|v_input_6|0|Info panel label size: size.large|size.small|size.normal|size.tiny|size.huge|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-11-09 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("example for panel signals", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)
//https://www.tradingview.com/script/m2a04xmb-noro-s-shiftma-tp-sl-strategy/
//Settings
lo = input(-5.0, title = "Long-line, %")
tp = input(5.0, title = "Take-profit")
sl = input(2.0, title = "Stop-loss")

//SMA
ma = sma(ohlc4, 3)
long = ma + ((ma / 100) * lo)

//Orders
avg = strategy.position_avg_price
if ma > 0
    strategy.entry("Long", strategy.long, limit = long)
    strategy.entry("Take", strategy.short, 0, limit = avg + ((avg / 100) * tp))
    strategy.entry("Stop", strategy.short, 0, stop = avg - ((avg / 100) * sl))
    
//Cancel order
if strategy.position_size == 0
    strategy.cancel("Take")
    strategy.cancel("Stop")

//Lines
plot(long, offset = 1, color = color.black, transp = 0)
take = avg != 0 ? avg + ((avg / 100) * tp) : long + ((long / 100) * tp)
stop = avg != 0 ? avg - ((avg / 100) * sl) : long - ((long / 100) * sl)
takelinecolor = avg == avg[1] and avg != 0 ? color.lime : na
stoplinecolor = avg == avg[1] and avg != 0 ? color.red : na
plot(take, offset = 1, color = takelinecolor, linewidth = 3, transp = 0)
plot(stop, offset = 1, color = stoplinecolor, linewidth = 3, transp = 0)
//
disp_panels = input(true, title="Display info panels?")
h=high
info_label_off = input(20, title="Info panel offset")
info_label_size = input(size.large, options=[size.tiny, size.small, size.normal, size.large, size.huge], title="Info panel label size")
info_panel_x = timenow + round(change(time)*info_label_off)
info_panel_y = h

info_title= "-=-=-=-=- Info Panel -=-=-=-=-"
info_div = "\n\n------------------------------"
a = "\n\ Long : " + tostring(long)
b = "\n\ Stop loss : " + tostring(stop)
c = "\n\ TP : " + tostring(take)
// info_text = a+c+b
// info_panel = disp_panels ? label.new(x=info_panel_x, y=info_panel_y, text=info_text, xloc=xloc.bar_time, yloc=yloc.price, color=color.yellow, style=label.style_labelup, textcolor=color.black, size=info_label_size) : na
// label.delete(info_panel[1])



```

> Detail

https://www.fmz.com/strategy/431665

> Last Modified

2023-11-10 11:28:06
