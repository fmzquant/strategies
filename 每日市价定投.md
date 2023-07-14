
> Name

每日市价定投

> Author

cdxy



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|singleInvestAmount|true|市价买入|


> Source (javascript)

``` javascript


function main() {
   Log(exchange.GetAccount());

   
   //最近一次投资的日期
   var lastInvestDate = '';

   while (true) {
       //每次轮询，间隔时间为60秒
       Sleep(60 * 1000);

       //如果当前日期和最近一次投资日期相同，说明当天已经投过了，跳过
       var now = new Date();
       var date = now.toISOString().slice(0,10);
       if (date == lastInvestDate) {
           continue;
       }

       lastInvestDate = date;
       Log("日期: " + date);

    
       exchange.Buy(-1, singleInvestAmount);
   }
}

```

> Detail

https://www.fmz.com/strategy/151259

> Last Modified

2019-06-07 16:26:19
