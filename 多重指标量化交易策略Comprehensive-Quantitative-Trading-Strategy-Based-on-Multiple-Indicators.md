
> Name

多重指标量化交易策略Comprehensive-Quantitative-Trading-Strategy-Based-on-Multiple-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/117024b7e19a764eded.png)

## Overview  

The strategy is named "Comprehensive Quantitative Trading Strategy Based on Multiple Indicators". It integrates several technical indicators including SuperTrend, QQE and Trend Indicator A-V2 to form a comprehensive trading system that analyzes the market from multiple dimensions.

The core idea is to combine different indicators to improve the accuracy of judgment while capturing the major trends in the market, so as to provide traders with steady and efficient trading signals. This strategy takes into account trend, overbought/oversold levels, as well as intermediate and long-term trends, forming a multi-layer verification logic for trading decisions.

## Strategy Logic  

The core trading logic of this strategy is based on the combined judgments of the following three indicators:  

1. SuperTrend: To determine if the price is in an uptrend or a downtrend. It generates buy and sell signals when the close price breaks through the upper or lower band.

2. QQE: An improved version of RSI that incorporates mean reversion characteristics. It is used to judge if the market is overbought or oversold. The threshold is dynamically adjusted based on RSI's standard deviation band. 

3. Trend Indicator A-V2: Compare EMA of price and EMA of open price to determine trend direction. It verifies the intermediate and long-term trend.

The above three indicators have different focuses. SuperTrend targets at trends and reversal points. QQE focuses on overbought/oversold levels. A-V2 helps determine the intermediate and long-term trend. This strategy integrates them to form a complete trading decision system.

The specific trading logic is as follows:  

A buy signal is generated when SuperTrend shows an uptrend, QQE shows the RSI is below the oversold level, and the A-V2 EMAs are rising.  

A sell signal is generated when SuperTrend shows a downtrend, QQE shows the RSI is above the overbought level, and the A-V2 EMAs are falling.

The comprehensive judgment of multiple indicators ensures high accuracy in signals while maximizing opportunities in the market to achieve steady and efficient trading.

## Advantage Analysis 

The major advantages of this strategy are:

1. More accurate judgment due to indicator fusion. The integration of multiple indicators enables mutual verification, thus greatly improving accuracy.

2. More comprehensive coverage for dual-directional trading. Allowing long and short positions can gain decent profits from both upside and downside market swings.

3. Better risk control. Combination of indicators prevents individual indicator false signals. Indicators like QQE also control risks inherently.   

4. Easy to use, flexible parameter tuning. The input parameters are simple for users to adjust based on their own preferences to suit different market conditions.

5. Wide applicability across major markets. It can be applied to markets like stocks, forex, cryptocurrencies and suits technical traders in particular.

## Risk Analysis   

The major risks of this strategy include:  

1. Risk of bias in indicator judgments. Rare price anomalies may cause biases in indicator signals and hence risks.  

2. Risk of trend reversal. This strategy focuses on trend-following, so major fundamental-driven reversals can cause huge losses.

3. Risk from improper parameter tuning. Inadequate user settings on parameters can skew indicator signals.

The main risk management solutions are: 1) Verify signals across indicators to prevent reliance on single indicator; 2) Control position sizing for managed loss per trade; 3) Adjust parameters per different markets.

## Optimization Directions 

The strategy can be optimized in the following aspects:

1. Add stop loss for profit taking and drawdown reduction. Trailing stop loss or stop loss with profit can be introduced.

2. Integrate more indicators for improved system stability. Indicators like MACD, DMI, OBV can be added for signal confirmation.  

3. Introduce volatility-based position sizing. Dynamically adjust position sizes according to changing market volatility.  

4. Optimize parameter tuning. Longer backtests can be conducted to find the optimal parameter sets for this strategy.

5. Use different parameter sets for different markets. Parameters can be separately optimized for the best results in different markets (stocks, forex, crypto etc).

## Conclusion   

This strategy integrates SuperTrend, QQE and A-V2 indicators into a comprehensive quantitative trading system with robust signal judgments. By combining trend, overbought/oversold levels and intermediate-long term trend verifications, it can effectively identify opportunities while strictly controlling risks. The strategy has significant advantages and is worth evaluating and optimizing in live trading by technical traders. It also provides valuable references for other strategy development.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|單邊|
|v_input_2|9|ST ATR Period|
|v_input_3|3.9|ST ATR Multiplier|
|v_input_4_hl2|0|ST Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_5|6|QQE RSI Length|
|v_input_6|5|QQE RSI Smoothing|
|v_input_7|3|QQE Fast Factor|
|v_input_8|3|QQE Thresh-hold|
|v_input_9_close|0|QQE RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|52|TIA-V2 EMA Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-21 00:00:00
end: 2023-12-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//author：盧振興 芙蓉中華中學畢業 育達科技大學畢業碩士
//參考資料 : QQE MOD By:Mihkel00 ,SuperTrend By:KivancOzbilgic , TrendIndicator A-V2 By:Dziwne

strategy("綜合交易策略", shorttitle="Comprehensive Strategy", overlay=true)

// 添加單邊或多空參數
OnlyLong = input(true, title="單邊")

// SuperTrend 参数
PeriodsST = input(9, title="ST ATR Period")
MultiplierST = input(3.9, title="ST ATR Multiplier")
srcST = input(hl2, title="ST Source")

atrST = atr(PeriodsST)
upST = srcST - (MultiplierST * atrST)
upST := close[2] > upST[1] ? max(upST, upST[1]) : upST
dnST = srcST + (MultiplierST * atrST)
dnST := close[2] < dnST[1] ? min(dnST, dnST[1]) : dnST
trendST = 1
trendST := nz(trendST[1], trendST)
trendST := trendST == -1 and close[2] > dnST[1] ? 1 : trendST == 1 and close[2] < upST[1] ? -1 : trendST

// QQE 参数
RSI_PeriodQQE = input(6, title='QQE RSI Length')
SFQQE = input(5, title='QQE RSI Smoothing')
QQE = input(3, title='QQE Fast Factor')
ThreshHoldQQE = input(3, title="QQE Thresh-hold")
srcQQE = input(close, title="QQE RSI Source")

Wilders_PeriodQQE = RSI_PeriodQQE * 2 - 1

RsiQQE = rsi(srcQQE, RSI_PeriodQQE)
RsiMaQQE = ema(RsiQQE, SFQQE)
AtrRsiQQE = abs(RsiMaQQE[1] - RsiMaQQE)
MaAtrRsiQQE = ema(AtrRsiQQE, Wilders_PeriodQQE)
darQQE = ema(MaAtrRsiQQE, Wilders_PeriodQQE) * QQE

basisQQE = sma(RsiMaQQE - 50, 50)
devQQE = 0.35 * stdev(RsiMaQQE - 50, 50)
upperQQE = basisQQE + devQQE
lowerQQE = basisQQE - devQQE

qqeCondition = RsiMaQQE[1] - 50 > upperQQE[1] ? true : RsiMaQQE[1] - 50 < lowerQQE[1] ? false : na

// Trend Indicator A-V2 参数
ma_periodA_V2 = input(52, title="TIA-V2 EMA Period")
oA_V2 = ema(open, ma_periodA_V2)
cA_V2 = ema(close, ma_periodA_V2)
trendIndicatorAV2Condition = cA_V2[1] >= oA_V2[1] ? true : false

// 综合交易逻辑
longCondition = trendST == 1 and qqeCondition and trendIndicatorAV2Condition
shortCondition = trendST == -1 and not qqeCondition and not trendIndicatorAV2Condition

// 针对多单的开平仓逻辑
if (OnlyLong)
    if (longCondition)
        strategy.entry("Buy", strategy.long)        
    else
        strategy.close("Buy")

// 多空都做时的逻辑
if (not OnlyLong)
    if (longCondition)
        strategy.entry("Buy", strategy.long)
    else if (shortCondition)
        strategy.entry("Sell",strategy.short)

    // 添加多空平仓逻辑
    if (not longCondition)
        strategy.close("Buy")
    if (not shortCondition)
        strategy.close("Sell")

// 可视化信号
plotshape(series=longCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=shortCondition and not OnlyLong, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

```

> Detail

https://www.fmz.com/strategy/436903

> Last Modified

2023-12-28 17:46:45
