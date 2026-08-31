
> Name

Trend-Following-Strategy-Based-on-Multi-Timeframe-Moving-Average-and-RSI

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9d3934477094d8b73c.png)

### Overview

This strategy identifies trend direction based on multi timeframe moving average and judges overbought/oversold situation with RSI to generate trading signals. When the long, medium and short MA lines are in the same direction, it is considered as a trend. At this point, RSI is used to determine if it is overbought/oversold and trading signals are generated. In addition, the strategy also adopts trailing stop loss to control risks.

### Strategy Logic  

The basic logic is to judge the trend through golden cross and death cross of fast and slow moving averages. When the fast line crosses above the slow line, it is a golden cross indicating a bull market. When the fast line crosses below the slow line, it is a death cross indicating a bear market. This strategy applies such logic in different timeframes to see if the long, medium and short terms are in the same direction. If they are all bull or bear, trading signals are generated. In addition, RSI helps avoid missing stop loss at inflection points. Trailing stop loss sets certain offset to let profits run while controlling risks.  

### Advantage Analysis

1. Using multiple timeframes to determine trends can effectively filter out short-term market noise and identify medium-long term trends.

2. RSI helps avoid insisting on original direction at inflection points and missing stop loss. 

3. Trailing stop loss considers both profit growth and risk control, leading to high return/risk ratio.

### Risk Analysis  

1. Multi timeframe determination may have time lag, resulting in late entry and missing early phase of the trend.

2. RSI only judges overbought/oversold status. It does not perform well in determining inflection points when sharp reversal happens.

3. Improper setup of trailing stop loss offset may lead to too aggressive or conservative behaviors. Parameter tuning is needed.

### Optimization Directions

1. Consider combining more indicators such as Bollinger Bands and KDJ to generate more precise trading signals.  

2. Adopt dynamic trailing stop loss that adjusts offset based on market volatility and risk appetite.

3. Apply similar logic in even shorter timeframes to better utilize capital.


### Summary

In general, this strategy has more pros than cons. It accurately determines medium-long term trends and delivers high return/risk payoff. As a trend following system, it can identify the major trend direction amid consolidations. Further improvements on parameters and indicators can enhance its stability and profitability.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|kaynak: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|21|hızlıbarlar|
|v_input_3|34|yavaşbarlar|
|v_input_4|240|uzunvade|
|v_input_5|60|ortavade|
|v_input_6|5|kısavade|
|v_input_7|60|aşırıalım|
|v_input_8|25|aşırısatış|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2024-01-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//Cryptocurrency Trading Tools by XMAXPRO
//ATA INDIKATORU
//Test 4.0v Tarih:23.02.2020
//

strategy("MTF+MA+RSI+TSL", overlay=false, shorttitle="ATA v4 Strategy")
src = input(title="kaynak", type=input.source, defval=close)
fast = input(title="hızlıbarlar", type=input.integer, defval=21)
slow = input(title="yavaşbarlar", type=input.integer, defval=34)

//MTF source
long = input(title="uzunvade", type=input.resolution, defval="240")
mid = input(title="ortavade", type=input.resolution, defval="60")
short = input(title="kısavade", type=input.resolution, defval="5")

//MTF Grafikleri
ln = security(syminfo.ticker, long, src)
md = security(syminfo.ticker, mid, src)
sh = security(syminfo.ticker, short, src)

//0
lnma = ema(ln, fast) - ema(ln, slow)
mdma = ema(sh, fast) - ema(md, slow)
shma = ema(sh, fast) - ema(sh, slow)

//Makeup
uzunrenk = lnma > 0 ? color.white : color.red
ortarenk = mdma > 0 ? color.white : color.red
kisarenk = shma > 0 ? color.white : color.red

l1 = 1
m1 = 2
s1 = 3

plot(l1, style=plot.style_line, color=uzunrenk, linewidth=25)
plot(m1, style=plot.style_line, color=ortarenk, linewidth=25)
plot(s1, style=plot.style_line, color=kisarenk, linewidth=25)

atarsi = rsi(close, 14)
rsiob = input(title="aşırıalım", type=input.integer, defval=60)
rsios = input(title="aşırısatış", type=input.integer, defval=25)

sell = atarsi > rsiob and lnma > 0 and mdma > 0 and shma > 0
buy = atarsi < rsios and lnma < 0 and mdma < 0 and shma < 0

barcolor(sell ? color.white : color.red)
barcolor(buy ? color.white : color.red)

//strateji
strategy.entry("long", strategy.long, comment = "BULL", when = sell)
strategy.entry("short", strategy.short, comment = "BEAR", when = buy)

//kompleks alarm
//alertcondition(sell, title = "ATA LONG SIGNAL", message = "btc/usd ata long sinyali")
//alertcondition(buy, title = "ATA SHORT SIGNAL", message = "btc/usd ata short sinyali")

//iz sürücü TSL
strategy.exit ("Bull TSL", "long", trail_points=close * 0.02 / syminfo.mintick, trail_offset=close * 0.02/syminfo.mintick)
strategy.exit ("Bear TSL", "short", trail_points=close * 0.02 / syminfo.mintick, trail_offset=close * 0.02/syminfo.mintick)
```

> Detail

https://www.fmz.com/strategy/438064

> Last Modified

2024-01-08 16:57:29
