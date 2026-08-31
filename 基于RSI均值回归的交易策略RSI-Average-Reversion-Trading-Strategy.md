
> Name

基于RSI均值回归的交易策略RSI-Average-Reversion-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview 

This strategy uses RSI average based on multiple price inputs to determine overbought/oversold and trades mean-reversion.

## Strategy Logic

1. Calculate RSI values based on close, open, high etc. 

2. Take arithmetic average of the RSI values to derive RSI mean.

3. RSI mean above 0.5 indicates overbought, below 0.5 oversold.

4. RSI mean reversion to the 0.5 midpoint generates trading signals.

5. Set RSI mean exit thresholds, like close long above 0.65, close short below 0.35.

6. Simple and clear trading logic easy to implement.

## Advantages

1. RSI mean improves stability using multiple price inputs.

2. Trading signals from RSI mean reversion, combining trend and reversal.

3. Intuitive RSI mean curve forms clear visual trading signals.

4. Default parameters simple and practical for mean reversion.

5. Concise code easy to understand and modify for beginners.


## Risks

1. RSI prone to false reversal signals resulting in losses. 

2. Inappropriate RSI parameters and threshold setups affect performance.

3. Relying solely on single RSI indicator leads to higher systematic risk.

4. Unable to confirm price reversal sustaining power. 

5. Trending markets tend to produce losses.


## Enhancement

1. Test and optimize RSI period for higher sensitivity.

2. Evaluate price input impacts on RSI mean.

3. Add trend filter to avoid counter-trend trades.

4. Incorporate other factors to confirm reversal signals.

5. Build dynamic stops mechanism for risk control.

6. Optimize entry, stop loss, take profit for higher efficiency.

## Conclusion

This strategy trades RSI mean reversion simply and viably for beginners. But risks include signal errors and trends exist. Multi-factor optimization and risk management improvements can make the strategy more robust and efficient as a reliable reversal system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|0.65|v_input_float_1|
|v_input_float_2|0.35|v_input_float_2|
|v_input_bool_1|true|(?Entries Type)Allow Long entries|
|v_input_bool_2|true|Allow Short entries|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-13 00:00:00
end: 2023-09-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=5
strategy("RSI Average Swing Bot")

long_only=input.bool(true, title="Allow Long entries", group="Entries Type")
short_only=input.bool(true, title="Allow Short entries", group="Entries Type")
rsiohlc4= ta.rsi(ohlc4,50)/100
rsiclose= ta.rsi(close,50)/100
rsiopen= ta.rsi(open,50)/100
rsihigh= ta.rsi(high,50)/100
rsihlc3= ta.rsi(hlc3,50)/100
rsihl2= ta.rsi(hl2,50)/100

hline(0.3, color=color.white, linestyle=hline.style_dashed, linewidth=2)
hline(0.5, color=color.white, linestyle=hline.style_dotted, linewidth=2)
hline(0.7, color=color.white, linestyle=hline.style_dashed, linewidth=2)
rsi_avg = (rsiohlc4+rsiclose+rsiopen+rsihigh+rsihl2+rsihlc3)/6

culoare = rsi_avg > 0.50? color.green : rsi_avg<0.50 ? color.red : color.yellow
plot(rsi_avg,color=culoare )


long = rsi_avg > 0.5 and rsi_avg[1]< 0.5
longexit = rsi_avg >= input.float(0.65, step=0.05)
short = rsi_avg < 0.5 and rsi_avg[1] >0.5
shortexit=rsi_avg<=input.float(0.35, step=0.05)

if(long_only)
    strategy.entry("long",strategy.long,when=long)
    strategy.close("long",when=longexit or short)

if(short_only)
    strategy.entry("short",strategy.short,when=short)
    strategy.close("short",when=shortexit or long)




```

> Detail

https://www.fmz.com/strategy/427384

> Last Modified

2023-09-20 15:38:45
