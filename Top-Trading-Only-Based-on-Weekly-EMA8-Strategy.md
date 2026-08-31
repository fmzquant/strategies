
> Name

Top-Trading-Only-Based-on-Weekly-EMA8-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/192e69c46a4838aa184.png)

## Overview

This strategy is an adaptation of the EMA8 setup from famous Brazilian crypto YouTuber Augusto Backes. It aims to make high probability trades with good risk-reward ratio by utilizing the support of weekly EMA8 and entering at specific price patterns.

## Strategy Logic  

- It runs on daily timeframe and uses weekly EMA8 as support and trend filter
- Buy signal triggers when daily candle closes above weekly EMA8 with bullish price patterns like engulfing, hammer or closing price reversal
- Sell signal triggers when daily candle closes below weekly EMA8 with bearish patterns like engulfing, shooting star or high wave candle
- Entries and exits execute on candle close with no stops. 100% position sizing

The strategy efficiently utilizes EMA as support and reasonably controls trade frequency to capture reliable breakouts in major trends for a high risk-reward profile.

## Advantage Analysis

- Increase reliability by using EMAs to gauge major trends and support
- Only trade around key levels to improve win rate and avoid unnecessary trades  
- Precise trade location and clear signals mean excellent risk-reward ratio
- Suitable for swing traders. Low maintenance needed

## Risk Analysis  

- Full position sizing risks large losses in extreme moves
- Relatively few trades require strong psychology and sufficient capital
- Limited profit potential compared to trend following strategies

Improvements:

- Add position sizing module based on volatility or capital 
- Implement stop loss to further limit loss in single trades
- Find better trade filters and exit conditions to increase win rate  

## Conclusion  

In summary, this is a very practical swing trading strategy. It utilizes key technical indicators to identify reliable opportunities in major trends. The logic is simple and easy to implement for mid-to-long term traders. With proper position sizing and risk management, it can achieve fantastic returns over time.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|(?SETUP MÉDIA DE 8)Tipo de Média: EMA|SMA|
|v_input_2|8|Comprimento|
|v_input_3|true|Habilitar Sinal Raro|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-14 00:00:00
end: 2023-12-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Valente_F

//@version=4
strategy("Só Trade Top - Média de 8 - Augusto Backes", overlay=true, max_bars_back = 5000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, initial_capital = 10000, commission_type = strategy.commission.percent, process_orders_on_close = true)

tipo_media = input(title="Tipo de Média", defval="EMA", options=["SMA", "EMA"],inline = "3",  group = "SETUP MÉDIA DE 8", tooltip = "Média utilizada para os cálculos do Setup")
c_media = input(defval = 8, title = "Comprimento", type = input.integer,inline = "3",  group = "SETUP MÉDIA DE 8")

cb_raro = input(true, title="Habilitar Sinal Raro", group = "SETUP MÉDIA DE 8", tooltip = "Sinais normais são caracterizados por Engolfos, Martelos e Preço de Fechamento de Reversão com FECHAMENTO acima da Média de 8. Sinais Raros são caracterizados pelas mesmas figuras, mas com FECHAMENTO e ABERTURA acima da média de 8. O mesmo vale para sinais de venda.")


media8 = tipo_media == "SMA" ? security(syminfo.tickerid, "1W", sma(close[1], c_media)) : security(syminfo.tickerid, "1W", ema(close[1], c_media))

plot(media8, title = "Média", color = color.green, linewidth = 2)

lookback_swing=5

candle_engolfo = (close > open and close[1] < open[1] and close >= open[1] and open <= close[1] ) and close>media8
candle_martelo = 2*abs(close-open) < (min(close, open)-low) and (high - max(close, open)) < abs(close-open) and close>open and close>media8
candle_fr = low < low[1] and low < low[2] and close > close[1] and close > open  and close>media8

compra = (candle_engolfo or candle_martelo or candle_fr) 

vcandle_engolfo = (close < open and close[1] > open[1] and close <= open[1] and open >= close[1]) and close<media8
vcandle_martelo = 2*abs(close-open) < (high-max(close, open)) and (min(close, open)-low) < abs(close-open) and close<open  and close<media8
vcandle_fr = high > high[1] and high > high[2] and close < close[1] and close < open  and close<media8

venda = (vcandle_engolfo or vcandle_martelo or vcandle_fr) 

if cb_raro
    compra := compra and open > media8
    venda := venda and open <media8
else
    compra := compra
    venda := venda

barcolor(compra and strategy.position_size==0?color.green:venda and strategy.position_size>0?color.red : color.new(color.black, 100))

plotshape(compra and candle_engolfo and strategy.position_size==0, title = "Engolfo de Alta", style = shape.labeldown, color = color.green, text = "Engolfo de Alta", textcolor = color.white)
plotshape(compra and candle_martelo and strategy.position_size==0, title = "Martelo de Alta", style = shape.labeldown, color = color.green, text = "Martelo de Alta", textcolor = color.white)
plotshape(compra and candle_fr and strategy.position_size==0, title = "PFR de Alta", style = shape.labeldown, color = color.green, text = "PFR de Alta", textcolor = color.white)


plotshape(venda and vcandle_engolfo and strategy.position_size>0, title = "Engolfo de Baixa", style = shape.labelup, location =  location.belowbar, color = color.red, text = "Engolfo de Baixa", textcolor = color.white)
plotshape(venda and vcandle_martelo and strategy.position_size>0, title = "Martelo de Baixa", style = shape.labelup, location =  location.belowbar, color = color.red, text = "Martelo de Baixa", textcolor = color.white)
plotshape(venda and vcandle_fr and strategy.position_size>0, title = "PFR de Baixa", style = shape.labelup, location =  location.belowbar, color = color.red, text = "PFR de Baixa", textcolor = color.white)


strategy.entry("Compra", true, when = compra)

strategy.close("Compra", when = venda)

```

> Detail

https://www.fmz.com/strategy/436105

> Last Modified

2023-12-21 11:52:04
