
> Name

追踪移动均线交易策略Moving-Average-Tracking-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7f39bb07db8d65561e.png)

[trans]

### 概述

该策略基于追踪移动均线,结合MACD指标过滤进行交易决策。当快速移动均线上穿慢速移动均线时做多,当快速移动均线下穿慢速移动均线时做空,同时MACD指标可以用来过滤假突破。

### 策略原理

该策略主要基于以下原理:

1. 使用Heikin Ashi蜡烛图能够过滤市场噪音,识别趋势。

2. 快速移动均线上穿慢速移动均线代表价格进入上升趋势,做多;下穿代表进入下降趋势,做空。

3. MACD指标可以用来识别价格趋势和过滤假突破。当MACD直方图大于0时为多头市场,小于0时为空头市场。

4. 具体来说,该策略首先计算Heikin Ashi蜡烛图的开盘价和收盘价。然后计算快速EMA均线和慢速EMA均线。当快速EMA上穿慢速EMA时做多,下穿时做空。同时结合MACD指标过滤假突破信号。

### 策略优势

1. 使用Heikin Ashi蜡烛图可以过滤噪音,辅助判断趋势方向。

2. 快慢EMA的金叉死叉系统是一套成熟的交易策略,可以顺势而为。

3. 结合MACD指标可以过滤假突破带来更准确的交易信号。

4. 该策略参数优化空间大,可以通过调整EMA周期、MACD参数等进行优化。

5. 策略思路简单直观,容易理解实现,适合用于数字货币高波动行情。

### 策略风险

1. 策略仅基于技术指标,没有结合基本面分析,可能错过重大消息导致亏损。

2. EMA周期设置不当可能导致产生大量假信号,从而亏损。

3. MACD过滤效果取决于参数设定,设定不当时可能无法有效过滤假突破。 

4. 突发事件造成暴涨暴跌可能导致止损被击穿产生较大亏损。

5. 高波动行情中止损难以设置,存在亏损扩大的风险。

### 策略优化

1. 优化EMA周期参数,寻找最佳参数组合。

2. 优化MACD参数,提高识别趋势能力。

3. 添加其他技术指标过滤信号,如RSI,KD等。

4. 结合趋势线、支撑压力位等确定交易范围。

5. 根据不同加密货币特点调整参数。

6. 添加止损策略控制单笔亏损。

### 总结

该策略总体思路清晰易懂,通过快慢EMA结合MACD指标过滤可以获得较好的交易信号。但存在一定的系统性风险,需要进行参数优化以及风险控制。该策略适用于数字货币高波动行情,但需要定期优化更新以维持稳定收益。通过不断改进,该策略有望成为一个稳定盈利的趋势追踪策略。

||


### Overview

This strategy is based on tracking moving averages combined with MACD indicator filtering for trade decision-making. It goes long when the fast moving average crosses above the slow moving average, and goes short when the fast MA crosses below the slow MA. Meanwhile, MACD indicator can be used to filter false breakouts.

### Strategy Logic

The strategy is mainly based on the following principles:

1. Using Heikin Ashi candles can filter market noise and identify trends. 

2. Fast MA crossing above slow MA indicates an upward trend, go long; crossing below indicates a downward trend, go short.

3. MACD indicator can identify price trends and filter false breakouts. MACD histogram above 0 indicates a bullish market, below 0 indicates a bearish market.

4. Specifically, the strategy first calculates the open and close prices of the Heikin Ashi candles. Then it calculates the fast and slow EMA lines. It goes long when fast EMA crosses above slow EMA, and goes short when fast EMA crosses below slow EMA. MACD indicator is used to filter false breakout signals.

### Advantages

1. Heikin Ashi candles can filter noise and help determine trend direction.

2. Fast and slow EMA cross system is a mature trading strategy that follows the trend. 

3. MACD filter provides more accurate trading signals by reducing false breakouts.

4. The strategy has large optimization space by adjusting EMA periods, MACD parameters etc.

5. Simple and intuitive strategy logic, easy to understand and implement, suitable for highly volatile crypto markets.

### Risks

1. The strategy relies solely on technical indicators without fundamental analysis, may miss major news events and cause losses.

2. Improper EMA period settings may generate excessive false signals and losses.

3. MACD filter depends on parameter tuning, improper settings may fail to filter false breakouts effectively.

4. Sudden price spikes may hit stop loss and cause large losses.

5. Difficult to set proper stop loss in volatile markets, risks of loss amplification.

### Optimization

1. Optimize EMA period parameters to find optimal combinations.

2. Optimize MACD parameters to improve trend identification ability. 

3. Add other technical indicators like RSI, KD etc. to filter signals.

4. Determine trading range based on trendlines, support/resistance levels etc.

5. Adjust parameters according to different crypto characteristics. 

6. Add stop loss strategies to control single trade loss amount.

### Summary

The strategy has clear and easy-to-understand logic. Trading signals can be obtained from fast/slow EMA cross and MACD filter. But there are inherent system risks that need parameter optimization and risk management. The strategy suits the highly volatile crypto markets but requires regular updates for steady profits. With continuous improvements, it has the potential to become a stable profitable trend following strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|Heikin Ashi Candle Time Frame|
|v_input_2|true|Heikin Ashi Candle Time Frame Shift|
|v_input_3|180|Heikin Ashi EMA Time Frame|
|v_input_4|false|Heikin Ashi EMA Time Frame Shift|
|v_input_5|true|Heikin Ashi EMA Period|
|v_input_6|true|Heikin Ashi EMA Shift|
|v_input_7|10|Slow EMA Period|
|v_input_8|true|Slow EMA Shift|
|v_input_9|false|With MACD filter|
|v_input_10|12|MACD Time Frame|
|v_input_11|true|MACD Shift|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-23 00:00:00
end: 2023-10-23 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//Heikin Ashi Strategy  V3 by breizh29

// strategy("Heikin Ashi Strategy  V3",shorttitle="HAS V3",overlay=true,default_qty_value=100,initial_capital=100,currency=currency.EUR) 
res = input(title="Heikin Ashi Candle Time Frame",  defval="30")
hshift = input(1,title="Heikin Ashi Candle Time Frame Shift")
res1 = input(title="Heikin Ashi EMA Time Frame",  defval="180")
mhshift = input(0,title="Heikin Ashi EMA Time Frame Shift")
fama = input(1,"Heikin Ashi EMA Period")
test = input(1,"Heikin Ashi EMA Shift")
sloma = input(10,"Slow EMA Period")
slomas = input(1,"Slow EMA Shift")
macdf = input(false,title="With MACD filter")
res2 = input(title="MACD Time Frame",  defval="12")
macds = input(1,title="MACD Shift")




//Heikin Ashi Open/Close Price
ha_t = heikinashi(syminfo.tickerid)
ha_open = security(ha_t, res, open[hshift])
ha_close = security(ha_t, res, close[hshift])
mha_close = security(ha_t, res1, close[mhshift])

//macd
[macdLine, signalLine, histLine] = macd(close, 12, 26, 9)
macdl = security(ha_t,res2,macdLine[macds])
macdsl= security(ha_t,res2,signalLine[macds])

//Moving Average
fma = ema(mha_close[test],fama)
sma = ema(ha_close[slomas],sloma)
plot(fma,title="MA",color=lime,linewidth=2,style=line)
plot(sma,title="SMA",color=red,linewidth=2,style=line)


//Strategy
golong =  crossover(fma,sma) and (macdl > macdsl or macdf == false )
goshort =   crossunder(fma,sma) and (macdl < macdsl or macdf == false )


strategy.entry("Buy",strategy.long,when = golong)
strategy.entry("Sell",strategy.short,when = goshort)
```

> Detail

https://www.fmz.com/strategy/430040

> Last Modified

2023-10-24 14:39:08
