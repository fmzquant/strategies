
> Name

反转双MACD交易策略Dual-MACD-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/182d5d986e8b37b1b85.png)
[trans]

## 概述
反转双MACD交易策略是一个利用MACD指标识别趋势反转信号的量化交易策略。该策略同时结合了RVI指标和CCI指标来确认买入时机,以过滤掉一些假反转。本策略适用于日内和短线交易。

## 策略原理
策略主要基于MACD指标。MACD为较快移动平均线EMA(12)减去较慢移动平均线EMA(26)得到快线,再用SIGNAL(9)作为慢线。当快线上穿慢线产生 Golden Cross时看涨;当快线下穿慢线产生 Dead Cross 时看跌。 

该策略运用双时间周期MACD指标寻找反转机会。策略使用6小时级别MACD判断总体趋势方向,日内1小时级别MACD寻找反转信号。当6小时MACD处于上升趋势时,1小时级别如果出现快线下穿慢线的死叉信号,说明价格可能反转上涨。此时结合RVI指标和CCI指标进一步确认,产生买入信号。

RVI指标测量最新几根K线的收盘价和开盘价与最高价和最低价的关系。当RVI低于0.2时被认为是超卖。CCI指标小于-100时表示超卖。所以策略利用RVI指标低于0.2 和 CCI指标低于-95这两个条件来辅助确认买入信号。

## 优势分析
该策略结合双时间周期MACD以及RVI和CCI指标,可以比较准确地识别反转机会,过滤掉部分假反转信号,从而提高策略的稳定性。具体优势如下:

1. 利用6小时级别MACD判断大趋势,避免在大盘不确定性加大的环境中交易。

2. 1小时级别MACD识别反转时机,可以捕捉较短周期内的价格调整。

3. RVI指标和CCI指标的结合使用,可以更准确判断反转的时机。

4. 策略加入止损点,可以减少亏损。

## 风险分析
该策略也存在一定的风险,主要体现在:

1. MACD指标本身容易产生假信号,所以即使辅助指标过滤效果较好,也无法完全避免亏损。建议降低仓位规模。

2. RVI指标和CCI指标可能发出错误信号,从而错过较好的反转机会或增加不必要的亏损。建议合理调整RVI和CCI参数。

3. 止损点设置不当可能过于密集触发止损,也可能过于宽松无法及时控制损失。建议根据市场波动程度调整止损幅度。

## 优化方向 
该策略可以从以下几个方面继续优化:

1. 当前使用1小时和6小时两个时间周期,可以测试更多时间周期组合,寻找更稳定的参数。

2. 可以引入更多指标,如KDJ、WR、OBV等来辅助判断买卖点。但要防止产生过于复杂的交易信号。

3. 可以根据不同品种参数不断优化,设立参数库。如适合中低频交易的品种可以适当加长参数周期。

4. 可以设置动态止损机制,在盈利后逐步挪动止损点。或根据市场波动程度实时调整止损幅度。

## 总结
反转双MACD交易策略综合考虑趋势判断和反转信号,并辅以RVI和CCI指标过滤信号。该策略可以有效识别短线调整提供较好的风险回报比,适合日内和短线交易,也可作为多策略组合的一部分,提供整体策略的多样性。

||

## Overview
The Dual MACD Reversal Trading Strategy is a quantitative trading strategy that uses the MACD indicator to identify trend reversal signals. This strategy also combines the RVI indicator and the CCI indicator to confirm buy signals and filter out some false reversals. This strategy is suitable for intraday and short-term trading.

## Strategy Logic
The strategy is mainly based on the MACD indicator. MACD is the fast moving average EMA(12) minus the slow moving average EMA(26) to get the fast line, and then use SIGNAL(9) as the slow line. When the fast line crosses above the slow line to generate a Golden Cross, it is bullish; When the fast line crosses below the slow line to generate a Dead Cross, it is bearish.

This strategy uses dual time frame MACD indicators to identify reversal opportunities. The strategy uses the 6-hour MACD to determine the overall trend direction and the 1-hour MACD to find reversal signals. When the 6-hour MACD is in an uptrend, if the 1-hour fast line crosses below the slow line to generate a death cross signal, it indicates that the price may reverse upwards. At this point, combine the RVI indicator and CCI indicator to further confirm and generate a buy signal.

The RVI indicator measures the relationship between the closing price and opening price of the most recent few candlesticks versus the highest and lowest prices. An RVI below 0.2 is considered oversold. The CCI indicator below -100 indicates oversold. So the strategy uses the RVI indicator below 0.2 and the CCI indicator below -95 to help confirm the buy signal.

## Advantage Analysis 
This strategy combines dual time frame MACD and RVI and CCI indicators to accurately identify reversal opportunities and filter out some false reversal signals to improve the stability of the strategy. The specific advantages are as follows:

1. Use the 6-hour MACD to determine the major trend and avoid trading in environments with increased uncertainty in the broader market.

2. The 1-hour MACD identifies reversal timing and captures shorter cycle price adjustments.

3. The combination of the RVI indicator and CCI indicator can more accurately determine the timing of the reversal. 

4. The strategy incorporates a stop loss to reduce losses.

## Risk Analysis
The strategy also has some risks, mainly reflected in:

1. MACD itself tends to generate false signals, so even though the auxiliary indicators have a good filtering effect, it is impossible to completely avoid losses. It is recommended to reduce the position size.

2. RVI and CCI indicators may issue incorrect signals, thus missing better reversal opportunities or increasing unnecessary losses. It is recommended to reasonably adjust RVI and CCI parameters.

3. Improper stop loss setting may trigger stop loss too frequently or fail to control losses in time if too loose. It is recommended to adjust the stop loss magnitude according to market volatility.


## Optimization Directions
The strategy can be further optimized from the following aspects:

1. Currently using 1 hour and 6 hour two time frames, more time frame combinations can be tested to find more stable parameters.

2. More indicators can be introduced, such as KDJ, WR, OBV, etc. to assist in judging trading points. But be careful not to generate overly complex trading signals.

3. Parameters can be continuously optimized for different varieties, and parameter libraries can be established. For varieties suitable for medium and low frequency trading, longer cycle parameters can be appropriately increased.

4. A dynamic stop loss mechanism can be set to gradually move the stop loss point as profits increase. Or adjust the stop loss magnitude in real time according to market volatility.


## Summary 
The Dual MACD Reversal Trading Strategy comprehensively considers trend judgment and reversal signals, and is assisted by RVI and CCI indicators to filter signals. This strategy can effectively identify short-term adjustments with good risk-return ratios, suitable for intraday and short-term trading, and can also be used as part of a multi-strategy portfolio to provide overall strategy diversity.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|fastLength|
|v_input_2|26|slowlength|
|v_input_3|9|MACDLength|
|v_input_4|0.95|SL|
|v_input_5|26|Short period|
|v_input_6|12|Long period|
|v_input_7|9|Smoothing period|
|v_input_8|10|length1|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-05 00:00:00
end: 2024-01-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Bat MACD", overlay=true)

fastLength = input(12)
slowlength = input(26)
MACDLength = input(9)
h=1.05

MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD
hmacd= aMACD>0? h*aMACD: -(1/h)*abs(MACD) 

MACDD= (request.security(syminfo.tickerid,'360',ema(close, fastLength)) - request.security(syminfo.tickerid,'360',ema(close,slowlength)))
aMACDD = (request.security(syminfo.tickerid,'360',ema(ema(request.security(syminfo.tickerid,'360',close), fastLength)-ema(request.security(syminfo.tickerid,'360',close),slowlength), MACDLength)))
deltad= MACDD-aMACDD
L= input(0.95, title="SL")
SL = L*ema(close,10)

//MACD
slow = input(26,"Short period")
fast = input(12, "Long period")
signal = input(9, "Smoothing period")
//MACD = ema(close,fast)-ema(close,slow)
dMACD= MACD<0? ema(MACD,5):0
Mcond= rising(dMACD,1)
mcount=0.0
mcount := Mcond ? nz(mcount[1]) + 1 : nz(mcount[1])
counter=0
counter := (mcount-mcount[1]==0) ? nz(counter[1]) + 1 : 0
//counter := counter==3 ? 0: nz(counter[1])
pp=0.0
mc=0.0
pp:= (counter-counter[1]<0)? close[1] : nz(pp[1])
mc:= (counter-counter[1]<0)? MACD[1] : nz(mc[1])

bull = (pp-pp[1]<-close*0.005 and mc-mc[1]>0.02*abs(MACD) and MACD<0 and MACD[1]<0)? 1:0

//bgcolor(bull?green:white)
//RVI
p=10
CO=close-open
HL=high-low
value1 = (CO + 2*CO[1] + 2*CO[2] + CO[3])/6
value2 = (HL + 2*HL[1] + 2*HL[2] + HL[3])/6
num=sum(value1,p)
denom=sum(value2,p)
rvi=denom!=0?num/denom:0

//RVI
drvi= (rvi<0.2)? ema(rvi-0.20,3):0
RVcond= rising(drvi,1)
rvcount=0.0
rvcount := RVcond ? nz(rvcount[1]) + 1 : nz(rvcount[1])
rvcounter=0
rvcounter := (rvcount-rvcount[1]==0) ? nz(rvcounter[1]) + 1 : 0
//counter := counter==3 ? 0: nz(counter[1])
rvpp=0.0
rvmc=0.0
rvpp:= (rvcounter-rvcounter[1]<0)? close[1] : nz(rvpp[1])
rvmc:= (rvcounter-rvcounter[1]<0)? drvi[1] : nz(rvmc[1])
rvbull = (rvpp-rvpp[1]<-close*0.005 and rvmc-rvmc[1]>0.02 and drvi<0 and drvi[1]<0)? 1:0

//VolCCI
length1 = input(10, minval=1)
xMAVolPrice = ema(volume * close, length1)
xMAVol = ema(volume, length1)
src1 = xMAVolPrice / xMAVol
map = sma(src1, length1)
cci = (src1 - map) / (0.015 * dev(src1, length1))
cfi= (cci<0)? ema(cci,3) :0
CCcond= rising(cfi,1)
cccount=0.0
cccount := CCcond ? nz(cccount[1]) + 1 : nz(cccount[1])
cccounter=0
cccounter := (cccount-cccount[1]==0) ? nz(cccounter[1]) + 1 : 0
//counter := counter==3 ? 0: nz(counter[1])
ccpp=0.0
ccmc=0.0
ccpp:= (cccounter-cccounter[1]<0)? close[1] : nz(ccpp[1])
ccmc:= (cccounter-cccounter[1]<0)? cci[1] : nz(ccmc[1])
ccbull = (ccpp-ccpp[1]<-close*0.003 and ccmc-ccmc[1]>20 and cci<-95 and cci[1]<-95)? 1:0

A= bull+ccbull+rvbull
if ((MACD>hmacd)  and deltad>0 and delta>delta[1])
    strategy.entry("Long", strategy.long, comment="Buy", qty=10000/close)
if (crossunder(delta, 0) or crossunder(close,SL))
    strategy.close("Long")
if(crossover(low,SL) and SL-SL[1]<close*0.005 and SL-SL[1]>-close*0.005)    
    strategy.entry("Long", strategy.long, comment="Buy", qty=10000/close)
if A 
    strategy.entry("Long", strategy.long, comment="Buy", qty=10000/close)
plot(SL)

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/438502

> Last Modified

2024-01-12 14:49:47
