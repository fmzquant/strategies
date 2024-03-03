
> Name

Pivot-Order-Blocks

> Author

ChaoZhang

> Strategy Description

// How it Works \\
Order Blocks based on pivot reversal candle
When a pivot High or Pivot Low is found and confirmed, a box will be plotted on the open and close values of that pivot candle

// Settings \\
In the settings you have the ability to change the distances required to confirm an pivot High or Low
These are the lengths where the script checks to see if it is at its local high or low.

You also have the ability to change the amount of candles the box stretches over as well as the colors of the bullish and bearish boxes

// Use Case \\
Pivot points often provide Support and Resistance points on their own,
one way of marking up order blocks is by taking the pivot candle and marking that up as a resistance area where you could be looking for price to reverse


// Suggestions \\
Happy for anyone to make any suggestions on changes which could improve the script,

// Terms \\
Feel free to use the script, If you do use the script could you please just tag me as I am interested to see how people are using it. Good Luck!

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/133eb5003e76e3f0820.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|(?=== Pivots ===)Pivot High|
|v_input_int_2|10|/|
|v_input_int_3|10|Pivot Low|
|v_input_int_4|10|/|
|v_input_int_5|30|(?=== Plots ===)Box Size|
|v_input_1|#00E600|Bullish Box Color|
|v_input_2|#FF0000|Bearish Box Color|


> Source (PineScript)

``` pinescript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © MensaTrader

//@version=5
indicator("Pivot Order Blocks", shorttitle="Pivot - OB", overlay=true, max_bars_back=500, max_boxes_count=250)

//Titles
inputGroupTitle     = "=== Pivots ==="
plotGroupTitle      = "=== Plots ==="


//Inputs
leftLenH            = input.int(title="Pivot High", defval=10, minval=1, inline="Pivot High", group=inputGroupTitle)
rightLenH           = input.int(title="/", defval=10, minval=1, inline="Pivot High", group=inputGroupTitle)

leftLenL            = input.int(title="Pivot Low", defval=10, minval=1, inline="Pivot Low", group=inputGroupTitle)
rightLenL           = input.int(title="/", defval=10, minval=1, inline="Pivot Low", group=inputGroupTitle)

boxLength           = input.int(30, title="Box Size", tooltip="Amount of candles long", group=plotGroupTitle)
bullBoxColor        = input('#00E600', title="Bullish Box Color", group=plotGroupTitle, inline="1")
bearBoxColor        = input('#FF0000', title="Bearish Box Color", group=plotGroupTitle, inline="1")

ph                  = ta.pivothigh(leftLenH, rightLenH)
pl                  = ta.pivotlow(leftLenL, rightLenL)

//Variables
var leftBull        = bar_index
var rightBull       = bar_index
var topBull         = close
var bottomBull      = close

var leftBear        = bar_index
var rightBear       = bar_index
var topBear         = close
var bottomBear      = close


//Bear Box Calc
if ph
    leftBear        := bar_index-leftLenH
    rightBear       := bar_index-(leftLenH-boxLength)
    topBear         := close>open ? close[leftLenH] : open[leftLenH]
    bottomBear      := close>open ? open[leftLenH] : close[leftLenH]

//Bull Box Calc
if pl
    leftBull        := bar_index-leftLenL
    rightBull       := bar_index-(leftLenL-boxLength)
    topBull         := close>open ? close[leftLenL] : open[leftLenL]
    bottomBull      := close>open ? open[leftLenL] : close[leftLenL]
     
    
//if pl
//    bull            = box.new(left=leftBull, right=rightBull, top=topBull, bottom=bottomBull, bgcolor=color.new(bullBoxColor,80), border_color=bullBoxColor)

//if ph
//    bear            = box.new(left=leftBear, right=rightBear, top=topBear, bottom=bottomBear, bgcolor=color.new(bearBoxColor,80), border_color=bearBoxColor)



if pl
    strategy.entry("Enter Long", strategy.long)
else if ph
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/362542

> Last Modified

2022-05-11 23:35:28
