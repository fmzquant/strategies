
> Name

基于布林带的中长期量化交易策略Medium-Long-Term-Quantitative-Trading-Strategy-Based-on-Bollinger-Bands

> Author

ChaoZhang

> Strategy Description


[trans]

本文将详细介绍一种应用布林带指标进行中长期量化交易的策略。该策略通过布林带判断价格突破形成交易信号。

一、策略原理

该策略主要应用以下布林带指标:

1. 计算一定周期的价格中位数作为基准线;

2. 计算价格标准差,并乘以倍数作为范围; 

3. 中位数±范围构成布林带上下轨;

4. 价格突破布林带上下轨时,形成交易信号。

具体交易逻辑如下:

当价格突破布林带下轨时,形成买入信号做多仓位;

当价格突破布林带上轨时,形成卖出信号做空仓位。

并且设置一定百分比的止盈止损点,以锁定盈亏。

总体而言,该策略通过判断价格突破布林带上下轨,顺势捕捉中长线趋势。

二、策略优势

该策略的主要优势如下:

首先,布林带可以判断价格突破和反转信号,捕捉中长期趋势;

其次,止盈止损设置直接且可控,有助积极资金管理;

最后,策略规则简单清晰,容易实施与优化。

三、潜在风险

但我们也应注意以下风险:

首先,布林带区间需要精确优化,以产生稳定信号;

其次,止损过小可能让获利不足;止损过大则承担过大风险;

最后,需防止出现过多频繁交易。

四、内容总结

本文详细介绍了一种应用布林带指标进行趋势跟踪的中长期量化交易策略。该策略可以顺势捕捉价格中长期趋势,但需要优化参数间距及止损水平。总体而言,它是一个较为简单直观的趋势跟踪策略思路。

||

This article explains in detail a medium-long term quantitative trading strategy using Bollinger Bands. It generates trading signals by identifying price breakouts through the Bollinger Bands.

I. Strategy Logic  

The strategy mainly employs the following Bollinger Bands indicators:

1. Calculate the moving median price as the baseline over a certain period. 

2. Calculate the price standard deviation and multiply it by a factor as the range.

3. The median ± range constructs the upper and lower bands.

4. Price breaking through the bands generates trading signals.

The specific trading logic is:

When price breaks through the lower band, a buy signal is generated to take long positions. 

When price breaks the upper band, a sell signal is generated to take short positions.

Take profit and stop loss are set at fixed percentages to lock in profits and losses.

Overall, the strategy identifies mid-long term trends by detecting price breakouts of the Bollinger Bands.

II. Advantages of the Strategy

The main advantages of this strategy are:

Firstly, Bollinger Bands can identify price breakouts and reversals to capture mid-long term trends.

Secondly, direct stop loss and take profit settings aid in prudent money management. 

Lastly, simple and clear rules make this strategy easy to implement and optimize.

III. Potential Risks

However, the following risks should be noted:

Firstly, the bands need to be optimized precisely for steady signals.

Secondly, stop loss set too small risks insufficient profit, while too large increases risk.

Lastly, excessive frequent trading needs to be prevented. 

IV. Summary

In summary, this article has explained a medium-long term quantitative trading strategy using Bollinger Bands for trend following. It can track price trends over the medium to long term, but requires fine tuning of the band intervals and stop loss levels. Overall it provides a relatively simple and intuitive trend following approach.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|51|移動平均|
|v_input_2|3.01|マルチ|
|v_input_3|14.2|利確（％）|
|v_input_4|99|損切（％）|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
//
//　『おすすめストラテジーSS１』
//　『BitMEX　XBTUSD　３０分足向け中長期用ストラテジー』
// 　本番用ストラテジーファイル
//
//
//
//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
//【説明】
//　『おすすめストラテジーSS１』のPineスクリプトです。
//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 
//@version=3
// strategy(title = "『おすすめストラテジーSS１』", shorttitle="Strategy1", initial_capital=1200000, pyramiding=0, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.05, overlay=true)
 
 
//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
//
//ストラテジーロジック
//
//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 
 
source = close
 
length = input(51, minval = 1, title = "移動平均")
mult = input(3.01, minval = 0.001,step=0.01, maxval = 10, title = "マルチ")
 
Rikaku = input(14.2, minval = 0.1, step=0.1,maxval = 100, title = "利確（％）")
Songiri = input(99, minval = 0.1, maxval = 100, title = "損切（％）")
 
base = sma(source, length)
range = mult * stdev(source, length)
 
upper = base + range
lower = base - range
 
short_cond = crossover(source, lower)
long_cond = crossunder(source, upper)
 
 
cl = 0.0
cl := na(cl[1]) ? sma(source, length) : (cl[1] * (length - 1) + source) / length
 
plot(cl, color=black)
 
up_plot = plot(upper, color=blue)
low_plot = plot(lower, color=red)
 
fill(up_plot, low_plot,color=#009900)
 
//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
//
//オーダー処理
//
//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 
 
if (long_cond)
 
	strategy.entry("Long_Entry", strategy.long, oca_name="BollingerBands", comment="Long")
 
	//BitFlyerのようなJPY建ての場合は以下のコードを使います。他の通貨ペアにする場合も１ティックが異なるため桁数の変更が必要です。
	//strategy.exit("LE Exit", "BBandLE", profit = close*(Rikaku/100)*100, loss = close*(Songiri/100)*100, comment="Close")
	strategy.exit("Long_Exit", "Long_Entry", profit = close*(Rikaku/100)*10, loss = close*(Songiri/100)*10, comment="LongClose")
 
if (short_cond)
 
	strategy.entry("Short_Entry", strategy.short, oca_name="BollingerBands",  comment="Short")
 
    //BitFlyerのようなJPY建ての場合は以下のコードを使います。他の通貨ペアにする場合も１ティックが異なるため桁数の変更が必要です。
    //strategy.exit("SE Exit", "BBandSE", profit = close*(Rikaku/100)*100, loss = close*(Songiri/100)*100, comment="Close")
    strategy.exit("Short_Exit", "Short_Entry", profit = close*(Rikaku/100)*10, loss = close*(Songiri/100)*10, comment="ShortClose")
```

> Detail

https://www.fmz.com/strategy/426848

> Last Modified

2023-09-14 20:09:13
