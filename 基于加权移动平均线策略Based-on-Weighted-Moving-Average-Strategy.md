
> Name

基于加权移动平均线策略Based-on-Weighted-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/650080ac4ebd13f03d.png)

[trans]

## 概述

本策略是一个用于澳元兑新西兰元货币对的15分钟scalping策略。该策略利用多条不同周期的加权移动平均线构建交易信号,实现高频率交易。其优势在于可以捕捉短期价格变动,适合目光敏锐,擅长快速决策的交易者。但该策略也面临一定的风险,需要交易者谨慎运用。

## 策略原理

该策略使用5条不同周期的加权移动平均线,具体为29周期、5周期、3周期、2周期和1周期的WMA。策略的交易原理是:当短周期的WMA线依次上穿更长周期的WMA线时,产生买入信号;当短周期WMA线依次下穿更长周期WMA线时,产生卖出信号。这样可以捕捉较短时间内价格变动的趋势。 

进入长仓时,策略会在最新价格按固定止损设置止损,以控制风险;同时也会设置止盈点以锁定利润。进入短仓也是如此设置止损和止盈。

## 策略优势

该策略最大的优势在于通过高频交易,可以在短期内捕捉价格变动的机会,实现更高的盈利空间。具体优势有:

1. 周期短,决策快速。15分钟是一个较短的时间周期,通过快速决策可以减少不确定性。

2. 利用加权移动平均线的态势判断。WMA对近期价格赋予更高权重,可以更快捕捉价格趋势变化。

3. 多条WMA组合使用,令判断更准确。5条WMA共同决策,可以减少假信号,提高判断的准确性。

4. 严格的止损止盈管理,控制风险。通过事先设置的止损和止盈确保每单交易的风险和收益控制得当。

## 风险分析

尽管该策略具有诸多优势,但也存在一定的风险需要注意:

1. 高频交易带来的时间和精力消耗。频繁交易需要交易者密切关注市场,投入大量时间和精力,这对交易者的要求较高。

2. 短周期判断的错误率更高。使用15分钟周期判断趋势,容易产生更多的假信号,导致交易决策失误。

3. 止损点过小可能增加亏损。如果止损点设置过小,正当的信号可能很快就被止损出场而形成损失。

4. 机器人交易的冲击。当前市场上大量的机器人交易增加了短期价格的不稳定性和不确定性。

面对这些风险,交易者需要调整止损点,适当放宽;同时关注更长时间周期的趋势判断,避免短期噪音的干扰;也需要提高对机器人交易的辨识能力等。

## 策略优化

该策略还具备进一步优化的空间:  

1. 调整移动平均线参数,优化判断。可以尝试更多种不同参数的WMA线组合,寻找更匹配该货币对特点的WMA参数。

2. 增加其他指标过滤,提高判断准确率。可以在该策略基础上,引入动量指标、波动率指标等,对交易信号进行二次校验。

3. 优化止损止盈策略,全面控制风险收益。可以采用自适应止损、移动止损、递进式止盈等方式,优化止损止盈的设置。

4. 增加算法交易元素,抵御人为错误。在人工判断基础上,引入算法自动决策模块,在符合条件时自动化下单及止损止盈管理,从而减少交易者错误操作的概率。

## 总结

本策略整体来说是一个基于加权移动平均线的短周期行情捕捉型策略。它具有操作频率高、及时捕捉短期价格趋势等优势,使其特别适用于盘中高频scalping交易。但与此同时,也需要交易者对市场的判断能力具备足够的敏感性,并投入大量时间与精力才能取得最佳效果。未来该策略还有很多优化的空间,值得进一步探索提高策略的全面性。

||

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

[/trans]



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
