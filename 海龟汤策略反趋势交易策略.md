
> Name

海龟汤策略反趋势交易策略

> Author

coin989

> Strategy Description

海龟之汤，简称“龟汤”，是个与海龟交易法则相反的交易策略，它利用了跟势交易（特别是海龟方式）在很多假突破方面的缺陷来获利（把海龟做成汤吃掉）。

上世纪八十年代早期，有个非常著名的交易员团体——叫做“海龟”。缔造了交易传奇的市场大师理查德·丹尼斯在训练一组新交易员的时候起了这个有趣的名字。因为理查德相信，培训交易员，其实就像新加坡人养海龟一样。这个交易方法被称作海龟方法，这个简单的趋势跟随技巧方法曾令他们的导师理查德取得了巨大的成功。

二十多年过去了，海龟方法现在已不再是个秘密，很多人已经了解它。尽管如此，那为何仍没多少人用它交易取得成功呢？那是因为趋势跟随策略通常需要忍受大幅度和长时间的回撤。很多投资者或交易员没有足够的资本或者愿意坚持这些长期的亏损。通常大多数人在交易转向对他们有利之前就已经退出了。

琳达·华斯基和拉利·康诺在他们的书《华尔街精灵——屡试不爽的短期交易策略》（Street Smarts）中命名了这个与“海龟”交易法则相反的“龟汤”交易法则。大多数策略不能保持盈利的原因是，一旦很多市场参与者使用它们，这些策略的盈利能力就将退化。这是市场用来平衡那些不平衡现象的方法。华斯基通过与海龟方法相反的交易，发现更多成功和获利的结果。因为海龟法需要很多失败的交易和坐等坏的交易变得盈利。通常当它获利时，它会抵消那些所有的亏损才盈利，而且这个现象周而复始。很显然，华斯基创造这个策略“海龟之汤”的名字是种美式幽默，它利用海龟交易者的成本来获利（把海龟做成汤吃掉）。

原始的“海龟”交易规则至少是波段交易或更久的交易，时间跨度在一周到一个月之间。华斯基女士使用“龟汤”策略做更短期的日内或波段交易，集中地利用了假突破的高频发生现象。一般来说，“海龟”法使用的20天周期突破：突破20日高则买入，跌破20日低则抛售。而“龟汤”交易法则采用完全相反的方法。

策略特点:
支持任意级别的趋势跟踪（分钟K，小时K，日K，周K等）
支持任意交易对（ETH/BTC, BSV/BTC等）
支持任意交易所
详细的策略报表（包括策略状态，交易历史记录等）
支持接近10个自定义个性化参数

依赖项botvs_tools模板库下载: 
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
