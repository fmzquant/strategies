
> Name

测试-关于使用kdj与vol量筛选可能会涨的币种

> Author

xxs1xxs1



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|MarginLevel|20|MarginLevel|
|amountScale|3|量精度|
|priceScale|5|价格精度|
|bet|10|订单保证金|




|Button|Default|Description|
|----|----|----|
|已经清算的数据|__button__|已经清算的数据|
|清除持久数据数据|__button__|清除持久数据数据|


> Source (javascript)

``` javascript
/*backtest
start: 2021-05-1 00:00:00
end: 2021-05-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
args: [["OpType",1]]
*/

//各功能测试
exchange.SetContractType("swap") //合约设置
// exchange.SetCurrency("TRX_USDT");
//    exchange.SetMarginLevel(20) //合约倍数设置 

//exchange.IO("trade_margin")
//exchange.IO("currency", "STPT_USDT")
var account = _C(exchange.GetAccount) //帐户信息
var log_profit = 0
var log_profit_intervel = 1000 * 60 * 5
var symbol_list = [] //"1.5倍vol,kdj与ma多头"                //index位置详解 0=>交易对  1=>价格精度 2=>量精度 3=>注释 4=>订单ID 5=>当前币种最大亏损 6=>.....            苦于数组严谨性。除了前面固定数据有用后面发生意外不影响？？？？
var symbol_list1 = [] //"3倍vol,当前涨幅4%或者vol5倍"
var symbol_list2 = [] //"三连涨"
var order_list = []
var num = 0 //记录补仓数量
var loss = 0.6
var loss_m = 0

if (_G("symbol")) {
    symbol_list = _G("symbol")
    order_list = _G("orderlist")
    Log("上一次数据", symbol_list)
    Log("上一次数据完成数据", order_list)
}

// 撤单函数
function CancelPendingOrders() {
    Sleep(1000); // 休眠 1秒
    var ret = false;
    while (true) {
        var orders = null;
        // 持续获取未成交订单数组，如果返回异常，则继续获取
        while (!(orders = exchange.GetOrders())) {
            Sleep(1000); // 休眠 1秒
        }
        if (orders.length == 0) { // 如果订单数组为空
            return ret; // 返回撤单状态
        }
        for (var j = 0; j < orders.length; j++) { // 遍历未成交订单数组
            exchange.CancelOrder(orders[j].Id, orders[j]); // 依次取消未成交订单
            ret = true;
            if (j < (orders.length - 1)) {
                Sleep(1000); // 休眠 1秒
            }
        }
    }
}

function symbols() {


    log_profit_intervel = 1000 * 60 * 5


    if (Date.now() - log_profit > log_profit_intervel && !IsVirtual()) { //全部交易对 
        log_profit = Date.now()
        var symbol = JSON.parse(HttpQuery("https://www.binance.com/fapi/v1/exchangeInfo"))
        let symbol_all = []
        symbol.symbols.forEach(function(v, k, arr) {
            if (v.quoteAsset == "USDT" && v.contractType == "PERPETUAL") {
                let str = v.symbol.split("USDT", 1)
                str = str + "_USDT"
                symbol_all.push([str, v.pricePrecision, v.quantityPrecision])
            }
        })

        // exchange.SetCurrency("TRX_USDT");                        //交易对设置
        //exchange.SetPrecision(priceScale, amountScale)            //精度设置


        for (let i = 0; i < symbol_all.length; i++) {

            if (symbol_list.length > 0) {

                let flag = false
                symbol_list.forEach(function(v, k, arr) {
                    //   Log(v[0],symbol_all[i][0])
                    if (v[0] == symbol_all[i][0]) {
                        flag = true;
                    }
                })
                if (flag) {
                    continue;
                }
            }



            exchange.SetCurrency(symbol_all[i][0])
            //  exchange.SetCurrency("DOGE_USDT")
            exchange.SetPrecision(symbol_all[i][1], symbol_all[i][2])


            let records = exchange.GetRecords(60 * 60 * 1)
            let kdj = TA.KDJ(records, 9, 3, 3)
            let ma7 = TA.EMA(records, 7)
            let ma25 = TA.EMA(records, 25)

            //      let records1 = exchange.GetRecords(60 * 15)
            //      let kdj1 = TA.KDJ(records1, 9, 3, 3)

            let len = records.length - 1
            let rs = records[len]
            let rs1 = records[len - 1] //上一条数据 
            //      if ((rs.Close > rs.Open && rs.Volume > rs1.Volume * 1.5 && rs.Close / rs.Open > 1.04) || (rs.Close > rs.Open && rs.Volume > rs1.Volume * 2)) 
            //     if (rs.Close > rs.Open && _Cross(kdj[0], kdj[1]) > 0 && _Cross(kdj[0], kdj[1]) < 3 && rs.Close / rs.Low < 1.03 && _Cross(kdj1[0], kdj1[1]) > 0 && _Cross(kdj1[0], kdj1[1]) < 3) 

            if (rs.Close > rs.Open && rs.Volume > rs1.Volume * 1.5 && _Cross(kdj[0], kdj[1]) > 0 && _Cross(ma7, ma25) > 0) {

                symbol_list.push([symbol_all[i][0], symbol_all[i][1], symbol_all[i][2], "多要求",0,0]) //加入数据保存

            }
            if ((rs.Close > rs.Open && rs.Volume > rs.Volume * 1.5 && rs.Close / rs.Open > 1.02) || (rs.Close > rs.Open && rs.Volume > rs1.Volume * 2)) {
                symbol_list1.push([symbol_all[i][0], symbol_all[i][1], symbol_all[i][2]]) //加入数据保存
            }
            if (records[len - 2].Close > records[len - 2].Open && records[len - 1].Close > records[len - 1].Open && records[len].Close > records[len].Open) {
                symbol_list.push([symbol_all[i][0], symbol_all[i][1], symbol_all[i][2], "三连涨",0,0]) //加入数据保存
            }

            Sleep(100)
        }
        Log("一般要求", symbol_list)
        Log("可能大涨", symbol_list1)
        //      Log("三连涨", symbol_list2)

    }
}







function main() {


    var increase = [] //加仓设置
    if (IsVirtual()) { //模拟盘需要，实盘自动忽略
        symbol_list.push([exchange.GetCurrency(), priceScale, amountScale])
    }

    while (1) {
        symbols()
        //       Log("开始", symbol_list)


        if (symbol_list.length > 0 && 1 == 1) {

            for (let i = 0; i < symbol_list.length; i++) {
                //考虑直接买入

                if (symbol_list[i][0] == "ADA_USDT" || symbol_list[i][0] == "BTCDOM_USDT") { //设置不想做的交易对
                    continue;
                }
                if (!IsVirtual()) {
                    exchange.SetCurrency(symbol_list[i][0]); //交易对设置
                }
                
                exchange.SetPrecision(symbol_list[i][1], symbol_list[i][2]) //精度设置

                exchange.SetMarginLevel(MarginLevel) //合约倍数

                let records = exchange.GetRecords(60 * 60 * 1)
                let kdj = TA.KDJ(records, 9, 3, 3)
                let account = exchange.GetAccount()
                let position = _C(exchange.GetPosition) //持仓信息
                let Amount = position[0] ? position[0].Amount : 0
                let ticker = _C(exchange.GetTicker); // 获取 Tick 数据

            let ma7 = TA.EMA(records, 7)
            let ma25 = TA.EMA(records, 25)

                let money = bet * MarginLevel //买入数量为 2U的商品                


                if (_N(money / ticker.Sell, symbol_list[i][2]) == 0) {
                    continue;
                }

                let orderid //下单后第一时间得到订单ID
                let pos //临时获取持仓信息
                //   Log(symbol_list[i])
                if (typeof(symbol_list[i][4]) != "undefined" && symbol_list[i][4] > 0 ) {
                    let exid = exchange.GetOrder(symbol_list[i][4])
                    if (exid && exid.Status) {

                        Log(symbol_list[i],"-----盈利------")
                        
                        
                        let id = symbol_list.splice(i, 1) //清除数据防止二次买入
                        Log(id[0])
                        id[0].push("盈利", "技术有限")
                        order_list.push(id[0])
                    CancelPendingOrders() //清理无效定单
                        
                        if (IsVirtual()) { //模拟盘需要，实盘自动忽略
                            symbol_list.push([exchange.GetCurrency(), priceScale, amountScale])
                        }

                    }
                    

                }


                if (!position[0] && _Cross(kdj[0], kdj[1]) > 0 && _Cross(ma7,ma25)>0) { //新开仓 _Cross(kdj[0], kdj[1]) < 4 &&
                    CancelPendingOrders() //清理无效定单
                    
                    exchange.SetDirection("buy")
                    exchange.Buy(-1, money / ticker.Sell, symbol_list[i], "开仓价:", ticker.Last, "#ccff00")

                    Sleep(100)
                    CancelPendingOrders() //清理无效定单
                    pos = exchange.GetPosition()
                    if(pos[0]){
                    exchange.SetDirection("closebuy")
                    orderid = exchange.Sell(_N(pos[0].Price * 1.01,symbol_list[i][1]), pos[0].Amount, "预挂单111111111111111111", "持仓数量:", pos[0].Amount, "| 浮动亏盈:", pos[0].Profit, "| Margin:", pos[0].Margin, "| 现有资金:", account.Balance, "| 持仓均价:", pos[0].Price, "-------|", loss_m, symbol_list[i], "#0000ff")


            if(orderid){symbol_list[i][4] = orderid}
                    }



                } else if (position[0] && position[0].Profit > position[0].Margin * 0.2) { //盈利20%就清仓 实际就是1%的涨幅 此处为20倍

                    num = 0
                    loss = 0.6
                    exchange.SetDirection("closebuy")
                    exchange.Sell(-1, position[0].Amount, "盈利", position[0].Profit, symbol_list[i], ticker.Last)

                    CancelPendingOrders() //清理无效定单

                    if (!IsVirtual()) { //实盘需要

                        let id = symbol_list.splice(i, 1) //清除数据防止二次买入
                        Log(id[0])
                        id[0].push("盈利", position[0].Profit)
                        order_list.push(id[0])
                    }



                } else if (position[0] && position[0].Margin / bet < 2.5 && position[0].Profit * -1 > position[0].Margin * 0.2) { //跌1%补一次

                    let nn = 0.2 //指数
                    if (position[0].Profit * -1 / position[0].Margin > 0.4) {
                        nn = position[0].Profit * -1 / position[0].Margin
                        Log(nn, "---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")

                    }
                    if (_N(position[0].Amount * nn, symbol_list[i][2]) == 0) {
                        continue;
                    }


                    exchange.SetDirection("buy")
                    exchange.Buy(-1, position[0].Amount * nn, "补仓", ticker.Last, symbol_list[i], "持仓数量:", position[0].Amount, "| 浮动亏盈:", position[0].Profit, "| Margin:", position[0].Margin, "| 现有资金:", account.Balance, "| 持仓均价:", position[0].Price, "-------|", loss_m, symbol_list[i], "#0000ff")



                    Sleep(100)

                    CancelPendingOrders() //清理无效定单
                    pos = exchange.GetPosition()
                    exchange.SetDirection("closebuy")
                    orderid = exchange.Sell(_N(pos[0].Price * 1.01,symbol_list[i][1]), pos[0].Amount, "预挂单", "持仓数量:", pos[0].Amount, "| 浮动亏盈:", pos[0].Profit, "| Margin:", pos[0].Margin, "| 现有资金:", account.Balance, "| 持仓均价:", pos[0].Price, "-------|", loss_m, symbol_list[i], "#0000ff")


            if(orderid){symbol_list[i][4] = orderid}




                } else if (position[0] && position[0].Margin / bet >= 2.5 && position[0].Profit * -1 > position[0].Margin * 2) { //本金亏完在补一次

                    exchange.SetDirection("buy")
                    exchange.Buy(-1, position[0].Amount * 2, "补仓", ticker.Last, symbol_list[i], "持仓数量:", position[0].Amount, "| 浮动亏盈:", position[0].Profit, "| Margin:", position[0].Margin, "| 现有资金:", account.Balance, "| 持仓均价:", position[0].Price, "-------|", loss_m, symbol_list[i], "#0000ff")

                    Sleep(100)


                    CancelPendingOrders() //清理无效定单
                    pos = exchange.GetPosition()
                    exchange.SetDirection("closebuy")
                    orderid = exchange.Sell(_N(pos[0].Price * 1.01,symbol_list[i][1]), pos[0].Amount, "预挂单", "持仓数量:", pos[0].Amount, "| 浮动亏盈:", pos[0].Profit, "| Margin:", pos[0].Margin, "| 现有资金:", account.Balance, "| 持仓均价:", pos[0].Price, "-------|", loss_m, symbol_list[i], "#0000ff")

  
            if(orderid){symbol_list[i][4] = orderid}


                }

                Sleep(300)
                if (pos && pos[0] && 1==0) {
                    //      Log(pos[0])   

                    exchange.SetDirection("buy")
                    exchange.Buy(_N(pos[0].Price * 0.9,symbol_list[i][1]), pos[0].Amount * 2, "10%预购", "当前价格", ticker.Last, "持仓数量:", pos[0].Amount, "| 浮动亏盈:", pos[0].Profit, "| Margin:", pos[0].Margin, "| 现有资金:", account.Balance, "| 持仓均价:", pos[0].Price, "-------|", loss_m, symbol_list[i], "#ff0000")

                }


                if (position[0]) loss_m = position[0].Profit < loss_m ? position[0].Profit : loss_m
                    symbol_list[i][5] = loss_m
                Sleep(300)

            }
        }
        // Log("已经清算的数据",order_list)
        //     Log("结束", symbol_list)
        _G("orderlist", order_list)
        _G("symbol", symbol_list)
        Sleep(1000 * 1)



        //      Log("辛辛苦苦过一轮")

        let cmd = GetCommand()
        if (cmd) {
            Log(cmd)
            let arr = cmd.split(":")
            if (arr[0] == "要做空") {
                dan = 100
            } else if (arr[0] == "检查symbol_list") {
                Log("没数据就是没有符合条件的", symbol_list)
            } else if (arr[0] == "已经清算的数据") {

                Log("已经清算的数据", order_list)

            } else if (arr[0] == "清除持久数据数据") {

                Log("已经清算的数据")
                _G("symbol", null)
                _G("orderlist", null)
                _G(null)

            }



        }
    }






}
```

> Detail

https://www.fmz.com/strategy/313036

> Last Modified

2021-09-09 21:39:15
