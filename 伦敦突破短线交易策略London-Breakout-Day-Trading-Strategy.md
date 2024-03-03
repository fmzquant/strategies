
> Name

伦敦突破短线交易策略London-Breakout-Day-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

### 策略概述

伦敦突破短线交易策略是一种针对外汇市场设计的日内交易策略,它专门利用伦敦交易时段的价格行情,通过简单的突破判断产生交易信号。该策略结合具体的交易时间和价格行为特征,追求短线获利。

### 策略原理

1. 只在工作日的伦敦时段交易,例如 GMT 0400-0500。

2. 判断价格短期趋势:三根K线连续上涨做多,三根K线连续下跌做空。

3. 做多信号:当出现三根上涨K线时就入场做多。

4. 做空信号:当出现三根下跌K线时就入场做空。 

5. 止盈止损:设定入场价的一定百分比作为止盈止损位。

6. 出场规则:止盈或止损触发后离场;或伦敦时段结束后离场。

该策略只利用简单的突破信号Capture短线趋势,再配合严格的资金管理,以控制每个交易的风险和收益比。

### 策略优势

- 只交易伦敦高活跃时段

- 简单的价格突破判断信号

- 严格的止盈止损控制风险

- 规避夜盘及假日无流动性阶段 

- 明确的入场和出场规则

### 风险警示

- 可能出现进入过早或过晚的问题

- 存在被套利的风险

- 夜盘或假日也可能出现交易机会

- 需要关注关键支持阻力位

### 总结

伦敦突破短线交易策略非常适合日内短线操作,可以避开市场的混沌时段,在高流动阶段获利离场。通过参数调整可适应更多品种,是一种有效的短线交易策略思路。


||

### Strategy Overview

The London breakout day trading strategy is designed for forex intraday trading, capitalizing on the London session price action with simple breakout logic. It combines specific trading hours and price behavior patterns for short-term profits.

### Strategy Logic

1. Trade only during London session hours on weekdays, e.g. GMT 0400-0500.

2. Determine short-term trend: go long on 3 consecutive up candles, go short on 3 consecutive down candles. 

3. Long signal: enter long when seeing 3 up candles in a row.

4. Short signal: enter short when seeing 3 down candles in a row.

5. Stop loss/take profit: set stop loss and take profit at certain percentage from entry price.

6. Exit rules: exit at stop loss/take profit triggers, or at London session finish.

The strategy purely uses simple breakout signals to capture short-term trends, with strict risk management to control risk/reward per trade.

### Advantages of the Strategy 

- Trades only during highly active London hours

- Simple price breakout logic for signals

- Strict stop loss/take profit controls risks

- Avoids low liquidity night and holiday sessions

- Clear entry and exit rules

### Risk Warnings

- Potential premature or delayed entry issues 

- Risks of being trapped

- Opportunities may emerge during nights/holidays 

- Key support/resistance levels need attention

### Conclusion

The London breakout day trading strategy suits short-term intraday trading very well, evading chaotic periods and exiting with profits during high liquidity. With parameter tuning it can adapt to more assets for effective short-term trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2000|From Year|
|v_input_4|31|To Day|
|v_input_5|12|To Month|
|v_input_6|2020|To Year|
|v_input_7|0400-0500|Session|
|v_input_8|0300-0900|eXOT|
|v_input_9|false|Use Heikin Ashi Candles in Algo Calculations|
|v_input_10|true|LONG only|
|v_input_11|true|SHORT only|
|v_input_12|0.005|Stop Loss|
|v_input_13|0.005|Target Price|
|v_input_14|true|Risk % of equity |
|v_input_15|true|Monday|
|v_input_16|true|Tuesday|
|v_input_17|true|Wednesday|
|v_input_18|true|Thursday|
|v_input_19|true|Friday|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-09-08 09:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("time zone", overlay=true, initial_capital=1000)
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2000, title = "From Year", minval = 1970)
 //monday and session 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2020, title = "To Year", minval = 1970)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true

s = input(title="Session", type=input.session, defval="0400-0500")
s2 = input(title="eXOT", type=input.session, defval="0300-0900")
t1 = time(timeframe.period, s)
t2 = time(timeframe.period, s2)
c2 = #0000FF
//bgcolor(t1 ? c2 : na, transp=85)

UseHAcandles    = input(false, title="Use Heikin Ashi Candles in Algo Calculations")
//
// === /INPUTS ===

// === BASE FUNCTIONS ===

haClose = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, close) : close
haOpen  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, open) : open
haHigh  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, high) : high
haLow   = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, low) : low

isMon() => dayofweek(time('D')) == dayofweek.monday
isTue() => dayofweek(time('D')) == dayofweek.tuesday
isWed() => dayofweek(time('D')) == dayofweek.wednesday
isThu() => dayofweek(time('D')) == dayofweek.thursday
isFri() => dayofweek(time('D')) == dayofweek.friday
isSat() => dayofweek(time('D')) == dayofweek.saturday
isSun() => dayofweek(time('D')) == dayofweek.sunday

longe = input(true, title="LONG only")
shorte = input(true, title="SHORT only")
//sl=input(0.001, title="sl % price movement")
//accbalance = strategy.initial_capital + strategy.netprofit


entry = close

sl = input(0.005, title = "Stop Loss")
tp = input(0.005, title="Target Price")

// sldist = entry - sl
// tgdist = tp - entry 
// slper = sldist / entry * 100
// tgper = tgdist / entry * 100

// rr = tgper / slper
// size = accbalance * riskper / slper

balance = strategy.netprofit + 50000 //current balance
floating = strategy.openprofit          //floating profit/loss
risk = input(1,type=input.float,title="Risk % of equity ")           //risk % per trade


temp01 = (balance * risk)/100     //Risk in USD
temp02 = temp01/close*sl      //Risk in lots
temp03 = temp02*100000      //Convert to contracts
size = temp03 - temp03%1000 //Normalize to 1000s (Trade size)
if(size < 1000)
    size := 1000           //Set min. lot size



longC =  haClose> haClose[1] and  haClose[1] > haClose[2]  and haClose[2] <  haClose[3] 
shortC = haClose < haClose[1] and   haClose[1] < haClose[2]  and haClose[2] > haClose[3] 


luni = input(true, title="Monday")
marti = input(true, title="Tuesday")
miercuri = input(true, title="Wednesday")
joi = input(true, title="Thursday")
vineri = input(true, title="Friday")
if(time_cond)
    if(t1)
        if(luni==true and dayofweek == dayofweek.monday)
            if(longC and longe )
                strategy.entry("long",1)
            if(shortC and shorte)
                strategy.entry("short",0)
                
        if(marti==true and dayofweek == dayofweek.tuesday)
            if(longC and longe )
                strategy.entry("long",1)
            if(shortC and shorte)
                strategy.entry("short",0)
                
        if(miercuri==true and dayofweek == dayofweek.wednesday)
            if(longC and longe  )
                strategy.entry("long",1)
            if(shortC and shorte)
                strategy.entry("short",0)
                
        if(joi==true  and dayofweek == dayofweek.thursday)
            if(longC and longe)
                strategy.entry("long",1)
            if(shortC and shorte)
                strategy.entry("short",0)
                
        if(vineri==true and  dayofweek == dayofweek.friday)
            if(longC and longe)
                strategy.entry("long",1 )
            if(shortC and shorte)
                strategy.entry("short",0)  


//strategy.exit("closelong", "RSI_BB_LONG" , profit = close * 0.01 / syminfo.mintick, loss = close * 0.01 / syminfo.mintick, alert_message = "closelong")
//strategy.exit("closeshort", "RSI_BB_SHORT" , profit = close * 0.01 / syminfo.mintick, loss = close * 0.01 / syminfo.mintick, alert_message = "closeshort")

strategy.exit("sl","long", loss = close * sl / syminfo.mintick, profit = close * tp / syminfo.mintick)
strategy.exit("sl","short", loss=close * sl / syminfo.mintick, profit = close * tp / syminfo.mintick)

//strategy.close("long")
//strategy.close("short" )

//strategy.exit("sl","long", loss = sl)
//strategy.exit("sl","short", loss= sl)

if(not t2)
    strategy.close_all()
//strategy.risk.max_intraday_filled_orders(2)




```

> Detail

https://www.fmz.com/strategy/426923

> Last Modified

2023-09-15 15:43:04
