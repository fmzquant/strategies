
> Name

定投策略带止盈

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|Investment Amount|
|v_input_2|0|Investment Period: W|M|
|v_input_3|0.2|Stop loss percentage|
|v_input_4|0.1|Take profit percentage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-18 00:00:00
end: 2023-10-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=4
strategy("Weekly Dollar Cost Averaging", overlay=true,pyramiding = 5)

// 定义投资金额和投资周期
investmentAmount = input(100, title="Investment Amount")
investmentPeriod = input("W", title="Investment Period", options=["W", "M"])
// Stop loss percentage
stopLossPercentage = input(0.2, title="Stop loss percentage")
// Take profit percentage
takeProfitPercentage = input(0.1, title="Take profit percentage")

// Calculate stop loss and take profit levels
stopLossLevel = strategy.position_avg_price * (1 - stopLossPercentage/100)
takeProfitLevel = strategy.position_avg_price * (1 + takeProfitPercentage/100)



// 定义买入条件
buyCondition = investmentPeriod == "W" ? change(strategy.position_size) >= 0 : change(strategy.position_size) <= 0

// 计算买入数量
buyQuantity = buyCondition ? investmentAmount / close : 0

// 执行买入操作
strategy.entry("Buy", strategy.long, qty=buyQuantity)
//止盈条件
if (close>= takeProfitLevel) and (strategy.position_size > 0) 
     strategy.close_all()
else
if(close<=stopLossLevel) and (strategy.position_size<0)
     strategy.close_all()


// 打印买入信息
plotshape(buyCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="Buy")

// 打印持仓信息
plot(strategy.position_size > 0 ? strategy.position_size : na, title="Position Size", color=color.blue, style=plot.style_line, linewidth=2)

```

> Detail

https://www.fmz.com/strategy/430180

> Last Modified

2023-10-25 19:53:58
