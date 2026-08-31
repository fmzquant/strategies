
> Name

Cryptocurrency-Trading-Strategy-Combining-Multiple-Momentum-Indicators

> Author

ChaoZhang

> Strategy Description


This strategy is named “Cryptocurrency Trading Strategy Combining Multiple Momentum Indicators”. It integrates the MFI, RSI and Stoch RSI indicators to gauge overbought and oversold conditions in cryptocurrencies for trade signals.

The MFI indicator is the money flow index. It considers both volume and price information to judge the strength of buying and selling pressure. MFI below 20 suggests oversold state, while above 80 is overbought.

The RSI indicator is the relative strength index. It depicts overbought and oversold levels of prices. RSI below 30 is oversold, while above 70 is overbought.

The Stoch RSI indicator is an RSI variant that judges if the RSI itself is overbought or oversold. Parameters set at 20-80 represent overbought and oversold zones.

The trading logic is:

When MFI, RSI and Stoch RSI are simultaneously below oversold levels, it signals multiple oversold confirmation for going long. 

When the three indicators are above overbought territory together, it flags multiple overbought confirmation for going short.

The advantage of this strategy is the multiple indicator confirmation can filter false signals and improve entry accuracy. But parameters need full optimization, plus stop loss to control risks.

In conclusion, momentum indicators are sensitive to cryptocurrency price fluctuations, and combining multiple ones can enhance strategy robustness. Still, traders should watch for market structure changes and maintain flexibility in strategy adjustment, as no single strategy can perfectly adapt to market variations.



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|rsi_length|
|v_input_2|14|mfi_lenght|
|v_input_3|3|smoothK|
|v_input_4|3|smoothD|
|v_input_5|14|lengthRSI|
|v_input_6|14|lengthStoch|
|v_input_7|0|Opportunity Type: Very good|Good|Okay|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-13 00:00:00
end: 2023-09-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// Crypto Crew strategy entry signal long/short with stop loss. Exit signal not provided.
//
// Indicators: MFI + RSI + STOCH RSI
// Entry criteria: long when the three are oversold, short when the three indicators are overbought.
// Exit criteria: Take profit at Fib levels (not demonstrated here) measured from prevous highs/low.
// Feel free to contribute

//@version=4
strategy("Crypto Crew")

//inputs
source = hlc3
rsi_length = input(14, minval=1)
mfi_lenght =  input(14, minval=1)
smoothK = input(3, minval=1)
smoothD = input(3, minval=1)
lengthRSI = input(14, minval=1)
lengthStoch = input(14, minval=1)
okay = "Okay"
good = "Good"
veryGood = "Very good"
tradingOpportunity = input(title="Opportunity Type", defval=veryGood, options=[okay, good, veryGood])
longThreshhold = tradingOpportunity==okay? 40 : tradingOpportunity==good ? 30 : tradingOpportunity==veryGood? 20 : 0
shortThreshhold = tradingOpportunity==okay? 60 : tradingOpportunity==good ? 70 : tradingOpportunity==veryGood? 80 : 0

//lines
mfi = mfi(source, mfi_lenght)
rsi = rsi(source, rsi_length)
rsi1 = rsi(close, lengthRSI)
k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = sma(k, smoothD)

longSignal = mfi<longThreshhold and rsi<longThreshhold and k<longThreshhold and d<longThreshhold? 1:-1
shortSignal = mfi>shortThreshhold and rsi>shortThreshhold and k>shortThreshhold and d>shortThreshhold? 1:-1

if longSignal > 0
    strategy.entry("Long", strategy.long)
    strategy.exit(id="Long Stop Loss", stop=close*0.8) //20% stop loss 
    
if shortSignal > 0
    strategy.entry("Short", strategy.short, stop=close*1.2)
    strategy.exit(id="Short Stop Loss", stop=close*1.2) //20% stop loss

plot(k, color=color.blue)
plot(d, color=color.red)
plot(rsi, color=color.yellow)
plot(mfi, color=color.blue)
hline(longThreshhold, color=color.gray, linestyle=hline.style_dashed)
hline(shortThreshhold, color=color.gray, linestyle=hline.style_dashed)

```

> Detail

https://www.fmz.com/strategy/426589

> Last Modified

2023-09-13 15:16:55
