
> Name

双EMA黄金交叉突破策略Dual-EMA-Golden-Cross-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/162925f4585534cd7a8.png)

[trans]

### 概述

该策略是基于5分钟和34分钟的指数移动平均线(EMA)进行黄金交叉和死亡交叉操作的趋势跟踪策略。当快线从下方上穿慢线时,进行长仓开仓;当快线从上方下穿慢线时,进行空仓开仓。并设置止盈止损来控制风险。

### 策略原理  

1. 快线EMA5和慢线EMA34构成交易信号。EMA5反应 Price 的最近变化,EMA34反应 Price 的中期变化。  
2. 当快线上穿慢线时,为黄金交叉,表示短期行情好于中期行情,持有多单。  
3. 当快线下穿慢线时,为死亡交叉,表示短期行情差于中期行情,持有空单。
4. 设置止盈止损来锁定利润和控制风险。

### 优势分析

1. 使用双EMA过滤假突破,避免被套。
2. 追踪中期趋势,增强盈利机会。  
3. 设置止盈止损有效控制风险。

### 风险分析

1. 双EMA具有滞后性,可能错过短期交易机会。  
2. 止损点设置过大,亏损扩大的风险。
3. 止盈点设置过小,未能最大化盈利的机会。 

### 优化方向  

1. 优化EMA参数,寻找最佳参数组合。  
2. 优化止盈止损点,锁定更大利润。
3. 增加其他指标过滤,如MACD,KDJ等,提高信号准确性。  

### 总结  

本策略通过双EMA移动平均线的黄金交叉和死亡交叉产生交易信号,并设置止盈止损来控制风险,是一种简单有效的中期趋势跟踪策略。优化止盈止损参数,引入其他指标过滤信号,可以进一步增强策略的稳定盈利能力。

||

### Overview  

This strategy is a trend following strategy based on golden cross and death cross operations of the 5-minute and 34-minute exponential moving averages (EMA) lines. It goes long when the fast EMA crosses over the slow EMA from below, and goes short when the fast EMA crosses below the slow EMA from above. It also sets stop profit and stop loss to control risks.  

### Strategy Principle   

1. The fast EMA5 and slow EMA34 form trading signals. EMA5 reflects recent Price changes and EMA34 reflects mid-term Price changes.
2. When EMA5 crosses over EMA34, it's a golden cross, indicating the short-term trend is better than the mid-term trend, so hold long position. 
3. When EMA5 crosses below EMA34, it's a death cross, indicating the short-term trend is worse than the mid-term trend, so hold short position.  
4. Set stop profit and stop loss to lock in profits and control risks.   

### Advantage Analysis   

1. Using dual EMA filters false breakouts and avoids being trapped.  
2. Following mid-term trends enhances profit opportunities.   
3. Setting stop profit and stop loss effectively controls risks.  

### Risk Analysis  

1. Dual EMA has lagging effect and may miss short-term trading opportunities.   
2. Stop loss set too wide enlarges loss risks.  
3. Stop profit set too tight loses opportunities to maximize profits.  

### Optimization Directions   

1. Optimize EMA parameters to find the best parameter combination.   
2. Optimize stop profit and stop loss points to lock in greater profits.  
3. Add other indicators like MACD, KDJ to filter signals and improve accuracy.   

### Summary   

This strategy generates trading signals from golden crosses and death crosses of the dual EMA lines, and sets stop profit and stop loss to control risks. It is a simple and effective mid-term trend following strategy. Further enhancing stable profitability can be achieved by optimizing stop profit/loss parameters and introducing other indicators to filter signals.

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
*/

//@version=2
strategy(title='[STRATEGY][RS]MicuRobert EMA cross V2', shorttitle='S', overlay=true, pyramiding=0, initial_capital=100000)
USE_TRADESESSION = input(title='Use Trading Session?', type=bool, defval=true)
USE_TRAILINGSTOP = input(title='Use Trailing Stop?', type=bool, defval=true)
trade_session = input(title='Trade Session:',defval='0400-1500', confirm=false)
istradingsession = not USE_TRADESESSION ? false : not na(time('1', trade_session))
bgcolor(istradingsession?gray:na)
trade_size = input(title='Trade Size:', type=float, defval=1)
tp = input(title='Take profit in pips:', type=float, defval=55.0) * (syminfo.mintick*10)
sl = input(title='Stop loss in pips:', type=float, defval=22.0) * (syminfo.mintick*10)
ma_length00 = input(title='EMA length:',  defval=5)
ma_length01 = input(title='DEMA length:',  defval=34)
price = input(title='Price source:',  defval=open)

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

https://www.fmz.com/strategy/435995

> Last Modified

2023-12-20 16:34:58
