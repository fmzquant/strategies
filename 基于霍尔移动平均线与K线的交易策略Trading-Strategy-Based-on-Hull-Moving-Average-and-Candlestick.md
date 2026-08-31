
> Name

基于霍尔移动平均线与K线的交易策略Trading-Strategy-Based-on-Hull-Moving-Average-and-Candlestick

> Author

ChaoZhang

> Strategy Description


## Overview

The core idea of this strategy is to compare the Hull Moving Average (HMA) with candlestick values to generate buy and sell signals. It will buy when HMA is above candlestick and sell when HMA is below candlestick.

## Principles 

Firstly, the strategy calculates HMA of a certain period using hma() function. Then it gets the open price of the previous candlestick as benchmark. If HMA is higher than previous candle open price, a buy signal is generated. If HMA is lower than previous candle open price, a sell signal is generated.

The entry conditions are that the price needs to break HMA in reverse direction before entering the market. That means it will buy only when price breaks above HMA from below. It will sell only when price breaks below HMA from above. This avoids being whipsawed by oscillating markets.

The exit conditions are to stop loss when price falls back to the other side of HMA. For example, if price drops below HMA after buying, it will stop loss sell.

In summary, this strategy identifies the major trend direction using the smoothness of HMA to generate signals. Meanwhile, it requires price breakout to filter false signals and avoid being whipsawed by market noise.

## Advantage Analysis 

1. Using HMA instead of SMA can better identify trends and filter noise.

2. The breakout mechanism can reduce the probability of being trapped and opening repetitive positions.

3. Adopting previous candle price rather than current price avoids curve fitting. 

4. The rules are simple and clear, suitable for parameter optimization and robot trading.

5. Can be flexibly applied to any instrument and timeframe, with universality.

## Risks and Improvements

1. Improper HMA parameter setting may miss trends or be too sensitive. Can teste different periods to find optimal values.

2. Relying on single indicator is prone to be stopped out by breakout retries, consider combining other indicators to filter signals. 

3. Stop loss is too close to HMA, may be trapped again by subsequent breakout. Can appropriately widen stop to support/resistance. 

4. Unable to determine trend direction and strength. Consider adding trend classification indicators.

5. Fixed stop loss causes large fluctuation in risk/reward. Can try adaptive stops or money management. 

## Conclusion

This strategy is relatively simple and practical overall with a clear core idea. It identifies the major trend with HMA and filters fake signals with breakout. It avoids being whipsawed by choppy markets. Proper parameter optimization can achieve decent results. However, reliability and win rate are still limited as a single indicator strategy. It's recommended to combine with other technical indicators or money management methods to significantly improve robustness. In conclusion, this strategy provides a simple and effective approach for quantitative trading, which is worth in-depth research and application.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Hull MA Period|
|v_input_2|D|Candle Resolution|
|v_input_3_open|0|Source of Price: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SeaSide420. Any timeFrame/pair , Hull Moving Average vs Candle
//@version=4
strategy("Hull Moving Average vs Candle",shorttitle="HMA-vs-Candle",overlay=true,default_qty_type=strategy.percent_of_equity,default_qty_value=100,commission_type=strategy.commission.cash_per_order,commission_value=1.00,slippage=1)
Period=input(title="Hull MA Period",type=input.integer,defval=50,minval=1)
Resolution=input(title="Candle Resolution", type=input.resolution,defval="D")
Price=input(title="Source of Price",type=input.source,defval=open)
HMA=hma(Price,Period)
Candle=security(syminfo.tickerid,Resolution,Price,barmerge.gaps_off,barmerge.lookahead_off)
change_color=HMA>Candle?color.green:color.red
plot1=plot(Candle,color=change_color,title="Candle Line",linewidth=2,transp=50)
plot2=plot(HMA[1],color=change_color,title="Hull MA Line",linewidth=2,transp=50)
fill(plot1,plot2,color=change_color,transp=50)
strategy.close("BUY",when=Price<HMA and HMA<Candle,comment="close buy entry")
strategy.close("SELL",when=Price>HMA and HMA>Candle,comment="close sell entry")
if (Price>HMA and HMA>Candle and Price>Price[1])
    strategy.entry("BUY",strategy.long)
if (Price<HMA and HMA<Candle and Price<Price[1])
    strategy.entry("SELL",strategy.short)



//                                                                   /L'-, 
//                               ,'-.           /MM . .             /  L '-, 
//     .                    _,--dMMMM\         /MMM  `..           /       '-, 
//     :             _,--,  )MMMMMMMMM),.      `QMM   ,<>         /_      '-,' 
//     ;     ___,--. \MM(    `-'   )M//MM\       `  ,',.;      .-'* ;     .' 
//     |     \MMMMMM) \MM\       ,dM//MMM/     ___ < ,; `.      )`--'    / 
//     |      \MM()M   MMM)__   /MM(/MP'  ___, \  \ `  `. `.   /__,    ,' 
//     |       MMMM/   MMMMMM( /MMMMP'__, \     | /      `. `-,_\     / 
//     |       MM     /MMM---' `--'_ \     |-'  |/         `./ .\----.___ 
//     |      /MM'   `--' __,-  \""   |-'  |_,               `.__) . .F. )-. 
//     |     `--'       \   \    |-'  |_,     _,-/            J . . . J-'-. `-., 
//     |         __  \`. |   |   |         \    / _           |. . . . \   `-.  F 
//     |   ___  /  \  | `|   '      __  \   |  /-'            F . . . . \     '` 
//     |   \  \ \  /  |        __  /  \  |  |,-'        __,- J . . . . . \ 
//     |    | /  |/     __,-  \  ) \  /  |_,-     __,--'     |. .__.----,' 
//     |    |/    ___     \    |'.  |/      __,--'           `.-;;;;;;;;;\ 
//     |     ___  \  \     |   |  `   __,--'                  /;;;;;;;;;;;;. 
//     |     \  \  |-'\    '    __,--'                       /;;;;;;;;;;;;;;\ 
// \   |      | /  |      __,--'                             `--;;/     \;-'\ 
//  \  |      |/    __,--'                                   /  /         \  \ 
//   \ |      __,--'                                        /  /           \  \ 
//    \|__,--'                                          _,-;M-K,           ,;-;\ 
//                                                     <;;;;;;;;           '-;;;; 
//                                                                                        ~ priceless artwork by SeaSide420
```

> Detail

https://www.fmz.com/strategy/427437

> Last Modified

2023-09-21 10:31:58
