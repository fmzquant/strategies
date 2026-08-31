
> Name

MACD-RSI-Combo-Trend-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy combines the MACD and RSI indicators to determine trend direction and overbought/oversold levels for trend trading. It goes long/short when MACD crosses zero line and RSI is beyond overbought/oversold thresholds.

## Strategy Logic

Main logic:

- Calculate MACD line and Signal line (EMA of MACD) 

- Delta is their difference, expressing price momentum change

- RSI to gauge overbought/oversold conditions

- Go long when Delta crosses above zero line and RSI overbought (default 70) 

- Go short when Delta crosses below zero line and RSI oversold (default 30)

MACD for momentum direction, RSI for overbought/sold - combo filters many false signals.

## Advantages

- Combines two indicators for filtered signals 

- MACD measures momentum, RSI measures overbought/sold

- Configurable parameters for different markets

- Clear trend trading strategy rationale 

## Risks

- Limited effectiveness from single indicator combo 

- No stop loss, unable to control loss per trade

- Does not consider position sizing 

Mitigations:

- Test other indicators, find optimal combinations

- Add trailing or hard stop loss

- Position size based on account size or volatility 

## Enhancement Opportunities

- Test MACD with other indicator combos

- Optimize parameters for stability 

- Filter signals by trend to avoid false breakouts

- Use trailing stop loss to protect profits

- ML to judge signal quality

## Conclusion

This strategy combines MACD and RSI for solid trend determination. Stability can be improved through parameter optimization, stop loss, intelligent filters etc. It provides an effective trend trading framework for further enhancements.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|fastLength|
|v_input_2|26|slowlength|
|v_input_3|9|MACDLength|
|v_input_4|14|length_rsi|
|v_input_5|30|overSold|
|v_input_6|70|overBought|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 6h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("MACD RSI Strategy", overlay=true)

fastLength = input(12)
slowlength = input(26)
MACDLength = input(9)

MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD

// RSI



length_rsi = input( 14 )
overSold = input( 30 )
overBought = input( 70 )
price = close

vrsi = rsi(price, length_rsi)

//

if (not na(vrsi))
    if (crossover(delta, 0) and crossover(vrsi, overBought ))
        strategy.entry("MacdLE", strategy.long, comment="LE")
    if (crossunder(delta, 0) and crossunder(vrsi, overSold))
        strategy.entry("MacdSE", strategy.short, comment="SE")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)


```

> Detail

https://www.fmz.com/strategy/427483

> Last Modified

2023-09-21 15:40:02
