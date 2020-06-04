
> 策略名称

EMA趋势跟踪(当周次周季度)

> 策略作者

crypto_future

> 策略描述

此策略基于EMA均线做趋势跟踪，当形成EMA金叉时开仓，形成EMA死叉时平仓。从趋势中赚取利润。本策略支持OKEX合约做多做空双向开仓。

补充说明：EMA（Exponential Moving Average）是指数移动平均值。也叫 EXPMA 指标，它也是一种趋向类指标，指数移动平均值是以指数式递减加权的移动平均。

EMA趋势跟踪法是基于截断亏损，让利润奔跑的交易哲学而开发，趋势跟踪法认为市场中由于人性的贪婪和恐惧以及经济周期的影响，会造成市场走势的持续上升或持续下跌从而形成趋势，通过捕捉市场的主要趋势从而获得市场平均或超越市场平均的利润。

注：本策略仅用于学习调试，用于实盘后果自负。

使用说明:
https://www.pcclean.io/%e6%95%b0%e5%ad%97%e8%b4%a7%e5%b8%81ema%e8%b6%8b%e5%8a%bf%e8%b7%9f%e8%b8%aa%e7%ad%96%e7%95%a5%e5%88%86%e4%ba%abokex%e7%89%88/




> 源码 (javascript)

``` javascript
var strategy_version="1.62.EMA"; //test

/*
使用说明：
- okex的账户设置为10倍杠杆
- 使用全仓模式
- 使用API v1
*/

/********************************************策略参数**********************************/
var price_n={Futures_OKCoin_BSV_USD:2};//价格精度设置
var num_n={Futures_OKCoin_BSV_USD:0};//数量精度设置
var minestbuy={Futures_OKCoin_BSV_USD:1};//最小买入量
var price_step={Futures_OKCoin_BSV_USD:0.2};//定价单调整量
var contract_min={Futures_OKCoin_BSV_USD:10};//最小合约金额
var wait_ms=3000;//重试等待时间(ms)
var max_wait_order=6000;//订单等待时间(ms)
var margin_lv=10;//杠杆倍数
var ok_future_target='bsv';//目标合约
var keep_risk_rate=2;//保证金率  (总权益/可用)
var trade_unit_div=4;//每次交易资产百分比
var push_notification=true;//微信通知交易机会
var N_mult=3;//N的倍数(用于计算高位止损)
var k_type=PERIOD_M15;//k线类型
var N_knumber=50;//取50个bar用于计算n
/********************************************策略参数**********************************/


//全局变量
var total_loop=0;
var tw_sell1_lowest=100000;
var tw_buy1_highest=0;
var nw_sell1_lowest=100000;
var nw_buy1_highest=0;
var qt_sell1_lowest=100000;
var qt_buy1_highest=0;
var total_trade_num=0;
var success_trade_num=0;
var failed_trade_num=0;

//主函数
function main(){
	Log("strategy_version="+strategy_version);
	$.set_params(price_n,num_n,minestbuy,price_step,wait_ms,max_wait_order);
	
	if (push_notification){
		Log("策略开始运行！已开启推送。@");
	}
	
	//restore data
	total_trade_num=Number(_G("total_trade_num"));
	success_trade_num=Number(_G("success_trade_num"));
	failed_trade_num=Number(_G("failed_trade_num"));
	
	while(true){
		
		try{
			exchange.SetMarginLevel(margin_lv);
			var exname=exchange.GetName();
			var currency=exchange.GetCurrency();
			var account=$.retry_get_account(exchange);
			var f_orders=_C(exchange.GetOrders);
			
			exchange.SetContractType("this_week");
			var tw_depth=_C(exchange.GetDepth);
			var tw_sell1=tw_depth.Asks[0].Price;
			var tw_buy1=tw_depth.Bids[0].Price;
			var tw_records=_C(exchange.GetRecords,k_type);
			if (tw_records.length<=60){
				Log("tw_records.length无效,跳过此次执行...");
				Sleep(wait_ms);
				continue;
			}
			
			exchange.SetContractType("next_week");
			var nw_depth=_C(exchange.GetDepth);
			var nw_sell1=nw_depth.Asks[0].Price;
			var nw_buy1=nw_depth.Bids[0].Price;
			var nw_records=_C(exchange.GetRecords,k_type);
			if (nw_records.length<=60){
				Log("nw_records.length无效,跳过此次执行...");
				Sleep(wait_ms);
				continue;
			}
			
			exchange.SetContractType("quarter");
			var qt_depth=_C(exchange.GetDepth);
			var qt_sell1=qt_depth.Asks[0].Price;
			var qt_buy1=qt_depth.Bids[0].Price;
			var qt_records=_C(exchange.GetRecords,k_type);
			if (qt_records.length<=60){
				Log("qt_records.length无效,跳过此次执行...");
				Sleep(wait_ms);
				continue;
			}
			
		
			var position=_C(exchange.GetPosition);
			
			var tw_zuoduo_zhangshu=0;
			var tw_zuoduo_avg_price=0;
			var tw_zuoduo_amount=0;
			var tw_zuokong_zhangshu=0;
			var tw_zuokong_avg_price=0;	
			var tw_zuokong_amount=0;
			
			var nw_zuoduo_zhangshu=0;
			var nw_zuoduo_avg_price=0;
			var nw_zuoduo_amount=0;
			var nw_zuokong_zhangshu=0;
			var nw_zuokong_avg_price=0;
			var nw_zuokong_amount=0;
			
			var qt_zuoduo_zhangshu=0;
			var qt_zuoduo_avg_price=0;
			var qt_zuoduo_amount=0;
			var qt_zuokong_zhangshu=0;
			var qt_zuokong_avg_price=0;
			var qt_zuokong_amount=0;

			
			for (var i=0; i < position.length; i++){
				if (position[i].ContractType==="this_week"){
					if (position[i].Type===PD_LONG){
						tw_zuoduo_zhangshu=position[i].Amount;
						tw_zuoduo_avg_price=position[i].Price;
						tw_zuoduo_amount=tw_zuoduo_zhangshu*contract_min[$.get_exchange_id(exchange)]*(1/tw_zuoduo_avg_price-1/tw_buy1+1/tw_zuoduo_avg_price);
					}
					if (position[i].Type===PD_SHORT){
						tw_zuokong_zhangshu=position[i].Amount;
						tw_zuokong_avg_price=position[i].Price;
						tw_zuokong_amount=tw_zuokong_zhangshu*contract_min[$.get_exchange_id(exchange)]*(1/tw_sell1-1/tw_zuokong_avg_price+1/tw_zuokong_avg_price);
					}
				}
				if (position[i].ContractType==="next_week"){
					if (position[i].Type===PD_LONG){
						nw_zuoduo_zhangshu=position[i].Amount;
						nw_zuoduo_avg_price=position[i].Price;
						nw_zuoduo_amount=nw_zuoduo_zhangshu*contract_min[$.get_exchange_id(exchange)]*(1/nw_zuoduo_avg_price-1/nw_buy1+1/nw_zuoduo_avg_price);
					}
					if (position[i].Type===PD_SHORT){
						nw_zuokong_zhangshu=position[i].Amount;
						nw_zuokong_avg_price=position[i].Price;
						nw_zuokong_amount=nw_zuokong_zhangshu*contract_min[$.get_exchange_id(exchange)]*(1/nw_sell1-1/nw_zuokong_avg_price+1/nw_zuokong_avg_price);
					}
				}
				if (position[i].ContractType==="quarter"){
					if (position[i].Type===PD_LONG){
						qt_zuoduo_zhangshu=position[i].Amount;
						qt_zuoduo_avg_price=position[i].Price;
						qt_zuoduo_amount=qt_zuoduo_zhangshu*contract_min[$.get_exchange_id(exchange)]*(1/qt_zuoduo_avg_price-1/qt_buy1+1/qt_zuoduo_avg_price);
					}
					if (position[i].Type===PD_SHORT){
						qt_zuokong_zhangshu=position[i].Amount;
						qt_zuokong_avg_price=position[i].Price;
						qt_zuokong_amount=qt_zuokong_zhangshu*contract_min[$.get_exchange_id(exchange)]*(1/qt_sell1-1/qt_zuokong_avg_price+1/qt_zuokong_avg_price);
					}
				}
			}
			
			var account_rights=account.Info.info[ok_future_target].account_rights;//账户权益
			var keep_deposit=account.Info.info[ok_future_target].keep_deposit;//保证金
			var profit_real=account.Info.info[ok_future_target].profit_real;//已实现盈亏
			var profit_unreal=account.Info.info[ok_future_target].profit_unreal;//未实现盈亏
			var risk_rate=(keep_deposit===0?1000000:(account_rights/keep_deposit));//account.Info.info[ok_future_target].risk_rate;//保证金率  10倍杠杆，当保证金率小于等于10%，才会触发爆仓线；20倍杠杆，当保证金率小于等于20%，才会触发爆仓线。 这意味着如果您开10倍LTC合约，当您的亏损达到开仓保证金的90%时，会触发爆仓线；若开20倍杠杆的合约，当您的亏损达到开仓保证金的80%时，才会触发爆仓线。 

			var tw_atr = TA.ATR(tw_records, N_knumber);
			var nw_atr = TA.ATR(nw_records, N_knumber);
			var qt_atr = TA.ATR(qt_records, N_knumber);
			if (tw_atr.length<=1 || nw_atr.length<=1 || qt_atr.length<=1){
				Log("atr.length无效,跳过此次执行...");
				Sleep(wait_ms);
				continue;
			}
			
			var tw_N=tw_atr[tw_atr.length-1];
			var nw_N=nw_atr[nw_atr.length-1];
			var qt_N=tw_atr[qt_atr.length-1];
			
			var tw_ema7=TA.EMA(tw_records,7);
			var nw_ema7=TA.EMA(nw_records,7);
			var qt_ema7=TA.EMA(qt_records,7);
			
			var tw_ema30=TA.EMA(tw_records,30);
			var nw_ema30=TA.EMA(nw_records,30);
			var qt_ema30=TA.EMA(qt_records,30);
			
			if (tw_ema7.length<=5||tw_ema30.length<=5||nw_ema7.length<=5||nw_ema30.length<=5||qt_ema7.length<=5||qt_ema30.length<=5){
				Log("ema无效,跳过此次执行...");
				Sleep(wait_ms);
				continue;
			}
			
			var tw_ema_buyduo=false;
			var tw_ema_sellduo=false;
			if (tw_ema7[tw_ema7.length-2]>tw_ema30[tw_ema30.length-2] &&
				tw_ema7[tw_ema7.length-3]<=tw_ema30[tw_ema30.length-3]){
					tw_ema_buyduo=true;
			}
			if (tw_ema7[tw_ema7.length-2]<tw_ema30[tw_ema30.length-2] &&
				tw_ema7[tw_ema7.length-3]>=tw_ema30[tw_ema30.length-3]){
				tw_ema_sellduo=true;
			}
			var nw_ema_buyduo=false;
			var nw_ema_sellduo=false;
			if (nw_ema7[nw_ema7.length-2]>nw_ema30[nw_ema30.length-2] &&
				nw_ema7[nw_ema7.length-3]<=nw_ema30[nw_ema30.length-3]){
					nw_ema_buyduo=true;
			}
			if (nw_ema7[nw_ema7.length-2]<nw_ema30[nw_ema30.length-2] &&
				nw_ema7[nw_ema7.length-3]>=nw_ema30[nw_ema30.length-3]){
				nw_ema_sellduo=true;
			}
			var qt_ema_buyduo=false;
			var qt_ema_sellduo=false;
			if (qt_ema7[qt_ema7.length-2]>qt_ema30[qt_ema30.length-2] &&
				qt_ema7[qt_ema7.length-3]<=qt_ema30[qt_ema30.length-3]){
					qt_ema_buyduo=true;
			}
			if (qt_ema7[qt_ema7.length-2]<qt_ema30[qt_ema30.length-2] &&
				qt_ema7[qt_ema7.length-3]>=qt_ema30[qt_ema30.length-3]){
				qt_ema_sellduo=true;
			}
			
			
			var tw_ema_buykong=false;
			var tw_ema_sellkong=false;
			if (tw_ema7[tw_ema7.length-2]<tw_ema30[tw_ema30.length-2] &&
				tw_ema7[tw_ema7.length-3]>=tw_ema30[tw_ema30.length-3]){
					tw_ema_buykong=true;
			}
			if (tw_ema7[tw_ema7.length-2]>tw_ema30[tw_ema30.length-2] &&
				tw_ema7[tw_ema7.length-3]<=tw_ema30[tw_ema30.length-3]){
				tw_ema_sellkong=true;
			}
			var nw_ema_buykong=false;
			var nw_ema_sellkong=false;
			if (nw_ema7[nw_ema7.length-2]<nw_ema30[nw_ema30.length-2] &&
				nw_ema7[nw_ema7.length-3]>=nw_ema30[nw_ema30.length-3]){
					nw_ema_buykong=true;
			}
			if (nw_ema7[nw_ema7.length-2]>nw_ema30[nw_ema30.length-2] &&
				nw_ema7[nw_ema7.length-3]<=nw_ema30[nw_ema30.length-3]){
				nw_ema_sellkong=true;
			}
			var qt_ema_buykong=false;
			var qt_ema_sellkong=false;
			if (qt_ema7[qt_ema7.length-2]<qt_ema30[qt_ema30.length-2] &&
				qt_ema7[qt_ema7.length-3]>=qt_ema30[qt_ema30.length-3]){
					qt_ema_buykong=true;
			}
			if (qt_ema7[qt_ema7.length-2]>qt_ema30[qt_ema30.length-2] &&
				qt_ema7[qt_ema7.length-3]<=qt_ema30[qt_ema30.length-3]){
				qt_ema_sellkong=true;
			}
			
			//update lowest and highest
			if (tw_zuoduo_zhangshu>0 && tw_buy1>tw_buy1_highest){
				tw_buy1_highest=tw_buy1;
			}
			if (tw_zuokong_zhangshu>0 && tw_sell1<tw_sell1_lowest){
				tw_sell1_lowest=tw_sell1;
			}
			if (nw_zuoduo_zhangshu>0 && nw_buy1>nw_buy1_highest){
				nw_buy1_highest=nw_buy1;
			}
			if (nw_zuokong_zhangshu>0 && nw_sell1<nw_sell1_lowest){
				nw_sell1_lowest=nw_sell1;
			}
			if (qt_zuoduo_zhangshu>0 && qt_buy1>qt_buy1_highest){
				qt_buy1_highest=qt_buy1;
			}
			if (qt_zuokong_zhangshu>0 && qt_sell1<qt_sell1_lowest){
				qt_sell1_lowest=qt_sell1;
			}
			if (tw_zuoduo_zhangshu===0){
				tw_buy1_highest=0;
			}
			if (tw_zuokong_zhangshu===0){
				tw_sell1_lowest=100000;
			}
			if (nw_zuoduo_zhangshu===0){
				nw_buy1_highest=0;
			}
			if (nw_zuokong_zhangshu===0){
				nw_sell1_lowest=100000;
			}
			if (qt_zuoduo_zhangshu===0){
				qt_buy1_highest=0;
			}
			if (qt_zuokong_zhangshu===0){
				qt_sell1_lowest=100000;
			}
			
			var trade_unit=(account_rights*(10/keep_risk_rate)/trade_unit_div)*((tw_buy1+tw_sell1+nw_buy1+nw_sell1+qt_buy1+qt_sell1)/6)/contract_min[$.get_exchange_id(exchange)];
			
			//开仓
			if (tw_zuoduo_zhangshu===0 && tw_ema_buyduo && risk_rate>keep_risk_rate && account.Stocks>0){
				exchange.SetContractType("this_week");
				exchange.SetDirection("buy");
				var dealamount=$.perform_limited_order("buy",exchange,tw_sell1,trade_unit,false,"futures","buy");
				tw_buy1_highest=tw_buy1;
				if (push_notification){
					Log("已完成当周做多"+trade_unit+'张'+'@');
				}
			}
			else if (tw_zuokong_zhangshu===0 && tw_ema_buykong && risk_rate>keep_risk_rate && account.Stocks>0){
				exchange.SetContractType("this_week");
				exchange.SetDirection("sell");
				var dealamount=$.perform_limited_order("sell",exchange,tw_buy1,trade_unit,false,"futures","sell");
				tw_sell1_lowest=tw_sell1;
				if (push_notification){
					Log("已完成当周做空"+trade_unit+'张'+'@');
				}
			}
			else if (nw_zuoduo_zhangshu===0 && nw_ema_buyduo && risk_rate>keep_risk_rate && account.Stocks>0){
				exchange.SetContractType("next_week");
				exchange.SetDirection("buy");
				var dealamount=$.perform_limited_order("buy",exchange,nw_sell1,trade_unit,false,"futures","buy");
				nw_buy1_highest=nw_buy1;
				if (push_notification){
					Log("已完成次周做多"+trade_unit+'张'+'@');
				}
			}
			else if (nw_zuokong_zhangshu===0 && nw_ema_buykong && risk_rate>keep_risk_rate && account.Stocks>0){
				exchange.SetContractType("next_week");
				exchange.SetDirection("sell");
				var dealamount=$.perform_limited_order("sell",exchange,nw_buy1,trade_unit,false,"futures","sell");
				nw_sell1_lowest=nw_sell1;
				if (push_notification){
					Log("已完成次周做空"+trade_unit+'张'+'@');
				}
			}
			else if (qt_zuoduo_zhangshu===0 && qt_ema_buyduo && risk_rate>keep_risk_rate && account.Stocks>0){
				exchange.SetContractType("quarter");
				exchange.SetDirection("buy");
				var dealamount=$.perform_limited_order("buy",exchange,qt_sell1,trade_unit,false,"futures","buy");
				qt_buy1_highest=qt_buy1;
				if (push_notification){
					Log("已完成季度做多"+trade_unit+'张'+'@');
				}
			}
			else if (qt_zuokong_zhangshu===0 && qt_ema_buykong && risk_rate>keep_risk_rate && account.Stocks>0){
				exchange.SetContractType("quarter");
				exchange.SetDirection("sell");
				var dealamount=$.perform_limited_order("sell",exchange,qt_buy1,trade_unit,false,"futures","sell");
				qt_sell1_lowest=qt_sell1;
				if (push_notification){
					Log("已完成季度做空"+trade_unit+'张'+'@');
				}
			}
			//平仓
			else if (tw_zuoduo_zhangshu>0 && (tw_buy1_highest-tw_buy1>N_mult*tw_N||tw_ema_sellduo/* ||tw_buy1-tw_zuoduo_avg_price>N_mult*tw_N */)){
				exchange.SetContractType("this_week");
				exchange.SetDirection("closebuy");
				var dealamount=$.perform_limited_order("sell",exchange,tw_buy1,tw_zuoduo_zhangshu,true,"futures","closebuy");
				total_trade_num++;
				if (tw_buy1>tw_zuoduo_avg_price){
					success_trade_num++;
				}else{
					failed_trade_num++;
				}
				if (push_notification){
					Log("已完成当周平多:"+((tw_buy1>tw_zuoduo_avg_price)?'盈利':'亏损')+'@');
				}
			}
			else if (tw_zuokong_zhangshu>0 && (tw_sell1-tw_sell1_lowest>N_mult*tw_N||tw_ema_sellkong/* ||tw_zuokong_avg_price-tw_sell1>N_mult*tw_N */)){
				exchange.SetContractType("this_week");
				exchange.SetDirection("closesell");
				var dealamount=$.perform_limited_order("buy",exchange,tw_sell1,tw_zuokong_zhangshu,true,"futures","closesell");
				total_trade_num++;
				if (tw_sell1<tw_zuokong_avg_price){
					success_trade_num++;
				}else{
					failed_trade_num++;
				}
				if (push_notification){
					Log("已完成当周平空:"+((tw_sell1<tw_zuokong_avg_price)?'盈利':'亏损')+'@');
				}
			}
			else if (nw_zuoduo_zhangshu>0 && (nw_buy1_highest-nw_buy1>N_mult*nw_N||nw_ema_sellduo/* ||nw_buy1-nw_zuoduo_avg_price>N_mult*nw_N */)){
				exchange.SetContractType("next_week");
				exchange.SetDirection("closebuy");
				var dealamount=$.perform_limited_order("sell",exchange,nw_buy1,nw_zuoduo_zhangshu,true,"futures","closebuy");
				total_trade_num++;
				if (nw_buy1>nw_zuoduo_avg_price){
					success_trade_num++;
				}else{
					failed_trade_num++;
				}
				if (push_notification){
					Log("已完成次周平多:"+((nw_buy1>nw_zuoduo_avg_price)?'盈利':'亏损')+'@');
				}
			}
			else if (nw_zuokong_zhangshu>0 && (nw_sell1-nw_sell1_lowest>N_mult*nw_N||nw_ema_sellkong/* ||nw_zuokong_avg_price-nw_sell1>N_mult*nw_N */)){
				exchange.SetContractType("next_week");
				exchange.SetDirection("closesell");
				var dealamount=$.perform_limited_order("buy",exchange,nw_sell1,nw_zuokong_zhangshu,true,"futures","closesell");
				total_trade_num++;
				if (nw_sell1<nw_zuokong_avg_price){
					success_trade_num++;
				}else{
					failed_trade_num++;
				}
				if (push_notification){
					Log("已完成次周平空:"+((nw_sell1<nw_zuokong_avg_price)?'盈利':'亏损')+'@');
				}
			}
			else if (qt_zuoduo_zhangshu>0 && (qt_buy1_highest-qt_buy1>N_mult*qt_N||qt_ema_sellduo/* ||qt_buy1-qt_zuoduo_avg_price>N_mult*qt_N */)){
				exchange.SetContractType("quarter");
				exchange.SetDirection("closebuy");
				var dealamount=$.perform_limited_order("sell",exchange,qt_buy1,qt_zuoduo_zhangshu,true,"futures","closebuy");
				total_trade_num++;
				if (qt_buy1>qt_zuoduo_avg_price){
					success_trade_num++;
				}else{
					failed_trade_num++;
				}
				if (push_notification){
					Log("已完成季度平多:"+((qt_buy1>qt_zuoduo_avg_price)?'盈利':'亏损')+'@');
				}
			}
			else if (qt_zuokong_zhangshu>0 && (qt_sell1-qt_sell1_lowest>N_mult*qt_N||qt_ema_sellkong/* ||qt_zuokong_avg_price-qt_sell1>N_mult*qt_N */)){
				exchange.SetContractType("quarter");
				exchange.SetDirection("closesell");
				var dealamount=$.perform_limited_order("buy",exchange,qt_sell1,qt_zuokong_zhangshu,true,"futures","closesell");
				total_trade_num++;
				if (qt_sell1<qt_zuokong_avg_price){
					success_trade_num++;
				}else{
					failed_trade_num++;
				}
				if (push_notification){
					Log("已完成季度平空:"+((qt_sell1<qt_zuokong_avg_price)?'盈利':'亏损')+'@');
				}
			}
			

			LogStatus(
					'-----------------------------------------------------'+'\n'+
					'当周做多张数/均价/现价/止损价: '+tw_zuoduo_zhangshu+'/'+_N(tw_zuoduo_avg_price,2)+'/'+_N(tw_buy1,2)+'/'+_N(tw_buy1_highest-N_mult*tw_N,2)+'\n'+
					'次周做多张数/均价/现价/止损价: '+nw_zuoduo_zhangshu+'/'+_N(nw_zuoduo_avg_price,2)+'/'+_N(nw_buy1,2)+'/'+_N(nw_buy1_highest-N_mult*nw_N,2)+'\n'+
					'季度做多张数/均价/现价/止损价: '+qt_zuoduo_zhangshu+'/'+_N(qt_zuoduo_avg_price,2)+'/'+_N(qt_buy1,2)+'/'+_N(qt_buy1_highest-N_mult*qt_N,2)+'\n'+
					'-----------------------------------------------------'+'\n'+
					'当周做空张数/均价/现价/止损价: '+tw_zuokong_zhangshu+'/'+_N(tw_zuokong_avg_price,2)+'/'+_N(tw_sell1,2)+'/'+_N(tw_sell1_lowest+N_mult*tw_N,2)+'\n'+					
					'次周做空张数/均价/现价/止损价: '+nw_zuokong_zhangshu+'/'+_N(nw_zuokong_avg_price,2)+'/'+_N(nw_sell1,2)+'/'+_N(nw_sell1_lowest+N_mult*nw_N,2)+'\n'+					
					'季度做空张数/均价/现价/止损价: '+qt_zuokong_zhangshu+'/'+_N(qt_zuokong_avg_price,2)+'/'+_N(qt_sell1,2)+'/'+_N(qt_sell1_lowest+N_mult*qt_N,2)+'\n'+
					'-----------------------------------------------------'+'\n'+
					'当周N: '+tw_N+'\n'+
					'次周N: '+nw_N+'\n'+
					'季度N: '+qt_N+'\n'+
					'-----------------------------------------------------'+'\n'+
					'账户权益: '+account_rights+'\n'+
					'已用保证金: '+keep_deposit+'\n'+
					'可用保证金: '+account.Stocks+'\n'+
					'风险比率: '+risk_rate+'\n'+
					'期货仓位: '+position.length+'\n'+
					'未完成订单: '+f_orders.length+'\n'+
					'总交易次数/盈利次数/亏损次数: '+total_trade_num+'/'+success_trade_num+'/'+failed_trade_num+'\n'+
					'交易成功率: '+success_trade_num/total_trade_num+'\n'+
					'单次交易张数: '+trade_unit+'\n'+
					'-----------------------------------------------------'+'\n'+
					('♜轮询次数: '+total_loop+'\n')+
					('♜更新时间: '+$.get_ChinaTimeString()+'\n')+
					('♜VER:'+strategy_version+'\n')+
					('♜霖霖量化-博客: http://www.pcclean.io/category/量化交易/  #0000ff'+'\n')+
					('♜霖霖量化-实盘策略: http://www.pcclean.io/quant  #ff0000'+'\n')
					);
					
			_G("total_trade_num", total_trade_num);
			_G("success_trade_num", success_trade_num);
			_G("failed_trade_num", failed_trade_num);
			
			if (total_loop%100===0){
				LogProfit(account_rights);
			}		
			total_loop++;
			Sleep(wait_ms);
		
		}catch(err) {
			Log("catch error:"+err.message);
			Sleep(wait_ms);
		}
		
	}//while end
}

```

> 策略出处

https://www.fmz.com/strategy/203272

> 更新时间

2020-04-29 11:58:29
