
> Name

四阶段BIST股票量化收购策略This-BIST-stocks-4-stage-quantitative-acquisition-strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18866ba73b6dadc76fa.png)
 [trans]

## 概述

四阶段BIST股票量化收购策略是一个利用四阶段买入的波动追踪,在市场陷入整理的区域进行买入,在买盘加大的区域卖出的策略。该策略适用于具有大幅波动的股票,通过分批买入实现更好的成本控制。

## 策略原理  

该策略首先计算出阻力线和支撑线。阻力线通过高价的震荡均线和收盘价的交叉点确定,支撑线通过收盘价和低价的震荡均线的交叉点确定。

当价格跌破支撑线时,如果价格距离阻力线在设置的买入区间范围内,进行第一阶段25%仓位的买入。之后在第一阶段买入价格附近再次买入25%仓位,如此循环4次,最终实现100%的仓位。

当股票价格超过开仓成本的两倍时,进行全部平仓离场。

## 策略优势

1. 分四次买入,降低买入成本
2. 追踪股票波动实现更好入场点
3. 止盈点合理,实现较好收益

## 风险及解决方案

1. 股票价格持续下跌,无法止损离场,可能导致较大亏损

    - 合理设置止损线,有效控制亏损

2. 参数设置不当,多个买入点过于接近,无法实现成本分散效果

    - 合理设置买入阶段之间的价格差距

3. 停止亏损点设置过大,无法有效控制损失

    - 根据真实交易环境和心理承受能力,设置合适的止损距离

## 策略优化方向  

1. 根据不同类型的股票调整参数,使买入区域更符合该股票的特点

2. 加入波动率指标,在波动加大时进行买入

3. 对止盈方式进行优化,改为追踪止盈,实现更高收益

4. 增加止损线设置,在价格向下突破某一水平时停止亏损

## 总结

四阶段BIST股票量化收购策略总体来说是一个非常适合热门概念股的策略。通过分批建仓,能够有效利用股票的波动性,在价格回落时获得较好的成本。同时,合理的止盈和止损设定也使该策略在控制风险方面表现较好。如果根据真实市场环境不断对参数进行调整优化,相信该策略可以获得稳定的Alpha。


|| 

This BIST stocks 4-stage quantitative acquisition strategy is based on a four-stage buying to track the wave movements. It enters the market during post-manipulation and sells when buyer demand increases. This strategy is suitable for stocks with large fluctuations, and achieves better cost control through stage-by-stage purchases.

## Strategy Principles

This strategy first calculates the resistance and support lines. The resistance line is determined by the intersection of the close price and the oscillating moving average of the high price, while the support line is determined by the intersection of the close price and the oscillating moving average of the low price. 

When the price breaks below the support line, if the price is within the set buying range from the resistance line, it will buy in 25% of the position in the first stage. Then it will buy another 25% of the position around the first buy price, and so on for 4 times, eventually holding 100% of the position.

When the stock price exceeds twice the opening cost, it will close out all positions.

## Advantages of the Strategy

1. Lower buying costs through four-stage purchases 
2. Better entry points by tracking stock fluctuations
3. Reasonable take profit point for decent returns

## Risks and Solutions

1. Continued stock decline without stop loss, leading to large losses

    - Set reasonable stop loss to effectively control losses

2. Improper parameter settings make multiple buy points too close to diversify costs

    - Set appropriate price differences between buying stages  

3. Stop loss point too wide to effectively control losses

    - Set suitable stop distance based on actual trading environment and psychological tolerance

## Optimization Directions   

1. Adjust parameters for different types of stocks to better fit their characteristics

2. Add volatility indicators to buy when volatility rises  

3. Optimize take profit by using trailing stop to achieve higher returns  

4. Add stop loss settings to cut losses when price breaks certain levels

## Summary  

The BIST stocks 4-stage quantitative acquisition strategy is well suited for popular concept stocks overall. By staging the purchases, it can effectively utilize the volatility of the stocks to get better costs when prices pull back. Also, the reasonable take profit and stop loss settings allow it to perform well in risk control. With continual parameter adjustments and optimizations based on actual market environments, this strategy can reliably deliver alpha.

[/trans]


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|Alım_Üst_Çizgi|
|v_input_2|90|Alım_Alt_Çizgi|
|v_input_3|true|Barcolor|
|v_input_4|true|Bgcolor|
|v_input_5|40|Satım_Üst_Çizgi|
|v_input_6|300|Satım_Alt_Çizgi|
|v_input_7|true|Barcolor2|
|v_input_8|true|Bgcolor2|
|v_input_9|25|Alış Aralığı %|
|v_input_10|45|Satış aralığı %|
|v_input_11|0.12|ALIM YERİ %|
|v_input_12|long entry message|message_long_entry|
|v_input_13|long exit message|message_long_exit|
|v_input_14|2|PROFİT SATIŞ SEVİYESİ|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-12 00:00:00
end: 2023-12-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Cantalk

//@version=5
strategy("BİST_100 HİSSELERİ 1_SAAT 4 KADEME ALIM",overlay = true, pyramiding=4, initial_capital=10000, process_orders_on_close=true, commission_type=strategy.commission.percent, commission_value=0.002)



LB2 = input(30, title="Alım_Üst_Çizgi")
LB = input(90, title="Alım_Alt_Çizgi")
Barcolor=input(true,title="Barcolor")
Bgcolor=input(true,title="Bgcolor")
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
RDirenc = ta.valuewhen(ta.cross(ta.hma(close, LB2), close), ta.highest(high, LB2), 1)
SDestek = ta.valuewhen(ta.cross(close, ta.hma(close, LB)), ta.lowest(low, LB), 1)



//plot(RDirenc,title="Resistance", color=#f7d707fc, linewidth =2)
//plot(SDestek,title="Support", color=#064df4, linewidth = 2)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

LB22 = input(40, title="Satım_Üst_Çizgi")
LB1 = input(300, title="Satım_Alt_Çizgi")

Barcolor2=input(true,title="Barcolor2")
Bgcolor2=input(true,title="Bgcolor2")
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
RDirenc2 = ta.valuewhen(ta.cross(ta.hma(close, LB22), close), ta.highest(high, LB22), 1)
SDestek2 = ta.valuewhen(ta.cross(close, ta.hma(close, LB1)), ta.lowest(low, LB1), 1)



//plot(RDirenc2,title="Resistance2", color=#f40a0afc, linewidth =2)
//plot(SDestek2,title="Support2", color=#0eed0e, linewidth = 2)

//colors=if(close>RDirenc, color= #008000,if(SDestek<close,color=#FFFF00,color=#FF0000))

aralik_yuzde_alis = ((RDirenc-SDestek)/SDestek)*100
fark = input(25.0, title="Alış Aralığı %")



aralik_yuzde_satis = ((RDirenc2-SDestek2)/SDestek2)*100
fark2 = input(45.0, title="Satış aralığı %")




buyProcess = input(0.12, "ALIM YERİ %")
//buyProcess2 = input(0.10, "ALIM YERİ-2 %")
//buyProcess3 = input(0.10, "ALIM YERİ-3 %")



buy1 = strategy.position_avg_price - (strategy.position_avg_price * buyProcess)

buy2 = buy1 - (strategy.position_avg_price * buyProcess)

buy3 = buy2 - (strategy.position_avg_price * buyProcess)

buy4 = buy3 - (strategy.position_avg_price * buyProcess)



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
isLong1 = if ta.crossover(close, SDestek) and aralik_yuzde_alis < fark 
    1
else
    0

    
isLong2 = if ta.crossover(close, SDestek) and (close <=  buy1)
    1
else
    0

isLong3 = if ta.crossover(close, SDestek) and (close <=  buy2) 
    1
else
    0

isLong4 = if ta.crossover(close, SDestek) and (close <= buy3) 
    1
else
    0



message_long_entry  = input("long entry message")
message_long_exit   = input("long exit message")


fullProfit = input(2.00, "PROFİT SATIŞ SEVİYESİ")
profit = strategy.position_avg_price * fullProfit
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

strategy.entry(id = "BUY-1", direction = strategy.long, qty = 25, when = (isLong1 and strategy.position_size == 0), alert_message = message_long_entry)
strategy.entry(id = "BUY-2", direction = strategy.long, qty = 25, when = (isLong2 and strategy.position_size == 25), alert_message = message_long_entry)
strategy.entry(id = "BUY-3", direction = strategy.long, qty = 25, when = (isLong3 and strategy.position_size == 50), alert_message = message_long_entry)
strategy.entry(id = "BUY-4", direction = strategy.long, qty = 25, when = (isLong4 and strategy.position_size == 75), alert_message = message_long_entry)



buyclose1 = if  (close >= (strategy.position_avg_price + profit)) and aralik_yuzde_satis > fark2
    close
    

strategy.exit("EXİT",qty_percent = 100, stop = buyclose1)


aritmeticClose =  strategy.position_avg_price + profit
plot(aritmeticClose, color = color.rgb(248, 5, 240), linewidth = 1, style = plot.style_linebr)
```

> Detail

https://www.fmz.com/strategy/435886

> Last Modified

2023-12-19 15:21:22
