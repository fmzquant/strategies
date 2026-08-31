
> Name

RSI-Reversal-Breakout-Strategy-428698

> Author

ChaoZhang

> Strategy Description



## Overview

The RSI Reversal Breakout Strategy is a strategy that identifies overbought and oversold situations using the RSI indicator and takes counter-trend trades when prices break the moving average. This strategy combines trend and overbought/oversold indicators to enter trades when reversal signals appear, aiming to capture short-term reversal opportunities in stock prices.

## Strategy Logic

The strategy is mainly based on the following logic:

1. Use RSI(2) to judge if prices are overbought or oversold. RSI below 25 is considered oversold; RSI above 80 is considered overbought. 

2. Use 200-day EMA to determine the overall trend direction. Prices breaking above EMA is considered an uptrend signal, and breaking below EMA a downtrend signal.

3. When RSI shows oversold signal and price breaks above EMA, go long for an uptrend. This is a typical reversal signal, indicating prices bounce back from oversold zone. 

4. When RSI shows overbought signal and price breaks below EMA, go short for a downtrend. Also a reversal signal, indicating prices start to pull back from overbought zone.

5. By trading reversals, we hope to catch the beginning of a new trend before it starts. 

Specifically, the entry rule is to go long when RSI < 25 and price breaks out above the upper band; go short when RSI > 80 and price breaks down the lower band. Exits when the highest price of the day breaks below the highest price of previous day.

## Advantages

The RSI Reversal Breakout Strategy has the following pros:

1. Catching reversal chances: Identifying overbought/oversold with RSI allows catching price reversals, which is key for generating alpha.

2. Trading with trends: Integrating EMA ensures trades align with major trends. Reversals are only considered when consistent with big trend. 

3. Risk control: Reversal trades limit position holding period, controlling risks.

4. Flexible parameters: RSI period and EMA period can be adjusted for market regime changes, improving adaptability. 

5. Appropriate trade frequency: Reversal signals occur at moderate frequencies, avoiding overtrading while remaining active.

6. Simplicity: The rules are straightforward and easy to implement in live trading.

## Risks and Management 

The strategy also has the following risks:

1. Failed reversal risk: Prices may resume the original trend after reversal signal, leading to losses. Can use stop loss to control downside.

2. Unclear trend risk: EMA doesn't work well when there is no clear trend. Can avoid reversals when trend is unclear.

3. Optimization risk: RSI and EMA parameters have big impact on performance. Must extensively test different values to find optimal.

4. Overfitting risk: Performance chasing during optimization may lead to overfitting. Robustness check needed to avoid overoptimization. 

5. Overtrading risk: Too frequent reversal signals lead to excessive trading. Can adjust RSI period to limit trade frequency.

## Enhancements

The strategy can be further improved in the following aspects:

1. Evaluate stock quality: Apply strategy only to high quality stocks based on fundamentals.

2. Incorporate other indicators: Add MACD, KD etc. to confirm reversal signals and improve reliability. 

3. Dynamic parameter adjustment: Adapt RSI and EMA parameters dynamically based on changing market conditions.

4. Optimize entry timing: Fine tune entry rules to wait for reversal confirmation. 

5. Profit taking strategy: Set proper profit taking levels to avoid giving back gains.

6. Consider transaction costs: Assess impact of slippage and commissions.

7. Consider volatility: Focus only on high volatility stocks to make strategy more robust.

## Conclusion

The RSI Reversal Breakout Strategy combines trend and reversal signals to catch early reversals and major opportunities. The moderate trading frequency helps risk control. Proper optimizations on entry timing, profit taking, and parameter selections can further enhance performance. With sound optimizations, this strategy can be an effective quantitative trading approach.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|25|Valor minimo de entrada|
|v_input_2|true|Quantidade de ações|
|v_input_3|true|Inicio Dia|
|v_input_4|true|Inicio Mes|
|v_input_5|2018|Inicio Ano|
|v_input_6|true|Final Dia|
|v_input_7|12|Final Mes|
|v_input_8|2020|Final Ano|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-01 00:00:00
end: 2023-10-07 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © jocker.soad

//@version=4
// strategy("My Script", overlay=true, initial_capital=10000, default_qty_value=100)
min = input(title="Valor minimo de entrada", defval=25)
qtdAtivos = input(title="Quantidade de ações", defval=1)

// overBuyLine = hline(80)
// overSellLine = hline(min)

var comprado = false
var valorComprado = 0.0
var qtdDiasComprado = 0
var valorLucro = 0.0

valueRsi = rsi(close, 2)
valueSma = sma(close, 200)
valueEma = ema(close, 200)
lastHighPrice = high[2]

buyValidation = valueRsi <= min
sellValidation = close >= lastHighPrice



// plot(lastHighPrice, trackprice=true, offset=-99999, color=color.olive, linewidth=3, style=plot.style_area)
// plot(valueRsi)
// plot(valueSma)
// plot(valueEma)
// plotshape(sellValidation, style=shape.triangledown, color=color.blue)
// plotshape(comprado, style=shape.triangledown, color=color.blue)

startDate = input(title="Inicio Dia", type=input.integer, defval=1, minval=1, maxval=31)
startMonth = input(title="Inicio Mes", type=input.integer, defval=1, minval=1, maxval=12)
startYear = input(title="Inicio Ano", type=input.integer, defval=2018, minval=1800, maxval=2100)

endDate = input(title="Final Dia", type=input.integer, defval=1, minval=1, maxval=31)
endMonth = input(title="Final Mes", type=input.integer, defval=12, minval=1, maxval=12)
endYear = input(title="Final Ano", type=input.integer,  defval=2020, minval=1800, maxval=2100)

inDateRange = true

if inDateRange

    if close >= valueEma
    
        if comprado == false and buyValidation
            qtdDiasComprado := 0
            comprado := true
            valorComprado := close
            strategy.order("buy", true, qtdAtivos, when=buyValidation)
        
        if sellValidation and comprado == true
            comprado := false
            valorLucro := valorLucro + (close - valorComprado)
            valorComprado := 0
            strategy.order("sell", false, qtdAtivos, when=sellValidation)
        
        if comprado == true and sellValidation == false
            qtdDiasComprado := qtdDiasComprado + 1

// plot(valorLucro, color=color.lime)



```

> Detail

https://www.fmz.com/strategy/428698

> Last Modified

2023-10-08 14:16:57
