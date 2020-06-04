
> 策略名称

OKEX期现对冲

> 策略作者

larry_super

> 策略描述

期现对冲是利用期货和现货之间存在的差价进行套利。因为在交割日的时候，期货会按现货价格成交，当期货和现货一旦出现差价时，就可以通过做空期货做多现货（或做多期货卖出现货）来获得无风险的差价收益。

比如，BTC现价20000刀/个，期货25000刀/个。这个时候我买入1个现货BTC, 同时做空一个期货BTC。等到交割之时，我就能得到5000刀的无风险利润。

期现对冲风险很低，目前按okex的行情大致能达到40%-50%的年化收益。极端大牛大熊行情时，收益会更高。

策略逻辑: 此策略会自动检测OKEX上现货和期货的差价，当差价达到期望盈利阀值时，通过等量对冲来获取盈利。

策略特色: 
支持OKEX上的所有期货品种(BTC, EOS, BCH, ETH等等)
支持自定义杠杆倍数和合约类型(当周，次周等)
支持自定义盈利期望值(比如年化40%的利润)
详尽的报表（包括详尽的策略状态，交易历史，利润跟踪等）
全自动对冲，不需要人工操作

需要面对的风险: 交易所跑路风险

支持平台: Botvs/FMZ

策略参数详细说明：https://www.pcclean.io/7w0e



> 源码 (javascript)

``` javascript
//【OKEX期现对冲】说明
//==============================================================================================================================
/*

注意：
	确定操作的ok期货为“全仓模式”
	确定操作的合约类型为“当周”
	严格按照2个一组的顺序添加交易所 BCH/USDC, BCH/USD   A:现货 B:期货
	策略会用USDT/USD汇率修正现货价格！

版本历史：
	9:51 2018/1/9  			first release
	14:57 2018/1/13 		正式开始运行
	15:12 2018/11/15 		自动处理强平,提高盈利目标,报表支持显示期货仓位,取消显示交易历史,图标只显示stocks
	23:12 2019/02/15		支持按钮清空所有收益日志
	16:09 2019/06/16		支持按钮更新收益图表, 用USDT/USD汇率修正现货价格

*/




var ExchangProcessor={
	
	createNew: function(exA,exB){
		//策略参数
		//==============================================================================================================================
		var contract_type		="this_week";		//合约类型
		var margin_level		=10;				//杠杆倍数
		var want_profit			=0.01;				//想要的额外收入(+汇率损失)
		var ignore_range		=0.001;				//例如USDT对USD, 对冲期的安全波动范围，策略会忽略这个范围的波动
		var max_wait_order		=10000;				//订单等待
		var wait_ms				=3000;				//默认等待毫秒
		var traders_recorder	=false;				//记录所有交易
		
		var handfee=	 {OKEX:0.001,	Futures_OKCoin:0.001};				//手续费
		var trade_amount={ETH_USD:0.5,	BCH_USD:0.5,	BTC_USD:0.05};		//每次交易数量 例如0.5个bch
		var contract_min={ETH_USD:10,	BCH_USD:10,		BTC_USD:100};		//一合约价值多少美金 USD,用这个计算买入张数
		
		var price_n		={ETH_USDT:4,		ETH_USD:3,		BCH_USDT:4,		BCH_USD:3,		BTC_USDT:4,		BTC_USD:2}; 	//价格精度
		var num_n		={ETH_USDT:3,		ETH_USD:0,		BCH_USDT:3,		BCH_USD:0,		BTC_USDT:3,		BTC_USD:0}; 	//数量精度
		var minestbuy	={ETH_USDT:0.001,	ETH_USD:1,		BCH_USDT:0.001,	BCH_USD:1,		BTC_USDT:0.001,	BTC_USD:1}; 	//最小买入量
		var price_step	={ETH_USDT:0.03,	ETH_USD:0.03,	BCH_USDT:0.05,	BCH_USD:0.05,	BTC_USDT:0.65,	BTC_USD:0.65}; 	//定价单调整价格的单位(每次调整万1, 大致等于25分钟调整%1)
		
		
		
		
		
		//全局状态变量
		//==============================================================================================================================
		var pre_time=null; 		//记录轮询间隔时间
		var limit_orders=[];	//限价单
		var trades=[];			//所有交易
		var pending_pos=[];		//未完成对冲仓位
		var hedging_op=0;		//对冲机会
		var hedging_real=0;		//真实对冲次数
		var hedging_complete=0;	//对冲完成次数
		
		
		
		
		
		
		//构建处理器
		var processor={};
		
		//工具函数
		//==============================================================================================================================		
		//重试购买，直到成功返回
		processor.retryBuy=function(ex,price,num,mode)
		{
			var currency=ex.GetCurrency();
			var r=ex.Buy(_N(price,price_n[currency]), _N(num,num_n[currency]));
			var tempnum=num;
			while (!r){
				Log("Buy失败，正在重试。");
				Sleep(wait_ms);
				if (mode==="spot"){
					var account=_C(ex.GetAccount);
					var ticker=_C(ex.GetTicker);
					var last=ticker.Last;
					var fixedAmount=Math.min(account.Balance*0.95/last,num);
					r=ex.Buy(_N(price,price_n[currency]), _N(fixedAmount,num_n[currency]));
				}else if(mode==="futures"){
					//tempnum=tempnum-1;
					if (tempnum===0){
						break;
					}
					r=ex.Buy(_N(price,price_n[currency]), _N(tempnum,num_n[currency]));
				}
			}
			return r;
		}
		//重试卖出，直到成功返回
		processor.retrySell=function(ex,price,num,mode){
			var currency=ex.GetCurrency();
			var r=ex.Sell(_N(price,price_n[currency]), _N(num,num_n[currency]));
			var tempnum=num;
			while (!r){
				Log("Sell失败，正在重试。");
				Sleep(wait_ms);
				if (mode==="spot"){
					var account=_C(ex.GetAccount);
					var fixedAmount=Math.min(account.Stocks,num);
					r=ex.Sell(_N(price,price_n[currency]), _N(fixedAmount,num_n[currency]));
				}else if(mode==="futures"){
					//tempnum=tempnum-1;
					var position=_C(ex.GetPosition);
					if (tempnum===0 || position.length===0){
						break;
					}
					r=ex.Sell(_N(price,price_n[currency]), _N(tempnum,num_n[currency]));

				}
			}
			return r;
		}
		//获得美元汇率
		processor.getUSDTratio=function(){
			var r = _C(HttpQuery,"https://api.coinmarketcap.com/v2/ticker/825/");
			var o = JSON.parse(r);
			return o.data.quotes.USD.price;
		}
		//获得中国时间
		processor.get_ChinaTimeString=function(){
			var date = new Date(); 
			var now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
			var cdate=new Date(now_utc);
			cdate.setHours(cdate.getHours()+8);
			var localstring=cdate.getFullYear()+'/'+(cdate.getMonth()+1)+'/'+cdate.getDate()+' '+cdate.getHours()+':'+cdate.getMinutes()+':'+cdate.getSeconds();
			return localstring;
		}
		//处理定价单
		processor.process_limiteorders=function(){
			var cur_time=new Date();
			var limit_orders_new=[];
			for (var i=0; i<limit_orders.length; ++i){
				var create_time=limit_orders[i].create_time;
				var passedtime=cur_time-create_time;
				if (passedtime>max_wait_order){
					var exchange_c=limit_orders[i].exchange;
					var order_ID=limit_orders[i].ID;
					var ordermode=limit_orders[i].mode;
					var exname=exchange_c.GetName();
					var account=_C(exchange_c.GetAccount);
					var ticker=_C(exchange_c.GetTicker);
					var last=ticker.Last;
					var orderdata=_C(exchange_c.GetOrder,order_ID);
					var type=orderdata.Type;
					var currency=exchange_c.GetCurrency();
					
					if (orderdata.Status!=ORDER_STATE_CLOSED){
						var notcompleted=orderdata.Amount-orderdata.DealAmount;
						exchange_c.CancelOrder(order_ID);
						if (type===ORDER_TYPE_BUY){
							var allowbuy=notcompleted;
							if (allowbuy>=minestbuy[currency]){
								var limited_order_ID=processor.retryBuy(exchange_c,orderdata.Price+price_step[currency],allowbuy,ordermode);
								Log("加价买入。"+orderdata.Price+"|"+(orderdata.Price+price_step[currency]));
								var limited_order_data={
									exchange:exchange_c,
									ID:limited_order_ID,
									create_time:new Date(),
									utcdate:processor.get_ChinaTimeString(),
									mode:ordermode
								};
								limit_orders_new.push(limited_order_data);
							}
						}else if (type===ORDER_TYPE_SELL){
							var allowsell=notcompleted;
							if (allowsell>=minestbuy[currency]){
								var limited_order_ID=processor.retrySell(exchange_c,orderdata.Price-price_step[currency],allowsell,ordermode);
								Log("降价卖出。"+orderdata.Price+"|"+(orderdata.Price-price_step[currency]));
								var limited_order_data={
									exchange:exchange_c,
									ID:limited_order_ID,
									create_time:new Date(),
									utcdate:processor.get_ChinaTimeString(),
									mode:ordermode
								};
								limit_orders_new.push(limited_order_data);
							}
						}
						
						//保存交易信息
						if (type===ORDER_TYPE_BUY){
							var details={
								type:"限价买",
								time:limit_orders[i].utcdate,
								RealAmount:orderdata.DealAmount,
								WantAmount:orderdata.Amount,
								RealPrice:orderdata.Price,
								WantPrice:orderdata.Price,
								Memo:"部分完成",
								exname:exname
								};
							if (traders_recorder){
								trades.push(details);
							}
						}else if (type===ORDER_TYPE_SELL){
							var details={
								type:"限价卖",
								time:limit_orders[i].utcdate,
								RealAmount:orderdata.DealAmount,
								WantAmount:orderdata.Amount,
								RealPrice:orderdata.Price,
								WantPrice:orderdata.Price,
								Memo:"部分完成",
								exname:exname
								};
							if (traders_recorder){
								trades.push(details);
							}
						}
					}else{
						//保存交易信息
						if (type===ORDER_TYPE_BUY){
							var details={
								type:"限价买",
								time:limit_orders[i].utcdate,
								RealAmount:orderdata.DealAmount,
								WantAmount:orderdata.Amount,
								RealPrice:orderdata.Price,
								WantPrice:orderdata.Price,
								Memo:"已完成",
								exname:exname
								};
							if (traders_recorder){
								trades.push(details);
							}
						}else if (type===ORDER_TYPE_SELL){
							var details={
								type:"限价卖",
								time:limit_orders[i].utcdate,
								RealAmount:orderdata.DealAmount,
								WantAmount:orderdata.Amount,
								RealPrice:orderdata.Price,
								WantPrice:orderdata.Price,
								Memo:"已完成",
								exname:exname
								};
							if (traders_recorder){
								trades.push(details);
							}
						}
					}
				}else{
					limit_orders_new.push(limit_orders[i]);
				}
			}
			limit_orders=limit_orders_new;
		}
		//强制执行限价单
		processor.force_limited_order=function(type,ex,price,num,mode){
			if (type==="buy"){
				var buyID=processor.retryBuy(ex,price,num,mode);
				var order1={
					exchange:ex,
					ID:buyID,
					create_time:new Date(),
					utcdate:processor.get_ChinaTimeString(),
					mode:mode
				};
				limit_orders.push(order1);
			}
			if (type==="sell"){
				var sellID=processor.retrySell(ex,price,num,mode);
				var order1={
					exchange:ex,
					ID:sellID,
					create_time:new Date(),
					utcdate:processor.get_ChinaTimeString(),
					mode:mode
				};
				limit_orders.push(order1);
			}
			
			while(limit_orders.length!==0){
				//process limited orders
				processor.process_limiteorders();
				Sleep(wait_ms);
			}
		}
		
		
		
		
		
		
		
		
		//初始化
		//==============================================================================================================================
		processor.init_obj=function(){
			_CDelay(wait_ms);
			pre_time = new Date();
		}
		
		
		
		
		
		
		
		
		//处理交易
		//==============================================================================================================================
		processor.work=function(){
			var cur_time = new Date();
			var passedtime=cur_time-pre_time;
			pre_time=cur_time;
			
			var USDT_r=processor.getUSDTratio();
			
			//get information
			var A_account=_C(exA.GetAccount);
			var A_exname=exA.GetName();
			var A_currency=exA.GetCurrency();
			var A_quotecurrency=exA.GetQuoteCurrency();
			var A_ticker=_C(exA.GetTicker);
			var A_last=A_ticker.Last;
			var A_last_fixed=A_last*USDT_r;	//Fixed price: ETH/USD
			var A_depth=_C(exA.GetDepth);
			var A_orders=_C(exA.GetOrders);
			var A_buy1=A_depth.Bids[0].Price;
			var A_sell1=A_depth.Asks[0].Price;
			
			exB.SetContractType(contract_type);
			exB.SetMarginLevel(margin_level);
			var B_account=_C(exB.GetAccount);
			var B_exname=exB.GetName();
			var B_currency=exB.GetCurrency();
			var B_quotecurrency=exB.GetQuoteCurrency();
			var B_ticker=_C(exB.GetTicker);
			var B_last=B_ticker.Last;
			var B_depth=_C(exB.GetDepth);
			var B_orders=_C(exB.GetOrders);
			var B_buy1=B_depth.Bids[0].Price;
			var B_sell1=B_depth.Asks[0].Price;
			
			var cdiff=Math.abs(B_last-A_last_fixed)/A_last_fixed;
			var cdiff2=(B_last-A_last_fixed)/A_last_fixed;
			var target_bofu=want_profit+handfee[A_exname]*2+handfee[B_exname]*2+ignore_range;
			
			
			//开始对冲
			if (limit_orders.length===0 && A_last_fixed>B_last && cdiff>target_bofu){
				
				hedging_op++;
				
				var heyuefenshu_B=_N(trade_amount[B_currency]*B_last/contract_min[B_currency],0);
				var exact_amount=heyuefenshu_B*contract_min[B_currency]/B_last;
				
				if (A_account.Stocks*0.9>exact_amount && B_account.Stocks*0.9>exact_amount){
					
					hedging_real++;
					
					//sell 1 bch from A
					processor.force_limited_order("sell",exA,A_buy1,exact_amount,"spot");
					//buy 1 bch from B
					exB.SetDirection("buy");
					processor.force_limited_order("buy",exB,B_sell1,heyuefenshu_B,"futures");
					
					var posA={
						type:'spot-sell',
						exchange:exA,
						price:A_buy1,
						amount:exact_amount,
						starttime:processor.get_ChinaTimeString()
					};
					pending_pos.push(posA);
					var posB={
						type:'futures-buyup',
						exchange:exB,
						price:B_sell1,
						amount:heyuefenshu_B,
						starttime:processor.get_ChinaTimeString()
					};
					pending_pos.push(posB);

				}
				
			}
			if (limit_orders.length===0 && A_last_fixed<B_last && cdiff>target_bofu){
				
				hedging_op++;
				
				var heyuefenshu_B=_N(trade_amount[B_currency]*B_last/contract_min[B_currency],0);
				var exact_amount=heyuefenshu_B*contract_min[B_currency]/B_last;
				
				if (A_account.Balance*0.9>exact_amount*A_last && B_account.Stocks*0.9>exact_amount){
					
					hedging_real++;
					
					//buy 1 bch from A
					processor.force_limited_order("buy",exA,A_sell1,exact_amount,"spot");
					//sell 1 bch from B
					exB.SetDirection("sell");
					processor.force_limited_order("buy",exB,B_sell1,heyuefenshu_B,"futures");
					
					var posA={
						type:'spot-buy',
						exchange:exA,
						price:A_sell1,
						amount:exact_amount,
						starttime:processor.get_ChinaTimeString()
					};
					pending_pos.push(posA);
					var posB={
						type:'futures-buydown',
						exchange:exB,
						price:B_sell1,
						amount:heyuefenshu_B,
						starttime:processor.get_ChinaTimeString()
					};
					pending_pos.push(posB);

				}
			}
			
			//结束对冲
			if (limit_orders.length===0 && cdiff<=ignore_range && A_orders.length===0 && B_orders.length===0 && pending_pos.length>0){
				
				hedging_complete++;
				
				for (var thidx=0; thidx<pending_pos.length; ++thidx){
					var posinfo=pending_pos[thidx];
					var ticker=_C(posinfo.exchange.GetTicker);
					var last=ticker.Last;
					var depth=_C(posinfo.exchange.GetDepth);
					var buy1=depth.Bids[0].Price;
					var sell1=depth.Asks[0].Price;
					var account=_C(posinfo.exchange.GetAccount);
					if (posinfo.type==='futures-buydown'){
						posinfo.exchange.SetDirection("closesell");
						processor.force_limited_order("sell",posinfo.exchange,buy1,posinfo.amount,"futures");
					}
					if (posinfo.type==='futures-buyup'){
						posinfo.exchange.SetDirection("closebuy");
						processor.force_limited_order("sell",posinfo.exchange,buy1,posinfo.amount,"futures");
					}
					
					if (posinfo.type==='spot-buy'){
						processor.force_limited_order("sell",posinfo.exchange,buy1,Math.min(account.Stocks,posinfo.amount),"spot");
					}
					if (posinfo.type==='spot-sell'){
						processor.force_limited_order("buy",posinfo.exchange,sell1,Math.min(account.Balance/last,posinfo.amount),"spot");
					}
				}
				
				pending_pos=[];
			}
			
			//自动释放对冲仓位
			var B_position=_C(exB.GetPosition);
			if (B_position.length===0 && pending_pos.length>0 && limit_orders.length===0 && A_orders.length===0 && B_orders.length===0){
				Log('检测到Okex的仓位已被强平，执行自动释放对冲仓位。');
				
				hedging_complete++;
				
				for (var thidx=0; thidx<pending_pos.length; ++thidx){
					var posinfo=pending_pos[thidx];
					var ticker=_C(posinfo.exchange.GetTicker);
					var last=ticker.Last;
					var depth=_C(posinfo.exchange.GetDepth);
					var buy1=depth.Bids[0].Price;
					var sell1=depth.Asks[0].Price;
					var account=_C(posinfo.exchange.GetAccount);
					
					if (posinfo.type==='spot-buy'){
						processor.force_limited_order("sell",posinfo.exchange,buy1,Math.min(account.Stocks,posinfo.amount),"spot");
					}
					if (posinfo.type==='spot-sell'){
						processor.force_limited_order("buy",posinfo.exchange,sell1,Math.min(account.Balance/last,posinfo.amount),"spot");
					}
				}
				
				pending_pos=[];
			}
			
			
			//status
			var table1 = {type: 'table', title: '交易所', cols: ['交易所','交易对','最新价格','钱','币','未完成订单','买一','卖一'], rows: []};
			var table2 = {type: 'table', title: '统计', cols: ['轮询时间','当前价差','目标价差','对冲机会/实际对冲次数/对冲完成次数','USDT/USD','忽略波动范围'], rows: []};
			var table3 = {type: 'table', title: '未完成对冲仓位', cols: ['交易所','类型','价格','数量','开仓时间'], rows: []};
			var table4 = {type: 'table', title: '未完成定价单', cols: ['交易所','订单ID','发单日期'], rows: []};
			var table5 = {type: 'table', title: '交易历史', cols: ['交易所','日期','类型', '成交数量','发单数量','成交价','发单价','备注'], rows: []};
			var table6 = {type: 'table', title: '期货仓位', cols: ['交易所','持仓量','冻结量','持仓均价','实现盈余','类型','合约代码'], rows: []};
			table1.rows.push([A_exname,A_currency,A_last+'(修正价:'+A_last_fixed+')',A_account.Balance,A_account.Stocks,A_orders.length,A_depth.Bids[0].Price,A_depth.Asks[0].Price]);
			table1.rows.push([B_exname,B_currency,B_last,B_account.Balance,B_account.Stocks,B_orders.length,B_depth.Bids[0].Price,B_depth.Asks[0].Price]);
			table2.rows.push([passedtime+'毫秒',cdiff2,target_bofu,hedging_op+'/'+hedging_real+'/'+hedging_complete,USDT_r,ignore_range]);
			for (var thidx=0; thidx<pending_pos.length; ++thidx){
				var posinfo=pending_pos[thidx];
				table3.rows.push([posinfo.exchange.GetName(),posinfo.type,posinfo.price,posinfo.amount,posinfo.starttime]);
			}
			for (var idx2=0; idx2<limit_orders.length; ++idx2){
				var info=limit_orders[idx2];
				table4.rows.push([info.exchange.GetName(),info.ID,info.utcdate]);
			}
			for (var i=0; i < trades.length; i++){
				table5.rows.push([trades[i].exname,trades[i].time,trades[i].type,trades[i].RealAmount,trades[i].WantAmount,trades[i].RealPrice,trades[i].WantPrice,trades[i].Memo]);
			}
			for (var i=0; i < B_position.length; i++){
				table6.rows.push([B_exname,B_position[i].Amount,B_position[i].FrozenAmount,B_position[i].Price,B_position[i].Profit,B_position[i].Type,B_position[i].ContractType]);
			}

			processor.logstatus=('`' + JSON.stringify([table1,table2,table3,table4,table6,table5])+'`'+'\n');
			processor.stocksbalance=A_account.Stocks+B_account.Stocks;
			
			//sleep
			Sleep(wait_ms);
		}
		
		return processor;
	}
};









//主函数
//==============================================================================================================================
function main(){
	var processors=[];
	for (var i=0; i<exchanges.length; i+=2){
		var p=ExchangProcessor.createNew(exchanges[i],exchanges[i+1]);
		processors.push(p);
	}
	for (i=0; i<processors.length; ++i){
		processors[i].init_obj();
	}
	
	var pre_profit=Number(_G("pre_profit"));
	Log('之前收入累计：'+pre_profit);
	var lastprofit=-1;
	var total_loop=0;
	var beginrunning=processors[0].get_ChinaTimeString();

	while(true){
		
		//running processors
		total_loop++;
		var allstatus='';
		allstatus+=('♞策略启动时间: '+beginrunning+'#0000ff\n');
		var mybalance=0;
		for (i=0; i<processors.length; ++i){
			processors[i].work();
			allstatus+=processors[i].logstatus;
			mybalance+=processors[i].stocksbalance;
		}
		allstatus+=('♜轮询次数: '+total_loop+'\n');
		allstatus+=('♜更新时间: '+processors[0].get_ChinaTimeString()+'\n');
		allstatus+=('♜策略仅作为学习交流之用!实盘风险自担！#0000ff'+'\n');
        allstatus+=('♜微信：alinwo (验证消息: botvs)'+'\n');
		allstatus+=('`'+JSON.stringify({'type':'button', 'cmd': 'clearprofitchart', 'name': '清空收益图表'})+'`'+'\n');
		allstatus+=('`'+JSON.stringify({'type':'button', 'cmd': 'logprofit', 'name': '更新收益图表'})+'`'+'\n');
		LogStatus(allstatus);
		
		if (lastprofit!==mybalance && total_loop%300===0){
			LogProfit(mybalance);
			_G("pre_profit", mybalance);
			lastprofit=mybalance;
		}
		
		//process button commands
		var cmd=GetCommand();
        if (cmd!==null && cmd==='clearprofitchart') { 
			LogProfitReset();
            Log("已清空所有收益日志!");
        } 
		if (cmd!==null && cmd==='logprofit') { 
			LogProfit(mybalance);
			_G("pre_profit", mybalance);
			Log("已更新收益图表!");
        } 
	}
}
```

> 策略出处

https://www.fmz.com/strategy/157269

> 更新时间

2019-07-16 14:06:39
