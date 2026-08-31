
> Name

跨时间帧移动平均线交易策Multi-Timeframe-Moving-Average-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy utilizes moving averages across different timeframes to implement trend following trading. It calculates fast and slow moving averages on the daily, 4-hour and 15-minute timeframes. When the fast moving averages cross above the slow ones on all three timeframes, it goes long. When the fast moving averages cross below the slow ones, it goes short. The strategy makes full use of price information across timeframes to effectively filter false breakouts.

## Strategy Logic

The strategy computes fast and slow moving averages based on three different timeframes. It takes the daily, 4-hour and 15-minute timeframes, and calculates 21-period fast EMA and 34-period slow EMA on each timeframe. When the fast EMA crosses above the slow EMA on the daily, 4-hour and 15-minute timeframes, it determines an uptrend and goes long. When the fast EMA crosses below the slow EMA on all three timeframes, it determines a downtrend and goes short.

The strategy also sets trading time range to avoid unfavorable market conditions. It only trades within specified months and date range.

Specifically, the key points of the strategy include:

1. Input different timeframes: daily, 4-hour, 15-min

2. Compute fast and slow EMAs on each timeframe 

3. Go long when fast EMA crosses above slow EMA on all timeframes, go short when below

4. Set trading month and date range 

5. Open long/short positions based on conditions, close when conditions not met

Judging trend across timeframes can effectively filter false breakouts. Applying position sizing across multiple timeframes can also control risk.

## Advantages

The main advantages of this strategy are:

1. Cross-timeframe trend identification filters false breakouts effectively. Single timeframe is prone to false breakouts.

2. Multi-timeframe position sizing lowers risk from single timeframe. Single timeframe risks exceeding capacity. 

3. Trading time range avoids being stuck in unfavorable markets. Skipping bad periods by specifying months and dates.

4. Fast and slow EMA combo captures trend smoothly. EMA is widely used and easy to understand.

5. Simple and clear rules, easy parameter tuning makes strategy easy to implement. No complex indicators needed.

6. Broadly applicable across asset classes with high flexibility. EMA crossover concept generalizable.

## Risks

Some risks to consider for this strategy:

1. Performs better in long trending markets, ranging markets increase whipsaw risk. Can loosen position sizing to lower risk.

2. Conservative parameters may miss stronger trends. Can shorten EMA periods or reduce number of trading timeframes.

3. EMA performs poorly in choppy markets. Consider combining with volatility or momentum indicators. 

4. Daily timeframe slow to determine trend, unable to exit positions timely. Can add higher timeframes or lower daily position sizes.

5. Fixed trading time range does not adapt to evolving markets. Should evaluate regularly to adjust time range parameters.

## Enhancements

Some ways to enhance this strategy:

1. Optimize EMA periods for smoother trend following. Can test shorter fast/slow EMA periods or add faster EMA.

2. Add momentum indicator for trend strength. Such as MACD, RSI for additional signal.

3. Optimize position sizing based on market conditions. Adapt strategy position size based on market volatility. 

4. Incorporate volatility indicators to improve entry and exit. Add ATR or variance to dynamically adapt to volatility.

5. Test more timeframe combinations to find optimal balance. Can add higher timeframes or remove certain ones.

6. Utilize machine learning for automated parameter optimization. Discover optimal parameters through simulation and training.

7. Add trend confirmation to avoid whipsaws. Such as requiring consecutive candle close above EMA. 

8. Conduct robust backtesting to evaluate parameter stability. Fix overfitted parameters and improve reliability.

## Conclusion

This strategy utilizes the cross-timeframe trend filtering concept with fast/slow EMA to create a stable and efficient trend following system. It has the advantages of accurate trend identification and risk management. However, risk control in volatile markets and continuous parameter enhancement are needed to achieve consistent returns. Overall, the multi-timeframe EMA framework is broadly applicable and a recommended trend trading approach.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|21|Input For Fast MA|
|v_input_3|34|Input For Slow MA|
|v_input_4|D|LONGTERM|
|v_input_5|180|MIDTERM|
|v_input_6|15|SHORTTERM|
|v_input_7|8|monthfrom|
|v_input_8|12|monthuntil|
|v_input_9|true|dayfrom|
|v_input_10|31|dayuntil|
|v_input_11|2018|yearfrom|
|v_input_12|2020|yearuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-15 00:00:00
end: 2023-09-22 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Cryptocurrency Trading Tools by XMAXPRO
//ATA
//Test 1.0v Date  : 10.11.2018
//

strategy("MTF+MA", overlay=false, shorttitle="MTF-MA", overlay = true,default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type=strategy.commission.percent,commission_value=0.1,initial_capital=100000)
src = input(title= "Source", defval=close)
fast = input(title="Input For Fast MA",  defval=21)
slow = input(title="Input For Slow MA",defval=34)
//MTF source
long = input(title="LONGTERM",  defval="D")
mid = input(title="MIDTERM",  defval="180")
short = input(title="SHORTTERM",  defval="15")
//MTF Grafikleri
ln = security(syminfo.ticker, long, src)
md = security(syminfo.ticker, mid, src)
sh = security(syminfo.ticker, short, src)
//0
lnma = ema(ln,fast) - ema(ln,slow)
mdma = ema(sh,fast) - ema(md,slow)
shma = ema(sh,fast) - ema(sh,slow)

plot(lnma,color=green,linewidth=3)
plot(mdma,color=blue,linewidth=3)
plot(shma,color=red,linewidth=3)
plot(0,color=white,linewidth=3)

longCond = lnma>0 and mdma>0  and shma>0
shortCond= lnma<0  and mdma<0  and shma <0 



monthfrom =input(8)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)
yearfrom=input(2018)
yearuntil=input(2020)

if (  longCond  ) 
    strategy.entry("LONG", strategy.long, stop=close, oca_name="TREND",  comment="LONG")
    
else
    strategy.cancel(id="LONG")
    



if ( shortCond   ) 

    strategy.entry("SHORT", strategy.short,stop=close, oca_name="TREND",  comment="SHORT")
else
    strategy.cancel(id="SHORT")

```

> Detail

https://www.fmz.com/strategy/427685

> Last Modified

2023-09-23 16:10:08
