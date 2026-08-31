
> Name

基于布林带和VWAP的量化交易策略Bollinger-Bands-and-VWAP-based-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a23bc1ac0163a4493f.png)

## Overview  

This strategy combines Bollinger Bands (BB) and Volume Weighted Average Price (VWAP) indicators to make entry and exit decisions. It can discover short-term price anomalies for trading and is suitable for short-term trading.

## Strategy Logic  

The strategy is mainly based on the following rules for entry and exit:  

1. Fast EMA line above slow EMA line as prerequisite for judging trend  
2. Buy when close price above VWAP indicating upward price  
3. Enter long if close price dipped below BB lower band in last 10 bars indicating price anomaly

1. Sell when close price goes above BB upper band indicating price reversal  

Specifically, it first judges if 50-day EMA is above 200-day EMA to determine the overall trend. Then combined with VWAP to judge if price is in a short-term uptrend. Finally using Bollinger Bands to detect short-term anomaly drop as entry opportunity.  

The exit rule is simple, exit when price goes above BB upper band indicating price reversal.  

## Advantages Analysis   

The strategy combines multiple indicators to increase validity of entry signals. Using EMAs to judge overall trend avoids trading against trend. VWAP captures short-term upward momentum. BB detects short-term anomalies as timing for entries.  

## Risk Analysis  

1. Inaccurate EMA trend judgment causing trading against trend 
2. VWAP more suitable for hourly or intraday data, less efficient in daily data
3. Improper BB parameter setting, too wide or narrow bands missing signals  

To mitigate the risks, parameters of EMA and BB can be adjusted. Test different indicators for trend detection. Use VWAP in lower timeframe. Optimize BB parameter for best bandwidth.  

## Enhancement Opportunities

1. Test other indicators for trend detection like MACD 
2. Optimize EMA and BB parameters  
3. Add stop loss mechanism
4. Add filters to avoid false signals
5. Backtest on various products and timeframes

## Conclusion  

The strategy combines BB and VWAP to detect short-term price anomalies as entry timing. Using EMAs to determine overall trend avoids trading against trend. It can quickly discover short-term momentum. Suitable for intraday and short-term trading. Further enhance stability and profitability by optimizing parameters and incorporating more logic.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|fast EMA|
|v_input_2|200|slow EMA|
|v_input_3|20|BB SMA Length|
|v_input_4_close|0|BB Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|5|Stop Loss%|
|v_input_6|2|StdDev|
|v_input_7|false|Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-04 00:00:00
end: 2024-01-03 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mohanee

//@version=4
strategy(title="VWAP and BB strategy [EEMANI]", overlay=true,pyramiding=2, default_qty_value=3, default_qty_type=strategy.fixed,    initial_capital=10000, currency=currency.USD)
//This strategy combines VWAP and BB indicators
//BUY RULE
//1. EMA50 > EMA 200
//2. if current close > vwap session  value 
//3. check if  price dipped BB lower band for any of last 10 candles
//EXIT RULE
//1. price closes above BB upper band   
//STOP LOSS EXIT
//1. As configured --- default is set to 5%

is_price_dipped_bb(pds,source1) =>
    t_bbDipped=false
    for i=1 to pds
        t_bbDipped:=  (t_bbDipped   or  close[i]<source1) ? true : false
        if t_bbDipped==true
            break
        else
            continue
            
    t_bbDipped
    
// variables  BEGIN
shortEMA = input(50, title="fast EMA", minval=1)
longEMA = input(200, title="slow EMA", minval=1)

//BB

smaLength = input(20, title="BB SMA Length", minval=1)
bbsrc = input(close, title="BB Source")



//addOnDivergence = input(true,title="Add to existing on Divergence")
//exitOption = input(title="exit on RSI or BB", type=input.string, options=["RSI", "BB"],      defval="BB")

//bbSource = input(title="BB  source", type=input.string, options=["close", "vwap"],      defval="close")
     
//vwap_res = input(title="VWAP Resolution", type=input.resolution, defval="session")
stopLoss = input(title="Stop Loss%", defval=5, minval=1)

//variables  END




longEMAval= ema(close, longEMA)
shortEMAval= ema(close, shortEMA)


vwapVal=vwap(close)



// Drawings

//plot emas
plot(longEMAval, color = color.orange, linewidth = 1, transp=0)
plot(shortEMAval, color = color.green, linewidth = 1, transp=0)


//bollinger calculation 
mult = input(2.0, minval=0.001, maxval=50, title="StdDev")
basis = sma(bbsrc, smaLength)
dev = mult * stdev(bbsrc, smaLength)
upperBand = basis + dev
lowerBand = basis - dev
offset = input(0, "Offset", type = input.integer, minval = -500, maxval = 500)
//bollinger calculation 

//plot bb
//plot(basis, "Basis", color=#872323, offset = offset)
p1 = plot(upperBand, "Upper", color=color.teal, offset = offset)
p2 = plot(lowerBand, "Lower", color=color.teal, offset = offset)
fill(p1, p2, title = "Background", color=#198787, transp=95)


plot(vwapVal, color = color.purple, linewidth = 1, transp=0)


// Colour background

barcolor(shortEMAval>longEMAval and close<=lowerBand ? color.yellow: na)
  

//longCondition=  shortEMAval > longEMAval and  close>open and  close>vwapVal
longCondition= shortEMAval >= longEMAval  and  close>=vwapVal and close>open  //      close>vwapVal   and   



//Entry
strategy.entry(id="VWAP_BB LE", comment="VB LE" , long=true,  when= longCondition and  is_price_dipped_bb(10,lowerBand) )  //and strategy.position_size<1 

//add to the existing position
//strategy.entry(id="VWAP_RSI LE", comment="VR LE Add" , long=true,  when= addOnDivergence==true and strategy.position_size>=1 and close<strategy.position_avg_price   and (close<lowerBand or  low<lowerBand) and rsiVal>rsi_buy_line)

barcolor(strategy.position_size>=1  ? color.blue: na)



strategy.close(id="VWAP_BB LE", comment="TP Exit VB LE",   when=crossover(close,upperBand) )

//stoploss
stopLossVal =   strategy.position_avg_price * (1-(stopLoss*0.01) )
strategy.close(id="VB LE", comment="SL Exit",   when= close < stopLossVal)


```

> Detail

https://www.fmz.com/strategy/437661

> Last Modified

2024-01-04 15:59:46
