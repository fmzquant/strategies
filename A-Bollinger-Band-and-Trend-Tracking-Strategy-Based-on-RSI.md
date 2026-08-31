
> Name

A-Bollinger-Band-and-Trend-Tracking-Strategy-Based-on-RSI

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10898e19338edc52248.png)

This strategy combines Bollinger Band and RSI indicators to identify key turning points in price trends. It establishes positions when trends reverse and then exits profitably by following the trend momentum.

## Overview

This strategy first uses the upper and lower bands of Bollinger Bands to determine the price oscillation range and direction. It then uses the RSI indicator to identify long and short opportunities. For example, when the RSI exits the overbought/oversold area and a golden cross appears near the lower band, it will establish a long position. Or when the RSI exits the overbought area and a death cross appears near the upper band, it will establish a short position. It then uses the dynamic stops of the Bollinger Bands for tracking stops and profit targets.

## Strategy Logic

This strategy mainly utilizes the combination of Bollinger Band and RSI indicators to identify key reversals in price trends. 

The Bollinger Band is a technical indicator that calculates the upper and lower bands based on the volatility range of prices. By calculating the standard deviation of prices, it determines the amplitude of price fluctuations and plots the upper and lower limits accordingly. The upper band represents the upper limit of price swings while the lower band represents the lower limit. When prices approach the upper band, it indicates that prices are oscillating upwards in a bull market, so a potential drop should be cautious about. When prices approach the lower band, it indicates accelerated drops, so potential bounces should be cautious about.

The RSI is a technical indicator that judges price trends and overbought/oversold conditions by calculating the strength of price rises and falls over a period of time. By comparing the average closing gains and average closing losses over a period of time, RSI measures the momentum of the ongoing price rises or drops. Above 70 RSI indicates overbought conditions while below 30 indicates oversold conditions, which implies potential price reversals.  

The trading signals of this strategy come from the combination of Bollinger Bands and RSI signals. When the RSI drops from the overbought zone to the neutral zone while prices break below the lower band of Bollinger Bands, it indicates the upside price trend is breaking down and shorting opportunities emerge. We can establish short positions. On the contrary, when the RSI rises from the oversold zone to the neutral zone while prices break above the upper band, it indicates the downside price trend is breaking up and long opportunities emerge. We can establish long positions.

After establishing positions, the upper and lower bands of Bollinger Bands will be used as dynamic stops for managing risks and profit targets. When prices reverse and break through those key levels again, we close positions in a timely manner.

## Advantages

The biggest advantage of this strategy is using Bollinger Bands and RSI indicators to verify each other when identifying key turning points of prices. Using Bollinger Bands alone can easily generate false signals. But by combining the overbought/oversold zones of RSI, false operations can be effectively avoided. Another advantage is using the dynamic upper and lower bands of Bollinger Bands as profit and loss stops, which is more flexible and reasonable than presetting fixed profit and loss stops.

## Risks

The main risks of this strategy are reflected in two aspects:


1. Improper parameter settings of Bollinger Bands. If the parameters of Bollinger Bands are set too large or too small, the effect of identifying increased oscillations will be greatly reduced.


2. False signals from indicators. This strategy mainly relies on Bollinger Bands combined with RSI indicators to identify key points. In some individual cases, the signals emitted may still be wrong. Blindly following them at that time can lead to losses.


To address the above risks, optimization can be done in the following aspects:


1. Test the optimal values of Bollinger Band parameters under different markets and cycle periods to set reasonable parameters.


2. Add other indicators to verify signals and avoid false judgments from single indicators. Indicators like KD can be added.


3. Add manual empirical rules to determine whether to participate based on specific market conditions.

## Optimization

The strategy can be further optimized in the following aspects:

1. Test and optimize Bollinger Band parameters to find the optimal parameters suitable for the underlying.  

2. Add stop loss and take profit strategies. Trailing stops or moving profit targets can be used to lock in bigger profits.

3. Combine more indicators and patterns for verifying entry signals to improve accuracy. Examples include volume price indicators, fundamental factors etc.  

4. Set up parameter optimization combinations according to the characteristics of different products and markets to build a strategy pool with multiple parameter combinations.

## Conclusion  

This strategy combines Bollinger Band and RSI indicators to identify key potential reversal points when the two indicators verify each other. It is relatively reliable in capturing key market points. The dynamic bands for stop loss and take profit are also reasonable. But there are still risks in this strategy, so other tools are needed to optimize and verify the operational strategy. Manual interference based on trading experience is also needed during live trading. In general, this is a typical quantitative trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6|RSI Period Length|
|v_input_int_1|200|Bollinger Period Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-28 00:00:00
end: 2024-02-04 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("TradeOptix 2.0", shorttitle="TradeOptix 2.0", overlay=true)


///////////// RSI
RSIlength = input(6, title='RSI Period Length')
RSIoverSold = 50
RSIoverBought = 50
price = close
vrsi = ta.rsi(price, RSIlength)


///////////// Bollinger Bands
BBlength = input.int(200, minval=1, title='Bollinger Period Length')
BBmult = 2  // input(2.0, minval=0.001, maxval=50,title="Bollinger Bands Standard Deviation")
BBbasis = ta.sma(price, BBlength)
BBdev = BBmult * ta.stdev(price, BBlength)
BBupper = BBbasis + BBdev
BBlower = BBbasis - BBdev
source = close
buyEntry = ta.crossover(source, BBlower)
sellEntry = ta.crossunder(source, BBupper)
plot(BBbasis, color=color.new(color.aqua, 0), title='Bollinger Bands SMA Basis Line')
p1 = plot(BBupper, color=color.new(#7787b9, 0), title='Bollinger Bands Upper Line')
p2 = plot(BBlower, color=color.new(#7787b9, 0), title='Bollinger Bands Lower Line')
fill(p1, p2, color = color.rgb(40, 226, 255, 90))





///////////// RSI + Bollinger Bands Strategy
long = ta.crossover(vrsi, RSIoverSold) and ta.crossover(source, BBlower)
close_long = ta.crossunder(vrsi, RSIoverBought) and ta.crossunder(source, BBupper)

if not na(vrsi)

    if long
        strategy.entry('Long', strategy.long, stop=BBlower, alert_message = "Exit")
        alert("Enter Calls")
    else
        strategy.cancel(id='Long')
        alert("Exit Calls")

    if close_long
        strategy.close('Long',alert_message = "Exit")
        alert("Exit Calls")


plotshape(long, title='UpTrend Begins', location=location.belowbar, style=shape.flag, size=size.tiny, color=color.new(color.green, 0))
plotshape(close_long, title='DownTrend Begins', location=location.abovebar, style=shape.flag, size=size.tiny, color=color.new(color.red, 0))


```

> Detail

https://www.fmz.com/strategy/441056

> Last Modified

2024-02-05 11:02:51
