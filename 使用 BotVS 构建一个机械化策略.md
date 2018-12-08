
> 策略名称

使用 BotVS 构建一个机械化策略

> 策略作者

小小梦

> 策略描述

知乎专栏文章 附带策略
使用 BotVS 构建一个机械化策略



> 源码 (javascript)

``` javascript
// 参数
var ContractType = "rb1710";
var PointAmount = 1;
var NetSize = 30;
var Interval = 500;
var SumPoints = 10;
var CoverRatio = 2;

// 全局变量
var Controller = {
    symbol : null,
    Amount : 0,
    Size : 0,
    BeginPrice : 0,
    SumPoints : 0,
    CoverRatio : 0,
    Net_Long : [],
    Net_Short : [],
    ContractInfo : null,
    isUpdateNetShow : false,     // 是否要更新显示
};
var perBar = null;

function loop(){
    var records = exchange.GetRecords();
    var ticker = exchange.GetTicker();
    if(!records || records.length == 0 || !ticker){
        return;
    }
    
    if(records[records.length - 1].Time !== perBar.Time){  // 新 Bar 产生
        UpdateNet(ticker.Last);
        perBar = records[records.length - 1];
    }

    // 画线
    $.PlotRecords(records, 'K线');
    
    for(var i = 0; (i < Controller.Net_Long.length && Controller.isUpdateNetShow == true); i++){   // 更新显示
        $.PlotHLine(Controller.Net_Long[i].open, 'long' + i);
        if(i == Controller.Net_Long.length - 1){
            for(var j = 0; j < Controller.Net_Short.length; j++){
                $.PlotHLine(Controller.Net_Short[j].open, 'short' + j, "green");
            }
            $.PlotHLine(Controller.BeginPrice, 'begin', "black", "dash");  // 初始线
            Controller.isUpdateNetShow = false;
            Log("更新显示！"); // ceshi
        }
    }
    // throw "stop"; // ceshi
    // Log(Controller.Net_Long); // cehsi
}

function init(){
    Controller.symbol = ContractType;
    Controller.Amount = PointAmount;
    Controller.Size = NetSize;
    Controller.SumPoints = SumPoints;
    Controller.CoverRatio = 2;
    
    // 设置合约
    while(exchange.IO("status") == false || Controller.ContractInfo == null){
        Controller.ContractInfo = exchange.SetContractType(Controller.symbol);
        LogStatus("时间：", new Date(), "等待连接服务器初始化。");
        Sleep(Interval);
    }

    var ticker = _C(exchange.GetTicker);
    var records = _C(exchange.GetRecords);
    perBar = records[records.length - 1];
    // 初始更新网格
    UpdateNet(ticker.Last);
}

function UpdateNet(price){
    // 校验网格是否没有持仓
    for(var n = 0; n < Controller.Net_Long.length; n++){
        if(Controller.Net_Long[n].hold !== 0){
            Log("Net_Long 网格仍有持仓！无法更新。");
            return false;
        }
    }

    for(var m = 0; m < Controller.Net_Short.length; m++){
        if(Controller.Net_Short[m].hold !== 0){
            Log("Net_Short 网格仍有持仓！无法更新。");
            return false;
        }
    }
    
    Controller.isUpdateNetShow = true;

    Controller.Net_Long = [];
    Controller.Net_Short = [];
    Controller.BeginPrice = price;
    for(var i = 0; i < Controller.SumPoints; i++){
        var Long_point = {
            open : _N(Controller.BeginPrice + (i + 1) * Controller.Size, 0),
            cover : _N(Controller.BeginPrice + (i + 1) * Controller.Size + Controller.CoverRatio * Controller.Size, 0),
            hold : 0,
        }
        Controller.Net_Long.push(Long_point);
    }
    for(var j = 0; j < Controller.SumPoints; j++){
        var Short_point = {
            open : _N(Controller.BeginPrice - (j + 1) * Controller.Size, 0),
            cover : _N(Controller.BeginPrice - (j + 1) * Controller.Size + Controller.CoverRatio * Controller.Size, 0),
            hold : 0,
        }
        Controller.Net_Short.push(Short_point);
    }
}

function main(){
    // 入口函数初始化

    // 主循环， 程序完成初始化后在此 循环执行，直到手动关闭。
    var LoginState = null;
    var nowTimeStamp = 0;
    while(true){
        nowTimeStamp = new Date().getTime();
        if(exchange.IO("status") == true){
            LoginState = true;
            loop();
        }else{
            LoginState = false;
        }
        LogStatus("时间：", _D(nowTimeStamp), LoginState ? "已连接服务器" : "未连接服务器！"/*, 待显示的一些信息可以写在此处，如账户信息，实时行情，程序状态*/)
        Sleep(Interval);     //  暂停 0.5 秒， 避免轮询频率过高，访问交易所服务器过于频繁导致问题。
    }
}
```

> 策略出处

https://www.fmz.com/strategy/40357

> 更新时间

2017-09-21 09:16:02
