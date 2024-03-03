
> Name

基于DMI和RSI的趋势跟随策略Trend-Following-Strategy-Based-on-DMI-and-RSI

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1079b40dc72adfe7144.png)
 [trans] 
##概述
本策略结合DMI指标判断趋势方向和RSI指标判断超买超卖,实现了一个较为完整的趋势跟随交易策略。当DMI指标判断出现趋势,并且RSI指标显示超买或超卖时,则对应做多或做空。同时设置了移动止损来锁定利润。

##策略原理
1. 使用DMI指标判断趋势方向
   - DMI由三条曲线组成:+DI表示上升趋势,-DI表示下降趋势,ADX判断趋势的力度
   - 当+DI>-DI时为上升趋势,做多;当-DI>+DI时为下降趋势,做空
2. 使用RSI指标判断超买超卖
   - RSI通过比较一段时期内的平均收盘涨幅和跌幅来判断是否超买或超卖
   - RSI低于30为超卖,高于70为超买
3. 结合DMI判断趋势方向和RSI判断超买超卖,可以较好地把握市场节奏
   - DMI判断有上升趋势且RSI超卖时,为较好的做多时机
   - DMI判断有下降趋势且RSI超买时,为较好的做空时机
4. 设置移动止损来锁定利润

##优势分析
这是一个较为成熟稳定的趋势跟随策略,具有以下优势:
1. 结合趋势判断和超买超卖判断,避免在震荡市中频繁交易
2. 使用流行指标DMI和RSI,参数选择容易,实践验证充分
3. 设置移动止损来锁定利润,可以一定程度避免止损
4. 规则清晰易懂,程序实现简单,容易实践

##风险分析
该策略也存在一些风险需要注意:
1. DMI和RSI都容易产生假信号,可能会导致不必要的亏损
2. 移动止损设置不当可能会过早止损或止损幅度太大
3. 无法有效过滤震荡行情,容易被套住
4. 跟随趋势策略,在趋势反转时无法及时止损

##优化方向
该策略还可以从以下几个方面进行优化:
1. 结合波动率指标过滤震荡行情
2. 结合 candle 形态判断,避免假突破
3. 在关键支撑阻力位置附近设置适当止损限制亏损
4. 增加机器学习模型判断趋势ython
5. 动态优化DMI和RSI的参数

##总结
本策略整体是一个较为稳定实用的趋势跟随策略,通过DMI判断趋势方向,RSI判断超买超卖,从而把握住中长线的交易机会。同时设置移动止损来锁定利润。该策略参数选择简单,交易规则清晰,容易实践。但也存在被套和止损不够及时的风险。通过一些参数和模型优化,可以使该策略的效果更好。

|| 

##Overview
This strategy combines the DMI indicator to determine the trend direction and the RSI indicator to determine overbought and oversold conditions, implementing a relatively complete trend following trading strategy. When the DMI indicator judges that a trend appears and the RSI indicator shows overbought or oversold, long or short positions are taken accordingly. At the same time, a moving stop loss is set to lock in profits.

##Strategy Logic  
1. Use DMI indicator to judge trend direction
   - DMI consists of three lines: +DI indicates uptrend, -DI indicates downtrend, ADX judges strength of the trend  
   - When +DI>-DI, it is an uptrend, go long; when -DI>+DI, it is a downtrend, go short
2. Use RSI indicator to judge overbought and oversold
   - RSI compares average gain and loss over a period to determine overbought or oversold
   - RSI below 30 is oversold, above 70 is overbought
3. Combining DMI to determine trend direction and RSI for overbought/oversold can better capture market rhythm
   - When DMI shows uptrend and RSI oversold, good timing for long
   - When DMI shows downtrend and RSI overbought, good timing for short
4. Set moving stop loss to lock in profits  

##Advantage Analysis 
This is a relatively mature and steady trend following strategy with the following strengths:
1. Combining trend and overbought/oversold avoids frequent trading in range-bound market
2. Popular indicators DMI and RSI with easy parameter tuning and thorough practical verification
3. Trailing stop loss locks in profits and avoids stop loss to some extent  
4. Clear and easy rules, simple to implement

##Risk Analysis
There are also some risks to note:
1. DMI and RSI can easily generate false signals, causing unnecessary losses
2. Improper trailing stop loss setting may stop loss too early or too much
3. Cannot effectively filter whipsaw markets, prone to being trapped
4. Trend following fails to exit promptly when trend reverses  

##Optimization Directions
The strategy can be optimized in the following aspects:
1. Add volatility filter to avoid choppy market
2. Combine candlestick patterns to avoid false breakout 
3. Set proper stop loss near key support/resistance to limit losses
4. Increase machine learning model for trend prediction
5. Dynamic optimization of DMI and RSI parameters

##Summary
Overall this is a relatively steady and practical trend following strategy. By judging trend direction with DMI and overbought/oversold levels with RSI, it captures medium-to-long term trading opportunities. Trailing stop loss locks in profits. The strategy has simple parameter tuning, clear rules and is easy to implement. But risks include being trapped and untimely stop loss. With some parameter and model optimization, performance can be further improved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|ADX Smoothing|
|v_input_int_2|14|DI Length|
|v_input_float_1|0.5|Trailing Stop Loss Factor|
|v_input_int_3|14|RSI Length|
|v_input_1_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_4|70|RSI Overbought Level|
|v_input_int_5|30|RSI Oversold Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © YingYangJPN

//@version=5
strategy("DMI and RSI Strategy", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// DMI indikatörünü tanımlayalım
lensig = input.int(14, title="ADX Smoothing", minval=1, maxval=50)
len = input.int(14, minval=1, title="DI Length")
up = ta.change(high)
down = -ta.change(low)
plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
trur = ta.rma(ta.tr, len)
plus = fixnan(100 * ta.rma(plusDM, len) / trur)
minus = fixnan(100 * ta.rma(minusDM, len) / trur)
sum = plus + minus
adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), lensig)
trailing_stop_loss_factor = input.float(0.50, "Trailing Stop Loss Factor", step = 0.01)

// RSI indikatörünü tanımlayalım
rsiLength = input.int(14, minval=1, title="RSI Length")
rsiSource = input(close, title="RSI Source")
rsiOverbought = input.int(70, title="RSI Overbought Level")
rsiOversold = input.int(30, title="RSI Oversold Level")
rsiValue = ta.rsi(rsiSource, rsiLength)

// Uzun pozisyon açma koşullarını tanımlayalım
longCondition1 = rsiValue < rsiOversold // RSI oversold seviyesinin altındaysa
longCondition2 = adx > 20 // ADX 20'den büyükse
longCondition3 = minus > plus

// Kısa pozisyon açma koşullarını tanımlayalım
shortCondition1 = rsiValue > rsiOverbought // RSI overbought seviyesinin üstündeyse
shortCondition2 = adx > 20 // ADX 20'den büyükse
shortCondition3 = plus > minus

// Uzun pozisyon açalım
if longCondition1 and longCondition2 and longCondition3
    strategy.entry("Long", strategy.long)
    

// Kısa pozisyon açalım
if shortCondition1 and shortCondition2 and shortCondition3
    strategy.entry("Short", strategy.short)
    
// Trailing Stop Loss
longTrailingStopLoss = strategy.position_avg_price * (1 - trailing_stop_loss_factor / 100)
shortTrailingStopLoss = strategy.position_avg_price * (1 + trailing_stop_loss_factor / 100)
if strategy.position_size > 0 
    strategy.exit("Exit Long", "Long", stop  = longTrailingStopLoss)
if strategy.position_size < 0 
    strategy.exit("Exit Short", "Short", stop = shortTrailingStopLoss)

// DMI ve RSI indikatörlerini grafiğe çizelim
plot(adx, color=#F50057, title="ADX")
plot(plus, color=#2962FF, title="+DI")
plot(minus, color=#FF6D00, title="-DI")
plot(rsiValue, color=#9C27B0, title="RSI")
hline(rsiOverbought, title="RSI Overbought Level", color=#E91E63, linestyle=hline.style_dashed)
hline(rsiOversold, title="RSI Oversold Level", color=#4CAF50, linestyle=hline.style_dashed)


```

> Detail

https://www.fmz.com/strategy/439994

> Last Modified

2024-01-25 15:56:41
