
> Name

Wavetrend-Large-Amplitude-Oversold-Rebound-Grid-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1138c476066faee3b5f.png)


#### Overview
This strategy is based on the Wavetrend indicator and establishes long positions when the price reaches multiple oversold and overbought levels. It closes positions for profit when the price rebounds to the overbought level. This is a grid trading strategy designed to capture oversold rebound opportunities in the market, suitable for 15-minute cycles of cryptocurrencies such as Bitcoin and Solana.

#### Strategy Principles
1. Calculate two lines of the Wavetrend indicator, one is the original value (wt1) and the other is the smoothed value (wt2).
2. Set multiple oversold levels (oslevel1~8) and overbought levels (Oblevel1~5).
3. When both wt1 and wt2 are below a certain oversold level and wt1 is above wt2, open a long position. The lower the level, the more aggressive the position.
4. When both wt1 and wt2 are above the overbought level 1 and wt1 is below wt2, close 70% of the long position.
5. Repeat steps 3 and 4 to build a grid trading system.

#### Strategy Advantages
1. Capture oversold rebound opportunities: By setting multiple oversold levels, it opens positions after a significant price drop to profit from the rebound.
2. Batch position building to control risk: It builds positions in batches according to oversold levels, with heavier positions at lower levels, allowing better risk control.
3. Automatic profit-taking: It automatically closes most of the positions when the price rebounds to the overbought zone, locking in profits.
4. Flexible parameters: Oversold and overbought levels can be adjusted according to market characteristics and personal preferences, adapting to different trading products and cycles.

#### Strategy Risks
1. Crash risk: If the price continues to fall, triggering more and more oversold opening signals, it may lead to heavy positions being trapped.
2. Choppy market risk: If the price repeatedly fluctuates in the oversold zone, it may lead to multiple position openings without being able to take profit, thus weakening the strategy's effect.
3. Parameter risk: Different parameter settings have a significant impact on strategy performance and need to be optimized based on backtesting and experience, otherwise, they may bring losses.

#### Strategy Optimization Directions
1. Add trend filtering: Determine if the big-level trend is upward before opening a position to avoid opening positions in a downward trend.
2. Optimize position management: Adjust the opening position size according to the distance between the price and the oversold level, with larger positions for greater distances.
3. Dynamic profit-taking: Dynamically adjust the profit-taking level based on the holding profit and loss ratio, instead of closing positions at a fixed ratio.
4. Add stop-loss: Set a fixed or trailing stop-loss to control the maximum loss of a single transaction.

#### Summary
The Wavetrend Large Amplitude Oversold Rebound Grid Trading Strategy is a quantitative strategy based on oversold and overbought signals. It attempts to capture rebound opportunities after a sharp fall through batch position building and automatic profit-taking, aiming to profit from the price difference. The advantage of this strategy lies in its strong adaptability and flexible parameter adjustment. However, it also faces risks such as continued market decline and improper parameter settings. In practical applications, trend filtering, dynamic positioning, profit-taking, and stop-loss optimization methods can be considered to improve the strategy's stability and profitability. However, it still needs to be noted that this strategy is a high-risk strategy that requires strict position control and cautious use.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|40|channel length|
|v_input_2|60|average length|
|v_input_3|40|over bought level 1|
|v_input_4|50|over bought level 1|
|v_input_5|70|over bought level 1|
|v_input_6|80|over bought level 1|
|v_input_7|100|over bought level 2|
|v_input_8|-40|over sold level 1|
|v_input_9|-45|over sold level 1|
|v_input_10|-50|over sold level 1|
|v_input_11|-55|over sold level 1|
|v_input_12|-65|over sold level 1|
|v_input_13|-75|over sold level 1|
|v_input_14|-85|over sold level 1|
|v_input_15|-100|over sold level 2|
|v_input_16_hlc3|0|source: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-25 00:00:00
end: 2024-04-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// © And Isaac, all rights reserved. If there is any piracy, please call the police immediately. 

strategy(title='wavetrend',shorttitle='DCA-High win rate quantitative trading')
n1 = input(40,'channel length')
n2 = input(60,'average length')
Oblevel1 = input(40,'over bought level 1')
Oblevel2 = input(50,'over bought level 1')
Oblevel3 = input(70,'over bought level 1')
Oblevel4 = input(80,'over bought level 1')
Oblevel5 = input(100,'over bought level 2')
oslevel1 = input(-40,'over sold level 1')
oslevel2 = input(-45,'over sold level 1')
oslevel3 = input(-50,'over sold level 1')
oslevel4 = input(-55,'over sold level 1')
oslevel5 = input(-65,'over sold level 1')
oslevel6 = input(-75,'over sold level 1')
oslevel7 = input(-85,'over sold level 1')
oslevel8 = input(-100,'over sold level 2')

ap = input(title="source",defval=hlc3)
esa =ta.ema(ap, n1)
d =ta.ema(math.abs(ap - esa),n1)
ci = (ap - esa)/ (0.015 * d)
tci = ta.ema(ci,n2)

wt1 = tci
wt2 = ta.sma(wt1, 4)

plot(0,color=color.new(#787b86, 0 ))
plot(Oblevel1, color=color.new(#89ff52, 53), linewidth = 2)
plot(oslevel1, color=color.new(#89ff52, 53), linewidth = 2)
plot(oslevel2, color=color.new(#89ff52, 53), linewidth = 2)
plot(oslevel3, color=color.new(#89ff52, 53), linewidth = 2)
plot(oslevel4, color=color.new(#89ff52, 53), linewidth = 2)
plot(oslevel5, color=color.new(#89ff52, 53), linewidth = 2)
plot(oslevel6, color=color.new(#89ff52, 53), linewidth = 2)
plot(oslevel7, color=color.new(#89ff52, 53), linewidth = 2)
plot(oslevel8, color=color.new(#89ff52, 53), linewidth = 2)
plot(oslevel2, color=color.new(#89ff52, 53), linewidth = 2)
plot(wt1, color=color.new(#ff5252,0))
plot(wt2, color=color.new(#ffffff,0))
plot(wt1 - wt2, color=color.new(#00bcd4, 30),style=plot.style_area)

plot(ta.cross(wt1, wt2) ? wt2 : na, color=color.new(#ff5252,0) , style=plot.style_circles, linewidth=4 )

// barcolor(cross(wt1, wt2) ? (wt2 - wt1 > 0 ? aqua : yellow) : na)
barcolor(ta.cross(wt1, wt2) ? (wt2 - wt1 > 0 ? color.new(#ffffff,0) : color.new(#89ff52, 53)) : na)

/////////////
Long1 = wt2 < oslevel1 and wt1 < oslevel1 and wt1>wt2 and wt2 > oslevel3 and wt1>oslevel3
Long5 = wt2 < oslevel5 and wt1 < oslevel5 and wt1>wt2 and wt2 > oslevel6 and wt1>oslevel6

Long7 = wt2 < oslevel7 and wt1 < oslevel7 and wt1>wt2 and wt2 > oslevel8 and wt1>oslevel8
Long8 = wt2 < oslevel8 and wt1 < oslevel8 and wt1>wt2
LS1 = wt2 > Oblevel1 and wt1 > Oblevel1 and wt1<wt2



if Long1
    strategy.entry("L",strategy.long,comment = "做多1")


if Long5
    strategy.entry("L",strategy.long,comment = "做5")

if Long7
    strategy.entry("L",strategy.long,comment = "做多7")
if Long8
    strategy.entry("L",strategy.long,comment = "做多8")
if LS1
    strategy.close("L", qty_percent = 70,comment = "平多")



```

> Detail

https://www.fmz.com/strategy/449445

> Last Modified

2024-04-25 17:13:39
