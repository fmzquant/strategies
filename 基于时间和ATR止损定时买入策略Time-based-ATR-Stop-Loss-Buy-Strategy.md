
> Name

基于时间和ATR止损定时买入策略Time-based-ATR-Stop-Loss-Buy-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d21064b565fc14ad9a.png)
[trans]

### 概述

本策略的核心思想是结合时间和ATR指标设定买入时机和止损点。策略在指定的时间点发出定时买入信号,以当时的收盘价作为买入价格,然后以买入价格加上ATR数值作为止损点。这样可以过滤掉一些不适宜的买入时机,同时利用ATR来控制风险。

### 策略原理  

本策略主要由以下几个部分组成:

1. 输入参数:包括买入时间timeTrade和ATR参数atrLength。timeTrade决定了买入时间,atrLength决定了ATR的周期参数。

2. 计算ATR指标:根据atrLength参数计算ATR指标的值atrValue。

3. 定义买入条件:当小时和分钟的组合等于timeTrade时生成买入信号。

4. 发出买入指令:符合买入条件时做多,记录买入价格buyprice。 

5. 设置止损点:止损点为买入价格加上ATR值。当价格突破该止损点时止损退出。

6. 绘图:画出止损水平线。

### 优势分析

本策略最大的优势在于利用时间和ATR指标双重确认买入时机和止损点。这避免了盲目追随市场买入,并有效控制了风险。其次,利用ATR设置的止损点是动态变化的,能够根据市场波动程度来设定合理的止损范围。最后,策略逻辑简单,容易理解和跟踪。

### 风险分析

本策略主要存在以下几方面的风险:

1. 买入时间设置不当,可能错过较好的买入时机或者买入不理想的市场。

2. ATR参数设置不当,止损点过大过小都会影响策略效果。

3. 无法有效跟踪长线趋势,更适合短线操作。

4. 没有考虑基本面分析因素。

### 优化方向  

本策略可以从以下几个方面进一步优化:

1. 结合多因子模型确定更科学的买入时间。

2. 结合波动率模型优化ATR参数设置。

3. 增加趋势跟踪机制,能够适应更长的持仓期。  

4. 融入基本面分析,判断买入时机的合理性。

### 总结

本策略整体来说是一个较为简单直观的高频intraday交易策略。核心思路是利用时间和ATR指标的双重确认来锁定买入时机和止损点。优点是风险可控,相对容易实现。但也存在买入时机选择和参数优化不足等问题。未来可从引入更多因子、动态参数优化、趋势跟踪等方面进行进一步优化。

||

### Overview  

The core idea of this strategy is to combine time and ATR indicators to set the buy-in timing and stop loss points. The strategy issues a timed buy signal at the specified time point, uses the closing price at that time as the purchase price, and then sets the stop loss point at the purchase price plus the ATR value. This can filter out some unsuitable buy-in timings while using ATR to control risks.

### Strategy Principle   

The strategy consists of the following main parts:  

1. Input parameters: including buy-in time timeTrade and ATR parameter atrLength. timeTrade determines the buy-in time, and atrLength determines the period parameter of ATR.

2. Calculate ATR indicator: calculate the ATR value atrValue based on the atrLength parameter.  

3. Define buy conditions: generate buy signals when the combination of hours and minutes equals timeTrade.  

4. Issue buy order: go long when the buy condition is met, and record the purchase price buyprice.

5. Set stop loss point: the stop loss point is set at purchase price plus ATR value. Stop loss exit when price breaks this point.  

6. Plotting: plot the stop loss level line.

### Advantage Analysis   

The biggest advantage of this strategy is the double confirmation of buy-in timing and stop loss point by time and ATR indicator. This avoids blindly following the market to buy in, and effectively controls risks. Secondly, the stop loss point set by ATR is dynamically changing, which can set a reasonable stop loss range according to market fluctuation. Finally, the strategy logic is simple and easy to understand and track.  

### Risk Analysis  

The main risks of this strategy include:  

1. Improper setting of buy-in time may miss better buy-in opportunities or buy in undesirable markets.  

2. Improper parameter settings of ATR will affect strategy performance if stop loss point is too large or too small.   

3. Unable to track long-term trends effectively, more suitable for short-term operations.  

4. Fundamental analysis factors are not considered.

### Optimization Directions   

This strategy can be further optimized in the following aspects:  

1. Determine a more scientific buy-in time by combining multi-factor models.  

2. Optimize ATR parameter settings by combining volatility models.  

3. Increase trend tracking mechanism to adapt to longer holding periods.   

4. Incorporate fundamental analysis to judge the reasonableness of buy-in timing.  

### Conclusion  

Overall, this is a relatively simple and intuitive high frequency intraday trading strategy. The core idea is to use the double confirmation of time and ATR indicators to determine the buy-in timing and stop loss points. The advantages are controllable risks and relatively easy to implement. But there are also problems like insufficient selection of buy-in timing and inadequate parameter optimization. Future optimizations can be made from introducing more factors, dynamic parameter optimization, trend tracking etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|700|(?Time Settings)Trade Execution Time (HHMM)|
|v_input_2|14|(?ATR Settings)ATR Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Time-based Strategy with ATR Take Profit", overlay=true)

// Initialize take profit levels
var float takeProfitLevel = na
var float takeProfitLevelForSell = na
var float buyprice = na
var float sellprice = na



// Input for the time when the trade should be executed
tradeTime = input(0700, "Trade Execution Time (HHMM)", "Specify the time in HHMM format", group="Time Settings")

// Calculate ATR for the last 5 minutes
atrLength = input(14, "ATR Length", "Specify ATR length", group="ATR Settings")
atrValue = request.security(syminfo.tickerid, "5", ta.atr(atrLength))

// Define conditions for buy and sell
buyCondition = hour * 100 + minute == tradeTime // and strategy.position_size == 0
sellCondition = hour * 100 + minute == tradeTime // and strategy.position_size > 0
// Execute Buy and Sell orders


if (buyCondition)
    strategy.entry("Buy", strategy.long)
    buyprice := close
    takeProfitLevel := buyprice + atrValue
strategy.exit("Take Profit BUY", from_entry="Buy", limit =takeProfitLevel) 
    

  

// if (sellCondition)
//     strategy.entry("Sell", strategy.short)
//     sellprice := close
//     takeProfitLevelForSell := sellprice -atrValue
// strategy.exit("Take Profit Sell", from_entry="Sell", limit=takeProfitLevelForSell)


// Plot horizontal lines for take profit levels


plot(takeProfitLevel, color=color.green, title="Take Profit Level (Buy)")
plot(takeProfitLevelForSell, color=color.red, title="Take Profit Level (Sell)")

```

> Detail

https://www.fmz.com/strategy/443038

> Last Modified

2024-02-28 17:36:50
