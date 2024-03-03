
> Name

盘前突破交易策略Pre-Market-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略专注于开盘盘前时段,结合均线和动量指标判断短期趋势,在高动量阶段进行突破交易。属于典型的短线套利策略。

策略原理:

1. 设置盘前交易时段为开盘前1小时内。

2. 计算50周期EMA判断大盘合理价格区间。

3. SMI指标在区域低点出现向上交叉视为买入信号。

4. 突破EMA均线的收盘价视为止损信号。 

5. 设定固定止盈点,目标短线套现。

该策略的优势:

1. 突破短期EMA,可判断当日趋势方向。

2. SMI指标可确认超卖区域出现反转机会。

3. 回测参数有限,实盘易操作。

该策略的风险:

1. 突破容易形成盘前套牢,须警惕反转。

2. 单日时间段操作,难以应对跳空。

3. 停损幅度偏小,调整不当易止损。

总之,该策略为典型盘前短线策略,通过EMA和SMI指标追捧高动量突破。但盘前套牢风险高,需控制仓位并做好止损。

||

This strategy trades breakouts during the pre-market hour, using moving average and momentum indicators to determine short-term trends to trade at peak volatility. It is a typical short scalping strategy.

Strategy Logic:

1. Define pre-market range as within 1 hour of open.

2. Use 50-period EMA to gauge fair price range.

3. SMI crossover at lows signals long entry. 

4. Closing below EMA is stop loss signal.

5. Take fixed profit target for short-term scalping.

Advantages:

1. Breaking short-term EMA shows intraday trend. 

2. SMI confirms bottom reversals.

3. Limited backtest parameters make live trading simple.

Risks:

1. Breakouts prone to pre-market traps, beware reversals. 

2. Single daily session Unable to defend against gaps.

3. Tight stops inclined to premature exit if calibrated poorly. 

In summary, this is a typical pre-market short scalping strategy using EMA/SMI to ride high volatility breakouts. But the risk of pre-market traps is high, requiring small position sizing and disciplined stop loss.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|StartDate|Start of trading|
|v_input_2|EndDate|End of trading|
|v_input_3|100|Quantity|
|v_input_4|5|Percent K Length|
|v_input_5|3|Percent D Length|
|v_input_float_1|40|Over Bought|
|v_input_6|-40|Over Sold|
|v_input_7|50|EMA50Len|
|v_input_8|10|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-12 00:00:00
end: 2023-09-12 00:00:00
period: 4d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
args: [["v_input_7",65]]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Trading_Bites
//@version=5

// strategy('Morning Scalp', overlay=false, pyramiding=2, initial_capital=3000, default_qty_value=0, commission_value=0.02, max_labels_count=500)

                    // Initial Inputs

StartDate =         timestamp('15Aug 2022 14:00 +0000')
EndDate =           timestamp('15Aug 2022 20:00 +0000')
testPeriodStart =   input(StartDate, 'Start of trading')
testPeriodEnd =     input(EndDate, 'End of trading')
QuantityOnLong =    input(title="Quantity", defval=100,  minval=1)
QuantityOnClose =   QuantityOnLong

//////////////////////////////////////////////////////////////////////
//-- Time In Range
timeinrange(res, sess) =>
    not na(time(res, sess))

                //Market Open//
marketopen = '0930-1600'
MarketOpen = timeinrange(timeframe.period, marketopen)
//////////////////////////////////////////////////////////////////////
                //Market Hour//
morning =   '1000-1210'
Morning =   timeinrange(timeframe.period, morning)


//////////////////////////////////////////////////////////////////////////
               //STOCK MOMENTUM INDEX//
a = input(5, 'Percent K Length')
b = input(3, 'Percent D Length')
ovrsld = input.float(40, 'Over Bought')
ovrbgt = input(-40, 'Over Sold')
//lateleave = input(14, "Number of candles", type=input.integer)

// Range Calculation
ll = ta.lowest(low, a)
hh = ta.highest(high, a)
diff = hh - ll
rdiff = close - (hh + ll) / 2
// Nested Moving Average for smoother curves
avgrel = ta.ema(ta.ema(rdiff, b), b)
avgdiff = ta.ema(ta.ema(diff, b), b)
// SMI calculations
SMI = avgdiff != 0 ? avgrel / (avgdiff / 2) * 100 : 0
SMIsignal = ta.ema(SMI, b)

CrossoverIndex = ta.crossover(SMI, SMIsignal)
CrossunderIndex = ta.crossunder(SMI, SMIsignal)

plot1 = plot(SMI, color=color.new(color.aqua, 0), title='Stochastic Momentum Index', linewidth=1, style=plot.style_line)
plot2 = plot(SMIsignal, color=color.new(color.red, 0), title='SMI Signal Line', linewidth=1, style=plot.style_line)
hline = plot(ovrsld, color=color.new(color.red, 0), title='Over Bought')
lline = plot(ovrbgt, color=color.new(color.green, 0), title='Over Sold')

plot(CrossoverIndex ? close : na, color=color.new(color.aqua, 0), style=plot.style_cross, linewidth=2, title='RSICrossover')

mycol1 = SMIsignal > -ovrbgt ? color.red : na
mycol2 = SMIsignal < -ovrsld ? color.green : na

fill(plot1, hline, color=color.new(mycol1, 80))
fill(plot2, lline, color=color.new(mycol2, 80))

//////////////////////////////////////////////////////////////////////
                // Input EMA9 and EMA21 
EMA50Len      = input( 50 )
EMA50         = ta.ema(close, EMA50Len)
//////////////////////////////////////////////////////////////////////////

                // -------- VWAP  ----------//
vwapLine =      ta.vwap(close)
////////////////////////////////////////////////////////////////////////

                        //PROFIT TARGET//

longProfitPer   = input(10.0, title='Take Profit %') / 100
TargetPrice     = strategy.position_avg_price * (1 + longProfitPer) 
//plot              (strategy.position_size > 0 ? TargetPrice : na, style=plot.style_linebr, color=color.green, linewidth=1, title="Price Target") 
 
                    //BUY STRATEGY CONDITION//

condentry =     ta.crossover(SMI, SMIsignal) and SMI < 0
profittarget =  TargetPrice
stoploss =     close < EMA50

///////////////////////////STRATEGY BUILD//////////////////////////////////////

if MarketOpen
    
    if close > EMA50 

        if (condentry) and Morning
            strategy.entry('Long', strategy.long)
            
        if profittarget and strategy.position_size > 0 
            strategy.exit(id="Long", limit=TargetPrice) 
                
if stoploss
    strategy.close('Long' )

```

> Detail

https://www.fmz.com/strategy/426555

> Last Modified

2023-09-13 11:46:20
