
> Name

Bull-Bear-and-Choppy-Market-Detection-V10-Qubanzhu

> Author

区班量化

> Strategy Description

We found that market timing is one of the most important parts of quantitative investing: determining whether the current market is bearish, bullish, or choppy. This article discusses how to build such a timing strategy.

There are many ways to time the market, including moving averages, Bollinger Bands, volume, and periodic highs and lows.

Moving-average timing uses the slope of the averages to judge whether the market is rising or falling. For example, standing above the 5-day moving average can signal a mild bull market, while falling below the 120-day moving average can signal entry into a bear market. Combining several factors helps measure current market strength.

Bollinger Bands are also a good timing tool. The slope of the middle band helps judge whether the market is rising or falling. Using the upper and lower bands to buy low and sell high works well in choppy markets. If the bands widen, it can be a precursor to increased volatility.

Volume is generally an auxiliary signal. Both bottoms and tops are often accompanied by large volume. One advantage of cryptocurrencies is that market depth is easy to obtain. By analyzing order-book data together with volume, you can also gauge current market heat.

The methods above are somewhat harder to implement and require gradual optimization. The core strategy discussed here is based on periodic highs and lows, which is simple to implement and produces direct results. The idea is straightforward: combine short-period highs/lows with long-period highs/lows to judge whether the current market is a major bull, minor bull, major bear, minor bear, or choppy market. With that timing judgment, you can pair it with specific trading actions when the market shifts. For example, move from a minor bull to a major bull and add positions; move from a major bull to a choppy market and reduce or close positions; move from a choppy market to a minor bear and begin building short exposure; move into a major bear and stay short.

Below is part of the code. The main ideas are explained in the comments for readers who want to study it. The long cycle uses the daily chart with a 5-day period. The short cycle uses 30-minute candles over 10 periods, or 5 hours. These parameters can be adjusted based on the volatility and position sizing of the target cryptocurrency.
![![IMG](https://www.fmz.com/upload/asset/131028f566a19a2df8d71.png) ](https://www.fmz.com![IMG](https://www.fmz.com/upload/asset/131028f566a19a2df8d71.png)) 
![![IMG](https://www.fmz.com/upload/asset/1311782042b83c9281493.png) ](https://www.fmz.com![IMG](https://www.fmz.com/upload/asset/1311782042b83c9281493.png)) 

Here are some execution results. The strategy correctly signaled the shift from a minor bear to a major bear on September 24-25, the choppy-plus-minor-bear period from September 26 to October 7, and the minor bull signal that appeared on October 9. This shows that the periodic-high/low strategy is simple but not simplistic.
![ ![IMG](https://www.fmz.com/upload/asset/130e0870276675121b757.png) ](https://www.fmz.com![IMG](https://www.fmz.com/upload/asset/130e0870276675121b757.png))
![ ![IMG](https://www.fmz.com/upload/asset/130dd6af2327f75a3e071.png) ](https://www.fmz.com![IMG](https://www.fmz.com/upload/asset/130dd6af2327f75a3e071.png))

Combined with cryptocurrency selection and hedging strategies, this framework can be extended in many ways. For example, if you rank the top 20 cryptocurrencies by market cap according to bull/bear status and each time hedge the two strongest bulls against the two strongest bears, you can potentially build a low-risk arbitrage approach. That is a direction worth improving later.

Interested readers can also [find me on Bihu](https://m.bihu.com/signup?i=1ewtKO&c=4&s=4), a platform where publishing articles can earn cryptocurrencies.
![![IMG](https://www.fmz.com/upload/asset/1314562ca57eb3ea873e1.jpg)](https://www.fmz.com![IMG](https://www.fmz.com/upload/asset/1314562ca57eb3ea873e1.jpg))


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Interval|60|Polling interval (seconds)|
|dnum|5|Daily-chart period|
|mnum|10|30-minute-chart period|


> Source (javascript)

``` javascript
/*backtest
start: 2019-01-01 00:00:00
end: 2019-10-10 00:00:00
period: 1d
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD"}]
*/
//通过快慢周期的高低点判断当前处于什么市场
//注册币乎后https://m.bihu.com/signup?i=1ewtKO&s=4&c=4
//搜索 物联网区块链 可以联系到作者区班主
function main() {
    var dhigh;
    var dlow;
    var mhigh;
    var mlow;
    var status_name=["猴市","大牛","小牛","大熊","小熊"];  //定义并赋值
    var before_status=0;
    var now_status=0;
    while (true) {
        var drecords = exchange.GetRecords(PERIOD_D1);
        var mrecords = exchange.GetRecords(PERIOD_M30);
        //日线5天内的高低点(不包含当前Bar)
        dhigh=TA.Highest(drecords, dnum, 'High');
        dlow=TA.Lowest(drecords, dnum, 'Low');
       
        //30分钟线10个周期内的高低点(不包含当前Bar)
        mhigh=TA.Highest(mrecords, mnum, 'High');
        mlow=TA.Lowest(mrecords, mnum, 'Low');
        
        if(mlow>dhigh){ //分钟低点突破日高点，大牛开始
            now_status=1;
            //Log("大牛");
        }else if(mhigh>dhigh&&mlow<=dhigh){ //分钟高点突破日高点，但是分钟低点还没突破日高点，小牛开始
            now_status=2;
            //Log("小牛");
        }else if(mhigh<dlow){  //分钟低点跌破日低点，大熊开始
            now_status=3;
            //Log("大熊");
        }else if(mlow<dlow&&mhigh>dlow){  //分钟低点跌破日低点，但是分钟高点还没跌破日低点，小熊开始
            now_status=4;
            //Log("小熊");
        }else{  //没有方向，猴市
            now_status=0;
            //Log("猴市");
        }
        if(now_status!=before_status){
            Log("日线高点",dhigh," 日线低点",dlow,"30分钟线高点",mhigh," 30分钟线低点",mlow);
            Log(status_name[before_status],"转",status_name[now_status]);
            before_status=now_status;
        }
        Sleep(Interval*1000);
    }
}
```

> Detail

https://www.fmz.com/strategy/170014

> Last Modified

2019-11-15 15:48:27
