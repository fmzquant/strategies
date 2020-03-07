
> 策略名称

OKex期货测试for新手

> 策略作者

tomjava

> 策略描述

OKex期货使用较麻烦，故我写了这么一个框架，方便新用户理解和使用。注意ETH是10美元为一张的。

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Interval|10|轮询周期(秒)|
|mnum|20|30分钟线周期|
|initRatio|0.5|初始仓位比例|


> 源码 (javascript)

``` javascript
/*backtest
start: 2019-01-01 00:00:00
end: 2019-10-10 00:00:00
period: 1d
exchanges: [{"eid":"OKEX","currency":"ETH_USDT","stocks":0}]
args: [["OpMode",1,10989],["MaxAmount",1,10989],["TradeFee",0.001,10989]]
*/
//注册币乎后https://m.bihu.com/signup?i=1ewtKO&s=4&c=4
//搜索 物联网区块链 可以联系到作者区班主
var isInit = 1; //表示初始态
function oper(){
    var allAmount;
    var cashRatio;
    var lastPrice;
    var wantRatio;
    var wantOper=0;//期待的操作，0不操作，1买入，-1卖出
    var mhigh;
    var mlow;
   
        
        var mrecords = exchange.GetRecords(PERIOD_M30);
        //一定周期内的高低点
        mhigh=TA.Highest(mrecords, mnum, 'High');
        mlow=TA.Lowest(mrecords, mnum, 'Low');
        
        var midLine = (mhigh+mlow)/2;
        
        var ticker = _C(exchange.GetTicker);
        var nowPrice=ticker.Sell;
        var account = _C(exchange.GetAccount);
        var objid;
        var order;
        
        if (isInit == 1) {  //初始化状态为默认仓； 
            /*exchange.SetDirection("sell");    
            objid = exchange.Sell(nowPrice,Math.floor(nowPrice*account.Stocks*0.2/10)); //Okex必须取整
            order = exchange.GetOrder(objid);            // 参数id为订单号码，需填入你想要查询的订单的号码
            
            if (objid) { //如果购买成功
                      isInit=2; //初始化成功
                      account = _C(exchange.GetAccount);
                      Log(account);
                      Log("公允价格",midLine,"高点",mhigh,"低点",mlow);
                      Log("刚下订单的信息,ID:", order.Id, "Price:", order.Price, "Amount:", order.Amount,
        "DealAmount:", order.DealAmount, "type:", order.Type);
            }*/
            
            exchange.SetDirection("buy");    
            objid = exchange.Buy(nowPrice,Math.floor(nowPrice*account.Stocks*0.2/10)); //Okex必须取整
            order = exchange.GetOrder(objid);            // 参数id为订单号码，需填入你想要查询的订单的号码
           
            if (objid) { //如果购买成功
                      isInit=2; //初始化成功
                      account = _C(exchange.GetAccount);
                      Log(account);
                      Log("公允价格",midLine,"高点",mhigh,"低点",mlow);
                      Log("刚下订单的信息,ID:", order.Id, "Price:", order.Price, "Amount:", order.Amount,
        "account.Stocks:", account.Stocks, "type:", order.Type);
            }
            
            exchange.SetDirection("buy");    
            objid = exchange.Buy(nowPrice,Math.floor(nowPrice*account.Stocks*0.2/10)); //Okex必须取整
            order = exchange.GetOrder(objid);            // 参数id为订单号码，需填入你想要查询的订单的号码
           
            if (objid) { //如果购买成功
                      isInit=2; //初始化成功
                      account = _C(exchange.GetAccount);
                      Log(account);
                      Log("公允价格",midLine,"高点",mhigh,"低点",mlow);
                      Log("刚下订单的信息,ID:", order.Id, "Price:", order.Price, "Amount:", order.Amount,
        "DealAmount:", order.DealAmount, "type:", order.Type);
            }
        }else if(isInit==2){ //日常操作检测
            //打印未成交仓位
            var orders = _C(exchange.GetOrders);
           
            for (var i = 0; i < orders.length; i++) {
                Log("下单",orders[i]);
            }
           
            var positions = exchange.GetPosition();
            Log("持仓数",positions.length);
            for (i = 0; i < positions.length; i++) { //下两张多单会合并成一张单
                 if (positions[i].Type == PD_LONG) {
                    //exchange.SetDirection("closebuy");
                    //exchange.Sell(nowPrice,positions[i].Amount);
                } else {
                   // exchange.SetDirection("closesell");
                   // exchange.Buy(nowPrice,positions[i].Amount);
                }
                Log("持仓",positions[i]);
            }
            //如果没有挂单也没有持单
            if(orders.length<2){//&&positions.length==0){
                isInit=3;
                account = _C(exchange.GetAccount);
                Log("已成交");
                Log(account);
            }
        }else{
        }
}

function main() {
    var initAccount = _C(exchange.GetAccount);
    Log(initAccount);
    exchange.SetContractType("quarter")    // 举例设置为OKEX期货当周合约
    exchange.SetMarginLevel(5);              // 设置杠杆为5倍
    while (true) {
        oper();
        Sleep(Interval*1000);
    }
}
```

> 策略出处

https://www.fmz.com/strategy/170842

> 更新时间

2020-02-20 19:45:23
