
> Name

MACD指标的RSI反转策略RSI-of-MACD-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11405f4267a074330e7.png)
 [trans]
## 概述

该策略基于MACD指标的RSI值来判断买入和卖出信号。当RSI值超过超买线或超卖区间时买入,当RSI值跌破超卖区间时止损或止盈。

## 策略原理

该策略结合了MACD指标和RSI指标的优点。

首先计算MACD指标的三条曲线,包括DIF线、DEA线和MACD线。然后在MACD线上再计算RSI指标,形成RSI of MACD。

当RSI of MACD指标超过30或35这个超卖区间时产生买入信号,表示MACD线进入超卖区,股价趋势开始反转上涨。当RSI of MACD指标再次跌破15这个超卖区间时产生卖出信号,表示趋势反转结束。

该策略还设置了部分止盈,当RSI of MACD指标超过80这个超买区时可以卖出部分头寸锁定部分利润。

## 优势分析

- 利用MACD指标判断趋势反转点
- 利用RSI指标判断超买超卖区域 Filter假信号
- 结合双指标判断,精准找出买卖点位
- 设置部分止盈,防止亏损扩大

## 风险分析

- MACD指标参数设置不当,无法准确判断趋势
- RSI指标参数设置不当,无法准确判断超买超卖
- 部分止盈设置过于激进,可能错过更大涨幅

解决方法:

- 优化MACD参数,找出最佳参数组合
- 优化RSI参数,提高准确率
- 适当放宽部分止盈条件,追求更大收益

## 优化方向

该策略还可以从以下几个方向进行优化:

1. 增加止损策略,进一步控制下跌风险
2. 增加仓位管理模块,让仓位随着价格运行逐步放大
3. 集成机器学习模型,利用历史数据训练,进一步提升买卖点判断的准确性
4. 尝试在更短周期如15分钟或5分钟运行,进一步提高策略频率

## 总结

该策略整体设计思路清晰,核心思想是利用MACD反转结合RSI过滤判断买卖点位。通过参数优化,止损管理,风险控制等手段,可以将其打造成一个非常实用的量化交易策略。

||

## Overview

This strategy is based on the RSI values of the MACD indicator to determine buy and sell signals. It buys when the RSI exceeds the overbought line or range, and sells or stops profit/loss when the RSI breaks below the overbought range.

## Strategy Principle  

This strategy combines the advantages of both the MACD and RSI indicators.  

First, the three curves of the MACD indicator are calculated, including the DIF, DEA and MACD lines. Then the RSI indicator is calculated on the MACD line to form the RSI of MACD.  

When the RSI of MACD indicator exceeds the overbought range of 30 or 35, a buy signal is generated, indicating the MACD line has entered the oversold range and the price trend has started to reverse upwards. When the RSI of MACD indicator breaks below the overbought range of 15 again, a sell signal is generated, indicating the trend reversal has ended.

The strategy also sets partial profit taking. When the RSI of MACD indicator exceeds the overbought level of 80, part of the position can be sold to lock in partial profits.

## Advantage Analysis

- Utilize MACD indicator to determine trend reversal points  
- Utilize RSI indicator to determine overbought/oversold levels to filter fake signals
- Combination of dual indicators for accurate buy/sell points
- Partial profit taking set to prevent enlarged losses

## Risk Analysis  

- Inaccurate judgement of trend if improper MACD parameters  
- Inaccurate judgement of overbought/oversold zones if improper RSI parameters
- Potentially missing greater upside if profit taking too aggressive  

Solutions:

- Optimize MACD parameters to find best combination
- Optimize RSI parameters to improve accuracy 
- Relax profit taking criteria properly to target greater returns

## Optimization Directions  

The strategy can also be optimized in the following aspects:

1. Add stop loss strategy to further control downside risks
2. Add position sizing module to gradually ramp up positions as price moves 
3. Integrate machine learning models trained on historical data to further improve buy/sell point accuracy
4. Attempt running on shorter timeframes like 15m or 5m to improve strategy frequency

## Conclusion

The overall strategy design philosophy is clear, with the core idea of using MACD reversal combined with RSI filter to determine buy/sell points. With parameter optimization, stop loss management, risk control measures etc., it can be shaped into a very practical quant trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast Length|
|v_input_2|21|Slow Length|
|v_input_3|9|Signal Length|
|v_input_4|14|RSI of MACD Length|
|v_input_5|10|Risk % of capital|
|v_input_6|3|Stop Loss|
|v_input_7|false|Take Profit|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-07 00:00:00
end: 2024-01-14 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mohanee

//@version=4

strategy(title="RSI of MACD Strategy[Long only]",  shorttitle="RSIofMACD" , overlay=false, pyramiding=1,     default_qty_type=strategy.percent_of_equity,  default_qty_value=20, initial_capital=10000, currency=currency.USD)  //default_qty_value=10, default_qty_type=strategy.fixed,

	

/////////////////////////////////////////////////////////////////////////////////



// MACD Inputs ///
fastLen = input(12, title="Fast Length")
slowLen = input(21, title="Slow Length")
sigLen  = input(9, title="Signal Length")

rsiLength  = input(14, title="RSI of MACD Length")




riskCapital = input(title="Risk % of capital", defval=10, minval=1)
stopLoss=input(3,title="Stop Loss",minval=1)

takeProfit=input(false, title="Take Profit")


[macdLine, signalLine, _] = macd(close, fastLen, slowLen, sigLen)

rsiOfMACD = rsi(macdLine, rsiLength)
emaSlow = ema(close, slowLen)



//drawings
/////////////////////////////////////////////////////////////////////////////////


obLevelPlot = hline(80, title="Overbought / Profit taking line",  color=color.blue , linestyle=hline.style_dashed)
osLevelPlot = hline(30, title="Oversold / entry line", color=color.green, linestyle=hline.style_dashed)

exitLinePlot = hline(15, title="Exit line", color=color.red, linestyle=hline.style_dashed)




plot(rsiOfMACD, title = "rsiOfMACD" ,  color=color.purple)


//drawings
/////////////////////////////////////////////////////////////////////////////////




//Strategy Logic 
/////////////////////////////////////////////////////////////////////////////////

//Entry--
//Echeck how many units can be purchased based on risk manage ment and stop loss
qty1 = (strategy.equity  * riskCapital / 100 ) /  (close*stopLoss/100)  

//check if cash is sufficient  to buy qty1  , if capital not available use the available capital only
qty1:= (qty1 * close >= strategy.equity ) ? (strategy.equity / close) : qty1


strategy.entry(id="RSIofMACD", long=true,   qty=qty1,  when =  ( crossover(rsiOfMACD, 30) or crossover(rsiOfMACD, 35)  ) and close>=emaSlow )



bgcolor(abs(strategy.position_size)>=1 ? color.blue : na , transp=70)


barcolor(abs(strategy.position_size)>=1 and  ( crossover(rsiOfMACD, 30) or crossover(rsiOfMACD, 35) ) ? color.purple : abs(strategy.position_size)>=1 ? color.blue : na  )


//partial exit
strategy.close(id="RSIofMACD", comment="PExit Profit is "+tostring(close - strategy.position_avg_price,  "###.##")  ,  qty=strategy.position_size/3, when= takeProfit and abs(strategy.position_size)>=1 and close > strategy.position_avg_price and crossunder(rsiOfMACD,80) )

//Close All
strategy.close(id="RSIofMACD", comment="Close All   Profit is "+tostring(close - strategy.position_avg_price,  "###.##"), when=abs(strategy.position_size)>=1 and crossunder(rsiOfMACD,15) ) //and close > strategy.position_avg_price )


//Strategy Logic 
/////////////////////////////////////////////////////////////////////////////////


```

> Detail

https://www.fmz.com/strategy/438785

> Last Modified

2024-01-15 12:33:14
