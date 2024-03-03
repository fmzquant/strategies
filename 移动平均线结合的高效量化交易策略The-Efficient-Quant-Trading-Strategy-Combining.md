
> Name

移动平均线结合的高效量化交易策略The-Efficient-Quant-Trading-Strategy-Combining

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/186775666f0a31b67e7.png)
[trans]

## 概述

本策略主要利用5日RSI指标与200日移动平均线的结合,形成交易决策信号,属于技术指标组合策略。其主要交易原理是:当价格运行到超买超卖区域时,信号卖出;当价格跌至超卖区域时,信号买入。该策略最大优势是策略信号比较明确,回撤风险较小。但也存在只利用单一技术指标组合形成交易决策的局限性,可通过多因子模型与机器学习算法等进行优化。

## 策略原理  

本策略主要利用5日RSI指标与200日移动平均线的结合,判断价格运行的超买超卖区域,形成交易决策:

1. 5日RSI指标判断价格运行的超买超卖区域。设置超买线为72,超卖区域为30。当RSI指标由下向上突破30时产生买入信号;当RSI指标由上向下跌破72时,产生卖出信号。 

2. 200日移动平均线判断价格中长线趋势方向。当价格低于200日均线时,为价格下行阶段;当价格高于200日均线时,为价格上行阶段。

3. 结合1、2判断,本策略iault时5日RSI指标超买并下破72时卖出,5日RSI下破30时并且价格低于200日均线时买入。

## 策略优势

1. 策略信号比较明确,利用RSI指标 Judgment区域判定超买超卖信号。

2. 200日均线判断大趋势方向,避免逆势操作。

3. 可设置最大持仓数,有利于控制风险。

4. 策略参数优化空间大,可调整RSI参数与均线参数。

5. 回撤风险较小,可效控制策略最大回撤。

## 策略风险 

1. 仅利用RSI指标与均线指标,策略信号可能不稳定,存在多头空头震荡市买卖亏损风险。

2. 需优化和测试RSI参数与均线参数,以取得更好策略效果。

3. 可引入别的指标或模型判断,优化策略信号。如引入波动率指标、机器学习判断等。

## 策略优化方向  

1. 利用更多指标组合判断。如MACD,KD,波动率指标等。

2. 增加机器学习模型判断。如LSTM判断交易信号稳定性。

3. 增加量化因子。如交易量变化、资金流向等判断资金面因子。

4. 优化策略参数。如RSI参数、均线参数等。

5. 优化止损机制。如移动止损、时间止损等。


## 总结

本策略主要运用5日RSI指标与200日均线指标组合判断价格超买超卖区域,形成交易信号,属于技术指标组合策略。策略信号比较明确,最大回撤风险较小。但可通过多指标组合与机器学习判断等进一步优化,以提高策略效果。

||

## Overview

This strategy mainly combines the 5-day RSI indicator and the 200-day moving average to form trading decision signals, which belongs to the technical indicator combination strategy. Its main trading principle is: when the price runs to the overbought/oversold area, it signals to sell; when the price falls to the oversold area, it signals to buy. The biggest advantage of this strategy is that the strategy signal is relatively clear and the retracement risk is relatively small. But there are also limitations in forming trading decisions based solely on a single technical indicator combination, which can be optimized through multi-factor models and machine learning algorithms.

## Strategy Principle 

This strategy mainly combines the 5-day RSI indicator and the 200-day moving average to judge the overbought/oversold area where prices are running, and forms trading decisions:

1. The 5-day RSI indicator judges the overbought/oversold area where prices are running. The overbought line is set at 72 and the oversold area is 30. When the RSI indicator breaks through 30 from bottom to top, a buy signal is generated; when the RSI indicator falls from top to bottom below 72, a sell signal is generated.

2. The 200-day moving average determines the direction of the medium-to-long-term trend. When the price is below the 200-day moving average, it is a downward phase of the price; when the price is above the 200-day moving average, it is an upward phase of the price. 

3. Combining 1 and 2 judgment, this strategy sells out when the 5-day RSI indicator is overbought and breaks down below 72, and buys in when the 5-day RSI breaks below 30 and the price is below the 200-day moving average.

## Advantages of the Strategy

1. The strategy signal is relatively clear, using the RSI indicator to determine the overbought/oversold signal by the judgment area.

2. The 200-day moving average determines the direction of the major trend to avoid contrarian operations.

3. The maximum number of positions can be set to help control risks.

4. The strategy has large space for parameter optimization, adjustable RSI parameters and moving average parameters. 

5. Relatively small retracement risk can effectively control the maximum retracement of the strategy.

## Risks of the Strategy

1. Using only RSI and moving average indicators, the strategy signal may be unstable, with the risk of long and short shaken losses in volatile markets.

2. Need to optimize and test RSI parameters and moving average parameters for better strategy results.

3. Other indicators or models can be introduced to optimize the strategy signal. Such as introducing volatility indicators, machine learning judgements, etc.

## Directions for Strategy Optimization  

1. Use more indicator combinations to judge. Such as MACD, KD, volatility indicators, etc. 

2. Increase machine learning model judgments. Such as LSTM to judge the stability of trading signals.

3. Increase quantitative factors. Such as changes in trading volume, capital flow direction and other judgments of capital factors.

4. Optimize strategy parameters. Such as RSI parameters, moving average parameters, etc.

5. Optimize stop loss mechanisms. Such as moving stop loss, time stop loss, etc.


## Summary  

This strategy mainly uses the combination of the 5-day RSI indicator and the 200-day moving average indicator to judge the overbought/oversold area of prices and form trading signals. It belongs to the technical indicator combination strategy. The strategy signal is relatively clear and the maximum retracement risk is relatively small. But it can be further optimized through multi-indicator combinations and machine learning judgments to improve strategy results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|5|5 day input or RSI1|
|v_input_int_2|3|max open orders|
|v_input_int_3|30|RSI Lower|
|v_input_int_4|72|RSI Upper |
|v_input_int_5|200|EMA Period|
|v_input_int_6|50|Buy breakout range|
|v_input_float_1|1.05|Buy TP: 1+TP %, .05 seems to work well.|
|v_input_float_2|0.985|Sell TP: 1-TP%. .025 seems to work well. |


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-24 00:00:00
end: 2024-01-31 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// ©chewyScripts.

//@version=5
strategy("96er RSI+200EMA Strategy + Alerts", overlay=true)
// This works best on a small account $100, with 50% of equity and up to 10 max open trades. 
// 96% Profitable, turns $100 into $350 in 1 month. very few losses. super happy with it.
// So far it triples the account on a 1m chart in 1 month back testing on the SEI-USD pair.
// I did not test on FX pairs or other instruments.
// had some issues with the inputs not working so had to hard code some, also the lastClose var sometimes breaks and starts following every candle, not sure why.

in_r1 = input.int(5,"5 day input or RSI1")
in_openOrders = input.int(3,"max open orders")

in_lowerRSI = input.int(30,"RSI Lower")
in_upperRSI = input.int(72,"RSI Upper ")

in_emaperiod = input.int(200,"EMA Period")

in_buybreakout = input.int(50,"Buy breakout range")

in_buyTP = input.float(1.05,"Buy TP: 1+TP %, .05 seems to work well.")
in_sellTP = input.float(0.9850, "Sell TP: 1-TP%. .025 seems to work well. ")

simple int rsi5 = in_r1

// 3 rsi strategy , when all of them are overbought we sell, and vice versa
rsi7 = ta.rsi(close,rsi5)
lastClose = request.security(syminfo.tickerid, "D", close, lookahead = barmerge.lookahead_on)
rsi3 = ta.rsi(close[5],rsi5)

ma = ta.ema(close,in_emaperiod)

plot(rsi7,"5 Day RSI",color.red)
plot(lastClose,"Yesterdays Close",color.green)
plot(rsi3,"Previous 5th candles RSI",color.purple)


// sell condition
//sell = ta.crossunder(rsi7,70) and ta.crossunder(rsi14,70) and ta.crossunder(rsi21,70)

//buy condition
//buy = ta.crossover(rsi7,in_lowerRSI) and close < ma and rsi3 <= in_upperRSI and strategy.opentrades < in_openOrders
//sell = ta.crossunder(rsi7,in_upperRSI) and close > ma and rsi3 >= in_lowerRSI3 and strategy.opentrades < in_openOrders

buy = ta.crossover(rsi7,in_lowerRSI) and close < ma and close < lastClose and strategy.opentrades < in_openOrders
sell = ta.crossunder(rsi7,in_upperRSI) and close > ma and close > lastClose and strategy.opentrades < in_openOrders


var lastBuy = close 
var lastSell = close 

if (buy)
    strategy.entry("BUY", strategy.long)
    lastBuy := close 
    alert("Buy")

if ((close >= lastBuy*in_buyTP ) or rsi7 > in_buybreakout and close >= lastClose and (close >= lastClose*in_buyTP or close >= lastBuy*in_buyTP ) )
    strategy.close("BUY", "BUY Exit")
    alert("Buy Exit")
    
if (sell)
    strategy.entry("SELL", strategy.short)
    lastSell := close 
    alert("Sell")

if ( close < ma and (close <= lastSell*in_sellTP ) or (close < lastClose*in_sellTP) )
    strategy.close("SELL", "Sell Exit")
    alert("Sell Exit")

```

> Detail

https://www.fmz.com/strategy/440729

> Last Modified

2024-02-01 15:09:06
