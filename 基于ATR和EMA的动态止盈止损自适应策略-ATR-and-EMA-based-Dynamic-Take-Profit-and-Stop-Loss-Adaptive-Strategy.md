
> Name

基于ATR和EMA的动态止盈止损自适应策略-ATR-and-EMA-based-Dynamic-Take-Profit-and-Stop-Loss-Adaptive-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a758e7bc25dfcb6827.png)


#### Overview
This strategy utilizes two indicators, ATR (Average True Range) and EMA (Exponential Moving Average), to dynamically adjust take profit and stop loss levels in order to adapt to market volatility. The main idea of the strategy is to use the ATR indicator to measure market volatility and set take profit and stop loss levels based on the magnitude of volatility. At the same time, the EMA indicator is used to determine the trading direction. When the price breaks above the EMA, a long position is opened, and when the price breaks below the EMA, a short position is opened. This strategy can automatically adjust take profit and stop loss levels according to changes in market volatility, thereby achieving the purpose of dynamic risk control.

#### Strategy Principle
1. Calculate the ATR indicator to measure the magnitude of market volatility.
2. Calculate the dynamic stop loss level based on the ATR value and the input multiple parameter.
3. Use the EMA indicator as a filter condition. Open a long position when the price breaks above the EMA, and open a short position when the price breaks below the EMA.
4. While holding a position, continuously adjust the take profit and stop loss levels based on price changes and dynamic stop loss level changes.
5. When the price reaches the dynamic stop loss level, close the position and open a reverse position.

#### Strategy Advantages
1. Strong adaptability: By dynamically adjusting take profit and stop loss levels, the strategy can adapt to changes in volatility under different market conditions and control risks.
2. Strong trend-following ability: The EMA indicator is used to determine the trading direction, which can effectively capture market trends.
3. Adjustable parameters: By adjusting the ATR period and multiple parameters, the risk and return of the strategy can be flexibly controlled.

#### Strategy Risks
1. Parameter setting risk: The setting of the ATR period and multiple parameters will directly affect the performance of the strategy. Improper parameter settings may lead to strategy failure.
2. Oscillating market risk: In an oscillating market, frequent opening and closing of positions may lead to large slippage and transaction fee losses.
3. Trend reversal risk: When the market trend reverses, the strategy may experience consecutive losses.

#### Strategy Optimization Directions
1. Introduce more technical indicators, such as MACD and RSI, to improve the accuracy of trend judgment.
2. Optimize the calculation method of take profit and stop loss levels, such as introducing trailing stop loss and dynamic ratio stop loss methods.
3. Optimize parameters to find the best combination of ATR period and multiple parameters to improve the stability and profitability of the strategy.
4. Add a position management module to dynamically adjust position size based on market volatility and account risk level.

#### Summary
This strategy utilizes the ATR and EMA indicators to dynamically adjust take profit and stop loss levels to adapt to changes in market volatility, while using the EMA indicator to determine the trading direction. The strategy has strong adaptability and trend-following capabilities, but may face certain risks in parameter settings, oscillating markets, and trend reversals. In the future, the performance of the strategy can be improved by introducing more technical indicators, optimizing take profit and stop loss algorithms, parameter optimization, and adding position management modules.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-27 00:00:00
end: 2024-05-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy(title='UT MB&SS Bot', overlay=true)

// Inputs
a = input(1, title='Key Value. \'This changes the sensitivity\'')
c = input(10, title='ATR Period')
h = input(false, title='Signals from Heikin Ashi Candles')
stoploss = input(2.0, title='Stop Loss (ATR Multiples)')

xATR = ta.atr(c)
nLoss = a * xATR

src = h ? request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close, lookahead=barmerge.lookahead_off) : close

var xATR_trailing_stop = 0.0
iff_1 = src > nz(xATR_trailing_stop[1], 0) ? src - nLoss : src + nLoss
iff_2 = src < nz(xATR_trailing_stop[1], 0) and src[1] < nz(xATR_trailing_stop[1], 0) ? math.min(nz(xATR_trailing_stop[1]), src + nLoss) : iff_1
xATR_trailing_stop := src > nz(xATR_trailing_stop[1], 0) and src[1] > nz(xATR_trailing_stop[1], 0) ? math.max(nz(xATR_trailing_stop[1]), src - nLoss) : iff_2

pos = 0
iff_3 = src[1] > nz(xATR_trailing_stop[1], 0) and src < nz(xATR_trailing_stop[1], 0) ? -1 : nz(pos[1], 0)
pos := src[1] < nz(xATR_trailing_stop[1], 0) and src > nz(xATR_trailing_stop[1], 0) ? 1 : iff_3

xcolor = pos == -1 ? color.red : pos == 1 ? color.green : color.blue

ema = ta.ema(src, 1)
above = ta.crossover(ema, xATR_trailing_stop)
below = ta.crossover(xATR_trailing_stop, ema)

buy = src > xATR_trailing_stop and above
sell = src < xATR_trailing_stop and below

barbuy = src > xATR_trailing_stop
barsell = src < xATR_trailing_stop

plotshape(buy, title='Buy', text='Buy', style=shape.labelup, location=location.belowbar, color=color.new(color.green, 0), textcolor=color.new(color.white, 0), size=size.tiny)
plotshape(sell, title='Sell', text='Sell', style=shape.labeldown, location=location.abovebar, color=color.new(color.red, 0), textcolor=color.new(color.white, 0), size=size.tiny)

barcolor(barbuy ? color.green : na)
barcolor(barsell ? color.red : na)

stop_level = pos == 1 ? xATR_trailing_stop - stoploss * xATR : xATR_trailing_stop + stoploss * xATR
stop_level := math.max(stop_level, nz(stop_level[1]))

if pos == 1
    strategy.exit('Exit Long', 'UT Long', stop=stop_level)
else if pos == -1
    strategy.exit('Exit Short', 'UT Short', stop=stop_level)





if buy
    strategy.entry("Enter Long", strategy.long)
else if sell
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/452716

> Last Modified

2024-05-28 14:15:56
