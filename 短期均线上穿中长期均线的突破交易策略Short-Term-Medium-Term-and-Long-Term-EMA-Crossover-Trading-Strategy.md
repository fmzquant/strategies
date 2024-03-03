
> Name

短期均线上穿中长期均线的突破交易策略Short-Term-Medium-Term-and-Long-Term-EMA-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/17173b7cc08054c20d6.png)
[trans]


本策略基于短期、中期和长期三条不同周期的指数移动平均线(EMA)进行交易信号生成。其中,短期EMA周期为5天,中期EMA周期为8天,长期EMA周期为13天。当短期EMA上穿中期和长期EMA时,做多;当短期EMA下穿中期和长期EMA时,做空。

#### 策略原理

该策略通过计算不同周期的EMA来判断市场趋势。短期EMA反映最近几天的平均价格,中长期EMA反映较长时间内的平均价格。短期EMA上穿中长期EMA代表价格开始向上突破,因此做多;短期EMA下穿中长期EMA代表价格开始向下突破,因此做空。

具体来说,该策略同时计算5天、8天和13天三条EMA。当5天EMA上穿8天和13天EMA时生成做多信号;当5天EMA下穿8天和13天EMA时生成做空信号。做多后,如果5天EMA重新下穿13天EMA,则平仓。做空后,如果5天EMA重新上穿13天EMA,则平仓。

#### 策略优势

1. 使用多周期EMA判断趋势,避免因单一EMA周期过短或过长而漏掉关键的趋势转折点
2. 结合中短长三个周期EMA,交易信号更加可靠准确
3. 通过EMA平滑价格,可过滤掉部分市场噪音,防止无谓开仓

#### 策略风险

1. 三条EMA均为延后的趋势指标,在实际价格突破前一定有时间差,可能会导致交易信号滞后
2. EMA无法区分真正趋势和短期调整,可能会产生错误信号
3. 固定的EMA周期无法适应市场在不同周期下的变化特征

可以通过以下方法优化:

1. 结合其他指标如MACD等判断真正趋势,避免产生错误信号
2. 根据不同品种、市场环境可灵活调整EMA周期参数
3. 增设移动止损,以锁定利润,控制风险

#### 总结

本策略通过计算短中长三个周期EMA并比较其交叉情况来判断市场趋势转折,属于典型的突破系统。其优点是交易信号简单清晰,容易操作;缺点是EMA指标本身滞后,无法区分真正趋势和短期调整。未来可以考虑辅以其他技术指标判断,或结合自适应参数调整优化该策略。

||

This strategy generates trading signals based on three exponential moving average lines (EMA) with different periods: short-term EMA with 5-day period, medium-term EMA with 8-day period and long-term EMA with 13-day period. It goes long when the short-term EMA crosses over the medium-term and long-term EMAs, and goes short when the short-term EMA crosses under the medium-term and long-term EMAs.  

#### Strategy Logic

This strategy judges the market trend by calculating EMAs of different periods. The short-term EMA reflects the average price of the recent few days while the medium- and long-term EMAs reflect the average price over longer timeframes. The crossover of short-term EMA over medium- and long-term EMAs signals an upward breakout of the price, so a long position is taken. Conversely, when the short-term EMA crosses under the other two, it signals a downward price breakout so a short position is taken.  

Specifically, this strategy concurrently computes 5-day, 8-day and 13-day EMAs. It generates long signals when the 5-day EMA crosses over the 8-day and 13-day ones; it generates short signals when the 5-day EMA crosses under the other two. After going long, the position is closed once the 5-day EMA crosses back under the 13-day EMA. Likewise for the short position.

#### Advantages of the Strategy

1. Using multiple-period EMAs avoids missing key trend reversal points that could occur with overly short or long single EMA periods  
2. Combining three EMAs of short, medium and long terms enhances reliability of trading signals
3. Smoothed pricing via EMAs filters out some market noise and prevents unnecessary entries

#### Risks of the Strategy

1. All three EMAs are lagging trend indicators, inherently containing some time delays before actual price breakouts, risking late signals
2. EMAs cannot effectively distinguish real trends versus short-term corrections, apt to yield false signals  
3. Fixed EMA periods cannot adapt to varying market regimes across different timeframes

Improvement ideas:

1. Adding other indicators like MACD to better gauge real trend, avoiding false signals
2. Flexibly tuning EMA period parameters for different products and market environments 
3. Adding moving stop loss to lock in profits and control risks

#### Summary
This is a typical breakout system that judges trend reversals by comparing crossovers between short, medium and long-period EMAs. Its simplicity in signaling facilitates ease of trading, but also suffers from EMAs' inherent lagging and inability to filter real trends from temporary corrections. Future enhancements may integrate other technical indicators or adaptive parameter tuning to optimize it.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2020|Backtest Start Year|
|v_input_2|5|Length|
|v_input_3|8|Length|
|v_input_4|13|Length|
|v_input_5|false|Long Only|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-16 00:00:00
end: 2023-11-23 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// 
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © gregoirejohnb
// @It is modified by ttsaadet.
// Moving average crossover systems measure drift in the market. They are great strategies for time-limited people.
// So, why don't more people use them?
// 

//
strategy(title="EMA Crossover Strategy", shorttitle="EMA-5-8-13 COS by TTS", overlay=true, pyramiding=0, default_qty_type=strategy.percent_of_equity, default_qty_value=100, currency=currency.TRY,commission_type=strategy.commission.percent,commission_value=0.04, process_orders_on_close = true, initial_capital = 100000)

// === GENERAL INPUTS ===
//strategy start date
start_year = input(defval=2020, title="Backtest Start Year")

// === LOGIC ===
short_period = input(type=input.integer,defval=5,minval=1,title="Length")
mid_period = input(type=input.integer,defval=8,minval=1,title="Length")
long_period = input(type=input.integer,defval=13,minval=1,title="Length")

longOnly = input(type=input.bool,defval=false,title="Long Only")
shortEma = ema(hl2,short_period)
midEma = ema(hl2,mid_period)
longEma = ema(hl2,long_period)

plot(shortEma,linewidth=2,color=color.red,title="Fast")
plot(midEma,linewidth=2,color=color.orange,title="Fast")
plot(longEma,linewidth=2,color=color.blue,title="Slow")

longEntry = ((shortEma > midEma) and crossover(shortEma,longEma)) or ((shortEma > longEma) and crossover(shortEma,midEma))
shortEntry =((shortEma < midEma) and crossunder(shortEma,longEma)) or ((shortEma < longEma) and crossunder(shortEma,midEma))

plotshape(longEntry ? close : na,style=shape.triangleup,color=color.green,location=location.belowbar,size=size.small,title="Long Triangle")
plotshape(shortEntry and not longOnly ? close : na,style=shape.triangledown,color=color.red,location=location.abovebar,size=size.small,title="Short Triangle")
plotshape(shortEntry and longOnly ? close : na,style=shape.xcross,color=color.black,location=location.abovebar,size=size.small,title="Exit Sign")

// === STRATEGY - LONG POSITION EXECUTION ===
enterLong() =>
    longEntry 
exitLong() =>
    crossunder(shortEma,longEma)

strategy.entry(id="Long", long=strategy.long, when=enterLong())
strategy.close(id="Long", when=exitLong())


// === STRATEGY - SHORT POSITION EXECUTION ===

enterShort() =>
    not longOnly and shortEntry  
exitShort() =>
    crossover(shortEma,longEma)

strategy.entry(id="Short", long=strategy.short, when=enterShort())
strategy.close(id="Short", when=exitShort())
```

> Detail

https://www.fmz.com/strategy/433092

> Last Modified

2023-11-24 13:33:21
