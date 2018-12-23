
> 策略名称

测试火币macd金叉

> 策略作者

量化新人



> 策略参数



|参数|默认值|描述|
|----|----|----|
|FastPeriod|5|入市快线周期|
|SlowPeriod|15|入市慢线周期|
|EnterPeriod|false|入市观察期|
|ExitFastPeriod|7|离市快线周期|
|ExitSlowPeriod|15|离市慢线周期|
|ExitPeriod|false|离市观察期|
|PositionRatio|0.8|仓位比例|
|Interval|10|轮询周期(秒)|


> 源码 (javascript)

``` javascript
 
function adjustFloat(v) {
    return Math.floor(v*100)/100;
}
function CancelPendingOrders() {
    while (true) {
        var orders = null;
        while (!(orders = exchange.GetOrders())) {
            Sleep(Interval);
        }

        if (orders.length == 0) {
            return;
        }

        for (var j = 0; j < orders.length; j++) {
            exchange.CancelOrder(orders[j].Id, orders[j]);
            if (j < (orders.length-1)) {
                Sleep(Interval);
            }
        }
    }
}
var records=[]
function MACD_Cross() { //检测MACD指标，交叉状态的函数
     records = exchange.GetRecords(); //获取K线数据

    while (!records && records.length < 45) { //K线数据不能为null，要大于45个柱，不符合标准 循环获取直到符合
        records = exchange.GetRecords();
        // Log("Sleep");
        Sleep(1000);

    }
    // Log(records);
    var macd = TA.MACD(records, 12, 26, 9); //调用指标函数， 参数为MACD 默认的参数。
    // var ma5 = TA.MA(records,5);
    // var ma25 = TA.MA(records, 25);
    // var ma125 = TA.MA(records, 125);
    // var ma250 = TA.MA(records, 250);

    var dif = macd[0]; //dif线
    var dea = macd[1]; //dea线
    var macd = macd[2]; // MACD柱

    var len = records.length; //K线周期长度
    //  ma30[len-1]<ma10[len-1] && ma10[len-1]<ma5[len-1]
      // 判断当前涨幅 ((records[len-1].Close-records[len-1].Open)/records[len-1].Open) >0.02


    if (dif[len - 1] > dea[len - 1] && dif[len - 2] < dea[len - 2] ) {
        return 1;
        // Log("买入",records[len-1].Time)
    }
    //macd[len-2]<macd[len-3]||
    if ((dif[len - 1] < dea[len - 1] && dif[len - 2] > dea[len - 2])) {
        // Log("卖出",records[len-1].Time)
        return 2;
    }
    return 0;
}
function updateProfit(accountInit, accountNow, price) {
    var netNow = accountNow.Balance + accountNow.FrozenBalance + ((accountNow.Stocks + accountNow.FrozenStocks) * price);
    var netInit = accountInit.Balance + accountInit.FrozenBalance + ((accountInit.Stocks + accountInit.FrozenStocks) * initTicker.Buy);
    LogProfit(adjustFloat(netNow - netInit));
}
var initTicker =null;
function main() {
    var initAccount = exchange.GetAccount();
    initTicker= exchange.GetTicker();
    Log(initAccount);
    var buyPrice = 0;
    var sellPrice = 0;
      var buyFlag =  true;
        var sellFlag = false;
        // 如果策略临时中断重启了,此时已经买到币了就要考虑卖出了
        // if(initAccount.Stocks>=1){
        //   sellFlag = true
        //   buyFlag = false
        // }
         var earn = 0;
        var totalEarn =0 ;
    while (true) {
        CancelPendingOrders()
        var ma = MACD_Cross();
        var ticker = exchange.GetTicker();
        var depth = exchange.GetDepth();
        var price = 0;
        var amount = 0;
        var cost = 0;
        var nowAccount = exchange.GetAccount()


        if (ma == 1&&buyFlag) {
           buyFlag = false;
           sellFlag = true;
           price = depth.Asks[0].Price;
           amount = depth.Asks[0].Amount;
           // cost = price*amount * 0.002

            buyPrice = price;
            // Log("买前当前账户:",nowAccount,"买价格:",buyPrice+"->@量->",0.1);
            // 买的时候扣除的是 币的个数
            var realBuy = _N((nowAccount.Balance/buyPrice)*(1-0.002),2)

            exchange.Buy(buyPrice,realBuy);
            nowAccount = exchange.GetAccount()
            // Log("买后当前账户:",nowAccount,"买价格:",buyPrice+"->@量->",0.1);
            // exchange.Log(LOG_TYPE_BUY, 123, 1,1);
            Log("买入时间",new Date(records[records.length-1].Time).toLocaleTimeString())
            // Log("买入时间",new Date(records[records.length-1].Time).toLocalTimeString())
            // Log("买入时间",new Date(records[records.length-1].Time).toLocalString())
        } else if(ma==2&&sellFlag) {
            sellFlag = false;
            buyFlag = true;
           price = depth.Bids[0].Price;
           amount = depth.Bids[0].Amount;
            sellPrice = price ;
           // cost = price*amount * 0.002
            earn = ((sellPrice - buyPrice) / buyPrice) *100
            totalEarn+=earn;

           Log("卖出时间,",new Date(records[records.length-1].Time).toLocaleTimeString(),"当前收益:"+earn.toFixed(2)+"总收益："+totalEarn.toFixed(2)+"%@");
             // Log("卖前当前账户:",nowAccount,"卖价格:",sellPrice,"->@当前收益",earn.toFixed(2))
            exchange.Sell(sellPrice,_N(nowAccount.Stocks,2))
            // exchange.Log(LOG_TYPE_SELL, 123, 1,1);
            nowAccount = exchange.GetAccount()
             // Log("卖后当前账户:",nowAccount,"卖价格:",sellPrice,"->@量->",nowAccount.Stocks)
            updateProfit(initAccount,nowAccount,price)

        }else{
            // LogProfit(0);
        }
        Sleep(5*1000);
    }
}

```

> 策略出处

https://www.fmz.com/strategy/92839

> 更新时间

2018-12-23 14:04:05
