
> Name

Single-Asset-Convenience-Store-Strategy-V20-130-Annualized-Return

> Author

区班量化

> Strategy Description

Some studies suggest that markets spend about 80% of their time in ranging conditions. Grid strategies are one way to trade those ranges. Although there are many implementations, the essence is to define a relatively stable position-building plan and add to the position whenever price movement meets the strategy conditions. For example, if price drops 5%, you could add 20% of total capital each time; after at most five additions, the full allocation would be deployed. Likewise, if price rises 5%, you could reduce 20% of the initial capital allocation each time, and after five reductions the position would be fully closed. This is the basic idea behind grid trading.

Today the author introduces a quantitative strategy similar to grid trading, but with several improvements that in some cases can achieve a 130% annualized return. It is called the Convenience Store Strategy, imagining the trader as a shop owner targeting a fair market price. When price is above fair value, the trader sells inventory; when price is below fair value, the trader buys inventory. The strategy also keeps a notebook of the last trade price. If the current price falls below the last trade price, it can trigger an additional buy, and vice versa. To avoid endless trading, the strategy stops operating when the cash ratio falls below 10% or rises above 90%.

The workflow is as follows:
Step 1: Observe the asset's volatility and choose a fair-value indicator, such as a moving average (for example, the 20-period moving average on a 30-minute chart) or the Bollinger middle band. By default, open with a 50% position and record the execution price.
Step 2: If price is 3% below the fair-value indicator, issue a buy signal; if it is 3% above fair value, issue a sell signal, then record the execution price.
        If price is 5% below the last execution price, issue another buy signal; if it is 5% above the last execution price, issue a sell signal, then record the execution price.
Step 3: Use the current position level to decide how to respond to a buy signal. The position ratio is allowed to fluctuate between 10% and 90%; outside that range, no trade is placed, although the execution price can still be updated. Each action only buys or sells 10% or 20% of the portfolio to avoid unlimited operations.

The strategy is called the Single-Asset Convenience Store Strategy because the store only carries one product. Future improvements could add rotation across multiple assets or even back-to-back short hedging.

In the example backtest, the author uses ETH because of its high volatility, with a test period from January 1, 2019 to October 10, 2019, a period that includes both sharp rallies and sharp declines.

The backtest result is fairly strong, reaching a 130% annualized return while also generating 1,651 yuan in trading fees—arguably a strategy both the exchange and the trader can appreciate.

The drawback is that the maximum drawdown is still relatively high at about 30%. Most of that drawdown occurs during strong downward moves in the asset. This is understandable because the strategy anchors itself to the traded asset, so if price falls sharply it may accumulate inventory at higher levels that has not yet been released back to the market. Given enough time, those losses may eventually be recovered.

Another important point is asset selection. It is best suited to assets with high volatility and long-term appreciation potential. From another perspective, if you can adapt the parameters to the asset, even small price fluctuations may still be workable as long as they cover transaction fees.
> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Interval|10|Polling interval (seconds)|
|mnum|20|30-minute line period|
|initRatio|0.5|Initial position ratio|


> Source (javascript)

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
function main() {
    var isInit = 1; //表示初始态
    var allAmount;
    var cashRatio;
    var initAccount = _C(exchange.GetAccount);
    var lastPrice;
    var wantRatio;
    var wantOper=0;//期待的操作，0不操作，1买入，-1卖出
    Log(initAccount);
    var mhigh;
    var mlow;
    while (true) {
        var mrecords = exchange.GetRecords(PERIOD_M30);
        //一定周期内的高低点
        mhigh=TA.Highest(mrecords, mnum, 'High');
        mlow=TA.Lowest(mrecords, mnum, 'Low');
        
        var midLine = (mhigh+mlow)/2;
        var ticker = _C(exchange.GetTicker);
        var account = _C(exchange.GetAccount);
        var nowPrice=ticker.Sell;
        var obj;
        
        if (isInit == 1) {  //初始化状态为默认仓；     
            //账户现金乘以比例，除以当前价格，保留小数前3位
            obj = $.Buy(_N(account.Balance * initRatio / ticker.Sell, 3));
            if (obj) { //如果购买成功，就标志开仓
                      opAmount = obj.amount;
                      lastPrice = obj.price;
                      isInit=0; //初始化成功
                      account = _C(exchange.GetAccount);
                      Log("初始开仓:购买量", opAmount);
                      Log("目前持币数", account.Stocks);
            }
        }else{ //日常操作检测
            if(nowPrice>midLine*1.03||nowPrice>lastPrice*1.07){
                wantOper=-1;
            }else if(nowPrice<midLine*0.97||nowPrice<lastPrice*0.93){
                wantOper=1;
            }else{
                wantOper=0;
            }
            
            if (wantOper==-1) { //离市平仓
                lastPrice=nowPrice; //不管买没买成功都修改了一下价格
                allAmount=account.Balance+account.Stocks*ticker.Sell; //计算出总金额
                cashRatio=parseFloat((account.Balance/allAmount).toFixed(3));
                
                if(cashRatio>0.9){ //现金比例大于0.9，不做任何操作 
                    wantRatio=0;
                }else if(cashRatio>0.8){ //现金比例超过0.8，可以抛一成仓 
                    wantRatio=0.1;
                }else{ //其他情况都可以抛掉2成仓
                    wantRatio=0.2;
                }
                
                obj = $.Sell(_N(allAmount*wantRatio/ticker.Sell, 3)); 
                if(obj){
                    opAmount = obj.amount;
                    Log("平仓：卖出量",opAmount);
                    nowAccount = _C(exchange.GetAccount);
                    Log("目前现金",nowAccount.Balance,"盈利",allAmount - initAccount.Balance);
                }
            }else if (wantOper==1) { //开仓买入
                lastPrice=nowPrice; //不管买没买成功都修改了一下价格
                allAmount=account.Balance+account.Stocks*ticker.Sell; //计算出总金额
                cashRatio=parseFloat((account.Balance/allAmount).toFixed(3));
                //Log("准备买入",cashRatio);
                if(cashRatio<0.1){ //现金比例小于0.1，已没钱买了
                    wantRatio=0;
                }else if(cashRatio<0.2){ //现金比例超过0.2，可以买一成仓 
                    wantRatio=0.1;
                }else{ //其他情况都可以买2成仓
                    wantRatio=0.2;
                }
                
                obj = $.Buy(_N(allAmount*wantRatio/ticker.Sell, 3)); 
                if(obj){
                    opAmount = obj.amount;
                    Log("买入：买入量",opAmount);
                    nowAccount = _C(exchange.GetAccount);
                    Log("目前现金",nowAccount.Balance,"盈利",allAmount - initAccount.Balance);
                }
            }
        }
        Sleep(Interval*1000);
    }
}
```

> Detail

https://www.fmz.com/strategy/170557

> Last Modified

2019-10-20 15:52:19
