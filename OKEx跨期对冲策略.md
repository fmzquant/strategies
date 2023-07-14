
> Name

OKEx跨期对冲策略

> Author

reboting

> Strategy Description

什么是跨期对冲？
所谓跨期套利就是在同一期货品种的不同月份合约上建立数量相等、方向相反的交易头寸，最后以对冲或交割方式结束交易、获得收益的方式。最简单的跨期套利就是买入近期的期货品种，卖出远期的期货品种。比如Okex的BTC次周和当周合约。交割期不同，最多相差3个月。当合约价差出现时，投资者可进行买入一个合约同时卖出另外一个合约，待到价差回归后再进行相应的反向平仓，进而利用价差的合理回归获得利润。

如何在Okex上进行跨期对冲？
okex上当周、次周和季度合约的价格经常会存在价差，如果价差达到或超过一定的阈值，则可以进行跨期对冲，然后在价差消失时进行反向平仓，进而利用价差的合理回归获得利润。比如，BTC当周和次周合约存在价差且当周合约低于次周合约价格，当价差达到设定阈值，投资者可以做多当周合约和做空次周合约（数量一致）进行对冲，等到当周合约和次周合约价差回归正常值时进行相应的反向平仓，获取利润。

跨期对冲的风险:
因为两种合约的交割时间不同，当近期合约强制交割时，价差未能回归则可能出现亏损。

策略实现的功能和特点:
支持Okex跨期对冲
支持Okex的当周、次周和季度合约
支持Okex的所有合约交易品种（BTC、BCH、EOS、BSV、ETH等等）

特别注意：此策略需要依赖Botvstools模板库才能运行！
请到此处下载模板库：
https://www.pcclean.io/45gd 
（下载zip文件后解压缩会有两个js文件，一个是策略，一个是模板库，请注意区分）

策略参数说明:
https://www.pcclean.io/45gd



> Source (javascript)

``` javascript
var strategy_version="1.2.0.7(adjust parameters)";

/*
使用说明：
1. 请先针对交易所和交易对设置策略参数后再运行此策略。
2. fmz中添加交易所： okex期货交易所
3. 参数里面contract_min表示单个合约价值，不要随意更改
4. 建议okex里面设置为全仓模式，以免出现保证金不足的情况
5. 尽量使用okex api v1
6. 此策略仅用于学习分享，实盘风险自担。
*/

/********************************************策略参数**********************************/
var price_n={Futures_OKCoin_BSV_USD:2};//价格精度设置
var num_n={Futures_OKCoin_BSV_USD:0};//数量精度设置
var minestbuy={Futures_OKCoin_BSV_USD:1};//最小买入量
var price_step={Futures_OKCoin_BSV_USD:0.05};//定价单调整量
var contract_min={Futures_OKCoin_BSV_USD:10};//最小合约金额
var wait_ms=3000;//重试等待时间(ms)
var max_wait_order=10000;//订单等待时间(ms)
var margin_lv=10;//杠杆倍数
var jiacha_monitor={tw_nw:0.02,tw_qt:0.02,nw_qt:0.02};//开仓差价
var hulie_monitor={tw_nw:0.003,tw_qt:0.003,nw_qt:0.003};//忽略的差价
var ok_future_target='bsv';//目标合约
var keep_risk_rate=10;//保证金率
var trade_unit=100;//每次交易多少张
var push_notification=true;//微信通知交易机会
/********************************************策略参数**********************************/


//全局变量
var total_loop=0;

//主函数
function main(){
	Log("strategy_version="+strategy_version);
	$.set_params(price_n,num_n,minestbuy,price_step,wait_ms,max_wait_order);
	
	if (push_notification){
		Log("策略开始运行！已开启推送。@");
	}
	
	while(true){
		exchange.SetMarginLevel(margin_lv);
		var exname=exchange.GetName();
		var currency=exchange.GetCurrency();
		var account=$.retry_get_account(exchange);
		var f_orders=_C(exchange.GetOrders);
		
		exchange.SetContractType("this_week");
		var tw_depth=_C(exchange.GetDepth);
		var tw_sell1=tw_depth.Asks[0].Price;
		var tw_buy1=tw_depth.Bids[0].Price;
		var tw_records=_C(exchange.GetRecords,PERIOD_H1);
		if (tw_records.length<=50){
			Log("tw_records.length无效,跳过此次执行...");
			Sleep(wait_ms);
			continue;
		}
		
		exchange.SetContractType("next_week");
		var nw_depth=_C(exchange.GetDepth);
		var nw_sell1=nw_depth.Asks[0].Price;
		var nw_buy1=nw_depth.Bids[0].Price;
		var nw_records=_C(exchange.GetRecords,PERIOD_H1);
		if (nw_records.length<=50){
			Log("nw_records.length无效,跳过此次执行...");
			Sleep(wait_ms);
			continue;
		}
		
		exchange.SetContractType("quarter");
		var qt_depth=_C(exchange.GetDepth);
		var qt_sell1=qt_depth.Asks[0].Price;
		var qt_buy1=qt_depth.Bids[0].Price;
		var qt_records=_C(exchange.GetRecords,PERIOD_H1);
		if (qt_records.length<=50){
			Log("qt_records.length无效,跳过此次执行...");
			Sleep(wait_ms);
			continue;
		}
		
		var tw_price_ma = TA.MA(tw_records, 30).slice(-1)[0];
		var nw_price_ma = TA.MA(nw_records, 30).slice(-1)[0];
		var qt_price_ma = TA.MA(qt_records, 30).slice(-1)[0];
		
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
		var risk_rate=account.Info.info[ok_future_target].risk_rate;//保证金率  10倍杠杆，当保证金率小于等于10%，才会触发爆仓线；20倍杠杆，当保证金率小于等于20%，才会触发爆仓线。 这意味着如果您开10倍LTC合约，当您的亏损达到开仓保证金的90%时，会触发爆仓线；若开20倍杠杆的合约，当您的亏损达到开仓保证金的80%时，才会触发爆仓线。 

		
		var tw_buy1_fixed=tw_buy1;
		var tw_sell1_fixed=tw_sell1;
		var nw_buy1_fixed=nw_buy1-(nw_price_ma-tw_price_ma);
		var nw_sell1_fixed=nw_sell1-(nw_price_ma-tw_price_ma);
		var qt_buy1_fixed=qt_buy1-(qt_price_ma-tw_price_ma);
		var qt_sell1_fixed=qt_sell1-(qt_price_ma-tw_price_ma);

		//this week - next week - kaichang
		if (tw_sell1_fixed<nw_buy1_fixed && (nw_buy1_fixed-tw_sell1_fixed)/tw_sell1_fixed>jiacha_monitor['tw_nw']){
			if (push_notification){
				Log("次周_当周_套利机会:"+exname+" "+((nw_buy1_fixed-tw_sell1_fixed)/tw_sell1_fixed)+"@");
			}
			if (risk_rate>keep_risk_rate && account.Stocks>0){
				exchange.SetContractType("this_week");
				exchange.SetDirection("buy");
				var dealamount=$.perform_limited_order("buy",exchange,tw_sell1,trade_unit,false,"futures","buy");
				if (dealamount>0){
					exchange.SetContractType("next_week");
					exchange.SetDirection("sell");
					$.perform_limited_order("buy",exchange,nw_buy1,dealamount,true,"futures","sell");
				}
			}
		}
		else if (nw_sell1_fixed<tw_buy1_fixed && (tw_buy1_fixed-nw_sell1_fixed)/nw_sell1_fixed>jiacha_monitor['tw_nw']){
			if (push_notification){
				Log("当周_次周_套利机会:"+exname+" "+((tw_buy1_fixed-nw_sell1_fixed)/nw_sell1_fixed)+"@");
			}
			if (risk_rate>keep_risk_rate && account.Stocks>0){
				exchange.SetContractType("next_week");
				exchange.SetDirection("buy");
				var dealamount=$.perform_limited_order("buy",exchange,nw_sell1,trade_unit,false,"futures","buy");
				if (dealamount>0){
					exchange.SetContractType("this_week");
					exchange.SetDirection("sell");
					$.perform_limited_order("buy",exchange,tw_buy1,dealamount,true,"futures","sell");
				}
			}
		}
		//this week - quarter - kaichang
		else if (tw_sell1_fixed<qt_buy1_fixed && (qt_buy1_fixed-tw_sell1_fixed)/tw_sell1_fixed>jiacha_monitor['tw_qt']){
			if (push_notification){
				Log("季度_当周_套利机会:"+exname+" "+((qt_buy1_fixed-tw_sell1_fixed)/tw_sell1_fixed)+"@");
			}
			if (risk_rate>keep_risk_rate && account.Stocks>0){
				exchange.SetContractType("this_week");
				exchange.SetDirection("buy");
				var dealamount=$.perform_limited_order("buy",exchange,tw_sell1,trade_unit,false,"futures","buy");
				if (dealamount>0){
					exchange.SetContractType("quarter");
					exchange.SetDirection("sell");
					$.perform_limited_order("buy",exchange,qt_buy1,dealamount,true,"futures","sell");
				}
			}
		}
		else if (qt_sell1_fixed<tw_buy1_fixed && (tw_buy1_fixed-qt_sell1_fixed)/qt_sell1_fixed>jiacha_monitor['tw_qt']){
			if (push_notification){
				Log("当周_季度_套利机会:"+exname+" "+((tw_buy1_fixed-qt_sell1_fixed)/qt_sell1_fixed)+"@");
			}
			if (risk_rate>keep_risk_rate && account.Stocks>0){
				exchange.SetContractType("quarter");
				exchange.SetDirection("buy");
				var dealamount=$.perform_limited_order("buy",exchange,qt_sell1,trade_unit,false,"futures","buy");
				if (dealamount>0){
					exchange.SetContractType("this_week");
					exchange.SetDirection("sell");
					$.perform_limited_order("buy",exchange,tw_buy1,dealamount,true,"futures","sell");
				}
			}
		}
		//next week - quarter - kaichang
		else if (nw_sell1_fixed<qt_buy1_fixed && (qt_buy1_fixed-nw_sell1_fixed)/nw_sell1_fixed>jiacha_monitor['nw_qt']){
			if (push_notification){
				Log("季度_次周_套利机会:"+exname+" "+((qt_buy1_fixed-nw_sell1_fixed)/nw_sell1_fixed)+"@");
			}
			if (risk_rate>keep_risk_rate && account.Stocks>0){
				exchange.SetContractType("next_week");
				exchange.SetDirection("buy");
				var dealamount=$.perform_limited_order("buy",exchange,nw_sell1,trade_unit,false,"futures","buy");
				if (dealamount>0){
					exchange.SetContractType("quarter");
					exchange.SetDirection("sell");
					$.perform_limited_order("buy",exchange,qt_buy1,dealamount,true,"futures","sell");
				}
			}
		}
		else if (qt_sell1_fixed<nw_buy1_fixed && (nw_buy1_fixed-qt_sell1_fixed)/qt_sell1_fixed>jiacha_monitor['nw_qt']){
			if (push_notification){
				Log("次周_季度_套利机会:"+exname+" "+((nw_buy1_fixed-qt_sell1_fixed)/qt_sell1_fixed)+"@");
			}
			if (risk_rate>keep_risk_rate && account.Stocks>0){
				exchange.SetContractType("quarter");
				exchange.SetDirection("buy");
				var dealamount=$.perform_limited_order("buy",exchange,qt_sell1,trade_unit,false,"futures","buy");
				if (dealamount>0){
					exchange.SetContractType("next_week");
					exchange.SetDirection("sell");
					$.perform_limited_order("buy",exchange,nw_buy1,dealamount,true,"futures","sell");
				}
			}
		}
		//this week - next week - pingchang
		else if (Math.abs((nw_sell1_fixed-tw_buy1_fixed)/tw_buy1_fixed)<hulie_monitor['tw_nw'] && tw_zuoduo_zhangshu>0 && nw_zuokong_zhangshu>0){
			var pingchang_zhangshu=Math.min(tw_zuoduo_zhangshu,nw_zuokong_zhangshu);
			exchange.SetContractType("this_week");
			exchange.SetDirection("closebuy");
			var dealamount=$.perform_limited_order("sell",exchange,tw_buy1,pingchang_zhangshu,false,"futures","closebuy");
			if (dealamount>0){
				exchange.SetContractType("next_week");
				exchange.SetDirection("closesell");
				$.perform_limited_order("sell",exchange,nw_sell1,dealamount,true,"futures","closesell");
			}
		}
		else if (Math.abs((tw_sell1_fixed-nw_buy1_fixed)/nw_buy1_fixed)<hulie_monitor['tw_nw'] && tw_zuokong_zhangshu>0 && nw_zuoduo_zhangshu>0){
			var pingchang_zhangshu=Math.min(tw_zuokong_zhangshu,nw_zuoduo_zhangshu);
			exchange.SetContractType("next_week");
			exchange.SetDirection("closebuy");
			var dealamount=$.perform_limited_order("sell",exchange,nw_buy1,pingchang_zhangshu,false,"futures","closebuy");
			if (dealamount>0){
				exchange.SetContractType("this_week");
				exchange.SetDirection("closesell");
				$.perform_limited_order("sell",exchange,tw_sell1,dealamount,true,"futures","closesell");
			}
		}
		//this week - quarter - pingchang
		else if (Math.abs((qt_sell1_fixed-tw_buy1_fixed)/tw_buy1_fixed)<hulie_monitor['tw_qt'] && tw_zuoduo_zhangshu>0 && qt_zuokong_zhangshu>0){
			var pingchang_zhangshu=Math.min(tw_zuoduo_zhangshu,qt_zuokong_zhangshu);
			exchange.SetContractType("this_week");
			exchange.SetDirection("closebuy");
			var dealamount=$.perform_limited_order("sell",exchange,tw_buy1,pingchang_zhangshu,false,"futures","closebuy");
			if (dealamount>0){
				exchange.SetContractType("quarter");
				exchange.SetDirection("closesell");
				$.perform_limited_order("sell",exchange,qt_sell1,dealamount,true,"futures","closesell");
			}
		}
		else if (Math.abs((tw_sell1_fixed-qt_buy1_fixed)/qt_buy1_fixed)<hulie_monitor['tw_qt'] && tw_zuokong_zhangshu>0 && qt_zuoduo_zhangshu>0){
			var pingchang_zhangshu=Math.min(tw_zuokong_zhangshu,qt_zuoduo_zhangshu);
			exchange.SetContractType("quarter");
			exchange.SetDirection("closebuy");
			var dealamount=$.perform_limited_order("sell",exchange,qt_buy1,pingchang_zhangshu,false,"futures","closebuy");
			if (dealamount>0){
				exchange.SetContractType("this_week");
				exchange.SetDirection("closesell");
				$.perform_limited_order("sell",exchange,tw_sell1,dealamount,true,"futures","closesell");
			}
		}
		//next week - quarter - pingchang
		else if (Math.abs((qt_sell1_fixed-nw_buy1_fixed)/nw_buy1_fixed)<hulie_monitor['nw_qt'] && nw_zuoduo_zhangshu>0 && qt_zuokong_zhangshu>0){
			var pingchang_zhangshu=Math.min(nw_zuoduo_zhangshu,qt_zuokong_zhangshu);
			exchange.SetContractType("next_week");
			exchange.SetDirection("closebuy");
			var dealamount=$.perform_limited_order("sell",exchange,nw_buy1,pingchang_zhangshu,false,"futures","closebuy");
			if (dealamount>0){
				exchange.SetContractType("quarter");
				exchange.SetDirection("closesell");
				$.perform_limited_order("sell",exchange,qt_sell1,dealamount,true,"futures","closesell");
			}
		}
		else if (Math.abs((nw_sell1_fixed-qt_buy1_fixed)/qt_buy1_fixed)<hulie_monitor['nw_qt'] && nw_zuokong_zhangshu>0 && qt_zuoduo_zhangshu>0){
			var pingchang_zhangshu=Math.min(nw_zuokong_zhangshu,qt_zuoduo_zhangshu);
			exchange.SetContractType("quarter");
			exchange.SetDirection("closebuy");
			var dealamount=$.perform_limited_order("sell",exchange,qt_buy1,pingchang_zhangshu,false,"futures","closebuy");
			if (dealamount>0){
				exchange.SetContractType("next_week");
				exchange.SetDirection("closesell");
				$.perform_limited_order("sell",exchange,nw_sell1,dealamount,true,"futures","closesell");
			}
		}
		else{
			//处理交割
			var total_zuoduo=tw_zuoduo_zhangshu+nw_zuoduo_zhangshu+qt_zuoduo_zhangshu;
			var total_zuokong=tw_zuokong_zhangshu+nw_zuokong_zhangshu+qt_zuokong_zhangshu;
			if (total_zuoduo!==total_zuokong){
				if (total_zuoduo>total_zuokong){
					var diff_num=total_zuoduo-total_zuokong;
					
					//强制平多
					Log("开始强制平多:"+diff_num+'@');
					if (qt_zuoduo_zhangshu>=diff_num){
						exchange.SetContractType("quarter");
						exchange.SetDirection("closebuy");
						$.perform_limited_order("sell",exchange,qt_buy1,diff_num,true,"futures","closebuy");
					}else{
						exchange.SetContractType("quarter");
						exchange.SetDirection("closebuy");
						$.perform_limited_order("sell",exchange,qt_buy1,qt_zuoduo_zhangshu,true,"futures","closebuy");
						var diff2=diff_num-qt_zuoduo_zhangshu;
						if (nw_zuoduo_zhangshu>=diff2){
							exchange.SetContractType("next_week");
							exchange.SetDirection("closebuy");
							$.perform_limited_order("sell",exchange,nw_buy1,diff2,true,"futures","closebuy");
						}else{
							exchange.SetContractType("next_week");
							exchange.SetDirection("closebuy");
							$.perform_limited_order("sell",exchange,nw_buy1,nw_zuoduo_zhangshu,true,"futures","closebuy");
							var diff3=diff2-nw_zuoduo_zhangshu;
							if (tw_zuoduo_zhangshu>=diff3){
								exchange.SetContractType("this_week");
								exchange.SetDirection("closebuy");
								$.perform_limited_order("sell",exchange,tw_buy1,diff3,true,"futures","closebuy");
							}else{
								exchange.SetContractType("this_week");
								exchange.SetDirection("closebuy");
								$.perform_limited_order("sell",exchange,tw_buy1,tw_zuoduo_zhangshu,true,"futures","closebuy");
							}
						}
					}
				}
				else if (total_zuokong>total_zuoduo){
					var diff_num=total_zuokong-total_zuoduo;
					
					//强制平空
					Log("开始强制平空:"+diff_num+'@');
					if (qt_zuokong_zhangshu>=diff_num){
						exchange.SetContractType("quarter");
						exchange.SetDirection("closesell");
						$.perform_limited_order("sell",exchange,qt_sell1,diff_num,true,"futures","closesell");
					}else{
						exchange.SetContractType("quarter");
						exchange.SetDirection("closesell");
						$.perform_limited_order("sell",exchange,qt_sell1,qt_zuokong_zhangshu,true,"futures","closesell");
						var diff2=diff_num-qt_zuokong_zhangshu;
						if (nw_zuokong_zhangshu>=diff2){
							exchange.SetContractType("next_week");
							exchange.SetDirection("closesell");
							$.perform_limited_order("sell",exchange,nw_sell1,diff2,true,"futures","closesell");
						}else{
							exchange.SetContractType("next_week");
							exchange.SetDirection("closesell");
							$.perform_limited_order("sell",exchange,nw_sell1,nw_zuokong_zhangshu,true,"futures","closesell");
							var diff3=diff2-nw_zuokong_zhangshu;
							if (tw_zuokong_zhangshu>=diff3){
								exchange.SetContractType("this_week");
								exchange.SetDirection("closesell");
								$.perform_limited_order("sell",exchange,tw_sell1,diff3,true,"futures","closesell");
							}else{
								exchange.SetContractType("this_week");
								exchange.SetDirection("closesell");
								$.perform_limited_order("sell",exchange,tw_sell1,tw_zuokong_zhangshu,true,"futures","closesell");
							}
						}
					}
				}
			}
		}

		

		LogStatus(
		"合约近期均价="+tw_price_ma+'/'+nw_price_ma+'/'+qt_price_ma+"\n"+
		'-----------------------------------------------------------\n'+
		'次周_当周_开仓差价='+(nw_buy1_fixed-tw_sell1_fixed)/tw_sell1_fixed+'/'+jiacha_monitor['tw_nw']+"\n"+
		'当周_次周_开仓差价='+(tw_buy1_fixed-nw_sell1_fixed)/nw_sell1_fixed+'/'+jiacha_monitor['tw_nw']+"\n"+
		'季度_当周_开仓差价='+(qt_buy1_fixed-tw_sell1_fixed)/tw_sell1_fixed+'/'+jiacha_monitor['tw_qt']+"\n"+
		'当周_季度_开仓差价='+(tw_buy1_fixed-qt_sell1_fixed)/qt_sell1_fixed+'/'+jiacha_monitor['tw_qt']+"\n"+
		'季度_次周_开仓差价='+(qt_buy1_fixed-nw_sell1_fixed)/nw_sell1_fixed+'/'+jiacha_monitor['nw_qt']+"\n"+
		'次周_季度_开仓差价='+(nw_buy1_fixed-qt_sell1_fixed)/qt_sell1_fixed+'/'+jiacha_monitor['nw_qt']+"\n"+
		'-----------------------------------------------------------\n'+
		'次周_当周_平仓差价='+Math.abs((nw_sell1_fixed-tw_buy1_fixed)/tw_buy1_fixed)+'/'+hulie_monitor['tw_nw']+"\n"+
		'当周_次周_平仓差价='+Math.abs((tw_sell1_fixed-nw_buy1_fixed)/nw_buy1_fixed)+'/'+hulie_monitor['tw_nw']+"\n"+
		'季度_当周_平仓差价='+Math.abs((qt_sell1_fixed-tw_buy1_fixed)/tw_buy1_fixed)+'/'+hulie_monitor['tw_qt']+"\n"+
		'当周_季度_平仓差价='+Math.abs((tw_sell1_fixed-qt_buy1_fixed)/qt_buy1_fixed)+'/'+hulie_monitor['tw_qt']+"\n"+
		'季度_次周_平仓差价='+Math.abs((qt_sell1_fixed-nw_buy1_fixed)/nw_buy1_fixed)+'/'+hulie_monitor['nw_qt']+"\n"+
		'次周_季度_平仓差价='+Math.abs((nw_sell1_fixed-qt_buy1_fixed)/qt_buy1_fixed)+'/'+hulie_monitor['nw_qt']+"\n"+
		'-----------------------------------------------------------\n'+
		'账户权益='+account_rights+'\n'+
		'已用保证金='+keep_deposit+'\n'+
		'可用保证金='+account.Stocks+'\n'+
		'保证金率='+risk_rate+'\n'+
		'当周做多/做空张数='+tw_zuoduo_zhangshu+'/'+tw_zuokong_zhangshu+'\n'+
		'次周做多/做空张数='+nw_zuoduo_zhangshu+'/'+nw_zuokong_zhangshu+'\n'+
		'季度做多/做空张数='+qt_zuoduo_zhangshu+'/'+qt_zuokong_zhangshu+'\n'+
		'期货仓位='+position.length+'\n'+
		'未完成订单='+f_orders.length+'\n'+
		'当周做多/做空均价='+tw_zuoduo_avg_price+'/'+tw_zuokong_avg_price+'\n'+
		'次周做多/做空均价='+nw_zuoduo_avg_price+'/'+nw_zuokong_avg_price+'\n'+
		'季度做多/做空均价='+qt_zuoduo_avg_price+'/'+qt_zuokong_avg_price+'\n'+
		'♜轮询次数: '+total_loop+'\n'+
		'♜更新时间: '+$.get_ChinaTimeString()+'\n'+
		'♜微信: alinwo(验证消息:botvs) #0000ff'+'\n'+
		'♜霖霖量化-实盘策略: http://www.pcclean.io/quant  #ff0000'+'\n'
		);
		
		if (total_loop%200===0){
			LogProfit(account_rights);
		}
		
		total_loop++;
		Sleep(wait_ms);
		
	}//while end
}

```

> Detail

https://www.fmz.com/strategy/157635

> Last Modified

2019-07-17 22:39:05
