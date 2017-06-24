/*
策略出处: https://www.botvs.com/strategy/43049
策略名称: OKCoin跨期布林对冲
策略作者: 小小梦
策略描述:




参数              默认值        描述
--------------  ---------  ------------------------------
isLogReset      false      是否清空所有日志
P_SymbolA       quarter    合约A
P_SymbolB       this_week  合约B
P_Interval      500        轮询间隔
P_isSetTest     false      测试模式
MaxUsedRatio    0.5        保证金最大使用比例
MarginLevel     10         杠杆
P_piece         2          每次触发开仓下单量
CoverRatio      0.1        每次平仓比例
minCoverAmount  2          每次平仓最小值
P_KPeriod       0          K线周期: 1分钟|5分钟|15分钟|30分钟|1小时|1天
Add_lv          0.05       系数递增比例
*/

var P_isSetOneKLine = true;
var isShowChart = true;
var retrySlidePrice = 2;

// 全局变量
var KPeriod = [PERIOD_M1, PERIOD_M5, PERIOD_M15, PERIOD_M30, PERIOD_H1, PERIOD_D1][P_KPeriod];
var DiffData = {       // 差价K线数据
    plusKLine : [],      // 差价K线数组
    minusKLine : [],
    KPeriod : KPeriod,    // 差价K线周期
};

var distance = 0;                     // 距离
var IDLE = 0;
var PLUS = 1;
var MINUS = 2;
var State = IDLE;                     // 策略 运行状态状态
var perState = IDLE;

var OPEN = 3;                         // 用于区分  是那种操作  在 BuyA_SellB 、 SellA_BuyB  函数中
var COVER = 4;
var isTradeOnThisBar = false;         // 是否在当前Bar 交易了   废弃
var isCoverOnthisBar = false;         //                     废弃
var upRatio = 0;
var downRatio = 0;

var P = null;                         // 交易控制对象
var ManagerData = {                   // 控制对象
    initAccount : null,               // 初始账户 信息
    Account : null,                   // 当前账户 信息
    perAccount : null,
    MaxUsedRatio : MaxUsedRatio,      // 最大 保证金使用率
    MaxUsedMargin : 0,                // 每次 平仓后 重新计算的 最大保证金使用量
    APosition : null,                 // 多头 仓位信息
    BPosition : null,                 // 空头 仓位信息 
    floatProfit : 0,                  // 浮动盈亏 
    CoverProfit : 0,                  // 平仓盈亏
    MarginLevel : MarginLevel,        // 杠杆数
    Margin : 0,                       // 当前保证金使用

    // 行情数据
    DepthA : null,                    // A 合约的 深度数据
    DepthB : null,                    // B 合约的 深度数据

    // 错误信息
    ErrorStr : "",                    // 错误信息字符串
    ErrorTimeStamp : 0,               // 错误信息 时间戳
}

var DiffDataOneKLine = {              // K线结构
    KLine : [],                       // K线数组 ，整理后的差价
    KPeriod : KPeriod,                // K线周期
}
var test = {                          // 测试 模式 使用的结构
    amount : 4,
    ProfitDiff : 0,
    ID : 0,
    OpenDiff : 0,
};
var perRecordsTime = 0;               // 合成的 K线 上一个bar 的时间戳

var PeriodBeginTime = 0;              // 周期起始时间

function UpdateDiffData(DepthA, DepthB, RecordsA, RecordsB){ // 处理差价K线数据的更新
    var plusDiff = DepthA.Bids[0].Price - DepthB.Asks[0].Price;
    var minusDiff = DepthA.Asks[0].Price - DepthB.Bids[0].Price;
    if(P_isSetOneKLine){
        var Diff = _N((plusDiff + minusDiff) / 2 , 4);
    }
    if(RecordsA[RecordsA.length - 1].Time == RecordsB[RecordsB.length - 1].Time && RecordsB[RecordsB.length - 1].Time !== PeriodBeginTime){
        if(!P_isSetOneKLine){
            // 新K线周期出现
            var plusBar = {
                Open : plusDiff,
                Close : plusDiff,
                High : plusDiff,
                Low : plusDiff,
                Time : 0,
            };

            var minusBar = {
                Open : minusDiff,
                Close : minusDiff,
                High : minusDiff,
                Low : minusDiff,
                Time : 0,
            };

            PeriodBeginTime = RecordsB[RecordsB.length - 1].Time;
            plusBar.Time = PeriodBeginTime;
            minusBar.Time = PeriodBeginTime;
            DiffData.plusKLine.push(plusBar);
            DiffData.minusKLine.push(minusBar);
        }else{
            var Bar = {
                Open : Diff,
                Close : Diff,
                High : Diff,
                Low : Diff,
                Time : 0,
            };
            PeriodBeginTime = RecordsB[RecordsB.length - 1].Time;
            Bar.Time = PeriodBeginTime;
            DiffDataOneKLine.KLine.push(Bar);
        }
    }else{
        if(!P_isSetOneKLine){
            if(plusDiff > DiffData.plusKLine[DiffData.plusKLine.length - 1].High){
                DiffData.plusKLine[DiffData.plusKLine.length - 1].High = plusDiff;
            }else if(plusDiff < DiffData.plusKLine[DiffData.plusKLine.length - 1].Low){
                DiffData.plusKLine[DiffData.plusKLine.length - 1].Low = plusDiff;
            }
            DiffData.plusKLine[DiffData.plusKLine.length - 1].Close = plusDiff;

            if(minusDiff > DiffData.minusKLine[DiffData.minusKLine.length - 1].High){
                DiffData.minusKLine[DiffData.minusKLine.length - 1].High = minusDiff;
            }else if(minusDiff < DiffData.minusKLine[DiffData.minusKLine.length - 1].Low){
                DiffData.minusKLine[DiffData.minusKLine.length - 1].Low = minusDiff;
            }
            DiffData.minusKLine[DiffData.minusKLine.length - 1].Close = minusDiff;
        }else{
            if(Diff > DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].High){
                DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].High = Diff;
            }else if(Diff < DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Low){
                DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Low = Diff;
            }
            DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Close = Diff;
        }
    }
    
    if(!P_isSetOneKLine){
        if(DiffData.plusKLine.length > 100){
            DiffData.plusKLine.shift();
        }

        if(DiffData.minusKLine.length > 100){
            DiffData.minusKLine.shift();
        }
    }else{
        if(DiffDataOneKLine.KLine.length > 100){
            DiffDataOneKLine.KLine.shift();
        }
    }
}

function UseAPI(fun, symbol, param){
    exchange.SetContractType(symbol);
    if(typeof(param) == "undefined"){
        return fun();
    }else{
        return fun(param);
    }
}

function GetPositions(){
    var positions = _C(exchange.GetPosition);
    for(var i = 0; i < positions.length; i++){
        if(positions[i].ContractType == P_SymbolA){
            ManagerData.APosition = positions[i];
        }else if(positions[i].ContractType == P_SymbolB){
            ManagerData.BPosition = positions[i];
        }else if(i == 2){
            throw "error:" + JSON.stringify(positions);
        }
    }
    if(positions.length == 0){
        ManagerData.APosition = null;
        ManagerData.BPosition = null;
    }
    return positions;
}

function SellA_BuyB(DiffPrice, Action){
    // GetBestAmount
    var Piece = P_piece;
    if(Action == OPEN){
        // 检查 是否超出 保证金
        var MarginAndAmount_A = CalcPieceEqualAmount(ManagerData.DepthA.Bids[0].Price, Piece);
        var MarginAndAmount_B = CalcPieceEqualAmount(ManagerData.DepthB.Asks[0].Price, Piece);
        if(MarginAndAmount_A.NeedMargin + MarginAndAmount_B.NeedMargin + ManagerData.Margin > ManagerData.MaxUsedMargin){
            ManagerData.ErrorStr = "超过最大可用保证金：" + ManagerData.MaxUsedMargin;
            ManagerData.ErrorTimeStamp = new Date().getTime();
            return false;
        }
        // 交易
        _C(exchange.SetContractType, P_SymbolA);
        var infoA = P.OpenShort(P_SymbolA, Piece, ManagerData.DepthA.Bids[0].Price);
        if(infoA.amount == 0){
            return false;
        }
        _C(exchange.SetContractType, P_SymbolB);
        var dealAmount = infoA.amount;
        var infoB = P.OpenLong(P_SymbolB, dealAmount, ManagerData.DepthB.Asks[0].Price);
        var slidePrice = retrySlidePrice;  
        while((dealAmount -= infoB.amount) > 0){
            infoB = P.OpenLong(P_SymbolB, dealAmount, ManagerData.DepthB.Asks[0].Price + slidePrice);
            slidePrice += retrySlidePrice;
            LogStatus("while(), P_SymbolB:", P_SymbolB, infoB, dealAmount, slidePrice);
        }

        // 更新数据
        ManagerData.perAccount = ManagerData.Account;
        ManagerData.Account = _C(exchange.GetAccount);
        ManagerData.Margin += (ManagerData.perAccount.Stocks - ManagerData.Account.Stocks);
        Log("持仓信息：", GetPositions(), "本次使用保证金：", (ManagerData.perAccount.Stocks - ManagerData.Account.Stocks));
        perState = State;
        State = PLUS;
    }else if(Action == COVER){
        // 全平
        _C(exchange.SetContractType, P_SymbolA);
        var infoA = P.Cover(P_SymbolA, ManagerData.DepthA.Bids[0].Price, Math.min(ManagerData.APosition.Amount, Math.max(_N(ManagerData.APosition.Amount * CoverRatio, 0), minCoverAmount)), PD_LONG);
        if(infoA == 0){
            return false;
        }
        _C(exchange.SetContractType, P_SymbolB);
        var dealAmount = infoA;
        var infoB = P.Cover(P_SymbolB, ManagerData.DepthB.Asks[0].Price, dealAmount, PD_SHORT);
        var slidePrice = retrySlidePrice;
        while((dealAmount -= infoB) > 0){
            infoB = P.Cover(P_SymbolB, ManagerData.DepthB.Asks[0].Price + slidePrice, dealAmount, PD_SHORT);  
            slidePrice += retrySlidePrice;
            LogStatus("while(), P_SymbolB:", P_SymbolB, infoB, dealAmount, slidePrice);
        }
        Log("持仓信息：", GetPositions());
        if(ManagerData.APosition == null && ManagerData.BPosition == null){
            perState = State;
            State = IDLE;
            upRatio = 0;
            downRatio = 0;
            Log("完全平仓！#FF0000");
            Log("更新最大保证金使用量：", DealManagerData());
            LogProfit(ManagerData.Account.Stocks - ManagerData.initAccount.Stocks);  // ceshi 
        }else{
            ManagerData.perAccount = ManagerData.Account;
            ManagerData.Account = _C(exchange.GetAccount); 
            Log("部分平仓：", infoA);
        }
    }
    return true;
}

function BuyA_SellB(DiffPrice, Action){
    // GetBestAmount
    var Piece = P_piece;
    if(Action == OPEN){
        // 检查 是否超出 保证金
        var MarginAndAmount_A = CalcPieceEqualAmount(ManagerData.DepthA.Asks[0].Price, Piece);
        var MarginAndAmount_B = CalcPieceEqualAmount(ManagerData.DepthB.Bids[0].Price, Piece);
        if(MarginAndAmount_A.NeedMargin + MarginAndAmount_B.NeedMargin + ManagerData.Margin > ManagerData.MaxUsedMargin){
            ManagerData.ErrorStr = "超过最大可用保证金：" + ManagerData.MaxUsedMargin;
            ManagerData.ErrorTimeStamp = new Date().getTime();
            return false;
        }
        // 交易
        _C(exchange.SetContractType, P_SymbolA);
        var infoA = P.OpenLong(P_SymbolA, Piece, ManagerData.DepthA.Asks[0].Price);
        if(infoA.amount == 0){
            return false;
        }
        _C(exchange.SetContractType, P_SymbolB);
        var dealAmount = infoA.amount;
        var infoB = P.OpenShort(P_SymbolB, dealAmount, ManagerData.DepthB.Bids[0].Price);
        var slidePrice = retrySlidePrice; 
        while((dealAmount -= infoB.amount) > 0){
            infoB = P.OpenShort(P_SymbolB, dealAmount, ManagerData.DepthB.Bids[0].Price - slidePrice);
            slidePrice += retrySlidePrice;
            LogStatus("while(), P_SymbolB:", P_SymbolB, infoB, dealAmount, slidePrice);
        }

        // 更新数据
        ManagerData.perAccount = ManagerData.Account;
        ManagerData.Account = _C(exchange.GetAccount);
        ManagerData.Margin += (ManagerData.perAccount.Stocks - ManagerData.Account.Stocks);
        Log("持仓信息：", GetPositions(), "本次使用保证金：", (ManagerData.perAccount.Stocks - ManagerData.Account.Stocks));
        perState = State;
        State = MINUS;
    }else if(Action == COVER){
        // 全平
        _C(exchange.SetContractType, P_SymbolA);
        var infoA = P.Cover(P_SymbolA, ManagerData.DepthA.Asks[0].Price, Math.min(ManagerData.APosition.Amount, Math.max(_N(ManagerData.APosition.Amount * CoverRatio, 0), minCoverAmount)), PD_SHORT);
        if(infoA == 0){
            return false;
        }
        _C(exchange.SetContractType, P_SymbolB);
        var dealAmount = infoA;
        var infoB = P.Cover(P_SymbolB, ManagerData.DepthB.Bids[0].Price, dealAmount, PD_LONG);
        var slidePrice = retrySlidePrice;
        while((dealAmount -= infoB) > 0){
            infoB = P.Cover(P_SymbolB, ManagerData.DepthB.Bids[0].Price - slidePrice, dealAmount, PD_LONG);
            slidePrice += retrySlidePrice;
            LogStatus("while(), P_SymbolB:", P_SymbolB, infoB, dealAmount, slidePrice);
        }
        Log("持仓信息：", GetPositions());
        if(ManagerData.APosition == null && ManagerData.BPosition == null){
            perState = State;
            State = IDLE;
            upRatio = 0;    // 重置
            downRatio = 0;  // 重置
            Log("完全平仓！#FF0000");
            Log("更新最大保证金使用量：", DealManagerData());
            LogProfit(ManagerData.Account.Stocks - ManagerData.initAccount.Stocks);  // ceshi 
        }else{
            ManagerData.perAccount = ManagerData.Account;
            ManagerData.Account = _C(exchange.GetAccount); 
            Log("部分平仓：", infoA);
        }
    }
    return true;
}

function DealManagerData(){                                                       // 处理 ManagerData
    ManagerData.perAccount = ManagerData.Account;
    ManagerData.Account = _C(exchange.GetAccount);                                // 获取 平仓后的 账户信息
    var Position = _C(exchange.GetPosition);                                      // 获取 平仓后的持仓信息
    if(Position.length == 0){                                                     // 如果 平仓完成 ，没有持仓了 重置 ManagerData 的 持仓信息属性
        ManagerData.APosition = null;
        ManagerData.BPosition = null;
        ManagerData.Margin = 0;                                                   // 重置 当前使用的保证金 为 0
    }else{                                                                        // 如果有持仓 报错，打印持仓
        Log("平仓后还有持仓！", Position, "#FF0000");
        throw "error!";
    }
    ManagerData.MaxUsedMargin = _N(ManagerData.Account.Stocks * ManagerData.MaxUsedRatio, 2);         // 计算下一轮 最大的 保证金使用量
    return ManagerData.MaxUsedMargin;
}

function CalcPieceEqualAmount(Price, Piece){
   return {
            EqualAmount : (100 / Price * Piece), 
            NeedMargin : (100 / Price * Piece) / ManagerData.MarginLevel,
        }
}

function Loop(nowTime){       // 主循环
    var DepthA = UseAPI(exchange.GetDepth, P_SymbolA);
    var DepthB = UseAPI(exchange.GetDepth, P_SymbolB);
    
    var RecordsA = UseAPI(exchange.GetRecords, P_SymbolA, KPeriod);
    var RecordsB = UseAPI(exchange.GetRecords, P_SymbolB, KPeriod);
    
    // 过滤数据
    if(!RecordsA || !RecordsB || !DepthA || !DepthB || DepthA.Bids.length == 0 || DepthA.Asks.length == 0 || 
            DepthB.Bids.length == 0 || DepthB.Asks.length == 0 || RecordsA.length == 0 || RecordsB.length == 0){
        return;
    }
    
    ManagerData.DepthA = DepthA;
    ManagerData.DepthB = DepthB;

    // 更新 差价K线数据
    UpdateDiffData(DepthA, DepthB, RecordsA, RecordsB);
    
    if(isShowChart == true){
        if(!P_isSetOneKLine){
            $.PlotRecords(DiffData.plusKLine, 'plus');
        }else{
            $.PlotRecords(DiffDataOneKLine.KLine, 'KLine');
        }
    }
    
    // BOLL
    if(P_isSetOneKLine && DiffDataOneKLine.KLine.length > 20){
        var boll = TA.BOLL(DiffDataOneKLine.KLine);
        var up = boll[0];
        var mid = boll[1];
        var down = boll[2];
        
        if(perRecordsTime !== DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Time){
            if(isShowChart == true){
                $.PlotLine("up", up[up.length - 2], DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 2].Time);
                $.PlotLine("mid", mid[mid.length - 2], DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 2].Time);
                $.PlotLine("down", down[down.length - 2], DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 2].Time);

                $.PlotLine("up", up[up.length - 1], DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Time);
                $.PlotLine("mid", mid[mid.length - 1], DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Time);
                $.PlotLine("down", down[down.length - 1], DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Time);
                
                // $.PlotHLine(up[up.length - 1], 'UpTrack', "red");
                // $.PlotHLine(down[down.length - 1], 'DownTrack', "green");
            }
            perRecordsTime = DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Time;
            isTradeOnThisBar = false;       // 重置 是否当前Bar 交易的标记为 false
            isCoverOnthisBar = false;
        }else{
            if(isShowChart == true){
                $.PlotLine("up", up[up.length - 1], DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Time);
                $.PlotLine("mid", mid[mid.length - 1], DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Time);
                $.PlotLine("down", down[down.length - 1], DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Time);
                
                // $.PlotHLine(up[up.length - 1], 'UpTrack', "red");
                // $.PlotHLine(down[down.length - 1], 'DownTrack', "green");
            }
        }
        
        
        // 突破判断
        // 计算加仓距离
        distance = _N((up[up.length - 1] - down[down.length - 1]) * 0.5, 0);
        
        if(distance * 2 < 20 && (upRatio == 0 && downRatio == 0)){  // 计算安全间距
            return;
        }
        
        if(DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Close > up[up.length - 1]){
            if((State == IDLE || State == PLUS) && (DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Close > (up[up.length - 1] + upRatio * distance)) /*&& isTradeOnThisBar == false*/){  // Open PLUS
                if(P_isSetTest){
                    // 模拟
                    $.PlotFlag(nowTime, 'plus', 'P', 'flag', 'red');
                    State = PLUS;
                    exchange.Log(LOG_TYPE_SELL, test.ID++, DepthA.Bids[0].Price, test.amount, "Open:" + P_SymbolA);
                    exchange.Log(LOG_TYPE_BUY, test.ID++, DepthB.Asks[0].Price, test.amount, "Open:" + P_SymbolB);
                    test.OpenDiff = DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Close;
                }else{
                    var info = SellA_BuyB(DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Close, OPEN);
                    if(info == false){
                        return;
                    }
                    $.PlotFlag(nowTime, 'plus', 'P', 'flag', 'red');
                    isTradeOnThisBar = true;
                    upRatio += Add_lv;   
                }
            }else if(State == MINUS /*&& isCoverOnthisBar == false*/){  // Cover MINUS
                if(P_isSetTest){
                    // 模拟
                    $.PlotFlag(nowTime, 'Cover_Minus', 'CM', 'circlepin', 'blue');
                    State = IDLE;
                    exchange.Log(LOG_TYPE_SELL, test.ID++, DepthA.Bids[0].Price, test.amount, "Cover:" + P_SymbolA);
                    exchange.Log(LOG_TYPE_BUY, test.ID++, DepthB.Asks[0].Price, test.amount, "Cover:" + P_SymbolB);
                    test.ProfitDiff += DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Close - test.OpenDiff;
                    Log("本次盈亏：" + (DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Close - test.OpenDiff));
                    LogProfit(test.ProfitDiff);
                }else{
                    // SellA_BuyB    
                    var info = SellA_BuyB(DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Close, COVER);
                    if(info == false){
                        Log("MINUS 平仓失败！");
                        return;
                    }
                    $.PlotFlag(nowTime, 'Cover_Minus', 'CM', 'circlepin', 'blue');
                    isCoverOnthisBar = true;
                }
            }
        }else if(DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Close < down[down.length - 1]){
            if((State == IDLE || State == MINUS) && (DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Close < (down[down.length - 1] - downRatio * distance)) /*&& isTradeOnThisBar == false*/){
                if(P_isSetTest){
                    // 模拟
                    $.PlotFlag(nowTime, 'minus', 'M', 'circlepin', 'green'); // DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Time
                    State = MINUS;
                    exchange.Log(LOG_TYPE_BUY, test.ID++, DepthA.Asks[0].Price, test.amount, "Open:" + P_SymbolA);
                    exchange.Log(LOG_TYPE_SELL, test.ID++, DepthB.Bids[0].Price, test.amount, "Open:" + P_SymbolB);
                    test.OpenDiff = DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Close;
                }else{
                    // BuyA_SellB
                    var info = BuyA_SellB(DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Close, OPEN);
                    if(info == false){
                        return;
                    }
                    $.PlotFlag(nowTime, 'minus', 'M', 'circlepin', 'green');
                    isTradeOnThisBar = true;
                    downRatio += Add_lv; 
                }
            }else if(State == PLUS /*&& isCoverOnthisBar == false*/){
                if(P_isSetTest){
                    // 模拟
                    $.PlotFlag(nowTime, 'Cover_Plus', 'CP', 'flag', 'blue');
                    State = IDLE;
                    exchange.Log(LOG_TYPE_BUY, test.ID++, DepthA.Asks[0].Price, test.amount, "Cover:" + P_SymbolA);
                    exchange.Log(LOG_TYPE_SELL, test.ID++, DepthB.Bids[0].Price, test.amount, "Cover:" + P_SymbolB);
                    test.ProfitDiff += test.OpenDiff - DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Close;
                    Log("本次盈亏：" + (test.OpenDiff - DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Close));
                    LogProfit(test.ProfitDiff);
                }else{
                    // BuyA_SellB
                    var info = BuyA_SellB(DiffDataOneKLine.KLine[DiffDataOneKLine.KLine.length - 1].Close, COVER);
                    if(info == false){
                        Log("PLUS 平仓失败！");
                        return;
                    }
                    $.PlotFlag(nowTime, 'Cover_Plus', 'CP', 'flag', 'blue');
                    isCoverOnthisBar = true;
                }
            }
        }
    }
    
}

function main(){
    // 初始化工作
    if(isLogReset){
        LogReset(1);
    }
    Log("最大保证金使用量：", DealManagerData());
    ManagerData.initAccount = ManagerData.Account;
    ManagerData.perAccount = ManagerData.Account;
    exchange.SetMarginLevel(ManagerData.MarginLevel); // 初始设置杠杆

    // 设置禁用汇率
    exchange.SetRate(1);
    Log("已禁用汇率，显示价格为美元价格！");

    // 创建交易控制对象
    P = $.NewPositionManager(exchange);

    //主要循环
    while(true){
        var nowTime = new Date().getTime();
        Loop(nowTime);
        LogStatus("时间：", _D(nowTime), '\n', P_isSetTest ? JSON.stringify(test) : "Margin: " + ManagerData.Margin, '\n', ManagerData.ErrorStr, _D(ManagerData.ErrorTimeStamp), '\n', 
            ManagerData.initAccount, '\n', ManagerData.Account, '\n', ManagerData.APosition, '\n', ManagerData.BPosition, '\n', "upRatio:" + upRatio, '\n', "downRatio:" + downRatio, "distance:" + distance);
        Sleep(P_Interval);
    }
}
