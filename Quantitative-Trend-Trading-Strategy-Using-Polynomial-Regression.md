
> Name

Quantitative-Trend-Trading-Strategy-Using-Polynomial-Regression

> Author

ChaoZhang

> Strategy Description



This quantitative trading system uses polynomial regression analysis to identify potential trend reversals for entry signals. It aims to capitalize on momentum in a systematic, rules-based manner.

How it Works

The strategy fits polynomial regression lines to recent high and low prices. It tracks how many recent highs or lows exceed the regression forecast.

If a certain threshold of highs or lows breakout, a buy or sell signal is generated indicating an emerging trend. Stops and targets are set based on input percentages.

Positions are entered when the volatility angle exceeds a minimum to avoid choppy markets. Trades are managed based on the defined risk parameters.

Advantages and Drawbacks

By automating trend signals based on mathematical analysis, the strategy provides an objective approach to discretionary trading. Optimization can improve performance.

However, curve-fitting can lead to overoptimization. As with any technical system, performance depends heavily on market conditions. No strategy replaces prudent risk management.

Careful testing across different timeframes, asset classes and market environments is key to evaluate robustness. No strategy is foolproof, so managing risk is critical.

Overall, quantitative strategies offer a rules-based methodology for identifying potential trades. Blending mathematical and technical techniques can improve timing and risk calibration.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|1.4|Porcentaje Stop Loss|
|v_input_2|5.6|Porcentaje Take Profit|
|v_input_3|26.8|Angulo permitido|
|v_input_4|true|═══════════════ From ═══════════════|
|v_input_5|true|Month|
|v_input_6|true|Day|
|v_input_7|2019|Year|
|v_input_8|true|════════════════ To ════════════════|
|v_input_9|31|Month|
|v_input_10|12|Day|
|v_input_11|9999|Year|
|v_input_12|true|══════════════ Config ══════════════|
|v_input_13|4|p|
|v_input_14|26|length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-10 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //
//Ultima version underground09

// strategy(title = " underground09",
//          shorttitle = "Under09",
//          overlay = true,
//          precision = 8,
//          calc_on_order_fills = true,
//          calc_on_every_tick = true,
//          backtest_fill_limits_assumption = 0,
//          default_qty_type = strategy.fixed,
//          default_qty_value = 2,
//          initial_capital = 10000,
//          pyramiding=5,
//          currency = currency.USD,
//          linktoseries = true)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //
var sl = 0.0
var tp = 0.0
var acumaldor_vxp = 0.0
var acomuldor_vol = 0.0

//stop_loss = input(defval=0.2, title="Porcentaje Stop Loss", type=input.float, step=0.2)
stop_loss = input(defval=1.4, title="Porcentaje Stop Loss", type=input.float, step=0.2)
//take_profit = input(defval=4.4, title="Porcentaje Take Profit", type=input.float, step=0.2)
take_profit = input(defval=5.6, title="Porcentaje Take Profit", type=input.float, step=0.2)
//pintar_trade = input(defval=false, title="Pintar trade TP SL")
angulo_permitido = input(defval=26.8, title="Angulo permitido", type=input.float, step=0.2)

backTestSectionFrom = input(title = "═══════════════ From ═══════════════", defval = true, type = input.bool)

FromMonth         = input(defval = 1, title = "Month", minval = 1)
FromDay           = input(defval = 1, title = "Day", minval = 1)
FromYear          = input(defval = 2019, title = "Year", minval = 2014)

backTestSectionTo = input(title = "════════════════ To ════════════════", defval = true, type = input.bool)
ToMonth           = input(defval = 31, title = "Month", minval = 1)
ToDay             = input(defval = 12, title = "Day", minval = 1)
ToYear            = input(defval = 9999, title = "Year", minval = 2014)

Config            = input(title = "══════════════ Config ══════════════", defval = true, type = input.bool)
//p = input(6)
p = input(4)
//length = input(30)
length = input(26)
//
backTestPeriod() => (time > timestamp(FromYear, FromMonth, FromDay, 00, 00)) and (time < timestamp(ToYear, ToMonth, ToDay, 23, 59))
//
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

x1 = bar_index
x2 = sqrt(x1)
y = high
//
S11 = sum(x2,length) - sqrt(sum(x1,length)) / length  
S12 = sum(x1*x2,length) - (sum(x1,length) * sum(x2,length)) / length  
S22 = sum(sqrt(x2),length) - sqrt(sum(x2,length)) / length            
Sy1 = sum (y*x1,length) - (sum(y,length) * sum(x1,length)) / length   
Sy2 = sum (y*x2,length) - (sum(y,length) * sum(x2,length)) / length   
//
max1 = sma(x1,length) 
max2 = sma(x2,length)
may = sma(y,length)
b2 = ((Sy1 * S22) - (Sy2*S12))/(S22*S11 - sqrt(S12))
b3 = ((Sy2 * S11) - (Sy1 * S12))/(S22 * S11 - sqrt(S12))
b1 = may - b2*max1 - b3*max2
qr = b1 + b2*x1 + b3*x2
//
yl = low
//
Sy1l = sum(yl*x1,length) - (sum(yl,length) * sum(x1,length)) / length  
Sy2l = sum(yl*x2,length) - (sum(yl,length) * sum(x2,length)) / length  
//
mayl = sma(yl,length)
b2l = ((Sy1l * S22) - (Sy2l*S12))/(S22*S11 - sqrt(S12))
b3l = ((Sy2l * S11) - (Sy1l * S12))/(S22 * S11 - sqrt(S12))
b1l = mayl - b2l*max1 - b3l*max2
qrl = b1l + b2l*x1 + b3l*x2
//
period = round(p/2)+1
hh = qr[period]
ll = qrl[period]
countH = 0
countL = 0
buy=0
sell=0
//
for i = 1 to period-1
    if qr[i]<hh
        countH:=countH+1
    if qrl[i]>ll
        countL:=countL+1

for i = period+1 to p+1
    if qr[i]<hh
        countH:=countH+1
    if qrl[i]>ll
        countL:=countL+1

if countH==p
    pivotH = high[period]
    buy := 1
    
if countL==p
    pivotL = low[period]
    sell := 1
//
Angulo(_serie) =>
    atan( _serie - _serie[1] ) * 180 / acos(-1)
    
//calcular elvwap
vxp = volume*hlc3
//:= signo de acumulador
acumaldor_vxp := acumaldor_vxp + vxp
acomuldor_vol := acomuldor_vol + volume
vwap2 = acumaldor_vxp / acomuldor_vol

pendiente = Angulo(vwap2)

//  

plotshape(buy == 1 , text='⬆️', style=shape.arrowup, location=location.belowbar, color=#32CD32, textcolor=color.white, offset=0, transp=0,size=size.auto)
if buy == 1
    alert("Posible long",alert.freq_all )
    
plotshape(sell == 1 , text='⬇️', style=shape.arrowdown, location=location.abovebar, color=#FF0000, textcolor=color.white, offset=0, transp=0,size=size.auto)
if sell == 1
    alert("Posible short",alert.freq_all )
//

//if (backTestPeriod())
    //strategy.entry("long", true, 1, when = buy == 1)
    //    strategy.entry("short", false, 1, when = sell == 1) 

if buy == 1 and pendiente > angulo_permitido
//if buy == 1    
    cantidad = round(strategy.equity / close ) 
    strategy.entry("long", true, cantidad, comment = "Compra")
    sl := close * ( 1 - (stop_loss/100))
    tp := close * ( 1 + (take_profit/100))

if sell == 1 and pendiente > angulo_permitido
//if sell == 1 
    cantidad = round(strategy.equity / close ) 
    strategy.entry("short", false, cantidad, comment = "Venta")
    sl := close * ( 1 + (stop_loss/100))
    tp := close * ( 1 - (take_profit/100))
    
//Validaciones
comprado = strategy.position_size > 0 //true si es positivo
vendido = strategy.position_size < 0 //true si es negativo

if  comprado
    //Salir sl
    if  close >= tp
        //plotshape(close >= tp, style=shape.xcross)
        strategy.close("long", comment="TP")
        
    //Salir tp
    if  close <= sl
        strategy.close("long", comment="SL")
        
if  vendido
    //Salir sl
    if  close <= tp
        strategy.close("short", comment="TP")
    //Salir tp
    if  close >= sl
        strategy.close("short", comment="SL")

    
//sl tp
plot( sl , color =color.red, style=plot.style_cross)
plot( tp , color= color.green , style=plot.style_circles)

    
//color
//bgcolor (comprado ? color.green: na)
//bgcolor (vendido ? color.red: na)

//if pintar_trade 
    //bgcolor (close >= tp ? color.green : na, transp=80) 
    //bgcolor (close >= sl ? color.red : na, transp=80) 


```

> Detail

https://www.fmz.com/strategy/426323

> Last Modified

2023-09-11 09:04:37
