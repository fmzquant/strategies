
> Name

基于加权移动平均线策略Based-on-Weighted-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/650080ac4ebd13f03d.png)


## Overview

This is a 15-minute scalping strategy for the AUDNZD currency pair. The strategy uses multiple weighted moving averages (WMA) of different timeframes to construct trading signals and make high-frequency trades. Its advantage lies in the ability to capture short-term price fluctuations, suitable for agile traders who are good at making quick decisions. But the strategy also carries certain risks and needs to be applied cautiously by traders.

## Strategy Logic

The strategy employs 5 WMAs of varying periods, specifically 29-, 5-, 3-, 2- and 1-period WMAs. The trading logic is: when shorter-period WMAs successively cross above longer-period WMAs, a buy signal is generated; when shorter-period WMAs successively cross below longer-period WMAs, a sell signal is triggered. This catches trend changes over shorter time horizons.

Upon entering long positions, stop loss and take profit are set based on fixed input parameters to control risk and profit for each trade. The same applies for short positions.

## Advantage Analysis 

The biggest advantage of this strategy lies in its ability to capitalize on short-term price moves through high-frequency trading, thus leading to higher profit potential. Specific benefits include:

1. Short timeframe allows swift decisions. 15-minute is a short enough timeframe to reduce uncertainty through quick decisions.  

2. Trend identification with WMA. WMA gives more weight to recent prices, catching trend changes faster.

3. More accurate signals using multiple WMAs. Combining signals across 5 WMAs reduces false signals and improves accuracy.  

4. Strict risk control with stop loss and take profit. Pre-set levels ensure appropriate loss and profit control for every trade.

## Risk Analysis

Despite the advantages, there are also risks to note:

1. Time and focus required for active trading. Frequent trading demands trader's time and full attention to the market.

2. Higher false signals with short timeframes. 15-minute changes can be prone to noise and false signals. 

3. Small stop loss may increase losses. If set too tight, valid signals may hit stop loss prematurely.  

4. Impact of algorithmic trading. Increased machine trading now adds to short-term instability and unpredictability.

Facing these risks, traders should consider relaxing stop loss, referring to longer timeframes, identifying algorithmic trades, etc.

## Improvement Areas

There remains room for further enhancements:

1. Optimize WMA parameters for best fit. Experiment with more WMA combinations to find the best set for this currency pair.

2. Add filters to validate signals. Combine with momentum, volatility metrics, etc. to double check signals.

3. Refine stop loss and take profit mechanisms for risk control. Adaptive stop loss, moving stop loss, incremental profit taking etc. can be explored. 

4. Introduce algorithm to assist trading and risk management. Automated modules supplemented by human discretion can help avoid manual errors.  

## Conclusion
In conclusion, this WMA-based strategy specializes in capturing short-term price moves, suiting intraday scalping style trading. It demands focus and quick responses from traders to maximize performance. There remains extensive room for optimizing various aspects of this strategy to improve its well-roundedness.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-17 00:00:00
end: 2023-12-24 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="AUDNZD Scalp 15 minutes", overlay=true)

// Moving Averages
len1 = 29
len2 = 5
len3 = 3
len4 = 2
len5 = 1
src = close

wma1 = ta.wma(src, len1)
wma2 = ta.wma(src, len2)
wma3 = ta.wma(src, len3)
wma4 = ta.wma(src, len4)
wma5 = ta.wma(src, len5)

// Strategy
wma_signal = wma1 > wma2 and wma2 > wma3 and wma3 > wma4 and wma4 > wma5
wma_sell_signal = wma1 < wma2 and wma2 < wma3 and wma3 < wma4 and wma4 < wma5

// Position Management
risk = 5.30
stop_loss = 0
take_profit = 0

// Long Position
if wma_signal
    strategy.entry("Buy", strategy.long)
    
    if stop_loss > 0
        strategy.exit("Sell", from_entry="Buy", loss=stop_loss)
    
    if take_profit > 0
        strategy.exit("Sell", from_entry="Buy", profit=take_profit)

// Short Position
if wma_sell_signal
    strategy.entry("Sell", strategy.short)
    
    if stop_loss > 0
        strategy.exit("Cover", from_entry="Sell", loss=stop_loss)
    
    if take_profit > 0
        strategy.exit("Cover", from_entry="Sell", profit=take_profit)

```

> Detail

https://www.fmz.com/strategy/436529

> Last Modified

2023-12-25 15:32:08
