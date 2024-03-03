
> Name

多时间轴MACD指标交叉交易策略Multi-timeframe-MACD-Indicator-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f9a26b90f06ceaa92f.png)
[trans]
### 概述

多时间轴MACD指标交叉交易策略是一种趋势跟踪策略。它通过计算不同参数设置的MACD指标,在价格突破该指标时产生交易信号,实现股票、指数、外汇等金融产品的自动化交易。

### 策略原理

该策略同时计算3条移动平均线:一条加权移动平均线WMA以及两条指数移动平均线EMA。这三条移动平均线的参数设置不同,分别为25天、50天和100天。这样可以让移动平均线覆盖不同的价格走势周期。

在计算出移动平均线后,策略会监测价格是否突破或跌破某条移动平均线。如果价格同时突破或跌破所有3条移动平均线,那么就产生交易信号。

例如,当价格同时高于所有3条移动平均线时,产生买入信号;当价格同时低于所有3条移动平均线时,产生卖出信号。监测价格与移动平均线的关系可以判断价格走势的转折点。

通过多时间轴指标的交叉判断,可以过滤掉一些假信号,使交易信号更加可靠。

### 优势分析

- 利用多时间轴分析价格趋势,过滤假信号
- 参数容易优化,可以适应不同周期的行情
- 可用于股票、指数、外汇等多个品种,适用面广

### 风险分析

- 大周期指标判断存在滞后,可能错过短线机会
- 突破失败时存在亏损风险
- PARAMETERS 后期少量调整,以优化止损止盈

### 优化方向  

该策略可以从以下几个方面进行优化:  

1. 优化移动平均线的周期参数,适应更多行情周期
2. 增加其他技术指标过滤,例如RSI指标判断超买超卖
3. 增加止损机制,可参考ATR指标设定止损距离
4. 可扩展至期货等其他品种,优化参数

### 总结

多时间轴MACD指标交叉交易策略整体思路清晰,通过移动平均线多周期判断价格趋势,在价格出现显著转折时产生交易信号。策略优化空间大,可针对不同品种和行情周期调整参数,从而获得良好的交易效果。该策略适合对趋势型股票、指数和外汇进行程序化交易。

||

### Overview

The Multi-timeframe MACD Indicator Crossover Trading Strategy is a trend following strategy. It generates trading signals when the price breaks through the MACD indicator calculated with different parameter settings, enabling automated trading of stocks, indices, forex and other financial products.

### Strategy Logic

The strategy calculates 3 moving averages simultaneously: one weighted moving average WMA and two exponential moving averages EMA. The parameters of these three moving averages are set differently, which are 25 days, 50 days and 100 days respectively. This allows the moving averages to cover price movements over different periods.  

After the moving averages are calculated, the strategy monitors whether the price breaks or falls below any of the moving averages. Trading signals are generated when the price simultaneously breaks or falls below all 3 moving averages.

For example, a buy signal is generated when the price is above all 3 moving averages at the same time. A sell signal is generated when the price falls below all 3 moving averages at the same time. Monitoring the price relative to the moving averages can determine reversal points of price movement.

By cross-judging with multi-timeframe indicators, some fake signals can be filtered out, making trading signals more reliable.

### Advantage Analysis  

- Use multi-timeframe analysis to filter out false signals  
- Easy to optimize parameters to adapt to market conditions over different periods
- Can be applied to multiple products including stocks, indices, forex, etc.

### Risk Analysis

- Indicator lag may miss short-term opportunities  
- Risk of loss when price levels fails to hold 
- Fine tune PARAMETERS afterward to optimize stop loss and take profit

### Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize the moving average periods to adapt more market cycles
2. Add other technical indicators for filtering, like RSI for overbought and oversold
3. Add stop loss mechanism, can use ATR indicator for stop distance
4. Expandable to other products like futures, optimize parameters  

### Summary  

The Multi-timeframe MACD Indicator Crossover Trading Strategy has a clear logic flow. It determines price trends over multiple periods using moving averages and generates trading signals when significant reversals occur. The strategy has large optimization space and parameters can be adjusted for different products and market cycles, enabling good trading performance. It is suitable for automated trading of trending stocks, indices and forex.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|25|WMA Length|
|v_input_2|50|EMA1 Length|
|v_input_3|100|EMA2 Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-19 00:00:00
end: 2024-02-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("TC - MACDoscillator v2", overlay=true)
// ___________      .__                   _________               .__  __         .__   
// \__    ___/____  |  |    ____   ____   \_   ___ \_____  ______ |__|/  |______  |  |  
//   |    |  \__  \ |  |   / ___\ /  _ \  /    \  \/\__  \ \____ \|  \   __\__  \ |  |  
//   |    |   / __ \|  |__/ /_/  >  <_> ) \     \____/ __ \|  |_> >  ||  |  / __ \|  |__
//   |____|  (____  /____/\___  / \____/   \______  (____  /   __/|__||__| (____  /____/
//                \/     /_____/                  \/     \/|__|                 \/      
//
// MACDoscillator Strategy v2
// Josh Breitfeld 2016
//

/// INPUTS START ///

//tradeSize = input(title="Shares Per Trade",  defval=2500, step=1)
WMALength = input(title="WMA Length",  defval=25, step=1)
EMA1Length = input(title="EMA1 Length",  defval=50, step=1)
EMA2Length = input(title="EMA2 Length",  defval=100, step=1)
//security = input(title="Alternate Security", type=string, defval="SPX500")
//inverse = input(title="Inverse Signals", type=bool, defval=true)

/// INPUTS END ///

/// ALGORITHM START ///

/// Define calculations
WMA = wma(close,WMALength)
EMA1 = ema(close,EMA1Length)
EMA2 = ema(close,EMA2Length)

/// Grab values from alternate security
dWMA = WMA
dEMA1 = EMA1
dEMA2 = EMA2

aClose = close

/// Crossover signal system

/// Long crosses
lc1 = aClose > dWMA ? true : false
lc2 = aClose > dEMA1 ? true : false
lc3 = aClose > dEMA2 ? true: false

/// Short crosses
sc1 = aClose < dWMA ? true : false
sc2 = aClose < dEMA1 ? true : false
sc3 = aClose < dEMA2 ? true : false

//plot(lc1,color=green)
//plot(lc2,color=green)
//plot(lc3,color=green)
//plot(sc1,color=red)
//plot(sc2,color=red)
//plot(sc3,color=red)


/// ALGO ORDER CONDITIONS START ///

pBuyToOpen = (lc1 and lc2 and lc3 ? true : false)
pSellToOpen = (sc1 and sc2 and sc3 ?  true : false)
pSellToClose = (lc1 ? true : false) and not pBuyToOpen
pBuyToClose = (sc1 ? true : false) and not pSellToOpen

//plot(pBuyToOpen,color=lime)
//plot(pBuyToClose,color=lime)
//plot(pSellToOpen,color=red)
//plot(pSellToClose,color=red)
/// INVERT SIGNALS

//buyToOpen = inverse ? -pBuyToOpen : pBuyToOpen
//sellToOpen = inverse ? -pBuyToOpen : pSellToOpen
//sellToClose = inverse ? -pSellToClose : pSellToClose
//buyToClose = inverse ? -pBuyToClose : pBuyToClose

/// ALGO ORDER CONDITIONS END ///

/// ALGORITHM END ///

/// DEFINE PLOTS ///

plot(dWMA,"WMA",lime,1,line)
plot(dEMA1,"EMA1",blue,2,line)
plot(dEMA2,"EMA2",red,3,line)
//plot(aClose,"Close",orange,4,line)

/// PLOTS END ///

/// ORDER BLOCK ///

    //strategy.entry("My Long Entry Id", strategy.long)

/// OPENING ORDERS START ///
if(pBuyToOpen) 
    strategy.entry("BTO", strategy.long, comment="BTO")
if(pSellToOpen) 
    strategy.entry("STO", strategy.short, comment="STO")

/// OPENING ORDERS END ///

/// CLOSING ORDERS START ///
strategy.close("BTO", pBuyToClose)
strategy.close("STO", pSellToClose)
/// CLOSING ORDERS END ///

/// END ORDER BLOCK ///

// Josh Breitfeld - Talgo Capital 2016
/// STRATEGY END ///
```

> Detail

https://www.fmz.com/strategy/442085

> Last Modified

2024-02-19 11:03:54
