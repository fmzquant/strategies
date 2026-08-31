
> Name

基于布林带的中长期量化交易策略Medium-Long-Term-Quantitative-Trading-Strategy-Based-on-Bollinger-Bands

> Author

ChaoZhang

> Strategy Description



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
