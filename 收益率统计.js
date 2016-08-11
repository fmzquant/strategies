/*
策略出处: https://www.botvs.com/strategy/19329
策略名称: 收益率统计
策略作者: 春哥
策略描述:

统计收益率

BotVS的收益统计只能记录一根曲线。不能进行技术分析。 此模板可以实现自动统计最近1日，上1日，最近7日，上个7日，最近30日，上30日 和所有时间的收益，收益率，月化收益率，年化收益率以及最大回撤。（根据短时间段计算出来的月化和年化收益率没有用复利算法。）

用法： 引入此模板，替换原来策略的LogProfit函数为$.LogProfit。  并在 LogStatus 的地方，添加 $.ProfitSummary(初始资金) 的返回字符串

例如:
function main() {
    while(true) {
        var t = exchange.GetTicker();
        $.LogProfit(t.Last);
        LogStatus($.ProfitSummary(10000));
        Sleep(3600000);
    }
}

显示效果：

1日: 收-78.44元(-0.537%)，月化-16.781%，年化-204.169%，回撤1.106%
上1日: 收176.08元(1.221%)，月化38.226%，年化465.087%，回撤1.236%
7日: 收771.74元(5.599%)，月化24.141%，年化293.719%，回撤1.517%
上7日: 收223.15元(1.64%)，月化7.071%，年化86.039%，回撤0.9%
30日: 收1570.31元(12.094%)，月化12.111%，年化147.352%，回撤3.251%
上30日: 收200.12元(1.565%)，月化1.567%，年化19.076%，回撤1.521%
总: 收4554.11元(45.541%)，最大回撤3.251%，统计时间74天23小时


参数             默认值    描述
-------------  -----  ---------------------
SYS_LOGPROFIT  true   是否同时记录到系统自带的LogProfit
*/

$.LogProfit = function(profit) {
    var args = Array.prototype.slice.call(arguments);
    if (SYS_LOGPROFIT) {
        LogProfit.apply(this, args);
    } else {
        args.unshift('收益');
        Log.apply(this,args);
    }

    var _history = $.GetAllProfit();
    _history.push([ Math.floor(new Date().getTime()/1000), profit]);
    _G('profit_history', JSON.stringify(_history));
};

$.GetAllProfit = function() {
	var old = _G('profit_history') || '[]';
    try {
    	var _history = JSON.parse(old);
    	return _history;
    } catch(e) {
    	_G('profit_history', null);
    	return [];
    }
};

function filterProfit(from, to) {
	var arr = $.GetAllProfit();
	if (!arr || arr.length === 0) return;
	var re, maxdrawback=0, lastProfit=0, maxProfit=false, maxdrawbackProfit=0;
	var earlest, latest;
	for(var i=0;i<arr.length;i++) {
		if (!arr[i]) continue;
		if (arr[i][0] > from && arr[i][0] <= to) {
			var profit = arr[i][1];
			if (!earlest) earlest = arr[i];
			latest = arr[i];
			if (!lastProfit) lastProfit = profit;
			if (maxProfit === false || maxProfit < profit) maxProfit = profit;
			var drawback = maxProfit - profit;
			if (drawback > maxdrawback) {
				maxdrawback = drawback;
				maxdrawbackProfit = maxProfit;
			}
		}
	}
	if (!earlest || !latest) return;
	return [earlest, latest, maxdrawback, maxdrawbackProfit];
}

function daysProfit(offset, days) {
	var from = getDaySecond( -offset+days);
	var to = getDaySecond(-offset);
	var arr = filterProfit( from, to );
	if (!arr || !arr[0] || !arr[1]) return;
	var profitTime = arr[1][0] - arr[0][0];
	if (!profitTime) return;
	var periodTime = to - from;
	var profit = arr[1][1] - arr[0][1];
	var realPercent = profitTime*100 / periodTime;
	var expectedProfit = profit * 100 / realPercent;
	return {
		profit:profit, 
		expectedProfit:expectedProfit,
		profitTime:profitTime,
		periodTime:periodTime,
		open: arr[0][1],
		close: arr[1][1],
		drawback: arr[2],
		drawbackProfit: arr[3]
	};
}

function getDaySecond(days) {
	var d = new Date();
	var now = d.getTime();
	now -= days*86400000;
	d.setTime(now);
	return Math.floor(d.getTime() / 1000);
} 

$.DaysProfit = function(days) {
	return filterProfit(days)[2];
};

$.ProfitSummary = function(initialBalance) {
	if (!initialBalance) return '没有传入初始资金';

	var day = daysProfit(0, 1);
	var lastDay = daysProfit(-1, 1);
	var week = daysProfit(0,7);
	var lastWeek = daysProfit(-7,7);
	var month = daysProfit(0,30);
	var lastMonth = daysProfit(-30,30);
	var all = daysProfit(0, 10000);
	if (!all) return '';
	var _days = Math.floor(all.profitTime / 86400);

	var text = [];
	var t = profitSummary(day, initialBalance);
	if (t) text.push('1日: '+t);
	t = profitSummary(lastDay, initialBalance);
	if (t) text.push('上1日: '+t);
	t = profitSummary(week, initialBalance);
	if (t && _days >= 7) text.push('7日: '+t);
	t = profitSummary(lastWeek, initialBalance);
	if (t) text.push('上7日: '+t);
	t = profitSummary(month, initialBalance);
	if (t && _days>=30) text.push('30日: '+t);
	t = profitSummary(lastMonth, initialBalance);
	if (t) text.push('上30日: '+t);
	
	if (all) {
		var _days = Math.floor(all.profitTime / 86400);
		all.profitTime %= 86400;
		var _hours = Math.floor(all.profitTime / 3600);
		var drawback = _N( all.drawback*100/(all.drawbackProfit+initialBalance), 3 )+'%';
		text.push('总: 收'+_N(all.close,2)+'元('+_N(all.close*100/initialBalance,3)+'%)，最大回撤'+drawback+'，统计时间'+_days+'天'+_hours+'小时');
	}
	return text.join('\n');
};

function profitSummary(p, base) {
	if (!p) return '';
	var text = [];
	text.push('收'+_N(p.profit,2)+'元('+_N(p.profit*100/(base+p.open), 3)+'%)');
	var month = expectProfit(p, 30, base);
	if (month) {
		text.push('月化'+month.percent+'%');
	}
	var year = expectProfit(p, 365, base);
	if (year) {
		text.push('年化'+year.percent+'%');
	}
	text.push('回撤'+ _N( p.drawback*100/(p.drawbackProfit+base), 3 )+'%' );
	return text.join('，');
}


function expectProfit(p, days, base) {
	var expectSeconds = days*86400;
	if (expectSeconds < p.profitTime) return;
	return {
		profit: _N(p.profit * expectSeconds / p.profitTime, 2),
		percent: _N(p.profit * expectSeconds *100 / (p.profitTime * (base+p.open)),3)
	};
}

function main() {
    while(true) {
        var t = exchange.GetTicker();
        $.LogProfit(t.Last);
        LogStatus($.ProfitSummary(10000));
        Sleep(3600000);
    }
}
