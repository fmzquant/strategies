
> 策略名称

websocket 版OKEX跨期对冲策略（教学）

> 策略作者

小小梦

> 策略描述

## 极简版OKEX跨期对冲策略（教学）
   
   - 实盘截图：
     ![IMG](https://www.fmz.com/upload/asset/16f45ddc33e43f3248db.png) 

  - 只做正套，反套可以修改下，合约调换一下，即是反套。

  - 添加两个 交易所对象，第一个季度，第二个当周。

  - 精简了所有能简化的代码，优化空间还很大，教学策略谨慎实盘，跨期有一定风险。

  - 使用 对手价下单。

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
|_Instrument_id_A|LTC-USD-190628|A交易所季度合约ID|
|_Instrument_id_B|LTC-USD-190426|B交易所当周合约ID|


> 源码 (javascript)

``` javascript
function Hedge (isOpen, retSetA, retSetB) {
    exchanges[0].SetDirection(isOpen ? "sell" : "closesell")
    exchanges[1].SetDirection(isOpen ? "buy" : "closebuy");
    (function (routineA, routineB) {
        Log(routineA.wait(), routineB.wait(), retSetA, retSetB)
    })(exchanges[0].Go(isOpen ? "Sell" : "Buy", -1, _ContractNum), exchanges[1].Go(isOpen ? "Buy" : "Sell", -1, _ContractNum))
}

function main () {
    var param = {"op": "subscribe", "args": ["futures/ticker:" + _Instrument_id_A, "futures/ticker:" + _Instrument_id_B]}
    var client = Dial("wss://real.okex.com:8443/ws/v3|compress=gzip_raw&mode=recv&reconnect=true&payload=" + JSON.stringify(param))
    client.write(JSON.stringify(param))
    var tickerA, tickerB 
    var arr = []
    for (var i = 0 ; i < _Count ; i++) {
        arr.push({open: _Begin + i * _Add, cover: _Begin + i * _Add - _Profit, isHold: false})
    }
    while (1) {
        var tab = {type: "table", title: "状态", cols: ["节点信息"], rows: []}
        Sleep(10) 
        var ret = client.read(-2)
        if (!ret || ret == "") {
            continue
        }

        var obj = null
        try {
            obj = JSON.parse(ret)
        } catch (e) {
            Log(e)
            continue
        }

        if (obj.table == "futures/ticker" && obj.data[0].instrument_id == _Instrument_id_A) {   
            tickerA = obj.data[0]
        } else if (obj.table == "futures/ticker" && obj.data[0].instrument_id == _Instrument_id_B) {
            tickerB = obj.data[0]
        }

        if (tickerA && tickerB) {
            $.PlotLine(tickerA.instrument_id + "-" + tickerB.instrument_id, tickerA.last - tickerB.last)
            for (var j = 0 ; j < arr.length; j++) {
                if (tickerA.best_bid - tickerB.best_ask > arr[j].open && !arr[j].isHold) {   
                    Hedge(true, exchanges[0].SetContractType("quarter"), exchanges[1].SetContractType("this_week"))
                    arr[j].isHold = true
                }
                if (tickerA.best_ask - tickerB.best_bid < arr[j].cover && arr[j].isHold) {
                    Hedge(false, exchanges[0].SetContractType("quarter"), exchanges[1].SetContractType("this_week"))
                    arr[j].isHold = false 
                }
                tab.rows.push([JSON.stringify(arr[j])])
            }
        }
        LogStatus(_D(), "\n `" + JSON.stringify(tab) + "`")
    }
}
```

> 策略出处

https://www.fmz.com/strategy/144378

> 更新时间

2020-04-27 16:58:34
