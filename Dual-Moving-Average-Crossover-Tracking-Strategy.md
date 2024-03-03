
> Name

Dual-Moving-Average-Crossover-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description


[trans] 
双均线交叉追踪策略

该策略通过计算两组移动平均线SMA和EMA的交叉情况,判断市场趋势方向并进行追踪交易。

具体来说,它使用一快一慢两组移动平均线,当快线上穿慢线时做多,当快线下穿慢线时做空。平仓条件为价格重新跌破慢线或超过快线。此外,该策略还提供自定义均线周期长度、 barred关闭等参数进行优化。

这种双均线策略的优点是交易规则简单清晰,只需要跟踪两个均线的动态变化。使用EMA可更敏感地捕捉趋势转折。但在盘整行情中也容易被套取反。

总体来说,双均线交叉追踪策略适用于趋势行情,能够顺势而为谋利。但必须适当调整参数,严格控制止损和仓位,才能长期稳定运用该策略。

||

This strategy calculates crossover between two groups of moving averages SMA and EMA to determine market trend direction for tracking trades.

Specifically, it uses one fast and one slow moving average pair. It goes long when the fast line crosses above the slow line, and goes short on the downward crossover. Exits occur when price drops back below the slow line or rises above the fast line. Customization of MA lengths, barred closing etc. allows parameter optimization.

The advantage of this dual MA strategy is simple and clear rules based on two dynamic MAs. Using EMA offers more sensitivity in capturing reversals. But whipsaws also occur easily during range-bound markets.

In general, the dual MA crossover tracking strategy suits trending markets for trading in the direction of momentum. But proper parameter tuning, strict stop loss and position sizing is crucial for long-term stability of this strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2011|Start Year|
|v_input_2|true|Start Month|
|v_input_3|true|Start Day|
|v_input_4|2050|Finish Year|
|v_input_5|12|Finish Month|
|v_input_6|31|Finish Day|
|v_input_7|21|Length MA1|
|v_input_8|false|exponential|
|v_input_9|true|Length MA2|
|v_input_10|false|exponential|
|v_input_11|false|Length bars close|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-11 00:00:00
end: 2023-09-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// strategy("Moving Average Strategy of BiznesFilosof", shorttitle="MAS of BiznesFilosof", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=20, commission_type=strategy.commission.percent, commission_value=0.15, pyramiding=0)

//Period
startY = input(title="Start Year", defval = 2011)
startM = input(title="Start Month", defval = 1, minval = 1, maxval = 12)
startD = input(title="Start Day", defval = 1, minval = 1, maxval = 31)
finishY = input(title="Finish Year", defval = 2050)
finishM = input(title="Finish Month", defval = 12, minval = 1, maxval = 12)
finishD = input(title="Finish Day", defval = 31, minval = 1, maxval = 31)
//finish = input(2019, 02, 28, 00, 00)
timestart = timestamp(startY, startM, startD, 00, 00)
timefinish = timestamp(finishY, finishM, finishD, 23, 59)
window = time >= timestart and time <= timefinish ? true : false // Lenghth strategy

lma1 = input(title="Length MA1", defval = 21, minval=1)
exponential1 = input(false, title="exponential")
lma2 = input(title="Length MA2", defval = 1, minval=1)
exponential2 = input(false, title="exponential")
lbars = input(title="Length bars close", defval = 0, minval=0)

ma1 = exponential1 ? ema(close, lma1) : sma(close, lma1)
ma2 = exponential2 ? ema(close, lma2) : sma(close, lma2)

//source = close
source = ma2

//open
strategy.entry("LongEntryID", strategy.long, comment="LONG", when = crossover(ma2, ma1) and window)
strategy.entry("ShortEntryID", strategy.short, comment="SHORT", when = crossunder(ma2, ma1) and window)

if crossunder(source, ma1) and strategy.position_size > 0
    strategy.close_all()
if crossunder(ma2[lbars], ma1[lbars]) and strategy.position_size > 0 and lbars != 0
    strategy.close_all()    
if crossover(source, ma1) and strategy.position_size < 0
    strategy.close_all()
if crossover(ma2[lbars], ma1[lbars]) and strategy.position_size < 0 and lbars != 0
    strategy.close_all()      

src = close
src1 = high
src2 = low
maH = exponential1 ? ema(src1, lma1) : sma(src1, lma1)
maL = exponential1 ? ema(src2, lma1) : sma(src2, lma1)
maColor = src>maH ? green : src<maL ? red : blue

plot(ma1, title="MA1", color=maColor, linewidth=2, style=line)
plot(ma2, title="MA2", color=gray, linewidth=1, style=line)


```

> Detail

https://www.fmz.com/strategy/426368

> Last Modified

2023-09-11 15:27:45
