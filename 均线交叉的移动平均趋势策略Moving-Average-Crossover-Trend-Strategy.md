
> Name

均线交叉的移动平均趋势策略Moving-Average-Crossover-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/111e8fb4472af32b401.png)

## Overview  

This trading strategy is based on a simple moving average and moving average crossover system for trend tracking. It uses the crossover of fast and slow moving averages with different periods as signals to go long or short. When the fast MA crosses above the slow MA from below, go long; when the fast MA crosses below the slow MA from above, go short. This strategy works well for products with obvious trends.  

## Strategy Logic  

The strategy uses a fast simple moving average like 60-day and a slow one like 200-day. The fast MA responds faster to price changes, reflecting short-term trends; while the slow MA responds slower and shows medium- to long-term trends.  

When the short MA crosses above the long MA from below, it signals that short-term prices start to rise and enter a bull market, so go long. When the short MA crosses below the long MA from above, it signals short-term prices start to fall and enter a bear market, so go short.

The strategy uses MA crossover to determine the trend direction. When short-term prices rise faster, the short MA will push the long MA up and cross it from below. This means an uptrend is emerging and long position should be taken. Conversely, when short-term prices fall faster, the short MA will pull the long MA down and cross it from above, implying a downtrend and short position should be taken.  

By capturing the inflection points of price trends using fast and slow MA crossovers, the strategy can adjust long/short positions accordingly. This is the main logic behind the strategy's trend determination and trade signal generation.

## Advantage Analysis

- Uses MA crossover to determine major trends, avoiding misleading by short-term market noises.
- Considers both short-term and medium- to long-term timeframes, more stable and reliable.  
- Implements simple and effective trend tracking, e.g. go long in uptrends and short in downtrends.
- Moving averages are widely applicable, easy to understand, and parameters are flexible.
- Risk management parameters are adjustable for controlled risks.

## Risk Analysis  

- The strategy relies on clear price trends, failures can happen during violent market swings.
- Whipsaws can produce many false signals during ranging markets, causing frequent opening and closing of positions.
- Moving averages have lags, potentially missing price turning points.  
- Improper parameter settings like stop loss too tight or take profit too wide can lead to premature exit or unwinding of profitable positions.
- Reasonable parameters need optimization according to the specifics of different products.

Methods like adjusting MA periods based on products' volatility frequency, improving stop loss/take profit using more complex indicators, adding volume filter etc. can optimize this strategy and improve stability.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Optimize fast and slow MA periods to adapt to products with different volatility frequencies. More combinations can be tested to find the optimum.

2. Improve entry conditions by adding more filters like volume spikes to reduce false signals.  

3. Improve stop loss/take profit like trailing stop or dynamic take profit to improve profitability.

4. Consider trading costs like commissions and add cost evaluation modules for more realistic backtests.

5. Design Parameter Universe to find optimal parameter combinations tailored to different products.  

6. Add local patterns identification to assist in determining trend turning points and improve timing of entries and exits.

Through systematic strategy optimization, profitability, stability can be greatly improved and drawdowns reduced.  

## Summary

The trading strategy determines trend shifts using MA crossovers, a typical trend-following strategy. It uses crossover between fast and slow MAs to generate long/short signals, identifying trend direction through the combination of the two. This strategy steadily and reliably captures trends and is easy to understand and implement. When optimized, it can adapt to most products and forms a fundamental quantitative trading strategy. Further improvements in profitability and win rate can be achieved by combining with other technical indicators, optimizing stop loss/take profit strategies etc.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|false|[RePaint] Uncheck to see real time results|
|v_input_1|60|Fast Length|
|v_input_2|275|Slow Length|
|v_input_float_1|42|Long Take Profit (%)|
|v_input_float_2|13|Long Stop (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-01-11 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © thebearfib
//
//@version=5
//

strategy("x-over 150d_200d_sma - Free", overlay = true)

repaint = input.bool(defval = false, title = "[RePaint] Uncheck to see real time results") //when you deselect it - it shows what would have happened in real time while trading the system
srcmc   = request.security(syminfo.tickerid, 'D', open, lookahead= repaint ? barmerge.lookahead_on : barmerge.lookahead_off, gaps=barmerge.gaps_off)

fast_length         = input(title="Fast Length", defval=60)
slow_length         = input(title="Slow Length", defval=275)

_fast               = ta.sma(srcmc,  fast_length)
_slow               = ta.sma(srcmc,  slow_length)

plot(_fast, 
  title="Fast SMA", 
  color=color.red,
  linewidth = 1) 

plot(_slow, 
  title="Slow SMA", 
  color=color.white,
  linewidth = 3)
//
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————————————————————————————————— Calculating  —————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//
longProfitPerc      = input.float(title="Long Take Profit (%)", minval=0.01, step=1.0, defval=42) * .01
longStopPerc        = input.float(title="Long Stop (%)",        minval=0.01, step=1.0, defval=13)  * .01
//
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————————————————————————————————— Stop Conditions   ————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
longExitPrice  = strategy.opentrades > 0 ? strategy.position_avg_price * (1 + longProfitPerc) : srcmc *  (1 + longProfitPerc)
longStopPrice = strategy.opentrades  > 0 ? strategy.position_avg_price * (1 - longStopPerc)   : srcmc *  (1 - longStopPerc)
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————————————————————————————————— Long Conditions   ————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
longCondition   = srcmc > _slow and  ta.crossover(_fast, _slow)
closeCondition  =  ta.crossover(srcmc, _slow)  

if (longCondition)
    strategy.entry("Entry (long)", strategy.long, comment="→ ?? ?????")

if (closeCondition)
    strategy.close("Entry (long)", comment=" ?? ???? ←")

if (strategy.position_size > 0)
    strategy.exit(id="XL", limit=longExitPrice, stop = longStopPrice, comment_profit = "Take Profit", comment_loss = "Stop Loss")
//
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// —————————————————————————————————  Never the End Just the beginning    —————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//
```

> Detail

https://www.fmz.com/strategy/438451

> Last Modified

2024-01-12 10:56:57
