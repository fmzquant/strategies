
> Name

Sizeblock-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ab51ca8479a421dd32.png)

## Overview

The Sizeblock strategy is a trading strategy based on the percentage or tick deviation of price changes displayed in diagonal rows. It can clearly show local trends and reversal points on the chart. This is a very useful tool for tracking price direction.

## Principles

The calculation is based on the percentage or tick deviation of the price movement (indicated in the "Deviation" parameter), which is displayed on the chart in the form of rows.

The row consists of the base middle line, upper and lower limits:

- The base middle line is equal to the upper or lower limits of the previous row (if the price changes rapidly in one time interval, then the base middle line of the current row is greater than the upper limit of the previous row or less than the lower limit of the previous row by an equal number of deviations depending on the direction of price movement). At the beginning of the calculation, the base middle line is equal to the initial value of the first row. 

- The "Quantity" parameter determines the deviation for the upper or lower limits depending on the direction of the price movement, and the "U-turn" parameter determines the deviation for changing the direction of the price movement.

The rule for constructing a new row:

- If the close ≥ the upper limit and close > open, the upper limit will gradually move up, and the lower limit will also move up but less. 

- If the low ≤ the lower limit and close < open, the lower limit will gradually move down, and the upper limit will also move down but less.

By adjusting certain deviations, you can clearly see the local trend and reversal points on the chart. This is a very useful tool for tracking price direction.

## Advantages

- Visualize price change trends and clearly identify support and resistance.

- Diagonal lines clearly show the strength of breakouts and the range of pullbacks.

- The slope of diagonal lines can be adjusted as needed to identify trends of different strength.

- Can find relatively large support and resistance for breakouts.

- Easy to see changes in price rhythm and adjust position size accordingly. 

## Risks

- Diagonal lines cannot completely accurately predict subsequent price moves.

- Need to watch for divergences in trends where diagonal lines may diverge from actual prices.

- Cannot be used as an isolated strategy, needs to incorporate other indicators to determine the major trend.

- Improper parameter adjustments may lead to overly frequent trading.

- Need to beware of potential reversals during pullbacks instead of blindly chasing trends mechanically.

Can moderately reduce position sizing and refer to other indicators as auxiliary judgment within major trends.

## Optimization

- Can add position management modules to dynamically adjust positions in different trend stages.

- Can incorporate volatility indicators to reduce positions when volatility increases.

- Can set stop loss based on drawdown percentage to control single loss.

- Can add filters to pause trading when price divergences occur. 

- Can divide diagonal slopes into multiple levels to identify trend changes of different strength.

By dynamically adjusting positions, setting stops and filters, can more steadily track price trends.

## Summary

The Sizeblock strategy utilizes diagonal lines to intuitively display price trend changes and clearly identify support, resistance and breakout levels. But cannot solely rely on diagonal lines for judgment, need to incorporate analysis from other indicators and manage risks. This is a very valuable auxiliary tool to help traders better grasp market rhythm. Optimization can make the strategy more robust and efficient with great application potential.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Jan 2000 00:00 +0000)|(?Datetime)Start time|
|v_input_2|timestamp(01 Jan 2080 23:59 +0000)|Finish time|
|v_input_string_1|0|(?Main)Source: Close|HighLow|
|v_input_string_2|0|Deviation: Percentage|Ticks|
|v_input_float_1|true|Quantity|
|v_input_float_2|2|U-turn|
|v_input_string_3|0|Positions: Limit|Market|
|v_input_string_4|0|Direction: All|Buy|Sell|
|v_input_bool_1|false|Swapping|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-06 00:00:00
end: 2023-11-05 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// **********************************************************************************
// This code is invented and written by @StCogitans.
// The idea presented in this code and the rights to this code belong to @StCogitans.
// © https://www.tradingview.com/u/StCogitans
//
// Description.
// Sizeblock - a price change strategy in the form of diagonal rows.
// **********************************************************************************

// STRATEGY
string NAME        = 'Sizeblock'
string ACRONYM     = 'SB'
bool OVERLAY       = true
int PYRAMIDING     = 0
string QTY_TYPE    = strategy.percent_of_equity
float QTY_VALUE    = 100
float CAPITAL      = 100
string COM_TYPE    = strategy.commission.percent
float COM_VALUE    = 0.1
bool ON_CLOSE      = false
bool BAR_MAGNIFIER = false
bool OHLC          = true
strategy(NAME, ACRONYM, OVERLAY, pyramiding=PYRAMIDING, default_qty_type=QTY_TYPE, default_qty_value=QTY_VALUE, initial_capital=CAPITAL, commission_type=COM_TYPE, commission_value=COM_VALUE, process_orders_on_close=ON_CLOSE, use_bar_magnifier=BAR_MAGNIFIER, fill_orders_on_standard_ohlc=OHLC)

// ARGUMENTS
// Datetime
DTstart  = input(timestamp("01 Jan 2000 00:00 +0000"), 'Start time', group='Datetime')
DTfinish = input(timestamp("01 Jan 2080 23:59 +0000"), 'Finish time', group='Datetime')
DTperiod = true

// Main
dev_source = input.string('Close', title='Source', options=["Close", "HighLow"], tooltip='Price data for settlement.', group='Main')
dev_type   = input.string('Percentage', title='Deviation', options=['Percentage', 'Ticks'], tooltip='The type of deviation to calculate.', group='Main')
dev_value  = input.float(1, title='Quantity', minval=0.001, step=0.01, tooltip='Quantity to be calculated.', group='Main')
dev_back   = input.float(2, title='U-turn', minval=0.001, step=0.01, tooltip='Quantity for reversal.', group='Main')
mode       = input.string('Limit', title='Positions', options=['Limit', 'Market'], tooltip='Limit or market orders.', group='Main')
direct     = input.string('All', title='Direction', options=['All', 'Buy', 'Sell'], tooltip='The type of positions to be opened.', group='Main')
swapping   = input.bool(false, title='Swapping', tooltip='Swap points to open a new position.', group='Main')

// CALCULATION SYSTEM
Assembling(s, t, v, vb) =>

    float a = open
    float b = close
    float c = s == "HighLow" ? math.round_to_mintick(high) : math.round_to_mintick(b)
    float d = s == "HighLow" ? math.round_to_mintick(low) : math.round_to_mintick(b)

    float x = math.round_to_mintick(a)
    x := nz(x[1], x)

    float _v = t == "Ticks" ? syminfo.mintick * v : v
    float _vb = t == "Ticks" ? syminfo.mintick * vb : vb

    float h = t == "Ticks" ? math.round_to_mintick(x + _v) : math.round_to_mintick(x * (1 + _v / 100))
    float l = t == "Ticks" ? math.round_to_mintick(x - _v) : math.round_to_mintick(x * (1 - _v / 100))
    h := nz(h[1], h)
    l := nz(l[1], l)

    if t == "Ticks"
    
        if c >= h and b > a
            while c >= h
            
                x := h
                h := math.round_to_mintick(h + _v)
                l := math.round_to_mintick(x - _vb)
        
        if d <= l and b < a
            while d <= l
            
                x := l
                l := math.round_to_mintick(l - _v)
                h := math.round_to_mintick(x + _vb)

    else if t == "Percentage"
    
        if c >= h and b > a
            while c >= h
        
                x := h
                h := math.round_to_mintick(h * (1 + _v / 100))
                l := math.round_to_mintick(x * (1 - _vb / 100))

        if d <= l and b < a
            while d <= l
        
                x := l
                l := math.round_to_mintick(l * (1 - _v / 100))
                h := math.round_to_mintick(x * (1 + _vb / 100))

    [x, h, l]

[lx, lh, ll] = Assembling(dev_source, dev_type, dev_value, dev_back)

// PLOT
// Lines
plot_up   = plot(lh, color=color.new(color.green, 50), style=plot.style_line, linewidth=1)
plot_main = plot(lx, color=color.new(color.silver, 50), style=plot.style_line, linewidth=1)
plot_down = plot(ll, color=color.new(color.red, 50), style=plot.style_line, linewidth=1)

// Areas
fill(plot_up, plot_main, lh, lx, color.new(color.teal, 80), color.new(color.teal, 80))
fill(plot_main, plot_down, lx, ll, color.new(color.maroon, 80), color.new(color.maroon, 80))

// TRADING
// Alert variables
int Action = -1
int PosType = -1
int OrderType = -1
float Price = -1.0

// Direction variables
bool ifBuy = direct == "All" or direct == "Buy" ? true : false
bool ifSell = direct == "All" or direct == "Sell" ? true : false

// Market entries
if (strategy.closedtrades + strategy.opentrades == 0 or mode == "Market") and DTperiod
    if ((swapping and lx < nz(lx[1], lx)) or (not swapping and lx > nz(lx[1], lx))) and ifBuy
        Action := 1
        PosType := 1
        OrderType := 1
        Price := math.round_to_mintick(close)
        strategy.entry('Long', strategy.long)
    if ((swapping and lx > nz(lx[1], lx)) or (not swapping and lx < nz(lx[1], lx))) and ifSell
        Action := 2
        PosType := 2
        OrderType := 1
        Price := math.round_to_mintick(close)
        strategy.entry('Short', strategy.short)

// Closing positions by market
if DTperiod and mode == "Market"
    if direct == "Buy" and strategy.position_size > 0
        if swapping and lx > nz(lx[1], lx)
            Action := 2
            PosType := 3
            OrderType := 1
            Price := math.round_to_mintick(close)
            strategy.close('Long', comment='Close')
        if not swapping and lx < nz(lx[1], lx)
            Action := 2
            PosType := 3
            OrderType := 1
            Price := math.round_to_mintick(close)
            strategy.close('Long', comment='Close')
    if direct == "Sell" and strategy.position_size < 0
        if swapping and lx < nz(lx[1], lx)
            Action := 1
            PosType := 3
            OrderType := 1
            Price := math.round_to_mintick(close)
            strategy.close('Short', comment='Close')
        if not swapping and lx > nz(lx[1], lx)
            Action := 1
            PosType := 3
            OrderType := 1
            Price := math.round_to_mintick(close)
            strategy.close('Short', comment='Close')

// Limit entries and exits
if swapping and DTperiod and mode == "Limit"
    if strategy.position_size < 0
        Action := 1
        PosType := 1
        OrderType := 2
        Price := ll
        if ifBuy
            strategy.entry('Long', strategy.long, limit=ll)
        else
            PosType := 3
            strategy.exit('Exit', limit=ll)
    if strategy.position_size > 0
        Action := 2
        PosType := 2
        OrderType := 2
        Price := lh
        if ifSell
            strategy.entry('Short', strategy.short, limit=lh)
        else
            PosType := 3
            strategy.exit('Exit', limit=lh)
    if strategy.closedtrades + strategy.opentrades > 0 and strategy.position_size == 0
        if ifBuy
            Action := 1
            PosType := 1
            OrderType := 2
            Price := ll
            strategy.entry('Long', strategy.long, limit=ll)
        if ifSell
            Action := 2
            PosType := 2
            OrderType := 2
            Price := lh
            strategy.entry('Short', strategy.short, limit=lh)
if not swapping and DTperiod and mode == "Limit"
    if strategy.position_size < 0
        Action := 1
        PosType := 1
        OrderType := 2
        Price := lh
        if ifBuy
            strategy.entry('Long', strategy.long, stop=lh)
        else
            PosType := 3
            strategy.exit('Exit', stop=lh)
    if strategy.position_size > 0
        Action := 2
        PosType := 2
        OrderType := 2
        Price := ll
        if ifSell
            strategy.entry('Short', strategy.short, stop=ll)
        else
            PosType := 3
            strategy.exit('Exit', stop=ll)
    if strategy.closedtrades + strategy.opentrades > 0 and strategy.position_size == 0
        if ifBuy
            Action := 1
            PosType := 1
            OrderType := 2
            Price := lh
            strategy.entry('Long', strategy.long, stop=lh)
        if ifSell
            Action := 2
            PosType := 2
            OrderType := 2
            Price := ll
            strategy.entry('Short', strategy.short, stop=ll)

// Everything is closed and canceled
if not DTperiod
    strategy.cancel_all()
    strategy.close_all(comment='Close')

// Alerts
// Convert to string variables
string Action_Txt = Action == 1 ? "Buy" : Action == 2 ? "Sell" : na
string PosType_Txt = PosType == 1 ? "Long" : PosType == 2 ? "Short" : PosType == 3 ? "Flat" : na
string OrderType_Txt = OrderType == 1 ? "Market" : OrderType == 2 ? "Limit" : na
string Price_Txt = Price > 0 ? str.tostring(Price) : na

// Output
if not (Action == nz(Action[1], Action) and Price == nz(Price[1], Price) and OrderType == nz(OrderType[1], OrderType)) and DTperiod
    alert('{"pair": "' + syminfo.ticker + '", "direction": "' + Action_Txt + '", "entertype": "' + OrderType_Txt + '", "position": "' + PosType_Txt + '", "price": "' + Price_Txt + '"}')

// *********************
// Good job, Soldier! ;>
// *********************
```

> Detail

https://www.fmz.com/strategy/431209

> Last Modified

2023-11-06 09:20:34
