
> Name

Turtle-Soup-Counter-Trend-Trading-Strategy

> Author

coin989

> Strategy Description

Turtle Soup, often shortened to "Soup," is a counter-trend strategy built as the opposite of the Turtle Trading rules. It seeks to profit from the weaknesses of trend-following systems—especially their vulnerability to false breakouts.

In the early 1980s, the famous group of traders known as the Turtles was trained by Richard Dennis. He believed traders could be raised much like turtles on a farm, which is how the name originated. The Turtle method became a classic trend-following system and was highly successful for Dennis and his trainees.

More than twenty years later, the Turtle method is no longer a secret. Even so, relatively few traders have been able to use it successfully. One reason is that trend-following strategies usually require traders to endure deep and prolonged drawdowns. Many investors and traders either do not have enough capital or cannot tolerate those losing periods long enough to see the strategy recover.

Linda Bradford Raschke and Laurence Connors introduced the "Turtle Soup" concept in *Street Smarts* as the opposite of the Turtle breakout rules. Many strategies lose their edge once too many market participants adopt them, and Turtle Soup is designed to exploit that imbalance. Rather than waiting through repeated losing breakout trades, the idea is to trade against failed breakouts and benefit from the costs borne by breakout traders.

The original Turtle rules were at least swing-trading systems, often holding positions from one week to a month. Raschke's Turtle Soup approach is better suited to shorter-term intraday or swing trading and focuses on the frequent occurrence of false breakouts. In general, the Turtle method buys 20-day highs and sells 20-day lows, while Turtle Soup takes the opposite side of those failed moves.

Strategy features:
- Supports trend tracking on any timeframe, including minute, hourly, daily, and weekly bars
- Supports any trading pair, such as ETH/BTC or BSV/BTC
- Supports any exchange
- Includes detailed strategy reports, including strategy status and trade history
- Supports nearly 10 customizable parameters

Required dependency: botvs_tools template library
https://www.pcclean.io/9o7u

> Source (javascript)

``` javascript
var strategy_version="1.0.0.0(new release 仅供学习研究使用，实盘后果自负。实盘策略访问http://pcclean.io/quant  )";

var price_n={Futures_OKCoin_BSV_USD:2};
var num_n={Futures_OKCoin_BSV_USD:0};
var minestbuy={Futures_OKCoin_BSV_USD:1};
var price_step={Futures_OKCoin_BSV_USD:0.05};
var contract_min={Futures_OKCoin_BSV_USD:10};
var wait_ms=3000;
var max_wait_order=15000;
var max_positions=4;

//gloabl variables
var positions_duo=[];
var positions_kong=[];
var total_loop=0;
var bet_duo=0;
var bet_kong=0;

function main(){
	Log("strategy_version="+strategy_version);
	$.set_params(price_n,num_n,minestbuy,price_step,wait_ms,max_wait_order);
	while(true){
		var exname=exchange.GetName();
		var currency=exchange.GetCurrency();
		var account=_C(exchange.GetAccount);
		var ticker=_C(exchange.GetTicker);
		var depth=_C(exchange.GetDepth);		
		var sell1=depth.Asks[0].Price;
		var buy1=depth.Bids[0].Price;
		var records=_C(exchange.GetRecords);
		if (records.length<=50){
			Log("records.length无效,跳过此次执行...");
			Sleep(wait_ms);
			continue;
		}
		var atr = TA.ATR(records, 20);
		if (atr.length<=1){
			Log("atr.length无效,跳过此次执行...");
			Sleep(wait_ms);
			continue;
		}
		var N=atr[atr.length-1];
		var position_unit=account.Stocks/(max_positions*2);
		var highest20=TA.Highest(records, 20, 'High');
		var lowest20=TA.Lowest(records, 20, 'Low');
		var highest10=TA.Highest(records, 10, 'High');		
		var lowest10=TA.Lowest(records, 10, 'Low');
		
		//建仓
		if (positions_duo.length===0){
			if (sell1<=lowest20){
				var heyuefenshu=_N(position_unit*sell1/contract_min[$.get_exchange_id(exchange)],0);
				exchange.SetDirection("buy");
				var dealamount=$.perform_limited_order("buy",exchange,sell1,heyuefenshu,false,"futures","buy");
				if (dealamount>0){
					var postion = {
						amount:dealamount, 
						price:sell1,
						stoploss_price:sell1-2.5*N,
						stopwin_price:sell1+2.5*N,
						};
					positions_duo.push(postion);
					bet_duo=1;
				}
			}
		}
		if (positions_kong.length===0){
			if (buy1>=highest20){
				var heyuefenshu=_N(position_unit*buy1/contract_min[$.get_exchange_id(exchange)],0);
				exchange.SetDirection("sell");
				var dealamount=$.perform_limited_order("buy",exchange,buy1,heyuefenshu,false,"futures","sell");
				if (dealamount>0){
					var postion = {
						amount:dealamount, 
						price:buy1,
						stoploss_price:buy1+2.5*N,
						stopwin_price:buy1-2.5*N,
						};
					positions_kong.push(postion);
					bet_kong=1;
				}
			}
		}
		//加仓
		if (positions_duo.length>0){
			var last_price=positions_duo[positions_duo.length-1].price;
			if (bet_duo<max_positions){
				if (last_price-sell1>=0.5*N){
					var heyuefenshu=_N(position_unit*sell1/contract_min[$.get_exchange_id(exchange)],0);
					exchange.SetDirection("buy");
					var dealamount=$.perform_limited_order("buy",exchange,sell1,heyuefenshu,false,"futures","buy");
					if (dealamount>0){
						var postion = {
							amount:dealamount, 
							price:sell1,
							stoploss_price:sell1-2.5*N,
							stopwin_price:sell1+2.5*N,
							};
						positions_duo.push(postion);
						bet_duo+=1;
					}
				}
			}
		}
		if (positions_kong.length>0){
			var last_price=positions_kong[positions_kong.length-1].price;
			if (bet_kong<max_positions){
				if (buy1-last_price>=0.5*N){
					var heyuefenshu=_N(position_unit*buy1/contract_min[$.get_exchange_id(exchange)],0);
					exchange.SetDirection("sell");
					var dealamount=$.perform_limited_order("buy",exchange,buy1,heyuefenshu,false,"futures","sell");
					if (dealamount>0){
						var postion = {
							amount:dealamount, 
							price:buy1,
							stoploss_price:buy1+2.5*N,
							stopwin_price:buy1-2.5*N,
							};
						positions_kong.push(postion);
						bet_kong+=1;
					}
				}
			}
		}
		//止损
		if (positions_duo.length>0){
			var positions_duo_new=[];
			for (var i=0; i < positions_duo.length; i++){
				if (buy1<=positions_duo[i].stoploss_price){
					exchange.SetDirection("closebuy");
					$.perform_limited_order("sell",exchange,buy1,positions_duo[i].amount,true,"futures","closebuy");
				}else{
					positions_duo_new.push(positions_duo[i]);
				}
			}
			positions_duo=positions_duo_new;
		}
		if (positions_kong.length>0){
			var positions_kong_new=[];
			for (var i=0; i < positions_kong.length; i++){
				if (sell1>=positions_kong[i].stoploss_price){
					exchange.SetDirection("closesell");
					$.perform_limited_order("sell",exchange,sell1,positions_kong[i].amount,true,"futures","closesell");
				}else{
					positions_kong_new.push(positions_kong[i]);
				}
			}
			positions_kong=positions_kong_new;
		}
		//止盈
		if (positions_duo.length>0){
			var positions_duo_new=[];
			for (var i=0; i < positions_duo.length; i++){
				if (buy1>=positions_duo[i].stopwin_price){
					exchange.SetDirection("closebuy");
					$.perform_limited_order("sell",exchange,buy1,positions_duo[i].amount,true,"futures","closebuy");
				}else{
					positions_duo_new.push(positions_duo[i]);
				}
			}
			positions_duo=positions_duo_new;
		}
		if (positions_kong.length>0){
			var positions_kong_new=[];
			for (var i=0; i < positions_kong.length; i++){
				if (sell1<=positions_kong[i].stopwin_price){
					exchange.SetDirection("closesell");
					$.perform_limited_order("sell",exchange,sell1,positions_kong[i].amount,true,"futures","closesell");
				}else{
					positions_kong_new.push(positions_kong[i]);
				}
			}
			positions_kong=positions_kong_new;
		}
		//清仓
		if (positions_duo.length>0){
			if (buy1>=highest10){
				for (var i=0; i < positions_duo.length; i++){
					exchange.SetDirection("closebuy");
					$.perform_limited_order("sell",exchange,buy1,positions_duo[i].amount,true,"futures","closebuy");
				}
				positions_duo=[];
			}
		}
		if (positions_kong.length>0){
			if (sell1<=lowest10){
				for (var i=0; i < positions_kong.length; i++){
					exchange.SetDirection("closesell");
					$.perform_limited_order("sell",exchange,sell1,positions_kong[i].amount,true,"futures","closesell");
				}
				positions_kong=[];
			}
		}
		//交易所强平
		var current_ok_position=_C(exchange.GetPosition);//must update here
		if (current_ok_position.length===0){
			positions_duo=[];
			positions_kong=[];
		}
		
		//chart
		var table1={type: 'table', title: '期货仓位', cols: ['交易所','持仓量','冻结量','持仓均价','实现盈余','类型','合约代码'], rows: []};
		var table2={type: 'table', title: '跟踪仓位', cols: ['交易所','类型','数量','价格','止损价','止盈价'], rows: []};
		for (var i=0; i < current_ok_position.length; i++){
				table1.rows.push([exname,
				current_ok_position[i].Amount,
				current_ok_position[i].FrozenAmount,
				current_ok_position[i].Price,
				current_ok_position[i].Profit,
				current_ok_position[i].Type,
				current_ok_position[i].ContractType]);
			}
		for (i=0; i<positions_duo.length; ++i){
			table2.rows.push([exname,'做多',positions_duo[i].amount,positions_duo[i].price,
			positions_duo[i].stoploss_price,positions_duo[i].stopwin_price]);
		}
		for (i=0; i<positions_kong.length; ++i){
			table2.rows.push([exname,'做空',positions_kong[i].amount,positions_kong[i].price,
			positions_kong[i].stoploss_price,positions_kong[i].stopwin_price]);
		}
		LogStatus(
					'`' + JSON.stringify([table1,table2])+'`'+'\n'+
					'买多仓位：'+positions_duo.length+'\n'+
					'买空仓位：'+positions_kong.length+'\n'+
					'交易单位: '+position_unit+'\n'+
					'highest20: '+highest20+'\n'+
					'highest10: '+highest10+'\n'+
					'lowest20: '+lowest20+'\n'+
					'lowest10: '+lowest10+'\n'+
					'♜轮询次数: '+total_loop+'\n'+
					'♜更新时间: '+$.get_ChinaTimeString()+'\n'+
					'♜定制策略联系微信: alinwo(验证消息:botvs)。实盘策略访问: http://pcclean.io/quant'+'\n'
				  );
		if (total_loop%300===0){
			LogProfit(account.Stocks);
		}
		
		Sleep(wait_ms);
		total_loop++;
	}
}
```

> Detail

https://www.fmz.com/strategy/157372

> Last Modified

2019-07-16 14:57:23
