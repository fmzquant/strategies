
> Name

仓位均衡策略

> Author

春哥



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|TARGET_POSITION|0.5|固定仓位|
|ACT_DIFF|0.1|仓位变化量|


> Source (javascript)

``` javascript
function main() {
	while (true) {
		Sleep(300000);
        
        var account = $.GetAccount();
        var ticker = exchange.GetTicker();
        var stockValue = account.Stocks * ticker.Last;
        var totalValue = stockValue + account.Balance;
        var position = stockValue / totalValue;
        var trade_amount = 0;
        if ( position > TARGET_POSITION + ACT_DIFF ) {
            trade_amount = (position - TARGET_POSITION) * totalValue / ticker.Buy;
            $.Sell(trade_amount);
        } else if ( position < TARGET_POSITION - ACT_DIFF ) {
            trade_amount = (TARGET_POSITION - position) * totalValue / ticker.Sell;
            $.Buy(trade_amount);
        } else {
            Sleep(60000);
            continue;
        }
        
        $.CancelPendingOrders();
        account = $.GetAccount();
        stockValue = account.Stocks * ticker.Last;
        LogProfit(account.Balance + stockValue);
	}
}

```

> Detail

https://www.fmz.com/strategy/54182

> Last Modified

2017-09-06 21:57:31
