
> 策略名称

rest 版OKEX跨期对冲策略（教学）

> 策略作者

小小梦

> 策略描述

## 极简版OKEX跨期对冲策略（教学）
   
  ![IMG](https://www.fmz.com/upload/asset/16f1d9f01f17d547a55c.png)

  - 只做正套，反套可以修改下，合约调换一下，即是反套。

  - 添加两个 交易所对象，第一个季度，第二个当周。

  - 精简了所有能简化的代码，优化空间还很大，教学策略谨慎实盘，跨期有一定风险。

  - 欢迎反馈BUG。


  ### 教学策略，实盘慎用。
  ### 教学策略，实盘慎用。
  ### 教学策略，实盘慎用。

> 策略参数



|参数|默认值|描述|
|----|----|----|
|_Begin|true|起始差价|
|_Add|true|差价间距|
|_Profit|true|平仓差价利润|
|_Count|10|节点数量|
|_ContractNum|true|节点下单量|


> 源码 (javascript)

``` javascript
function Hedge (isOpen, priceA, priceB) {
    exchanges[0].SetDirection(isOpen ? "sell" : "closesell")
    exchanges[1].SetDirection(isOpen ? "buy" : "closebuy");
    (function (routineA, routineB) {
        Log(routineA.wait(), routineB.wait(), priceA, priceB)
    })(exchanges[0].Go(isOpen ? "Sell" : "Buy", priceA, _ContractNum), exchanges[1].Go(isOpen ? "Buy" : "Sell", priceB, _ContractNum));
}

var slidePrice = 5
function main () {
    var tickerA, tickerB 
    var arr = []
    for (var i = 0 ; i < _Count ; i++) {
        arr.push({open: _Begin + i * _Add, cover: _Begin + i * _Add - _Profit, isHold: false})
    }
    exchanges[0].SetContractType("quarter")
    exchanges[1].SetContractType("this_week")
    while (1) {
        var tab = {type: "table", title: "状态", cols: ["节点信息"], rows: []}
        tickerA = exchanges[0].GetTicker()
        tickerB = exchanges[1].GetTicker()

        if (tickerA && tickerB) {
            $.PlotLine("差价:A所-B所", tickerA.Last - tickerB.Last)
            for (var j = 0 ; j < arr.length; j++) {
                if (tickerA.Buy - tickerB.Sell > arr[j].open && !arr[j].isHold) {
                    Hedge(true, tickerA.Buy - slidePrice, tickerB.Sell + slidePrice)
                    arr[j].isHold = true
                }
                if (tickerA.Sell - tickerB.Buy < arr[j].cover && arr[j].isHold) {
                    Hedge(false, tickerA.Sell + slidePrice, tickerB.Buy - slidePrice)
                    arr[j].isHold = false 
                }
                tab.rows.push([JSON.stringify(arr[j])])
            }
        }
        LogStatus(_D(), "\n `" + JSON.stringify(tab) + "`")
        Sleep(500)
    }
}
```

> 策略出处

https://www.fmz.com/strategy/144406

> 更新时间

2019-04-17 16:58:51
