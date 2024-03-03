
> Name

DMI乘数均线交易策略DMI-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

一种新的量化交易策略,该策略主要基于DMI指标来识别行情的底部和顶部。本文将详细介绍该交易策略的原理、优势以及可能存在的风险。

## 策略原理

DMI指标全称为平均趋向指标(Average Directional Movement Index),它由 Welles Wilder 在20世纪70年代提出,用于判断市场的趋势和力度。DMI指标由三条线组成:

- +DI:代表上升趋势的力度
- -DI:代表下降趋势的力度  
- ADX:代表趋势的平均力度

当+DI上穿-DI时,代表涨势加强,可以考虑做多;当-DI上穿+DI时,代表跌势加强,可以考虑做空。

本策略的核心逻辑是:

1. 当+DI线下穿10,并且-DI线上穿40时,做多
2. 当-DI线下穿10,并且+DI线上穿40时,做空

也就是说,当反向DI线显著强于正向DI线时,可以判断目前的趋势即将反转,这时就可以适当介入进行反向操作。

为了过滤错乱情况,本策略采用DI的均线,具体参数设置为:

- +DI和-DI的周期长度均为11
- ADX的平滑周期为11

通过调整均线参数来控制交易信号的频繁程度。

本策略主要应用于NIFTY50指数期权交易,也可用于其他品种。具体交易时,选择平值期权,止损设置为20%,若亏损超过10%则加仓,但若亏损扩大至超过最初投入资金的20%则止损出局。

## 策略优势

相比简单的DI交叉策略,本策略采用DI指标的均线过滤,可以有效减少whipsaw,并且减少交易次数,从而降低交易成本和滑点损失。

相比单纯的趋势跟踪策略,本策略在判断趋势反转点时比较精确,可以及时捕捉转折点附近的交易机会。

本策略参数优化比较简单,容易实现效果优化。

## 风险提示

本策略仅给出交易信号的方向,具体的止损止盈要求需要按照个人风险偏好来设置。

DMI指标在盘整区域时可能产生大量假信号,应该避免在非趋势性市场中使用本策略。

DI交叉并不能百分之百预测趋势转折点,存在一定的时序错误。应适当结合其他指标来验证交易信号。

## 总结

本策略通过DI均线的筛选,可以有效识别趋势反转机会。相比其他趋势跟踪策略,具有反转识别能力更强的优点。总体来说,本策略参数优化灵活,适合作为量化交易体系的一个模块来使用。使用时需要注意防范误信号,并适当评估市场趋势态势。

||

Recently I have developed a new quantitative trading strategy mainly based on the DMI indicator to identify bottoms and tops in the market. This article will explain in detail the rationale, advantages and potential risks of this trading strategy.

## Strategy Logic  

The DMI indicator, short for Average Directional Movement Index, was created by Welles Wilder in the 1970s to gauge the trend and strength of the market. The DMI consists of three lines:

- +DI: representing the strength of uptrend
- -DI: representing the strength of downtrend
- ADX: representing the overall trend strength

When +DI crosses above -DI, it indicates strengthening uptrend and long position can be considered. When -DI crosses above +DI, it signals strengthening downtrend and short position can be considered.

The core logic of this strategy is:

1. Go long when +DI drops below 10 and -DI rises above 40
2. Go short when -DI drops below 10 and +DI rises above 40

That is to say, when the reverse DI diverges significantly from the forward DI, it can be judged that the current trend is likely to reverse, and reverse trading position can be taken appropriately. 

To filter noise, this strategy adopts moving average of DI with parameters set as:

- Period of +DI and -DI is 11
- Smoothing period of ADX is 11

By tuning the moving average parameters, the frequency of trading signals can be adjusted.

This strategy is mainly applied to trading NIFTY50 index options. It can also be used on other products. Specifically for trading, choose at-the-money options, set stop loss at 20%, add positions if loss exceeds 10%, but stop out if loss expands over 20% of initial capital.

## Advantages of the Strategy

Compared to simple DI cross strategies, this strategy uses DI moving averages to filter noise and reduce trades, thus lowering transaction costs and slippage. 

Compared to pure trend following strategies, this strategy is more precise at catching trend reversal points, enabling timely entries around turns.

The strategy optimization is simple with flexible parameters for performance tuning.

## Risk Warnings

This strategy only provides directional signals. Specific requirements on stop loss and take profit should be set according to personal risk preference.

DMI may produce many false signals during range-bound periods. Avoid using this strategy in non-trending markets.

DI crossovers cannot fully predict trend reversals. There could be some timing errors. Other indicators should be used to validate the trading signals.

## Conclusion

By screening with DI moving averages, this strategy can effectively identify trend reversal opportunities. Compared to other trend following strategies, it has the advantage of stronger reversal recognition abilities. Overall, this strategy has flexible parameter tuning and can be used as a module in quantitative trading systems. Pay attention to false signals and properly assess the market regime when using it.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|11|ADX Smoothing|
|v_input_int_2|11|DI Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-05 00:00:00
end: 2023-09-12 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © email_analysts
// This code gives indication on the chart to go long based on DMI and exit based on RSI. 
//Default value has been taken as 14 for DMI+ and 6 for RSI.
//@version=5
strategy(title="DMI Strategy", overlay=false)
lensig = input.int(11, title="ADX Smoothing", minval=1, maxval=50)
len = input.int(11, minval=1, title="DI Length")
up = ta.change(high)
down = -ta.change(low)
plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
trur = ta.rma(ta.tr, len)
plus = fixnan(100 * ta.rma(plusDM, len) / trur)
minus = fixnan(100 * ta.rma(minusDM, len) / trur)
sum = plus + minus
adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), lensig)
//plot(adx, color=#F50057, title="ADX")
plot(plus, color=color.green, title="+DI")
plot(minus, color=color.red, title="-DI")
hlineup = hline(40, color=#787B86)
hlinelow = hline(10, color=#787B86)

buy = plus < 10 and minus > 40
if buy
    strategy.entry('long', strategy.long)

sell = plus > 40 and minus < 10
if sell
    strategy.entry('short', strategy.short)


```

> Detail

https://www.fmz.com/strategy/426579

> Last Modified

2023-09-13 14:42:19
