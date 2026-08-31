
> Name

双EMA与RSI组合策略Dual-EMA-and-RSI-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10c4f81155d54f49795.png)


## Overview

This strategy is named "Dual EMA and RSI Combination Strategy". It combines the advantages of dual EMA indicators and RSI indicators to form a more complete basis for trading decisions. The strategy uses dual EMA to judge price trends and trend break signals, while complementing the RSI indicator to judge overbought and oversold conditions, in order to implement low buying and high selling to obtain price spreads.

## Strategy Principle  

The strategy first uses the dual EMA indicator to judge the overall price trend. The EMA indicator can reflect the trend of prices relatively well. The dual EMA indicator combined can judge the upward and downward trends of prices. The strategy sets the fast line EMA cycle to 34 to determine the short-term trend and entry; set the slow line EMA cycle longer to determine the long-term trend. When the price stands on the fast line EMA, it is time to buy, and when it stands on the slow line EMA, it is time to sell. By combining EMAs of different cycles, it judges the short-term and long-term trends of prices to achieve low sucking and high throwing.

At the same time, the strategy also introduces the RSI indicator to judge overbought and oversold conditions. RSI judges whether the market has entered an overbought or oversold state through the rise and fall changes of prices. Buying RSI at low positions and selling at high positions, mutually verifying with EMA indicators, can reduce false signals and increase profit probability.

## Advantages of the Strategy  

1. EMA indicators determine the main trend, and RSI indicators determine overbought and oversold conditions. The combination of the two verifies each other and can reduce false signals.  
2. The short-period EMA determines the specific entry, and the long-period EMA determines the major trend, which effectively controls profits and losses.
3. No need to predict, just follow the trend, simple and efficient.  
4. Applicable to various cycles and market environments.

## Risks and Countermeasures   

1. When the market experiences violent fluctuations, EMAs and RSIs are more likely to generate false signals. Entry conditions can be appropriately relaxed to increase capital reserves.  
2. Trend reversals at the end of trends can lead to large losses. Stop loss points can be set to reduce risks by reducing positions.
3. Improper parameter settings will affect strategy results. Parameters should be optimized in a timely manner to adapt them to market conditions.

## Optimization Directions  

1. Optimize the parameters of EMA and RSI to make the indicators more responsive and timely.  
2. Increase the stop loss mechanism. Stop loss when losses exceed a certain extent.
3. Increase position management. Dynamically adjust positions according to capital usage and market conditions.  
4. Test EMA parameters of longer cycles to identify larger-scale trends.

## Summary   

This strategy combines the use of dual EMA and RSI indicators to design trading rules, judging short-term and long-term trends based on different indicators, and supplemented by overbought and oversold judgments, simply and efficiently implementing low buying and high selling. Compared with a single indicator, this strategy is more reliable and adaptable. But we should also be aware of the risks of indicator failure, timely stop-loss and position management. In general, this strategy is relatively easy to implement and recommend.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-22 00:00:00
end: 2023-11-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//chia se cho rieng cong dong t.me/beincypto_vn
strategy('Sonic R & RSI only BTCUSD D1 strategy', //ten chien luoc
         shorttitle='sonic R & RSI Strategy', //ten rut gon cua chien luoc
         overlay=true,//
         close_entries_rule="FIFO", //thu tu dong lenh la bat ky
         default_qty_type=strategy.percent_of_equity, //loai so luong mac dinh la ti le phan tram cua von
         max_bars_back=500, // so luong thanh toi da la 500
         default_qty_value=100, //so luong vao lenh la 100 %
         calc_on_order_fills=false, //
         pyramiding=1,  // kim tu thap, 1 thi moi la thuc
         commission_type=strategy.commission.percent, // loai phan tram phi giao dich
         commission_value=0.2, //ti le phan tram phi giao dich
         process_orders_on_close=true, // tinh toan chien luoc khi dong lenh
         calc_on_every_tick=false) // sau khi dong nen moi vao lenh
ema34high = ta.ema(high, 34) // lay ema cao nhat cua 34 thanh nen
h=plot(ema34high, color=color.new(#A5D6A7, 0)) // hien thi ema cao nhat cua 34 thanh
ema34low = ta.ema(low, 34) // lay ema thap nhat cua 34 thanh nen
l=plot(ema34low, color=color.new(#EF9A9A, 0)) // hien thi ema thap nhat cua 34 thanh
fill(h, l, color = color.green, transp=90) // hien thi may giua ema cao va thap

rsi = ta.rsi(close, 14) // rsi 14 thanh
dkienmua1 = close > ema34high and close[2] > ema34high // dieu kien mua 1 khi gia lon hon ema 34 cao nhat va nen truoc do (nen 2) cung lon hon nen ema 34 cao nhat
if dkienmua1 // neu thoa man dieu kien mua 1
    strategy.entry('buyEMA', strategy.long) // vao lenh mua trong bieu do hien chu buyEMA
dkienban1 = close < ema34low and close[2] < ema34low // dieu kien ban 1 khi gia nho hon ema34 nho nhat va nen truoc do cung vay
if dkienban1 // nen dieu kien 1 thoa man
    strategy.close('buyEMA',comment='CloseEMA') // dong lenh buyema truoc do, hien thi o bieu do la chu closeEMA
dkienmua2 = ta.lowest(rsi, 3) < 29  and rsi > rsi[3] and rsi > 30 // dieu kien mua 2 khi gia thap nhat cua rsi 3 thanh gan day nho hon 29 va rsi lon hon rsi cay thu 3 truoc do
if dkienmua2 // neu dieu kien mua 2 thoa man
    strategy.entry('buyRSI', strategy.long) // vao lenh mua dat ten la buyRSI
dkienban2 = ta.highest(rsi, 5) > 70   and rsi < 70 // dieu kien ban 2 khi RSI cao nhat trong 5 cay lon hon 70 va RSI nho hon 70
if dkienban2 // neu dieu kien 2 thoa man
    strategy.close('buyRSI',comment='CloseRSI') // dong lenh buySI truoc do, tren bieu do hien thi chu closeRSI


```

> Detail

https://www.fmz.com/strategy/433019

> Last Modified

2023-11-23 16:37:38
