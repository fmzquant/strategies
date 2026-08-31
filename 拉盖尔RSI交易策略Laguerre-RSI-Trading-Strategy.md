
> Name

拉盖尔RSI交易策略Laguerre-RSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9c16bafe8f8818a65e.png)


## Overview

The Laguerre RSI trading strategy is based on John EHLERS’ Laguerre filter applied to the RSI indicator. By adjusting the α coefficient, this strategy increases or decreases the lag and smoothness of the RSI to filter out noise and generate clearer trading signals.  

## Strategy Logic

The core indicator of this strategy is Laguerre RSI. Its calculation formula is as follows: 

L0 = (1-γ)*Src + γ*L0[1]
L1 = -γ*L0 + L0[1] + γ*L1[1]
L2 = -γ*L1 + L1[1] + γ*L2[1] 
L3 = -γ*L2 + L2[1] + γ*L3[1]

Here γ=1-α, α is an adjustable coefficient, Src represents price. L0 to L3 are 4 indicators containing recursive relationships. On this basis, the current up integral cu and down integral cd can be calculated:  

cu = (L0>L1 ? L0-L1 : 0) + (L1>L2 ? L1-L2 : 0) + (L2>L3 ? L2-L3 : 0)
cd = (L0<L1 ? L1-L0 : 0) + (L1<L2 ? L2-L1 : 0) + (L2<L3 ? L3-L2 : 0)  

Then Laguerre RSI can be calculated using cu and cd:  

LaRSI = cu / (cu + cd)

Through the recursive filter structure, Laguerre RSI retains the trend identification capability of RSI while filtering out a lot of random noise, generating clearer and smoother trading signals.  

The specific trading rules are: 
Go long when Laguerre RSI crosses above 20, and go short when Laguerre RSI crosses below 80.

## Advantage Analysis  

The main advantages of Laguerre RSI strategy are:  

1. Effectively filter the noise of RSI through Laguerre filter structure, making trading signals clearer and more reliable  

2. The adjustable α coefficient makes the strategy parameters flexible for optimization to adapt to more market environments   

3. Retains the long-term validity of RSI while enabling momentum identification through filtering, integrating trend and overbought/oversold

4. Simple and intuitive strategy rules that are easy to implement and perform well in various market environments  

## Risk Analysis

The main risks of this strategy are:   

1. Improper settings of α may lead to excessive lag or over-filtering, thus missing price changes  

2. Frequent trading losses may occur in volatile markets 

3. Some upside opportunities may be missed in long-term sustained bull markets  

## Optimization Directions  

This strategy can be optimized from the following aspects:  

1. Use machine learning algorithms to optimize the α coefficient setting  

2. Add stop loss mechanisms to reduce loss risk  

3. Combine other indicators to filter false signals
4. Increase the quantitative easing model to lock in profits at specific stages  

## Conclusion  

The Laguerre RSI strategy effectively identifies overbought and oversold situations through filtering mechanisms while avoiding interference from noise when issuing trading signals. This simple and practical strategy has large optimization space for parameters and can adapt to various market environments. It is a recommended trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|0.2|Alpha|
|v_input_3|false|Change Color ?|
|v_input_4|true|=== Date Backtesting ===|
|v_input_5|true|From Day|
|v_input_6|true|From Month|
|v_input_7|2020|From Year|
|v_input_8|true|To Day|
|v_input_9|true|To Month|
|v_input_10|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-12 00:00:00
end: 2023-12-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mertriver1
// Developer: John EHLERS
//@version=3
// Author:Kıvanç Özbilgiç
strategy("Laguerre RSI", shorttitle="LaRSI", overlay=false)
src = input(title="Source", defval=close)
alpha = input(title="Alpha", type=float, minval=0, maxval=1, step=0.1, defval=0.2)
colorchange = input(title="Change Color ?", type=bool, defval=false)

Date1      = input(true, title = "=== Date Backtesting ===")
FromDay1   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromMonth1 = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromYear1  = input(defval = 2020, title = "From Year", minval = 2017)

ToDay1     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToMonth1   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToYear1    = input(defval = 9999, title = "To Year", minval = 2017)

start1     = timestamp(FromYear1, FromMonth1, FromDay1, 00, 00) 
finish1    = timestamp(ToYear1, ToMonth1, ToDay1, 23, 59)        
window1()  => time >= start1 and time <= finish1 ? true : false

gamma=1-alpha
L0 = 0.0
L0 := (1-gamma) * src + gamma * nz(L0[1])
L1 = 0.0
L1 := -gamma * L0 + nz(L0[1]) + gamma * nz(L1[1])

L2 = 0.0
L2 := -gamma * L1 + nz(L1[1]) + gamma * nz(L2[1])

L3 = 0.0
L3 := -gamma * L2 + nz(L2[1]) + gamma * nz(L3[1])

cu= (L0>L1 ? L0-L1 : 0) + (L1>L2 ? L1-L2 : 0) + (L2>L3 ? L2-L3 : 0)

cd= (L0<L1 ? L1-L0 : 0) + (L1<L2 ? L2-L1 : 0) + (L2<L3 ? L3-L2 : 0)

temp= cu+cd==0 ? -1 : cu+cd
LaRSI=temp==-1 ? 0 : cu/temp

Color = colorchange ? (LaRSI > LaRSI[1] ? green : red) : blue
plot(100*LaRSI, title="LaRSI", linewidth=2, color=Color, transp=0)
plot(20,linewidth=1, color=maroon, transp=0)
plot(80,linewidth=1, color=maroon, transp=0)

strategy.entry("Long",   true, when = window1() and crossover(cu, cd))
strategy.entry("Short", false, when = window1() and crossunder(cu, cd))
```

> Detail

https://www.fmz.com/strategy/435868

> Last Modified

2023-12-19 14:04:46
