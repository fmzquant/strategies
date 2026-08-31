
> Name

均线回归交易策略Linear-Regression-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1bdbc5242543b5629d9.png)



## Overview

The Linear Regression Moving Average trading strategy generates buy and sell signals based on the crossovers between a linear regression line and moving average of the stock price. This strategy combines trend following with linear regression analysis to identify potential reversals and achieve buying low and selling high.

## Strategy Logic

The strategy first calculates a n-day linear regression line and m-day moving average of the stock price. The regression line captures long term statistical trends while the moving average reflects short term momentum. 

When the moving average crosses above the regression line, it signals strengthening upside momentum and generates a buy signal. When the moving average crosses below, it signals weakening upside and produces a sell signal.

Specifically, the strategy follows these steps to determine trade signals:

1. Calculate n-day linear regression line of prices lrLine

2. Calculate m-day simple moving average of lrLine called lrMA 

3. Calculate m-day exponential moving average of prices called ema

4. When ema crosses above lrMA, generate buy signal longEntry

5. When ema crosses below lrMA, generate sell signal longExit

6. Only consider buy signals when market is bullish

7. Execute trades based on the signals

By using crossover between regression and moving averages to determine entries, the strategy can effectively filter out false breaks and identify reversals for buying low and selling high.

## Advantages

- Combines trend and regression analysis for accurate signal identification 
- Regression line is simple to calculate and implement
- Uses market filtering to avoid unfavorable trades
- Customizable parameters for adjusting strategy
- Achieves buying low and selling high for profit

## Risks

- Frequent crossovers during volatility may generate false signals
- Inaccurate market filters lead to mistimed entries
- Poor parameter tuning impacts strategy performance 
- High trading frequency leads to higher costs

Parameters should be tuned to increase moving average and regression line periods and reduce trade frequency. Reasonable stop losses should be implemented to control risks. Market filters can be enhanced to improve accuracy.

## Enhancements

The strategy can be optimized in several aspects:

1. Moving average optimization by testing different types of MAs

2. Regression line optimization by adjusting calculation period 

3. Market filter optimization by testing different indicators

4. Parameter optimization through rigorous backtesting

5. Stop loss optimization by testing different stop loss logics 

6. Cost optimization by adjusting trade frequency based on costs

These optimizations can further improve the stability and profitability of the strategy. 

## Conclusion

The Linear Regression MA strategy integrates strengths of trend analysis and linear regression for effective reversal identification and buying low selling high. The straightforward strategy is suitable for stock picking over medium to long term horizons. With parameter tuning and risk control, the strategy can achieve even higher stability. It provides a viable technical trading framework for market analysis.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|Execute Long Trades|
|v_input_bool_2|true|Execute Short Trades|
|v_input_bool_3|true|Execute Stop Loss|
|v_input_float_1|10|Max Profit (%)|
|v_input_float_2|1.75|Stop Loss (%)|
|v_input_1|true|Show Date Range|
|v_input_int_1|true|(?Date Info)Start Month|
|v_input_int_2|true|Start Day|
|v_input_int_3|2022|Start Year|
|v_input_int_4|55|(?Averages)Linear Regression Line|
|v_input_int_5|55|Linear Regression MA|
|v_input_int_6|55|EMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-18 00:00:00
end: 2023-10-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © lazy_capitalist

//@version=5
strategy('Linear Regression MA', overlay=true, initial_capital=10000)
datesGroup = "Date Info"
startMonth = input.int(defval = 1,    title = "Start Month",  minval = 1, maxval = 12,  group=datesGroup)
startDay   = input.int(defval = 1,    title = "Start Day",    minval = 1, maxval = 31,  group=datesGroup)
startYear  = input.int(defval = 2022, title = "Start Year",   minval = 1970,            group=datesGroup)

averagesGroup = "Averages"
lrLineInput     = input.int(title="Linear Regression Line",   defval=55, minval = 1, group=averagesGroup)
lrMAInput       = input.int(title="Linear Regression MA",     defval=55, minval = 1, group=averagesGroup)
emaInput        = input.int(title="EMA Length",               defval=55, minval = 1, group=averagesGroup)


tradesGroup = "Execute Trades"
executeLongInput    = input.bool(title="Execute Long Trades",       defval=true)
executeShortInput   = input.bool(title="Execute Short Trades",      defval=true)
executeStopLoss     = input.bool(title="Execute Stop Loss",         defval=true)

fourHrSMAExpr       = ta.sma(close, 200)
fourHrMA            = request.security(symbol=syminfo.tickerid, timeframe="240", expression=fourHrSMAExpr)

bullish             = close > fourHrMA ? true : false


maxProfitInput              = input.float(  title="Max Profit (%)",         defval=10.0,    minval=0.0)   * 0.01
stopLossPercentageInput     = input.float(  title="Stop Loss (%)",          defval=1.75,    minval=0.0)   * 0.01

start       = timestamp(startYear, startMonth, startDay, 00, 00)            // backtest start  window
window()    => time >= start ? true : false                              // create function "within window of time"
showDate    = input(defval = true, title = "Show Date Range")

lrLine = ta.linreg(close, lrLineInput, 0)
lrMA   = ta.sma(lrLine, lrMAInput)
ema     = ta.ema(close, emaInput)

longEntry   = ema   < lrMA
longExit    = lrMA  < ema

shortEntry  = lrMA  < ema
shortExit   = ema   < lrMA


maxProfitLong   = strategy.opentrades.entry_price(0) * (1 + maxProfitInput)
maxProfitShort  = strategy.opentrades.entry_price(0) * (1 - maxProfitInput)

stopLossPriceShort  = strategy.position_avg_price * (1 + stopLossPercentageInput)
stopLossPriceLong   = strategy.position_avg_price * (1 - stopLossPercentageInput)

if(executeLongInput and bullish)
    strategy.entry( id="long_entry", direction=strategy.long,   when=longEntry and window(),    qty=10,  comment="long_entry")
    strategy.close( id="long_entry", when=longExit,     comment="long_exit")
    // strategy.close( id="long_entry", when=maxProfitLong <= close, comment="long_exit_mp")
    
if(executeShortInput and not bullish)
    strategy.entry( id="short_entry", direction=strategy.short,   when=shortEntry and window(),    qty=10,  comment="short_entry")
    strategy.close( id="short_entry", when=shortExit,     comment="short_exit")
    // strategy.close( id="short_entry", when=maxProfitShort <= close, comment="short_exit_mp")

if(strategy.position_size > 0 and executeStopLoss)
    strategy.exit(  id="long_entry",        stop=stopLossPriceLong,             comment="exit_long_SL")
    strategy.exit(  id="short_entry",       stop=stopLossPriceShort,            comment="exit_short_SL")
    
// plot(series=lrLine,     color=color.green)
plot(series=lrMA,       color=color.red)
plot(series=ema,        color=color.blue)

```

> Detail

https://www.fmz.com/strategy/430113

> Last Modified

2023-10-25 10:58:02
