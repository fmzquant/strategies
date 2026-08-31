
> Name

双均线SuperTrend量化交易策略Dual-Moving-Average-Supertrend-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/df20367480981f1e97.png)

## Overview

This strategy combines the dual moving average and Supertrend indicators to construct trading signals and judges the trend direction through different cycle combinations to achieve high profitability.

## Principle  

This strategy uses the MACD and Supertrend indicators to determine market entry timing. MACD dual moving averages determine short-term trend direction, while Supertrend determines medium-to-long-term trend direction.  

When the fast line breaks through the slow line upward, it is a buy signal. At this time, if the medium-to-long-term Supertrend is also an upward trend, the final buy signal is generated to go long. On the contrary, when the fast line breaks through the slow line downward, it is a sell signal. At this time, if the medium-to-long term Supertrend is also a downward trend, the final sell signal is generated to go short.

The stop loss and take profit are set to fixed values.

## Advantage Analysis  

The biggest advantage of this strategy is that it uses both double moving averages and Supertrend to determine market direction, combining medium-short-term and medium-long-term analyses to significantly improve decision efficiency and avoid false breakouts. In addition, Supertrend can adjust parameters according to market volatility to adapt to a wider range of market environments.

## Risk Analysis

The main risk of this strategy is that fixed stop loss and take profit settings may miss greater profit opportunities. In addition, if there is divergence between medium-short-term and medium-long-term judgments, the strategy will not work properly. We can reduce this risk through floating stop loss and take profit settings.

## Optimization Directions  

This strategy can be optimized in the following aspects:

1. Increase the dynamic adjustment mechanism for stop loss and take profit, and set stop loss and take profit according to market volatility and trends.

2. Optimize MACD parameters to find moving average parameters more suitable for the target variety.  

3. Optimize Supertrend parameters to adjust its sensitivity to the market.

4. Increase other indicators for judgment to provide more dimensional signals and improve strategy performance.

## Summary  

This strategy successfully combines the advantages of dual moving averages and Supertrend indicators. By combining different cycle judgments, it filters out wrong signals and obtains better returns in trending markets. We can further enhance the stability and profitability of this strategy through parameter optimization and mechanism adjustments.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|12|MACD fast moving average|
|v_input_3|26|MACD slow moving average|
|v_input_4|9|MACD signal line moving average|
|v_input_5|120|Main SuperTrend Time Frame|
|v_input_6|true|Factor|
|v_input_7|true|Pd|
|v_input_8|500|Take Profit|
|v_input_9|400|Stop Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-28 00:00:00
end: 2024-02-04 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//Supertrend Strategy by breizh29 using *rajandran.r* Supertrend Indicator

strategy("Super Trend 2 MACD", overlay=true)
// MACD input
source = input(close)
fastLength = input(12, minval=1, title="MACD fast moving average")
slowLength=input(26,minval=1, title="MACD slow moving average")
signalLength=input(9,minval=1, title="MACD signal line moving average")

// Calculation
fastMA = sma(source, fastLength)
slowMA = sma(source, slowLength)

Macd = fastMA - slowMA
Signal = sma(Macd, signalLength)


res = input(title="Main SuperTrend Time Frame",  defval="120")
Factor=input(1, minval=1,maxval = 100)
Pd=input(1, minval=1,maxval = 100)

tp = input(500,title="Take Profit")
sl = input(400,title="Stop Loss")


Up=hl2-(Factor*atr(Pd))
Dn=hl2+(Factor*atr(Pd))
MUp=request.security(syminfo.tickerid,res,hl2-(Factor*atr(Pd)))
MDn=request.security(syminfo.tickerid,res,hl2+(Factor*atr(Pd)))

Mclose=request.security(syminfo.tickerid,res,close)

TrendUp=close[1]>TrendUp[1]? max(Up,TrendUp[1]) : Up
TrendDown=close[1]<TrendDown[1]? min(Dn,TrendDown[1]) : Dn

MTrendUp=Mclose[1]>MTrendUp[1]? max(MUp,MTrendUp[1]) : MUp
MTrendDown=Mclose[1]<MTrendDown[1]? min(MDn,MTrendDown[1]) : MDn

Trend = close > TrendDown[1] ? 1: close< TrendUp[1]? -1: nz(Trend[1],1)
Tsl = Trend==1? TrendUp: TrendDown

MTrend = Mclose > MTrendDown[1] ? 1: Mclose< MTrendUp[1]? -1: nz(MTrend[1],1)
MTsl = MTrend==1? MTrendUp: MTrendDown

linecolor = Trend == 1 ? green : red
plot(Tsl, color = linecolor , style = line , linewidth = 2,title = "SuperTrend")

Mlinecolor = MTrend == 1 ? blue : orange
plot(MTsl, color = Mlinecolor , style = line , linewidth = 2,title = "Main SuperTrend")

plotshape(cross(close,Tsl) and close>Tsl , "Up Arrow", shape.triangleup,location.belowbar,green,0,0)
plotshape(cross(Tsl,close) and close<Tsl , "Down Arrow", shape.triangledown , location.abovebar, red,0,0)

up = Trend == 1 and Trend[1] == -1 and MTrend == 1 
down = Trend == -1 and Trend[1] == 1 and MTrend == -1 
plotarrow(up ? Trend : na, title="Up Entry Arrow", colorup=lime, maxheight=60, minheight=50, transp=0)
plotarrow(down ? Trend : na, title="Down Entry Arrow", colordown=red, maxheight=60, minheight=50, transp=0)


golong = Trend == 1 and Trend[1] == -1 and MTrend == 1 and Macd > Signal
goshort = Trend == -1 and Trend[1] == 1 and MTrend == -1 and Macd < Signal

strategy.entry("Buy", strategy.long,when=golong)
strategy.exit("Close Buy","Buy",profit=tp,loss=sl)
   
   
strategy.entry("Sell", strategy.short,when=goshort)
strategy.exit("Close Sell","Sell",profit=tp,loss=sl)

```

> Detail

https://www.fmz.com/strategy/441065

> Last Modified

2024-02-05 12:05:10
