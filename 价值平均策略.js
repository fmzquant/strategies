/*
策略出处: https://www.botvs.com/strategy/16531
策略名称: 价值平均策略
策略作者: wojiushizhemedeshuaiqidemeinanzi
策略描述:

使市值定期定额增长

*/

var LoopInternal = 7*24*3600; //定期间隔 单位秒
var TimeMoney = 1000; //市值定额增长数量
var InitMoney = 10000; //初始投入金额
var TotalMoney = 50000; //总投入金额

var LastValue = 0;
var Profit = 0;
var STATE_FIRST = 1;
var STATE_NO_FIRST = 0;
var State = STATE_FIRST; //判断是否第一次执行
var Num = 0; //循环数

function GetTicker() {
    var ticker;
    while (!(ticker = exchange.GetTicker())) {
        Sleep(retryDelay);
    }
    return ticker;
}

function onTick() {
    var InitAccount = $.GetAccount();
    var Tickers = GetTicker();
    var NowValue = InitAccount.Stocks * Tickers.Last;
    var Gap = NowValue - LastValue;
    var Amount = Math.abs((Gap - TimeMoney) / Tickers.Last);

    if (State) {
        NewAmount = InitMoney / Tickers.Last;
        $.Buy(NewAmount);
        State = STATE_NO_FIRST;
    } else {
        //判断条件 是买是卖
        if (Gap > TimeMoney) {
            $.Sell(Amount);
        } else {
            $.Buy(Amount);
        }
    }
    //更新状态信息
    var NowAccount = $.GetAccount();
    var NowTickers = GetTicker();
    Profit = NowAccount.Stocks * NowTickers.Last + NowAccount.Balance - TotalMoney;
    LogProfit(Profit, "Balance: " + NowAccount.Balance + " Stocks:" + NowAccount.Stocks);
    LastValue = InitMoney + TimeMoney * Num;

}

function main() {
    while (true) {
        onTick();
        Num++;
        Sleep(LoopInternal * 1000);
    }
}
