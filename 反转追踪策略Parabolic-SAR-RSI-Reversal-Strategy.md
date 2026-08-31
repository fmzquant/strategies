
> Name

反转追踪策略Parabolic-SAR-RSI-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The Parabolic SAR RSI reversal strategy generates trading signals based on the "Parabolic Stop and Reverse" and "Relative Strength Index" indicators to identify potential price reversals. It takes opposite positions when the price breaks the upside or downside trendlines. This allows catching opportunities from price reversals.

## Strategy Logic

The strategy mainly utilizes two technical indicators:

1. Parabolic SAR: Plots a parabolic SAR line as a dynamic stop-loss line. When the price breaks this line, the position and direction of the stop-loss line are reset, generating buy or sell signals.

2. RSI: Reflects the speed and change of price rises and falls over a period of time. Above 70 is the overbought zone and below 30 is the oversold zone.

Specifically, the strategy first sets the initial value, step, and maximum value of the Parabolic SAR based on user input. It then determines entry and exit timing according to whether the price breaks the SAR line:

- When the price breaks above the SAR line, a sell signal is generated.
- When the price breaks below the SAR line, a buy signal is generated.

Meanwhile, the strategy also monitors the RSI to determine if it is in the overbought/oversold zone. Long positions are closed when RSI enters the overbought zone. Short positions are closed when RSI enters the oversold zone.

By combining the SAR reversal signals and RSI filter signals, the strategy can make opposite moves in a timely manner when prices reverse to achieve buy low sell high.

## Advantage Analysis

The main advantages of this reversal tracking strategy are:

1. Capture Price Reversal - Uses breakouts to generate reversal signals and make opposite moves when prices reverse.

2. Dynamic Stop Loss - SAR acts as a moving stop loss that adjusts stop levels based on real-time prices to protect profits.

3. Adaptability - Adjustable parameters make the strategy adaptable to different market environments. 

4. RSI Filter - Filters out false breakouts and avoids wrong moves.

5. Easy to Implement - Uses simple indicators with little code, easy to implement and backtest.

## Risk Analysis

The risks include:

1. Whipsaw Risk - False breakouts cause wrong stop and reverse signals, leading to repeated losses.

2. Over Optimization - Optimizing parameters may lead to overfitting and lack of robustness. 

3. No Fundamental Basis - Driven purely by technical indicators, ignores fundamentals.

4. Ignore Transaction Costs - Frequent trading increases transaction costs.

5. Subject to Price Gaps - Gaps may trigger incorrect stop and reverse signals.

## Enhancement Opportunities 

The strategy can be enhanced from the following aspects:

1. Combine with other indicators - Confirm signals with other indicators to avoid false signals. Such as adding volume indicators.

2. Parameter tuning - Test and optimize parameters to find the optimal parameter combinations.

3. Position sizing - Adjust position size based on market conditions to control risk.

4. Trade at significant levels - Only trade around key support/resistance levels to reduce frequency.

5. Consider fundamentals - Add fundamental factors to avoid trading against major trends. 

## Conclusion

The reversal tracking strategy generates signals using SAR and RSI to capture reversals. It dynamically adjusts stops to capture short-term profits from breakouts. But it is also exposed to risks of following noise. Optimizing parameters, improving decision quality will enhance strategy stability and profitability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|14|Length|
|v_input_3|82|RSI Overbought Level|
|v_input_4|21|RSI Oversold Level|
|v_input_5|0.007|SAR Start|
|v_input_6|0.017|SAR Increment|
|v_input_7|0.24|SAR Maximum|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-10-07 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// strategy("SARSI",overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0, commission_type = strategy.commission.percent, commission_value = 0.0675, initial_capital = 10000, currency = currency.USD, calc_on_order_fills = true, calc_on_every_tick = true) 

//study("SARSI",overlay = true)

src     = input(close, title="Source")
len     = input(14, minval=1, title="Length")
rob     = input(title="RSI Overbought Level", defval=82, minval=1, maxval=100)
ros     = input(title="RSI Oversold Level", defval=21, minval=1, maxval=100)
start   = input(title="SAR Start", defval=0.007, minval=0.001, maxval=10)
inc     = input(title="SAR Increment", defval=0.017, minval=0.001, maxval=100)
max     = input(title="SAR Maximum", defval=0.24, minval=0.01, maxval=10)
asar    = sar(start,inc,max)
xrsi    = rsi(close,len)
date    = timestamp(2018, 8, 1, 00, 00)
up      = crossunder(asar,src)
dn      = crossover(asar,src)

//ob      = crossunder(xrsi,rob)
//os      = crossover(xrsi,ros)

strategy.entry("long", strategy.long, when=up and time>=date, comment="Long")
strategy.entry("short", strategy.short, when=dn and time>=date, comment="Short")

//strategy.close("long", when=ob)
//strategy.close("short", when=os)

alertcondition(up,  "Long",  "Long Msg")
alertcondition(dn, "Short", "Short Msg")

//uptrend=plotshape(up,"uptrend",shape.triangleup,color=#48A498,transp=0, size = size.tiny, location = location.belowbar,text="฿")
//downtrend=plotshape(dn,"downtrend",shape.triangledown,color=#E25655,transp=0, size = size.tiny, location = location.abovebar,text="$")
//plotshape(ob,"overbuy",shape.triangleup,color=#48A498,transp=0, size = size.small, location = location.belowbar,text="0฿")
//plotshape(os,"oversell",shape.triangledown,color=#E25655,transp=0, size = size.small, location = location.abovebar,text="0$")

plot(asar, style=cross, color=gray, transp=0, linewidth=1, title="SAR")
```

> Detail

https://www.fmz.com/strategy/428699

> Last Modified

2023-10-08 14:21:17
