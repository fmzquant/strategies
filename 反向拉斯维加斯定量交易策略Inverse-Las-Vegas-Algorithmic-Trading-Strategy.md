
> Name

反向拉斯维加斯定量交易策略Inverse-Las-Vegas-Algorithmic-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b99c06a6aa8598d0f5.png)
[trans]

### 概述

本策略名称为“反向拉斯维加斯定量交易策略”,其基本思路是利用拉斯维加斯算法,当价格上涨时做空,当价格下跌时做多,与原有算法相反,形成一个反向操作的策略。

### 策略原理  

该策略的核心逻辑是计算当前价格和前一个周期的价格,当当前价格大于前一个价格时触发做空信号,当当前价格小于前一个价格时触发做多信号。做空做多的仓位根据累积盈利的资金总额计算,每次交易结束后,将盈利累积到下一次的操作资金中,形成再投资。

具体来说,策略通过current_price和previous_price变量记录当前价格和前一个周期的收盘价格。然后定义long_condition和short_condition判断条件,当current_price大于previous_price时触发long_condition,当current_price小于previous_price时触发short_condition。在条件触发时,根据capital_actual变量确定仓位大小position_size。执行做空或做多交易后,通过ganancias变量记录本次交易盈亏,累积到ganancias_acumuladas中。最后,通过capital_actual := capital_actual + ganancias_acumuladas的方式,将盈利再投资到下一次交易中。

### 策略优势分析

该策略最大的优势在于利用反向操作的思路,当市场出现系统性错误时,其盈利潜力会非常大。另外,其再投资机制也会放大盈利。如果运气好,连续交易取得盈利,通过再投资可以迅速积累资金优势。

具体来说,其优势主要有:

1. 利用反向操作,当市场判断出现系统性错误时,其盈利空间巨大。

2. 再投资机制放大盈利,运气好时资金快速增长。

3. 策略逻辑简单,容易理解和跟踪。

4. 可通过参数调整扩大体验不同交易结果。

### 风险分析

该策略最大的风险在于其反向操作的特性,如果坚持错误的市场判断,其将面临巨大的损失。另外杠杆效应也会被再投资机制放大损失。

具体风险点包括:

1. 如果市场走势判断错误,平仓亏损会被放大。

2. 杠杆交易风险太高,单次交易亏损可能超过本金。

3. 追涨杀跌的心理作祟,过度交易亏损加重。

4. 参数设置不当也可能导致意外大亏损。

对应的解决方法包括:

1. 做好风险控制,止损退出、分批建仓。

2. 谨慎使用杠杆,控制单笔损失。

3. 加强心理调控,避免过度交易。

4. 调参测试后再投入运行。

### 策略优化方向  

该策略的优化空间主要集中在再投资机制和参数调整上。

再投资机制可设置部分比例再投资,而不是全额再投资,控制单次亏损影响。

参数调整可尝试不同周期长度及平移大小,寻找最佳参数组合。

另外建议结合止损机制控制损失。具体优化建议如下:

1. 设置再投资比例,防止亏损过大。

2. 测试不同周期参数,寻找最佳参数。 

3. 加入止损逻辑。初期可设定固定止损位,后期可结合ATR动态止损。

4. 可以考虑加入开平仓的时间或技术指标条件来控制交易频率。

### 总结  

本策略名称为“反向拉斯维加斯定量交易策略”,其通过反向操作的思路,配合再投资机制,试图在市场出错时获利。该策略具有较高盈利空间的优势,但也面临巨大风险。我们对风险进行了详细分析,并给出了优化建议。总体而言,如果管理得当,该策略可以在一定条件下获利,但需要谨慎看待。

||

### Overview

The name of this strategy is “Inverse Las Vegas Algorithmic Trading Strategy”. The basic idea is to utilize the Las Vegas algorithm to go short when prices rise and go long when prices fall, which is the opposite of the original algorithm, forming an inverse operating strategy.

### Strategy Principle   

The core logic of this strategy is to calculate the current price and the price of the previous cycle. When the current price is greater than the previous price, a short signal is triggered. When the current price is less than the previous price, a long signal is triggered. The position size is calculated based on the total accumulated profits. After each trade ends, the profits are accumulated into the funds for the next operation, forming a reinvestment.

Specifically, the strategy records the current price and the closing price of the previous cycle through the current_price and previous_price variables. Then the long_condition and short_condition judgment conditions are defined. When current_price is greater than previous_price, long_condition is triggered. When current_price is less than previous_price, short_condition is triggered. When the conditions are triggered, determine the position size position_size based on the capital_actual variable. After executing a short or long trade, record the profit and loss of this trade through the ganancias variable and accumulate it into ganancias_acumuladas. Finally, reinvest the profits into the next trade through capital_actual := capital_actual + ganancias_acumuladas.

### Advantage Analysis  

The biggest advantage of this strategy is that it uses the idea of inverse operations. When there is a systemic error in the market, its profit potential will be very large. In addition, its reinvestment mechanism will also amplify profits. If you get consecutive profitable trades through luck, funds can accumulate rapidly through reinvestment. 

Specifically, the main advantages are:

1. Inverse operations utilize systemic errors in market judgement for huge profit potential.  

2. The profit reinvestment mechanism amplifies profits, and funds grow rapidly when lucky.

3. The strategy logic is simple, easy to understand and track.  

4. Parameters can be adjusted to experience different trading results.

### Risk Analysis

The biggest risk of this strategy lies in its inverse operation characteristics. If insisting on wrong market judgments, it will face huge losses. In addition, the leverage effect will also amplify losses through the reinvestment mechanism.

Specific risk points include:

1. If the market trend judgement is wrong, the loss from closing positions will be amplified.

2. The risk of leveraged trading is too high, and the loss from a single trade may exceed the principal.  

3. The psychology of chasing rises and killing falls works, and excessive trading increases losses.  

4. Improper parameter settings may also lead to unexpectedly large losses.

The corresponding solutions include:

1. Do risk management, stop loss exit, open positions in batches.

2. Use leverage cautiously and control single transaction losses.

3. Strengthen psychological regulation to avoid excessive trading. 

4. Test parameters before running.

### Optimization Suggestions   

The optimization space of this strategy is mainly concentrated in the profit reinvestment mechanism and parameter adjustment.

The profit reinvestment mechanism can set the ratio of reinvestment instead of full reinvestment to control the impact of a single loss.

Parameter adjustment can try different cycle lengths and shift sizes to find the optimal parameter combination.

In addition, it is recommended to incorporate a stop loss mechanism to control losses. Specific optimization suggestions are as follows:

1. Set reinvestment ratio to prevent excessive losses.  

2. Test different cycle parameters to find the optimal parameters.

3. Add stop loss logic. Initially can set a fixed stop loss, and later can add dynamic stop loss based on ATR.

4. Consider adding open and close conditions based on time or technical indicators to control trading frequency.

### Conclusion   

The name of this strategy is “Inverse Las Vegas Algorithmic Trading Strategy”. Through the idea of inverse operations, combined with a profit reinvestment mechanism, it attempts to profit when the market makes mistakes. The strategy has the advantage of high profit potential, but also faces huge risks. We analyzed the risks in detail and gave optimization suggestions. In general, with proper management, the strategy can profit under certain conditions, but needs to be treated cautiously.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Longitud de comparación|
|v_input_2|true|Desplazamiento|
|v_input_3|100|Capital Inicial|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-16 00:00:00
end: 2023-11-23 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Estrategia Las Vegas Long/Short Invertida con Reinversión de Ganancias", shorttitle="Las Vegas LS-Invertida-Reinversion", overlay=true)

// Parámetros
length = input(14, title="Longitud de comparación")
offset = input(1, title="Desplazamiento")

// Capital inicial
capital_inicial = input(100, title="Capital Inicial")

// Variables para el seguimiento de las ganancias
var float capital_actual = capital_inicial
var float ganancias_acumuladas = 0.0

// Calcular el precio actual y el precio anterior
current_price = close
previous_price = security(syminfo.tickerid, "D", close[1])

// Lógica de la estrategia invertida
long_condition = current_price > previous_price
short_condition = current_price < previous_price

// Calcular el tamaño de la posición en función de las ganancias acumuladas y reinvertir
if (long_condition or short_condition)
    position_size = capital_actual / current_price
    ganancias = position_size * (previous_price - current_price)  // Invertir la dirección
    capital_actual := capital_actual + ganancias
    ganancias_acumuladas := ganancias_acumuladas + ganancias

// Reinvertir las ganancias en la próxima orden
position_size_reinvested = capital_actual / current_price

// Sumar las ganancias de los trades al monto de operación
if (long_condition or short_condition)
    capital_actual := capital_actual + ganancias_acumuladas

// Colocar una orden SHORT (venta) cuando se cumpla la condición Long invertida
strategy.entry("Short", strategy.short, when=long_condition)
// Colocar una orden LONG (compra) cuando se cumpla la condición Short invertida
strategy.entry("Long", strategy.long, when=short_condition)

// Etiquetas para mostrar las condiciones en el gráfico
plotshape(series=long_condition, title="Condición LONG", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(series=short_condition, title="Condición SHORT", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

// Mostrar el capital actual y las ganancias acumuladas en el gráfico
plot(capital_actual, title="Capital Actual", color=color.blue, linewidth=2)
plot(ganancias_acumuladas, title="Ganancias Acumuladas", color=color.green, linewidth=2)
```

> Detail

https://www.fmz.com/strategy/433117

> Last Modified

2023-11-24 15:19:03
