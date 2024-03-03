
> Name

三四K线突破反转策略Three-Bar-and-Four-Bar-Breakout-Reversion-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b14fb69f28005f643a.png)
 [trans]

### 概述

三四K线突破反转策略通过识别K线上涨势头较大的三根K线或四根K线,在其后几根较小幅度的K线形成支撑或压力后,在反转K线发生时进行逆势交易,属于逆势交易策略。

### 策略原理

该策略的核心识别逻辑主要有以下几个部分:

1. 识别增大幅度的K线(Gap Bar):突破1.5倍平均ATR,实体部分大于0.65。该K线被认为具有较强的涨跌势头。

2. 识别缩量整理的K线(Collecting Bar):跟随Gap Bar后面1-2根小幅度波动的K线,高点或低点接近Gap Bar。这些K线代表着趋势的减缓和盘整,形成了支撑或压力。

3. 识别反转信号K线:在盘整K线后,如果出现一根实体突破前几根K线的高点或低点的K线,就可以认为是一个反转信号,根据实体方向判断做多还是做空,在该K线开仓。

4. 止损和止盈:止损设置在Gap K线低点之下或高点之上;止盈基于止损点乘以配置的盈亏比例。

### 优势分析

该策略具有以下几个主要优势:

1. 利用K线本身的特征判断趋势和反转点,不依赖任何指标,实现了“指标自带”。

2. Gap Bar和Collecting Bar的筛选条件严格,可以有效识别真正的趋势和盘整。

3. 反转信号判断以实体为准,减少了假信号的概率。

4. 只需3-4根K线组合就可以完成一次交易,时间周期短,频次高。

5. 止盈止损设置明确,回撤和盈亏比容易控制。

### 风险分析

该策略也存在以下一些风险:

1. 依赖参数设置的质量,如果参数设置过于宽松,会增加假信号和赔钱交易的机会。

2. 容易受到高频假突破的干扰,无法有效过滤全部假信号。

3. 存在被套住的风险,如果反转不足时易形成调整,从而无法止损。

4. 止损范围比较大,个别被套机会可能造成较大亏损。

为降低这些风险,可以从以下几个方面进行优化:

1. 优化参数,使Gap Bar和Collecting Bar识别更为准确。

2. 增加过滤器,在反转K线再次确认后开仓。

3. 优化止损算法,使止损更贴近价格,亏损更可控。

### 优化方向 

该策略还有以下几个主要的优化方向:

1. 增加复合过滤器,避免假突破干扰。例如增加成交量指标,只在成交量放大的情况下考虑交易信号。

2. 结合均线指标,只在价格突破重要均线(如20日线,60日线)时考虑交易信号。

3. 多时间框架验证,只有多个周期同时给出信号时才开仓。

4. 优化止盈条件,根据市场波动程度和风险偏好动态调整盈亏比。

5. 结合市场多空状态判断系统,只在趋势性market的环境下使用该策略。

这些优化可以进一步提高策略的稳定性和盈利概率。

### 总结

三四K线突破反转策略通过识别高质量的趋势潜力段和反转信号进行交易。操作周期短,频次高,有望获取丰厚的超额收益。同时也存在一定的风险,需要继续优化以降低风险提高稳定性。总的来说,该策略有效地利用了行情轮廓自身的特征判断趋势和反转点,值得进一步研究和应用。

|| 

### Overview  

The Three Bar and Four Bar Breakout Reversion strategy identifies three or four K-line bars with strong momentum, and takes counter-trend trades after several small-range K-bars form support/resistance levels and reversal signals emerge. It belongs to mean-reversion strategy.

### Strategy Logic

The core identification logic of this strategy includes:  

1. Recognize large-range bars (Gap Bars): Break 1.5 x ATR, with a body percentage above 65%. They are considered to have strong momentum.

2. Recognize low-range bars (Collecting Bars): One or two subsequent small-range bars following Gap Bars, with high/low levels close to those of Gap Bars. They represent slowing momentum and consolidation, forming support/resistance levels.

3. Recognize reversal signal bars: If a bar breaks through the high/low of previous bars after consolidation, it can be considered a reversal signal. We take positions based on the direction of the signal bar.

4. Stop loss and take profit: Set stop loss below/above Gap Bar's low/high points. Take profit is determined by multiplying risk-reward ratio with stop loss distance.

### Advantage Analysis   

The main advantages of this strategy:

1. Identify trends and reversals using raw price action, no indicators needed. 

2. Strict rules on Gap Bars and Collecting Bars ensure accuracy in capturing real trends and consolidations.   

3. Judging reversal bars by bodies reduces false signals.  

4. Each trade only takes 3-4 bars. High frequency with short holding period.

5. Clear rules on stop loss and take profit makes risk management easier.

### Risk Analysis

The main risks:

1. Relying on parameter settings. Loose parameters increase false signals and losing trades.

2. Vulnerable to fake breakouts and unable to filter out all false signals.  

3. Risk of being trapped in consolidations after failed breakout attempts. Difficult to cut loss in such cases.

4. Wide stop loss range means large losses on occasion when trapped.

To reduce risks:

1. Optimize parameters for Gap Bars and Collecting Bars identification.  

2. Add filters such as confirmation bars before entering positions.

3. Optimize stop loss algorithms to make them more adaptive. 

### Optimization Directions

Main optimization directions:  

1. Add composite filters to avoid false breakouts, e.g. requiring increase in volume.

2. Combine with moving averages, only taking signals when key MA levels are broken.  

3. Require agreement across multiple timeframes before entering trades.  

4. Dynamically adjust profit targets based on market volatility and risk preference.

5. Combine with market regime identification system, only enable strategy in trending environments.

These optimizations can further improve stability and profitability.  

### Conclusion

The Three Bar and Four Bar Breakout Reversion strategy aims to capture high-quality trending moves and reversal trades. It has the advantage of short holding periods and high frequency. There are also inherent risks that need to be reduced through continued optimization. By effectively identifying self-contained trend and reversal signals from raw price action, this strategy warrants further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From day|
|v_input_3|2021|From Year|
|v_input_4|12|To Month|
|v_input_5|31|To day|
|v_input_6|2100|To Year|
|v_input_7|1.5|Gap Bar Size|
|v_input_8|0.65|Gap Bar Body Size|
|v_input_9|0.1|Bull Top Bar Size|
|v_input_10|2|Profit Multiplier|
|v_input_11|true|Show Buy/Sell Labels?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-10 00:00:00
end: 2023-12-17 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Three (3)-Bar and Four (4)-Bar Plays Strategy", shorttitle="Three (3)-Bar and Four (4)-Bar Plays Strategy", overlay=true, calc_on_every_tick=true, currency=currency.USD, default_qty_value=1.0,initial_capital=30000.00,default_qty_type=strategy.percent_of_equity)

frommonth = input(defval = 1, minval = 01, maxval = 12, title = "From Month")
fromday = input(defval = 1, minval = 01, maxval = 31, title = "From day")
fromyear = input(defval = 2021, minval = 1900, maxval = 2100, title = "From Year")

tomonth = input(defval = 12, minval = 01, maxval = 12, title = "To Month")
today = input(defval = 31, minval = 01, maxval = 31, title = "To day")
toyear = input(defval = 2100, minval = 1900, maxval = 2100, title = "To Year")

garBarSetting1 = input(defval = 1.5, minval = 0.0, maxval = 100.0, title = "Gap Bar Size", type = input.float)
garBarSetting2 = input(defval = 0.65, minval = 0.0, maxval = 100.0, title = "Gap Bar Body Size", type = input.float)
TopSetting = input(defval = 0.10, minval = 0.0, maxval = 100.0, title = "Bull Top Bar Size", type = input.float)

profitMultiplier = input(defval = 2.0, minval = 1.0, maxval = 100.0, title = "Profit Multiplier", type = input.float)

// ========== 3-Bar and 4-Bar Play Setup ==========
barSize = abs(high - low)
bodySize = abs(open - close)

gapBar = (barSize > (atr(1000) * garBarSetting1)) and (bodySize >= (barSize * garBarSetting2))  // find a wide ranging bar that is more than 2.5x the size of the average bar size and body is at least 65% of bar size

bullTop = close > close[1] + barSize[1] * TopSetting ? false : true  // check if top of bar is relatively equal to top of the gap bar (first collecting bull bar)
bullTop2 = close > close[2] + barSize[2] * TopSetting ? false : true  // check if top of bar is relatively equal to top of the gap bar (first collecting bear bar)
bearTop = close < close[1] - barSize[1] * TopSetting ? false : true  // check if top of bar is relatively equal to top of the gap bar (second collecting bull bar)
bearTop2 = close < close[2] - barSize[2] * TopSetting ? false : true  // check if top of bar is relatively equal to top of the gap bar (second collecting bear bar)

collectingBarBull = barSize < barSize[1] / 2 and low > close[1] - barSize[1] / 2 and bullTop  // find a collecting bull bar
collectingBarBear = barSize < barSize[1] / 2 and high < close[1] + barSize[1] / 2 and bearTop  // find a collecting bear bar
collectingBarBull2 = barSize < barSize[2] / 2 and low > close[2] - barSize[2] / 2 and bullTop2  // find a second collecting bull bar
collectingBarBear2 = barSize < barSize[2] / 2 and high < close[2] + barSize[2] / 2 and bearTop2  // find a second collecting bear bar

triggerThreeBarBull = close > close[1] and close > close[2] and high > high[1] and high > high[2]  // find a bull trigger bar in a 3 bar play
triggerThreeBarBear = close < close[1] and close < close[2] and high < high[1] and high < high[2]  // find a bear trigger bar in a 3 bar play
triggerFourBarBull = close > close[1] and close > close[2] and close > close[3] and high > high[1] and high > high[2] and high > high[3]  // find a bull trigger bar in a 4 bar play
triggerFourBarBear = close < close[1] and close < close[2] and close < close[3] and high < high[1] and high < high[2] and high < high[3]  // find a bear trigger bar in a 4 bar play

threeBarSetupBull = gapBar[2] and collectingBarBull[1] and triggerThreeBarBull  // find 3-bar Bull Setup
threeBarSetupBear = gapBar[2] and collectingBarBear[1] and triggerThreeBarBear  // find 3-bar Bear Setup
fourBarSetupBull = gapBar[3] and collectingBarBull[2] and 
   collectingBarBull2[1] and triggerFourBarBull  // find 4-bar Bull Setup
fourBarSetupBear = gapBar[3] and collectingBarBear[2] and 
   collectingBarBear2[1] and triggerFourBarBear  // find 4-bar Bear Setup

labels = input(title="Show Buy/Sell Labels?", type=input.bool, defval=true)

plotshape(threeBarSetupBull and labels, title="3-Bar Bull", text="3-Bar Play", location=location.abovebar, style=shape.labeldown, size=size.tiny, color=color.green, textcolor=color.white, transp=0)
plotshape(threeBarSetupBear and labels, text="3-Bar Bear", title="3-Bar Play", location=location.belowbar, style=shape.labelup, size=size.tiny, color=color.red, textcolor=color.white, transp=0)
plotshape(fourBarSetupBull and labels, title="4-Bar Bull", text="4-Bar Play", location=location.abovebar, style=shape.labeldown, size=size.tiny, color=color.green, textcolor=color.white, transp=0)
plotshape(fourBarSetupBear and labels, text="4-Bar Bear", title="4-Bar Play", location=location.belowbar, style=shape.labelup, size=size.tiny, color=color.red, textcolor=color.white, transp=0)

alertcondition(threeBarSetupBull or threeBarSetupBear or fourBarSetupBull or fourBarSetupBear, title="3-bar or 4-bar Play", message="Potential 3-bar or 4-bar Play")
float sl = na
float tp = na
sl := nz(sl[1], 0.0)
tp := nz(tp[1], 0.0)
plot(sl==0.0?na:sl,title='SL', color = color.red)
plot(tp==0.0?na:tp,title='TP', color = color.green)
if (true)
    if threeBarSetupBull and strategy.position_size <=0
        strategy.entry("3 Bar Long", strategy.long, when=threeBarSetupBull)
        sl :=low[1]
    if threeBarSetupBear and strategy.position_size >=0
        strategy.entry("3 Bar Short", strategy.short, when=threeBarSetupBull)
        sl :=high[1]
    if fourBarSetupBull and strategy.position_size <=0
        strategy.entry("4 Bar Long", strategy.long, when=fourBarSetupBull)
        sl :=min(low[1], low[2])
    if fourBarSetupBear and strategy.position_size >=0
        strategy.entry("4 Bar Short", strategy.short, when=fourBarSetupBear)
        sl :=max(high[1], high[2])

if sl !=0.0
    if strategy.position_size > 0
        tp := strategy.position_avg_price + ((strategy.position_avg_price - sl) * profitMultiplier)
        strategy.exit(id="Exit", limit=tp, stop=sl)

    if strategy.position_size < 0
        tp := strategy.position_avg_price - ((sl - strategy.position_avg_price) * profitMultiplier)
        strategy.exit(id="Exit", limit=tp, stop=sl)
```

> Detail

https://www.fmz.com/strategy/435706

> Last Modified

2023-12-18 10:39:53
