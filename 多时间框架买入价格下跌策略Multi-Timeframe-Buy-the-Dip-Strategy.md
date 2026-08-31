
> Name

多时间框架买入价格下跌策略Multi-Timeframe-Buy-the-Dip-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/142fb76d5f12570661f.png)


## Overview

The multi timeframe buy the dip strategy is a relatively simple automated trading strategy that can generate impressive profits, especially during uptrend periods. Not all price dips are meant for buying though. This system is based on a multi timeframe approach to optimize each trade.

The strategy catches sudden price drops on the 1-hour timeframe when the price has increased significantly in the past 12 hours. During steep uptrends, profit taking actions result in flash crashes that provide great opportunities to enter at convenient prices. 

The setup of the script is optimized on the 30-min timeframe. You can adjust the parameters to fit different timeframes.

The system triggers a buy signal when:

- Price drops 1% from the previous two candles (1-hour timeframe = two 30-min candles)
- Price is up 3% from the last 12 hours (twenty-four 30-min candles equal the desired timeframe)

This setup has been optimized running over 150 backtests on more than 20 different crypto trading pairs. 

The strategy assumes each order to trade 30% of the available capital. A trading fee of 0.1% is taken into account. The fee is aligned with the base fee applied on Binance, the largest cryptocurrency exchange.

## Strategy Logic

The core idea of the multi timeframe buy the dip strategy is to combine both long term and short term timeframes to determine entry signals.

First, it checks the 1-hour timeframe to see if there is a sudden price drop. This is confirmed by checking if the current candle has dropped more than 1% compared to the previous two candles.

Second, it checks the 12-hour timeframe to see if there is a significant uptrend in the long term. This is confirmed by calculating if the price has increased more than 3% in the last 12 hours.

Only when there is a short term drop and a long term uptrend will a buy signal be triggered.

This combination avoids blindly buying into a long term downtrend while also capturing short term pullback opportunities. The mix of timeframes makes the strategy more robust and reliable.

Technically, the strategy uses two `perc_change()` functions with different parameters to check the two timeframes. One checks the 12-hour change, the other checks the 1-hour change. When both conditions are met, a buy signal is triggered.

## Advantage Analysis 

The biggest advantage of the multi timeframe buy the dip strategy is that it can effectively determine trends and capture pullback opportunities. Specifically, the main advantages are:

1. Combining two timeframes avoids buying into a long term downtrend, reducing unnecessary losses.

2. The short term timeframe captures sudden pullbacks that provide lower entry prices.

3. Backtested and optimized parameters make the strategy more suitable for the high volatility of crypto.

4. Trading fees are considered, making simulations closer to real trading.

5. Simple logic and parameter configuration make it easy to understand and tune.

6. Widely applicable to different trading pairs with high flexibility.

## Risk Analysis

The multi timeframe buy the dip strategy also has some risks, mainly in the following areas:

1. Cannot fully avoid false breakout risks, short term pullbacks could be trend reversals.

2. Fixed parameters may fail to adapt fully to market changes, requiring adjustments.

3. Backtests always perform well in simulations, differences exist in live trading.

4. Some time lag risks missing the optimal entry points during price fluctuations. 

5. A single strategy is prone to systemic risks.

6. High frequency trading increases the burden of trading fees.

For the risks, some optimization measures can be considered:

1. Add more indicators to determine short and long trends to improve accuracy.

2. Optimize parameters to make them adapt more dynamically to markets.

3. Test strategies in a live environment to measure differences from backtests.

4. Adjust timeframes appropriately to reduce time lag issues. 

5. Use multiple non-correlated strategies to diversify systemic risks. 

6. Set proper stop loss and take profit to control risk per trade.

## Optimization Directions 

There is still large room for optimizing the multi timeframe buy the dip strategy, mainly in these areas:

1. Add more indicators like Bollinger Bands, RSI etc. to improve stability.

2. Incorporate machine learning models for dynamic parameter optimization to adapt to changing markets.

3. Optimize stop loss and take profit strategies to lower risk per trade.

4. Backtest on more trading pairs and timeframes to find optimal parameter sets.

5. Incorporate volume change to avoid false signals from arbitrage trades.

6. Add risk management modules like asset allocation, position sizing etc. to control overall risk. 

7. Explore other algorithmic strategy types like trend following, arbitrage etc. for diversification.

8. Research more complex multi timeframe combinations to find optimal sets.

9. Incorporate news trading elements using events as trading drivers.

With these optimization techniques, the strategy can become more robust, intelligent and comprehensive for the complexity of crypto markets. But any optimization needs prudent testing to avoid overfitting problems.

## Conclusion

Overall, the multi timeframe buy the dip strategy is a very practical short term trading system. It looks at both short and long term time dimensions simultaneously to improve accuracy while remaining relatively efficient. With proper parameter tuning and optimization, it can adapt to most trading markets, especially trending assets.

But like any mechanical strategy, it has limitations that require the trader to remain rational and continuously optimize and adapt to changing markets. A successful strategy is always evolving, not static.

In conclusion, the multi timeframe buy the dip strategy provides an excellent template for algorithmic trading. It summarizes the key points like choosing timeframes, configuring parameters, backtesting, risk control etc. Applying this strategy sensibly and improving it through practice can help traders grasp the essential clues amidst a sea of data, and achieve consistent alpha in the markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|10|From Day|
|v_input_3|2020|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|24|Lookback Long Period|
|v_input_9|2|Lookback Short Period|
|v_input_10|true|v_input_10|
|v_input_11|3|v_input_11|
|v_input_12|3|v_input_12|
|v_input_13|4|v_input_13|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-26 00:00:00
end: 2023-10-26 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule

//@version=1
strategy(shorttitle='Multi Time Frame Buy the Dips',title='Multi Time Frame Buy the Dips (by Coinrule)', overlay=true, initial_capital = 1000, default_qty_type = strategy.percent_of_equity, default_qty_value = 30, commission_type=strategy.commission.percent, commission_value=0.1)


//Backtest dates
fromMonth = input(defval = 1,  title = "From Month")     
fromDay   = input(defval = 10,    title = "From Day")       
fromYear  = input(defval = 2020, title = "From Year")       
thruMonth = input(defval = 1,    title = "Thru Month")     
thruDay   = input(defval = 1,    title = "Thru Day")     
thruYear  = input(defval = 2112, title = "Thru Year")       

showDate  = input(defval = true, title = "Show Date Range")

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true       // create function "within window of time"

inp_lkb = input(24, title='Lookback Long Period')
inp_lkb_2 = input(2, title='Lookback Short Period')
 
perc_change(lkb) =>
    overall_change = ((close[0] - close[lkb]) / close[lkb]) * 100

// Call the function    
overall = perc_change(inp_lkb)
overall_2 = perc_change(inp_lkb_2)

//Entry

dip= -(input(1))
increase= (input(3))

strategy.entry(id="long", long = true, when = overall > increase and overall_2 < dip and window()) 

//Exit
Stop_loss= ((input (3))/100)
Take_profit= ((input (4))/100)

longStopPrice  = strategy.position_avg_price * (1 - Stop_loss)
longTakeProfit = strategy.position_avg_price * (1 + Take_profit)

strategy.close("long", when = close < longStopPrice or close > longTakeProfit and window())

```

> Detail

https://www.fmz.com/strategy/430383

> Last Modified

2023-10-27 16:56:23
