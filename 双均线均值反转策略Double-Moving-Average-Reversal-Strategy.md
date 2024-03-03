
> Name

双均线均值反转策略Double-Moving-Average-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10a7fcbc4c17745e063.png)

[trans]


双均线均值反转策略是一种趋势跟踪策略。它通过计算不同周期的均线,判断价格走势是否反转,以捕捉趋势反转点,实现低买高卖。

该策略首先计算两组不同周期的均线,一组是较长周期的均线,用于判断整体趋势;另一组是较短周期的均线,用于判断局部趋势。策略通过比较两组均线的关系,判断整体趋势是否发生反转。

具体来说,策略先计算一组较长周期(如60日线)的两条均线,分别是60日简单移动均线和60日加权移动均线。这组均线用于判断整体趋势。另外,策略再计算一组较短周期(如5日线)的两条均线,分别是5日简单移动均线和5日加权移动均线。这组均线用于判断局部趋势。 

当短期均线上穿长期均线时,表示价格反转,由下降转为上升,本策略将开多头头寸;当短期均线下穿长期均线时,表示价格反转,由上升转为下降,本策略将开空头头寸。

具体操作如下:

1. 计算60日简单移动均线nma和60日加权移动均线n2ma

2. 计算5日简单移动均线nma1和5日加权移动均线n2ma1 

3. 比较n2ma1和nma1:若n2ma1上穿nma1,则开多头;若n2ma1下穿nma1,则开空头

4. 比较n2ma和nma:若n2ma上穿nma,且已开多头,则继续持有多头;若n2ma下穿nma,且已开空头,则继续持有空头

5. 当价格超过止损点或达到止盈点时,平仓

6. 重复上述过程,以捕捉趋势反转,实现低买高卖

这个策略的优势在于,双均线组合可以比较灵敏地捕捉价格趋势的反转,双均线反转是比较经典的技术指标信号。同时,不同周期均线的组合,可以对整体趋势和局部趋势进行判断,实现了趋势跟踪。

该策略的风险在于,双均线反转信号可能出现假信号,从而导致乱入场或掉头出场,增加交易风险。此外,均线系统对盘整范围较大的市场,容易产生错误信号。最后,双均线系统需要较长的回测周期,来验证参数设置的稳定性。

该策略可以从以下几个方面进行优化:

1. 优化均线的周期参数,寻找最佳参数组合

2. 增加其他技术指标过滤,避免假突破

3. 加入止损止盈策略,控制单笔损益

4. 结合趋势交易时机,避免震荡市场的错误交易

5. 动态调整仓位规模,适应市场波动的变化

综上所述,双均线均值反转策略通过比较不同周期均线的关系,捕捉价格趋势反转点,以达到低买高卖的目的。优化参数设置、增加过滤条件、控制风险是该策略可以改进的方向。使用恰当,它可以成为一个定量捕捉趋势转折的有效工具。

|| 


The Double Moving Average Reversal strategy is a trend following strategy. It calculates moving averages of different periods to determine if the price trend reverses, in order to capture turning points and achieve buying low and selling high.

This strategy first calculates two sets of moving averages with different periods. One set is long-period moving averages, which is used to determine the overall trend. The other set is short-period moving averages, which is used to determine the local trend. By comparing the relationship between the two sets of moving averages, the strategy judges whether the overall trend has reversed.

Specifically, the strategy first calculates two long-period (e.g. 60-day) moving averages, which are the 60-day simple moving average and the 60-day weighted moving average. This set of moving averages is used to determine the overall trend. In addition, the strategy calculates two short-period (e.g. 5-day) moving averages, which are the 5-day simple moving average and the 5-day weighted moving average. This set of moving averages is used to determine the local trend.

When the short-term moving average crosses above the long-term moving average, it indicates the price has reversed from downtrend to uptrend. The strategy will open long positions. When the short-term moving average crosses below the long-term moving average, it indicates the price has reversed from uptrend to downtrend. The strategy will open short positions. 

The specific steps are:

1. Calculate the 60-day simple moving average nma and 60-day weighted moving average n2ma

2. Calculate the 5-day simple moving average nma1 and 5-day weighted moving average n2ma1

3. Compare n2ma1 and nma1: if n2ma1 crosses above nma1, open long positions; if n2ma1 crosses below nma1, open short positions

4. Compare n2ma and nma: if n2ma crosses above nma and long position is opened, continue holding long; if n2ma crosses below nma and short position is opened, continue holding short 

5. Close positions when price exceeds stop loss or reaches take profit

6. Repeat the above process to capture trend reversal and achieve buying low and selling high

The advantage of this strategy is that the double moving average combination can sensitively capture the reversal of price trend. The double moving average crossover is a classic technical indicator signal. Also, the combination of different period moving averages can judge both overall and local trends, achieving trend following.

The risk of this strategy is that the double moving average crossover may have false signals, causing mistiming entering or exiting positions, thus increasing trading risk. In addition, moving average systems are prone to wrong signals in range-bound markets. Finally, the double moving average system requires relatively long backtesting period to verify the stability of parameter settings.

The strategy can be optimized in the following aspects:

1. Optimize the moving average periods to find the best parameter combination

2. Add other technical indicator filters to avoid false breakouts 

3. Add stop loss and take profit to control single trade risk

4. Combine with trend trading timing to avoid erroneous trades in sideways markets

5. Dynamically adjust position sizing to adapt to changing market volatility

In conclusion, the Double Moving Average Reversal strategy captures price trend turning points by comparing different period moving averages, in order to achieve buying low and selling high. Optimizing parameter settings, adding filters, and controlling risks are directions for improving the strategy. When used properly, it can be an effective tool to quantitatively capture trend reversals.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.001|Decision Threshold|
|v_input_2|true|Post Signal Bar Delay|
|v_input_3|5|Close Position Bar Delay|
|v_input_4|7|Double HullMA Cross|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-10 00:00:00
end: 2023-06-08 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//                   //////////////// Attempt to Reduced ReDraw version /////////////////////
//
//                         Microcana.com strategy by pilotgsms - version 4.20b <<<< Edited by Seaside420 >>>> special thanks to 55cosmicpineapple
//                            Hull_MA_cross added to script
strategy("M&H_v420b", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, calc_on_order_fills= true, calc_on_every_tick=true, pyramiding=0)
dt = input(defval=0.0010, title="Decision Threshold", type=float, step=0.0001)
dd = input(defval=1, title="Post Signal Bar Delay", type=float, step=1)
df = input(defval=5, title="Close Position Bar Delay", type=float, step=1)
keh=input(title="Double HullMA Cross",defval=7, minval=1)
confidence=(request.security(syminfo.tickerid, 'D', close)-request.security(syminfo.tickerid, 'D', close[1]))/request.security(syminfo.tickerid, 'D', close[1])
prediction = confidence > dt ? true : confidence < -dt ? false : prediction[1]
n2ma=2*wma(close,round(keh/2))
nma=wma(close,keh)
diff=n2ma-nma,sqn=round(sqrt(keh))
n2ma1=2*wma(close[2],round(keh/2))
nma1=wma(close[2],keh)
diff1=n2ma1-nma1,sqn1=round(sqrt(keh))
n1=wma(diff,sqn)
n2=wma(diff1,sqn)
openlong=prediction[dd] and n1>n2 and strategy.opentrades<1
if (openlong)
    strategy.entry("Long", strategy.long)
openshort=not prediction[dd] and n2>n1 and strategy.opentrades<1
if (openshort)
    strategy.entry("Short", strategy.short)
closeshort=prediction and close<low[df]
if (closeshort)
    strategy.close("Short")
closelong=not prediction and close>high[df]  
if (closelong)
    strategy.close("Long")
```

> Detail

https://www.fmz.com/strategy/429473

> Last Modified

2023-10-17 14:38:55
