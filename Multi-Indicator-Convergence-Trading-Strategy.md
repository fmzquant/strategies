
> Name

Multi-Indicator-Convergence-Trading-Strategy

> Author

ChaoZhang

> Strategy Description




The Multi-Indicator Convergence Trading Strategy combines signals from RSI, TD Sequential, MACD and Bollinger Bands to identify high probability setups during trending markets.

Strategy Logic:

1. Compute 14-period RSI. Use RSIdifference parameter as threshold for buy/sell signals. RSI below (50 - RSIdifference) gives buy signal. RSI above (50 + RSIdifference) gives sell signal.

2. Compute MACD indicator. 5 consecutive positive MACD histogram bars give buy signal. 5 consecutive negative bars give sell signal.

3. Compute TD Sequential. 2 consecutive up TD bars give buy signal. 2 consecutive down TS bars give sell signal. 

4. Compute 20-period Bollinger Bands. Price breaking above upper band suggests buy. Price breaking below lower band suggests sell.

5. Only enter trades when RSI, MACD and TD Sequential agree on direction, and Bollinger Bands do not contradict. 

6. Set profit targets and stop loss based on input parameters.

This strategy combines the strengths of multiple indicators to avoid false signals. Bollinger Bands help filter for high probability setups during trends. However, indicator parameters need thorough optimization, and signals must be relatively infrequent when all 4 indicators agree to avoid over-trading.

Overall, this multi-indicator strategy can capture high probability setups during strong trends, but requires careful parameter tuning, and conservative use of indicator signals to avoid excessive trading.



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|-7|RSI Difference|
|v_input_2|50|Profit|
|v_input_3|false|Use Stop Loss?|
|v_input_4|145|Stop Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-05 00:00:00
end: 2023-09-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("RSI, TD Seq, MACD, BB Strategy - Calculation",overlay=true)



RSIDifference = input(-7, minval=-50, maxval=50, title="RSI Difference") 


TD = close > close[4] ?nz(TD[1])+1:0
TS = close < close[4] ?nz(TS[1])+1:0
TDUp = TD - valuewhen(TD < TD[1], TD , 1 )
TDDn = TS - valuewhen(TS < TS[1], TS , 1 )
TDcheckUP = iff(TD == 2, true, false)
TDCheckDOWN = iff(TS == 2, true, false)

[_, _, histLine] = macd(close, 12, 26, 9)
MACDCheckDown = iff(histLine > 0 and histLine[1] > 0 and histLine[2] > 0 and histLine[3] > 0  and histLine[4] > 0, true, false)
MACDCheckUp = iff(histLine < 0 and histLine[1] < 0 and histLine[2] < 0 and histLine[3] < 0 and histLine[4] < 0, true, false)

RSICal = rsi(close, 14)
RSICalNewUp = 50 + RSIDifference
RSICalNewDown = 50 - RSIDifference
RSICheckUp = iff(RSICal <= RSICalNewUp, true, false)
RSICheckDown = iff(RSICal >= RSICalNewDown, true, false)

basis = sma(close, 20)
dev = 2 * stdev(close, 20)
upperBB = basis + dev
lowerBB = basis - dev
BBCheckUp = iff(close > upperBB, true, false)
BBCheckDown = iff(close < lowerBB, true, false)
//BBCheckUp = false
//BBCheckDown = false


BuyCheck = iff(TDcheckUP == true and MACDCheckUp == true and RSICheckUp == true and BBCheckUp == false, true, false)
SellCheck = iff(TDCheckDOWN == true and MACDCheckDown == true and RSICheckDown == true and BBCheckDown == false, true, false)


ProfitStratA = input(50, minval=0, maxval=10000, title="Profit", step=0.5) 
useStopLoss = input(false, title="Use Stop Loss?")
LossstratA = input(145, minval=0, maxval=10000, title="Stop Loss", step=0.5) 

ProfitStrat = ProfitStratA * 10
Lossstrat = useStopLoss ? LossstratA * 10 : 1000000

if (strategy.position_size > 0)
    strategy.exit("BuyClose", "Buy", profit=ProfitStrat, loss=Lossstrat)
    
    
if (strategy.position_size < 0)   
    strategy.exit("SellClose", "Sell", profit=ProfitStrat, loss=Lossstrat) 
    

if (BuyCheck == true and strategy.position_size == 0)
    strategy.entry("Buy", strategy.long, comment="Long Entry")
    


if (SellCheck == true and strategy.position_size == 0)
    strategy.entry("Sell", strategy.short, comment="Short Entry")
    
    
 
    

//plotshape(BuyCheck, color=blue, transp=0, style=shape.arrowup, text="Buy\n", location=location.belowbar)
//plotshape(SellCheck, color=orange, transp=0, style=shape.arrowdown, text="Sell\n", location=location.abovebar)












```

> Detail

https://www.fmz.com/strategy/426477

> Last Modified

2023-09-12 14:27:41
