/*
策略出处: https://www.botvs.com/strategy/14051
策略名称: 20行打造均线交叉策略
策略作者: 春哥
策略描述:

Talk is cheap, here's the code.


参数          默认值  描述
--------  -----  -------
Interval    900  轮询周期(秒)
fastBars      7  快线周期
slowBars     20  慢线周期
*/

function main() {
	var lastMADiff;
	while (true) {
		Sleep(Interval * 1000);
        var records = exchange.GetRecords();
        if (records.length < slowBars) continue;
		var fastMA = TA.EMA(records, fastBars), slowMA = TA.MA(records, slowBars);
        var currentMADiff = fastMA.pop() - slowMA.pop();
		if (lastMADiff && lastMADiff*currentMADiff < 0 ) {
            var a = $.GetAccount();
			if (currentMADiff > 0) {
				$.Buy(a.Balance);
			} else {
				$.Sell(a.Stocks);
                a = $.GetAccount();
                LogProfit( a.Balance , 'CNY:', a.Balance, 'BTC:', a.Stocks);
			}
		}
		lastMADiff = currentMADiff;
	}
}

