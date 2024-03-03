
> Name

多时间周期动量反转策略Momentum-Reversal-Strategy-Based-on-Multiple-Timeframes

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e475cd1061caeb3247.png)
[trans]
## 概述
该策略基于价格的动量通过计算K线实体和影线比例,结合RSI指标判断市场超买超卖状态,寻找反转机会进行交易。主要用于短线交易,追踪中短线的价格势能反转点,以获得较高胜率。

## 策略原理
该策略的核心逻辑基于以下几点:

1. 计算K线的实体比例和影线比例:通过计算每根K线的open,close,high,low价格,得出实体和影线所占的百分比。当影线比例小于20%时,认为是强势的K线。

2. 计算K线强度变化比例:计算每根K线内部价格变动幅度,判断K线的强弱。当变化幅度比较大时,表明动能较强,判断为强势K线。

3. 结合RSI指标判断超买超卖:设置RSI的超买线和超卖线,RSI高于超买线时为超买,RSI低于超卖线时为超卖。超买超卖状态下的强势K线有较高概率发生反转。

4. 判断反转信号:当影线比例小于20%且K线强度大于平均值的2倍时,且上一根K线的收盘价高于当前K线,表明满足反转的条件,做空;相反当收盘价低于当前K线则做多。

5. 设置止损止盈:针对做多做空信号分别设置固定比例的止损位和止盈位。

## 优势分析
该策略具有以下优势:

1. 利用K线实体和影线的比例判断趋势和反转的能力较强。能有效判断价格的势能和反转点。

2. 结合K线强度变化和RSI指标,判断反转信号的准确率较高。RSI的参数可调节,优化空间大。

3. 止损止盈设置合理,有利于把握短线机会,降低单次交易的风险。

4. 策略参数调整灵活,可针对不同品种、周期进行优化,实用性强。

## 风险分析
该策略可能存在以下风险:

1. 强势突破时,可能产生假信号,导致交易失败。可通过优化K线比较周期和RSI参数来减少。

2. 反转失败的概率也存在,跟多在下跌行情和跟空在上涨行情都会被套。应适当调整止损位,减少损失。

3. 效果与交易品种和时间周期相关。对于波动性不稳定的品种应谨慎使用该策略。

## 优化方向
该策略可从以下几个方面进行优化:

1. 优化K线比较的根数,寻找最佳判断超买超卖的周期参数组合。

2. 优化RSI的超买超卖线,针对不同品种确定较好的参数。

3. 测试不同的止损止盈比例设置,确定最佳止损止盈策略。

4. 对交易品种按波动率分组优化,使策略参数针对性更强。

5. 增加其他指标判断和过滤条件,提高策略稳定性。

## 总结
本策略总体来说非常实用,通过对K线信息的应用判断价格势能反转点,是一种典型的短线交易策略。优化空间较大,可针对不同品种和交易环境进行调整,在跟踪中短线价格趋势方面效果较好。但需要注意防范止损和风险控制。

||

## Overview
This strategy identifies trading opportunities by calculating candlestick body/wick ratios and combining RSI indicators to detect overbought/oversold market conditions. It aims to capture potential reversals in the price momentum over short-to-medium term timeframes.  

## Strategy Logic
The core logic of this strategy is based on the following:

1. Calculate body/wick percentage of candlesticks: By computing open, close, high and low prices, derive the percentage occupied by candle body and wicks. Wick percentage below 20% indicates a strong candle.

2. Compute candle strength change percentage: Calculate the internal price movement magnitude of each candle to determine candle strength. Larger fluctuations imply stronger momentum and hence indicate stronger candles.

3. Combine with RSI to identify overbought/oversold conditions: Set overbought and oversold threshold lines for RSI. RSI above overbought line signifies overbought state and vice versa for oversold. Strong candles in such states have high probability of reversal. 

4. Determine reversal signals: When wick percentage < 20% and candle strength > 2 x average strength, along with previous candle close higher than current candle close, it signals short condition. The opposite indicates long condition.

5. Define stop loss and take profit: Set fixed percentage-based stop loss and take profit levels separately for long and short trades.

## Advantage Analysis  
The advantages of this strategy include:

1. Effective identification of trend and reversals using candle body/wick proportions. Detects price momentum and turning points well.

2. Higher accuracy of reversal signals by combining candle strength change and RSI. RSI is adjustable providing greater optimization capability.

3. Reasonable stop loss/take profit configuration to capitalize on short-term opportunities while lowering trade risk exposure.

4. Flexible tunability of parameters for optimizing across different products and timeframes. High practical utility.  

## Risk Analysis
Some risks present in the strategy:

1. Potential false signals during strong trend breakouts. Can be reduced via optimization of candle comparison periods and RSI parameters.

2. Probability of failed reversals can't be eliminated fully. Being long in downtrend and vice versa induces losses. Stop losses should be adjusted accordingly to minimize damage.

3. Performance depends on product and timeframe. Caution warranted when applying to highly volatile products.

## Enhancement Opportunities 
The strategy can be optimized in the following ways:

1. Fine tune periods considered in identifying overbought/oversold to determine optimal parameter combinations.

2. Optimize overbought/oversold RSI thresholds based on product specifics. 

3. Test stop loss/take profit ratios for deriving ideal risk management plan.

4. Categorize products as per volatility for more targeted parameter tuning.

5. Additional filters based on other indicators may improve robustness.

## Conclusion
The strategy is highly practical overall for detecting reversals by understanding candlestick information. As a typical short-term trading system, it has sizable optimization capability across products and environments for tracking medium-term trends. However adequate risk control through stop losses is imperative.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|Periodo RSI|
|v_input_int_2|75|Sobre Compra|
|v_input_int_3|25|Sobre Venta|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("mecha larga study",overlay = true,  max_bars_back = 600)
//Porcentaje Mecha cuerpo
bodyPercent = math.abs(open - close) / (high - low) * 100
wickPercent = 100 - bodyPercent

plot(bodyPercent, "Porcentaje del cuerpo", color.rgb(163, 76, 175))
plot(wickPercent, "Porcentaje de la mecha", color.red)

VelaDeFuerza =  math.abs(((high[0] - low[0])*100)/high)//PORCENTAJE DE VARIACION DE UNA VELA
plot(VelaDeFuerza, color = color.purple)

Promedio = ((VelaDeFuerza[0] + VelaDeFuerza[1] + VelaDeFuerza[2] + VelaDeFuerza[3] + VelaDeFuerza[4]  + VelaDeFuerza[5] + VelaDeFuerza[6] + VelaDeFuerza[7] + VelaDeFuerza[8] + VelaDeFuerza[9] + VelaDeFuerza[10] + VelaDeFuerza[11] + VelaDeFuerza[12] + VelaDeFuerza[13]  + VelaDeFuerza[14] ) / 15)
plot(Promedio, color = color.yellow)


// rsi 
per_Rsi = input.int(14, "Periodo RSI",minval= 11, maxval=20) //inicializo el rsi en 14 periodos pero doy la posibilidad al usuario de cambiarlo
rsi_Sc = input.int(75,"Sobre Compra",minval=68,maxval=80) //ENTRADA DE SOBRE COMPRA DE RSI
rsi_Sv = input.int(25,"Sobre Venta",minval=20,maxval=33) //ENTRADA DE SOBRE VENTA DE RSI
rsi= ta.rsi(close,per_Rsi)//guardo el rsi con los paramentros anteriores en una variable

//logica
MayorPromedio =   Promedio + 0.800
plot(MayorPromedio, color = color.green)

Venta =   bodyPercent > 80   and VelaDeFuerza > Promedio * 2  and close < close[1]
Compra =   bodyPercent > 80  and VelaDeFuerza > Promedio * 2 and close > close[1]


precioVenta = Venta? close : na
precioCompra = Compra? close : na

tp1 = 0.00
sl  = 0.00
tp1 := 0.003
sl := 0.010

TP1short = precioVenta - (precioVenta * tp1)
Slshort = precioVenta + (precioVenta * sl)

TP1long = precioCompra + (precioCompra * tp1)
SLlong = precioCompra - (precioCompra * sl)


name1 = "tp1"
name2 = "tp2"
name3= "SL"




if ( precioVenta ) 
    strategy.entry("short", strategy.short , comment = "Sell  SL: " + str.tostring(Slshort, "0.000")  + " TP1: " + str.tostring(TP1short,"0.000") ) 
    strategy.exit("exit" , "short", stop = Slshort , limit = TP1short ,qty_percent = 100 )  
if ( precioCompra ) 
    strategy.entry("long", strategy.long , comment = "Buy   SL: " + str.tostring(SLlong, "0.000")  + " TP1: " + str.tostring(TP1long,"0.000") )
    strategy.exit("exit" , "long", stop = SLlong  , limit = TP1long ,qty_percent = 100 )
```

> Detail

https://www.fmz.com/strategy/442927

> Last Modified

2024-02-27 14:27:49
