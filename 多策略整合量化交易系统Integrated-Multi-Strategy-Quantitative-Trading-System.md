
> Name

多策略整合量化交易系统Integrated-Multi-Strategy-Quantitative-Trading-System

> Author

ChaoZhang

> Strategy Description


[trans]
本文将为您介绍一种名为“多策略整合量化交易系统”的数字货币算法交易策略。该策略通过整合多种单一策略的优势,构建一个多策略组合,以期获得更高的稳定性和多样性。

这种策略集成了四种常见的量化交易策略,包括:

1. 通道突破策略:根据一定周期的最高价和最低价构建上下通道,并在价格突破通道时建仓做多做空。

2. 动量策略:根据一定周期内的价格变化方向判断动量,在价格上涨加速时做多,下跌加速时做空。

3. MACD策略:根据快慢均线的金叉和死叉来判断建立做多做空仓位。

4. 哈拉米formations策略:通过识别特定的烛形来判断未来价格可能的反转,在转折点附近进行交易。

这几种策略各有优势,组合在一起可以实现更稳定的收益。具体来说:

通道突破策略可以捕捉市场的趋势;动量策略可以及时追踪短期趋势;MACD策略可以发现中期趋势转折点;哈拉米策略可以判断关键的反转点。

将它们整合在一个策略内,就可以做到在趋势行情中追涨杀跌,并在转折点附近打开反手仓位。同时,不同策略之间还可以实现风险分散。

当然,这种多策略组合也存在一定的缺点:

1. 策略过于复杂,参数调整困难

2. 部分策略之间可能存在冲突

3. 增加了交易频次和交易成本

4. 回测效果可能比单一策略更差

因此,用户在使用这种多策略组合时,要注意参数调整的难度,要测试冲突之间的相互影响,要控制交易频次,并进行充分回测,以确保其长期稳定性。

总体来说,这种多策略整合的量化交易系统,可以获得非常丰富的交易组合,在大趋势中的表现也非常出色。它综合不同策略的优势,可以更稳定地获得长期正收益。值得用户进一步研究和优化,以开发出一个强大的量化交易策略组合。
||
This article will introduce you to a quantitative trading strategy called "Integrated Multi-Strategy Quantitative Trading System" for cryptocurrencies. This strategy integrates the advantages of multiple single strategies to construct a portfolio of multiple strategies, aiming to achieve higher stability and diversity.

This strategy incorporates four common quantitative trading strategies:

1. Channel breakout strategy: Construct upper and lower channels based on highest and lowest prices over a certain period and take positions when price breaks out of the channel.

2. Momentum strategy: Determine momentum based on price changes over a certain period, go long when prices rise accelerating, go short when prices fall accelerating.

3. MACD strategy: Determine long and short positions based on MACD golden cross and dead cross. 

4. Harami pattern strategy: Identify potential future reversals by recognizing specific candlestick patterns and trade around turning points.

These strategies each have advantages. Combined together, they can achieve more stable returns. Specifically:

The channel breakout strategy can capture market trends; the momentum strategy can timely track short-term trends; the MACD strategy can discover medium-term trend reversals; the Harami strategy can determine key reversal points.

Integrating them into one strategy allows you to chase rises and kill falls during trending markets and open reverse positions around inflection points. Meanwhile, different strategies can also achieve risk diversification.

Of course, such multi-strategy combinations also have some disadvantages:

1. The strategy is too complex and parameters are difficult to adjust.

2. There may be conflicts between some strategies. 

3. It increases trading frequency and transaction costs.

4. Backtesting results may be worse than a single strategy.

Therefore, when using this multi-strategy combination, users should pay attention to the difficulty of parameter adjustment, test the interaction between conflicts, control trading frequency, and conduct sufficient backtesting to ensure its long-term stability.

In general, this integrated multi-strategy quantitative trading system can obtain very rich trading combinations and performs very well in major trends. It combines the advantages of different strategies and can achieve more stable long-term positive returns. It is worth users' further research and optimization to develop a powerful quantitative strategy portfolio.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Length|
|v_input_2|12|length1|
|v_input_3|12|fastLength|
|v_input_4|26|slowlength|
|v_input_5|9|MACDLength|
|v_input_6|60|Doji, Min % of Range of Candle for Wicks|
|v_input_7|false|Doji, Previous Candle Min Pip Body Size|
|v_input_8|true|Show Price Action Bar Names|
|v_input_9|false|Highlight Harami & Doji Bars|
|v_input_10|false|Show Only Harami Style Doji's|
|v_input_11|true|Generate Alert for Harami & Doji Bars|
|v_input_12|true|Use Heikin Ashi Candles for Calculations|
|v_input_13|3|Doji, Number of Lookback Bars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-09-14 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

//Channel breakout
strategy("all_strategy", overlay=true)

length = input(title="Length", minval=1, maxval=1000, defval=5)

upBound = highest(high, length)
downBound = lowest(low, length)

if (not na(close[length]))
    strategy.entry("ChBrkLE", strategy.long, stop=upBound + syminfo.mintick, comment="ChBrkLE")
    strategy.entry("ChBrkSE", strategy.short, stop=downBound - syminfo.mintick, comment="ChBrkSE")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)


//Momentum
length1 = input(12)
price = close

momentum(seria, length) =>
    mom = seria - seria[length1]
    mom

mom0 = momentum(price, length1)
mom1 = momentum( mom0, 1)

if (mom0 > 0 and mom1 > 0)
    strategy.entry("MomLE", strategy.long, stop=high+syminfo.mintick, comment="MomLE")
else
    strategy.cancel("MomLE")

if (mom0 < 0 and mom1 < 0)
    strategy.entry("MomSE", strategy.short, stop=low-syminfo.mintick, comment="MomSE")
else
    strategy.cancel("MomSE")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)


//MACD Strategy
fastLength = input(12)
slowlength = input(26)
MACDLength = input(9)

MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD

if (crossover(delta, 0))
    strategy.entry("MacdLE", strategy.long, comment="MacdLE")

if (crossunder(delta, 0))
    strategy.entry("MacdSE", strategy.short, comment="MacdSE")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)


//Harami

pctDw = input(60,minval=0,maxval=90,title="Doji, Min % of Range of Candle for Wicks")
pipMin= input(0,minval=0,title="Doji, Previous Candle Min Pip Body Size")
sname=input(true,title="Show Price Action Bar Names")
cbar = input(false,title="Highlight Harami & Doji Bars")
sHm    = input(false,title="Show Only Harami Style Doji's")
setalm = input(true, title="Generate Alert for Harami & Doji Bars")
uha   =input(true, title="Use Heikin Ashi Candles for Calculations")
bars = input(3,minval=1,maxval=3,step=1, title="Doji, Number of Lookback Bars")
//
// Use only Heikinashi Candles for all calculations
srcclose = uha ? security(heikinashi(syminfo.tickerid), timeframe.period, close) : close
srcopen = uha ? security(heikinashi(syminfo.tickerid), timeframe.period, open) : open
srchigh = uha ? security(heikinashi(syminfo.tickerid), timeframe.period, high) : high
srclow = uha ?security(heikinashi(syminfo.tickerid), timeframe.period, low) : low

//
pip = syminfo.mintick
range = srchigh - srclow


// Calculate Doji/Harami Candles
pctCDw = (pctDw/2) * 0.01
pctCDb = (100-pctDw) * 0.01

//Lookback Candles for bulls or bears
lbBull = bars==1? srcopen[1]>srcclose[1]: bars==2? (srcopen[1]>srcclose[1] and srcopen[2]>srcclose[2]): bars==3?(srcopen[1]>srcclose[1] and srcopen[2]>srcclose[2] and srcopen[3]>srcclose[3]):false
lbBear = bars==1? srcopen[1]<srcclose[1]: bars==2? (srcopen[1]<srcclose[1] and srcopen[2]<srcclose[2]): bars==3?(srcopen[1]<srcclose[1] and srcopen[2]<srcclose[2] and srcopen[3]<srcclose[3]):false

//Lookback Candle Size only if mininum size is > 0
lbSize = pipMin==0? true : bars==1 ? (abs(srcopen[1]-srcclose[1])>pipMin*pip) :
  bars==2 ? (abs(srcopen[1]-srcclose[1])>pipMin*pip and abs(srcopen[2]-srcclose[2])>pipMin*pip) :
  bars==3 ? (abs(srcopen[1]-srcclose[1])>pipMin*pip and abs(srcopen[2]-srcclose[2])>pipMin*pip and abs(srcopen[3]-srcclose[3])>pipMin*pip) :
  false

dojiBu = (srcopen[1] >= max(srcclose,srcopen) and srcclose[1]<=min(srcclose,srcopen)) and lbSize and
  (abs(srcclose-srcopen)<range*pctCDb and (srchigh-max(srcclose,srcopen))>(pctCDw*range) and (min(srcclose,srcopen)-srclow)>(pctCDw*range))? 1 : 0

dojiBe = (srcclose[1] >= max(srcclose,srcopen) and srcopen[1]<=min(srcclose,srcopen)) and lbSize and
  (abs(srcclose-srcopen)<range*pctCDb and (srchigh-max(srcclose,srcopen))>(pctCDw*range) and (min(srcclose,srcopen)-srclow)>(pctCDw*range))? 1 : 0
  
haramiBull = (srcopen<=srcclose or (max(srcclose,srcopen)-min(srcclose,srcopen))<pip*0.5) and lbBull and dojiBu
haramiBear = (srcopen>=srcclose or (max(srcclose,srcopen)-min(srcclose,srcopen))<pip*0.5) and lbBear and dojiBe

dojiBull = not sHm and not haramiBull and not haramiBear and lbBull and dojiBu
dojiBear = not sHm and not haramiBull and not haramiBear and lbBear and dojiBe

//
plotshape(haramiBear and sname?srchigh:na,title="Bearish Harami",text='Bearish\nHarami',color=red, style=shape.arrowdown,location=location.abovebar)
plotshape(haramiBear and cbar?max(srcopen,srcclose):na,title="Bear Colour Harami",color=red, style=shape.circle,location=location.absolute,size=size.normal)
//
plotshape(haramiBull and sname?srclow:na,title="Bullish Harami",text='Bullish\nHarami',color=green, style=shape.arrowup,location=location.belowbar)
plotshape(haramiBull and cbar?max(srcopen,srcclose):na,title="Bull Colour Harami",color=green, style=shape.circle,location=location.absolute,size=size.normal)
//
plotshape(dojiBear and sname?srchigh:na,title="Bearish Doji",text='Bearish\nDoji',color=fuchsia, style=shape.arrowdown,location=location.abovebar)
plotshape(dojiBear and cbar?max(srcopen,srcclose):na,title="Bear Colour Doji",color=fuchsia, style=shape.circle,location=location.absolute,size=size.normal)
//
plotshape(dojiBull and sname?srclow:na,title="Bullish Doji",text='Bullish\nDoji',color=aqua, style=shape.arrowup,location=location.belowbar)
plotshape(dojiBull and cbar?max(srcopen,srcclose):na,title="Bull Colour Doji",color=aqua, style=shape.circle,location=location.absolute,size=size.normal)

// Only Alert harami Doji's
bcolor = haramiBull ? 1 : haramiBear ? 2 : dojiBull ? 3 : dojiBear ? 4 : 0
baralert = setalm and bcolor>0
alertcondition(baralert,title="PACDOJI Alert",message="PACDOJI Alert")

//
plotshape(na(baralert[1])?na:baralert[1], transp=0,style=shape.circle,location=location.bottom, offset=-1,title="Bar Alert Confirmed", 
  color=bcolor[1]==1 ? green : bcolor[1]==2? red : bcolor[1]==3? aqua : bcolor[1]==4? fuchsia : na)

//EOF
```

> Detail

https://www.fmz.com/strategy/426893

> Last Modified

2023-09-15 12:29:33
