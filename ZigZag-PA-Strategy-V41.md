
> Name

ZigZag-PA-Strategy-V41

> Author

ChaoZhang

> Strategy Description

EXPERIMENTAL:
WARNING: this strategy repaints after reloading and results are heavily curve fitted, use at your own discretion.
UPDATE: (AleksanderThor) add option for a 2nd target, to use you need to activate pyramiding with a setting of 1 manually (not possible to change programatically) .

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/f6c9860b59b6177205.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Use Heikken Ashi Candles|
|v_input_2|true|Use Alt Timeframe|
|v_input_3|60|Alt Timeframe|
|v_input_4|true|Show Patterns|
|v_input_5|true|Display Fibonacci 0.000:|
|v_input_6|true|Display Fibonacci 0.236:|
|v_input_7|true|Display Fibonacci 0.382:|
|v_input_8|true|Display Fibonacci 0.500:|
|v_input_9|true|Display Fibonacci 0.618:|
|v_input_10|true|Display Fibonacci 0.764:|
|v_input_11|true|Display Fibonacci 1.000:|
|v_input_12|10000|Target 1 - Trade size:|
|v_input_13|0.236|Target 1 - Fib. Rate to use for Entry Window:|
|v_input_14|0.618|Target 1 - Fib. Rate to use for TP:|
|v_input_15|-0.236|Target 1 - Fib. Rate to use for SL:|
|v_input_16|false|Target 2 - Active?|
|v_input_17|10000|Target 2 - Trade size:|
|v_input_18|0.236|Target 2 - Fib. Rate to use for Entry Window:|
|v_input_19|1.618|Target 2 - Fib. Rate to use for TP:|
|v_input_20|-0.236|Target 2 - Fib. Rate to use for SL:|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-24 00:00
end: 2022-05-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// https://cn.tradingview.com/script/NEDEDcsP-STRATEGY-RS-ZigZag-PA-Strategy-V4-1/
//@version=4
strategy(title='[STRATEGY][RS]ZigZag PA Strategy V4.1', shorttitle='S', overlay=true, pyramiding=0, initial_capital=100000, currency=currency.USD)
useHA = input(false, title='Use Heikken Ashi Candles')
useAltTF = input(true, title='Use Alt Timeframe')
tf = input('60', title='Alt Timeframe')
showPatterns = input(true, title='Show Patterns')
showFib0000 = input(title='Display Fibonacci 0.000:', type=bool, defval=true)
showFib0236 = input(title='Display Fibonacci 0.236:', type=bool, defval=true)
showFib0382 = input(title='Display Fibonacci 0.382:', type=bool, defval=true)
showFib0500 = input(title='Display Fibonacci 0.500:', type=bool, defval=true)
showFib0618 = input(title='Display Fibonacci 0.618:', type=bool, defval=true)
showFib0764 = input(title='Display Fibonacci 0.764:', type=bool, defval=true)
showFib1000 = input(title='Display Fibonacci 1.000:', type=bool, defval=true)
zigzag() =>
    _isUp = close >= open
    _isDown = close <= open
    _direction =na
    _direction := _isUp[1] and _isDown ? -1 : _isDown[1] and _isUp ? 1 : nz(_direction[1])
    _zigzag = _isUp[1] and _isDown and _direction[1] != -1 ? highest(2) : _isDown[1] and _isUp and _direction[1] != 1 ? lowest(2) : na

_ticker = useHA ? heikenashi(tickerid) : syminfo.tickerid
sz = useAltTF ? (ta.change(time(tf)) != 0 ? request.security(_ticker, tf, zigzag()) : na) : zigzag()

plot(sz, title='zigzag', color=black, linewidth=2)

//  ||---   Pattern Recognition:

x = valuewhen(sz, sz, 4) 
a = valuewhen(sz, sz, 3) 
b = valuewhen(sz, sz, 2) 
c = valuewhen(sz, sz, 1) 
d = valuewhen(sz, sz, 0)

xab = (abs(b-a)/abs(x-a))
xad = (abs(a-d)/abs(x-a))
abc = (abs(b-c)/abs(a-b))
bcd = (abs(c-d)/abs(b-c))

//  ||-->   Functions:
isBat(_mode)=>
    _xab = xab >= 0.382 and xab <= 0.5
    _abc = abc >= 0.382 and abc <= 0.886
    _bcd = bcd >= 1.618 and bcd <= 2.618
    _xad = xad <= 0.618 and xad <= 1.000    // 0.886
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

isAntiBat(_mode)=>
    _xab = xab >= 0.500 and xab <= 0.886    // 0.618
    _abc = abc >= 1.000 and abc <= 2.618    // 1.13 --> 2.618
    _bcd = bcd >= 1.618 and bcd <= 2.618    // 2.0  --> 2.618
    _xad = xad >= 0.886 and xad <= 1.000    // 1.13
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

isAltBat(_mode)=>
    _xab = xab <= 0.382
    _abc = abc >= 0.382 and abc <= 0.886
    _bcd = bcd >= 2.0 and bcd <= 3.618
    _xad = xad <= 1.13
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

isButterfly(_mode)=>
    _xab = xab <= 0.786
    _abc = abc >= 0.382 and abc <= 0.886
    _bcd = bcd >= 1.618 and bcd <= 2.618
    _xad = xad >= 1.27 and xad <= 1.618
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

isAntiButterfly(_mode)=>
    _xab = xab >= 0.236 and xab <= 0.886    // 0.382 - 0.618
    _abc = abc >= 1.130 and abc <= 2.618    // 1.130 - 2.618
    _bcd = bcd >= 1.000 and bcd <= 1.382    // 1.27
    _xad = xad >= 0.500 and xad <= 0.886    // 0.618 - 0.786
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

isABCD(_mode)=>
    _abc = abc >= 0.382 and abc <= 0.886
    _bcd = bcd >= 1.13 and bcd <= 2.618
    _abc and _bcd and (_mode == 1 ? d < c : d > c)

isGartley(_mode)=>
    _xab = xab >= 0.5 and xab <= 0.618 // 0.618
    _abc = abc >= 0.382 and abc <= 0.886
    _bcd = bcd >= 1.13 and bcd <= 2.618
    _xad = xad >= 0.75 and xad <= 0.875 // 0.786
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

isAntiGartley(_mode)=>
    _xab = xab >= 0.500 and xab <= 0.886    // 0.618 -> 0.786
    _abc = abc >= 1.000 and abc <= 2.618    // 1.130 -> 2.618
    _bcd = bcd >= 1.500 and bcd <= 5.000    // 1.618
    _xad = xad >= 1.000 and xad <= 5.000    // 1.272
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

isCrab(_mode)=>
    _xab = xab >= 0.500 and xab <= 0.875    // 0.886
    _abc = abc >= 0.382 and abc <= 0.886    
    _bcd = bcd >= 2.000 and bcd <= 5.000    // 3.618
    _xad = xad >= 1.382 and xad <= 5.000    // 1.618
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

isAntiCrab(_mode)=>
    _xab = xab >= 0.250 and xab <= 0.500    // 0.276 -> 0.446
    _abc = abc >= 1.130 and abc <= 2.618    // 1.130 -> 2.618
    _bcd = bcd >= 1.618 and bcd <= 2.618    // 1.618 -> 2.618
    _xad = xad >= 0.500 and xad <= 0.750    // 0.618
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

isShark(_mode)=>
    _xab = xab >= 0.500 and xab <= 0.875    // 0.5 --> 0.886
    _abc = abc >= 1.130 and abc <= 1.618    //
    _bcd = bcd >= 1.270 and bcd <= 2.240    //
    _xad = xad >= 0.886 and xad <= 1.130    // 0.886 --> 1.13
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

isAntiShark(_mode)=>
    _xab = xab >= 0.382 and xab <= 0.875    // 0.446 --> 0.618
    _abc = abc >= 0.500 and abc <= 1.000    // 0.618 --> 0.886
    _bcd = bcd >= 1.250 and bcd <= 2.618    // 1.618 --> 2.618
    _xad = xad >= 0.500 and xad <= 1.250    // 1.130 --> 1.130
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

is5o(_mode)=>
    _xab = xab >= 1.13 and xab <= 1.618
    _abc = abc >= 1.618 and abc <= 2.24
    _bcd = bcd >= 0.5 and bcd <= 0.625 // 0.5
    _xad = xad >= 0.0 and xad <= 0.236 // negative?
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

isWolf(_mode)=>
    _xab = xab >= 1.27 and xab <= 1.618
    _abc = abc >= 0 and abc <= 5
    _bcd = bcd >= 1.27 and bcd <= 1.618
    _xad = xad >= 0.0 and xad <= 5
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

isHnS(_mode)=>
    _xab = xab >= 2.0 and xab <= 10
    _abc = abc >= 0.90 and abc <= 1.1
    _bcd = bcd >= 0.236 and bcd <= 0.88
    _xad = xad >= 0.90 and xad <= 1.1
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

isConTria(_mode)=>
    _xab = xab >= 0.382 and xab <= 0.618
    _abc = abc >= 0.382 and abc <= 0.618
    _bcd = bcd >= 0.382 and bcd <= 0.618
    _xad = xad >= 0.236 and xad <= 0.764
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

isExpTria(_mode)=>
    _xab = xab >= 1.236 and xab <= 1.618
    _abc = abc >= 1.000 and abc <= 1.618
    _bcd = bcd >= 1.236 and bcd <= 2.000
    _xad = xad >= 2.000 and xad <= 2.236
    _xab and _abc and _bcd and _xad and (_mode == 1 ? d < c : d > c)

plotshape(not showPatterns ? na : isABCD(-1) and not isABCD(-1)[1], text="\nAB=CD", title='Bear ABCD', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0, offset=-2)
plotshape(not showPatterns ? na : isBat(-1) and not isBat(-1)[1], text="Bat", title='Bear Bat', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0, offset=-2)
plotshape(not showPatterns ? na : isAntiBat(-1) and not isAntiBat(-1)[1], text="Anti Bat", title='Bear Anti Bat', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0, offset=-2)
plotshape(not showPatterns ? na : isAltBat(-1) and not isAltBat(-1)[1], text="Alt Bat", title='Bear Alt Bat', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0)
plotshape(not showPatterns ? na : isButterfly(-1) and not isButterfly(-1)[1], text="Butterfly", title='Bear Butterfly', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0)
plotshape(not showPatterns ? na : isAntiButterfly(-1) and not isAntiButterfly(-1)[1], text="Anti Butterfly", title='Bear Anti Butterfly', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0)
plotshape(not showPatterns ? na : isGartley(-1) and not isGartley(-1)[1], text="Gartley", title='Bear Gartley', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0)
plotshape(not showPatterns ? na : isAntiGartley(-1) and not isAntiGartley(-1)[1], text="Anti Gartley", title='Bear Anti Gartley', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0)
plotshape(not showPatterns ? na : isCrab(-1) and not isCrab(-1)[1], text="Crab", title='Bear Crab', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0)
plotshape(not showPatterns ? na : isAntiCrab(-1) and not isAntiCrab(-1)[1], text="Anti Crab", title='Bear Anti Crab', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0)
plotshape(not showPatterns ? na : isShark(-1) and not isShark(-1)[1], text="Shark", title='Bear Shark', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0)
plotshape(not showPatterns ? na : isAntiShark(-1) and not isAntiShark(-1)[1], text="Anti Shark", title='Bear Anti Shark', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0)
plotshape(not showPatterns ? na : is5o(-1) and not is5o(-1)[1], text="5-O", title='Bear 5-O', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0)
plotshape(not showPatterns ? na : isWolf(-1) and not isWolf(-1)[1], text="Wolf Wave", title='Bear Wolf Wave', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0)
plotshape(not showPatterns ? na : isHnS(-1) and not isHnS(-1)[1], text="Head and Shoulders", title='Bear Head and Shoulders', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0)
plotshape(not showPatterns ? na : isConTria(-1) and not isConTria(-1)[1], text="Contracting Triangle", title='Bear Contracting triangle', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0)
plotshape(not showPatterns ? na : isExpTria(-1) and not isExpTria(-1)[1], text="Expanding Triangle", title='Bear Expanding Triangle', style=shape.labeldown, color=maroon, textcolor=white, location=location.top, transp=0)

plotshape(not showPatterns ? na : isABCD(1) and not isABCD(1)[1], text="AB=CD\n", title='Bull ABCD', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : isBat(1) and not isBat(1)[1], text="Bat", title='Bull Bat', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : isAntiBat(1) and not isAntiBat(1)[1], text="Anti Bat", title='Bull Anti Bat', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : isAltBat(1) and not isAltBat(1)[1], text="Alt Bat", title='Bull Alt Bat', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : isButterfly(1) and not isButterfly(1)[1], text="Butterfly", title='Bull Butterfly', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : isAntiButterfly(1) and not isAntiButterfly(1)[1], text="Anti Butterfly", title='Bull Anti Butterfly', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : isGartley(1) and not isGartley(1)[1], text="Gartley", title='Bull Gartley', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : isAntiGartley(1) and not isAntiGartley(1)[1], text="Anti Gartley", title='Bull Anti Gartley', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : isCrab(1) and not isCrab(1)[1], text="Crab", title='Bull Crab', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : isAntiCrab(1) and not isAntiCrab(1)[1], text="Anti Crab", title='Bull Anti Crab', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : isShark(1) and not isShark(1)[1], text="Shark", title='Bull Shark', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : isAntiShark(1) and not isAntiShark(1)[1], text="Anti Shark", title='Bull Anti Shark', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : is5o(1) and not is5o(1)[1], text="5-O", title='Bull 5-O', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : isWolf(1) and not isWolf(1)[1], text="Wolf Wave", title='Bull Wolf Wave', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : isHnS(1) and not isHnS(1)[1], text="Head and Shoulders", title='Bull Head and Shoulders', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : isConTria(1) and not isConTria(1)[1], text="Contracting Triangle", title='Bull Contracting Triangle', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)
plotshape(not showPatterns ? na : isExpTria(1) and not isExpTria(1)[1], text="Expanding Triangle", title='Bull Expanding Triangle', style=shape.labelup, color=green, textcolor=white, location=location.bottom, transp=0)

//-------------------------------------------------------------------------------------------------------------------------------------------------------------
fib_range = abs(d-c)
fib_0000 = not showFib0000 ? na : d > c ? d-(fib_range*0.000):d+(fib_range*0.000)
fib_0236 = not showFib0236 ? na : d > c ? d-(fib_range*0.236):d+(fib_range*0.236)
fib_0382 = not showFib0382 ? na : d > c ? d-(fib_range*0.382):d+(fib_range*0.382)
fib_0500 = not showFib0500 ? na : d > c ? d-(fib_range*0.500):d+(fib_range*0.500)
fib_0618 = not showFib0618 ? na : d > c ? d-(fib_range*0.618):d+(fib_range*0.618)
fib_0764 = not showFib0764 ? na : d > c ? d-(fib_range*0.764):d+(fib_range*0.764)
fib_1000 = not showFib1000 ? na : d > c ? d-(fib_range*1.000):d+(fib_range*1.000)
plot(title='Fib 0.000', series=fib_0000, color=fib_0000 != fib_0000[1] ? na : black)
plot(title='Fib 0.236', series=fib_0236, color=fib_0236 != fib_0236[1] ? na : red)
plot(title='Fib 0.382', series=fib_0382, color=fib_0382 != fib_0382[1] ? na : olive)
plot(title='Fib 0.500', series=fib_0500, color=fib_0500 != fib_0500[1] ? na : lime)
plot(title='Fib 0.618', series=fib_0618, color=fib_0618 != fib_0618[1] ? na : teal)
plot(title='Fib 0.764', series=fib_0764, color=fib_0764 != fib_0764[1] ? na : blue)
plot(title='Fib 1.000', series=fib_1000, color=fib_1000 != fib_1000[1] ? na : black)

bgcolor(not useAltTF ? na : change(time(tf))!=0?black:na)
f_last_fib(_rate)=>d > c ? d-(fib_range*_rate):d+(fib_range*_rate)

target01_trade_size = input(title='Target 1 - Trade size:', type=float, defval=10000.00)
target01_ew_rate = input(title='Target 1 - Fib. Rate to use for Entry Window:', type=float, defval=0.236)
target01_tp_rate = input(title='Target 1 - Fib. Rate to use for TP:', type=float, defval=0.618)
target01_sl_rate = input(title='Target 1 - Fib. Rate to use for SL:', type=float, defval=-0.236)
target02_active = input(title='Target 2 - Active?', type=bool, defval=false)
target02_trade_size = input(title='Target 2 - Trade size:', type=float, defval=10000.00)
target02_ew_rate = input(title='Target 2 - Fib. Rate to use for Entry Window:', type=float, defval=0.236)
target02_tp_rate = input(title='Target 2 - Fib. Rate to use for TP:', type=float, defval=1.618)
target02_sl_rate = input(title='Target 2 - Fib. Rate to use for SL:', type=float, defval=-0.236)

buy_patterns_00 = isABCD(1) or isBat(1) or isAltBat(1) or isButterfly(1) or isGartley(1) or isCrab(1) or isShark(1) or is5o(1) or isWolf(1) or isHnS(1) or isConTria(1) or isExpTria(1)
buy_patterns_01 = isAntiBat(1) or isAntiButterfly(1) or isAntiGartley(1) or isAntiCrab(1) or isAntiShark(1)
sel_patterns_00 = isABCD(-1) or isBat(-1) or isAltBat(-1) or isButterfly(-1) or isGartley(-1) or isCrab(-1) or isShark(-1) or is5o(-1) or isWolf(-1) or isHnS(-1) or isConTria(-1) or isExpTria(-1)
sel_patterns_01 = isAntiBat(-1) or isAntiButterfly(-1) or isAntiGartley(-1) or isAntiCrab(-1) or isAntiShark(-1)

target01_buy_entry = (buy_patterns_00 or buy_patterns_01) and close <= f_last_fib(target01_ew_rate)
target01_buy_close = high >= f_last_fib(target01_tp_rate) or low <= f_last_fib(target01_sl_rate)
target01_sel_entry = (sel_patterns_00 or sel_patterns_01) and close >= f_last_fib(target01_ew_rate)
target01_sel_close = low <= f_last_fib(target01_tp_rate) or high >= f_last_fib(target01_sl_rate)

strategy.entry('target01_buy', long=strategy.long, qty=target01_trade_size, comment='buy 01', when=target01_buy_entry)
strategy.close('target01_buy', when=target01_buy_close)
strategy.entry('target01_sell', long=strategy.short, qty=target01_trade_size, comment='sell 01', when=target01_sel_entry)
strategy.close('target01_sell', when=target01_sel_close)

target02_buy_entry = target02_active and (buy_patterns_00 or buy_patterns_01) and close <= f_last_fib(target02_ew_rate)
target02_buy_close = target02_active and high >= f_last_fib(target02_tp_rate) or low <= f_last_fib(target02_sl_rate)
target02_sel_entry = target02_active and (sel_patterns_00 or sel_patterns_01) and close >= f_last_fib(target02_ew_rate)
target02_sel_close = target02_active and low <= f_last_fib(target02_tp_rate) or high >= f_last_fib(target02_sl_rate)

strategy.entry('target02_buy', long=strategy.long, qty=target02_trade_size, comment='buy 02', when=target02_buy_entry)
strategy.close('target02_buy', when=target02_buy_close)
strategy.entry('target02_sell', long=strategy.short, qty=target02_trade_size, comment='sell 02', when=target02_sel_entry)
strategy.close('target02_sell', when=target02_sel_close)

```

> Detail

https://www.fmz.com/strategy/365711

> Last Modified

2022-05-25 18:08:49
