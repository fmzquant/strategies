
> Name

CK动量反转止损策略CK-Momentum-Reversal-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8d20fef38647fd3545.png)

[trans]

### 概述

该策略运用CK通道判定价格趋势,并设定动态止损线,在发生价格反转时进行反向操作,属于短线交易策略。

### 策略原理   

策略运用CK通道判断价格趋势和支撑阻力。计算上通道线和下通道线,当价格突破通道线时产生交易信号。此外,策略还会跟踪通道线的移动情况,在通道线反转时采取反向头寸,属于反转交易策略。     

具体来说,策略基于最高价、最低价计算出上下通道线。如果上通道线开始下降,下通道线开始上升,则判定为价格反转,做空头寸。反之,如果下通道线开始下降,上通道线开始上升,则判定为价格反转,做多头寸。

### 策略优势  

1. 运用双通道判断价格反转点,精准做反向操作
2. 采用动态止损方式来控制风险,可以及时止损
3. 策略逻辑简单清晰,容易理解实现

### 策略风险  

1. 市场价格剧烈波动时,止损线可能被突破,导致亏损加大
2. 交易次数可能较多,交易成本增加  
3. 需要选择合适的参数来控制止损线,避免过于宽松或过于紧绷

### 策略优化  

1. 优化止损线参数,使其更加合理且有效
2. 结合趋势指标判断反转信号的可靠性,避免在趋势中反向操作
3. 增加自动交易和自动止损模块,降低交易成本

### 总结  

该策略整体思路清晰易懂,运用双通道判断价格反转,采取反向操作;并设定动态止损来控制风险,属于典型的短线交易策略。策略效果还可进一步优化,主要是调整止损参数,并辅助其他技术指标判断操作时机。

||

### Overview  

This strategy uses the CK channel to determine price trends and sets dynamic stop loss lines to make reverse operations when price reversal occurs. It belongs to short-term trading strategies.  

### Strategy Principle   

The strategy uses the CK channel to determine price trends and support/resistance. It calculates the upper and lower channel lines. When the price breaks through the channel lines, trading signals are generated. In addition, the strategy also tracks the movement of the channel lines and takes reverse positions when the channel lines reverse, which belongs to reversal trading strategies.

Specifically, the strategy calculates the upper and lower channel lines based on the highest and lowest prices. If the upper channel line starts to fall and the lower channel line starts to rise, it is determined as a price reversal to go short. On the contrary, if the lower channel line starts to fall and the upper channel line starts to rise, it is determined as a price reversal to go long.  

### Advantages of the Strategy

1. Use double channels to determine price reversal points for accurate reverse operations  
2. Adopt dynamic stop loss to control risks and realize timely stop loss
3. The strategy logic is simple and clear, easy to understand and implement

### Risks of the Strategy   

1. When market prices fluctuate violently, the stop loss line may be broken, leading to greater losses  
2. More frequent trading can increase transaction costs
3. Need to choose appropriate parameters to control the stop loss line, avoid too loose or too tight  

### Optimization of the Strategy

1. Optimize stop loss line parameters to make it more reasonable and effective  
2. Incorporate trend indicators to judge the reliability of reversal signals, avoid reverse operations during the trend  
3. Increase automatic trading and automatic stop loss modules to reduce transaction costs  

### Summary   

The overall idea of ​​the strategy is clear and easy to understand. It uses double channels to determine price reversals and take reverse operations. And it sets dynamic stop loss to control risks. It belongs to typical short-term trading strategies. The strategy effect can be further optimized, mainly by adjusting the stop loss parameters and assisting other technical indicators to determine entry and exit timing.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|hiP|
|v_input_2|true|hix|
|v_input_3|7|hiQ|
|v_input_4|9|loP|
|v_input_5|true|lox|
|v_input_6|5|loQ|
|v_input_7|false|反向操作:買/賣|
|v_input_8|true|Sig|
|v_input_9|true|Bgtrend|
|v_input_10|2021|年|
|v_input_11|9|月|
|v_input_12|true|日|
|v_input_13|2032|年|
|v_input_14|true|月|
|v_input_15|true|日|
|v_input_16|My Long  Msg|Long Alert Msg|
|v_input_17|My Short Msg|Short Alert Msg|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-27 00:00:00
end: 2023-11-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//

//study(title="Chande Kroll Stop", shorttitle="CK Stop", overlay=true)
strategy(title="Chande Kroll Stop", shorttitle="Chande Kroll Stop回測", overlay=true, initial_capital=100000, calc_on_every_tick=true,default_qty_type=strategy.percent_of_equity, default_qty_value=10)
br_red = #e91e63,Red = #f41818,n_green = #91dc16,dk_green = #004d40,lt_green = #16dc78,lt_blue = #0dbdd8,dk_blue = #0a3577,Blue = #034fed,br_orange = #f57c00,dk_orange = #e65100,dk_gray = #434651,dk_pink = #7c1df0,lt_pink = #e743f5,Purple = #5b32f3,lt_purple = #6b5797

hiP = input(9, "",inline="h")
hix = input(1,"" ,inline="h", step=0.1)
hiQ = input(7,"" ,inline="h")
loP = input(9,"" ,inline="h1")
lox = input(1,"" ,inline="h1", step=0.1)
loQ = input(5,"" ,inline="h1")
Xr=input(false,"反向操作:買/賣",inline="T"),
first_high_stop = highest(high, hiP) - hix * atr(hiP)
first_low_stop = lowest(high, loP) + lox * atr(loP)

stop_short = highest(first_high_stop, hiQ)
stop_long = lowest(first_low_stop, loQ)

cklow = stop_short
ckhigh = stop_long


Xdn = cklow < cklow[1] and ckhigh < ckhigh[1]
Xup = cklow > cklow[1] and ckhigh > ckhigh[1]
longcol = Xup ? lt_green : Xdn ? br_red : #2a2e39
shortcol = Xup? lt_green : Xdn ? br_red : #2a2e39
plot(stop_long, color=longcol)
plot(stop_short, color=shortcol)


plotshape(Xup and not Xup[1] , title="CK Stop Buy", text='CK', style=shape.triangleup, size=size.tiny, location=location.belowbar, color=lt_green, textcolor=lt_green,display=display.none)
plotshape(Xdn and not Xdn[1], title="CK Stop Sell", text='CK', style=shape.triangledown, size=size.tiny, location=location.abovebar, color=br_red, textcolor=br_red,display=display.none)

//       , default_qty_type=strategy.percent_of_equity, default_qty_value=10, calc_on_every_tick=true)

tl=input(true,"Sig",inline="T"), sbg=input(true,"Bgtrend",inline="T"), vbuild="FIREHORSE XRPUSDT"
Xp = 0.0, Xp:=Xdn? -1 : Xup? 1 : Xp[1], Xdf = Xr? Xup and Xp[1] == -1 : Xdn and Xp[1] == 1 ,Xuf = Xr?  Xdn and Xp[1] == 1: Xup and Xp[1] == -1 
FY=input(2021,"年",inline="btf"),FM=input(9,"月",inline="btf"),FD=input(01,"日",inline="btf"),
TY = input(2032,"年",inline="to"),TM=input(01,"月",inline="to"),TDy=input(01,"日",inline="to"), 
testTF = time>=timestamp(FY,FM,FD,00,00) and time <= timestamp(TY,TM,TDy,23,59)?  true:false


plotchar(tl? Xuf:na,vbuild+" 生門","△",location.bottom, #14e540,10,0," " ,#14e540,1,size.tiny)// ︽  ︾
plotchar(tl? Xdf:na,vbuild+" 傷門","▽",location.top,  #9b0842,10,0," ", #9b0842,1,size.tiny)  
bgcolor(sbg ? Xp==1 ? #0d47a1 :na: na, transp=90),
alertcondition(Xuf,vbuild+ "Buy", "Long ? \n"+vbuild),  alertcondition(Xdf, vbuild+ " Sell","Short ?\n"+vbuild)

if Xuf
    alert("Long " + tostring(close)+"\nLong "+input("My Long  Msg","Long Alert Msg")+vbuild, alert.freq_once_per_bar) 
if Xdf
    alert("Short " + tostring(close)+"\nShort"+input("My Short Msg","Short Alert Msg")+vbuild, alert.freq_once_per_bar) 


if testTF
    strategy.entry("Long ", strategy.long,  comment=" Long ",when=Xuf), strategy.entry("Short", strategy.short, comment=" Short",when=Xdf )


```

> Detail

https://www.fmz.com/strategy/433451

> Last Modified

2023-11-27 18:13:58
