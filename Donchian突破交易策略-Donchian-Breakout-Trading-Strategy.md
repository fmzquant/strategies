
> Name

Donchian突破交易策略-Donchian-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/168d56ab283ab5cbf6b.png)


#### Overview
The Donchian Breakout Trading Strategy is a trading system based on the Donchian Channel indicator. The main idea of this strategy is to capture market trends by breaking through the upper and lower bands of the Donchian Channel, and to use a fixed Risk Reward Ratio (RR) for take profit and stop loss. When the price breaks above the upper band of the Donchian Channel and creates a new high relative to the Donchian Channel period, it goes long; when it breaks below the lower band and creates a new low, it goes short. At the same time, the stop loss is set at the middle band of the Donchian Channel, and the take profit is calculated based on the set Risk Reward Ratio.

#### Strategy Principle
1. Calculate Donchian Channel: Based on the set Donchian Channel period (default 20), calculate the highest and lowest prices within that period as the upper and lower bands of the Donchian Channel respectively, and calculate the midpoint of the upper and lower bands as the middle band of the Donchian Channel.
2. Determine if a new high/low is created: By looping and comparing the current Donchian Channel upper and lower bands with the upper and lower bands of the previous few periods, determine if a new high or low relative to the Donchian Channel period is created. If a new high is created, the Donchian upper band is displayed in blue; if a new low is created, the Donchian lower band is displayed in blue.
3. Breakout entry: When the closing price breaks above the blue Donchian upper band, it enters a long position; when it breaks below the blue Donchian lower band, it enters a short position. That is, only breakouts that occur after a new high/low is created are valid.
4. Take profit and stop loss: When opening a position, record the entry price and the current Donchian Channel middle band price, and calculate the price difference between the two. The stop loss is set at the Donchian Channel middle band, and the take profit is calculated based on the set Risk Reward Ratio (default 5 times) and the price difference.
5. Close position: When the price reaches the take profit or stop loss price, the position is closed.

#### Strategy Advantages
1. Suitable for trending markets: The Donchian Breakout Strategy enters positions by breaking through the upper/lower bands, following the direction of the market trend, and performs well in trending markets.
2. New high/low filtering: The strategy filters out some noise signals and false breakouts by determining whether a new high/low is created within the Donchian Channel period, improving the quality of entry signals.
3. Fixed Risk Reward Ratio: The take profit and stop loss positions for each trade are based on a fixed Risk Reward Ratio, making the risk controllable and conducive to money management.
4. Simple parameters: The strategy parameters are relatively simple to set, mainly the Donchian Channel period and Risk Reward Ratio, making optimization and control easier.

#### Strategy Risks
1. Magnitude loss: The stop loss position of the strategy is the Donchian Channel middle band. In unclear trends or fluctuating markets, there may be situations where a single transaction suffers a large loss.
2. Frequent trading: If the Donchian Channel period is set too small, it may lead to frequent opening and closing of positions, increasing transaction costs.
3. Trend reversal: During trend reversals, the strategy may experience multiple consecutive stop losses.
4. Parameter sensitivity: The strategy performance is sensitive to parameter settings and needs to be optimized based on different market characteristics and trading cycles.

#### Strategy Optimization Directions
1. Dynamic stop loss: Adjust the stop loss position in real-time based on price movements, volatility, etc., such as using ATR as a stop loss reference to reduce single transaction risk.
2. Trend filtering: Add trend judgment indicators such as moving averages and only open positions when the trend direction is clear to improve signal quality.
3. Combine with other indicators: Combine with momentum indicators such as RSI and MACD to comprehensively evaluate the timing of opening positions.
4. Position management: Dynamically adjust position sizes based on market trend strength, volatility, etc., to control overall risk.
5. Parameter adaptation: Use machine learning and other methods to adaptively optimize parameter settings.

#### Summary
The Donchian Breakout Trading Strategy is a trend-following trading system based on the classic Donchian Channel indicator. It opens positions through breakouts of the upper and lower bands of the Donchian Channel and judgments of new highs/lows, with take profit and stop loss based on a fixed Risk Reward Ratio. The strategy has a simple logic and is suitable for trending markets. However, it performs poorly in fluctuating markets and is sensitive to parameter settings. It can be further optimized through the introduction of dynamic stop losses, trend filtering, position management, etc., to improve the robustness of the strategy.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|don_length|
|v_input_float_1|5|RR Profit Target|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-04-23 00:00:00
end: 2024-04-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//---------------------------------------------//
// This source code is subject to the terms of 
// the Mozilla Public License 2.0 at 
// https://mozilla.org/MPL/2.0/
// © Dillon_Grech
//---------------------------------------------//

//---------------------------------------------//
// Simple donchian channel break out strategy
// which only enters trades when price closes
// above donchian upper and creates new high 
// (long) or price closes below donchian lower
// and creates new low, relative to the donchian
// length. This is indicated by the donchian
// upper and lower color (blue). Stop loss is
// located at donchian basis and take profit
// is set at Risk Reward (RR) profit target.
//---------------------------------------------//
//@version=5
strategy("Donchian New High/Low Strategy [Dillon Grech]", overlay=true)

//---------------------------------------------//

//---------------------------------------------//
//INDICATOR 1 - Donchian New High Low Price Close
don_length = input.int(20, minval = 1)
don_lower  = ta.lowest(don_length)
don_upper  = ta.highest(don_length)
don_basis  = math.avg(don_upper, don_lower)

//loop
don_lower_upper  = true
don_higher_lower = true
for i = 0 to don_length - 1
    //Check for higher high over don_length
    if don_upper > don_upper[i]
        don_lower_upper := false
    //Check for lower low over don_length
    if don_lower < don_lower[i]
        don_higher_lower := false

//Plot
c_ora = color.orange
c_blu = color.blue
c_gra = color.gray
color_basis = c_ora
color_upper = don_lower_upper  ? c_blu : c_gra
color_lower = don_higher_lower ? c_blu : c_gra
plot(don_basis,     "Don Basis", color_basis, 2)
u = plot(don_upper, "Don Upper", color_upper, 2)
l = plot(don_lower, "Don Lower", color_lower, 2)

//Conditions
Ind_1_L = ta.crossover(close, don_upper[1]) and 
   don_lower_upper[1]
Ind_1_S = ta.crossunder(close,don_lower[1]) and 
   don_higher_lower[1]
//---------------------------------------------//

//---------------------------------------------//
//ENTRY CONDITIONS
entry_long  = strategy.position_size<=0 and
   Ind_1_L
entry_short = strategy.position_size>=0 and
   Ind_1_S

if(entry_long)
    strategy.entry("Long Entry", strategy.long)
if(entry_short)
    strategy.entry("Short Entry", strategy.short)
//---------------------------------------------/

//---------------------------------------------//
//TAKE PROFIT AND STOP LOSS CONDITIONS
profit_RR = input.float(5.0,"RR Profit Target")

//Store Price on new entry signal
entry_price = strategy.opentrades.entry_price(
   strategy.opentrades-1)

//Store Donchain Channel Basis
entry_don_basis = float(0.0)
if entry_long or entry_short
    entry_don_basis := don_basis
else
    entry_don_basis := entry_don_basis[1]

//Get stop loss distance
stop_distance = math.abs(entry_price -
   entry_don_basis)
stop_L   = entry_price - stop_distance
profit_L = entry_price + stop_distance*profit_RR
stop_S   = entry_price + stop_distance
profit_S = entry_price - stop_distance*profit_RR

//Plot TP and SL
plot(entry_long or entry_short ? na :
   strategy.position_size > 0 ? profit_L : na,
   color=color.lime, style=plot.style_linebr,
   linewidth=2)
plot(entry_long or entry_short ? na :
   strategy.position_size > 0 ? stop_L : na,
   color=color.red,  style=plot.style_linebr,
   linewidth=2)
plot(entry_long or entry_short ? na : 
   strategy.position_size < 0 ? profit_S : na,
   color=color.lime, style=plot.style_linebr,
   linewidth=2)
plot(entry_long or entry_short ? na :
   strategy.position_size < 0 ? stop_S : na,
   color=color.red,  style=plot.style_linebr,
   linewidth=2)

//Exit long trades
strategy.exit(id = 'Exit Long', 
   from_entry ='Long Entry', 
   stop = stop_L, limit = profit_L)
strategy.exit(id = 'Exit Short', 
   from_entry ='Short Entry', 
   stop = stop_S, limit = profit_S)
//---------------------------------------------//
```

> Detail

https://www.fmz.com/strategy/449818

> Last Modified

2024-04-29 14:56:35
