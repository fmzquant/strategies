
> 策略名称

动态平衡alpha

> 策略作者

中本大料



> 策略参数



|参数|默认值|描述|
|----|----|----|
|threshold|0.05|阈值|
|LoopInterval|60|循环时间|
|Minstock|0.001|最小交易量|
|XPrecision|4|量精度|
|YPrecision|8|价精度|


> 源码 (javascript)

``` javascript
var threshold = 0.05
var LoopInterval = 60
var Minstock = 0.001
var XPrecision = 4
var ZPrecision = 8

//撤单函数
function CancelPendingOrders() {
    Sleep(1000);
    var ret = false;
    while (true) {
        var orders = null;
        while (!(orders = exchange.GetOrders())) {
            Sleep(1000);
        }
        if(orders.length == 0){
            return ret;
        }
        for (var j = 0; j< orders.length; j++){
            exchange.CancelOrder(orders[j].Id);
            ret = true;
            if(j<(orders.length-1)){
                Sleep(1000);
            }
        }
    }
}

//下单函数
function onTick() {
    var acc = _C(exchange.GetAccount); //获取账户信息
    var ticker = _C(exchange.GetTicker); //获取Ticker数据
    var spread = ticker.Sell - ticker.Buy; //获取Ticker数据的买卖价差
    var diffAsset = (acc.Balance - (acc.Stocks * ticker.Sell)) / 2;//账户余额与当前持仓价值的差值的0.5倍
    var ratio = diffAsset / acc.Balance;
    LogStatus('ratio:'.ratio, _D()); //打印ratio和当前时间
    if (Math.abs(ratio) < threshold) { //如果ratio的绝对值小于指定阈值
        print("spread")
        return false; //返回false
    }
    if (ratio > 0) { //如果ratio大于0;
        var buyPrice = _N(ticker.Sell + spread, ZPrecision);
        var buyAmount = _N(diffAsset / buyPrice, XPrecision);
        if (buyAmount < Minstock) { //如果下单量小于最小交易量
            return false;
        }
        exchange.Buy(buyPrice, buyAmount, diffAsset, ratio);//买入下单
    }else{
        var sellPrice = _N(ticker.Buy - spread, ZPrecision);//计算下单价格
        var sellAmount = _N(-diffAsset / sellPrice, XPrecision);//计算下单量
        if(sellAmount < Minstock){
            return false;
        }
        exchange.Sell(sellPrice, sellAmount, diffAsset, ratio); //卖出下单
    }
    return true;
}

//主函数
function main() {
    //SetErrorFilter("GetRecords:|GetOrders:|GetDepth:|GetAccount|:Buy|Sell|timeout"); //过滤非重要信息
    while (true) {
        if (onTick()) {
            CancelPendingOrders();
            Log(_C(exchange.GetAccount));
        }
        Sleep(LoopInterval * 1000);
    }
}
```

> 策略出处

https://www.fmz.com/strategy/115321

> 更新时间

2018-09-06 09:50:43
