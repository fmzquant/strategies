
> Name

三移动平均趋势跟踪策略Dazzling-Bolts-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11ea8dec289591b6f4e.png)

### Overview  

This strategy is named "Dazzling Bolts". It is a trend following strategy based on three moving averages. It uses the crossovers of fast, medium and slow lines to determine the price trend and sets targets and stops based on ATR values.  

### Strategy Logic   

The strategy employs the following three moving averages:  

1. 13-period weighted moving average, to gauge short-term trend  
2. 55-period exponential moving average, for medium-term trend
3. 110-period simple moving average, for long-term trend

When fast line crosses above medium line and medium line crosses above slow line, it signals an uptrend. When fast line crosses below medium line and medium line crosses below slow line, it signals a downtrend. 

To filter out some noise trades, several auxiliary conditions are set:   

1. Low prices of last 5 candles were all above medium line  
2. Low price of last 2 candles dropped below medium line
3. Close price of last candle was above medium line  

When these criteria are met, long or short signals will be triggered. It only holds one position each time and will not enter again until existing position is closed or stopped out.  

Targets and stops are placed based on certain multiples of ATR values.  

### Advantage Analysis   

The advantages of this strategy include:  

1. Using a combination of three moving averages avoids the chance of misjudgment from a single indicator.   
2. Multiple auxiliary conditions help improve signal quality by filtering out noise.
3. Dynamic ATR stop loss helps control single trade loss.  

### Risk Analysis   

The risks of this strategy also include:  

1. Moving average combination may give out wrong signals, requiring sufficient backtests.  
2. Improper ATR multiplier settings may lead to stops being too loose or tight.  
3. Unable to effectively filter price fluctuations from sudden events.  

To mitigate risks, properly adjust moving average parameters, optimize ATR multiplier, set maximum holding period to avoid excessive single trade loss.  

### Optimization Directions  

Possible optimizations for this strategy:  

1. Test moving averages of different lengths or types.  
2. Optimize parameters of auxiliary conditions.   
3. Try other indicators for trend prediction, e.g. MACD, DMI etc.
4. Incorporate volume indicators to filter signals.   

### Summary   

The "Dazzling Bolts" strategy is generally a steady trend following system. It mainly uses moving average crossovers to determine trend direction, with certain technical indicator combinations as auxiliary means to filter some noise. Although there is room for further optimization, its overall risk is controlled and it is suitable for investing along medium-to-long term trends.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|SMMA Period|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|55|EMA Period|
|v_input_4|110|SMA Period|
|v_input_5|true|Force trend with medium EMA|
|v_input_6|6|offsetemavalue|
|v_input_7|true|Test longs|
|v_input_8|true|Test shorts|
|v_input_9|12|ATR length|
|v_input_10|2|ATR muliplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-02 00:00:00
end: 2024-02-01 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © greenmask9

//@version=4
strategy("Dazzling Bolts", overlay=true)
//max_bars_back=3000

// 13 SMMA
len = input(10, minval=1, title="SMMA Period")
src = input(close, title="Source")
smma = 0.0
smma := na(smma[1]) ? sma(src, len) : (smma[1] * (len - 1) + src) / len

// 55 EMA
emalength = input(55, title="EMA Period")
ema = ema(close, emalength)

// 100 SMA
smalength = input(110, title="SMA Period")
sma = sma(close, smalength)

emaforce = input(title="Force trend with medium EMA", type=input.bool, defval=true)
offsetemavalue = input(defval = 6)

bullbounce = smma>ema and ema>sma and low[5]>ema and low[2]<ema and close[1]>ema and (ema[offsetemavalue]>sma or (not emaforce))
bearbounce = smma<ema and ema<sma and high[5]<ema and high[2]>ema and close[1]<ema and (ema[offsetemavalue]<sma or (not emaforce))
plotshape(bullbounce,  title= "Purple", location=location.belowbar, color=#ff33cc, transp=0, style=shape.triangleup, size=size.tiny, text="Bolts")
plotshape(bearbounce,  title= "Purple", location=location.abovebar, color=#ff33cc, transp=0, style=shape.triangledown, size=size.tiny, text="Bolts")
strategy.initial_capital = 50000
ordersize=floor(strategy.initial_capital/close)
longs = input(title="Test longs", type=input.bool, defval=true)
shorts = input(title="Test shorts", type=input.bool, defval=true)
atrlength = input(title="ATR length", defval=12)
atrm = input(title="ATR muliplier",type=input.float, defval=2)
atr = atr(atrlength)

target = close + atr*atrm
antitarget = close - (atr*atrm)

//limits and stop do not move, no need to count bars from since

bullbuy = bullbounce and longs and strategy.opentrades==0
bb = barssince(bullbuy)
bearsell = bearbounce and shorts and strategy.opentrades==0
bs = barssince(bearsell)

if (bullbuy)
    strategy.entry("Boltsup", strategy.long, ordersize)
    strategy.exit ("Bolts.close", from_entry="Boltsup", limit=target, stop=antitarget)
if (crossover(smma, sma))
    strategy.close("Boltsup", qty_percent = 100, comment = "Bolts.crossover")

if (bearsell)
    strategy.entry("Boltsdown", strategy.short, ordersize)
    strategy.exit("Bolts.close", from_entry="Boltsdown", limit=antitarget, stop=target)
if (crossunder(smma, sma))
    strategy.close("Boltsdown", qty_percent = 100, comment = "Bolts.crossover")

// if (bb<5)
//     bulltarget = line.new(bar_index[bb], target[bb], bar_index[0], target[bb], color=color.blue, width=2)
//     bullclose = line.new(bar_index[bb], close[bb], bar_index[0], close[bb], color=color.blue, width=2)
//     bullstop = line.new(bar_index[bb], antitarget[bb], bar_index[0], antitarget[bb], color=color.blue, width=2)
// if (bs<5)
//     bulltarget = line.new(bar_index[bs], antitarget[bs], bar_index[0], antitarget[bs], color=color.purple, width=2)
//     bullclose = line.new(bar_index[bs], close[bs], bar_index[0], close[bs], color=color.purple, width=2)
//     bullstop = line.new(bar_index[bs], target[bs], bar_index[0], target[bs], color=color.purple, width=2)

```

> Detail

https://www.fmz.com/strategy/440862

> Last Modified

2024-02-02 17:30:09
