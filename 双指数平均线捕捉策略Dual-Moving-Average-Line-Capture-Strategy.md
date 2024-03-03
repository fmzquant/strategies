
> Name

双指数平均线捕捉策略Dual-Moving-Average-Line-Capture-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1aceb1e7d7227219099.png)
[trans]

### 概述
本策略运用双指数平均线指标判断市场趋势方向,结合布林带指标判断超买超卖现象,实现低买高卖,获利退出。

### 策略原理
本策略使用双指数平均线判断市场总体走势,布林带判断具体入场时机。

双指数平均线的运算法则是,分别计算一短期和一长期的指数平均线,当短期线从下向上突破长期线 becoming为看多信号; 当短期线从上向下跌破长期线时,为看空信号。

布林带指标则判断价格是否处于超买或超卖状态。布林带中轨为n天收盘价的移动平均线,带宽则为移动平均线前n天的标准差幅度。价格接近上轨时为超买,接近下轨时为超卖。

本策略规则为:
当短均线从下向上突破长均线,并且收盘价突破布林带上轨时,做多;当短均线从上向下跌破长均线,并且收盘价跌破布林带下轨时,做空。

做多后的止损点为之前n天内最低价,止盈点则为开仓价格的1.6倍;做空后的止损点为之前n天最高价,止盈点为开仓价格的1.6倍。

此外,本策略还考虑EMA多空指标判断总体走势,避免逆势开仓。

### 优势分析
1. 使用双指数平均线判断总体走势,布林带判断具体买卖点位,指标搭配合理;
2. 做多停损点采用之前n天最低价,做空停损采用之前n天最高价,有利于减少止损被追杀的概率;  
3. 止盈点采用开仓价点的1.6倍,有利于获得足够盈利;
4. 考虑EMA总体走势指标,避免逆势开仓,可减少系统性损失。

### 风险分析
1. 布林带参数优化不当可能导致交易频率过高或信号稀少;
2. 止损点过于宽松可能带来更大亏损;
3. 止盈点过于宽松可能错过更大利润。

针对以上风险,优化布林带参数组合,测试不同止损止盈水平,选择最优参数。

### 优化方向 
1. 优化布林带参数,寻找最佳参数组合;
2. 测试不同的止损幅度参数,降低止损被追的概率;
3. 测试不同的止盈倍数参数,争取获得更大收益。

### 总结
本策略运用双指数平均线判断市场总体走势,布林带判断具体买卖时机,在回测数据中表现不俗。通过参数优化及规则修改可望获得更佳效果。其止损止盈机制也可移植至其他策略中,具有借鉴价值。

||

### Overview  
This strategy uses dual moving average lines to determine market trend direction combined with Bollinger Bands to identify overbought and oversold conditions, in order to achieve buying low and selling high for profit taking.

### Strategy Logic  
The strategy utilizes dual moving averages to ascertain overall market direction, while relying on Bollinger Bands for specific entry signals. 

The dual moving average rule stipulates computing a short-term and a long-term exponential moving average line, with the short-term line crossing over the long-term line upward indicating a buy signal; the short-term line crossing downward through the long-term constitutes a sell signal.  

The Bollinger Bands indicator determines whether prices are overbought or oversold. The middle band of Bollinger Bands is the moving average line of n-period closing prices, while the band width represents the standard deviation of the moving average over the past n periods. Prices approaching the upper band indicate an overbought condition and those nearing the lower band constitute an oversold situation.

The strategy rules are defined as: 
When the short average line crosses over the long average line upward plus the closing price penetrating above the Bollinger upper band, go long. When the short line crosses downward through the long line plus the closing prices dropping below the Bollinger lower band, go short.  

The stop loss after going long is set at the lowest low over the past n days, while take profit is placed at 1.6 times the entry price. The stop loss after a short sale is pegged to the highest high over n days past with take profit at 0.6 times the entry price. 

In addition, the strategy considers the EMA trend index to avoid trend reversals. 

### Advantage Analysis
1. Using dual moving averages to determine overall direction combined with Bollinger Bands to spotlight specific entry points represents a sensible indicator mix;  
2. Adopting the lowest low over n days as stop loss for longs and highest high over n days as stop loss for shorts helps diminish chances of stops being run;   
3. Fixing take profit target at 1.6 times entry price facilitates capturing adequate gains; 
4. Considering EMA trend index assists evading trades against major trend, reducing system losses.  

### Risk Analysis  
1. Inappropriate optimization of Bollinger Bands parameters may result in excessively frequent trading or insufficient signals;  
2. Excessively loose stop loss points invites larger losses;   
3. Excessively tight take profit restrictions forfeits larger gains.   

To address the above risks, optimize combinations of Bollinger parameters and test different stop loss/ profit capture threshold levels to select optimal settings.  

### Optimization Direction
1. Optimize Bollinger Bands input parameters to locate ideal combinations;
2. Examine various stop loss increment parameters to diminish chances of stops being run;   
3. Test assorted take profit multiplier values to capture greater possible gains.  

### Conclusion
This strategy has performed creditably in backtests by confirming overall trend using dual moving averages and relying on Bollinger Bands for specific entry signals. Additional performance improvements may be anticipated through continued parameter optimization and rule modifications. The stop loss/profit taking mechanism is also transferable to other systems for adaption.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|BB Length/Comprimento da Banda de Bollinger|
|v_input_float_1|0.38|BB Standard Deviation/Desvio Padrão da Banda de Bollinger|
|v_input_int_2|80|EMA Length/Comprimento da Média Móvel Exponencial|
|v_input_int_3|7|Highest High Length/Comprimento da Alta Maior|
|v_input_int_4|7|Lowest Low Length/Comprimento da Baixa Menor|
|v_input_float_2|1.6|Target Take Profit/Objetivo de Lucro Alvo|
|v_input_bool_1|true|Check Trend EMA/Verificar Tendência da Média Móvel Exponencial|
|v_input_bool_2|false|Add Another Crossover Check/Adicionar Mais uma Verificação de Cruzamento Superior|
|v_input_bool_3|false|Add Another Crossunder Check/Adicionar Mais uma Verificação de Cruzamento Inferior|
|v_input_bool_4|true|Show Inside Bar Pattern/Mostrar Padrão de Inside Bar|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-05 00:00:00
end: 2023-12-06 22:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This close code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © AugustoErni

//@version=5
strategy('Bollinger Bands Modified (Stormer)', overlay=true)

bbL                   = input.int(20, title='BB Length/Comprimento da Banda de Bollinger', minval=1, step=1, tooltip='Calculate the length of bollinger bands./Calcula o comprimento das bandas de bollinger.')
mult                  = input.float(0.38, title='BB Standard Deviation/Desvio Padrão da Banda de Bollinger', minval=0.01, step=0.01, tooltip='Calculate the standard deviation of bollinger bands./Calcula o desvio padrão das bandas de bollinger.')
emaL                  = input.int(80, title='EMA Length/Comprimento da Média Móvel Exponencial', minval=1, step=1, tooltip='Calculate the length of EMA./Calcula o comprimento da EMA.')
highestHighL          = input.int(7, title='Highest High Length/Comprimento da Alta Maior', minval=1, step=1, tooltip='Fetches the highest high candle from length input. Use to set stop loss for short position./Obtém a vela de maior alta com base na medida fornecida. Usa para definir o stop loss para uma posição curta.')
lowestLowL            = input.int(7, title='Lowest Low Length/Comprimento da Baixa Menor', minval=1, step=1, tooltip='Fetches the lowest low candle from length input. Use to set stop loss for long position./Obter a vela de menor baixa com base na medida fornecida. Usa para definir o stop loss para uma posição longa.')
targetFactor          = input.float(1.6, title='Target Take Profit/Objetivo de Lucro Alvo', minval=0.1, step=0.1, tooltip='Calculate the take profit factor when entry position./Calcula o fator do alvo lucro ao entrar na posição.')
emaTrend              = input.bool(true, title='Check Trend EMA/Verificar Tendência da Média Móvel Exponencial', tooltip='Use EMA as trend verify for opening position./Usa a EMA como verificação de tendência para abrir posição.')
crossoverCheck        = input.bool(false, title='Add Another Crossover Check/Adicionar Mais uma Verificação de Cruzamento Superior', tooltip='This option is to add one more veryfication attempt to check if price is crossover upper bollinger band./Esta opção é para adicionar uma verificação adicional para avaliar se o preço cruza a banda superior da banda de bollinger.')
crossunderCheck       = input.bool(false, title='Add Another Crossunder Check/Adicionar Mais uma Verificação de Cruzamento Inferior', tooltip='This option is to add one more veryfication attempt to check if price is crossunder lower bollinger band./Esta opção é para adicionar uma verificação adicional para avaliar se o preço cruza a banda inferior da banda de bollinger.')
insideBarPatternCheck = input.bool(true, title='Show Inside Bar Pattern/Mostrar Padrão de Inside Bar', tooltip='This option is to show possible inside bar pattern./Esta opção é para mostrar um possível padrão de inside bar.')

[middle, upper, lower] = ta.bb(close, bbL, mult)
ema                    = ta.ema(close, emaL)
highestHigh            = ta.highest(high, highestHighL)
lowestLow              = ta.lowest(low, lowestLowL)
isCrossover            = ta.crossover(close, upper) ? 1 : 0
isCrossunder           = ta.crossunder(close, lower) ? 1 : 0

isPrevBarHighGreaterCurBarHigh = high[1] > high ? 1 : 0
isPrevBarLowLesserCurBarLow    = low[1] < low ? 1 : 0
isInsideBar                    = isPrevBarHighGreaterCurBarHigh and isPrevBarLowLesserCurBarLow ? 1 : 0

isBarLong  = ((close - open) > 0) ? 1 : 0
isBarShort = ((close - open) < 0) ? 1 : 0

isLongCross  = crossoverCheck ? ((isBarLong and not isBarShort) and (open < upper and close > upper)) ? 1 : 0 : isCrossover ? 1 : 0
isShortCross = crossunderCheck ? ((isBarShort and not isBarLong) and (close < lower and open > lower)) ? 1 : 0 : isCrossunder ? 1 : 0

isCandleAboveEma = close > ema ? 1 : 0
isCandleBelowEma = close < ema ? 1 : 0

isLongCondition  = emaTrend ? isLongCross and isCandleAboveEma ? 1 : 0 : isLongCross
isShortCondition = emaTrend ? isShortCross and isCandleBelowEma ? 1 : 0 : isShortCross

isPositionNone  = strategy.position_size == 0 ? 1 : 0
isPositionLong  = strategy.position_size > 0 ? 1 : 0
isPositionShort = strategy.position_size < 0 ? 1 : 0

var float enterLong     = 0.0
var float stopLossLong  = 0.0
var float targetLong    = 0.0
var float enterShort    = 0.0
var float stopLossShort = 0.0
var float targetShort   = 0.0
var bool isLongEntry    = false
var bool isShortEntry   = false

if (isPositionNone)
    isLongEntry   := false
    isShortEntry  := false
    enterLong     := 0.0
    stopLossLong  := 0.0
    targetLong    := 0.0
    enterShort    := 0.0
    stopLossShort := 0.0
    targetShort   := 0.0
if (isPositionShort or isPositionNone)
    isLongEntry  := false
    enterLong    := 0.0
    stopLossLong := 0.0
    targetLong   := 0.0
if (isPositionLong or isPositionNone)
    isShortEntry  := false
    enterShort    := 0.0
    stopLossShort := 0.0
    targetShort   := 0.0
if (isPositionLong and isLongEntry)
    isLongEntry   := true
    isShortEntry  := false
    enterShort    := 0.0
    stopLossShort := 0.0
    targetShort   := 0.0
if (isPositionShort and isShortEntry)
    isShortEntry := true
    isLongEntry  := false
    enterLong    := 0.0
    stopLossLong := 0.0
    targetLong   := 0.0

if (isLongCondition and not isLongEntry)
    isLongEntry  := true
    enterLong    := close
    stopLossLong := lowestLow
    targetLong   := (enterLong + (math.abs(enterLong - stopLossLong) * targetFactor))
    alertMessage = '{ "side/lado": "buy", "entry/entrada": ' + str.tostring(enterLong) + ', "stop": ' + str.tostring(stopLossLong) + ', "target/alvo": ' + str.tostring(targetLong) + ' }'
    alert(alertMessage)
    strategy.entry('Long', strategy.long)
    strategy.exit('Exit Long', 'Long', stop=stopLossLong, limit=targetLong)

if (isShortCondition and not isShortEntry)
    isShortEntry  := true
    enterShort    := close
    stopLossShort := highestHigh
    targetShort   := (enterShort - (math.abs(enterShort - stopLossShort) * targetFactor))
    alertMessage = '{ "side/lado": "sell", "entry/entrada": ' + str.tostring(enterShort) + ', "stop": ' + str.tostring(stopLossShort) + ', "target/alvo": ' + str.tostring(targetShort) + ' }'
    alert(alertMessage)
    strategy.entry('Short', strategy.short)
    strategy.exit('Exit Short', 'Short', stop=stopLossShort, limit=targetShort)

plot(upper, title='Upper Band', color=color.blue)
plot(middle, title='Middle Band', color=color.gray)
plot(lower, title='Lower Band', color=color.blue)
plot(ema, title='EMA', color=color.white)

barcolor(insideBarPatternCheck and isInsideBar and isBarLong ? color.lime : insideBarPatternCheck and isInsideBar and isBarShort ? color.maroon : na, title='Inside Bar Color in Long Bar Long and in Short Bar Short/Cor do Inside Bar em Barra Longa Longa e em Barra Curta Curta')

tablePosition    = position.bottom_right
tableColumns     = 2
tableRows        = 5
tableFrameWidth  = 1
tableBorderColor = color.gray
tableBorderWidth = 1

tableInfoTrade = table.new(position=tablePosition, columns=tableColumns, rows=tableRows, frame_width=tableFrameWidth, border_color=tableBorderColor, border_width=tableBorderWidth)

table.cell(table_id=tableInfoTrade, column=0, row=0)
table.cell(table_id=tableInfoTrade, column=1, row=0)

table.cell(table_id=tableInfoTrade, column=0, row=1, text='Entry Side/Lado da Entrada', text_color=color.white)
table.cell(table_id=tableInfoTrade, column=0, row=2, text=isLongEntry ? 'LONG' : isShortEntry ? 'SHORT' : 'NONE/NENHUM', text_color=color.yellow)

table.cell(table_id=tableInfoTrade, column=1, row=1, text='Entry Price/Preço da Entrada', text_color=color.white)
table.cell(table_id=tableInfoTrade, column=1, row=2, text=isLongEntry ? str.tostring(enterLong) : isShortEntry ? str.tostring(enterShort) : 'NONE/NENHUM', text_color=color.blue)

table.cell(table_id=tableInfoTrade, column=0, row=3, text='Take Profit Price/Preço Alvo Lucro', text_color=color.white)
table.cell(table_id=tableInfoTrade, column=0, row=4, text=isLongEntry ? str.tostring(targetLong) : isShortEntry ? str.tostring(targetShort) : 'NONE/NENHUM', text_color=color.green)

table.cell(table_id=tableInfoTrade, column=1, row=3, text='Stop Loss Price/Preço Stop Loss', text_color=color.white)
table.cell(table_id=tableInfoTrade, column=1, row=4, text=isLongEntry ? str.tostring(stopLossLong) : isShortEntry ? str.tostring(stopLossShort) : 'NONE/NENHUM', text_color=color.red)
```

> Detail

https://www.fmz.com/strategy/435248

> Last Modified

2023-12-13 15:28:50
