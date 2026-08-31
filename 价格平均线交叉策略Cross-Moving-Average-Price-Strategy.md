
> Name

价格平均线交叉策略Cross-Moving-Average-Price-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/921f515563ea1b184b.png)


### Overview

This strategy is essentially a moving average cross strategy. By calculating the moving average of prices and setting certain short-term and long-term moving averages, go long when the short-term moving average crosses above the long-term moving average from the bottom; go short when the short-term moving average crosses below the long-term moving average from the top.

### Principles

The core idea of price moving average cross strategy is: the moving average of price can effectively reflect the trend of price change. The strategy judges the change of market trend through setting two moving averages of different cycles and certain trading logic to generate trading signals.

The strategy calculates a longer-term moving average and a shorter-term one. The long line mainly judges the major trend, and the short line is used to capture medium-term fluctuations during the major trend. The trading signals of the strategy mainly come from the cross of the short line over the long line: the long signal when the short line crosses above the long line, and the short signal when the short line crosses below. In addition, the strategy filters the signals to avoid false signals.

Specifically, the strategy uses 7 different types of moving averages, including SMA, EMA, VWMA, etc. Users can select the moving average type. The length of the moving average can also be flexibly set. In addition, the strategy also provides restrictions on certain trading time periods and position management mechanisms. Through these settings, users can flexibly adjust the parameters of the strategy to adapt to different varieties and market environments.

### Advantage Analysis 

The main advantages of price moving average cross strategy are as follows:

1. The strategy logic is clear and simple, easy to understand and implement, suitable for beginners to learn.

2. The principle of strategy is robust, based on fully verified rules of moving average trading, and has been practically tested in markets.

3. The parameters of the strategy are flexible and adjustable. Users can choose appropriate parameters according to their own judgments and preferences on the market.

4. The strategy has certain risk control mechanisms to reduce the holding time of losing orders and prevent unnecessary reverse positions.

5. The strategy contains multiple types of moving averages. Users can select the most suitable moving average type for their trading varieties. 

6. The strategy supports enabling trading logic during specific trading time periods to avoid abnormal fluctuations in major holiday markets.

### Risk Analysis

Although the price moving average cross strategy has many advantages, there are still some risks in actual trading, which are mainly reflected in the following two aspects:

1. Due to the lag of most moving averages, cross signals may appear in the later stage after the price reversal is completed, which is easy to be trapped.

2. In case of improper parameter settings, cross signals may be too frequent, resulting in too high trading activity and more trading costs.

In response to the above risks, controls and coping methods are carried out in following ways:

1. Control the risk of single loss by setting appropriate stop loss range. 

2. Reduce trading frequency and prevent over-trading by adding filter conditions. For example, setting up price channel or price fluctuation range conditions.

3. Optimize parameters of moving average to select the most suitable combination of parameters for your own trading varieties and cycles. Test the stability of strategy under different market conditions.  

### Optimization

There is still room for further optimization of this price moving average crossover strategy. It can be done in following aspects:

1. Increase protection mechanism under extreme market conditions. For example, suspend trading temporarily during violent price fluctuations to avoid abnormal market conditions.

2. Increase more filter conditions and combined trading signals to improve signal quality and stability. For example, identify trendy crossovers combined with other technical indicators.

3. Adopt dynamic parameter system. According to market conditions and characteristics of varieties, automatically adjust key parameters such as moving average length, trading switch, etc. instead of using fixed values.

4. Apply this moving average crossover signal in advanced strategies like composite variety arbitrage. Combine it with other information for in-depth strategy optimization.

These suggestions above can broaden the applicable environment and effectiveness of this strategy and achieve better risk-reward tradeoff.  

### Conclusion

This article makes a detailed code analysis and interpretation of the simple moving average crossover strategy - Noro's CrossMA. We analyze its strategy idea, principle structure, main advantages and possible improvement directions. Overall, this strategy has clear logic and is simple and practical. The flexible parameter adjustment can adapt to many trading environments. We also dissect existing problems and risks in the strategy and give targeted advice. It is believed that through these comprehensive analysis and discussions, traders can better understand such types of strategies and help them to continuously optimize real trading systems.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|long|
|v_input_2|true|short|
|v_input_3|100|Lot, %|
|v_input_4|0|MA type: SMA|EMA|VWMA|DEMA|TEMA|KAMA|PCMA|
|v_input_5_close|0|MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|30|MA length|
|v_input_7|false|MA offset|
|v_input_8|true|Anti-saw filter|
|v_input_9|true|Show MA|
|v_input_10|false|Show background|
|v_input_11|1900|From Year|
|v_input_12|2100|To Year|
|v_input_13|true|From Month|
|v_input_14|12|To Month|
|v_input_15|true|From day|
|v_input_16|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-20 00:00:00
end: 2023-11-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2019

//@version=4
strategy(title = "Noro's CrossMA", shorttitle = "CrossMA", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100.0, pyramiding = 0, commission_value = 0.1)

needlong = input(true, "long")
needshort = input(true, "short")
lotsize = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot, %")
type = input(defval = "SMA", options = ["SMA", "EMA", "VWMA", "DEMA", "TEMA", "KAMA", "PCMA"], title = "MA type")
src = input(close, defval = close, title = "MA Source")
len = input(30, defval = 30, minval = 1, title = "MA length")
off = input(00, defval = 00, minval = 0, title = "MA offset")
anti = input(true, defval = true, title = "Anti-saw filter")
showma = input(true, defval = true, title = "Show MA")
showbg = input(false, defval = false, title = "Show background")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//DEMA
dema = 2 * ema(src, len) - ema(ema(close, len), len)

//TEMA
xPrice = close
xEMA1 = ema(src, len)
xEMA2 = ema(xEMA1, len)
xEMA3 = ema(xEMA2, len)
tema = 3 * xEMA1 - 3 * xEMA2 + xEMA3

//KAMA
xvnoise = abs(src - src[1])
nfastend = 0.20
nslowend = 0.05
nsignal = abs(src - src[len])
nnoise = sum(xvnoise, len)
nefratio = iff(nnoise != 0, nsignal / nnoise, 0)
nsmooth = pow(nefratio * (nfastend - nslowend) + nslowend, 2)
kama = 0.0
kama := nz(kama[1]) + nsmooth * (src - nz(kama[1]))

//PriceChannel
lasthigh = highest(src, len)
lastlow = lowest(src, len)
center = (lasthigh + lastlow) / 2

sma_1 = sma(src, len)
ema_1 = ema(src, len)
vwma_1 = vwma(src, len)
ma2 = type == "SMA" ? sma_1 : type == "EMA" ? ema_1 : type == "VWMA" ? vwma_1 : type == "DEMA" ? dema : type == "TEMA" ? tema : type == "KAMA" ? kama : type == "PCMA" ? center : 0
ma = ma2[off]

macol = showma ? color.blue : na
plot(ma, color = macol, linewidth = 3, transp = 0)

//Background
trend = 0
trend := anti == false and close > ma ? 1 : anti == false and close < ma ? -1 : low > ma ? 1 : high < ma ? -1 : trend[1]
bgcol = showbg ? trend == 1 ? color.lime : trend == -1 ? color.red : na : na
bgcolor(bgcol, transp = 70)

//Trading
size = strategy.position_size
truetime = time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)
lot = 0.0
lot := size != size[1] ? strategy.equity / close * lotsize / 100 : lot[1]
if trend == 1 and trend[1] == -1
    strategy.entry("Long", strategy.long, lot, when = needlong and truetime)
if trend == -1 and trend[1] == 1
    strategy.entry("Short", strategy.short, lot, when = needshort and truetime)
if size > 0 and needshort == false and trend == -1
    strategy.close_all()
if size < 0 and needlong == false and trend == 1
    strategy.close_all()
if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
    strategy.cancel("Long")
    strategy.cancel("Short")
```

> Detail

https://www.fmz.com/strategy/433441

> Last Modified

2023-11-27 16:52:19
