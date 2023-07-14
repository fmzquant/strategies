
> Name

币安手动开平仓工具

> Author

高频量化



> Strategy Arguments





|Button|Default|Description|
|----|----|----|
|Symbols|ETC_USDT|产品|
|CloseAll|__button__|全部平仓按钮|
|CloseBuy|true|多单平仓N个数币|
|CloseSell|true|空单平仓N个数币|
|OpenBuy|true|多单开仓(N个数币)|
|OpenSell|true|空单开仓(N个数币)|


> Source (javascript)

``` javascript
var Symbols;
//----------------------------------------
//按钮监控要频率高
function ButtonFun() {
    //-----------------手动平多-----------------------  
    var cmd = GetCommand() //获取按钮变化量
    if (cmd) {
        //按钮切换产品
        var arr = cmd.split(":")
       //exchange.SetContractType("swap") //设置是那么产品季度
       //exchange.SetCurrency(Symbols) //切换产品（默认产品）
        if(arr[0] == "Symbols"){
        exchange.SetCurrency(arr[1]) //切换产品（默认产品）  
        Symbols=arr[1]
        Log("交易产品已经切换为：",arr[1])
        }
        if (arr[0] == "CloseAll") { //全部平仓
            let position = exchange.GetPosition() //持仓单 (只获取当前产品的持仓单)
            if (position.length > 0) {
                if (position[0].Type == 0) { //平多
                    exchange.SetDirection("closebuy")
                    ticker = exchange.GetTicker() //获取当前行情价格ticker.Buy，为了保证成交可能要追20挡位
                    let depth = exchange.GetDepth() //获取行情数据，大 depth.Asks[20].Price    ，小 depth.Bids[20].Price
                    exchange.Sell(depth.Bids[20].Price, position[0].Amount)
                    Log(Symbols + "多单手动全部平单" + position[0].Amount )
                } else { //平空
                    exchange.SetDirection("closesell")
                    ticker = exchange.GetTicker() //获取当前行情价格ticker.Sell，
                    let depth = exchange.GetDepth() //获取行情数据，大 depth.Asks[20].Price    ，小 depth.Bids[20].Price                        
                    exchange.Buy(depth.Asks[20].Price, position[0].Amount)
                    Log(Symbols + "空单手动全部平单" + position[0].Amount )
                }
            }
        }

        if (arr[0] == "CloseBuy") { //多单部分平仓
            //Log("arr=", arr, "arr[0]", arr[0], "arr[1]", arr[1])
            exchange.SetDirection("closebuy")
            ticker = exchange.GetTicker() //获取当前行情价格ticker.Buy，为了保证成交可能要追20挡位
            let depth = exchange.GetDepth() //获取行情数据，大 depth.Asks[20].Price    ，小 depth.Bids[20].Price  
            exchange.Sell(depth.Bids[20].Price, Number(arr[1]))
            Log(Symbols, "多单手动部分平单" + arr[1])
        }
        if (arr[0] == "OpenBuy") { //部分开多
            //Log("arr=",arr,"arr[0]",arr[0],"arr[1]",arr[1])
            exchange.SetDirection("buy")
            ticker = exchange.GetTicker() //获取当前行情价格ticker.Buy，为了保证成交可能要追20挡位
            let depth = exchange.GetDepth() //获取行情数据，大 depth.Asks[20].Price    ，小 depth.Bids[20].Price
            exchange.Buy(depth.Asks[20].Price, Number(arr[1]))
            Log(Symbols + "多单手动开单" + arr[1])
        }

        if (arr[0] == "CloseSell") { //空单部分平仓
            exchange.SetDirection("closesell")
            ticker = exchange.GetTicker() //获取当前行情价格ticker.Sell，为了保证成交可能要追20挡位
            let depth = exchange.GetDepth() //获取行情数据，大 depth.Asks[20].Price    ，小 depth.Bids[20].Price 
            exchange.Buy(depth.Asks[20].Price, Number(arr[1]))
            Log(Symbols + "空单手动部分平单" + arr[1])
        }
        if (arr[0] == "OpenSell") { //手动开空
            exchange.SetDirection("sell")
            ticker = exchange.GetTicker() //获取当前行情价格ticker.Buy，为了保证成交可能要追20挡位
            let depth = exchange.GetDepth() //获取行情数据，大 depth.Asks[20].Price    ，小 depth.Bids[20].Price 
            exchange.Sell(depth.Bids[20].Price, Number(arr[1]))
            Log(Symbols + "空单手动开单" + arr[1])
        }
    }
}

//---------------------------------------------------------------
//主函数
//---------------------------------------------------------------
function main() {
    exchange.SetContractType("swap") //设置是那么产品季度
    //exchange.SetCurrency(Symbols) //切换产品（默认产品）
    while (true) {
        ButtonFun() 
        let position = exchange.GetPosition() //持仓单 (只获取当前产品的持仓单)
        if (position.length > 0) {
            LogStatus(_D(), "当前产品方向：", position[0].Type==0?"BUY":"SELL", "持有量：", position[0].Amount, "未平仓盈利：", position[0].Profit)
        } else {
            LogStatus(_D(), "当前产品持有量：", 0, "未平仓盈利：", 0)
        }
        Sleep(1000 *1); // 休眠3秒
    }
}
```

> Detail

https://www.fmz.com/strategy/335089

> Last Modified

2021-12-17 22:38:47
