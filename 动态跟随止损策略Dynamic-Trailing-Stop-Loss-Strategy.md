
> Name

动态跟随止损策略Dynamic-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17968bcf45bf19febe9.png)
[trans]

## 概述

本策略基于日线确定趋势方向,再利用15分钟K线形成的新的高点或低点作为止损位或追踪止损位,实现动态调整止损来锁定更多利润的策略。

## 策略原理

1. 利用日K线收盘价和前一日的最高价最低价比较,判断趋势方向。如果收盘价高于前一日的最高价,定义为上涨趋势;如果收盘价低于前一日的最低价,定义为下跌趋势。

2. 在上涨趋势中,当15分钟K线收盘价高于前一个15分钟K线的最高价时,做多;在下跌趋势中,当15分钟K线收盘价低于前一个15分钟K线的最低价时,做空。

3. 做多后,以前一个15分钟K线的最低价作为止损位。做空后,以前一个15分钟K线的最高价作为止损位。

4. 当15分钟K线再次创出新的高点或低点时,调整止损位。做多时调整为新的低点,做空时调整为新的高点,实现动态追踪止损。

## 优势分析

本策略最大的优势在于可以动态调整止损位,在保证了风险控制的同时,最大程度地锁定利润,降低止损被冲击的概率。

具体优势如下:

1. 基于趋势运算,能够及时判断市场走势并选择正确的交易方向。

2. 15分钟级别的交易,可以频繁进出场,捕捉较多机会。

3. 动态调整止损策略,可以根据新高或新低来降低止损被冲击的风险。

4. 止损位置设置合理,最大程度避免无谓损失。

## 风险分析

本策略的主要风险来自于趋势判断上的错误。具体风险点如下:

1. 日线趋势判断发生错误,可能导致交易方向错误。

2. 行情短期内发生剧烈波动,15分钟止损位被突破的概率较大。

3. 趋势转折点识别不当,可能导致亏损。

对应解决方法如下:

1. 增加其他时间周期指标进行综合判断,避免仅凭单一周期产生错误。

2. 评估市场波动性,在波动较大时适当放宽止损范围。

3. 增加趋势转折点判断机制,在转折前及时平仓。

## 优化方向 

本策略仍有进一步优化的空间:

1. 增加其他周期指标判断,优化趋势掌握。

2. 测试不同止损比例设置,选取最优参数。  

3. 增加量能指标,避免量能背离产生错误交易。

4. 增设趋势转折机制,优化 Exit 点。

5. 评估增加 Trailing Stop 区间值,进一步减少止损被冲击概率。

## 总结

本策略总体运行效果良好,思路清晰易于理解,具有止损动态调整、频繁交易、顺势而为等优点,能够有效控制风险并锁定利润,值得进一步测试与优化应用。但也存在一定改进空间,建议从多角度综合判断、优化参数设置、增加趋势转折判别等方面入手,以进一步增强策略的稳定性与收益率。

||

## Overview  

This strategy determines the trend direction based on daily candlesticks, and uses the new high or low points formed by 15-minute candlesticks as stop loss price or trailing stop loss price, so as to dynamically adjust stop loss and lock in more profits.

## Strategy Logic  

1. Compare closing price of daily candlesticks with highest and lowest price of previous daily candlestick to determine the trend direction. If closing price is higher than previous day's highest price, it is defined as an uptrend. If closing price is lower than previous day's lowest price, it is defined as a downtrend.

2. When in an uptrend, go long when the closing price of the 15-minute candlestick is higher than the highest price of the previous 15-minute candlestick. When in a downtrend, go short when the closing price of the 15-minute candlestick is lower than the lowest price of the previous 15-minute candlestick.  

3. Set the lowest price of the previous 15-minute candlestick as the stop loss price after going long. Set the highest price of the previous 15-minute candlestick as the stop loss price after going short.

4. When the 15-minute candlestick makes a new high or low again, adjust the stop loss price accordingly. Adjust to the new low after going long. Adjust to the new high after going short. This realizes dynamic trailing stop loss.

## Advantage Analysis

The biggest advantage of this strategy is that it can dynamically adjust the stop loss price. While ensuring risk control, it maximizes profit taking and reduces the probability of stop loss being hit.

Specifically advantages include:

1. Trend operation based judgments can timely determine market trends and choose the right trading direction.  

2. 15-minute timeframe trading allows frequent entries and exits to capture more opportunities.

3. Dynamic stop loss adjustment based on new highs or lows reduces risks of stop loss being hit.  

4. Reasonable stop loss positioning largely avoids unnecessary losses.

## Risk Analysis  

The main risk of this strategy comes from errors in trend judgments. Specific risks include:

1. Incorrect daily trend judgment may lead to wrong trade direction.

2. Prices may fluctuate violently in the short term, increasing probability of 15-minute stop loss being hit.

3. Improper identification of trend reversal points may lead to losses.

Corresponding solutions:

1. Add indicators from other timeframes for comprehensive judgments to avoid reliance on just one timeframe.

2. Evaluate market volatility and relax stop loss range appropriately during high volatility. 

3. Add trend reversal point identification mechanism to close positions timely before reversals.


## Optimization Directions

There is still room for further optimization:  

1. Add other timeframe indicators to optimize trend capturing.

2. Test different stop loss ratio settings to find optimal parameters.

3. Add volume indicators to avoid errors from volume divergence. 

4. Add trend reversal mechanisms to optimize exit points.

5. Evaluate widening Trailing Stop price intervals to further reduce risks of stop loss being hit.


## Summary

The overall performance of this strategy is good. The logic is clear and easy to understand. It has advantages like dynamic stop loss adjustment, frequent trading, and trading along trends. It can effectively control risks and lock in profits, and is worth further testing and optimization. But there is still room for improvement. It is recommended to improve from aspects like comprehensive judgment from multiple angles, parameter optimization, adding trend reversal identification mechanisms, etc, to further strengthen the stability and profitability of the strategy.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-13 00:00:00
end: 2023-12-15 02:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Anand's Strategy", overlay=true)

// Get the high and low of the previous day's candle
prev_high = request.security(syminfo.tickerid, "D", high[2])
prev_low = request.security(syminfo.tickerid, "D", low[2])

// var float prev_high = na
// var float prev_low = na

prev_close = request.security(syminfo.tickerid, "D", close[1])


getDayIndexedHighLow(_bar) =>
    _indexed_high = request.security(syminfo.tickerid, "D", high[_bar])
    _indexed_low = request.security(syminfo.tickerid, "D", low[_bar])
    [_indexed_high, _indexed_low]

var index = 2

while index >= 0
    [indexed_high_D, indexed_low_D] =  getDayIndexedHighLow(index)
  
    if prev_close > indexed_high_D or prev_close < indexed_low_D
        prev_high := indexed_high_D
        prev_low := indexed_low_D
        break
    // Decrease the index to move to the previous 15-minute candle
    index := index - 1


// Determine the trade direction based on the candle criterion
trade_direction = prev_close > prev_high ? 1 : (prev_close < prev_low ? -1 : 0)

// Get the current close from 15-minute timeframe
current_close = request.security(syminfo.tickerid, "15", close[1])
prev_high_15m = request.security(syminfo.tickerid, "15", high[2])
prev_low_15m = request.security(syminfo.tickerid, "15", low[2])

// var float prev_high_15m = na
// var float prev_low_15m = na

getIndexedHighLow(_bar) =>
    _indexed_high = request.security(syminfo.tickerid, "15", high[_bar])
    _indexed_low = request.security(syminfo.tickerid, "15", low[_bar])
    [_indexed_high, _indexed_low]


// Loop through previous 15-minute candles until the condition is met
var  i = 2

while i >= 2
    [indexed_high_15m, indexed_low_15m] =  getIndexedHighLow(i)
  
    if current_close > indexed_high_15m or current_close < indexed_low_15m
        prev_high_15m := indexed_high_15m
        prev_low_15m := indexed_low_15m
        break
    // Decrease the index to move to the previous 15-minute candle
    i := i - 1



buy_condition = trade_direction == 1 and current_close > prev_high_15m
stop_loss_buy = prev_low_15m

// Sell Trade Criteria in Negative Trend
sell_condition = trade_direction == -1 and current_close < prev_low_15m
stop_loss_sell = prev_high_15m


// Trailing Stop Loss for Buy Trade
// Custom Trailing Stop Function for Buy Trade
var float trail_stop_buy = na
trailing_buy_condition = buy_condition and current_close > trail_stop_buy
if trailing_buy_condition
    trail_stop_buy := current_close

// Custom Trailing Stop Function for Sell Trade
var float trail_stop_sell = na
trailing_sell_condition = sell_condition and current_close < trail_stop_sell
if trailing_sell_condition
    trail_stop_sell := current_close

// Take Buy Trade with Stop Loss
if (buy_condition)
    strategy.entry("Buy", strategy.long)
    strategy.exit("Buy Stop Loss", "Buy", stop=stop_loss_buy)

// Take Sell Trade with Stop Loss
if (sell_condition)
    strategy.entry("Sell", strategy.short)
    strategy.exit("Sell Stop Loss", "Sell", stop=stop_loss_sell)

// Set the background color based on the trade direction
bgcolor(trade_direction == 1 ? color.new(color.green, 90) : trade_direction == -1 ? color.new(color.red, 90) : na)
```

> Detail

https://www.fmz.com/strategy/436142

> Last Modified

2023-12-21 15:58:54
