
> Name

基于霍尔速度均线和卡尔曼滤波的趋势跟踪策略Hull-Moving-Average-and-Kalman-Filter-Based-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1469a526a0a13f43b84.png)

[trans] 

### 概述

本策略结合了霍尔移动平均线和卡尔曼滤波,以识别并跟踪价格趋势,属于趋势跟踪策略。它使用两个不同周期的霍尔移动平均线构建交易信号,并配合卡尔曼滤波进行平滑处理,旨在提高信号质量和策略稳定性。

### 策略原理  

- 策略使用24周期的霍尔移动平均线hma和24周期的三重霍尔移动平均线hma3构建交易信号。

- 当hma上穿hma3时,产生买入信号;当hma下穿hma3时,产生卖出信号。

- 策略默认关闭卡尔曼滤波,开启卡尔曼滤波后,对hma和hma3进行卡尔曼滤波处理,以过滤掉过多的噪音,提升信号质量。

- 卡尔曼滤波通过预测和校正步骤消除信号中的随机噪声。每次测量与上次预测之间的差值作为校正项,以更精确预测下一次测量值。通过重复地预测和校正,可逐步减少噪声的影响,使信号变得更平滑。

- 该策略使用卡尔曼滤波增强移动平均线策略的稳定性,滤除随机波动的影响,跟踪持续趋势。

### 策略优势

- 相比单一移动平均线,双移动平均线系统能够更好地识别持续趋势。

- 霍尔移动平均线通过加权方式计算,对近期价格赋予较大权重,能更敏感地捕捉价格变化。

- 卡尔曼滤波可有效过滤信号中的随机噪声,减少假 signals,提高信号质量。

- 策略参数可调整,周期长度和卡尔曼滤波增益可根据市场调整,适应不同行情。

- 策略采用跨周期技术构建信号,可识别更持久的趋势,避免被过多随机波动愚弄。

- 可视化界面直观显示信号和趋势状态,便于操作。

### 策略风险

- 双移动平均线策略容易在趋势转折点产生错误信号,无法及时捕捉转折。

- 移动平均线存在滞后性,可能错过价格快速反转的机会。

- 不适用于剧烈波动的行情,应避免在震荡颠簸阶段使用。

- 卡尔曼滤波的参数设置会影响策略表现,增益过大可能过滤掉有效信号。

- 长周期设置则响应不敏锐,短周期设置则容易被噪声影响,需要根据市场调整参数。

- 多空持仓时间不固定,存在无持仓阶段,降低了资金利用效率。

### 优化方向

- 可尝试采用自适应移动平均线动态优化参数,根据波动率调整周期长度。

- 配合波动率指标判断行情状态,在震荡市避免交易,只在趋势明确时交易。 

- 可设置止损策略,避免亏损扩大,提高风险控制能力。

- 优化卡尔曼滤波参数,平衡跟踪灵敏度和噪声过滤程度。

- 结合其他指标确认信号有效性,如量能指标、布林带判断趋势持久性等。

- 可采用机器学习等手段训练参数,使策略更具鲁棒性和自适应性。

### 总结

本策略通过双霍尔移动平均线和卡尔曼滤波跟踪趋势,可有效识别持久趋势,提高信号质量。但需注意参数优化,行情适应性调整,风险控制以得到稳定收益。机器学习和量化分析可进一步提升策略表现。通过不断优化,可打造出稳定高效的趋势跟踪交易策略。

||

### Overview

This strategy combines Hull Moving Average and Kalman filter to identify and track price trends, belonging to trend tracking strategies. It uses two Hull Moving Averages with different periods to generate trading signals, and adopts Kalman filter to smooth the signals, aiming to improve signal quality and strategy stability.  

### Strategy Logic

- The strategy uses 24-period Hull Moving Average (hma) and 24-period Triple Hull Moving Average (hma3) to construct trading signals.

- When hma crosses over hma3, a buy signal is generated. When hma crosses below hma3, a sell signal is generated.

- Kalman filter is disabled by default. When enabled, it smooths hma and hma3 to filter out excessive noise and improve signal quality.

- Kalman filter eliminates random noise from signals through predicting and correcting steps. The difference between each measurement and last prediction is treated as the correcting item to predict next measurement more precisely. By repeating prediction and correction, the impact of noise can be reduced gradually to smooth the signal.

- This strategy leverages Kalman filter to enhance the stability of moving average strategies by filtering out random fluctuations and tracking persistent trends.

### Advantages

- Dual moving averages system can better identify lasting trends compared to single moving average.

- Hull Moving Average puts more weight on recent prices through weighted calculation, making it more sensitive in capturing price changes.

- Kalman filter can effectively filter out random noise from signals, reducing false signals and improving signal quality.

- Adjustable parameters like period and Kalman filter gain allows the strategy to adapt to different market conditions.

- Adopting cross-period techniques generates more persistent signals, avoiding being misguided by excessive random fluctuations. 

- Visual interface intuitively displays signals and trend status for ease of operation.

### Risks

- Dual moving averages are prone to generating wrong signals around trend turning points, unable to timely capture reversals.

- The lagging of moving averages may miss opportunities of fast price reversals.

- Not suitable for violent fluctuating markets. Should avoid using it during turbulent phases.

- Kalman filter parameters could impact strategy performance. Too large gain may filter out valid signals.

- Longer periods have slow response while shorter periods are vulnerable to noise. Parameter tuning is required based on market conditions.

- Unfixed long/short holding periods lead to idle time with no positions, reducing capital utilization efficiency. 

### Enhancement

- Try adaptive moving averages which dynamically optimize parameters based on volatility.

- Incorporate volatility metrics to avoid trading during choppy markets and only trade on obvious trends.

- Set up stop loss to limit losses and improve risk control.

- Optimize Kalman filter parameters to balance tracking sensitivity and noise filtering level.

- Confirm signal validity with other indicators like volume, Bollinger Bands for trend persistence.

- Utilize machine learning to train parameters and improve strategy robustness and adaptiveness.

### Conclusion

This strategy effectively identifies lasting trends and improves signal quality by dual Hull MAs and Kalman filter. Note parameter optimization, market adaptiveness and risk control for steady profits. Further improvements can be achieved through machine learning and quantitative analysis. Continuous enhancements will shape a robust and efficient trend tracking system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_hl2|0|Price Data: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_2|24|Lookback|
|v_input_3|true|Show cross over/under|
|v_input_4|10000|Gain|
|v_input_5|true|Use Kahlman|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-25 00:00:00
end: 2023-10-31 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Hull Trend with Kahlman Strategy Backtest", shorttitle="HMA-Kahlman Trend Strat", overlay=true)

src       = input(hl2,   "Price Data")
length    = input(24,    "Lookback")
showcross = input(true,  "Show cross over/under")
gain      = input(10000, "Gain")
k         = input(true,  "Use Kahlman")

hma(_src, _length) =>
    wma((2 * wma(_src, _length / 2)) - wma(_src, _length), round(sqrt(_length)))
    
hma3(_src, _length) =>
    p = length/2
    wma(wma(close,p/3)*3 - wma(close,p/2) - wma(close,p),p)

kahlman(x, g) =>
    kf = 0.0
    dk = x - nz(kf[1], x)
    smooth = nz(kf[1],x)+dk*sqrt((g/10000)*2)
    velo = 0.0
    velo := nz(velo[1],0) + ((g/10000)*dk)
    kf := smooth+velo
  
a = k ? kahlman(hma(src, length), gain) : hma(src, length)
b = k ? kahlman(hma3(src, length), gain) : hma3(src, length)
c = b > a ? color.lime : color.red
crossdn = a > b and a[1] < b[1]
crossup = b > a and b[1] < a[1]

p1 = plot(a,color=c,linewidth=1,transp=75)
p2 = plot(b,color=c,linewidth=1,transp=75)
fill(p1,p2,color=c,transp=55)
plotshape(showcross and crossdn ? a : na, location=location.absolute, style=shape.labeldown, color=color.red, size=size.tiny, text="S", textcolor=color.white, transp=0, offset=-1)
plotshape(showcross and crossup ? a : na, location=location.absolute, style=shape.labelup, color=color.green, size=size.tiny, text="B", textcolor=color.white, transp=0, offset=-1)

longCondition = crossup
if (longCondition)
    strategy.entry("LE", strategy.long)

shortCondition = crossdn
if (shortCondition)
    strategy.entry("SE", strategy.short)
    

```

> Detail

https://www.fmz.com/strategy/430775

> Last Modified

2023-11-01 17:10:49
