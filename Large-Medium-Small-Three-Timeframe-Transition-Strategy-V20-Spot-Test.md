
> Name

Large-Medium-Small-Three-Timeframe-Transition-Strategy-V20-Spot-Test

> Author

区班量化

> Strategy Description

This strategy uses a large-, medium-, and small-timeframe transition framework. In general, the large timeframe defines the market direction, the medium timeframe is the operating timeframe, and the small timeframe signals when the trend is running out of momentum. Before entering a trade, reviewing the state of all three timeframes together allows you to respond flexibly to complex market conditions. If your trading frequency is only a few times per day, the large timeframe can be the daily chart, the medium timeframe can be 4 hours, and the small timeframe can be 30 minutes. If your trading frequency is dozens of times per day, the large timeframe can be 4 hours, the medium timeframe can be 30 minutes, and the small timeframe can be 5 minutes. In general, each timeframe should be 6 to 8 times the next lower timeframe.

Next, the relationship between each timeframe's candlesticks and the Bollinger Bands is classified into eight states. With three timeframes, that creates 8 × 8 × 8 = 512 combined states. These 512 states are enough to cover virtually all possible market conditions, and a skilled developer can predefine the best entry points and stop-loss levels for each state. To provide a basis for discussion, the author has published the strategy on the FMZ platform and welcomes further improvements built on top of it.

The initial backtest showed an annualized return of 29% with a relatively high drawdown of 36%. After downloading the logs and analyzing the drawdown, several main issues were identified:
1. The large/medium/small timeframe framework is strong, but modeling how the small timeframe influences the medium timeframe is difficult and may need to be simplified first.
2. Positions should be abandoned decisively when the market turns bearish.
3. The directional role of the 5-day moving average is important, but it was not reflected in the strategy.
4. A rapid decline outside the Bollinger Bands should trigger selling.
5. Profits and losses should be taken promptly when the original bullish rationale breaks down.

After targeted improvements and dozens of iterations, the annualized return was eventually increased to 210%, drawdown was reduced to 16.4%, and the number of trades also declined.
> Strategy Arguments

|Argument|Default|Description|
|----|----|----|
|Interval|10|Polling interval (seconds)|
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
//搜索 物联网区块链 可以联系到作者区班主 你也可以给我写邮件tomjava@163.com
var midStatus = 0; //中周期状态
var bigStatus = 0; //大周期状态
var beforeBigStatus = 0; //之前大周期状态
var operPrice;
var markTime=0;

function mySell(rate){
   var account = _C(exchange.GetAccount);
   var ticker = _C(exchange.GetTicker);
   var nowPrice=ticker.Sell;
     
   //以下开始卖出
   var allAmount=account.Balance+account.Stocks*ticker.Sell; //计算出总金额
   var cashRatio=account.Balance*100/allAmount;
   
   if(cashRatio<90){  //现金比率小于10，才可以卖出
      if(rate==1){ //卖出1份
          if(cashRatio<80){
              $.Sell(allAmount*0.1/nowPrice);
              Log("现金比率",cashRatio+10);
          }else{
              $.Sell(allAmount*0.05/nowPrice);
              Log("现金比率",cashRatio+5);
          }
      }else{
          if(cashRatio<75){
              $.Sell(allAmount*0.2/nowPrice);
              Log("现金比率",cashRatio+20);
          }else{
              $.Sell(allAmount*0.1/nowPrice);
              Log("现金比率",cashRatio+10);
          }
      }
   }
}

function myBuy(rate){
   var account = _C(exchange.GetAccount);
   var ticker = _C(exchange.GetTicker);
   var nowPrice=ticker.Sell;
     
   //以下开始买入
   var allAmount=account.Balance+account.Stocks*ticker.Sell; //计算出总金额
   var cashRatio=account.Balance*100/allAmount;
   //Log("需要买入比率",rate);
   if(cashRatio>10){  //现金比率大于10，才可以买入
      if(rate==1){ //买入1份
          if(cashRatio>20){
              $.Buy(allAmount*0.1/nowPrice);
              Log("现金比率",cashRatio-10);
          }else{
              $.Buy(allAmount*0.05/nowPrice);
              Log("现金比率",cashRatio-5);
          }
      }else{
          if(cashRatio>25){
              $.Buy(allAmount*0.2/nowPrice);
              Log("现金比率",cashRatio-20);
          }else{
              $.Buy(allAmount*0.1/nowPrice);
              Log("现金比率",cashRatio-10);
          }
      }
   }
}

function oper(){
    var ticker = _C(exchange.GetTicker);
    var nowPrice=ticker.Sell;
   
    var h1records = exchange.GetRecords(PERIOD_H1);
    var h1boll;var h1upLine;var h1midLine;var h1downLine;
    var h1bw;
    if(h1records && h1records.length > 20) {
        h1boll = TA.BOLL(h1records, 20, 2);
        h1upLine = h1boll[0][h1records.length-1];
        h1midLine = h1boll[1][h1records.length-1];
        h1downLine = h1boll[2][h1records.length-1];
    }
    
    var drecords = exchange.GetRecords(PERIOD_D1);
    var dboll;var dupLine;var dmidLine;var ddownLine;
    var dbw;var beforePrice;
    if(drecords && drecords.length > 20) {
        dboll = TA.BOLL(drecords, 20, 2);
        dupLine = dboll[0][drecords.length-1];
        dmidLine = dboll[1][drecords.length-1];
        ddownLine = dboll[2][drecords.length-1];
        dbw=dupLine-dmidLine;
        beforePrice=(drecords[drecords.length-2].Open+drecords[drecords.length-2].Close)/2;
    }
    
    if(ticker.Time-markTime<15*60*1000){ //只有满足15分钟间隔，才允许判断状态
        return;
    }else{
        markTime=ticker.Time;
    }
    
    if(h1records && h1records.length > 20 && drecords && drecords.length > 20) {
        if(nowPrice>dupLine+dbw*0.1){
            bigStatus=0;
        }else if(nowPrice>dupLine-dbw*0.1){
            bigStatus=1;
        }else if(nowPrice>dmidLine+dbw*0.1){
            bigStatus=2;
        }else if(nowPrice>dmidLine){
            bigStatus=3;
        }else if(nowPrice>dmidLine-dbw*0.1){
            bigStatus=4;
        }else if(nowPrice>ddownLine+dbw*0.1){
            bigStatus=5;
        }else if(nowPrice>ddownLine-dbw*0.1){
            bigStatus=6;
        }else{
            bigStatus=7;
        }
        
        if(beforePrice>dupLine+dbw*0.1){
            beforeBigStatus=0;
        }else if(beforePrice>dupLine-dbw*0.1){
            beforeBigStatus=1;
        }else if(beforePrice>dmidLine+dbw*0.1){
            beforeBigStatus=2;
        }else if(beforePrice>dmidLine){
            beforeBigStatus=3;
        }else if(beforePrice>dmidLine-dbw*0.1){
            beforeBigStatus=4;
        }else if(beforePrice>ddownLine+dbw*0.1){
            beforeBigStatus=5;
        }else if(beforePrice>ddownLine-dbw*0.1){
            beforeBigStatus=6;
        }else{
            beforeBigStatus=7;
        }
        
        if(nowPrice>h1upLine+h1bw*0.1){
            midStatus=0;
        }else if(nowPrice>h1upLine-h1bw*0.1){
            midStatus=1;
        }else if(nowPrice>h1midLine+h1bw*0.1){
            midStatus=2;
        }else if(nowPrice>h1midLine){
            midStatus=3;
        }else if(nowPrice>h1midLine-h1bw*0.1){
            midStatus=4;
        }else if(nowPrice>h1downLine+h1bw*0.1){
            midStatus=5;
        }else if(nowPrice>h1downLine-h1bw*0.1){
            midStatus=6;
        }else{
            midStatus=7;
        }
        
        if(bigStatus-beforeBigStatus>0){ //当前有一个大周期下跌跃迁
            if(midStatus==6||midStatus==7){
                //Log("卖2份 当大",bigStatus,"前大",beforeBigStatus,"中",midStatus);
                //买2份
                mySell(2);
            }else if(midStatus==3||midStatus==4){
                //Log("卖1份 当大",bigStatus,"前大",beforeBigStatus,"中",midStatus);
                //买1份
                mySell(1);
            }else{
                //Log("当大",bigStatus,"前大",beforeBigStatus,"中",midStatus);
            }
        }else if(bigStatus-beforeBigStatus<0){  //当前有一个大周期上涨跃迁
            if(midStatus==6||midStatus==7){
                //Log("买2份 当大",bigStatus,"前大",beforeBigStatus,"中",midStatus);
                //买2份
                myBuy(2);
            }else if(midStatus==3||midStatus==4){
                //Log("买1份 当大",bigStatus,"前大",beforeBigStatus,"中",midStatus);
                //买1份
                myBuy(1);
            }else{
                //Log("当大",bigStatus,"前大",beforeBigStatus,"中",midStatus);
            }
        }else{
            //Log("当大",bigStatus,"前大",beforeBigStatus,"中",midStatus," dup",dupLine," 长度",dboll[0].length);
        }
    }
}

function main() {
    var initAccount = _C(exchange.GetAccount);
    Log(initAccount);
    exchange.SetCurrency("LTC_USDT")
    Log("BTC_USDT的计价币名称：", exchange.GetQuoteCurrency())
  
    while (true) {
        oper();
        Sleep(Interval*1000);
    }
}
```

> Detail

https://www.fmz.com/strategy/177631

> Last Modified

2024-01-28 18:15:48
