
> Name

五重强势移动平均策略-Quintuple-Strong-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/904116821905c46527.png)


#### Overview
The Quintuple Strong Moving Average Strategy is a trading strategy based on multiple moving averages. This strategy utilizes 5 moving averages of different timeframes and types to identify strong trends in the market. The first 3 moving averages are the core components of the strategy, primarily used for trend identification and signal generation, while the 4th and 5th moving averages are mainly used for auxiliary judgment and visual analysis.

By comprehensively considering the trends and relative position relationships of moving averages of different timeframes and types, this strategy can accurately determine the current trend direction and strength of the market, and timely adjust positions according to changes in the trend, so as to achieve good profitability.

#### Strategy Principle
This strategy uses 5 moving averages of different timeframes and types, namely:
1. Level 1 moving average: customizable display, label, data source, timeframe, length, line width, color and type.
2. Level 2 moving average: customizable display, label, data source, timeframe, length, line width, color and type.
3. Level 3 moving average: customizable display, label, data source, timeframe, length, line width, color and type.
4. Level 4 moving average: mainly used for auxiliary judgment, customizable display, label, data source, timeframe, length, line width and color.
5. Level 5 moving average: mainly used for auxiliary judgment, customizable display, label, data source, timeframe, length, line width and color.

The types of these 5 moving averages can be flexibly set, including SMA, EMA, WMA, TMA, VAR, WWMA, ZLEMA, TSF and other 8 types.

The core idea of this strategy is to determine the trend direction and strength by using multiple trend confirmations of moving averages of different timeframes and types:
- When the closing price is above the Level 1, 2, and 3 moving averages, go long;
- When the closing price is below the Level 1, 2, and 3 moving averages, go short;
- When holding a long position, if the closing price falls below the Level 1 and 2 moving averages, close long;
- When holding a short position, if the closing price rises above the Level 1 and 2 moving averages, close short.

In addition, this strategy will display the color of candlesticks according to the current position:
- When holding a long position, the candlestick is green;
- When holding a short position, the candlestick is red;
- In other cases, the candlestick is gray.

#### Strategy Advantages
1. Strong trend tracking ability. This strategy uses a combination of multiple medium and long-term moving averages to determine trends, with a strong trend recognition ability, which can effectively grasp the main market trends.
2. Flexible adjustable parameters. The parameters of this strategy can be flexibly set, including the type, timeframe, length of moving averages, etc., which can be optimized according to different market characteristics and investor preferences.
3. Adaptability to multiple markets. This strategy's judgment of trends is mainly based on the price movement itself, with strong adaptability to markets, and can be used in multiple markets such as stocks, futures, foreign exchange, cryptocurrencies, etc.
4. Clear and simple logic. The core logic of this strategy is simple and clear, easy to understand and implement, without requiring overly complex mathematical models.

#### Strategy Risks
1. Wash trading risk in rangebound markets. This strategy performs generally in rangebound markets, and may experience more small-loss trades, resulting in a decrease in net profit.
2. Parameter optimization risk. This strategy uses many parameters. If sufficient historical data backtesting and parameter optimization are not performed, it may lead to greater drawdowns in future live trading.
3. Trend reversal risk. This strategy is mainly suitable for trending markets. Once the market trend reverses, this strategy may continue to trade in the original trend direction, causing losses.

To reduce the above risks, the following improvements can be considered:
1. Add rangebound market detection and judgment logic to reduce the number of trades in non-trending markets.
2. Perform sufficient parameter optimization tests on this strategy to find a robust optimal parameter combination.
3. Set reasonable stop-loss levels to control the maximum risk of a single trade. At the same time, other indicators or signals can be used to confirm trend reversals and adjust positions in a timely manner.

#### Strategy Optimization Directions
1. Introduce more trend confirmation indicators, such as MACD, DMI, etc., to improve the accuracy of trend judgment.
2. For rangebound markets, consider introducing operating logic that can adapt to rangebound markets, such as grid trading.
3. For different market characteristics, optimize the parameters of the strategy separately to improve adaptability.
4. Consider combining this strategy with other strategies, such as a combination of trend strategy + rangebound strategy, trend strategy + countertrend strategy, etc., to improve the robustness of the strategy.

#### Summary
The Quintuple Strong Moving Average Strategy is a trading strategy based on multiple trend confirmations. By comprehensively considering the trends and relative position relationships of moving averages of different timeframes and types, it can relatively accurately determine the current trend direction and strength of the market, and timely adjust positions according to changes in the trend. The strategy logic is simple and clear, the parameters are flexible and adjustable, and it is adaptable to multiple markets. However, it performs generally in rangebound markets, and there are certain parameter optimization risks and trend reversal risks. In the future, we can consider introducing more indicators, optimizing parameters, adding operating logic for rangebound markets, and combining with other types of strategies to further improve the robustness and profitability of this strategy.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-17 00:00:00
end: 2024-05-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Quintuple Strong Moving Average Strategy","QuisMa", overlay=true, margin_long=100, margin_short=100)

// 1
mav1_show = input.bool(true, 'Show Plot', group='Level 1 ', inline='mav1_0')
mav1_label = input.bool(true, 'Show Label', group='Level 1 ', inline='mav1_0')
mav1_source = input.source(close, '', group='Level 1 ', inline='mav1_1')
mav1_timeframe = input.timeframe('5', '', group='Level 1 ', inline='mav1_1')
mav1_length = input.int(50, 'Length', group='Level 1 ', inline='mav1_3')
mav1_size = input.int(2000, 'Size', minval=1, group='Level 1 ', inline='mav1_3')
mav1_width = input.int(2, '', minval=0, group='Level 1 ', inline='mav1_2')
mav1_color = input.color(color.new(#ffd000, 0), '', group='Level 1 ', inline='mav1_2')
mav1_type = input.string(title='Moving Average Type 1', defval='VAR', options=['SMA', 'EMA', 'WMA', 'TMA', 'VAR', 'WWMA', 'ZLEMA', 'TSF'])

// 2
mav2_show = input.bool(true, 'Show Plot', group='Level 2', inline='mav2_0')
mav2_label = input.bool(true, 'Show Label', group='Level 2', inline='mav2_0')
mav2_source = input.source(close, '', group='Level 2', inline='mav2_1')
mav2_timeframe = input.timeframe('30', '', group='Level 2', inline='mav2_1')
mav2_length = input.int(50, 'Length', group='Level 2', inline='mav2_3')
mav2_size = input.int(2000, 'Size', minval=1, group='Level 2', inline='mav2_3')
mav2_width = input.int(2, '', minval=0, group='Level 2', inline='mav2_2')
mav2_color = input.color(color.new(#ffd000, 0), '', group='Level 2', inline='mav2_2')
mav2_type = input.string(title='Moving Average Type 2', defval='VAR', options=['SMA', 'EMA', 'WMA', 'TMA', 'VAR', 'WWMA', 'ZLEMA', 'TSF'])

// 3
mav3_show = input.bool(true, 'Show Plot', group='Level 3', inline='mav3_0')
mav3_label = input.bool(true, 'Show Label', group='Level 3', inline='mav3_0')
mav3_source = input.source(close, '', group='Level 3', inline='mav3_1')
mav3_timeframe = input.timeframe('60', '', group='Level 3', inline='mav3_1')
mav3_length = input.int(50, 'Length', group='Level 3', inline='mav3_3')
mav3_size = input.int(2000, 'Size', minval=1, group='Level 3', inline='mav3_3')
mav3_width = input.int(2, '', minval=0, group='Level 3', inline='mav3_2')
mav3_color = input.color(color.new(#ffd000, 0), '', group='Level 3', inline='mav3_2')
mav3_type = input.string(title='Moving Average Type 3', defval='VAR', options=['SMA', 'EMA', 'WMA', 'TMA', 'VAR', 'WWMA', 'ZLEMA', 'TSF'])

// 4
mav4_show = input.bool(true, 'Show Plot', group='Level 4', inline='mav4_0')
mav4_label = input.bool(true, 'Show Label', group='Level 4', inline='mav4_0')
mav4_source = input.source(close, '', group='Level 4', inline='mav4_1')
mav4_timeframe = input.timeframe('480', '', group='Level 4', inline='mav4_1')
mav4_length = input.int(50, 'Length', group='Level 4', inline='mav4_3')
mav4_size = input.int(2000, 'Size', minval=1, group='Level 4', inline='mav4_3')
mav4_width = input.int(2, '', minval=0, group='Level 4', inline='mav4_2')
mav4_color = input.color(color.new(#ffd000, 0), '', group='Level 4', inline='mav4_2')
mav4_type = input.string(title='Moving Average Type 4', defval='VAR', options=['SMA', 'EMA', 'WMA', 'TMA', 'VAR', 'WWMA', 'ZLEMA', 'TSF'])

// 5
mav5_show = input.bool(true, 'Show Plot', group='Level 5', inline='mav5_0')
mav5_label = input.bool(true, 'Show Label', group='Level 5', inline='mav5_0')
mav5_source = input.source(close, '', group='Level 5', inline='mav5_1')
mav5_timeframe = input.timeframe('720', '', group='Level 5', inline='mav5_1')
mav5_length = input.int(50, 'Length', group='Level 5', inline='mav5_3')
mav5_size = input.int(2000, 'Size', minval=1, group='Level 5', inline='mav5_3')
mav5_width = input.int(2, '', minval=0, group='Level 5', inline='mav5_2')
mav5_color = input.color(color.new(#ffd000, 0), '', group='Level 5', inline='mav5_2')
mav5_type = input.string(title='Moving Average Type 5', defval='VAR', options=['SMA', 'EMA', 'WMA', 'TMA', 'VAR', 'WWMA', 'ZLEMA', 'TSF'])


// FUNCTIONS {{{
candle_size_ms = time - time[1]  // milliseconds of a candle

timetostring(tms) =>
    d_ = math.floor(tms / 86400)
    h_ = math.floor((tms - d_ * 86400) / 3600)
    m_ = math.floor((tms - d_ * 86400 - h_ * 3600) / 60)
    s_ = math.floor(tms - d_ * 86400 - h_ * 3600 - m_ * 60)
    ret = d_ > 0 ? str.tostring(d_) + ' D ' : ''
    ret += (h_ > 0 ? str.tostring(h_) + ' H ' : '')
    ret += (m_ > 0 ? str.tostring(m_) + ' m ' : '')
    if d_ == 0
        ret += (s_ > 0 ? str.tostring(s_) + ' s ' : '')
        ret
    ret

tftostring(tf) =>
    tfa = str.split(tf, '')
    tfalast = array.get(tfa, array.size(tfa) - 1)
    tfalastIsNum = na(str.tonumber(tfalast)) ? false : true
    txt = tfalastIsNum ? timetostring(str.tonumber(tf) * 60) : tf
    txt

htfLabel(htfy, tf, col) =>
    txt = tftostring(tf)
    htftxt = 'ᐊ ' + txt
    htftip = 'HTF  [ ' + txt + ' ] ' + str.tostring(htfy, '#.##')
    label.new(x=time + candle_size_ms * 2, y=htfy, xloc=xloc.bar_time, yloc=yloc.price, color=color.new(color.black, 100), textcolor=col, style=label.style_label_left, size=size.normal, text=htftxt, tooltip=htftip)

// Moving Averages Functions {{{
Var_Func(src, length) =>
    valpha = 2 / (length + 1)
    vud1 = src > src[1] ? src - src[1] : 0
    vdd1 = src < src[1] ? src[1] - src : 0
    vUD = math.sum(vud1, 9)
    vDD = math.sum(vdd1, 9)
    vCMO = nz((vUD - vDD) / (vUD + vDD))
    VAR = 0.0
    VAR := nz(valpha * math.abs(vCMO) * src) + (1 - valpha * math.abs(vCMO)) * nz(VAR[1])
    VAR

Wwma_Func(src, length) =>
    wwalpha = 1 / length
    WWMA = 0.0
    WWMA := wwalpha * src + (1 - wwalpha) * nz(WWMA[1])
    WWMA

Zlema_Func(src, length) =>
    zxLag = length / 2 == math.round(length / 2) ? length / 2 : (length - 1) / 2
    zxEMAData = src + src - src[zxLag]
    ZLEMA = ta.ema(zxEMAData, length)
    ZLEMA

Tsf_Func(src, length) =>
    lrc = ta.linreg(src, length, 0)
    lrc1 = ta.linreg(src, length, 1)
    lrs = lrc - lrc1
    TSF = ta.linreg(src, length, 0) + lrs
    TSF

getMA(src, length, mav_type) =>
    ma = 0.0
    if mav_type == 'SMA'
        ma := ta.sma(src, length)
    if mav_type == 'EMA'
        ma := ta.ema(src, length)
    if mav_type == 'WMA'
        ma := ta.wma(src, length)
    if mav_type == 'TMA'
        ma := ta.sma(ta.sma(src, math.ceil(length / 2)), math.floor(length / 2) + 1)
    if mav_type == 'VAR'
        ma := Var_Func(src, length)
    if mav_type == 'WWMA'
        ma := Wwma_Func(src, length)
    if mav_type == 'ZLEMA'
        ma := Zlema_Func(src, length)
    if mav_type == 'TSF'
        ma := Tsf_Func(src, length)
    ma

mav1 = request.security(syminfo.tickerid, mav1_timeframe, getMA(mav1_source, mav1_length, mav1_type), gaps=barmerge.gaps_off, lookahead=barmerge.lookahead_on)
plot(mav1_show ? mav1 : na, 'mav 1', color=mav1_color, linewidth=mav1_width, show_last=mav1_size)
var label mav1lbl = na
label.delete(mav1lbl)
mav1lbl := mav1_label ? htfLabel(mav1, mav1_timeframe, mav1_color) : na

mav2 = request.security(syminfo.tickerid, mav2_timeframe, getMA(mav2_source, mav2_length, mav2_type), gaps=barmerge.gaps_off, lookahead=barmerge.lookahead_on)
plot(mav2_show ? mav2 : na, 'mav 2', color=mav2_color, linewidth=mav2_width, show_last=mav2_size)
var label mav2lbl = na
label.delete(mav2lbl)
mav2lbl := mav2_label ? htfLabel(mav2, mav2_timeframe, mav2_color) : na

mav3 = request.security(syminfo.tickerid, mav3_timeframe, getMA(mav3_source, mav3_length, mav3_type), gaps=barmerge.gaps_off, lookahead=barmerge.lookahead_on)
plot(mav3_show ? mav3 : na, 'mav 3', color=mav3_color, linewidth=mav3_width, show_last=mav3_size)
var label mav3lbl = na
label.delete(mav3lbl)
mav3lbl := mav3_label ? htfLabel(mav3, mav3_timeframe, mav3_color) : na

mav4 = request.security(syminfo.tickerid, mav4_timeframe, getMA(mav4_source, mav4_length, mav4_type), gaps=barmerge.gaps_off, lookahead=barmerge.lookahead_on)
plot(mav4_show ? mav4 : na, 'mav 4', color=mav4_color, linewidth=mav4_width, show_last=mav4_size)
var label mav4lbl = na
label.delete(mav4lbl)
mav4lbl := mav4_label ? htfLabel(mav4, mav4_timeframe, mav4_color) : na

mav5 = request.security(syminfo.tickerid, mav5_timeframe, getMA(mav5_source, mav5_length, mav5_type), gaps=barmerge.gaps_off, lookahead=barmerge.lookahead_on)
plot(mav5_show ? mav5 : na, 'mav 5', color=mav5_color, linewidth=mav5_width, show_last=mav5_size)
var label mav5lbl = na
label.delete(mav5lbl)
mav5lbl := mav5_label ? htfLabel(mav5, mav5_timeframe, mav5_color) : na

// Alış ve Satış Koşulları
alisKosulu = close > mav1 and close > mav2 and close > mav3
satisKosulu = close < mav1 and close < mav2 and close < mav3

// Alış ve Satış Sinyalleri
if (alisKosulu and not satisKosulu)
    strategy.entry("Alış", strategy.long)
if (satisKosulu and not alisKosulu)
    strategy.entry("Satış", strategy.short)

// Pozisyonları Kapatma Koşulları
if (strategy.opentrades > 0)
    if (close < mav1 and close < mav2 and strategy.position_size > 0)
        strategy.close("Alış")
    if (close > mav1 and close > mav2 and strategy.position_size < 0)
        strategy.close("Satış")

// Mum Rengi Ayarlama
longKosul = strategy.opentrades > 0 and strategy.position_size > 0
shortKosul = strategy.opentrades > 0 and strategy.position_size < 0

barcolor(longKosul ? color.green : shortKosul ? color.red : color.gray)

```

> Detail

https://www.fmz.com/strategy/452281

> Last Modified

2024-05-23 18:14:35
