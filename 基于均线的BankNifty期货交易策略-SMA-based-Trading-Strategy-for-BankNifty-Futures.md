
> Name

基于均线的BankNifty期货交易策略-SMA-based-Trading-Strategy-for-BankNifty-Futures

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b50ba101c2b3c61f82.png)

#### Overview
This strategy is an SMA-based trading strategy for BankNifty futures. The main idea of the strategy is to use SMA as a trend indicator, going long when the price crosses above the SMA and going short when the price crosses below the SMA. At the same time, the strategy also sets stop-loss and take-profit conditions to control risk and lock in profits.

#### Strategy Principle
The core of this strategy is to use SMA as a trend indicator. Specifically, the strategy first calculates the SMA of a specified period (default is 200), and then determines the trend direction based on the relative position of the price and the SMA. When the price crosses above the SMA, it is considered that an upward trend has formed, and a long position is taken; when the price crosses below the SMA, it is considered that a downward trend has formed, and a short position is taken. In addition, the strategy also sets stop-loss and take-profit conditions to control risk and lock in profits. The stop-loss conditions include: price breaking through the SMA by a certain range (set by the "Stop Loss Buffer" parameter), price breaking through the entry price by a certain range (set by the "Stop Loss" parameter), and trading time reaching 15:00. The take-profit condition is the price breaking through the entry price by a certain range (set by the "Target Price" parameter).

#### Strategy Advantages
1. Simple and easy to understand: This strategy is based on the classic technical indicator SMA, with a simple principle that is easy to understand and implement.
2. High adaptability: The strategy can be adapted to different market environments and trading varieties by adjusting parameters.
3. Risk control: The strategy sets multiple stop-loss conditions, which can effectively control potential losses. At the same time, the setting of take-profit conditions also helps to timely lock in profits.
4. Trend tracking: SMA is a lagging indicator, but it is precisely because of this that it can well confirm the formation of trends. This strategy utilizes this feature of SMA and can effectively capture the medium and long-term trends of the market.

#### Strategy Risks
1. Parameter sensitivity: The performance of this strategy largely depends on the choice of parameters, and different parameter settings may lead to vastly different results. Therefore, in practical application, parameters need to be optimized and tested.
2. Oscillating market: In an oscillating market, prices frequently cross above and below the SMA, which may lead to frequent trading of the strategy, thereby increasing transaction costs and risks.
3. Trend reversal: When the market trend reverses, the strategy may react with a delay, leading to potential losses.
4. Intraday volatility: The strategy may trigger trading signals at any time during the trading session, and the intraday volatility of BankNifty futures may be relatively large, which may lead to greater slippage and potential losses.

#### Strategy Optimization Directions
1. Parameter optimization: The most suitable parameter settings for the current market environment can be found by backtesting and optimizing different parameter combinations.
2. Combining with other indicators: Consider combining SMA with other technical indicators (such as RSI, MACD, etc.) to improve the reliability and accuracy of the strategy.
3. Dynamic stop-loss: Consider adopting a dynamic stop-loss strategy (such as trailing stop-loss) to better control risks.
4. Limiting trading time: Consider limiting trading time to periods with smaller volatility (such as before and after the opening and closing) to reduce the impact of intraday volatility.

#### Summary
This strategy is a simple trading strategy based on SMA, suitable for BankNifty futures. Its advantages lie in its simple principle, strong adaptability, and risk control measures. However, in practical application, attention still needs to be paid to potential risks such as parameter optimization, oscillating markets, trend reversal, and intraday volatility. In the future, the strategy can be optimized and improved from aspects such as parameter optimization, combination with other indicators, dynamic stop-loss, and limiting trading time.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_timeframe_1|5|Select Chart Timeframe|
|v_input_string_1|0|Method: SMA|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_int_1|200|Length|
|v_input_float_1|false|Alert Precision|
|v_input_timeframe_2|1|Select Stoploss Candle Timeframe|
|v_input_float_2|false|Stop Loss Buffer|
|v_input_float_3|150|Target Price|
|v_input_float_4|20|Stop Loss|
|v_input_int_2|false|Offset|


> Source (PineScript)

``` pinescript
// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Bhasker_S

//@version=5
strategy("Strategy BankNifty SMA", overlay=true, margin_long=100, margin_short=100)

src = input(close, title="Source")
timeFrame = input.timeframe(defval='5', title = "Select Chart Timeframe")
typeMA = input.string(title = "Method", defval = "SMA", options=["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"])
len = input.int(200, minval=1, title="Length", step = 10)
alertPrecision = input.float(0, "Alert Precision", minval = 0, maxval = 50, step=1)
slTimeFrame = input.timeframe(defval='1', title = "Select Stoploss Candle Timeframe")
slBuffer = input.float(0, "Stop Loss Buffer", minval = 0, maxval = 50, step = 1)
targetSlab = input.float(150, "Target Price", minval = 1, maxval = 2000, step = 10)
Stoploss  = input.float(20, "Stop Loss", minval = 1, maxval = 2000, step = 5)
offset = input.int(title="Offset", defval=0, minval=-500, maxval=500)

//out = ta.sma(src, len)


ma(source, length, type) =>
    switch type
        "SMA" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "SMMA (RMA)" => ta.rma(source, length)
        "WMA" => ta.wma(source, length)
        "VWMA" => ta.vwma(source, length)

tfSource = request.security(syminfo.tickerid, timeFrame, src, barmerge.gaps_on, barmerge.lookahead_off)
mySMA = ma(tfSource, len, typeMA)
plot(mySMA, color=color.rgb(243, 33, 89), title="MA", offset=offset, linewidth = 2)

slClose = request.security(syminfo.tickerid, slTimeFrame, src, barmerge.gaps_on, barmerge.lookahead_off)


highTravel = low > mySMA
lowTravel = high < mySMA

touchabove = (((high[1] + alertPrecision) > mySMA[1]) and (low[1] < mySMA[1])) //and (high[2] < mySMA[2])
touchbelow = (((low[1] - alertPrecision) < mySMA[1]) and (high[1] > mySMA[1])) //and (low[2] > mySMA[2])

crossabove = math.min(open, close) > mySMA
crossbelow = math.max(open, close) < mySMA

upalert = (touchabove or touchbelow) and crossabove
downalert = (touchabove or touchbelow) and crossbelow

h=hour(time('1'),"Asia/Kolkata")
m=minute(time('1'),"Asia/Kolkata")
startTime=h*100+m

if upalert and strategy.position_size == 0 
    strategy.entry("buy", strategy.long, 15)
    
if downalert and strategy.position_size == 0
    strategy.entry("sell", strategy.short, 15)

longexit = (slClose < (mySMA - slBuffer)) or (slClose < (strategy.opentrades.entry_price(strategy.opentrades - 1) - Stoploss)) or (slClose > (strategy.opentrades.entry_price(strategy.opentrades - 1) + targetSlab)) or (hour(time) == 15)
shortexit = (slClose > (mySMA + slBuffer)) or (slClose > (strategy.opentrades.entry_price(strategy.opentrades - 1) + Stoploss)) or (slClose < (strategy.opentrades.entry_price(strategy.opentrades - 1) - targetSlab)) or (hour(time) == 15)

if longexit
    strategy.close("buy")

if shortexit
    strategy.close("sell")

```

> Detail

https://www.fmz.com/strategy/446468

> Last Modified

2024-03-28 18:15:32
