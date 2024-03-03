
> Name

停顿回转策略Turnaround-After-Consolidation-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/bb10819e9afe328d83.png)
[trans]


## 概述

该策略的主要思想是在股票价格出现明显的短期停顿之后,再根据“停顿”阶段形成的盘整态势判断价格可能的下一步走向,从而采取相应的做多做空操作。

## 策略原理

1. 策略使用Stochastic oscillator指标判断股价是否进入了盘整,Stochastic oscillator在超买或超卖区域震荡时,表示股价进入盘整。 

2. 在Stochastic oscillator指标震荡时,根据K线实体方向来判断趋势转折点。当K线从阴转阳时判断为盘整结束,做多;当K线从阳转阴时判断为盘整结束,做空。

3. 做多做空后的止盈止损根据入场点来设置,采用移动止盈止损。

4. 该策略同时支持全仓操作和分仓操作。全仓时设置固定止盈止损点;分仓时设置移动止盈止损点。

5. 该策略还设置了每天交易时间,只在设置的时间段内交易。

## 优势分析

1. 利用Stochastic oscillator指标判断股价震荡状态,可准确判断出股价的短期盘整。

2. 在震荡后的K线转折点进行操作,可提高操作准确性。

3. 采用移动止盈止损,可根据股价行情进行止损点 trailing,可锁定更多获利。

4. 支持全仓和分仓操作,可根据自己的风险偏好选择合适的操作方式。

5. 设置了交易时间,可避免在股价异常波动时段进行错误操作。

## 风险分析

1. Stochastic oscillator指标发出假信号的概率较大,可能错过买点卖点或者乱入。

2. K线转折点判断不准确,可能在非转折点进行操作。

3. 移动止损点随股价波动,可能被突破止损。

4. 分仓操作风险较大,股价反转可能造成Loss扩大。

5. 需要调整止损点和移动幅度,以适应不同股票的特点。

6. 需要规避重大事件带来的股价异常波动对策略的影响。

## 优化方向

1. 优化Stochastic oscillator的参数,使其更准确地识别出盘整区间。

2. 结合其他指标确认K线转折信号,提高操作准确性。

3. 优化移动止损算法,使止损点能更好跟踪股价。 

4. 添加仓位控制,避免单只股票输得太多。

5. 结合重大事件发布时间,避开股价异常波动时段。

6. 优化分仓模式,追踪更大的行情趋势。

## 总结

停顿回转策略利用Stochastic oscillator指标识别短线盘整,在震荡后的价格转折点进行操作。该策略具有较高的胜率,可锁定趋势中的获利。但Stochastic oscillator存在发出假信号的可能,操作准确性有待进一步提高。通过优化指标参数,添加过滤条件等方式可降低错误信号率。此外,优化止损算法和仓位控制,并规避重大事件影响,也是该策略需要重点优化的方向。总体来说,停顿回转策略具有一定的参考价值,但实盘中需要根据自己的交易方式进行适当调整和优化,以控制风险。

||


## Overview

The main idea of this strategy is to detect obvious short-term consolidation in stock price movements, and then judge the likely next direction based on the consolidation pattern formed during the "consolidation" phase, so as to take corresponding long or short positions.

## Strategy Logic

1. The strategy uses the Stochastic oscillator indicator to determine if the stock price has entered consolidation. Oscillation of Stochastic oscillator in overbought or oversold zones indicates price consolidation.

2. When Stochastic oscillator oscillates, candlestick directional changes are used to detect trend reversal points. A candle change from black to white signals consolidation end and go long. A change from white to black signals consolidation end and go short.

3. Profit targets and stop loss after entry are set dynamically based on entry price using trailing stops. Fixed profit/loss used for full position, trailing stops used for partial position.

4. The strategy supports both full and partial position trading. Fixed points used for full position, trailing stops used for partial position.

5. Trading hours are also configured in the strategy. Trades only allowed during set hours.

## Advantage Analysis

1. Stochastic oscillator accurately identifies short-term price consolidation.

2. Trading at reversal points after consolidation improves accuracy. 

3. Trailing stops lock in profits as price moves favorably.

4. Supports full and partial position trading based on risk preference.

5. Trading hours avoid wrong trades during volatile periods.

## Risk Analysis

1. Stochastic oscillator prone to false signals, missing entries or giving premature entries.

2. Candlestick reversals may not be accurate for detecting trend changes. 

3. Trailing stops subject to being hit by price whipsaws.

4. Higher risk with partial position trading, losses could magnify on reversals.

5. Stop loss and trailing stop parameters need tuning for different instruments. 

6. Major events can affect strategy performance.

## Enhancement Opportunities

1. Optimize Stochastic oscillator parameters for better consolidation detection.

2. Add filters to confirm candlestick signals, improving accuracy.

3. Enhance trailing stop algorithms for better tracking.

4. Add position sizing rules to limit losses in single stocks.

5. Avoid major event driven volatility by incorporating event schedule. 

6. Improve partial position model to better capture trends.

## Conclusion

The turnaround after consolidation strategy identifies short-term consolidation using Stochastic oscillator and trades at trend reversal points after the consolidation phase. It has a decent winning rate and allows locking in segment profits in trends. However, Stochastic is prone to false signals. Accuracy can be improved by optimizing parameters, adding filters etc. In addition, optimizing the trailing stops, controlling position sizing, and avoiding event risks are areas that require focus. Overall, this strategy provides a reference model but needs tuning and risk control for live trading based on individual trading style.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|2022|Ano|
|v_input_int_2|true|Mes|
|v_input_int_3|true|Dia|
|v_input_int_4|true|hora|
|v_input_int_5|false|minuto|
|v_input_int_6|10|hora Inicio Operacao Robo|
|v_input_int_7|40|Minuto Encerra Tudo|
|v_input_int_8|17|hora Fechamento|
|v_input_int_9|50|Minuto Encerra Novas Operacoes|
|v_input_int_10|50|Minuto Encerra Tudo|
|v_input_int_11|90|Estocastico Alvo - Para Short|
|v_input_int_12|10|Estocastico Alvo - Para Buy |
|v_input_1|true|Parcial ? |
|v_input_int_13|150|Pontos para Gain |
|v_input_int_14|150|Pontos para Loss|
|v_input_int_15|50|Pontos para Parcial |


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-27 00:00:00
end: 2023-11-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('Cross', overlay=true, initial_capital=1000 )

// Creditos : Cleber.martinelli
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

ano = input.int(2022, minval=1, title="Ano")
mes = input.int(1, minval=1, maxval=12, title="Mes")
dia = input.int(1, minval=1, maxval=31, title="Dia")
hora = input.int(1, minval=1, maxval=23, title="hora")
minuto = input.int(0, minval=0, maxval=59, title="minuto")
horaabertura = input.int(10, minval=1, maxval=23, title="hora Inicio Operacao Robo")
minutoabertura = input.int(40, minval=1, maxval=59, title="Minuto Encerra Tudo")
horaencerra = input.int(17, minval=1, maxval=23, title="hora Fechamento")
minutoencerra = input.int(50, minval=1, maxval=59, title="Minuto Encerra Novas Operacoes")
minutofinaliza = input.int(50, minval=1, maxval=59, title="Minuto Encerra Tudo")

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
//                 Codigo Operacional                 //
//                                                    //
//                                                    //
////////////////////////////////////////////////////////

// Inputs da Estratégia
pmax = input.int(90, minval=0, maxval=100, title="Estocastico Alvo - Para Short")
pmin = input.int(10, minval=0, maxval=100, title="Estocastico Alvo - Para Buy ")

parcial = input(title="Parcial ? ", defval=true)
p_gain = input.int(150, minval=0, maxval=1000, title="Pontos para Gain ")
p_loss = input.int(150, minval=0, maxval=1000, title="Pontos para Loss")
p_parcial = input.int(50, minval=0, maxval=100, title="Pontos para Parcial ")

// puxando os indicadores que usaremos 
estoc = ta.stoch(close,high,low,5)

if (estoc >=pmax and close < open)
    strategy.entry("Vende", strategy.short ,qty = 2)


if (estoc <=pmax and close > open)
    strategy.entry("Compra", strategy.long ,qty  =  2 )


pm_ativo = strategy.opentrades.entry_price(0)

if strategy.position_size > 0 and parcial// Posicionado na compra 
    if strategy.position_size == 2 // Mão cheia
        if close < pm_ativo - 100
            strategy.exit("Fecha Compra", "Compra", loss=p_loss , qty  =  2 )
        if close > pm_ativo + 50
            strategy.exit("Fecha Compra", "Compra", profit=p_gain , qty  =  1 )
    if strategy.position_size == 1// Mão cheia
        if close < pm_ativo 
            strategy.exit("Fecha Compra", "Compra", loss=0 , qty  =  1 )
        if close > pm_ativo + 100
            strategy.exit("Fecha Compra", "Compra", profit= p_gain * 1.5 , qty  =  1 )    
    
if strategy.position_size < 0 and parcial // Posicionado na Venda 
    if strategy.position_size == -2 // Mão cheia
        if close > pm_ativo - 100
            strategy.exit("Fecha Venda", "Vende", loss=p_loss , qty  =  2 )
        if close < pm_ativo + 50
            strategy.exit("Fecha Venda", "Vende", profit=p_gain , qty  =  1 )
    if strategy.position_size == -1// Mão cheia
        if close > pm_ativo 
            strategy.exit("Fecha Venda", "Vende", loss=0 , qty  =  1 )
        if close < pm_ativo + 100
            strategy.exit("Fecha Venda", "Vende", profit=p_gain*1.5 , qty  =  1 )    
    
if strategy.position_size > 0 and parcial == false // Sem Parcial 
    strategy.exit("Fecha Compra", "Compra", loss=p_loss , profit = p_gain , qty  =  2 )
if strategy.position_size < 0 and parcial == false // Sem Parcial 
    strategy.exit("Fecha Venda", "Vende", loss=p_loss , profit = p_gain , qty  =  2 )




















```

> Detail

https://www.fmz.com/strategy/431018

> Last Modified

2023-11-03 17:26:53
