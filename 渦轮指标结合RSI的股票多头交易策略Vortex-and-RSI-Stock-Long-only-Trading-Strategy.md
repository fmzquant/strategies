
> Name

渦轮指标结合RSI的股票多头交易策略Vortex-and-RSI-Stock-Long-only-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview 

This strategy uses the Vortex indicator to determine market trend direction and identify long opportunities. It adds RSI filter and stop loss/take profit management to build a more complete stock long-only trading system. It can effectively identify uptrends and allows parameter customization.

## Strategy Logic

1. Calculate the positive VIP and negative VIM of Vortex indicator. 

2. When VIP crosses above VIM, and close is higher than previous high, a buy signal is generated.

3. Calculate RSI values. When RSI crosses below 70, a sell signal is generated.

4. When VIM crosses below VIP, and close is lower than previous low, a sell signal is also triggered.

5. Set stop loss at stop_loss% of initial capital, and take profit at Target_profit% of initial capital.

Vortex indicator judges bullish/bearish trends well. Adding RSI prevents overheating risks. Stop loss/take profit adds robustness.

## Advantage Analysis

1. Vortex accurately identifies trends with clear signals.

2. RSI avoids overheating risks and chasing tops.

3. Dynamic stops set predefined risk/reward ratio.

4. Adjustable stops fit different market environments.

5. Simple clear rules, easy to implement.

6. Expandable with other indicators.

## Risk Analysis

1. Vortex has lagging effect, may miss opportunities. 

2. Stop loss too small may cause whipsaws.

3. Take profit too large may limit profits.

4. RSI over-reliance causes failures.

5. Trading costs not considered.

6. No position sizing rules.

## Optimization Directions

1. Test and optimize parameters for Vortex and RSI.

2. Try combining Vortex with OBV etc.

3. Enhance stop loss strategies like trailing stop, chandelier exit etc.

4. Add position sizing module to limit single trade loss.

5. Consider more filters like KD, MACD for entry timing.

6. Utilize machine learning for better parameter optimization. 

7. Add fundamental factors to improve win rate.

## Conclusion

This strategy integrates Vortex for trend and RSI for overheating control into a stable long-only stock system. The stop loss/take profit settings also keep risk manageable. Further improvements in parameter tuning and new modules can make it more robust for live trading. With strong trend following capacity and expandability, this strategy suits active investors well.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|vortex period|
|v_input_2|14|RSI period|
|v_input_3|7|Stop loss %|
|v_input_4|16|Target Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by Sauciusfinance 
////////////////////////////////////////////////////////////
strategy(title="Vortex and RSI ts 2020",calc_on_order_fills=true,calc_on_every_tick =true, initial_capital=20000,commission_value=.25,overlay = true,default_qty_type = strategy.cash, default_qty_value = 20000)
//inputs////////////////////////
n = input(title="vortex period",type=input.integer, defval = 14)
m = input(title = "RSI period", type=input.integer, defval = 14)
// CALCULATIONS *** ///////
VMP = sum( abs( high - low[1]), n )
VMM = sum( abs( low - high[1]), n )
STR = sum( atr(1), n )
VIP = VMP / STR
VIM = VMM / STR
// bring the lines in the panel below, add another panel with RSI
plot(VIP, title="VI +", color=#311B92)
plot(VIM, title="VI -", color=#FF006E)

// RSI on total price, always
totalprice = (high + low+close + open)/4
myrsi = rsi(m, totalprice)
strategy.initial_capital = 50000
//// TRADING SYSTEM CODE //// 
entryl = crossover(VIP, VIM) and close >= high[1] 
strategy.entry("Long", true, when=entryl, comment = "Go!")
exit1 = crossover(VIM, VIP) and close <= low[1]
strategy.close("Long", when=exit1, comment = "Vortex down")
exit2 = crossunder(myrsi, 70)
strategy.close("Long", when=exit2, comment = "RSI down")
//money management
stop_loss=input(7, "Stop loss %", minval = 1, step = 1)
sl = -1*stop_loss/100*strategy.initial_capital
close_Stop = strategy.openprofit < sl
strategy.close("Long", when = close_Stop)
Target_profit=input(16, "Target Profit %", minval = 1, step = 1)
tp = Target_profit/100*strategy.initial_capital
close_Target = strategy.openprofit > tp
strategy.close("Long", when = close_Target)


```

> Detail

https://www.fmz.com/strategy/427311

> Last Modified

2023-09-19 22:01:09
