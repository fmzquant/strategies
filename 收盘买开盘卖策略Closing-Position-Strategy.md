
> Name

收盘买开盘卖策略Closing-Position-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/124d8ec0582f2a23c24.png)

## Overview

The core idea of this strategy is to buy stocks at market close and sell them at next day's market open, in order to profit from the price increase at open.

## Strategy Logic

The strategy is based on two judgments:

1. Intraday traders tend to go long at market open, driving up opening prices.

2. Closing prices reflect the true value of stocks.

Specifically, the strategy checks if the closing price is above the 200-day simple moving average at market close (20:00). If yes, it goes long. If not, it goes short. 

At next day's market open (9:30), it closes long positions opened on previous day, and closes short positions as well.

By buying at low closing prices and selling at high opening prices, it aims to profit from the opening price increase.

## Advantage Analysis

The advantages of this strategy:

1. Utilize intraday traders' inertia to go long at open and sell for profit.

2. The 200-day MA helps identify the trend.

3. Low frequency with only two trade points daily reduces transaction costs.

4. Backtesting provides confidence in parameters.

5. Automated system minimizes emotional interference.

## Risk Analysis

The risks to consider:

1. Opening price may reverse sharply resulting in losses.

2. Closing price may be manipulated.

3. Stock suspension may prevent opening positions. 

4. High transaction costs make frequent trading expensive.

5. Improper parameter tuning leads to excessive trading or losses.

Solutions include:

1. Set stop loss to limit losses.

2. Check volume and adjustments to validate closing price.

3. Prioritize liquid stocks.  

4. Optimize MA length and trade times.

## Improvement Directions

The strategy can be improved by:

1. Adding stops to cut losses on opening reversal.

2. Using other indicators to determine price range.

3. Considering liquidity risk and selecting liquid stocks.

4. Testing different MA parameters. 

5. Optimizing open/close times.

6. Checking news for closing price validity. 

7. Considering transaction costs and selecting low-cost stocks.

8. Using multifactor models.

## Conclusion

The strategy profits from the opening price increase by buying low at close and selling high at open. It has some advantages but also risks to consider. Further optimizations on parameters, stops, stock selection can improve performance. Overall it provides a simple closing position strategy idea for intraday traders.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-10 00:00:00
end: 2023-11-09 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Youngmoneyinvestments

//@version=5
strategy("End of Day Trading Strategy", overlay=true)

// Get the daily open, high, low, and close prices
daily_open = request.security(syminfo.tickerid, "D", open)
daily_close = request.security(syminfo.tickerid, "D", close)

// Calculate the 200 period SMA on daily close
sma200 = ta.sma(daily_close, 200)

// Define the entry and exit conditions
end_of_day = (hour == 20) and (minute == 0) // Assuming the end of the regular trading hours is 20:00
start_of_day = (hour == 9) and (minute == 30) // Assuming the start of the trading session is 09:30

long_condition = end_of_day and (daily_close > sma200)
short_condition = end_of_day and (daily_close < sma200)

// Execute the strategy logic
if (long_condition)
    strategy.entry("Long", strategy.long)
if (short_condition)
    strategy.entry("Short", strategy.short)

// Exit conditions
if (strategy.position_size > 0 and start_of_day) // If we are long, sell at the open of the session
    strategy.close("Long")
if (strategy.position_size < 0 and start_of_day) // If we are short, buy at the open of the session
    strategy.close("Short")

// Plot the SMA on the chart
plot(sma200, "200 SMA", color=color.blue)

```

> Detail

https://www.fmz.com/strategy/431676

> Last Modified

2023-11-10 14:25:30
