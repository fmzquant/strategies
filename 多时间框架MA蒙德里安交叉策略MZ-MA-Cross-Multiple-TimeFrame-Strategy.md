
> Name

多时间框架MA蒙德里安交叉策略MZ-MA-Cross-Multiple-TimeFrame-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/113992239eac0067852.png)
[trans]

该策略主要应用多时间框架(MTF)的MA线交叉来判断趋势方向,并结合特定条件过滤信号,在趋势方向较清晰时选择买入做多或卖出做空,属于趋势跟踪类型策略。

### 策略原理

1. 输入用户自定义的回测时间范围。

2. 输入是否使用阳线阴线合成的Heikin-Ashi蜡烛图,默认使用。

3. 分别定义慢速MA线、快速MA线和可选的第三条震荡上涨时使用的MA线。

4. 对于每条MA线都可自定义MA类型、时间周期和参数等。

5. 根据快速MA上穿慢速MA形成买入信号,下穿形成卖出信号。

6. 可选择使用第三条MA线作为多头方向过滤器,只有当收盘价超过第三MA才产生买入信号。

7. 采用strategy.entry模块进行自动交易。

8. 可自定义每手交易数量或使用固定交易量。

### 策略优势

1. 使用MTF架构,不同MA线可采用不同周期,识别多时间尺度上的趋势特征。

2. 可自定义MA类型,可选择平滑类MA提高稳定性,也可选择响应敏捷的MA。 

3. 结合Heikin-Ashi可过滤假突破。

4. 可额外添加第三条MA线作为多头方向过滤器,避免震荡行情交易。

5. 可灵活调整MA周期参数,适合不同市场环境。

6. 使用strategy.entry模块可自动下单,无需手动干预交易。

7. 支持回测优化参数,寻找最佳参数组合。


### 策略风险

1. MA交叉策略对突破假信号敏感,可能产生不必要交易。可以适当调整MA周期或增加过滤条件来降低风险。

2. 在震荡行情中,MA线交叉频繁,容易造成亏损。可以适当加宽MA间距或延长MA周期来降低风险。

3. 固定交易量无法控制风险,可以考虑按账户资金的百分比设定交易量。

4. 交易费用和滑点也会影响策略盈利能力。可以适当调整参数,确保胜率足够高。


### 优化方向

1. 测试不同的MA类型,寻找最佳参数组合。Smooth MA可提高稳定性,快速MA可提升敏捷性。

2. 优化MA的参数,适当拉长周期有利于识别趋势,缩短周期可提高敏感度。找到最佳平衡点。

3. 优化开仓条件,可考虑加强多头过滤,避免在震荡市中开仓。

4. 可针对特定品种优化MA周期参数,找到最符合该品种交易环境的参数。

5. 可以考虑结合其他指标作为过滤器提高策略稳定性,例如交易量能量指标等。

6. 针对回测数据进行参数组合优化,寻找最佳参数以提高策略效果。

### 总结

多时间框架MA交叉策略整体属于较为常见的趋势跟踪策略。其优点是实现简单,参数调整灵活,可适应不同市场环境。但也存在一定的假信号风险。可通过参数优化以及添加辅助过滤条件来改进,在回测中寻找最佳参数组合。该策略更适合趋势明显的市场,在震荡行情中应审慎使用或停止交易。整体来说,作为一种较为传统的趋势跟踪策略,多时间框架MA交叉策略依然值得专门研究与应用。

||

This strategy mainly uses MA line crossovers across multiple timeframes to determine trend direction, and trades long or short when the trend is clear after filtering signals with specific criteria. It belongs to the trend following strategy category.

### Strategy Logic

1. User inputs custom backtest time range. 

2. Choose to use Heikin-Ashi candles or normal candles.

3. Define slow, fast and optional third MA line for uptrends.

4. Customize MA type, timeframe and parameters for each MA line.

5. Long signal when fast MA crosses above slow MA, short signal when crossing below.

6. Optional to only long when close is above the third MA line.

7. Use strategy.entry for automated trading. 

8. Fixed trade size or calculate based on account percentage.

### Advantages

1. Uses MTF structure, each MA has own timeframe to identify trends across timescales.

2. Customizable MA types, can use Smooth MAs for stability or Fast MAs for responsiveness.

3. Heikin-Ashi filters false breakouts. 

4. Optional third MA line filters whipsaws.

5. Flexible MA periods suit different market environments. 

6. strategy.entry module automates trading.

7. Backtest optimization finds best parameters.

### Risks

1. MA crosses prone to false signals, causing unnecessary trades. Can optimize periods or add filters.

2. Whipsaws cause losses in choppy markets. Can widen MA spacing or lengthen periods.

3. Fixed trade size doesn't control risk. Consider percentage of account size.

4. Fees and slippage also impact profitability. Ensure high enough win rate.

### Optimization

1. Test different MA types for best combinations of stability and responsiveness.

2. Optimize MA periods to balance trend identification and sensitivity.

3. Refine entry conditions, consider stronger uptrend filters.

4. Optimize periods for specific products.

5. Add other indicators as filters, e.g. volume.

6. Parameter optimization on backtest data to maximize performance.

### Conclusion

The MTF MA crossover strategy is a common trend following system. Benefits include simplicity, flexibility and adaptability. But false signals remain a risk. Parameters and filters can be optimized via backtesting to find best combinations. More suitable for trending markets. Use cautiously or stop trading during choppy conditions. As a traditional trend following technique, MTF MA crossovers are still worth dedicated research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|D|Chart Timeframe|
|v_input_2|true|Use Heikin Ashi Candles|
|v_input_3|true|From Month|
|v_input_4|true|From Day|
|v_input_5|2021|From Year|
|v_input_6|12|Thru Month|
|v_input_7|30|Thru Day|
|v_input_8|2021|Thru Year|
|v_input_9|true|Show Date Range|
|v_input_10|0|Slow MA Type: LRC|EMA|DEMA|TEMA|SMA|WMA|MF|VAMA|TMA|HMA|JMA|Kijun v2|EDSMA|McGinley|
|v_input_11|0|Fast MA Type: EDSMA|EMA|DEMA|TEMA|LRC|WMA|MF|VAMA|TMA|HMA|JMA|Kijun v2|SMA|McGinley|
|v_input_12|false|Use Uptrend Conditional 3rd MA for Confirmation|
|v_input_13|0|Uptrend Conditional MA Type: HMA|EMA|DEMA|TEMA|LRC|WMA|MF|VAMA|TMA|SMA|JMA|Kijun v2|EDSMA|McGinley|
|v_input_14|D|Slow MA Resolution|
|v_input_15|D|Fast MA Resolution|
|v_input_16|D|Uptrend Conditional MA Resolution|
|v_input_17|50|Slow MA Length|
|v_input_18|30|Fast MA Length|
|v_input_19|200|Uptrend Conditional MA Length|
|v_input_20|true|Kijun MOD Divider|
|v_input_21|3|* Jurik (JMA) Only - Phase|
|v_input_22|true|* Jurik (JMA) Only - Power|
|v_input_23|10|* Volatility Adjusted (VAMA) Only - Volatility lookback length|
|v_input_24|0.8|Modular Filter, General Filter Only - Beta|
|v_input_25|false|Modular Filter Only - Feedback|
|v_input_26|0.5|Modular Filter Only - Feedback Weighting|
|v_input_27|20|EDSMA - Super Smoother Filter Length|
|v_input_28|0|EDSMA - Super Smoother Filter Poles: 2|3|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-08 00:00:00
end: 2023-11-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(shorttitle="MZ MA Cross",title="MA MTF Cross Strategy", overlay=true, calc_on_order_fills=false, calc_on_every_tick=false, default_qty_type=strategy.fixed, default_qty_value=5,commission_value=0.1)

timeFrameticker  = input('D',type=input.resolution, title="Chart Timeframe")
uha   =input(true, title="Use Heikin Ashi Candles")

// Use only Heikinashi Candles for all calculations
haclose = uha ? security(heikinashi(syminfo.tickerid), timeFrameticker, close) : security(syminfo.tickerid, timeFrameticker, close)
haopen = uha ? security(heikinashi(syminfo.tickerid), timeFrameticker, open) : security(syminfo.tickerid, timeFrameticker, open)
hahigh = uha ? security(heikinashi(syminfo.tickerid), timeFrameticker, high) : security(syminfo.tickerid, timeFrameticker, high)
halow = uha ?security(heikinashi(syminfo.tickerid), timeFrameticker, low) : security(syminfo.tickerid, timeFrameticker, low)

//Backtest dates
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2021, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 12,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 30,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2021, title = "Thru Year",       type = input.integer, minval = 1970)

showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true

src = security(heikinashi(syminfo.tickerid), timeFrameticker, close)

//  INPUT MA TYPE
slowMAtype = input(title="Slow MA Type", type=input.string, defval="LRC", options=["SMA","EMA","DEMA","TEMA","LRC","WMA","MF","VAMA","TMA","HMA", "JMA", "Kijun v2", "EDSMA","McGinley"])
fastMAtype = input(title="Fast MA Type", type=input.string, defval="EDSMA", options=["SMA","EMA","DEMA","TEMA","LRC","WMA","MF","VAMA","TMA","HMA", "JMA", "Kijun v2", "EDSMA","McGinley"])
upMAcond =input(false, title="Use Uptrend Conditional 3rd MA for Confirmation")
upMAtype=input(title="Uptrend Conditional MA Type", type=input.string, defval="HMA", options=["SMA","EMA","DEMA","TEMA","LRC","WMA","MF","VAMA","TMA","HMA", "JMA", "Kijun v2", "EDSMA","McGinley"])


//  INPUT RESOLUTION
slowMAresolution = input("D",type=input.resolution, title="Slow MA Resolution")
fastMAresolution = input("D",type=input.resolution, title="Fast MA Resolution")
upMAresolution = input("D",type=input.resolution, title="Uptrend Conditional MA Resolution")
haMAslow = uha ? security(heikinashi(syminfo.tickerid), slowMAresolution, close) : security(syminfo.tickerid, slowMAresolution, close)
haMAfast = uha ?security(heikinashi(syminfo.tickerid), fastMAresolution, close) : security(syminfo.tickerid, fastMAresolution, close)
haMAup =  uha ?security(heikinashi(syminfo.tickerid), upMAresolution, close) : security(syminfo.tickerid, upMAresolution, close)

//  INPUT LENGTHS
slowMAlength = input(50, minval=1, title="Slow MA Length")
fastMAlength = input(30, minval=1, title="Fast MA Length")
upMAlength =  input(200, minval=1, title="Uptrend Conditional MA Length")

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////                      MA Function                         //////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

//           Pre-reqs
//
tema(src, len) =>
    ema1 = ema(src, len)
    ema2 = ema(ema1, len)
    ema3 = ema(ema2, len)
    (3 * ema1) - (3 * ema2) + ema3
kidiv = input(defval=1,maxval=4,  title="Kijun MOD Divider")

jurik_phase = input(title="* Jurik (JMA) Only - Phase", type=input.integer, defval=3)
jurik_power = input(title="* Jurik (JMA) Only - Power", type=input.integer, defval=1)
volatility_lookback = input(10, title="* Volatility Adjusted (VAMA) Only - Volatility lookback length")
//                  MF
beta = input(0.8,minval=0,maxval=1,step=0.1,  title="Modular Filter, General Filter Only - Beta")
feedback = input(false, title="Modular Filter Only - Feedback")
z = input(0.5,title="Modular Filter Only - Feedback Weighting",step=0.1, minval=0, maxval=1)
//EDSMA
ssfLength = input(title="EDSMA - Super Smoother Filter Length", type=input.integer, minval=1, defval=20)
ssfPoles = input(title="EDSMA - Super Smoother Filter Poles", type=input.integer, defval=2, options=[2, 3])

//----
//                  EDSMA
get2PoleSSF(src, length) =>
    PI = 2 * asin(1)
    arg = sqrt(2) * PI / length
    a1 = exp(-arg)
    b1 = 2 * a1 * cos(arg)
    c2 = b1
    c3 = -pow(a1, 2)
    c1 = 1 - c2 - c3
    
    ssf = 0.0
    ssf := c1 * src + c2 * nz(ssf[1]) + c3 * nz(ssf[2])

get3PoleSSF(src, length) =>
    PI = 2 * asin(1)

    arg = PI / length
    a1 = exp(-arg)
    b1 = 2 * a1 * cos(1.738 * arg)
    c1 = pow(a1, 2)

    coef2 = b1 + c1
    coef3 = -(c1 + b1 * c1)
    coef4 = pow(c1, 2)
    coef1 = 1 - coef2 - coef3 - coef4

    ssf = 0.0
    ssf := coef1 * src + coef2 * nz(ssf[1]) + coef3 * nz(ssf[2]) + coef4 * nz(ssf[3])

//          MA Main function
ma(type, src, len) =>
    float result = 0
    if type=="TMA"
        result := sma(sma(src, ceil(len / 2)), floor(len / 2) + 1)
    if type=="MF"
        ts=0.,b=0.,c=0.,os=0.
        //----
        alpha = 2/(len+1)
        a = feedback ? z*src + (1-z)*nz(ts[1],src) : src
        //----
        b := a > alpha*a+(1-alpha)*nz(b[1],a) ? a : alpha*a+(1-alpha)*nz(b[1],a)
        c := a < alpha*a+(1-alpha)*nz(c[1],a) ? a : alpha*a+(1-alpha)*nz(c[1],a)
        os := a == b ? 1 : a == c ? 0 : os[1]
        //----
        upper = beta*b+(1-beta)*c
        lower = beta*c+(1-beta)*b 
        ts := os*upper+(1-os)*lower
        result := ts
    if type=="LRC"
        result := linreg(src, len, 0)
    if type=="SMA" // Simple
        result := sma(src, len)
    if type=="EMA" // Exponential
        result := ema(src, len)
    if type=="DEMA" // Double Exponential
        e = ema(src, len)
        result := 2 * e - ema(e, len)
    if type=="TEMA" // Triple Exponential
        e = ema(src, len)
        result := 3 * (e - ema(e, len)) + ema(ema(e, len), len)
    if type=="WMA" // Weighted
        result := wma(src, len)
    if type=="VAMA" // Volatility Adjusted
        /// Copyright © 2019 to present, Joris Duyck (JD)
        mid=ema(src,len)
        dev=src-mid
        vol_up=highest(dev,volatility_lookback)
        vol_down=lowest(dev,volatility_lookback)
        result := mid+avg(vol_up,vol_down)
    if type=="HMA" // Hull
        result := wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len)))
    if type=="JMA" // Jurik
        /// Copyright © 2018 Alex Orekhov (everget)
        /// Copyright © 2017 Jurik Research and Consulting.
        phaseRatio = jurik_phase < -100 ? 0.5 : jurik_phase > 100 ? 2.5 : jurik_phase / 100 + 1.5
        beta = 0.45 * (len - 1) / (0.45 * (len - 1) + 2)
        alpha = pow(beta, jurik_power)
        jma = 0.0
        e0 = 0.0
        e0 := (1 - alpha) * src + alpha * nz(e0[1])
        e1 = 0.0
        e1 := (src - e0) * (1 - beta) + beta * nz(e1[1])
        e2 = 0.0
        e2 := (e0 + phaseRatio * e1 - nz(jma[1])) * pow(1 - alpha, 2) + pow(alpha, 2) * nz(e2[1])
        jma := e2 + nz(jma[1])
        result := jma
    if type=="Kijun v2"
        kijun = avg(lowest(len), highest(len))//, (open + close)/2)
        conversionLine = avg(lowest(len/kidiv), highest(len/kidiv))
        delta = (kijun + conversionLine)/2
        result :=delta
    if type=="McGinley"
        mg = 0.0
        mg := na(mg[1]) ? ema(src, len) : mg[1] + (src - mg[1]) / (len * pow(src/mg[1], 4))
        result :=mg
    if type=="EDSMA"
    
        zeros = src - nz(src[2])
        avgZeros = (zeros + zeros[1]) / 2
        
        // Ehlers Super Smoother Filter 
        ssf = ssfPoles == 2
             ? get2PoleSSF(avgZeros, ssfLength)
             : get3PoleSSF(avgZeros, ssfLength)
        
        // Rescale filter in terms of Standard Deviations
        stdev = stdev(ssf, len)
        scaledFilter = stdev != 0
             ? ssf / stdev
             : 0
        
        alpha = 5 * abs(scaledFilter) / len
        
        edsma = 0.0
        edsma := alpha * src + (1 - alpha) * nz(edsma[1])
        result :=  edsma
    result
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


//  MA DEFINITION
slowMA = ma(slowMAtype, haMAslow , slowMAlength)
//fastMA = ma(fastMAtype, slowMA , fastMAlength)
fastMA = ma(fastMAtype, haMAfast , fastMAlength)
upMA = ma(upMAtype, haMAup , upMAlength)
closeMA = ma('SMA', src , 2)

//  Strategy Conditions
L1 = crossover(fastMA,slowMA)
L2 = close > upMA
S1 = crossunder(fastMA,slowMA)
S2 = close < upMA
longcondition = upMAcond ? L1 and L2 : L1
shortcondition = upMAcond ? S1 or S2 : S1

//  Plots
color_fill_uptrend = color.new(#4caf50, 80)
color_fill_downtrend = color.new(#c2185b, 80)
plot(slowMA, title='Slow MA', color=color.olive, linewidth=2)
plot(fastMA, title='Fast MA', color=color.teal, linewidth=2)
cls=plot(closeMA, title='Source Line', color=na, linewidth=1)
up = plot(upMA, title='Uptrend Conditional MA', color=color.purple, linewidth=2)
fill(up,cls, color = close > upMA ? color_fill_uptrend : color_fill_downtrend )

//plotshape(longcondition, style = shape.triangleup, color = color.green, location = location.belowbar, text = "Long", size = size.small)
//plotshape(shortcondition, style = shape.triangledown, color = color.red, location = location.abovebar, text = "Short", size = size.small)


strategy.entry(id="long", long = true, when = longcondition and window())
strategy.close("long", when = shortcondition and window())

//if (longcondition)
//    strategy.entry("BUY", strategy.long, when = window())

//if (shortcondition)
//    strategy.entry("SELL", strategy.short, when = window())
```

> Detail

https://www.fmz.com/strategy/432357

> Last Modified

2023-11-16 17:28:43
