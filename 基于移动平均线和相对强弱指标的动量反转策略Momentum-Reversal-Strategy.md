
> Name

基于移动平均线和相对强弱指标的动量反转策略Momentum-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16fae42bd960bf52f99.png)

## Overview

This strategy is a momentum reversal strategy based on moving averages and the relative strength index (RSI). It uses the crossover of fast and slow moving averages along with overbought and oversold signals to determine entries and exits.

## Strategy Logic

The strategy uses a 14-day moving average as the fast signal line and a 28-day moving average as the slow line. It also incorporates the RSI indicator to gauge whether the market is overbought or oversold.  

When the 14-day MA crosses above the 28-day MA and the RSI is below 30 or the RSI is below 13, it signals a reversal in the momentum to the upside, prompting a long entry. When the 14-day MA crosses back below the 28-day MA, it signals a failure of the momentum reversal which prompts a partial profit taking exit.

In addition, the strategy has a partial profit-taking mechanism. When the profit of the open position reaches the set take profit level (default 8%), it will partially take profit (default selling 50%).

## Advantage Analysis

The strategy combines the advantages of moving averages while avoiding whipsaw losses.

1. Using fast and slow moving averages filters out some noise.  

2. RSI gauges overbought and oversold levels, avoiding chasing new highs.  

3. The partial profit-taking locks in some profits and reduces risk.

## Risk Analysis  

1. Dual moving average crossovers can produce whipsaws, leading to losses. This strategy uses the RSI to provide additional confirmation, filtering some whipsaw signals.

2. Partial profit-taking may result in missing larger moves. The take profit level can be adjusted to balance risk versus reward.

## Optimization Directions

1. Test different parameter combinations of moving averages to find optimal settings.

2. Test different RSI threshold levels.  

3. Adjust partial profit-taking take profit level and sell ratio to balance risk/reward.

## Conclusion

Overall this is a typical mean reversion strategy. It uses fast/slow MA crosses to determine market turns supplemented by RSI to filter signals. It also implements partial profit taking to lock in some profits. The strategy is simple yet practical. Parameters can be adjusted to suit different market conditions.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|8|Take Profit|
|v_input_3|50|Percent of Quantity to Sell|
|v_input_4|true|Close Overbought and Take Profit|
|v_input_5|14|SMA Signal Period|
|v_input_6|28|SMA Longer Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-02 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title = "14/28 SMA and RSI", shorttitle = "14/28 SMA and RSI", overlay = false, pyramiding = 0, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, currency = currency.USD)
src = close, len = input(14, minval=1, title="Length")
take_Profit=input(8, title="Take Profit")
quantityPercentage=input(50, title="Percent of Quantity to Sell")
closeOverbought=input(true, title="Close Overbought and Take Profit")
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
longCondition = 0
sellCondition = 0
takeProfit = 0
quantityRemainder = 100
smaSignal = input(14, title="SMA Signal Period")
smaLong = input(28, title="SMA Longer Period")
if ((sma(close, smaSignal) >= sma(close, smaLong) and rsi<= 30) or (rsi<=13)) and strategy.position_size==0
    longCondition:=1

if longCondition==1
    strategy.entry("Buy", strategy.long)
    
profit = ((close-strategy.position_avg_price)/strategy.position_avg_price) * 100

if sma(close, smaSignal) <= sma(close, smaLong) and strategy.position_size>1
    sellCondition := 1

if strategy.position_size>=1
    if closeOverbought == true
        if profit>=take_Profit and takeProfit == 0
            strategy.exit("Take Profit", profit=take_Profit, qty_percent=quantityPercentage)
            takeProfit:=1
            quantityRemainder:=100-quantityPercentage
    if sellCondition == 1 and quantityRemainder<100
        strategy.close("Buy")

    if closeOverbought == false and rsi>70
        strategy.close("Take Profit")
        
plot(longCondition, "Buy Condition", green)
plot(takeProfit, "Partial Sell Condition", orange)
plot(sellCondition, "Sell Condition", red)
```

> Detail

https://www.fmz.com/strategy/437557

> Last Modified

2024-01-03 17:14:15
