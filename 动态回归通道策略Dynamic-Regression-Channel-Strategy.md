
> Name

动态回归通道策略Dynamic-Regression-Channel-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17ce5841e6fec85846f.png)
[trans]
## 概述

动态回归通道策略是一种利用线性回归分析价格趋势,并结合动态止损来实现趋势跟踪的量化交易策略。该策略运用线性回归绘制价格通道,判断价格突破通道的信号,发出买入和卖出指令。同时,策略会跟踪价格实时更新止损位置,锁定利润。

## 策略原理

该策略首先计算价格的线性回归曲线,判断价格是否突破上行或下行回归通道。当价格超过通道上轨时,产生买入信号;当价格跌破通道下轨时,产生卖出信号。 

在入市后,策略会实时跟踪价格突破止损均线的情况。如果是做多订单,价格跌破止损均线,会发出止损卖出指令;如果是做空订单,价格超过止损均线,会发出止损买入指令。这样可以锁定利润,控制风险。

需要注意的是,如果价格重新突破通道实施反向操作,策略会立即平仓原有头寸,改为反向交易。

## 优势分析

该策略结合趋势和反转交易思路,能够顺应价格总体走势,同时抓住短期调整机会。实时更新的止损策略也可以有效控制风险,是一种较为均衡的交易方法。

相比简单的移动均线策略,动态回归通道策略对价格变化更为敏感,可以减少误交易。此外,该策略仅在价格突破通道上下轨时出手,有利于避免无序的激进交易。

## 风险分析

该策略主要面临回归曲线拟合不精确带来的风险。如果回归通道范围设定不当,过于宽泛,会增加无效交易的概率。过于窄小的通道则会错过交易机会。

此外,止损位置的设定也很关键。止损过于靠近,容易被短期价格波动触发;而过于宽松的止损无法起到风险控制的效果。需要根据不同品种来调整参数。

## 优化方向

可以考虑根据不同周期或品种自动优化参数,使回归通道和止损线更贴合价格趋势。例如可以结合机器学习算法来训练最优参数。

另一方面,可以尝试不同类型的回归方法,如多项式回归、局部加权回归等,使拟合效果更好。或者结合多个回归指标构建交易规则,提高策略稳定性。

## 总结

动态回归通道策略综合运用了趋势和反转分析方法,在顺应价格总体走势的同时,抓住短期调整机会进行交易。关键的回归通道和止损位置设定对策略效果有重要影响。通过参数优化和模型迭代,可以进一步完善该交易策略。

||

## Overview

The Dynamic Regression Channel strategy utilizes linear regression analysis of price trends combined with dynamic stop loss to implement trend following in quantitative trading. The strategy employs linear regression to plot a price channel and generate buy and sell signals when prices break out of the channel. At the same time, the strategy tracks prices in real-time to update stop loss levels to lock in profits.

## Strategy Logic  

The strategy first calculates a linear regression curve of prices to determine if prices break out above or below the regression channel. When prices rise above the upper rail of the channel, a buy signal is generated. When prices fall below the lower rail, a sell signal is triggered.  

After entering a position, the strategy keeps tracking if prices break the stop loss moving average line. For long orders, if prices fall below the stop loss line, a stop loss sell order will be issued. For short orders, if prices rise above the stop loss line, a stop loss buy order will be triggered. This locks in profits and controls risks.  

It is important to note that if prices break the channel again reversing direction, the strategy will immediately flatten the original position and switch to trade in the opposite direction.  

## Advantage Analysis

This strategy combines both trend following and mean reversion concepts, riding with the overall price trend while catching short-term reversals. The dynamic stop loss also effectively controls risks. As such, it is a balanced trading approach.  

Compared with simple moving average strategies, the Dynamic Regression Channel Strategy is more sensitive to price changes and can reduce mistrades. In addition, the strategy only trades on breakouts of the channel, avoiding unrestrained aggressive trades.  

## Risk Analysis  

The main risk lies in inaccurate fitting of the regression curve. If the channel range is set improperly, being too wide or too narrow, it will increase invalid trades or miss trading opportunities.  

In addition, proper stop loss positioning is critical. A stop loss too close to market prices is prone to premature liquidation by short-term volatility while a stop loss too far away cannot serve its purpose of risk control. Fine tuning is needed across different products.  

## Optimization  

Consider auto-optimizing parameters for different periods or products to make the regression channel and stop loss line fit better to price trends. For instance, machine learning algorithms can potentially be leveraged to train optimal parameters.  

Alternatively, different types of regression such as polynomial regression and locally weighted regression can be tested to improve fitting. Combining multiple regression metrics to construct trading rules may also enhance strategy stability.  

## Conclusion  

The Dynamic Regression Channel Strategy skillfully utilizes both trend following and mean reversion techniques, riding the overall price trend while capturing short-term reversals. Proper tuning of the key regression channel and stop loss parameters is vital to strategy performance. Further refinements can be made through parameter optimization and model iteration.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|21|Slope EMA|
|v_input_int_2|13|Stop EMA|
|v_input_int_3|21|Slope Lenght|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Estratégia de Regressão Linear", shorttitle="Regressão Linear Estratégia", overlay=true, initial_capital = 100, default_qty_value = 10, default_qty_type = strategy.percent_of_equity)

// média móvel exponencial para definição de regressao linear
var SlopeEMASize = input.int(defval = 21, title = "Slope EMA" )
// ema_length = 21
slope_ema = ta.ema(close, SlopeEMASize)

// média móvel exponencial para definição de nivel de stop
var StopEMASize = input.int(defval = 13, title = "Stop EMA" )
stop_ema = ta.ema(close, StopEMASize)

// Variáveis para controle de posição
var float long_stop_level = na
var float long_entry_level = na
var bool long_signal = false
var bool long_order_open = false
var int long_order_id = 0


var float short_stop_level = na
var float short_entry_level = na
var bool short_signal = false
var bool short_order_open = false
var int short_order_id = 0

// Regressão linear para uso como sinal de entrada 
var SlopeLenght = input.int(defval = 21, title = "Slope Lenght" )
entry_signal = ta.linreg(slope_ema, SlopeLenght, 0)

//Variaveis com a indicação do pivot da regressao
long_entry_signal = ta.crossover(entry_signal, entry_signal[1])
short_entry_signal = ta.crossunder(entry_signal, entry_signal[1])

// Condição de entrada (reversão da regressão)
if long_entry_signal
    long_signal := true
    short_signal := false
    long_entry_level := high
    long_stop_level := low

if short_entry_signal
    short_signal := true
    long_signal := false
    short_entry_level := low
    short_stop_level := high


// Indica quando o preço cruzou o nível de stop 
price_cross_stop_ema_up = ta.crossover(close, stop_ema)
price_cross_stop_ema_down = ta.crossunder(close, stop_ema)

// Mover o stop quando o preço cruzar a nível stop e operação long ativa
if long_signal and long_order_open and price_cross_stop_ema_down
    if low > long_entry_level
        long_stop_level := high

// Mover o stop quando o preço cruzar a nível stop e operação short ativa
if short_signal and short_order_open and price_cross_stop_ema_up
    if high < short_stop_level
        short_stop_level := low

// Sair da posição se houver nova reversão da regressão
if long_order_open or short_order_open
    if long_entry_signal //and short_order_open
        strategy.close(str.tostring(short_order_id), comment ="Inversão Sinal("+str.tostring(short_order_id)+")")
        short_order_open:= false
    if short_entry_signal //and long_order_open
        strategy.close(str.tostring(long_order_id), comment = "Inversão Sinal("+str.tostring(long_order_id)+")")
        long_order_open:=false

// Sinais de compra e venda com base no stop
if long_signal and close > long_entry_level and not long_order_open
    if strategy.opentrades != 0
        strategy.cancel_all()

    long_order_id+=1
    // strategy.order(str.tostring(long_order_id), strategy.long, comment="Open Long("+str.tostring(long_order_id)+")", limit = long_entry_level) 
    strategy.entry(str.tostring(long_order_id), strategy.long, comment="Open Long("+str.tostring(long_order_id)+")", limit = long_entry_level)
    long_order_open := true
    // log.info("Open Long:"+str.tostring(long_order_id))

if short_signal and close < short_entry_level and not short_order_open
    if strategy.opentrades != 0
        strategy.cancel_all()

    short_order_id+=1
    // strategy.order(str.tostring(short_order_id), strategy.short, comment="Open Short("+str.tostring(short_order_id)+")", limit = short_entry_level)
    strategy.entry(str.tostring(short_order_id), strategy.short, comment="Open Short("+str.tostring(short_order_id)+")", limit = short_entry_level)
    short_order_open := true
    // log.info("Open Short:"+str.tostring(short_order_id))

// Sinais de compra e venda com base no stop
if long_signal and close < long_stop_level and long_order_open
    strategy.close(str.tostring(long_order_id), comment = "Stop Atingido("+str.tostring(long_order_id)+")", immediately = true)
    long_order_open := false

if short_signal and close > short_stop_level and short_order_open
    strategy.close(str.tostring(short_order_id),comment = "Stop Atingido("+str.tostring(short_order_id)+")", immediately = true)
    short_order_open := false

// Plotagem da regressão e do stop

plot(stop_ema, title="Stop Signal", color=color.red)
plot(entry_signal,"Entry Signal", linewidth = 5, color = color.rgb(155, 0, 140))

plotshape(long_order_open?long_stop_level:na, title = "Long Stop Level", color = color.green, location = location.absolute)
plotshape(long_order_open?long_entry_level:na, title="Long Entry Value",location=location.absolute, color = color.green, style = shape.circle)
plotshape(series=long_entry_signal, title="Long Signal", location=location.abovebar, color=color.green, style=shape.triangleup, size=size.small, text = "Long Signal")

plotshape(short_order_open?short_stop_level:na, title = "Short Stop Level", color = color.red, location = location.absolute)
plotshape(short_order_open?short_entry_level:na, title="Short Entry Value",location=location.absolute, color = color.red, style = shape.circle)

plotshape(series=short_entry_signal, title="Short Signal", location=location.belowbar, color=color.red, style=shape.triangledown, size=size.small, text="Short Signal")


```

> Detail

https://www.fmz.com/strategy/442622

> Last Modified

2024-02-23 12:14:49
