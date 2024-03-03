
> Name

双EMA黄金交叉趋势追踪策略Dual-EMA-Golden-Cross-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1acf6111fc6efb34d8e.png)

[trans]


## 概述
该策略通过计算快线EMA和慢线EMA,并比较两条EMA的大小关系来判断行情趋势方向,属于简单的趋势追踪策略。当快线EMA上穿慢线EMA时做多,当快线EMA下穿慢线EMA时做空,属于典型的双EMA黄金交叉策略。

## 策略原理
该策略的核心指标是快线EMA和慢线EMA。快线EMA长度设置为21周期,慢线EMA长度设置为55周期。快线EMA能更快速地响应价格变动,反映最近短期趋势;慢线EMA对价格变动响应更缓慢,能过滤掉部分噪音,反映中长期趋势。

当快线EMA上穿慢线EMA时,表示短期趋势转为上涨,中长期趋势可能出现转折,这是做多的信号。当快线EMA下穿慢线EMA时,表示短期趋势转为下跌,中长期趋势可能出现转折,这是做空的信号。

通过快慢EMA的比较,可以捕捉短期和中长期两个时间尺度上的趋势转折点,属于典型的趋势追踪策略。

## 策略优势
1. 思路简单清晰,容易理解和实现
2. 参数调节灵活,快线和慢线EMA周期可自定义
3. 可配置ATR止损止盈,可控的风险

## 策略风险
1. 双EMA交叉时点选择可能不当,存在错过最佳入场点的风险
2. 行情震荡时,可能出现多次无效信号,带来亏损风险
3. ATR参数设置不当,可能造成止损止盈过于宽松或过于激进

风险应对措施:
1. 优化EMA快慢线参数,寻找最优参数组合
2. 增加过滤机制,避免行情震荡带来的无效信号
3. 测试并优化ATR参数,确保止损止盈设置合理

## 策略优化方向  
1. 基于统计方法测试不同EMA周期参数的稳定性  
2. 增加过滤条件,结合其他指标避免无效信号  
3. 优化ATR参数以获取最佳止损止盈比率

## 总结
本策略通过快线EMA和慢线EMA的交叉来判断行情趋势,简单清晰,容易实现。同时结合ATR来设置止损止盈,可控风险。通过参数优化和增加过滤条件,可以进一步增强策略稳定性和盈利能力。

||

## Overview
This strategy calculates fast EMA line and slow EMA line and compares the size relationship between the two EMAs to determine the trend direction of the market. It belongs to a simple trend tracking strategy. When the fast EMA crosses above the slow EMA, go long. When the fast EMA crosses below the slow EMA, go short. It is a typical dual EMA golden cross strategy.

## Strategy Logic  
The core indicators of this strategy are fast EMA and slow EMA. The fast EMA length is set to 21 periods and the slow EMA length is set to 55 periods. The fast EMA can respond to price changes faster, reflecting the recent short-term trend; the slow EMA responds more slowly to price changes, filtering out some noise and reflecting the medium-to-long term trend.  

When the fast EMA crosses above the slow EMA, it indicates that the short-term trend has turned upward and the medium-to-long term trend may have reversed, which is a signal to go long. When the fast EMA crosses below the slow EMA, it indicates that the short-term trend has turned downward and the medium-to-long term trend may have reversed, which is a signal to go short.  

By comparing fast and slow EMAs, it captures trend reversal points on two timescales, short-term and medium-to-long term, which is a typical trend tracking strategy.  

## Advantages
1. Simple and clear logic, easy to understand and implement  
2. Flexible parameter tuning, fast and slow EMA periods can be customized  
3. Configurable ATR stop loss and take profit for controllable risks  

## Risks 
1. Inappropriate timing of EMA crossovers, risk of missing best entry point   
2. Frequent invalid signals during market consolidation, causing losses
3. Improper ATR parameter setting, leading to too loose or too aggressive stops  

Risk Management:
1. Optimize EMA fast and slow line parameters to find optimal combinations  
2. Add filtering mechanisms to avoid invalid signals from market consolidation  
3. Test and optimize ATR parameters to ensure reasonable stop loss and take profit  

## Enhancement Areas
1. Test stability of different EMA period parameters based on statistical methods   
2. Add filtering conditions combined with other indicators to avoid invalid signals
3. Optimize ATR parameters to get best stop loss/take profit ratio    

## Summary  
This strategy judges trend based on EMA crossovers, which is simple and clear to implement. With ATR-based stops, risks are controllable. Further improvements on stability and profitability can be made through parameter optimization and filtering conditions.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2025|Backtest End Year|
|v_input_5|true|Backtest End Month|
|v_input_6|true|Backtest End Day|
|v_input_7|false|Fixed Perc stop|
|v_input_8|0.1|Percentage for fixed stop|
|v_input_9|true|ATR Based stop|
|v_input_10|14|ATR Length for stop|
|v_input_11|1.5|ATR Multiplier for stoploss|
|v_input_12|true|ATR Multiplier for profit|
|v_input_13|true|Trade the Asian Session|
|v_input_14|true|Trade the European Session|
|v_input_15|true|Trade the US session|
|v_input_16|true|End of Session Close Out?|
|v_input_17|21|fastInput|
|v_input_18|55|slowInput|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-21 00:00:00
end: 2023-11-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title = "VP Backtester", overlay=false)


// Create General Strategy Inputs
st_yr_inp = input(defval=2017, title='Backtest Start Year')
st_mn_inp = input(defval=01, title='Backtest Start Month')
st_dy_inp = input(defval=01, title='Backtest Start Day')
en_yr_inp = input(defval=2025, title='Backtest End Year')
en_mn_inp = input(defval=01, title='Backtest End Month')
en_dy_inp = input(defval=01, title='Backtest End Day')
 
// Default Stop Types
fstp = input(defval=false, title="Fixed Perc stop")
fper = input(defval=0.1, title='Percentage for fixed stop', type=float)
atsp = input(defval=true, title="ATR Based stop")
atrl = input(defval=14, title='ATR Length for stop')
atrmsl = input(defval=1.5, title='ATR Multiplier for stoploss')
atrtpm = input(defval=1, title='ATR Multiplier for profit')
 
// Sessions
asa_inp = input(defval=true, title="Trade the Asian Session")
eur_inp = input(defval=true, title="Trade the European Session")
usa_inp = input(defval=true, title="Trade the US session")
ses_cls = input(defval=true, title="End of Session Close Out?")
 
// Session Start / End times (In exchange TZ = UTC-5)    
asa_ses = "1700-0300" 
eur_ses = "0200-1200" 
usa_ses = "0800-1700"  
 
in_asa = time(timeframe.period, asa_ses)
in_eur = time(timeframe.period, eur_ses)
in_usa = time(timeframe.period, usa_ses)
 
strategy.risk.allow_entry_in(strategy.direction.all)
 
// Set start and end dates for backtest
start = timestamp(st_yr_inp, st_mn_inp, st_dy_inp,00,00)
end = timestamp(en_yr_inp, en_mn_inp, en_dy_inp,00,00)
window()  => time >= start and time <= end ? true : false // create function "within window of time"

 
// Check if we are in a sessions we want to trade
can_trade = asa_inp and not na(in_asa) ? true :
  eur_inp and not na(in_eur) ? true :
  usa_inp and not na(in_usa) ? true :
  false
  
// atr calc for stop and profit
atr = atr(atrl)
atr_stp_dst_sl = atr * atrmsl
atr_stp_dst_tp = atr * atrtpm



//*************************************************************************************
// Put your strategy/indicator code below
// and make sure to set long_condition=1 for opening a buy trade
// and short_condition for opening a sell trade
//*************************************************************************************
fastInput = input(21)
slowInput = input(55)

fast = ema(close, fastInput)
slow = ema(close, slowInput)

plot(fast, color = red)
plot(slow, color = blue)

long_condition = crossover(fast, slow)
short_condition = crossunder(fast, slow)


//*************************************************************************************
// Trade management with ATR based stop & profit
//*************************************************************************************
if (long_condition and window() )
    strategy.entry("Long Entry",  strategy.long)
    if strategy.position_size <= 0 // Less than as in both direction strat - Could be long before switching
        if atsp
            atr_stop = open  - atr_stp_dst_sl
            atr_profit = open + atr_stp_dst_tp
            strategy.exit('ATR Long Exit', "Long Entry", stop=atr_stop, limit = atr_profit)
        if fstp
            stop = open - (open * fper)
            strategy.exit('Perc Fixed Long Stop Exit', "Long Entry", stop=stop)
 
if (short_condition and window() )
    strategy.entry("Short Entry",strategy.short)
    if strategy.position_size >= 0 // Greater than as in both direction strat - Could be long before switching
        if atsp
            atr_stop = open  + atr_stp_dst_sl
            atr_profit = open - atr_stp_dst_tp
            strategy.exit('ATR Short Exit', "Short Entry", stop=atr_stop, limit = atr_profit)
        if fstp
            stop = open + (open * fper)
            strategy.exit('Perc Fixed Short Stop Exit', "Short Entry", stop=stop)
 
 
strategy.close_all(when=not can_trade and ses_cls)
 

```

> Detail

https://www.fmz.com/strategy/432789

> Last Modified

2023-11-21 15:10:54
