
> Name

合约对冲_下单多线程版本

> Author

醉里挑灯看剑

> Strategy Description

老早以前开发的，JavaScript属于便学便开发，不喜忽喷，![](![IMG](https://www.fmz.com/upload/asset/1c0a7b8670d7529f0f63.jpeg))
有兴趣的可以在二次开发更新。 微信:fzqtdkj 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|ContractTypeIdxString|quarter|quarter|合约类型|
|MarginLevelIdxString|10|10|杠杆|
|VarietiesCount|true|交易品种数量|
|LoopInterval|2|延时|
|VarietiesString|BTC|ETH|交易品种|
|ArbitrageSpreadString|15|16|23.5|25.5|25.5#3.5|4|5|套利价差列表|
|ArbitrageAmountString|10|10|10|10|20#10|10|10|10|10|套利数量列表|
|CloseNarrowSpreadString|5|6|9.7|9.8|10.2#2.1|2.2|2.3|2.4|2|2|2|同一方向价差缩小平仓|
|NormalDiff|0.1|普通差价(图)|
|HighDiff|0.3|较高差价(图)|
|PriceCancelRatioString|0.02|0.02|撤单值(百分比)|
|SlideString|0.8|0.1|滑动值|
|BuyDepthIndex|true|买深度下标|
|SellDepthIndex|true|卖深度下标|
|MarketState|true|是否市价单|
|IsDeleteGloablConfig|false|是否删除_G配置|
|IsShowLog|false|是否显示日志|




|Button|Default|Description|
|----|----|----|
|ModifyArbitrageSpread|15|16|23.5|25.5|25.5#3.5|4|5|修改套利价差|
|ModifyArbitrageAmount|10|10|10|10|20#10|10|10|10|10|修改套利数量|
|ModifyCloseNarrowSpread|5|6|9.7|9.8|10.2#2.1|2.2|2.3|2.4|2|2|2|修改平仓价差|


> Source (javascript)

``` javascript
var ContractTypeIdx =[] //合约类型
var MarginLevelIdx  =[] //杠杆
var VarietiesIndx   =[] //交易品种

var PriceCancelRatio =[]; //撤单比例
var Slide =[];  //滑动值

var CloseNarrowSpreadList =[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]; //同一方向平仓值


var  curVarietiesIndex =[0,0,0,0,0,0,0,0,0,0,0,0]; //0 当前执行品种下标 1当前平台执行标记
var  curPlatformIndex  =[]; //用于标记当前哪两个平台在对比价差(比如说下标0、下标1的交易所相互对比)

var  ArbitrageSpreadList =[[],[],[],[],[],[],[],[],[],[],[],[]];   //套利价差
var  ArbitrageAmountList =[[],[],[],[],[],[],[],[],[],[],[],[]];   //交易数量

var OrderInfoArry  =[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];    //我的订单信息（主要记录订单类型与订单号）

var CanCelOrderCheckTimer =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];        //撤销订单检测时间

var LastBarTime    =[]; 

var DifferentHistory =[0,0,0,0,0] //价差历史


/////k线行情信息//
var __lastDiff = 0;
 

var cfg = {
			tooltip: {xDateFormat: '%Y-%m-%d %H:%M:%S, %A'},
			title : { text : '差价分析图'},
			rangeSelector: {
                buttons:  [{type: 'hour',count: 1, text: '1h'}, {type: 'hour',count: 3, text: '3h'}, {type: 'hour', count: 8, text: '8h'}, {type: 'all',text: 'All'}],
                selected: 0,
                inputEnabled: false
            },
			xAxis: { type: 'datetime'},
			yAxis : {
				plotLines : [{
					value : 0.0,
					color : 'black',
					dashStyle : 'shortdash',
					width : 3,
				}, {
					value : NormalDiff,
					color : 'green',
					dashStyle : 'shortdash',
					width : 1,
				}, {
					value : HighDiff,
					color : 'red',
					dashStyle : 'shortdash',
					width : 1,
				},{
					value : -NormalDiff,
					color : 'green',
					dashStyle : 'shortdash',
					width : 1,
				}, {
					value : -HighDiff,
					color : 'red',
					dashStyle : 'shortdash',
					width : 1,
				}]
			},
			series : [{
				name : '价差',
				data : [],
				tooltip: {
					valueDecimals: 2
				}
			}]
		};
function _N(v, precision) {
    if (typeof(precision) != 'number') {
        precision = 4;
    }
    var d = parseFloat(v.toFixed(Math.max(10, precision+5)));
    s = d.toString().split(".");
    if (s.length < 2 || s[1].length <= precision) {
        return d;
    }

    var b = Math.pow(10, precision);
    return Math.floor(d*b)/b;
}

function GetTicker(e) {
    if (typeof(e) == 'undefined') {
        e = exchange;
    }
    var ticker;
    while (!(ticker = e.GetTicker())) {
        Sleep(Interval);
    }
    return ticker;
}



var curArbitrageInfo =  //当前信息
   [ {
        SpreadIndex:0,    //价差下标
        UsedAmount:0,   //当前价差,已用数量
        LastArbitrageType:0 //最后一次套利类型,若套利类型发生变种,则套利价差下标也需进行变动.
    },
    {
        SpreadIndex:0,    //价差下标
        UsedAmount:0,   //当前价差,已用数量
        LastArbitrageType:0 //最后一次套利类型,若套利类型发生变种,则套利价差下标也需进行变动.
    },   
    {
        SpreadIndex:0,    //价差下标
        UsedAmount:0,   //当前价差,已用数量
        LastArbitrageType:0 //最后一次套利类型,若套利类型发生变种,则套利价差下标也需进行变动.
    },
    {
        SpreadIndex:0,    //价差下标
        UsedAmount:0,   //当前价差,已用数量
        LastArbitrageType:0 //最后一次套利类型,若套利类型发生变种,则套利价差下标也需进行变动.
    },    
   ];

//数量转换
function CoinToSheetsAmount(curPrice,CoinAmount,ContractPrice)
{
   var value =curPrice *CoinAmount / ContractPrice;
    if(value <1) {
      value =1;
    }
    return _N(value, 0);
}

//张数转换为数量
function SheetsToCoinAmount(curPrice,SheetsAmount,ContractPrice)
{
   var value =SheetsAmount * ContractPrice/curPrice;
// Log("SheetsAmount",SheetsAmount,"ContractPrice",ContractPrice,"curPrice",curPrice);
    return _N(value, 3);
}


//PD_LONG 多头仓位   PD_SHORT 空头仓位
function GetPosition(Index,posType) {
    var positions = _C(exchanges[Index].GetPosition);
    for (var i = 0; i < positions.length; i++) {
        if (positions[i].Type === posType) {
            return [positions[i].Price, positions[i].Amount];
        }
    }
    return [0, 0];
}

//获取交易所基础信息
function getExchangesBaseInfo() {

    var details = [];
    for (var i = 0; i < exchanges.length; i++) {   //只获取当前对比的两个交易所..
       var account  =null;
       var ticker   =null;
       var LongPosition  =null;
       var ShortPosition =null;
       var depth    =null;
       
       if(exchanges[curPlatformIndex[i]].GetName() == 'Futures_OKCoin' ||
          exchanges[curPlatformIndex[i]].GetName() == 'Futures_HuobiDM')
       {//合约则获取持仓信息
          LongPosition  = GetPosition(curPlatformIndex[i],PD_LONG);
          ShortPosition = GetPosition(curPlatformIndex[i],PD_SHORT);
       }
        
       var accountTemp =exchanges[curPlatformIndex[i]].Go("GetAccount"); 
       var tickerTemp  =exchanges[curPlatformIndex[i]].Go("GetTicker");
       var depthTemp   =exchanges[curPlatformIndex[i]].Go("GetDepth");
        
       ticker   =tickerTemp.wait();
       depth    =depthTemp.wait();
       account  =accountTemp.wait();
        if(ticker ==null ||depth ==null ||  account ==null)
        { //若数据获取失败了,则直接pass..
           break;
        }
      details.push({account: account, ticker: ticker,depth: depth,LongPosition:LongPosition,ShortPosition:ShortPosition});
        
    }
    return details;
}

//获取价格差  参数:现货下标,数据集,类型
function GetPriceDifferent(ExchangeInfo)
{
    var Different =0;
    var Type      =0;
    //正向计算获取价差   如果合约价格 >现货价格，则按 正的方式进行计算价差,否则按反的方式计算..
    
    var curSpread =ArbitrageSpreadList[curVarietiesIndex[0]][curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex];
    var curUsedAmount =curArbitrageInfo[curVarietiesIndex[1]].UsedAmount;
    var curMaxArbitrageAmount =ArbitrageAmountList[curVarietiesIndex[0]][curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex] ;
    
    var BuyAveragePrice  =[0,0,0,0,0,0];  //买均价
    var SellAveragePrice =[0,0,0,0,0,0];  //卖均价
    
    for(var n =0;n<=BuyDepthIndex;n++)
    {//买价
        BuyAveragePrice[0] +=ExchangeInfo[0].depth.Bids[n].Price;
        BuyAveragePrice[1] +=ExchangeInfo[1].depth.Bids[n].Price;        
    }

     BuyAveragePrice[0] =BuyAveragePrice[0] /(BuyDepthIndex+1); //均价
     BuyAveragePrice[1] =BuyAveragePrice[1] /(BuyDepthIndex+1); //均价    

    for(var n =0;n<=SellDepthIndex;n++)
    {//卖价
        SellAveragePrice[0] +=ExchangeInfo[0].depth.Asks[n].Price;
        SellAveragePrice[1] +=ExchangeInfo[1].depth.Asks[n].Price;        
    }

    SellAveragePrice[0] =SellAveragePrice[0] /(SellDepthIndex+1); //计算出均价
    SellAveragePrice[1] =SellAveragePrice[1] /(SellDepthIndex+1); //计算出均价        
   
   if(BuyAveragePrice[0] >SellAveragePrice[1] )
   { //交易所0开空 ,交易所1开多
       Different =BuyAveragePrice[0] -SellAveragePrice[1];
       Type =1;
   }
   else if(BuyAveragePrice[1] >SellAveragePrice[0])   
   { //交易所1开空 ,交易所0开多
       Different =BuyAveragePrice[1] -SellAveragePrice[0];
       Type =2;
   }
    
    if(ExchangeInfo[0].depth.Bids[0].Price <ExchangeInfo[0].depth.Bids[1].Price ||
       ExchangeInfo[1].depth.Bids[0].Price <ExchangeInfo[1].depth.Bids[1].Price ||
       ExchangeInfo[0].depth.Asks[0].Price >ExchangeInfo[0].depth.Asks[1].Price ||
       ExchangeInfo[1].depth.Asks[0].Price >ExchangeInfo[1].depth.Asks[1].Price)
    {
       Type =0;
       Different =0;
       Log("平台抽风,价格排序不正确!!!!");
    }
    
   return  {TYPE:Type,DIFFERENT:Different};  //返回值 类型(正向期空现多 ==1 反向期多现空==2) ,价差
}



//动态计算数量,依据盘口挂单数量多少进行最合适的数量
function  CalcAmount(ExchangeInfo,Type)
{
   var  amount =0;
    var BuyTotalAmount  =[0,0,0,0,0,0,0];
    var SellTotalAmount =[0,0,0,0,0,0,0];
    for(var n =0; n<=BuyDepthIndex;n++)
    {
       BuyTotalAmount[0] +=ExchangeInfo[0].depth.Bids[n].Amount;
       BuyTotalAmount[1] +=ExchangeInfo[1].depth.Bids[n].Amount;        
    }
    
    for (var n =0;n <=SellDepthIndex;n++)
    {
       SellTotalAmount[0] +=ExchangeInfo[0].depth.Asks[n].Amount;
       SellTotalAmount[1] +=ExchangeInfo[1].depth.Asks[n].Amount;        
    }
    
   if(Type  ==1)
   { //交易所0开空 ,交易所1开多
        amount =Math.min(BuyTotalAmount[0],SellTotalAmount[1]);
       //计算两个平台买卖深度最小值(取最小值进行下单,防止深度不足坑的很..)
       //取出深度最小的值但是深度最小值不能大于限定的下单张数
        amount =Math.min(amount,ArbitrageAmountList[curVarietiesIndex[0]][curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex]);       
   }
   else if(Type ==2)
   {//交易所0开多,交易所1开空
        amount =Math.min(SellTotalAmount[0],BuyTotalAmount[1]);
       //取出深度最小的值但是深度最小值不能大于限定的下单张数
        amount =Math.min(amount,ArbitrageAmountList[curVarietiesIndex[0]][curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex]);
   }
   else if(Type ==3)
   {// 0 平空 , 1 平多
       amount =Math.min(SellTotalAmount[0],BuyTotalAmount[1]);
       //取出深度最小的值但是深度最小值不能大于限定的下单张数      
       var MinPostion = Math.min(ExchangeInfo[0].ShortPosition[1],ExchangeInfo[1].LongPosition[1]); //平仓,取数量最小一边的数量
       amount =Math.min(amount,MinPostion);
   }
   else if(Type ==4)
   {//平 交易所0平多,交易所1平空
       amount =Math.min(BuyTotalAmount[0],SellTotalAmount[1]);       
       var MinPostion = Math.min(ExchangeInfo[0].LongPosition[1],ExchangeInfo[1].ShortPosition[1]); //平仓,取数量最小一边的数量      
       amount =Math.min(amount,MinPostion);     
   }
    
    if(Type ==1 || Type ==2)
    {//只有是开仓类型时才进行这样的判断...
     //剩余数量(最大可开仓数量)
      var SurplusAmount =ArbitrageAmountList[curVarietiesIndex[0]][curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex] -curArbitrageInfo[curVarietiesIndex[1]].UsedAmount;
      amount =amount >SurplusAmount?SurplusAmount:amount;   
      amount =amount>0?amount:1; //默认为张数(这里加个三目,主要目的在于防止计算出数量为0的值..)
    }
    else if(Type ==3 || Type ==4)
    {//平仓修改后分批平仓后，平仓数量不能大于当前档位最大数量
        //求出上一次开仓下标,若上一次开仓下标小于0,则强制归置为0
       if(curArbitrageInfo[curVarietiesIndex[1]].UsedAmount ==0)
       {//若当前档位没有多余数量则直接取上一次开仓的数量进行平仓计算
         var MinSpreadIndex =curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex -1 <=0?0:curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex -1; //最小价差下标
         amount =Math.min(amount,ArbitrageAmountList[curVarietiesIndex[0]][MinSpreadIndex]);          
       }
       else 
       { //若当前档位有零散数量,则直接取以零散数量为主的数量
          amount =Math.min(amount,curArbitrageInfo[curVarietiesIndex[1]].UsedAmount);             
       }
    }
    
    return amount; //返回张数值..
}

//开始套利函数
function OpenArbitrage(DifferentInfo,ExchangeInfo)
{
   var TreadAmount = CalcAmount(ExchangeInfo,DifferentInfo.TYPE);
    
   var OrderIdA   =null;
   var OrderIdB   =null;
   var OrderAWait =null;
   var OrderBWait =null;
    
   if(DifferentInfo.TYPE ==1)
   { //交易所0开空 ,交易所1开多
       while(OrderIdA ==null &&OrderIdB ==null)
       {         
         if(OrderIdA ==null)
         {
           exchanges[curPlatformIndex[0]].SetDirection("sell");       //设置下单类型为做空
           OrderAWait = exchanges[curPlatformIndex[0]].Go("Sell",MarketState ==true?-1:ExchangeInfo[0].depth.Bids[BuyDepthIndex].Price -Slide[curVarietiesIndex[0]],TreadAmount);  //原始数量下单  
         }
         if(OrderIdB ==null)
         {
           exchanges[curPlatformIndex[1]].SetDirection("buy");           //设置下单类型为做多 
           OrderBWait = exchanges[curPlatformIndex[1]].Go("Buy",MarketState ==true?-1:ExchangeInfo[1].depth.Asks[SellDepthIndex].Price +Slide[curVarietiesIndex[0]], TreadAmount); //数量以转换 
         }
          OrderIdA = OrderAWait.wait();
          OrderIdB = OrderBWait.wait();
           
          if(MarketState !=true &&(OrderIdA ==null || OrderIdB ==null)){ 
              ExchangeInfo = getExchangesBaseInfo();       //刷新数据(重新挂单)
          }
       }

       OrderInfoArry[curVarietiesIndex[1]].push({OrderId:OrderIdA,Type:2});  //订单信息保存至容器     
       OrderInfoArry[curVarietiesIndex[1]].push({OrderId:OrderIdB,Type:1});  //订单信息保存至容器              

   }   
   else if(DifferentInfo.TYPE ==2)
   { //交易所0开多,交易所1开空
       while(OrderIdA ==null &&OrderIdB ==null)
       {
         if(OrderIdA ==null)
         {           
           exchanges[curPlatformIndex[0]].SetDirection("buy");           //设置下单类型为做多 
           OrderAWait =exchanges[curPlatformIndex[0]].Go("Buy",MarketState ==true?-1:ExchangeInfo[0].depth.Asks[SellDepthIndex].Price +Slide[curVarietiesIndex[0]], TreadAmount); //数量以转换     
         }
         if(OrderIdB ==null)
         {          
           exchanges[curPlatformIndex[1]].SetDirection("sell");       //设置下单类型为做空
           OrderBWait =exchanges[curPlatformIndex[1]].Go("Sell",MarketState ==true?-1:ExchangeInfo[1].depth.Bids[BuyDepthIndex].Price -Slide[curVarietiesIndex[0]],TreadAmount);  //原始数量下单  
         }
          OrderIdA = OrderAWait.wait();
          OrderIdB = OrderBWait.wait();  
           
          if(MarketState !=true &&(OrderIdA ==null || OrderIdB ==null)){ 
              ExchangeInfo = getExchangesBaseInfo();       //刷新数据(重新挂单)
          }           
       }
       
       OrderInfoArry[curVarietiesIndex[1]].push({OrderId:OrderIdA,Type:1});          
       OrderInfoArry[curVarietiesIndex[1]].push({OrderId:OrderIdB,Type:2});                 
   }
    
    
          curArbitrageInfo[curVarietiesIndex[1]].UsedAmount +=TreadAmount;
          if(curArbitrageInfo[curVarietiesIndex[1]].UsedAmount >=ArbitrageAmountList[curVarietiesIndex[0]][curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex])
          {
             curArbitrageInfo[curVarietiesIndex[1]].UsedAmount =0;
              //下标最低值为0,小于0则强制归0
             curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex =curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex++ >ArbitrageSpreadList[curVarietiesIndex[0]].length?curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex:curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex++;
          }
    
      //修改当前下标类型
       curArbitrageInfo[curVarietiesIndex[1]].LastArbitrageType =DifferentInfo.TYPE;          
      
}


//平仓 结束一轮套利
function  CloseArbitrage(DifferentInfo,ExchangeInfo)
{
   var TreadAmount = CalcAmount(ExchangeInfo,DifferentInfo.TYPE);
    
   var OrderIdA   =null;
   var OrderIdB   =null;
   var OrderAWait =null;
   var OrderBWait =null;
    
    if(TreadAmount >0)
    {
      if(DifferentInfo.TYPE ==3)
      { //平 交易所0开空 ,交易所1开多
     //         平空 , 　　　平多
       while(OrderIdA ==null &&OrderIdB ==null) {
           
          if(OrderIdA ==null){ 
             exchanges[curPlatformIndex[0]].SetDirection("closesell"); 
             OrderAWait =exchanges[curPlatformIndex[0]].Go("Buy",MarketState ==true?-1:ExchangeInfo[0].depth.Asks[SellDepthIndex].Price +Slide[curVarietiesIndex[0]],TreadAmount); 
          }
           
           if(OrderIdB ==null){
             exchanges[curPlatformIndex[1]].SetDirection("closebuy");
             OrderBWait =exchanges[curPlatformIndex[1]].Go("Sell",MarketState ==true?-1:ExchangeInfo[1].depth.Bids[BuyDepthIndex].Price -Slide[curVarietiesIndex[0]], TreadAmount);  //卖出平多仓  
           }
           
           OrderIdA = OrderAWait.wait();
           OrderIdB = OrderBWait.wait();
          if(MarketState !=true &&(OrderIdA ==null || OrderIdB ==null)){ 
              ExchangeInfo = getExchangesBaseInfo();       //刷新数据(重新挂单)
          }                   
       }
         OrderInfoArry[curVarietiesIndex[1]].push({OrderId:OrderIdA,Type:4});       
         OrderInfoArry[curVarietiesIndex[1]].push({OrderId:OrderIdB,Type:3});             
      }
        
     else if(DifferentInfo.TYPE ==4)
     {//平 交易所0平多,交易所1平空
        while(OrderIdA ==null &&OrderIdB ==null) {     
          if(OrderIdA ==null)  {  
             exchanges[curPlatformIndex[0]].SetDirection("closebuy");
            OrderAWait =exchanges[curPlatformIndex[0]].Go("Sell",MarketState ==true?-1:ExchangeInfo[0].depth.Bids[BuyDepthIndex].Price -Slide[curVarietiesIndex[0]], TreadAmount);  //卖出平多仓    
          }
          if(OrderIdB ==null)  {
             exchanges[curPlatformIndex[1]].SetDirection("closesell"); 
             OrderBWait =exchanges[curPlatformIndex[1]].Go("Buy",MarketState ==true?-1:ExchangeInfo[1].depth.Asks[SellDepthIndex].Price +Slide[curVarietiesIndex[0]],TreadAmount);
          }
            OrderIdA = OrderAWait.wait();
            OrderIdB = OrderBWait.wait();        
          if(MarketState !=true &&(OrderIdA ==null || OrderIdB ==null)){ 
              ExchangeInfo = getExchangesBaseInfo();       //刷新数据(重新挂单)
           }
        }
         OrderInfoArry[curVarietiesIndex[1]].push({OrderId:OrderIdA,Type:3});           
         OrderInfoArry[curVarietiesIndex[1]].push({OrderId:OrderIdB,Type:4});             
      }  
    }
    else 
    {
       Log("平仓失败,有一方可平仓数量小于0张!!!,类型:",DifferentInfo.TYPE);
	   return;
    }
   
   curArbitrageInfo[curVarietiesIndex[1]].UsedAmount -=TreadAmount;
   if(curArbitrageInfo[curVarietiesIndex[1]].UsedAmount <=0)
   {
       curArbitrageInfo[curVarietiesIndex[1]].UsedAmount =0;
       //下标最低值为0,小于0则强制归0
       curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex =curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex--<=0?0:curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex--;   
   }       
}


//合约价格撤单检测
function FuturePriceCancelCheck(Index,ExchangeInfo,CancelValue)
{
    if(IsVirtual() ==true)
    {//若是模拟不用撤单功能....
      return ;
    }
    
    var orders = exchanges[Index].GetOrders();   
    var Type    =0;
    var OrderId =0;
    
    if(orders ==null ||orders.length <=0)   {//没有未成交订单则直接返回....
      return; 
    }
    
    //主要目的用于修正类型（开多、开空、平多、平空）
    for(var l =0;l <OrderInfoArry[curVarietiesIndex[1]].length;l++)    {
       for(var n =0;n <orders.length;n++)   {
           if(orders[n].Id ==OrderInfoArry[curVarietiesIndex[1]][l].OrderId)  {
               orders[n].Type =OrderInfoArry[curVarietiesIndex[1]][l].Type;
               break;
           }
        }
    }
    
    for(var n =0;n <orders.length;n++)
    {
        if(Math.abs(orders[n].Price - ExchangeInfo[Index].ticker.Last) >CancelValue)
        {//若超出指定值,则进行撤单,重新挂单..

            if(exchanges[Index].CancelOrder(orders[n].Id) ==true)
            {
               Sleep(2000);  //延时2秒,主要防止撤销订单后服务器无法及时响应..
               var curOrderInfo  =_C(exchanges[Index].GetOrder,orders[n].Id);
               if(curOrderInfo.Status !=ORDER_STATE_CANCELED || curOrderInfo.Status ==ORDER_STATE_CLOSED)
               {
                   Log("撤销重新挂单,撤单失败,当前订单状态不为已撤单,返回...当前状态:",curOrderInfo.Status,"当前id",orders[n].Id);
                   return false;
               }
               Log("撤单 类型,",orders[n].Type,"数量:",orders[n].Amount -orders[n].DealAmount,"交易所下标:",Index,"订单id:",orders[n].Id);
              if(orders[n].Type ==1)
              {
                  exchanges[Index].SetDirection("buy");       //开多
                  OrderId =_C(exchanges[Index].Buy,MarketState ==true?-1:ExchangeInfo[Index].depth.Asks[SellDepthIndex].Price +Slide[curVarietiesIndex[0]],orders[n].Amount -orders[n].DealAmount);       //原始数量下单
                  Type =1;
                  break;
              }
              else if(orders[n].Type ==2)
              {
                   exchanges[Index].SetDirection("sell");       //开空
                   OrderId =_C(exchanges[Index].Sell,MarketState ==true?-1:ExchangeInfo[Index].depth.Bids[BuyDepthIndex].Price -Slide[curVarietiesIndex[0]],orders[n].Amount -orders[n].DealAmount);       //原始数量下单    
                   Type =2;
                   break;
              }            
              else if(orders[n].Type ==3)
              {
                  exchanges[Index].SetDirection("closebuy");
                  OrderId =_C(exchanges[Index].Sell,MarketState ==true?-1:ExchangeInfo[Index].depth.Bids[BuyDepthIndex].Price -Slide[curVarietiesIndex[0]], orders[n].Amount -orders[n].DealAmount);  //卖出平多仓    
                  Type =3;
                  break;
              }
              else if(orders[n].Type ==4)
              {
                  exchanges[Index].SetDirection("closesell"); 
                  OrderId =_C(exchanges[Index].Buy,MarketState ==true?-1:ExchangeInfo[Index].depth.Asks[SellDepthIndex].Price +Slide[curVarietiesIndex[0]],orders[n].Amount -orders[n].DealAmount);       
                  Type =4;
                  break;
              }
            }
        }
    }
    
    if(Type !=0) //若数值不为空则将新订单信息push进去..
    {
       OrderInfoArry[curVarietiesIndex[1]].push({OrderId:OrderId,Type:Type});    //撤单后新的挂单依旧push进去保存..      
    }

    return false;   
}

//保存部分核心变量的值至本地
function SaveVarValue()
{
    _G("curArbitrageInfo"+curVarietiesIndex[1].toString()+"LastArbitrageType", curArbitrageInfo[curVarietiesIndex[1]].LastArbitrageType);
    _G("curArbitrageInfo"+curVarietiesIndex[1].toString()+"SpreadIndex", curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex);
    _G("curArbitrageInfo"+curVarietiesIndex[1].toString()+"UsedAmount", curArbitrageInfo[curVarietiesIndex[1]].UsedAmount);    
 
}
//读取本地内容
function ReadVarValue(n)
{
      curArbitrageInfo[n].LastArbitrageType  =_G("curArbitrageInfo"+n.toString()+"LastArbitrageType");
      curArbitrageInfo[n].SpreadIndex =_G("curArbitrageInfo"+n.toString()+"SpreadIndex");
      curArbitrageInfo[n].UsedAmount  =_G("curArbitrageInfo"+n.toString()+"UsedAmount");       
    if(curArbitrageInfo[n].LastArbitrageType ==null || curArbitrageInfo[n].SpreadIndex ==null || curArbitrageInfo[n].UsedAmount ==null)
    {//若配置内容无数据,则直接将其归0
       curArbitrageInfo[n].LastArbitrageType =0;
       curArbitrageInfo[n].SpreadIndex =0;
       curArbitrageInfo[n].UsedAmount  =0;
    }
    Log("读取本地配置值:",curArbitrageInfo[n].LastArbitrageType,curArbitrageInfo[n].SpreadIndex,curArbitrageInfo[n].UsedAmount);
}

function onTick(exchanges) {
    var records      =_C(exchanges[0].GetRecords,PERIOD_M1);   //默认1小时
    var ExchangeInfo = getExchangesBaseInfo();                 //获取数据
    
    if(ExchangeInfo.length <2 || records ==null || ExchangeInfo[0].account.Stocks ==0 || ExchangeInfo[1].account.Stocks ==0)  { 
       return;//若两个交易所有一个交易所无保证金或数据只有一个货币对,则直接pass
    }    
    
   var DifferentInfo =GetPriceDifferent(ExchangeInfo);
    
   DifferentHistory[curVarietiesIndex[0]] =DifferentInfo.DIFFERENT;  //记录不同品种价差记录,用于日志刷新...   
    
   if(ExchangeInfo[0].ShortPosition[1] !=ExchangeInfo[1].LongPosition[1]||
      ExchangeInfo[1].ShortPosition[1] !=ExchangeInfo[0].LongPosition[1])
   {    //若持仓数量不相等,则不进行任何开平仓操作,防止火币合约抽风,导致都是单边持仓..,这样最多只有一个价位单是单边,风险可控..
        DifferentInfo.TYPE =-1; //没有任何类型,直接屏蔽...
   }
    

    var Bar = records[records.length - 1];    
    if (LastBarTime[curVarietiesIndex[0]] !== Bar.Time) { 
        
      if(IsShowLog ==true)
      {//是否显示日志
          Log("价差信息:",DifferentInfo,"  持仓信息",ExchangeInfo[0].ShortPosition[1],ExchangeInfo[0].LongPosition[1],
          ExchangeInfo[1].ShortPosition[1],ExchangeInfo[1].LongPosition[1],"当前价差下标:",curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex,"当前已用数量:",curArbitrageInfo[curVarietiesIndex[1]].UsedAmount,
         "平台0价格:",ExchangeInfo[0].ticker.Last,"平台1价格:",ExchangeInfo[1].ticker.Last);
      }
        
        if(ExchangeInfo[0].ShortPosition[1] !=ExchangeInfo[1].LongPosition[1]||
           ExchangeInfo[1].ShortPosition[1] !=ExchangeInfo[0].LongPosition[1])
        { //若持仓数量不相等,则不进行任何开平仓操作,防止火币合约抽风,导致都是单边持仓..
           DifferentInfo.TYPE =-1; //没有任何类型,直接屏蔽...
        }
        
    //图表..    
    var diff = ExchangeInfo[0].ticker.Last - ExchangeInfo[1].ticker.Last;
    var strLogStatus ="";
    for(var LogN =0;LogN <VarietiesCount;LogN++)
    {
        var TempLogStatus ="符号 : " +VarietiesIndx[LogN]+"差价:"+ DifferentHistory[LogN].toString()+"\r\n";
        strLogStatus+=TempLogStatus;
    }
     strLogStatus+="\r\n说起爆仓我就想起了对冲,无风险对冲,有需要的老板可以联系,文体两开花,懂得自然懂!!\r\n 租用1888元/一月,3888元/季 微信:fzq250 ";

     LogStatus(strLogStatus);
        
    if (__lastDiff != 0) {
        if (Math.abs(Math.abs(diff) - Math.abs(__lastDiff)) > 200) {
            return;
        }
    }
      
        if(curVarietiesIndex[0] ==0)
        {
          cfg.yAxis.plotLines[0].value=diff;
     //     cfg.subtitle={text:'当前价差:' + diff};
          __chart.update([cfg,cfg]);
          __chart.add([0, [new Date().getTime(), diff]]);           
        }
        else if(curVarietiesIndex[0] ==1)
        {
          cfg.yAxis.plotLines[1].value=diff;
  //        cfg.subtitle={text:'当前价差:' + diff};
        __chart.update([cfg,cfg]);
        __chart.add([1, [new Date().getTime(), diff]]);
        }
        
      SaveVarValue();  //定时保存值至本地

      LastBarTime[curVarietiesIndex[0]] = Bar.Time; 
    }
    
    
    if((curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex <=0 &&curArbitrageInfo[curVarietiesIndex[1]].UsedAmount <=0)||
      (ExchangeInfo[0].ShortPosition[1]==0&&ExchangeInfo[0].LongPosition[1]==0&&
       ExchangeInfo[1].ShortPosition[1]==0&&ExchangeInfo[1].LongPosition[1]==0))   
    {//若当前价差下标与当前已用数量==0则重新初始化..
        var PlatformAOrder =exchanges[curPlatformIndex[0]].GetOrders();
        var PlatformBOrder =exchanges[curPlatformIndex[1]].GetOrders();
        if(PlatformAOrder !=null&&PlatformBOrder !=null &&PlatformAOrder.length <=0 &&PlatformBOrder.length <=0 )
        {//若两个平台都没有未成交订单并且又没有持仓订单,则订单数组可清空...，否则一旦清空有未成交订单则很麻烦..
          curArbitrageInfo[curVarietiesIndex[1]].LastArbitrageType =0;
          curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex =0;
          curArbitrageInfo[curVarietiesIndex[1]].UsedAmount  =0;
          OrderInfoArry[curVarietiesIndex[1]] =[];  //清空订单数组
        }
    }
    
    
    //正向计算获取价差   如果合约价格 >现货价格，则按 正的方式进行计算价差,否则按反的方式计算..
    
    var curOpenSpread =ArbitrageSpreadList[curVarietiesIndex[0]][curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex];
    var curUsedAmount =curArbitrageInfo[curVarietiesIndex[1]].UsedAmount;
    var curMaxArbitrageAmount =ArbitrageAmountList[curVarietiesIndex[0]][curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex] ;
    
    var LastArbitrageType =curArbitrageInfo[curVarietiesIndex[1]].LastArbitrageType;
    
    //当前平仓价差值    
     var  curCloseSpread  =CloseNarrowSpreadList[curVarietiesIndex[0]][curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex]; 

     if(curArbitrageInfo[curVarietiesIndex[1]].UsedAmount ==0)
     {//若当前档位没有多余数量则直接取上一次开仓的数量进行平仓计算
         var MinSpreadIndex  =curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex -1 <=0?0:curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex -1; //最小价差下标
         curCloseSpread  =CloseNarrowSpreadList[curVarietiesIndex[0]][MinSpreadIndex];
     } 
    
    
    if(curArbitrageInfo[curVarietiesIndex[1]].SpreadIndex <ArbitrageSpreadList[curVarietiesIndex[0]].length)
    {
       if(DifferentInfo.TYPE ==1 &&DifferentInfo.DIFFERENT >curOpenSpread &&curMaxArbitrageAmount >curUsedAmount)
       { //交易所0开空 ,交易所1开多
        DifferentInfo.TYPE =1;        
         OpenArbitrage(DifferentInfo,ExchangeInfo);
       }
       else if(DifferentInfo.TYPE ==2 &&DifferentInfo.DIFFERENT >curOpenSpread &&curMaxArbitrageAmount >curUsedAmount)
       {//交易所0开多,交易所1开空  
         DifferentInfo.TYPE =2;        
         OpenArbitrage(DifferentInfo,ExchangeInfo);      
       }
    }
    //平仓检测_剥离出去..
    if(LastArbitrageType ==1 &&DifferentInfo.TYPE ==1 &&DifferentInfo.DIFFERENT <=curCloseSpread)
    {//平仓 平0空 平1多
        DifferentInfo.TYPE =3;
        CloseArbitrage(DifferentInfo,ExchangeInfo);
    }
    else if(LastArbitrageType ==2 &&DifferentInfo.TYPE ==2 &&DifferentInfo.DIFFERENT <=curCloseSpread)
    {//平仓 平0多 平1空
        DifferentInfo.TYPE =4;
        CloseArbitrage(DifferentInfo,ExchangeInfo);       
    }
    
    
    //这里为交易所价差反转情况下平仓逻辑(A >B 现在为B<A 那么之前的开仓应平掉.)
    //这里不判断下标,只判断价差是否反转,反转则平..
    if(DifferentInfo.TYPE ==1 && DifferentInfo.DIFFERENT >0 &&
       ExchangeInfo[0].LongPosition[1]!=0 &&ExchangeInfo[1].ShortPosition[1]!=0)
    {//若类型==1并有相反方向开仓,则平掉 交易所0开多,交易所1开空  
        DifferentInfo.TYPE =4;
        CloseArbitrage(DifferentInfo,ExchangeInfo);    
        Log("价差发生反转,平仓...",DifferentInfo.TYPE);        
    }
    else if(DifferentInfo.TYPE ==2 && DifferentInfo.DIFFERENT >0 &&
            ExchangeInfo[0].ShortPosition[1]!=0 &&ExchangeInfo[1].LongPosition[1]!=0)
    {//若类型==2 并有相反方向开仓,则平掉 交易所0开空 ,交易所1开多
        DifferentInfo.TYPE =3;
        CloseArbitrage(DifferentInfo,ExchangeInfo);
        Log("价差发生反转,平仓...",DifferentInfo.TYPE);
    }
    
    
    if(CanCelOrderCheckTimer[curVarietiesIndex[1]]++ >3)
    { //每隔5秒检测一次撤单
       FuturePriceCancelCheck(curPlatformIndex[0],ExchangeInfo,PriceCancelRatio[curVarietiesIndex[0]]/100*ExchangeInfo[0].ticker.Last);
       FuturePriceCancelCheck(curPlatformIndex[1],ExchangeInfo,PriceCancelRatio[curVarietiesIndex[0]]/100*ExchangeInfo[1].ticker.Last);
       CanCelOrderCheckTimer[curVarietiesIndex[1]] =0;   //归0,重新计数
    }
    
    
     set_command();   //设置交互信息
}

function main() {
    Log("交易所0:",exchanges[0].GetName(),"符号:",exchanges[0].GetCurrency(),exchanges[0].GetAccount());
    Log("交易所1:",exchanges[1].GetName(),"符号:",exchanges[1].GetCurrency(),exchanges[1].GetAccount());    
    
    __chart = Chart(cfg);
    
    var strContractTypeIdxArray  =ContractTypeIdxString.split("|");    
    var strMarginLevelIdxArray   =MarginLevelIdxString.split("|");
    var strVarietiesArray        =VarietiesString.split("|");
    var strPriceCancelRatioArray =PriceCancelRatioString.split("|");    
    var strSlideArray            =SlideString.split("|");        
//    var strCloseNarrowSpreadArray =CloseNarrowSpreadString.split("|");
    
    var strArbitrageSpreadArrayA      =ArbitrageSpreadString.split("#");       
    var strArbitrageAmountA           =ArbitrageAmountString.split("#");   //#号拆分符号分割
 
    for(var n =0;n<strArbitrageSpreadArrayA.length;n++)   {  //拆分套利价差
        var strArbitrageSpreadArrayB      =strArbitrageSpreadArrayA[n].split("|");       
        for(var l=0;l <strArbitrageSpreadArrayB.length;l++)    {
           ArbitrageSpreadList[n][l] =parseFloat(strArbitrageSpreadArrayB[l]);        
        }
    }
    
      for(var n =0;n<strArbitrageAmountA.length;n++)   {   //拆分交易数量
         var strArbitrageAmountB      =strArbitrageAmountA[n].split("|");     //|号拆分具体数据         
        for(var l=0;l <strArbitrageAmountB.length;l++)    {
           ArbitrageAmountList[n][l] =parseFloat(strArbitrageAmountB[l]);        
        }
    }  

   var strCloseNarrowSpreadArray       =CloseNarrowSpreadString.split("#");    
    
   for(var n =0;n<strCloseNarrowSpreadArray.length;n++)   {   //拆分平仓价差
         var strCloseNarrowSpreadB   =strCloseNarrowSpreadArray[n].split("|");     //|号拆分具体数据         
        for(var l=0;l <strCloseNarrowSpreadB.length;l++)    {
           CloseNarrowSpreadList[n][l] =parseFloat(strCloseNarrowSpreadB[l]);
            Log("平仓价差:", CloseNarrowSpreadList[n][l] );
        }
    }  
    
    
    for(var n =0;n<2;n++)  //最大数量为交易品种的数量
    {
       ContractTypeIdx[n]       =strContractTypeIdxArray[n];
       MarginLevelIdx[n]        =parseInt(strMarginLevelIdxArray[n]);
       VarietiesIndx[n]         =strVarietiesArray[n];
       PriceCancelRatio[n]      =parseFloat(strPriceCancelRatioArray[n]);         
       Slide[n]                 =parseFloat(strSlideArray[n]);
 
    }
    
    for(var n =0;n<exchanges.length;n++)
    {
       exchanges[n].SetPrecision(3, 1);
       exchanges[n].SetRate(1);
       exchanges[n].SetContractType(ContractTypeIdx[n]);
       exchanges[n].SetMarginLevel(MarginLevelIdx[n]);   
        Log("交易所:",n,"当前合约类型:",ContractTypeIdx[n],"杠杆:",MarginLevelIdx[n]);
    }

    
    for(var a =0;a <exchanges.length;a++)   {
        for(var b =a+1;b <exchanges.length;b++)   {
         for(var n =0; n <VarietiesCount;n++)  {    
           ReadVarValue(a+b+n);  //读取本地配置信息                
        }
     }
   }
    
    if(IsDeleteGloablConfig ==true)
    { //删除_G保留的配置信息
       _G(null); // 删除所有全局变量
    }
       
    while(true)
    {
        for(var a =0;a <exchanges.length;a++)   {
            for(var b =a+1;b <exchanges.length;b++)   {
              curPlatformIndex[0] =a; //交易所0
              curPlatformIndex[1] =b; //交易所1                 
                
              for(var n =0; n <VarietiesCount;n++)  {
                curVarietiesIndex[0]  =n;   //当前执行下标,用于更换品种
                curVarietiesIndex[1]  =a+b+n;   //当前交易所所与交易对标记0\1\2\3\4\5以此类推..
                if(IsVirtual() ==false)
                {//实盘则进行符号切换
                  exchanges[curPlatformIndex[0]].IO("currency", VarietiesIndx[n]+"_USD");  //合约符号更改
                  exchanges[curPlatformIndex[1]].IO("currency", VarietiesIndx[n]+"_USD");  //现货符号更改            
                }     

                onTick(exchanges);
                Sleep(1000); //延时1秒
             }              
           }            
        }   
      Sleep(LoopInterval * 1000);     
    }   
    
}



//获取动态参数（策略交互内容）
 function set_command() {

     var get_command = GetCommand();//  GetCommand方法是获取参数方法，获取的参数是字符串形式 格式为 "参数名:参数值" 参见BotVS API文档
     if (get_command != null) {
         if (get_command.indexOf("ModifyArbitrageSpread:") == 0) {  //如果传入的参数名为A3（以“A3:”打头，即表明是A3参数）

            var  AAA = (get_command.replace("ModifyArbitrageSpread:", "")); //赋值给策略里面的AAA（将打头字符串替换为空，剩下就是我们的参数值）
            var strArbitrageSpreadArrayA  =AAA.split("#");      
             for(var n =0;n<strArbitrageSpreadArrayA.length;n++)   {  //拆分套利价差
               var strArbitrageSpreadArrayB      =strArbitrageSpreadArrayA[n].split("|");       
                 for(var l=0;l <strArbitrageSpreadArrayB.length;l++)    {
                  ArbitrageSpreadList[n][l] =parseFloat(strArbitrageSpreadArrayB[l]);     
                  Log("新的值:",ArbitrageSpreadList[n][l]);
               }
             }
         }
         
          if (get_command.indexOf("ModifyArbitrageAmount:") == 0) {  //如果传入的参数名为B3（以“B3:”打头，即表明是B3参数）

            var BBB = (get_command.replace("ModifyArbitrageAmount:", "")); //赋值给策略里面的BBB（将打头字符串替换为空，剩下就是我们的参数值）
             var strArbitrageAmountA  =BBB.split("#");   //#号拆分符号分割
             for(var n =0;n<strArbitrageAmountA.length;n++)   {   //拆分交易数量
                 var strArbitrageAmountB      =strArbitrageAmountA[n].split("|");     //|号拆分具体数据         
                 for(var l=0;l <strArbitrageAmountB.length;l++)    {
                    ArbitrageAmountList[n][l] =parseFloat(strArbitrageAmountB[l]);     
                     Log("新的值:",ArbitrageAmountList[n][l]);
                 }
              }                
         }

          if (get_command.indexOf("ModifyCloseNarrowSpread:") == 0) {  //如果传入的参数名为B3（以“B3:”打头，即表明是B3参数）

            var CCC = (get_command.replace("ModifyCloseNarrowSpread:", "")); //赋值给策略里面的BBB（将打头字符串替换为空，剩下就是我们的参数值）
            var strCloseNarrowSpreadArray  =CCC.split("#");    
    
            for(var n =0;n<strCloseNarrowSpreadArray.length;n++)   {   //拆分平仓价差
               var strCloseNarrowSpreadB   =strCloseNarrowSpreadArray[n].split("|");     //|号拆分具体数据         
               for(var l=0;l <strCloseNarrowSpreadB.length;l++)    {
                 CloseNarrowSpreadList[n][l] =parseFloat(strCloseNarrowSpreadB[l]);
                Log("新的值:", CloseNarrowSpreadList[n][l] );
               }
            }  
         }         
         
     }
 }


```

> Detail

https://www.fmz.com/strategy/134174

> Last Modified

2022-03-13 05:04:50
