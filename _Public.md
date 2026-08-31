
> Name

_Public

> Author

daniaoren

> Strategy Description

A plugin for placing paired spot-and-futures orders from the trading terminal.

This is a personal utility. By default it supports Deribit spot/futures opening orders. In the contract fields, simply enter the contract name and the desired spread using the default format.

If you want to support other exchanges, you may need to make small modifications yourself.
> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|ContractSwap|swap|Perpetual contract|
|ContractFuture|quarter|Futures contract|
|Amount|true|Order quantity|
|DiffMin|6|Minimum tradable spread|
|RealTrade|false|Place real orders|


> Source (python)

``` python
def main():
	exchange.SetContractType(ContractSwap)
	TickerSwap = exchange.GetTicker()
	TickerSwap['BuyAmount'] = TickerSwap['Info']['result']['best_bid_amount']
	TickerSwap['SellAmount'] = TickerSwap['Info']['result']['best_ask_amount']
	exchange.SetContractType(ContractFuture)
	TickerFuture = exchange.GetTicker()
	TickerFuture['BuyAmount'] = TickerFuture['Info']['result']['best_bid_amount']
	TickerFuture['SellAmount'] = TickerFuture['Info']['result']['best_ask_amount']

	Diff = _N(TickerFuture['Buy'] - TickerSwap['Sell'],2)

	Msg = ''
	Msg += str(ContractSwap) +' '+ str(TickerSwap['Sell']) +' '+ str(TickerSwap['SellAmount'])+ '\n'
	Msg += str(ContractFuture) +' '+ str(TickerFuture['Buy']) +' '+ str(TickerFuture['BuyAmount']) + '\n'
	Msg += '差价: ' + str(Diff) + '\n'

	if Diff <= DiffMin:
		return '差价为 ' + str(_N(Diff,2)) + ' 小于设定价差 '+str(DiffMin)+'，不下单' + '\n\n附加信息\n' +Msg

	if TickerFuture['BuyAmount'] < Amount or TickerFuture['SellAmount'] < Amount:
		return '某方向挂单量小于设定下单量 '+str(Amount)+'，不下单' + '\n\n附加信息\n' +Msg

	if not RealTrade:
		return '非真实交易' + '\n' + Msg

	exchange.SetContractType(ContractSwap)
	exchange.SetDirection("buy")
	BuyOrderId = exchange.Buy(TickerSwap['Sell'] + 0.2, Amount)

	exchange.SetContractType(ContractFuture)
	exchange.SetDirection("sell")
	SellOrderId = exchange.Sell(TickerFuture['Buy'] - 0.2, Amount)

	BuyOrder = exchange.GetOrder(BuyOrderId)
	SellOrder = exchange.GetOrder(SellOrderId)

	TradeMsg = '交易完成\n'
	TradeMsg += '买单 ' + str(BuyOrder['ContractType']) + ' ' + str(BuyOrder['Price']) + ' ' + str(BuyOrder['DealAmount']) + '/' + str(BuyOrder['Amount']) + '\n'
	TradeMsg += '卖单 ' + str(SellOrder['ContractType']) + ' ' + str(SellOrder['Price']) + ' ' + str(SellOrder['DealAmount']) + '/' + str(SellOrder['Amount']) + '\n'
	TradeMsg += '\n\n附加信息\n' +Msg
	return TradeMsg
```

> Detail

https://www.fmz.com/strategy/232006

> Last Modified

2021-02-24 21:04:40
