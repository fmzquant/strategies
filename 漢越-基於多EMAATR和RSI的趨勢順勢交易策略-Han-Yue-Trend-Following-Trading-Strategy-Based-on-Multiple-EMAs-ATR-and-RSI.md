
> Name

漢越-基於多EMAATR和RSI的趨勢順勢交易策略-Han-Yue-Trend-Following-Trading-Strategy-Based-on-Multiple-EMAs-ATR-and-RSI

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1189c0b4fb311094554.png)


#### Overview
This strategy uses three exponential moving averages (EMAs) with different periods to determine the market trend, and combines the Relative Strength Index (RSI) and Average True Range (ATR) to identify entry points, stop-losses, and take-profit levels. When the price breaks through the channel formed by the three EMAs and the RSI also breaks through its moving average, the strategy triggers an entry signal. ATR is used to control position sizing and set stop-loss levels, while the risk-reward ratio (RR) is used to determine take-profit levels. The main advantage of this strategy lies in its simplicity and effectiveness, as it can follow market trends and limit potential losses through strict risk management measures.

#### Strategy Principles
1. Calculate three EMAs with different periods (short-term, medium-term, and long-term) to determine the overall market trend.
2. Use the RSI indicator to confirm the strength and sustainability of the trend. When the RSI breaks through its moving average, it indicates a change in the trend.
3. Generate entry signals based on the relationship between price and the EMA channel, as well as RSI signals: open a position in the direction of the trend when the price breaks through the EMA channel and the RSI also breaks through its moving average.
4. Use ATR to determine position sizing and stop-loss levels, controlling the risk exposure of each trade.
5. Set take-profit levels based on a predefined risk-reward ratio (e.g., 1.5:1) to ensure the strategy's profitability.

#### Advantage Analysis
1. Simple and effective: The strategy only uses a few common technical indicators, with clear logic and easy to understand and implement.
2. Trend following: By combining the EMA channel and RSI, the strategy can follow market trends and capture larger price movements.
3. Risk control: Using ATR to set stop-loss levels and control position sizing effectively limits the risk exposure of each trade.
4. Flexibility: Strategy parameters (such as EMA periods, RSI periods, ATR multipliers, etc.) can be adjusted according to different markets and trading styles to optimize performance.

#### Risk Analysis
1. Parameter optimization: The performance of the strategy largely depends on the choice of parameters, and improper parameter settings may lead to strategy failure or poor performance.
2. Market risk: The strategy may suffer significant losses under unexpected events or extreme market conditions, especially during trend reversals or volatile markets.
3. Overfitting: If the strategy is overfitted to historical data during the parameter optimization process, it may lead to poor performance in actual trading.

#### Optimization Directions
1. Dynamic parameters: Dynamically adjust strategy parameters according to changes in market conditions, such as using longer EMA periods when the trend is strong and shorter periods in choppy markets.
2. Combine other indicators: Introduce other technical indicators (such as Bollinger Bands, MACD, etc.) to improve the reliability and accuracy of entry signals.
3. Incorporate market sentiment: Combine market sentiment indicators (such as the Fear & Greed Index) to adjust the strategy's risk exposure and position management.
4. Multi-timeframe analysis: Analyze market trends and signals across different timeframes to gain a more comprehensive market perspective and make more robust trading decisions.

#### Summary
This strategy constructs a simple and effective trend-following trading system by combining multiple common technical indicators, such as EMAs, RSI, and ATR. It uses the EMA channel to determine market trends, RSI to confirm trend strength, and ATR to control risk. The strategy's advantages lie in its simplicity and adaptability, as it can follow trends and trade under different market conditions. However, the strategy's performance largely depends on the choice of parameters, and improper parameter settings may lead to strategy failure or poor performance. In addition, the strategy may face significant risks during unexpected events or extreme market conditions. To further optimize the strategy, one can consider introducing dynamic parameter adjustments, combining other indicators, incorporating market sentiment analysis, and conducting multi-timeframe analysis. Overall, this strategy provides a good foundation for trend-following trading but still needs to be adjusted and optimized according to actual market conditions.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-01 00:00:00
end: 2024-04-30 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © hatnxkld

//@version=4
strategy("Win ha", overlay=true)

ss2 = input("0300-1700", title = "Khung thời gian")

t2 = time(timeframe.period,ss2)
c2 = #cacae6

bgcolor(t2 ? c2 : na, transp = 70)


//3ema
emangan=input(title="Ema ngắn", defval = 12)
ngan=ema(close, emangan)
a= plot(ngan, title="EMA ngắn", color=color.yellow)
ematb=input(title="Ema trung bình", defval = 100)
tb=ema(close, ematb)
b= plot(tb, title="EMA trung bình", color=color.blue)
//emadai=input(title="Ema dai", defval = 288)
//dai=ema(close,emadai)
//c= plot(dai, title="EMA dai", color=color.red)




// nhập hệ số nhân ATR
i=input(title="Hệ số nhân với ATR", defval=1.25)

// RSI
rsi=rsi(close, emangan)
marsi=sma(rsi, emangan)

// Kênh keltler
//heso=input(defval=1, title="Hệ số Kênh Keltler")
//atr=atr(emangan)
//tren=ngan+atr*heso
//d=plot(tren, title="Kênh trên", color=color.white)
//duoi=ngan-atr*heso
//e=plot(duoi, title="Kênh dưới", color=color.white)
//fill(d,e, color=color.rgb(48, 58, 53))

ban = ( close[1]>open[1] and (high[1]-close[1])>(close[1]-low[1]) and open>close and close<low[1]   ) 


//or (    open[1] > close[1] and (high[1]-open[1])>(open[1]-low[1]) and (open[1]-close[1])>(close[1]-low[1]) and open>close and close <low[1]     )   )  //and time(timeframe.period,"2200-1300")
//and (close[1]-open[1])>(open[1]-low[1]) 
//high > ngan and close < ngan and ngan<tb and 
// and time(timeframe.period,"1000-2300")
bgcolor(color = ban ? color.rgb(235, 106, 123) : na)
//bgcolor(color.rgb(82, 255, 154),transp = 100, offset = 1, show_last = 2)
//and time(timeframe.period,"2300-1500") and ((open>ngan and close<ngan) or (open>tren and close<tren))
plotshape(ban , style=shape.arrowdown, location=location.abovebar, color=#ff00ff, size=size.tiny, textcolor=color.rgb(255, 59, 213))
alertcondition(ban, "Ban", "Ban")

mua=  (  open[1]>close[1] and (close[1]-low[1])>(high[1]-close[1]) and close > open and close > high[1]  )  //and time(timeframe.period,"2200-1300")


//or  (  close[1]>open[1] and (open[1]-low[1]) > (high[1]-open[1]) and (close[1]-open[1])>(high[1]-close[1]) and close>open and close>high[1]      ) )
//and (open[1]-close[1])>(high[1]-open[1])
//low < ngan and close > ngan and ngan>tb and
//or  (  close[1]>open[1] and (open[1]-low[1]) > (high[1]-open[1]) and (close[1]-open[1])>(high[1]-close[1]) and close>open and close>high[1]      )

// and time(timeframe.period,"1000-2300")
bgcolor(color= mua? color.rgb(108, 231, 139):na)
//and time(timeframe.period,"2300-1500") and ((open<ngan and close>ngan)or (open<duoi and close>duoi) )
plotshape(mua , style=shape.arrowup, location=location.belowbar, color=#00ff6a, size=size.tiny, textcolor=color.rgb(83, 253, 60))
alertcondition(mua , "Mua", "Mua")


//len1 = ban==true and (high-low)>2*atr
//plotshape(len1 , style=shape.flag, location=location.abovebar, color=#ff00ff, size=size.tiny, title="Sell Signal", text="Xuong 1", textcolor=color.rgb(255, 59, 213))

//bann= ban==true and rsi < marsi and marsi[2]>marsi[1]
//plotshape(bann , style=shape.labeldown, location=location.abovebar, color=#ff00ff, size=size.tiny, title="Sell Signal", text="BAN 2", textcolor=color.rgb(240, 234, 239))

//bannn = mua==true and rsi>marsi and marsi[2]<marsi[1]
//plotshape(bannn , style=shape.labelup, location=location.belowbar, color=#00ff6a, size=size.tiny, title="Buy Signal", text="Mua 2", textcolor=color.rgb(237, 241, 236))

//a1= ban==true and (high - low)<atr 
//plotshape(a1 , style=shape.xcross, location=location.bottom, color=#00ff6a, size=size.tiny, title="Sell", text="<atr", textcolor=color.rgb(240, 95, 76))

//a2 = ban ==true and (high - low)>atr and (high - low)<(2*atr) 
//plotshape(a2 , style=shape.xcross, location=location.bottom, color=#00ff6a, size=size.tiny, title="Sell", text="<2atr", textcolor=color.rgb(237, 241, 236))

//a3= ban==true and (high - low)>(2*atr) 
//plotshape(a3 , style=shape.xcross, location=location.bottom, color=#00ff6a, size=size.tiny, title="Sell", text=">2atr", textcolor=color.rgb(234, 252, 74))


//b1= mua==true and (high - low)<atr 
//plotshape(b1 , style=shape.xcross, location=location.bottom, color=#00ff6a, size=size.tiny, title="Buy", text="<atr", textcolor=color.rgb(237, 241, 236))

//b2 = mua ==true and (high - low)>atr and (high - low)<(2*atr) 
//plotshape(b2 , style=shape.xcross, location=location.bottom, color=#00ff6a, size=size.tiny, title="Buy", text="<2atr", textcolor=color.rgb(237, 241, 236))

//b3= mua==true and (high - low)>(2*atr) 
//plotshape(b3 , style=shape.xcross, location=location.bottom, color=#00ff6a, size=size.tiny, title="Buy", text=">2atr", textcolor=color.rgb(237, 241, 236))

// Đặt SL TP ENTRY
risk= input(title="Rủi ro % per Trade", defval=0.5)
rr= input(title="RR", defval=1.5)
onlylong= input(defval=false)
onlyshort=input(defval=false)

stlong = mua and strategy.position_size<=0 ? low[1]:na
stoplong= fixnan(stlong)

stshort = ban and strategy.position_size>=0 ? high[1]:na
stopshort= fixnan(stshort)

enlong = mua and strategy.position_size<=0 ? close:na
entrylong =fixnan(enlong)

enshort = ban and strategy.position_size>=0 ? close:na
entryshort = fixnan(enshort)

amountL = risk/100* strategy.initial_capital / (entrylong - stoplong)
amountS = risk/100* strategy.initial_capital / (stopshort - entryshort)

TPlong= mua and strategy.position_size<=0? entrylong + (entrylong -stoplong)*rr:na
takeprofitlong =fixnan(TPlong)
TPshort = ban and strategy.position_size>=0? entryshort - (stopshort - entryshort)*rr:na 
takeprofitshort = fixnan(TPshort)

strategy.entry("Long", strategy.long , when = enlong and not onlyshort, qty= amountL )
strategy.exit("exitL", "Long", stop = stoplong, limit= takeprofitlong)

strategy.entry("Short", strategy.short , when = enshort and not onlylong, qty= amountS )
strategy.exit("exitS", "Short", stop = stopshort, limit= takeprofitshort)


```

> Detail

https://www.fmz.com/strategy/451401

> Last Modified

2024-05-14 16:37:52
