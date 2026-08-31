
> Name

底部跟随交易策略Bottom-Following-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The bottom following trading strategy is a low-risk, low-return cryptocurrency trading strategy. It establishes long positions when cryptocurrencies are oversold and closes positions when prices recover. This strategy is suitable for short-term and medium-term trading and provides stable capital growth.

## Principles 

This strategy mainly uses the fast RSI indicator to determine if a cryptocurrency is oversold. When the fast RSI is below 10, it indicates the asset is severely oversold. At this point, if trading volume increases significantly and prices start to rebound from the bottom, it signals establishing long positions.

Once prices stabilize and the fast RSI returns to the neutral zone, long positions can be closed for profit. Stop-loss orders can be set beforehand to control risks.

## Advantages

- The strategy accurately identifies bottoms and catches ideal entry points.

- The fast RSI indicator quickly reveals oversold and overbought conditions. 

- Only long positions near significant bottoms, effectively controlling risks.

- Stop-loss locks in profits and avoids expanding losses.

- Applicable to most cryptocurrencies, high flexibility.

## Risks

- Incorrect judgment may lead to large losses if long positions are opened away from bottoms.

- Even with correct bottom picks, rebounds may be insufficient for profits. 

- Stop-loss set too wide may lead to large losses.

- Stop-loss set too tight may be triggered prematurely. 

- Insufficient trading volume prevents building large enough positions.

## Risk Management

- Use multiple indicators to improve accuracy of bottom confirmation.

- Scale in positions to lower allocation per entry.

- Set reasonable stop-loss distance based on volatility.

- Take profit when breaking above channels or resistance.

- Select liquid trading pairs to ensure sufficient liquidity.

## Summary

The bottom following strategy capitalizes on oversold bottoms of cryptocurrencies for low-risk capital growth. It utilizes fast RSI for timing and stop-loss for risk control. Further optimizations may lead to more consistent profits. It is a recommended low-risk crypto trading strategy worth considering.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-16 00:00:00
end: 2023-09-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Noro's CryptoBottom Strategy", shorttitle = "CryptoBottom str", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Fast RSI
src = close
fastup = rma(max(change(src), 0), 2)
fastdown = rma(-min(change(src), 0), 2)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

mac = sma(close, 10)
len = abs(close - mac)
sma = sma(len, 100)
max = max(open, close)
min = min(open, close)
up = close < open and len > sma * 3 and min < min[1] and fastrsi < 10 ? 1 : 0
//dn = close > open and len > sma * 3 and max > max[1] and fastrsi > 90 ? 1 : 0
plotarrow(up == 1 ? 1 : na, colorup = blue, colordown = blue)
//plotarrow(dn == 1 ? -1 : na, colorup = blue, colordown = blue)

sell = sma(close, 5)
dn = high > sell ? 1 : 0
plot(sell)

longCondition = up == 1
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = dn == 1
if (shortCondition)
    strategy.entry("Exit", strategy.short, 0)
```

> Detail

https://www.fmz.com/strategy/426990

> Last Modified

2023-09-16 18:37:44
