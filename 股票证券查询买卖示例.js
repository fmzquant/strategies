/*
策略出处: https://www.botvs.com/strategy/5541
策略名称: 股票证券查询买卖示例
策略作者: Zero
策略描述:

可以查询持仓, 合约详细信息, 出现not login错误表示还没有成功登陆服务器, not ready表示行情数据还没有接收到, 程序会自动重试


参数            默认值        描述
------------  ---------  ----
ContractType  000001.SZ  合约名称
Num           100        手数
*/

function main() {
    while (!exchange.IO("status")) {
        Sleep(1000)
    }
    Sleep(1000)
    Log(_C(exchange.SetContractType, ContractType));
    while (!exchange.IO("status")) {
        Sleep(1000)
    }
    exchange.SetDirection("buy")
    var ticker = exchange.GetTicker()
    Log("ticker", ticker)
    if (ticker) {
        exchange.Buy(ticker.Sell+10, Num)
        Sleep(1000)
        Log(exchange.GetPosition())
    }
    exchange.SetDirection("closebuy")
    ticker = exchange.GetTicker()
    exchange.Sell(ticker.Buy - 1, Num)
    Sleep(1000)
    Log(exchange.GetPosition())
    Log(exchange.GetAccount())
    while(true){
        ticker = exchange.GetTicker()
        if (ticker) {
            LogStatus(ticker.Last, exchange.GetPosition())
        }
    }
}
