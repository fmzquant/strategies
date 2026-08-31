
> Name

CTA-Commodity-Futures-Simple-Martingale-Strategy

> Author

Zer3192

> Strategy Description

#### I. Summary
Martingale strategies originated in 18th-century France and were initially used mainly at the gambling table before quickly becoming well known throughout Europe. In theory, this is a strategy with a win rate close to 100%, and it still appears in many trading markets today, including forex, futures, and digital assets. But is it really reliable? Is it truly the invincible method of legend? This article builds a simple commodity futures martingale strategy to examine those questions.

#### II. Martingale Strategy Principles
Martingale is neither a trading strategy nor a trading mechanism in itself; it is a form of capital management. The idea is simple: whenever the trader loses a certain amount, the size of the next order is doubled until a winning trade resets the order size to its initial value. In this way, a single profitable trade can recover all previous losses and also earn the profit of the initial order size. Clearly, this is a counter-trend capital management method based on doubling into losing positions.

Assume there is a perfectly balanced coin with a 50% chance of landing on heads or tails. If you bet 1 yuan on each flip, you win 1 yuan on heads and lose 1 yuan on tails. In theory, the probabilities are equal because each outcome is independent, remaining 50% each time.

Under the martingale principle, the bet size is doubled after every loss, so only one win is needed to recover all prior losses. However, a losing streak can still wipe you out. If the bankroll is only 10 yuan, the first 1-yuan bet loses and leaves 9 yuan; the second 2-yuan bet loses and leaves 7 yuan; the third 4-yuan bet loses and leaves 3 yuan. At that point there is no longer enough capital to continue betting.

#### III. Strategy Backtest
- Backtest start date: 2015-06-01
- Backtest end date: 2021-04-01
- Instrument: Rapeseed meal index
- Data period: Daily
- Slippage: 2 ticks for both opening and closing

**Backtest configuration**
![IMG](https://www.fmz.com/upload/asset/39df3d9ffd96e830c2f4.png)
**Backtest performance**
![IMG](https://www.fmz.com/upload/asset/3a0b9d36caf93df156c0.png)
**Equity curve**
![IMG](https://www.fmz.com/upload/asset/3992048c1b248823b8e0.png)
**Log information**
![IMG](https://www.fmz.com/upload/asset/3979363f6bf790113495.png)

#### IV. Upgrading the Martingale Strategy
The biggest risk of a martingale strategy is a persistent one-way market. If the trader's position runs directly against the market, the accumulated exposure can become enormous. With an initial capital of 10,000 yuan and a 2x scale-in multiplier after losses, only 7 consecutive losing trades are needed to blow up the account. If the multiplier is reduced to 1.5, it takes 12 consecutive losses; if it is reduced to 1.1, it takes 49 consecutive losses. Because much less capital is consumed, the operating risk becomes relatively smaller.

![IMG](https://www.fmz.com/upload/asset/390720a08054ffca4d39.png)

The chart above shows the relationship between the martingale multiplier and the proportion of capital invested. It makes clear that using a lower multiplier consumes far less capital and gives the strategy stronger risk resistance. To protect capital in live trading, a low multiplier is recommended. Before going live, traders should calculate a multiplier that can withstand at least a dozen consecutive losing trades.

#### V. Conclusion
Trading probabilities are the essence of trading, and no one can guarantee that every order will be profitable. In other words, risk already exists even when an order is placed for excellent reasons at an ideal moment. Martingale is especially suitable for trend markets. As long as the trader can judge the trend reasonably, open positions in the direction of the trend, and set a proper risk-reward ratio, it can still produce relatively stable returns.

> Source (javascript)

``` javascript
/*backtest
start: 2015-06-01 00:00:00
end: 2022-04-01 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_usdt"}]
*/

MarginLevel =20//合约杠杆 
unit =0.015//初始下单量
profits =1//盈亏间距
bei =1//倍率



function main() {
    exchange.SetContractType("swap")
    exchange.SetMarginLevel(MarginLevel)
    while (true) {
        let depth = exchange.GetDepth();
        if (!depth) return;
        let ask = depth.Asks[0].Price==-1;
        let bid = depth.Bids[0].Price==-1;
        let position = exchange.GetPosition()
        if (position.length == 0) {
            let redom = Math.random()
            unit =0.015
            if (redom > 0.5) {
                exchange.SetDirection("sell")
                exchange.Sell(-1, unit, "开空")
            }
            if (redom < 0.5 ) {
                exchange.SetDirection("buy")
                exchange.Buy(-1, unit, "开多")
            }
        }
        if (position.length > 0) {
            let type = position[0].Type;
            let profit = position[0].Profit;
            let amount = position[0].Amount;
            if (type == 0) {
                if (profit > profits) {
                    exchange.SetDirection("closebuy")
                    exchange.Sell(-1, amount, "多头止盈，当前盈利：" + profit)
                      unit = 0.015
                }       
            
                if (profit <-profits ) {
                    unit = unit * bei
                    exchange.SetDirection("buy")
                    exchange.Buy(-1, unit, "多头加仓，当前盈利：" + profit)
                }
            }
        
        
            if (type == 1) {
                if (profit > profits) {
                    exchange.SetDirection("closesell")
                    exchange.Buy(-1, amount, "空头止盈，当前盈利：" + profit)
                    unit = 0.015
            }
                    
                
                if (profit < -profits) {
                    unit = unit * bei
                    exchange.SetDirection("sell")
                    exchange.Sell(-1, unit, "空头加仓，当前盈利：" + profit)
                }
            
              }
          } 

        Sleep(1000 )
    }
}



```

> Detail

https://www.fmz.com/strategy/275287

> Last Modified

2022-04-05 07:47:26
