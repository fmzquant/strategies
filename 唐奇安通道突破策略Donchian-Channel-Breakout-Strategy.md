
> Name

唐奇安通道突破策略Donchian-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


# 

## Strategy Logic

The Donchian channel breakout strategy is a trend following strategy based on the Donchian channel. It uses the highest high and lowest low over specified periods to determine entry and stop loss points for long and short positions.

The entry rules are: go long when the price breaks above the highest high over a lookback period (e.g. 20 days), and go short when the price breaks below the lowest low over another lookback period (e.g. 10 days).  

The EXIT rules are: Long positions are stopped out at the middle or lower band of the channel; short positions are stopped out at the middle or upper band. The middle band is the average of the highest high and lowest low over a specified period (e.g. 10 days).

For example, trading BTCUSDT with the following parameters:

- Long entry lookback period: 20 days
- Long stop loss lookback period: 10 days  
- Stop loss at middle band: Yes
- Short entry lookback period: 10 days
- Short stop loss lookback period: 20 days
- Stop loss at middle band: Yes

The entry and stop rules would be:

- Go long when price breaks above the 20-day high 
- Long stop loss at midpoint of 10-day high and low
- Go short when price breaks below 10-day low
- Short stop loss at midpoint of 20-day high and low

By dynamically adjusting the lookback periods, the strategy can be optimized across market cycles to capture trends with better reward/risk. 

## Advantages

- Breakouts can identify trend direction early on 
- Stop losses close to price help manage risk
- Flexible parameters allow optimization for different cycles

## Risks

- Breakouts prone to whipsaws, need to confirm validity 
- Close stop losses susceptible to shakeouts in choppy markets
- Poor parameter tuning could lead to over-trading or insufficient stops

## Summary

The Donchian channel breakout uses breakouts to identify trends, with channel midpoints/bands as stops to control risk. Optimizing lookback periods can improve trend capture in strong moves. However, caution is needed on breakout validity and shakeouts. Overall this strategy suits mid- to long-term trend trading, but may struggle in choppy markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Channel Period for Long enter position|
|v_input_2|10|Channel Period for Long exit position|
|v_input_3|true|Is exit on Base Line? If 'no' - exit on bottom line|
|v_input_4|2.5|Take Profit (%) for Long position|
|v_input_5|true|Allow Long?|
|v_input_6|20|Channel Period for Short enter position|
|v_input_7|20|Channel Period for Short exit position|
|v_input_8|true|Is exit on Base Line? If 'no' - exit on upper line|
|v_input_9|2.5|Take Profit (%) for Short position|
|v_input_10|true|Allow Short?|
|v_input_11|2005|Test Start Year|
|v_input_12|true|Test Start Month|
|v_input_13|true|Test Start Day|
|v_input_14|2050|Test End Year|
|v_input_15|12|Test End Month|
|v_input_16|30|Test End Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Donchian Channel Strategy", overlay=true, default_qty_type= strategy.percent_of_equity, initial_capital = 1000, default_qty_value = 20, commission_type=strategy.commission.percent, commission_value=0.036)

//Long optopns
buyPeriodEnter = input(10, "Channel Period for Long enter position")
buyPeriodExit = input(10, "Channel Period for Long exit position")
isMiddleBuy = input(true, "Is exit on Base Line? If 'no' - exit on bottom line")
takeProfitBuy = input(2.5, "Take Profit (%) for Long position")
isBuy = input(true, "Allow Long?")

//Short Options
sellPeriodEnter = input(20, "Channel Period for Short enter position")
sellPeriodExit = input(20, "Channel Period for Short exit position")
isMiddleSell = input(true, "Is exit on Base Line? If 'no' - exit on upper line")
takeProfitSell = input(2.5, "Take Profit (%) for Short position")
isSell = input(true, "Allow Short?")

// Test Start
startYear = input(2005, "Test Start Year")
startMonth = input(1, "Test Start Month")
startDay = input(1, "Test Start Day")
startTest = timestamp(startYear,startMonth,startDay,0,0)

//Test End
endYear = input(2050, "Test End Year")
endMonth = input(12, "Test End Month")
endDay = input(30, "Test End Day")
endTest = timestamp(endYear,endMonth,endDay,23,59)

timeRange = time > startTest and time < endTest ? true : false

// Long&Short Levels
BuyEnter = highest(buyPeriodEnter)
BuyExit = isMiddleBuy ? ((highest(buyPeriodExit) + lowest(buyPeriodExit)) / 2): lowest(buyPeriodExit)

SellEnter = lowest(sellPeriodEnter)
SellExit = isMiddleSell ? ((highest(sellPeriodExit) + lowest(sellPeriodExit)) / 2): highest(sellPeriodExit)

// Plot Data
plot(BuyEnter, style=plot.style_line, linewidth=2, color=color.blue, title="Buy Enter")
plot(BuyExit, style=plot.style_line, linewidth=1, color=color.blue, title="Buy Exit", transp=50)
plot(SellEnter, style=plot.style_line, linewidth=2, color=color.red, title="Sell Enter")
plot(SellExit, style=plot.style_line, linewidth=1, color=color.red, title="Sell Exit", transp=50)

// Calc Take Profits
TakeProfitBuy = 0.0
TakeProfitSell = 0.0
if strategy.position_size > 0
    TakeProfitBuy := strategy.position_avg_price*(1 + takeProfitBuy/100)
    
if strategy.position_size < 0
    TakeProfitSell := strategy.position_avg_price*(1 - takeProfitSell/100)

// Long Position    
if isBuy and timeRange
    strategy.entry("Long", strategy.long, stop = BuyEnter, when = strategy.position_size == 0) 
    
strategy.exit("Long Exit", "Long", stop=BuyExit, limit = TakeProfitBuy, when = strategy.position_size > 0)

// Short Position
if isSell and timeRange
    strategy.entry("Short", strategy.short, stop = SellEnter, when = strategy.position_size == 0) 
    
strategy.exit("Short Exit", "Short", stop=SellExit, limit = TakeProfitSell, when = strategy.position_size < 0)

// Close & Cancel when over End of the Test
if time > endTest
    strategy.close_all()
    strategy.cancel_all()

```

> Detail

https://www.fmz.com/strategy/426772

> Last Modified

2023-09-14 14:44:44
