
> Name

定投止盈脚本

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|最大损失百分比|
|v_input_2|3|止盈值|


> Source (PineScript)

``` pinescript
//@version=4

strategy("定投止盈", overlay=true)

//定义最大损失百分比
maxLossPercent = input(title="最大损失百分比", type=float,defval=5)

//定义止盈数字
stopProfitVal = input(title="止盈值", type=float, defval=3) 

//主力合约做多头头寸
longCondition = crossover(open, close) //主力合约以开盘价横向突破收盘价做多

if (longCondition)
    strategy.entry("Long", strategy.long, comment="Open Long") 

//止损条件
//if (strategy.position_size > 0)  
    //strategy.exit("Exit long", stop=strategy.position_avg_price * (1 - maxLossPercent/100)) 

//止盈条件
profitExit = strategy.position_avg_price + stopProfitVal
if (strategy.position_size > 0)
     strategy.exit("Exit long", limit = profitExit)

```

> Detail

https://www.fmz.com/strategy/396182

> Last Modified

2023-01-29 09:49:34
