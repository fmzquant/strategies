
> Name

Uptrend-and-Oversold-Index-Swing-Trading-System-strategy

> Author

ChaoZhang

> Strategy Description


Riding Trends and Mean Reversion with the I11L Hypertrend 

The I11L Hypertrend strategy utilizes a momentum scoring system across multiple timeframes to identify oversold levels to buy and uptrends to trade. It aims to profit from short-term countertrend bounces and momentum breakouts.

How the Strategy Works

The key components include:

- Scoring system comparing EMAs/SMAs across 20 periods 
- High score indicates uptrend, low score oversold conditions
- Crossovers of scores used as entry/exit signals
- Trailing stop loss to protect open profits
- Fixed take profit target based on entry price

Longs are entered on oversold reversals when the scores crossover. Shorts are taken when the scores crossover in uptrends. 

A trailing stop locks in profits while the take profit exits at a defined risk/reward multiple.

Benefits of the I11L System

The main advantages of this approach:

- Combines mean reversion and trend following
- Scoring adapts to changing market conditions
- Multiple timeframes identify turning points
- Trailing stop automates trade management
- Compounding boosts returns in strong trends

The dynamic scoring system provides valuable insights for trading both reversals and breakouts.

Potential Weaknesses and Risks

However, some limitations exist:

- Overoptimization likely on past data
- Lagging scores and late signal entries 
- Multiple parameters to configure
- Prone to whipsaws in choppy periods
- No trade filtering for high probability

Past performance metrics can be misleading if not walk-forward tested. Cautious optimization and risk management is required.

Key Tuning Parameters

Some key inputs that can be optimized:

- Number of EMAs/SMAs in scoring system
- Length of averaging periods
- Oversold/uptrend crossover thresholds
- Stop loss distance from price
- Take profit risk/reward multiple

Robust strategies balance performance across bull, bear and range-bound markets. Rigorous walk-forward testing prevents curve fitting.

In Summary

The I11L Hypertrend provides a systematic process for trading oversold bounces and riding upside breakouts. With proper configuration and risk management, this momentum approach can provide an edge over the long-run.



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|Oversold or Trend|Trading Mode|
|v_input_bool_1|false|Work with the total equity|
|v_input_bool_2|true|Use a trailing SL|
|v_input_bool_3|true|Use a TP|
|v_input_int_1|20|Lookbackdistance for the Score|
|v_input_float_1|true|Leverage (x)|
|v_input_float_2|3|Risk Capital per Trade unleveraged (%)|
|v_input_float_3|1.2|TPFactor|
|v_input_string_2|0|Select Date: All available Records|2012-Now|Start-2012|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-04-15 00:00:00
period: 8h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// strategy("I11L Hypertrend",overlay=false, initial_capital=1000000,default_qty_value=1000000,default_qty_type=strategy.cash,commission_type=strategy.commission.percent,commission_value=0.00)
strategy.initial_capital=50000
tradingMode = input.string("Oversold or Trend", "Trading Mode", ["Oversold or Trend", "Always Buy"], tooltip="Choose the Trading Mode by trying Both in your Backtesting. I use it if one is far better then the other one.")
 
invertStrategy = tradingMode == "Trend" ? true : false
compoundingMode = input.bool(false,"Work with the total equity")
useTSL = input.bool(true,"Use a trailing SL")
useTP = input.bool(true,"Use a TP")
scoreLookbackDistance = input.int(20, step=1,title="Lookbackdistance for the Score")
scoreLoopCountTo = 20
leverage = input.float(1.0,"Leverage (x)",[20,10,5,2,1])
SL_Factor = 1 - input.float(3.0,"Risk Capital per Trade unleveraged (%)", minval=0.1, maxval=100, step=0.25) / 100 / leverage
TPFactor = input.float(1.2, step=0.1)

chooseDate = input.string(title="Select Date", defval="All available Records", options=["Start-2012","2012-Now","All available Records"],tooltip="Seperation works best for 8hr cfd markets, you might want to finetune your Settings in the past and see if the future results (2010 to now) are better then random")
dateFrom = chooseDate == "Start-2012" ? timestamp("01 Jan 1970 00:00") : chooseDate == "2012-Now" ? timestamp("01 Jan 2012 00:00") : timestamp("01 Jan 1970 00:00")
dateTo = chooseDate == "Start-2012" ? timestamp("31 Dec 2011 23:59") : chooseDate == "2012-Now" ? timestamp("31 Dec 2170 23:59") : timestamp("31 Dec 2170 23:59")
inDateRange = (time >= dateFrom) and (time < dateTo)

var disableAdditionalBuysThisDay = false
var minuteOfLastSell = 0


if(dayofmonth != dayofmonth[1])
    disableAdditionalBuysThisDay := false


longStopPrice = 0.0
longStopPrice := if (strategy.position_size > 0)
    if(useTSL)
        math.max(high * SL_Factor, longStopPrice[1])
    else
        strategy.position_avg_price*SL_Factor
else
    0

if(strategy.position_size != strategy.position_size[1])
    disableAdditionalBuysThisDay := true

//Trade Logic
//isOversold
SCORE = 0
loopCount = 1
for i=0 to scoreLoopCountTo
    trendLengthAdjusted = loopCount
    loopCount := loopCount + 1 
    if(ta.ema(close,trendLengthAdjusted) / ta.sma(close,trendLengthAdjusted) > 1)
        SCORE := SCORE + 1
 
SCORE_ema50 = ta.ema(SCORE,scoreLookbackDistance)
SCORE_sma50 = ta.sma(SCORE,scoreLookbackDistance)
isOversold = ta.crossover(SCORE_sma50 / SCORE_ema50,1.0)
isTrend = ta.crossover(SCORE_ema50 / SCORE_sma50,1.0)


isBuy = isTrend or isOversold or tradingMode == "Always Buy"


if(isBuy and not(disableAdditionalBuysThisDay) and inDateRange)
    if(compoundingMode)
        strategy.entry("Buy", strategy.long, (strategy.equity / close) * leverage)
    else
        strategy.entry("Buy", strategy.long, (strategy.initial_capital / close) * leverage)


if(strategy.position_size > 0)
    strategy.exit("TSL", "Buy", stop=longStopPrice)
    if(useTP) 
        strategy.close("Buy",  when=close > strategy.position_avg_price * (1 + (1 - SL_Factor) * TPFactor), comment="TP")


findTrendOrOversold(i) => ta.ema(close,i) / ta.sma(close,i)

plot(1 + 100 * (findTrendOrOversold(1) - 1),color = findTrendOrOversold(1) > 1 ? #6efa7b44 : #ff222244)
plot(1 + 100 * (findTrendOrOversold(2) - 1),color = findTrendOrOversold(2) > 1 ? #73fa7a44 : #ff302244)
plot(1 + 100 * (findTrendOrOversold(3) - 1),color = findTrendOrOversold(3) > 1 ? #78fb7944 : #ff3a2244)
plot(1 + 100 * (findTrendOrOversold(4) - 1),color = findTrendOrOversold(4) > 1 ? #7cfb7844 : #ff432244)
plot(1 + 100 * (findTrendOrOversold(5) - 1),color = findTrendOrOversold(5) > 1 ? #81fb7744 : #ff4b2244)
plot(1 + 100 * (findTrendOrOversold(6) - 1),color = findTrendOrOversold(6) > 1 ? #85fc7644 : #ff522344)
plot(1 + 100 * (findTrendOrOversold(7) - 1),color = findTrendOrOversold(7) > 1 ? #89fc7644 : #fe592444)
plot(1 + 100 * (findTrendOrOversold(8) - 1),color = findTrendOrOversold(8) > 1 ? #8dfc7544 : #fe602544)
plot(1 + 100 * (findTrendOrOversold(9) - 1),color = findTrendOrOversold(9) > 1 ? #91fc7444 : #fe662744)
plot(1 + 100 * (findTrendOrOversold(10) - 1),color = findTrendOrOversold(10) > 1 ? #95fd7344 : #fe6b2944)
plot(1 + 100 * (findTrendOrOversold(11) - 1),color = findTrendOrOversold(11) > 1 ? #99fd7344 : #fd712b44)
plot(1 + 100 * (findTrendOrOversold(12) - 1),color = findTrendOrOversold(12) > 1 ? #9dfd7244 : #fd762d44)
plot(1 + 100 * (findTrendOrOversold(13) - 1),color = findTrendOrOversold(13) > 1 ? #a1fd7144 : #fd7b3044)
plot(1 + 100 * (findTrendOrOversold(14) - 1),color = findTrendOrOversold(14) > 1 ? #a4fe7144 : #fd803244)
plot(1 + 100 * (findTrendOrOversold(15) - 1),color = findTrendOrOversold(15) > 1 ? #a8fe7044 : #fc853544)
plot(1 + 100 * (findTrendOrOversold(16) - 1),color = findTrendOrOversold(16) > 1 ? #abfe7044 : #fc8a3944)
plot(1 + 100 * (findTrendOrOversold(17) - 1),color = findTrendOrOversold(17) > 1 ? #affe6f44 : #fc8f3c44)
plot(1 + 100 * (findTrendOrOversold(18) - 1),color = findTrendOrOversold(18) > 1 ? #b2ff6f44 : #fc933f44)
plot(1 + 100 * (findTrendOrOversold(19) - 1),color = findTrendOrOversold(19) > 1 ? #b6ff6e44 : #fb984344)
plot(1 + 100 * (findTrendOrOversold(20) - 1),color = findTrendOrOversold(20) > 1 ? #b9ff6e44 : #fb9c4744) 

plot(invertStrategy ? SCORE_ema50 / SCORE_sma50 : SCORE_sma50 / SCORE_ema50, color=(invertStrategy and isTrend) or (not(invertStrategy) and isOversold) ? color.green : color.gray, linewidth=2)
plot(1,color=color.white)
```

> Detail

https://www.fmz.com/strategy/426334

> Last Modified

2023-12-01 15:01:34
