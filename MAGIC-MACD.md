
> Name

MAGIC-MACD

> Author

ChaoZhang

> Strategy Description

Thanks & Credits
To Tradingview Team for allowing me to use their default MACD version and coding it in to a MAGIC MACD by adding a few lines of code that
makes it more enhanced.


About:
MAGIC MACD ( MACD Indicator with Trend Filter and EMA Crossover confirmation and Momentum). This MACD uses Default Trading view MACD
from Technical indicators library and adding a second MACD along with 3 EMA's to detect Trend and confirm MACD Signal.
Eliminates usage of 3different indicators (Default MACD , MACD-2,EMA5, EMA20, EMA50)

Basic IDEA.
Idea is to filter Histogram when price is above or below 50EMA. Similar to QQE -mod oscillator but Has a EMA Filter
1.Take DEFAULT MACD crossover signals with lower period
2.check with a Higher MACD Histogram.
3.Enter upon EMA crossover signal and Histogram confirmation.
Histogram changes to GRAY when price is below EMA 50 or above EMA 50 (Follows Trend)
4.Exit on next Default MACD crossover signal.

Overview :
Moving Average Convergence Divergence Indicator Popularly Known as MACD is widely used. MACD Usually generates a lots of False signals
and noise in Lower Time Frames, making it difficult to enter a trade in sideways market. Divergence is a major issue along with sideways
movement and tangling of MACD and Signal Lines. There is no way to confirm a Default MACD signal, except to switch time frames and
verify.
Magic MACD Can be used to in combination with other signals.
This MACD uses two MACD Signals to verify the signal given by Default MACD . The Histogram Plot shown is of a higher period
MACD (close,5,50,30) values. When a signal is generated on a lower MACD it is verified by the histogram with higher time period.

Technicals Used:
1. Lower MACD-1 values 12,26 and signal-9 (crossover Signals)
2. Higher MACD-2 values 5,50 and signal-30 (Histogram)
3. EMA 50 (Histogram Filter to allow only if price above or below Ema 50)
4. EMA 5 and EMA 20 for crossover confirmation of trend

What's is in this Indicator?
1.Histogram-(higher period 5,50 and 30signal)
2. MACD crossover Signals-(lower period Default MACD setting)
3.Signal Lines-( EMA 5 & 20)

Implemented & Removed in this Indicator
1. Default MACD and Signal Lines are removed completely
2. MACD crossover are taken on lower periods and plotted as signals(Blue Triangle or Red Triangle)
3. Histogram is plotted from a higher Period providing a clear picture with Higher Time period
4. EMA 5 and EMA 20 are used for MACD signal confirmation

How to use?
Up Signal
1. MACD Default (12,26,30) up signals are shown in Blue
2. Wait till the Histogram changes Blue
3. Look for EMA signals crossover near by

Down Signal
1. MACD Default (12,26,30) up signals are shown in Red
2. Wait till the Histogram changes Red
3. Look for EMA signals crossover near by

Do's
Consider only opposite color as signals
1. Red Triangle on Blue Histogram(likely to move down direction)
2. Blue Triangle on Red Histogram (Likely to move up direction)

Don'ts
1.Ignore Blue Signal on Blue Histogram (pull back signals can be used to enter trade if you miss first crossover)
2.Ignore Red Signal on Red Histogram(pull back signals can be used to enter trade if you miss first crossover)
3.Ignore Up and Down signals till Gray or Blacked out area is finished in Histogram
Tips:
1. EMA plot also shows pull back areas along with signals
2.side by side opposite signals shows sides ways movement
3. EMA 5,20 is plotted on MACD Histogram for Additional Benefit


Warning...!
This is purely for Educational purpose only. Not to be used as a stand alone indicator. Usage is at your own Risk. Please get familiar with its working before implementing. Its not a Financial Advice or Suggestion . Any losses or gains is at your own risk.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/4802b7293091d73f1e.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|Enable Signal EMA=ON/MACD=OFF|
|v_input_1|5|Fast Length|
|v_input_2|50|Slow Length|
|v_input_3_ohlc4|0|Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_int_1|30|Signal Smoothing|
|v_input_string_1|0|Oscillator MA Type: EMA|SMA|
|v_input_string_2|0|Signal Line MA Type: EMA|SMA|
|v_input_int_2|50|Histogram Filter EMA Length|
|v_input_int_3|5|EMA1 Length|
|v_input_10|#00bc77|EMA-1|
|v_input_int_4|20|EMA2 Length|
|v_input_11|#00bc77|EMA-2|
|v_input_4|#2962FF|(?Color Settings)MACD Line  |
|v_input_5|#FF6D00|Signal Line  |
|v_input_6|#26A69A|(?Histogram)Above   Grow|
|v_input_7|#B2DFDB|Fall|
|v_input_8|#FFCDD2|Below Grow|
|v_input_9|#ff0062|Fall|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-07 00:00:00
end: 2022-05-06 23:59:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
indicator(title="MAGIC MACD", shorttitle="MAGIC MACD", timeframe="", timeframe_gaps=true)
//By HARI KRISHNA 
//How to use?
//1.Signal RED Arrow on green Histogram for down
//2.Signal GREEN Arrow on Red Histogram for Up
//
//3.Confirmation by Crossover
//4.Place when Histogram is not Gray
//
//5.RED on RED Histogram IGNORE
//6.GREEN on GREEN Histogram IGNORE
//Buy SELL SIGNALS on EMA CROSSOVER

// Getting inputs
enableema=input.bool(true,title='Enable Signal EMA=ON/MACD=OFF', inline="MACD")
fast_length = input(title="Fast Length", defval=5)
slow_length = input(title="Slow Length", defval=50)
src = input(title="Source", defval=ohlc4)
signal_length = input.int(title="Signal Smoothing",  minval = 1, maxval = 50, defval = 30)
sma_source = input.string(title="Oscillator MA Type",  defval="EMA", options=["SMA", "EMA"])
sma_signal = input.string(title="Signal Line MA Type", defval="EMA", options=["SMA", "EMA"])
// Plot colors
col_macd = input(#2962FF, "MACD Line  ", group="Color Settings", inline="MACD")
col_signal = input(#FF6D00, "Signal Line  ", group="Color Settings", inline="Signal")
col_grow_above = input(#26A69A, "Above   Grow", group="Histogram", inline="Above")
col_fall_above = input(#B2DFDB, "Fall", group="Histogram", inline="Above")
col_grow_below = input(#FFCDD2, "Below Grow", group="Histogram", inline="Below")
col_fall_below = input(#ff0062, "Fall", group="Histogram", inline="Below")
// Calculating
fast_ma = sma_source == "SMA" ? ta.sma(src, fast_length) :ta.ema(src, fast_length)
slow_ma = sma_source == "SMA" ? ta.sma(src, slow_length) :ta.ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? ta.sma(macd, signal_length) :ta.ema(macd, signal_length)
hist = macd - signal
ema50=ta.ema(close,input.int(title="Histogram Filter EMA Length", defval=50,maxval=200,minval=1))

colourhist=hist>=0 and open>ema50? (hist[1] < hist ? col_grow_above : col_fall_above) :hist<=0 and open<ema50? (hist[1] < hist ? col_grow_below : col_fall_below) :#666666
plot(hist, title="Histogram", style=plot.style_columns, color=colourhist)
plot(enableema==false?macd:na, title="MACD", color=col_macd)
plot(enableema==false?signal:na, title="Signal", color=col_signal)
[macd2,signal2,hist2]=ta.macd(close,12,26,9)

ma1=ta.ema(close,input.int(title="EMA1 Length", defval=5,maxval=50,minval=1))-ta.ema(close,100)
plot(enableema==true?ma1:na, title="EMA1 -Color", color=input(#00bc77,title='EMA-1'),linewidth=2) //ema 5
ma2=ta.ema(close,input.int(title="EMA2 Length", defval=20,maxval=50,minval=1))-ta.ema(close,100)
plot(enableema==true?ma2:na, title="EMA2 -Color", color=input(#00bc77,title='EMA-2'),linewidth=2)//ema20

plotshape(ta.crossover(macd2,signal2)? 0 : na, title="Buy Signal", location=location.absolute, style=shape.triangleup, size=size.small, color=color.new(#00bc77,0))
plotshape(ta.crossunder(macd2,signal2)? 0: na, title="Sell Signal", location=location.absolute, style=shape.triangledown, size=size.small, color=color.new(#ff0d5c,0))

if ta.crossover(macd2,signal2)
    strategy.entry("Enter Long", strategy.long)
else if ta.crossunder(macd2,signal2)
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/361839

> Last Modified

2022-05-08 17:16:51
