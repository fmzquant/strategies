
> Name

逐步加仓均线突破策略Stepwise-Pyramiding-Moving-Average-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13a4855ee824fbc5bca.png)
[trans]
### 概述

该策略采用逐步加仓的方式,根据收盘价与前一日收盘价的比较来判断行情方向。当判断为看涨机会时,会分多次逐步加仓做多;当判断为看跌机会时,会分多次逐步加仓做空。加仓次数可以通过参数进行设置。同时,策略加入了时间段过滤,只有在设置的时间段内才会发出交易信号。

### 策略原理   

1. 比较当前K线收盘价close与前一K线收盘价close[1],如果close > close[1],则判断为看涨机会,设置longCondition=1;如果close < close[1],则判断为看跌机会,设置shortCondition=1。

2. 在允许交易的时间段内,如果longCondition=1,则逐步加仓做多;如果shortCondition=1,则逐步加仓做空。

3. 加仓次数由参数pyramiding设置,可选择1到5次加仓,默认为4次。

4. 每次加仓后,会同时设置对冲条件,如果行情转向,会立即止损。

5. 可选择把交易信号输出到不同的交易接口,如toast、telegram等。

该策略主要考虑突破型策略与均线型策略的优点,在看涨或看跌时,采取逐步加仓的方法,既能充分跟踪趋势,又能控制风险。同时结合时间过滤,避免在非主交易时间GENERATED信号。

### 优势分析

1. 逐步加仓方式能更好跟踪趋势

2. 加仓次数可调,更灵活

3. 可选择不同的交易接口,拓宽数量型

4. 有止损机制,可控风险

5. 时间过滤功能,避免错误信号

### 风险分析  

1. 参数设置不当可能导致亏损加大

2. 网络问题可能导致无法及时止损

3. 需适当调整参数以适应不同品种

4. 需适时止损以锁定利润

解决方法:

1. 调整加仓次数,默认4次为宜

2. 检查网络连接

3. 根据品种特点调整参数

4. 设置止损位

### 优化方向  

1. 可以考虑加入更多指标判断信号强弱  

2. 可以测试不同品种参数优化效果

3. 可以加入机器学习算法优化参数

4. 可以优化风险管理机制

### 总结

该逐步加仓均线突破策略整合了趋势跟踪与风险控制的优点,在判断到有效信号时,采取逐步加仓的方式跟踪趋势,通过加仓次数的调整来控制风险敞口。同时结合了时间段过滤等功能来控制误信号。该策略可通过多种方式进行优化,具有很大的拓展性。总的来说,该策略对于跟踪趋势型品种具有非常好的效果,是一种值得推荐的策略。

||

### Overview  

This strategy uses a stepwise pyramiding approach based on the comparison between the current close price and previous close price to determine the market direction. When a long opportunity is identified, it will long with multiple gradual entries. When a short opportunity is identified, it will short with multiple gradual entries. The number of entries can be set through parameters. At the same time, the strategy incorporates time frame filters where trading signals are only generated within the configured trading time frame.

### Strategy Logic   

1. Compare current bar's close price (close) with previous bar's close price (close[1]). If close > close[1], it is determined as a long opportunity and set longCondition=1. If close < close[1], it is determined as a short opportunity and set shortCondition=1.

2. Within the allowed trading time frame, if longCondition=1, it will long with multiple gradual entries. If shortCondition=1, it will short with multiple gradual entries.

3. The number of entries is set through the pyramiding parameter, which can be configured from 1 to 5, with 4 as the default.  

4. A stop loss condition is set after each entry in case the market reverses. 

5. Trading signals can be output to different trading interfaces such as toast or telegram.

The strategy mainly considers the advantages of breakout and moving average strategies. During long or short opportunities, it uses a stepwise pyramiding approach to better follow the trend while controlling risks. It also incorporates time frame filters to avoid generating signals during non-major trading sessions.

### Advantage Analysis

1. Stepwise pyramiding follows trends better.  

2. Adjustable number of entries makes it more flexible.

3. Supports different trading interfaces for scalability.  

4. Has stop loss mechanisms to control risks.

5. Time frame filter avoids false signals.

### Risk Analysis

1. Improper parameter settings may lead to larger losses.  

2. Network issues may prevent timely stop loss.  

3. Parameters need adjustments for different products.

4. Need timely stop loss to lock in profits.

Solutions:

1. Default 4 entries is appropriate.  

2. Check network connectivity.

3. Adjust parameters according to product characteristics.  

4. Set stop loss levels.

### Optimization Directions   

1. Consider adding more indicators to judge signal strength.

2. Test parameter optimization results across different products.  

3. Incorporate machine learning algorithms to optimize parameters.  

4. Enhance risk management mechanisms.

### Summary
This stepwise pyramiding moving average breakout strategy integrates the advantages of trend following and risk control. When effective signals are identified, it uses stepwise pyramiding to follow the trend while controlling risk exposure through configurable number of entries. It also incorporates functionalities like time frame filter to avoid false signals. The strategy can be further optimized in many aspects and has great extensibility. In general, it is very effective for trending products and is strongly recommended.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(31 Jan 2024 00:00 +0900)|(?매매 시간세팅)매매 시작|
|v_input_2|timestamp(31 Dec 2030 00:00 +0900)|매매 종료|
|v_input_string_1|0|(?봇선택)봇선택: POA|TVEXTBOT|
|v_input_string_2|아무거나입력|(?계정정보)계정|
|v_input_string_3||TVExtBot 인증키|
|v_input_float_1|4|(?진입 세팅)분할진입수|
|v_input_string_4||(?진입주문 메세지입력)롱 진입1|
|v_input_string_5||롱 진입2|
|v_input_string_6||롱 진입3|
|v_input_string_7||롱 진입4|
|v_input_string_8||롱 진입5|
|v_input_string_9||숏 진입1|
|v_input_string_10||숏 진입2|
|v_input_string_11||숏 진입3|
|v_input_string_12||숏 진입4|
|v_input_string_13||숏 진입5|
|v_input_string_14||(?종료주문 메세지입력)롱 전체종료|
|v_input_string_15||숏 전체종료|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-05 00:00:00
end: 2024-02-04 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © torresbitmex

//@version=5
strategy("torres_strategy_real_test_v1.0", process_orders_on_close=true, overlay=true, initial_capital=1000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_value=0.03, calc_on_order_fills=false, pyramiding=4)

in_trade(int start_time, int end_time) =>    
    allowedToTrade = (time>=start_time) and (time<=end_time)
    if barstate.islastconfirmedhistory
        var myLine = line(na)
        line.delete(myLine)
        myLine := line.new(start_time, low, start_time, high, xloc=xloc.bar_time, color = color.rgb(255, 153, 0, 50), width = 3, extend = extend.both, style = line.style_dashed)
    allowedToTrade

// 매매시간세팅
start_time = input(timestamp("31 Jan 2024 00:00 +0900"), title="매매 시작", group='매매 시간세팅')
end_time = input(timestamp("31 Dec 2030 00:00 +0900"), title="매매 종료", group='매매 시간세팅')
start_trade = true
bgcolor(start_trade ? color.new(color.gray, 90)   : color(na))


var bool Alarm_TVExtbot = false
var bool Alarm_Alert = false

bot_mode = input.string(title='봇선택', defval = "POA", options = ["TVEXTBOT", "POA"], group = "봇선택", inline = '1')
if bot_mode == "TVEXTBOT"
    Alarm_TVExtbot := true
else if bot_mode == "POA"
    Alarm_Alert := true
else
    Alarm_TVExtbot := false
    Alarm_Alert := false

// 계정정보
account = input.string(title='계정', defval='아무거나입력', inline='1', group='계정정보')
token = input.string(title='TVExtBot 인증키', defval='', inline='1', group='계정정보')

mul_input = input.float(4, minval=1, maxval=5, step=1, title="분할진입수", group='진입 세팅', inline='1')
// 진입주문메세지입력
buyOrderid = input.string(title='롱 진입1', defval='', group='진입주문 메세지입력', inline='2')
buyOrderid2 = input.string(title='롱 진입2', defval='', group='진입주문 메세지입력', inline='3')
buyOrderid3 = input.string(title='롱 진입3', defval='', group='진입주문 메세지입력', inline='4')
buyOrderid4 = input.string(title='롱 진입4', defval='', group='진입주문 메세지입력', inline='5')
buyOrderid5 = input.string(title='롱 진입5', defval='', group='진입주문 메세지입력', inline='6')
sellOrderid = input.string(title='숏 진입1', defval='', group='진입주문 메세지입력', inline='2')
sellOrderid2 = input.string(title='숏 진입2', defval='', group='진입주문 메세지입력', inline='3')
sellOrderid3 = input.string(title='숏 진입3', defval='', group='진입주문 메세지입력', inline='4')
sellOrderid4 = input.string(title='숏 진입4', defval='', group='진입주문 메세지입력', inline='5')
sellOrderid5 = input.string(title='숏 진입5', defval='', group='진입주문 메세지입력', inline='6')

// 종료주문메세지입력
buycloseOrderid = input.string(title='롱 전체종료', defval='', group='종료주문 메세지입력', inline='1')
sellcloseOrderid = input.string(title='숏 전체종료', defval='', group='종료주문 메세지입력', inline='1')

longCondition = 0, shortCondition = 0

if(close[1] < close)
    longCondition := 1
else
    longCondition := 0
if(close[1] > close)
    shortCondition := 1
else
    shortCondition := 0

if start_trade
    if Alarm_Alert
        if strategy.position_size == 0
            if (longCondition == 1)
                strategy.entry("buy1", strategy.long, alert_message = buyOrderid)

            if (shortCondition == 1)
                strategy.entry("sell1", strategy.short, alert_message = sellOrderid)

        if strategy.position_size > 0
            if (longCondition == 1)
                if (strategy.opentrades == 1) and (mul_input == 2 or mul_input == 3 or mul_input == 4 or mul_input == 5)
                    strategy.entry("buy2", strategy.long, alert_message = buyOrderid2)  
                if (strategy.opentrades == 2) and (mul_input == 3 or mul_input == 4 or mul_input == 5)
                    strategy.entry("buy3", strategy.long, alert_message = buyOrderid3)  
                if (strategy.opentrades == 3) and (mul_input == 4 or mul_input == 5)
                    strategy.entry("buy4", strategy.long, alert_message = buyOrderid4)  
                if (strategy.opentrades == 4) and (mul_input == 5)
                    strategy.entry("buy5", strategy.long, alert_message = buyOrderid5)  

        if strategy.position_size < 0
            if (shortCondition == 1)
                if (strategy.opentrades == 1) and (mul_input == 2 or mul_input == 3 or mul_input == 4 or mul_input == 5)
                    strategy.entry("sell2", strategy.short, alert_message = sellOrderid2)  
                if (strategy.opentrades == 2) and (mul_input == 3 or mul_input == 4 or mul_input == 5)
                    strategy.entry("sell3", strategy.short, alert_message = sellOrderid3)  
                if (strategy.opentrades == 3) and (mul_input == 4 or mul_input == 5)
                    strategy.entry("sell4", strategy.short, alert_message = sellOrderid4)
                if (strategy.opentrades == 4) and (mul_input == 5)
                    strategy.entry("sell5", strategy.short, alert_message = sellOrderid5)

        if (longCondition == 1 and strategy.position_size > 0)
            if mul_input == 1 and strategy.opentrades == 1
                strategy.close_all(comment='롱전체종료', alert_message = buycloseOrderid)
            if mul_input == 2 and strategy.opentrades == 2
                strategy.close_all(comment='롱전체종료', alert_message = buycloseOrderid)
            if mul_input == 3 and strategy.opentrades == 3
                strategy.close_all(comment='롱전체종료', alert_message = buycloseOrderid)
            if mul_input == 4 and strategy.opentrades == 4
                strategy.close_all(comment='롱전체종료', alert_message = buycloseOrderid)
            if mul_input == 5 and strategy.opentrades == 5
                strategy.close_all(comment='롱전체종료', alert_message = buycloseOrderid)
        if (shortCondition == 1 and strategy.position_size < 0)
            if mul_input == 1 and strategy.opentrades == 1
                strategy.close_all(comment='숏전체종료', alert_message = sellcloseOrderid)
            if mul_input == 2 and strategy.opentrades == 2
                strategy.close_all(comment='숏전체종료', alert_message = sellcloseOrderid)
            if mul_input == 3 and strategy.opentrades == 3
                strategy.close_all(comment='숏전체종료', alert_message = sellcloseOrderid)
            if mul_input == 4 and strategy.opentrades == 4
                strategy.close_all(comment='숏전체종료', alert_message = sellcloseOrderid)
            if mul_input == 5 and strategy.opentrades == 5
                strategy.close_all(comment='숏전체종료', alert_message = sellcloseOrderid)
    else if Alarm_TVExtbot
        if strategy.position_size == 0
            if (longCondition == 1)
                strategy.entry("buy1", strategy.long, alert_message = '롱 1차 진입 ?? TVM:{"orderid":"' + buyOrderid + '","memo":"' + account + '","token":"' + token + '"}:MVT')

            if (shortCondition == 1)
                strategy.entry("sell1", strategy.short, alert_message = '숏 1차 진입 ?? TVM:{"orderid":"' + sellOrderid + '","memo":"' + account + '","token":"' + token + '"}:MVT')

        if strategy.position_size > 0
            if (longCondition == 1)
                if (strategy.opentrades == 1) and (mul_input == 2 or mul_input == 3 or mul_input == 4 or mul_input == 5)
                    strategy.entry("buy2", strategy.long, alert_message = '롱 2차 진입 ?? TVM:{"orderid":"' + buyOrderid2 + '","memo":"' + account + '","token":"' + token + '"}:MVT')  
                if (strategy.opentrades == 2) and (mul_input == 3 or mul_input == 4 or mul_input == 5)
                    strategy.entry("buy3", strategy.long, alert_message = '롱 3차 진입 ?? TVM:{"orderid":"' + buyOrderid3 + '","memo":"' + account + '","token":"' + token + '"}:MVT')  
                if (strategy.opentrades == 3) and (mul_input == 4 or mul_input == 5)
                    strategy.entry("buy4", strategy.long, alert_message = '롱 4차 진입 ?? TVM:{"orderid":"' + buyOrderid4 + '","memo":"' + account + '","token":"' + token + '"}:MVT')  
                if (strategy.opentrades == 4) and (mul_input == 5)
                    strategy.entry("buy5", strategy.long, alert_message = '롱 5차 진입 ?? TVM:{"orderid":"' + buyOrderid5 + '","memo":"' + account + '","token":"' + token + '"}:MVT') 

        if strategy.position_size < 0
            if (shortCondition == 1)
                if (strategy.opentrades == 1) and (mul_input == 2 or mul_input == 3 or mul_input == 4 or mul_input == 5)
                    strategy.entry("sell2", strategy.short, alert_message = '숏 2차 진입 ?? TVM:{"orderid":"' + sellOrderid2 + '","memo":"' + account + '","token":"' + token + '"}:MVT')  
                if (strategy.opentrades == 2) and (mul_input == 3 or mul_input == 4 or mul_input == 5)
                    strategy.entry("sell3", strategy.short, alert_message = '숏 3차 진입 ?? TVM:{"orderid":"' + sellOrderid3 + '","memo":"' + account + '","token":"' + token + '"}:MVT')  
                if (strategy.opentrades == 3) and (mul_input == 4 or mul_input == 5)
                    strategy.entry("sell4", strategy.short, alert_message = '숏 4차 진입 ?? TVM:{"orderid":"' + sellOrderid4 + '","memo":"' + account + '","token":"' + token + '"}:MVT')
                if (strategy.opentrades == 4) and (mul_input == 5)
                    strategy.entry("sell5", strategy.short, alert_message = '숏 5차 진입 ?? TVM:{"orderid":"' + sellOrderid5 + '","memo":"' + account + '","token":"' + token + '"}:MVT')
        
        if (longCondition == 1 and strategy.position_size > 0)
            if mul_input == 1 and strategy.opentrades == 1
                strategy.close_all(comment='롱전체종료', alert_message = '롱 종료 ?⛔TVM:{"orderid":"' + buycloseOrderid + '","memo":"' + account + '","token":"' + token + '"}:MVT')
            if mul_input == 2 and strategy.opentrades == 2
                strategy.close_all(comment='롱전체종료', alert_message = '롱 종료 ?⛔TVM:{"orderid":"' + buycloseOrderid + '","memo":"' + account + '","token":"' + token + '"}:MVT')
            if mul_input == 3 and strategy.opentrades == 3
                strategy.close_all(comment='롱전체종료', alert_message = '롱 종료 ?⛔TVM:{"orderid":"' + buycloseOrderid + '","memo":"' + account + '","token":"' + token + '"}:MVT')
            if mul_input == 4 and strategy.opentrades == 4
                strategy.close_all(comment='롱전체종료', alert_message = '롱 종료 ?⛔TVM:{"orderid":"' + buycloseOrderid + '","memo":"' + account + '","token":"' + token + '"}:MVT')
            if mul_input == 5 and strategy.opentrades == 5
                strategy.close_all(comment='롱전체종료', alert_message = '롱 종료 ?⛔TVM:{"orderid":"' + buycloseOrderid + '","memo":"' + account + '","token":"' + token + '"}:MVT')            
        if (shortCondition == 1 and strategy.position_size < 0)
            if mul_input == 1 and strategy.opentrades == 1
                strategy.close_all(comment='숏전체종료', alert_message = '숏 종료 ?⛔TVM:{"orderid":"' + sellcloseOrderid + '","memo":"' + account + '","token":"' + token + '"}:MVT')
            if mul_input == 2 and strategy.opentrades == 2
                strategy.close_all(comment='숏전체종료', alert_message = '숏 종료 ?⛔TVM:{"orderid":"' + sellcloseOrderid + '","memo":"' + account + '","token":"' + token + '"}:MVT')
            if mul_input == 3 and strategy.opentrades == 3
                strategy.close_all(comment='숏전체종료', alert_message = '숏 종료 ?⛔TVM:{"orderid":"' + sellcloseOrderid + '","memo":"' + account + '","token":"' + token + '"}:MVT')
            if mul_input == 4 and strategy.opentrades == 4
                strategy.close_all(comment='숏전체종료', alert_message = '숏 종료 ?⛔TVM:{"orderid":"' + sellcloseOrderid + '","memo":"' + account + '","token":"' + token + '"}:MVT')
            if mul_input == 5 and strategy.opentrades == 5
                strategy.close_all(comment='숏전체종료', alert_message = '숏 종료 ?⛔TVM:{"orderid":"' + sellcloseOrderid + '","memo":"' + account + '","token":"' + token + '"}:MVT')

  
```

> Detail

https://www.fmz.com/strategy/441079

> Last Modified

2024-02-05 14:09:14
