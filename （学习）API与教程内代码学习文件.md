
> 策略名称

（学习）API与教程内代码学习文件

> 策略作者

中本大料





> 源码 (javascript)

``` javascript
/*backtest
start: 2018-11-26 00:00:00
end: 2018-12-26 00:00:00
period: 1h
exchanges: [{"eid":"OKCoin_EN","currency":"BTC_USD"}]
*/

//
//
//
var tradeAmount = 0.1;
var wave = 5
var tide = 20
//-------------------------
var bars = null;
var newbar = null;
var Stock = null;
var Balance = null;
var depth = null;
var accountData = null;
var triggerofTrade = null;
var bidPrice = null
var askPrice = null
var oldtime = "oldtime"
var newtime = "newtime"

var next = false

function Data(){        //数据预处理
    depth = _C(exchange.GetDepth);
    accountData = _C(exchange.GetAccount);      //尽量是取一个数组回来拆分,避免数据差异
    Stock = accountData.Stocks;
    Balance = accountData.Balance;
    bars = _C(exchange.GetRecords);
   // newtime = bars[bars.length-1].Time
    // if(newtime == oldtime){
    //     return  next = true
    //     }
    // newbar = bars
    // oldtime = newtime
    Log(bars[bars.length-1])
}


function main() {
    while(true){
        // next = false
        Data()
        // Log(next)
        // Log("!!!" + newbar[newbar.length-1].Time);
        // if(next = true){
        //     continue
        //     // Log("!!!" + newbar[newbar.length-1].Time);
        // }   
    
        // // Log("!!!"+ newbar)
        // //Sleep(1000)
        // Log("!!!" + newbar[newbar.length-1].Time);
        Sleep(10000)
    }
	// var begintime = new Date().getTime()
   
 //    Log("测试1  ^");
 //    var s ="hello "+"world!";
 //    Log(s[0]);
 //    Log(s);
 //    Log(s.length)
 //    Log(exchange.GetAccount());
    
 //    Log("\n");
 //    Log("测试2  ^");
 //    var symbol = "BTC_USDT"
 //        if(symbol.endsWith('USDT')){
 //            Log("当前计价币为USDT")
 //           }
 //    var a = symbol.split('_')[0];   //？!数组里面取第一个是如何操作的
 //    Log(a,typeof(a));   
 //    Log(a[0]);
 //    var b = "USDT";                //测试单引号和双引号的区别，看起来并没有区别
 //    var c = 'USDT'; 
 //    Log(b,typeof(b),c,typeof(c));        
    
 //    Log("\n");
 //    Log("测试3  对象的操作1^");
 //    var xiaoming = {name:"大傻",birth:1990};
 //    var key = "birth";
 //    Log(xiaoming.name);
 //    Log(xiaoming[key]);
 //    xiaoming.score = 80;
 //        if('score' in xiaoming){
 //            Log(xiaoming)
 //        }
    
 //    Log("\n");
 //    Log("测试4  对象的操作2^");
 //    var ticker = exchange.GetTicker();
 //    Log(ticker);
 //    var price = ticker.Last;
 //    Log(price);
 //    Log(ticker.Last);
    
 //    Log("\n");
 //    Log("测试5  布尔值操作^");
 //    var x = 1.5;
 //    var y = 2;
 //    var z = 3;
 //    if(x > y){
 //        Log("X > Y, 算对了");
 //    }
 //    else{
 //        Log("X < Y, 算错了");
 //    }
 //    if(x < y || x == 1){
 //        Log("算对了")                    //==等于 !=不等于 &&且
 //    }
    
 //    Log("\n");
 //    Log("^学习6  数组操作^");
 //    var arr = [1,2,3.14,"hello",'hello'];
 //    Log(arr.length,"_",arr[5],arr[4].length);
 //    Log(arr.indexOf("hello"));
 //    var records = exchange.GetRecords();
 //    Log(records);
 //    var ma = null
 //    //if(records && records.length > 20 ){
 //    	//Log("K线Bar的数量大于20，可以生成均线")
 //    	//var ma10 = TA.MA(records,10)
 //    	//Log("ma10",ma10)
 //    	//var ma20 = TA.MA(records,20)
 //    	//Log("ma20",ma20)
 //    	//Log(ma10[11]);
 //    	//$.PlotLine('MA10', ma[11]);/
 //    //}
 //    //else{
 //    	//Log("K线数量不足，请获取更多K线或者重新调整均线周期")
 //   // }

	// Log("\n");
 //    Log("^学习7  数据常用操作^");
 //    var d;
 //    Log(d);							//?为何没有出现undefine
 //    var tom = {name:"tom",age:10};
 //    Log(tom.name,tom.gender);  

	// Log("\n");
 //    Log("^学习8  定义、调用函数^");
 //    function test(a,b){
 //    	Log(a,b,a+b);
 //    	return;
 //    }
 //    test(1);   //null NaN分别是什么意思？

 //    Log("\n");
 //    Log("^学习9  数据之间的转换^");
 //    var xa = 123;
 //    Log(String(xa),typeof(String(xa)));
 //    Log(xa.toString(),typeof(xa.toString()));
 //    var xb = '{"free":1,"frozen":2}';  //注意这个单引号
 //    Log(xb,typeof(xb));
 //    object_xb = JSON.parse(xb);			//将JSON字符串转化为对象
 //    Log(object_xb,typeof(object_xb));
 //    var obj ={address:"ABC",name:"123"}
 //    var jsonstr = JSON.stringify(obj);
 //    Log(obj,typeof(obj),jsonstr,typeof(jsonstr));

 //    Log("\n");
 //    Log("^学习10  条件语句判断^");
 //    var ticker1 = exchange.GetTicker();
 //    Log(ticker1.Last)
 //    if(ticker1.Last < 3000){
 //    	Log("ticker1 小于 3000")
 //    }else if(ticker1.Last > 3000 && ticker1.Last<3500){
 //    	Log("ticker1 大于3000 小于3500")
 //    }else{
 //    	Log("ticker1 大于 > 3500");
 //    }
 //    var symbol10 = "ETH";
 //    switch(symbol10){				//使用switch+case+break
 //    	case "ETH":
	// 		Log("当前交易对象为ETH")
 //    		break;
 //    	case "BTC":
 //    		Log("当前交易对象为BTC")
 //    		break;
	// 	//case "ETH":
	// 		//Log("当前交易对象为BTC")
 //    		//break;
 //    }

 //    Log("\n");
 //    Log("^学习11  java循环^");
 //    var records11 = exchange.GetRecords();
 //    Log(records11.length)
 //    if(records11){
 //    	for(i=0;i<29;i++){
 //    		Log(records11[i])
 //    	}
 //    }
 //    $.PlotRecords(records11, 'BTC');
 //    Log("v学习结束v");
 //    Log("\n");

 //    Log("\n");
 //    Log("^学习12  遍历对象^");
 //    var assets12 ={"BTC":1.2,"BCH":1,"ETH":12};
 //    for(var a12 in assets12){
 //    	Log(a12,assets12[a12])
 //    }
 //    Log("-----------------------------");
 //    var assets121 ={"BTC":1.2,"BCH":1,"ETH":12};
 //    for(var a121 in assets121){
 //    	if(a121 == "ETH"){
 //    		continue				//如果满足条件则绕开这次循环
 //    	}
 //    	Log(a121,assets121)
 //    }
 //    Log("v学习结束v");
 //    Log("\n");

 //    Log("^学习13  while循环^");
 //    var a13 = 0
 //    while(a13 == 10){				//若这里为 a13 = 0 则一次都没有执行
 //    	Log("while",a13);
 //    	a13 ++ ;
 //    }
 //    var a131 = 0
 //    do{								//使用do while 循环至少会执行一次
 //    	Log("do",a131);
 //    	a131++;
 //    }while(a131 == 0)
 //    Log("-----------------------------");
 //    var n13 = 0
 //    var sum13 = 0
 //    while(true){
 //    	sum13 += n13
 //    	n13++
 //    	if(n13 > 10){
 //    		Log("朕的气数尽了,先走一步",n13,sum13)
 //    		break
 //    	}
 //    }
 //    Log("v学习结束v");
 //    Log("\n");

 //    Log("^学习14  定义一个函数^");
 //    function go1s(){
 //    	var time14 = new Date().getTime()
	//     Log(time14)
	//     Sleep(1000)
	//     var endtime14 =new Date().getTime()
	//     Log(endtime14 - time14)
 //    }
 //    go1s()
 //    function timenow(){
 //    	Log("当前时间：",_D())  //_D()为平台封装好的函数
 //    }
 //    timenow()
 //    function lastrecords(){
 //    	var records14 = exchange.GetRecords()			//Getrecords传入的是一个时间段
 //    	var bar14 = records14[records14.length-1]
 //    	Log(bar14.Time)     //.Time是bar的一个属性
 //    	Log("最后一根 bar的时间是",_D(bar14.Time))
 //    }
 //    lastrecords()

 //    Log("v学习结束v");
 //    Log("\n");

 //    Log("^学习15  获取账户信息^");
 //    var account15 = exchange.GetAccount()
 //    Log(account15)
 //    exchange.Buy(3700,2)
 //    var accountstate = exchange.GetAccount()
 //    Log(accountstate)
 //    Log(exchange.GetOrders()) //看看取消订单里面是怎么做的
 //    var trade15 = exchange.GetTrades()
 //    Log(trade15)  //Log(order15)
 //    Log("v学习结束v");
 //    Log("\n");

 //    //LogReset()
 //    Log("^学习16  使用指标函数，用函数判断均线交叉^");
 //    var records16 = null
 //    while(1){
 //    	records16 = exchange.GetRecords()
 //    	if(records16.length>30){
 //    		break
 //    	}
 //    	Sleep(100)
 //    }
 //    var ma167 = TA.MA(records,7)
 //    var ma1630 = TA.MA(records,30)
 //    var cross16 = _Cross(ma167,ma1630)
 //    Log("crosspoint",cross16,"#FF0000")
	// Log("v学习结束v");
 //    Log("\n");

 //    LogReset()
 //    Log("^学习17  可视化^");
 //    var i17 = 0
 //    while(1){
 //    	var random17 = Math.random()
 //    	var num17 = random17 * 10
 //    	LogProfit(num17,_D())
 //    	Sleep(5000)
 //    	i17 ++
 //    	if(i17 > 50){
 //    		break
 //    	}
 //    }
 //    Log(i17,num17)
 //    LogStatus("当前时间:",_D(),"随机值:",num17,"\n","乘以10之前的随机数：",random17)
 //    Log("v学习结束v");
 //    Log("\n");

 //    LogReset()
 //    Log("^学习18  循环测试^");
 //    var i18 =1
 //    while(i18<50){
 //        var orders18 = 1;
 //        // while (!(orders18 - 50 < 0)){
 //        //     Sleep(1000);
 //        //     orders18++
 //        // }
 //        while(orders18<50){
 //            orders18++
 //        }
 //        i18++
 //        //Log(i18)
 //        Log(orders18)
 //    }
 //    Log("v学习结束v");
 //    Log("\n");

 //    LogReset()
 //    Log("^学习19  获取K线信息的时间间隔^");
 //    for(var i20 = 0; i20 < 10; i20++){
 //        var records20 = exchange.GetRecords();
 //        Log(records20)
 //    }
 //    for(var i21 = 0; i21 < 10; i21++){
 //        var ticker20 = exchange.GetTicker();
 //        Log(ticker20)
 //    }
 //    Log("v学习结束v");
 //    Log("\n");

    // LogReset()
    // Log("^学习20  持续获取数组,防止获取过短^");
    //function Data(){
    // var Stock = null;
    // var Balance = null;
    // var tide =65;
    // var accountData = _C(exchange.GetAccount);
    // Stock = accountData.Stocks;
    // Balance = accountData.Balance;
    // bars = _C(exchange.GetRecords);
    // Log(bars);
    // Log(bars.length)
    // var bars = "0"
    // Log(bars.length)
    // bars = _C(exchange.GetRecords)
    // // if (bars.length < tide+1){
    // //     bars = _C(exchange.GetRecords);
    // //     }
    //     // while(bars.length < tide){
    //     //     bars = _C(exchange.GetRecords)
    //     // }
    // Log(bars.length)
        
    //     // while(true){
    //     //     var bars = _C(exchange.GetRecords);
    //     //     if(bars.length < tide + 1){
    //     //         continue
    //     //     }
    //     //     return bars
    // Log(bars,bars.length)
        

    // }
    // for (iii20 = 1; iii20<30; iii20++){
    //     Data()
    //     ;
    //     Sleep(500);
    //}
   
    // Data()
    // Log(bars)
    // Log(bars.length)
    // while(bars.length < tide+1){
    //  bars = _C(exchange.GetRecords);     //可以在main循环中再增加一个 if 验证  e.g. if bars.length < 10,msg = "K线数据获取失败,自动重试" return 
    //  Sleep(500);
    // }
    //在 均线策略等需要通过K线形态判断买卖时机和方向的策略中, 在回测模式中, 如何保证一直是用最新的K线来进行判断指标?






	   
    










	Log("+++++++++++++++++++++++++++++");
    // var endtime = new Date().getTime()
    // Log("执行程序总耗时为：",endtime-begintime,"毫秒")
	Log("+++++++++++++++++++++++++++++")



}
```

> 策略出处

https://www.fmz.com/strategy/131864

> 更新时间

2019-01-02 15:41:01
