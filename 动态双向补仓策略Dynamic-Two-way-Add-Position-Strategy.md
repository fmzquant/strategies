
> Name

动态双向补仓策略Dynamic-Two-way-Add-Position-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1abfd153e9734c9d086.png)
[trans]


## 概述

这是一个利用市场两方向强势突破信号进行双向开仓的策略。它会在出现同向两个强势K线后选择方向开仓,然后设置止盈止损,进行风险管理。

## 策略原理

该策略基于两个强势K线信号判断市场方向。具体来说,它会计算每个K线的涨跌幅,当连续两个K线的涨跌幅都超过用户设定的门槛后(如6%),则判断该方向为强势方向,在第三根K线开仓做多/空。  

做多条件:连续两根K线收盘价较上一日收盘价涨幅超过6%
做空条件:连续两根K线收盘价较上一日收盘价跌幅超过6%  

开仓后会设定止盈止损距离来控制风险。止盈距离由用户输入,止损距离是开仓价格的一定倍数(如8倍)。

该策略还具有一些辅助功能来控制风险,如只在特定时间段开仓,设定最大亏损金额等。

## 优势分析

这是一个较为稳定可靠的双向交易策略。主要优势有:

1. 利用双向交易,可以在市场上升和下跌时都获得收益,增加稳定性。

2. 基于两个强势信号判断趋势,可以有效过滤噪音,进入的仓位质量较高。

3. 止盈止损设置合理,有利于风险控制,亏损有限。

4. 辅助功能比较完善,如时间控制、最大亏损控制等,可以很好控制风险。

5. 易于实盘验证和优化,策略逻辑简单清晰。

## 风险分析

该策略主要风险有:  

1. 市场震荡时,容易出现 stopwords 损失。可以适当调整第一个信号判断参数,确保信号质量。

2. 遇到三根超强势K线的概率较小,开仓机会可能较少。可以适当调低参数,但需要权衡信号质量。 

3. 突发事件带来的非理性行为可能导致超出止损距离的大幅亏损。这需要辅助的最大亏损额度控制来解决。

4. 双向交易在具体实施时,要注意资金管理问题。如果资金分配不均可能导致账户只盈不亏。

## 优化方向  

该策略可以从以下几个方面进一步优化:

1. 优化第一个信号的判断逻辑,提高信号质量。可以考虑加入更多因素,如交易量变化、波动率等。

2. 优化止盈止损标准。可以根据不同市场调整参数,使盈亏比更合理。止损距离也可以设置为动态止损。

3. 加入更多风险控制模块。例如最大单日亏损、最大连续亏损等。保证资金安全高效使用。

4. 对资金使用比例进行优化。使多空交易资金分配更加合理,防止只赚不赔。

5. 针对不同交易品种设定不同参数组合进行回测优化,提高适应性。

## 总结  

本策略是一个较为稳健的双向补仓策略。它信号质量较高,具有一定的风险控制能力。优化空间也较大,可进一步提升收益稳定性。该策略适合中长线趋势市,也可在震荡行情中夺取机会。

||

## Overview

This is a strategy that takes positions in both directions by using signals of strong breakthroughs in both directions. It will choose a direction to open positions after two consecutive strong candlesticks appear in the same direction, then set stop profit and stop loss for risk management. 

## Strategy Principle  

This strategy judges market direction based on the signals of two consecutive strong candlesticks. Specifically, it calculates the increase/decrease percentage of each candlestick. When the increase/decrease percentage of two consecutive candlesticks both exceed the threshold set by user (such as 6%), it determines that the direction is strong, and opens long/short position in the third candlestick.

Long condition: The close prices of two consecutive candlesticks rise over 6% compared to previous close price  

Short condition: The close prices of two consecutive candlesticks fall over 6% compared to previous close price

After opening positions, it will set stop profit and stop loss distances to control risks. The stop profit distance is input by user, and the stop loss distance is a multiple (such as 8 times) of the opening price.  

This strategy also has some auxiliary functions to control risks, such as only allowing to open positions during specific time periods, setting maximum loss amount, etc.

## Advantage Analysis  

This is a relatively stable and reliable dual-direction trading strategy. The main advantages are:

1. Dual-direction trading can obtain profits when market goes up and down, improving stability.  

2. Judging the trend based on two strong signals can effectively filter out noises and improve quality of opened positions.

3. The settings of stop profit and stop loss are reasonable, which is beneficial for risk control and limits losses.  

4. The auxiliary functions are comprehensive, such as time control, maximum loss control, etc. They can control risks very well.

5. It is easy to backtest and optimize this strategy as the logic is simple and clear.

## Risk Analysis

The main risks of this strategy are:

1. It is prone to suffering stop loss during market consolidation. We can properly adjust the parameter of first signal to ensure signal quality.

2. The probability of three consecutive super strong candlesticks is relatively small, which may lead to fewer opportunities to open positions. We can reduce the parameter appropriately but need to balance the signal quality. 

3. Irrational behaviors caused by sudden events may lead to huge losses exceeding the stop loss distance. We need to set maximum loss amount to solve this problem.

4. For the implementation of dual-direction trading, we need to pay attention to the fund allocation problems, otherwise it may lead to making profits without stop losses.  

## Optimization Directions   

This strategy can be further optimized in the following aspects:

1. Optimize the logic of first signal judgment to improve signal quality. More factors can be considered such as change of transaction volume, volatility rate etc.

2. Optimize standards of stop profit and stop loss. Adjust parameters based on different markets to make risk-reward ratio more reasonable. Stop loss distance can also be set as dynamic stop loss.

3. Add more risk control modules. For example, maximum daily loss, maximum consecutive loss etc. To ensure efficient and safe use of funds.

4. Optimize allocation ratio of funds, to make the capital allocation of dual-direction trading more reasonable, preventing making profits without stop losses. 

5. Set different parameter combinations for backtesting optimization towards different trading varieties, to improve adaptability.  

## Summary   

This strategy is a relatively robust dual-direction add position strategy. It has high signal quality and certain risk control capabilities. It also has large room for optimization to further improve profit stability. The strategy is suitable for mid-long term trending markets, and it can also seize opportunities during market consolidations.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6|Sinal|
|v_input_2|10000|Sinal|
|v_input_3|2021|Ano|
|v_input_4|true|Mes|
|v_input_5|true|Dia|
|v_input_6|false|hora|
|v_input_7|false|minuto|
|v_input_8|10|hora Inicio Operacao Robo|
|v_input_9|40|Minuto Encerra Tudo|
|v_input_10|17|hora Fechamento|
|v_input_11|50|Minuto Encerra Novas Operacoes|
|v_input_12|50|Minuto Encerra Tudo|
|v_input_13|150000|Meta de Lucro|
|v_input_14|5|Contratos|
|v_input_15|3|Gain|
|v_input_16|8|Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-20 00:00:00
end: 2023-11-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy(title="GAVAD", shorttitle="GAVAD", overlay=false, initial_capital=36000)

////////////////////////////////////////////////////////
//                                                    //
//                                                    //
//                     GAVAD %                        //
//                                                    //
//                                                    //
////////////////////////////////////////////////////////
Sinal = input(6, title="Sinal", type=input.integer, minval=1, maxval=150)
//Objetivo = input(6, title="Objetivo", type=input.integer, minval=1, maxval=100)
Multip = input(10000, title="Sinal", type=input.integer, minval=1, maxval=100000)



//GavadEntrada1 = (close - low [1])/close[1]
//plot(GavadEntrada1, style=plot.style_line, linewidth=3, color=color.yellow)

//sombra
//DownOL = (low - open ) / open * -10000
//plot(DownOL, style=plot.style_area, linewidth=3, color=color.silver)


// imprime o GAVAD
GavadEntrada = (close - close [1])/close[1] * Multip
plot(GavadEntrada, style=plot.style_histogram, linewidth=3, color=color.purple)

//linha do Sinal
plot(Sinal, style=plot.style_line, linewidth=1, color=color.yellow)
//linha do Objetivo
//plot(Objetivo, style=plot.style_line, linewidth=1, color=color.white)

Fura1 = GavadEntrada [0] >= Sinal
Fura2 = GavadEntrada [1] >= Sinal

Alert = Fura1
plotshape(Alert, style=shape.circle,  location = location.top, color= color.yellow)

SinalON = Fura1 and Fura2
plotshape(SinalON, style=shape.circle,  location = location.bottom, color= color.green)



////////////////////////////////////////////////////////
//                                                    //
//                                                    //
//              CONDIÇÕES DE OPERACAO                 //
//                                                    //
//                                                    //
////////////////////////////////////////////////////////



Sell_Forte2 = SinalON
//plotshape(Sell_Forte2, style=shape.xcross, color=color.yellow, location=location.bottom)

//Call_Forte2 = SinalON
//plotshape(Call_Forte2, style=shape.xcross, color=color.yellow, location=location.top)


////////////////////////////////////////////////////////
//                                                    //
//                                                    //
//                    CALENDARIO                      //
//                                                    //
//                                                    //
////////////////////////////////////////////////////////

//052)
// trading view solicita que se ja informado data para gerar backtest a partir de tal data
//começa backtest do trading sistem em qual data ?

ano = input(2021, minval=1, title="Ano")
mes = input(1, minval=1, maxval=12, title="Mes")
dia = input(1, minval=1, maxval=30, title="Dia")
hora = input(0, minval=1, maxval=23, title="hora")
minuto = input(0, minval=1, maxval=59, title="minuto")
horaabertura = input(10, minval=1, maxval=23, title="hora Inicio Operacao Robo")
minutoabertura = input(40, minval=1, maxval=59, title="Minuto Encerra Tudo")
horaencerra = input(17, minval=1, maxval=23, title="hora Fechamento")
minutoencerra = input(50, minval=1, maxval=59, title="Minuto Encerra Novas Operacoes")
minutofinaliza = input(50, minval=1, maxval=59, title="Minuto Encerra Tudo")


//valida se o dia de hoje é posterior ao dia informado acima
Validadia = year >= ano and month >= mes and dayofmonth >= dia


//cria horario de abertura de negociaçao, considerar default 10 hs, pois os indicadores ja estarão corrigidos
abreloja = year >= ano and month >= mes and dayofmonth >= dia and hour >= horaabertura
//and minute >= minutoabertura)


//cria horario de fechamento de todas as negociaçoes, considerar default 17:00 hs
//nenhuma ordem pode ser aberta depois dessa data e as abertas devem ser fechadas
fechaloja = year >= ano and month >= mes and dayofmonth >= dia and hour >= horaencerra
//and minute >= minutoencerra)

fechaloja2 = year >= ano and month >= mes and dayofmonth >= dia and hour >= horaencerra
//and minute >= minutofinaliza)


//valida horario de negociação, pra liberar as operacoes.
lojaaberta = abreloja == true and fechaloja == false and fechaloja2 == false


////////////////////////////////////////////////////////
//                                                    //
//                                                    //
//             GERENCIAMENTO DE RISCO                 //
//                                                    //
//                                                    //
////////////////////////////////////////////////////////

//seta meta mensal
meta = input(150000, "Meta de Lucro")
Contratos= input(5, "Contratos")

//seta tamanho do lote (ordem inicial-unica)
tamanhodolote = Contratos

//seta stop gain final em pontos (metade da barra anterior)
//gaintotal = input(30, "Gain")
gaintotal = input(3, "Gain")

//seta stop loss final em pontos
lossmaximo = input(8, "Loss")
//lossmaximo = (open- close)*100

////////////////////////////////////////////////////////
//                                                    //
//                     Checkbox                       //
//                                                    //
////////////////////////////////////////////////////////

//ativacomprasretorno = input(title="Ativar Compras Retorno", type=input.bool , defval=true)
//ativavendasretorno = input(title="Ativar Vendas Retorno", type=input.bool , defval=true)


////////////////////////////////////////////////////////
//                                                    //
//                                                    //
//                  COMPRA E VENDA                    //
//                                                    //
//                                                    //
////////////////////////////////////////////////////////

Tradenumber = strategy.closedtrades + 1
Batemeta = strategy.netprofit < meta

//COMPRA RETORNO
//longcondition2 = Validadia and Call_Forte2 and Batemeta


//strategy.entry("Comprar", strategy.long, tamanhodolote, when=longcondition2, comment="[Oper=" + tostring(Tradenumber) + "]win=" + tostring(strategy.wintrades) + " | Loss=" + tostring(strategy.losstrades))
//strategy.exit("Saida Compra", "Comprar", profit=gaintotal, loss=lossmaximo)
//if (CruzamentoFechaCallGG)
    //strategy.close(id="Comprar")
//if (EscapeFechaCall)
  // strategy.close(id="Comprar")   
   
    
//plotchar(longcondition2, char="C", location=location.bottom, color=color.lime, transp=0)
//alertcondition(longcondition2, "Comprar", "Compra Rápida!")

//VENDA RETORNO
Shortcondition2 = Validadia and Sell_Forte2 and Batemeta

strategy.entry("Vender", strategy.short, tamanhodolote, when=Shortcondition2)
strategy.exit("Fecha Venda", "Vender", profit=gaintotal, loss=lossmaximo)
//if (CruzamentoFechaSellGG)
   // strategy.close(id="Vender")
//if (EscapeFechaSell)
   // strategy.close(id="Comprar")  
//plotchar(CruzamentoFechaSellGG, char="Y", location=location.top, color=color.lime, transp=0) 

//plotchar(longcondition2, char="S", location=location.bottom, color=color.lime, transp=0)
//alertcondition(longcondition2, "Vender", "Venda Rápida!")

//fim do codigo
```

> Detail

https://www.fmz.com/strategy/433400

> Last Modified

2023-11-27 11:33:11
