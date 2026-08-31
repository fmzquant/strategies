
> Name

Cross-Pair-Bollinger-Band-Crossover-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15a8b77a40093a1b4a7.png)

### Overview
This strategy generates buy and sell signals by comparing the crossover of the MACD indicator's fast line and slow line. When a buy signal is generated, it will open a position with a certain percentage of the account equity. Additional positions will then be added at specific retracement points. When the accumulated profit of the positions reaches the configured take profit point, all positions will be closed. The logic for sell signals is similar to buy signals.

### Strategy Logic
The core logic of this strategy is to compare the crossover of the MACD fast line and slow line to determine the trend. MACD is the difference between moving averages, by calculating the difference between short-term and long-term moving averages, it judges market trend and momentum. The crossover between the fast line and slow line is considered golden cross and death cross.  

When the fast line crosses above the slow line, a golden cross is generated, indicating the market is in an upward trend, and the strategy will open long positions. When the fast line crosses below the slow line, a death cross is generated, indicating a downward trend, and the strategy will open short positions.

After opening positions, the strategy will add to existing long or short positions at specific retracement points. This can increase profit potential through the Martingale principle. When the accumulated profit reaches the configured take profit point, the strategy will close all positions.

### Advantage Analysis 
This strategy has the following advantages:

1. Uses the MACD indicator to determine market trend, which is a classic and reliable technical analysis indicator.  

2. Adopts the approach of opening positions in batches, which can control the risk of a single trade.

3. Adding to positions can expand profit potential through the Martingale principle.  

4. Configuring take profit point to limit losses.

### Risk Analysis
This strategy also has some risks:  

1. The MACD indicator cannot perfectly predict market movements, false signals may occur.

2. There is risk that retracement will expand with full position adding. Can appropriately adjust the percentage of each position added.  

3. Setting take profit point too small may limit profit potential. Can adjust for different products. 

4. Need to configure reasonable percentage of capital for opening positions per product to avoid exceeding account limits.

### Optimization Directions
This strategy can be optimized in the following aspects:

1. Test MACD parameters, find parameters that fit better for specific trading products.

2. Optimize money percentage and retracement percentage for each position added, find optimum parameter combinations.  

3. Test long-term and short-term take profit points respectively to determine optimal levels.

4. Evaluate account’s margin capability, set reasonable maximum position limit per product. 

5. Add stop loss logic. Stop loss can effectively control losses when drastic market change occurs.

### Summary 
In summary, this is a typical trend following strategy. It uses MACD indicator to determine market trend direction, takes the approach of adding positions in batches to follow the trend, and takes profit when accumulated profit reaches a certain level. This simple and practical strategy is easy to implement and suitable for quantitative trading beginners. By optimizing parameters and expanding risk control logic, the strategy can become more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|300|SignalFast|
|v_input_int_2|600|SignalSlow|
|v_input_float_1|2.5|StepAddPurchases|
|v_input_int_3|6|VolumePurchases|
|v_input_1|true|Buy|
|v_input_2|true|Sell|
|v_input_float_2|true|Long Take Profit (%)|
|v_input_float_3|true|Short Take Profit (%)|
|v_input_float_4|1.6|Martingale|
|v_input_int_4|100|VolumeDepo|
|v_input_float_5|10|PercentOfDepo|
|v_input_3|2005|Test Start Year|
|v_input_4|true|Test Start Month|
|v_input_5|true|Test Start Day|
|v_input_6|2050|Test End Year|
|v_input_7|12|Test End Month|
|v_input_8|30|Test End Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-26 00:00:00
end: 2023-12-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © TradingSoft_tech

//@version=5
strategy("MAPM-V1", overlay=true, default_qty_value=10, max_bars_back=5000,default_qty_type = strategy.percent_of_equity, commission_value=0.1, initial_capital = 100, pyramiding=6, currency=currency.USD)

///////// Options
SignalFast = input.int(300, step=10)
SignalSlow = input.int(600, step=10)
StepAddPurchases = input.float(2.5, step=0.1)
VolumePurchases = input.int(6,step=1)
Buy = input(true)
Sell = input(true)
longProfitPerc = input.float(title="Long Take Profit (%)", minval=0.0, step=0.1, defval=1) * 0.01
shortProfitPerc = input.float(title="Short Take Profit (%)", minval=0.0, step=0.1, defval=1) * 0.01
Martingale = input.float(1.6, minval = 1, step = 0.1)
VolumeDepo = input.int(100, step=1)
PercentOfDepo = input.float(10, step=1)
Close = (close)
EnterVolume = VolumeDepo*PercentOfDepo*0.01/Close

///////// Calculation indicator
fastAverage = ta.ema(close, 8)
slowAverage = ta.ema(close, 49)
macd = fastAverage - slowAverage
macdSignalF = ta.ema(macd,SignalFast)
macdSignalS = ta.ema(macd,SignalSlow)

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

///////// Plot Data
//plot(macd, style = plot.style_histogram)
//plot(macdSignalF*10000, style = plot.style_line, color=color.red)
//plot(macdSignalS*10000, style = plot.style_line, color=color.blue)
//plot(fastAverage, style = plot.style_line, color=color.red)
//plot(slowAverage, style = plot.style_line, color=color.blue)

///////// Calculation of the updated value
var x = 0.0
if strategy.opentrades>strategy.opentrades[1]
    x := x + 1
else if strategy.opentrades==0
    x := 0
y = x+1

///////// Calculation of reference price data
entryPrice = strategy.opentrades==0? 0 : strategy.opentrades.entry_price(0)
limitLong = strategy.position_avg_price * (1 + longProfitPerc)
limitShort = strategy.position_avg_price * (1 - shortProfitPerc)
SteplimitLong = entryPrice[0]*(1-StepAddPurchases*y/100)
SteplimitShort = entryPrice[0]*(1+StepAddPurchases*y/100)

///////// Conditions for a long
bool EntryLong = ta.crossover(macdSignalF, macdSignalS) and Buy and strategy.opentrades==0 and strategy.position_size==0
bool PurchasesLong = Buy and strategy.opentrades==x and strategy.position_size>0 and x<=VolumePurchases
bool CancelPurchasesLong = strategy.position_size==0 and strategy.opentrades==0
bool TPLong = strategy.position_size>0 and strategy.opentrades!=0
///////// Entry Long + add.purchases + cancel purchases + Take profit Long
switch 
    EntryLong => strategy.entry("Entry Long", strategy.long, qty = EnterVolume)
    PurchasesLong => strategy.entry("PurchasesLong", strategy.long, qty = EnterVolume*math.pow(Martingale,y), limit = SteplimitLong)
    CancelPurchasesLong => strategy.cancel("PurchasesLong")
switch
    TPLong => strategy.exit("TPLong", qty_percent = 100, limit = limitLong)

///////// Conditions for a Short
bool EntryShort = ta.crossunder(macdSignalF, macdSignalS) and Sell and strategy.opentrades==0 and strategy.position_size==0
bool PurchasesShort = Sell and strategy.opentrades==x and strategy.position_size<0 and x<=VolumePurchases
bool CancelPurchasesShort = strategy.position_size==0 and strategy.opentrades==0
bool TPShort = strategy.position_size<0 and strategy.opentrades!=0

///////// Entry Short + add.purchases + cancel purchases + Take profit Short
switch
    EntryShort => strategy.entry("Entry Short", strategy.short, qty = EnterVolume)
    PurchasesShort => strategy.entry("PurchasesShort", strategy.short, qty = EnterVolume*math.pow(Martingale,y), limit = SteplimitShort)
    CancelPurchasesShort => strategy.cancel("PurchasesShort")
switch
    TPShort => strategy.exit("TPShort", qty_percent = 100, limit = limitShort)
    
/////////Calculation of conditions and reference data for level drawing
InTradeLong = strategy.position_size<0
InTradeShort = strategy.position_size>0
PickInLong = strategy.opentrades.entry_price(0)*(1-StepAddPurchases*y/100)
PickInShort = strategy.opentrades.entry_price(0)*(1+StepAddPurchases*y/100)

/////////Displaying the level of Take Profit
plot(InTradeLong ? na : limitLong, color=color.new(#00d146, 0), style=plot.style_linebr, linewidth=1)
plot(InTradeShort ? na : limitShort, color=color.new(#00d146, 0), style=plot.style_linebr, linewidth=1)

/////////Displaying the level of add.purchases
plot(InTradeLong ? na : PickInLong, color=color.white, style=plot.style_linebr, linewidth=1)
plot(InTradeShort ? na : PickInShort, color=color.white, style=plot.style_linebr, linewidth=1)
```

> Detail

https://www.fmz.com/strategy/436753

> Last Modified

2023-12-27 14:28:21
