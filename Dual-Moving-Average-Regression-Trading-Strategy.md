
> Name

Dual-Moving-Average-Regression-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/128f1faff075c31350f.png)


#### Overview
This strategy uses two linear regression lines with different lengths as trading signals, combined with ATR for stop loss and partial profit taking. When the shorter-period linear regression line crosses above the longer-period linear regression line from below, it generates a long signal; conversely, when the shorter-period linear regression line crosses below the longer-period linear regression line from above, it generates a short signal. After opening a position, the strategy uses ATR as a trailing stop loss, while employing a partial profit-taking method to maximize profits.

#### Strategy Principles
1. Calculate two linear regression lines with different periods (default 20 and 40) as trading signals
2. When the shorter-period linear regression line crosses above the longer-period linear regression line, open a long position if there is no current position
3. When the shorter-period linear regression line crosses below the longer-period linear regression line, open a short position if there is no current position
4. Once a position is opened, use ATR to calculate the trailing stop loss price, and close all positions when the price reaches the stop loss level
5. The strategy also employs a partial profit-taking method, calculating 16 different percentage take-profit levels (from 5% to 80%) based on the entry price, and closing a corresponding amount of positions at each take-profit level according to the input percentage
6. Until all positions are closed

#### Advantage Analysis 
1. Using linear regression as a trend judgment and trading signal can better capture trends
2. Combining two linear regressions with different periods forms a more reliable signal confirmation
3. Using ATR as a stop loss can better control risks and keep in sync with price fluctuations
4. The partial profit-taking method can obtain more profits when the trend continues, while also taking risk control into account
5. The code is highly modularized with many input parameters, making the strategy highly customizable

#### Risk Analysis
1. Linear regression signals may generate false signals, leading to losses
2. Partial profit-taking may lead to longer holding periods, facing drawdown risks
3. Improper parameter settings may lead to poor strategy performance
4. In extreme market conditions, the strategy may face significant drawdowns

#### Optimization Directions
1. Consider introducing more indicators or filtering conditions to improve signal accuracy, such as trend confirmation indicators, volatility indicators, etc.
2. Optimize the position and strategy of take-profit and stop-loss, consider dynamic take-profit and stop-loss
3. Optimize parameters to find the best parameter combination
4. Add position management to adjust position size according to market volatility conditions

#### Summary
This dual moving average regression strategy combines trend-following and take-profit/stop-loss strategies, which can effectively capture trending markets while controlling drawdowns. However, the strategy may underperform in ranging markets and faces the problem of parameter optimization. Overall, this strategy is a typical representative of a trend-following strategy and can be used as a base strategy for optimization and improvement.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-24 00:00:00
end: 2024-05-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © fuatcakir9

//@version=5

strategy(title = "RPK_V4.3(1K$)_Shared", shorttitle="RPK_V4.3(1K$)_Shared",overlay=true)

////

regresyonUzunluk = input.int(20, minval=1,step = 20, group = "Strategy Condition")
off = 0
sapma = 2
cc1 = close
lreg1 = ta.linreg(cc1, regresyonUzunluk, off)
lreg_x1 = ta.linreg(cc1, regresyonUzunluk, off + 1)
b1 = bar_index
s1 = lreg1 - lreg_x1
intr1 = lreg1 - b1 * s1
dS1 = 0.0
for i1 = 0 to regresyonUzunluk - 1 by 1
    dS1 += math.pow(cc1[i1] - (s1 * (b1 - i1) + intr1), 2)
    dS1
de1 = math.sqrt(dS1 / regresyonUzunluk)
up1 = -de1 * sapma + lreg1
down1 = de1 * sapma + lreg1
t1 = 0
x11 = bar_index - regresyonUzunluk
x21 = bar_index
kirmizi = s1 * (bar_index - regresyonUzunluk) + intr1
yesil = lreg1

//
regresyonUzunlukUst = input.int(40, minval=1,step = 20, group = "Strategy Condition")
cc1Ust = close
lreg1Ust = ta.linreg(cc1Ust, regresyonUzunlukUst, off)
lreg_x1Ust = ta.linreg(cc1Ust, regresyonUzunlukUst, off + 1)
b1Ust = bar_index
s1Ust = lreg1Ust - lreg_x1Ust
intr1Ust = lreg1Ust - b1 * s1Ust
dS1Ust = 0.0
for i1Ust = 0 to regresyonUzunlukUst - 1 by 1
    dS1Ust += math.pow(cc1Ust[i1Ust] - (s1Ust * (b1Ust - i1Ust) + intr1Ust), 2)
    dS1Ust
de1Ust = math.sqrt(dS1Ust / regresyonUzunlukUst)
up1Ust = -de1Ust * sapma + lreg1Ust
down1Ust = de1Ust * sapma + lreg1Ust
t1Ust = 0
x11Ust = bar_index - regresyonUzunlukUst
x21Ust = bar_index
kirmiziUst = s1Ust * (bar_index - regresyonUzunlukUst) + intr1Ust
yesilUst = lreg1Ust
///


trendShort = plot(kirmizi,"RegresyonDown",color = color.rgb(248, 10, 10, 43),linewidth = 1,style = plot.style_line)
trendLong = plot(yesil,"RegresyonUp",color = color.rgb(8, 166, 13, 48),linewidth = 1,style = plot.style_line)

trendShortUst = plot(kirmiziUst,"RegresyonDown",color = color.rgb(255, 82, 82, 40),linewidth = 4,style = plot.style_line)
trendLongUst = plot(yesilUst,"RegresyonUp",color = color.rgb(76, 175, 79, 32),linewidth = 4,style = plot.style_line)

group_strategy = "Settings of Strategy"
Start_Time = input(defval=timestamp('01 January 2000 13:30 +0000'), title='Start Time of BackTest', group =group_strategy)
End_Time = input(defval=timestamp('30 April 2030 19:30 +0000'), title='End Time of BackTest', group =group_strategy)
yearCondition = true

trailingLongPrice = 0.0
trailingShortPrice = 0.0

atr = ta.atr(10)
atrCarpan = input.float(8,"ATR Carpan",step = 2,group = "Strategy Condition")

atrCarpan_changed = input.float(4,"Değişen ATR Carpan",step = 1,group = "Strategy Condition")
istenilen_kapatma_sayisi = input(defval = 16, title = "İstenilen Istem Sayısı",group = "Strategy Condition")



kapatilan_poz =strategy.closedtrades -  ta.valuewhen(strategy.opentrades[1] == 0 and strategy.opentrades == 1,strategy.closedtrades,0)

changed_color_up = color(na)
changed_color_down = color(na)

if kapatilan_poz >= istenilen_kapatma_sayisi
    atrCarpan := atrCarpan_changed
    changed_color_up := color.rgb(0, 255, 8)
    changed_color_down := color.rgb(255, 0, 0)
else
    changed_color_up := color.green
    changed_color_down := color.red

//

if strategy.position_size > 0
    stopValue = low - atrCarpan*atr
    trailingLongPrice := math.max(stopValue, trailingLongPrice[1])
else
    trailingLongPrice:=0


if strategy.position_size <0
    stopValue = high + atrCarpan*atr
    trailingShortPrice := math.min(stopValue, trailingShortPrice[1])
else
    trailingShortPrice :=99999

plot(strategy.position_size < 0 ? trailingShortPrice : na , color = changed_color_down, linewidth=3, style = plot.style_linebr)
plot(strategy.position_size > 0 ? trailingLongPrice : na , color=changed_color_up, linewidth=3,style = plot.style_linebr)



TP_Long_1_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=55"
TP_Long_2_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=60"
TP_Long_3_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=65"
TP_Long_4_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=66"
TP_Long_5_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=66"
TP_Long_6_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=67"
TP_Long_7_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=67"
TP_Long_8_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=68"
TP_Long_9_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=68"
TP_Long_10_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=69"
TP_Long_11_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=69"
TP_Long_12_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=70"
TP_Long_13_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=70"
TP_Long_14_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=71"
TP_Long_15_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=72"
TP_Long_16_Msg="\nYon=SELL\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=73"

TP_Short_1_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=55"
TP_Short_2_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=60"
TP_Short_3_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=65"
TP_Short_4_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=66"
TP_Short_5_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=66"
TP_Short_6_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=67"
TP_Short_7_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=67"
TP_Short_8_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=68"
TP_Short_9_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=68"
TP_Short_10_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=69"
TP_Short_11_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=69"
TP_Short_12_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=70"
TP_Short_13_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=70"
TP_Short_14_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=71"
TP_Short_15_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=72"
TP_Short_16_Msg="\nYon=BUY\nSembol={{ticker}}\nPiyasa=FUTURE\nTip=MARKET\nTutar=73"
//
longTSL = (ta.crossunder(close,trailingLongPrice)) and strategy.opentrades != 0
shortTSL = ta.crossover(close,trailingShortPrice) and strategy.opentrades != 0
 
longCondition3 = ta.crossover(yesil[1],kirmizi[1]) and yesilUst > kirmiziUst 
shortCondition3 = ta.crossunder(yesil[1],kirmizi[1]) and yesilUst < kirmiziUst 

longCondition =  longCondition3 and yearCondition and strategy.opentrades == 0 and strategy.position_size == 0
shortCondition =  shortCondition3 and yearCondition and strategy.opentrades == 0 and strategy.position_size == 0
//
tp1 = input.float(defval = 10.0, title = "TP1 Percent", inline = "1", group ="##### TP AND SL #####")/100
tp1_percent = input.int(defval = 5, title = "% TP1 Kapatma ", inline = "1", group ="##### TP AND SL #####")
tp2 = input.float(defval = 10.0, title = "TP2 Percent", inline = "2", group ="##### TP AND SL #####")/100
tp2_percent = input.int(defval = 5, title = "% TP2 Kapatma ", inline = "2", group ="##### TP AND SL #####")
tp3 = input.float(defval = 10.0, title = "TP3 Percent", inline = "3", group ="##### TP AND SL #####")/100
tp3_percent = input.int(defval = 5, title = "% TP3 Kapatma ", inline = "3", group ="##### TP AND SL #####")
tp4 = input.float(defval = 1.0, title = "TP4 Percent", inline = "4", group ="##### TP AND SL #####")/100
tp4_percent = input.int(defval = 5, title = "% TP4 Kapatma ", inline = "4", group ="##### TP AND SL #####")
tp5 = input.float(defval = 1.0, title = "TP5 Percent", inline = "5", group ="##### TP AND SL #####")/100
tp5_percent = input.int(defval = 5, title = "% TP5 Kapatma ", inline = "5", group ="##### TP AND SL #####")
tp6 = input.float(defval = 1.0, title = "TP6 Percent", inline = "6", group ="##### TP AND SL #####")/100
tp6_percent = input.int(defval = 5, title = "% TP6 Kapatma ", inline = "6", group ="##### TP AND SL #####")
tp7 = input.float(defval = 1.0, title = "TP7 Percent", inline = "7", group ="##### TP AND SL #####")/100
tp7_percent = input.int(defval = 5, title = "% TP7 Kapatma ", inline = "7", group ="##### TP AND SL #####")
tp8 = input.float(defval = 1.0, title = "TP8 Percent", inline = "8", group ="##### TP AND SL #####")/100
tp8_percent = input.int(defval = 5, title = "% TP8 Kapatma ", inline = "8", group ="##### TP AND SL #####")
tp9 = input.float(defval = 1.0, title = "TP9 Percent", inline = "9", group ="##### TP AND SL #####")/100
tp9_percent = input.int(defval = 5, title = "% TP9 Kapatma ", inline = "9", group ="##### TP AND SL #####")
tp10 = input.float(defval = 1.0, title = "TP10 Percent", inline = "10", group ="##### TP AND SL #####")/100
tp10_percent = input.int(defval = 5, title = "% TP10 Kapatma ", inline = "10", group ="##### TP AND SL #####")
tp11 = input.float(defval = 1.0, title = "TP11 Percent", inline = "11", group ="##### TP AND SL #####")/100
tp11_percent = input.int(defval = 5, title = "% TP11 Kapatma ", inline = "11", group ="##### TP AND SL #####")
tp12 = input.float(defval = 1.0, title = "TP12 Percent", inline = "12", group ="##### TP AND SL #####")/100
tp12_percent = input.int(defval = 5, title = "% TP12 Kapatma ", inline = "12", group ="##### TP AND SL #####")
tp13 = input.float(defval = 1.0, title = "TP13 Percent", inline = "13", group ="##### TP AND SL #####")/100
tp13_percent = input.int(defval = 5, title = "% TP13 Kapatma ", inline = "13", group ="##### TP AND SL #####")
tp14 = input.float(defval = 1.0, title = "TP14 Percent", inline = "14", group ="##### TP AND SL #####")/100
tp14_percent = input.int(defval = 5, title = "% TP14 Kapatma ", inline = "14", group ="##### TP AND SL #####")
tp15 = input.float(defval = 1.0, title = "TP15 Percent", inline = "15", group ="##### TP AND SL #####")/100
tp15_percent = input.int(defval = 5, title = "% TP15 Kapatma ", inline = "15", group ="##### TP AND SL #####")
tp16 = input.float(defval = 1.0, title = "TP16 Percent", inline = "16", group ="##### TP AND SL #####")/100
tp16_percent = input.int(defval = 5, title = "% TP16 Kapatma ", inline = "16", group ="##### TP AND SL #####")


v2takeprofit_level_long1 = strategy.position_avg_price * (1 + tp1 )
v2takeprofit_level_long2 = strategy.position_avg_price * (1 + (tp2+ tp1))
v2takeprofit_level_long3 = strategy.position_avg_price * (1 + (tp3 + tp2 + tp1))
v2takeprofit_level_long4 = strategy.position_avg_price * (1 + (tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_long5 = strategy.position_avg_price * (1 + (tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_long6 = strategy.position_avg_price * (1 + (tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_long7 = strategy.position_avg_price * (1 + (tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_long8 = strategy.position_avg_price * (1 + (tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_long9 = strategy.position_avg_price * (1 + (tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_long10 = strategy.position_avg_price * (1 + (tp10 + tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_long11 = strategy.position_avg_price * (1 + (tp11 + tp10 + tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_long12 = strategy.position_avg_price * (1 + (tp12 + tp11 + tp10 + tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_long13 = strategy.position_avg_price * (1 + (tp13 + tp12 + tp11 + tp10 + tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_long14 = strategy.position_avg_price * (1 + (tp14 + tp13 + tp12 + tp11 + tp10 + tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_long15 = strategy.position_avg_price * (1 + (tp15 + tp14 + tp13 + tp12 + tp11 + tp10 + tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_long16 = strategy.position_avg_price * (1 + (tp16 + tp15 + tp14 + tp13 + tp12 + tp11 + tp10 + tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))

v2takeprofit_level_short1 = strategy.position_avg_price * (1 - tp1 )
v2takeprofit_level_short2 = strategy.position_avg_price * (1 - (tp2 + tp1))
v2takeprofit_level_short3 = strategy.position_avg_price * (1 - (tp3 + tp2 + tp1))
v2takeprofit_level_short4 = strategy.position_avg_price * (1 - (tp4 + tp3 + tp2 + tp1))
v2takeprofit_level_short5 = strategy.position_avg_price * (1 - (tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_short6 = strategy.position_avg_price * (1 - (tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_short7 = strategy.position_avg_price * (1 - (tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_short8 = strategy.position_avg_price * (1 - (tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_short9 = strategy.position_avg_price * (1 - (tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_short10 = strategy.position_avg_price * (1 - (tp10 + tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_short11 = strategy.position_avg_price * (1 - (tp11 + tp10 + tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_short12 = strategy.position_avg_price * (1 - (tp12 + tp11 + tp10 + tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_short13 = strategy.position_avg_price * (1 - (tp13 + tp12 + tp11 + tp10 + tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_short14 = strategy.position_avg_price * (1 - (tp14 + tp13 + tp12 + tp11 + tp10 + tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_short15 = strategy.position_avg_price * (1 - (tp15 + tp14 + tp13 + tp12 + tp11 + tp10 + tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))
v2takeprofit_level_short16 = strategy.position_avg_price * (1 - (tp16 + tp15 + tp14 + tp13 + tp12 + tp11 + tp10 + tp9 + tp8 + tp7 + tp6 + tp5 + tp4 + tp3 + tp2+ tp1))





if (longCondition)
    strategy.entry("Long", strategy.long, comment = "Long Giriş")

if (shortCondition)
    strategy.entry("Short", strategy.short, comment = "Short Giriş")

if longTSL 
    strategy.close("Long",comment = "Long TSL")
if shortTSL  
    strategy.close("Short", comment = "Short TSL")

if  strategy.position_size > 0 
    strategy.exit('TP_Long_1',from_entry = "Long", limit= v2takeprofit_level_long1 , qty_percent=tp1_percent, alert_message = TP_Long_1_Msg)
if  strategy.position_size > 0    
    strategy.exit('TP_Long_2',from_entry = "Long", limit= v2takeprofit_level_long2 ,qty_percent=tp2_percent, alert_message = TP_Long_2_Msg)
if  strategy.position_size > 0     
    strategy.exit('TP_Long_3',from_entry = "Long", limit= v2takeprofit_level_long3 ,qty_percent= tp3_percent, alert_message = TP_Long_3_Msg)
if  strategy.position_size > 0    
    strategy.exit('TP_Long_4',from_entry = "Long", limit= v2takeprofit_level_long4 ,qty_percent= tp4_percent, alert_message = TP_Long_4_Msg)
if  strategy.position_size > 0 
    strategy.exit('TP_Long_5',from_entry = "Long", limit= v2takeprofit_level_long5 , qty_percent=tp5_percent, alert_message = TP_Long_5_Msg)
if  strategy.position_size > 0    
    strategy.exit('TP_Long_6',from_entry = "Long", limit= v2takeprofit_level_long6 ,qty_percent=tp6_percent, alert_message = TP_Long_6_Msg)
if  strategy.position_size > 0     
    strategy.exit('TP_Long_7',from_entry = "Long", limit= v2takeprofit_level_long7 ,qty_percent= tp7_percent, alert_message = TP_Long_7_Msg)
if  strategy.position_size > 0    
    strategy.exit('TP_Long_8',from_entry = "Long", limit= v2takeprofit_level_long8 ,qty_percent= tp8_percent, alert_message = TP_Long_8_Msg)
if  strategy.position_size > 0 
    strategy.exit('TP_Long_9',from_entry = "Long", limit= v2takeprofit_level_long9 , qty_percent=tp9_percent, alert_message = TP_Long_9_Msg)
if  strategy.position_size > 0    
    strategy.exit('TP_Long_10',from_entry = "Long", limit= v2takeprofit_level_long10 ,qty_percent=tp10_percent, alert_message = TP_Long_10_Msg)
if  strategy.position_size > 0     
    strategy.exit('TP_Long_11',from_entry = "Long", limit= v2takeprofit_level_long11 ,qty_percent= tp11_percent, alert_message = TP_Long_11_Msg)
if  strategy.position_size > 0    
    strategy.exit('TP_Long_12',from_entry = "Long", limit= v2takeprofit_level_long12 ,qty_percent= tp12_percent, alert_message = TP_Long_12_Msg)
if  strategy.position_size > 0 
    strategy.exit('TP_Long_13',from_entry = "Long", limit= v2takeprofit_level_long13 , qty_percent=tp13_percent, alert_message = TP_Long_13_Msg)
if  strategy.position_size > 0    
    strategy.exit('TP_Long_14',from_entry = "Long", limit= v2takeprofit_level_long14 ,qty_percent=tp14_percent, alert_message = TP_Long_14_Msg)
if  strategy.position_size > 0     
    strategy.exit('TP_Long_15',from_entry = "Long", limit= v2takeprofit_level_long15 ,qty_percent= tp15_percent, alert_message = TP_Long_15_Msg)
if  strategy.position_size > 0    
    strategy.exit('TP_Long_16',from_entry = "Long", limit= v2takeprofit_level_long16 ,qty_percent= tp16_percent, alert_message = TP_Long_16_Msg)

if  strategy.position_size < 0 
    strategy.exit('TP_Short_1',from_entry = "Short", limit= v2takeprofit_level_short1 , qty_percent=tp1_percent, alert_message = TP_Short_1_Msg)
if  strategy.position_size < 0    
    strategy.exit('TP_Short_2',from_entry = "Short", limit= v2takeprofit_level_short2 ,qty_percent=tp2_percent, alert_message = TP_Short_2_Msg)
if  strategy.position_size < 0     
    strategy.exit('TP_Short_3',from_entry = "Short", limit= v2takeprofit_level_short3 ,qty_percent= tp3_percent, alert_message = TP_Short_3_Msg)
if  strategy.position_size < 0    
    strategy.exit('TP_Short_4',from_entry = "Short", limit= v2takeprofit_level_short4 ,qty_percent= tp4_percent, alert_message = TP_Short_4_Msg)
if  strategy.position_size < 0 
    strategy.exit('TP_Short_5',from_entry = "Short", limit= v2takeprofit_level_short5 , qty_percent=tp5_percent, alert_message = TP_Short_5_Msg)
if  strategy.position_size < 0    
    strategy.exit('TP_Short_6',from_entry = "Short", limit= v2takeprofit_level_short6 ,qty_percent=tp6_percent, alert_message = TP_Short_6_Msg)
if  strategy.position_size < 0     
    strategy.exit('TP_Short_7',from_entry = "Short", limit= v2takeprofit_level_short7 ,qty_percent= tp7_percent, alert_message = TP_Short_7_Msg)
if  strategy.position_size < 0    
    strategy.exit('TP_Short_8',from_entry = "Short", limit= v2takeprofit_level_short8 ,qty_percent= tp8_percent, alert_message = TP_Short_8_Msg)
if  strategy.position_size < 0 
    strategy.exit('TP_Short_9',from_entry = "Short", limit= v2takeprofit_level_short9 , qty_percent=tp9_percent, alert_message = TP_Short_9_Msg)
if  strategy.position_size < 0    
    strategy.exit('TP_Short_10',from_entry = "Short", limit= v2takeprofit_level_short10 ,qty_percent=tp10_percent, alert_message = TP_Short_10_Msg)
if  strategy.position_size < 0     
    strategy.exit('TP_Short_11',from_entry = "Short", limit= v2takeprofit_level_short11 ,qty_percent= tp11_percent, alert_message = TP_Short_11_Msg)
if  strategy.position_size < 0    
    strategy.exit('TP_Short_12',from_entry = "Short", limit= v2takeprofit_level_short12 ,qty_percent= tp12_percent, alert_message = TP_Short_12_Msg)
if  strategy.position_size < 0 
    strategy.exit('TP_Short_13',from_entry = "Short", limit= v2takeprofit_level_short13 , qty_percent=tp13_percent, alert_message = TP_Short_13_Msg)
if  strategy.position_size < 0    
    strategy.exit('TP_Short_14',from_entry = "Short", limit= v2takeprofit_level_short14 ,qty_percent=tp14_percent, alert_message = TP_Short_14_Msg)
if  strategy.position_size < 0     
    strategy.exit('TP_Short_15',from_entry = "Short", limit= v2takeprofit_level_short15 ,qty_percent= tp15_percent, alert_message = TP_Short_15_Msg)
if  strategy.position_size < 0    
    strategy.exit('TP_Short_16',from_entry = "Short", limit= v2takeprofit_level_short16 ,qty_percent= tp16_percent, alert_message = TP_Short_16_Msg)
```

> Detail

https://www.fmz.com/strategy/452353

> Last Modified

2024-05-24 17:08:38
