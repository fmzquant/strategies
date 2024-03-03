
> Name

渔夫指标移动止损策略Fisher-Yurik-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c4c656f71fc2e16ad6.png)
[trans]

## 概述

渔夫指标移动止损策略是一种融合了渔夫指标和移动止损机制的量化交易策略。该策略利用渔夫指标产生买入和卖出信号,同时设置追踪止损来锁定利润,在保护利润的同时争取更大收益。

## 策略原理

1. 输入日期范围,限定回测或实盘的时间段
2. 输入渔夫指标的参数,默认为2周期
3. 输入止盈止损比例,默认为5%止盈,2%止损
4. 计算渔夫指标的主线和信号线
5. 当主线上穿信号线时产生买入信号
6. 设置追踪止损,进入长仓后价格下跌2%时止损
7. 价格上涨超过5%时止盈

## 优势分析

1. 渔夫指标容易判断趋势,买入信号准确
2. 追踪止损机制可以锁定大部分利润,同时避免超过设置的止损点
3. 可自定义参数,适应不同市场环境
4. 简单易用,容易理解实现

## 风险分析

1. 参数设置不当可能导致过于激进交易,应谨慎测试
2. 止损点过大可能导致 Outiliers的影响,导致超出预期的损失
3. 止盈点过小可能导致利润太早切出,影响盈利能力
4. 应根据不同品种确定合适的参数

可以通过调整止损止盈比例,测试不同参数组合来优化参数;结合其他指标过滤信号;设置仓位管理规则来控制单笔风险。

## 优化方向  

1. 优化渔夫指标的参数,测试不同参数对策略的影响
2. 结合其他指标,如MACD,KD等过滤信号,提高信号质量
3. 增加开仓前的条件判断,例如突破布林带上轨等
4. 增加仓位管理模块,控制单笔仓位带来的风险
5. 优化移动止损的方式,如平滑移动止损,Chandelier Exit等

## 总结

渔夫指标移动止损策略整合了趋势判断和止损管理,通过参数优化,指标组合以及止损方式的改进,可以适应大部分品种,在防止超出可承受损失的前提下获得较好收益,值得探索和实践。

||

## Overview  

The Fisher Yurik trailing stop strategy is a quantitative trading strategy that integrates the Fisher Yurik indicator and trailing stop mechanisms. It uses the Fisher Yurik indicator to generate buy and sell signals while setting trailing stops to lock in profits, maximizing gains while protecting profits.

## Strategy Logic

1. Input date ranges to define backtest/live trading timeframe
2. Input parameters for Fisher Yurik indicator, default to 2 periods  
3. Input profit taking and stop loss ratios, default to 5% profit and 2% loss
4. Calculate main and signal lines of Fisher Yurik indicator
5. Generate buy signal when main line crosses above signal line
6. Set trailing stop, exit long position when price drops 2% after entry
7. Take profit when price rises above 5% 

## Advantage Analysis  

1. Fisher Yurik indicator easily identifies trends, accurate buy signals
2. Trailing stop locks in most profits while avoiding stops beyond threshold 
3. Customizable parameters suit different market environments
4. Simple and easy to understand implementation

## Risk Analysis

1. Improper parameter tuning may cause over-aggressive trading, require cautious testing
2. Stop loss too wide may lead to losses fromoutliers beyond expectations
3. Take profit too tight may cut wins short, limiting profitability
4. Appropriate parameters should be determined for different products

Risks can be addressed by adjusting stop/profit ratios, testing parameters, using signal filters, position sizing rules.

## Enhancement Opportunities

1. Optimize Fisher Yurik parameters for impact on strategy
2. Add signal filters like MACD, KD to improve signal quality
3. Add entry conditions like breakouts from Bollinger Bands  
4. Incorporate position sizing rules to control per trade risk
5. Enhance trailing stop methods, e.g. smoothed, Chandelier Exits

## Conclusion

The Fisher Yurik trailing stop strategy combines trend identification and risk management. With parameter tuning, indicator combinations, and stop loss enhancements, it can suit most instruments for good profits within acceptable risk tolerances.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2021|From Year|
|v_input_4|true|To Month|
|v_input_5|true|To Day|
|v_input_6|9999|To Year|
|v_input_7|2|Period|
|v_input_float_1|1.05|profit level |
|v_input_float_2|1.02|after the signal|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-26 00:00:00
end: 2024-02-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Fisher_Yurik Strategy with Trailing Stop", shorttitle="FY Strategy", overlay=true)

// Date Ranges 
from_month = input(defval = 1, title = "From Month")
from_day   = input(defval = 1, title = "From Day")
from_year  = input(defval = 2021, title = "From Year")
to_month   = input(defval = 1, title = "To Month")
to_day     = input(defval = 1, title = "To Day")
to_year    = input(defval = 9999, title = "To Year")
start  = timestamp(from_year, from_month, from_day, 00, 00)  // backtest start window
finish = timestamp(to_year, to_month, to_day, 23, 59)        // backtest finish window
window = true
period = input(2, title='Period')
cost = input.float(1.05, title='profit level ', step=0.01)
dusus = input.float(1.02, title='after the signal', step=0.01)

var float Value = na
var float Fish = na
var float ExtBuffer1 = na
var float ExtBuffer2 = na

price = (high + low) / 2
MaxH = ta.highest(high, period)
MinL = ta.lowest(low, period)

Value := 0.33 * 2 * ((price - MinL) / (MaxH - MinL) - 0.5) + 0.67 * nz(Value[1])
Value := math.max(math.min(Value, 0.999), -0.999)
Fish := 0.5 * math.log((1 + Value) / (1 - Value)) + 0.5 * nz(Fish[1])

up = Fish >= 0

ExtBuffer1 := up ? Fish : na
ExtBuffer2 := up ? na : Fish

var float entryPrice = na
var float stopPrice = na
 
if (ExtBuffer1 > ExtBuffer1[1])
    entryPrice := close*dusus
    stopPrice := close * cost 
 
if (ExtBuffer2 < ExtBuffer2[1])
    entryPrice := close
    stopPrice := close * cost

// Sadece seçilen test döneminde işlem yapma koşulu eklenmiştir
strategy.entry("Buy", strategy.long, when=ExtBuffer1 > ExtBuffer1[1] and window)
strategy.exit("Take Profit/Trailing Stop", from_entry="Buy", when=(close >= entryPrice * cost) or (close < stopPrice), trail_offset=0.08, trail_price=entryPrice * cost)

```

> Detail

https://www.fmz.com/strategy/440833

> Last Modified

2024-02-02 14:57:33
