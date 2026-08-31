
> Name

结合MACDRSI和FIB的量化比特币交易策略Quant-Bitcoin-Trading-Strategy-Combining-MACD-RSI-and-FIB

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d9f5b1bb9b136151bc.png)

### Overview  

The strategy is named "Golden Cross Fibonacci Strategy". It combines the technical indicator MACD, relative strength index RSI and fibonacci retracement/extension theory based on golden ratio, realizing quantitative trading for bitcoin and other cryptocurrencies.  

### Strategy Principle   

1. MACD Indicator for Trading Signals   

  - Set EMA periods of MACD fast line and slow line to 15 and 30
  - Crossing up as buying signal and crossing down as selling one
  
2. RSI Filtering False Signals  

  - Set RSI parameter to 50 period
  - RSI helps filter some false signals MACD gives

3. Fibonacci Theory for SUPPORT/RESISTANCE
 
  - Combine recent highest/lowest price over 38 candles 
  - Calculate 0.5 fibonacci retracement/extension level
  - Can be used as support and resistance

4. MA and RSI Judging Oversold/Overbought
 
  - 50-period MA judges oversold/overbought status 
  - RSI also helps judging 

5. Reverse Opening Mechanism 
   
  - Provide option for users to open reverse order
  - Flexibly adjust long/short logic according to users' choice
  

### Advantage Analysis  

The biggest advantage is operating 24x7 without manual intervention. Besides, the combination of multiple indicators increases the winning rate, especially outstanding performance in bull market. Main advantages include:  

1. Fully automated 24x7 quant trading without manual intervention   
2. Accurate trading signals from MACD
3. RSI filters some false signals  
4. Fibonacci theory adds more reference   
5. Judging oversold/overbought status
6. Flexibly adjust strategies through reverse opening  

### Risk Analysis

There also exist some risks, mainly from huge reverse of price that is hard for stop loss to take effect. Also, overlong holding period induces risk. Main risks contain:  

1. Stop loss too tight to protect from huge reverse
2. Systematic risk from overlong holding period  

Solutions accordingly are:

1. Set looser stop loss distance  
2. Optimize holding period against overlong risk

### Optimization Directions  

Main aspects for optimization:
  
1. Optimize MACD parameters for higher accuracy  
2. Optimize RSI parameter for better utility
3. Test more periods of Fibonacci theory  
4. Add more filter indicators to further decrease false signals  
5. Combine indicators of larger periods for market trend

### Summary   

The strategy combines multiple quant indicators for trade signals and realizes full automatic crypto trading. Further improving profit by optimizing parameters and adding more assistant indicators. It significantly reduces manual operation costs for users. Worth deep research and application for quant traders.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|BINANCE:BTCUSDT|Symbol|
|v_input_2|2.5|Long Stop Loss (%)|
|v_input_3|2.5|Short Stop Loss (%)|
|v_input_4|7.6|Long Take Profit (%)|
|v_input_5|7.5|Short Take Profit (%)|
|v_input_6|90|Capital Percentage to Invest (%)|
|v_input_7|false|Reverse ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-18 00:00:00
end: 2023-12-25 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © onurenginogutcu

//@version=4
strategy("STRATEGY R18-F-BTC", overlay=true, margin_long=100, margin_short=100)

///////////default girişler 1 saatlik btc grafiği için geçerli olmak üzere - stop loss'lar %2.5 - long'da %7.6 , short'ta %8.1

sym = input(title="Symbol", type=input.symbol, defval="BINANCE:BTCUSDT") /////////btc'yi indikatör olarak alıyoruz

lsl = input(title="Long Stop Loss (%)",
     minval=0.0, step=0.1, defval=2.5) * 0.01
     
ssl = input(title="Short Stop Loss (%)",
     minval=0.0, step=0.1, defval=2.5) * 0.01
     
longtp = input(title="Long Take Profit (%)",
     minval=0.0, step=0.1, defval=7.6) * 0.01
     
shorttp = input(title="Short Take Profit (%)",
     minval=0.0, step=0.1, defval=7.5) * 0.01
     
capperc = input(title="Capital Percentage to Invest (%)",
     minval=0.0, maxval=100, step=0.1, defval=90) * 0.01
     
choice = input(title="Reverse ?", type=input.bool, defval=false)

symClose = security(sym, "", close)
symHigh = security(sym, "", high)
symLow = security(sym, "", low)

i = ema (symClose , 15) - ema (symClose , 30) ///////// ema close 15 ve 30 inanılmaz iyi sonuç verdi (macd standartı 12 26)
r = ema (i , 9)

sapust = highest (i , 100) * 0.729 //////////0.729 altın oran oldu 09.01.2022
sapalt = lowest (i , 100) * 0.729  //////////0.729 altın oran oldu 09.01.2022

///////////highx = highest (close , 365) * 0.72 fibo belki dahiledilebilir
///////////lowx = lowest (close , 365) * 1.272 fibo belki dahil edilebilir
simRSI = rsi (symClose , 50 ) /////// RSI DAHİL EDİLDİ "50 MUMLUK RSI EN İYİ SONUCU VERİYOR"


//////////////fibonacci seviyesi eklenmesi amacı ile koyuldu fakat en iyi sonuç %50 seviyesinin altı ve üstü (low ve high 38 barlık) en iyi sonuç verdi
fibvar = 38
fibtop = lowest (symLow , fibvar) + ((highest (symHigh , fibvar) - lowest (symLow , fibvar)) * 0.50)
fibbottom = lowest (symLow , fibvar) + ((highest (symHigh , fibvar) - lowest (symLow , fibvar)) * 0.50)

///////////////////////////////////////////////////////////// INDICATOR CONDITIONS

longCondition = crossover(i, r) and i < sapalt and symClose < sma (symClose , 50) and simRSI < sma (simRSI , 50) and symClose < fibbottom
shortCondition = crossunder(i, r) and i > sapust and symClose > sma (symClose , 50) and simRSI > sma (simRSI , 50)  and symClose > fibtop

////////////////////////////////////////////////////////////////

///////////////////////////////////////////STRATEGY ENTRIES AND STOP LOSSES /////stratejilerde kalan capital için strategy.equity kullan (bunun üzerinden işlem yap)


if (choice == false and longCondition)
    strategy.entry("Long", strategy.long , qty = capperc * strategy.equity / close ,   when = strategy.position_size == 0)
   

if (choice == false and shortCondition)
    strategy.entry("Short" , strategy.short , qty = capperc * strategy.equity / close ,  when = strategy.position_size == 0)

if (choice == true and longCondition)
    strategy.entry("Short" , strategy.short , qty = capperc * strategy.equity / close ,  when = strategy.position_size == 0)

if (choice == true and shortCondition)
    strategy.entry("Long", strategy.long , qty = capperc * strategy.equity / close ,   when = strategy.position_size == 0)
    

if (strategy.position_size > 0)
    strategy.exit("Exit Long", "Long", stop=strategy.position_avg_price*(1 - lsl) , limit=strategy.position_avg_price*(1 + longtp))

if (strategy.position_size < 0)
    strategy.exit("Exit Short", "Short", stop=strategy.position_avg_price*(1 + ssl) , limit=strategy.position_avg_price*(1 - shorttp))


////////////////////////vertical colouring signals
bgcolor(color=longCondition ? color.new (color.green , 70) : na)
bgcolor(color=shortCondition ? color.new (color.red , 70) : na)



```

> Detail

https://www.fmz.com/strategy/436659

> Last Modified

2023-12-26 17:08:03
