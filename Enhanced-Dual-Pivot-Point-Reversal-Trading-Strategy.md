
> Name

Enhanced-Dual-Pivot-Point-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/61059f2b1be7e56e34.png)


#### Overview
This strategy is an advanced trading system based on pivot point analysis that predicts potential trend reversals by identifying key turning points in the market. The strategy employs an innovative "pivot of pivot" approach combined with the ATR indicator for position management, forming a complete trading system. The strategy is applicable to multiple markets and can be optimized according to different market characteristics.

#### Strategy Principles
The core of the strategy is to identify market reversal opportunities through two levels of pivot point analysis. The first-level pivot points are basic highs and lows, while the second-level pivot points are significant turning points selected from the first-level pivot points. Trading signals are generated when price breaks through these key levels. The strategy also uses the ATR indicator to measure market volatility for determining stop-loss, take-profit levels, and position sizing.

#### Strategy Advantages
1. High Adaptability: The strategy can adapt to different market environments by adjusting parameters to suit different volatility levels.
2. Comprehensive Risk Management: Uses ATR for dynamic stop-loss settings, automatically adjusting protective measures based on market volatility.
3. Multi-level Confirmation: Reduces false breakout risks through two-layer pivot point analysis.
4. Flexible Position Management: Dynamically adjusts position size based on account size and market volatility.
5. Clear Entry Rules: Has explicit signal confirmation mechanisms, reducing subjective judgment.

#### Strategy Risks
1. Slippage Risk: May face significant slippage in highly volatile markets.
2. False Breakout Risk: May generate false signals during market consolidation.
3. Excessive Leverage Risk: Improper use of leverage can lead to severe losses.
4. Parameter Optimization Risk: Over-optimization may lead to overfitting.

#### Optimization Directions
1. Signal Filtering: Add trend filters to trade only in the direction of the main trend.
2. Dynamic Parameters: Automatically adjust pivot point parameters based on market conditions.
3. Multiple Time Frames: Add multiple time frame confirmation to improve accuracy.
4. Intelligent Stop-Loss: Develop smarter stop-loss strategies, such as trailing stops.
5. Risk Control: Add more risk control measures, such as correlation analysis.

#### Summary
This is a well-designed trend reversal trading strategy that builds a robust trading system through dual-layer pivot point analysis and ATR volatility management. The strategy's strengths lie in its adaptability and comprehensive risk management, but traders still need to use leverage cautiously and continuously optimize parameters. Through the suggested optimization directions, the strategy has room for improvement. This strategy is suitable for conservative traders and is a trading system worth studying and practicing in depth.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-04 00:00:00
end: 2024-12-04 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Pivot of Pivot Reversal Strategy [MAD]", shorttitle="PoP Reversal Strategy", overlay=true, commission_type=strategy.commission.percent, commission_value=0.1, slippage=3)

// Inputs with Tooltips
leftBars = input.int(4, minval=1, title='PP Left Bars', tooltip='Number of bars to the left of the pivot point. Increasing this value makes the pivot more significant.')
rightBars = input.int(2, minval=1, title='PP Right Bars', tooltip='Number of bars to the right of the pivot point. Increasing this value delays the pivot detection but may reduce false signals.')
atr_length = input.int(14, minval=1, title='ATR Length', tooltip='Length for ATR calculation. ATR is used to assess market volatility.')
atr_mult = input.float(0.1, minval=0.0, step=0.1, title='ATR Multiplier', tooltip='Multiplier applied to ATR for pivot significance. Higher values require greater price movement for pivots.')

allowLongs = input.bool(true, title='Allow Long Positions', tooltip='Enable or disable long positions.')
allowShorts = input.bool(true, title='Allow Short Positions', tooltip='Enable or disable short positions.')

margin_amount = input.float(1.0, minval=1.0, maxval=100.0, step=1.0, title='Margin Amount (Leverage)', tooltip='Set the leverage multiplier (e.g., 3x, 5x, 10x). Note: Adjust leverage in strategy properties for accurate results.')

risk_reward_enabled = input.bool(false, title='Enable Risk/Reward Ratio', tooltip='Enable or disable the use of a fixed risk/reward ratio for trades.')
risk_reward_ratio = input.float(1.0, minval=0.1, step=0.1, title='Risk/Reward Ratio', tooltip='Set the desired risk/reward ratio (e.g., 1.0 for 1:1).')
risk_percent = input.float(1.0, minval=0.1, step=0.1, title='Risk Percentage per Trade (%)', tooltip='Percentage of entry price to risk per trade.')

trail_stop_enabled = input.bool(false, title='Enable Trailing Stop Loss', tooltip='Enable or disable the trailing stop loss.')
trail_percent = input.float(0.5, minval=0.0, step=0.1, title='Trailing Stop Loss (%)', tooltip='Percentage for trailing stop loss.')

start_year  = input.int(2018, title='Start Year', tooltip='Backtest start year.')
start_month = input.int(1,    title='Start Month', tooltip='Backtest start month.')
start_day   = input.int(1,    title='Start Day',   tooltip='Backtest start day.')

end_year  = input.int(2100, title='End Year', tooltip='Backtest end year.')
end_month = input.int(1,    title='End Month', tooltip='Backtest end month.')
end_day   = input.int(1,    title='End Day',   tooltip='Backtest end day.')

date_start = timestamp(start_year, start_month, start_day, 00, 00)
date_end   = timestamp(end_year,   end_month,   end_day,   00, 00)
time_cond = time >= date_start and time <= date_end

// Pivot High Significant Function
pivotHighSig(left, right) =>
    pp_ok = true
    atr = ta.atr(atr_length)
    for i = 1 to left
        if high[right] < high[right + i] + atr * atr_mult
            pp_ok := false
    for i = 0 to right - 1
        if high[right] < high[i] + atr * atr_mult
            pp_ok := false
    pp_ok ? high[right] : na

// Pivot Low Significant Function
pivotLowSig(left, right) =>
    pp_ok = true
    atr = ta.atr(atr_length)
    for i = 1 to left
        if low[right] > low[right + i] - atr * atr_mult
            pp_ok := false
    for i = 0 to right - 1
        if low[right] > low[i] - atr * atr_mult
            pp_ok := false
    pp_ok ? low[right] : na

swh = pivotHighSig(leftBars, rightBars)
swl = pivotLowSig(leftBars, rightBars)

swh_cond = not na(swh)
var float hprice = 0.0
hprice := swh_cond ? swh : nz(hprice[1])

le = false
le := swh_cond ? true : (le[1] and high > hprice ? false : le[1])

swl_cond = not na(swl)
var float lprice = 0.0
lprice := swl_cond ? swl : nz(lprice[1])

se = false
se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])

// Pivots of pivots
var float ph1 = 0.0
var float ph2 = 0.0
var float ph3 = 0.0
var float pl1 = 0.0
var float pl2 = 0.0
var float pl3 = 0.0
var float pphprice = 0.0
var float pplprice = 0.0

ph3 := swh_cond ? nz(ph2[1]) : nz(ph3[1])
ph2 := swh_cond ? nz(ph1[1]) : nz(ph2[1])
ph1 := swh_cond ? hprice     : nz(ph1[1])

pl3 := swl_cond ? nz(pl2[1]) : nz(pl3[1])
pl2 := swl_cond ? nz(pl1[1]) : nz(pl2[1])
pl1 := swl_cond ? lprice     : nz(pl1[1])

pphprice := swh_cond and ph2 > ph1 and ph2 > ph3 ? ph2 : nz(pphprice[1])
pplprice := swl_cond and pl2 < pl1 and pl2 < pl3 ? pl2 : nz(pplprice[1])

// Entry and Exit Logic
if time_cond
    // Calculate order quantity based on margin amount
    float order_qty = na
    if margin_amount > 0
        order_qty := (strategy.equity * margin_amount) / close

    // Long Position
    if allowLongs and le and not na(pphprice) and pphprice != 0
        float entry_price_long = pphprice + syminfo.mintick
        strategy.entry("PivRevLE", strategy.long, qty=order_qty, comment="PivRevLE", stop=entry_price_long)
        if risk_reward_enabled or (trail_stop_enabled and trail_percent > 0.0)
            float stop_loss_price = na
            float take_profit_price = na
            float trail_offset_long = na
            float trail_points_long = na
            if risk_reward_enabled
                float risk_amount = entry_price_long * (risk_percent / 100)
                stop_loss_price := entry_price_long - risk_amount
                float profit_target = risk_amount * risk_reward_ratio
                take_profit_price := entry_price_long + profit_target
            if trail_stop_enabled and trail_percent > 0.0
                trail_offset_long := (trail_percent / 100.0) * entry_price_long
                trail_points_long := trail_offset_long / syminfo.pointvalue
            strategy.exit("PivRevLE Exit", from_entry="PivRevLE",
                          stop=stop_loss_price, limit=take_profit_price,
                          trail_points=trail_points_long, trail_offset=trail_points_long)
    // Short Position
    if allowShorts and se and not na(pplprice) and pplprice != 0
        float entry_price_short = pplprice - syminfo.mintick
        strategy.entry("PivRevSE", strategy.short, qty=order_qty, comment="PivRevSE", stop=entry_price_short)
        if risk_reward_enabled or (trail_stop_enabled and trail_percent > 0.0)
            float stop_loss_price = na
            float take_profit_price = na
            float trail_offset_short = na
            float trail_points_short = na
            if risk_reward_enabled
                float risk_amount = entry_price_short * (risk_percent / 100)
                stop_loss_price := entry_price_short + risk_amount
                float profit_target = risk_amount * risk_reward_ratio
                take_profit_price := entry_price_short - profit_target
            if trail_stop_enabled and trail_percent > 0.0
                trail_offset_short := (trail_percent / 100.0) * entry_price_short
                trail_points_short := trail_offset_short / syminfo.pointvalue
            strategy.exit("PivRevSE Exit", from_entry="PivRevSE",
                          stop=stop_loss_price, limit=take_profit_price,
                          trail_points=trail_points_short, trail_offset=trail_points_short)

// Plotting
plot(lprice, color=color.new(color.red, 55), title='Low Price')
plot(hprice, color=color.new(color.green, 55), title='High Price')
plot(pplprice, color=color.new(color.red, 0), linewidth=2, title='Pivot Low Price')
plot(pphprice, color=color.new(color.green, 0), linewidth=2, title='Pivot High Price')

```

> Detail

https://www.fmz.com/strategy/474036

> Last Modified

2024-12-05 15:06:15
