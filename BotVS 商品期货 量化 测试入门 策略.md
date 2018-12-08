
> 策略名称

BotVS 商品期货 量化 测试入门 策略

> 策略作者

小小梦

> 策略描述

知乎专栏 文章：
via.  https://zhuanlan.zhihu.com/p/30880706

> 策略参数



|参数|默认值|描述|
|----|----|----|
|_Interval|500|轮询间隔|
|_StrContractType|rb1801|测试合约代码|




|按钮|默认值|描述|
|----|----|----|
|changeSymbol|MA801|更改商品期货合约代码|
|OPEN_LONG|true|开多|
|OPEN_SHORT|true|开空|
|COVER|true|按数量平仓|
|GET_PNEDING|__button__|获取当前合约未完成的订单|
|GET_ORDER|空|获取当前合约指定id 的订单|
|GET_POSITION|空|获取当前合约持仓信息|
|GET_ALL_POSITION|__button__|获取所有合约持仓信息|
|CANCEL_ORDER|空|取消订单|
|JS_CODE|Log("call js code")|调用 JS 代码|


> 源码 (javascript)

``` javascript
// 商品期货 测试 程序
/*
1、 行情部分测试
2、 交易 测试
3、 交互界面

*/
// var _Interval = 500
// var _StrContractType = "rb1801"


//
var CONNECTED = 1
var NOTCONNECTED = 2
var _TableObj = {
    type : "table",
    title : "test",
    cols : ["value"],
    rows : [],
}
var _templeteObj = null
// var _isFirst = true
var _chart = null       // 配置对象 ，并非控制对象
var _chartObj = null
var _LogStatusMessage = ""

function E(obj) {
    if(!obj){
        return obj
    }

    var cloneObj = function(obj) { // 深拷贝 对象函数
        var str, newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        } else if (JSON) {
            str = JSON.stringify(obj); //系列化对象
            newobj = JSON.parse(str); //还原
        } else {
            for (var i in obj) {
                newobj[i] = typeof obj[i] === 'object' ?
                    cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    }
    
    if(obj && typeof(obj) == "object" && typeof(obj.Info) !== "undefined"){
        var newObj = cloneObj(obj)
        delete newObj.Info
        return newObj
    }else if(typeof(obj.length) == "number"){
        ///*
        var newArray = []
        for(var n = 0; n < obj.length; n++){
            newArray.push(E(obj[n]))
        }
        return newArray
        //*/
        /*
        var newObj = cloneObj(obj)
        delete newObj.Info
        return newObj
        */
    }else{
        // Log(obj, "is not object or not have attribute 'Info'")
        return obj
    }
}

function onTick(symbol){
    if(!$.IsTrading(symbol)){
        _LogStatusMessage = symbol + " 不在交易时间段内！" + "#FF0000"
        return
    }else{
        _LogStatusMessage = symbol + " 在交易时间段！"
    }

    var contractTypeInfo = exchange.SetContractType(symbol)
    if(!contractTypeInfo){
        return
    }

    var account = exchange.GetAccount()
    var ticker = exchange.GetTicker()
    var records = exchange.GetRecords()
    var depth = exchange.GetDepth()
    
    if(!account || !ticker || !depth || !records || records.length < 2){
        return
    }
    
    _TableObj.rows = []   // 每次清空
    _TableObj.rows.push([JSON.stringify(E(contractTypeInfo))])
    _TableObj.rows.push([JSON.stringify(E(account))])
    _TableObj.rows.push([JSON.stringify(E(ticker))])
    _TableObj.rows.push([JSON.stringify(E(records[records.length - 1])) + JSON.stringify(E(records[records.length - 2])) + " records.length : " + records.length])
    _TableObj.rows.push([JSON.stringify(E(depth.Asks[0])) + JSON.stringify(E(depth.Bids[0])) + "Asks`s length is:" + depth.Asks.length + "Bids`s length is:" + depth.Bids.length])

    _chartObj = $.PlotRecords(records, "K线")

    /*
    if(_isFirst){
        _chart.reset()
        _isFirst = false
    }
    */
}

function Custom_GetPositons(symbol){
    var positions = exchange.GetPosition()
    if(!positions){
        Log("Custom_GetPositons failed", positions)
    }
    if(typeof(symbol) != "undefined"){
        Log("PD_LONG:", E(_templeteObj.GetPosition(symbol, PD_LONG, positions)))
        Log("PD_SHORT:", E(_templeteObj.GetPosition(symbol, PD_SHORT, positions)))
        Log("positions:", E(positions))
    }else{
        Log("positions:", E(positions))
    }
}

function Custom_Buy(symbol, amount){
    // exchange.SetDirection("buy")
    if(!$.IsTrading(symbol)){
        Log(symbol, " 不在交易时间段内，禁止下单！")
        return
    }
    var tradeInfo = _templeteObj.OpenLong(symbol, amount)
    Log(tradeInfo)
}

function Custom_Pending_Buy(diffPrice, amount, direction){
    if(!$.IsTrading(_StrContractType)){
        Log(_StrContractType, " 不在交易时间段内，禁止下单！")
        return
    }
    exchange.SetContractType(_StrContractType)
    var ticker = _C(exchange.GetTicker)
    exchange.SetDirection(direction)
    var id = exchange.Buy(ticker.Last - diffPrice, amount)
    Log("id:", id)
}

function Custom_Pending_Sell(diffPrice, amount, direction){
    if(!$.IsTrading(_StrContractType)){
        Log(_StrContractType, " 不在交易时间段内，禁止下单！")
        return
    }
    exchange.SetContractType(_StrContractType)
    var ticker = _C(exchange.GetTicker)
    exchange.SetDirection(direction)
    var id = exchange.Sell(ticker.Last + diffPrice, amount) 
    Log("id:", id)
}

function Custom_Sell(symbol, amount){
    // exchange.SetDirection("sell")
    if(!$.IsTrading(symbol)){
        Log(symbol, " 不在交易时间段内，禁止下单！")
        return
    }
    var tradeInfo = _templeteObj.OpenShort(symbol, amount)
    Log(tradeInfo)
}

function Custom_Cover(symbol, amount){
    if(!$.IsTrading(symbol)){
        Log(symbol, " 不在交易时间段内，禁止下单！")
        return
    }
    _templeteObj.Cover(symbol, amount)
}

function ChangeContractType(symbol){
    _StrContractType = symbol
    Log("测试 合约更改为：", _StrContractType)
    Log("清空图表！", "#FF0000")
    if(_chartObj){
        _chartObj.reset()
        $.SetPreBarTime(0)
    }
}

function Custom_GetPendingOrders(symbol){
    var orders = _C(exchange.GetOrders)
    if(orders.length == 0){
        Log(E(orders))
    }
    for(var i = 0 ; i < orders.length ; i++){
        if(typeof(symbol) == "undefined"){
            Log(E(orders[i]))
        }else{
            if(symbol == orders[i].ContractType){
                Log(E(orders[i]))
            }else if(i == orders.length - 1){
                Log(E(orders))
            }
        }
    }
}

function Custom_GetOrder(symbol, id){
    _C(exchange.SetContractType, symbol)
    var order = exchange.GetOrder(id)
    if(!order){
        Log("GetOrder failed, the order is", order)
        return false
    }else{
        Log(E(order))
    }
}

function Custom_CancelOrder(symbol, id){
    Log("取消的订单 id 是：", symbol, id)
    if(typeof(id) == "undefined"){
        id = symbol
        symbol = _StrContractType
    }

    if(!$.IsTrading(symbol)){
        Log(symbol, " 不在交易时间段内，禁止下单！")
        return
    }

    exchange.CancelOrder(id)  // CancelOrder(orderId)
}

function main(){
    LogReset()
    Log("启动！")

    _chart = $.GetCfg()
    Chart(_chart).reset()

    SetErrorFilter("login");
    var connectState = null
    _templeteObj = $.NewPositionManager()

    while(true){
        if(exchange.IO("status")){
            onTick(_StrContractType)       
            connectState = CONNECTED     
        }else{
            
            connectState = NOTCONNECTED
        }
        
        var cmd = GetCommand()
        if(cmd){
            Log("接收到命令：", cmd, "#0000FF")
            var array_cmd = cmd.split(':')
            if(array_cmd.length > 2){
                for(var idx = 2; idx < array_cmd.length; idx++){
                    array_cmd[1] += (':' + array_cmd[idx])
                }
                array_cmd = [array_cmd[0], array_cmd[1]]       // 重新赋值
            }
        
            if(array_cmd.length == 1){                     // button
                switch(array_cmd[0]){
                    case "GET_PNEDING" :
                        Custom_GetPendingOrders(_StrContractType)
                        break
                    case "GET_ALL_POSITION" :
                        Custom_GetPositons()
                        break
                    default :
                        Log("unknow command:" + array_cmd, "#FF0000")
                }
            }else if(array_cmd.length == 2){ // other
                switch(array_cmd[0]){
                    case "OPEN_LONG" :
                        var amount = parseInt(array_cmd[1])
                        Custom_Buy(_StrContractType, amount)
                        break
                    case "OPEN_SHORT":
                        var amount = parseInt(array_cmd[1])
                        Custom_Sell(_StrContractType, amount)
                        break
                    case "COVER" :
                        var amount = parseInt(array_cmd[1])
                        Custom_Cover(_StrContractType, amount)
                        break
                    case "GET_ORDER" :
                        Custom_GetOrder(_StrContractType, array_cmd[1])
                        break
                    case "GET_POSITION" :
                        if(array_cmd[1] == "空"){
                            Custom_GetPositons(_StrContractType)
                        }else{
                            Custom_GetPositons(array_cmd[1])
                        }
                        break
                    case "changeSymbol" :
                        ChangeContractType(array_cmd[1]) 
                        break
                    case "CANCEL_ORDER" :   
                        // Log("CANCEL_ORDER:", array_cmd)            
                        Custom_CancelOrder(array_cmd[1])
                        break
                    case "JS_CODE" :
                        var js = cmd.split(':', 2)[1];  // 分割 返回的消息 字符串， 限制返回2个， 把索引为1的 元素 赋值给 名为js 的变量 
                        Log("执行调试代码:", js);         // 输出 执行的代码
                        try {                           // 异常检测
                            eval(js);                   // 执行 eval函数， 该函数执行传入的参数（代码）。
                        } catch(e) {                    // 抛出异常
                            Log("Exception", e);        // 输出错误信息
                        }
                        break
                    default :
                        Log("unknow command:" + array_cmd, "#FF0000")
                }
            }
        }
        var strConnectState = connectState == CONNECTED ? "已经连接！" : "未连接！"
        LogStatus(_D(), strConnectState, _LogStatusMessage, '\n`' + JSON.stringify(_TableObj) + '`' + '\n' + 
            'Custom_CancelOrder("", "")    // symbol, id' + '\n' + 
            'Custom_Pending_Buy( , , "")    // diffPrice, amount, direction' + '\n' +
            'Custom_Pending_Sell( , , "")    // diffPrice, amount, direction' + '\n' )
        Sleep(_Interval)
    }
}
```

> 策略出处

https://www.fmz.com/strategy/59120

> 更新时间

2017-11-09 13:41:44
