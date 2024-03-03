
> Name

三重EMA回调突破交易策略Triple-EMA-Pullback-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略通过观察价格对三重EMA的回调表现,判断趋势走势,在回调结束时进行突破交易。该策略属于趋势跟踪类策略,旨在捕捉中长线趋势的回调机会。

策略原理:

1. 设置快、中、慢三条EMA,典型参数为25、100、200周期。

2. 当价格上方回调触达最快EMA时判断为中长线多头行情,下方回调触达最快EMA时判断为空头行情。

3. 在上方回调结束开始反弹时,在突破最快EMA时做多;在下方回调结束开始反弹时,在跌破最快EMA时做空。

4. 通过颜色标记买卖区间,使视觉直观。

5. 设置固定止损、风险回报比,进行风险管理。

该策略优势:

1. 回调交易具有较高的成功率。

2. 三EMA判断趋势,避免被套。

3. 风险回报比控制增强绩效可持续性。

该策略风险:

1. 回调时间过长可能错过最佳入场点位。

2. 需要优化EMA参数以匹配不同周期。

3. 固定止损可能过于mechanic,需要合理设置。

总之,该策略通过三重EMA回调突破,实现对中长线趋势的跟踪。风险控制机制有助于获得长期稳定收益,但投资者仍需关注参数优化与回调判断。

||

This strategy observes price action around triple EMAs to determine trends and trades breakouts after pullbacks. It aims to capture pullback opportunities within broader uptrends and downtrends.

Strategy Logic:

1. Set fast, medium and slow EMAs, typically 25, 100, 200 periods. 

2. Price hitting fastest EMA during upside/downside pullback indicates interim bull/bear.

3. Enter long on bounce off upside pullback when price breaks above fastest EMA. Enter short on bounce off downside pullback when price breaks below fastest EMA.

4. Color-code buy/sell zones for visual intuition.

5. Use fixed stop loss and risk/reward ratio for risk management.

Advantages:

1. Pullback trading enjoys higher win rate.

2. Triple EMAs discern trends and avoid whipsaws. 

3. Risk/reward ratio enhances performance sustainability.

Risks:

1. Extended pullbacks may miss best entry timing.

2. EMA tuning needed to match different periods.

3. Fixed stops can be too mechanic and need calibration.

In summary, this strategy trades pullback breakouts using triple EMAs to track broader trends. The risk controls help generate steady long-term gains but parameter optimization and pullback judgement remain essential.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_source_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|(?Money Management)Ratio Risk/Reward|
|v_input_float_2|50|min of pips (00001.00) for each position|
|v_input_float_3|2|Risk per Trade %|
|v_input_int_1|25|(?Ema Period)Rapide|
|v_input_int_2|100|Moyenne|
|v_input_int_3|200|Lente|
|v_input_bool_1|true|(?Backtest Time Period)Filter Date Range of Backtest|
|v_input_1|timestamp(5 June 2022)|Start Date|
|v_input_2|timestamp(5 July 2022)|End Date|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-04 00:00:00
end: 2023-09-11 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Pullback", overlay=true, initial_capital=1000, slippage=25)

averageData = input.source(close, title="Source")
target_stop_ratio = input.float(title="Ratio Risk/Reward", defval=2, group="Money Management")
security = input.float(50, title='min of pips (00001.00) for each position', group="Money Management")
risk = input.float(2, title="Risk per Trade %", group="Money Management")

riskt = risk / 100 + 1

ema1V = input.int(25, title="Rapide", group="Ema Period")
ema2V = input.int(100, title="Moyenne", group="Ema Period")
ema3V = input.int(200, title="Lente", group="Ema Period")

ema1 = ta.ema(averageData, ema1V)
ema2 = ta.ema(averageData, ema2V)
ema3 = ta.ema(averageData, ema3V)

useDateFilter = input.bool(true, title="Filter Date Range of Backtest",
     group="Backtest Time Period")
backtestStartDate = input(timestamp("5 June 2022"), 
     title="Start Date", group="Backtest Time Period",
     tooltip="This start date is in the time zone of the exchange " + 
     "where the chart's instrument trades. It doesn't use the time " + 
     "zone of the chart or of your computer.")
backtestEndDate = input(timestamp("5 July 2022"),
     title="End Date", group="Backtest Time Period",
     tooltip="This end date is in the time zone of the exchange " + 
     "where the chart's instrument trades. It doesn't use the time " + 
     "zone of the chart or of your computer.")

inTradeWindow = true

float pricePullAboveEMA_maxClose = na
float pricePullBelowEMA_minClose = na

if ta.crossover(close, ema1)
    pricePullAboveEMA_maxClose := close
  
else
    pricePullAboveEMA_maxClose := pricePullAboveEMA_maxClose[1]

if close > pricePullAboveEMA_maxClose
    pricePullAboveEMA_maxClose := close

if ta.crossunder(close, ema1)
    pricePullBelowEMA_minClose := close
 
else
    pricePullBelowEMA_minClose := pricePullBelowEMA_minClose[1]

if close < pricePullBelowEMA_minClose
    pricePullBelowEMA_minClose := close

BuyZone = ema1 > ema2 and ema2 > ema3
SellZone = ema1 < ema2 and ema2 < ema3

longcondition = ta.crossover(close, ema1) and pricePullBelowEMA_minClose > ema3 and pricePullBelowEMA_minClose < ema1 
shortcondition = ta.crossunder(close , ema1) and pricePullAboveEMA_maxClose < ema3 and pricePullAboveEMA_maxClose > ema1

float risk_long = na
float risk_short = na
float stopLoss = na
float takeProfit = na
float entry_price = na

risk_long := risk_long[1]
risk_short := risk_short[1]

lotB = (strategy.equity*riskt-strategy.equity)/(close - ema2)
lotS = (strategy.equity*riskt-strategy.equity)/(ema2 - close)

if strategy.position_size == 0 and BuyZone and longcondition and inTradeWindow
    risk_long := (close - ema2) / close
    minp = close - ema2
    if minp > security
        strategy.entry("long", strategy.long, qty=lotB)
    
if strategy.position_size == 0 and SellZone and shortcondition and inTradeWindow
    risk_short := (ema2 - close) / close
    minp = ema2 - close
    if minp > security
        strategy.entry("short", strategy.short, qty=lotS)
    
if strategy.position_size > 0

    stopLoss := strategy.position_avg_price * (1 - risk_long)
    takeProfit := strategy.position_avg_price * (1 + target_stop_ratio * risk_long)
    entry_price := strategy.position_avg_price
    strategy.exit("long exit", "long", stop = stopLoss, limit = takeProfit)
    
if strategy.position_size < 0

    stopLoss := strategy.position_avg_price * (1 + risk_short)
    takeProfit := strategy.position_avg_price * (1 - target_stop_ratio * risk_short)
    entry_price := strategy.position_avg_price
    strategy.exit("short exit", "short", stop = stopLoss, limit = takeProfit)
    
plot(ema1, color=color.blue, linewidth=2, title="Ema Rapide")
plot(ema2, color=color.orange, linewidth=2, title="Ema Moyenne")
plot(ema3, color=color.white, linewidth=2, title="Ema Lente")
p_ep = plot(entry_price, color=color.new(color.white, 0), linewidth=2, style=plot.style_linebr, title='entry price')
p_sl = plot(stopLoss, color=color.new(color.red, 0), linewidth=2, style=plot.style_linebr, title='stopLoss')
p_tp = plot(takeProfit, color=color.new(color.green, 0), linewidth=2, style=plot.style_linebr, title='takeProfit')
fill(p_sl, p_ep, color.new(color.red, transp=85))
fill(p_tp, p_ep, color.new(color.green, transp=85))

bgcolor(BuyZone ? color.new(color.green, 95)  : na)
bgcolor(SellZone ? color.new(color.red, 95)  : na)



```

> Detail

https://www.fmz.com/strategy/426487

> Last Modified

2023-09-12 15:12:56
