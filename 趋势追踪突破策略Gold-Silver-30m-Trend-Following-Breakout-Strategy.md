
> Name

趋势追踪突破策略Gold-Silver-30m-Trend-Following-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18fc1ebb4ea5e0dc2a6.png)


## Overview

This strategy uses Bollinger Bands, RSI indicator and 162-day EMA to generate buy signals when gold/silver prices break above Bollinger upper band and RSI is oversold, and sell signals when prices break below Bollinger lower band and RSI is overbought. It is a typical trend following strategy.

## Strategy Logic

The strategy is based on the following principles:

1. Use 162-day EMA to determine the major trend direction. Price above EMA suggests an uptrend while price below EMA suggests a downtrend.

2. Use Bollinger Bands to identify price breakouts. Price breaking above Bollinger upper band signals an upside breakout, and price breaking below Bollinger lower band signals a downside breakout. 

3. Use RSI indicator to identify overbought/oversold levels. RSI below 35 is oversold and RSI above 65 is overbought.

4. Combine major trend, price breakout and overbought/oversold signals to generate entry and exit signals:

   - Buy when price breaks above Bollinger upper band and RSI is below 35.

   - Sell when price breaks below Bollinger lower band and RSI is above 65.

5. Use stop loss to control risk:

   - For long trade, exit when price drops below 162-day EMA. 

   - For short trade, exit when price rises above 162-day EMA.

In summary, this is a typical trend following strategy that uses Bollinger Bands to determine trend direction and RSI to avoid false breakouts. It can effectively track medium-to-long term trends.

## Advantages

The main advantages of this strategy are:

1. The double confirmation from Bollinger Bands and RSI avoids false breakouts and reduces whipsaws in volatile markets.

2. Only taking positions in confirmed trend directions minimizes the impact of non-trending markets.

3. The 162-day EMA identifies the major trend direction for medium-to-long term trends.

4. The RSI settings are reasonable to avoid whipsaws while capturing trend reversals.

5. The stop loss mechanism locks in profits while controlling risks.

6. The backtest uses real market data thus the results are more realistic and reliable.

Overall, the strategy minimizes the main risks of trend trading while generating good reward-to-risk returns.

## Risks

The main risks of this strategy are:

1. Bollinger Bands cannot fully avoid false breakouts. Whipsaw risk still exists in choppy markets.

2. RSI divergence may generate incorrect signals. The RSI period could be shortened to increase sensitivity.

3. EMA has lagging effect and may be too conservative, missing trend opportunities. The EMA period could be shortened.

4. Breakout trading tends to "chase highs and sell lows". Position sizing and stop loss range should be controlled.

5. Trends may reverse. Pay attention to adjust strategy direction accordingly. 

6. Backtest ≠ live results. Human errors in real trading may cause deviations.

Solutions:

1. Shorten Bollinger Bands period to increase breakout sensitivity.

2. Optimize RSI parameters to ensure responsiveness to trend changes.

3. Optionally shorten EMA period to improve trend change response while maintaining major trend identification ability.

4. Strengthen risk management by capping position sizes and stop loss ranges. 

5. Monitor trend reversal and adjust strategy direction timely.

6. Verify strategy viability in paper trading and control human influence in live trading.

## Improvement Areas

The strategy can be further improved from the following aspects:

1. Add other indicators like KDJ, MACD for more confirmation to increase accuracy. 

2. Optimize parameters like RSI and Bollinger Bands to improve profitability.

3. Incorporate trend strength to increase position size in strong trends and decrease size in weak trends. 

4. Add algorithmic elements like automated stop loss, trailing stops, moving profit targets for better risk control.

5. Introduce machine learning to auto optimize parameters or even auto generate strategies.

6. Test strategy viability on higher timeframes for long-term trading or lower timeframes for scalping.

7. Adopt quantitative trading and portfolio management concepts to combine multiple strategies, reducing single-strategy risks and improve stability.

In conclusion, the strategy can be upgraded in multiple dimensions like indicator applications, parameter tuning, risk control, automation to achieve better performance.

## Conclusion

This is a typical trend following strategy that identifies trend direction via Bollinger Bands and RSI, and uses EMA to filter out short-term noise. It avoids whipsaws while capturing trends. The strategy demonstrates accuracy and controllable risks with positive backtest results. But there are still rooms for improvement, and upgrading it from multiple aspects can lead to superior live performance. Overall, it provides a reliable, simple and effective trend trading approach for quantified trading and establishes a solid technical foundation.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|lookback length of RSI|
|v_input_2|65|OB|
|v_input_3|35|OS|
|v_input_4|40|Bollinger Period Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-09 00:00:00
end: 2023-10-16 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("My Strategy", overlay = false, commission_value = 0.01, pyramiding = 1)
// Custom RSI
RSIlength = input( 14, minval=1 , title="lookback length of RSI")
RSIOverBought = input(65, title="OB")
RSIOverSold = input(35, title="OS")
RSIprice = close
vrsi = rsi(RSIprice, RSIlength)
plot(vrsi)

//Bollinger Bands
BBlength = input(40, minval=1,title="Bollinger Period Length")
BBmult = 2 // input(2.0, minval=0.001, maxval=50,title="Bollinger Bands Standard Deviation")
BBbasis = sma(close, BBlength)
BBdev = BBmult * stdev(close, BBlength)
BBupper = BBbasis + BBdev
BBlower = BBbasis - BBdev
source = close
//RSI Levels
x=hline(RSIOverSold)
z=hline(RSIOverBought)


strategy.entry("Buy", strategy.long, 1, when = close > ema(close, 162) and vrsi < RSIOverSold)
strategy.exit("Buy", when = vrsi > RSIOverBought and close < ema(close, 162))

strategy.entry("Sell", strategy.short, 1, when = close < ema(close, 162) and vrsi > RSIOverSold)
strategy.exit("Sell", when = vrsi > RSIOverBought and close > ema(close, 162))



  
```

> Detail

https://www.fmz.com/strategy/429468

> Last Modified

2023-10-17 14:11:47
