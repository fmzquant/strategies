/*
策略出处: https://www.botvs.com/strategy/18943
策略名称: 不要怂就是干
策略作者: qq110888000
策略描述:

"Talk is cheap. Show me the code"


注: ` 策略使用了交易模板类库`

`希望新手从此策略入门, 一步步学习编写策略, 并体验到模拟与真实环境对交易系统的影响`

https://dn-filebox.qbox.me/fb4d0c7d773ca83e9d0230927705d419dc0bbeaa.png


参数             默认值    描述
-------------  -----  -------
EnterPeriod    2      入市观察期
FastPeriod     5      入市快线周期
SlowPeriod     30     入市慢线周期
PositionRatio  true   仓位比例
Interval       10     轮询周期(秒)
SlidePrice     0.01   滑动值

按钮    默认值         描述
----  ----------  ----
简单策略  __button__  不懂
*/

function main() 
{
    var STATE_IDLE  = -1;
    var state = STATE_IDLE;
    var initAccount = $.GetAccount();
	var price = 0;
    Log(initAccount);
    while (true) 
	{
        ticker = exchange.GetTicker(); 
        var nowAccount = $.GetAccount();
        
        var n = $.Cross(FastPeriod, SlowPeriod);
        if (Math.abs(n) >= EnterPeriod && Math.abs(n) < EnterPeriod +1 ) 
		{  
            if (n > 0)
			{
				price = ticker.Sell;
                var opAmount = parseFloat((nowAccount.Balance * PositionRatio/(ticker.Sell+SlidePrice)).toFixed(3));
			}
            else 
			{
				price = ticker.Buy;
                var opAmount = nowAccount.Stocks;
            }
			if (opAmount> exchange.GetMinStock())
			{
				var obj = n > 0 ? exchange.Buy(price, opAmount) : $.Sell(price, opAmount);
				if (obj) 
				{
					opAmount = obj.amount;
					// state = n > 0 ? PD_LONG : PD_SHORT;
					Log("开仓详情", obj, "交叉周期", n, "币：", nowAccount.Stocks);
					LogProfit(nowAccount.Balance + nowAccount.Stocks * ticker.Last , '钱');
				}
				/*else
				{
					continue;
				} */
			}	          
        }       
        Sleep(Interval*1000);       
    }
}
