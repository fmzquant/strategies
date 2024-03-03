
> Name

顶-底背离指标观察系统-with-止盈止损

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|止损百分比|
|v_input_2|true|止盈百分比|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-03-01 00:00:00
end: 2023-02-28 23:59:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
args: [["v_input_1",99]]
*/

//@version=5
strategy("顶/底背离指标观察系统 with 止盈止损", overlay=true)

// 输入止损百分比和止盈百分比，这里分别设置为1%
stop_loss_pct = input(title="止损百分比", type=input.float, defval=1.0, step=0.1)
take_profit_pct = input(title="止盈百分比", type=input.float, defval=1.0, step=0.1)

// 计算MACD指标
fastline = ta.ema(close,12)  
slowline = ta.ema(close,26)
diff = fastline - slowline 
dea = ta.ema(diff,9) 
macd = 2*(diff - dea)

// 判断顶背离和底背离信号
top_diver = ta.crossunder(macd,0) and close[1] > close
bot_diver = ta.crossover(macd,0) and close[1] < close
plotchar(top_diver, char='顶背离', location = location.abovebar, size = size.normal, overlay=true)
plotchar(bot_diver, char='底背离', location = location.belowbar, size = size.normal, overlay=true)
// 判断是否需要开仓
if top_diver and strategy.position_size>= 0
    strategy.entry("top_diver_short", strategy.short, comment="顶背离开多")
else if bot_diver and strategy.position_size <=0
    strategy.entry("bot_diver_long", strategy.long, comment="底背离开空")
// 计算止盈止损价格
//多仓止损
long_stop_price = strategy.position_avg_price * (1 - stop_loss_pct / 100)
//多仓止盈
long_take_profit_price = strategy.position_avg_price * (1 + take_profit_pct / 100)
// 空仓止损
short_stop_price = (strategy.position_avg_price) * (1 + stop_loss_pct / 100)
// 空仓止盈
short_take_profit_price =(strategy.position_avg_price) * (1 - take_profit_pct / 100)
// 判断是否需要平仓
if strategy.position_size > 0
    // 多仓止损
    strategy.exit("long_stop","bot_diver_long", stop=long_stop_price, qty_percent=100)
    // 多仓止盈
    strategy.exit("long_tp", "bot_diver_long", limit=long_take_profit_price, qty_percent=100)
else if strategy.position_size < 0
    strategy.exit("short_stop", "top_diver_short", stop=short_stop_price, qty_percent=100)
    strategy.exit("short_tp", "top_diver_short", limit=short_take_profit_price, qty_percent=100)


```

> Detail

https://www.fmz.com/strategy/402455

> Last Modified

2023-03-02 22:39:32
