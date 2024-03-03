
> Name

基于双均线穿越交易策略Double-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/170922912c9402bfcb6.png)
[trans]
# 

## 概述
本策略基于移动平均线的黄金交叉和死亡交叉来产生买入和卖出信号。具体来说,该策略同时使用5日指数移动平均线(EMA)和34日双指数移动平均线(DEMA)。当短期5日EMA从下方上穿越长期34日DEMA时,产生买入信号;当短期5日EMA从上方下穿越长期34日DEMA时,产生卖出信号。

## 策略原理
1. 计算5日EMA和34日DEMA
2. 当短期5日EMA从下方上穿越长期34日DEMA时,产生买入信号
3. 当短期5日EMA从上方下穿越长期34日DEMA时,产生卖出信号  
4. 可以选择只在特定交易时间段交易
5. 可以选择是否使用追踪止损

本策略同时融合了趋势跟踪和均线交叉两个Factor,具有稳定的效果。移动平均线作为一种趋势跟踪指标,能有效识别市场趋势;EMA与DEMA的组合使用能够有效平滑价格数据来产生交易信号;短期和长期均线的交叉则可在大趋势变化的时候提前给出交易信号。

## 优势分析
1. 策略思路简单清晰,容易理解实现
2. 移动平均线组合使用,既考虑了对趋势判断,也考虑到对价格数据平滑处理
3. 短期和长期均线交叉,可以在大的市场转折点提前给出交易信号
4. 可以通过参数优化,调整均线的长度,适应不同品种和周期
5. 整合两个因子,可以提高策略稳定性

## 风险分析
1. 在震荡行情中,可能出现较多误信号
2. 均线长度不当可能导致信号滞后
3. 交易时间和止损设置不当,可能影响策略收益

可以通过调整均线长度,优化交易时间,和设置合理止损来降低这些风险。

## 优化方向  
1. 调整均线长度参数,适应不同交易品种和周期
2. 优化交易时间参数,在主要活跃时间段交易
3. 比较固定止损和追踪止损两种方案优劣
4. 测试不同取价方式对策略的影响 

## 总结
本策略通过双均线交叉产生交易信号,同时结合趋势跟踪和数据平滑处理,是一种简单实用的趋势跟踪策略。通过参数调优和规则优化,可以适应不同品种和交易周期,在大趋势变化的时候提前给出交易信号,避免误信号。值得推荐和应用。

|| 

## Overview  
This strategy generates buy and sell signals based on the golden cross and death cross of moving averages. Specifically, it uses a 5-day exponential moving average (EMA) and a 34-day double exponential moving average (DEMA). When the short-term 5-day EMA crosses above the long-term 34-day DEMA, a buy signal is generated. When the short-term 5-day EMA crosses below the long-term 34-day DEMA, a sell signal is generated.  

## Strategy Logic  
1. Calculate the 5-day EMA and 34-day DEMA
2. Generate a buy signal when the short-term 5-day EMA crosses above the long-term 34-day DEMA
3. Generate a sell signal when the short-term 5-day EMA crosses below the long-term 34-day DEMA
4. Option to trade only during specific trading sessions  
5. Option to use trailing stop loss

This strategy combines both trend following and moving average crossover factors for stable performance. Moving averages as a trend following indicator can effectively identify market trends; The EMA and DEMA combination can effectively smooth price data to generate trading signals; The crossovers between short-term and long-term moving averages can provide early trading signals when major trend changes.

## Advantage Analysis 
1. Simple and clear strategy logic, easy to understand and implement
2. Combination use of moving averages considers both trend judgment and price data smoothing
3. Crossovers between short-term and long-term moving averages can provide early signals at major turning points  
4. Parameters can be optimized to adjust moving average lengths for different products and timeframes
5. Integrating two factors can improve strategy stability  

## Risk Analysis
1. More false signals may occur in ranging markets
2. Inappropriate moving average lengths may cause signal lagging  
3. Improper trading hours and stop loss settings may affect strategy profitability

These risks can be reduced by adjusting moving average lengths, optimizing trading hours, and setting reasonable stop loss.

## Optimization Directions
1. Adjust moving average length parameters for different trading products and timeframes
2. Optimize trading session parameters to trade during most active periods
3. Compare fixed stop loss vs trailing stop loss
4. Test impact of different price source options on strategy

## Conclusion
This strategy generates trading signals through double moving average crossovers, combined with trend following and data smoothing techniques. It is a simple and practical trend following strategy. Through parameter tuning and logic refinement, it can adapt to different products and timeframes, provide early signals at major trend changes, and avoid false signals. Worth recommending and applying.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use Trading Session?|
|v_input_2|true|Use Trailing Stop?|
|v_input_3|0400-1500|Trade Session:|
|v_input_4|true|Trade Size:|
|v_input_5|55|Take profit in pips:|
|v_input_6|22|Stop loss in pips:|
|v_input_7|5|EMA length:|
|v_input_8|34|DEMA length:|
|v_input_9_open|0|Price source:: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-01 00:00:00
end: 2023-11-30 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
args: [["v_input_1",false]]
*/

//@version=2
strategy(title='[STRATEGY][RS]MicuRobert EMA cross V2', shorttitle='S', overlay=true)
USE_TRADESESSION = input(title='Use Trading Session?', type=bool, defval=true)
USE_TRAILINGSTOP = input(title='Use Trailing Stop?', type=bool, defval=true)
trade_session = input(title='Trade Session:',  defval='0400-1500', confirm=false)
istradingsession = not USE_TRADESESSION ? false : not na(time('1', trade_session))
bgcolor(istradingsession?gray:na)
trade_size = input(title='Trade Size:', type=float, defval=1)
tp = input(title='Take profit in pips:', type=float, defval=55.0) * (syminfo.mintick*10)
sl = input(title='Stop loss in pips:', type=float, defval=22.0) * (syminfo.mintick*10)
ma_length00 = input(title='EMA length:', defval=5)
ma_length01 = input(title='DEMA length:',  defval=34)
price = input(title='Price source:', defval=open)

//  ||--- NO LAG EMA, Credit LazyBear:  ---||
f_LB_zlema(_src, _length)=>
    _ema1=ema(_src, _length)
    _ema2=ema(_ema1, _length)
    _d=_ema1-_ema2
    _zlema=_ema1+_d
//  ||-------------------------------------||

ma00 = f_LB_zlema(price, ma_length00)
ma01 = f_LB_zlema(price, ma_length01)
plot(title='M0', series=ma00, color=black)
plot(title='M1', series=ma01, color=black)

isnewbuy = change(strategy.position_size)>0 and change(strategy.opentrades)>0
isnewsel = change(strategy.position_size)<0 and change(strategy.opentrades)>0

buy_entry_price = isnewbuy ? price : buy_entry_price[1]
sel_entry_price = isnewsel ? price : sel_entry_price[1]
plot(title='BE', series=buy_entry_price, style=circles, color=strategy.position_size <= 0 ? na : aqua)
plot(title='SE', series=sel_entry_price, style=circles, color=strategy.position_size >= 0 ? na : aqua)
buy_appex = na(buy_appex[1]) ? price : isnewbuy ? high : high >= buy_appex[1] ? high : buy_appex[1]
sel_appex = na(sel_appex[1]) ? price : isnewsel ? low : low <= sel_appex[1] ? low : sel_appex[1]
plot(title='BA', series=buy_appex, style=circles, color=strategy.position_size <= 0 ? na : teal)
plot(title='SA', series=sel_appex, style=circles, color=strategy.position_size >= 0 ? na : teal)
buy_ts = buy_appex - sl
sel_ts = sel_appex + sl
plot(title='Bts', series=buy_ts, style=circles, color=strategy.position_size <= 0 ? na : red)
plot(title='Sts', series=sel_ts, style=circles, color=strategy.position_size >= 0 ? na : red)

buy_cond1 = crossover(ma00, ma01) and (USE_TRADESESSION ? istradingsession : true)
buy_cond0 = crossover(price, ma00) and ma00 > ma01 and (USE_TRADESESSION ? istradingsession : true)
buy_entry = buy_cond1 or buy_cond0
buy_close = (not USE_TRAILINGSTOP ? low <= buy_entry_price - sl: low <= buy_ts) or high>=buy_entry_price+tp//high>=last_traded_price + tp or low<=last_traded_price - sl //high >= hh or 
sel_cond1 = crossunder(ma00, ma01) and (USE_TRADESESSION ? istradingsession : true)
sel_cond0 = crossunder(price, ma00) and ma00 < ma01 and (USE_TRADESESSION ? istradingsession : true)
sel_entry = sel_cond1 or sel_cond0
sel_close = (not USE_TRAILINGSTOP ? high >= sel_entry_price + sl : high >= sel_ts) or low<=sel_entry_price-tp//low<=last_traded_price - tp or high>=last_traded_price + sl //low <= ll or 

strategy.entry('buy', long=strategy.long, qty=trade_size, comment='buy', when=buy_entry)
strategy.close('buy', when=buy_close)
strategy.entry('sell', long=strategy.short, qty=trade_size, comment='sell', when=sel_entry)
strategy.close('sell', when=sel_close)
```

> Detail

https://www.fmz.com/strategy/436775

> Last Modified

2023-12-27 16:07:49
