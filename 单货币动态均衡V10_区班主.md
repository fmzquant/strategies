
> Name

单货币动态均衡V10_区班主

> Author

区班量化

> Strategy Description

"Talk is cheap. Show me the code"

教学性质, 实盘慎用.


注: ` 策略使用了交易模板类库`

`希望新手从此策略入门, 一步步学习编写策略, 并体验到模拟与真实环境对交易系统的影响`

https://dn-filebox.qbox.me/fb4d0c7d773ca83e9d0230927705d419dc0bbeaa.png

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Interval|60|轮询周期(秒)|
|changeRatio|0.1|切换预警比率|


> Source (javascript)

``` javascript
/*backtest
start: 2019-01-01 00:00:00
end: 2019-10-10 00:00:00
period: 1d
exchanges: [{"eid":"OKEX","currency":"BTC_USDT","stocks":0}]
*/
//非常简单的单货币动态均衡策略，低于50%的一定比例就买入，高于就卖出
//注册币乎后https://m.bihu.com/signup?i=1ewtKO&s=4&c=4
//搜索 物联网区块链 可以联系到作者区班主
function main() {
    var STATE_IDLE  = -1;
    var state = STATE_IDLE; //表示空仓
    var entryPrice = 0;
    var initAccount = _C(exchange.GetAccount);
    var obj;
    var allAmount;
    var cashRatio;
    Log(initAccount);
    while (true) {
        var account = _C(exchange.GetAccount);
        var ticker = _C(exchange.GetTicker);
        if (state === STATE_IDLE) {  //初始化状态为默认仓；默认为空仓，只买入
            obj = $.Buy(_N(account.Balance * 0.5 / ticker.Sell, 3));
            if (obj) { //如果购买成功，就标志开仓
                opAmount = obj.amount;
                entryPrice = obj.price;
                state = PD_LONG;
                account = _C(exchange.GetAccount);
                Log("开仓买入",obj.amount,"价格",obj.price,"目前持币数", account.Stocks);
            }
        } else { //state为非空闲状态；处理动态平衡检测
            allAmount=account.Balance+account.Stocks*ticker.Sell; //计算出总金额
            cashRatio=parseFloat((account.Balance/allAmount).toFixed(3));
            //Log("现金",account.Balance,"总资产",allAmount,"比例",cashRatio);
            if (cashRatio>0.5+changeRatio) { //现金多了，需要买入货币
                obj = $.Buy(_N(allAmount*(cashRatio-0.5)/ticker.Sell/2.0, 3)); //把多出来的一半买掉，这样才能均衡
                if(obj){
                    Log("开仓买入",obj.amount,"价格",obj.price);
                    Log("目前资金",allAmount, "盈利",allAmount - initAccount.Balance);
                }
            }else if(cashRatio<0.5-changeRatio){  //现金少了，需要抛币
                obj = $.Sell(_N(allAmount*(0.5-cashRatio)/ticker.Sell/2.0, 3)); //把多出来的部分买掉
                if(obj){
                    Log("平仓买出",obj.amount,"价格",obj.price);
                    Log("目前资金",allAmount, "盈利",allAmount - initAccount.Balance);
                }
            }
        }
        Sleep(Interval*1000);
    }
}
```

> Detail

https://www.fmz.com/strategy/169701

> Last Modified

2019-10-12 16:48:48
