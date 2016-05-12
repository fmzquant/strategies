/*
策略出处: https://www.botvs.com/strategy/14436
策略名称: 10行人品策略
策略作者: 春哥
策略描述:

赚不赚钱看人品


参数          默认值  描述
--------  -----  -------
Interval    300  轮询周期(秒)
*/

function main() {
	while (true) {
		Sleep(Interval * 1000);
        if (Math.random() > 0.5) $.Buy(1000000); else {
            $.Sell(1000000);
            var a = $.GetAccount();
            if (a) LogProfit( a.Balance , 'CNY:', a.Balance, 'BTC:', a.Stocks);
        }
	}
}

