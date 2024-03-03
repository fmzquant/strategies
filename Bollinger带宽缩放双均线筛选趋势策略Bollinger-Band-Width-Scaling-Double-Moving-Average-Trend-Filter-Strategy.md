
> Name

Bollinger带宽缩放双均线筛选趋势策略Bollinger-Band-Width-Scaling-Double-Moving-Average-Trend-Filter-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/181af817922384577aa.png)

[trans]


该策略基于布林带和双均线进行交易信号生成,同时结合趋势过滤,目标是追求高胜率和良好的盈亏比。

### 策略原理

1. 使用布林带的上轨、中轨、下轨进行多空信号判定。当价格触碰上轨时看空,触碰下轨时看多。

2. 使用长度为20的中短期均线和长度为60的长期均线进行趋势判断。当短期均线上穿长期均线时为看涨,下穿时为看跌。

3. 根据布林带的宽度动态调整止损位置。当布林带宽度大于0.5%时,止损位置为下轨;当宽度小于0.5%时,止损位置缩小为下轨的一半区间。

4. 入场条件:看涨时价格突破下轨作为做多信号,看跌时价格突破上轨作为做空信号。

5. 出场条件:做多时触碰布林带上轨或短期均线时止盈;做空时触碰布林带下轨或短期均线时止盈。

6. 止损条件:做多时价格跌破布林带下轨动态区间止损;做空时价格涨破布林带上轨动态区间止损。

### 策略优势

1. 使用双均线进行趋势判断,能够有效过滤趋势不明或盘整市场的噪音。

2. 布林带中轨作为支持阻力,上轨下轨作为动态止损位,可以控制风险。

3. 根据布林带宽度调整止损幅度,降低止损被激活的概率,确保止损位置合理。

4. 追踪趋势方向交易,胜率较高。

### 策略风险

1. 双均线生成假突破的概率较大,可能错过趋势转折点。可以适当缩短均线周期。

2. 布林带在震荡趋势中容易被套住。可以通过降低交易频次来规避。

3. 止损位置靠近支持阻力时容易被击穿。可以适当放宽止损范围。

4. 无法有效捕捉短线回调的机会。可以适当缩短持仓时间。

### 策略优化方向 

1. 优化均线周期参数,找到策略适合的市场环境。

2. 优化布林带的倍数参数,平衡止损被击穿的概率。

3. 添加其他指标进行多Factor验证,提高信号质量。

4. 结合交易量能量来判断趋势,避免出现背离。

5. 资金管理优化,例如固定份额、固定止损等,控制单笔损失。

6. 价格 shock 处理,例如大幅跳空缺口的情况。

### 总结

本策略整体较为稳健,以双均线判断趋势方向,布林带提供支撑阻力位并设置动态止损。但也存在一定的局限性,如误判趋势、止损过近等问题。后续可以从均线系统、止损策略、资金管理等多个方面进行优化,使策略参数更具鲁棒性,在各种市场环境中都能保持稳定的表现。总体来说,本策略以其较高的胜率、良好的盈亏比而脱颖而出,是一种非常适合新手使用的简单有效的策略思路。

||

This strategy generates trading signals based on Bollinger Bands and double moving averages, with trend filtering to target high win rate and good profit-loss ratio.

### Strategy Logic

1. Use Bollinger Band upper, middle and lower bands for long/short signal generation. Sell when price touches upper band, buy when touches lower band.

2. Use 20-period medium-term and 60-period long-term moving averages to determine trend direction. Uptrend when short MA crosses above long MA, downtrend when crosses below.

3. Dynamically adjust stop loss position based on Bollinger Band width. When width greater than 0.5%, stop loss at lower band. When less than 0.5%, reduce stop loss to half lower band range.

4. Entry conditions: Breaking lower band as buy signal during uptrend. Breaking upper band as sell signal during downtrend.

5. Exit conditions: Take profit when touching upper band or short MA on longs. Take profit when touching lower band or short MA on shorts.

6. Stop loss conditions: Stop out when price breaks below lower band dynamic range on longs. Stop out when price breaks above upper band dynamic range on shorts.

### Advantages

1. Using double MAs to determine trend helps filter noise from non-trending or range-bound markets.

2. BB middle band provides support/resistance, upper/lower bands serve as dynamic stop loss levels to control risk.

3. Adjusting stop loss range based on BB width reduces chance of being stopped out while keeping stop reasonable.

4. Trading in direction of trend leads to higher win rate.

### Risks

1. Double MAs can generate false breakouts frequently, missing trend turning points. Can shorten MA periods. 

2. BBs can get whipsawed in choppy, non-trending markets. Can reduce trade frequency.

3. Stop loss near support/resistance levels prone to being taken out. Can allow wider stop loss range.

4. Unable to capitalize on short-term pullbacks effectively. Can shorten holding period.

### Enhancement Opportunities

1. Optimize MA periods to find best fit for market conditions.

2. Optimize BB multiplier parameter to balance stop loss being hit.

3. Add other indicators for multi-factor confirmation to improve signal quality. 

4. Incorporate volume/momentum to confirm trend, avoid divergence.

5. Money management optimization e.g. fixed fractional, fixed stop loss to control single trade risk.

6. Price shock handling e.g. large overnight gaps.

### Summary

This is an overall robust strategy using double MAs for trend direction and BBs for support/resistance and dynamic stops. Limitations exist like false trend signals and stops too close. Further optimizations can be made across MA system, stop loss strategy, money management etc. to increase robustness across various market conditions. Overall an excellent strategy for beginners with its high win rate, good risk-reward profile and simple yet effective logic.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2|4|multiplier|
|v_input_3|60|Trend Time Frame|
|v_input_4|true|Use Trend Filter|
|v_input_5_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-18 00:00:00
end: 2023-10-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title="yuthavithi BB Scalper 2 strategy", overlay=true)

len = input(20, minval=1, title="Length")
multiplier = input(4, minval=1, title="multiplier")
trendTimeFrame = input(60, minval=1, title="Trend Time Frame")
useTrendFilter = input(true, type=bool, title = "Use Trend Filter")

src = input(close, title="Source")
out = sma(src, len)
//plot(out, title="SMA", color=blue)

stdOut = stdev(close, len)
bbUpper = out + stdOut * multiplier
bbLower = out - stdOut * multiplier
bbUpper2 = out + stdOut * (multiplier / 2)
bbLower2 = out - stdOut * (multiplier / 2)
bbUpperX2 = out + stdOut * multiplier * 2
bbLowerX2 = out - stdOut * multiplier * 2
bbWidth = (bbUpper - bbLower) / out


closeLongTerm = request.security(syminfo.tickerid, tostring(trendTimeFrame), close)
smaLongTerm = request.security(syminfo.tickerid, tostring(trendTimeFrame), sma(close,20))

//plot(smaLongTerm, color=red)

trendUp = useTrendFilter ? (closeLongTerm > smaLongTerm) : true
trendDown = useTrendFilter? (closeLongTerm < smaLongTerm) : true

bearish = ((cross(close,bbUpper2) == 1) or (cross(close,out) == 1)) and (close[1] > close) and trendDown
bullish = ((cross(close,bbLower2) == 1) or (cross(close,out) == 1)) and (close[1] < close) and trendUp


closeBuy = (high[1] > bbUpper[1]) and (close < bbUpper) and (close < open) and trendUp 
closeSell = (((low[1] < bbLower[1]) and (close > bbLower)) or ((low[2] < bbLower[2]) and (close[1] > bbLower[1]))) and (close > open) and trendDown


cutLossBuy = iff(bbWidth > 0.005, (low < bbLower) and (low[1] > bbLower[1]) and trendUp, (low < bbLowerX2) and (low[1] > bbLowerX2[1]) and trendUp)
cutLossSell = iff(bbWidth > 0.005, (high > bbUpper) and (high[1] < bbUpper[1]) and trendDown, (high > bbUpperX2) and (high[1] < bbUpperX2[1]) and trendDown)


if (bullish)
    strategy.entry("Buy", strategy.long, comment="Buy")

if (bearish)
    strategy.entry("Sell", strategy.short, comment="Sell")
    

strategy.close("Buy", closeBuy or cutLossBuy)
   
strategy.close("Sell", closeSell or cutLossSell)

```

> Detail

https://www.fmz.com/strategy/430149

> Last Modified

2023-10-25 15:00:20
