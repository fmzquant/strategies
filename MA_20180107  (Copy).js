/*
策略出处: https://www.botvs.com/strategy/69033
策略名称: MA_20180107  (Copy)
策略作者: ellajella-0378
策略描述:




参数              默认值  描述
------------  -----  ------------
long_period     156  long_period
short_period     35  short_period
*/

/*backtest
start: 2018-01-01 00:00:00
end: 2018-01-07 22:00:00
period: 15m
exchanges: [{"eid":"Bitfinex","currency":"LTC","balance":100000,"stocks":0}]
*/

function refresh_data() {
    ticker = exchange.GetTicker();
    coin_price = ticker.Last
    account = exchange.GetAccount();
    balance = account.Balance
    frozen_balance = account.FrozenBalance
    stocks = account.Stocks
    frozen_stocks = account.FrozenStocks
    total_asset = balance + frozen_balance + (stocks + frozen_stocks) * coin_price
}


function main() {
    refresh_data()
    var init_total_asset = total_asset
    var Profit = null
    Log("账户信息，Total_asset:", total_asset);

    while (true) {
        refresh_data()
        ticker = exchange.GetTicker();
        coin_price = ticker.Last
        var buy_amount = account.Balance / coin_price
        var sell_amount = account.Stocks

        var records = exchange.GetRecords(PERIOD_M15); //可以填入不同k线周期，比如PERIOD_M1,PERIOD_M30,PERIOD_H1......
        var ma_short = TA.MA(records, short_period);
        ma_short = ma_short[ma_short.length - 1]
        var ma_long = TA.MA(records, long_period);
        ma_long = ma_long[ma_long.length - 1]

        var condition = ma_short - ma_long

        if (condition > 0 & buy_amount > 0.001) {
            Log('buy,coin_price=', coin_price, 'buy_amount=', buy_amount)
            var id_buy = exchange.Buy(coin_price, buy_amount);
            Log("id:", id_buy);
            refresh_data()
            Log("账户信息，Total_asset:", total_asset);
            Profit = total_asset - init_total_asset
            LogProfit(Profit)
        } else if (condition <= 0 & sell_amount > 0.001) {
            Log('sell,coin_price=', coin_price, 'sell_amount=', sell_amount)
            var id_sell = exchange.Sell(coin_price, sell_amount);
            Log("id:", id_sell);
            refresh_data()
            Log("账户信息，Total_asset:", total_asset);
            Profit = total_asset - init_total_asset
            LogProfit(Profit)
        }
        Sleep(1000 * 60)
    }
    refresh_data()
    Profit = total_asset - init_total_asset
    LogProfit(Profit)
    Log("账户信息，Total_asset:", total_asset);
}
