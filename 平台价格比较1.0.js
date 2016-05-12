/*
策略出处: https://www.botvs.com/strategy/8266
策略名称: 平台价格比较1.0
策略作者: tfboys
策略描述:

1.4---增加告警周期设置
1.3---增加微信通知
1.2---支持期货平台
1.1---稳定版本


参数               默认值  描述
-------------  -----  ----------------------------
CType0             0  所0货币类型: 人民币|美元
ContractType0      0  所0合约类型: 当周|下周|当月|季度
MLevel0            0  所0杠杆大小: 10倍|20倍
ContractType1      0  所1合约类型: 当周|下周|当月|季度
MLevel1            0  所1杠杠大小: 10倍|20倍
LoopInterval    5000  轮询间隔(毫秒)
MaxVal           105  值上限
MinVal           102  值下限
AlarmPeriod       20  告警周期(单位:轮询时长)
CType1             0  所1货币类型: 人民币|美元
Interval        1000  函数重试间隔
Price0             0  所0价格类型: Asks[0]|Last|Bids[0]
Price1             0  所1价格类型: Asks[0]|Last|Bids[0]
Option             0  比较类型: Sub|Dev

按钮    默认值         描述
----  ----------  ----
推送切换  __button__  微信推送
*/

var _ContractType0 = ["this_week", "next_week", "month", "quarter"][ContractType0];
var _MarginLeve0 = [10, 20][MLevel0];
var _ContractType1 = ["this_week", "next_week", "month", "quarter"][ContractType1];
var _MarginLeve1 = [10, 20][MLevel1];
var usdrate0 = 6.35;
var usdrate1 = 6.35;
var rate0 = 1;
var rate1 = 1;
var TS = 0;		//是否告警
var _CType0 = [0, 1][CType0];
var _CType1 = [0, 1][CType1];
var _Price0 = [0, 1, 2][Price0];//Asks[0], Last, Bids[0]
var _Price1 = [0, 1, 2][Price1];//Asks[0], Last, Bids[0]
var _Option = [0, 1][Option];	//Sub, Dev

var CanAlarm = true;

//外部值
//var MaxRate = 104.2	//最大值
//var MinVal = 103.2	//最小值
//var AlarmPeriod = 120;	//单位:一个ticker的时间，约0.5秒
//var Interval = 500;			//重试间隔

function _N(v, precision) {
    if (typeof(precision) != 'number') {
        precision = 4;
    }
	if(!v)
		return 0;
	
    var d = parseFloat(v.toFixed(Math.max(10, precision+5)));
    s = d.toString().split(".");
    if (s.length < 2 || s[1].length <= precision) {
        return d;
    }

    var b = Math.pow(10, precision);
    return Math.floor(d*b)/b;
}

function GetTicker(e) {
    while (true) {
        var ticker = EnsureCall(e, 'GetTicker');
        if (ticker && ticker.Buy > 0 && ticker.Sell > 0 && ticker.Sell > ticker.Buy) {
            return ticker;
        }
        Sleep(Interval);
    }
}

function EnsureCall(e, method) {
    var r;
    while (!(r = e[method].apply(this, Array.prototype.slice.call(arguments).slice(2)))) {
        Sleep(Interval);
    }
    return r;
}

function sdGetDepth(e) {
	var dpth = null;
	while ( !(dpth = e.GetDepth()) || dpth.Asks.length <= 0 || dpth.Bids.length <= 0) {
		Sleep(Interval);
	}
	return dpth;
}

function getCmd() {
	var cmd = GetCommand();
	if(cmd) {
		//Log(" ------ : ", cmd);
		var strNum = cmd.replace(/[^0-9]/ig,"");
		if(cmd.indexOf("推送切换") >= 0)
		{
			var ms = "现在推送状态为: ";
			if(TS == 1) {
				TS = 0;
				ms = ms + "无";
			}
			else {
				TS = 1;
				ms = ms + "有";
			}

			Log(ms, "#000000ff0000");
		}
	}
}
	
function main()  {
	//局部变量申请
	var ticker0 = null;
	var ticker1 = null;
	var depths0 = null;
	var depths1 = null;
	var price0 = 1;
	var price1 = 1;
	var priceDev = 0.0;
	var tickerCnt = 0;
	var name0 = exchanges[0].GetName();
	var name1 = exchanges[1].GetName();
	var coin0 = exchanges[0].GetCurrency();
	var coin1 = exchanges[1].GetCurrency();
	
	//检查和设置交易所
	if(exchanges[0].GetName() == 'Futures_OKCoin') {
		Log(name0, coin0, "是:期货价格");
    	exchanges[0].SetContractType(_ContractType0);
    	exchanges[0].SetMarginLevel(_MarginLeve0);
	}
	else
		Log(name0, coin0, "是:现货价格");
	
	if(exchanges[1].GetName() == 'Futures_OKCoin') {
		Log(name1, coin1, "是:期货价格");
    	exchanges[1].SetContractType(_ContractType1);
    	exchanges[1].SetMarginLevel(_MarginLeve1);
	}
	else
		Log(name1, coin1, "是:现货价格");
	
	usdrate0 = exchanges[0].GetUSDCNY();
	usdrate1 = exchanges[1].GetUSDCNY();
	rate0 = exchanges[0].GetRate();
	rate1 = exchanges[1].GetRate();

	//设置汇率和日志,内部用量值
	if(_CType0 == 1){//要求使用美元
		if(rate0 == 1)	//当前人民币计价
			exchanges[0].SetRate(1/usdrate0);
		else
			exchanges[0].SetRate(1);
	}
	else			//要求使用人民币			
	{
		if(rate0 == 1)	//当前人民币计价
			exchanges[0].SetRate(1);
		else
			exchanges[0].SetRate(usdrate0);
	}
	
	if(_CType1 == 1){//要求使用美元
		if(rate1 == 1)	//当前人民币计价
			exchanges[1].SetRate(1/usdrate1);
		else
			exchanges[1].SetRate(1);
	}
	else			//要求使用人民币			
	{
		if(rate1 == 1)	//当前人民币计价
			exchanges[1].SetRate(1);
		else
			exchanges[1].SetRate(usdrate1);
	}
	
    Log(name0, _CType0 == 0 ? "计价货币: RMB" : "计价货币: USD");
	Log(name1, _CType1 == 0 ? "计价货币: RMB" : "计价货币: USD");
    SetErrorFilter("502:|503:|network|timeout|WSARecv|Connect|GetAddr|no such|reset");
	EnableLogLocal(false);
	LoopInterval = Math.max(LoopInterval, 100);

	//初始化变量
    Log('当前机器人ID: ', _G(), '开始运行...');
	Log('当前告警推送状态: ', TS==0 ? '无' : '有', "#0000ff");
	Log('轮询周期: ', _N(LoopInterval / 1000.0, 1), '秒');
	Log('告警周期: 轮询', AlarmPeriod, '次告警一次 !');
	Log('告警区间: [', MinVal, ', ', MaxVal, ']');

	while (true) {
		//获取命令
		getCmd();
		
		//更新市场价格和深度
		ticker0 = GetTicker(exchanges[0]);
		ticker1 = GetTicker(exchanges[1]);
		depths0 = sdGetDepth(exchanges[0]);
		depths1 = sdGetDepth(exchanges[1]);
		tickerCnt = tickerCnt + 1;
		//更新告警标准
		if(tickerCnt % (AlarmPeriod+1) == 0) {
			CanAlarm = true;
			tickerCnt = 0;
		}

		if(_Price0 == 0)
			price0 = depths0.Asks[0].Price;
		else if(_Price0 == 1)
			price0 = ticker0.Last;
		else if(_Price0 == 2)
			price0 = depths0.Bids[0].Price;
		
		if(_Price1 == 0)
			price1 = depths1.Asks[0].Price;
		else if(_Price1 == 1)
			price1 = ticker1.Last;
		else if(_Price1 == 2)
			price1 = depths1.Bids[0].Price;

		if(price1 <= 0) {//err
			continue;
		}
		if(_Option == 0)	//Sub
			priceDev = price0 - price1;
		else			//Dev
			priceDev = price0 / price1;
		
		priceDev = _N(priceDev, 4);
		
		LogProfit(priceDev, name0, coin0, "价格: ", _N(price0,4), name1, coin1, "价格: ", _N(price1,4));

		if(TS) {
			if(priceDev >= MaxVal && CanAlarm == true) {
				Log('上穿值: ', priceDev, '! 警戒值区间:<', MinVal, ', ', MaxVal,'> !@');
				CanAlarm = false;
			}
			if(priceDev <= MinVal && CanAlarm == true) {
				Log('下穿值:', priceDev, '! 警戒值区间:<', MinVal, ', ', MaxVal,'> !@');
				CanAlarm = false;
			}
		}

		Sleep(LoopInterval);
	}
}


