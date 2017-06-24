/*
策略出处: https://www.botvs.com/strategy/40266
策略名称: 知乎专栏 实例文章策略
策略作者: yilidalei
策略描述:

测试JS


参数        默认值  描述
------  -----  --------
RatioA   0.05  调整系数
RatioB   0.1   平仓加仓偏离系数
*/

// 参数变量 (待填写)
var ContractType = "rb1710";  // 标的物合约代码   ，螺纹钢 1710 合约 目前主力合约
var UsedRatio = 0.5
// 全局变量 (待填写)
var Interval = 500;           // 轮询时间 ， 毫秒  ， 500 毫秒 = 0.5 秒
var Balance_Unit = 0;
var ContractTypeInfo = null;  // 合约信息
var initAccount = null;       // 初始账户信息
var nowAccount = null;        // 当前账户信息
var LONG = 1;
var SHORT = 2;
var IDLE = 0;
var State = IDLE;
var EnterPrice = null;        // 入场价
var FloatProfitStop = null;   // 浮动止损
var LossStop = null;          // 止损线
var manager = null;           // 用于引用《商品期货交易类库》 导出函数 生成的对象。 
var MaxAdds = 9;
var Adds = 0;
// 功能函数 (待填写)
function loop(){              // 主循环函数
    /*入场：以前一日收盘价上下0.5*ATR为上下轨，突破上轨做多一份资金，突破下轨做空一份资金。*/
    var records = exchange.GetRecords(PERIOD_D1);
    if(!records || records.length < 21){
        return;
    }
    var atr = GetATR(records);
    if(atr.length < 2){
        return;
    }
    var Bar = records[records.length - 1];
    var lastDayClose = records[records.length - 2].Close;
    var lastDayATR = atr[atr.length - 2];
    var upTrack = lastDayClose + lastDayATR * 0.5;
    var downTrack = lastDayClose - lastDayATR * 0.5;
    
    // 开仓
    if(State == IDLE &&  Bar.Close > upTrack){  // LONG 
        // Log("触发！上轨：", upTrack, "当前Bar最新收盘价（Close）", Bar.Close, "lastDayATR:", lastDayATR, "lastDayClose:", lastDayClose);   // 测试代码 
        // throw "暂停！";                                                      // 测试代码
        nowAccount = CheckBalance_Unit(LONG);
        var tradeInfoLong = manager.OpenLong(ContractType, _N(Balance_Unit / (ContractTypeInfo.VolumeMultiple * Bar.Close * ContractTypeInfo.LongMarginRatio), 0));  // 商品期货交易类库 导出函数，处理交易细节。
        if(tradeInfoLong){
            EnterPrice = tradeInfoLong.price;
            CalcFPS_LS(EnterPrice, LONG);
            State = LONG;
        }
    }else if(State == IDLE && Bar.Close < downTrack){  // SHORT
        // Log("触发！下轨：", downTrack, "当前Bar最新收盘价（Close）", Bar.Close, "lastDayATR:", lastDayATR, "lastDayClose:", lastDayClose); // 测试代码
        // throw "暂停！";                                                      // 测试代码
        nowAccount = CheckBalance_Unit(SHORT);
        var tradeInfoShort = manager.OpenShort(ContractType, _N(Balance_Unit / (ContractTypeInfo.VolumeMultiple * Bar.Close * ContractTypeInfo.ShortMarginRatio), 0)); // 商品期货交易类库 导出函数，处理交易细节。
        if(tradeInfoShort){
            EnterPrice = tradeInfoShort.price;
            CalcFPS_LS(EnterPrice, SHORT);
            State = SHORT;
        }
    }

    // 加仓
    if(State == LONG && Bar.Close > FloatProfitStop && Adds < MaxAdds){ // 多仓状态 触发浮动止盈线
        nowAccount = CheckBalance_Unit(LONG);
        var tradeInfoLong = manager.OpenLong(ContractType, _N(Balance_Unit / (ContractTypeInfo.VolumeMultiple * Bar.Close * ContractTypeInfo.LongMarginRatio), 0));  // 商品期货交易类库 导出函数，处理交易细节。
        // 移动中线
        if(tradeInfoLong){
            Adds++;
            EnterPrice = tradeInfoLong.price;
            CalcFPS_LS(EnterPrice, LONG);
        }
    }else if(State == SHORT && Bar.Close < FloatProfitStop && Adds < MaxAdds){ // 空仓状态 触发浮动止盈线
        nowAccount = CheckBalance_Unit(SHORT);
        var tradeInfoShort = manager.OpenShort(ContractType, _N(Balance_Unit / (ContractTypeInfo.VolumeMultiple * Bar.Close * ContractTypeInfo.ShortMarginRatio), 0)); // 商品期货交易类库 导出函数，处理交易细节。
        // 移动中线
        if(tradeInfoShort){
            Adds++;
            EnterPrice = tradeInfoShort.price;
            CalcFPS_LS(EnterPrice, SHORT);
        }
    }

    // 平仓
    if(State == LONG && Bar.Close < LossStop){  // 平多
        manager.Cover(ContractType);
        Adds = 0;
        State = IDLE;
        nowAccount = _C(exchange.GetAccount);
        LogProfit(nowAccount.Balance - initAccount.Balance);
    }else if(State == SHORT && Bar.Close > LossStop){  // 平空
        manager.Cover(ContractType);
        Adds = 0;
        State = IDLE;
        nowAccount = _C(exchange.GetAccount);
        LogProfit(nowAccount.Balance - initAccount.Balance);
    }

}

function CalcFPS_LS(Para_EnterPrice, Direction){    // 计算 FloatProfitStop ： FPS ，  LossStop ： LS
    // 以做多为例：设置当前初始线（入场价），按着一定规则（如：止损线=0.8 * 入场价）浮动止盈线和止损线，可以设置，（浮动止盈线-中线）= 1.2（中线-止损线）
    /*
    if(Direction == LONG){
        LossStop = 0.8 * Para_EnterPrice;
        FloatProfitStop = 1.2 * (Para_EnterPrice - (0.8 * Para_EnterPrice)) + Para_EnterPrice;
    }else if(Direction == SHORT){
        LossStop = 1.2 * Para_EnterPrice;
        FloatProfitStop = Para_EnterPrice - 1.2 * (1.2 * Para_EnterPrice - Para_EnterPrice);
    }else{
        throw "错误的Direction参数:" + Direction;
    }
    */
    var array = [0, RatioA * (10 - Adds) / 20, RatioA * (10 - Adds) / 20, RatioA * (10 - Adds) / 20, RatioA * (10 - Adds) / 20, RatioA * (10 - Adds) / 20];  // ceshi 
    if(Direction == LONG){
        LossStop = (1 - RatioA + array[Adds]) * Para_EnterPrice;      // RatioA : 0.05
        FloatProfitStop = (1 + RatioB) * (Para_EnterPrice - ((1 - RatioA) * Para_EnterPrice)) + Para_EnterPrice;
    }else if(Direction == SHORT){
        LossStop = (1 + RatioA - array[Adds]) * Para_EnterPrice;
        FloatProfitStop = Para_EnterPrice - (1 + RatioB) * ((1 + RatioA) * Para_EnterPrice - Para_EnterPrice);
    }else{
        throw "错误的Direction参数:" + Direction;
    }
}

function GetATR(records){  // 默认为 records 参数是有效值，传入，即： 不为null ，Bar 长度足够。
    var atr = TA.ATR(records);
    return atr;
}

function CheckBalance_Unit(Direction){
    ContractTypeInfo = _C(exchange.SetContractType, ContractType);
    Log("标的物合约信息：", ContractTypeInfo);
    Balance_Unit = _N(initAccount.Balance * UsedRatio / 10, 2);
    Log("账户信息：", initAccount, "资金分配 10份,一份为：", Balance_Unit);

    var ticker = _C(exchange.GetTicker);
    var OneContractMargin = ContractTypeInfo.VolumeMultiple * ticker.Last * (Direction == LONG ? ContractTypeInfo.LongMarginRatio : ContractTypeInfo.ShortMarginRatio);
    if(Balance_Unit < OneContractMargin * 1.2){
        throw "最新价格：" + ticker.Last + "调整系数1.2 " + " ,资金可用部分的10分之一 不足 开" + (Direction == LONG ? "多" : "空") + "1手合约," + "1手合约需：" + OneContractMargin;
    }else{
        Log("最新价格：" + ticker.Last + "调整系数1.2 " + " 1份资金 可开：", Direction == LONG ? "多" : "空", _N(Balance_Unit / OneContractMargin, 0));
    }
    var nowAccount = _C(exchange.GetAccount);
    if(nowAccount.Balance < Balance_Unit){
        throw "当前账户资金已小于初始资金可用部分的十分之一。当前资金：" + nowAccount.Balance + ", 初始资金可用部分的十分之一为：" + Balance_Unit;
    }else if(nowAccount.Balance < OneContractMargin * 1.2){
        throw "资金不足：" + JSON.stringify(nowAccount) + ", 系数1.2，1手合约保证金：" + OneContractMargin;
    }
    if(nowAccount.Balance - initAccount.Balance * (1 - UsedRatio) < OneContractMargin * 1.2){
        throw "资金可用部分不足一手保证金金额。可用部分：" + (nowAccount.Balance - initAccount.Balance * (1 - UsedRatio)) + "，1手保证金" + OneContractMargin + "，系数：1.2";
    }
    return nowAccount;
}

// 入口函数 main 
function main(){
    // 程序的初始化工作 (待填写)
    manager = $.NewPositionManager();  // 《商品期货交易类库》导出函数  ，返回一个控制对象。
    while(true){
        if(exchange.IO("status") == true && (initAccount = exchange.GetAccount()) !== null){
            break;
        }
        LogStatus("等待交易时间获取账户信息初始化！" + "时间：", new Date());
        Sleep(Interval);
    }
    CheckBalance_Unit(LONG);
    CheckBalance_Unit(SHORT);
    
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

function onexit(){
    // 做一些在程序停止时的 收尾工作。(待填写)
    
    Log("程序退出！");
}
