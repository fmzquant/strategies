
> 策略名称

RSI统计套利策略

> 策略作者

quant777

> 策略描述

此策略是基于RSI指标的统计套利策略，根据实测在熊市中也能有很高的胜率。策略会对行情进行RSI数据分析，一旦捕获到预定义的K线形态即进行短期套利。

RSI指标说明:
RSI最早被用于期货交易中，后来人们发现用该指标来指导股票市场投资效果也十分不错，并对该指标的特点不断进行归纳和总结。现在，RSI已经成为被投资者应用最广泛的技术指标之一。投资的一般原理认为，投资者的买卖行为是各种因素综合结果的反映，行情的变化最终取决于供求关系，而RSI指标正是根据供求平衡的原理，通过测量某一个期间内股价上涨总幅度占股价变化总幅度平均值的百分比，来评估多空力量的强弱程度，进而提示具体操作的。

策略特点:
支持任意级别的趋势跟踪（分钟K，小时K，日K，周K等）
支持任意交易对（ETH/BTC, BSV/BTC等）
支持任意交易所
详细的策略报表（包括策略状态，交易历史记录等）
支持接近10个自定义个性化参数

策略参数说明:
https://www.pcclean.io/8cut



> 源码 (javascript)

``` javascript
/*
RSI策略:仅用于学习用途,用于实盘后果自负
*/

var ExchangProcessor={
	createNew: function(exc_obj){
		//策略参数
		var manage_assets=1;//bch
		var max_positions=4;//max=4N
		var price_n={BTC_BCH:8,ETH_BCH:8,XRP_BCH:8,EOS_BCH:8,LTC_BCH:8,DASH_BCH:8,CET_BCH:8}; //价格精度
		var num_n={BTC_BCH:8,ETH_BCH:8,XRP_BCH:8,EOS_BCH:8,LTC_BCH:8,DASH_BCH:8,CET_BCH:8}; //数量精度
		var minest_buy={BTC_BCH:0.001,ETH_BCH:0.01,XRP_BCH:1,EOS_BCH:1,LTC_BCH:0.1,DASH_BCH:0.01,CET_BCH:1};//最小买入量
		var minest_sell={BTC_BCH:0.001,ETH_BCH:0.01,XRP_BCH:1,EOS_BCH:1,LTC_BCH:0.1,DASH_BCH:0.01,CET_BCH:1};//最小卖出量
		var order_wait_secs=120000; //订单的最长等待时间 毫秒
		var wait_ms=1000;//默认等待毫秒
		var sxf=0.0005;//用来计算手续费消耗
		
		
		//全局状态变量
		var positions=[];//记录仓位
		var init_asset=0; //初始资产
		var trades=[];//所有交易
		var trades_recorder=true;//记录所有交易
		var pre_time=null; //记录轮询间隔时间
		var approximate_profit=0;//盈亏近似值
		var add_already=0;//已经加仓次数
		
		var processor={};
		//重试购买，直到成功返回
		processor.retryBuy=function(ex,price,num)
		{
			var currency=ex.GetCurrency();
			var r=ex.Buy(_N(price,price_n[currency]), _N(num,num_n[currency]));
			while (!r){
				Log("Buy失败，正在retry。");
				Sleep(wait_ms);
				var account=_C(ex.GetAccount);
				var ticker=_C(ex.GetTicker);
				var last=ticker.Last;
				var fixedAmount=(price===-1?Math.min(account.Balance*0.95,num):Math.min(account.Balance/last*0.95,num));
				r=ex.Buy(_N(price,price_n[currency]), _N(fixedAmount,num_n[currency]));
			}
			return r;
		}
		
		//重试卖出，直到成功返回
		processor.retrySell=function(ex,price,num){
			var currency=ex.GetCurrency();
			var r=ex.Sell(_N(price,price_n[currency]), _N(num,num_n[currency]));
			while (!r){
				Log("Sell失败，正在retry。");
				Sleep(wait_ms);
				var account=_C(ex.GetAccount);
				var fixedAmount=Math.min(account.Stocks,num);
				r=ex.Sell(_N(price,price_n[currency]), _N(fixedAmount,num_n[currency]));
			}
			return r;
		}
		
		
		processor.get_ChinaTimeString=function(){
			var date = new Date(); 
			var now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
					date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
			var cdate=new Date(now_utc);
			cdate.setHours(cdate.getHours()+8);
			var localstring=cdate.getFullYear()+'/'+(cdate.getMonth()+1)+'/'+cdate.getDate()+' '+cdate.getHours()+':'+cdate.getMinutes()+':'+cdate.getSeconds();
			return localstring;
		}
		
		processor.init_obj=function(){
			_CDelay(wait_ms);
			pre_time = new Date();
			
			//init
			{
				var account=_C(exc_obj.GetAccount);
				var ticker=_C(exc_obj.GetTicker);
				var last=ticker.Last;
				init_asset=(account.Balance+account.FrozenBalance)+(account.Stocks+account.FrozenStocks)*last;
				Sleep(wait_ms);
			}
		}
		
		
		processor.work=function(){
			var cur_time = new Date();
			var passedtime=cur_time-pre_time;
			pre_time=cur_time;
			
			//计算n,头寸
			var exname=exc_obj.GetName();
			var currency=exc_obj.GetCurrency();
			var account=_C(exc_obj.GetAccount);
			var ticker=_C(exc_obj.GetTicker);
			var depth = _C(exc_obj.GetDepth);
			var last=ticker.Last;
			var ask1=depth.Asks[0].Price;
			var bid1=depth.Bids[0].Price;
			var bestprice=bid1+(Math.abs(ask1-bid1)/2);
			var records = _C(exc_obj.GetRecords);
			if (records.length<=50){
				Log("records.length is not valid.");
				Sleep(wait_ms);
				return;
			}
			var atr = TA.ATR(records, 20);
			if (atr.length<=1){
				Log("atr.length is not valid.");
				Sleep(wait_ms);
				return;
			}
			var N=atr[atr.length-1];
			var position_unit=Math.min(manage_assets*0.01/N,account.Balance/last*0.95);//cet
			//Log("N="+N+",  头寸单位="+position_unit+"CET");
			var highest=TA.Highest(records, 20, 'High');
			var Lowest=TA.Lowest(records, 10, 'Low');
			var cur_asset=(account.Balance+account.FrozenBalance)+(account.Stocks+account.FrozenStocks)*last;
			var rsi6 = TA.RSI(records, 6);
			var rsi12 = TA.RSI(records, 12);
			if (rsi6.length<=5 || rsi12.length<=5){
				Log("rsi is not valid.");
				Sleep(wait_ms);
				return;
			}
			var rsi_in=false;
			if (rsi6[rsi6.length-1]-rsi6[rsi6.length-2]>1 && rsi6[rsi6.length-2]<=65){
					//Log("rsi_in=true");
					rsi_in=true;
				}
			var rsi_out=false;
			if (rsi6[rsi6.length-1]>=60){
				//Log("rsi_out=true");
				rsi_out=true;
			}
			
			//建仓
			if (positions.length==0 && position_unit>minest_buy[currency]){
				if (rsi_in)
				{
					var buyID = processor.retryBuy(exc_obj,last,position_unit);
					Sleep(order_wait_secs);
					var buyOrder=_C(exc_obj.GetOrder,buyID);
					if (buyOrder.Status!=ORDER_STATE_CLOSED){
						exc_obj.CancelOrder(buyID);
					}
					if (buyOrder.DealAmount>0){
						var postion = {
							amount:buyOrder.DealAmount, 
							buy_price:buyOrder.AvgPrice, 
							stoploss_price:buyOrder.AvgPrice-N};
						positions.push(postion);
						
						var details={
							type:"建仓",
							time:processor.get_ChinaTimeString(),
							RealAmount:buyOrder.DealAmount,
							WantAmount:position_unit,
							RealPrice:buyOrder.AvgPrice,
							WantPrice:buyOrder.Price,
							Memo:""
							};
						if (trades_recorder){
							trades.push(details);
						}
						
						add_already=1;
					}
				}
			}
			
			//加仓
			if (positions.length>0 && position_unit>minest_buy[currency]){
				var last_buy_price=positions[positions.length-1].buy_price;
				if (add_already<max_positions){
					if (last-last_buy_price>=0.5*N){
						var buyID = processor.retryBuy(exc_obj,last,position_unit);
						Sleep(order_wait_secs);
						var buyOrder=_C(exc_obj.GetOrder,buyID);
						if (buyOrder.Status!=ORDER_STATE_CLOSED){
							exc_obj.CancelOrder(buyID);
						}
						if (buyOrder.DealAmount>0){
							var postion = {
								amount:buyOrder.DealAmount, 
								buy_price:buyOrder.AvgPrice, 
								stoploss_price:buyOrder.AvgPrice-N};
							positions.push(postion);
							
							var details={
								type:"加仓",
								time:processor.get_ChinaTimeString(),
								RealAmount:buyOrder.DealAmount,
								WantAmount:position_unit,
								RealPrice:buyOrder.AvgPrice,
								WantPrice:last,
								Memo:""
								};
							if (trades_recorder){
								trades.push(details);
							}
							
							add_already=add_already+1;
						}
					}
				}
			}
			
			//止损
			if (positions.length>0){
				var positions_new=[];
				for (var i=0; i < positions.length; i++){
					if (last<=positions[i].stoploss_price){
						account=_C(exc_obj.GetAccount);
						var fixedAmount=Math.min(account.Stocks,positions[i].amount);
						if (fixedAmount>minest_sell[currency]){
							var sellID = processor.retrySell(exc_obj, last, fixedAmount);
							Sleep(order_wait_secs);
							var sellOrder=_C(exc_obj.GetOrder,sellID);
							approximate_profit+=(sellOrder.AvgPrice*sellOrder.DealAmount*(1-sxf)-positions[i].buy_price*sellOrder.DealAmount*(1+sxf));
							Log("定价卖出: 数量-"+sellOrder.DealAmount+",approximate_profit="+approximate_profit);
							if (sellOrder.Status!=ORDER_STATE_CLOSED){
								exc_obj.CancelOrder(sellID);
								if (Math.min(account.Stocks,fixedAmount-sellOrder.DealAmount)>minest_sell[currency]){
									var marketsellOrderID=processor.retrySell(exc_obj, -1, fixedAmount-sellOrder.DealAmount);
									Sleep(order_wait_secs);
									var marketsellOrderData=_C(exc_obj.GetOrder,marketsellOrderID);
									approximate_profit+=(marketsellOrderData.AvgPrice*marketsellOrderData.DealAmount*(1-sxf)-positions[i].buy_price*marketsellOrderData.DealAmount*(1+sxf));
									Log("市价卖出: 数量-"+marketsellOrderData.DealAmount+",approximate_profit="+approximate_profit);
								}
							}
							
							var details={
								type:"止损",
								time:processor.get_ChinaTimeString(),
								RealAmount:-1,
								WantAmount:fixedAmount,
								RealPrice:-1,
								WantPrice:last,
								Memo:(last>positions[i].buy_price?"盈利":"亏损")
								};
							if (trades_recorder){
								trades.push(details);
							}
						}
					}else{
						positions_new.push(positions[i]);
					}
				}
				positions=positions_new;
			}
			
			//清仓
			if (positions.length>0){
				if (rsi_out){
					var positions_new=[];
					for (var i=0; i < positions.length; i++){
						account=_C(exc_obj.GetAccount);
						var fixedAmount=Math.min(account.Stocks,positions[i].amount);
						if (fixedAmount>minest_sell[currency]){
							var sellID = processor.retrySell(exc_obj, last, fixedAmount);
							Sleep(order_wait_secs);
							var sellOrder=_C(exc_obj.GetOrder,sellID);
							approximate_profit+=(sellOrder.AvgPrice*sellOrder.DealAmount*(1-sxf)-positions[i].buy_price*sellOrder.DealAmount*(1+sxf));
							Log("定价卖出: 数量-"+sellOrder.DealAmount+",approximate_profit="+approximate_profit);
							if (sellOrder.Status!=ORDER_STATE_CLOSED){
								exc_obj.CancelOrder(sellID);
								if (Math.min(account.Stocks,fixedAmount-sellOrder.DealAmount)>minest_sell[currency]){
									var marketsellOrderID=processor.retrySell(exc_obj, -1, fixedAmount-sellOrder.DealAmount);
									Sleep(order_wait_secs);
									var marketsellOrderData=_C(exc_obj.GetOrder,marketsellOrderID);
									approximate_profit+=(marketsellOrderData.AvgPrice*marketsellOrderData.DealAmount*(1-sxf)-positions[i].buy_price*marketsellOrderData.DealAmount*(1+sxf));
									Log("市价卖出: 数量-"+marketsellOrderData.DealAmount+",approximate_profit="+approximate_profit);
								}
							}
							
							var details={
								type:"清仓",
								time:processor.get_ChinaTimeString(),
								RealAmount:-1,
								WantAmount:fixedAmount,
								RealPrice:-1,
								WantPrice:last,
								Memo:(last>positions[i].buy_price?"盈利":"亏损")
								};
							if (trades_recorder){
								trades.push(details);
							}
						}
					}
					positions=positions_new;
				}
			}
			
			
			//显示状态
			var table1 = {type: 'table', title: '仓位-'+exname+'('+currency+')', cols: ['数量', '成交价','止损价'], rows: []};
			var table2 = {type: 'table', title: '状态-'+exname+'('+currency+')', cols: ['平均真实波幅(N)','头寸单位','初始资产','当前资产','轮询时间','最新价','Highest','Lowest','加仓次数','【近似盈亏】'], rows: []};
			var table3 = {type: 'table', title: '交易历史-'+exname+'('+currency+')', cols: ['日期','类型', '成交数量','发单数量','成交价','发单价','备注'], rows: []};
			for (var i=0; i < positions.length; i++){
				table1.rows.push([positions[i].amount,positions[i].buy_price,positions[i].stoploss_price]);
			}
			table2.rows.push([N,position_unit,init_asset,cur_asset,passedtime+'ms',last,highest,Lowest,add_already,approximate_profit]);
			for (i=0; i < trades.length; i++){
				table3.rows.push([trades[i].time,trades[i].type,trades[i].RealAmount,trades[i].WantAmount,trades[i].RealPrice,trades[i].WantPrice,trades[i].Memo]);
			}
			processor.logstatus=('`' + JSON.stringify([table1, table2, table3])+'`'+'\n');
			
			//记录盈利
			processor.logprofit=approximate_profit;
			
			//rest
			Sleep(wait_ms);
		}
		
		return processor;
	}
};



//主函数
function main(){
	var exchange_num=exchanges.length;
	var processors=[];
	for (var i=0; i<exchange_num; ++i){
		var p=ExchangProcessor.createNew(exchanges[i]);
		processors.push(p);
	}
	for (i=0; i<exchange_num; ++i){
		processors[i].init_obj();
	}
	var pre_profit=Number(_G("pre_profit"));
	Log('之前收入累计：'+pre_profit);
	var lastprofit=0;
	while(true){
		var allstatus='定制策略请联系微信: alinwo (验证消息:botvs量化)#0000ff'+'\n';
		var allprofit=0;
		for (i=0; i<exchange_num; ++i){
			processors[i].work();
			allstatus+=processors[i].logstatus;
			allprofit+=processors[i].logprofit;
		}
		allstatus+=('定制策略请联系微信: alinwo (验证消息:botvs量化)#0000ff'+'\n');
		LogStatus(allstatus);
		if (lastprofit!==allprofit){
			LogProfit(pre_profit+allprofit);
			_G("pre_profit", pre_profit+allprofit);
			lastprofit=allprofit;
		}
	}
}
```

> 策略出处

https://www.fmz.com/strategy/157366

> 更新时间

2019-07-16 14:28:24
