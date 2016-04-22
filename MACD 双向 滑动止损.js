/*
策略出处: https://www.botvs.com/strategy/12822
策略名称: MACD 双向 滑动止损
策略作者: 小小梦
策略描述:

MACD 双向 滑动止损

*/

//经验1、 对象赋值 当对象 含有 成员函数时  以下赋值会有问题
/*
holdOrder = {
            	orderState: ORDER_VALID,
            	price: buyInfo.price,
            	amount: buyInfo.amount,
            	time: getTimeByNormal((new Date()).getTime()),
            };
//应当这样赋值：
            holdOrder.orderState = ORDER_VALID;
            holdOrder.price = buyInfo.price;
            holdOrder.amount = buyInfo.amount;
            holdOrder.time = getTimeByNormal((new Date()).getTime());

*/

function MACD_Cross(){
    var records = exchange.GetRecords();
    while(!records || records.length < 45){
    	records = exchange.GetRecords();
    	Sleep(Interval);
    }
    var macd = TA.MACD(records,12,26,9);
    var dif = macd[0];
    var dea = macd[1];
    var column = macd[2];
    var len = records.length;    
    if( (dif[len-1] > 0 && dea[len-1] > 0) && dif[len-1] > dea[len-1] && dif[len-2] < dea[len-2] && column[len-1] > 0.2 ){
    	return 1;
    }
    if( (dif[len-1] < 0 && dea[len-1] < 0) && dif[len-1] < dea[len-1] && dif[len-2] > dea[len-2] && column[len-1] < -0.2 ){
        return 2;
    }   
    return 0;  
}
var Interval = 500;
var STATE_FREE = 0;
var STATE_BUY = 1;
var STATE_SELL = 2;
var ORDER_INVALID = 3;
var ORDER_VALID = 4;
var state = STATE_FREE;
var SignalDelay = 0;
var stopProfit = 0.002;
var step = 0.5;
var opAmount = 1;
var profit = 0;
var holdOrder = {
    orderState: ORDER_INVALID,
    price: 0,
    amount: 0,
    time: null,
    stopPrice: 0,
    level: 1,
    updateCurrentProfit: function(lastPrice,amount){
        if(state === STATE_SELL){
        	return (lastPrice - this.price) * amount;
        }
        if(state === STATE_BUY){
        	return - (lastPrice - this.price) * amount;
        }
    },
    SetStopPrice: function(ticker,stopState){
    	if(stopState === STATE_FREE){
    		return this.stopPrice;
    	}
    	if(stopState === STATE_BUY){
            if(this.orderState === ORDER_INVALID){
        	    return this.stopPrice;
            }

            if(this.stopPrice === 0){
            	this.stopPrice = this.price * ( 1 - stopProfit );
            }
            if( ticker.Last <= this.price ){
                this.stopPrice = this.price * ( 1 - stopProfit );
                this.level = 1;
            }else{
        	    if( ticker.Last - this.price > this.level * step ){
                    this.stopPrice = this.price * (1 - stopProfit) + (ticker.Last - this.price );
                    this.level++;
        	    }else{
        	    	this.stopPrice = this.stopPrice;
        	    }
            }
    	}else if( stopState === STATE_SELL){
    		if(this.orderState === ORDER_INVALID){
        	    return this.stopPrice;
            }

            if(this.stopPrice === 0){
            	this.stopPrice = this.price * ( 1 + stopProfit );
            }
            if( ticker.Last >= this.price ){
                this.stopPrice = this.price * ( 1 + stopProfit );
                this.level = 1; 
            }else{
        	    if( this.price - ticker.Last > this.level * step ){
                    this.stopPrice = this.price * (1 + stopProfit) - ( this.price - ticker.Last );
                    this.level++;
        	    }else{
        	    	this.stopPrice = this.stopPrice;
        	    }
            }
    	}
       
        return this.stopPrice;
    },
    initHoldOrder: function(){
        this.orderState = ORDER_INVALID;
        this.price = 0;
        this.amount = 0;
        this.time = null;
        this.stopPrice = 0;
        this.level = 1;
    }
};
function getTimeByNormal(time){
    var timeByNormal = new Date();
    timeByNormal.setTime(time);
    var strTime = timeByNormal.toString();
    var showTimeArr = strTime.split(" ");
    var showTime = showTimeArr[3]+"-"+showTimeArr[1]+"-"+showTimeArr[2]+"-"+showTimeArr[4];
    return showTime;
}
function scan(){
	var sellInfo = null;
	var buyInfo = null;
	var opFun = null;
	var singal = 0;
    while(true){
        var ticker = exchange.GetTicker();
        if(!ticker){
        	continue;
        }
        holdOrder.SetStopPrice(ticker,state);
        if(state === STATE_FREE &&  (singal = MACD_Cross()) !== 0  ){
        	holdOrder.initHoldOrder();
            opFun = singal === 1 ?  $.Buy : $.Sell ;
            buyInfo = opFun(opAmount);
     
            holdOrder.orderState = ORDER_VALID;
            holdOrder.price = buyInfo.price;
            holdOrder.amount = buyInfo.amount;
            holdOrder.time = getTimeByNormal((new Date()).getTime());

            state = singal === 1 ? STATE_BUY : STATE_SELL;
            var account = $.GetAccount(exchange);
            if(singal === 1){
            	Log("开多仓。","账户：",account);
            }else{
                Log("开空仓。","账户：",account);
            }
            break;
        }else{
        	var lastPrice = holdOrder.price;
        	if( state === STATE_BUY && holdOrder.orderState === ORDER_VALID && ticker.Last < holdOrder.stopPrice ){
        	    Log("多头止损平仓","初始止损价：",holdOrder.price * (1 - stopProfit),"--滑动止损价：",holdOrder.stopPrice,"最后成交价：",ticker.Last,"止损等级：",holdOrder.level);//测试
        	    sellInfo = $.Sell(holdOrder.amount);
        	   
                holdOrder.orderState = ORDER_INVALID;
                holdOrder.price = sellInfo.price;
                holdOrder.amount = sellInfo.amount;
                holdOrder.time = getTimeByNormal((new Date()).getTime());
                
                profit = holdOrder.updateCurrentProfit(lastPrice,sellInfo.amount);
        	    state = STATE_FREE;
        	    break;
        	}
        	if( state === STATE_SELL && holdOrder.orderState === ORDER_VALID && ticker.Last > holdOrder.stopPrice ){
        	    Log("空头止损平仓","初始止损价：",holdOrder.price * (1 + stopProfit),"--滑动止损价：",holdOrder.stopPrice,"最后成交价：",ticker.Last,"止损等级：",holdOrder.level);//测试
        	    sellInfo = $.Buy(holdOrder.amount);
        	   
                holdOrder.orderState = ORDER_INVALID;
                holdOrder.price = sellInfo.price;
                holdOrder.amount = sellInfo.amount;
                holdOrder.time = getTimeByNormal((new Date()).getTime());
                
                profit = holdOrder.updateCurrentProfit(lastPrice,sellInfo.amount);
        	    state = STATE_FREE;
        	    break;
        	}
            if(state === STATE_BUY && MACD_Cross() === 2 ){
        	    sellInfo = $.Sell(holdOrder.amount);
        	    Log("死叉平仓","初始止损价：",holdOrder.price * (1 - stopProfit),"--滑动止损价：",holdOrder.stopPrice,"最后成交价：",ticker.Last,"止损等级：",holdOrder.level);//测试
        	    
                holdOrder.orderState = ORDER_INVALID;
                holdOrder.price = sellInfo.price;
                holdOrder.amount = sellInfo.amount;
                holdOrder.time = getTimeByNormal((new Date()).getTime());
                
                profit = holdOrder.updateCurrentProfit(lastPrice,sellInfo.amount);
        	    state = STATE_FREE;
        	    break;
            }
             if(state === STATE_SELL && MACD_Cross() === 1 ){
        	    sellInfo = $.Buy(holdOrder.amount);
        	    Log("金叉平仓","初始止损价：",holdOrder.price * (1 + stopProfit),"--滑动止损价：",holdOrder.stopPrice,"最后成交价：",ticker.Last,"止损等级：",holdOrder.level);//测试
        	    
                holdOrder.orderState = ORDER_INVALID;
                holdOrder.price = sellInfo.price;
                holdOrder.amount = sellInfo.amount;
                holdOrder.time = getTimeByNormal((new Date()).getTime());
                
                profit = holdOrder.updateCurrentProfit(lastPrice,sellInfo.amount);
        	    state = STATE_FREE;
        	    break;
            }
        }
        Sleep(Interval);
    }
}

function main(){
    var initAccount = $.GetAccount(exchange);
    var nowAccount = initAccount;
    var diffMoney = 0;
    var diffStocks = 0;
    var repair = 0;
    var ticker = exchange.GetTicker();
    Log("初始账户：",initAccount);
    while(true){
        scan();
        ticker = exchange.GetTicker();
        if(!ticker){
        	continue;
        }
        if(holdOrder.orderState == ORDER_VALID){
        	Log("当前持仓：",holdOrder);
        }
        if(holdOrder.orderState == ORDER_INVALID){
        	nowAccount = $.GetAccount(exchange);
            diffMoney = nowAccount.Balance - initAccount.Balance;
            diffStocks = nowAccount.Stocks - initAccount.Stocks;
            repair = diffStocks * ticker.Last;
            LogProfit(diffMoney + repair ,"RMB","现在账户：",nowAccount,"本次盈亏：",profit);
        }
    	Sleep(Interval);
    }
}
