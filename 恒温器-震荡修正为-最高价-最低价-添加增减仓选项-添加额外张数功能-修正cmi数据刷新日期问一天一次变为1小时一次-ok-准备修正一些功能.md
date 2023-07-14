
> Name

恒温器-震荡修正为-最高价-最低价-添加增减仓选项-添加额外张数功能-修正cmi数据刷新日期问一天一次变为1小时一次-ok-准备修正一些功能

> Author

醉里挑灯看剑

> Strategy Description

根据回测结果，同等参数下 貌似采用减仓模式比增仓模式，效果更好。。。
窘。。
![](![IMG](https://www.fmz.com/upload/asset/1c1f3f16b6a9fd54bfb4.jpeg))
这个版本为完善版把，自由度高点，随意，怎么用
微信:fzqtdkj，多少年前的老古董代码，研究那么多年头发都研究白了，屁也没研究出来，交易之难，难于上青天啊，tm的就差去修仙问道了。。。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|ContractTypeIdx|0|合约类型: this_week|next_week|quarter|
|MarginLevelIdx|0|杠杆: 10|20|
|LoopInterval|2|延时|
|AmountOP|true|数量|
|Cmi_kLine_Cycle|PERIOD_D1|CMI计算周期|
|Shock_kLine_Cycle|PERIOD_H1|震荡_K线周期|
|Trend_kLine_Cycle|PERIOD_D1|趋势_K线周期|
|Shock_Reduce_N|true|震荡_增减仓N值|
|Shock_Stop_N|2|震荡_止损N值|
|Shock_MaxAddCountLimit|4|震荡_最大增减仓次数|
|Shock_Departure|true|震荡_离场N值|
|Shock_ATR_Cycle|7|震荡_ATR周期|
|Shock_UseLeverval|true|震荡_杠杆使用比例|
|Shock_WarehouseMode|false|震荡_是否启用增仓模式|
|Shock_ExtraAmount_State|false|震荡_附加数量启用状态|
|Trend_MaxAddCountLimit|4|趋势最大增减仓数量|
|Trend_Reduce_N|true|趋势_增减仓N值|
|Trend_ATR_Cycle|14|趋势_ATR周期|
|Trend_Stop_N|2|趋势_止损N值|
|Trend_UseLeverval|true|趋势_杠杆使用比例|
|Trend_WarehouseMode|false|趋势_是否启用增仓模式|
|Trend_ExtraAmount_State|false|趋势_附加数量启用状态|


> Source (javascript)

``` javascript
/*backtest
start: 2021-01-01 00:00:00
end: 2021-02-13 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_OKCoin","currency":"ETH_USD"}]
args: [["ContractTypeIdx",2],["Shock_Reduce_N",2],["Shock_Departure",2],["Shock_ATR_Cycle",14],["Trend_Reduce_N",2],["Trend_UseLeverval",3]]
*/

var  InitAccount =0;
var  LastAccount =0;
var  LastBarTime =0;

var STATE_IDLE  = 0;
var STATE_LONG  = 1;
var STATE_SHORT = 2;

var curModeState =0;

var  curMarketTrendType ="无";   //当前行情走势类型
var  Shock_ATR =0;
var  Trend_ATR =0;

var  CmiVal  =0;  //cmi值

//震荡交易信息
var  ShockTreadInfo =
{
    Direction:STATE_IDLE,  //交易方向
    Amount:1,              //当前持仓数量
    AdmissionBasePrice:0,   //基础价格
    LadderIndex:-1,          //当前执行交易下标
    LastDirection:STATE_IDLE,
    ExtraAmount:0           //额外下单张数计数（若离场成功，则增加1，止损则归0）
}

//趋势交易信息
var  TrendTreadInfo =
{
    Direction:STATE_IDLE, //交易方向
    Amount:1,             //当前持仓数量
    AdmissionBasePrice:0,  //基础价格    
    LadderIndex:-1,        //当前执行交易下标   
    LastDirection:STATE_IDLE,
    ExtraAmount:0           //额外下单张数计数（若离场成功，则增加1，止损则归0）    
}

//依据合约类型,获取合约面值
function GetContractFcaeValue() { //只有比特币是100美元,其余均是10美元
    if (exchange.GetCurrency() == "BTC_USD") {
        return 100;
    } else {
        return 10;
    }
    return 100;
}

//PD_LONG 多头仓位   PD_SHORT 空头仓位
function GetPosition(posType) {
    var positions = exchange.GetPosition();
    for (var i = 0; i < positions.length; i++) {
        if (positions[i].Type === posType) {
            return [positions[i].Price, positions[i].Amount];
        }
    }
    return [0, 0];
}

var N_CMI =30;   //求值 cmi周期
//获取CMI值
function GetCmiVal(records)
{
    var Cmi =0;
      if(records.length >N_CMI)
      {
        var  HighPrice =TA.Highest(records, N_CMI, 'High');
        var  LowPrice  =TA.Lowest(records, N_CMI, 'Low');
         
        Cmi =Math.abs((records[records.length -1].Close - records[records.length -N_CMI-1].Close)/(HighPrice -LowPrice))*100;
      //   Log("Cmi：",Cmi,"最高价:",HighPrice,"最低价:",LowPrice,"最高价-最低价 价差:",HighPrice -LowPrice,"abs绝对值价差:",Math.abs((records[records.length -1].Close - records[records.length -29].Close)));
       }   
    
    return Cmi;
}

function GetKLineCycle(Cycle)
{
    if(Cycle =="PERIOD_H1")       {    return PERIOD_H1;      }
    else if(Cycle =="PERIOD_D1")  {    return PERIOD_D1;      }
    else if(Cycle =="PERIOD_M30") {    return PERIOD_M30;     }    
    else if(Cycle =="PERIOD_M15") {    return PERIOD_M15;     }        
    else if(Cycle =="PERIOD_M5")  {    return PERIOD_M5;      }         
    else                          {    return PERIOD_M1;      }                
}

//数量转换
function CoinToSheetsAmount(ticker,CoinAmount,ContractPrice)
{
   var value =ticker.Last *CoinAmount / ContractPrice;
    if(value <1) {
      value =1;
    }
    return _N(value, 0);
}



//计算下单数量 参数:使用杠杆比例（不使用填写1）、账户、ATR_N、资金使用比例（使用一半则填写0.5全部使用，填写1）、风险比例（最大 亏损值,亏损百分之1就填1，亏损2%就填写2）
function CalculationAmount(UseLevel,ticker, account, ATR_N,Stop_N, AssestRetion,RiskRatio) {
    var ContractFcaceValue = GetContractFcaeValue(); //计算出合约价值
    var TotalAssest = account.Stocks * ticker.Last * AssestRetion * UseLevel; //计算出总资金(usd)
    //计算出按当前资金所开仓的头寸
    var PositionCoinAmount = (TotalAssest * (RiskRatio / 100)) / (ATR_N[ATR_N.length - 1]*Stop_N); //头寸资金
    var Amount = CoinToSheetsAmount(ticker, PositionCoinAmount, ContractFcaceValue) / 4; //将币数量转换为张数
    //  Log("总资金:",TotalAssest,"计算出币数量:",PositionCoinAmount,"计算出下注币张数:",Amount, "ATR值:",ATR_N[ATR_N.length-1]," 合约面值:",ContractFcaceValue,"行情价格:",ticker.Last,"当前资金:",account.Stocks)
    if (Amount < 1) {  //最小张数为1张
        Amount = 1;
    }
 
    return parseInt(Amount);
}



//计算开仓或平仓数量 参数 走势类型、下单类型（开仓or平仓） 、增仓是否启用
function  CalcAmount(MarketTrendType,OperationType,WarehouseMode)
{
    var relustAmount =0; //数量
    var TempAmount   =0;
    if(MarketTrendType =="震荡")
    {
        if(ShockTreadInfo.ExtraAmount >=2)
        {
           ShockTreadInfo.ExtraAmount =2;
        }
        
        if(Shock_ExtraAmount_State ==true) //启用则增加值
        {
           TempAmount =ShockTreadInfo.Amount +ShockTreadInfo.ExtraAmount; //增加额外数量
        }
        else  {
           TempAmount =ShockTreadInfo.Amount; //若未启用，则直接赋予基础值
        }
        
        
       if(WarehouseMode ==true) //增仓模式
       {
          if(OperationType =="入场")               {
             relustAmount =TempAmount;
          }
          else if(OperationType =="增减仓")          {
             relustAmount =TempAmount;
          }
          else if(OperationType =="全部平仓")       {
             relustAmount =ShockTreadInfo.LadderIndex *TempAmount;
          }
       }
       else  //减仓模式
       {
          if(OperationType =="入场")               {
             relustAmount =TempAmount*Shock_MaxAddCountLimit;
          }
          else if(OperationType =="增减仓")          {
             relustAmount =TempAmount;             
          }
          else if(OperationType =="全部平仓")       {
             relustAmount =(Shock_MaxAddCountLimit -(ShockTreadInfo.LadderIndex-1)) *TempAmount; //（最大开仓数量 -(开仓阶梯下标-1)）* 数量==当前持有仓位
          }
       }      
    }
    else if(MarketTrendType =="趋势")
    {
        if(TrendTreadInfo.ExtraAmount >=2)
        {
           TrendTreadInfo.ExtraAmount =2;
        }        
        
        if(Trend_ExtraAmount_State ==true) {//启用则增加值
           TempAmount =TrendTreadInfo.Amount +TrendTreadInfo.ExtraAmount; //增加额外数量
        }
        else  {
           TempAmount =TrendTreadInfo.Amount; //若未启用，则直接赋予基础值
        }
        
        
       if(WarehouseMode ==true) //增仓模式
       {
          if(OperationType =="入场")               {
             relustAmount =TempAmount;
          }
          else if(OperationType =="增减仓")          {
             relustAmount =TempAmount;
          }
          else if(OperationType =="全部平仓")       {
             relustAmount =TrendTreadInfo.LadderIndex *TempAmount;
          }
       }
       else  //减仓模式
       {
          if(OperationType =="入场")               {
             relustAmount =TempAmount*Trend_MaxAddCountLimit;
          }
          else if(OperationType =="增减仓")         {
             relustAmount =TempAmount;             
          }
          else if(OperationType =="全部平仓")       {
             relustAmount =(Trend_MaxAddCountLimit -(TrendTreadInfo.LadderIndex-1)) *TempAmount; //（最大开仓数量 -(开仓阶梯下标-1)）* 数量==当前持有仓位
          }
       }        
    }
  return relustAmount;
}


//入场 
function Sys_In(MarketTrendType,ticker,records)
{
   if(MarketTrendType =="震荡")
   {
      var HighPrice = TA.Highest(records, 14, 'High');
      var LowPrice  = TA.Lowest(records, 14, 'Low');

      if (HighPrice == 0 || LowPrice == 0) {
          return;
      }
    
      if(ShockTreadInfo.LastDirection !=STATE_LONG &&  ticker.Last < LowPrice)
     {//多头进场
         Log("震荡入场 当前持有 多头 仓位:",GetPosition(PD_LONG)[1],"持有空头仓位:",GetPosition(PD_SHORT)[1]);    
         
         exchange.SetDirection("buy"); //设置下单类型为做多 
         exchange.Buy(ticker.Sell, CalcAmount("震荡","入场",Shock_WarehouseMode)); //以1000的价格，合约数量为2下单 
         ShockTreadInfo.AdmissionBasePrice =ticker.Last;
         ShockTreadInfo.Direction   =STATE_LONG;
         ShockTreadInfo.LadderIndex =1;
         ShockTreadInfo.LastDirection =STATE_LONG;
         
        return true;
     }
     else if(ShockTreadInfo.LastDirection !=STATE_SHORT && ticker.Last > HighPrice)
     {//空头进场
         Log("震荡入场 当前持有 多头 仓位:",GetPosition(PD_LONG)[1],"持有空头仓位:",GetPosition(PD_SHORT)[1]);    
         
         exchange.SetDirection("sell");       //设置下单类型为做空 
         exchange.Sell(ticker.Buy, CalcAmount("震荡","入场",Shock_WarehouseMode));      //以1000的价格，合约数量为2下单   
         ShockTreadInfo.AdmissionBasePrice =ticker.Last;
         ShockTreadInfo.Direction   =STATE_SHORT;
         ShockTreadInfo.LadderIndex =1;
         ShockTreadInfo.LastDirection =STATE_SHORT;         
        return true;
     }      
   }
   else if(MarketTrendType =="趋势")
   {

 //     var boll = TA.BOLL(records, 20, 2);
 //    var bollLength =boll[0].length;
 //    var upLine   = boll[0];
 //    var midLine  = boll[1];
 //    var downLine = boll[2];
      
    var HighPrice = TA.Highest(records, 25, 'High');
    var LowPrice = TA.Lowest(records, 25, 'Low');
       
       
   //   Log("上轨价:",upLine[bollLength -1],"中轨价:",midLine[bollLength -1],"下轨价:",downLine[bollLength -1]);
       
      if(ticker.Buy >HighPrice)
      {// 多头进场
     //    Log("趋势入场 当前持有 多头 仓位:",GetPosition(PD_LONG)[1],"持有空头仓位:",GetPosition(PD_SHORT)[1],"上轨价:",upLine[bollLength -1],"中轨价:",midLine[bollLength -1],"下轨价:",downLine[bollLength -1],"行情价:",ticker.Last);    
                    
         exchange.SetDirection("buy"); //设置下单类型为做多
         exchange.Buy(ticker.Sell, CalcAmount("趋势","入场",Trend_WarehouseMode)); //以1000的价格，合约数量为2下单
         TrendTreadInfo.AdmissionBasePrice =ticker.Last;
         TrendTreadInfo.Direction   =STATE_LONG;
         TrendTreadInfo.LadderIndex =1;
      }
      else if(ticker.Sell < LowPrice)
      {// 空头进场
    //     Log("趋势入场 当前持有 多头 仓位:",GetPosition(PD_LONG)[1],"持有空头仓位:",GetPosition(PD_SHORT)[1],"上轨价:",upLine[bollLength -1],"中轨价:",midLine[bollLength -1],"下轨价:",downLine[bollLength -1],"行情价:",ticker.Last);    
                
         exchange.SetDirection("sell");       //设置下单类型为做空 
         exchange.Sell(ticker.Buy, CalcAmount("趋势","入场",Trend_WarehouseMode));      //以1000的价格，合约数量为2下单   
         TrendTreadInfo.AdmissionBasePrice =ticker.Last;
         TrendTreadInfo.Direction   =STATE_SHORT;
         TrendTreadInfo.LadderIndex =1;
      }
       
   }
   
       
}

//减仓
function Sys_SubPosition(MarketTrendType,ticker,current_price,ATR_N)
{
    if(MarketTrendType =="震荡")
    {
     if(ShockTreadInfo.LadderIndex >4 || ShockTreadInfo.LadderIndex ==-1)
     {
          ShockTreadInfo.AdmissionBasePrice =0;
          ShockTreadInfo.LadderIndex        =-1; 
          ShockTreadInfo.Direction          =STATE_IDLE;
          return false;
     }
    
   if(ShockTreadInfo.Direction ==STATE_LONG)
   { //平掉多仓  基础价 + ATR_N的1/2 * 阶梯(用于统计开仓位置)

      if (current_price > (ShockTreadInfo.AdmissionBasePrice +Shock_Reduce_N*ATR_N[ATR_N.length -1] *ShockTreadInfo.LadderIndex))
      {  
          if(GetPosition(PD_LONG)[1] >= ShockTreadInfo.Amount)
          {
            exchange.SetDirection("closebuy");   //平多仓 
            var relust =exchange.Sell(ticker.Buy, CalcAmount("震荡","增减仓",Shock_WarehouseMode)); //以1000的价格，合约数量为2下单 
            if(relust !=null )
            {
              ShockTreadInfo.LadderIndex++;  //开仓成功,增加阶梯数量        
              return true;
            }
          }
      }
   }
   else if(ShockTreadInfo.Direction ==STATE_SHORT)
   { //减少空仓
    
      if (current_price < (ShockTreadInfo.AdmissionBasePrice -Shock_Reduce_N*ATR_N[ATR_N.length -1] *ShockTreadInfo.LadderIndex))
      {
          if(GetPosition(PD_SHORT)[1] >=ShockTreadInfo.Amount)
          {
           exchange.SetDirection("closesell"); 
           var relust =exchange.Buy(ticker.Sell, CalcAmount("震荡","增减仓",Shock_WarehouseMode));   //买入平空仓    

           if(relust !=null )
           {
             ShockTreadInfo.LadderIndex++;  //开仓成功,增加阶梯数量    
             return true;               
           }
         }
      }
   }
    return false;        
        
    }
    else if(MarketTrendType =="趋势")
    {
       if(TrendTreadInfo.LadderIndex >4 || TrendTreadInfo.LadderIndex ==-1)
       {
          TrendTreadInfo.AdmissionBasePrice =0;
          TrendTreadInfo.LadderIndex        =-1; 
          TrendTreadInfo.Direction          =STATE_IDLE;
          return false;
       }
    
      if(TrendTreadInfo.Direction ==STATE_LONG)
      { //平掉多仓  基础价 + ATR_N的1/2 * 阶梯(用于统计开仓位置)

        if (current_price > (TrendTreadInfo.AdmissionBasePrice +Trend_Reduce_N*ATR_N[ATR_N.length -1] *TrendTreadInfo.LadderIndex))
        {  
            if(GetPosition(PD_LONG)[1] >= TrendTreadInfo.Amount)
            {
              exchange.SetDirection("closebuy");   //平多仓 
              var relust =exchange.Sell(ticker.Buy, CalcAmount("趋势","增减仓",Trend_WarehouseMode)); //以1000的价格，合约数量为2下单 
              if(relust !=null )
              {
                TrendTreadInfo.LadderIndex++;  //开仓成功,增加阶梯数量        
                return true;
              }
            }
        }
      }
      else if(TrendTreadInfo.Direction ==STATE_SHORT)
      { //减少空仓
    
         if (current_price < (TrendTreadInfo.AdmissionBasePrice -Trend_Reduce_N*ATR_N[ATR_N.length -1] *TrendTreadInfo.LadderIndex))
         {
            if(GetPosition(PD_SHORT)[1] >=TrendTreadInfo.Amount)
            {
              exchange.SetDirection("closesell"); 
              var relust =exchange.Buy(ticker.Sell, CalcAmount("趋势","增减仓",Trend_WarehouseMode));   //买入平空仓    

              if(relust !=null )
              {
                TrendTreadInfo.LadderIndex++;  //开仓成功,增加阶梯数量    
                return true;               
              }
            }
          }
        }
        return false;
     }
}

//增仓
function Sys_AddPosition(MarketTrendType,ticker,ATR_N)
{
   if(MarketTrendType =="震荡")
   {
       if(ShockTreadInfo.LadderIndex >=Shock_MaxAddCountLimit)
       {
          return false;
       }
    
       if(ShockTreadInfo.Direction ==STATE_LONG)
       { //增加多仓  基础价 + ATR_N的1/2 * 阶梯(用于统计开仓位置)
          if (ticker.Sell > (ShockTreadInfo.AdmissionBasePrice +Shock_Reduce_N*ATR_N[ATR_N.length -1] *ShockTreadInfo.LadderIndex))
          {  
            exchange.SetDirection("buy"); //设置下单类型为做多 
            exchange.Buy(ticker.Sell, CalcAmount("震荡","增减仓",Shock_WarehouseMode)); //以1000的价格，合约数量为2下单           
            ShockTreadInfo.LadderIndex++;  //开仓成功,增加阶梯数量
            
            return true;
          }
       }
       else if(ShockTreadInfo.Direction ==STATE_SHORT)
       { //增加空仓
          if (ticker.Buy < (ShockTreadInfo.AdmissionBasePrice -Shock_Reduce_N*ATR_N[ATR_N.length -1] *ShockTreadInfo.LadderIndex))
          {
             exchange.SetDirection("sell");       //设置下单类型为做空 
             exchange.Sell(ticker.Buy, CalcAmount("震荡","增减仓",Shock_WarehouseMode)); //以1000的价格，合约数量为2下单    
             ShockTreadInfo.LadderIndex++;  //开仓成功,增加阶梯数量     
             return true;
          }
        }        
     }
     else if(MarketTrendType =="趋势")
     {
         if(TrendTreadInfo.LadderIndex >=Trend_MaxAddCountLimit)
         {
            return false;
         }
    
       if(TrendTreadInfo.Direction ==STATE_LONG)
       { //增加多仓  基础价 + ATR_N的1/2 * 阶梯(用于统计开仓位置)
         if (ticker.Sell > (TrendTreadInfo.AdmissionBasePrice +Trend_Reduce_N*ATR_N[ATR_N.length -1] *TrendTreadInfo.LadderIndex))
         {  
           exchange.SetDirection("buy"); //设置下单类型为做多 
           exchange.Buy(ticker.Sell,  CalcAmount("趋势","增减仓",Trend_WarehouseMode)); //以1000的价格，合约数量为2下单           
           TrendTreadInfo.LadderIndex++;  //开仓成功,增加阶梯数量
           return true;
          }
        }
       else if(TrendTreadInfo.Direction ==STATE_SHORT)
       { //增加空仓
         if (ticker.Buy < (TrendTreadInfo.AdmissionBasePrice -Trend_Reduce_N*ATR_N[ATR_N.length -1] *TrendTreadInfo.LadderIndex))
         {
            exchange.SetDirection("sell");       //设置下单类型为做空 
            exchange.Sell(ticker.Buy,  CalcAmount("趋势","增减仓",Trend_WarehouseMode)); //以1000的价格，合约数量为2下单    
            TrendTreadInfo.LadderIndex++;  //开仓成功,增加阶梯数量     
            return true;
         }
       }
     }
    return false;
}



//止损  以atr值 为止损标的。。
function Stop_Loss(MarketTrendType,ticker,current_price,ATR_N)
{
   if(MarketTrendType =="震荡")
   {
      if(ShockTreadInfo.Direction ==STATE_LONG)
      {
        //计算出最后一次成交价  LadderIndex[Index]-1 目的是因为 头寸建立后赋值是1，必须减少1次才能计算出最后一次开仓价。
        var LastPrice =ShockTreadInfo.AdmissionBasePrice + Shock_Reduce_N *ATR_N[ATR_N.length -1] *(ShockTreadInfo.LadderIndex-1);
   //      Log("止损调用","current_price:",current_price,"ATR_N*2:",ATR_N[ATR_N.length -1]*2," 最后一次成交价:",LastPrice,"ATR_N值:",ATR_N[ATR_N.length -1],"阶梯次数:",LadderIndex[Index],"基础价:",AdmissionBasePrice[Index]);
       
        //依旧海龟法则，最大止损就是价格波动2N
        if(LastPrice -current_price >ATR_N[ATR_N.length -1]*Shock_Stop_N)
        { //下跌则平多
          var OldPostionAmount = GetPosition(PD_LONG)[1];
          for(var nCount =0;nCount <10;nCount++)
          {
             var PostionAmount = GetPosition(PD_LONG)[1];
             var CloseAmount =CalcAmount("震荡","全部平仓",Shock_WarehouseMode); //（最大开仓数量 -(开仓阶梯下标-1)）* 数量==当前持有仓位
             if(OldPostionAmount -CloseAmount >=PostionAmount || PostionAmount ==0 )     {
                break;
             }
            else if(CloseAmount >PostionAmount)
            {
               CloseAmount =PostionAmount;
            }              
              
             exchange.SetDirection("closebuy"); 
             exchange.Sell(ticker.Buy, CloseAmount);  //卖出平多仓     
             Sleep(1000);
             Log("震荡 多仓止损 当前持有 多头 仓位:",GetPosition(PD_LONG)[1],"持有空头仓位:",GetPosition(PD_SHORT)[1],"平仓数量:",CloseAmount);                
          }
          ShockTreadInfo.AdmissionBasePrice =0;
          ShockTreadInfo.LadderIndex        =-1;
          ShockTreadInfo.Direction          =STATE_IDLE;
          ShockTreadInfo.ExtraAmount        =0; // 额外数量
          return true;
        }
                 
      }
      else if(ShockTreadInfo.Direction ==STATE_SHORT)
      {
        //计算出最后一次成交价
        var LastPrice =ShockTreadInfo.AdmissionBasePrice - Shock_Reduce_N *ATR_N[ATR_N.length -1] *(ShockTreadInfo.LadderIndex-1);
        //依旧海龟法则，最大止损就是价格波动2N
        if(current_price -LastPrice >ATR_N[ATR_N.length -1]*Shock_Stop_N)
        {//上涨则平空
             var OldPostionAmount =GetPosition(PD_SHORT)[1];                
             for(var nCount =0;nCount <10;nCount++)
             {
                var PostionAmount =GetPosition(PD_SHORT)[1];
                var CloseAmount =CalcAmount("震荡","全部平仓",Shock_WarehouseMode); //（最大开仓数量 -(开仓阶梯下标-1)）* 数量==当前持有仓位
                if(OldPostionAmount -CloseAmount >=PostionAmount || PostionAmount ==0 )     {
                   break;
               }
               else if(CloseAmount >PostionAmount)
               {
                 CloseAmount =PostionAmount;
               }
                 
               exchange.SetDirection("closesell"); 
               exchange.Buy(ticker.Sell, CloseAmount);   //买入平空仓     
               Sleep(1000);
             Log("震荡 空仓止损 当前持有 多头 仓位:",GetPosition(PD_LONG)[1],"持有空头仓位:",GetPosition(PD_SHORT)[1],"平仓数量:",CloseAmount);                   
             }
            ShockTreadInfo.AdmissionBasePrice =0;
            ShockTreadInfo.LadderIndex        =-1;
            ShockTreadInfo.Direction          =STATE_IDLE;
            ShockTreadInfo.ExtraAmount        =0; // 额外数量            
            return true;
       }
     }
   }
   else if(MarketTrendType =="趋势")
   {
      if(TrendTreadInfo.Direction ==STATE_LONG)
      {
        //计算出最后一次成交价  LadderIndex[Index]-1 目的是因为 头寸建立后赋值是1，必须减少1次才能计算出最后一次开仓价。
        var LastPrice =TrendTreadInfo.AdmissionBasePrice + Trend_Reduce_N *ATR_N[ATR_N.length -1] *(TrendTreadInfo.LadderIndex-1);
   //      Log("止损调用","current_price:",current_price,"ATR_N*2:",ATR_N[ATR_N.length -1]*2," 最后一次成交价:",LastPrice,"ATR_N值:",ATR_N[ATR_N.length -1],"阶梯次数:",LadderIndex[Index],"基础价:",AdmissionBasePrice[Index]);
       
        //依旧海龟法则，最大止损就是价格波动2N
        if(LastPrice -current_price >ATR_N[ATR_N.length -1]*Trend_Stop_N)
        { //下跌则平多
          var OldPostionAmount = GetPosition(PD_LONG)[1];
          for(var nCount =0;nCount <10;nCount++)
          {
             var PostionAmount = GetPosition(PD_LONG)[1];
             var CloseAmount =CalcAmount("趋势","全部平仓",Trend_WarehouseMode);//（最大开仓数量 -(开仓阶梯下标-1)）* 数量==当前持有仓位
             if(OldPostionAmount -CloseAmount >=PostionAmount || PostionAmount ==0 )     {
                break;
             }
            else if(CloseAmount >PostionAmount)
            {
               CloseAmount =PostionAmount;
            }
              
             exchange.SetDirection("closebuy"); 
             exchange.Sell(ticker.Buy, CloseAmount);  //卖出平多仓     
             Sleep(1000);
             Log(" 趋势 多仓止损 当前持有 多头 仓位:",GetPosition(PD_LONG)[1],"持有空头仓位:",GetPosition(PD_SHORT)[1],"平仓数量:",CloseAmount);                
          }
          TrendTreadInfo.AdmissionBasePrice =0;
          TrendTreadInfo.LadderIndex        =-1;
          TrendTreadInfo.Direction          =STATE_IDLE;
          TrendTreadInfo.ExtraAmount        =0; // 额外数量            
          return true;
        }            
      }
      else if(TrendTreadInfo.Direction ==STATE_SHORT)
      {
        //计算出最后一次成交价
        var LastPrice =TrendTreadInfo.AdmissionBasePrice - Trend_Reduce_N *ATR_N[ATR_N.length -1] *(TrendTreadInfo.LadderIndex-1);
        //依旧海龟法则，最大止损就是价格波动2N
        if(current_price -LastPrice >ATR_N[ATR_N.length -1]*Trend_Stop_N)
        {//上涨则平空
             var OldPostionAmount =GetPosition(PD_SHORT)[1];                
             for(var nCount =0;nCount <10;nCount++)
             {
                var PostionAmount =GetPosition(PD_SHORT)[1];
                var CloseAmount =CalcAmount("趋势","全部平仓",Trend_WarehouseMode);//（最大开仓数量 -(开仓阶梯下标-1)）* 数量==当前持有仓位
                if(OldPostionAmount -CloseAmount >=PostionAmount || PostionAmount ==0 )     {
                   break;
               }
               else if(CloseAmount >PostionAmount)
               {
                 CloseAmount =PostionAmount;
               }
                 
               exchange.SetDirection("closesell"); 
               exchange.Buy(ticker.Sell, CloseAmount);   //买入平空仓     
               Sleep(1000);
             Log("趋势 空仓止损 当前持有 多头 仓位:",GetPosition(PD_LONG)[1],"持有空头仓位:",GetPosition(PD_SHORT)[1],"平仓数量:",CloseAmount);                   
             }
            TrendTreadInfo.AdmissionBasePrice =0;
            TrendTreadInfo.LadderIndex        =-1;
            TrendTreadInfo.Direction          =STATE_IDLE;
            TrendTreadInfo.ExtraAmount        =0;  // 额外数量
            return true;
       }
     }      
   }
    
    return false;
}

//  离场 
function Sys_OutClosePosition(MarketTrendType,ticker,records,positions,ATR_N)
{
   if(MarketTrendType =="震荡")
   {
       
      if(ShockTreadInfo.Direction ==STATE_LONG)
      {
         var HighPrice = TA.Highest(records, 14, 'High');
          
          //计算出下一增仓价，若当前价大于则直接离场。。
         var NextAddPrice =ShockTreadInfo.AdmissionBasePrice +Shock_Reduce_N*ATR_N[ATR_N.length -1] *ShockTreadInfo.LadderIndex;
          
         if(ticker.Last > HighPrice || (ticker.Last > NextAddPrice && ShockTreadInfo.LadderIndex >=Shock_MaxAddCountLimit))
         {//多头离场
         
             var CloseAmount =CalcAmount("震荡","全部平仓",Shock_WarehouseMode); //（最大开仓数量 -(开仓阶梯下标-1)）* 数量==当前持有仓位  
             if(CloseAmount !=0)
             {
               exchange.SetDirection("closebuy");
               exchange.Sell(ticker.Buy, CloseAmount);  //卖出平多仓
             }
              ShockTreadInfo.AdmissionBasePrice =0;
              ShockTreadInfo.Direction          =STATE_IDLE;
              ShockTreadInfo.LadderIndex        =-1;
              ShockTreadInfo.ExtraAmount        ++;  // 额外数量    
              Log("震荡 多仓离场 当前持有 多头 仓位:",GetPosition(PD_LONG)[1],"持有空头仓位:",GetPosition(PD_SHORT)[1],"平仓数量:",CloseAmount);        
            return true;
          }          
      }
      else if(ShockTreadInfo.Direction ==STATE_SHORT)
      {//空头离场
        var LowPrice = TA.Lowest(records, 14, 'Low');
          
        var NextSbuPrice =ShockTreadInfo.AdmissionBasePrice - Shock_Reduce_N *ATR_N[ATR_N.length -1] *(ShockTreadInfo.LadderIndex);
          
         if(ticker.Last < LowPrice || (ticker.Last < NextSbuPrice && ShockTreadInfo.LadderIndex >=Shock_MaxAddCountLimit))
         {            
             var CloseAmount =CalcAmount("震荡","全部平仓",Shock_WarehouseMode); //（最大开仓数量 -(开仓阶梯下标-1)）* 数量==当前持有仓位
             if(CloseAmount !=0)
             {
               exchange.SetDirection("closesell"); 
               exchange.Buy(ticker.Sell, CloseAmount);   //买入平空仓
             }
              ShockTreadInfo.AdmissionBasePrice =0;
              ShockTreadInfo.Direction          =STATE_IDLE;
              ShockTreadInfo.LadderIndex        =-1;
              ShockTreadInfo.ExtraAmount        ++;  // 额外数量                 
              Log("震荡 空仓离场 当前持有 多头 仓位:",GetPosition(PD_LONG)[1],"持有空头仓位:",GetPosition(PD_SHORT)[1],"平仓数量:",CloseAmount);              
            return true;
          }                   
      }
       
       
   }
   else if(MarketTrendType =="趋势")
   {
//      var boll = TA.BOLL(records, 14, 2);  //这里值，原本是20，修正为14貌似效果更好?
//      var bollLength =boll[0].length;
//      var upLine   = boll[0];
//      var midLine  = boll[1];
//      var downLine = boll[2];
      
    var HighPrice = TA.Highest(records, 14, 'High');
    var LowPrice = TA.Lowest(records, 14, 'Low');      
       
       
   //   Log("上轨价:",upLine[bollLength -1],"中轨价:",midLine[bollLength -1],"下轨价:",downLine[bollLength -1]);
       
      if( TrendTreadInfo.Direction ==STATE_LONG )
      {// 多头离场
          if(ticker.Buy <LowPrice)
          {
              var CloseAmount =CalcAmount("趋势","全部平仓",Trend_WarehouseMode);//（最大开仓数量 -(开仓阶梯下标-1)）* 数量==当前持有仓位          
              exchange.SetDirection("closebuy");
              exchange.Sell(ticker.Buy, CloseAmount);  //卖出平多仓
             
              TrendTreadInfo.AdmissionBasePrice =0;
              TrendTreadInfo.Direction          =STATE_IDLE;
              TrendTreadInfo.LadderIndex        =-1;
              TrendTreadInfo.ExtraAmount        ++;  // 额外数量
              Log("趋势 多仓离场 当前持有 多头 仓位:",GetPosition(PD_LONG)[1],"持有空头仓位:",GetPosition(PD_SHORT)[1],"平仓数量:",CloseAmount);        
              return true;
          }
      }
      else if(TrendTreadInfo.Direction ==STATE_SHORT )
      {// 空头离场
          if(ticker.Sell >HighPrice)
          {
              var CloseAmount =CalcAmount("趋势","全部平仓",Trend_WarehouseMode); //（最大开仓数量 -(开仓阶梯下标-1)）* 数量==当前持有仓位          
              exchange.SetDirection("closesell"); 
              exchange.Buy(ticker.Sell, CloseAmount);   //买入平空仓
             
              TrendTreadInfo.AdmissionBasePrice =0;
              TrendTreadInfo.Direction          =STATE_IDLE;
              TrendTreadInfo.LadderIndex        =-1;
              TrendTreadInfo.ExtraAmount        ++;  // 额外数量
              Log("趋势 空仓离场 当前持有 多头 仓位:",GetPosition(PD_LONG)[1],"持有空头仓位:",GetPosition(PD_SHORT)[1],"平仓数量:",CloseAmount);              
              return true;
           }      
      }
              
   }

}
 

//回调离场
function CallbackDeparture(MarketTrendType,ticker,current_price,ATR_N)
{
    if(MarketTrendType =="震荡")
    {
 
      if(ShockTreadInfo.Direction ==STATE_LONG && ShockTreadInfo.LadderIndex >2)
      {
        //计算出最后一次成交价  ShockTreadInfo.LadderIndex-1 目的是因为 头寸建立后赋值是1，必须减少1次才能计算出最后一次开仓价。
        var LastPrice =ShockTreadInfo.AdmissionBasePrice + 0.5 *ATR_N[ATR_N.length -1] *(ShockTreadInfo.LadderIndex-1);
        var BackedPrice =ShockTreadInfo.AdmissionBasePrice + 0.5 *ATR_N[ATR_N.length -1] *(ShockTreadInfo.LadderIndex-2);    //上一个价格，若回调到上一个价位，则直接止损    
   //      Log("止损调用","current_price:",current_price,"ATR_N*2:",ATR_N[ATR_N.length -1]*2," 最后一次成交价:",LastPrice,"ATR_N值:",ATR_N[ATR_N.length -1],"阶梯次数:",ShockTreadInfo.LadderIndex,"基础价:",ShockTreadInfo.AdmissionBasePrice);
        
        // 若当前价格小于 开仓档位-2个价格 则表明正在回调，直接离场，止损。。
        if(current_price <BackedPrice)
        { //下跌则平多
          var OldPostionAmount = GetPosition(PD_LONG)[1];            
          for(var nCount =0;nCount <10;nCount++)
          {
             var PostionAmount = GetPosition(PD_LONG)[1];
             var CloseAmount =CalcAmount("震荡","全部平仓",Shock_WarehouseMode); //（最大开仓数量 -(开仓阶梯下标-1)）* 数量==当前持有仓位
             if(OldPostionAmount -CloseAmount >=PostionAmount || PostionAmount ==0 )     {
                break;
             }
            else if(CloseAmount >PostionAmount)
            {
               CloseAmount =PostionAmount;
            }              
              
             exchange.SetDirection("closebuy"); 
             exchange.Sell(ticker.Buy, CloseAmount);  //卖出平多仓     
             Sleep(1000);
          }
          ShockTreadInfo.AdmissionBasePrice =0;
          ShockTreadInfo.LadderIndex =-1;
          ShockTreadInfo.Direction =STATE_IDLE;     
         return true;
        }
      }
      else if(ShockTreadInfo.Direction ==STATE_SHORT && ShockTreadInfo.LadderIndex >2)
      {
        //计算出最后一次成交价
        var LastPrice =ShockTreadInfo.AdmissionBasePrice - 0.5 *ATR_N[ATR_N.length -1] *(ShockTreadInfo.LadderIndex-1);
        var BackedPrice  =ShockTreadInfo.AdmissionBasePrice - 0.5 *ATR_N[ATR_N.length -1] *(ShockTreadInfo.LadderIndex-2);
        //当前价 》 回调价，表明正在回调，止损  离场
        if(current_price  >BackedPrice)
        {//上涨则平空
             var OldPostionAmount =GetPosition(PD_SHORT)[1];                
             for(var nCount =0;nCount <10;nCount++)
             {
                var PostionAmount =GetPosition(PD_SHORT)[1];
                var CloseAmount =CalcAmount("震荡","全部平仓",Shock_WarehouseMode); //（最大开仓数量 -(开仓阶梯下标-1)）* 数量==当前持有仓位
                if(OldPostionAmount -CloseAmount >=PostionAmount || PostionAmount ==0 )     {
                   break;
               }
               else if(CloseAmount >PostionAmount)
               {
                 CloseAmount =PostionAmount;
               }                 
                 
               exchange.SetDirection("closesell"); 
               exchange.Buy(ticker.Sell, CloseAmount);   //买入平空仓     
               Sleep(1000);
             }
            ShockTreadInfo.AdmissionBasePrice =0;
            ShockTreadInfo.LadderIndex =-1; 
            ShockTreadInfo.Direction   =STATE_IDLE;
            return true;       
         }
       }
    }
    else if(MarketTrendType =="趋势")
    {
 
      if(TrendTreadInfo.Direction ==STATE_LONG && TrendTreadInfo.LadderIndex >2)
      {
        //计算出最后一次成交价  TrendTreadInfo.LadderIndex-1 目的是因为 头寸建立后赋值是1，必须减少1次才能计算出最后一次开仓价。
        var LastPrice =TrendTreadInfo.AdmissionBasePrice + 0.5 *ATR_N[ATR_N.length -1] *(TrendTreadInfo.LadderIndex-1);
        var BackedPrice =TrendTreadInfo.AdmissionBasePrice + 0.5 *ATR_N[ATR_N.length -1] *(TrendTreadInfo.LadderIndex-2);    //上一个价格，若回调到上一个价位，则直接止损    
   //      Log("止损调用","current_price:",current_price,"ATR_N*2:",ATR_N[ATR_N.length -1]*2," 最后一次成交价:",LastPrice,"ATR_N值:",ATR_N[ATR_N.length -1],"阶梯次数:",TrendTreadInfo.LadderIndex,"基础价:",TrendTreadInfo.AdmissionBasePrice);
        
        // 若当前价格小于 开仓档位-2个价格 则表明正在回调，直接离场，止损。。
        if(current_price <BackedPrice)
        { //下跌则平多
          var OldPostionAmount = GetPosition(PD_LONG)[1];            
          for(var nCount =0;nCount <10;nCount++)
          {
             var PostionAmount = GetPosition(PD_LONG)[1];
             var CloseAmount =CalcAmount("趋势","全部平仓",Trend_WarehouseMode); //（最大开仓数量 -(开仓阶梯下标-1)）* 数量==当前持有仓位
             if(OldPostionAmount -CloseAmount >=PostionAmount || PostionAmount ==0 )     {
                break;
             }
            else if(CloseAmount >PostionAmount)
            {
               CloseAmount =PostionAmount;
            }              
              
             exchange.SetDirection("closebuy"); 
             exchange.Sell(ticker.Buy, CloseAmount);  //卖出平多仓     
             Sleep(1000);
          }
          TrendTreadInfo.AdmissionBasePrice =0;
          TrendTreadInfo.LadderIndex =-1;
          TrendTreadInfo.Direction =STATE_IDLE;     
         return true;
        }
    }
    else if(TrendTreadInfo.Direction ==STATE_SHORT && TrendTreadInfo.LadderIndex >2)
    {
        //计算出最后一次成交价
        var LastPrice =TrendTreadInfo.AdmissionBasePrice - 0.5 *ATR_N[ATR_N.length -1] *(TrendTreadInfo.LadderIndex-1);
        var BackedPrice  =TrendTreadInfo.AdmissionBasePrice - 0.5 *ATR_N[ATR_N.length -1] *(TrendTreadInfo.LadderIndex-2);
        //当前价 》 回调价，表明正在回调，止损  离场
        if(current_price  >BackedPrice)
        {//上涨则平空
             var OldPostionAmount =GetPosition(PD_SHORT)[1];                
             for(var nCount =0;nCount <10;nCount++)
             {
                var PostionAmount =GetPosition(PD_SHORT)[1];
                var CloseAmount =CalcAmount("趋势","全部平仓",Trend_WarehouseMode); //（最大开仓数量 -(开仓阶梯下标-1)）* 数量==当前持有仓位
                if(OldPostionAmount -CloseAmount >=PostionAmount || PostionAmount ==0 )     {
                   break;
               }
               else if(CloseAmount >PostionAmount)
               {
                 CloseAmount =PostionAmount;
               }                 
                 
               exchange.SetDirection("closesell"); 
               exchange.Buy(ticker.Sell, CloseAmount);   //买入平空仓     
               Sleep(1000);
             }
            TrendTreadInfo.AdmissionBasePrice =0;
            TrendTreadInfo.LadderIndex  =-1;
            TrendTreadInfo.Direction    =STATE_IDLE;
            return true;       
        }
      }          
    }
return false;
}




//处理流程
function MarketTrendProc(MarketTrendType,records,IsOpeningAllowed)
{
    var positions  = _C(exchange.GetPosition); //获取持仓信息 
    var ticker     = _C(exchange.GetTicker);   //行情价格
    var account    = _C(exchange.GetAccount);  //获取账户信息    
    
    var curTotalAccount =account.Stocks +account.FrozenStocks
    
    if (account.Stocks < 0.01) //保证金不足
    {
        return;
    }
    
    
   if(MarketTrendType =="震荡")
   {

       if(ShockTreadInfo.LadderIndex ==-1 && IsOpeningAllowed ==true) 
       {//头寸建立检测
         Shock_ATR  = TA.ATR(records,Shock_ATR_Cycle);    
         ShockTreadInfo.Amount =CalculationAmount(Shock_UseLeverval,ticker, account, Shock_ATR,Shock_Stop_N, 1,1);         
         if(Sys_In("震荡",ticker,records)==true)
         {
            Log("入市 - 下标:","震荡","current_price",ticker.Last,"对比价:",ShockTreadInfo.AdmissionBasePrice -Shock_Reduce_N*Shock_ATR[Shock_ATR.length -1] *ShockTreadInfo.LadderIndex,"最近一根ATR:",Shock_ATR[Shock_ATR.length -1]);               
         }
       }
        else
        { //减仓
            if(Shock_WarehouseMode ==true)
            {
               if(Sys_AddPosition("震荡",ticker,Shock_ATR) ==true)
               {
                  Log("增仓 - 下标:","震荡","current_price",ticker.Last,"多仓 对比价:",ShockTreadInfo.AdmissionBasePrice +Shock_Reduce_N*Shock_ATR[Shock_ATR.length -1] *ShockTreadInfo.LadderIndex,"空仓对比价:",ShockTreadInfo.AdmissionBasePrice -Shock_Reduce_N*Shock_ATR[Shock_ATR.length -1] *ShockTreadInfo.LadderIndex,"最近一根ATR:",Shock_ATR[Shock_ATR.length -1]);                         
               }
            }
            else
            {
               if(Sys_SubPosition("震荡",ticker,ticker.Last,Shock_ATR) ==true)
               {
                  Log("减仓 - 下标:","震荡","current_price",ticker.Last,"多仓 对比价:",ShockTreadInfo.AdmissionBasePrice +Shock_Reduce_N*Shock_ATR[Shock_ATR.length -1] *ShockTreadInfo.LadderIndex,"空仓对比价:",ShockTreadInfo.AdmissionBasePrice -Shock_Reduce_N*Shock_ATR[Shock_ATR.length -1] *ShockTreadInfo.LadderIndex,"最近一根ATR:",Shock_ATR[Shock_ATR.length -1]);                         
               }
            }
        }
    
    
        if(ShockTreadInfo.LadderIndex !=-1)
        {
        //止损
          if(Stop_Loss("震荡",ticker,ticker.Last,Shock_ATR) ==true)
          {
            Log("下标:","震荡","止损成功!!","ATR值:",Shock_ATR[Shock_ATR.length -1] ,"ticker.Last:",ticker.Last,"账户收益:",curTotalAccount -InitAccount.Stocks);
          }
          else if(Sys_OutClosePosition("震荡",ticker,records,positions,Shock_ATR) ==true)
          {
            Log("下标:","震荡","离场成功!!","ATR值:",Shock_ATR[Shock_ATR.length -1] ,"ticker.Last",ticker.Last,"账户收益:",curTotalAccount -InitAccount.Stocks);
          }
         else if(CallbackDeparture("震荡",ticker,ticker.Last,Shock_ATR) ==true)
         {
           Log("下标:","震荡 回调  止损成功!!","ATR值:",Shock_ATR[Shock_ATR.length -1],"ticker.Last:",ticker.Last,"账户收益:",curTotalAccount -InitAccount.Stocks);            
         }                 
        }
     }
    else if(MarketTrendType =="趋势")
    {
       if(TrendTreadInfo.LadderIndex ==-1 && IsOpeningAllowed ==true) 
       {//头寸建立检测
         Trend_ATR  = TA.ATR(records,Trend_ATR_Cycle);  
         TrendTreadInfo.Amount =CalculationAmount(Trend_UseLeverval,ticker, account, Trend_ATR,Trend_Stop_N,1,1);           
         if(Sys_In("趋势",ticker,records)==true)
         {
            Log("入市 - 下标:","趋势","current_price",ticker.Last,"对比价:",TrendTreadInfo.AdmissionBasePrice -Trend_Reduce_N*Trend_ATR[Trend_ATR.length -1] *TrendTreadInfo.LadderIndex,"最近一根ATR:",Trend_ATR[Trend_ATR.length -1]);               
         }
       }
        else
        { //减仓or增仓
            if(Trend_WarehouseMode ==true)
            {
               if(Sys_AddPosition("趋势",ticker,Trend_ATR) ==true)
               {
                   Log("增仓 - 下标:","趋势","current_price",ticker.Last,"多仓 对比价:",TrendTreadInfo.AdmissionBasePrice +Trend_Reduce_N*Trend_ATR[Trend_ATR.length -1] *TrendTreadInfo.LadderIndex,"空仓对比价:",TrendTreadInfo.AdmissionBasePrice -Trend_Reduce_N*Trend_ATR[Trend_ATR.length -1] *TrendTreadInfo.LadderIndex,"最近一根ATR:",Trend_ATR[Trend_ATR.length -1]);                      
               }
            }
            else 
            {
               if(Sys_SubPosition("趋势",ticker,ticker.Last,Trend_ATR) ==true)
               {
                   Log("减仓 - 下标:","趋势","current_price",ticker.Last,"多仓 对比价:",TrendTreadInfo.AdmissionBasePrice +Trend_Reduce_N*Trend_ATR[Trend_ATR.length -1] *TrendTreadInfo.LadderIndex,"空仓对比价:",TrendTreadInfo.AdmissionBasePrice -Trend_Reduce_N*Trend_ATR[Trend_ATR.length -1] *TrendTreadInfo.LadderIndex,"最近一根ATR:",Trend_ATR[Trend_ATR.length -1]);                      
               }
            }
        }
    
        if(TrendTreadInfo.LadderIndex !=-1)
        {  //止损
          if(Stop_Loss("趋势",ticker,ticker.Last,Trend_ATR) ==true)
          {
            Log("下标:","趋势","止损成功!!","ATR值:",Trend_ATR[Trend_ATR.length -1] ,"ticker.Last:",ticker.Last,"账户收益:",curTotalAccount -InitAccount.Stocks);
          }
          else if(Sys_OutClosePosition("趋势",ticker,records,positions,Trend_ATR) ==true)
          {
            Log("下标:","趋势","离场成功!!","ATR值:",Trend_ATR[Trend_ATR.length -1] ,"ticker.Last",ticker.Last,"账户收益:",curTotalAccount -InitAccount.Stocks);
          }
          else if(CallbackDeparture("趋势",ticker,ticker.Last,Trend_ATR) ==true)
          {
           Log("下标:","趋势 回调  止损成功!!","ATR值:",Trend_ATR[Trend_ATR.length -1],"ticker.Last:",ticker.Last,"账户收益:",curTotalAccount -InitAccount.Stocks);            
          }                          
        }           
     
    }
}


function onTick(exchange) {
    var recordsCMI        = _C(exchange.GetRecords,GetKLineCycle(Cmi_kLine_Cycle));     //Cmi计算
    var Shock_records     = _C(exchange.GetRecords,GetKLineCycle(Shock_kLine_Cycle));   //震荡k线
    var Trend_records     = _C(exchange.GetRecords,GetKLineCycle(Trend_kLine_Cycle));   //趋势k线
    
    var Bar = Shock_records[Shock_records.length - 1];
    if (LastBarTime !== Bar.Time) {
       
      CmiVal = GetCmiVal(recordsCMI);  
        
      if(CmiVal <20)           {          Log("生命不息！！");             }
      else if(CmiVal >=20)     {          Log("作死不止！！");             }
        
      LastBarTime = Bar.Time;        
    }
    


        if(CmiVal <20)
        {
            MarketTrendProc("震荡",Shock_records,true);
            MarketTrendProc("趋势",Trend_records,false);    //不允许开仓            
        }
        else if(CmiVal >=20)
        {
            MarketTrendProc("趋势",Trend_records,true);
            MarketTrendProc("震荡",Shock_records,false);     //不允许开仓        
        }    
    
    
    
}


function main() {
    
    Log(exchange.GetAccount());
    Log(exchange.GetCurrency(), "合约面值:", GetContractFcaeValue(), "测试转换为整数:", _N(3.143454515, 0));

    if (exchange.GetName() !== 'Futures_OKCoin') {
      //  throw "Only support OKEX features";
    }
    exchange.SetRate(1);
    exchange.SetContractType(["this_week", "next_week", "quarter"][ContractTypeIdx]);
    exchange.SetMarginLevel([10, 20][MarginLevelIdx]);
    InitAccount = LastAccount = exchange.GetAccount();    
    
    Log(exchange.GetAccount());
    
    while (true) {
        onTick(exchange);
        Sleep(LoopInterval * 1000);
    }
    
}
```

> Detail

https://www.fmz.com/strategy/255502

> Last Modified

2022-03-13 05:18:54
