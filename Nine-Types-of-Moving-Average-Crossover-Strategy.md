
> Name

Nine-Types-of-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d05f084bf9d07aa949.png)

### Overview

This strategy uses two moving averages with different parameter settings for crossover operations to determine the trend direction and open/close positions. The strategy allows choosing from 9 different types of moving averages, including Simple Moving Average (SMA), Exponential Moving Average (EMA), Weighted Moving Average (WMA), Arnaud Legoux Moving Average (ALMA), Volume Weighted Moving Average (VWMA), etc. The strategy also sets stop loss and take profit levels.

### Strategy Logic  

The core logic of this strategy is to compare the values of two moving average lines and determine the market trend direction based on their crossover. Specifically, we set a fast line and a slow line using two moving averages. When the fast line crosses above the slow line, we believe the market is in an upward trend and go long. When the fast line crosses below the slow line, we believe the market is in a downward trend and go short.  

After entering a position, if the price touches the stop loss line, we exit the position to cut losses. If the price touches the take profit line, we exit the position to lock in profits as expected. This allows us to lock in profits and prevent losses from expanding further.

From the code logic, the strategy can be divided into four parts:  

1. Calculate the moving averages. Based on the user's selection of the moving average type, calculate the fast line and slow line moving averages.

2. Generate trading signals. Generate long and short signals based on the crossover situations of the fast line and slow line.   

3. Set stop loss and take profit levels. Based on the entry price and the set stop loss/take profit percentages, calculate the stop loss and take profit price levels in real time.  

4. Entry and exit. Enter based on the long/short signals, exit based on the stop loss/take profit signals.

### Advantage Analysis

The biggest advantage of this strategy is that it allows freely choosing from many types of moving averages. Different types of moving averages have different sensitivities to prices. Users can choose the appropriate moving average based on their own needs. In addition, the length of the moving averages can be customized to optimize the time dimension.   

Another advantage is that stop loss and take profit mechanisms are set. This can effectively prevent further losses and lock in profits. Overall, this strategy is quite flexible with high customizability, suitable for users with different needs.  

### Risk Analysis  

The main risk of this strategy is that moving averages have lagging. When prices suddenly fluctuate violently, moving averages cannot respond in time, which may lead to missing the best entry or exit time. This can lead to large losses.  

Another risk is the setting of stop loss and take profit levels. If the range is too small, it may be vulnerable to scalpers. If too large, it is easy to fail to lock in profits in time. Therefore, stop loss/take profit parameters need to be optimized according to market conditions during live trading.

In general, this strategy mainly relies on moving averages to determine the trend direction. So its effectiveness can be compromised when sudden events cause large price swings. In addition, parameter settings can also have a big impact on strategy returns.  

### Optimization Directions  

This strategy can be optimized in the following aspects:

1. Optimize the moving average type. Select more suitable moving averages based on different market environments and trading products.  

2. Optimize moving average parameters. Adjust the moving average length to make it fit better with market characteristics.  

3. Add other indicators for filtration. MACD, RSI and other indicators can be added to avoid frequent trading when there is no clear trend.

4. Optimize stop loss/take profit ratios. Calculate the optimal stop loss/take profit parameters based on historical data. 

5. Add machine learning models. Use LSTM, random forest algorithms to predict price movements and aid in generating trading signals.

6. Adopt trailing stop loss algorithms. Enable the stop loss line to move along with price movements gradually to reduce the probability of being hit.  

### Conclusion  

Overall, this strategy is relatively simple and straightforward. It determines the trend direction via crossover and belongs to a typical trend following strategy. The advantages are being easy to understand and highly flexible with customizable moving average types and parameters. The disadvantages are slower reactions to sudden events and some degree of lagging. In general, this strategy suits investors seeking long-term steady returns. Further improvements on stability and return can be achieved through optimization.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|MA Type: SMA|EMA|WMA|ALMA|VWMA|HMA|LSMA|SMMA|DEMA|
|v_input_2|5|Short MA Length|
|v_input_3_close|0|Short MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|15|Long MA Length|
|v_input_5_close|0|Long MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|0.85|ALMA Offset|
|v_input_7|6|ALMA Sigma|
|v_input_8|false|LSMA Offset|
|v_input_9|false|SL Level % (0 - Off)|
|v_input_10|false|PT Level % (0 - Off)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-26 00:00:00
end: 2024-01-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Kozlod - Yet Another Moving Average Cross Strategy", shorttitle="kozlod_yamacs", overlay = true)

// 
// author: Kozlod
// date: 2018-03-06
// 

////////////
// INPUTS //
////////////

ma_type      = input(title = "MA Type",          defval = "SMA", options = ['SMA', 'EMA', 'WMA', 'ALMA', 'VWMA', 'HMA', 'LSMA', 'SMMA', 'DEMA'])
short_ma_len = input(title = "Short MA Length",  defval = 5,     minval = 1)
short_ma_src = input(title = "Short MA Source",   defval = close)
long_ma_len  = input(title = "Long MA Length",   defval = 15,    minval = 2)
long_ma_src  = input(title = "Long MA Source",    defval = close)
alma_offset  = input(title = "ALMA Offset",     type = float,   defval = 0.85,  step = 0.01, minval = 0, maxval = 1)
alma_sigma   = input(title = "ALMA Sigma",      type = float,   defval = 6,     step = 0.01)
lsma_offset  = input(title = "LSMA Offset",      defval = 0,     step = 1)

sl_lev_perc  = input(title = "SL Level % (0 - Off)", type = float,   defval = 0,  minval = 0, step = 0.01)
pt_lev_perc  = input(title = "PT Level % (0 - Off)", type = float,   defval = 0,  minval = 0, step = 0.01)

// Set initial values to 0
short_ma = 0.0
long_ma  = 0.0

// Simple Moving Average (SMA)
if ma_type == 'SMA' 
    short_ma := sma(short_ma_src, short_ma_len)
    long_ma  := sma(long_ma_src,  long_ma_len)

// Exponential Moving Average (EMA)
if ma_type == 'EMA'
    short_ma := ema(short_ma_src, short_ma_len)
    long_ma  := ema(long_ma_src,  long_ma_len)

// Weighted Moving Average (WMA)
if ma_type == 'WMA'
    short_ma := wma(short_ma_src, short_ma_len)
    long_ma  := wma(long_ma_src,  long_ma_len)

// Arnaud Legoux Moving Average (ALMA)
if ma_type == 'ALMA'
    short_ma := alma(short_ma_src, short_ma_len,  alma_offset, alma_sigma)
    long_ma  := alma(long_ma_src,  long_ma_len,   alma_offset, alma_sigma)

// Hull Moving Average (HMA)
if ma_type == 'HMA'
    short_ma := wma(2*wma(short_ma_src, short_ma_len/2)-wma(short_ma_src, short_ma_len), round(sqrt(short_ma_len)))
    long_ma  := wma(2*wma(long_ma_src,  long_ma_len /2)-wma(long_ma_src,  long_ma_len),  round(sqrt(long_ma_len)))

// Volume-weighted Moving Average (VWMA)
if ma_type == 'VWMA'
    short_ma := vwma(short_ma_src, short_ma_len)
    long_ma  := vwma(long_ma_src,  long_ma_len)

// Least Square Moving Average (LSMA)
if ma_type == 'LSMA'
    short_ma := linreg(short_ma_src, short_ma_len, lsma_offset)
    long_ma  := linreg(long_ma_src,  long_ma_len,  lsma_offset)

// Smoothed Moving Average (SMMA)    
if ma_type == 'SMMA'
    short_ma := na(short_ma[1]) ? sma(short_ma_src, short_ma_len) : (short_ma[1] * (short_ma_len - 1) + short_ma_src) / short_ma_len
    long_ma  := na(long_ma[1])  ? sma(long_ma_src,  long_ma_len)  : (long_ma[1]  * (long_ma_len  - 1) + long_ma_src)  / long_ma_len

// Double Exponential Moving Average (DEMA)
if ma_type == 'DEMA'
    e1_short = ema(short_ma_src, short_ma_len)
    e1_long  = ema(long_ma_src,  long_ma_len)
    
    short_ma := 2 * e1_short - ema(e1_short, short_ma_len)
    long_ma  := 2 * e1_long  - ema(e1_long,  long_ma_len)

/////////////
// SIGNALS //
/////////////

long_signal  = crossover( short_ma, long_ma)
short_signal = crossunder(short_ma, long_ma)

// Calculate PT/SL levels 
// Initial values 
last_signal    = 0
prev_tr_price  = 0.0
pt_level       = 0.0
sl_level       = 0.0

// Calculate previous trade price
prev_tr_price := long_signal[1] or short_signal[1] ? open : nz(last_signal[1]) != 0 ? prev_tr_price[1] : na

// Calculate SL/PT levels 
pt_level := nz(last_signal[1]) == 1 ? prev_tr_price * (1 + pt_lev_perc / 100) : nz(last_signal[1]) == -1 ? prev_tr_price * (1 - pt_lev_perc / 100)  : na
sl_level := nz(last_signal[1]) == 1 ? prev_tr_price * (1 - sl_lev_perc / 100) : nz(last_signal[1]) == -1 ? prev_tr_price * (1 + sl_lev_perc / 100)  : na

// Calculate if price hit sl/pt 
long_hit_pt = pt_lev_perc > 0 and nz(last_signal[1]) ==  1 and close >= pt_level
long_hit_sl = sl_lev_perc > 0 and nz(last_signal[1]) ==  1 and close <= sl_level

short_hit_pt = pt_lev_perc > 0 and nz(last_signal[1]) ==  -1 and close <= pt_level
short_hit_sl = sl_lev_perc > 0 and nz(last_signal[1]) ==  -1 and close >= sl_level

// What is last active trade? 
last_signal := long_signal ? 1 : short_signal ? -1 : long_hit_pt or long_hit_sl or short_hit_pt or short_hit_sl ? 0 : nz(last_signal[1])

//////////////
// PLOTTING //
//////////////

// Plot MAs
plot(short_ma, color = red,   linewidth = 2)
plot(long_ma,  color = green, linewidth = 2)


// Plot Levels 
plotshape(prev_tr_price, style = shape.cross, color = gray, location  = location.absolute, size = size.small)


plotshape(sl_lev_perc > 0 ? sl_level : na, style = shape.cross, color = red,   location  = location.absolute, size = size.small)
plotshape(pt_lev_perc > 0 ? pt_level : na, style = shape.cross, color = green, location  = location.absolute, size = size.small)

//////////////
// STRATEGY //
//////////////

strategy.entry("long",  true,  when = long_signal)
strategy.entry("short", false, when = short_signal)

strategy.close("long",  when = long_hit_pt  or long_hit_sl)
strategy.close("short", when = short_hit_pt or short_hit_sl)
```

> Detail

https://www.fmz.com/strategy/437376

> Last Modified

2024-01-02 10:37:21
