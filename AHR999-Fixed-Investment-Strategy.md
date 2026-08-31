
> Name

AHR999-Fixed-Investment-Strategy

> Author

ChaoZhang

> Strategy Description

AHR999 Mean Reversion Strategy
AHR999, AHR999X, harmonic mean, logarithmic price, net value


####Overview
This strategy is based on the AHR999 and AHR999X indicators. By comparing the current price with the harmonic mean price and logarithmic price, it determines whether Bitcoin is overbought or oversold, and accordingly conducts fixed investment and bottom-fishing operations. Meanwhile, the strategy also sets a take-profit condition to partially sell when the AHR999X indicator is below a certain threshold.

####Strategy Principle
1. Calculate the harmonic mean of Bitcoin's historical prices as a reference for the long-term equilibrium price.
2. Calculate the corresponding logarithmic price based on the number of days since Bitcoin's birth as a reference for the long-term trend price.
3. Calculate the current AHR999 indicator, which is the product of the ratio of the current price to the harmonic mean price and the logarithmic price.
4. Calculate the current AHR999X indicator, which is 3 times the ratio of the harmonic mean price to the current price multiplied by the ratio of the logarithmic price to the current price.
5. Based on the value of the AHR999 indicator, determine whether to conduct fixed investment or bottom-fishing. Fixed investment is made when AHR999 is within a set range, and bottom-fishing is made when it is below the lower limit.
6. Based on the value of the AHR999X indicator, determine whether to take profit. When AHR999X is below a set threshold, sell a certain proportion of the position.

####Advantage Analysis
1. The strategy is based on Bitcoin's long-term equilibrium price and trend price, with a certain theoretical basis and interpretability.
2. The introduction of the harmonic mean reduces the impact of short-term fluctuations, making the judgment more robust.
3. By combining the AHR999 and AHR999X indicators, it can better capture Bitcoin's overbought and oversold status and the timing of profit-taking.
4. Fixed investment and bottom-fishing are combined to gradually build positions when prices are relatively undervalued, resulting in relatively low costs.
5. The take-profit operation is set to obtain certain returns when prices are relatively overvalued while retaining most of the positions for long-term appreciation.

####Risk Analysis
1. The strategy relies on the AHR999 and AHR999X indicators. If the future price movement of Bitcoin changes significantly, causing these two indicators to fail, the strategy may face greater risks.
2. The harmonic mean is sensitive to the length of historical prices. If the selected historical price interval is not reasonable enough, it may affect the performance of the strategy.
3. The calculation of the logarithmic price is based on the number of days since Bitcoin's birth. If the long-term growth trend of Bitcoin changes, the logarithmic price may lose its reference significance.
4. The strategy may face the risk of insufficient funds for bottom-fishing when prices are relatively high, leading to the inability to build positions in a timely manner.
5. The take-profit operation may cause the strategy to miss some gains if prices continue to rise.

####Optimization Direction
1. Optimize the thresholds of the AHR999 and AHR999X indicators to find the most suitable intervals for fixed investment, bottom-fishing, and profit-taking.
2. Introduce more indicators, such as trading volume and volatility, to assist in judging trends and overbought/oversold states.
3. Optimize the calculation method of the harmonic mean, such as appropriately adjusting the weights of historical prices to reduce dependence on distant historical prices.
4. Dynamically adjust the amount of fixed investment and bottom-fishing, increasing investment when prices are lower and reducing investment when prices are higher.
5. Optimize the take-profit operation, such as dynamically adjusting based on price trends and position costs to balance returns and risks.

####Summary
The AHR999 Mean Reversion Strategy determines Bitcoin's overbought and oversold status by comparing the current price with the historical equilibrium price and trend price, and conducts fixed investment, bottom-fishing, and take-profit operations. This strategy has a certain theoretical basis and interpretability. By combining two indicators, it can better capture the price fluctuation patterns of Bitcoin. However, the strategy also faces risks in terms of indicator failure, parameter selection, and fund management, requiring continuous optimization and improvement in practice. Overall, the AHR999 Mean Reversion Strategy provides a feasible idea for long-term value investment in Bitcoin.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|InitMoney||Initial capital|
|Interval|hours|Investment interval|
|Money||Investment amount|
|Top||Upper DCA threshold|
|Bottom||Bottom-fishing threshold|
|Multiple||Bottom-fishing multiplier|
|TakeProfit||Enable take profit|
|TakeProfitLine||Take-profit threshold|
|TakeProfitRate|based on DCA count|Take-profit ratio|


> Source (javascript)

``` javascript
/*backtest
start: 2018-04-14 00:00:00
end: 2021-07-18 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"BTC_USDT","balance":1000000,"stocks":0}]
*/

/*
 * @Project:
 * @Version:
 * @Author: RedSword <coo@fmz.com>
 * @Description:
 * @Date: 2021-07-19 11:02:43
 * @LastEditors: RedSword
 * @LastEditTime: 2021-07-19 15:55:16
 * @Copyright:: Copyright © 2020 FMZ Quant
 * 感谢ahr999大神,后续完善可以加入一些理财,币和钱都闲着,收益会低一点,也可以放到bitfinex放借贷,年化也有十几的收益,还可以放大资金,买了币以后,就去交割合约做多,暂时想到这么多,希望大家多多交流
 * 参考:
 * https://github.com/who3m1/ahr999-mixin
 * https://btctom.com/ahr999
 * https://btctom.com/ahr999x
 */

function harmonicMean(x) {
	if (x.length === 0) {
		return undefined;
	}
	var reciprocalSum = 0;
	for (var i = 0; i < x.length; i++) {
		if (x[i] <= 0) {
			return undefined;
		}
		reciprocalSum += 1 / x[i];
	}
	return x.length / reciprocalSum;
}
function GetNowPrice() {
	var ticker = exchange.GetTicker();
	return ticker.Last;
}
function GetPrices() {
	var records = exchange.GetRecords(PERIOD_D1);
	var prices = [];
	for (let i = 0; i < records.length; i++) {
		const record = records[i];
		// Log(record);
		prices.push(record.Close);
	}
	return prices;
}

function CalcAHR999() {
	var now = parseInt(Unix());
	var prices = GetPrices();
	var avgPrice = harmonicMean(prices);
	var nowPrice = GetNowPrice();
	var birthday = (now - 1230940800) / (24 * 60 * 60);
    var logPrice = Math.pow(10, 5.84 * Math.log10(parseInt(birthday)) - 17.01);
	//2020-4-16 13:16 以后使用新的指标
	//https://weibo.com/5034063086/IDzPWyN8Z?from=page_1005055034063086_profile&wvr=6&mod=weibotime
	if (now > 1587014160) {
		logPrice = Math.pow(10, 5.8 * Math.log10(parseInt(birthday)) - 16.88);
	}
	var ahr999 = Math.round((nowPrice / avgPrice) * (nowPrice / logPrice) * 1000) / 1000;
	var ahr999x = Math.round((avgPrice / nowPrice) * (logPrice / nowPrice) * 3 * 1000) / 1000;
	return {
		ahr999: ahr999,
		ahr999x: ahr999x,
	};
}

function init() {
	exchange.SetMaxBarLen(200);
	if (exchange.GetCurrency().indexOf("BTC_USD") == -1) {
		throw "只支持BTC交易对";
	}
}
function UpdateStatus(account, nowPrice) {
	var table = {
		type: "table",
		title: "持仓信息",
		cols: ["定投币种", "初始净值", "当前净值", "定投次数", "持仓数量", "持仓均价", "当前价格", "累计定投", "可用资金", "盈利率%"],
		rows: [],
	};

	var netValue = account.Balance + account.Stocks * nowPrice;
	table.rows.push([
		exchange.GetCurrency(),
		InitMoney,
		_N(netValue, 2),
		Global.number,
		_N(account.Stocks, 6),
		_N((InitMoney - account.Balance) / account.Stocks, 2),
		nowPrice,
		_N(Global.number * Money, 2),
		_N(account.Balance, 2),
		_N((netValue / InitMoney) * 100),
	]);
	LogStatus("`" + JSON.stringify(table) + "`");
}
var Global = {
	upTime: 0, //循环间隔
	number: 0, //定投次数
	multipleNumber: 0, //抄底次数
};

function main() {
	while (true) {
		var now = parseInt(Unix());
		if (now > Global.upTime) {
			var price = GetNowPrice();
			var account = exchange.GetAccount();
			var ahr999 = CalcAHR999();
			Global.upTime = now + 3600 * Interval;
			if (ahr999.ahr999 >= Bottom && ahr999.ahr999 < Top) {
				if (Money > account.Balance) continue;
				Log("开始定投");
				exchange.Buy(-1, Money);
				Global.number++;
			} else if (ahr999.ahr999 < Bottom) {
				if (Money * Multiple > account.Balance) continue;
				Log("开始抄底");
				exchange.Buy(-1, Money * Multiple);
				Global.number += Multiple;
			}
			if (TakeProfit & (ahr999.ahr999x < TakeProfitLine)) {
				Log("开始顶逃");
				var sell = Global.number * TakeProfitRate * Money;
				var coinNumber = sell / price;
				exchange.Sell(-1, coinNumber);
			}
			UpdateStatus(account, price);
		}
		Sleep(1000);
	}
}

```

> Detail

https://www.fmz.com/strategy/299799

> Last Modified

2024-06-12 17:06:11
