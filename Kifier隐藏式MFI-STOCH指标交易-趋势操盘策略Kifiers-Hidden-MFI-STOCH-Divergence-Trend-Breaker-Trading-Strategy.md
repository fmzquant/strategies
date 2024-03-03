
> Name

Kifier隐藏式MFI-STOCH指标交易-趋势操盘策略Kifiers-Hidden-MFI-STOCH-Divergence-Trend-Breaker-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13274bb987ce0284996.png)
 [trans]

### 概述

这是一个为加密货币市场设计的通用交易策略,目的是在看涨加密货币市场的大环境下,寻找较好的入场时机,进行中长线持有。策略综合运用了MFI指标、STOCH指标、VWMA指标等多种技术指标,通过判断隐藏背离,捕捉潜在的趋势反转机会。

### 策略原理

该策略包含两种入场逻辑:

1. MFI隐藏背离+STOCH过滤:当MFI形成隐藏背离,即价格创新高但MFI没有创新高时,我们认为这是潜在的趋势反转信号。但为避免虚假信号,我们额外添加STOCH>50%作为过滤条件。

2. STOCH/MFI趋势系统:当STOCH>50%且MFI从下向上跨过50线时,表示市场趋势正在形成,这时入场可以获得较好的风险回报。

为确保趋势判断的准确性,我们还构建了一个基于VWMA和SMA的趋势系统。仅在VWMA上穿SMA,即确定趋势上升时,above两个系统才会发出交易信号。此外,我们用OBV指标 判断整体市场是处于活跃状态还是盘整状态,这也用于过滤掉部分假信号。

ATR指标用于判断市场是否处于震荡状态,我们优先在震荡市场寻找MFI隐藏背离进行介入。止损方式是参考近期支撑位设置止损价。止盈方式则是从入场价开始计算一定比例止盈。

### 优势分析

这套策略综合运用了多种指标判断市场结构,成功规避了大部分噪音。隐藏背离系统在震荡和调整阶段可以提供高概率且风险可控的入场机会。而STOCH/MFI 趋势系统则可在明确趋势中获得额外收益。止盈止损设置合理,避免了追涨杀跌的常见错误。整套策略非常适合加密货币这类高波动市场,可以获得较好的风险调整后收益。

### 风险分析

这套策略最大的风险在于隐藏背离判断并不总是可靠的,它仅反映市场情绪在变化,并不能保证价格会立即反转。此外,STOCH和其他指标的设置如果不当也可能导致错过趋势或者产生假信号。最后,止盈止损的设置如果太过激进,small可能导致过于频繁停止与重新开仓,影响收益率。

我们通过额外增加趋势和市场状态判断来过滤信号,设置宽容一些的止盈止损水平,以降低上述风险。当然如果不能及时止损,遇到重大的宏观事件也难以完全避免巨额亏损。

### 优化方向 

这套策略还有进一步改进的空间,主要集中在以下几个方面:

1. 优化MFI和STOCH的参数设置,提高隐藏背离判断的准确率

2. 增加机器学习模型判断市场状况,回测确定最佳参数

3. 尝试动态止盈止损,在保证收益的同时进一步控制风险

4. 测试不同加密货币品种的差异性,设定个性化参数 

5. 增加选股模块,使策略更专注于技术形态更优良的个股

通过上述几点优化,可以期待进一步提升策略的稳定性和收益率。

### 总结

这是一套非常实用的加密货币交易策略。它正确运用多种技术指标判断市场结构,在风险可控的前提下获得较好收益。主要问题在于隐藏背离的判断并不总是准确,我们通过一系列过滤器来缓解这一问题。这套策略仍有进一步提高稳定性与收益率的空间,值得实盘考验与长期跟踪。它为量化交易者在加密货币市场获得稳定收益提供了有效思路。

||

### Overview

This is a universal trading strategy designed for the crypto market, aiming to find good entry opportunities when being bullish on cryptos for mid-to-long term holding. It combines various technical indicators like MFI, STOCH, VWMA to identify potential trend reversal based on hidden divergence. 

### Trading Logic

The strategy has two entry logics:

1. MFI hidden divergence + STOCH filter: When there's a hidden divergence between price and MFI, i.e. price reaches new high but MFI does not, it indicates a potential trend reversal. To avoid false signals, we add STOCH>50% as a further filter.  

2. STOCH/MFI trend system: When STOCH>50% and MFI crosses above 50, it signals an uptrend in action. We can ride the trend for better risk-adjusted returns.

To ensure the accuracy of trend detection, a trend system comprised of VWMA and SMA is constructed. Entries are only allowed when VWMA crosses over SMA, confirming an upward trend. Besides, OBV is used to check if the overall market is active or ranging. This further filters out some false signals.  

ATR is used to determine if the market is ranging. We prefer to take entries on hidden divergence during range-bound markets. The stop loss is set based on recent support levels. Take profit exits when certain percentage of profits is reached based on entry price.

### Advantage Analysis  

The strategies combines various indicators to filter out market noise and avoid false signals. The hidden divergence system provides high-probability entries with controlled risk during ranging and corrective markets. The STOCH/MFI trend system generates additional profits when a clear trend establishes. Reasonable TP and SL settings prevent chasing momentum and stop hunts. The strategy suits the highly volatile crypto market very well for solid risk-adjusted returns.  

### Risk Analysis

The major risk is that hidden divergence does not always lead to an immediate reversal as it merely suggests shifting market sentiment. Noisy STOCH and other signals may result from bad parameter tuning. Overly tight TP/SL levels can also lead to excessive exits and re-entries, dragging down net profits.  

We tackle these issues via additional trend and market condition filters, more tolerant TP/SL levels, etc. Still significant losses may occur in case of major black swan events or a failure to cut loss in time.   

### Optimization Directions

There remains room for improving this strategy:

1. Optimize MFI/STOCH parameters for better hidden divergence accuracy  

2. Add ML models to determine market conditions and fine-tune parameters

3. Test dynamic TP/SL to balance profitability and risk control  

4. Check cross-asset differences and set personalized parameters

5. Add stock selection filters for better quality picks

These efforts can potentially enhance the stability and profitability further.  

### Conclusion

This is a very practical crypto trading strategy. It judiciously applies various technical indicators to determine market conditions and delivers solid risk-adjusted profits. The main caveat is hidden divergence does not always precisely predict immediate reversals. We handle this issue via a sequence of filters. There remains room for boosting stability and returns. It offers fruitful ideas for quants to harvest consistent gains in the crypto space.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Enable Date Range?|
|v_input_2|true|Today as End Date|
|v_input_3|timestamp(01 Jan 2021 00:00 +0300)|Start Date|
|v_input_4|timestamp(16 July 2021 00:00 +0300)|End Date|
|v_input_5|50|(?Indicator Settings)VWMA Length|
|v_input_6|50|SMA Length|
|v_input_7|28|Stoch Length|
|v_input_8|7|MFI Length|
|v_input_9|100|OBV Length|
|v_input_10|100|ATR Ranging-trend len|
|v_input_11|5|(?Divergance Settings)Price Divergant Pivots|
|v_input_12|0.05|Price Inaccuracy|
|v_input_13|3|Divergance Valid Period|
|v_input_14|5|MFI Left/Right Pivots|
|v_input_15|2|i_mfi_right|
|v_input_16|10|(?Exit Settings)TP Percentage|
|v_input_17|0.03|Support Inaccuracy|
|v_input_18|true|(?Individual Entries)Use Stoch/MFI Trend|
|v_input_19|true|Use Stoch/MFI Divergance |
|v_input_20|yellow|(?Indicator Colours)MFI/STOCH Colour     |
|v_input_21|silver|c_stoch|
|v_input_22|green|Buy/Sell Colour      |
|v_input_23|red|c_sell|
|v_input_24|blue|Flat/Trending Colours|
|v_input_25|green|c_longtrend|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-18 00:00:00
end: 2023-12-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © kifier

//@version=4
strategy("Kifier's MFI/STOCH Hidden Divergence/Trend Beater", shorttitle = "Kifier's MFI/STOCH", overlay=false, margin_long=100, margin_short=100, default_qty_type  = strategy.percent_of_equity, default_qty_value = 95, max_boxes_count = 500)

//Values
enb_date     = input(false                                  ,"Enable Date Range?",      type = input.bool, inline = "1")
enb_current  = input(true                                   ,"Today as End Date" ,      type = input.bool, inline = "1")
i_start_date = input(timestamp("01 Jan 2021 00:00 +0300")   ,"Start Date"        ,      type=input.time)
i_end_date   = input(timestamp("16 July 2021 00:00 +0300")  ,"End Date"          ,      type=input.time)

time_check   = true

i_vwma_length   = input(50,     "VWMA Length"               ,type = input.integer,   group = "Indicator Settings", inline = "2")
i_sma_length    = input(50,     "SMA Length"                ,type = input.integer,   group = "Indicator Settings", inline = "2")
i_stoch_length  = input(28,     "Stoch Length"              ,type = input.integer,   group = "Indicator Settings", inline = "3")
i_mfi_length    = input(7 ,     "MFI Length"                ,type = input.integer,   group = "Indicator Settings", inline = "3")
i_obv_length    = input(100,    "OBV Length"                ,type = input.integer,   group = "Indicator Settings")
i_atr_len       = input(100,    "ATR Ranging-trend len"     ,type = input.integer,   group = "Indicator Settings", tooltip = "This is the length of the ATR Emas that check when the market in a general trend or is just ranging")


i_div_price     = input(5       ,"Price Divergant Pivots"   ,type = input.integer, group = "Divergance Settings")
i_inacc         = input(0.05    ,"Price Inaccuracy"         ,type = input.float  , group = "Divergance Settings")
i_div_length    = input(3       ,"Divergance Valid Period"  ,type = input.integer, group = "Divergance Settings")
i_mfi_left      = input(5       ,"MFI Left/Right Pivots"    ,type = input.integer, group = "Divergance Settings", inline = "4")
i_mfi_right     = input(2       ,""                         ,type = input.integer, group = "Divergance Settings", inline = "4")

tp_percentage   = input(10  ,   "TP Percentage"         ,type = input.float             , group = "Exit Settings")/100
_inacc          = input(0.03,   "Support Inaccuracy"    ,type = input.float, step = 0.01, group = "Exit Settings")

enb_stoch_mfi     = input(true, "Use Stoch/MFI Trend"      , type = input.bool, group = "Individual Entries")
enb_stoch_mfi_div = input(true, "Use Stoch/MFI Divergance ", type = input.bool, group = "Individual Entries")

c_mfi           = input(color.yellow    ,"MFI/STOCH Colour     "        , type = input.color, group = "Indicator Colours", inline = "os")
c_stoch         = input(color.silver    ,""                             , type = input.color, group = "Indicator Colours", inline = "os")
c_buy           = input(color.green     ,"Buy/Sell Colour      "        , type = input.color, group = "Indicator Colours", inline = "pos")
c_sell          = input(color.red       ,""                             , type = input.color, group = "Indicator Colours", inline = "pos")
c_flat          = input(color.blue      ,"Flat/Trending Colours"        , type = input.color, group = "Indicator Colours", inline = "trend")
c_longtrend     = input(color.green     ,""                             , type = input.color, group = "Indicator Colours", inline = "trend")

//Global Variables
var float tpprice = na 

f_c_gradientAdvDec(_source, _center, _c_bear, _c_bull) =>
    var float _maxAdvDec = 0.
    var float _qtyAdvDec = 0.
    bool  _xUp     = crossover(_source, _center)
    bool  _xDn     = crossunder(_source, _center)
    float _chg     = change(_source)
    bool  _up      = _chg > 0
    bool  _dn      = _chg < 0
    bool  _srcBull = _source > _center
    bool  _srcBear = _source < _center
    _qtyAdvDec := 
      _srcBull ? _xUp ? 1 : _up ? _qtyAdvDec + 1 : _dn ? max(1, _qtyAdvDec - 1) : _qtyAdvDec :
      _srcBear ? _xDn ? 1 : _dn ? _qtyAdvDec + 1 : _up ? max(1, _qtyAdvDec - 1) : _qtyAdvDec : _qtyAdvDec
    _maxAdvDec := max(_maxAdvDec, _qtyAdvDec)
    float _transp = 100 - (_qtyAdvDec * 100 / _maxAdvDec)
    var color _return = na
    _return := _srcBull ? color.new(_c_bull, _transp) : _srcBear ? color.new(_c_bear, _transp) : _return

//Simple Sup/Res
var float _pH = na
var float _pL = na
_ph = pivothigh(high,20,20)
_pl = pivotlow(low,20,20)
_high_inacc = _inacc * high
_low_inacc = _inacc * low

if _ph
    _pH := high
if (high-_high_inacc) > _pH and _ph
    _pH := high
    _pH := nz(_pH)

if _pl
    _pL := low
if (low+_low_inacc) < _pL[1] 
    _pL := low
    _pL := nz(_pL)  

broke_res = iff(crossover(close, _pH), true, false)

//Indicator Initialisation
s_stoch = stoch(close, high, low, i_stoch_length) 
s_vwma = vwma(close,i_vwma_length)
s_sma = sma(close,i_sma_length)

//MONEY FLOW + BBW
atr1 =ema((atr(14)/close),i_atr_len/2)
atr2 =ema((atr(14)/close), i_atr_len)
is_ranging = iff(atr1 < atr2, true, false)
s_mfi = mfi(close,i_mfi_length)
overTop = iff(s_mfi >= 90, true, false)
underBot = iff(s_mfi <= 10, true, false)

//Price Divergance
ph = pivothigh(high, i_div_price,i_div_price)
pl = pivotlow(low,i_div_price,i_div_price)

var float pH = 0.0
var float pL = 0.0

high_acc = high * (i_inacc)
low_acc = low * i_inacc

if (high-high_acc) > pH or (high+high_acc < pH) and ph
    pH := high
    pH := nz(pH)
if (low+low_acc) < pL or (low-low_acc > pL) and pl
    pL := low
    pL := nz(pL)

higher_low = false
lower_low = false
//Filter out innacurate
if ph or pl
    if pL < pL[1]
        lower_low := true
    if pL > pL[1]
        higher_low := true
        
//MFI Divergance
mh = pivothigh(s_mfi, i_mfi_left,i_mfi_right)
ml = pivotlow(s_mfi, i_mfi_left,i_mfi_right)
bl = bar_index

var float mH = 0.0
var float mL = 0.0
var int bL = 0

if mh
    mH := highest(nz(mh),i_mfi_left)
    mH := nz(mH)
if ml
    bL := bar_index
    mL := ml
    mL := nz(mL)

higher_low_m = false
lower_low_m = false

if ml 
    if mL < mL[1]
        lower_low_m := true
    if mL > mL[1]
        higher_low_m := true

//Combintion
var int price_range = na
var int rsi_range = na
var int mfi_range = na

//Higher low on price, lower low on rsi, then check with stoch
mfi_div_bullish = iff(higher_low and higher_low_m, true, false)

if mfi_div_bullish
    price_range := 0
    rsi_range := 0

//VWMA/SMA/OBV
_src = s_vwma-s_sma
sd_src = stdev(_src,14)
pooled_src = (_src/sd_src)*2

sd_s_vwma = stdev(s_vwma,14)
sd_s_sma = stdev(s_sma,14)

longTrend = obv > ema(obv,100) and is_ranging == false
crossOver = crossover(s_vwma , s_sma)
crossingOver = (s_vwma > s_sma) and (close >= s_vwma) 
crossUnder = crossunder(s_vwma, s_sma)
crossingUnder = (s_vwma < s_sma) and (close <= s_vwma)

hist_color = f_c_gradientAdvDec(s_vwma-s_sma, (s_vwma-s_sma)/2, color.new(c_sell,90), color.new(c_buy,80))

//Strategy Entries
mfi_stoch_trend = iff(enb_stoch_mfi, iff(s_stoch >= 50 and crossover(s_mfi, 50) and crossingOver and longTrend and is_ranging == false, true, false), false)

var buy_counter_rsi = 0
var buy_counter_mfi = 0

mfi_div = iff(enb_stoch_mfi_div, iff(mfi_div_bullish and crossingOver and s_stoch >= 50 and is_ranging, true, false), false)

if mfi_div
    buy_counter_mfi := bar_index + 5
    
mfi_divergent_buy = iff(bar_index <= buy_counter_mfi and strategy.position_size == 0, true, false)

//Strategy Entries
order_fired = false
var float previousRes = 0.0

tpprice := strategy.position_avg_price * (1+tp_percentage)
if time_check
    if mfi_stoch_trend
        strategy.entry("Buy", true, comment = "[B] STOCH/MFI")
        order_fired := true
    if mfi_divergent_buy
        strategy.entry("Buy", true, comment = "[B] MFI Hidden Divergance")
        order_fired := true
        
    if order_fired 
        previousRes := _pL
    if strategy.position_size > 0
        strategy.exit("Buy", limit = tpprice, comment = "TP")
    if close <= previousRes 
        strategy.exit("Buy", stop = previousRes, comment = "SL")
        
//Drawings
hline(0, "Base", color.white)
hline(100, "Max", color.white)

p_stoch = plot(s_stoch, color = c_stoch)
p_mfi = plot(s_mfi, color = c_mfi)

hline(70, "Top Line")
p_mid = plot(50, "Mid Line", color.new(color.white,100))
hline(50, "Mid Line")
hline(30, "Bot Line")
fill(p_stoch, p_mid, color.new(c_stoch, 60))

plotshape(crossOver ? 5 : crossUnder ? -5 : na, style = shape.square, color = crossOver ? c_buy : crossUnder ? c_sell : na, size = size.tiny, location = location.absolute)
plot((_src/sd_src)*2, color = hist_color, style = plot.style_histogram)

//Boxes
// var string same = ""

// var box _box = na
// if longTrend and is_ranging == false and same != "longtrend"
//     same := "longtrend"
//     _box := box.new(bar_index, 105, bar_index, 100, bgcolor = c_longtrend,border_color = color.new(color.white, 100))
// else if is_ranging and same != "isranging"
//     same := "isranging"
//     _box := box.new(bar_index, 105, bar_index, 100, bgcolor = c_flat,border_color = color.new(color.white, 100))

// if not na(_box)
//     box.set_right(_box,bar_index)

// //Div Lines
// var line _line = na
// if mfi_divergent_buy
//     _line = line.new(bL[1] -6, s_mfi[bar_index-bL[1]], bar_index + 6, s_mfi, color = color.green, width = 3)


```

> Detail

https://www.fmz.com/strategy/435885

> Last Modified

2023-12-19 15:18:09
