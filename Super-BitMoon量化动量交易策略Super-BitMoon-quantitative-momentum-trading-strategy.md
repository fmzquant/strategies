
> Name

Super-BitMoon量化动量交易策略Super-BitMoon-quantitative-momentum-trading-strategy

> Author

ChaoZhang

> Strategy Description


[trans]

本策略名为Super BitMoon,是一种适用于比特币的短线量化动量交易策略。该策略同时具有做多和做空能力,可以在比特币出现突破关键支撑或阻力位的时候进行交易。

策略运作原理:
1. 使用ATR指标计算近期的波动范围和止损位。当价格突破上一根K线的止损位时,判断为趋势发生反转。
2. 使用权重移动平均线WVF和布林带指标判断比特币是否处于超买或超卖状态。如果WVF下穿布林带上轨,表明市场可能处于超卖状态,可以做多。
3. 使用RSI指标判断比特币是否超卖。如果RSI低于两道超卖线,可以进行逢低做多。

具体交易策略:
1. 如果WVF下穿布林带上轨,同时价格高于ATR止损价位,则做多比特币。
2. 如果RSI低于50或30超卖线,则做空比特币。

该策略优势在于:
1. 同时具有做多做空能力,可以双向交易。
2. 使用ATR止损来控制风险,避免亏损扩大。
3. 同时使用WVF,布林带和RSI指标进行判断,提高信号准确率。

该策略风险:
1. 布林带和RSI参数设置不当可能导致错误信号。
2. 突发事件造成价格窜涨或跳水可能导致止损被触发。
3. 交易费用会对盈利产生一定影响。

总之,Super BitMoon是一个非常适合短线Indicatorscombos的量化动量策略,同时兼具趋势跟踪和反转交易的特点。通过合理的参数优化,可望获得较好的风险收益比。但交易者还需要充分考虑费用控制和资金管理等因素,以降低实盘交易的风险。

|| 

This strategy is called Super BitMoon. It is a short-term quantitative momentum trading strategy suitable for Bitcoin. The strategy has both long and short capabilities, allowing it to trade when Bitcoin breaks through key support or resistance levels. 

How the strategy works:
1. Use the ATR indicator to calculate recent volatility range and stop loss levels. When the price breaks through the previous candle's stop loss level, it signals a trend reversal.  
2. Use the Weighted Moving Average (WVF) and Bollinger Bands to determine if Bitcoin is overbought or oversold. If the WVF crosses below the Bollinger upper band, the market may be oversold and present a long opportunity.
3. Use the RSI indicator to check if Bitcoin is oversold. If the RSI is below two oversold lines, it presents an opportunity to buy the dip.

Specific trading rules: 
1. If WVF crosses below Bollinger upper band, and price is above ATR stop loss level, go long Bitcoin.
2. If RSI goes below 50 or 30 oversold lines, go short Bitcoin.

Advantages of this strategy:
1. Has both long and short capabilities for two-way trading.
2. Uses ATR stops to control risk and limit losses.  
3. Uses WVF, Bollinger Bands and RSI together to improve signal accuracy.

Risks of this strategy:
1. Incorrect Bollinger and RSI parameters may generate bad signals.
2. Sudden price spikes or crashes may trigger stop loss.
3. Transaction costs impact profitability.

In summary, Super BitMoon is a solid quantitative momentum strategy ideal for short-term Indicators combos trading, with both trend following and mean reversion characteristics. With proper parameter tuning, it can achieve good risk-reward ratio. But traders still need to consider cost control and money management to reduce risks in live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2011|From Year|
|v_input_4|12|To Month|
|v_input_5|31|To Day|
|v_input_6|2018|To Year|
|v_input_7|5|ATR Stop's Length|
|v_input_8|true|ATR Stop's Multiple|
|v_input_9|10|Synthetic VIX's Length|
|v_input_10|2|Synthetic VIX's Bollinger Band's Length|
|v_input_11|0.01|Synthetic VIX's Bollinger Band's Std Dev|
|v_input_12|10|RSI's Length|
|v_input_13|50|RSI's Oversold Level 1|
|v_input_14|50|RSI's Oversold Level 2|
|v_input_15|true|Strategy Direction|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-09-08 09:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Super BitMoon v1", overlay=false, commission_value = 0.25, default_qty_type=strategy.percent_of_equity, default_qty_value = 100)

/////////////////////////////////////////////////////////////
//START - SET DATE RANGE

// === BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1)
FromDay   = input(defval = 1, title = "From Day", minval = 1)
FromYear  = input(defval = 2011, title = "From Year")
ToMonth   = input(defval = 12, title = "To Month", minval = 1)
ToDay     = input(defval = 31, title = "To Day", minval = 1)
ToYear    = input(defval = 2018, title = "To Year")

startDate = time > timestamp(FromYear, FromMonth, FromDay, 00, 00)
endDate = time < timestamp(ToYear, ToMonth, ToDay, 23, 59)
withinTimeRange = true

/////////////////////////////////////////////////////////////
//END - SET DATE RANGE



/////////////////////////////////////////////////////////////
//START - INDICATORS

//ATR STOPS TREND FILTER
length = input(5, title="ATR Stop's Length")
mult = input(1, minval=0.01, title="ATR Stop's Multiple")
atr_ = atr(length)
max1 = max(nz(max_[1]), close)
min1 = min(nz(min_[1]), close)
is_uptrend_prev = nz(is_uptrend[1], true)
stop = is_uptrend_prev ? max1 - mult * atr_ : min1 + mult * atr_
vstop_prev = nz(vstop[1])
vstop1 = is_uptrend_prev ? max(vstop_prev, stop) : min(vstop_prev, stop)
is_uptrend = close - vstop1 >= 0
is_trend_changed = is_uptrend != is_uptrend_prev
max_ = is_trend_changed ? close : max1
min_ = is_trend_changed ? close : min1
vstop = is_trend_changed ? is_uptrend ? max_ - mult * atr_ : min_ + mult * atr_ : vstop1

//SYNTHETIC VIX
pd = input(10, title="Synthetic VIX's Length")
bbl = input(2, title="Synthetic VIX's Bollinger Band's Length")
mult2 = input(0.01, minval=0.01, title="Synthetic VIX's Bollinger Band's Std Dev")
wvf = ((highest(close, pd)-low)/(highest(close, pd)))*100
sDev = mult2 * stdev(wvf, bbl)
midLine = sma(wvf, bbl)
upperBand = midLine + sDev

//RSI
rsi = rsi(close, input(10,title="RSI's Length"))
os1 = input(50,title="RSI's Oversold Level 1")
os2 = input(50,title="RSI's Oversold Level 2")

/////////////////////////////////////////////////////////////
//END - INDICATORS



/////////////////////////////////////////////////////////////
//START - TRADING RULES
direction = input(defval=1, title = "Strategy Direction", minval=-1, maxval=1)
strategy.risk.allow_entry_in(direction == 0 ? strategy.direction.all : (direction < 0 ? strategy.direction.short : strategy.direction.long))

condition1 = crossunder(wvf, upperBand) and close > vstop and withinTimeRange
condition2 = crossunder(rsi, os1) and withinTimeRange
condition3 = crossunder(rsi, os2) and withinTimeRange

strategy.entry("BUY", strategy.long, when = condition1)
strategy.entry("SELL", strategy.short, when = condition2 or condition3)

/////////////////////////////////////////////////////////////
//END - TRADING RULES
```

> Detail

https://www.fmz.com/strategy/426929

> Last Modified

2023-09-15 16:13:05
