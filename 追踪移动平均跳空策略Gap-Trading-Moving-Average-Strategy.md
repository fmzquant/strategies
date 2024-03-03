
> Name

追踪移动平均跳空策略Gap-Trading-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18de5be830768bb0c80.png)

[trans]

本文针对Noro编写的追踪移动平均跳空策略进行详细分析。该策略通过计算关闭价与简单移动平均的偏离程度,判断市场趋势发生转折的时机,实现低买高卖。

#### 策略原理

该策略首先计算3日简单移动平均sma。然后计算收盘价close与sma的比值,再减去1,得到一个指标ind。当ind上穿预设参数limit时,表明收盘价已明显超过sma,考虑做多;当ind下穿-limit时,表明收盘价已大幅低于sma,考虑做空。

策略还绘制了0轴、limit轴和-limit轴。 ind指标在不同区域时,用不同颜色进行着色,辅助判断。当ind指标穿过limit或-limit时,表示出现做多或做空信号。 

策略在产生做多或做空信号时,会先平掉当前方向相反的持仓,然后开仓做多或做空。当ind指标回到0轴之间时,会平掉所有持仓。

#### 策略优势

1. 使用跳空原理,当价格出现明显离开移动平均线时,采取逆势操作,这与趋势跟踪有所不同,跳空策略追求捕捉转折点。

2. 绘制指标轴线,直观判断指标的位置和穿越。

3. 优化了平仓逻辑,在平当前仓位后才反向开新仓,避免不必要的反向持仓。

4. 设定交易时间范围,避免不必要的过夜仓位。

5. 允许设置进入多空两边的交易开关,可仅做多或仅做空。

#### 策略风险

1. 追踪移动平均线策略容易产生多次亏损交易,适合耐心持仓。

2. 移动平均线作为判断指标缺乏灵活性,不能及时反映价格变化。

3. 预设参数limit较静态,不同品种和市场环境下需要调整。

4. 追踪移动平均线无法识别趋势内波动,应结合波动指标等使用。

5. 需要优化持仓规则,如设置止损、止盈;或只在趋势初期捕捉跳空。

#### 策略优化方向 

1. 可以测试不同参数设置,如sma周期;或采用指数移动平均等自适应移动平均线。

2. 可以加入移动平均线方向、角度等判定,避免平台期无谓交易。

3. 可以考虑与波动率指标结合,如布林带,在波动加大时暂停交易。

4. 可以设定仓位管理规则,如固定数量开仓、递增加仓、资金管理等方式。

5. 可以设置止损止盈线,或在固定比例止损时暂停新订单,控制单笔风险。

#### 总结

本文对Noro编写的追踪移动平均跳空策略进行了详细分析。该策略利用价格跳空移动平均线的特征,设计了指标轴线和颜色绘制,判断入场时机。同时优化了平仓顺序逻辑,设定了交易时间范围。但该策略存在追踪移动平均线的固有缺点,需要进一步优化参数设置、止损规则、与其他指标结合等方面,以提高稳定性。

||


This article provides an in-depth analysis of the moving average gap trading strategy coded by Noro. The strategy identifies trend reversals by calculating the deviation between closing price and simple moving average, and achieves buy low and sell high.

#### Strategy Logic

The strategy first calculates the 3-day simple moving average (SMA). Then it computes the ratio of closing price (close) to SMA minus one as an indicator (ind). When ind crosses above the preset parameter limit, it means the closing price has surpassed SMA significantly and long position is considered. When ind crosses below -limit, it means the closing price has fallen far below SMA and short position is considered.

The strategy also plots the 0 axis, limit axis and -limit axis. The ind indicator is colored differently in separate areas to assist judgement. When ind crosses over limit or -limit, it signals long or short entry.

Upon long/short signal, the strategy will close opposite position first, then open long/short position. When ind returns between 0 axes, all positions will be closed.

#### Advantages

1. Adopting gap trading principle to catch trend reversals, unlike trend following strategies.

2. Plotting indicator axes for intuitive judgment of indicator position and crossover. 

3. Optimized close logic, closing existing position before reversing direction. Avoid unnecessary opposite positions.

4. Defined trading time range to avoid unnecessary overnight positions.

5. Flexibility to enable/disable long/short trading.

#### Risks

1. Moving average strategies tend to generate multiple losing trades, requiring patience in holding.

2. Moving averages lack flexibility in capturing real-time price changes. 

3. Preset limit parameter is static, requiring adjustments for different products and market environments.

4. Unable to identify fluctuations within trends, requiring combining with volatility indicators.

5. Need to optimize holding rules e.g. stop loss, take profit; or only catch initial gaps.

#### Enhancement Directions

1. Test different parameter settings e.g. SMA period, or adaptive moving averages like EMA.

2. Add moving average direction and slope validation to avoid meaningless trades.

3. Consider combining with volatility indicators like Bollinger Bands to pause trading when volatility rises.

4. Implement position sizing rules e.g. fixed quantity, incremental pyramiding, money management. 

5. Set stop loss/take profit lines, or pause new orders when fixed percentage stop loss triggered, to control per trade risk.

#### Summary

This article comprehensively analyzed Noro's moving average gap trading strategy. It utilizes the price gap from moving average feature and implements indicator axes and colors for entry timing. It also optimizes the close logic and defines trading time range. However, inherent weaknesses of moving average tracking remains, requiring further optimizations in parameters, stop loss rules, combining indicators etc. to improve robustness.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|100|Lot, %|
|v_input_4|10|limit|
|v_input_5|1900|From Year|
|v_input_6|2100|To Year|
|v_input_7|true|From Month|
|v_input_8|12|To Month|
|v_input_9|true|From Day|
|v_input_10|31|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-19 00:00:00
end: 2023-10-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=3
strategy(title = "Noro's Shift Close Strategy v1.0", shorttitle = "Shift Close 1.0", default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 5)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot, %")
limit = input(10)
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From Day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To Day")

//Shift MA
sma = sma(ohlc4, 3)
ind = ((close / sma) - 1) * 100

//Oscilator
plot(3 * limit, color = na, transp = 0)
plot(limit, color = black, transp = 0)
plot(0, color = black, transp = 0)
plot(-1 * limit, color = black, transp = 0)
plot(-3 * limit, color = na, transp = 0)
plot(ind, linewidth = 3, transp = 0)
col = ind > limit ? red : ind < -1 * limit ? lime : na
bgcolor(col, transp = 0)

//Signals
size = strategy.position_size
up = ind < -1 * limit
dn = ind > limit
exit = ind > -1 * limit and ind < limit

//Trading
lot = 0.0 
lot := size == 0 ? strategy.equity / close * capital / 100 : lot[1]

if up
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if dn
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/430259

> Last Modified

2023-10-26 16:05:01
