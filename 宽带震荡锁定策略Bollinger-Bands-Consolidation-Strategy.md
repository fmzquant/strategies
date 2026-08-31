
> Name

宽带震荡锁定策略Bollinger-Bands-Consolidation-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ecad07894837b87017.png)

## Overview

The Bollinger Bands consolidation strategy is a breakthrough strategy that identifies low volatility consolidation phases using Bollinger Bands. When the market enters a ranging period, the Bollinger Bands will converge, signaling an opportunity to enter the market. We also incorporate the Average True Range indicator to confirm the decrease in volatility.

## Strategy Logic  

The strategy relies primarily on Bollinger Bands to detect when prices enter a low volatility consolidation phase. The middle band of Bollinger Bands is a moving average of closing prices. The upper and lower bands are offset by two standard deviations above and below the middle band. When volatility decreases, the distance between the upper and lower bands narrows noticeably. We first check if the current ATR value is less than the standard deviation between the Bollinger Bands to preliminarily confirm the convergence. This signals prices have just entered into consolidation.

 To further prove the decrease in volatility, we check if the moving average of ATR values has a downward trend. The decrease in average ATR also corroborates from the side that volatility is declining. When both conditions are met simultaneously, we determine Bollinger Bands have shown significant convergence, which is an excellent buying opportunity.

After buying in, we enable a moving stop loss strategy with a stop loss distance of twice the ATR value. This effectively controls losses.

## Advantage Analysis

The biggest advantage of this strategy is that it can accurately determine when the market enters a low volatility consolidation phase and identify the best buying opportunity. Compared to other long-term strategies, the Bollinger Band consolidation strategy has a higher probability of profit. 

In addition, the strategy also uses a moving stop loss to actively control risks. This maximizes loss reduction even when the market sentiment is unfavorable. Many long-term strategies lack this.
 
## Risk Analysis  

The main risk of the strategy is that the Bollinger Bands indicator cannot accurately determine changes in price volatility 100% of the time. When Bollinger Bands misjudge that volatility has decreased, our entry timing may be unfavorable. At this point, the moving stop loss plays an important role and can exit the trade as early as possible.

In addition, the setting of various parameters in the strategy will also affect the results. We need to optimize the parameters through extensive backtesting to make the strategy more robust.
 
## Optimization Directions   

We can consider adding other indicators to confirm the turning signs on trend indicators when Bollinger Bands converge. For example, when Bollinger Bands converge, we also require that the MACD difference has turned from positive to negative, or RSI has pulled back from the overbought zone. This can further improve the accuracy of the buying signals.

Another direction is to test the impact of different parameter settings on the results, such as the periods of Bollinger Bands, ATR and the multiplier of the moving stop loss. We need to use stepwise optimization to find the optimal parameter combination.

## Conclusion  

The Bollinger Bands consolidation strategy utilizes Bollinger Bands to determine the timing of decreased price volatility and uses a moving stop loss to effectively control risks. It is a relatively stable long-term breakout strategy. We still need to further optimize parameters and incorporate other indicators to enhance the robustness of the strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Apr 2016 13:30 +0000)|Backtest Start Time|
|v_input_2|false|Define backtest end-time (If false, will test up to most recent candle)|
|v_input_3|timestamp(19 Apr 2021 19:30 +0000)|Backtest End Time (if checked above)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-15 00:00:00
end: 2024-02-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © DojiEmoji

//@version=4
strategy("[KL] Bollinger Bands Consolidation Strategy",overlay=true,pyramiding=1)

// Timeframe {
backtest_timeframe_start = input(defval = timestamp("01 Apr 2016 13:30 +0000"), title = "Backtest Start Time", type = input.time)
USE_ENDTIME = input(false,title="Define backtest end-time (If false, will test up to most recent candle)")
backtest_timeframe_end = input(defval = timestamp("19 Apr 2021 19:30 +0000"), title = "Backtest End Time (if checked above)", type = input.time)
within_timeframe = true
// }

// Indicator: BOLL bands {
BOLL_length = 20//input(20,title="Periods to lookback for BOLL and ATR calc. (default 20)")
BOLL_src = close
BOLL_center = sma(BOLL_src, BOLL_length)
BOLL_sDEV_x2 = 2 * stdev(BOLL_src, BOLL_length)
BOLL_upper = BOLL_center + BOLL_sDEV_x2
BOLL_lower = BOLL_center - BOLL_sDEV_x2
plot(BOLL_center, "Basis", color=#872323, offset = 0)
BOLL_p1 = plot(BOLL_upper, "Upper", color=color.navy, offset = 0, transp=50)
BOLL_p2 = plot(BOLL_lower, "Lower", color=color.navy, offset = 0, transp=50)
fill(BOLL_p1, BOLL_p2, title = "Background", color=#198787, transp=85)
// }
// ATR and volatility Indicator {
ATR_x2 = atr(BOLL_length) * 2 // multiplier aligns with BOLL
avg_volat = sma(ATR_x2, BOLL_length)
//}

// Trailing stop loss {
var entry_price = float(0)
var trailing_SL_buffer = float(0)
var stop_loss_price = float(0)
trail_profit_line_color = color.green
UPDATE_ATR_TSL = false
if strategy.position_size == 0 or not within_timeframe // make TSL line less visible
    trail_profit_line_color := color.black
    stop_loss_price := close - trailing_SL_buffer
else if strategy.position_size > 0
    if UPDATE_ATR_TSL and ATR_x2 < trailing_SL_buffer
        trailing_SL_buffer := ATR_x2
    stop_loss_price := max(stop_loss_price, close[1] - trailing_SL_buffer)
plot(stop_loss_price,color=trail_profit_line_color)
// }


IGNORE_BOLL_SHAPE = false//input(false,title="Ignore BOLL (vs ATR) during entry (experimental)")
IGNORE_VOLATILITY = false///input(false,title="Ignore average ATR during entry (experimental)")
// Main:
if within_timeframe
    // ENTRY:
    if (ATR_x2 > BOLL_sDEV_x2 or IGNORE_BOLL_SHAPE) and (avg_volat < avg_volat[1] or IGNORE_VOLATILITY)
        if strategy.position_size == 0
            entry_price := close
            trailing_SL_buffer := ATR_x2
            stop_loss_price := close - ATR_x2
            strategy.entry("Long",strategy.long, comment="enter")
        if strategy.position_size > 0
            strategy.entry("Long",strategy.long, comment="+")

    // EXIT:
    if strategy.position_size > 0
        if low <= stop_loss_price
            if close > entry_price
                strategy.close("Long", comment="take profit")
            else if low <= entry_price
                strategy.close("Long", comment="stop loss")
    
            if strategy.position_size == 0
                entry_price := 0
                
```

> Detail

https://www.fmz.com/strategy/442502

> Last Modified

2024-02-22 13:43:14
