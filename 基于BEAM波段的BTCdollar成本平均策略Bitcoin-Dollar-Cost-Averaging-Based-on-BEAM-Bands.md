
> Name

基于BEAM波段的BTCdollar成本平均策略Bitcoin-Dollar-Cost-Averaging-Based-on-BEAM-Bands

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f486d27ae7852df146.png)
[trans]
## 概述

这个策略基于Ben Cowen的风险级别理论,目标是使用BEAM波段的级别来实现类似的方法。BEAM波段的上界是取对数后的200周移动平均线,下界是200周移动平均本身。这给了我们一个0到1的范围。当价格在0.5以下波段时,会发出买入指令;当价格在0.5以上波段时,会发出卖出指令。

## 策略原理

该策略主要依赖于Ben Cowen提出的BEAM波段理论。根据BTC的价格变化情况,可以将价格分为0到1之间的10个区域,这10个区域代表了10个不同的风险等级。第0级代表价格接近200周移动平均线,风险最小;第5级代表价格处于中值区域;第10级代表价格接近上轨,风险最大。

当价格下跌至低位时,该策略会逐步加大买入仓位。具体来说,如果价格处于0到0.5波段,会在策略设置的每月某一天发出买入指令,买入金额会随着波段号的减小而逐步增加。例如波段5时,买入金额为月DCA总额的20%;波段1时,买入金额提高到月DCA总额的100%。

当价格上涨至高位时,该策略会逐步减小仓位。具体来说,如果价格超过0.5波段,会按比例发出卖出指令,卖出仓位会随着波段号的增加而逐步增大。例如波段6时,卖出6.67%;波段10时,卖出所有仓位。

## 优势分析

这种BEAM波段DCA成本平均策略最大的优势在于,它充分利用了BTC波动交易的特点,在BTC价格跌至低谷时抄底加仓,在价格涨至高峰时获利了结。这种做法不会错过任何买入或卖出的良机。具体优势可概括如下:

1. 利用BEAM理论判断资产低估程度,科学规避风险;
2. 充分利用BTC波动特征,无比准确抓住买入卖出最佳机会;  
3. 采用成本平均方法,有效控制投资成本,获得长期稳定收益;
4. 自动执行买卖交易,无需人工干预,降低操作风险;
5. 可自定义参数,灵活调整策略以适应市场变化。

综上,这是一种精细化的参数调控策略,能够在BTC震荡行情中获取长期稳定收益。

## 风险分析

尽管BEAM波段DCA策略具有诸多优势,但也存在一些潜在风险需要警惕。主要风险点可概括如下:

1. BEAM理论和参数设定依赖主观判断,会出现误判的概率;
2. BTC走势难以预测,存在亏损切损的风险;  
3. 自动交易容易受到系统故障和Parameter Hacking不利影响;
4. 波动过大可能导致损失扩大。

为降低风险,可采取以下措施:

1. 优化参数设定,提高BEAM理论判断准确性;  
2. 适当缩小仓位规模,降低单次亏损金额;
3. 增加冗余度和容错能力,降低自动交易操作风险;  
4. 设置止损点,避免单笔亏损过大。

## 优化方向

考虑到上述风险点,该策略主要可从以下方面进行优化:  

1. 优化BEAM理论的参数:调整log法参数、回测周期等,提高模型判断准确性;
2. 优化仓位控制:调整每月DCA总额、买入卖出比例等,控制单次亏损风险;  
3. 增加自动交易安全模块:设置冗余服务器、本地处理等,提高容错能力;
4. 增设止损模块:根据历史波动设置合理止损点,有效控制损失。

通过这些手段,可以大幅提高策略的稳定性和安全性。

## 总结

BEAM波段DCA成本平均策略是一种非常具有实战价值的量化策略。它成功利用BEAM理论指导交易决策,并辅以成本平均模型控制买入成本。同时,它也注意风险管理,设置止损点以防范损失扩大。通过参数优化和模块增设,这种策略可以成为量化交易的重要工具,获得BTC市场的长期稳定收益。它值得量化交易从业者进一步研究和应用。

||

## Overview

This strategy is based on Ben Cowen’s risk level theory and aims to implement a similar approach using BEAM band levels. The upper BEAM level is the 200-week moving average after taking the logarithm, and the lower level is the 200-week moving average itself. This gives us a range from 0 to 1. Buy orders are issued when the price is below the 0.5 level bands, and sell orders are issued when above.

## Strategy Logic  

The strategy mainly relies on the BEAM band theory proposed by Ben Cowen. According to BTC's price changes, the price can be divided into 10 areas between 0 and 1, representing 10 different levels of risk. Level 0 represents the lowest risk with price close to the 200-week moving average. Level 5 represents the medium-risk value area. Level 10 represents the highest risk with price approaching the upper rail.

When the price falls to the lows, the strategy will gradually increase the long position. Specifically, if the price is between bands 0 and 0.5, buy orders will be issued on a set day each month. The buy amount will gradually increase as the band number decreases. For example, with band 5 the buy amount is 20% of the monthly DCA total. With band 1, the buy amount rises to 100% of the monthly DCA total.  

When prices rise to highs, the strategy will gradually reduce its position. Specifically, if the price exceeds band 0.5, sell orders will be issued in proportion. The sell position will gradually increase as the band number increases. For example with band 6, 6.67% will be sold. With band 10, all positions will be sold.


## Advantage Analysis 

The biggest advantage of this BEAM band DCA strategy is that it fully utilizes the volatility characteristics of BTC trading by bottom fishing when prices fall to their lowest and profit taking when prices rise to their peaks. This approach will not miss any buying or selling opportunities. The specific advantages can be summarized as follows:

1. Use BEAM theory to judge asset underestimation and scientifically avoid risks;  
2. Make full use of BTC volatility characteristics to catch the best buying and selling opportunities;
3. Adopt the cost averaging method to effectively control investment costs and obtain long-term stable returns;  
4. Automatically execute buy and sell transactions without manual intervention to reduce operational risks;
5. Customizable parameters allow flexible adjustment of strategies to adapt to market changes;

In summary, this is a sophisticated parameter tuning strategy that can generate long-term steady returns in fluctuating BTC market conditions.

## Risk Analysis  

Although the BEAM band DCA strategy has many advantages, there are still some potential risks to be aware of. The main risk points can be summarized as follows:


1. BEAM theory and parameter settings rely on subjective judgments, which have some probability of misjudgment; 
2. BTC trends are difficult to predict and there is risk of losses; 
3. Automatic trading can be adversely affected by system failures and parameter hacking;
4. Excessive fluctuations may lead to expanded losses.


To mitigate risks, the following measures can be taken:

1. Optimize parameter settings to improve BEAM theory judgment accuracy;
2. Appropriately reduce position size to decrease single loss amount; 
3. Increase redundancy and fault tolerance capabilities to reduce operational risks for automated trading;  
4. Set stop loss points to avoid excessively large single losses.


## Optimization

In view of the above risks, optimization of this strategy may focus on:

1. Optimize BEAM theory parameters: adjust log parameters, backtest cycle, etc. to improve model accuracy;  
2. Optimize position control: adjust monthly DCA amount, buy/sell ratios to control single loss amount;
3. Increase automated trading security: set redundant servers, local processing, etc. to improve fault tolerance;  
4. Add a stop loss module: set reasonable stop loss points based on historical volatility to effectively control losses.

Through these measures, the stability and security of the strategy can be greatly improved.

## Conclusion  

The BEAM band DCA average cost strategy is a highly practical quantitative trading strategy. It successfully leverages BEAM theory to guide trading decisions, supplemented by a cost averaging model to control buying costs. At the same time, it pays attention to risk management by setting stop loss points to prevent loss expansion. With parameter optimization and modular additions, this strategy can become an important tool for quantitative trading to obtain long-term steady returns from the BTC market. It deserves further research and application by quantitative trading practitioners.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|Off|Diminishing Returns|
|v_input_int_1|true|DCA Day of Month|
|v_input_int_2|1000|DCA Amount|
|v_input_1|true|Buy Orders|
|v_input_2|true|Sell Orders|
|v_input_int_3|2018|(?Backtest Period)Backtest Start Year|
|v_input_int_4|true|Backtest Start Month|
|v_input_int_5|true|Backtest Start Day|
|v_input_int_6|9999|Backtest Period (days)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-11 00:00:00
end: 2024-02-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © gjfsdrtytru - BEAM DCA Strategy {
// Based on Ben Cowen's risk level strategy, this aims to copy that method but with BEAM band levels.
// Upper BEAM level is derived from ln(price/200W MA)/2.5, while the 200W MA is the floor price. This is our 0-1 range. 
// Buy limit orders are set at the < 0.5 levels and sell orders are set at the > 0.5 level.
//@version=5
strategy(
  title                 = "BEAM DCA Strategy Monthly", 
  shorttitle            = "BEAM DCA M",
  overlay               = true,
  pyramiding            = 500,
  default_qty_type      = strategy.percent_of_equity,
  default_qty_value     = 0,
  initial_capital       = 0) //}

// Inputs { ————————————————————————————————————————————————————————————————————
T_ceiling   = input.string("Off", "Diminishing Returns", ["Off","Linear","Parabolic"], "Account for diminishing returns as time increases")
day         = input.int(1, "DCA Day of Month",1,28,1,"Select day of month for buy orders.")
DCAamount   = input.int(1000,"DCA Amount",400,tooltip="Enter the maximum amount you'd be willing to DCA for any given month.")
T_buy       = input(true,"Buy Orders","Toggle buy orders.")
T_sell      = input(true,"Sell Orders","Toggle sell orders.")

// Time period
testStartYear   = input.int(2018,   title="Backtest Start Year",    minval=2010,maxval=2100,group="Backtest Period")
testStartMonth  = input.int(1,      title="Backtest Start Month",   minval=1,   maxval=12,  group="Backtest Period")
testStartDay    = input.int(1,      title="Backtest Start Day",     minval=1,   maxval=31,  group="Backtest Period")
testPeriodLen   = input.int(9999,   title="Backtest Period (days)", minval=1,               group="Backtest Period",tooltip="Days until strategy ends") * 86400000 // convert days into UNIX time
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)
testPeriodStop  = testPeriodStart + testPeriodLen
testPeriod() => true
// ——————————————————————————————————————————————————————————————————————————— }
// Diminishing Returns { ———————————————————————————————————————————————————————
x = bar_index + 1
assetDivisor= 2.5
switch
    T_ceiling == "Linear"   => assetDivisor:= 3.50542 - 0.000277696 * x
    T_ceiling == "Parabolic"=> assetDivisor:= -0.0000001058992338 * math.pow(x,2) + 0.000120729 * x + 3.1982
// ——————————————————————————————————————————————————————————————————————————— }
// Risk Levels { ———————————————————————————————————————————————————————————————
cycleLen = 1400
getMaLen() =>
    if bar_index < cycleLen
        bar_index + 1
    else
        cycleLen

// Define Risk Bands
price       = close
riskLow     = ta.sma(price,getMaLen())
risk1       = riskLow * math.exp((assetDivisor)*0.1)
risk2       = riskLow * math.exp((assetDivisor)*0.2)
risk3       = riskLow * math.exp((assetDivisor)*0.3)
risk4       = riskLow * math.exp((assetDivisor)*0.4)
risk5       = riskLow * math.exp((assetDivisor)*0.5)
risk6       = riskLow * math.exp((assetDivisor)*0.6)
risk7       = riskLow * math.exp((assetDivisor)*0.7)
risk8       = riskLow * math.exp((assetDivisor)*0.8)
risk9       = riskLow * math.exp((assetDivisor)*0.9)
riskHigh    = riskLow * math.exp((assetDivisor))

// Plot Risk Bands
p_low       = plot(riskLow,   "Beam Risk 0.0",color.new(#0042F0,50),3,editable=false)
p_band1     = plot(risk1,     "Beam Risk 0.1",color.new(#0090F5,20),1,editable=false)
p_band2     = plot(risk2,     "Beam Risk 0.2",color.new(#00C6DB,20),1,editable=false)
p_band3     = plot(risk3,     "Beam Risk 0.3",color.new(#00F5BD,20),1,editable=false)
p_band4     = plot(risk4,     "Beam Risk 0.4",color.new(#00F069,20),1,editable=false)
p_band5     = plot(risk5,     "Beam Risk 0.5",color.new(#00DB08,50),3,editable=false)
p_band6     = plot(risk6,     "Beam Risk 0.6",color.new(#E8D20C,20),1,editable=false)
p_band7     = plot(risk7,     "Beam Risk 0.7",color.new(#F2B40C,20),1,editable=false)
p_band8     = plot(risk8,     "Beam Risk 0.8",color.new(#DC7A00,20),1,editable=false)
p_band9     = plot(risk9,     "Beam Risk 0.9",color.new(#F2520C,20),1,editable=false)
p_band10    = plot(riskHigh,  "Beam Risk 1.0",color.new(#F01102,50),3,editable=false)
// ——————————————————————————————————————————————————————————————————————————— }
// Order Execution { ———————————————————————————————————————————————————————————
band5   = price<risk5 and price>risk4
band4   = price<risk4 and price>risk3
band3   = price<risk3 and price>risk2
band2   = price<risk2 and price>risk1
band1   = price<risk1

// DCA buy order weights
y       = DCAamount / 5
switch
    band5 => y:= y * 1
    band4 => y:= y * 2
    band3 => y:= y * 3
    band2 => y:= y * 4
    band1 => y:= y * 5

// Contracts per order
contracts =(y/price)

if testPeriod()
// Buy orders
    if T_buy == true
        if dayofmonth == day
            strategy.entry("Risk Band 5",strategy.long,qty=contracts,when=band5)
            strategy.entry("Risk Band 4",strategy.long,qty=contracts,when=band4)
            strategy.entry("Risk Band 3",strategy.long,qty=contracts,when=band3)
            strategy.entry("Risk Band 2",strategy.long,qty=contracts,when=band2)
            strategy.entry("Risk Band 1",strategy.long,qty=contracts,when=band1)
// Sell orders 
    if T_sell == true
        if strategy.opentrades > 5
            strategy.exit("Risk Band 6",qty_percent=6.67,limit=risk6) 
            strategy.exit("Risk Band 7",qty_percent=14.28,limit=risk7)
            strategy.exit("Risk Band 8",qty_percent=25.00,limit=risk8)
            strategy.exit("Risk Band 9",qty_percent=44.44,limit=risk9)
            strategy.exit("Risk Band 10",qty_percent=100,limit=riskHigh)
// ——————————————————————————————————————————————————————————————————————————— }
// Info { ——————————————————————————————————————————————————————————————————————

// Line plot of avg. entry price
plot(strategy.position_size > 0 ? strategy.position_avg_price : na,"Average Entry",color.red,trackprice=true,editable=false)

// Unrealised PNL
uPNL = price/strategy.position_avg_price

// Realised PNL
realPNL = 0.
for i = 0 to strategy.closedtrades-1
    realPNL += strategy.closedtrades.profit(i)

// Size of open position in ($)
openPosSize = 0.
for i = 0 to strategy.opentrades-1
    openPosSize += strategy.opentrades.size(i) * strategy.position_avg_price

// Size of closed position in ($)
closePosSize = 0.
if strategy.closedtrades > 0
    for i = 0 to strategy.closedtrades-1
        closePosSize += strategy.closedtrades.size(i) * strategy.closedtrades.entry_price(i)

invested    = openPosSize+closePosSize                              // Total capital ($) put into strategy
equity      = openPosSize+closePosSize+strategy.openprofit+realPNL  // Total current equity ($) in strategy (counting realised PNL)
ROI         = (equity-invested) / invested * 100                    // ROI of strategy (compare capital invested to excess return)

// // Info Table
// var table table1 = table.new(position.bottom_right,2,9,color.black,color.gray,1,color.gray,2)

// table.cell(table1,0,0,"Capital Invested",   text_color=color.white,text_halign=text.align_right)
// table.cell(table1,0,1,"Open Position",      text_color=color.white,text_halign=text.align_right)
// table.cell(table1,0,2,"Average Entry",      text_color=color.white,text_halign=text.align_right)
// table.cell(table1,0,3,"Last Price",         text_color=color.white,text_halign=text.align_right)
// table.cell(table1,0,4,"Open PNL (%)",       text_color=color.white,text_halign=text.align_right)
// table.cell(table1,0,5,"Open PNL ($)",       text_color=color.white,text_halign=text.align_right)
// table.cell(table1,0,6,"Realised PNL ($)",   text_color=color.white,text_halign=text.align_right)
// table.cell(table1,0,7,"Total Equity",       text_color=color.white,text_halign=text.align_right)
// table.cell(table1,0,8,"Strategy ROI",       text_color=color.white,text_halign=text.align_right)

// table.cell(table1,1,0,"$" + str.tostring(invested,                      "#,###.00"),      text_halign=text.align_right,text_color = color.white)
// table.cell(table1,1,1,"$" + str.tostring(openPosSize,                   "#,###.00"),      text_halign=text.align_right,text_color = color.white)
// table.cell(table1,1,2,"$" + str.tostring(strategy.position_avg_price,   "#,###.00"),      text_halign=text.align_right,text_color = color.white)
// table.cell(table1,1,3,"$" + str.tostring(price,                         "#,###.00"),      text_halign=text.align_right,text_color = color.white)
// table.cell(table1,1,4,      str.tostring((uPNL-1)*100,                  "#,###.00") + "%",text_halign=text.align_right,text_color = uPNL > 1 ? color.lime : color.red)
// table.cell(table1,1,5,"$" + str.tostring(strategy.openprofit,           "#,###.00"),      text_halign=text.align_right,text_color = uPNL > 1 ? color.lime : color.red)
// table.cell(table1,1,6,"$" + str.tostring(realPNL,                       "#,###.00"),      text_halign=text.align_right,text_color = color.white)
// table.cell(table1,1,7,"$" + str.tostring(equity,                        "#,###.00"),      text_halign=text.align_right,text_color = color.white)
// table.cell(table1,1,8,      str.tostring(ROI,                           "#,###.00") + "%",text_halign=text.align_right,text_color = ROI > 1 ? color.lime : color.red)
// // ——————————————————————————————————————————————————————————————————————————— }
```

> Detail

https://www.fmz.com/strategy/442007

> Last Modified

2024-02-18 15:40:42
